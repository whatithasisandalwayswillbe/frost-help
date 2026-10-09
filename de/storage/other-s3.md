# Anderer S3-kompatibler Speicher

Nutze einen beliebigen anderen Dienst, der das S3-Protokoll spricht, etwa MinIO, Ceph oder einen Anbieter ohne eigene Vorlage in der Einrichtung. Er muss bedingte Schreibvorgänge unterstützen. Siehe [Speicher auswählen](#choosing-storage).

## In der Einrichtung

Starte `frost init` und wähle **Other S3-compatible**.

| Die Einrichtung fragt | Antwort |
| --- | --- |
| What's the S3 endpoint? | Der Hostname aus der Dokumentation deines Anbieters. Ein Hostname ohne `https://` bedeutet HTTPS |
| Which region? | Nur wenn dein Anbieter danach fragt. Sonst leer lassen |
| What's the bucket called? | Sein Name, genau so, wie du ihn angelegt hast. Der Bucket muss schon existieren |
| Paste the access key ID. | Aus der Konsole deines Anbieters |
| Paste the secret access key. | Aus der Konsole deines Anbieters |

frost legt deine Backups in einem Ordner `frost` im Bucket ab.

## Ein Server ohne TLS

Für einen Testserver auf deinem eigenen Computer oder in deinem Netzwerk gibst du den Endpunkt mit `http://` an, etwa `http://localhost:9000`. Damit ist TLS für alle Anfragen ausgeschaltet, also tu das nur in einem Netzwerk, dem du vertraust. `storage.s3.insecure` auf `true` zu setzen bewirkt dasselbe.

## Der Ordner im Bucket

frost legt alles in einem Ordner im Bucket ab, standardmäßig `frost`. Die Einrichtung im Vollbild fragt nicht danach.

Um vor deinem ersten Backup einen anderen Ordner oder die oberste Ebene des Buckets zu nutzen:

1. Starte `frost config edit` und ändere `prefix` unter `[storage.s3]`. Lass es leer für die oberste Ebene des Buckets. frost warnt dich, dass dort noch keine Backups liegen. Tipp `yes`, um trotzdem zu speichern.
2. Starte `frost init` erneut. Der Übersichtsbildschirm warnt, dass damit ein separater Satz Backups beginnt. Drück `[s]`, um fortzufahren.

Hast du schon Backups, verschieb sie stattdessen, wie unter [Backups verschieben](#moving-backups) beschrieben.

## MinIO

MinIO unterstützt bedingte Schreibvorgänge im Server, aber deine Version muss den Test der Einrichtung bestehen. Leg in der MinIO-Konsole einen Bucket und einen Zugriffsschlüssel an und gib der Einrichtung dann Adresse und Port deines MinIO-Servers an, etwa `https://<server>:9000`.
