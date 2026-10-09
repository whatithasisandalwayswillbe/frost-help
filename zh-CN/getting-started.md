# 快速入门

frost 会把你的文件夹备份到你选择的存储中，而且所有内容在上传之前都会先在你的电脑上加密。本页带你从安装 frost 一直走到第一次备份。

## 你需要准备什么

- 一台 Mac、Linux 或 Windows 电脑，处理器为 64 位的 Intel、AMD 或 ARM。
- 一个存放备份的地方：[Permafrost](#permafrost) 访问密钥，或者某个 [S3 兼容服务商](#choosing-storage)的存储桶。
- 一个至少 56 列宽、18 行高的终端窗口，用来显示全屏的设置界面。

你不需要事先安装 Node.js 或任何其他软件。frost 自带运行时。

## 1. 安装 frost

在 macOS 或 Linux 上，在终端中运行下面的命令。在 Windows 上，请在 Git Bash 中运行。

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | sh
```

安装程序在安装任何东西之前，都会先检查发布版本的签名。[安装 frost](#installing)介绍了手动安装和安装程序的选项。

## 2. 进行设置

```sh
frost init
```

设置程序每个界面只问一件事：

1. **存储。** 备份存放在哪里。选择 Permafrost 或某个 S3 兼容服务商，然后粘贴它要求的密钥。
2. **文件夹。** 要备份的文件夹，比如 `~/Documents`。
3. **跳过。** 不需要备份的文件和文件夹。几个常见的项目已经预先填好了，比如 `node_modules`。
4. **计划。** frost 多久自动备份一次，或者关闭自动备份。
5. **恢复短语。** 用来解锁备份的 24 个单词。请把它们抄写下来。
6. **确认。** 核对所有设置，然后按 `[s]` 保存。

> 如果这台电脑丢失了，恢复短语是读取备份的唯一途径。没有人能帮你找回它，你的存储服务商不能，frost 的作者也不能。

[设置 frost](#setting-up)逐一介绍了每个界面。

## 3. 备份

先预览第一次备份会上传什么：

```sh
frost backup --dry-run
```

然后正式运行：

```sh
frost backup
```

第一次备份会上传所有内容，之后的备份只上传有变化的部分。如果你开启了自动备份，frost 从现在起会自己定时备份，你不需要再运行任何命令。

## 4. 查看状态

```sh
frost status
```

`status` 会显示上一次备份、下一次备份的时间、最近一次健康检查的结果，以及你最近的快照。

## 找回文件

打开快照浏览器，找到需要的内容，按 `[space]` 选中，再按 `[r]`：

```sh
frost browse
```

也可以在命令行中恢复。下面的命令会把文件的副本放进原文件旁边的一个新文件夹里：

```sh
frost restore latest ~/Documents/report.pdf --beside
```

[恢复文件](#restoring)对这两种方式都有介绍。

## 下一步

- [frost 的工作原理](#how-it-works)讲解快照、加密，以及哪些内容会被上传。
- [自动备份](#scheduling)介绍备份计划。
- [恢复短语](#recovery-phrase)说明如何保管好你的密钥。
