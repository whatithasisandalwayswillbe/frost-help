# Cloudflare R2

把备份存到 Cloudflare R2 的存储桶中。R2 支持 frost 需要的条件写入。

## 开始之前

1. 在 Cloudflare 控制台中创建一个 R2 存储桶。
2. 记下你的账户 ID。它在 R2 概览页面上，由 32 个字母和数字组成。
3. 创建一个 API 令牌：R2 > Manage R2 API Tokens > Create API token，权限选择 Object Read & Write。如果可以，把它限定在你的存储桶上。

## 在设置程序中

运行 `frost init`，选择 **Cloudflare R2**。

| 设置程序的问题 | 回答 |
| --- | --- |
| What's your Cloudflare account ID? | R2 概览页面上那个 32 位的 ID |
| What's the bucket called? | 存储桶的名称，与创建时完全一致 |
| Paste the Access Key ID. | 新 API 令牌的 Access Key ID |
| Paste the Secret Access Key. | 只显示一次，就在 Access Key ID 旁边 |

frost 会以区域 `auto` 连接到 `<account-id>.r2.cloudflarestorage.com`，并把备份放在存储桶中的 `frost` 文件夹里。

## 注意事项

不要添加删除 frost 文件夹中对象或让它们过期的生命周期规则。快照之间共享数据块，删掉一个对象就可能损坏许多快照。
