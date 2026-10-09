# Settings

frost keeps its settings in `config.toml`, in its config folder. You can change them with `frost init`, `frost config set` or `frost config edit`.

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
- Changing `schedule.enabled` or `schedule.every` updates the scheduled job straight away.
- Changing where your storage is makes frost check the new location before saving it. See [Moving your backups](#moving-backups).

## Editing the file

```sh
frost config edit
```

frost opens a copy of `config.toml` in the editor you name, or in `$VISUAL` or `$EDITOR`, or else in nano, vim or vi. On Windows the fallback is Notepad. When you close the editor, frost lists what you changed and saves the copy once you type `yes`.

If the file doesn't parse, frost tells you why and offers to open it again, so a typo can't break your scheduled backups. Unknown settings count as errors, so a misspelled name can't slip through unnoticed.

## All settings

| Key | Default | Meaning |
| --- | --- | --- |
| `paths` | | The folders to back up |
| `exclude` | `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules`, `.cache` | Names and patterns to skip. See [Excluding files](#excluding-files) |
| `schedule.enabled` | `true` | Back up automatically |
| `schedule.every` | `daily` | `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily` or `weekly` |
| `verify.sample` | `20` | How many chunks the spot check downloads. `0` turns it off |
| `update.auto` | `true` | Install new releases after scheduled backups. `false` only tells you about them |
| `storage.backend` | | `permafrost` or `s3` |
| `storage.permafrost.url` | | Leave blank for the default server. Otherwise an `https://` address, or `http://` for a server on your own computer |
| `storage.permafrost.token` | | Your Permafrost access key |
| `storage.s3.endpoint` | | Like `s3.us-east-1.amazonaws.com`. A full `https://` address also works, and an `http://` one turns off TLS |
| `storage.s3.region` | | Leave blank if your provider doesn't use one |
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
