# Permafrost

Permafrost ist ein gehosteter Speicher, der für frost gemacht ist. Zum Verbinden reicht ein einziger Zugriffsschlüssel, ohne Bucket, Region oder Endpunkt.

Deine Backups werden auf deinem Computer verschlüsselt, bevor sie hochgeladen werden, genau wie bei jedem anderen Speicher. Permafrost kann sie nicht lesen.

## Einen Schlüssel bekommen

1. Starte `frost init` und wähle **Permafrost**.
2. Wähle **I don't have a key yet** (ich habe noch keinen Schlüssel). frost öffnet in deinem Browser eine Seite, auf der du einen bekommst.
3. Sobald du deinen Schlüssel hast, schickt die Seite ihn an frost zurück, und frost speichert ihn sofort. Auch wenn du die Einrichtung danach beendest, geht er nicht verloren.

Öffnet sich der Browser nicht, ruf [getfro.st/perma](https://getfro.st/perma) selbst auf und drück dann in der Einrichtung `[p]`, um den Schlüssel einzufügen, den du dort bekommst. Klappt das Abholen des Schlüssels nicht, drück `[r]` für einen neuen Versuch oder `[p]`, um einen Schlüssel einzufügen. frost wartet bis zu 25 Minuten.

Hast du schon einen Schlüssel, wähle **I have a key** (ich habe einen Schlüssel) und füge ihn ein.

## Wie der Schlüssel zu frost gelangt

Während es wartet, lauscht frost auf `127.0.0.1`, das nur dein eigener Computer erreicht. Es gibt der Seite einen Zufallswert mit und nimmt nur einen Schlüssel an, der mit genau diesem Wert zurückkommt. Keine andere Seite kann frost also einen eigenen Schlüssel unterschieben.

Die Seite zeigt dir den Schlüssel außerdem an, damit du ihn selbst in frost kopieren kannst, zum Beispiel wenn der Browser auf einem anderen Computer läuft.

## Abgelehnte Schlüssel

Akzeptiert Permafrost deinen Zugriffsschlüssel nicht mehr, brechen Befehle, die auf deine Backups zugreifen, mit einer entsprechenden Fehlermeldung ab. Starte `frost init` und richte den Speicher neu ein, um einen funktionierenden Schlüssel zu bekommen.

| Die Einrichtung meldet | Was du tust |
| --- | --- |
| Permafrost didn't accept that access key | Prüf, ob du ihn vollständig kopiert hast. Er kann auch abgelaufen sein |
| That access key can't store backups | Prüf seine Berechtigungen in deinem Permafrost-Konto |
| your Permafrost storage is full | Dein Konto hat keinen freien Platz mehr. Sieh in deinem Permafrost-Konto nach |

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

Die Adresse muss `https://` verwenden, außer bei einem Server auf deinem eigenen Computer, etwa `http://localhost:8080`. Lass die Einstellung leer, um den Standardserver von Permafrost zu verwenden.
