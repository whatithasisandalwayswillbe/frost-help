# Self-hosted

Back up to a folder on a computer you run, over SSH. That can be a Linux server, a NAS, a Raspberry Pi, a VPS, or a Mac or Windows computer with its SSH server turned on. frost uses the SSH client your computer already has, so there's nothing to install on the server.

## Before you start

- The server needs SSH and SFTP turned on. Most Linux servers have both. On a NAS, look for them in its terminal or file services settings.
- You need an account on the server that can write to the folder you'll use. An account just for backups is a good idea.
- On Windows, the OpenSSH client has to be installed. It usually is. If it isn't, add it in Settings, under System > Optional features.

## In setup

Run `frost init` and choose **Self-hosted**.

| Setup asks | Answer |
| --- | --- |
| What is the server SSH address? | A user and host, like `me@nas.local`, or a `Host` from your SSH config. Add `:2222` for another port |
| Which folder on the server? | `frost` by default, which is in your home folder there. A full path like `/srv/backups/frost` also works |

Setup creates the folder's last part if it's missing. The folder it goes in has to exist already.

## frost's SSH key

frost supplies an SSH key of its own, which setup makes the first time. It doesn't need your personal keys or SSH agent, and it never asks for a password, so scheduled backups log in the same way whenever they run.

The server doesn't know frost's key yet, so the first time, setup asks how to add it:

- **Add it for me** hands the terminal to ssh. The first time you connect to a server, ssh shows its fingerprint and asks whether to trust it. Then it asks for your password on the server, adds frost's key, and setup carries on. Your password only goes to ssh. frost never sees or keeps it.
- **I'll add it myself** shows where frost's public key file is. Add the line in that file to `~/.ssh/authorized_keys` on the server, then press `[enter]`.

| Computer | frost's public key |
| --- | --- |
| macOS and Linux | `~/.config/frost/ssh/frost_ed25519.pub` |
| Windows | `%AppData%\frost\ssh\frost_ed25519.pub` |

When setup adds the key for you, its line starts with `restrict`. This disables forwarding and terminal allocation while still letting frost read and write files. Shell commands remain possible unless the server restricts the account to SFTP.

### Adding the key by hand

On macOS or Linux, this adds the key with `restrict` in front, asking for your password on the server:

```sh
(printf 'restrict '; cat ~/.config/frost/ssh/frost_ed25519.pub) | ssh me@nas.local 'umask 077; mkdir -p .ssh; cat >> .ssh/authorized_keys'
```

Some NAS systems also let you paste an SSH key into their settings for your account.

A Windows server keeps keys in other places, so **Add it for me** doesn't work there. Add the line to `C:\Users\<you>\.ssh\authorized_keys` for a standard account, or to `C:\ProgramData\ssh\administrators_authorized_keys` for an administrator.

## Ports and your SSH config

frost reads your SSH config, `~/.ssh/config`, the same way ssh does. A `Host` entry there can set the user, the port and other options, and you can type its name as the address. frost supplies its own key, but explicit `IdentityFile` entries in your SSH config may also be offered.

## Good to know

- The server's filesystem needs hard links, which frost uses to make sure two computers never overwrite each other's backup records. ext4, Btrfs, XFS, ZFS, APFS and NTFS all have them. Setup checks this when it connects.
- If the server's host key changes, frost refuses to connect, the same as ssh does. If you reinstalled the server, remove its old key with `ssh-keygen -R <host>`, then run `frost init` again.
- `frost status` shows how full the server's disk is, and `frost backup` warns when it's nearly full.
- If the folder is on a disk the server mounts, that disk has to be mounted when backups run. If the folder isn't there, the backup fails instead of writing anywhere else.
