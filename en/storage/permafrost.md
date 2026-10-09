# Permafrost

Permafrost is hosted storage made for frost. Connecting takes a single access key, with no bucket, region or endpoint to set up.

Your backups are encrypted on your computer before they're uploaded, the same as with any other storage. Permafrost can't read them.

## Getting a key

1. Run `frost init` and choose **Permafrost**.
2. Choose **I don't have a key yet**. frost opens a page in your browser where you can get one.
3. Once you have your key, the page sends it back to frost, which saves it straight away. Quitting setup after that doesn't lose it.

If the browser doesn't open, go to [getfro.st/perma](https://getfro.st/perma) yourself, then press `[p]` in setup to paste the key it gives you. If getting the key doesn't finish, press `[r]` to try again or `[p]` to paste one. frost waits up to 25 minutes.

If you already have a key, choose **I have a key** and paste it.

## How the key reaches frost

While it waits, frost listens on `127.0.0.1`, which only your own computer can reach. It gives the page a random value, and only accepts a key that comes back with that same value, so no other page can hand frost a key of its own.

The page also shows you the key, so you can copy it into frost yourself, for example when the browser is on another computer.

## Rejected keys

If Permafrost stops accepting your access key, commands that access your backups stop with an error that says so. Run `frost init` and set up storage again to get a working one.

| Setup says | What to do |
| --- | --- |
| Permafrost didn't accept that access key | Check you copied all of it. It may also have expired |
| That access key can't store backups | Check its permissions in your Permafrost account |
| your Permafrost storage is full | Your account has no space left. Check your Permafrost account |

## Your own server

Anyone can run a server that speaks the [Permafrost API](https://github.com/whatithasisandalwayswillbe/frost/blob/main/docs/PERMAFROST.md).

Before your first setup, create `config.toml` in frost's config folder, as listed in [Files and folders](#files-and-folders), with these settings. Replace the address with your server's:

```toml
[storage]
backend = "permafrost"

[storage.permafrost]
url = "https://<your-server>"
```

Then run `frost init`, choose Permafrost, paste your access key, pick your folders and save. Setup creates the repository if the server is empty.

If frost is already set up, use `frost config edit` to change the backend and server address together in the existing file. Accept the warning if the new server is empty, type `yes` to save, then run `frost init` again. `frost config set` refuses an empty destination, so it can't prepare a new server.

The address must use `https://`, except for a server on your own computer, like `http://localhost:8080`. Leave the setting blank to use the default Permafrost server.
