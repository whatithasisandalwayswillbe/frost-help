# Befehle

frost hat acht Befehle. `frost -h` listet sie alle auf, mit jeder Option.

## Globale Optionen

Diese funktionieren mit jedem Befehl:

| Option | Wirkung |
| --- | --- |
| `--config-dir <dir>` | Verwendet einen anderen Konfigurationsordner |
| `-h`, `--help` | Zeigt die Hilfe mit allen Befehlen und Optionen |
| `-v`, `--version` | Zeigt die Version von frost. Muss vor einem Befehl stehen |

## frost init

Richtet frost ein: was gesichert wird, wohin und wie oft. Starte es erneut, um deine Einstellungen anzusehen oder zu ändern. Siehe [frost einrichten](#setting-up).

```sh
frost init
```

## frost backup

Sichert sofort. Siehe [Backups erstellen](#backing-up).

```sh
frost backup [--dry-run] [--path <dir>] [--exclude <pattern>] [--no-verify]
```

| Option | Wirkung |
| --- | --- |
| `-n`, `--dry-run` | Zeigt, was hochgeladen würde, ohne etwas hochzuladen |
| `--path <dir>` | Sichert diesen Ordner statt deiner üblichen Ordner. Wiederholbar |
| `--exclude <pattern>` | Lässt zusätzlich Dateien aus, die auf dieses Muster passen. Wiederholbar |
| `--no-verify` | Überspringt die Stichprobenprüfung nach dem Backup |

## frost restore

Holt Dateien aus einem Snapshot zurück. Ohne weitere Angaben öffnet es den Snapshot-Browser. Siehe [Dateien wiederherstellen](#restoring).

```sh
frost restore [snapshot] [paths...] --beside | --to <dir> | --overwrite
```

| Option | Wirkung |
| --- | --- |
| `--beside` | Stellt in einen neuen Ordner neben den Originalen wieder her |
| `--to <dir>` | Stellt in einen neuen Ordner innerhalb dieses Ordners wieder her |
| `--overwrite` | Stellt über die Originale wieder her und ersetzt, was dort liegt. Fragt vorher nach |
| `-y`, `--yes` | Fragt vor dem Überschreiben nicht nach |

## frost status

Zeigt die neuesten Snapshots, den Zeitplan und den Zustand deiner Backups. Siehe [Backups prüfen](#checking-backups).

```sh
frost status [--verify] [--all]
```

| Option | Wirkung |
| --- | --- |
| `--verify` | Führt vorher eine neue Prüfung aus |
| `-a`, `--all` | Listet alle Snapshots auf, nicht nur die letzten 10 |

## frost browse

Öffnet den Snapshot-Browser. Siehe [Der Snapshot-Browser](#snapshot-browser).

```sh
frost browse
```

## frost config

Liest oder ändert Einstellungen, ohne die Einrichtung erneut zu durchlaufen. Siehe [Einstellungen](#settings).

```sh
frost config [--show-secrets]
frost config get <key> [--show-secrets]
frost config set <key> <value...>
frost config edit [editor]
```

| Option | Wirkung |
| --- | --- |
| `--show-secrets` | Gibt Zugangsdaten vollständig aus, statt sie zu maskieren |

## frost key

Zeigt, prüft oder importiert deine Wiederherstellungsphrase. Siehe [Deine Wiederherstellungsphrase](#recovery-phrase).

```sh
frost key show
frost key verify
frost key import
```

## frost update

Aktualisiert frost auf die neueste Version. Siehe [frost aktualisieren](#updating).

```sh
frost update [--check]
```

| Option | Wirkung |
| --- | --- |
| `--check` | Sagt nur, ob es eine neuere Version gibt |

## Exit-Codes

frost endet mit `0`, wenn ein Befehl erfolgreich war, und mit `1` bei jedem Fehler. Dazu zählt auch ein Backup oder ein `frost status --verify`, dessen Prüfung ein Problem findet. Skripte können das Ergebnis also auswerten:

```sh
frost status --verify || echo "frost check failed" >&2
```
