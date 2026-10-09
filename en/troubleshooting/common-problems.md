# Common problems

This page covers the messages and problems people run into most. Each heading is what frost says, or what you notice.

## "frost isn't set up yet, run `frost init`"

frost can't find `config.toml`. Run `frost init`. If you use `--config-dir` or `FROST_CONFIG_DIR`, check it points at the right folder.

## "no key on this machine"

The key file is missing. If this computer already has storage set up, run `frost key import` and type your recovery phrase. Otherwise, run `frost init`.

## "a backup or restore is already running"

Another frost process is using your backups, usually a scheduled backup. Wait for it to finish and try again. Deleting frost's lock file doesn't stop the other process.

## "the key on this machine doesn't match"

Your storage holds backups made with a different key. Run `frost key verify` and type the phrase you wrote down to see which key it is. If it's the right one, run `frost key import` with it.

## frost can't find your backups

Messages like "has no frost repository" mean your backups aren't where frost is looking. The error says where they were last opened and how to get back to them. See [Moving your backups](#moving-backups).

## Setup can't connect

Setup explains the problem and goes back to the answer most likely to blame.

| Setup says | Check |
| --- | --- |
| That access key ID wasn't recognised | You copied the whole access key ID |
| The secret key doesn't match the access key ID | You copied the whole secret, and it belongs to that key ID |
| There's no bucket with that name | The bucket's name, or create the bucket first |
| That key doesn't have the bucket permissions frost needs | The key can read, list, write and delete objects in the bucket |
| The bucket is in a different region | The region or endpoint |
| Can't find ... | The address, and your internet connection |
| Nothing answered at that address | The address and port |
| The server's certificate isn't valid for that address | The address, and that the server's certificate covers it |
| the storage didn't answer in time | Your internet connection, then try again |

## "This storage doesn't support conditional writes"

Your provider doesn't support a feature frost needs to keep computers from overwriting each other's backup records. Different keys or settings won't fix it. Choose another provider. See [Choosing storage](#choosing-storage).

## "the Permafrost access key was rejected"

The key may be wrong or expired. Run `frost init` and set up storage again to get a working one. See [Permafrost](#permafrost).

## A backup can't read a folder

On macOS, this is usually a privacy permission. The error says what to allow. See [macOS permissions](#macos-permissions). On other systems, check that your user can read the folder.

## Files listed as "couldn't be read"

frost skipped those files and saved the rest. Common causes are files you don't have permission to read, files deleted during the backup, and, on macOS, files that iCloud keeps only online.

## Files that "kept changing while they were read"

A program was writing to those files during the backup, so the snapshot kept their previous copy. Close the program and back up again, or let the next backup pick them up.

## A folder is "not found"

A folder on your list wasn't there, so frost backed up the rest. Plug the drive back in, or if the folder moved, update your list with `frost init`.

## "scheduled job is missing"

The scheduled job was deleted or switched off. Put it back with `frost config set schedule.enabled true`.

## Scheduled backups don't run

- Check the "next backup" row in `frost status`.
- On macOS, check frost's switch in System Settings > General > Login Items & Extensions. It's listed as Node.js Foundation.
- On Windows, scheduled backups need you to be signed in, and don't run on battery power.
- With cron or Task Scheduler, a backup due while the computer was off or asleep is skipped.
- Read the log. See [Automatic backups](#scheduling).

## "verification failed"

A spot check found missing or damaged data in your storage. See [Checking your backups](#checking-backups).

## "can't restore beside the originals"

The folder next to the originals isn't usable, often because the snapshot came from another computer. Use `--to <dir>` instead. See [Restoring files](#restoring).

## "can't overwrite the originals"

The snapshot came from a different kind of computer, or the path to the originals goes through a link frost doesn't trust. Use `--beside` or `--to <dir>` instead.

## frost can't find the snapshot you asked for

| frost says | Try |
| --- | --- |
| no snapshot at or before ... | A later time. The message shows your oldest snapshot |
| "maple" matches 2 snapshots, use more of the ID | More of the ID, like `maple-absurd` |
| can't read "..." as a snapshot ID or time | Quotes around times with spaces, like `"3 days ago"` |

## frost can't update itself

frost was installed by a package manager, its folder isn't writable, or it was built from source. See [Updating frost](#updating).

## The installer stops

| The installer says | What to do |
| --- | --- |
| need OpenSSH 8.1+ to verify the frost release signature | Install or update OpenSSH. On Windows, Git for Windows includes it |
| checksums.txt isn't signed by the frost release key. Don't install this. | Don't install it. Try again later, and [report it](#getting-help) if it keeps happening |
| checksum mismatch | The download was damaged. Run the installer again |
| 32-bit ARM isn't supported by the bundled runtime | There's no frost package for this computer |
