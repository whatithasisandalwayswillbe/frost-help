# 命令

frost 有八个命令。`frost -h` 会列出所有命令以及每个参数。

## 全局参数

这些参数适用于所有命令：

| 参数 | 作用 |
| --- | --- |
| `--config-dir <dir>` | 使用另一个配置文件夹 |
| `-h`, `--help` | 显示帮助，包括所有命令和参数 |
| `-v`, `--version` | 显示 frost 的版本。请放在任何命令之前 |

## frost init

设置 frost：备份什么、存到哪里、多久备份一次。再次运行可以查看或修改设置。参见[设置 frost](#setting-up)。

```sh
frost init
```

## frost backup

立即备份。参见[备份](#backing-up)。

```sh
frost backup [--dry-run] [--path <dir>] [--exclude <pattern>] [--no-verify]
```

| 参数 | 作用 |
| --- | --- |
| `-n`, `--dry-run` | 显示将会上传什么，但不实际上传 |
| `--path <dir>` | 备份这个文件夹，而不是平时设置的那些。可重复使用 |
| `--exclude <pattern>` | 额外跳过符合这个模式的文件。可重复使用 |
| `--no-verify` | 备份后跳过抽查 |

## frost restore

从快照中找回文件。后面什么都不加时，会打开快照浏览器。参见[恢复文件](#restoring)。

```sh
frost restore [snapshot] [paths...] --beside | --to <dir> | --overwrite
```

| 参数 | 作用 |
| --- | --- |
| `--beside` | 恢复到原文件旁边的新文件夹中 |
| `--to <dir>` | 恢复到这个文件夹中的新文件夹里 |
| `--overwrite` | 覆盖原文件，替换那里现有的内容。会先询问 |
| `-y`, `--yes` | 覆盖前不再询问 |

## frost status

显示最近的快照、备份计划以及备份的健康状况。参见[检查备份](#checking-backups)。

```sh
frost status [--verify] [--all]
```

| 参数 | 作用 |
| --- | --- |
| `--verify` | 先重新运行一次检查 |
| `-a`, `--all` | 列出所有快照，而不只是最新的 10 个 |

## frost browse

打开快照浏览器。参见[快照浏览器](#snapshot-browser)。

```sh
frost browse
```

## frost config

无需重新运行设置程序，就能查看或修改设置。参见[设置项](#settings)。

```sh
frost config [--show-secrets]
frost config get <key> [--show-secrets]
frost config set <key> <value...>
frost config edit [editor]
```

| 参数 | 作用 |
| --- | --- |
| `--show-secrets` | 完整打印凭据，而不是遮住它们 |

## frost key

显示、核对或导入你的恢复短语。参见[恢复短语](#recovery-phrase)。

```sh
frost key show
frost key verify
frost key import
```

## frost update

把 frost 更新到最新的发布版本。参见[更新 frost](#updating)。

```sh
frost update [--check]
```

| 参数 | 作用 |
| --- | --- |
| `--check` | 只告诉你有没有更新的版本 |

## 退出码

命令成功时，frost 以 `0` 退出；出现任何错误时，以 `1` 退出。备份或 `frost status --verify` 的检查发现问题时，也算作错误，所以脚本可以据此判断结果：

```sh
frost status --verify || echo "frost check failed" >&2
```
