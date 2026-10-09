# Cloudflare R2

Back up to a bucket in Cloudflare R2. R2 supports the conditional writes frost needs.

## Before you start

1. In the Cloudflare dashboard, create an R2 bucket.
2. Note your account ID. It's on the R2 overview page, 32 letters and numbers.
3. Create an API token: R2 > Manage R2 API Tokens > Create API token, with Object Read & Write permission. Limit it to your bucket if you can.

## In setup

Run `frost init` and choose **Cloudflare R2**.

| Setup asks | Answer |
| --- | --- |
| What's your Cloudflare account ID? | The 32-character ID from the R2 overview page |
| What's the bucket called? | Its name, exactly as you created it |
| Paste the Access Key ID. | The Access Key ID from your new API token |
| Paste the Secret Access Key. | Shown once, next to the Access Key ID |

frost connects to `<account-id>.r2.cloudflarestorage.com` with the region `auto`, and keeps your backups in a `frost` folder inside the bucket.

## Good to know

Don't add lifecycle rules that delete or expire objects in frost's folder. Snapshots share chunks, so removing one object can break many snapshots.
