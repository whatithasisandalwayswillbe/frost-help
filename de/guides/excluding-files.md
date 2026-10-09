# Dateien ausschließen

Deine Ausschlussliste hält Dateien und Ordner aus jedem Backup heraus. In deinen Einstellungen heißt sie `exclude`.

## Die Standardwerte

Eine neue Liste enthält `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules` und `.cache`. Entferne alle, die du doch sichern willst.

## So funktionieren Muster

- **Ein Name oder Muster ohne Schrägstrich** passt auf jede Datei und jeden Ordner mit diesem Namen, egal wo. `node_modules` lässt jeden `node_modules`-Ordner samt Inhalt aus.
- **Ein Muster mit Schrägstrich** ist ein vollständiger Pfad. Es lässt diesen Pfad und alles darunter aus. `~` steht für deinen Benutzerordner, wie in `~/Downloads/Movies`.

Muster können diese Platzhalter verwenden:

| Platzhalter | Passt auf |
| --- | --- |
| `*` | Beliebig viele Zeichen außer `/` |
| `?` | Ein beliebiges einzelnes Zeichen außer `/` |
| `[abc]` | Eines der aufgeführten Zeichen. `[a-z]` ist ein Bereich, `[^abc]` jedes nicht aufgeführte Zeichen |
| `\` | Das nächste Zeichen wörtlich, also passt `\*` auf ein echtes `*` |

Muster unterscheiden Groß- und Kleinschreibung, `*.MOV` lässt also `clip.mov` nicht aus.

Die Ordner auf deiner Liste werden selbst nie ausgelassen, nur Dinge darin.

## Beispiele

| Muster | Lässt aus |
| --- | --- |
| `*.iso` | Alle Disk-Images |
| `.git` | Alle Git-Ordner |
| `Cache*` | Alles, dessen Name mit `Cache` beginnt |
| `~/Library/Caches` | Den Cache-Ordner in deinem macOS-Benutzerordner |
| `~/Videos/*.mov` | `.mov`-Dateien direkt in `~/Videos`, aber nicht in Unterordnern |

## Die Liste ändern

Starte `frost init` und ändere den Schritt mit den Ausschlüssen, oder nimm `frost config edit`. Du kannst die ganze Liste auch mit einem Befehl festlegen, der die bisherige ersetzt:

```sh
frost config set exclude .DS_Store node_modules '*.tmp' '~/Downloads'
```

Setz Muster mit `*` oder `~` in Anführungszeichen, damit deine Shell sie nicht vorher erweitert.

Um etwas nur bei einem einzelnen Backup auszulassen:

```sh
frost backup --exclude '*.iso'
```

Etwas auszuschließen entfernt es nicht aus Snapshots, die du schon hast.
