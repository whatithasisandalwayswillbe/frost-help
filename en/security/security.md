# Security and privacy

frost encrypts your backups on your computer, with a key only you hold, before anything is uploaded. Your storage provider, the Permafrost operator and the frost authors can't read them.

## What's encrypted

frost encrypts everything inside your backups: file contents, file names, folder structure and the details of each snapshot. Your key never leaves your computer, and there's no copy of it anywhere else.

| Piece | How |
| --- | --- |
| Key | 256 random bits, created on your computer by `frost init` |
| Recovery phrase | The key itself, written as 24 BIP39 words |
| Encryption | XChaCha20-Poly1305, with a new random nonce for every object |
| Chunk names | HMAC-SHA256 of the chunk's contents, keyed with your key |
| Compression | zstd, before encryption, only when it makes the data smaller |

## What your provider can see

Your storage provider, whether that's an S3 host or Permafrost, can see:

- How many objects you have, how big they are and when they were uploaded.
- Which objects are chunks, snapshot headers or file-list indexes.
- When you back up and restore, and from which IP address.
- How much new data each backup uploads, which hints at how much changed. A backup with nothing new saves no snapshot, so new snapshots show when something changed.
- Roughly how big a small file is after compression, but not what it is or what it's called. Large files are split into chunks of different sizes, so they don't show up as one object of their size.

It can't check whether you have a particular known file. Chunk names and chunk boundaries both depend on your key.

## What frost protects against

- Your provider, or someone with a copy of your bucket, reading your files.
- Someone on the network between you and your storage. Connections use TLS, unless you choose plain HTTP for a local server, and every object is authenticated anyway.
- Tampering. A changed, swapped or truncated object fails to decrypt, and frost never quietly accepts it.
- A restore writing outside the folder you chose.
- Tampered frost downloads. Every release is signed, and the installer and `frost update` check the signature before installing anything.

## What it can't protect against

- **Someone with access to your computer.** The key file sits on your computer so scheduled backups can run. Anyone who can read it, or run programs as you, can read your backups. Use full-disk encryption and a screen lock.
- **Losing data in storage.** Your provider could delete or withhold your objects. Spot checks can notice, but frost can't stop it. Keep a second, independent copy of anything you can't afford to lose.
- **Hidden snapshots.** A provider could hide your newest snapshots and serve only older ones. A computer that has seen the newer snapshots reports them missing, but a new computer can't tell. Every snapshot that is served is still genuine.
- **Timing and sizes.** When you back up, and how much, are visible, as listed above.

## Files on your computer

On macOS and Linux, frost creates its files so only your user can read them. On Windows, they take the permissions of your user profile.

| File | Holds |
| --- | --- |
| `key` | Your recovery phrase, in plain text |
| `config.toml` | Your settings and storage credentials |
| `manifest-*.jsonl` | Chunk IDs, file paths, sizes and modification times. It never leaves your computer |
| `frost.log` | Output of scheduled backups, including paths that couldn't be read |

[Files and folders](#files-and-folders) lists where they are.

## Recommendations

- Keep your recovery phrase offline, on paper or in a password manager you trust.
- Run `frost key verify` now and then, to make sure the phrase you wrote down is right.
- Give frost storage credentials that only reach its own bucket.
- Check `frost status` now and then, and look into any health problem straight away.

## Reporting a security problem

Please don't open a public issue. Report it privately from the [Security tab](https://github.com/whatithasisandalwayswillbe/frost/security) of frost's GitHub repository, with **Report a vulnerability**. Include what you found, how to reproduce it and what an attacker could gain. You'll hear back within a week.
