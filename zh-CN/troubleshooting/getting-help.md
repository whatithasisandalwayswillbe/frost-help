# 获取帮助

如果这些文档没有涵盖你的问题，可以通过下面的方式了解更多情况并寻求帮助。

## 先自己看看

- `frost status` 会显示上一次备份的结果、备份的健康状况，以及连接存储时遇到的任何问题。
- `frost -h` 会列出所有命令和参数。
- 计划备份日志记录了自动备份期间发生的事情。参见[自动备份](#scheduling)。
- [常见问题](#common-problems)汇总了大家最常看到的提示。

## 在 GitHub 上提问

在 [github.com/whatithasisandalwayswillbe/frost/issues](https://github.com/whatithasisandalwayswillbe/frost/issues) 提交一个 issue，并附上：

- 你的 frost 版本（来自 `frost --version`）和操作系统。
- 你运行了什么，以及你期望发生什么。
- 实际发生了什么，附上完整的提示信息。
- `frost status` 或日志中的相关内容。

> 永远不要公开你的恢复短语、密钥文件、访问密钥，或者包含凭据的 `config.toml`。`frost config` 会遮住凭据，除非你加上 `--show-secrets`。在发布之前，请检查你粘贴的所有内容。

## 安全问题

不要在公开的 issue 中报告安全问题。参见[安全与隐私](#security)，了解如何私下报告。
