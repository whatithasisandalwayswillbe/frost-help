# Cloud providers

Setup has presets for four cloud providers that speak the S3 protocol. Run `frost init`, choose **S3-compatible**, then pick yours. For any other S3 service, or an S3 server you run yourself, see [Other S3-compatible storage](#other-s3).

Each preset keeps your backups in a `frost` folder inside the bucket, so the bucket can hold other things too. Give frost a key that only reaches that bucket, and don't add lifecycle rules that delete, expire or archive objects in its folder. Snapshots share chunks, so removing one object can break many snapshots.

## Amazon S3

S3 supports the conditional writes frost needs.

1. Create a bucket in the AWS console, and note its region, like `us-east-1`.
2. Create an IAM user for frost and an access key for it: IAM > Users > your user > Security credentials > Create access key.

frost needs to read, list, write and delete objects in the bucket, although the only object it deletes is the small test object setup creates when it connects. A policy like this one is enough. Replace `my-backups` with your bucket's name:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::my-backups"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::my-backups/*"
    }
  ]
}
```

| Setup asks | Answer |
| --- | --- |
| Which region hosts the bucket? | The bucket's region, like `us-east-1` |
| What is the bucket name? | Its name, exactly as you created it |
| Paste the Access Key ID. | The access key ID from IAM |
| Paste the Secret Access Key. | Shown once, next to the access key ID when you create it |

frost connects to `s3.<region>.amazonaws.com`. Keep its objects in a storage class that can be read straight away, like S3 Standard or S3 Standard-IA, not Glacier Flexible Retrieval or Glacier Deep Archive. Bucket versioning isn't needed.

## Cloudflare R2

R2 supports the conditional writes frost needs.

1. In the Cloudflare dashboard, create an R2 bucket.
2. Note your account ID. It's on the R2 overview page, 32 letters and numbers.
3. Create an API token: R2 > Manage R2 API Tokens > Create API token, with Object Read & Write permission. Limit it to your bucket if you can.

| Setup asks | Answer |
| --- | --- |
| What is your Cloudflare Account ID? | The 32-character ID from the R2 overview page |
| What is the bucket name? | Its name, exactly as you created it |
| Paste the Access Key ID. | The Access Key ID from your new API token |
| Paste the Secret Access Key. | Shown once, next to the Access Key ID |

frost connects to `<account-id>.r2.cloudflarestorage.com` with the region `auto`.

## Backblaze B2

Backblaze's documentation doesn't say whether B2 supports the conditional writes frost needs. Setup tests this when it connects. If the test fails, choose other storage.

1. Create a bucket in your Backblaze account.
2. Note its endpoint: Buckets > your bucket > Endpoint. It looks like `s3.us-west-004.backblazeb2.com`.
3. Create an application key: Application Keys > Add a New Application Key. Restrict access to this bucket.

| Setup asks | Answer |
| --- | --- |
| What is the bucket endpoint? | The endpoint from the bucket's page, like `s3.us-west-004.backblazeb2.com` |
| What is the bucket name? | Its name, exactly as you created it |
| Paste the application key's keyID. | The keyID of your new application key |
| Paste the applicationKey. | Shown once, right after you create the key |

frost works out the region from the endpoint.

## Wasabi

Wasabi's documentation doesn't establish whether it supports the conditional writes frost needs. Setup tests this when it connects. If the test fails, choose other storage.

1. Create a bucket in the Wasabi console, and note its region, like `us-east-1` or `eu-central-1`.
2. Create an access key: Access Keys > Create New Access Key. If you can, use a user whose access is limited to this bucket.

| Setup asks | Answer |
| --- | --- |
| Which region hosts the bucket? | The bucket's region, like `us-east-1` |
| What is the bucket name? | Its name, exactly as you created it |
| Paste the Access Key. | The access key you created |
| Paste the Secret Key. | Shown once, when you create the key |

frost connects to `s3.<region>.wasabisys.com`.
