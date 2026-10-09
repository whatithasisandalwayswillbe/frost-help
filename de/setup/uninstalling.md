# frost deinstallieren

frost hat keinen Befehl zum Deinstallieren, aber das Entfernen dauert nur ein paar Schritte.

> Das Deinstallieren von frost löscht deine Backups nicht. Falls du sie irgendwann zurückhaben willst, stell sicher, dass du deine Wiederherstellungsphrase hast, bevor du den Schlüssel auf diesem Computer löschst. `frost key show` zeigt sie an.

## 1. Den geplanten Auftrag entfernen

```sh
frost config set schedule.enabled false
```

Damit wird der Auftrag aus dem Zeitplaner deines Betriebssystems entfernt. Unter Linux mit systemd wird außerdem Lingering wieder ausgeschaltet, sofern frost aufgezeichnet hat, dass es Lingering eingeschaltet hat.

## 2. Die Dateien von frost löschen

Dieser Schritt löscht die Anwendung, ihren Starter, deine Einstellungen, deinen Schlüssel und den Cache von frost. Hast du einen Speicherort geändert, passe die Pfade unten so an, dass sie auf die eigenen Dateien und Ordner von frost zeigen. `FROST_CONFIG_DIR` und `FROST_CACHE_DIR` nennen die frost-Ordner direkt; unter `XDG_CONFIG_HOME`, `XDG_CACHE_HOME` und `XDG_DATA_HOME` liegt jeweils ein Unterordner `frost`. Lösch nie einen XDG-Stammordner oder einen gemeinsam genutzten Ordner selbst. [Dateien und Ordner](#files-and-folders) listet alle Orte auf.

Unter macOS:

```sh
rm -rf ~/Library/Application\ Support/frost ~/.config/frost ~/.cache/frost
rm -f /usr/local/bin/frost ~/.local/bin/frost
```

Unter Linux:

```sh
rm -rf ~/.local/share/frost ~/.config/frost ~/.cache/frost
rm -f /usr/local/bin/frost ~/.local/bin/frost
```

Unter Windows in PowerShell:

```powershell
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\frost", "$env:APPDATA\frost"
Remove-Item -Force "$HOME\bin\frost", "$HOME\bin\frost.cmd"
```

Wenn du den Starter woanders installiert hast, lösch ihn dort.

## 3. Deine Backups löschen, falls gewünscht

Deine Backups bleiben in deinem Speicher, bis du sie löschst. Bei einem S3-Anbieter liegen sie in einem Ordner deines Buckets, `frost`, sofern du keinen anderen gewählt hast. Lösch diesen Ordner, um sie zu entfernen. Ohne deine Wiederherstellungsphrase kann niemand lesen, was darin noch liegt.
