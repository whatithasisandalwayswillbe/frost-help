import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const LANGUAGES = ['en', 'zh-CN', 'es', 'pt-BR', 'fr', 'de', 'ja', 'ko', 'ru'];

function markdown(text) {
  const blocks = [];
  const prose = [];
  let block;
  let fence;
  for (const line of text.split('\n')) {
    if (block) {
      block.push(line);
      if (new RegExp(`^ {0,3}${fence[0]}{${fence.length},}\\s*$`).test(line)) {
        blocks.push(block.join('\n'));
        block = undefined;
      }
    } else {
      // Fenced code stays exact, including its language and whitespace.
      const opening = /^ {0,3}(`{3,}|~{3,})/.exec(line);
      if (opening) {
        fence = opening[1];
        block = [line];
      } else prose.push(line);
    }
  }
  const body = prose.join('\n');
  return {
    blocks,
    unclosed: !!block,
    inline: [...body.matchAll(/(?<!`)(`+)(?!`)([\s\S]*?)\1(?!`)/g)].map(m => m[2]),
    links: [...body.matchAll(/\[([^\]\n]+)\]\(([^)\s]+)\)/g)].map(m => ({ label: m[1], target: m[2] })),
    headings: prose.filter(line => /^#{1,6} /.test(line)).map(line => /^#+/.exec(line)[0]),
    tables: prose.filter(line => /^\|/.test(line)).map(line => line.replace(/\\\|/g, '').split('|').length),
    lists: prose.filter(line => /^\s*(?:- |\d+\. )/.test(line)).map(line => (/^\s*- /.test(line) ? '-' : '1.')),
  };
}

function same(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

async function files(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const name = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...(await files(name)));
    else if (entry.isFile() && entry.name.endsWith('.md')) result.push(name);
  }
  return result;
}

export async function validateHelp(root, languages = LANGUAGES) {
  const errors = [];
  const manifests = new Map();
  for (const lang of languages) {
    const name = `${lang}/manifest.json`;
    try {
      const manifest = JSON.parse(await readFile(path.join(root, name), 'utf8'));
      if (!Array.isArray(manifest.pages) || !Array.isArray(manifest.sections))
        throw new Error('pages and sections must be arrays');
      if (manifest.sections.some(s => typeof s.title !== 'string' || !s.title.trim() || !Array.isArray(s.pages)))
        throw new Error('invalid section');
      const pages = [...manifest.pages, ...manifest.sections.flatMap(s => s.pages)];
      const ids = new Set();
      const paths = new Set();
      for (const page of pages) {
        if (typeof page.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(page.id))
          throw new Error('invalid page id');
        if (typeof page.title !== 'string' || !page.title.trim()) throw new Error(`missing title for ${page.id}`);
        if (
          typeof page.path !== 'string' ||
          !page.path.startsWith(`${lang}/`) ||
          !page.path.endsWith('.md') ||
          page.path.includes('\\') ||
          page.path.split('/').some(p => !p || p === '.' || p === '..')
        )
          throw new Error(`unsafe path for ${page.id}`);
        if (ids.has(page.id)) throw new Error(`duplicate id ${page.id}`);
        if (paths.has(page.path)) throw new Error(`duplicate path ${page.path}`);
        ids.add(page.id);
        paths.add(page.path);
      }
      for (const title of [...pages, ...manifest.sections].map(item => item.title)) {
        if (/[\u2014\u2015]/u.test(title)) errors.push(`${name}: em dash or dash stand-in in title`);
        if (/\bFrost\b/.test(title)) errors.push(`${name}: frost must be lowercase in title`);
      }
      manifests.set(lang, { manifest, pages, ids, paths });
    } catch (error) {
      errors.push(`${name}: ${error.message}`);
    }
  }

  const english = manifests.get('en');
  if (!english) return errors;
  const shape = (m, lang) => ({
    pages: m.pages.map(p => ({ id: p.id, path: p.path.slice(lang.length + 1) })),
    sections: m.sections.map(s => s.pages.map(p => ({ id: p.id, path: p.path.slice(lang.length + 1) }))),
  });
  const source = new Map();
  for (const page of english.pages) {
    try {
      source.set(page.id, markdown(await readFile(path.join(root, page.path), 'utf8')));
    } catch (error) {
      errors.push(`${page.path}: ${error.message}`);
    }
  }

  for (const [lang, entry] of manifests) {
    if (!same(shape(english.manifest, 'en'), shape(entry.manifest, lang)))
      errors.push(`${lang}/manifest.json: page ids, order and paths differ from English`);
    const titles = new Map(entry.pages.map(p => [p.id, p.title]));
    try {
      for (const file of await files(path.join(root, lang))) {
        const relative = path.relative(root, file).split(path.sep).join('/');
        if (!entry.paths.has(relative)) errors.push(`${relative}: page is absent from the manifest`);
      }
    } catch (error) {
      errors.push(`${lang}: ${error.message}`);
    }
    for (const page of entry.pages) {
      let text;
      try {
        text = await readFile(path.join(root, page.path), 'utf8');
      } catch (error) {
        errors.push(`${page.path}: ${error.message}`);
        continue;
      }
      const local = markdown(text);
      const en = source.get(page.id);
      const report = message => errors.push(`${page.path}: ${message}`);
      if (local.unclosed) report('unclosed code fence');
      if (/[\u2014\u2015]/u.test(text)) report('em dash or dash stand-in');
      if (/\bFrost\b/.test(text)) report('frost must be lowercase');
      for (const link of local.links) {
        if (link.target.startsWith('#') && !entry.ids.has(link.target.slice(1)))
          report(`unknown page link ${link.target}`);
        else if (!link.target.startsWith('#') && !/^https:\/\//.test(link.target))
          report(`use a page id or HTTPS URL for ${link.target}`);
      }
      if (!en || lang === 'en') continue;
      if (!same(en.blocks, local.blocks)) report('code blocks differ from English');
      for (const key of ['headings', 'tables', 'lists']) {
        if (!same(en[key], local[key])) report(`${key} structure differs from English`);
      }
      const sourceInline = new Set(en.inline);
      const localInline = new Set(local.inline);
      for (const code of sourceInline) {
        if (!localInline.has(code)) report(`missing inline code ${JSON.stringify(code)}`);
      }
      // A translation may repeat an identifier or explain a placeholder separately.
      for (const code of localInline) {
        if (!sourceInline.has(code) && !en.inline.some(s => s.includes(code)))
          report(`changed inline code ${JSON.stringify(code)}`);
      }
      const targets = links => links.map(l => l.target).sort();
      if (!same(targets(en.links), targets(local.links))) report('link destinations differ from English');
      for (const link of en.links) {
        const id = link.target.slice(1);
        if (
          link.target.startsWith('#') &&
          link.label === english.pages.find(p => p.id === id)?.title &&
          !local.links.some(l => l.target === link.target && l.label === titles.get(id))
        )
          report(`page link ${link.target} must use its translated manifest title`);
      }
    }
  }
  return errors;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const errors = await validateHelp(root);
  if (errors.length) {
    for (const error of errors) process.stderr.write(error + '\n');
    process.exitCode = 1;
  } else
    process.stdout.write(
      `${LANGUAGES.length} languages checked; manifests, page structure, links and code match English.\n`,
    );
}
