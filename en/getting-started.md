# Getting started

frost backs up your folders to storage you choose, and encrypts everything on your computer before it's uploaded. This page takes you from installing frost to your first backup.

## What you need

- A Mac, Linux or Windows computer with a 64-bit Intel, AMD or ARM processor.
- Somewhere to keep your backups: a [Permafrost](#permafrost) access key, or a bucket with an [S3-compatible provider](#choosing-storage).
- A terminal window at least 56 columns wide and 18 rows tall, for the full-screen setup.

You don't need to install Node.js or anything else first. frost brings its own runtime.

## 1. Install frost

On macOS or Linux, run this in a terminal. On Windows, run it in Git Bash.

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | sh
```

The installer checks the release's signature before it installs anything. [Installing frost](#installing) covers manual installs and installer options.

## 2. Set it up

```sh
frost init
```

Setup asks one thing per screen:

1. **Storage.** Where your backups go. Pick Permafrost or an S3-compatible provider, and paste the keys it asks for.
2. **Folders.** The folders to back up, like `~/Documents`.
3. **Skip.** Files and folders to leave out. A few common ones, like `node_modules`, are filled in already.
4. **Schedule.** How often frost backs up on its own, or off.
5. **Recovery phrase.** 24 words that unlock your backups. Write them down.
6. **Review.** Check everything, then press `[s]` to save.

> Your recovery phrase is the only way to read your backups if this computer is lost. Nobody can recover it for you, not your storage provider and not the frost authors.

[Setting up frost](#setting-up) explains each screen.

## 3. Back up

Preview what the first backup will upload:

```sh
frost backup --dry-run
```

Then run it:

```sh
frost backup
```

The first backup uploads everything. Later backups only upload what changed. If you turned on the schedule, frost now backs up on its own and you don't need to run anything.

## 4. Check on it

```sh
frost status
```

`status` shows the last backup, when the next one runs, the latest health check and your recent snapshots.

## Getting files back

Open the snapshot browser, find what you need, select it with `[space]` and press `[r]`:

```sh
frost browse
```

Or restore from the command line. This puts a copy of the file in a new folder next to the original:

```sh
frost restore latest ~/Documents/report.pdf --beside
```

[Restoring files](#restoring) covers both.

## Next steps

- [How frost works](#how-it-works) explains snapshots, encryption and what gets uploaded.
- [Automatic backups](#scheduling) covers the schedule.
- [Your recovery phrase](#recovery-phrase) explains how to keep your key safe.
