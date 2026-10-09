# 检查备份

frost 会在备份过程中随时检查你的备份，`frost status` 则让你看到备份的状况。

## frost status

```sh
frost status
```

```text
┌  frost  v0.1.0  s3://my-backups/frost/  key 6f154dc10058
│
│  last backup  ok 2h ago  maple-absurd-3f1c
│  next backup  ~in 4h  6h via launchd
│  health       ok 20 objects checked 2h ago
│  updates      automatic
│  protected    1,204 files, 2.1 GB, in 3 snapshots
│
├  snapshots
│
│  snapshot             taken                  files         size          new
│  maple-absurd-3f1c    2026-10-08 09:17       1,204       2.1 GB      14.2 MB
│  orbit-velvet-a02e    2026-10-08 03:17       1,201       2.1 GB       3.6 MB
│  canyon-pilot-77b9    2026-10-07 21:17       1,198       2.1 GB       2.1 GB
└
```

第一行显示 frost 的版本、你的存储以及密钥指纹。下面各行的含义：

| 行 | 显示 |
| --- | --- |
| last backup | 上一次备份的时间以及是否成功。"ok, but" 后面会列出未找到的文件夹、无法读取的项目，以及保留了之前副本的繁忙文件 |
| next backup | 下一次自动备份的时间，或者自动备份已关闭 |
| health | 最近一次抽查的结果 |
| updates | 是否自动更新，以及是否有新版本发布 |
| protected | 最新快照中的文件数和总大小，以及你一共有多少个快照 |
| missing | 这台电脑曾经知道、但已不在存储中的快照 |

列表显示最新的 10 个快照。`new` 列表示每个快照新增了多少数据。要列出全部快照：

```sh
frost status --all
```

## 抽查

每次保存了快照的备份之后，frost 都会随机下载一部分数据块，逐一解密，并检查它是否与自己的 ID 相符。它还会加载最新快照的文件列表，确认其中需要的每个数据块 frost 都知道。如果备份没有新内容，只有当上一次检查已超过一天或发现过问题时，frost 才会再检查一次。

默认抽查 20 个数据块。样本越大，能发现的问题越多，但下载量也越大：

```sh
frost config set verify.sample 50
```

设为 `0` 会关闭抽查。

## 立即检查

```sh
frost status --verify
```

这会重新运行一次抽查，并把 frost 本地记录的数据块与存储中的所有内容进行对比。检查失败时它以 `1` 退出，所以你可以在自己的计划程序中运行它，按与备份不同的频率进行检查。

## 检查失败时

health 这一行会列出失败的项目。这通常意味着你的存储丢失或损坏了一些数据块。

1. 运行 `frost backup`。只要数据还在你的电脑上，缺失的数据块都会重新上传。
2. 运行 `frost status --verify` 再检查一次。

已经不在你电脑上的数据无法重新上传，需要这些数据的旧快照也就无法完整恢复。

## 缺失的快照

如果这台电脑曾经知道的快照从存储中消失了，`frost status` 会提示一次。如果你迁移过备份，请让 frost 指向新的位置。参见[迁移备份](#moving-backups)。否则，它们就是被从存储中删除了。

> 抽查只是对备份进行抽样。它能及早发现问题，但无法证明每个快照都能成功恢复。对于丢不起的文件，请再另外保留一份独立的备份。
