# 自动备份

frost 借助操作系统自带的计划程序按计划备份。两次备份之间，没有任何东西在后台运行。

## 更改备份计划

`frost init` 会询问多久备份一次。之后要修改：

```sh
frost config set schedule.every 6h
```

可选值有 `hourly`、`2h`、`3h`、`4h`、`6h`、`8h`、`12h`、`daily` 和 `weekly`，默认是 `daily`。

要选择备份的时间，可以设置一个 24 小时制的时间，并为每周备份选定星期几：

```sh
frost config set schedule.time 09:30
frost config set schedule.day friday
```

默认值是 `15:00` 和 `sunday`。关闭或重新开启自动备份：

```sh
frost config set schedule.enabled false
frost config set schedule.enabled true
```

每项修改都会立即更新计划任务。在 macOS 和 Windows 上，计划备份进行期间做的修改，会在那次备份结束后立即生效。 如果你自己编辑 `config.toml`，下一个 frost 命令会更新计划任务。

## 备份在什么时候运行

备份在 `schedule.time` 运行，按电脑的本地时间计算：

| `schedule.every` | 备份时间 |
| --- | --- |
| `daily` | 每天的这个时间 |
| `weekly` | 每周 `schedule.day` 的这个时间 |
| `2h` 到 `12h` | 这个时间，以及它前后每隔一个间隔的时间。从 `15:00` 起算的 `6h` 会在 03:00、09:00、15:00 和 21:00 运行 |
| `hourly` | 每小时一次，在这个时间的分钟数运行 |

systemd 每次会随机推迟最多 5 分钟启动。

## 错过的备份

如果备份到点时电脑处于关机或睡眠状态，frost 会在电脑恢复后备份。不管错过了多少次，都只备份一次。

| 计划程序 | 补上错过的备份 |
| --- | --- |
| launchd（macOS） | Mac 唤醒时，或关机后你登录时 |
| systemd（Linux） | 电脑唤醒或启动时；如果 lingering 没有开启，则在你登录时 |
| 任务计划程序（Windows） | 电脑恢复且你已登录后尽快运行 |
| cron（Linux） | 电脑恢复后 15 分钟内 |

使用 cron 时，frost 每 15 分钟检查一次，只在有备份到期或被错过时才备份。某个时间点已经备份过的话，无论是计划备份还是你自己运行的，都不会再备份第二次。

如果想跳过错过的备份，只按时备份：

```sh
frost config set schedule.catch_up false
```

如果计划备份启动时网络还没恢复，或者磁盘、网络共享还没挂载，它会在大约 5 分钟内重试。使用[本地磁盘](#local-drive)时，备份运行时磁盘必须已连接。[自托管](#self-hosted)存储用 frost 自己的 SSH 密钥登录，所以不需要你在场也能运行。如果另一个备份正在运行，它会等那个备份结束。

在 Windows 上，只有你登录后才会运行计划备份。电脑使用电池供电时不会启动计划备份，拔掉电源时也会停止正在进行的计划备份。在 macOS 上以及使用 systemd 时，计划备份以低优先级运行，不会拖慢你的电脑。

## 计划任务

| 系统 | 计划程序 | 计划任务 |
| --- | --- | --- |
| macOS | launchd | `~/Library/LaunchAgents/io.github.whatithasisandalwayswillbe.frost.plist` |
| 使用 systemd 的 Linux | systemd 用户定时器 | `~/.config/systemd/user/frost-backup.service` 和 `frost-backup.timer` |
| 不使用 systemd 的 Linux | cron | crontab 中带有 `# frost-backup` 标记的一行 |
| Windows | 任务计划程序 | 一个名为 `frost backup` 的任务 |

计划任务运行 `frost backup` 时，使用的是设置它时的配置文件夹和缓存文件夹。如果你更改了这些文件夹，请再运行一次 `frost init`。

在 macOS 上，这个计划任务会以 **Node.js Foundation** 的名称出现在“系统设置 > 通用 > 登录项与扩展”（System Settings > General > Login Items & Extensions）中，Node.js Foundation 是 frost 自带运行时的发布者。在那里把它关掉会停止计划备份，`frost status` 也会报告计划任务缺失。如果想停止计划备份，请改用 `frost config set schedule.enabled false`。

使用 systemd 时，如果能确认 lingering 处于关闭状态，frost 会尝试为你的用户开启它（`loginctl enable-linger`）。lingering 让备份能在你注销后继续运行。如果 frost 无法开启它，注销后备份可能就不会运行。删除定时器时，只有 frost 记录过自己开启了 lingering，才会把它关掉。

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
