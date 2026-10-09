import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { validateHelp } from './check.mjs';

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'frost-help-check-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const lang of ['en', 'es']) {
    await mkdir(path.join(root, lang));
    const translated = lang === 'es';
    const manifest = {
      pages: [{ id: 'intro', title: translated ? 'Inicio' : 'Getting started', path: `${lang}/intro.md` }],
      sections: [
        {
          title: translated ? 'Almacenamiento' : 'Storage',
          pages: [{ id: 'storage', title: translated ? 'Almacenamiento' : 'Storage', path: `${lang}/storage.md` }],
        },
      ],
    };
    await writeFile(path.join(root, lang, 'manifest.json'), JSON.stringify(manifest));
    await writeFile(
      path.join(root, lang, 'intro.md'),
      `# ${manifest.pages[0].title}\n\n[${manifest.sections[0].title}](#storage)\n\n## ${translated ? 'Comandos' : 'Commands'}\n\nUse \`frost status\` and \`--verify\`.\n\n- frost\n\n| Key | Meaning |\n| --- | --- |\n| \`paths\` | Folders |\n\n\`\`\`sh\nfrost status --verify\n\`\`\`\n`,
    );
    await writeFile(path.join(root, lang, 'storage.md'), '# Storage\n\n[Provider](https://example.com/storage)\n');
  }
  return root;
}

async function edit(root, name, update) {
  const file = path.join(root, name);
  await writeFile(file, update(await readFile(file, 'utf8')));
}

test('accepts translated prose and titles with matching structure and code', async t => {
  assert.deepEqual(await validateHelp(await fixture(t), ['en', 'es']), []);
});

test('requires every supported language by default', async t => {
  const errors = await validateHelp(await fixture(t));
  assert.equal(errors.length, 7);
  assert.ok(errors.every(e => e.includes('manifest.json')));
});

const cases = [
  ['a translated command', 'es/intro.md', text => text.replace('`--verify`', '`--verificar`'), /inline code/],
  [
    'a changed code example',
    'es/intro.md',
    text => text.replace('frost status --verify\n', 'frost backup\n'),
    /code blocks differ/,
  ],
  ['a broken page link', 'es/intro.md', text => text.replace('#storage)', '#missing)'), /unknown page link/],
  [
    'a different external URL',
    'es/storage.md',
    text => text.replace('/storage)', '/other)'),
    /link destinations differ/,
  ],
  [
    'an untranslated page link title',
    'es/intro.md',
    text => text.replace('[Almacenamiento]', '[Storage]'),
    /translated manifest title/,
  ],
  ['an omitted section', 'es/intro.md', text => text.replace('## Comandos\n', ''), /headings structure/],
  ['a missing table row', 'es/intro.md', text => text.replace('| `paths` | Folders |\n', ''), /tables structure/],
  ['a missing list item', 'es/intro.md', text => text.replace('- frost\n', ''), /lists structure/],
  ['an unclosed code fence', 'es/intro.md', text => text.replace(/```\n$/, ''), /unclosed code fence/],
  ['an unsafe manifest path', 'es/manifest.json', text => text.replace('es/intro.md', 'es/../intro.md'), /unsafe path/],
  [
    'a duplicate manifest id',
    'es/manifest.json',
    text => text.replace('"id":"storage"', '"id":"intro"'),
    /duplicate id/,
  ],
  [
    'a duplicate manifest path',
    'es/manifest.json',
    text => text.replace('es/storage.md', 'es/intro.md'),
    /duplicate path/,
  ],
  ['a malformed manifest', 'es/manifest.json', () => '{}', /pages and sections/],
  ['an em dash in a manifest title', 'es/manifest.json', text => text.replace('Inicio', 'Inicio\u2014frost'), /dash/],
  ['capitalized frost in a manifest title', 'es/manifest.json', text => text.replace('Inicio', 'Frost'), /lowercase/],
  ['an em dash', 'es/storage.md', text => text + '\ntext\u2014text\n', /dash/],
];

for (const [name, file, update, expected] of cases) {
  test(`rejects ${name}`, async t => {
    const root = await fixture(t);
    await edit(root, file, update);
    assert.ok((await validateHelp(root, ['en', 'es'])).some(e => expected.test(e)));
  });
}

test('rejects missing and unlisted pages', async t => {
  const root = await fixture(t);
  await rm(path.join(root, 'es', 'storage.md'));
  await writeFile(path.join(root, 'es', 'extra.md'), '# Extra\n');
  const errors = await validateHelp(root, ['en', 'es']);
  assert.ok(errors.some(e => e.includes('es/storage.md:')));
  assert.ok(errors.some(e => e.includes('extra.md: page is absent')));
});

test('rejects changed section order even when all ids still exist', async t => {
  const root = await fixture(t);
  await edit(root, 'es/manifest.json', text => {
    const manifest = JSON.parse(text);
    [manifest.pages[0], manifest.sections[0].pages[0]] = [manifest.sections[0].pages[0], manifest.pages[0]];
    return JSON.stringify(manifest);
  });
  assert.ok((await validateHelp(root, ['en', 'es'])).some(e => e.includes('page ids, order and paths')));
});

test(
  'manual verification stops before hashing an untrusted or ambiguous archive entry',
  { skip: process.platform === 'win32' },
  async t => {
    const { spawnSync } = await import('node:child_process');
    const page = await readFile(new URL('../en/setup/installing.md', import.meta.url), 'utf8');
    const snippet = page.match(/```sh\n(\(\n[\s\S]*?)\n```/)[1];
    for (const [name, signature, entries, shouldHash] of [
      ['valid', 0, 1, true],
      ['bad signature', 1, 1, false],
      ['missing entry', 0, 0, false],
      ['duplicate entries', 0, 2, false],
    ]) {
      await t.test(name, async sub => {
        const root = await mkdtemp(path.join(os.tmpdir(), 'frost-help-signature-'));
        sub.after(() => rm(root, { recursive: true, force: true }));
        await writeFile(path.join(root, 'release-signing.pub'), 'dummy public key\n');
        await writeFile(path.join(root, 'checksums.txt.sig'), 'dummy signature\n');
        await writeFile(path.join(root, 'checksums.txt'), '0  frost_X.Y.Z_linux_amd64.tar.gz\n'.repeat(entries));
        await writeFile(path.join(root, 'ssh-keygen'), `#!/bin/sh\nexit ${signature}\n`, { mode: 0o700 });
        await writeFile(path.join(root, 'shasum'), '#!/bin/sh\ncat > checksum-ran\n', { mode: 0o700 });
        const result = spawnSync('/bin/sh', ['-c', snippet], {
          cwd: root,
          env: { ...process.env, PATH: root + path.delimiter + process.env.PATH },
          encoding: 'utf8',
        });
        assert.equal(result.status === 0, shouldHash, result.stderr);
        const ran = await readFile(path.join(root, 'checksum-ran'), 'utf8').catch(() => '');
        assert.equal(!!ran, shouldHash);
      });
    }
  },
);

test('recognizes indented fences and inline spans delimited by multiple backticks', async t => {
  const root = await fixture(t);
  for (const lang of ['en', 'es']) {
    await edit(root, `${lang}/intro.md`, text => text.replace(/```/g, '  ```').replace('`--verify`', '``--verify``'));
  }
  assert.deepEqual(await validateHelp(root, ['en', 'es']), []);
  await edit(root, 'es/intro.md', text =>
    text.replace('frost status --verify\n', 'frost backup\n').replace('``--verify``', '``--verificar``'),
  );
  const errors = await validateHelp(root, ['en', 'es']);
  assert.ok(errors.some(e => e.includes('code blocks differ')));
  assert.ok(errors.some(e => e.includes('inline code')));
});
