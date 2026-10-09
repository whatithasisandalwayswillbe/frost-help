# 卸载 frost

frost 没有卸载命令，不过手动删除它只需要几个步骤。

> 卸载 frost 不会删除你的备份。如果你以后可能还想找回它们，请在删除这台电脑上的密钥之前，确认你手上有恢复短语。`frost key show` 会把它显示出来。

## 1. 删除计划任务

```sh
frost config set schedule.enabled false
```

这会把计划任务从操作系统的计划程序中删除。在使用 systemd 的 Linux 上，如果 frost 记录过自己开启了 lingering，它也会把 lingering 关掉。

## 2. 删除 frost 的文件

这一步会删除应用程序、它的启动器、你的设置、你的密钥以及 frost 的缓存。如果你改过位置，请把下面的路径换成 frost 自己的文件和文件夹。`FROST_CONFIG_DIR` 和 `FROST_CACHE_DIR` 直接指向 frost 的文件夹；`XDG_CONFIG_HOME`、`XDG_CACHE_HOME` 和 `XDG_DATA_HOME` 则包含一个 `frost` 子文件夹。绝不要删除 XDG 根文件夹或共享文件夹本身。[文件与文件夹](#files-and-folders)列出了所有位置。

在 macOS 上：

```sh
rm -rf ~/Library/Application\ Support/frost ~/.config/frost ~/.cache/frost
rm -f /usr/local/bin/frost ~/.local/bin/frost
```

在 Linux 上：

```sh
rm -rf ~/.local/share/frost ~/.config/frost ~/.cache/frost
rm -f /usr/local/bin/frost ~/.local/bin/frost
```

在 Windows 上，使用 PowerShell：

```powershell
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\frost", "$env:APPDATA\frost"
Remove-Item -Force "$HOME\bin\frost", "$HOME\bin\frost.cmd"
```

如果你把启动器装在了别的地方，请到那里删除它。

## 3. 删除备份（如果你愿意）

在你删除之前，备份会一直留在你的存储中。如果使用 S3 服务商，它们位于存储桶中的一个文件夹里，除非你另选了文件夹，否则就是 `frost`。删除这个文件夹即可移除备份。没有你的恢复短语，任何人都读不了里面剩下的内容。
