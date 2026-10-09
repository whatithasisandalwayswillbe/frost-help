# 安装 frost

在 macOS、Linux 和 Windows 上，一条命令就能装好 frost。每个发布版本都自带运行时，所以不需要事先安装任何东西。

## 支持的系统

| 系统 | 处理器 |
| --- | --- |
| macOS | Apple 芯片（`arm64`）和 Intel（`amd64`） |
| Linux | `amd64` 和 `arm64` |
| Windows | `amd64` 和 `arm64` |

没有面向 32 位 ARM 的安装包，比如较旧的树莓派系统。在 Windows 上，WSL 会安装 Linux 版的安装包。

## 安装程序

在 macOS 或 Linux 上，在终端中运行下面的命令。在 Windows 上，请在 Git Bash 中运行。

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | sh
```

安装程序会：

1. 下载适合你系统的最新发布版本。
2. 检查发布版本的签名和下载文件的校验和，只要有一项不对就停止。
3. 把 frost 安装到你的用户目录中，并在 `PATH` 中的某个文件夹里放一个 `frost` 启动器。

它需要 `curl` 或 `wget`，还需要 OpenSSH 8.1 或更新版本中的 `ssh-keygen` 来检查签名。

如果你有 `/usr/local/bin` 的写入权限，启动器会放在那里，否则放在 `~/.local/bin`。在 Windows 上，启动器放在 `~/bin`。如果这个文件夹还不在你的 `PATH` 中，安装程序会打印出添加它的命令。

安装完成后，运行 `frost init` 来设置你的第一次备份。参见[设置 frost](#setting-up)。

## 安装程序选项

| 变量 | 作用 |
| --- | --- |
| `FROST_INSTALL_DIR` | 把启动器放到这个文件夹中 |
| `FROST_VERSION` | 安装指定的发布版本，比如 `v0.1.0`，而不是最新版本 |

例如：

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | FROST_INSTALL_DIR="$HOME/bin" sh
```

更改启动器所在的文件夹，不会移动 frost 本身。[文件与文件夹](#files-and-folders)列出了所有内容的位置。

## 手动安装

1. 从[最新发布版本](https://github.com/whatithasisandalwayswillbe/frost/releases/latest)下载适合你系统的压缩包。压缩包的名称形如 `frost_0.1.0_linux_amd64.tar.gz`，Windows 上是 `.zip`。
2. 在运行其中的任何内容之前，先验证下载的文件，方法见下面的“验证下载”一节。
3. 把它解压到一个新的空文件夹中。
4. 在解压出来的文件夹中运行自带的安装程序，并告诉它启动器要放在哪个文件夹。

在 macOS 或 Linux 上：

```sh
./runtime/bin/node install.mjs "$PWD" "$HOME/.local/bin"
```

在 Windows 上，使用 PowerShell：

```powershell
.\runtime\bin\node.exe .\install.mjs "$PWD" "$env:LOCALAPPDATA\frost\bin"
```

如果启动器所在的文件夹还不在 `PATH` 中，请把它加进去。在 Windows 上，`frost.cmd` 可以在命令提示符和 PowerShell 中使用，`frost` 可以在 Git Bash 中使用。

如果想直接运行解压出来的安装包而不安装，可以直接使用其中的 `frost` 启动器（Windows 上是 `frost.cmd`），并让它的所有文件保持在一起。

## 验证下载

安装程序会自动完成这一步。如果想自己检查压缩包，请从同一个发布版本中下载它以及 `checksums.txt` 和 `checksums.txt.sig`，再从代码仓库下载 [`release-signing.pub`](https://github.com/whatithasisandalwayswillbe/frost/blob/main/install/release-signing.pub)。把 `archive` 设为压缩包的文件名，然后运行：

```sh
archive='frost_X.Y.Z_linux_amd64.tar.gz'
printf 'frost-release %s\n' "$(cat release-signing.pub)" > allowed_signers
ssh-keygen -Y verify -f allowed_signers -I frost-release -n file -s checksums.txt.sig < checksums.txt
awk -v archive="$archive" '$2 == archive { print }' checksums.txt | shasum -a 256 -c -
```

第一项检查应当输出 `Good "file" signature`，第二项应当在压缩包名称后面输出 `OK`。只要有一项不是这样，就不要安装。
