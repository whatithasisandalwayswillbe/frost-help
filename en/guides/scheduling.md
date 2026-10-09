# Automatic backups

frost backs up on a schedule using your operating system's own scheduler. Nothing runs in the background between backups.

## Changing the schedule

`frost init` asks how often to back up. To change it later:

```sh
frost config set schedule.every 6h
```

The choices are `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily` and `weekly`. The default is `daily`.

To turn automatic backups off, or back on:

```sh
frost config set schedule.enabled false
frost config set schedule.enabled true
```

Either change updates the scheduled job straight away.

## When backups run

| Scheduler | Daily | Weekly | More often |
| --- | --- | --- | --- |
| launchd (macOS) and cron (Linux) | 03:17 | Sundays at 03:17 | 17 minutes past the hour |
| Task Scheduler (Windows) | 03:17 | Sundays at 03:17 | Every few hours, counted from when the job was set up |
| systemd (Linux) | Midnight | Mondays at midnight | On the hour |

Times are in your computer's local time. systemd starts each run up to 5 minutes late, at random.

## Missed backups

launchd and systemd catch up. If your computer was off or asleep when a backup was due, the backup runs when it wakes. Cron and Task Scheduler skip runs the computer missed, and the next run happens on time.

On Windows, scheduled backups don't start while the computer runs on battery, and stop if it's unplugged. On macOS and with systemd, scheduled backups run at low priority so they don't slow your computer down.

## The scheduled job

| System | Scheduler | Job |
| --- | --- | --- |
| macOS | launchd | `~/Library/LaunchAgents/io.github.whatithasisandalwayswillbe.frost.plist` |
| Linux with systemd | systemd user timer | `~/.config/systemd/user/frost-backup.service` and `frost-backup.timer` |
| Linux without systemd | cron | A line in your crontab tagged `# frost-backup` |
| Windows | Task Scheduler | A task named `frost backup` |

The job runs `frost backup` with the config and cache folders that were in use when it was set up. If you change those folders, run `frost init` again.

On macOS, the job is listed in System Settings > General > Login Items & Extensions as **Node.js Foundation**, the publisher of the runtime frost bundles. Switching it off there stops scheduled backups, and `frost status` reports the job as missing. To stop scheduled backups, use `frost config set schedule.enabled false` instead.

With systemd, frost turns on lingering for your user (`loginctl enable-linger`), so backups run while you're logged out. It turns lingering off again when it removes the timer, unless it was already on before frost.

## Logs

| Scheduler | Where the log goes |
| --- | --- |
| launchd, cron and Task Scheduler | `frost.log` in frost's cache folder. See [Files and folders](#files-and-folders) |
| systemd | The journal. Read it with `journalctl --user -u frost-backup` |

A log larger than 1 MiB is emptied before the next run. `frost status` also shows whether the last backup worked.

## If the job goes missing

If the job is deleted or switched off, `frost status` says "scheduled job is missing". Put it back with:

```sh
frost config set schedule.enabled true
```
