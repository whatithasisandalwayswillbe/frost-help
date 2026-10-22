# Setting up Frost

`frost init` walks you through setup one question at a time. Run it again whenever you want to review or change your settings.

## The setup screens

In a terminal, `frost init` opens a full-screen setup. It needs a window at least 56 columns wide and 18 rows tall. The bottom line always shows the keys you can press: `[esc]` goes back a step and `[q]` quits without saving.

### Storage

Pick where your backups go:

- **Permafrost**, the recommended option. It needs one access key and nothing else, and if you don't have a key yet, Frost opens getfro.st/perma so you can get one. See [Permafrost](#permafrost).
- **S3-compatible**, which opens a second list: **Amazon S3**, **Backblaze B2**, **Cloudflare R2**, **Wasabi**, or **Other S3-compatible** for Ceph, SeaweedFS and other services that speak the S3 protocol. Setup asks only what that service needs, and says where to find each answer. See [Cloud providers](#cloud-providers) and [Other S3-compatible storage](#other-s3).
- **Self-hosted**, for a folder on your own server over SSH. Setup asks for the server's address and the folder, and helps you add Frost's SSH key to the server. See [Self-hosted](#self-hosted).
- **Local drive**, for a folder on an internal or external drive. Setup asks for the folder's full path. See [Local drive](#local-drive).

When you paste a secret key, `[tab]` shows or hides it.

Once you've answered, Frost connects and checks it can write, read, list and delete a small test object, and that the storage supports conditional writes. If something's wrong, setup says what in plain words and takes you back to the answer that most likely caused it. Everything else you typed is kept.

### Folders

Type the full path of a folder to back up and press `[enter]`. `~` means your home folder, so `~/Documents` works. Add as many folders as you like; nothing is picked for you.

- Frost backs up whole folders. To back up a single file, add the folder it's in.
- A folder that's already on the list, or inside one that is, isn't added twice. Adding a folder that contains listed ones replaces them.
- A folder that doesn't exist yet stays on the list and is skipped until it does, like a drive that isn't plugged in.

Press `[↑]` to move into the list and `[x]` to remove the selected folder. Press `[enter]` on an empty box to move on.

### Skip

This step lists the names and patterns Frost leaves out of every backup. The list starts with Frost's defaults: `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules` and `.cache`. Remove any you want backed up. [Excluding files](#excluding-files) explains how patterns work.

### Schedule

Choose how often Frost backs up on its own: hourly, every 6 or 12 hours, daily or weekly. Choose "Off" to only back up when you run `frost backup`. Other intervals, and the time backups run, are set with `frost config set`. See [Automatic backups](#scheduling).

### Recovery phrase

For new storage, Frost creates your key and shows it as 24 words. The words stay covered until you press `[v]`, so you can make sure nobody else can see your screen first. Write them down, press `[enter]`, then type the two words setup asks for to check your copy.

If the storage already has Frost backups, setup asks for their recovery phrase instead. If the key already on this computer opens them, it skips this step.

### Review

The review screen shows every setting at once. Use `[↑]` and `[↓]` to choose a line and `[e]` to change it, then press `[s]` to save. `[v]` shows your key's fingerprint, a short ID that names your key without revealing it.

Saving writes your settings and key, and sets up the scheduled job. When setup is done, run `frost backup --dry-run` to preview your first backup, or `frost backup` to start it.

## Storage that already has backups

Setup looks for Frost backups as soon as it connects:

- If the key on this computer opens them, setup connects and you keep all your snapshots.
- If they were made with another key, setup asks for that key's recovery phrase. Frost then uses that key on this computer.
- If the storage is empty but this computer's backups are somewhere else, setup warns you before starting a separate set of backups there. Your old backups stay where they are, but Frost only shows the new ones.

To move existing backups instead, see [Moving your backups](#moving-backups).

## Running setup again

Run `frost init` any time. It opens with your current settings, so you can change one thing and save.

The full-screen setup doesn't ask about two rarer settings, and keeps whatever they're set to:

- A Permafrost server of your own: `storage.permafrost.url`.
- The folder inside an S3 bucket, `frost` by default: `storage.s3.prefix`.

For a new location, use `frost config edit`, accept the warning, save and run `frost init` again. `frost config set` requires an existing repository at the new location. For a first-time custom server setup, see [Permafrost](#permafrost). See [Settings](#settings).

## Without a full-screen terminal

When Frost isn't running in an interactive terminal, for example with piped input, `frost init` asks plain questions, one per line. It offers Permafrost, a generic S3-compatible bucket, Self-hosted and Local drive, without the list of S3 services, and it also asks for the folder inside a bucket. Lists are comma separated, and `-` leaves the skip list empty. Frost opens getfro.st/perma for a new Permafrost key here too, and can add its SSH key to your server: ssh asks for your password, or Frost prints the line for you to add.
