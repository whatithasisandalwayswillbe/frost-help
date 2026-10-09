# Backblaze B2

通过 Backblaze B2 的 S3 兼容接口，把备份存到它的存储桶中。

> Backblaze 的文档没有说明 B2 是否支持 frost 需要的条件写入。设置程序会在连接时测试这一点。如果测试没有通过，请选择其他服务商。参见[选择存储](#choosing-storage)。

## 开始之前

1. 在你的 Backblaze 账户中创建一个存储桶。
2. 记下它的端点：Buckets > your bucket > Endpoint。它形如 `s3.us-west-004.backblazeb2.com`。
3. 创建一个应用程序密钥：Application Keys > Add a New Application Key。把它限定在这个存储桶上。

## 在设置程序中

运行 `frost init`，选择 **Backblaze B2**。

| 设置程序的问题 | 回答 |
| --- | --- |
| What's the bucket's endpoint? | 存储桶页面上的端点，比如 `s3.us-west-004.backblazeb2.com` |
| What's the bucket called? | 存储桶的名称，与创建时完全一致 |
| Paste the application key's keyID. | 新应用程序密钥的 keyID |
| Paste the applicationKey. | 只在刚创建密钥后显示一次 |

frost 会根据端点推断出区域，并把备份放在存储桶中的 `frost` 文件夹里。

## 注意事项

不要添加删除 frost 文件夹中对象的生命周期规则。快照之间共享数据块，删掉一个对象就可能损坏许多快照。
