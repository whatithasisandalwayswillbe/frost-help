# 自动备份

frost 借助操作系统自带的计划程序按计划备份。两次备份之间，没有任何东西在后台运行。

## 更改备份计划

`frost init` 会询问多久备份一次。之后要修改：

```sh
frost config set schedule.every 6h
```

可选值有 `hourly`、`2h`、`3h`、`4h`、`6h`、`8h`、`12h`、`daily` 和 `weekly`，默认是 `daily`。

关闭或重新开启自动备份：

```sh
frost config set schedule.enabled false
frost config set schedule.enabled true
```

这两种修改都会立即更新计划任务。

## 备份在什么时候运行

| 计划程序 | 每天 | 每周 | 更频繁 |
| --- | --- | --- | --- |
| launchd（macOS）和 cron（Linux） | 03:17 | 每周日 03:17 | 每小时的第 17 分钟 |
| 任务计划程序（Windows） | 03:17 | 每周日 03:17 | 每隔几小时一次，从设置计划任务的时间开始计算 |
| systemd（Linux） | 午夜 | 每周一午夜 | 每个整点 |

时间按电脑的本地时间计算。systemd 每次会随机推迟最多 5 分钟启动。

## 错过的备份

launchd 和 systemd 会补跑。如果备份到点时电脑处于关机或睡眠状态，备份会在电脑唤醒后运行。cron 和任务计划程序会跳过错过的那次，下一次照常按时运行。

在 Windows 上，电脑使用电池供电时不会启动计划备份，拔掉电源时也会停止正在进行的计划备份。在 macOS 上以及使用 systemd 时，计划备份以低优先级运行，不会拖慢你的电脑。

## 计划任务

| 系统 | 计划程序 | 计划任务 |
| --- | --- | --- |
| macOS | launchd | `~/Library/LaunchAgents/io.github.whatithasisandalwayswillbe.frost.plist` |
| 使用 systemd 的 Linux | systemd 用户定时器 | `~/.config/systemd/user/frost-backup.service` 和 `frost-backup.timer` |
| 不使用 systemd 的 Linux | cron | crontab 中带有 `# frost-backup` 标记的一行 |
| Windows | 任务计划程序 | 一个名为 `frost backup` 的任务 |

计划任务运行 `frost backup` 时，使用的是设置它时的配置文件夹和缓存文件夹。如果你更改了这些文件夹，请再运行一次 `frost init`。

在 macOS 上，这个计划任务会以 **Node.js Foundation** 的名称出现在“系统设置 > 通用 > 登录项与扩展”（System Settings > General > Login Items & Extensions）中，Node.js Foundation 是 frost 自带运行时的发布者。在那里把它关掉会停止计划备份，`frost status` 也会报告计划任务缺失。如果想停止计划备份，请改用 `frost config set schedule.enabled false`。

使用 systemd 时，frost 会为你的用户开启 lingering（`loginctl enable-linger`），这样即使你已注销，备份也能运行。删除定时器时，它会再把 lingering 关掉，除非在 frost 之前它就已经开着。

## 日志

| 计划程序 | 日志位置 |
| --- | --- |
| launchd、cron 和任务计划程序 | frost 缓存文件夹中的 `frost.log`。参见[文件与文件夹](#files-and-folders) |
| systemd | 系统日志（journal）。用 `journalctl --user -u frost-backup` 查看 |

超过 1 MiB 的日志会在下一次运行前被清空。`frost status` 也会显示上一次备份是否成功。

## 计划任务丢失时

如果计划任务被删除或关闭，`frost status` 会显示 "scheduled job is missing"（计划任务缺失）。用下面的命令恢复它：

```sh
frost config set schedule.enabled true
```
