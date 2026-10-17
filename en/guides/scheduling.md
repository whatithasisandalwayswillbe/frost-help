# Automatic backups

frost backs up on a schedule using your operating system's own scheduler. Nothing runs in the background between backups.

## Changing the schedule

`frost init` asks how often to back up. To change it later:

```sh
frost config set schedule.every 6h
```

The choices are `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily` and `weekly`. The default is `daily`.

To choose when backups run, set a time on a 24-hour clock, and the day for weekly backups:

```sh
frost config set schedule.time 09:30
frost config set schedule.day friday
```

The defaults are `15:00` and `sunday`. To turn automatic backups off, or back on:

```sh
frost config set schedule.enabled false
frost config set schedule.enabled true
```

Each change updates the scheduled job straight away. On macOS and Windows, a change made during a scheduled backup is applied as soon as that backup finishes. If you edit `config.toml` yourself, the next frost command updates the job.

## When backups run

Backups run at `schedule.time`, in your computer's local time:

| `schedule.every` | Backs up |
| --- | --- |
| `daily` | Every day at that time |
| `weekly` | Every week on `schedule.day`, at that time |
| `2h` to `12h` | At that time, and every interval before and after it. `6h` from `15:00` runs at 03:00, 09:00, 15:00 and 21:00 |
| `hourly` | Every hour, at that time's minutes |

systemd starts each run up to 5 minutes late, at random.

## Missed backups

If your computer was off or asleep when a backup was due, frost backs up once it's back. However many backups it missed, it backs up once.

| Scheduler | Runs a missed backup |
| --- | --- |
| launchd (macOS) | When your Mac wakes, or when you log in after it was off |
| systemd (Linux) | When your computer wakes or starts, or when you log in if lingering is off |
| Task Scheduler (Windows) | As soon as it can once your computer is back and you're signed in |
| cron (Linux) | Within 15 minutes of your computer being back |

With cron, frost checks every 15 minutes and only backs up when a backup is due or was missed. A time that's already covered, by a scheduled backup or one you ran yourself, doesn't get a second backup.

To skip missed backups instead, so frost only backs up on time:

```sh
frost config set schedule.catch_up false
```

A scheduled backup that starts before your network is back tries again for about 5 minutes. If another backup is running, it waits for it to finish.

On Windows, scheduled backups run only while you're signed in. They don't start while the computer runs on battery, and stop if it's unplugged. On macOS and with systemd, scheduled backups run at low priority so they don't slow your computer down.

## The scheduled job

| System | Scheduler | Job |
| --- | --- | --- |
| macOS | launchd | `~/Library/LaunchAgents/io.github.whatithasisandalwayswillbe.frost.plist` |
| Linux with systemd | systemd user timer | `~/.config/systemd/user/frost-backup.service` and `frost-backup.timer` |
| Linux without systemd | cron | A line in your crontab tagged `# frost-backup` |
| Windows | Task Scheduler | A task named `frost backup` |

The job runs `frost backup` with the config and cache folders that were in use when it was set up. If you change those folders, run `frost init` again.

On macOS, the job is listed in System Settings > General > Login Items & Extensions as **Node.js Foundation**, the publisher of the runtime frost bundles. Switching it off there stops scheduled backups, and `frost status` reports the job as missing. To stop scheduled backups, use `frost config set schedule.enabled false` instead.

With systemd, frost tries to turn on lingering for your user (`loginctl enable-linger`) if it can confirm lingering is off. Lingering lets backups run while you're logged out. If frost can't enable it, backups may stop after you log out. When removing the timer, frost turns lingering off only if it recorded enabling it.

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
