# Deine Wiederherstellungsphrase

Deine Wiederherstellungsphrase ist dein Verschlüsselungsschlüssel, geschrieben als 24 Wörter. Sie ist die einzige Möglichkeit, deine Backups zu lesen.

> Verlierst du die Wiederherstellungsphrase und den Computer, sind deine Backups verloren. Niemand kann sie wiederherstellen: weder dein Speicheranbieter noch Permafrost noch die Entwickler von frost.

## Sicher aufbewahren

Die Einrichtung zeigt dir die Phrase, wenn sie deinen Schlüssel erzeugt. Schreib sie auf Papier oder bewahre sie in einem Passwortmanager auf, dem du vertraust, und zwar an einem anderen Ort als auf dem Computer, den du sicherst.

Eine Kopie liegt außerdem auf deinem Computer, in der Datei `key` im Konfigurationsordner von frost, damit geplante Backups ohne dich laufen können. Unter macOS und Linux legt frost sie mit Berechtigungen nur für deinen Benutzer an. Unter Windows übernimmt sie die Berechtigungen deines Benutzerprofils. Gemeinsam genutzte Ordner oder geänderte Berechtigungen können anderen Zugriff darauf geben. Wer diese Datei lesen oder Programme unter deinem Namen ausführen kann, kann deine Backups lesen. Nutze deshalb eine vollständige Festplattenverschlüsselung und eine Bildschirmsperre.

Um deine Backups zu lesen, braucht jemand sowohl die Phrase als auch Zugriff auf deinen Speicher. Halte deshalb auch die Schlüssel für deinen Speicher geheim.

## Anzeigen

```sh
frost key show
```

frost warnt dich zuerst und zeigt die Phrase erst an, nachdem du `show` eingetippt hast. Achte darauf, dass niemand auf deinen Bildschirm sieht und du ihn nicht gerade teilst.

## Deine Abschrift prüfen

```sh
frost key verify
```

Tipp die Phrase ein, die du aufgeschrieben hast. frost sagt dir, ob sie gültig ist, ob sie zum Schlüssel auf diesem Computer passt und ob sie deine Backups öffnet. Die Phrase selbst gibt es nie aus. Prüf deine Abschrift ab und zu.

## Auf einem anderen Computer verwenden

`frost init` fragt nach der Phrase, wenn es sich mit einem Speicher verbindet, in dem schon deine Backups liegen. Um sie direkt auf einen Computer zu bringen:

```sh
frost key import
```

Ist ein Speicher eingerichtet, prüft frost zuerst, ob die Phrase ihn öffnet. Liegt schon ein anderer Schlüssel auf dem Computer, fragt frost, bevor es ihn ersetzt. Backups, die mit dem alten Schlüssel erstellt wurden, brauchen zum Wiederherstellen die alte Phrase.

Alle Schritte findest du unter [Auf einem neuen Computer wiederherstellen](#new-computer).

## Die Phrase eintippen

Tipp alle 24 Wörter in der richtigen Reihenfolge ein, getrennt durch Leerzeichen. Groß- und Kleinschreibung spielt keine Rolle. Die Wörter stammen aus der englischen Standardliste BIP39 mit 2.048 Wörtern, deshalb kann frost dir sagen, wenn eines falsch geschrieben ist:

| frost meldet | Das bedeutet |
| --- | --- |
| that's 23 words, a recovery phrase has 24 | Ein Wort fehlt oder ist zu viel |
| word 5, "hapy", isn't a recovery phrase word | Dieses Wort ist falsch geschrieben |
| all the words are real, but they don't make a valid phrase | Zwei Wörter sind vertauscht, oder eines ist ein anderes echtes Wort |
| that's a valid phrase, but not the one for these backups | Die Phrase gehört zu einem anderen Satz Backups |

## Der Fingerabdruck des Schlüssels

Der Fingerabdruck ist eine kurze ID, etwa `6f154dc10058`, die deinen Schlüssel benennt, ohne ihn preiszugeben. `frost status` zeigt ihn an, ebenso der Snapshot-Browser, wenn du `[v]` drückst. Zwei Computer mit demselben Fingerabdruck haben denselben Schlüssel.

## Den Schlüssel wechseln

frost kann den Schlüssel bestehender Backups nicht ändern. Hat jemand anderes deine Phrase womöglich gesehen, kann er diese Backups lesen, solange er an deinen Speicher herankommt. Ändere deshalb die Schlüssel für deinen Speicher und halte sie geheim.
