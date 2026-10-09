# macOS 权限

macOS 会保护一些文件夹，比如桌面、文稿和下载，以及邮件、Safari 浏览器等 App 的数据。程序必须先获得你的许可，才能读取它们。

## 你自己运行的备份

当你在终端中运行 `frost backup` 时，macOS 询问的是你的终端 App，比如终端、iTerm、Visual Studio Code、Warp 或 Ghostty。允许之后，frost 就能读取这些文件夹。

## 计划备份

计划备份运行的是 frost 自带的运行时，macOS 会把它当作一个独立的程序：

```text
~/Library/Application Support/frost/app/runtime/bin/node
```

它第一次读取 `~/Desktop`、`~/Documents` 或 `~/Downloads` 时，macOS 会询问你。对于其他受保护的文件夹，比如 `~/Library/Mail` 和 `~/Library/Safari`，macOS 会直接拒绝访问，不会询问。

## 完全磁盘访问权限

要让 frost 能读取你备份的每个文件夹，请给它完全磁盘访问权限：

1. 打开“系统设置 > 隐私与安全性 > 完全磁盘访问权限”（System Settings > Privacy & Security > Full Disk Access）。
2. 点按添加按钮，然后按 `Cmd+Shift+G`，粘贴上面那个运行时的路径。
3. 选择 `node` 并点按“打开”，然后确认它的开关已打开。
4. 对你的终端 App 做同样的操作，用于你自己运行的备份。

frost 更新后，这项权限会继续保留。

当 macOS 阻止某次备份时，frost 的错误信息会说明需要允许哪个 App 或文件。

## iCloud 云盘

frost 不会下载 iCloud 只保存在云端的文件，所以备份永远不会占满你的磁盘，也不会等着文件下载。这些文件会被跳过并列出来。如果想备份它们，请在访达中让它们始终下载在这台 Mac 上。

## 登录项

frost 的计划任务会以 **Node.js Foundation** 的名称出现在“系统设置 > 通用 > 登录项与扩展”（System Settings > General > Login Items & Extensions）中，Node.js Foundation 是 frost 自带运行时的发布者。请让它保持开启。参见[自动备份](#scheduling)。
