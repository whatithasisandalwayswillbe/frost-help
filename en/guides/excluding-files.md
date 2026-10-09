# Excluding files

Your skip list keeps files and folders out of every backup. In your settings, it's called `exclude`.

## The defaults

A new skip list holds `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules` and `.cache`. Remove any of them you want backed up.

## How patterns work

- **A name or pattern without a slash** matches any file or folder with that name, anywhere. `node_modules` skips every `node_modules` folder and everything in it.
- **A pattern with a slash** is a full path. It skips that path and everything under it. `~` means your home folder, as in `~/Downloads/Movies`.

Patterns can use these wildcards:

| Wildcard | Matches |
| --- | --- |
| `*` | Any number of characters, except `/` |
| `?` | Any single character, except `/` |
| `[abc]` | One of the characters listed. `[a-z]` is a range, and `[^abc]` is any character not listed |
| `\` | The next character exactly, so `\*` matches a real `*` |

Patterns are case-sensitive, so `*.MOV` doesn't skip `clip.mov`.

The folders on your list are never skipped themselves, only things inside them.

## Examples

| Pattern | Skips |
| --- | --- |
| `*.iso` | Every disk image |
| `.git` | Every Git folder |
| `Cache*` | Anything whose name starts with `Cache` |
| `~/Library/Caches` | The cache folder in your macOS home folder |
| `~/Videos/*.mov` | `.mov` files directly in `~/Videos`, but not in its subfolders |

## Changing the list

Run `frost init` and change the Skip step, or use `frost config edit`. You can also set the whole list in one command, which replaces what's there:

```sh
frost config set exclude .DS_Store node_modules '*.tmp' '~/Downloads'
```

Put quotes around patterns with `*` or `~` in them, so your shell doesn't expand them first.

To skip something for a single backup:

```sh
frost backup --exclude '*.iso'
```

Skipping something doesn't remove it from snapshots you already have.
