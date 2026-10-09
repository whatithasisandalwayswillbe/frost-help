# Backblaze B2

Back up to a bucket in Backblaze B2, through its S3-compatible API.

> Backblaze's documentation doesn't say whether B2 supports the conditional writes frost needs. Setup tests this when it connects. If the test fails, choose another provider. See [Choosing storage](#choosing-storage).

## Before you start

1. Create a bucket in your Backblaze account.
2. Note its endpoint: Buckets > your bucket > Endpoint. It looks like `s3.us-west-004.backblazeb2.com`.
3. Create an application key: Application Keys > Add a New Application Key. Limit it to this bucket.

## In setup

Run `frost init` and choose **Backblaze B2**.

| Setup asks | Answer |
| --- | --- |
| What's the bucket's endpoint? | The endpoint from the bucket's page, like `s3.us-west-004.backblazeb2.com` |
| What's the bucket called? | Its name, exactly as you created it |
| Paste the application key's keyID. | The keyID of your new application key |
| Paste the applicationKey. | Shown once, right after you create the key |

frost works out the region from the endpoint, and keeps your backups in a `frost` folder inside the bucket.

## Good to know

Don't add lifecycle rules that delete objects in frost's folder. Snapshots share chunks, so removing one object can break many snapshots.
