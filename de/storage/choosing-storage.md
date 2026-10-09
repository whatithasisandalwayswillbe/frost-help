# Speicher auswählen

frost legt deine Backups bei Permafrost ab oder bei einem beliebigen S3-kompatiblen Anbieter, der bedingte Schreibvorgänge unterstützt. So oder so wird alles verschlüsselt, bevor es deinen Computer verlässt, und dein Anbieter kann es nicht lesen.

## Deine Möglichkeiten

- **[Permafrost](#permafrost)** ist ein gehosteter Speicher, der für frost gemacht ist. Er braucht nur einen Zugriffsschlüssel, ohne Bucket, Region oder Endpunkt.
- **S3-kompatibler Speicher** nutzt einen Bucket, den du bei einem Anbieter wie [Amazon S3](#amazon-s3), [Cloudflare R2](#cloudflare-r2), [Backblaze B2](#backblaze-b2) oder [Wasabi](#wasabi) anlegst, oder einen Server, den du selbst betreibst, etwa [MinIO](#other-s3).

## Bedingte Schreibvorgänge

frost braucht einen Speicher, der atomare bedingte Schreibvorgänge (`If-None-Match: *`) unterstützt. Sie verhindern, dass zwei Computer gegenseitig ihre Backup-Einträge überschreiben. Die Einrichtung testet das beim Verbinden und lehnt Speicher ab, der den Test nicht besteht. Unterstützt der Anbieter es nicht, helfen auch andere Schlüssel oder Einstellungen nicht.

| Anbieter | Bedingte Schreibvorgänge |
| --- | --- |
| Permafrost | Unterstützt |
| Amazon S3 | [Dokumentiert](https://docs.aws.amazon.com/AmazonS3/latest/userguide/conditional-writes.html) |
| Cloudflare R2 | [Dokumentiert](https://developers.cloudflare.com/r2/api/s3/api/) |
| MinIO | Im Server eingebaut. Deine Version muss den Test der Einrichtung bestehen |
| Backblaze B2 | Nicht bestätigt. Die [Upload-Referenz](https://www.backblaze.com/apidocs/s3-put-object) nennt `If-None-Match` nicht |
| Wasabi | Nicht bestätigt. Die [API-Referenz](https://docs.wasabi.com/apidocs/operations-on-objects) belegt die Unterstützung nicht |
| Garage | Nicht unterstützt, laut seinem Maintainer |

Diese Angaben wurden am 2. Oktober 2026 anhand der Dokumentation und des Quellcodes der Anbieter geprüft, ohne echte Tests. Entscheidend ist der Test der Einrichtung.

## Worauf du achten solltest

- **Kosten einer Wiederherstellung.** Manche Anbieter berechnen Downloads. Eine vollständige Wiederherstellung lädt alles herunter, und jede Stichprobenprüfung lädt eine kleine Stichprobe.
- **Archiv-Speicherklassen.** frost liest Blöcke direkt zurück. Verschieb seine Objekte also nicht in eine Archivklasse, die vor dem Lesen erst aufgetaut werden muss.
- **Löschen und Ablaufen.** frost löscht deine Backups nie. Richte keine Lebenszyklusregeln ein, die Objekte in seinem Ordner löschen oder ablaufen lassen, denn Snapshots teilen sich Blöcke.
- **Eingeschränkte Schlüssel.** Gib frost einen Zugriffsschlüssel, der nur seinen eigenen Bucket erreicht.

## Später den Speicher wechseln

Du kannst deine Backups zu einem anderen Anbieter umziehen, ohne alles erneut hochzuladen. Siehe [Backups verschieben](#moving-backups).
