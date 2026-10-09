# macOS permissions

macOS protects some folders, like Desktop, Documents and Downloads, and the data of apps like Mail and Safari. A program needs your permission before it can read them.

## Backups you run yourself

When you run `frost backup` in a terminal, macOS asks about your terminal app, like Terminal, iTerm, Visual Studio Code, Warp or Ghostty. Allow it, and frost can read those folders.

## Scheduled backups

Scheduled backups run frost's bundled runtime, which macOS treats as its own program:

```text
~/Library/Application Support/frost/app/runtime/bin/node
```

macOS asks about it the first time it reads `~/Desktop`, `~/Documents` or `~/Downloads`. It refuses access to other protected folders, like `~/Library/Mail` and `~/Library/Safari`, without asking.

## Full Disk Access

To let frost read every folder you back up, give it Full Disk Access:

1. Open System Settings > Privacy & Security > Full Disk Access.
2. Click the add button, then press `Cmd+Shift+G` and paste the runtime's path from above.
3. Select `node` and click Open, then make sure its switch is on.
4. Do the same for your terminal app, for backups you run yourself.

The permission carries over when frost updates.

When macOS blocks a backup, frost's error says which app or file to allow.

## iCloud Drive

frost doesn't download files that iCloud keeps only online, so a backup never fills your disk or waits on downloads. Those files are skipped and listed. To back them up, have Finder keep them downloaded on this Mac.

## Login Items

frost's scheduled job appears in System Settings > General > Login Items & Extensions as **Node.js Foundation**, the publisher of the runtime frost bundles. Leave it switched on. See [Automatic backups](#scheduling).
