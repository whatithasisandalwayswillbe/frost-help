# Backblaze B2

Sichere in einen Bucket bei Backblaze B2, über dessen S3-kompatible API.

> Die Dokumentation von Backblaze sagt nicht, ob B2 die bedingten Schreibvorgänge unterstützt, die frost braucht. Die Einrichtung testet das beim Verbinden. Schlägt der Test fehl, wähle einen anderen Anbieter. Siehe [Speicher auswählen](#choosing-storage).

## Bevor du anfängst

1. Leg in deinem Backblaze-Konto einen Bucket an.
2. Notiere seinen Endpunkt: Buckets > your bucket > Endpoint. Er sieht aus wie `s3.us-west-004.backblazeb2.com`.
3. Erstelle einen Anwendungsschlüssel: Application Keys > Add a New Application Key. Beschränke ihn auf diesen Bucket.

## In der Einrichtung

Starte `frost init` und wähle **Backblaze B2**.

| Die Einrichtung fragt | Antwort |
| --- | --- |
| What's the bucket's endpoint? | Der Endpunkt von der Seite des Buckets, zum Beispiel `s3.us-west-004.backblazeb2.com` |
| What's the bucket called? | Sein Name, genau so, wie du ihn angelegt hast |
| Paste the application key's keyID. | Die keyID deines neuen Anwendungsschlüssels |
| Paste the applicationKey. | Wird nur einmal angezeigt, direkt nachdem du den Schlüssel erstellt hast |

frost leitet die Region aus dem Endpunkt ab und legt deine Backups in einem Ordner `frost` im Bucket ab.

## Gut zu wissen

Richte keine Lebenszyklusregeln ein, die Objekte im frost-Ordner löschen. Snapshots teilen sich Blöcke, und schon ein einziges entferntes Objekt kann viele Snapshots beschädigen.
