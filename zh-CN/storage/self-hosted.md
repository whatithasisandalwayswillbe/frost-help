# 自托管

通过 SSH，把备份存到你自己管理的电脑上的一个文件夹里。可以是 Linux 服务器、NAS、Raspberry Pi、VPS，也可以是开启了 SSH 服务器的 Mac 或 Windows 电脑。frost 使用你电脑上已有的 SSH 客户端，所以服务器上不需要安装任何东西。

## 开始之前

- 服务器需要开启 SSH 和 SFTP。大多数 Linux 服务器两者都有。在 NAS 上，请到终端或文件服务的设置中查找。
- 你需要一个能写入目标文件夹的服务器账户。最好专门为备份建一个账户。
- 在 Windows 上，需要安装 OpenSSH 客户端。通常已经装好了。如果没有，请在“设置”的“系统 > 可选功能”中添加。

## 在设置程序中

运行 `frost init`，选择 **Self-hosted**。

| 设置程序的问题 | 回答 |
| --- | --- |
| What is the server SSH address? | 用户和主机，比如 `me@nas.local`，或者 SSH 配置中的某个 `Host`。如果端口不同，加上 `:2222` 这样的后缀 |
| Which folder on the server? | 默认是 `frost`，位于你在服务器上的主文件夹中。也可以填写完整路径，比如 `/srv/backups/frost` |

如果文件夹的最后一级不存在，设置程序会创建它。它所在的上级文件夹必须已经存在。

## frost 的 SSH 密钥

frost 会在首次设置时创建专用的 SSH 密钥。不需要你的个人密钥或 SSH 代理，也不会询问密码，因此计划备份每次都以相同的方式登录。

服务器还不认识 frost 的密钥，所以第一次时，设置程序会问你怎样添加：

- **Add it for me**（替我添加）会把终端交给 ssh。第一次连接某台服务器时，ssh 会显示它的指纹，并询问你是否信任它。接着它会询问你在服务器上的密码，添加 frost 的密钥，然后设置程序继续。你的密码只交给 ssh。frost 永远看不到也不会保存它。
- **I'll add it myself**（我自己添加）会显示 frost 公钥文件的位置。把这个文件中的那一行添加到服务器上的 `~/.ssh/authorized_keys`，然后按 `[enter]`。

| 电脑 | frost 的公钥 |
| --- | --- |
| macOS 和 Linux | `~/.config/frost/ssh/frost_ed25519.pub` |
| Windows | `%AppData%\frost\ssh\frost_ed25519.pub` |

由设置程序添加密钥时，那一行以 `restrict` 开头。它会禁用连接转发和终端分配，但 frost 仍然可以读写文件。除非服务器将该账户限制为仅使用 SFTP，否则仍然可以执行 shell 命令。

### 手动添加密钥

在 macOS 或 Linux 上，下面的命令会在密钥前加上 `restrict` 再添加，并询问你在服务器上的密码：

```sh
(printf 'restrict '; cat ~/.config/frost/ssh/frost_ed25519.pub) | ssh me@nas.local 'umask 077; mkdir -p .ssh; cat >> .ssh/authorized_keys'
```

有些 NAS 系统也允许你在账户设置中粘贴 SSH 密钥。

Windows 服务器把密钥放在别的位置，所以 **Add it for me** 在那里用不了。如果是标准账户，把那一行添加到 `C:\Users\<you>\.ssh\authorized_keys`；如果是管理员，添加到 `C:\ProgramData\ssh\administrators_authorized_keys`。

## 端口和 SSH 配置

frost 与 ssh 一样读取 `~/.ssh/config`。你可以用 `Host` 条目设置用户、端口等选项，并将条目名称作为地址输入。frost 会提供专用密钥，但 SSH 配置中通过 `IdentityFile` 明确指定的密钥也可能被提供给服务器。

## 注意事项

- 服务器的文件系统需要支持硬链接，frost 用它来确保两台电脑永远不会互相覆盖备份记录。ext4、Btrfs、XFS、ZFS、APFS 和 NTFS 都支持。设置程序会在连接时检查这一点。
- 如果服务器的主机密钥变了，frost 会像 ssh 一样拒绝连接。如果你重装了服务器，请用 `ssh-keygen -R <host>` 删除旧密钥，然后再次运行 `frost init`。
- `frost status` 会显示服务器磁盘的使用情况，`frost backup` 会在快满时发出警告。
- 如果文件夹位于服务器挂载的磁盘上，备份运行时这块磁盘必须已经挂载。如果文件夹不在，备份会失败，而不会写到别的地方。
