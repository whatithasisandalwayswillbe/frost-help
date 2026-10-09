# Sicherheit und Datenschutz

frost verschlüsselt deine Backups auf deinem Computer, mit einem Schlüssel, den nur du hast, bevor irgendetwas hochgeladen wird. Weder dein Speicheranbieter noch der Betreiber von Permafrost noch die Entwickler von frost können sie lesen.

## Was verschlüsselt wird

frost verschlüsselt alles in deinen Backups: Dateiinhalte, Dateinamen, die Ordnerstruktur und die Angaben zu jedem Snapshot. Dein Schlüssel verlässt deinen Computer nie, und es gibt nirgendwo sonst eine Kopie davon.

| Bestandteil | Wie |
| --- | --- |
| Schlüssel | 256 zufällige Bits, von `frost init` auf deinem Computer erzeugt |
| Wiederherstellungsphrase | Der Schlüssel selbst, geschrieben als 24 BIP39-Wörter |
| Verschlüsselung | XChaCha20-Poly1305, mit einer neuen zufälligen Nonce für jedes Objekt |
| Blocknamen | HMAC-SHA256 des Blockinhalts, berechnet mit deinem Schlüssel |
| Kompression | zstd, vor der Verschlüsselung, nur wenn die Daten dadurch kleiner werden |

## Was dein Anbieter sehen kann

Dein Speicheranbieter, ob ein S3-Dienst oder Permafrost, kann sehen:

- Wie viele Objekte du hast, wie groß sie sind und wann sie hochgeladen wurden.
- Welche Objekte Blöcke, Snapshot-Köpfe oder Indizes von Dateilisten sind.
- Wann du sicherst und wiederherstellst, und von welcher IP-Adresse aus.
- Wie viele neue Daten jedes Backup hochlädt, was andeutet, wie viel sich geändert hat. Ein Backup ohne Neues speichert keinen Snapshot, neue Snapshots verraten also, wann sich etwas geändert hat.
- Ungefähr, wie groß eine kleine Datei nach der Kompression ist, aber nicht, was sie ist oder wie sie heißt. Große Dateien werden in Blöcke unterschiedlicher Größe zerlegt und tauchen deshalb nicht als ein einziges Objekt ihrer Größe auf.

Er kann nicht prüfen, ob du eine bestimmte bekannte Datei hast. Sowohl die Blocknamen als auch die Schnittstellen hängen von deinem Schlüssel ab.

## Wovor frost schützt

- Davor, dass dein Anbieter oder jemand mit einer Kopie deines Buckets deine Dateien liest.
- Vor jemandem im Netzwerk zwischen dir und deinem Speicher. Verbindungen nutzen TLS, außer du wählst unverschlüsseltes HTTP für einen lokalen Server, und jedes Objekt ist ohnehin authentifiziert.
- Vor Manipulation. Ein verändertes, vertauschtes oder abgeschnittenes Objekt lässt sich nicht entschlüsseln, und frost akzeptiert es nie stillschweigend.
- Davor, dass eine Wiederherstellung außerhalb des gewählten Ordners schreibt.
- Vor manipulierten frost-Downloads. Jede Version ist signiert, und das Installationsprogramm und `frost update` prüfen die Signatur, bevor sie etwas installieren.

## Wovor es nicht schützen kann

- **Vor jemandem mit Zugriff auf deinen Computer.** Die Schlüsseldatei liegt auf deinem Computer, damit geplante Backups laufen können. Wer sie lesen oder Programme unter deinem Namen ausführen kann, kann deine Backups lesen. Nutze eine vollständige Festplattenverschlüsselung und eine Bildschirmsperre.
- **Vor Datenverlust im Speicher.** Dein Anbieter könnte deine Objekte löschen oder zurückhalten. Stichprobenprüfungen können das bemerken, aber frost kann es nicht verhindern. Halte von allem, was du auf keinen Fall verlieren darfst, eine zweite, unabhängige Kopie vor.
- **Vor versteckten Snapshots.** Ein Anbieter könnte deine neuesten Snapshots verstecken und nur ältere ausliefern. Ein Computer, der die neueren schon gesehen hat, meldet sie als fehlend, ein neuer Computer kann es aber nicht erkennen. Jeder ausgelieferte Snapshot ist trotzdem echt.
- **Vor Rückschlüssen aus Zeitpunkten und Größen.** Wann du sicherst und wie viel, ist sichtbar, wie oben beschrieben.

## Dateien auf deinem Computer

Unter macOS und Linux legt frost seine Dateien so an, dass nur dein Benutzer sie lesen kann. Unter Windows übernehmen sie die Berechtigungen deines Benutzerprofils.

| Datei | Inhalt |
| --- | --- |
| `key` | Deine Wiederherstellungsphrase, im Klartext |
| `config.toml` | Deine Einstellungen und die Zugangsdaten für deinen Speicher |
| `manifest-*.jsonl` | Block-IDs, Dateipfade, Größen und Änderungszeiten. Sie verlässt deinen Computer nie |
| `frost.log` | Die Ausgabe geplanter Backups, einschließlich Pfaden, die sich nicht lesen ließen |

[Dateien und Ordner](#files-and-folders) zeigt, wo sie liegen.

## Empfehlungen

- Bewahre deine Wiederherstellungsphrase offline auf, auf Papier oder in einem Passwortmanager, dem du vertraust.
- Führ ab und zu `frost key verify` aus, um sicherzugehen, dass die aufgeschriebene Phrase stimmt.
- Gib frost Zugangsdaten, die nur seinen eigenen Bucket erreichen.
- Wirf ab und zu einen Blick auf `frost status` und geh jedem Problem mit dem Zustand sofort nach.

## Ein Sicherheitsproblem melden

Bitte eröffne kein öffentliches Issue. Melde es vertraulich über den [Security-Tab](https://github.com/whatithasisandalwayswillbe/frost/security) des GitHub-Repositorys von frost, mit **Report a vulnerability**. Beschreib, was du gefunden hast, wie es sich nachstellen lässt und was ein Angreifer damit erreichen könnte. Du bekommst innerhalb einer Woche eine Antwort.
