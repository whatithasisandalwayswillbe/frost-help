# Local drive

Back up to a folder on a drive: an external USB drive, a second internal disk or a drive in a dock. Everything is encrypted the same as with any other storage, so a lost drive doesn't give your files away.

## In setup

Run `frost init`, choose **Local drive**, and type the full path of a folder on a drive that's connected.

| System | Example |
| --- | --- |
| macOS | `/Volumes/Backup/frost` |
| Linux | `/mnt/backup/frost` or `/media/<you>/Backup/frost` |
| Windows | `E:\frost` |

Setup creates the last folder of the path if it's missing. The folder it goes in, usually the drive itself, has to be there.

## When the drive isn't connected

Frost only creates the folder during setup. If the drive isn't connected when a backup runs, the folder is missing, and the backup fails with a message to connect the drive. It never writes your backups to whatever else is at that path. A scheduled backup waits about 5 minutes for the drive first, in case it's still being mounted.

On Windows, a drive can get a different letter when you plug it in again. Give it back its old letter in Disk Management, or run `frost init` and type the new path.

## Keep a copy somewhere else

A drive next to your computer can be lost, stolen or damaged along with it. Keep another copy of anything irreplaceable somewhere else, like a drive you store away from home or a [self-hosted server](#self-hosted) in another place. [Moving your backups](#moving-backups) shows how to copy a repository.

## Network shares

For a NAS, [Self-hosted](#self-hosted) storage is usually the better choice. A network share mounted on your computer works only where its filesystem can create files safely, which setup checks when it connects. On Windows, use the share's `\\server\share` path rather than a mapped drive letter, because scheduled backups may not see mapped letters.

## Good to know

- Frost doesn't follow links or junctions inside the folder. On Windows it also refuses a folder reached through one. Use the folder's real path.
- On macOS, scheduled backups need permission to use removable and network drives. See [macOS permissions](#macos-permissions).
- `frost status` shows how full the drive is, and `frost backup` warns when it's nearly full.
- Drives formatted as NTFS, APFS, ext4, Btrfs or XFS work. exFAT and FAT drives work where setup's check passes.
