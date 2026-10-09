# 其他 S3 兼容存储

你可以使用任何其他支持 S3 协议的服务，比如 MinIO、Ceph，或者没有预设的服务商。它必须支持条件写入。参见[选择存储](#choosing-storage)。

## 在设置程序中

运行 `frost init`，选择 **Other S3-compatible**。

| 设置程序的问题 | 回答 |
| --- | --- |
| What's the S3 endpoint? | 服务商文档中给出的主机名。只写主机名而不带 `https://` 时，按 HTTPS 连接 |
| Which region? | 只有服务商要求时才填写，否则留空 |
| What's the bucket called? | 存储桶的名称，与创建时完全一致。存储桶必须已经存在 |
| Paste the access key ID. | 来自服务商的控制台 |
| Paste the secret access key. | 来自服务商的控制台 |

frost 会把备份放在存储桶中的 `frost` 文件夹里。

## 不使用 TLS 的服务器

对于运行在你自己电脑或网络中的测试服务器，可以用 `http://` 开头的端点，比如 `http://localhost:9000`。这会让所有请求都不使用 TLS，所以只在你信任的网络中这样做。把 `storage.s3.insecure` 设为 `true` 会让未指定协议的端点使用 HTTP。明确指定的 `https://` 或 `http://` 优先于这项设置。

## 存储桶中的文件夹

frost 把所有内容放在存储桶中的一个文件夹里，默认是 `frost`。全屏设置界面不会询问这一项。

完成设置后，如果想在第一次备份之前改用另一个文件夹，或者使用存储桶的顶层：

1. 运行 `frost config edit`，修改 `[storage.s3]` 下的 `prefix`。留空表示使用存储桶的顶层。frost 会提醒你那里还没有备份。输入 `yes` 仍然保存。
2. 再运行一次 `frost init`。确认界面会提醒你这将开始一组新的独立备份。按 `[s]` 继续。

如果你已经有备份，请改为迁移它们，方法见[迁移备份](#moving-backups)。

## MinIO

MinIO 服务器支持条件写入，但你运行的版本必须通过设置程序的检查。在 MinIO 控制台中创建一个存储桶和一个访问密钥，然后把 MinIO 服务器的地址和端口告诉设置程序，比如 `https://<server>:9000`。
