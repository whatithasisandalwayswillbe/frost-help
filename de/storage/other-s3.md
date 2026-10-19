# Anderer S3-kompatibler Speicher

Nutze einen S3-Server, den du selbst betreibst, etwa Ceph oder SeaweedFS, oder einen anderen Dienst, der das S3-Protokoll spricht und keine eigene Vorlage hat. Er muss bedingte Schreibvorgänge unterstützen, was die Einrichtung prüft. Siehe [Speicher auswählen](#choosing-storage).

Willst du auf eine eigene Maschine sichern, ohne einen S3-Server zu betreiben, ist [Eigener Server](#self-hosted) einfacher. Dafür reicht SSH.

## In der Einrichtung

Starte `frost init`, wähle **S3-compatible** und dann **Other S3-compatible**.

| Die Einrichtung fragt | Antwort |
| --- | --- |
| What's the S3 endpoint? | Der Hostname aus der Dokumentation deines Servers oder Anbieters. Ein Hostname ohne `https://` bedeutet HTTPS |
| Which region? | Nur wenn dein Server oder Anbieter danach fragt. Sonst leer lassen |
| What's the bucket called? | Sein Name, genau so, wie du ihn angelegt hast. Der Bucket muss schon existieren |
| Paste the access key ID. | Aus der Konsole deines Servers oder Anbieters |
| Paste the secret access key. | Aus der Konsole deines Servers oder Anbieters |

frost legt deine Backups in einem Ordner `frost` im Bucket ab.

## Server, die du betreibst

| Server | Was du wissen solltest |
| --- | --- |
| Ceph | Sein RADOS Gateway unterstützt bedingte Schreibvorgänge. Gib der Einrichtung Adresse und Port des Gateways an |
| SeaweedFS | Sein S3-Gateway dokumentiert bedingte Schreibvorgänge. Gib der Einrichtung seine Adresse an, etwa `http://<server>:8333` |
| MinIO | Unterstützt bedingte Schreibvorgänge, wird aber nicht mehr gepflegt und bekommt keine Fehlerbehebungen. Ein vorhandener Server funktioniert weiter, wenn er den Test der Einrichtung besteht. Gib der Einrichtung seine Adresse an, etwa `https://<server>:9000` |
| Garage | Unterstützt keine bedingten Schreibvorgänge, frost kann es also nicht nutzen |

Leg den Bucket und einen Zugriffsschlüssel vorher mit den Werkzeugen des Servers an.

## Ein Server ohne TLS

Für einen Server auf deinem eigenen Computer oder in deinem Netzwerk gibst du den Endpunkt mit `http://` an, etwa `http://localhost:9000`. Damit ist TLS für alle Anfragen ausgeschaltet, also tu das nur in einem Netzwerk, dem du vertraust. Wenn du `storage.s3.insecure` auf `true` setzt, wird HTTP für Endpunkte ohne Protokollangabe verwendet. Ein ausdrücklich angegebenes `https://` oder `http://` hat Vorrang.

## Der Ordner im Bucket

frost legt alles in einem Ordner im Bucket ab, standardmäßig `frost`. Die Einrichtung im Vollbild fragt nicht danach.

Um nach Abschluss der Einrichtung und vor deinem ersten Backup einen anderen Ordner oder die oberste Ebene des Buckets zu nutzen:

1. Starte `frost config edit` und ändere `prefix` unter `[storage.s3]`. Lass es leer für die oberste Ebene des Buckets. frost warnt dich, dass dort noch keine Backups liegen. Tipp `yes`, um trotzdem zu speichern.
2. Starte `frost init` erneut. Der Übersichtsbildschirm warnt, dass damit ein separater Satz Backups beginnt. Drück `[s]`, um fortzufahren.

Hast du schon Backups, verschieb sie stattdessen, wie unter [Backups verschieben](#moving-backups) beschrieben.
