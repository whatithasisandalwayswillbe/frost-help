# Security and privacy

Frost encrypts your backups on your computer, with a key only you hold, before anything is stored. Nobody without the key can read them: not a cloud provider, the Permafrost operator, someone else with access to your server or drive, or the Frost authors.

Frost has no accounts and collects nothing about you or how you use it. It connects only to your storage, and to GitHub to check for and download updates.

## What's encrypted

Frost encrypts everything inside your backups: file contents, file names, folder structure and the details of each snapshot. Setup also sends a small plaintext test object, then deletes it. It contains no files, names or encryption key. Frost never sends your key to a server or keeps an escrow copy.

| Piece | How |
| --- | --- |
| Key | 256 random bits, created on your computer by `frost init` |
| Recovery phrase | The key itself, written as 24 BIP39 words |
| Encryption | XChaCha20-Poly1305, with a new random nonce for every object |
| Chunk names | HMAC-SHA256 of the chunk's contents, keyed with your key |
| Compression | zstd, before encryption, only when it makes the data smaller |

## What your storage can see

Whoever runs your storage, or can read it, can see the following. That's a cloud provider or Permafrost, or for a self-hosted server or a drive, anyone with access to it.

- How many objects you have, how big they are and when they were uploaded.
- Which objects are chunks, snapshot headers or file-list indexes.
- When you back up and restore, and from which IP address.
- How much new data each backup uploads, which hints at how much changed. A backup with nothing new saves no snapshot, so new snapshots show when something changed.
- Roughly how big a small file is after compression, but not what it is or what it's called. Large files are split into chunks of different sizes, so they don't show up as one object of their size.

It can't check whether you have a particular known file. Chunk names and chunk boundaries both depend on your key.

## What Frost protects against

- Whoever runs or can reach your storage reading your files, including someone with a copy of your bucket, your server's folder or your drive.
- Someone on the network between you and your storage. Connections use TLS or SSH, unless you choose an `http://` S3 endpoint, or enable `storage.s3.insecure` for an endpoint without a scheme. Permafrost permits `http://` only on your own computer. Use plain HTTP only for local testing. Every backup object is authenticated either way.
- Someone pretending to be your self-hosted server. SSH checks the server's host key and refuses one that changed. See [Self-hosted](#self-hosted).
- Tampering. A changed, swapped or truncated object fails to decrypt, and Frost never quietly accepts it.
- A restore writing outside the folder you chose.
- Tampered Frost downloads. Every release is signed, and the installers, the `getfrost` npm package and `frost update` check the signature before installing anything.

## What it can't protect against

- **Someone with access to your computer.** The key file sits on your computer so scheduled backups can run, and so does Frost's SSH key for a self-hosted server. Anyone who can read the key file, or run programs as you, can read your backups. Use full-disk encryption and a screen lock.
- **Losing data in storage.** Whoever controls your storage could delete or withhold your objects, and a drive can fail or get lost. Spot checks can notice, but Frost can't stop it. Keep a second, independent copy of anything you can't afford to lose, somewhere other than the drive next to your computer.
- **Hidden snapshots.** The storage could hide your newest snapshots and serve only older ones. A computer that has seen the newer snapshots reports them missing, but a new computer can't tell. Every snapshot that is served is still genuine.
- **Timing and sizes.** When you back up, and how much, are visible, as listed above.

## Files on your computer

On macOS and Linux, Frost creates its private files with permissions for your user only. Existing permissions and logs created by the scheduler can differ. On Windows, files inherit your user profile's permissions, except Frost's SSH key, whose folder only your account can open. Keep the config and cache in folders that other users can't read.

| File | Holds |
| --- | --- |
| `key` | Your recovery phrase, in plain text |
| `config.toml` | Your settings and storage credentials |
| `ssh/frost_ed25519` | Frost's SSH key for a self-hosted server |
| `manifest-*.jsonl` | Chunk IDs, file paths, sizes and modification times. It never leaves your computer |
| `frost.log` | Output of scheduled backups, including paths that couldn't be read |

[Files and folders](#files-and-folders) lists where they are.

## Recommendations

- Keep your recovery phrase offline, on paper or in a password manager you trust.
- Run `frost key verify` now and then, to make sure the phrase you wrote down is right.
- Give Frost storage credentials that only reach its own bucket, or a server account that can't change anything else you care about.
- Check `frost status` now and then, and look into any health problem straight away.

## Reporting a security problem

Please don't open a public issue. Report it privately from the [Security tab](https://github.com/whatithasisandalwayswillbe/frost/security) of Frost's GitHub repository, with **Report a vulnerability**. Include what you found, how to reproduce it and what an attacker could gain. You'll hear back within a week.
