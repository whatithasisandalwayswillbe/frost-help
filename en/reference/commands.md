# Commands

frost has eight commands. `frost -h` lists them all, with every flag.

## Global flags

These work with every command:

| Flag | Does |
| --- | --- |
| `--config-dir <dir>` | Uses a different config folder |
| `-h`, `--help` | Shows help, with every command and flag |
| `-v`, `--version` | Shows frost's version. Put it before any command |

## frost init

Sets up frost: what to back up, where, and how often. Run it again to review or change your settings. See [Setting up frost](#setting-up).

```sh
frost init
```

## frost backup

Backs up now. See [Backing up](#backing-up).

```sh
frost backup [--dry-run] [--path <dir>] [--exclude <pattern>] [--no-verify]
```

| Flag | Does |
| --- | --- |
| `-n`, `--dry-run` | Shows what would be uploaded, without uploading anything |
| `--path <dir>` | Backs up this folder instead of your usual ones. Repeatable |
| `--exclude <pattern>` | Also skips files matching this pattern. Repeatable |
| `--no-verify` | Skips the spot check after the backup |

## frost restore

Gets files back from a snapshot. With nothing after it, it opens the snapshot browser. See [Restoring files](#restoring).

```sh
frost restore [snapshot] [paths...] --beside | --to <dir> | --overwrite
```

| Flag | Does |
| --- | --- |
| `--beside` | Restores into a new folder next to the originals |
| `--to <dir>` | Restores into a new folder inside this folder |
| `--overwrite` | Restores over the originals, replacing what's there. Asks first |
| `-y`, `--yes` | Doesn't ask before overwriting |

## frost status

Shows recent snapshots, the schedule and the health of your backups. See [Checking your backups](#checking-backups).

```sh
frost status [--verify] [--all]
```

| Flag | Does |
| --- | --- |
| `--verify` | Runs a fresh check first |
| `-a`, `--all` | Lists every snapshot, not just the latest 10 |

## frost browse

Opens the snapshot browser. See [The snapshot browser](#snapshot-browser).

```sh
frost browse
```

## frost config

Reads or changes settings without running setup again. See [Settings](#settings).

```sh
frost config [--show-secrets]
frost config get <key> [--show-secrets]
frost config set <key> <value...>
frost config edit [editor]
```

| Flag | Does |
| --- | --- |
| `--show-secrets` | Prints credentials in full instead of masking them |

## frost key

Shows, checks or imports your recovery phrase. See [Your recovery phrase](#recovery-phrase).

```sh
frost key show
frost key verify
frost key import
```

## frost update

Updates frost to the latest release. See [Updating frost](#updating).

```sh
frost update [--check]
```

| Flag | Does |
| --- | --- |
| `--check` | Only says whether there's a newer release |

## Exit codes

frost exits with `0` when a command succeeds, and `1` on any error. That includes a backup or a `frost status --verify` whose check finds a problem, so scripts can test the result:

```sh
frost status --verify || echo "frost check failed" >&2
```
