# Auf einem neuen Computer wiederherstellen

Wenn dein Computer verloren geht, kaputtgeht oder ersetzt wird, kannst du deine Dateien auf einem anderen zurückholen.

## Was du brauchst

- Deine Wiederherstellungsphrase aus 24 Wörtern.
- Die Zugangsdaten deines Speichers: deinen Permafrost-Zugriffsschlüssel oder den Bucket-Namen und die Zugriffsschlüssel deines S3-Anbieters.

Hast du den alten Computer noch, zeigt `frost key show` die Phrase an.

## Schritte

1. [Installiere frost](#installing) auf dem neuen Computer.
2. Starte `frost init` und wähle denselben Speicher mit denselben Angaben wie vorher.
3. Die Einrichtung findet deine Backups und fragt nach ihrer Wiederherstellungsphrase. Gib alle 24 Wörter ein.
4. Wähle die Ordner, die auf diesem Computer gesichert werden sollen, die Ausschlussliste und den Zeitplan, prüf alles und speichere.
5. Stell deine Dateien wieder her, bevor dieser Computer sein erstes Backup macht:

```sh
frost restore latest --to ~
```

Damit landet dein neuester Snapshot in einem neuen Ordner `frost-restore-<id>` in deinem Benutzerordner, aufgebaut wie die ursprünglichen Ordner. Sind beide Computer von derselben Art, kannst du auch nur einen Teil wiederherstellen, indem du die Pfade so angibst, wie sie auf dem alten Computer lauteten, etwa `/Users/you/Documents`.

Um auszuwählen, was du von einer anderen Art Computer wiederherstellst, etwa einen Mac-Snapshot unter Windows, nimm den Snapshot-Browser. Starte `frost browse`, wähle aus, was du willst, drück `[r]` und wähle dann „New folder elsewhere“.

Nimm `--to` statt `--beside` oder `--overwrite`. `--beside` setzt voraus, dass die ursprünglichen Ordner auf diesem Computer existieren, und `--overwrite` braucht einen Snapshot von derselben Art Computer, also macOS und Linux oder Windows.

> Stell wieder her, bevor dieser Computer sein erstes Backup macht. Danach bezeichnet `latest` den neuesten Snapshot dieses Computers. Ist das schon passiert, such mit `frost status` die ID deines alten Snapshots heraus und stell diesen wieder her.

## Zwei Computer, ein Speicher

Zwei Computer können mit derselben Wiederherstellungsphrase in denselben Speicher sichern. Ihre Snapshots stehen in einer gemeinsamen Liste, und Daten, die beide haben, werden nur einmal gespeichert.

`latest` bezeichnet dann den neuesten Snapshot von einem der beiden Computer. Im Snapshot-Browser zeigt das Detailfeld, welcher Computer welchen Snapshot erstellt hat. Um die Dateien eines bestimmten Computers wiederherzustellen, wähle seinen Snapshot über die ID aus.

## Wenn die Phrase verloren ist

Funktioniert der alte Computer noch, führ dort `frost key show` aus. Sind Phrase und Computer beide weg, kann niemand deine Backups entschlüsseln. Siehe [Deine Wiederherstellungsphrase](#recovery-phrase).
