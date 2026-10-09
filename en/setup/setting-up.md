# Setting up frost

`frost init` walks you through setup one question at a time. Run it again whenever you want to review or change your settings.

## The setup screens

In a terminal, `frost init` opens a full-screen setup. It needs a window at least 56 columns wide and 18 rows tall. The bottom line always shows the keys you can press: `[esc]` goes back a step and `[q]` quits without saving.

### Storage

Pick where your backups go:

- **Permafrost**, the recommended option. It needs one access key and nothing else, and if you don't have a key yet, frost can get you one in your browser. See [Permafrost](#permafrost).
- **Backblaze B2**, **Amazon S3**, **Cloudflare R2** or **Wasabi**. Setup asks only what that provider needs, and says where to find each answer.
- **Other S3-compatible**, for MinIO, Ceph and other services that speak the S3 protocol.

Each provider has its own page under Storage. When you paste a secret key, `[tab]` shows or hides it.

Once you've answered, frost connects and checks it can write, read, list and delete a small test object, and that the storage supports conditional writes. If something's wrong, setup says what in plain words and takes you back to the answer that most likely caused it. Everything else you typed is kept.

### Folders

Type the full path of a folder to back up and press `[enter]`. `~` means your home folder, so `~/Documents` works. Add as many folders as you like; nothing is picked for you.

- frost backs up whole folders. To back up a single file, add the folder it's in.
- A folder that's already on the list, or inside one that is, isn't added twice. Adding a folder that contains listed ones replaces them.
- A folder that doesn't exist yet stays on the list and is skipped until it does, like a drive that isn't plugged in.

Press `[↑]` to move into the list and `[x]` to remove the selected folder. Press `[enter]` on an empty box to move on.

### Skip

This step lists the names and patterns frost leaves out of every backup. The list starts with frost's defaults: `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules` and `.cache`. Remove any you want backed up. [Excluding files](#excluding-files) explains how patterns work.

### Schedule

Choose how often frost backs up on its own: hourly, every 6 or 12 hours, daily or weekly. Choose "Off" to only back up when you run `frost backup`. Other intervals are available with `frost config set`. See [Automatic backups](#scheduling).

### Recovery phrase

For new storage, frost creates your key and shows it as 24 words. The words stay covered until you press `[v]`, so you can make sure nobody else can see your screen first. Write them down, press `[enter]`, then type the two words setup asks for to check your copy.

If the storage already has frost backups, setup asks for their recovery phrase instead. If the key already on this computer opens them, it skips this step.

### Review

The review screen shows every setting at once. Use `[↑]` and `[↓]` to choose a line and `[e]` to change it, then press `[s]` to save. `[v]` shows your key's fingerprint, a short ID that names your key without revealing it.

Saving writes your settings and key, and sets up the scheduled job. When setup is done, run `frost backup --dry-run` to preview your first backup, or `frost backup` to start it.

## Storage that already has backups

Setup looks for frost backups as soon as it connects:

- If the key on this computer opens them, setup connects and you keep all your snapshots.
- If they were made with another key, setup asks for that key's recovery phrase. frost then uses that key on this computer.
- If the storage is empty but this computer's backups are somewhere else, setup warns you before starting a separate set of backups there. Your old backups stay where they are, but frost only shows the new ones.

To move existing backups instead, see [Moving your backups](#moving-backups).

## Running setup again

Run `frost init` any time. It opens with your current settings, so you can change one thing and save.

The full-screen setup doesn't ask about two rarer settings, and keeps whatever they're set to:

- A Permafrost server of your own: `storage.permafrost.url`.
- The folder inside an S3 bucket, `frost` by default: `storage.s3.prefix`.

Change them with `frost config set`. See [Settings](#settings).

## Without a full-screen terminal

When frost isn't running in an interactive terminal, for example with piped input, `frost init` asks plain questions, one per line. It offers Permafrost or a generic S3-compatible bucket instead of the provider list, and it also asks for the folder inside the bucket. Lists are comma separated, and `-` leaves the skip list empty. Getting a Permafrost key in the browser works here too.
