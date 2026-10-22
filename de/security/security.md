# Sicherheit und Datenschutz

Frost verschlüsselt deine Backups auf deinem Computer, mit einem Schlüssel, den nur du hast, bevor irgendetwas gespeichert wird. Ohne den Schlüssel kann niemand sie lesen: kein Cloud-Anbieter, nicht der Betreiber von Permafrost, niemand sonst mit Zugriff auf deinen Server oder dein Laufwerk und nicht die Entwickler von Frost.

Frost hat keine Konten und sammelt nichts über dich oder darüber, wie du es nutzt. Es verbindet sich nur mit deinem Speicher und mit GitHub, um nach Updates zu suchen und sie herunterzuladen.

## Was verschlüsselt wird

Frost verschlüsselt alles in deinen Backups: Dateiinhalte, Dateinamen, die Ordnerstruktur und die Angaben zu jedem Snapshot. Bei der Einrichtung sendet Frost außerdem ein kleines Testobjekt im Klartext und löscht es danach. Es enthält keine Dateien, Dateinamen oder Verschlüsselungsschlüssel. Frost sendet deinen Schlüssel nie an einen Server und hinterlegt auch keine Kopie davon.

| Bestandteil | Wie |
| --- | --- |
| Schlüssel | 256 zufällige Bits, von `frost init` auf deinem Computer erzeugt |
| Wiederherstellungsphrase | Der Schlüssel selbst, geschrieben als 24 BIP39-Wörter |
| Verschlüsselung | XChaCha20-Poly1305, mit einer neuen zufälligen Nonce für jedes Objekt |
| Blocknamen | HMAC-SHA256 des Blockinhalts, berechnet mit deinem Schlüssel |
| Kompression | zstd, vor der Verschlüsselung, nur wenn die Daten dadurch kleiner werden |

## Was dein Speicher sehen kann

Wer deinen Speicher betreibt oder lesen kann, sieht Folgendes. Das ist ein Cloud-Anbieter oder Permafrost, bei einem eigenen Server oder einem Laufwerk jeder, der darauf Zugriff hat.

- Wie viele Objekte du hast, wie groß sie sind und wann sie hochgeladen wurden.
- Welche Objekte Blöcke, Snapshot-Köpfe oder Indizes von Dateilisten sind.
- Wann du sicherst und wiederherstellst, und von welcher IP-Adresse aus.
- Wie viele neue Daten jedes Backup hochlädt, was andeutet, wie viel sich geändert hat. Ein Backup ohne Neues speichert keinen Snapshot, neue Snapshots verraten also, wann sich etwas geändert hat.
- Ungefähr, wie groß eine kleine Datei nach der Kompression ist, aber nicht, was sie ist oder wie sie heißt. Große Dateien werden in Blöcke unterschiedlicher Größe zerlegt und tauchen deshalb nicht als ein einziges Objekt ihrer Größe auf.

Er kann nicht prüfen, ob du eine bestimmte bekannte Datei hast. Sowohl die Blocknamen als auch die Blockgrenzen hängen von deinem Schlüssel ab.

## Wovor Frost schützt

- Davor, dass jemand, der deinen Speicher betreibt oder erreicht, deine Dateien liest, auch mit einer Kopie deines Buckets, des Ordners auf deinem Server oder deines Laufwerks.
- Vor jemandem im Netzwerk zwischen dir und deinem Speicher. Verbindungen nutzen TLS oder SSH, außer du wählst einen S3-Endpunkt mit `http://` oder aktivierst `storage.s3.insecure` für einen Endpunkt ohne Protokollangabe. Permafrost erlaubt `http://` nur auf deinem eigenen Computer. Nutze unverschlüsseltes HTTP nur für lokale Tests. Jedes Backup-Objekt ist in beiden Fällen authentifiziert.
- Vor jemandem, der sich als dein eigener Server ausgibt. SSH prüft den Host-Schlüssel des Servers und lehnt einen geänderten ab. Siehe [Eigener Server](#self-hosted).
- Vor Manipulation. Ein verändertes, vertauschtes oder abgeschnittenes Objekt lässt sich nicht entschlüsseln, und Frost akzeptiert es nie stillschweigend.
- Davor, dass eine Wiederherstellung außerhalb des gewählten Ordners schreibt.
- Vor manipulierten Frost-Downloads. Jede Version ist signiert, und die Installationsprogramme, das npm-Paket `getfrost` und `frost update` prüfen die Signatur, bevor sie etwas installieren.

## Wovor es nicht schützen kann

- **Vor jemandem mit Zugriff auf deinen Computer.** Die Schlüsseldatei liegt auf deinem Computer, damit geplante Backups laufen können, ebenso der SSH-Schlüssel von Frost für einen eigenen Server. Wer die Schlüsseldatei lesen oder Programme unter deinem Namen ausführen kann, kann deine Backups lesen. Nutze eine vollständige Festplattenverschlüsselung und eine Bildschirmsperre.
- **Vor Datenverlust im Speicher.** Wer deinen Speicher kontrolliert, könnte deine Objekte löschen oder zurückhalten, und ein Laufwerk kann kaputtgehen oder verloren gehen. Stichprobenprüfungen können das bemerken, aber Frost kann es nicht verhindern. Halte von allem, was du auf keinen Fall verlieren darfst, eine zweite, unabhängige Kopie vor, und zwar nicht auf dem Laufwerk neben deinem Computer.
- **Vor versteckten Snapshots.** Der Speicher könnte deine neuesten Snapshots verstecken und nur ältere ausliefern. Ein Computer, der die neueren schon gesehen hat, meldet sie als fehlend, ein neuer Computer kann es aber nicht erkennen. Jeder ausgelieferte Snapshot ist trotzdem echt.
- **Vor Rückschlüssen aus Zeitpunkten und Größen.** Wann du sicherst und wie viel, ist sichtbar, wie oben beschrieben.

## Dateien auf deinem Computer

Unter macOS und Linux legt Frost seine privaten Dateien mit Berechtigungen nur für deinen Benutzer an. Vorhandene Berechtigungen und vom Zeitplaner angelegte Protokolle können davon abweichen. Unter Windows übernehmen die Dateien die Berechtigungen deines Benutzerprofils, außer dem SSH-Schlüssel von Frost, dessen Ordner nur dein Konto öffnen kann. Bewahre Konfiguration und Cache in Ordnern auf, die andere Benutzer nicht lesen können.

| Datei | Inhalt |
| --- | --- |
| `key` | Deine Wiederherstellungsphrase, im Klartext |
| `config.toml` | Deine Einstellungen und die Zugangsdaten für deinen Speicher |
| `ssh/frost_ed25519` | Der SSH-Schlüssel von Frost für einen eigenen Server |
| `manifest-*.jsonl` | Block-IDs, Dateipfade, Größen und Änderungszeiten. Sie verlässt deinen Computer nie |
| `frost.log` | Die Ausgabe geplanter Backups, einschließlich Pfaden, die sich nicht lesen ließen |

[Dateien und Ordner](#files-and-folders) zeigt, wo sie liegen.

## Empfehlungen

- Bewahre deine Wiederherstellungsphrase offline auf, auf Papier oder in einem Passwortmanager, dem du vertraust.
- Führ ab und zu `frost key verify` aus, um sicherzugehen, dass die aufgeschriebene Phrase stimmt.
- Gib Frost Zugangsdaten, die nur seinen eigenen Bucket erreichen, oder ein Serverkonto, das sonst nichts ändern kann, was dir wichtig ist.
- Wirf ab und zu einen Blick auf `frost status` und geh jedem Problem mit dem Zustand sofort nach.

## Ein Sicherheitsproblem melden

Bitte eröffne kein öffentliches Issue. Melde es vertraulich über den [Security-Tab](https://github.com/whatithasisandalwayswillbe/frost/security) des GitHub-Repositorys von Frost, mit **Report a vulnerability**. Beschreib, was du gefunden hast, wie es sich nachstellen lässt und was ein Angreifer damit erreichen könnte. Du bekommst innerhalb einer Woche eine Antwort.
