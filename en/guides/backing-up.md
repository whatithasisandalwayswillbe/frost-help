# Backing up

`frost backup` backs up your folders now. Only what changed since the last backup is uploaded.

## Run a backup

```sh
frost backup
```

frost shows what changed, how much it uploaded and the result of its spot check:

```text
┌  backup  s3://my-backups/frost/
│
│  changes      3 added, 1 changed
│  files        1,204 (2.1 GB)
│  new data     14.2 MB in 9 chunks (9.8 MB uploaded after compression)
│  verified     ok, 21 random objects re-downloaded and checked
│
└  Saved snapshot maple-absurd-3f1c
```

A file counts as changed when its contents, size, permissions or modification time change. A folder's modification time alone doesn't count, because temporary files change it all the time.

If nothing changed, frost doesn't save a new snapshot:

```text
┌  backup  s3://my-backups/frost/
│
│  files        1,204 (2.1 GB)
│  verified     ok 3h ago, 21 objects checked
│
└  Already backed up. Nothing has changed since snapshot maple-absurd-3f1c, saved 3h ago.
```

With automatic backups on, you rarely need to run this yourself. See [Automatic backups](#scheduling).

## Preview a backup

```sh
frost backup --dry-run
```

A dry run lists every file with new data to upload and the total, without uploading anything or saving a snapshot. `-n` is short for `--dry-run`.

## Options

| Flag | Does |
| --- | --- |
| `-n`, `--dry-run` | Shows what would be uploaded, without uploading anything |
| `--path <dir>` | Backs up this folder instead of your usual ones. Repeat it for more folders |
| `--exclude <pattern>` | Also skips this pattern, for this run only. Repeat it for more patterns |
| `--no-verify` | Skips the spot check after the backup |

To change which folders are backed up every time, run `frost init` again, or see [Settings](#settings).

## What's backed up

frost backs up regular files, folders and symbolic links, with their permissions and modification times.

- A symbolic link is saved as the link itself, not the file it points to.
- Hard-linked files are backed up and restored as separate files.

frost leaves out:

- Anything on your skip list. See [Excluding files](#excluding-files).
- Sockets, devices and pipes.
- File owners, ACLs and extended attributes.
- On macOS, files that iCloud keeps only online. frost doesn't download them. They're skipped and listed instead.
- The `.frost-partial-...` files that a stopped restore leaves behind.

## When something goes wrong

| What happens | What frost does |
| --- | --- |
| A file or folder can't be read, because of permissions, because it was deleted mid-backup or because it's only in iCloud | Skips it and lists it. The snapshot is still saved, and `frost status` shows how many items were skipped |
| A folder on your list isn't there, like one on an unplugged drive | Skips it and backs up the rest. `frost backup` and `frost status` name the missing folder |
| None of your folders are there, or one exists but can't be read at all | Fails the whole backup, so a backup never looks fine while saving nothing |
| A file changes while frost reads it, like a database in use, a running virtual machine's disk or a download | Reads it again at the end of the backup. If it's still changing, the snapshot keeps its previous copy and frost lists it. A file that was never backed up cleanly is skipped |

frost doesn't take filesystem or database snapshots. To back up a file that's always busy, back it up while the program using it is closed.

On macOS, some folders need your permission before frost can read them. See [macOS permissions](#macos-permissions).

## The spot check

After a backup that saves a snapshot, frost downloads a few random chunks, 20 by default, and checks them. After a backup with nothing new, it only checks again if the last check is more than a day old or found a problem. If a check fails, the backup reports an error. See [Checking your backups](#checking-backups).

## Interrupted backups

If a backup stops partway, because of a lost connection, a closed laptop or `Ctrl+C`, nothing already uploaded is wasted. frost records chunks as they upload, and the next backup skips them.

## One at a time

A backup or command-line restore locks its local cache while it runs. If another command needs that cache, frost says "a backup or restore is already running, try again when it's done". The snapshot browser releases the cache lock, so it can stay open and restore while a backup runs. Different cache folders and computers have separate locks.
