# Dateien wiederherstellen

Hol Dateien aus einem beliebigen Snapshot zurück, in einen neuen Ordner oder über die Originale.

Am einfachsten geht das mit dem Snapshot-Browser. Starte `frost browse`, such dir heraus, was du brauchst, wähle es mit `[space]` aus und drück `[r]`. Siehe [Der Snapshot-Browser](#snapshot-browser). Diese Seite erklärt die Wiederherstellung über die Kommandozeile.

## Der Befehl restore

```sh
frost restore <snapshot> [paths...] --beside | --to <dir> | --overwrite
```

- **Snapshot** ist der Snapshot, aus dem wiederhergestellt wird. Siehe „Einen Snapshot auswählen“ weiter unten.
- **Pfade** sind die Dateien oder Ordner, die wiederhergestellt werden, jeweils mit allem, was darin liegt. Ohne Pfade wird der ganze Snapshot wiederhergestellt.
- **Ziel** ist genau eine der Optionen `--beside`, `--to` oder `--overwrite`.

Zum Beispiel:

```sh
frost restore latest ~/Documents/taxes --beside
frost restore yesterday ~/notes.txt --to ~/Desktop
frost restore maple-absurd-3f1c --overwrite
```

`frost restore` ohne weitere Angaben öffnet den Snapshot-Browser.

## Einen Snapshot auswählen

| Du gibst ein | Du bekommst |
| --- | --- |
| `latest` | Den neuesten Snapshot |
| `maple-absurd-3f1c` oder nur `maple` | Den Snapshot mit dieser ID, oder den einzigen, dessen ID mit deiner Eingabe beginnt |
| `3 days ago`, `12h`, `2w`, `1 month ago` | Den neuesten Snapshot zu diesem Zeitpunkt oder davor |
| `yesterday`, `today` | Den neuesten Snapshot bis zum Ende dieses Tages |
| `2026-09-20`, `2026-09-20 14:30` | Den neuesten Snapshot an diesem Tag oder zu dieser Minute oder davor, in deiner Ortszeit |

Relative Zeitangaben schreibst du auf Englisch. Sie verstehen Minuten (`m`), Stunden (`h`), Tage (`d`), Wochen (`w`), Monate (`mo`) und Jahre (`y`), auch ausgeschrieben. Setz alles mit Leerzeichen in Anführungszeichen, etwa `"3 days ago"`.

`frost status` listet deine Snapshots mit ihren IDs auf. Passt deine Eingabe zu mehr als einer ID, bittet frost dich, mehr davon einzugeben.

## Wohin die Dateien kommen

| Option | Stellt wieder her in |
| --- | --- |
| `--beside` | Einen neuen Ordner `frost-restore-<id>` neben den Originalen |
| `--to <dir>` | Einen neuen Ordner `frost-restore-<id>` in `<dir>`, das schon existieren muss |
| `--overwrite` | Die ursprünglichen Orte und ersetzt, was dort liegt. frost fragt vorher, und `-y` überspringt die Frage |

Ein neuer Ordner überschreibt nie etwas. Darin behält, was du wiederherstellst, seinen eigenen Namen und wird ausgehend von dem Ordner angeordnet, den deine Auswahl gemeinsam hat:

| Du stellst wieder her | `--beside` ergibt |
| --- | --- |
| `~/Documents/taxes` | `~/Documents/frost-restore-<id>/taxes/...` |
| `~/notes.txt` | `~/frost-restore-<id>/notes.txt` |
| `~/Documents/a` und `~/Pictures/b` | `~/frost-restore-<id>/Documents/a` und `~/frost-restore-<id>/Pictures/b` |

Der Name des neuen Ordners verwendet die kurze ID des Snapshots. Ist der Name schon vergeben, hängt frost `-1`, `-2` und so weiter an.

`--beside` funktioniert nicht, wenn deine Auswahl nur die oberste Ebene eines Laufwerks gemeinsam hat, wenn ihr Ordner auf diesem Computer nicht existiert (etwa bei einem Snapshot von einem anderen Computer) oder wenn du dort nicht schreiben darfst. Würdest du zum Beispiel einen Snapshot deines ganzen Benutzerordners neben dem Original wiederherstellen, entstünde ein neuer Ordner in `/Users` oder `/home`. Nimm in solchen Fällen `--to`.

## Über die Originale wiederherstellen

`--overwrite` legt die Dateien dorthin zurück, wo sie herkamen, und ersetzt, was dort liegt. frost zeigt vorher, was es tun wird, und fragt nach:

```text
┌  restore maple-absurd-3f1c  2026-10-07 03:17 (1d ago)
│
│  paths        /home/you/Documents/taxes
▲  into         original locations (existing files will be replaced)
│
│  Go ahead? [y/N]
```

- Dateien, die schon dem Snapshot entsprechen, werden geprüft und übersprungen und nicht erneut heruntergeladen.
- Dateien, die nicht im Snapshot sind, bleiben unangetastet.
- Jede Datei wird zuerst in eine versteckte temporäre Datei daneben geschrieben und dann ausgetauscht. Du brauchst Platz für beide Kopien der Datei, die gerade wiederhergestellt wird.
- Der Snapshot muss von derselben Art Computer stammen: Snapshots von macOS und Linux über macOS oder Linux, Snapshots von Windows über Windows.
- frost stellt nicht über einen Ordnerlink wieder her, den ein anderer Benutzer verändert haben könnte. Ist das das Problem, sagt es das, bevor es fragt, und der Browser graut „Overwrite original files“ aus.

## Sicherheitsprüfungen

Jeder Block wird entschlüsselt und mit seiner ID verglichen, bevor er geschrieben wird. Jede Datei bekommt ihren echten Namen erst, wenn sie vollständig ist. Eine gescheiterte Wiederherstellung hinterlässt also nie eine halb geschriebene Datei an der Stelle einer echten.

Wiederhergestellte symbolische Links behalten ihre ursprünglichen Ziele, und die können außerhalb des Wiederherstellungsordners liegen.

## Unterbrochene Wiederherstellungen

Bricht eine Wiederherstellung ab, wegen einer verlorenen Verbindung, `Ctrl+C` oder weil der Computer in den Ruhezustand geht, gibt frost den Befehl aus, der sie fortsetzt:

```text
What's restored so far was kept. To carry on from there, run:

  frost restore maple-absurd-3f1c9a0b2e7 /home/you/Documents/taxes --beside
```

Es ist dieselbe Wiederherstellung, nur mit der vollständigen ID des Snapshots statt `latest` oder einer Zeitangabe. Ein Backup zwischendurch ändert also nicht, welcher Snapshot gemeint ist. Schon wiederhergestellte Dateien werden geprüft und übersprungen, und die Datei, an der frost gerade schrieb, wird ab ihrem letzten intakten Block fortgesetzt.

Bis die Wiederherstellung fertig ist, enthält ihr Ordner eine Markierung `.frost-restore` und eine Datei `.frost-partial-...`. Lass beide liegen; frost entfernt sie am Ende.

Wie du nach dem Verlust deines Computers wiederherstellst, steht unter [Auf einem neuen Computer wiederherstellen](#new-computer).
