# 常见问题

本页汇总了大家最常遇到的提示和问题。每个标题要么是 Frost 显示的原文，要么是你会注意到的现象。

## "Frost isn't set up yet, run `frost init`"

Frost 找不到 `config.toml`。运行 `frost init`。如果你使用了 `--config-dir` 或 `FROST_CONFIG_DIR`，请检查它是否指向了正确的文件夹。

## "no key on this machine"

密钥文件不见了。如果这台电脑已经设置好了存储，运行 `frost key import` 并输入你的恢复短语。否则，运行 `frost init`。

## "a backup or restore operation is already in progress"

另一个 Frost 进程正在使用你的备份，通常是计划备份。如果是计划备份，Frost 会提示 "a scheduled backup is already running"，并说明它何时开始。等它结束后再试。删除 Frost 的锁文件并不能停止那个进程。

## "the local encryption key does not match"

你的存储中的备份是用另一个密钥创建的。运行 `frost key verify`，输入你抄写的恢复短语，看看它对应的是哪个密钥。如果它就是正确的那个，用它运行 `frost key import`。

## Frost 找不到你的备份

"has no Frost repository" 这类提示，意味着你的备份不在 Frost 正在查找的位置。错误信息会说明它们上次是在哪里打开的，以及如何找回它们。参见[迁移备份](#moving-backups)。

如果你的访问密钥仍然有效，备份却从 Permafrost 消失了，那它们很可能是用这个密钥删除的。请立即发邮件到 care@getfro.st。如果别人可能拿到了你的密钥，请到 [getfro.st/perma/recover](https://getfro.st/perma/recover) 领取新密钥。

## 设置程序无法连接

设置程序会说明问题所在，并带你回到最可能出错的那个答案。

| 设置程序的提示 | 检查 |
| --- | --- |
| Access key ID not recognized | 你是否完整复制了访问密钥 ID |
| The secret key does not match the access key ID | 你是否完整复制了私密密钥，以及它是否属于这个密钥 ID |
| No bucket found with that name | 存储桶的名称，或者先创建存储桶 |
| The provided key lacks necessary bucket permissions | 这个密钥能否在存储桶中读取、列出、写入和删除对象 |
| The bucket is located in a different region | 区域或端点 |
| Cannot resolve ... | 地址，以及你的网络连接 |
| No response from that address | 地址和端口 |
| The server's TLS certificate is not valid for that address | 地址，以及服务器证书是否涵盖这个地址 |
| the storage host timed out | 你的网络连接，然后重试 |
| cannot reach Permafrost | 你的网络连接，然后重试 |
| Cannot locate the server | SSH 地址和你的网络 |
| The server did not respond | SSH 地址，以及服务器是否已开机 |
| That server does not support SFTP | 服务器的 SSH 或文件服务设置中是否开启了 SFTP |
| server returned text before opening SFTP subsystem | 服务器上的登录脚本，比如 `.bashrc`，是否输出了内容。让它只在交互式 shell 中输出 |
| There's no folder ... on ... | 文件夹的路径。它所在的上级文件夹必须存在 |
| The server denied write access to that folder | Frost 登录所用账户对该文件夹的权限 |
| ... not found. Connect the required drive and try again | 磁盘是否已连接，路径是否正确 |
| Unable to write to that folder | 文件夹的权限。在 macOS 上，参见[macOS 权限](#macos-permissions) |
| Symbolic links and directory junctions are not supported for backup folders | 使用文件夹的真实路径 |
| That drive is read-only | 使用一块可以写入的磁盘 |

## "This storage provider does not support conditional writes"

你的存储不支持 Frost 需要的一项功能，Frost 要靠它防止多台电脑互相覆盖备份记录。换密钥或改设置都解决不了。请选择其他存储。参见[选择存储](#choosing-storage)。

自托管服务器或磁盘的提示不同。服务器会显示 "cannot create hard links"，或者文件夹显示 "on an unsupported filesystem"。请使用 ext4、Btrfs、XFS、ZFS、APFS 或 NTFS 这类文件系统上的文件夹。

## "the server didn't accept Frost's SSH key"

你的自托管服务器拒绝了 Frost 的密钥，比如密钥已从 `authorized_keys` 中删除。运行 `frost init`，重新添加密钥。参见[自托管](#self-hosted)。

## "the server's SSH host key has changed"

服务器的身份变化时，Frost 会像 ssh 一样拒绝连接。如果你重装了服务器，或者它换了新地址，请用 `ssh-keygen -R <host>` 删除旧密钥，然后再次运行 `frost init`。否则，请先查明密钥为什么变了，再去连接。

## "... not found. Connect the required drive and try again"

你的备份所在的磁盘没有连接，或者文件夹的路径变了。请连接磁盘。如果 Windows 给它分配了另一个盘符，参见[本地磁盘](#local-drive)。

## "the Permafrost access key was rejected"

错误信息后面会附上 Permafrost 给出的原因：密钥不对、已被更新的密钥替换，或者账户已关闭。请使用你最新的密钥，或者获取一个新密钥。参见 [Permafrost](#permafrost)。

## "uploads are paused"

Permafrost 目前不接受你账户的新备份。错误信息会说明原因和持续到什么时候，恢复照常可用。参见 [Permafrost](#permafrost)。

## 备份无法读取某个文件夹

在 macOS 上，这通常是隐私权限的问题。错误信息会说明需要允许什么。参见 [macOS 权限](#macos-permissions)。在其他系统上，请检查你的用户能否读取这个文件夹。

## 文件被列为 "couldn't be read"

Frost 跳过了这些文件，其余内容照常保存。常见原因有：你没有读取权限的文件、在备份过程中被删除的文件，以及在 macOS 上 iCloud 只保存在云端的文件。

## 文件 "continued changing while being read"

备份过程中有程序在写入这些文件，所以快照保留了它们之前的副本。关闭那个程序后再备份一次，或者等下一次备份时自然会补上。

## 文件夹 "not found"

列表中的某个文件夹不在，所以 Frost 备份了其余的文件夹。把移动硬盘重新插上；如果文件夹换了位置，就用 `frost init` 更新你的列表。

## "config.toml changed, but updating the scheduled job failed"

你编辑了 `config.toml`，但 Frost 无法让计划任务与之一致。消息的其余部分说明了原因。如果提到了某个设置，请在 `config.toml` 里修正它。Frost 每次运行命令都会重试，直到成功。

## "config.toml changed where backups go"

你在 `config.toml` 里修改了备份的位置，Frost 第一次使用新位置时发现了问题。消息的其余部分说明了是什么问题。参见[迁移备份](#moving-backups)。

## "scheduled job is missing"

计划任务被删除或关闭了。用 `frost config set schedule.enabled true` 恢复它。

## 计划备份没有运行

- 查看 `frost status` 中的 "next backup" 这一行。
- 在 macOS 上，检查“系统设置 > 通用 > 登录项与扩展”（System Settings > General > Login Items & Extensions）中 Frost 的开关。它显示为 Node.js Foundation。
- 在 Windows 上，计划备份需要你保持登录，并且使用电池供电时不会运行。
- 如果 `schedule.catch_up` 设为 `false`，备份到点时电脑处于关机或睡眠状态，这次备份会被跳过。
- 查看日志。参见[自动备份](#scheduling)。

## "verification failed"

抽查发现你的存储中有数据缺失或损坏。参见[检查备份](#checking-backups)。

## "cannot restore alongside original files"

原文件旁边的文件夹无法使用，通常是因为快照来自另一台电脑。请改用 `--to <dir>`。参见[恢复文件](#restoring)。

## "cannot overwrite original files"

快照来自另一类系统，或者通往原文件的路径经过了一个 Frost 不信任的链接。请改用 `--beside` 或 `--to <dir>`。

## 恢复时提示文件 "changed after it was checked" 或 "has more than one link"

Frost 发现已经检查过的文件发生了变化，或者尚未恢复完成的文件通过硬链接关联到了另一个名称。关闭正在修改恢复文件夹的程序，然后重试。如果尚未恢复完成的文件有硬链接，请改为恢复到一个新的空文件夹。

## Frost 找不到你指定的快照

| Frost 的提示 | 可以尝试 |
| --- | --- |
| no snapshot at or before ... | 更晚的时间。提示中会显示你最早的快照 |
| "maple" matches 2 snapshots; provide additional ID characters | 输入更多的 ID 字符，比如 `maple-absurd` |
| cannot parse "..." as a snapshot ID or timestamp | 给带空格的时间加上引号，比如 `"3 days ago"` |

## Frost 无法自我更新

Frost 所在的文件夹不可写，或者它是从源代码构建的。参见[更新 Frost](#updating)。

## 安装程序中途停止

| 安装程序的提示 | 该怎么做 |
| --- | --- |
| need OpenSSH 8.1+ to verify the Frost release signature | 安装或更新 OpenSSH。在 Windows 上，请改用 PowerShell 安装程序 |
| checksums.txt signature does not match official Frost release key; installation aborted | 不要安装。稍后再试，如果一直出现，请[报告这个问题](#getting-help) |
| runtime inside ... lacks valid OpenJS Foundation signature; installation aborted | 不要安装。稍后再试，如果一直出现，请[报告这个问题](#getting-help) |
| checksum mismatch | 下载的文件损坏了。重新运行安装程序 |
| 32-bit ARM isn't supported by the bundled runtime | 没有适用于这台电脑的 Frost 安装包 |
| installing Frost requires Node.js v22 or newer | 更新 Node.js，或者改用安装程序，不用 npm 或 pnpm |

## 安装后找不到 `frost`

打开一个新的终端。安装 Frost 时已经打开的终端看不到新的 `PATH`。使用 pnpm 时，先运行一次 `pnpm setup`，再打开一个新的终端。
