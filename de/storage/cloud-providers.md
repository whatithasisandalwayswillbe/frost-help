# Cloud-Anbieter

Die Einrichtung hat Vorlagen für vier Cloud-Anbieter, die das S3-Protokoll sprechen. Starte `frost init`, wähle **S3-compatible** und dann deinen Anbieter. Für jeden anderen S3-Dienst oder einen S3-Server, den du selbst betreibst, siehe [Anderer S3-kompatibler Speicher](#other-s3).

Jede Vorlage legt deine Backups in einem Ordner `frost` im Bucket ab, sodass der Bucket auch anderes enthalten kann. Gib frost einen Schlüssel, der nur diesen Bucket erreicht, und richte keine Lebenszyklusregeln ein, die Objekte in seinem Ordner löschen, ablaufen lassen oder archivieren. Snapshots teilen sich Blöcke, und schon ein einziges entferntes Objekt kann viele Snapshots beschädigen.

## Amazon S3

S3 unterstützt die bedingten Schreibvorgänge, die frost braucht.

1. Leg in der AWS-Konsole einen Bucket an und notiere seine Region, zum Beispiel `us-east-1`.
2. Leg einen IAM-Benutzer für frost an und erstelle einen Zugriffsschlüssel für ihn: IAM > Users > your user > Security credentials > Create access key.

frost muss im Bucket Objekte lesen, auflisten, schreiben und löschen können, auch wenn das einzige Objekt, das es löscht, das kleine Testobjekt ist, das die Einrichtung beim Verbinden anlegt. Eine Richtlinie wie diese reicht aus. Ersetze `my-backups` durch den Namen deines Buckets:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::my-backups"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::my-backups/*"
    }
  ]
}
```

| Die Einrichtung fragt | Antwort |
| --- | --- |
| Which region hosts the bucket? | Die Region des Buckets, zum Beispiel `us-east-1` |
| What is the bucket name? | Sein Name, genau so, wie du ihn angelegt hast |
| Paste the Access Key ID. | Die Zugriffsschlüssel-ID aus IAM |
| Paste the Secret Access Key. | Wird nur einmal angezeigt, neben der Zugriffsschlüssel-ID, wenn du ihn erstellst |

frost verbindet sich mit `s3.<region>.amazonaws.com`. Belass seine Objekte in einer Speicherklasse, die sich sofort lesen lässt, etwa S3 Standard oder S3 Standard-IA, nicht Glacier Flexible Retrieval oder Glacier Deep Archive. Bucket-Versionierung ist nicht nötig.

## Cloudflare R2

R2 unterstützt die bedingten Schreibvorgänge, die frost braucht.

1. Leg im Cloudflare-Dashboard einen R2-Bucket an.
2. Notiere deine Konto-ID. Sie steht auf der R2-Übersichtsseite und besteht aus 32 Buchstaben und Ziffern.
3. Erstelle ein API-Token: R2 > Manage R2 API Tokens > Create API token, mit der Berechtigung Object Read & Write. Beschränke es wenn möglich auf deinen Bucket.

| Die Einrichtung fragt | Antwort |
| --- | --- |
| What is your Cloudflare Account ID? | Die 32-stellige ID von der R2-Übersichtsseite |
| What is the bucket name? | Sein Name, genau so, wie du ihn angelegt hast |
| Paste the Access Key ID. | Die Access Key ID deines neuen API-Tokens |
| Paste the Secret Access Key. | Wird nur einmal angezeigt, neben der Access Key ID |

frost verbindet sich mit `<account-id>.r2.cloudflarestorage.com` mit der Region `auto`.

## Backblaze B2

Die Dokumentation von Backblaze sagt nicht, ob B2 die bedingten Schreibvorgänge unterstützt, die frost braucht. Die Einrichtung testet das beim Verbinden. Schlägt der Test fehl, wähle einen anderen Speicher.

1. Leg in deinem Backblaze-Konto einen Bucket an.
2. Notiere seinen Endpunkt: Buckets > your bucket > Endpoint. Er sieht aus wie `s3.us-west-004.backblazeb2.com`.
3. Erstelle einen Anwendungsschlüssel: Application Keys > Add a New Application Key. Beschränke ihn auf diesen Bucket.

| Die Einrichtung fragt | Antwort |
| --- | --- |
| What is the bucket endpoint? | Der Endpunkt von der Seite des Buckets, zum Beispiel `s3.us-west-004.backblazeb2.com` |
| What is the bucket name? | Sein Name, genau so, wie du ihn angelegt hast |
| Paste the application key's keyID. | Die keyID deines neuen Anwendungsschlüssels |
| Paste the applicationKey. | Wird nur einmal angezeigt, direkt nachdem du den Schlüssel erstellt hast |

frost leitet die Region aus dem Endpunkt ab.

## Wasabi

Die Dokumentation von Wasabi belegt nicht, dass es die bedingten Schreibvorgänge unterstützt, die frost braucht. Die Einrichtung testet das beim Verbinden. Schlägt der Test fehl, wähle einen anderen Speicher.

1. Leg in der Wasabi-Konsole einen Bucket an und notiere seine Region, zum Beispiel `us-east-1` oder `eu-central-1`.
2. Erstelle einen Zugriffsschlüssel: Access Keys > Create New Access Key. Nutze wenn möglich einen Benutzer, der nur auf diesen Bucket zugreifen darf.

| Die Einrichtung fragt | Antwort |
| --- | --- |
| Which region hosts the bucket? | Die Region des Buckets, zum Beispiel `us-east-1` |
| What is the bucket name? | Sein Name, genau so, wie du ihn angelegt hast |
| Paste the Access Key. | Der Zugriffsschlüssel, den du erstellt hast |
| Paste the Secret Key. | Wird nur einmal angezeigt, wenn du den Schlüssel erstellst |

frost verbindet sich mit `s3.<region>.wasabisys.com`.
