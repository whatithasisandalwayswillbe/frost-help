# Files and folders

frost keeps the application, your settings and its cache in separate folders on your computer.

## The application

| System | Application folder |
| --- | --- |
| macOS | `~/Library/Application Support/frost/app` |
| Linux | `~/.local/share/frost/app`, or `$XDG_DATA_HOME/frost/app` |
| Windows | `%LocalAppData%\frost\app` |

The application folder holds the bundled runtime and each installed version. Keep it whole.

The `frost` launcher is in `/usr/local/bin` or `~/.local/bin` on macOS and Linux, and in `~/bin` on Windows, unless you chose another folder when installing. See [Installing frost](#installing).

## Settings and key

| File | macOS and Linux | Windows |
| --- | --- | --- |
| Settings | `~/.config/frost/config.toml` | `%AppData%\frost\config.toml` |
| Key | `~/.config/frost/key` | `%AppData%\frost\key` |

## Cache

| File | macOS and Linux | Windows |
| --- | --- | --- |
| Record of what's uploaded | `~/.cache/frost/manifest-<repo>.jsonl` | `%LocalAppData%\frost\manifest-<repo>.jsonl` |
| Where your backups were last opened | `~/.cache/frost/storage-<config>.json` | `%LocalAppData%\frost\storage-<config>.json` |
| Latest update check | `~/.cache/frost/update.json` | `%LocalAppData%\frost\update.json` |
| Scheduled backup log | `~/.cache/frost/frost.log` | `%LocalAppData%\frost\frost.log` |

With systemd, scheduled backups log to the journal instead of `frost.log`. See [Automatic backups](#scheduling), which also lists where the scheduled job lives.

The record of what's uploaded is disposable. If you delete it, the next backup rebuilds it from your storage and reads all your files again. Restores don't need it. Next to it is a `.lock` file that keeps two frost processes from writing at once. Deleting the lock file doesn't stop a running frost.

## Changing the folders

On macOS and Linux, frost follows `XDG_CONFIG_HOME` and `XDG_CACHE_HOME`. `FROST_CONFIG_DIR` and `FROST_CACHE_DIR` override both, and `--config-dir` overrides the config folder for one command.

If you change these folders, run `frost init` again so the scheduled job uses them too.
