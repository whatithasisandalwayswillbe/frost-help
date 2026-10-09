# Amazon S3

Sichere in einen Bucket bei Amazon S3. S3 unterstützt die bedingten Schreibvorgänge, die frost braucht.

## Bevor du anfängst

1. Leg in der AWS-Konsole einen Bucket an und notiere seine Region, zum Beispiel `us-east-1`.
2. Leg einen IAM-Benutzer für frost an, gib ihm nur Zugriff auf diesen Bucket und erstelle einen Zugriffsschlüssel für ihn: IAM > Users > your user > Security credentials > Create access key.

frost muss im Bucket Objekte lesen, auflisten, schreiben und löschen können. Eine Richtlinie wie diese reicht aus. Ersetze `my-backups` durch den Namen deines Buckets:

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

Das einzige Objekt, das frost löscht, ist das kleine Testobjekt, das die Einrichtung beim Verbinden anlegt.

## In der Einrichtung

Starte `frost init` und wähle **Amazon S3**.

| Die Einrichtung fragt | Antwort |
| --- | --- |
| Which region is the bucket in? | Die Region des Buckets, zum Beispiel `us-east-1` |
| What's the bucket called? | Sein Name, genau so, wie du ihn angelegt hast |
| Paste the access key ID. | Die Zugriffsschlüssel-ID aus IAM |
| Paste the secret access key. | Wird nur einmal angezeigt, neben der Zugriffsschlüssel-ID, wenn du ihn erstellst |

frost verbindet sich mit `s3.<region>.amazonaws.com` und legt deine Backups in einem Ordner `frost` im Bucket ab.

## Gut zu wissen

- Belass die Objekte von frost in einer Speicherklasse, die sich sofort lesen lässt, etwa S3 Standard oder S3 Standard-IA. Richte keine Lebenszyklusregeln ein, die sie nach Glacier Flexible Retrieval oder Glacier Deep Archive verschieben oder ablaufen lassen.
- Bucket-Versionierung ist nicht nötig.
