# 文件与文件夹

frost 把应用程序、你的设置和它的缓存分别存放在电脑上的不同文件夹中。

## 应用程序

| 系统 | 应用程序文件夹 |
| --- | --- |
| macOS | `~/Library/Application Support/frost/app` |
| Linux | `~/.local/share/frost/app`，或 `$XDG_DATA_HOME/frost/app` |
| Windows | `%LocalAppData%\frost\app` |

应用程序文件夹中有自带的运行时以及每个已安装的版本。请保持它完整。

在 macOS 和 Linux 上，`frost` 启动器位于 `/usr/local/bin` 或 `~/.local/bin`；在 Windows 上位于 `~/bin`，除非你在安装时选择了别的文件夹。参见[安装 frost](#installing)。

## 设置和密钥

| 文件 | macOS 和 Linux | Windows |
| --- | --- | --- |
| 设置 | `~/.config/frost/config.toml` | `%AppData%\frost\config.toml` |
| 密钥 | `~/.config/frost/key` | `%AppData%\frost\key` |

## 缓存

| 文件 | macOS 和 Linux | Windows |
| --- | --- | --- |
| 已上传内容的记录 | `~/.cache/frost/manifest-<repo>.jsonl` | `%LocalAppData%\frost\manifest-<repo>.jsonl` |
| 上次打开备份的位置 | `~/.cache/frost/storage-<config>.json` | `%LocalAppData%\frost\storage-<config>.json` |
| 最近一次更新检查 | `~/.cache/frost/update.json` | `%LocalAppData%\frost\update.json` |
| 计划备份日志 | `~/.cache/frost/frost.log` | `%LocalAppData%\frost\frost.log` |

使用 systemd 时，计划备份的日志写入系统日志（journal），而不是 `frost.log`。参见[自动备份](#scheduling)，那里也列出了计划任务的位置。

已上传内容的记录可以随时丢弃。删除它之后，下一次备份会根据存储重建它，并重新读取你的所有文件。恢复用不到它。它旁边有一个 `.lock` 文件，用来防止两个 frost 进程同时写入。删除锁文件并不能停止正在运行的 frost。

## 更改文件夹位置

在 macOS 和 Linux 上，frost 遵循 `XDG_CONFIG_HOME` 和 `XDG_CACHE_HOME`。`FROST_CONFIG_DIR` 和 `FROST_CACHE_DIR` 会覆盖这两者，`--config-dir` 则会在单个命令中覆盖配置文件夹。

如果你更改了这些文件夹，请再运行一次 `frost init`，让计划任务也使用新的位置。
