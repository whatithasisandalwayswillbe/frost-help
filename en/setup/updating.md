# Updating Frost

Frost updates itself, including when you installed it with npm or pnpm. By default, it installs new releases after scheduled backups.

You don't need to update the `getfrost` package yourself. An older one never replaces a newer Frost.

## Update now

```sh
frost update
```

Frost finds the latest release, checks its signature and checksum, and makes sure the new version starts before switching to it. Your settings, key and backups aren't touched.

To only check whether there's a newer release:

```sh
frost update --check
```

`frost update` never installs a pre-release, or a version older than the one you have.

## Automatic updates

After a scheduled backup, Frost checks for a new release at most once every 20 hours, and installs it the same way `frost update` does. A failed check or install never fails the backup.

`frost status` shows how updates are set up and whether the last one worked. So does the snapshot browser's settings screen.

To hear about new releases without installing them automatically:

```sh
frost config set update.auto false
```

`frost status` then tells you when a release is out, and nothing is installed until you run `frost update`.

> Automatic updates only run after scheduled backups. With automatic backups off, Frost doesn't check for updates in the background at all.

## When Frost can't update itself

| When | Do this instead |
| --- | --- |
| You can't write to Frost's application folder | Reinstall with the installer, as your own user |
| Frost was built from source | Rebuild it, or install a release with the installer |

If an update stops partway, run the installer again. It repairs the installation.
