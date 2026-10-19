# Settings

frost keeps its settings in `config.toml`, in its config folder. You can change them with `frost init`, `frost config set` or `frost config edit`, or in any text editor.

## Reading and changing settings

| Command | Does |
| --- | --- |
| `frost config` | Prints every setting. Credentials are masked unless you add `--show-secrets` |
| `frost config get <key>` | Prints one setting. Lists print one item per line |
| `frost config set <key> <value...>` | Changes one setting and shows what changed |
| `frost config edit [editor]` | Opens `config.toml` in an editor |

For example:

```sh
frost config get schedule.every
frost config set schedule.every 6h
frost config set paths ~/Documents ~/Pictures
```

- A list takes one value per item, and `set` replaces the whole list.
- `true` and `false` turn settings on and off.
- Changing a `schedule` setting updates the scheduled job straight away. On macOS and Windows, a change made while a scheduled backup runs is applied as soon as that backup finishes, so it isn't stopped.
- Changing where your storage is makes frost check the new location before saving it. See [Moving your backups](#moving-backups).

## Editing the file

```sh
frost config edit
```

frost opens a copy of `config.toml` in the editor you name, or in `$VISUAL` or `$EDITOR`, or else in nano, vim or vi. On Windows the fallback is Notepad. When you close the editor, frost lists what you changed and saves the copy once you type `yes`.

If the file doesn't parse, frost points out the problem and offers to open it again, so a typo can't break your scheduled backups. Unknown settings count as errors, so a misspelled name can't slip through unnoticed.

## Editing it yourself

You can also open `config.toml` in any text editor and save it. frost reads it every time it runs, so most changes apply from the next run. Two kinds of change need one more step, which frost takes the next time you run any frost command:

- A changed schedule updates the scheduled job, and frost says "config.toml changed. Scheduled job updated". On Linux, the next scheduled backup does this too. A change made while a scheduled backup runs waits for it, as with `frost config set`.
- A changed storage location gets the same checks as `frost config edit`, the first time frost uses it. Any problem shows as a warning.

Nothing checks the file before you save it. If it doesn't parse, frost commands say so until you fix it.

## All settings

| Key | Default | Meaning |
| --- | --- | --- |
| `paths` | | The folders to back up |
| `exclude` | `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules`, `.cache` | Names and patterns to skip. See [Excluding files](#excluding-files) |
| `schedule.enabled` | `true` | Back up automatically |
| `schedule.every` | `daily` | `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily` or `weekly` |
| `schedule.time` | `15:00` | The time backups run, on a 24-hour clock. See [Automatic backups](#scheduling) |
| `schedule.day` | `sunday` | The day weekly backups run, `sunday` to `saturday` |
| `schedule.catch_up` | `true` | Back up once your computer is back after missing a backup. `false` skips missed backups |
| `verify.sample` | `20` | How many chunks the spot check downloads. `0` turns it off |
| `update.auto` | `true` | Install new releases after scheduled backups. `false` only tells you about them |
| `storage.backend` | | `permafrost`, `s3`, `sftp` for [Self-hosted](#self-hosted) storage, or `local` for a [local drive](#local-drive) |
| `storage.sftp.host` | | Your server's SSH address, like `me@nas.local`, or a `Host` from your SSH config |
| `storage.sftp.port` | `0` | The server's SSH port. `0` uses the port from your SSH config, or 22 |
| `storage.sftp.path` | `frost` | The folder on the server. A relative path starts in your home folder there |
| `storage.local.path` | | The full path of the folder on a drive |
| `storage.permafrost.url` | | Leave blank for the default server, `https://permafrost.wihiaawb.com`. Otherwise an `https://` address, or `http://` for a server on your own computer |
| `storage.permafrost.token` | | Your Permafrost access key |
| `storage.s3.endpoint` | | Like `s3.us-east-1.amazonaws.com`. A full `https://` address also works, and an `http://` one turns off TLS |
| `storage.s3.region` | | Leave blank if your server or provider doesn't use one |
| `storage.s3.bucket` | | The bucket's name. It must already exist |
| `storage.s3.prefix` | `frost` | The folder inside the bucket that holds your backups. Empty for the top of the bucket |
| `storage.s3.access_key_id` | | Your access key ID |
| `storage.s3.secret_access_key` | | Your secret access key |
| `storage.s3.insecure` | `false` | Use plain HTTP when the endpoint has no scheme. Only for local testing |

## Environment variables

| Variable | Takes the place of |
| --- | --- |
| `FROST_S3_ACCESS_KEY_ID` or `AWS_ACCESS_KEY_ID` | `storage.s3.access_key_id` |
| `FROST_S3_SECRET_ACCESS_KEY` or `AWS_SECRET_ACCESS_KEY` | `storage.s3.secret_access_key` |
| `FROST_PERMAFROST_TOKEN` | `storage.permafrost.token` |
| `FROST_CONFIG_DIR` | The config folder, like `--config-dir` |
| `FROST_CACHE_DIR` | The cache folder |

frost never writes values from the environment into `config.toml`. Scheduled backups don't see the variables you set in your shell, so they still need credentials in `config.toml`.
