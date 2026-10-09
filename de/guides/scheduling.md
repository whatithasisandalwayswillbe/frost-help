# Automatische Backups

frost sichert nach Zeitplan und nutzt dafür den Zeitplaner deines Betriebssystems. Zwischen zwei Backups läuft nichts im Hintergrund.

## Den Zeitplan ändern

`frost init` fragt, wie oft gesichert werden soll. Um das später zu ändern:

```sh
frost config set schedule.every 6h
```

Zur Auswahl stehen `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily` und `weekly`. Standard ist `daily`.

Um automatische Backups aus- oder wieder einzuschalten:

```sh
frost config set schedule.enabled false
frost config set schedule.enabled true
```

Beide Änderungen aktualisieren den geplanten Auftrag sofort.

## Wann Backups laufen

| Zeitplaner | Täglich | Wöchentlich | Häufiger |
| --- | --- | --- | --- |
| launchd (macOS) und cron (Linux) | 03:17 | Sonntags um 03:17 | 17 Minuten nach der vollen Stunde |
| Aufgabenplanung (Windows) | 03:17 | Sonntags um 03:17 | Alle paar Stunden, gerechnet ab dem Anlegen des Auftrags |
| systemd (Linux) | Mitternacht | Montags um Mitternacht | Zur vollen Stunde |

Die Zeiten gelten in der Ortszeit deines Computers. systemd startet jeden Lauf zufällig bis zu 5 Minuten später.

## Verpasste Backups

launchd und systemd holen verpasste Läufe nach. War dein Computer aus oder im Ruhezustand, als ein Backup fällig war, läuft das Backup, sobald er aufwacht. cron und die Aufgabenplanung überspringen verpasste Läufe, und der nächste kommt pünktlich.

Unter Windows starten geplante Backups nicht, solange der Computer im Akkubetrieb läuft, und brechen ab, wenn du ihn vom Strom trennst. Unter macOS und mit systemd laufen geplante Backups mit niedriger Priorität, damit sie deinen Computer nicht ausbremsen.

## Der geplante Auftrag

| System | Zeitplaner | Auftrag |
| --- | --- | --- |
| macOS | launchd | `~/Library/LaunchAgents/io.github.whatithasisandalwayswillbe.frost.plist` |
| Linux mit systemd | systemd-Benutzertimer | `~/.config/systemd/user/frost-backup.service` und `frost-backup.timer` |
| Linux ohne systemd | cron | Eine mit `# frost-backup` markierte Zeile in deiner crontab |
| Windows | Aufgabenplanung | Eine Aufgabe namens `frost backup` |

Der Auftrag führt `frost backup` mit den Konfigurations- und Cache-Ordnern aus, die beim Anlegen galten. Wenn du diese Ordner änderst, starte `frost init` erneut.

Unter macOS erscheint der Auftrag in Systemeinstellungen > Allgemein > Anmeldeobjekte & Erweiterungen (System Settings > General > Login Items & Extensions) als **Node.js Foundation**, der Herausgeber der Laufzeitumgebung, die frost mitbringt. Schaltest du ihn dort aus, stoppen die geplanten Backups, und `frost status` meldet den Auftrag als fehlend. Um geplante Backups anzuhalten, nimm lieber `frost config set schedule.enabled false`.

Mit systemd schaltet frost Lingering für deinen Benutzer ein (`loginctl enable-linger`), damit Backups auch laufen, wenn du abgemeldet bist. Beim Entfernen des Timers schaltet es Lingering wieder aus, es sei denn, es war schon vor frost eingeschaltet.

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
