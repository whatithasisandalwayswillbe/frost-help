# Choosing storage

frost stores your backups on Permafrost, or with any S3-compatible provider that supports conditional writes. Either way, everything is encrypted before it leaves your computer, so your provider can't read it.

## Your options

- **[Permafrost](#permafrost)** is hosted storage made for frost. It needs one access key, and there's no bucket, region or endpoint to set up.
- **S3-compatible storage** works with a bucket you create at a provider like [Amazon S3](#amazon-s3), [Cloudflare R2](#cloudflare-r2), [Backblaze B2](#backblaze-b2) or [Wasabi](#wasabi), or on a server you run yourself, like [MinIO](#other-s3).

## Conditional writes

frost needs storage that supports atomic conditional writes (`If-None-Match: *`). They stop two computers from overwriting each other's backup records. Setup tests this when it connects, and refuses storage that fails. Different keys or settings can't fix a provider that doesn't support them.

| Provider | Conditional writes |
| --- | --- |
| Permafrost | Supported |
| Amazon S3 | [Documented](https://docs.aws.amazon.com/AmazonS3/latest/userguide/conditional-writes.html) |
| Cloudflare R2 | [Documented](https://developers.cloudflare.com/r2/api/s3/api/) |
| MinIO | Built into the server. Your version must pass setup's check |
| Backblaze B2 | Unverified. Its [upload reference](https://www.backblaze.com/apidocs/s3-put-object) doesn't list `If-None-Match` |
| Wasabi | Unverified. Its [API reference](https://docs.wasabi.com/apidocs/operations-on-objects) doesn't establish support |
| Garage | Not supported, according to its maintainer |

These were checked against each provider's documentation and source code on 2 October 2026, without live tests. Setup's own check is what decides.

## Things to weigh

- **Cost to restore.** Some providers charge for downloads. A full restore downloads everything, and each spot check downloads a small sample.
- **Archive storage classes.** frost reads chunks back directly, so don't move its objects to an archive class that has to be thawed before reading.
- **Deleting and expiring.** frost never deletes your backups. Don't add lifecycle rules that delete or expire objects in its folder, because snapshots share chunks.
- **Limited keys.** Give frost an access key that only reaches its own bucket.

## Changing storage later

You can move your backups to another provider without uploading everything again. See [Moving your backups](#moving-backups).
