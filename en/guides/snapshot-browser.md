# The snapshot browser

`frost browse` opens a full-screen browser for your snapshots. You can walk through your files as they were, compare snapshots and restore what you pick.

```sh
frost browse
```

`frost restore` with nothing after it opens the browser too. A scheduled backup can run while the browser is open.

## Moving around

| Key | Does |
| --- | --- |
| `[↑]` `[↓]` or `[k]` `[j]` | Move |
| `[pgup]` `[pgdn]` | Move a page at a time |
| `[g]` `[G]` | Jump to the top or the bottom |
| `[enter]` | Open |
| `[esc]` | Go back, or dismiss an error |
| `[h]` | Show every key |
| `[s]` | Show your settings |
| `[v]` | Show or hide your key's fingerprint |
| `[q]` | Quit |

The settings screen is read-only. Change settings with `frost config set` or `frost config edit`.

## Home

The home screen shows your last backup and the latest health check. Press `[enter]` to browse your snapshots, or `[r]` to refresh.

## Snapshots

Snapshots are listed newest first, grouped by date. In a wide window, a panel beside the list shows the highlighted snapshot's details: when it was taken, on which computer, how many files it holds, its size and how much new data it added.

| Key | Does |
| --- | --- |
| `[enter]` | Open the snapshot's files |
| `[d]` | Compare it with the snapshot before it |
| `[m]` | Mark it. Then press `[d]` on another snapshot to compare the two |

A comparison lists what was added, removed and modified between the two snapshots.

## Files

You see your folders and files exactly as they were in that snapshot.

| Key | Does |
| --- | --- |
| `[enter]` | Open a folder |
| `[←]` | Go up to the parent folder |
| `[space]` | Select or unselect |
| `[a]` | Select or unselect everything in this folder |
| `[c]` | Clear the selection |
| `[r]` | Restore the selection, or the highlighted item if nothing's selected |

## Restoring

After `[r]`, choose where the files go:

| Key | Option | Does |
| --- | --- | --- |
| `[1]` | New folder beside originals | Restores into a new folder next to the originals, like `frost restore --beside` |
| `[2]` | New folder elsewhere | Lets you pick a folder, then restores into a new folder inside it |
| `[3]` | Overwrite original files | Replaces the originals, like `frost restore --overwrite`. Press `[y]` to confirm |

Before anything is written, frost shows where everything will land. Press `[enter]` to restore, `[c]` to change the folder or `[esc]` to cancel. Long confirmations and results scroll with `[pgup]` and `[pgdn]`.

"New folder elsewhere" opens your system's folder picker: Finder on macOS, Explorer on Windows, and zenity, qarma or matedialog on Linux. Over SSH, or on Linux without a picker, you type the folder instead. Press `[t]` while the picker is open to type it anyway.

When a restore finishes, frost shows what it restored in Finder, Explorer or your Linux file manager. A single file is shown selected on macOS and Windows; on Linux, its folder opens. Otherwise the deepest folder holding everything restored opens. Nothing opens over SSH, without a display, or when the restore fails.

[Restoring files](#restoring) explains each option in detail, and what happens when a restore is interrupted.
