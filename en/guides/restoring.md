# Restoring files

Get files back from any snapshot, into a new folder or over the originals.

The easiest way is the snapshot browser. Run `frost browse`, find what you need, select it with `[space]` and press `[r]`. See [The snapshot browser](#snapshot-browser). This page covers restoring from the command line.

## The restore command

```sh
frost restore <snapshot> [paths...] --beside | --to <dir> | --overwrite
```

- **Snapshot** is which snapshot to restore from. See "Picking a snapshot" below.
- **Paths** are the files or folders to restore, each with everything inside it. Leave them out to restore the whole snapshot.
- **Where** is exactly one of `--beside`, `--to` or `--overwrite`.

For example:

```sh
frost restore latest ~/Documents/taxes --beside
frost restore yesterday ~/notes.txt --to ~/Desktop
frost restore maple-absurd-3f1c --overwrite
```

`frost restore` with nothing after it opens the snapshot browser.

## Picking a snapshot

| You type | You get |
| --- | --- |
| `latest` | The newest snapshot |
| `maple-absurd-3f1c`, or just `maple` | The snapshot with that ID, or the only one whose ID starts with what you typed |
| `3 days ago`, `12h`, `2w`, `1 month ago` | The newest snapshot at or before that time |
| `yesterday`, `today` | The newest snapshot by the end of that day |
| `2026-09-20`, `2026-09-20 14:30` | The newest snapshot at or before that day or minute, in your local time |

Times can use minutes (`m`), hours (`h`), days (`d`), weeks (`w`), months (`mo`) and years (`y`), or the words spelled out. Put quotes around anything with a space in it, like `"3 days ago"`.

`frost status` lists your snapshots and their IDs. If what you typed matches more than one ID, frost asks you to type more of it.

## Where files go

| Flag | Restores into |
| --- | --- |
| `--beside` | A new `frost-restore-<id>` folder next to the originals |
| `--to <dir>` | A new `frost-restore-<id>` folder inside `<dir>`, which must already exist |
| `--overwrite` | The original locations, replacing what's there. frost asks first, and `-y` skips the question |

A new folder never overwrites anything. Inside it, what you restore keeps its own name, laid out from the folder your selection shares:

| You restore | `--beside` gives you |
| --- | --- |
| `~/Documents/taxes` | `~/Documents/frost-restore-<id>/taxes/...` |
| `~/notes.txt` | `~/frost-restore-<id>/notes.txt` |
| `~/Documents/a` and `~/Pictures/b` | `~/frost-restore-<id>/Documents/a` and `~/frost-restore-<id>/Pictures/b` |

The new folder's name uses the snapshot's short ID. If that name is taken, frost adds `-1`, `-2` and so on.

`--beside` doesn't work when your selection only shares the top of a drive, when its folder isn't on this computer (as with a snapshot from another computer), or when you can't write there. For example, restoring a snapshot of your whole home folder beside the original would mean a new folder in `/Users` or `/home`. Use `--to` in those cases.

## Restoring over the originals

`--overwrite` puts files back where they came from and replaces what's there. frost shows what it's about to do and asks first:

```text
┌  restore maple-absurd-3f1c  2026-10-07 03:17 (1d ago)
│
│  paths        /home/you/Documents/taxes
▲  into         original locations (existing files will be replaced)
│
│  Go ahead? [y/N]
```

- Files that already match the snapshot are checked and skipped, so they aren't downloaded again.
- Files that aren't in the snapshot are left alone.
- Each file is written to a hidden temporary file beside it first, then swapped in. You need room for both copies of the file being restored.
- The snapshot has to come from the same kind of computer: macOS and Linux snapshots over macOS or Linux, and Windows snapshots over Windows.
- frost won't restore through a folder link that another user could have changed. If that's the problem, it says so before asking, and the browser greys out "Overwrite original files".

## Safety checks

Every chunk is decrypted and checked against its ID before it's written. Each file only takes its real name once it's complete, so a failed restore never leaves a half-written file where a real one was.

Restored symbolic links keep their original targets, which can point outside the restore folder.

## Interrupted restores

If a restore stops, because of a lost connection, `Ctrl+C` or the computer sleeping, frost prints the command that carries on:

```text
What's restored so far was kept. To carry on from there, run:

  frost restore maple-absurd-3f1c9a0b2e7 /home/you/Documents/taxes --beside
```

It's the same restore with the snapshot's full ID in place of `latest` or a time, so a backup in between doesn't change which snapshot it means. Files already restored are checked and skipped, and the file frost was writing continues from its last good chunk.

Until the restore finishes, its folder holds a `.frost-restore` marker and a `.frost-partial-...` file. Leave them there, and frost removes them when it's done.

To restore after losing your computer, see [Recovering on a new computer](#new-computer).
