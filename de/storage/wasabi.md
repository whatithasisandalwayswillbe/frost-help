# Wasabi

Sichere in einen Bucket bei Wasabi.

> Die Dokumentation von Wasabi belegt nicht, dass es die bedingten Schreibvorgänge unterstützt, die frost braucht. Die Einrichtung testet das beim Verbinden. Schlägt der Test fehl, wähle einen anderen Anbieter. Siehe [Speicher auswählen](#choosing-storage).

## Bevor du anfängst

1. Leg in der Wasabi-Konsole einen Bucket an und notiere seine Region, zum Beispiel `us-east-1` oder `eu-central-1`.
2. Erstelle einen Zugriffsschlüssel: Access Keys > Create New Access Key. Nutze wenn möglich einen Benutzer, der nur auf diesen Bucket zugreifen darf.

## In der Einrichtung

Starte `frost init` und wähle **Wasabi**.

| Die Einrichtung fragt | Antwort |
| --- | --- |
| Which region is the bucket in? | Die Region des Buckets, zum Beispiel `us-east-1` |
| What's the bucket called? | Sein Name, genau so, wie du ihn angelegt hast |
| Paste the access key. | Der Zugriffsschlüssel, den du erstellt hast |
| Paste the secret key. | Wird nur einmal angezeigt, wenn du den Schlüssel erstellst |

frost verbindet sich mit `s3.<region>.wasabisys.com` und legt deine Backups in einem Ordner `frost` im Bucket ab.

## Gut zu wissen

Richte keine Lebenszyklusregeln ein, die Objekte im frost-Ordner löschen. Snapshots teilen sich Blöcke, und schon ein einziges entferntes Objekt kann viele Snapshots beschädigen.
