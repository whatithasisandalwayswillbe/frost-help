# Amazon S3

Back up to a bucket in Amazon S3. S3 supports the conditional writes frost needs.

## Before you start

1. Create a bucket in the AWS console, and note its region, like `us-east-1`.
2. Create an IAM user for frost, give it access to that bucket only, and create an access key for it: IAM > Users > your user > Security credentials > Create access key.

frost needs to read, list, write and delete objects in the bucket. A policy like this one is enough. Replace `my-backups` with your bucket's name:

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

The only object frost deletes is the small test object setup creates when it connects.

## In setup

Run `frost init` and choose **Amazon S3**.

| Setup asks | Answer |
| --- | --- |
| Which region is the bucket in? | The bucket's region, like `us-east-1` |
| What's the bucket called? | Its name, exactly as you created it |
| Paste the access key ID. | The access key ID from IAM |
| Paste the secret access key. | Shown once, next to the access key ID when you create it |

frost connects to `s3.<region>.amazonaws.com`, and keeps your backups in a `frost` folder inside the bucket.

## Good to know

- Keep frost's objects in a storage class that can be read straight away, like S3 Standard or S3 Standard-IA. Don't add lifecycle rules that move them to Glacier Flexible Retrieval or Glacier Deep Archive, or that expire them.
- Bucket versioning isn't needed.
