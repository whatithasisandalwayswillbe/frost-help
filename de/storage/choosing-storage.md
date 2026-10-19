# Speicher auswählen

frost kann deine Backups auf deinem eigenen Server, auf einem Laufwerk, bei Permafrost oder bei einem S3-kompatiblen Dienst ablegen. Wohin sie auch gehen, alles wird zuerst auf deinem Computer verschlüsselt, und wer den Speicher betreibt, kann deine Dateien nicht lesen.

## Deine Möglichkeiten

| Speicher | Gut für | Was du brauchst |
| --- | --- | --- |
| [Eigener Server](#self-hosted) | Ein NAS, einen Heimserver oder einen VPS, den du betreibst | SSH-Zugang dazu |
| [Lokales Laufwerk](#local-drive) | Eine USB-Festplatte oder eine zweite Festplatte | Ein Laufwerk, das angeschlossen ist, wenn Backups laufen |
| [Permafrost](#permafrost) | Gehosteten Speicher, der für frost gemacht ist | Einen Zugriffsschlüssel |
| [Cloud-Anbieter](#cloud-providers) | Amazon S3, Cloudflare R2, Backblaze B2 oder Wasabi | Einen Bucket und seine Schlüssel |
| [Anderer S3-kompatibler Speicher](#other-s3) | Einen S3-Server, den du betreibst, etwa Ceph oder SeaweedFS, oder einen anderen S3-Dienst | Einen Bucket und seine Schlüssel |

Mit einem eigenen Server oder einem lokalen Laufwerk liegen deine Backups auf Hardware, die du selbst kontrollierst, ganz ohne Konto irgendwo. Permafrost und Cloud-Anbieter bewahren sie außer Haus auf, ohne dass du dich um eine eigene Maschine kümmern musst.

## Bedingte Schreibvorgänge

frost braucht einen Speicher, der eine Datei in einem Schritt nur dann anlegen kann, wenn ihr Name noch frei ist. Das verhindert, dass zwei Computer gegenseitig ihre Backup-Einträge überschreiben. Die Einrichtung testet das beim Verbinden und lehnt Speicher ab, der den Test nicht besteht. Unterstützt ein Speicher es nicht, helfen auch andere Schlüssel oder Einstellungen nicht.

| Speicher | Bedingte Schreibvorgänge |
| --- | --- |
| Eigener Server | Von OpenSSH-Servern unterstützt, auf Dateisystemen mit Hardlinks wie ext4, Btrfs, XFS, ZFS, APFS und NTFS |
| Lokales Laufwerk | Auf NTFS, APFS, ext4, Btrfs und XFS unterstützt. Andere Dateisysteme müssen den Test der Einrichtung bestehen |
| Permafrost | Unterstützt |
| Amazon S3 | [Dokumentiert](https://docs.aws.amazon.com/AmazonS3/latest/userguide/conditional-writes.html) |
| Cloudflare R2 | [Dokumentiert](https://developers.cloudflare.com/r2/api/s3/api/) |
| Ceph | Im Server eingebaut. Deine Version muss den Test der Einrichtung bestehen |
| SeaweedFS | [Dokumentiert](https://github.com/seaweedfs/seaweedfs/wiki/S3-Conditional-Operations). Deine Version muss den Test der Einrichtung bestehen |
| MinIO | Im Server eingebaut, der nicht mehr gepflegt wird. Deine Version muss den Test der Einrichtung bestehen |
| Backblaze B2 | Nicht bestätigt. Die [Upload-Referenz](https://www.backblaze.com/apidocs/s3-put-object) nennt `If-None-Match` nicht |
| Wasabi | Nicht bestätigt. Die [API-Referenz](https://docs.wasabi.com/apidocs/operations-on-objects) belegt die Unterstützung nicht |
| Garage | Nicht unterstützt, laut seinem Maintainer |

Die S3-Angaben wurden im Oktober 2026 anhand der Dokumentation und des Quellcodes der Projekte geprüft, ohne echte Tests. Entscheidend ist der Test der Einrichtung.

## Worauf du achten solltest

- **Eine Kopie außer Haus.** Ein Laufwerk oder Server zu Hause kann beim selben Brand oder Einbruch verloren gehen wie dein Computer. Ein Server an einem anderen Ort, Permafrost oder ein Cloud-Anbieter nicht. Bewahre von allem Unersetzlichen eine zweite, unabhängige Kopie an einem anderen Ort auf.
- **Kosten einer Wiederherstellung.** Manche Cloud-Anbieter berechnen Downloads. Eine vollständige Wiederherstellung lädt alles herunter, und jede Stichprobenprüfung lädt eine kleine Stichprobe.
- **Archiv-Speicherklassen.** frost liest Blöcke direkt zurück. Verschieb seine Objekte also nicht in eine Archivklasse, die vor dem Lesen erst aufgetaut werden muss.
- **Löschen und Ablaufen.** frost löscht deine Backups nie. Richte keine Lebenszyklusregeln oder Aufräumjobs ein, die Dateien in seinem Ordner löschen oder ablaufen lassen, denn Snapshots teilen sich Blöcke.
- **Eingeschränkter Zugriff.** Gib frost einen Zugriffsschlüssel, der nur seinen eigenen Bucket erreicht, oder ein Serverkonto, das sonst nichts ändern kann, was dir wichtig ist.

## Später den Speicher wechseln

Du kannst deine Backups zu einer anderen Art von Speicher umziehen, ohne alles erneut hochzuladen. Siehe [Backups verschieben](#moving-backups).
