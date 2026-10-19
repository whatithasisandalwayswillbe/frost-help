# Automatische Backups

frost sichert nach Zeitplan und nutzt dafür den Zeitplaner deines Betriebssystems. Zwischen zwei Backups läuft nichts im Hintergrund.

## Den Zeitplan ändern

`frost init` fragt, wie oft gesichert werden soll. Um das später zu ändern:

```sh
frost config set schedule.every 6h
```

Zur Auswahl stehen `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily` und `weekly`. Standard ist `daily`.

Um festzulegen, wann Backups laufen, gib eine Uhrzeit im 24-Stunden-Format an und für wöchentliche Backups den Tag:

```sh
frost config set schedule.time 09:30
frost config set schedule.day friday
```

Standard sind `15:00` und `sunday`. Um automatische Backups aus- oder wieder einzuschalten:

```sh
frost config set schedule.enabled false
frost config set schedule.enabled true
```

Jede Änderung aktualisiert den geplanten Auftrag sofort. Unter macOS und Windows wird eine Änderung während eines geplanten Backups übernommen, sobald dieses fertig ist. Bearbeitest du `config.toml` selbst, aktualisiert der nächste frost-Befehl den Auftrag.

## Wann Backups laufen

Backups laufen zur Uhrzeit aus `schedule.time`, in der Ortszeit deines Computers:

| `schedule.every` | Sichert |
| --- | --- |
| `daily` | Jeden Tag zu dieser Uhrzeit |
| `weekly` | Jede Woche am Tag aus `schedule.day`, zu dieser Uhrzeit |
| `2h` bis `12h` | Zu dieser Uhrzeit und in jedem Intervall davor und danach. `6h` ab `15:00` läuft um 03:00, 09:00, 15:00 und 21:00 |
| `hourly` | Jede Stunde, zu den Minuten dieser Uhrzeit |

systemd startet jeden Lauf zufällig bis zu 5 Minuten später.

## Verpasste Backups

War dein Computer aus oder im Ruhezustand, als ein Backup fällig war, sichert frost, sobald er wieder da ist. Egal wie viele Backups er verpasst hat, frost sichert einmal.

| Zeitplaner | Startet ein verpasstes Backup |
| --- | --- |
| launchd (macOS) | Wenn dein Mac aufwacht, oder wenn du dich anmeldest, nachdem er aus war |
| systemd (Linux) | Wenn dein Computer aufwacht oder startet, oder wenn du dich anmeldest, falls Lingering aus ist |
| Aufgabenplanung (Windows) | Sobald es geht, wenn dein Computer wieder da ist und du angemeldet bist |
| cron (Linux) | Innerhalb von 15 Minuten, nachdem dein Computer wieder da ist |

Mit cron prüft frost alle 15 Minuten und sichert nur, wenn ein Backup fällig ist oder verpasst wurde. Für eine Zeit, die schon abgedeckt ist, ob durch ein geplantes Backup oder eins, das du selbst gestartet hast, gibt es kein zweites Backup.

Um verpasste Backups stattdessen zu überspringen, damit frost nur pünktlich sichert:

```sh
frost config set schedule.catch_up false
```

Ein geplantes Backup, das startet, bevor dein Netzwerk wieder da ist oder ein Laufwerk oder eine Freigabe eingehängt ist, versucht es etwa 5 Minuten lang erneut. Bei einem [lokalen Laufwerk](#local-drive) muss das Laufwerk angeschlossen sein, wenn das Backup läuft. [Eigener Server](#self-hosted) meldet sich mit dem eigenen SSH-Schlüssel von frost an und funktioniert deshalb ohne dich. Läuft gerade ein anderes Backup, wartet es, bis dieses fertig ist.

Unter Windows laufen geplante Backups nur, solange du angemeldet bist. Sie starten nicht im Akkubetrieb und brechen ab, wenn du den Computer vom Strom trennst. Unter macOS und mit systemd laufen geplante Backups mit niedriger Priorität, damit sie deinen Computer nicht ausbremsen.

## Der geplante Auftrag

| System | Zeitplaner | Auftrag |
| --- | --- | --- |
| macOS | launchd | `~/Library/LaunchAgents/io.github.whatithasisandalwayswillbe.frost.plist` |
| Linux mit systemd | systemd-Benutzertimer | `~/.config/systemd/user/frost-backup.service` und `frost-backup.timer` |
| Linux ohne systemd | cron | Eine mit `# frost-backup` markierte Zeile in deiner crontab |
| Windows | Aufgabenplanung | Eine Aufgabe namens `frost backup` |

Der Auftrag führt `frost backup` mit den Konfigurations- und Cache-Ordnern aus, die beim Anlegen galten. Wenn du diese Ordner änderst, starte `frost init` erneut.

Unter macOS erscheint der Auftrag in Systemeinstellungen > Allgemein > Anmeldeobjekte & Erweiterungen (System Settings > General > Login Items & Extensions) als **Node.js Foundation**, der Herausgeber der Laufzeitumgebung, die frost mitbringt. Schaltest du ihn dort aus, stoppen die geplanten Backups, und `frost status` meldet den Auftrag als fehlend. Um geplante Backups anzuhalten, nimm lieber `frost config set schedule.enabled false`.

Mit systemd versucht frost, Lingering für deinen Benutzer einzuschalten (`loginctl enable-linger`), wenn es bestätigen kann, dass Lingering aus ist. Damit laufen Backups auch, wenn du abgemeldet bist. Kann frost Lingering nicht einschalten, laufen nach dem Abmelden möglicherweise keine Backups mehr. Beim Entfernen des Timers schaltet frost Lingering nur aus, wenn es aufgezeichnet hat, dass es Lingering eingeschaltet hat.

## Protokolle

| Zeitplaner | Wo das Protokoll landet |
| --- | --- |
| launchd, cron und Aufgabenplanung | `frost.log` im Cache-Ordner von frost. Siehe [Dateien und Ordner](#files-and-folders) |
| systemd | Im Journal. Lies es mit `journalctl --user -u frost-backup` |

Ein Protokoll über 1 MiB wird vor dem nächsten Lauf geleert. `frost status` zeigt außerdem, ob das letzte Backup geklappt hat.

## Wenn der Auftrag verschwindet

Wird der Auftrag gelöscht oder ausgeschaltet, meldet `frost status` „scheduled job is missing“ (der geplante Auftrag fehlt). Stell ihn so wieder her:

```sh
frost config set schedule.enabled true
```
