# 选择存储

Frost 可以把备份存放在你自己的服务器、磁盘、Permafrost 或 S3 兼容服务上。无论存在哪里，所有内容都会先在你的电脑上加密，所以运营存储的人读不到你的文件。

## 你的选择

| 存储 | 适合 | 你需要 |
| --- | --- | --- |
| [自托管](#self-hosted) | 你自己管理的 NAS、家用服务器或 VPS | SSH 访问权限 |
| [本地磁盘](#local-drive) | USB 磁盘或第二块磁盘 | 备份运行时已连接的磁盘 |
| [Permafrost](#permafrost) | 专为 Frost 打造的托管存储 | 一个访问密钥 |
| [云服务商](#cloud-providers) | Amazon S3、Cloudflare R2、Backblaze B2 或 Wasabi | 一个存储桶及其密钥 |
| [其他 S3 兼容存储](#other-s3) | 你自己运行的 S3 服务器，比如 Ceph 或 SeaweedFS，或者其他 S3 服务 | 一个存储桶及其密钥 |

使用自托管服务器或本地磁盘时，备份留在你自己掌控的硬件上，不需要在任何地方注册账户。Permafrost 和云服务商把备份存放在家以外的地方，你不用维护自己的机器。

## 条件写入

Frost 要求存储能够一步创建文件，并且只在文件名空闲时才创建。这能防止两台电脑互相覆盖对方的备份记录。设置程序在连接时会测试这一点，不通过的存储会被拒绝。如果存储本身不支持，换密钥或改设置都解决不了。

| 存储 | 条件写入 |
| --- | --- |
| 自托管 | OpenSSH 服务器支持，前提是文件系统支持硬链接，比如 ext4、Btrfs、XFS、ZFS、APFS 和 NTFS |
| 本地磁盘 | 在 NTFS、APFS、ext4、Btrfs 和 XFS 上支持。其他文件系统必须通过设置程序的检查 |
| Permafrost | 支持 |
| Amazon S3 | [有文档说明](https://docs.aws.amazon.com/AmazonS3/latest/userguide/conditional-writes.html) |
| Cloudflare R2 | [有文档说明](https://developers.cloudflare.com/r2/api/s3/api/) |
| Ceph | 服务器已内置支持。你运行的版本必须通过设置程序的检查 |
| SeaweedFS | [有文档说明](https://github.com/seaweedfs/seaweedfs/wiki/S3-Conditional-Operations)。你运行的版本必须通过设置程序的检查 |
| MinIO | 服务器已内置支持，但它已不再维护。你运行的版本必须通过设置程序的检查 |
| Backblaze B2 | 未经证实。它的[上传接口文档](https://www.backblaze.com/apidocs/s3-put-object)中没有列出 `If-None-Match` |
| Wasabi | 未经证实。它的 [API 文档](https://docs.wasabi.com/apidocs/operations-on-objects)无法证明支持 |
| Garage | 不支持，据其维护者所说 |

以上关于 S3 服务的信息是在 2026 年 10 月对照各项目的文档和源代码核实的，没有做实际测试。最终以设置程序自己的检查为准。

## 需要考虑的因素

- **家以外的副本。** 家里的磁盘或服务器可能和你的电脑在同一场火灾或盗窃中一起丢失。位于别处的服务器、Permafrost 或云服务商则不会。对于无法替代的内容，请在别处另外保留一份独立的副本。
- **恢复的费用。** 有些云服务商对下载收费。完整恢复会下载所有内容，每次抽查也会下载一小部分样本。
- **归档存储类别。** Frost 会直接读回数据块，所以不要把它的对象转移到需要先解冻才能读取的归档存储类别中。
- **删除与过期。** Frost 永远不会删除你的备份。不要为它的文件夹添加删除文件或让文件过期的生命周期规则或清理任务，因为快照之间共享数据块。
- **受限的访问。** 给 Frost 一个只开放它自己存储桶的访问密钥，或者一个无法更改你在意的其他内容的服务器账户。

## 以后更换存储

你可以把备份迁移到另一种存储，而不需要重新上传所有内容。参见[迁移备份](#moving-backups)。
