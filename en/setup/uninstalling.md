# Uninstalling frost

frost has no uninstall command, but removing it takes a few steps.

> Uninstalling frost doesn't delete your backups. If you might want them back one day, make sure you have your recovery phrase before you delete the key on this computer. `frost key show` prints it.

## 1. Remove the scheduled job

```sh
frost config set schedule.enabled false
```

This removes the job from your operating system's scheduler. On Linux with systemd, it also turns lingering back off, if frost was the one that turned it on.

## 2. Delete frost's files

This deletes the application, its launcher, your settings, your key and frost's cache. If you set `FROST_CONFIG_DIR`, `FROST_CACHE_DIR`, `XDG_CONFIG_HOME`, `XDG_CACHE_HOME` or `XDG_DATA_HOME`, delete those folders instead. [Files and folders](#files-and-folders) lists every location.

On macOS:

```sh
rm -rf ~/Library/Application\ Support/frost ~/.config/frost ~/.cache/frost
rm -f /usr/local/bin/frost ~/.local/bin/frost
```

On Linux:

```sh
rm -rf ~/.local/share/frost ~/.config/frost ~/.cache/frost
rm -f /usr/local/bin/frost ~/.local/bin/frost
```

On Windows, in PowerShell:

```powershell
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\frost", "$env:APPDATA\frost"
Remove-Item -Force "$HOME\bin\frost", "$HOME\bin\frost.cmd"
```

If you installed the launcher somewhere else, delete it from there.

## 3. Delete your backups, if you want to

Your backups stay in your storage until you delete them. With an S3 provider, they're in one folder of your bucket, `frost` unless you chose another. Delete that folder to remove them. Without your recovery phrase, nobody can read what's left in it.
