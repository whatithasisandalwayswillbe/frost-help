# 迁移备份

你的备份可以迁移到另一个文件夹、存储桶或服务商，而不需要重新上传所有内容。

| 你想要 | 这样做 |
| --- | --- |
| 把备份迁移到另一个文件夹或存储桶 | 移动整个仓库文件夹，然后让 frost 指向新的位置。不会重新上传任何内容 |
| 在别处开始一组新的独立备份 | 运行 `frost init`，选择新的空位置。旧的备份会留在原处，但 frost 只会显示新的那组 |
| 回到之前迁走的备份 | 让 frost 重新指向旧的位置 |

## 移动仓库

仓库是存储中包含 `frost.repo`、`chunks/`、`snapshots/` 和 `trees/` 的那个文件夹。把这四项连同其中的每一个对象一起移动或复制，并保持它们的名称完全不变。只移动 `frost.repo` 并不能迁移你的备份。

然后告诉 frost 备份在哪里。换到另一个存储桶：

```sh
frost config set storage.s3.bucket new-bucket
```

换到存储桶中的另一个文件夹：

```sh
frost config set storage.s3.prefix backups/frost
```

换到另一个服务商时，需要同时修改好几项设置，所以请运行 `frost init` 并选择新的服务商。设置程序会找到你的备份并连接上去。

## 保存前的检查

`frost config set` 在保存新的存储位置之前会先检查它。没有 frost 仓库的位置，或用另一个密钥创建的仓库，会被拒绝。如果旧位置有同一仓库的快照，而新位置没有，也会拒绝这项修改。`frost config edit` 会把同样的问题显示为警告，因此它仍然可以保存 `set` 拒绝的修改。

## frost 找不到你的备份时

当备份不在 frost 预期的位置时，错误信息和 `frost status` 会说明它们上次是在哪里打开的，并给出三种解决办法：

```text
Your backups were last opened in s3://old-bucket/frost/.
Since then storage.s3.bucket changed from old-bucket to new-bucket.

Do one of these:
  put it back:       frost config set storage.s3.bucket old-bucket
  keep the change:   move the whole folder (frost.repo, chunks/, snapshots/ and trees/) to s3://new-bucket/frost/
  start over there:  frost init (your old backups stay where they are)
```
