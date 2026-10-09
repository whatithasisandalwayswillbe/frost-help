# Checking your backups

frost checks your backups as it goes, and `frost status` shows you how they're doing.

## frost status

```sh
frost status
```

```text
┌  frost  v0.1.0  s3://my-backups/frost/  key 6f154dc10058
│
│  last backup  ok 2h ago  maple-absurd-3f1c
│  next backup  ~in 4h  6h via launchd
│  health       ok 21 objects checked 2h ago
│  updates      automatic
│  protected    1,204 files, 2.1 GB, in 3 snapshots
│
├  snapshots
│
│  snapshot             taken                  files         size          new
│  maple-absurd-3f1c    2026-10-08 09:17       1,204       2.1 GB      14.2 MB
│  orbit-velvet-a02e    2026-10-08 03:17       1,201       2.1 GB       3.6 MB
│  canyon-pilot-77b9    2026-10-07 21:17       1,198       2.1 GB       2.1 GB
└
```

The first line shows frost's version, your storage and your key's fingerprint. The rows under it show:

| Row | Shows |
| --- | --- |
| last backup | When the last backup ran and whether it worked. "ok, but" lists folders that weren't found, items that couldn't be read and busy files that kept their previous copy |
| next backup | When the next automatic backup is due, or that automatic backups are off |
| health | The result of the latest spot check |
| updates | Whether updates are automatic, and whether a new release is out |
| protected | The files and size in the newest snapshot, and how many snapshots you have |
| missing | Snapshots this computer knew about that are no longer in storage |

The list shows your 10 newest snapshots. The `new` column is how much new data each one added. To list them all:

```sh
frost status --all
```

## The spot check

After every backup that saves a snapshot, frost downloads a random sample of chunks, decrypts each one and checks it matches its ID. It also loads the newest snapshot's file list and checks that frost knows every chunk it needs. After a backup with nothing new, frost repeats the check only when the last one is more than a day old or found a problem.

The sample is 20 chunks by default. A bigger sample catches more problems but downloads more:

```sh
frost config set verify.sample 50
```

`0` turns the spot check off.

## Check now

```sh
frost status --verify
```

This runs a fresh spot check, and also compares frost's local record of your chunks with everything in your storage. It checks 20 chunks even when `verify.sample` is `0`. It exits with `1` if the check fails, so you can run it from your own scheduler to check on a different schedule from your backups.

## If a check fails

The health row lists what failed. Usually it means your storage lost or damaged some chunks.

1. Run `frost backup`. Any missing chunk whose data is still on your computer is uploaded again.
2. Run `frost status --verify` to check again.

Data that's no longer on your computer can't be uploaded again, and older snapshots that need it can't fully restore. A chunk that's still present but damaged isn't automatically replaced by a backup. Recover a good copy from your provider or an independent backup, and check again.

## Missing snapshots

If snapshots this computer knew about are gone from storage, `frost status` says so once. If you moved your backups, point frost at their new location. See [Moving your backups](#moving-backups). Otherwise they were deleted from your storage.

> A spot check samples your backups. It catches problems early, but it can't prove every snapshot will restore. For files you can't afford to lose, keep a second, independent backup too.
