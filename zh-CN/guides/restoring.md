# 恢复文件

从任意快照中找回文件，可以恢复到新文件夹，也可以覆盖原文件。

最简单的方法是使用快照浏览器。运行 `frost browse`，找到需要的内容，按 `[space]` 选中，再按 `[r]`。参见[快照浏览器](#snapshot-browser)。本页介绍如何在命令行中恢复。

## 恢复命令

```sh
frost restore <snapshot> [paths...] --beside | --to <dir> | --overwrite
```

- **快照**：要从哪个快照恢复。参见下面的“选择快照”一节。
- **路径**：要恢复的文件或文件夹，每一项都连同其中的所有内容。不写路径就恢复整个快照。
- **位置**：`--beside`、`--to` 或 `--overwrite` 三者必须且只能选一个。

例如：

```sh
frost restore latest ~/Documents/taxes --beside
frost restore yesterday ~/notes.txt --to ~/Desktop
frost restore maple-absurd-3f1c --overwrite
```

`frost restore` 后面什么都不加，会打开快照浏览器。

## 选择快照

| 你输入 | 得到 |
| --- | --- |
| `latest` | 最新的快照 |
| `maple-absurd-3f1c`，或者只输入 `maple` | ID 为该值的快照，或者 ID 以你输入的内容开头的唯一一个快照 |
| `3 days ago`、`12h`、`2w`、`1 month ago` | 在该时间点或之前最新的快照 |
| `yesterday`、`today` | 截至那天结束时最新的快照 |
| `2026-09-20`、`2026-09-20 14:30` | 在那一天或那一分钟或之前最新的快照，按你的本地时间计算 |

时间可以用分钟（`m`）、小时（`h`）、天（`d`）、周（`w`）、月（`mo`）和年（`y`）表示，也可以写出完整的英文单词。带空格的内容要加引号，比如 `"3 days ago"`。

`frost status` 会列出你的快照及其 ID。如果你输入的内容匹配到多个 ID，frost 会让你多输入几个字符。

## 文件恢复到哪里

| 参数 | 恢复到 |
| --- | --- |
| `--beside` | 原文件旁边的一个新的 `frost-restore-<id>` 文件夹 |
| `--to <dir>` | `<dir>` 中的一个新的 `frost-restore-<id>` 文件夹，`<dir>` 必须已经存在 |
| `--overwrite` | 原来的位置，替换那里现有的文件。frost 会先询问，`-y` 可以跳过询问 |

新文件夹绝不会覆盖任何东西。在新文件夹里，恢复的内容保留自己的名称，并按所选内容共同所在的文件夹来排布：

| 你恢复 | `--beside` 的结果 |
| --- | --- |
| `~/Documents/taxes` | `~/Documents/frost-restore-<id>/taxes/...` |
| `~/notes.txt` | `~/frost-restore-<id>/notes.txt` |
| `~/Documents/a` 和 `~/Pictures/b` | `~/frost-restore-<id>/Documents/a` 和 `~/frost-restore-<id>/Pictures/b` |

新文件夹的名称使用快照的短 ID。如果这个名称已被占用，frost 会加上 `-1`、`-2` 等后缀。

在以下情况下无法使用 `--beside`：所选内容的共同文件夹只是某个磁盘的顶层；这个文件夹不在这台电脑上（比如快照来自另一台电脑）；或者你没有那里的写入权限。例如，把整个主文件夹的快照恢复到原位置旁边，就意味着要在 `/Users` 或 `/home` 中新建文件夹。遇到这些情况，请使用 `--to`。

## 覆盖原文件

`--overwrite` 会把文件放回原来的位置，替换那里现有的内容。frost 会先显示它要做什么，并询问你：

```text
┌  restore maple-absurd-3f1c  2026-10-07 03:17 (1d ago)
│
│  paths        /home/you/Documents/taxes
▲  into         original locations (existing files will be replaced)
│
│  Go ahead? [y/N]
```

- 已经与快照一致的文件会经过检查后跳过，不会重新下载。
- 不在快照中的文件保持不动。
- 每个文件会先写入它旁边的一个隐藏临时文件，再替换过去。你需要有足够的空间同时容纳正在恢复的文件的两份副本。
- 快照必须来自同一类电脑：macOS 和 Linux 的快照只能覆盖到 macOS 或 Linux 上，Windows 的快照只能覆盖到 Windows 上。
- 如果路径中经过一个其他用户可能改动过的文件夹链接，frost 不会通过它恢复。遇到这种情况，它会在询问之前说明原因，浏览器中的 "Overwrite original files" 选项也会变成灰色。

## 安全检查

每个数据块在写入之前都会先解密，并与它的 ID 核对。每个文件只有在完整写好之后才会改成真正的名称，所以失败的恢复绝不会在原本存放真实文件的地方留下写了一半的文件。

恢复出来的符号链接保留原来的目标，这些目标可能指向恢复文件夹之外。

## 中断的恢复

如果恢复中途停止，比如网络断开、按了 `Ctrl+C` 或电脑进入睡眠，frost 会打印出继续恢复的命令：

```text
What's restored so far was kept. To carry on from there, run:

  frost restore maple-absurd-3f1c9a0b2e7 /home/you/Documents/taxes --beside
```

这条命令与原来的恢复相同，只是把 `latest` 或时间换成了快照的完整 ID，所以即使中间又做了一次备份，它指向的快照也不会变。已经恢复的文件会经过检查后跳过，frost 正在写入的文件会从最后一个完好的数据块继续。

在恢复完成之前，恢复文件夹中会有一个 `.frost-restore` 标记文件和一个 `.frost-partial-...` 文件。请不要动它们，frost 完成后会自动删除。

如果你的电脑丢失了，想在别处恢复，请参见[在新电脑上恢复](#new-computer)。
