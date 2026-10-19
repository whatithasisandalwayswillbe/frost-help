# 设置项

frost 把设置保存在配置文件夹中的 `config.toml` 里。你可以用 `frost init`、`frost config set` 或 `frost config edit` 修改它们，也可以用任何文本编辑器修改。

## 查看和修改设置

| 命令 | 作用 |
| --- | --- |
| `frost config` | 打印所有设置。凭据会被遮住，除非加上 `--show-secrets` |
| `frost config get <key>` | 打印一项设置。列表每行打印一项 |
| `frost config set <key> <value...>` | 修改一项设置，并显示改了什么 |
| `frost config edit [editor]` | 在编辑器中打开 `config.toml` |

例如：

```sh
frost config get schedule.every
frost config set schedule.every 6h
frost config set paths ~/Documents ~/Pictures
```

- 列表的每一项是一个值，`set` 会替换整个列表。
- 用 `true` 和 `false` 开启或关闭某项设置。
- 修改任何 `schedule` 设置都会立即更新计划任务。在 macOS 和 Windows 上，如果修改时计划备份正在运行，修改会在那次备份结束后立即生效，所以备份不会被中断。
- 修改存储位置时，frost 会在保存之前先检查新位置。参见[迁移备份](#moving-backups)。

## 编辑配置文件

```sh
frost config edit
```

frost 会用你指定的编辑器打开 `config.toml` 的一份副本；如果没有指定，就用 `$VISUAL` 或 `$EDITOR`，再不然就用 nano、vim 或 vi。在 Windows 上，最后的备选是记事本。关闭编辑器后，frost 会列出你改了什么，并在你输入 `yes` 后保存这份副本。

如果文件无法解析，frost 会指出问题所在，并提出重新打开它，所以一个笔误不会破坏你的计划备份。未知的设置也算作错误，所以拼错的名称不会悄悄混过去。

## 自己编辑

你也可以用任何文本编辑器打开 `config.toml` 并保存。frost 每次运行都会读取它，所以大多数修改从下一次运行起生效。有两类修改还需要多一步，frost 会在你下次运行任意 frost 命令时完成：

- 修改了计划，frost 会更新计划任务，并提示 "config.toml changed. Scheduled job updated"（config.toml 已更改，计划任务已更新）。在 Linux 上，下一次计划备份也会这样做。 如果修改时计划备份正在运行，修改会等它结束，和 `frost config set` 一样。
- 修改了存储位置，frost 第一次使用它时，会做和 `frost config edit` 一样的检查。有问题会显示为警告。

保存之前没有任何检查。如果文件无法解析，frost 命令会一直提示，直到你修好它。

## 所有设置

| 键 | 默认值 | 含义 |
| --- | --- | --- |
| `paths` | | 要备份的文件夹 |
| `exclude` | `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules`, `.cache` | 要跳过的名称和模式。参见[排除文件](#excluding-files) |
| `schedule.enabled` | `true` | 自动备份 |
| `schedule.every` | `daily` | `hourly`、`2h`、`3h`、`4h`、`6h`、`8h`、`12h`、`daily` 或 `weekly` |
| `schedule.time` | `15:00` | 备份运行的时间，24 小时制。参见[自动备份](#scheduling) |
| `schedule.day` | `sunday` | 每周备份在星期几运行，`sunday` 到 `saturday` |
| `schedule.catch_up` | `true` | 错过备份后，在电脑恢复时补一次备份。`false` 会跳过错过的备份 |
| `verify.sample` | `20` | 抽查时下载多少个数据块。`0` 表示关闭抽查 |
| `update.auto` | `true` | 在计划备份之后安装新的发布版本。`false` 只通知你有新版本 |
| `storage.backend` | | `permafrost`、`s3`、用于[自托管](#self-hosted)的 `sftp`，或用于[本地磁盘](#local-drive)的 `local` |
| `storage.sftp.host` | | 服务器的 SSH 地址，比如 `me@nas.local`，或者 SSH 配置中的某个 `Host` |
| `storage.sftp.port` | `0` | 服务器的 SSH 端口。`0` 表示使用 SSH 配置中的端口，没有则用 22 |
| `storage.sftp.path` | `frost` | 服务器上的文件夹。相对路径从你在服务器上的主文件夹开始 |
| `storage.local.path` | | 磁盘上文件夹的完整路径 |
| `storage.permafrost.url` | | 留空表示使用默认服务器 `https://permafrost.wihiaawb.com`。否则填写 `https://` 地址，或者对于你自己电脑上的服务器，填写 `http://` 地址 |
| `storage.permafrost.token` | | 你的 Permafrost 访问密钥 |
| `storage.s3.endpoint` | | 比如 `s3.us-east-1.amazonaws.com`。也可以填写完整的 `https://` 地址，填写 `http://` 地址则会关闭 TLS |
| `storage.s3.region` | | 如果你的服务器或服务商不使用区域，就留空 |
| `storage.s3.bucket` | | 存储桶的名称。存储桶必须已经存在 |
| `storage.s3.prefix` | `frost` | 存储桶中存放备份的文件夹。留空表示存储桶的顶层 |
| `storage.s3.access_key_id` | | 你的访问密钥 ID |
| `storage.s3.secret_access_key` | | 你的私密访问密钥 |
| `storage.s3.insecure` | `false` | 端点未指定协议时，使用明文 HTTP。仅用于本地测试 |

## 环境变量

| 变量 | 替代 |
| --- | --- |
| `FROST_S3_ACCESS_KEY_ID` 或 `AWS_ACCESS_KEY_ID` | `storage.s3.access_key_id` |
| `FROST_S3_SECRET_ACCESS_KEY` 或 `AWS_SECRET_ACCESS_KEY` | `storage.s3.secret_access_key` |
| `FROST_PERMAFROST_TOKEN` | `storage.permafrost.token` |
| `FROST_CONFIG_DIR` | 配置文件夹，与 `--config-dir` 相同 |
| `FROST_CACHE_DIR` | 缓存文件夹 |

frost 永远不会把环境变量中的值写入 `config.toml`。计划备份看不到你在 shell 中设置的变量，所以 `config.toml` 中仍然需要凭据。
