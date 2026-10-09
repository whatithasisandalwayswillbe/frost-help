# 设置项

frost 把设置保存在配置文件夹中的 `config.toml` 里。你可以用 `frost init`、`frost config set` 或 `frost config edit` 修改它们。

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
- 修改 `schedule.enabled` 或 `schedule.every` 会立即更新计划任务。
- 修改存储位置时，frost 会在保存之前先检查新位置。参见[迁移备份](#moving-backups)。

## 编辑配置文件

```sh
frost config edit
```

frost 会用你指定的编辑器打开 `config.toml` 的一份副本；如果没有指定，就用 `$VISUAL` 或 `$EDITOR`，再不然就用 nano、vim 或 vi。在 Windows 上，最后的备选是记事本。关闭编辑器后，frost 会列出你改了什么，并在你输入 `yes` 后保存这份副本。

如果文件无法解析，frost 会告诉你原因，并提出重新打开它，所以一个笔误不会破坏你的计划备份。未知的设置也算作错误，所以拼错的名称不会悄悄混过去。

## 所有设置

| 键 | 默认值 | 含义 |
| --- | --- | --- |
| `paths` | | 要备份的文件夹 |
| `exclude` | `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules`, `.cache` | 要跳过的名称和模式。参见[排除文件](#excluding-files) |
| `schedule.enabled` | `true` | 自动备份 |
| `schedule.every` | `daily` | `hourly`、`2h`、`3h`、`4h`、`6h`、`8h`、`12h`、`daily` 或 `weekly` |
| `verify.sample` | `20` | 抽查时下载多少个数据块。`0` 表示关闭抽查 |
| `update.auto` | `true` | 在计划备份之后安装新的发布版本。`false` 只通知你有新版本 |
| `storage.backend` | | `permafrost` 或 `s3` |
| `storage.permafrost.url` | | 留空表示使用默认服务器。否则填写 `https://` 地址，或者对于你自己电脑上的服务器，填写 `http://` 地址 |
| `storage.permafrost.token` | | 你的 Permafrost 访问密钥 |
| `storage.s3.endpoint` | | 比如 `s3.us-east-1.amazonaws.com`。也可以填写完整的 `https://` 地址，填写 `http://` 地址则会关闭 TLS |
| `storage.s3.region` | | 如果你的服务商不使用区域，就留空 |
| `storage.s3.bucket` | | 存储桶的名称。存储桶必须已经存在 |
| `storage.s3.prefix` | `frost` | 存储桶中存放备份的文件夹。留空表示存储桶的顶层 |
| `storage.s3.access_key_id` | | 你的访问密钥 ID |
| `storage.s3.secret_access_key` | | 你的私密访问密钥 |
| `storage.s3.insecure` | `false` | 使用明文 HTTP。仅用于本地测试 |

## 环境变量

| 变量 | 替代 |
| --- | --- |
| `FROST_S3_ACCESS_KEY_ID` 或 `AWS_ACCESS_KEY_ID` | `storage.s3.access_key_id` |
| `FROST_S3_SECRET_ACCESS_KEY` 或 `AWS_SECRET_ACCESS_KEY` | `storage.s3.secret_access_key` |
| `FROST_PERMAFROST_TOKEN` | `storage.permafrost.token` |
| `FROST_CONFIG_DIR` | 配置文件夹，与 `--config-dir` 相同 |
| `FROST_CACHE_DIR` | 缓存文件夹 |

frost 永远不会把环境变量中的值写入 `config.toml`。计划备份看不到你在 shell 中设置的变量，所以 `config.toml` 中仍然需要凭据。
