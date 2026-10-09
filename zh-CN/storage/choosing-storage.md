# 选择存储

frost 可以把备份存放在 Permafrost 上，也可以存放在任何支持条件写入的 S3 兼容服务商那里。无论哪种方式，所有内容在离开你的电脑之前都会加密，所以你的服务商读不到它们。

## 你的选择

- **[Permafrost](#permafrost)** 是专为 frost 打造的托管存储。它只需要一个访问密钥，没有存储桶、区域或端点需要设置。
- **S3 兼容存储**使用你在服务商那里创建的存储桶，比如 [Amazon S3](#amazon-s3)、[Cloudflare R2](#cloudflare-r2)、[Backblaze B2](#backblaze-b2) 或 [Wasabi](#wasabi)，也可以使用你自己运行的服务器，比如 [MinIO](#other-s3)。

## 条件写入

frost 要求存储支持原子性的条件写入（`If-None-Match: *`）。条件写入能防止两台电脑互相覆盖对方的备份记录。设置程序在连接时会测试这一点，不通过的存储会被拒绝。如果服务商本身不支持，换密钥或改设置都解决不了。

| 服务商 | 条件写入 |
| --- | --- |
| Permafrost | 支持 |
| Amazon S3 | [有文档说明](https://docs.aws.amazon.com/AmazonS3/latest/userguide/conditional-writes.html) |
| Cloudflare R2 | [有文档说明](https://developers.cloudflare.com/r2/api/s3/api/) |
| MinIO | 服务器已内置支持。你运行的版本必须通过设置程序的检查 |
| Backblaze B2 | 未经证实。它的[上传接口文档](https://www.backblaze.com/apidocs/s3-put-object)中没有列出 `If-None-Match` |
| Wasabi | 未经证实。它的 [API 文档](https://docs.wasabi.com/apidocs/operations-on-objects)无法证明支持 |
| Garage | 不支持，据其维护者所说 |

以上信息是在 2026 年 10 月 2 日对照各服务商的文档和源代码核实的，没有做实际测试。最终以设置程序自己的检查为准。

## 需要考虑的因素

- **恢复的费用。** 有些服务商对下载收费。完整恢复会下载所有内容，每次抽查也会下载一小部分样本。
- **归档存储类别。** frost 会直接读回数据块，所以不要把它的对象转移到需要先解冻才能读取的归档存储类别中。
- **删除与过期。** frost 永远不会删除你的备份。不要为它的文件夹添加删除对象或让对象过期的生命周期规则，因为快照之间共享数据块。
- **受限的密钥。** 给 frost 的访问密钥只开放它自己的存储桶。

## 以后更换存储

你可以把备份迁移到另一个服务商，而不需要重新上传所有内容。参见[迁移备份](#moving-backups)。
