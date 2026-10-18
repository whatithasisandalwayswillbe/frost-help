# 常见问题

本页汇总了大家最常遇到的提示和问题。每个标题要么是 frost 显示的原文，要么是你会注意到的现象。

## "frost isn't set up yet, run `frost init`"

frost 找不到 `config.toml`。运行 `frost init`。如果你使用了 `--config-dir` 或 `FROST_CONFIG_DIR`，请检查它是否指向了正确的文件夹。

## "no key on this machine"

密钥文件不见了。如果这台电脑已经设置好了存储，运行 `frost key import` 并输入你的恢复短语。否则，运行 `frost init`。

## "a backup or restore is already running"

另一个 frost 进程正在使用你的备份，通常是计划备份。如果是计划备份，frost 会提示 "a scheduled backup is already running"，并说明它何时开始。等它结束后再试。删除 frost 的锁文件并不能停止那个进程。

## "the key on this machine doesn't match"

你的存储中的备份是用另一个密钥创建的。运行 `frost key verify`，输入你抄写的恢复短语，看看它对应的是哪个密钥。如果它就是正确的那个，用它运行 `frost key import`。

## frost 找不到你的备份

"has no frost repository" 这类提示，意味着你的备份不在 frost 正在查找的位置。错误信息会说明它们上次是在哪里打开的，以及如何找回它们。参见[迁移备份](#moving-backups)。

如果你的访问密钥仍然有效，备份却从 Permafrost 消失了，那它们很可能是用这个密钥删除的。请立即发邮件到 care@getfro.st。如果别人可能拿到了你的密钥，请到 [getfro.st/perma/recover](https://getfro.st/perma/recover) 领取新密钥。

## 设置程序无法连接

设置程序会说明问题所在，并带你回到最可能出错的那个答案。

| 设置程序的提示 | 检查 |
| --- | --- |
| That access key ID wasn't recognised | 你是否完整复制了访问密钥 ID |
| The secret key doesn't match the access key ID | 你是否完整复制了私密密钥，以及它是否属于这个密钥 ID |
| There's no bucket with that name | 存储桶的名称，或者先创建存储桶 |
| That key doesn't have the bucket permissions frost needs | 这个密钥能否在存储桶中读取、列出、写入和删除对象 |
| The bucket is in a different region | 区域或端点 |
| Can't find ... | 地址，以及你的网络连接 |
| Nothing answered at that address | 地址和端口 |
| The server's certificate isn't valid for that address | 地址，以及服务器证书是否涵盖这个地址 |
| the storage didn't answer in time | 你的网络连接，然后重试 |
| can't reach Permafrost | 你的网络连接，然后重试 |

## "This storage doesn't support conditional writes"

你的服务商不支持 frost 需要的一项功能，frost 要靠它防止多台电脑互相覆盖备份记录。换密钥或改设置都解决不了。请选择其他服务商。参见[选择存储](#choosing-storage)。

## "the Permafrost access key was rejected"

错误信息后面会附上 Permafrost 给出的原因：密钥不对、已被更新的密钥替换，或者账户已关闭。请使用你最新的密钥，或者获取一个新密钥。参见 [Permafrost](#permafrost)。

## "uploads are paused"

Permafrost 目前不接受你账户的新备份。错误信息会说明原因和持续到什么时候，恢复照常可用。参见 [Permafrost](#permafrost)。

## 备份无法读取某个文件夹

在 macOS 上，这通常是隐私权限的问题。错误信息会说明需要允许什么。参见 [macOS 权限](#macos-permissions)。在其他系统上，请检查你的用户能否读取这个文件夹。

## 文件被列为 "couldn't be read"

frost 跳过了这些文件，其余内容照常保存。常见原因有：你没有读取权限的文件、在备份过程中被删除的文件，以及在 macOS 上 iCloud 只保存在云端的文件。

## 文件 "kept changing while they were read"

备份过程中有程序在写入这些文件，所以快照保留了它们之前的副本。关闭那个程序后再备份一次，或者等下一次备份时自然会补上。

## 文件夹 "not found"

列表中的某个文件夹不在，所以 frost 备份了其余的文件夹。把移动硬盘重新插上；如果文件夹换了位置，就用 `frost init` 更新你的列表。

## "config.toml changed, but updating the scheduled job failed"

你编辑了 `config.toml`，但 frost 无法让计划任务与之一致。消息的其余部分说明了原因。如果提到了某个设置，请在 `config.toml` 里修正它。frost 每次运行命令都会重试，直到成功。

## "config.toml changed where backups go"

你在 `config.toml` 里修改了备份的位置，frost 第一次使用新位置时发现了问题。消息的其余部分说明了是什么问题。参见[迁移备份](#moving-backups)。

## "scheduled job is missing"

计划任务被删除或关闭了。用 `frost config set schedule.enabled true` 恢复它。

## 计划备份没有运行

- 查看 `frost status` 中的 "next backup" 这一行。
- 在 macOS 上，检查“系统设置 > 通用 > 登录项与扩展”（System Settings > General > Login Items & Extensions）中 frost 的开关。它显示为 Node.js Foundation。
- 在 Windows 上，计划备份需要你保持登录，并且使用电池供电时不会运行。
- 如果 `schedule.catch_up` 设为 `false`，备份到点时电脑处于关机或睡眠状态，这次备份会被跳过。
- 查看日志。参见[自动备份](#scheduling)。

## "verification failed"

抽查发现你的存储中有数据缺失或损坏。参见[检查备份](#checking-backups)。

## "can't restore beside the originals"

原文件旁边的文件夹无法使用，通常是因为快照来自另一台电脑。请改用 `--to <dir>`。参见[恢复文件](#restoring)。

## "can't overwrite the originals"

快照来自另一类系统，或者通往原文件的路径经过了一个 frost 不信任的链接。请改用 `--beside` 或 `--to <dir>`。

## 恢复时提示文件 "changed after it was checked" 或 "has more than one link"

frost 发现已经检查过的文件发生了变化，或者尚未恢复完成的文件通过硬链接关联到了另一个名称。关闭正在修改恢复文件夹的程序，然后重试。如果尚未恢复完成的文件有硬链接，请改为恢复到一个新的空文件夹。

## frost 找不到你指定的快照

| frost 的提示 | 可以尝试 |
| --- | --- |
| no snapshot at or before ... | 更晚的时间。提示中会显示你最早的快照 |
| "maple" matches 2 snapshots, use more of the ID | 输入更多的 ID 字符，比如 `maple-absurd` |
| can't read "..." as a snapshot ID or time | 给带空格的时间加上引号，比如 `"3 days ago"` |

## frost 无法自我更新

frost 所在的文件夹不可写，或者它是从源代码构建的。参见[更新 frost](#updating)。

## 安装程序中途停止

| 安装程序的提示 | 该怎么做 |
| --- | --- |
| need OpenSSH 8.1+ to verify the frost release signature | 安装或更新 OpenSSH。在 Windows 上，请改用 PowerShell 安装程序 |
| checksums.txt isn't signed by the frost release key. Don't install this. | 不要安装。稍后再试，如果一直出现，请[报告这个问题](#getting-help) |
| the runtime in ... isn't signed by the OpenJS Foundation. Don't install this. | 不要安装。稍后再试，如果一直出现，请[报告这个问题](#getting-help) |
| checksum mismatch | 下载的文件损坏了。重新运行安装程序 |
| 32-bit ARM isn't supported by the bundled runtime | 没有适用于这台电脑的 frost 安装包 |
| installing frost needs Node.js 22 or newer | 更新 Node.js，或者改用安装程序，不用 npm 或 pnpm |

## 安装后找不到 `frost`

打开一个新的终端。安装 frost 时已经打开的终端看不到新的 `PATH`。使用 pnpm 时，先运行一次 `pnpm setup`，再打开一个新的终端。
