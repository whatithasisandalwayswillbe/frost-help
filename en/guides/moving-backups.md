# Moving your backups

Your backups can move to another folder, bucket or provider without uploading everything again.

Permafrost has no folder to move, so backups can't move into or out of it this way. To switch to or from Permafrost, start a separate set of backups with `frost init`.

| You want to | Do this |
| --- | --- |
| Move your backups to another folder or bucket | Move the whole repository folder, then point frost at the new location. Nothing uploads again |
| Start a separate set of backups somewhere else | Run `frost init` and choose the new, empty location. Your old backups stay where they are, but frost only shows the new ones |
| Go back to backups you moved away from | Point frost at the old location again |

## Moving the repository

The repository is the folder in your storage that holds `frost.repo`, `chunks/`, `snapshots/` and `trees/`. Move or copy all four, with every object inside them, and keep their names exactly as they are. Moving only `frost.repo` doesn't move your backups.

Then tell frost where they are. For a different bucket:

```sh
frost config set storage.s3.bucket new-bucket
```

For a different folder inside the bucket:

```sh
frost config set storage.s3.prefix backups/frost
```

To move to another provider, which means changing several settings at once, run `frost init` and choose the new provider. Setup finds your backups and connects to them.

## Checks before saving

`frost config set` checks a new storage location before saving it. It refuses a location with no frost repository, or one made with another key. If the old location holds snapshots for the same repository but the new one doesn't, it refuses that change too. `frost config edit` shows the same problems as warnings, so it can still save a change that `set` refuses. If you change the location by editing `config.toml` yourself, frost shows those warnings the first time it uses it.

## If frost can't find your backups

When your backups aren't where frost expects them, the error and `frost status` say where they were last opened and give you three ways out:

```text
Your backups were last opened in s3://old-bucket/frost/.
Since then storage.s3.bucket changed from old-bucket to new-bucket.

Do one of these:
  put it back:       frost config set storage.s3.bucket old-bucket
  keep the change:   move the whole folder (frost.repo, chunks/, snapshots/ and trees/) to s3://new-bucket/frost/
  start over there:  frost init (your old backups stay where they are)
```
