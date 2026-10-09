# How frost works

frost takes snapshots of your folders, splits your files into encrypted chunks and uploads only the chunks your storage doesn't have yet.

## The short version

1. **Scan.** frost walks your folders and skips anything on your skip list. Files whose size and modification time haven't changed since the last backup aren't read again while frost's cache still lists all their chunks.
2. **Chunk.** Changed files are split into chunks of about 1 MiB, at points chosen by their content. An edit in the middle of a big file only changes the chunks around it.
3. **Encrypt.** Each new chunk is compressed when that makes it smaller, then encrypted with your key.
4. **Upload.** Only chunks that aren't in storage already are uploaded.
5. **Save a snapshot.** frost saves the list of files, and which chunks each one is made of, as a new snapshot.
6. **Check.** frost downloads a random sample of chunks and checks them.

## Snapshots

A snapshot is a record of your folders at the moment a backup ran: every file and folder, with its contents, permissions and modification time. Each snapshot is complete on its own, so you can restore any one of them without the others.

Snapshots share chunks. A file that hasn't changed in a year is stored once, however many snapshots include it, so keeping many snapshots takes little extra space.

If nothing changed since the last backup, frost doesn't save a new snapshot. It tells you your folders are already backed up.

Snapshot IDs look like `maple-absurd-3f1c`: two words and four more characters. [Restoring files](#restoring) explains how to pick a snapshot by ID or by time.

> frost can't delete old snapshots yet, so every snapshot stays in storage. Don't delete objects from frost's folder in your storage by hand, and don't add rules that expire them. Snapshots share chunks, so removing one object can break many snapshots.

## Your key

`frost init` creates a random 256-bit key on your computer and shows it to you as a 24-word recovery phrase. The key never leaves your computer. Everything frost uploads is encrypted with it first, including file names and folder structure.

Anyone with the phrase and access to your storage can read your backups. Without the phrase, nobody can. See [Your recovery phrase](#recovery-phrase).

## The repository

frost keeps your backups in one folder in your storage, called the repository. It holds four kinds of object:

| Object | Holds |
| --- | --- |
| `frost.repo` | The repository's ID and format version |
| `chunks/` | Your file data and file lists, encrypted |
| `snapshots/` | A small encrypted header for each snapshot: when it was taken, on which computer and of which folders |
| `trees/` | Which chunks hold each snapshot's file list |

Object names are random-looking IDs, so your provider never sees your file names. [Security and privacy](#security) lists what a provider can see.

## The local cache

frost keeps a record of what it has uploaded in a cache folder on your computer, so a backup doesn't have to list everything in your storage each time. It checks that record against your storage once a week, when the storage location changes or after a check finds missing data.

The cache is disposable. If it's lost, the next backup rebuilds it from your storage and reads your files again. Restores don't need it at all.

## No background service

frost doesn't run in the background. Automatic backups are ordinary jobs in your operating system's scheduler (launchd, systemd, cron or Task Scheduler), which start frost, run one backup and exit. See [Automatic backups](#scheduling).

## Checking itself

After each backup that saves a snapshot, frost downloads a random sample of chunks and checks each one decrypts and matches its ID. A backup with nothing new repeats the check once the last one is more than a day old. See [Checking your backups](#checking-backups).
