# Common problems

This page covers the messages and problems people run into most. Each heading is what Frost says, or what you notice.

## "Frost isn't set up yet, run `frost init`"

Frost can't find `config.toml`. Run `frost init`. If you use `--config-dir` or `FROST_CONFIG_DIR`, check it points at the right folder.

## "no key on this machine"

The key file is missing. If this computer already has storage set up, run `frost key import` and type your recovery phrase. Otherwise, run `frost init`.

## "a backup or restore operation is already in progress"

Another Frost process is using your backups, usually a scheduled backup. When it is one, Frost says "a scheduled backup is already running" and when it started. Wait for it to finish and try again. Deleting Frost's lock file doesn't stop the other process.

## "the local encryption key does not match"

Your storage holds backups made with a different key. Run `frost key verify` and type the phrase you wrote down to see which key it is. If it's the right one, run `frost key import` with it.

## Frost can't find your backups

Messages like "has no Frost repository" mean your backups aren't where Frost is looking. The error says where they were last opened and how to get back to them. See [Moving your backups](#moving-backups).

If your backups are gone from Permafrost while your access key still works, they were most likely deleted using that key. Email care@getfro.st straight away. If someone else might have your key, get a new one at [getfro.st/perma/recover](https://getfro.st/perma/recover).

## Setup can't connect

Setup explains the problem and goes back to the answer most likely to blame.

| Setup says | Check |
| --- | --- |
| Access key ID not recognized | You copied the whole access key ID |
| The secret key does not match the access key ID | You copied the whole secret, and it belongs to that key ID |
| No bucket found with that name | The bucket's name, or create the bucket first |
| The provided key lacks necessary bucket permissions | The key can read, list, write and delete objects in the bucket |
| The bucket is located in a different region | The region or endpoint |
| Cannot resolve ... | The address, and your internet connection |
| No response from that address | The address and port |
| The server's TLS certificate is not valid for that address | The address, and that the server's certificate covers it |
| the storage host timed out | Your internet connection, then try again |
| cannot reach Permafrost | Your internet connection, then try again |
| Cannot locate the server | The SSH address, and your network |
| The server did not respond | The SSH address, and that the server is on |
| That server does not support SFTP | SFTP is turned on in the server's SSH or file service settings |
| server returned text before opening SFTP subsystem | A login script on the server, like `.bashrc`, prints something. Make it print only in interactive shells |
| There's no folder ... on ... | The folder's path. The folder it goes in has to exist |
| The server denied write access to that folder | The folder's permissions, for the account Frost logs in as |
| ... not found. Connect the required drive and try again | The drive is connected, and the path is right |
| Unable to write to that folder | The folder's permissions. On macOS, see [macOS permissions](#macos-permissions) |
| Symbolic links and directory junctions are not supported for backup folders | Use the folder's real path |
| That drive is read-only | Use a drive you can write to |

## "This storage provider does not support conditional writes"

Your storage doesn't support a feature Frost needs to keep computers from overwriting each other's backup records. Different keys or settings won't fix it. Choose other storage. See [Choosing storage](#choosing-storage).

A self-hosted server or a drive says it differently. The server "cannot create hard links", or the folder is "on an unsupported filesystem". Use a folder on a filesystem like ext4, Btrfs, XFS, ZFS, APFS or NTFS.

## "the server didn't accept Frost's SSH key"

Your self-hosted server refused Frost's key, for example after the key was removed from `authorized_keys`. Run `frost init` and add the key again. See [Self-hosted](#self-hosted).

## "the server's SSH host key has changed"

Frost refuses to connect when the server's identity changes, the same as ssh does. If you reinstalled the server or it got a new address, remove its old key with `ssh-keygen -R <host>` and run `frost init` again. Otherwise, find out why the key changed before you connect.

## "... not found. Connect the required drive and try again"

Your backups are on a drive that isn't connected, or the folder's path changed. Connect the drive. If Windows gave it another letter, see [Local drive](#local-drive).

## "the Permafrost access key was rejected"

The message goes on with Permafrost's reason: the key is wrong, a newer key replaced it, or the account closed. Use your newest key, or get a new one. See [Permafrost](#permafrost).

## "uploads are paused"

Permafrost isn't accepting new backups for your account right now. The message says why and until when, and restores keep working. See [Permafrost](#permafrost).

## A backup can't read a folder

On macOS, this is usually a privacy permission. The error says what to allow. See [macOS permissions](#macos-permissions). On other systems, check that your user can read the folder.

## Files listed as "couldn't be read"

Frost skipped those files and saved the rest. Common causes are files you don't have permission to read, files deleted during the backup, and, on macOS, files that iCloud keeps only online.

## Files that "continued changing while being read"

A program was writing to those files during the backup, so the snapshot kept their previous copy. Close the program and back up again, or let the next backup pick them up.

## A folder is "not found"

A folder on your list wasn't there, so Frost backed up the rest. Plug the drive back in, or if the folder moved, update your list with `frost init`.

## "config.toml changed, but updating the scheduled job failed"

You edited `config.toml`, and Frost couldn't update the scheduled job to match. The rest of the message says why. If it names a setting, fix it in `config.toml`. Frost tries again with every command until it works.

## "config.toml changed where backups go"

You changed where backups go in `config.toml`, and Frost found a problem with the new location the first time it used it. The rest of the message says what. See [Moving your backups](#moving-backups).

## "scheduled job is missing"

The scheduled job was deleted or switched off. Put it back with `frost config set schedule.enabled true`.

## Scheduled backups don't run

- Check the "next backup" row in `frost status`.
- On macOS, check Frost's switch in System Settings > General > Login Items & Extensions. It's listed as Node.js Foundation.
- On Windows, scheduled backups need you to be signed in, and don't run on battery power.
- With `schedule.catch_up` set to `false`, a backup due while the computer was off or asleep is skipped.
- Read the log. See [Automatic backups](#scheduling).

## "verification failed"

A spot check found missing or damaged data in your storage. See [Checking your backups](#checking-backups).

## "cannot restore alongside original files"

The folder next to the originals isn't usable, often because the snapshot came from another computer. Use `--to <dir>` instead. See [Restoring files](#restoring).

## "cannot overwrite original files"

The snapshot came from a different kind of computer, or the path to the originals goes through a link Frost doesn't trust. Use `--beside` or `--to <dir>` instead.

## Restore says a file "changed after it was checked" or "has more than one link"

Frost found that a checked file changed, or that an unfinished restore file has a hardlink to another name. Stop programs that are changing the restore folder and retry. If an unfinished restore file is hardlinked, restore into a new empty folder instead.

## Frost can't find the snapshot you asked for

| Frost says | Try |
| --- | --- |
| no snapshot at or before ... | A later time. The message shows your oldest snapshot |
| "maple" matches 2 snapshots; provide additional ID characters | More of the ID, like `maple-absurd` |
| cannot parse "..." as a snapshot ID or timestamp | Quotes around times with spaces, like `"3 days ago"` |

## Frost can't update itself

Frost's folder isn't writable, or Frost was built from source. See [Updating Frost](#updating).

## The installer stops

| The installer says | What to do |
| --- | --- |
| need OpenSSH 8.1+ to verify the Frost release signature | Install or update OpenSSH. On Windows, use the PowerShell installer instead |
| checksums.txt signature does not match official Frost release key; installation aborted | Don't install it. Try again later, and [report it](#getting-help) if it keeps happening |
| runtime inside ... lacks valid OpenJS Foundation signature; installation aborted | Don't install it. Try again later, and [report it](#getting-help) if it keeps happening |
| checksum mismatch | The download was damaged. Run the installer again |
| 32-bit ARM isn't supported by the bundled runtime | There's no Frost package for this computer |
| installing Frost requires Node.js v22 or newer | Update Node.js, or use the installer instead of npm or pnpm |

## `frost` isn't found after installing

Open a new terminal. Terminals that were open while Frost installed don't see the new `PATH`. With pnpm, run `pnpm setup` once, then open a new terminal.
