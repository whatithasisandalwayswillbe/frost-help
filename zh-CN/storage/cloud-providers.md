# 云服务商

设置程序为四家支持 S3 协议的云服务商准备了预设。运行 `frost init`，选择 **S3-compatible**，再选择你的服务商。其他 S3 服务或你自己运行的 S3 服务器，参见[其他 S3 兼容存储](#other-s3)。

每个预设都会把备份放在存储桶中的 `frost` 文件夹里，所以存储桶还可以存放其他内容。给 frost 一个只能访问这个存储桶的密钥，并且不要添加删除、过期或归档其文件夹中对象的生命周期规则。快照之间共享数据块，删掉一个对象就可能损坏许多快照。

## Amazon S3

S3 支持 frost 需要的条件写入。

1. 在 AWS 控制台中创建一个存储桶，记下它所在的区域，比如 `us-east-1`。
2. 为 frost 创建一个 IAM 用户，再为它创建一个访问密钥：IAM > Users > your user > Security credentials > Create access key。

frost 需要在存储桶中读取、列出、写入和删除对象，不过它唯一会删除的对象，是设置程序在连接时创建的那个小测试对象。下面这样的策略就足够了。把 `my-backups` 换成你的存储桶名称：

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

| 设置程序的问题 | 回答 |
| --- | --- |
| Which region is the bucket in? | 存储桶所在的区域，比如 `us-east-1` |
| What's the bucket called? | 存储桶的名称，与创建时完全一致 |
| Paste the access key ID. | IAM 中的访问密钥 ID |
| Paste the secret access key. | 只在创建访问密钥时显示一次，就在访问密钥 ID 旁边 |

frost 会连接到 `s3.<region>.amazonaws.com`。让它的对象保持在可以立即读取的存储类别中，比如 S3 Standard 或 S3 Standard-IA，而不是 Glacier Flexible Retrieval 或 Glacier Deep Archive。不需要开启存储桶版本控制。

## Cloudflare R2

R2 支持 frost 需要的条件写入。

1. 在 Cloudflare 控制面板中创建一个 R2 存储桶。
2. 记下你的账户 ID。它在 R2 概览页面上，是 32 位字母和数字。
3. 创建一个 API 令牌：R2 > Manage R2 API Tokens > Create API token，权限选 Object Read & Write。如果可以，把它限定在你的存储桶上。

| 设置程序的问题 | 回答 |
| --- | --- |
| What's your Cloudflare account ID? | R2 概览页面上的 32 位 ID |
| What's the bucket called? | 存储桶的名称，与创建时完全一致 |
| Paste the Access Key ID. | 新 API 令牌的 Access Key ID |
| Paste the Secret Access Key. | 只显示一次，就在 Access Key ID 旁边 |

frost 会以区域 `auto` 连接到 `<account-id>.r2.cloudflarestorage.com`。

## Backblaze B2

Backblaze 的文档没有说明 B2 是否支持 frost 需要的条件写入。设置程序会在连接时测试这一点。如果测试没有通过，请选择其他存储。

1. 在你的 Backblaze 账户中创建一个存储桶。
2. 记下它的端点：Buckets > your bucket > Endpoint。它形如 `s3.us-west-004.backblazeb2.com`。
3. 创建一个应用程序密钥：Application Keys > Add a New Application Key。把它限定在这个存储桶上。

| 设置程序的问题 | 回答 |
| --- | --- |
| What's the bucket's endpoint? | 存储桶页面上的端点，比如 `s3.us-west-004.backblazeb2.com` |
| What's the bucket called? | 存储桶的名称，与创建时完全一致 |
| Paste the application key's keyID. | 新应用程序密钥的 keyID |
| Paste the applicationKey. | 只在刚创建密钥后显示一次 |

frost 会根据端点推断出区域。

## Wasabi

从 Wasabi 的文档无法确认它是否支持 frost 需要的条件写入。设置程序会在连接时测试这一点。如果测试没有通过，请选择其他存储。

1. 在 Wasabi 控制台中创建一个存储桶，记下它所在的区域，比如 `us-east-1` 或 `eu-central-1`。
2. 创建一个访问密钥：Access Keys > Create New Access Key。如果可以，使用一个只能访问这个存储桶的用户。

| 设置程序的问题 | 回答 |
| --- | --- |
| Which region is the bucket in? | 存储桶所在的区域，比如 `us-east-1` |
| What's the bucket called? | 存储桶的名称，与创建时完全一致 |
| Paste the access key. | 你创建的访问密钥 |
| Paste the secret key. | 只在创建密钥时显示一次 |

frost 会连接到 `s3.<region>.wasabisys.com`。
