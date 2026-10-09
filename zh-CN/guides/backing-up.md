# 备份

`frost backup` 会立即备份你的文件夹，只上传自上次备份以来有变化的内容。

## 运行备份

```sh
frost backup
```

frost 会显示哪些内容有变化、上传了多少数据，以及抽查的结果：

```text
┌  backup  s3://my-backups/frost/
│
│  changes      3 added, 1 changed
│  files        1,204 (2.1 GB)
│  new data     14.2 MB in 9 chunks (9.8 MB uploaded after compression)
│  verified     ok, 20 random objects re-downloaded and checked
│
└  Saved snapshot maple-absurd-3f1c
```

当文件的内容、大小、权限或修改时间发生变化时，这个文件就算作有变化。只有文件夹的修改时间变了不算，因为临时文件总在改动它。

如果什么都没变，frost 不会保存新快照：

```text
┌  backup  s3://my-backups/frost/
│
│  files        1,204 (2.1 GB)
│  verified     ok 3h ago, 20 objects checked
│
└  Already backed up. Nothing has changed since snapshot maple-absurd-3f1c, saved 3h ago.
```

开启自动备份后，你很少需要自己运行这个命令。参见[自动备份](#scheduling)。

## 预览备份

```sh
frost backup --dry-run
```

试运行会列出每一个有新数据要上传的文件以及总量，但不会上传任何内容，也不会保存快照。`-n` 是 `--dry-run` 的简写。

## 选项

| 参数 | 作用 |
| --- | --- |
| `-n`, `--dry-run` | 显示将会上传什么，但不实际上传 |
| `--path <dir>` | 备份这个文件夹，而不是平时设置的那些。可以重复使用来添加更多文件夹 |
| `--exclude <pattern>` | 本次额外跳过符合这个模式的文件。可以重复使用来添加更多模式 |
| `--no-verify` | 备份后跳过抽查 |

如果想更改每次都要备份的文件夹，请再运行一次 `frost init`，或者参见[设置项](#settings)。

## 备份哪些内容

frost 会备份普通文件、文件夹和符号链接，连同它们的权限和修改时间。

- 符号链接按链接本身保存，而不是保存它指向的文件。
- 硬链接的文件会作为彼此独立的文件备份和恢复。

frost 不会备份：

- 跳过列表中的任何内容。参见[排除文件](#excluding-files)。
- 套接字、设备文件和管道。
- 文件所有者、ACL 和扩展属性。
- 在 macOS 上，iCloud 只保存在云端的文件。frost 不会下载它们，而是跳过并列出来。
- 中断的恢复留下的 `.frost-partial-...` 文件。

## 出问题时

| 发生了什么 | frost 怎么做 |
| --- | --- |
| 某个文件或文件夹无法读取，原因可能是权限不足、在备份过程中被删除，或者只存在于 iCloud 中 | 跳过它并列出来。快照照常保存，`frost status` 会显示跳过了多少项 |
| 列表中的某个文件夹不在，比如位于未插入的移动硬盘上 | 跳过它，备份其余的文件夹。`frost backup` 和 `frost status` 会指出缺失的文件夹 |
| 列表中的文件夹全都不在，或者某个文件夹存在但完全无法读取 | 整个备份失败，这样就不会出现备份看似成功、实际什么都没保存的情况 |
| 某个文件在 frost 读取时发生了变化，比如正在使用的数据库、运行中的虚拟机磁盘或正在下载的文件 | 在备份结束时重新读取一次。如果它仍在变化，快照会保留它之前的副本，frost 也会把它列出来。从未被完整备份过的文件会被跳过 |

frost 不会创建文件系统快照或数据库快照。对于总是处于使用中的文件，请在使用它的程序关闭时再备份。

在 macOS 上，有些文件夹需要你授权后 frost 才能读取。参见 [macOS 权限](#macos-permissions)。

## 抽查

每次保存了快照的备份之后，frost 会随机下载几个数据块并检查，默认是 20 个。如果备份没有新内容，只有当上一次检查已超过一天或发现过问题时，才会再检查一次。检查失败时，备份会报错。参见[检查备份](#checking-backups)。

## 中断的备份

如果备份中途停止，比如网络断开、合上笔记本电脑或按了 `Ctrl+C`，已经上传的内容不会白费。frost 会在上传的同时记录数据块，下一次备份会跳过它们。

## 一次只运行一个

同一时间只能运行一个备份或恢复。如果已经有一个在运行，比如计划备份，frost 会提示 "a backup or restore is already running, try again when it's done"（已有备份或恢复在运行，请等它结束后再试）。备份运行时，快照浏览器可以保持打开。
