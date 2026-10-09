# Hilfe erhalten

Wenn dein Problem in dieser Dokumentation nicht vorkommt, erfährst du hier, wie du mehr herausfindest und um Hilfe bittest.

## Zuerst nachsehen

- `frost status` zeigt das Ergebnis des letzten Backups, den Zustand deiner Backups und alle Probleme beim Zugriff auf deinen Speicher.
- `frost -h` listet alle Befehle und Optionen auf.
- Das Protokoll geplanter Backups zeigt, was bei automatischen Backups passiert ist. Siehe [Automatische Backups](#scheduling).
- [Häufige Probleme](#common-problems) sammelt die häufigsten Meldungen.

## Auf GitHub fragen

Eröffne ein Issue unter [github.com/whatithasisandalwayswillbe/frost/issues](https://github.com/whatithasisandalwayswillbe/frost/issues) und gib an:

- Deine frost-Version aus `frost --version` und dein Betriebssystem.
- Was du ausgeführt hast und was du erwartet hast.
- Was stattdessen passiert ist, mit der genauen Meldung.
- Passende Zeilen aus `frost status` oder dem Protokoll.

> Veröffentliche nie deine Wiederherstellungsphrase, deine Schlüsseldatei, deine Zugriffsschlüssel oder eine `config.toml` mit Zugangsdaten. `frost config` maskiert Zugangsdaten, außer du fügst `--show-secrets` hinzu. Prüf alles, was du einfügst, bevor du es veröffentlichst.

## Sicherheitsprobleme

Melde Sicherheitsprobleme nicht in einem öffentlichen Issue. Unter [Sicherheit und Datenschutz](#security) steht, wie du sie vertraulich meldest.
