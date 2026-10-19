# Other S3-compatible storage

Use an S3 server you run yourself, like Ceph or SeaweedFS, or any other service that speaks the S3 protocol without its own preset. It has to support conditional writes, which setup checks. See [Choosing storage](#choosing-storage).

To back up to a machine of your own without running an S3 server, [Self-hosted](#self-hosted) storage is simpler. It only needs SSH.

## In setup

Run `frost init`, choose **S3-compatible**, then **Other S3-compatible**.

| Setup asks | Answer |
| --- | --- |
| What's the S3 endpoint? | The host name from your server's or provider's docs. A host name on its own, without `https://`, means HTTPS |
| Which region? | Only if your server or provider asks for one. Leave it blank otherwise |
| What's the bucket called? | Its name, exactly as you created it. The bucket must already exist |
| Paste the access key ID. | From your server's or provider's console |
| Paste the secret access key. | From your server's or provider's console |

frost keeps your backups in a `frost` folder inside the bucket.

## Servers you run

| Server | What to know |
| --- | --- |
| Ceph | Its RADOS Gateway supports conditional writes. Give setup the gateway's address and port |
| SeaweedFS | Its S3 gateway documents conditional writes. Give setup its address, like `http://<server>:8333` |
| MinIO | It supports conditional writes but is no longer maintained, so it gets no fixes. An existing server still works if it passes setup's check. Give setup its address, like `https://<server>:9000` |
| Garage | It doesn't support conditional writes, so frost can't use it |

Create the bucket and an access key in the server's own tools first.

## A server without TLS

For a server on your own computer or network, give the endpoint with `http://`, like `http://localhost:9000`. That turns off TLS for every request, so only use it where you trust the network. Setting `storage.s3.insecure` to `true` selects HTTP when the endpoint has no scheme. An explicit `https://` or `http://` takes precedence.

## The folder inside the bucket

frost keeps everything in one folder inside the bucket, `frost` by default. The full-screen setup doesn't ask about it.

After completing setup, to use another folder or the top of the bucket before your first backup:

1. Run `frost config edit` and change `prefix` under `[storage.s3]`. Leave it empty for the top of the bucket. frost warns that there are no backups there yet. Type `yes` to save anyway.
2. Run `frost init` again. Its review screen warns that this starts a separate set of backups. Press `[s]` to go ahead.

If you already have backups, move them instead, as described in [Moving your backups](#moving-backups).
