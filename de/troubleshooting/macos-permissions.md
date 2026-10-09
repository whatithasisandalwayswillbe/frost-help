# macOS-Berechtigungen

macOS schützt manche Ordner, etwa Schreibtisch, Dokumente und Downloads, sowie die Daten von Apps wie Mail und Safari. Ein Programm braucht deine Erlaubnis, bevor es sie lesen kann.

## Backups, die du selbst startest

Wenn du `frost backup` in einem Terminal ausführst, fragt macOS nach deiner Terminal-App, etwa Terminal, iTerm, Visual Studio Code, Warp oder Ghostty. Erlaube den Zugriff, dann kann frost diese Ordner lesen.

## Geplante Backups

Geplante Backups starten die mitgelieferte Laufzeitumgebung von frost, die macOS als eigenes Programm behandelt:

```text
~/Library/Application Support/frost/app/runtime/bin/node
```

macOS fragt danach, wenn sie zum ersten Mal `~/Desktop`, `~/Documents` oder `~/Downloads` liest. Den Zugriff auf andere geschützte Ordner wie `~/Library/Mail` und `~/Library/Safari` verweigert es ohne Rückfrage.

## Festplattenvollzugriff

Damit frost jeden Ordner lesen kann, den du sicherst, gib ihm den Festplattenvollzugriff:

1. Öffne Systemeinstellungen > Datenschutz & Sicherheit > Festplattenvollzugriff (System Settings > Privacy & Security > Full Disk Access).
2. Klick auf die Schaltfläche zum Hinzufügen, drück `Cmd+Shift+G` und füge den Pfad der Laufzeitumgebung von oben ein.
3. Wähle `node` aus, klick auf Öffnen und prüf, ob der Schalter eingeschaltet ist.
4. Mach dasselbe für deine Terminal-App, für Backups, die du selbst startest.

Die Berechtigung bleibt erhalten, wenn frost aktualisiert wird.

Blockiert macOS ein Backup, nennt dir die Fehlermeldung von frost die App oder Datei, die du erlauben musst.

## iCloud Drive

frost lädt keine Dateien herunter, die iCloud nur online vorhält. Ein Backup füllt also nie deine Festplatte und wartet nie auf Downloads. Diese Dateien werden übersprungen und aufgelistet. Um sie zu sichern, lass den Finder sie dauerhaft auf diesem Mac geladen halten.

## Anmeldeobjekte

Der geplante Auftrag von frost erscheint in Systemeinstellungen > Allgemein > Anmeldeobjekte & Erweiterungen (System Settings > General > Login Items & Extensions) als **Node.js Foundation**, der Herausgeber der Laufzeitumgebung, die frost mitbringt. Lass ihn eingeschaltet. Siehe [Automatische Backups](#scheduling).
