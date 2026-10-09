# Backups prüfen

frost prüft deine Backups laufend, und `frost status` zeigt dir, wie es um sie steht.

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

Die erste Zeile zeigt die Version von frost, deinen Speicher und den Fingerabdruck deines Schlüssels. Die Zeilen darunter zeigen:

| Zeile | Inhalt |
| --- | --- |
| last backup | Wann das letzte Backup lief und ob es geklappt hat. „ok, but“ listet Ordner, die nicht gefunden wurden, Einträge, die sich nicht lesen ließen, und belegte Dateien, die ihre vorherige Kopie behalten haben |
| next backup | Wann das nächste automatische Backup fällig ist, oder dass automatische Backups aus sind |
| health | Das Ergebnis der letzten Stichprobenprüfung |
| updates | Ob Updates automatisch laufen und ob eine neue Version erschienen ist |
| protected | Dateien und Größe des neuesten Snapshots und wie viele Snapshots du hast |
| missing | Snapshots, die dieser Computer kannte, die aber nicht mehr im Speicher liegen |

Die Liste zeigt deine 10 neuesten Snapshots. Die Spalte `new` gibt an, wie viele neue Daten jeder hinzugefügt hat. Um alle aufzulisten:

```sh
frost status --all
```

## Die Stichprobenprüfung

Nach jedem Backup, das einen Snapshot speichert, lädt frost eine zufällige Stichprobe von Blöcken herunter, entschlüsselt jeden und prüft, ob er zu seiner ID passt. Außerdem lädt es die Dateiliste des neuesten Snapshots und prüft, ob es jeden Block kennt, den diese braucht. Nach einem Backup ohne Neues wiederholt frost die Prüfung nur, wenn die letzte älter als einen Tag ist oder ein Problem gefunden hat.

Die Stichprobe umfasst standardmäßig 20 Blöcke. Eine größere Stichprobe findet mehr Probleme, lädt aber mehr herunter:

```sh
frost config set verify.sample 50
```

`0` schaltet die Stichprobenprüfung aus.

## Jetzt prüfen

```sh
frost status --verify
```

Das startet eine neue Stichprobenprüfung und vergleicht zusätzlich frosts lokale Liste deiner Blöcke mit allem, was in deinem Speicher liegt. Auch bei `verify.sample` auf `0` prüft es 20 Blöcke. Schlägt die Prüfung fehl, endet der Befehl mit `1`. Du kannst ihn also aus deinem eigenen Zeitplaner starten und in einem anderen Rhythmus prüfen als sichern.

## Wenn eine Prüfung fehlschlägt

Die Zeile health listet auf, was fehlgeschlagen ist. Meist heißt das, dass dein Speicher Blöcke verloren oder beschädigt hat.

1. Führ `frost backup` aus. Jeder fehlende Block, dessen Daten noch auf deinem Computer liegen, wird erneut hochgeladen.
2. Führ `frost status --verify` aus, um noch einmal zu prüfen.

Daten, die nicht mehr auf deinem Computer liegen, lassen sich nicht erneut hochladen, und ältere Snapshots, die sie brauchen, lassen sich nicht vollständig wiederherstellen. Ein Block, der noch vorhanden, aber beschädigt ist, wird beim Backup nicht automatisch ersetzt. Beschaffe eine intakte Kopie von deinem Anbieter oder aus einem unabhängigen Backup und prüfe erneut.

## Fehlende Snapshots

Verschwinden Snapshots aus dem Speicher, die dieser Computer kannte, meldet `frost status` das einmal. Hast du deine Backups verschoben, verweise frost auf den neuen Ort. Siehe [Backups verschieben](#moving-backups). Andernfalls wurden sie aus deinem Speicher gelöscht.

> Eine Stichprobenprüfung prüft nur einen Teil deiner Backups. Sie findet Probleme früh, kann aber nicht beweisen, dass sich jeder Snapshot wiederherstellen lässt. Für Dateien, die du auf keinen Fall verlieren darfst, halte zusätzlich ein zweites, unabhängiges Backup vor.
