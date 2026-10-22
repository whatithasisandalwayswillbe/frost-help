# Permafrost

Permafrost 是专为 Frost 打造的托管存储。连接只需要一个访问密钥，没有存储桶、区域或端点需要设置。

和其他存储一样，你的备份在上传之前就已经在你的电脑上加密了。Permafrost 读不到它们。

在 [getfro.st/perma/portal](https://getfro.st/perma/portal) 管理你的 Permafrost 账户。在快照浏览器中，先按 `[h]`，再按 `[p]` 即可打开。此快捷键仅适用于默认的 Permafrost 服务。

## 获取密钥

1. 运行 `frost init`，选择 **Permafrost**。
2. 选择 **I don't have a key yet**（我还没有密钥）。Frost 会在浏览器中打开 [getfro.st/perma](https://getfro.st/perma)。如果浏览器没有打开，请自己访问这个地址。
3. 在那里获取密钥并复制。
4. 把它粘贴到设置程序中。

如果你已经有密钥，选择 **I have a key**（我有密钥）并粘贴进去。

## 获取新密钥

如果你弄丢了密钥，请访问 [getfro.st/perma/recover](https://getfro.st/perma/recover)，输入你获取密钥时用的邮箱地址。你会收到一封邮件，里面的链接可以领取新密钥。新密钥会替换旧密钥，旧密钥在所有电脑上都会失效。

在每台使用 Permafrost 的电脑上换成新密钥：

```sh
frost config set storage.permafrost.token <new key>
```

在 Permafrost 不接受上传期间，`frost config set` 无法完成它的存储检查。这时请改用 `frost config edit`，把密钥填到 `[storage.permafrost]` 下的 `token` 里。

## 存储用量

`frost status` 会显示你用了多少 Permafrost 存储空间。当 Permafrost 有事要告诉你时，比如存储快满了，`frost status` 和 `frost backup` 会以警告的形式显示出来。参见[检查备份](#checking-backups)。

## Permafrost 拒绝请求时

Permafrost 的错误信息会说明原因。需要访问备份的命令会带着这条信息停止。

| 你看到的 | 含义 |
| --- | --- |
| the Permafrost access key was rejected | 密钥不对、已被更新的密钥替换，或者账户已关闭。错误信息会说明是哪一种。请使用你最新的密钥，或者获取一个新密钥 |
| uploads are paused | Permafrost 暂时不接受新的备份，恢复照常可用。错误信息会说明原因、持续到什么时候以及该怎么做 |
| your Permafrost storage is full | 这次上传放不下。错误信息会说明你存了多少以及该怎么做 |

在设置程序中，前两条会显示为 "Permafrost didn't accept that access key" 和 "Permafrost won't store backups with that access key"，后面跟着同样的原因。

## 兼容的服务器

除了默认服务器，Frost 还可以使用任何支持 [Permafrost API](https://github.com/whatithasisandalwayswillbe/frost/blob/main/docs/PERMAFROST.md) 的服务器。这适合已经在运行这类服务器的人。如果要备份到你自己的电脑上，[自托管](#self-hosted)存储只需要 SSH。

兼容的服务器必须遵守 API 的对象和错误规则，包括拒绝空的上传。服务器繁忙时，Frost 会自动重试。

第一次设置之前，请在 Frost 的配置文件夹中创建 `config.toml`，填入下面的设置。文件夹位置见[文件与文件夹](#files-and-folders)。请把地址换成自己服务器的地址：

```toml
[storage]
backend = "permafrost"

[storage.permafrost]
url = "https://<your-server>"
```

然后运行 `frost init`，选择 Permafrost，粘贴访问密钥，选择要备份的文件夹并保存。如果服务器为空，设置程序会创建仓库。

如果 Frost 已经设置好了，请用 `frost config edit` 在现有文件中同时修改后端和服务器地址。如果新服务器为空，请接受警告，输入 `yes` 保存，然后再次运行 `frost init`。`frost config set` 会拒绝空的目标位置，所以不能用它来准备新服务器。

地址必须使用 `https://`，只有运行在你自己电脑上的服务器例外，比如 `http://localhost:8080`。把这项设置留空，就会使用默认的 Permafrost 服务器 `https://permafrost.wihiaawb.com`。
