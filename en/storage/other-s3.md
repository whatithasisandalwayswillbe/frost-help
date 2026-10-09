# Other S3-compatible storage

Use any other service that speaks the S3 protocol, like MinIO, Ceph or a provider without its own preset. It has to support conditional writes. See [Choosing storage](#choosing-storage).

## In setup

Run `frost init` and choose **Other S3-compatible**.

| Setup asks | Answer |
| --- | --- |
| What's the S3 endpoint? | The host name from your provider's docs. A host name on its own, without `https://`, means HTTPS |
| Which region? | Only if your provider asks for one. Leave it blank otherwise |
| What's the bucket called? | Its name, exactly as you created it. The bucket must already exist |
| Paste the access key ID. | From your provider's console |
| Paste the secret access key. | From your provider's console |

frost keeps your backups in a `frost` folder inside the bucket.

## A server without TLS

For a test server on your own computer or network, give the endpoint with `http://`, like `http://localhost:9000`. That turns off TLS for every request, so only use it where you trust the network. Setting `storage.s3.insecure` to `true` selects HTTP when the endpoint has no scheme. An explicit `https://` or `http://` takes precedence.

## The folder inside the bucket

frost keeps everything in one folder inside the bucket, `frost` by default. The full-screen setup doesn't ask about it.

After completing setup, to use another folder or the top of the bucket before your first backup:

1. Run `frost config edit` and change `prefix` under `[storage.s3]`. Leave it empty for the top of the bucket. frost warns that there are no backups there yet. Type `yes` to save anyway.
2. Run `frost init` again. Its review screen warns that this starts a separate set of backups. Press `[s]` to go ahead.

If you already have backups, move them instead, as described in [Moving your backups](#moving-backups).

## MinIO

MinIO supports conditional writes in its server, but the version you run must pass setup's check. Create a bucket and an access key in the MinIO console, then give setup your MinIO server's address and port, like `https://<server>:9000`.
