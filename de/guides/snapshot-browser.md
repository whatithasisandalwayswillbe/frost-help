# Der Snapshot-Browser

`frost browse` öffnet einen Snapshot-Browser im Vollbild. Darin kannst du deine Dateien so durchgehen, wie sie damals waren, Snapshots vergleichen und wiederherstellen, was du auswählst.

```sh
frost browse
```

`frost restore` ohne weitere Angaben öffnet den Browser ebenfalls. Ein geplantes Backup kann laufen, während der Browser geöffnet ist.

## Navigation

| Taste | Wirkung |
| --- | --- |
| `[↑]` `[↓]` oder `[k]` `[j]` | Bewegen |
| `[pgup]` `[pgdn]` | Eine Seite weiter oder zurück |
| `[g]` `[G]` | Zum Anfang oder zum Ende springen |
| `[enter]` | Öffnen |
| `[esc]` | Zurück, oder einen Fehler schließen |
| `[h]` | Alle Tasten anzeigen |
| `[s]` | Deine Einstellungen anzeigen |
| `[v]` | Den Fingerabdruck deines Schlüssels ein- oder ausblenden |
| `[q]` | Beenden |

Der Einstellungsbildschirm ist schreibgeschützt. Ändere Einstellungen mit `frost config set` oder `frost config edit`.

## Startseite

Die Startseite zeigt dein letztes Backup und die letzte Prüfung. Drück `[enter]`, um deine Snapshots durchzusehen, oder `[r]`, um zu aktualisieren.

## Snapshots

Die Snapshots stehen nach Datum gruppiert, die neuesten zuerst. In einem breiten Fenster zeigt ein Feld neben der Liste die Details des markierten Snapshots: wann er erstellt wurde, auf welchem Computer, wie viele Dateien er enthält, seine Größe und wie viele neue Daten er hinzugefügt hat.

| Taste | Wirkung |
| --- | --- |
| `[enter]` | Die Dateien des Snapshots öffnen |
| `[d]` | Mit dem vorherigen Snapshot vergleichen |
| `[m]` | Den Snapshot markieren. Dann `[d]` auf einem anderen Snapshot drücken, um die beiden zu vergleichen |

Ein Vergleich listet auf, was zwischen den beiden Snapshots hinzugekommen, entfernt oder geändert worden ist.

## Dateien

Du siehst deine Ordner und Dateien genau so, wie sie in diesem Snapshot waren.

| Taste | Wirkung |
| --- | --- |
| `[enter]` | Einen Ordner öffnen |
| `[←]` | In den übergeordneten Ordner wechseln |
| `[space]` | Auswählen oder abwählen |
| `[a]` | Alles in diesem Ordner auswählen oder abwählen |
| `[c]` | Die Auswahl leeren |
| `[r]` | Die Auswahl wiederherstellen, oder den markierten Eintrag, wenn nichts ausgewählt ist |

## Wiederherstellen

Wähle nach `[r]`, wohin die Dateien kommen:

| Taste | Option | Wirkung |
| --- | --- | --- |
| `[1]` | New folder beside originals | Stellt in einen neuen Ordner neben den Originalen wieder her, wie `frost restore --beside` |
| `[2]` | New folder elsewhere | Lässt dich einen Ordner wählen und stellt in einen neuen Ordner darin wieder her |
| `[3]` | Overwrite original files | Ersetzt die Originale, wie `frost restore --overwrite`. Bestätige mit `[y]` |

Bevor etwas geschrieben wird, zeigt frost, wo alles landen wird. Drück `[enter]` zum Wiederherstellen, `[c]`, um den Ordner zu ändern, oder `[esc]` zum Abbrechen. Lange Bestätigungen und Ergebnisse scrollst du mit `[pgup]` und `[pgdn]`.

„New folder elsewhere“ öffnet die Ordnerauswahl deines Systems: den Finder unter macOS, den Datei-Explorer unter Windows und zenity, qarma oder matedialog unter Linux. Über SSH oder unter Linux ohne Auswahldialog gibst du den Ordner selbst ein. Drück `[t]`, während die Auswahl offen ist, um ihn trotzdem einzutippen.

Wenn eine Wiederherstellung fertig ist, zeigt frost das Wiederhergestellte im Finder, im Datei-Explorer oder im Dateimanager deines Linux-Systems. Eine einzelne Datei erscheint unter macOS und Windows ausgewählt; unter Linux öffnet sich ihr Ordner. Ansonsten öffnet sich der tiefste gemeinsame Ordner, der alles Wiederhergestellte enthält. Über SSH, ohne grafische Oberfläche oder wenn die Wiederherstellung fehlschlägt, öffnet sich nichts.

[Dateien wiederherstellen](#restoring) erklärt jede Option im Detail und was passiert, wenn eine Wiederherstellung unterbrochen wird.
