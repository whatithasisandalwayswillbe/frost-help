# frost einrichten

`frost init` führt dich Frage für Frage durch die Einrichtung. Starte es jederzeit erneut, wenn du deine Einstellungen ansehen oder ändern willst.

## Die Bildschirme der Einrichtung

In einem Terminal öffnet `frost init` eine Einrichtung im Vollbild. Sie braucht ein Fenster mit mindestens 56 Spalten und 18 Zeilen. Die unterste Zeile zeigt immer die Tasten, die du drücken kannst: `[esc]` geht einen Schritt zurück und `[q]` beendet ohne zu speichern.

### Speicher

Wähle, wo deine Backups liegen sollen:

- **Permafrost**, die empfohlene Option. Du brauchst nur einen Zugriffsschlüssel und sonst nichts, und wenn du noch keinen hast, kann frost dir einen in deinem Browser besorgen. Siehe [Permafrost](#permafrost).
- **Backblaze B2**, **Amazon S3**, **Cloudflare R2** oder **Wasabi**. Die Einrichtung fragt nur, was dieser Anbieter braucht, und sagt dir, wo du jede Antwort findest.
- **Other S3-compatible** (anderer S3-kompatibler Dienst), für MinIO, Ceph und andere Dienste, die das S3-Protokoll sprechen.

Jeder Anbieter hat eine eigene Seite im Bereich Speicher. Wenn du einen geheimen Schlüssel einfügst, blendet `[tab]` ihn ein oder aus.

Sobald du alles beantwortet hast, verbindet sich frost und prüft, ob es ein kleines Testobjekt schreiben, lesen, auflisten und löschen kann und ob der Speicher bedingte Schreibvorgänge unterstützt. Geht etwas schief, erklärt die Einrichtung das in einfachen Worten und bringt dich zu der Antwort zurück, die es am wahrscheinlichsten verursacht hat. Alles andere, was du eingegeben hast, bleibt erhalten.

### Ordner

Gib den vollständigen Pfad eines Ordners ein, den du sichern willst, und drück `[enter]`. `~` steht für deinen Benutzerordner, `~/Documents` funktioniert also. Füge so viele Ordner hinzu, wie du willst; nichts wird für dich ausgewählt.

- frost sichert immer ganze Ordner. Um eine einzelne Datei zu sichern, füge den Ordner hinzu, in dem sie liegt.
- Ein Ordner, der schon in der Liste steht oder in einem Ordner der Liste liegt, wird nicht doppelt hinzugefügt. Ein Ordner, der andere Ordner der Liste enthält, ersetzt diese.
- Ein Ordner, den es noch nicht gibt, bleibt in der Liste und wird übersprungen, bis es ihn gibt, etwa auf einem nicht angeschlossenen Laufwerk.

Drück `[↑]`, um in die Liste zu wechseln, und `[x]`, um den ausgewählten Ordner zu entfernen. Drück `[enter]` in einem leeren Feld, um weiterzugehen.

### Ausschlüsse

Dieser Schritt listet die Namen und Muster auf, die frost bei jedem Backup auslässt. Die Liste beginnt mit den Standardwerten von frost: `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules` und `.cache`. Entferne alle, die du doch sichern willst. [Dateien ausschließen](#excluding-files) erklärt, wie Muster funktionieren.

### Zeitplan

Wähle, wie oft frost von selbst sichert: stündlich, alle 6 oder 12 Stunden, täglich oder wöchentlich. Wähle „Off“ (aus), um nur zu sichern, wenn du `frost backup` ausführst. Weitere Intervalle gibt es mit `frost config set`. Siehe [Automatische Backups](#scheduling).

### Wiederherstellungsphrase

Bei einem neuen Speicher erzeugt frost deinen Schlüssel und zeigt ihn als 24 Wörter an. Die Wörter bleiben verdeckt, bis du `[v]` drückst, damit du vorher sicherstellen kannst, dass niemand sonst auf deinen Bildschirm sieht. Schreib sie auf, drück `[enter]` und gib dann die zwei Wörter ein, nach denen die Einrichtung fragt, um deine Abschrift zu prüfen.

Liegen im Speicher schon frost-Backups, fragt die Einrichtung stattdessen nach deren Wiederherstellungsphrase. Öffnet der Schlüssel, der schon auf diesem Computer liegt, diese Backups, wird der Schritt übersprungen.

### Übersicht

Der Übersichtsbildschirm zeigt alle Einstellungen auf einmal. Wähle mit `[↑]` und `[↓]` eine Zeile, ändere sie mit `[e]` und drück dann `[s]` zum Speichern. `[v]` zeigt den Fingerabdruck deines Schlüssels, eine kurze ID, die deinen Schlüssel benennt, ohne ihn preiszugeben.

Beim Speichern werden deine Einstellungen und dein Schlüssel geschrieben, und der geplante Auftrag wird angelegt. Wenn die Einrichtung fertig ist, führ `frost backup --dry-run` aus, um dein erstes Backup in der Vorschau zu sehen, oder `frost backup`, um es zu starten.

## Speicher, der schon Backups enthält

Die Einrichtung sucht nach frost-Backups, sobald sie sich verbunden hat:

- Öffnet der Schlüssel dieses Computers sie, verbindet sich die Einrichtung, und alle deine Snapshots bleiben erhalten.
- Wurden sie mit einem anderen Schlüssel erstellt, fragt die Einrichtung nach dessen Wiederherstellungsphrase. frost verwendet diesen Schlüssel dann auf diesem Computer.
- Ist der Speicher leer, die Backups dieses Computers liegen aber woanders, warnt dich die Einrichtung, bevor sie dort einen separaten Satz Backups anlegt. Deine alten Backups bleiben, wo sie sind, aber frost zeigt nur noch die neuen an.

Wenn du vorhandene Backups lieber verschieben willst, siehe [Backups verschieben](#moving-backups).

## Die Einrichtung erneut starten

Starte `frost init`, wann immer du willst. Es öffnet sich mit deinen aktuellen Einstellungen, du kannst also nur eine Sache ändern und speichern.

Die Einrichtung im Vollbild fragt nicht nach zwei selteneren Einstellungen und behält deren aktuellen Wert:

- Ein eigener Permafrost-Server: `storage.permafrost.url`.
- Der Ordner in einem S3-Bucket, standardmäßig `frost`: `storage.s3.prefix`.

Für einen neuen Speicherort nutze `frost config edit`, bestätige die Warnung, speichere und starte `frost init` erneut. `frost config set` setzt ein vorhandenes Repository am neuen Ort voraus. Wie du einen eigenen Server zum ersten Mal einrichtest, steht unter [Permafrost](#permafrost). Siehe [Einstellungen](#settings).

## Ohne Vollbild-Terminal

Läuft frost nicht in einem interaktiven Terminal, zum Beispiel bei umgeleiteter Eingabe, stellt `frost init` einfache Fragen, eine pro Zeile. Statt der Anbieterliste bietet es Permafrost oder einen allgemeinen S3-kompatiblen Bucket an und fragt zusätzlich nach dem Ordner im Bucket. Listen werden mit Kommas getrennt, und `-` lässt die Ausschlussliste leer. Einen Permafrost-Schlüssel im Browser zu holen funktioniert auch hier.
