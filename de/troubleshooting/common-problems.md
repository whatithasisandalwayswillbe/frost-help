# Häufige Probleme

Diese Seite sammelt die Meldungen und Probleme, die am häufigsten auftreten. Jede Überschrift ist entweder das, was Frost meldet, oder das, was dir auffällt.

## „Frost isn't set up yet, run `frost init`“

Frost findet `config.toml` nicht. Starte `frost init`. Wenn du `--config-dir` oder `FROST_CONFIG_DIR` verwendest, prüf, ob sie auf den richtigen Ordner zeigen.

## „no key on this machine“

Die Schlüsseldatei fehlt. Ist auf diesem Computer schon ein Speicher eingerichtet, führ `frost key import` aus und tipp deine Wiederherstellungsphrase ein. Andernfalls starte `frost init`.

## „a backup or restore operation is already in progress“

Ein anderer Frost-Prozess nutzt gerade deine Backups, meistens ein geplantes Backup. Ist es eins, meldet Frost „a scheduled backup is already running“ und wann es gestartet ist. Warte, bis er fertig ist, und versuch es dann erneut. Die Sperrdatei von Frost zu löschen beendet den anderen Prozess nicht.

## „the local encryption key does not match“

In deinem Speicher liegen Backups, die mit einem anderen Schlüssel erstellt wurden. Führ `frost key verify` aus und tipp die Phrase ein, die du aufgeschrieben hast, um herauszufinden, um welchen Schlüssel es geht. Ist es der richtige, führ damit `frost key import` aus.

## Frost findet deine Backups nicht

Meldungen wie „has no Frost repository“ bedeuten, dass deine Backups nicht dort liegen, wo Frost sucht. Die Fehlermeldung sagt, wo sie zuletzt geöffnet wurden und wie du wieder zu ihnen kommst. Siehe [Backups verschieben](#moving-backups).

Sind deine Backups aus Permafrost verschwunden, obwohl dein Zugriffsschlüssel noch funktioniert, wurden sie höchstwahrscheinlich mit diesem Schlüssel gelöscht. Schreib sofort an care@getfro.st. Falls jemand anderes deinen Schlüssel haben könnte, hol dir unter [getfro.st/perma/recover](https://getfro.st/perma/recover) einen neuen.

## Die Einrichtung kann sich nicht verbinden

Die Einrichtung erklärt das Problem und bringt dich zu der Antwort zurück, die es am wahrscheinlichsten verursacht hat.

| Die Einrichtung meldet | Prüfe |
| --- | --- |
| Access key ID not recognized | Ob du die ganze Zugriffsschlüssel-ID kopiert hast |
| The secret key does not match the access key ID | Ob du den ganzen geheimen Schlüssel kopiert hast und ob er zu dieser ID gehört |
| No bucket found with that name | Den Namen des Buckets, oder leg den Bucket zuerst an |
| The provided key lacks necessary bucket permissions | Ob der Schlüssel im Bucket Objekte lesen, auflisten, schreiben und löschen darf |
| The bucket is located in a different region | Die Region oder den Endpunkt |
| Cannot resolve ... | Die Adresse und deine Internetverbindung |
| No response from that address | Adresse und Port |
| The server's TLS certificate is not valid for that address | Die Adresse, und ob das Zertifikat des Servers sie abdeckt |
| the storage host timed out | Deine Internetverbindung, dann versuch es erneut |
| cannot reach Permafrost | Deine Internetverbindung, dann versuch es erneut |
| Cannot locate the server | Die SSH-Adresse und dein Netzwerk |
| The server did not respond | Die SSH-Adresse und ob der Server eingeschaltet ist |
| That server does not support SFTP | Ob SFTP in den SSH- oder Dateidienst-Einstellungen des Servers eingeschaltet ist |
| server returned text before opening SFTP subsystem | Ob ein Anmeldeskript auf dem Server, etwa `.bashrc`, etwas ausgibt. Lass es nur in interaktiven Shells etwas ausgeben |
| There's no folder ... on ... | Den Pfad des Ordners. Der Ordner, in dem er liegt, muss existieren |
| The server denied write access to that folder | Die Berechtigungen des Ordners für das Konto, mit dem Frost sich anmeldet |
| ... not found. Connect the required drive and try again | Ob das Laufwerk angeschlossen ist und der Pfad stimmt |
| Unable to write to that folder | Die Berechtigungen des Ordners. Unter macOS siehe [macOS-Berechtigungen](#macos-permissions) |
| Symbolic links and directory junctions are not supported for backup folders | Nutze den echten Pfad des Ordners |
| That drive is read-only | Nutze ein Laufwerk, auf das du schreiben kannst |

## „This storage provider does not support conditional writes“

Dein Speicher unterstützt eine Funktion nicht, die Frost braucht, damit sich Computer nicht gegenseitig ihre Backup-Einträge überschreiben. Andere Schlüssel oder Einstellungen helfen nicht. Wähle einen anderen Speicher. Siehe [Speicher auswählen](#choosing-storage).

Ein eigener Server oder ein Laufwerk sagt es anders. Der Server „cannot create hard links“, oder der Ordner liegt „on an unsupported filesystem“. Nutze einen Ordner auf einem Dateisystem wie ext4, Btrfs, XFS, ZFS, APFS oder NTFS.

## „the server didn't accept Frost's SSH key“

Dein eigener Server hat den Schlüssel von Frost abgelehnt, zum Beispiel nachdem er aus `authorized_keys` entfernt wurde. Starte `frost init` und füge den Schlüssel erneut hinzu. Siehe [Eigener Server](#self-hosted).

## „the server's SSH host key has changed“

Frost verweigert die Verbindung, wenn sich die Identität des Servers ändert, genau wie ssh. Hast du den Server neu installiert oder hat er eine neue Adresse, entferne seinen alten Schlüssel mit `ssh-keygen -R <host>` und starte `frost init` erneut. Andernfalls finde heraus, warum sich der Schlüssel geändert hat, bevor du dich verbindest.

## „... not found. Connect the required drive and try again“

Deine Backups liegen auf einem Laufwerk, das nicht angeschlossen ist, oder der Pfad des Ordners hat sich geändert. Schließ das Laufwerk an. Hat Windows ihm einen anderen Buchstaben gegeben, siehe [Lokales Laufwerk](#local-drive).

## „the Permafrost access key was rejected“

Die Meldung nennt danach den Grund von Permafrost: Der Schlüssel ist falsch, ein neuerer hat ihn ersetzt, oder das Konto wurde geschlossen. Nimm deinen neuesten Schlüssel oder hol dir einen neuen. Siehe [Permafrost](#permafrost).

## „uploads are paused“

Permafrost nimmt für dein Konto gerade keine neuen Backups an. Die Meldung sagt, warum und bis wann, und Wiederherstellen klappt weiterhin. Siehe [Permafrost](#permafrost).

## Ein Backup kann einen Ordner nicht lesen

Unter macOS liegt das meist an einer Datenschutzberechtigung. Die Fehlermeldung sagt, was du erlauben musst. Siehe [macOS-Berechtigungen](#macos-permissions). Auf anderen Systemen prüf, ob dein Benutzer den Ordner lesen darf.

## Dateien, die als „couldn't be read“ aufgeführt sind

Frost hat diese Dateien übersprungen und den Rest gesichert. Häufige Ursachen sind Dateien, die du nicht lesen darfst, Dateien, die während des Backups gelöscht wurden, und unter macOS Dateien, die iCloud nur online vorhält.

## Dateien, die „continued changing while being read“

Ein Programm hat während des Backups in diese Dateien geschrieben, deshalb hat der Snapshot ihre vorherige Kopie behalten. Schließ das Programm und sichere erneut, oder lass das nächste Backup sie mitnehmen.

## Ein Ordner ist „not found“

Ein Ordner aus deiner Liste fehlte, also hat Frost den Rest gesichert. Schließ das Laufwerk wieder an, oder aktualisiere deine Liste mit `frost init`, falls der Ordner umgezogen ist.

## „config.toml changed, but updating the scheduled job failed“

Du hast `config.toml` bearbeitet, und Frost konnte den geplanten Auftrag nicht passend aktualisieren. Der Rest der Meldung nennt den Grund. Nennt sie eine Einstellung, korrigiere sie in `config.toml`. Frost versucht es bei jedem Befehl erneut, bis es klappt.

## „config.toml changed where backups go“

Du hast in `config.toml` geändert, wohin Backups gehen, und Frost hat beim ersten Gebrauch ein Problem mit dem neuen Ort gefunden. Der Rest der Meldung sagt, welches. Siehe [Backups verschieben](#moving-backups).

## „scheduled job is missing“

Der geplante Auftrag wurde gelöscht oder ausgeschaltet. Stell ihn mit `frost config set schedule.enabled true` wieder her.

## Geplante Backups laufen nicht

- Sieh dir die Zeile „next backup“ in `frost status` an.
- Prüf unter macOS den Schalter für Frost unter Systemeinstellungen > Allgemein > Anmeldeobjekte & Erweiterungen (System Settings > General > Login Items & Extensions). Er heißt dort Node.js Foundation.
- Unter Windows musst du für geplante Backups angemeldet sein, und sie laufen nicht im Akkubetrieb.
- Steht `schedule.catch_up` auf `false`, wird ein Backup übersprungen, das fällig war, während der Computer aus war oder schlief.
- Lies das Protokoll. Siehe [Automatische Backups](#scheduling).

## „verification failed“

Eine Stichprobenprüfung hat fehlende oder beschädigte Daten in deinem Speicher gefunden. Siehe [Backups prüfen](#checking-backups).

## „cannot restore alongside original files“

Der Ordner neben den Originalen lässt sich nicht nutzen, oft weil der Snapshot von einem anderen Computer stammt. Nimm stattdessen `--to <dir>`. Siehe [Dateien wiederherstellen](#restoring).

## „cannot overwrite original files“

Der Snapshot stammt von einer anderen Art Computer, oder der Pfad zu den Originalen führt über einen Link, dem Frost nicht vertraut. Nimm stattdessen `--beside` oder `--to <dir>`.

## Die Wiederherstellung meldet bei einer Datei „changed after it was checked“ oder „has more than one link“

Frost hat festgestellt, dass eine bereits geprüfte Datei geändert wurde oder dass eine noch nicht fertig wiederhergestellte Datei über einen Hardlink mit einem anderen Namen verknüpft ist. Schließe Programme, die den Wiederherstellungsordner ändern, und versuche es erneut. Hat eine noch nicht fertig wiederhergestellte Datei einen Hardlink, stelle stattdessen in einem neuen, leeren Ordner wieder her.

## Frost findet den gewünschten Snapshot nicht

| Frost meldet | Versuch es mit |
| --- | --- |
| no snapshot at or before ... | Einem späteren Zeitpunkt. Die Meldung nennt deinen ältesten Snapshot |
| "maple" matches 2 snapshots; provide additional ID characters | Mehr Zeichen der ID, etwa `maple-absurd` |
| cannot parse "..." as a snapshot ID or timestamp | Anführungszeichen um Zeitangaben mit Leerzeichen, etwa `"3 days ago"` |

## Frost kann sich nicht selbst aktualisieren

Der Ordner von Frost ist nicht beschreibbar, oder Frost wurde aus dem Quellcode gebaut. Siehe [Frost aktualisieren](#updating).

## Das Installationsprogramm bricht ab

| Das Installationsprogramm meldet | Was du tust |
| --- | --- |
| need OpenSSH 8.1+ to verify the Frost release signature | Installiere oder aktualisiere OpenSSH. Unter Windows nimm stattdessen das PowerShell-Installationsprogramm |
| checksums.txt signature does not match official Frost release key; installation aborted | Installiere es nicht. Versuch es später erneut und [melde es](#getting-help), wenn es wieder passiert |
| runtime inside ... lacks valid OpenJS Foundation signature; installation aborted | Installiere es nicht. Versuch es später erneut und [melde es](#getting-help), wenn es wieder passiert |
| checksum mismatch | Der Download ist beschädigt. Führ das Installationsprogramm erneut aus |
| 32-bit ARM isn't supported by the bundled runtime | Für diesen Computer gibt es kein Frost-Paket |
| installing Frost requires Node.js v22 or newer | Aktualisiere Node.js, oder nimm das Installationsprogramm statt npm oder pnpm |

## `frost` wird nach der Installation nicht gefunden

Öffne ein neues Terminal. Terminals, die während der Installation offen waren, sehen den neuen `PATH` nicht. Mit pnpm führst du einmal `pnpm setup` aus und öffnest dann ein neues Terminal.
