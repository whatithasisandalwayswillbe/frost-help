# Moving your backups

Your backups can move to another folder, bucket or provider without uploading everything again.

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

`frost config set` checks a new storage location before saving it. It refuses a location that has no backups, one with backups made with another key, or one with a `frost.repo` but no snapshots. `frost config edit` shows the same problems as warnings, so it can still save a change that `set` refuses.

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
