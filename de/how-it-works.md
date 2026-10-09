# So funktioniert frost

frost erstellt Snapshots deiner Ordner, zerlegt deine Dateien in verschlüsselte Blöcke und lädt nur die Blöcke hoch, die dein Speicher noch nicht hat.

## Kurz gesagt

1. **Durchsuchen.** frost geht deine Ordner durch und überspringt alles auf deiner Ausschlussliste. Dateien, deren Größe und Änderungszeit sich seit dem letzten Backup nicht geändert haben, werden nicht erneut gelesen.
2. **Zerlegen.** Geänderte Dateien werden in Blöcke von etwa 1 MiB zerlegt, und zwar an Stellen, die ihr Inhalt bestimmt. Eine Änderung mitten in einer großen Datei betrifft nur die Blöcke drumherum.
3. **Verschlüsseln.** Jeder neue Block wird komprimiert, wenn er dadurch kleiner wird, und dann mit deinem Schlüssel verschlüsselt.
4. **Hochladen.** Hochgeladen werden nur Blöcke, die noch nicht im Speicher liegen.
5. **Snapshot speichern.** frost speichert die Dateiliste, und aus welchen Blöcken jede Datei besteht, als neuen Snapshot.
6. **Prüfen.** frost lädt eine zufällige Stichprobe von Blöcken herunter und prüft sie.

## Snapshots

Ein Snapshot hält deine Ordner zu dem Zeitpunkt fest, an dem ein Backup lief: jede Datei und jeden Ordner mit Inhalt, Berechtigungen und Änderungszeit. Jeder Snapshot ist für sich vollständig, du kannst also jeden einzelnen ohne die anderen wiederherstellen.

Snapshots teilen sich Blöcke. Eine Datei, die sich seit einem Jahr nicht geändert hat, wird nur einmal gespeichert, egal in wie vielen Snapshots sie vorkommt. Viele Snapshots aufzubewahren kostet daher kaum zusätzlichen Platz.

Hat sich seit dem letzten Backup nichts geändert, speichert frost keinen neuen Snapshot. Es meldet dann, dass deine Ordner bereits gesichert sind.

Snapshot-IDs sehen so aus: `maple-absurd-3f1c`, also zwei Wörter und vier weitere Zeichen. [Dateien wiederherstellen](#restoring) erklärt, wie du einen Snapshot nach ID oder nach Zeitpunkt auswählst.

> frost kann alte Snapshots noch nicht löschen, deshalb bleiben alle Snapshots im Speicher. Lösch keine Objekte aus dem frost-Ordner in deinem Speicher von Hand und richte keine Regeln ein, die sie ablaufen lassen. Snapshots teilen sich Blöcke, und schon ein einziges entferntes Objekt kann viele Snapshots beschädigen.

## Dein Schlüssel

`frost init` erzeugt auf deinem Computer einen zufälligen 256-Bit-Schlüssel und zeigt ihn dir als Wiederherstellungsphrase aus 24 Wörtern. Der Schlüssel verlässt deinen Computer nie. Alles, was frost hochlädt, wird vorher damit verschlüsselt, auch Dateinamen und die Ordnerstruktur.

Wer die Phrase hat und auf deinen Speicher zugreifen kann, kann deine Backups lesen. Ohne die Phrase kann es niemand. Siehe [Deine Wiederherstellungsphrase](#recovery-phrase).

## Das Repository

frost legt deine Backups in einem einzigen Ordner in deinem Speicher ab, dem Repository. Es enthält vier Arten von Objekten:

| Objekt | Inhalt |
| --- | --- |
| `frost.repo` | Die ID des Repositorys und die Version seines Formats |
| `chunks/` | Deine Dateidaten und Dateilisten, verschlüsselt |
| `snapshots/` | Ein kleiner verschlüsselter Kopf pro Snapshot: wann er erstellt wurde, auf welchem Computer und von welchen Ordnern |
| `trees/` | Welche Blöcke die Dateiliste jedes Snapshots enthalten |

Die Objektnamen sind zufällig aussehende IDs, dein Anbieter sieht also nie deine Dateinamen. [Sicherheit und Datenschutz](#security) listet auf, was ein Anbieter sehen kann.

## Der lokale Cache

frost führt in einem Cache-Ordner auf deinem Computer Buch darüber, was es schon hochgeladen hat, damit es nicht bei jedem Backup den ganzen Speicher auflisten muss. Einmal pro Woche gleicht es diese Liste mit dem Speicher ab.

Der Cache ist entbehrlich. Geht er verloren, baut ihn das nächste Backup aus dem Speicher neu auf und liest deine Dateien noch einmal. Zum Wiederherstellen wird er überhaupt nicht gebraucht.

## Kein Hintergrunddienst

frost läuft nicht im Hintergrund. Automatische Backups sind ganz normale Aufträge im Zeitplaner deines Betriebssystems (launchd, systemd, cron oder Aufgabenplanung), die frost starten, ein Backup erstellen und sich wieder beenden. Siehe [Automatische Backups](#scheduling).

## Selbstprüfung

Nach jedem Backup, das einen Snapshot speichert, lädt frost eine zufällige Stichprobe von Blöcken herunter und prüft, ob sich jeder entschlüsseln lässt und zu seiner ID passt. Ein Backup ohne Neues wiederholt die Prüfung, sobald die letzte älter als einen Tag ist. Siehe [Backups prüfen](#checking-backups).
