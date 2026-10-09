# Dateien und Ordner

frost legt die Anwendung, deine Einstellungen und seinen Cache in getrennten Ordnern auf deinem Computer ab.

## Die Anwendung

| System | Anwendungsordner |
| --- | --- |
| macOS | `~/Library/Application Support/frost/app` |
| Linux | `~/.local/share/frost/app` oder `$XDG_DATA_HOME/frost/app` |
| Windows | `%LocalAppData%\frost\app` |

Der Anwendungsordner enthält die mitgelieferte Laufzeitumgebung und jede installierte Version. Lass ihn vollständig.

Der `frost`-Starter liegt unter macOS und Linux in `/usr/local/bin` oder `~/.local/bin` und unter Windows in `~/bin`, sofern du bei der Installation keinen anderen Ordner gewählt hast. Siehe [frost installieren](#installing).

## Einstellungen und Schlüssel

| Datei | macOS und Linux | Windows |
| --- | --- | --- |
| Einstellungen | `~/.config/frost/config.toml` | `%AppData%\frost\config.toml` |
| Schlüssel | `~/.config/frost/key` | `%AppData%\frost\key` |

## Cache

| Datei | macOS und Linux | Windows |
| --- | --- | --- |
| Liste dessen, was hochgeladen ist | `~/.cache/frost/manifest-<repo>.jsonl` | `%LocalAppData%\frost\manifest-<repo>.jsonl` |
| Wo deine Backups zuletzt geöffnet wurden | `~/.cache/frost/storage-<config>.json` | `%LocalAppData%\frost\storage-<config>.json` |
| Letzte Suche nach Updates | `~/.cache/frost/update.json` | `%LocalAppData%\frost\update.json` |
| Protokoll geplanter Backups | `~/.cache/frost/frost.log` | `%LocalAppData%\frost\frost.log` |

Mit systemd schreiben geplante Backups ins Journal statt in `frost.log`. Siehe [Automatische Backups](#scheduling), wo auch steht, wo der geplante Auftrag liegt.

Die Liste dessen, was hochgeladen ist, ist entbehrlich. Löschst du sie, baut das nächste Backup sie aus deinem Speicher neu auf und liest alle deine Dateien noch einmal. Zum Wiederherstellen wird sie nicht gebraucht. Daneben liegt eine Datei `.lock`, die verhindert, dass zwei frost-Prozesse gleichzeitig schreiben. Die Sperrdatei zu löschen beendet kein laufendes frost.

## Die Ordner ändern

Unter macOS und Linux richtet sich frost nach `XDG_CONFIG_HOME` und `XDG_CACHE_HOME`. `FROST_CONFIG_DIR` und `FROST_CACHE_DIR` haben Vorrang vor beiden, und `--config-dir` ändert den Konfigurationsordner für einen einzelnen Befehl.

Wenn du diese Ordner änderst, starte `frost init` erneut, damit auch der geplante Auftrag sie verwendet.
