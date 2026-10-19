# Choosing storage

frost can keep your backups on your own server, on a drive, on Permafrost or with an S3-compatible service. Wherever they go, everything is encrypted on your computer first, so whoever runs the storage can't read your files.

## Your options

| Storage | Good for | What you need |
| --- | --- | --- |
| [Self-hosted](#self-hosted) | A NAS, home server or VPS you run | SSH access to it |
| [Local drive](#local-drive) | A USB drive or a second disk | A drive that's connected when backups run |
| [Permafrost](#permafrost) | Hosted storage made for frost | One access key |
| [Cloud providers](#cloud-providers) | Amazon S3, Cloudflare R2, Backblaze B2 or Wasabi | A bucket and its keys |
| [Other S3-compatible storage](#other-s3) | An S3 server you run, like Ceph or SeaweedFS, or another S3 service | A bucket and its keys |

Self-hosted and local drive storage keep your backups on hardware you control, with no account anywhere. Permafrost and cloud providers keep them away from home, with no machine of your own to look after.

## Conditional writes

frost needs storage that can create a file only when its name is free, in one step. That stops two computers from overwriting each other's backup records. Setup tests this when it connects, and refuses storage that fails. Different keys or settings can't fix storage that doesn't support it.

| Storage | Conditional writes |
| --- | --- |
| Self-hosted | Supported by OpenSSH servers, on filesystems with hard links, like ext4, Btrfs, XFS, ZFS, APFS and NTFS |
| Local drive | Supported on NTFS, APFS, ext4, Btrfs and XFS. Other filesystems must pass setup's check |
| Permafrost | Supported |
| Amazon S3 | [Documented](https://docs.aws.amazon.com/AmazonS3/latest/userguide/conditional-writes.html) |
| Cloudflare R2 | [Documented](https://developers.cloudflare.com/r2/api/s3/api/) |
| Ceph | Built into the server. Your version must pass setup's check |
| SeaweedFS | [Documented](https://github.com/seaweedfs/seaweedfs/wiki/S3-Conditional-Operations). Your version must pass setup's check |
| MinIO | Built into the server, which is no longer maintained. Your version must pass setup's check |
| Backblaze B2 | Unverified. Its [upload reference](https://www.backblaze.com/apidocs/s3-put-object) doesn't list `If-None-Match` |
| Wasabi | Unverified. Its [API reference](https://docs.wasabi.com/apidocs/operations-on-objects) doesn't establish support |
| Garage | Not supported, according to its maintainer |

The S3 entries were checked against each project's documentation and source code in October 2026, without live tests. Setup's own check is what decides.

## Things to weigh

- **A copy away from home.** A drive or server at home can be lost in the same fire or break-in as your computer. A server somewhere else, Permafrost or a cloud provider isn't. For anything irreplaceable, keep a second, independent copy in another place.
- **Cost to restore.** Some cloud providers charge for downloads. A full restore downloads everything, and each spot check downloads a small sample.
- **Archive storage classes.** frost reads chunks back directly, so don't move its objects to an archive class that has to be thawed before reading.
- **Deleting and expiring.** frost never deletes your backups. Don't add lifecycle rules or cleanup jobs that delete or expire files in its folder, because snapshots share chunks.
- **Limited access.** Give frost an access key that only reaches its own bucket, or a server account that can't change anything else you care about.

## Changing storage later

You can move your backups to another kind of storage without uploading everything again. See [Moving your backups](#moving-backups).
