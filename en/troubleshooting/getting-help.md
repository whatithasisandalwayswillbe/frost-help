# Getting help

If your problem isn't covered in these docs, here's how to find out more and ask for help.

## Look first

- `frost status` shows the last backup's result, the health of your backups, and any trouble reaching your storage.
- `frost -h` lists every command and flag.
- The scheduled backup log shows what happened during automatic backups. See [Automatic backups](#scheduling).
- [Common problems](#common-problems) covers the messages people see most.

## Ask on GitHub

Open an issue at [github.com/whatithasisandalwayswillbe/frost/issues](https://github.com/whatithasisandalwayswillbe/frost/issues), and include:

- Your frost version, from `frost --version`, and your operating system.
- What you ran, and what you expected to happen.
- What happened instead, with the exact message.
- Any related lines from `frost status` or the log.

> Never post your recovery phrase, your key file, your access keys or a `config.toml` with credentials in it. `frost config` masks credentials unless you add `--show-secrets`. Check anything you paste before you post it.

## Security problems

Don't report security problems in a public issue. See [Security and privacy](#security) to report one privately.
