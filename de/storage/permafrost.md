# Permafrost

Permafrost ist ein gehosteter Speicher, der für frost gemacht ist. Zum Verbinden reicht ein einziger Zugriffsschlüssel, ohne Bucket, Region oder Endpunkt.

Deine Backups werden auf deinem Computer verschlüsselt, bevor sie hochgeladen werden, genau wie bei jedem anderen Speicher. Permafrost kann sie nicht lesen.

## Einen Schlüssel bekommen

1. Starte `frost init` und wähle **Permafrost**.
2. Wähle **I don't have a key yet** (ich habe noch keinen Schlüssel). frost öffnet [getfro.st/perma](https://getfro.st/perma) in deinem Browser. Öffnet er sich nicht, ruf die Seite selbst auf.
3. Hol dir dort deinen Schlüssel und kopier ihn.
4. Füge ihn in der Einrichtung ein.

Hast du schon einen Schlüssel, wähle **I have a key** (ich habe einen Schlüssel) und füge ihn ein.

## Einen neuen Schlüssel bekommen

Hast du deinen Schlüssel verloren, ruf [getfro.st/perma/recover](https://getfro.st/perma/recover) auf und gib die E-Mail-Adresse ein, mit der du ihn bekommen hast. Die E-Mail, die du dann erhältst, führt dich zu einem neuen Schlüssel. Der neue ersetzt den alten, und der alte funktioniert danach auf keinem Computer mehr.

Setz den neuen Schlüssel auf jedem Computer ein, der Permafrost nutzt:

```sh
frost config set storage.permafrost.token <new key>
```

Solange Permafrost keine Uploads annimmt, kann `frost config set` seine Speicherprüfung nicht durchführen. Nimm dann stattdessen `frost config edit` und trag den Schlüssel bei `token` unter `[storage.permafrost]` ein.

## Belegter Speicher

`frost status` zeigt, wie viel von deinem Permafrost-Speicher belegt ist. Hat Permafrost dir etwas mitzuteilen, etwa dass der Speicher fast voll ist, zeigen `frost status` und `frost backup` das als Warnung an. Siehe [Backups prüfen](#checking-backups).

## Wenn Permafrost ablehnt

Die Fehlermeldungen von Permafrost nennen den Grund. Befehle, die auf deine Backups zugreifen, brechen mit dieser Meldung ab.

| Du siehst | Was es bedeutet |
| --- | --- |
| the Permafrost access key was rejected | Der Schlüssel ist falsch, ein neuerer hat ihn ersetzt, oder das Konto wurde geschlossen. Die Meldung sagt, was davon zutrifft. Nimm deinen neuesten Schlüssel oder hol dir einen neuen |
| uploads are paused | Permafrost nimmt gerade keine neuen Backups an. Wiederherstellen klappt weiterhin. Die Meldung sagt, warum, bis wann und was zu tun ist |
| your Permafrost storage is full | Der Upload passt nicht mehr hinein. Die Meldung sagt, wie viel du speicherst und was zu tun ist |

In der Einrichtung lauten die ersten beiden „Permafrost didn't accept that access key“ und „Permafrost won't store backups with that access key“, gefolgt vom selben Grund.

## Dein eigener Server

Jeder kann einen Server betreiben, der die [Permafrost-API](https://github.com/whatithasisandalwayswillbe/frost/blob/main/docs/PERMAFROST.md) spricht.

Erstelle vor deiner ersten Einrichtung eine Datei `config.toml` im Konfigurationsordner von frost, der unter [Dateien und Ordner](#files-and-folders) aufgeführt ist, mit diesen Einstellungen. Ersetze die Adresse durch die deines Servers:

```toml
[storage]
backend = "permafrost"

[storage.permafrost]
url = "https://<your-server>"
```

Starte dann `frost init`, wähle Permafrost, füge deinen Zugriffsschlüssel ein, wähle deine Ordner und speichere. Ist der Server leer, erstellt die Einrichtung das Repository.

Ist frost schon eingerichtet, ändere mit `frost config edit` das Backend und die Serveradresse gemeinsam in der vorhandenen Datei. Bestätige die Warnung, wenn der neue Server leer ist, tipp `yes` zum Speichern und starte `frost init` erneut. `frost config set` lehnt ein leeres Ziel ab und kann deshalb keinen neuen Server vorbereiten.

Die Adresse muss `https://` verwenden, außer bei einem Server auf deinem eigenen Computer, etwa `http://localhost:8080`. Lass die Einstellung leer, um den Standardserver von Permafrost zu verwenden, `https://permafrost.wihiaawb.com`.
