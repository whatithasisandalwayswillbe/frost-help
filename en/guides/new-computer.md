# Recovering on a new computer

If your computer is lost, broken or replaced, you can get your files back on another one.

## What you need

- Your 24-word recovery phrase.
- The details of your storage: your Permafrost access key, or your S3 provider's bucket name and access keys.

If you still have the old computer, `frost key show` prints the phrase.

## Steps

1. [Install frost](#installing) on the new computer.
2. Run `frost init` and choose the same storage, with the same details as before.
3. Setup finds your backups and asks for their recovery phrase. Type all 24 words.
4. Choose the folders to back up on this computer, the skip list and the schedule, then review and save.
5. Restore your files, before this computer's first backup:

```sh
frost restore latest --to ~
```

This restores your newest snapshot into a new `frost-restore-<id>` folder in your home folder, laid out like the original folders. If both computers are the same kind, you can restore part of it by adding paths as they were on the old computer, like `/Users/you/Documents`.

To pick what to restore from a different kind of computer, like a Mac snapshot on Windows, use the snapshot browser. Run `frost browse`, select what you want and press `[r]`, then choose "New folder elsewhere".

Use `--to` rather than `--beside` or `--overwrite`. `--beside` needs the original folders to exist on this computer, and `--overwrite` needs a snapshot from the same kind of computer, macOS and Linux or Windows.

> Restore before this computer runs its first backup. Afterwards, `latest` means this computer's own newest snapshot. If that's already happened, run `frost status` to find your old snapshot's ID, and restore that instead.

## Two computers, one storage

Two computers can back up to the same storage with the same recovery phrase. Their snapshots share one list, and data both computers have is stored once.

`latest` then means the newest snapshot from either computer. In the snapshot browser, the details panel shows which computer took each snapshot. To restore one computer's files, pick its snapshot by ID.

## If you've lost the phrase

If the old computer still works, run `frost key show` on it. If both the phrase and the computer are gone, nobody can decrypt your backups. See [Your recovery phrase](#recovery-phrase).
