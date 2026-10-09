# Permafrost

Permafrost 是专为 frost 打造的托管存储。连接只需要一个访问密钥，没有存储桶、区域或端点需要设置。

和其他存储一样，你的备份在上传之前就已经在你的电脑上加密了。Permafrost 读不到它们。

## 获取密钥

1. 运行 `frost init`，选择 **Permafrost**。
2. 选择 **I don't have a key yet**（我还没有密钥）。frost 会在浏览器中打开一个页面，你可以在那里获取密钥。
3. 拿到密钥后，页面会把它发回给 frost，frost 会立即保存。此后即使退出设置程序，密钥也不会丢失。

如果浏览器没有打开，请自己访问 [getfro.st/perma](https://getfro.st/perma)，然后在设置程序中按 `[p]`，粘贴页面给你的密钥。如果获取密钥的过程没有完成，按 `[r]` 重试，或按 `[p]` 粘贴一个密钥。frost 最多等待 25 分钟。

如果你已经有密钥，选择 **I have a key**（我有密钥）并粘贴进去。

## 密钥如何到达 frost

等待期间，frost 会在 `127.0.0.1` 上监听，只有你自己的电脑能访问这个地址。它会给页面一个随机值，并且只接受带着同一个值返回的密钥，所以其他页面无法塞给 frost 一个它们自己的密钥。

页面也会把密钥显示给你，方便你自己复制到 frost 中，比如当浏览器在另一台电脑上的时候。

## 密钥被拒绝

如果 Permafrost 不再接受你的访问密钥，需要访问备份的命令会停止，并报错说明原因。运行 `frost init` 重新设置存储，获取一个能用的密钥。

| 设置程序的提示 | 该怎么做 |
| --- | --- |
| Permafrost didn't accept that access key | 检查你是否完整复制了密钥。密钥也可能已经过期 |
| That access key can't store backups | 在你的 Permafrost 账户中检查它的权限 |
| your Permafrost storage is full | 你的账户已经没有剩余空间。请查看你的 Permafrost 账户 |

## 你自己的服务器

任何人都可以运行一个支持 [Permafrost API](https://github.com/whatithasisandalwayswillbe/frost/blob/main/docs/PERMAFROST.md) 的服务器。

第一次设置之前，请在 frost 的配置文件夹中创建 `config.toml`，填入下面的设置。文件夹位置见[文件与文件夹](#files-and-folders)。请把地址换成自己服务器的地址：

```toml
[storage]
backend = "permafrost"

[storage.permafrost]
url = "https://<your-server>"
```

然后运行 `frost init`，选择 Permafrost，粘贴访问密钥，选择要备份的文件夹并保存。如果服务器为空，设置程序会创建仓库。

如果 frost 已经设置好了，请用 `frost config edit` 在现有文件中同时修改后端和服务器地址。如果新服务器为空，请接受警告，输入 `yes` 保存，然后再次运行 `frost init`。`frost config set` 会拒绝空的目标位置，所以不能用它来准备新服务器。

地址必须使用 `https://`，只有运行在你自己电脑上的服务器例外，比如 `http://localhost:8080`。把这项设置留空，就会使用默认的 Permafrost 服务器。
