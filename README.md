# frost-help

The help docs for [frost](https://github.com/whatithasisandalwayswillbe/frost), which makes encrypted, incremental backups to storage you choose. They're published at [getfro.st/docs](https://getfro.st/docs).

## Languages

| Language | Folder |
| --- | --- |
| English | [`en`](en) |
| 简体中文 | [`zh-CN`](zh-CN) |
| Español | [`es`](es) |
| Português (Brasil) | [`pt-BR`](pt-BR) |
| Français | [`fr`](fr) |
| Deutsch | [`de`](de) |
| 日本語 | [`ja`](ja) |
| 한국어 | [`ko`](ko) |
| Русский | [`ru`](ru) |

English is the source. Every other language has the same content and follows it page for page.

## Layout

Each language folder holds a `manifest.json` and the pages as Markdown. The manifest lists every page's id, title and file, grouped into the sections of the sidebar. Ids and file names are the same in every language, so a link like `[Restoring files](#restoring)` points to the same page everywhere. The site reads the pages straight from `main`, so a change there goes live once it's pushed.

## Contributing

Pull requests are welcome for typos, unclear wording and translations that are wrong or don't read well. [Open an issue](https://github.com/whatithasisandalwayswillbe/frost-help/issues) before adding pages or making bigger changes.

- Change English first, then carry the change into all other languages.
- Translate for meaning, the way a native speaker would put it, rather than word for word.
- Keep ids, file names, links and code blocks exactly as they are in English.
- frost's commands and messages are in English, so quoted messages, setup questions and key names stay in English.
- Write `frost` in lowercase, even at the start of a sentence.

Bugs and feature requests for frost itself belong in the [frost repository](https://github.com/whatithasisandalwayswillbe/frost/issues). Report security problems privately from its [Security tab](https://github.com/whatithasisandalwayswillbe/frost/security).
