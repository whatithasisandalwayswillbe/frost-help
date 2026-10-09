# Häufige Probleme

Diese Seite sammelt die Meldungen und Probleme, die am häufigsten auftreten. Jede Überschrift ist entweder das, was frost meldet, oder das, was dir auffällt.

## „frost isn't set up yet, run `frost init`“

frost findet `config.toml` nicht. Starte `frost init`. Wenn du `--config-dir` oder `FROST_CONFIG_DIR` verwendest, prüf, ob sie auf den richtigen Ordner zeigen.

## „no key on this machine“

Die Schlüsseldatei fehlt. Ist auf diesem Computer schon ein Speicher eingerichtet, führ `frost key import` aus und tipp deine Wiederherstellungsphrase ein. Andernfalls starte `frost init`.

## „a backup or restore is already running“

Ein anderer frost-Prozess nutzt gerade deine Backups, meistens ein geplantes Backup. Warte, bis er fertig ist, und versuch es dann erneut. Die Sperrdatei von frost zu löschen beendet den anderen Prozess nicht.

## „the key on this machine doesn't match“

In deinem Speicher liegen Backups, die mit einem anderen Schlüssel erstellt wurden. Führ `frost key verify` aus und tipp die Phrase ein, die du aufgeschrieben hast, um herauszufinden, um welchen Schlüssel es geht. Ist es der richtige, führ damit `frost key import` aus.

## frost findet deine Backups nicht

Meldungen wie „has no frost repository“ bedeuten, dass deine Backups nicht dort liegen, wo frost sucht. Die Fehlermeldung sagt, wo sie zuletzt geöffnet wurden und wie du wieder zu ihnen kommst. Siehe [Backups verschieben](#moving-backups).

## Die Einrichtung kann sich nicht verbinden

Die Einrichtung erklärt das Problem und bringt dich zu der Antwort zurück, die es am wahrscheinlichsten verursacht hat.

| Die Einrichtung meldet | Prüfe |
| --- | --- |
| That access key ID wasn't recognised | Ob du die ganze Zugriffsschlüssel-ID kopiert hast |
| The secret key doesn't match the access key ID | Ob du den ganzen geheimen Schlüssel kopiert hast und ob er zu dieser ID gehört |
| There's no bucket with that name | Den Namen des Buckets, oder leg den Bucket zuerst an |
| That key doesn't have the bucket permissions frost needs | Ob der Schlüssel im Bucket Objekte lesen, auflisten, schreiben und löschen darf |
| The bucket is in a different region | Die Region oder den Endpunkt |
| Can't find ... | Die Adresse und deine Internetverbindung |
| Nothing answered at that address | Adresse und Port |
| The server's certificate isn't valid for that address | Die Adresse, und ob das Zertifikat des Servers sie abdeckt |
| the storage didn't answer in time | Deine Internetverbindung, dann versuch es erneut |

## „This storage doesn't support conditional writes“

Dein Anbieter unterstützt eine Funktion nicht, die frost braucht, damit sich Computer nicht gegenseitig ihre Backup-Einträge überschreiben. Andere Schlüssel oder Einstellungen helfen nicht. Wähle einen anderen Anbieter. Siehe [Speicher auswählen](#choosing-storage).

## „the Permafrost access key was rejected“

Der Schlüssel ist vielleicht falsch oder abgelaufen. Starte `frost init` und richte den Speicher neu ein, um einen funktionierenden Schlüssel zu bekommen. Siehe [Permafrost](#permafrost).

## Ein Backup kann einen Ordner nicht lesen

Unter macOS liegt das meist an einer Datenschutzberechtigung. Die Fehlermeldung sagt, was du erlauben musst. Siehe [macOS-Berechtigungen](#macos-permissions). Auf anderen Systemen prüf, ob dein Benutzer den Ordner lesen darf.

## Dateien, die als „couldn't be read“ aufgeführt sind

frost hat diese Dateien übersprungen und den Rest gesichert. Häufige Ursachen sind Dateien, die du nicht lesen darfst, Dateien, die während des Backups gelöscht wurden, und unter macOS Dateien, die iCloud nur online vorhält.

## Dateien, die „kept changing while they were read“

Ein Programm hat während des Backups in diese Dateien geschrieben, deshalb hat der Snapshot ihre vorherige Kopie behalten. Schließ das Programm und sichere erneut, oder lass das nächste Backup sie mitnehmen.

## Ein Ordner ist „not found“

Ein Ordner aus deiner Liste fehlte, also hat frost den Rest gesichert. Schließ das Laufwerk wieder an, oder aktualisiere deine Liste mit `frost init`, falls der Ordner umgezogen ist.

## „scheduled job is missing“

Der geplante Auftrag wurde gelöscht oder ausgeschaltet. Stell ihn mit `frost config set schedule.enabled true` wieder her.

## Geplante Backups laufen nicht

- Sieh dir die Zeile „next backup“ in `frost status` an.
- Prüf unter macOS den Schalter für frost unter Systemeinstellungen > Allgemein > Anmeldeobjekte & Erweiterungen (System Settings > General > Login Items & Extensions). Er heißt dort Node.js Foundation.
- Unter Windows laufen geplante Backups nicht im Akkubetrieb.
- Mit cron oder der Aufgabenplanung wird ein Backup übersprungen, das fällig war, während der Computer aus war oder schlief.
- Lies das Protokoll. Siehe [Automatische Backups](#scheduling).

## „verification failed“

Eine Stichprobenprüfung hat fehlende oder beschädigte Daten in deinem Speicher gefunden. Siehe [Backups prüfen](#checking-backups).

## „can't restore beside the originals“

Der Ordner neben den Originalen lässt sich nicht nutzen, oft weil der Snapshot von einem anderen Computer stammt. Nimm stattdessen `--to <dir>`. Siehe [Dateien wiederherstellen](#restoring).

## „can't overwrite the originals“

Der Snapshot stammt von einer anderen Art Computer, oder der Pfad zu den Originalen führt über einen Link, dem frost nicht vertraut. Nimm stattdessen `--beside` oder `--to <dir>`.

## frost findet den gewünschten Snapshot nicht

| frost meldet | Versuch es mit |
| --- | --- |
| no snapshot at or before ... | Einem späteren Zeitpunkt. Die Meldung nennt deinen ältesten Snapshot |
| "maple" matches 2 snapshots, use more of the ID | Mehr Zeichen der ID, etwa `maple-absurd` |
| can't read "..." as a snapshot ID or time | Anführungszeichen um Zeitangaben mit Leerzeichen, etwa `"3 days ago"` |

## frost kann sich nicht selbst aktualisieren

frost wurde von einem Paketmanager installiert, sein Ordner ist nicht beschreibbar, oder es wurde aus dem Quellcode gebaut. Siehe [frost aktualisieren](#updating).

## Das Installationsprogramm bricht ab

| Das Installationsprogramm meldet | Was du tust |
| --- | --- |
| need OpenSSH 8.1+ to verify the frost release signature | Installiere oder aktualisiere OpenSSH. Unter Windows ist es in Git for Windows enthalten |
| checksums.txt isn't signed by the frost release key. Don't install this. | Installiere es nicht. Versuch es später erneut und [melde es](#getting-help), wenn es wieder passiert |
| checksum mismatch | Der Download ist beschädigt. Führ das Installationsprogramm erneut aus |
| 32-bit ARM isn't supported by the bundled runtime | Für diesen Computer gibt es kein frost-Paket |
