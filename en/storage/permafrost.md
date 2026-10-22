# Permafrost

Permafrost is hosted storage made for Frost. Connecting takes a single access key, with no bucket, region or endpoint to set up.

Your backups are encrypted on your computer before they're uploaded, the same as with any other storage. Permafrost can't read them.

Manage your Permafrost account at [getfro.st/perma/portal](https://getfro.st/perma/portal). In the snapshot browser, press `[h]` then `[p]` to open it. This shortcut is available only for the default Permafrost service.

## Getting a key

1. Run `frost init` and choose **Permafrost**.
2. Choose **I don't have a key yet**. Frost opens [getfro.st/perma](https://getfro.st/perma) in your browser. If it doesn't open, go there yourself.
3. Get your key there and copy it.
4. Paste it into setup.

If you already have a key, choose **I have a key** and paste it.

## Getting a new key

If you lose your key, go to [getfro.st/perma/recover](https://getfro.st/perma/recover) and enter the email address you used to get it. The email you receive links to a new key. The new key replaces the old one, which stops working on every computer.

On each computer that uses Permafrost, swap in the new key:

```sh
frost config set storage.permafrost.token <new key>
```

While Permafrost isn't accepting uploads, `frost config set` can't run its storage check. Use `frost config edit` instead, and put the key in `token` under `[storage.permafrost]`.

## Storage use

`frost status` shows how much of your Permafrost storage you use. When Permafrost has something to tell you, such as storage that's nearly full, `frost status` and `frost backup` show it as a warning. See [Checking your backups](#checking-backups).

## When Permafrost refuses

Permafrost's errors say why. Commands that access your backups stop with that message.

| You see | What it means |
| --- | --- |
| the Permafrost access key was rejected | The key is wrong, a newer key replaced it, or the account closed. The message says which. Use your newest key, or get a new one |
| uploads are paused | Permafrost isn't accepting new backups for now. Restores still work. The message says why, until when, and what to do |
| your Permafrost storage is full | The upload doesn't fit. The message says how much you store and what to do |

During setup, the first two read "Permafrost didn't accept that access key" and "Permafrost won't store backups with that access key", followed by the same reason.

## A compatible server

Instead of the default server, Frost can use any server that speaks the [Permafrost API](https://github.com/whatithasisandalwayswillbe/frost/blob/main/docs/PERMAFROST.md). This is for people who run such a server. To back up to a computer of your own, [Self-hosted](#self-hosted) storage only needs SSH.

A compatible server must follow the API's object and error rules, including refusing empty uploads. Frost retries automatically when a server is busy.

Before your first setup, create `config.toml` in Frost's config folder, as listed in [Files and folders](#files-and-folders), with these settings. Replace the address with your server's:

```toml
[storage]
backend = "permafrost"

[storage.permafrost]
url = "https://<your-server>"
```

Then run `frost init`, choose Permafrost, paste your access key, pick your folders and save. Setup creates the repository if the server is empty.

If Frost is already set up, use `frost config edit` to change the backend and server address together in the existing file. Accept the warning if the new server is empty, type `yes` to save, then run `frost init` again. `frost config set` refuses an empty destination, so it can't prepare a new server.

The address must use `https://`, except for a server on your own computer, like `http://localhost:8080`. Leave the setting blank to use the default Permafrost server, `https://permafrost.wihiaawb.com`.
