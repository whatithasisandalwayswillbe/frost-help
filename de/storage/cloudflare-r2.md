# Cloudflare R2

Sichere in einen Bucket bei Cloudflare R2. R2 unterstützt die bedingten Schreibvorgänge, die frost braucht.

## Bevor du anfängst

1. Leg im Cloudflare-Dashboard einen R2-Bucket an.
2. Notiere deine Konto-ID. Sie steht auf der R2-Übersichtsseite und besteht aus 32 Buchstaben und Ziffern.
3. Erstelle ein API-Token: R2 > Manage R2 API Tokens > Create API token, mit der Berechtigung Object Read & Write. Beschränke es wenn möglich auf deinen Bucket.

## In der Einrichtung

Starte `frost init` und wähle **Cloudflare R2**.

| Die Einrichtung fragt | Antwort |
| --- | --- |
| What's your Cloudflare account ID? | Die 32-stellige ID von der R2-Übersichtsseite |
| What's the bucket called? | Sein Name, genau so, wie du ihn angelegt hast |
| Paste the Access Key ID. | Die Access Key ID deines neuen API-Tokens |
| Paste the Secret Access Key. | Wird nur einmal angezeigt, neben der Access Key ID |

frost verbindet sich mit `<account-id>.r2.cloudflarestorage.com` mit der Region `auto` und legt deine Backups in einem Ordner `frost` im Bucket ab.

## Gut zu wissen

Richte keine Lebenszyklusregeln ein, die Objekte im frost-Ordner löschen oder ablaufen lassen. Snapshots teilen sich Blöcke, und schon ein einziges entferntes Objekt kann viele Snapshots beschädigen.
