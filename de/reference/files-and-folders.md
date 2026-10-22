# Dateien und Ordner

Frost legt die Anwendung, deine Einstellungen und seinen Cache in getrennten Ordnern auf deinem Computer ab.

## Die Anwendung

| System | Anwendungsordner |
| --- | --- |
| macOS | `~/Library/Application Support/frost/app` |
| Linux | `~/.local/share/frost/app` oder `$XDG_DATA_HOME/frost/app` |
| Windows | `%LocalAppData%\frost\app` |

Der Anwendungsordner enthält die mitgelieferte Laufzeitumgebung und jede installierte Version. Lass ihn vollständig.

Der `frost`-Starter liegt unter macOS und Linux in `/usr/local/bin` oder `~/.local/bin` und unter Windows in `%LocalAppData%\frost\bin`, sofern du bei der Installation keinen anderen Ordner gewählt hast. Das Installationsprogramm für Git Bash nutzt stattdessen `~/bin`. Mit npm oder pnpm liegt `frost` dort, wo sie globale Befehle ablegen. Siehe [Frost installieren](#installing).

## Einstellungen und Schlüssel

| Datei | macOS und Linux | Windows |
| --- | --- | --- |
| Einstellungen | `~/.config/frost/config.toml` | `%AppData%\frost\config.toml` |
| Schlüssel | `~/.config/frost/key` | `%AppData%\frost\key` |
| SSH-Schlüssel für einen eigenen Server | `~/.config/frost/ssh/frost_ed25519` | `%AppData%\frost\ssh\frost_ed25519` |

## Cache

| Datei | macOS und Linux | Windows |
| --- | --- | --- |
| Liste dessen, was hochgeladen ist | `~/.cache/frost/manifest-<repo>.jsonl` | `%LocalAppData%\frost\manifest-<repo>.jsonl` |
| Wo deine Backups zuletzt geöffnet wurden | `~/.cache/frost/storage-<config>.json` | `%LocalAppData%\frost\storage-<config>.json` |
| Letzte Suche nach Updates | `~/.cache/frost/update.json` | `%LocalAppData%\frost\update.json` |
| Wann der geplante Auftrag eingerichtet wurde und wann dein letztes Backup lief | `~/.cache/frost/schedule-<config>.json` | `%LocalAppData%\frost\schedule-<config>.json` |
| Protokoll geplanter Backups | `~/.cache/frost/frost.log` | `%LocalAppData%\frost\frost.log` |

Mit systemd schreiben geplante Backups ins Journal statt in `frost.log`. Siehe [Automatische Backups](#scheduling), wo auch steht, wo der geplante Auftrag liegt.

Die Liste dessen, was hochgeladen ist, ist entbehrlich. Löschst du sie, baut das nächste Backup sie aus deinem Speicher neu auf und liest alle deine Dateien noch einmal. Zum Wiederherstellen wird sie nicht gebraucht. Daneben liegt eine Datei `.lock`, die verhindert, dass zwei Frost-Prozesse gleichzeitig schreiben. Die Sperrdatei zu löschen beendet kein laufendes Frost.

## Die Ordner ändern

Unter macOS und Linux richtet sich Frost nach `XDG_CONFIG_HOME` und `XDG_CACHE_HOME`. `FROST_CONFIG_DIR` und `FROST_CACHE_DIR` haben Vorrang vor beiden, und `--config-dir` ändert den Konfigurationsordner für einen einzelnen Befehl.

Wenn du diese Ordner änderst, starte `frost init` erneut, damit auch der geplante Auftrag sie verwendet.
