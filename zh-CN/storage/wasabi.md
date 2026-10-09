# Wasabi

把备份存到 Wasabi 的存储桶中。

> Wasabi 的文档无法证明它支持 frost 需要的条件写入。设置程序会在连接时测试这一点。如果测试没有通过，请选择其他服务商。参见[选择存储](#choosing-storage)。

## 开始之前

1. 在 Wasabi 控制台中创建一个存储桶，记下它所在的区域，比如 `us-east-1` 或 `eu-central-1`。
2. 创建一个访问密钥：Access Keys > Create New Access Key。如果可以，使用一个只能访问这个存储桶的用户。

## 在设置程序中

运行 `frost init`，选择 **Wasabi**。

| 设置程序的问题 | 回答 |
| --- | --- |
| Which region is the bucket in? | 存储桶所在的区域，比如 `us-east-1` |
| What's the bucket called? | 存储桶的名称，与创建时完全一致 |
| Paste the access key. | 你创建的访问密钥 |
| Paste the secret key. | 只在创建密钥时显示一次 |

frost 会连接到 `s3.<region>.wasabisys.com`，并把备份放在存储桶中的 `frost` 文件夹里。

## 注意事项

不要添加删除 frost 文件夹中对象的生命周期规则。快照之间共享数据块，删掉一个对象就可能损坏许多快照。
