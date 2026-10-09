# frost aktualisieren

frost aktualisiert sich selbst. Standardmäßig installiert es neue Versionen nach geplanten Backups.

## Jetzt aktualisieren

```sh
frost update
```

frost sucht die neueste Version, prüft ihre Signatur und Prüfsumme und stellt sicher, dass die neue Version startet, bevor es auf sie umschaltet. Deine Einstellungen, dein Schlüssel und deine Backups bleiben unberührt.

Um nur zu prüfen, ob es eine neuere Version gibt:

```sh
frost update --check
```

`frost update` installiert nie eine Vorabversion und nie eine Version, die älter ist als deine.

## Automatische Updates

Nach einem geplanten Backup sucht frost höchstens einmal alle 20 Stunden nach einer neuen Version und installiert sie genauso wie `frost update`. Schlägt die Suche oder die Installation fehl, schlägt deshalb nicht das Backup fehl.

`frost status` zeigt, wie Updates eingestellt sind und ob das letzte geklappt hat. Der Einstellungsbildschirm des Snapshot-Browsers zeigt das ebenfalls.

Wenn du über neue Versionen nur informiert werden willst, ohne dass sie sich selbst installieren:

```sh
frost config set update.auto false
```

`frost status` sagt dir dann, wenn eine neue Version da ist, und installiert wird erst etwas, wenn du `frost update` ausführst.

> Automatische Updates laufen nur nach geplanten Backups. Sind automatische Backups ausgeschaltet, sucht frost im Hintergrund überhaupt nicht nach Updates.

## Wenn sich frost nicht selbst aktualisieren kann

| Wann | Was du stattdessen tust |
| --- | --- |
| Ein Paketmanager hat frost installiert (Homebrew, Nix, Snap, Scoop oder ein Systempaket) | Aktualisiere es mit diesem Paketmanager |
| Du darfst nicht in den Anwendungsordner von frost schreiben | Installiere es mit dem Installationsprogramm neu, als dein eigener Benutzer |
| frost wurde aus dem Quellcode gebaut | Bau es neu oder installiere eine Version mit dem Installationsprogramm |

Bricht ein Update mittendrin ab, führ das Installationsprogramm erneut aus. Es repariert die Installation.
