# Amazon S3

把备份存到 Amazon S3 的存储桶中。S3 支持 frost 需要的条件写入。

## 开始之前

1. 在 AWS 控制台中创建一个存储桶，记下它所在的区域，比如 `us-east-1`。
2. 为 frost 创建一个 IAM 用户，只允许它访问这个存储桶，再为它创建一个访问密钥：IAM > Users > your user > Security credentials > Create access key。

frost 需要在存储桶中读取、列出、写入和删除对象。下面这样的策略就足够了。把 `my-backups` 换成你的存储桶名称：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::my-backups"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::my-backups/*"
    }
  ]
}
```

frost 唯一会删除的对象，是设置程序在连接时创建的那个小测试对象。

## 在设置程序中

运行 `frost init`，选择 **Amazon S3**。

| 设置程序的问题 | 回答 |
| --- | --- |
| Which region is the bucket in? | 存储桶所在的区域，比如 `us-east-1` |
| What's the bucket called? | 存储桶的名称，与创建时完全一致 |
| Paste the access key ID. | IAM 中的访问密钥 ID |
| Paste the secret access key. | 只在创建访问密钥时显示一次，就在访问密钥 ID 旁边 |

frost 会连接到 `s3.<region>.amazonaws.com`，并把备份放在存储桶中的 `frost` 文件夹里。

## 注意事项

- 让 frost 的对象保持在可以立即读取的存储类别中，比如 S3 Standard 或 S3 Standard-IA。不要添加把它们转移到 Glacier Flexible Retrieval 或 Glacier Deep Archive 的生命周期规则，也不要添加让它们过期的规则。
- 不需要开启存储桶版本控制。
