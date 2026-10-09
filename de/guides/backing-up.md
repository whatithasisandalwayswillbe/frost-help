# Backups erstellen

`frost backup` sichert deine Ordner sofort. Hochgeladen wird nur, was sich seit dem letzten Backup geändert hat.

## Ein Backup starten

```sh
frost backup
```

frost zeigt, was sich geändert hat, wie viel es hochgeladen hat und das Ergebnis seiner Stichprobenprüfung:

```text
┌  backup  s3://my-backups/frost/
│
│  changes      3 added, 1 changed
│  files        1,204 (2.1 GB)
│  new data     14.2 MB in 9 chunks (9.8 MB uploaded after compression)
│  verified     ok, 20 random objects re-downloaded and checked
│
└  Saved snapshot maple-absurd-3f1c
```

Eine Datei gilt als geändert, wenn sich ihr Inhalt, ihre Größe, ihre Berechtigungen oder ihre Änderungszeit ändern. Ändert sich nur die Änderungszeit eines Ordners, zählt das nicht, denn temporäre Dateien verändern sie ständig.

Hat sich nichts geändert, speichert frost keinen neuen Snapshot:

```text
┌  backup  s3://my-backups/frost/
│
│  files        1,204 (2.1 GB)
│  verified     ok 3h ago, 20 objects checked
│
└  Already backed up. Nothing has changed since snapshot maple-absurd-3f1c, saved 3h ago.
```

Mit eingeschalteten automatischen Backups musst du das nur selten selbst ausführen. Siehe [Automatische Backups](#scheduling).

## Vorschau eines Backups

```sh
frost backup --dry-run
```

Ein Probelauf listet jede Datei mit neuen Daten zum Hochladen und die Gesamtmenge auf, ohne etwas hochzuladen oder einen Snapshot zu speichern. `-n` ist die Kurzform von `--dry-run`.

## Optionen

| Option | Wirkung |
| --- | --- |
| `-n`, `--dry-run` | Zeigt, was hochgeladen würde, ohne etwas hochzuladen |
| `--path <dir>` | Sichert diesen Ordner statt deiner üblichen Ordner. Für weitere Ordner wiederholen |
| `--exclude <pattern>` | Lässt dieses Muster zusätzlich aus, nur bei diesem Backup. Für weitere Muster wiederholen |
| `--no-verify` | Überspringt die Stichprobenprüfung nach dem Backup |

Um zu ändern, welche Ordner jedes Mal gesichert werden, starte `frost init` erneut oder sieh dir [Einstellungen](#settings) an.

## Was gesichert wird

frost sichert normale Dateien, Ordner und symbolische Links samt Berechtigungen und Änderungszeiten.

- Ein symbolischer Link wird als Link gespeichert, nicht als die Datei, auf die er zeigt.
- Hardlinks werden als getrennte Dateien gesichert und wiederhergestellt.

frost lässt aus:

- Alles auf deiner Ausschlussliste. Siehe [Dateien ausschließen](#excluding-files).
- Sockets, Gerätedateien und Pipes.
- Dateibesitzer, ACLs und erweiterte Attribute.
- Unter macOS Dateien, die iCloud nur online vorhält. frost lädt sie nicht herunter, sondern überspringt sie und listet sie auf.
- Die `.frost-partial-...`-Dateien, die eine abgebrochene Wiederherstellung hinterlässt.

## Wenn etwas schiefgeht

| Was passiert | Was frost tut |
| --- | --- |
| Eine Datei oder ein Ordner lässt sich nicht lesen, wegen fehlender Berechtigungen, weil sie mitten im Backup gelöscht wurde oder weil sie nur in iCloud liegt | Überspringt sie und listet sie auf. Der Snapshot wird trotzdem gespeichert, und `frost status` zeigt, wie viele Einträge übersprungen wurden |
| Ein Ordner aus deiner Liste fehlt, etwa auf einem nicht angeschlossenen Laufwerk | Überspringt ihn und sichert den Rest. `frost backup` und `frost status` nennen den fehlenden Ordner |
| Keiner deiner Ordner ist da, oder einer existiert, lässt sich aber überhaupt nicht lesen | Lässt das ganze Backup fehlschlagen, damit ein Backup nie in Ordnung aussieht, obwohl nichts gesichert wurde |
| Eine Datei ändert sich, während frost sie liest, etwa eine Datenbank im Betrieb, die Festplatte einer laufenden virtuellen Maschine oder ein Download | Liest sie am Ende des Backups noch einmal. Ändert sie sich immer noch, behält der Snapshot ihre vorherige Kopie, und frost listet sie auf. Eine Datei, die nie vollständig gesichert werden konnte, wird übersprungen |

frost erstellt keine Snapshots auf Dateisystem- oder Datenbankebene. Eine Datei, die ständig in Benutzung ist, sicherst du am besten, während das Programm, das sie nutzt, geschlossen ist.

Unter macOS brauchen manche Ordner deine Erlaubnis, bevor frost sie lesen kann. Siehe [macOS-Berechtigungen](#macos-permissions).

## Die Stichprobenprüfung

Nach einem Backup, das einen Snapshot speichert, lädt frost einige zufällige Blöcke herunter, standardmäßig 20, und prüft sie. Nach einem Backup ohne Neues prüft es nur dann erneut, wenn die letzte Prüfung älter als einen Tag ist oder ein Problem gefunden hat. Schlägt eine Prüfung fehl, meldet das Backup einen Fehler. Siehe [Backups prüfen](#checking-backups).

## Unterbrochene Backups

Bricht ein Backup mittendrin ab, wegen einer verlorenen Verbindung, eines zugeklappten Laptops oder `Ctrl+C`, ist nichts von dem verloren, was schon hochgeladen wurde. frost vermerkt die Blöcke während des Hochladens, und das nächste Backup überspringt sie.

## Eins nach dem anderen

Es kann immer nur ein Backup oder eine Wiederherstellung laufen. Läuft schon eins, etwa ein geplantes Backup, meldet frost „a backup or restore is already running, try again when it's done“ (es läuft bereits ein Backup oder eine Wiederherstellung, versuch es danach noch einmal). Der Snapshot-Browser kann geöffnet bleiben, während ein Backup läuft.
