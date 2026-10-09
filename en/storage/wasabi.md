# Wasabi

Back up to a bucket in Wasabi.

> Wasabi's documentation doesn't establish whether it supports the conditional writes frost needs. Setup tests this when it connects. If the test fails, choose another provider. See [Choosing storage](#choosing-storage).

## Before you start

1. Create a bucket in the Wasabi console, and note its region, like `us-east-1` or `eu-central-1`.
2. Create an access key: Access Keys > Create New Access Key. If you can, use a user whose access is limited to this bucket.

## In setup

Run `frost init` and choose **Wasabi**.

| Setup asks | Answer |
| --- | --- |
| Which region is the bucket in? | The bucket's region, like `us-east-1` |
| What's the bucket called? | Its name, exactly as you created it |
| Paste the access key. | The access key you created |
| Paste the secret key. | Shown once, when you create the key |

frost connects to `s3.<region>.wasabisys.com`, and keeps your backups in a `frost` folder inside the bucket.

## Good to know

Don't add lifecycle rules that delete objects in frost's folder. Snapshots share chunks, so removing one object can break many snapshots.
