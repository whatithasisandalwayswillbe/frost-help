# Einstellungen

frost speichert seine Einstellungen in `config.toml` in seinem Konfigurationsordner. Du kannst sie mit `frost init`, `frost config set` oder `frost config edit` ändern.

## Einstellungen lesen und ändern

| Befehl | Wirkung |
| --- | --- |
| `frost config` | Gibt alle Einstellungen aus. Zugangsdaten sind maskiert, außer du fügst `--show-secrets` hinzu |
| `frost config get <key>` | Gibt eine Einstellung aus. Listen erscheinen mit einem Eintrag pro Zeile |
| `frost config set <key> <value...>` | Ändert eine Einstellung und zeigt, was sich geändert hat |
| `frost config edit [editor]` | Öffnet `config.toml` in einem Editor |

Zum Beispiel:

```sh
frost config get schedule.every
frost config set schedule.every 6h
frost config set paths ~/Documents ~/Pictures
```

- Eine Liste nimmt einen Wert pro Eintrag, und `set` ersetzt die ganze Liste.
- `true` und `false` schalten Einstellungen ein und aus.
- Eine Änderung an `schedule.enabled` oder `schedule.every` aktualisiert den geplanten Auftrag sofort.
- Änderst du den Ort deines Speichers, prüft frost den neuen Ort, bevor es ihn speichert. Siehe [Backups verschieben](#moving-backups).

## Die Datei bearbeiten

```sh
frost config edit
```

frost öffnet eine Kopie von `config.toml` im angegebenen Editor, ansonsten in `$VISUAL` oder `$EDITOR`, und sonst in nano, vim oder vi. Unter Windows ist Notepad (Editor) die Ausweichlösung. Wenn du den Editor schließt, listet frost auf, was du geändert hast, und speichert die Kopie, sobald du `yes` eintippst.

Lässt sich die Datei nicht einlesen, sagt dir frost, warum, und bietet an, sie erneut zu öffnen. Ein Tippfehler kann deine geplanten Backups also nicht lahmlegen. Unbekannte Einstellungen gelten als Fehler, damit ein falsch geschriebener Name nicht unbemerkt durchrutscht.

## Alle Einstellungen

| Schlüssel | Standard | Bedeutung |
| --- | --- | --- |
| `paths` | | Die Ordner, die gesichert werden |
| `exclude` | `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules`, `.cache` | Namen und Muster, die ausgelassen werden. Siehe [Dateien ausschließen](#excluding-files) |
| `schedule.enabled` | `true` | Automatisch sichern |
| `schedule.every` | `daily` | `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily` oder `weekly` |
| `verify.sample` | `20` | Wie viele Blöcke die Stichprobenprüfung herunterlädt. `0` schaltet sie aus |
| `update.auto` | `true` | Neue Versionen nach geplanten Backups installieren. `false` informiert nur darüber |
| `storage.backend` | | `permafrost` oder `s3` |
| `storage.permafrost.url` | | Leer für den Standardserver. Sonst eine `https://`-Adresse, oder `http://` für einen Server auf deinem eigenen Computer |
| `storage.permafrost.token` | | Dein Permafrost-Zugriffsschlüssel |
| `storage.s3.endpoint` | | Etwa `s3.us-east-1.amazonaws.com`. Eine vollständige `https://`-Adresse geht auch, und eine `http://`-Adresse schaltet TLS aus |
| `storage.s3.region` | | Leer, wenn dein Anbieter keine Regionen nutzt |
| `storage.s3.bucket` | | Der Name des Buckets. Er muss schon existieren |
| `storage.s3.prefix` | `frost` | Der Ordner im Bucket, der deine Backups enthält. Leer für die oberste Ebene des Buckets |
| `storage.s3.access_key_id` | | Deine Zugriffsschlüssel-ID |
| `storage.s3.secret_access_key` | | Dein geheimer Zugriffsschlüssel |
| `storage.s3.insecure` | `false` | Unverschlüsseltes HTTP für Endpunkte ohne Protokollangabe verwenden. Nur für lokale Tests |

## Umgebungsvariablen

| Variable | Ersetzt |
| --- | --- |
| `FROST_S3_ACCESS_KEY_ID` oder `AWS_ACCESS_KEY_ID` | `storage.s3.access_key_id` |
| `FROST_S3_SECRET_ACCESS_KEY` oder `AWS_SECRET_ACCESS_KEY` | `storage.s3.secret_access_key` |
| `FROST_PERMAFROST_TOKEN` | `storage.permafrost.token` |
| `FROST_CONFIG_DIR` | Den Konfigurationsordner, wie `--config-dir` |
| `FROST_CACHE_DIR` | Den Cache-Ordner |

frost schreibt Werte aus der Umgebung nie in `config.toml`. Geplante Backups sehen die Variablen nicht, die du in deiner Shell setzt, und brauchen die Zugangsdaten deshalb weiterhin in `config.toml`.
