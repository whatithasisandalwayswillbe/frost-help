# Eigener Server

Sichere in einen Ordner auf einem Computer, den du selbst betreibst, über SSH. Das kann ein Linux-Server sein, ein NAS, ein Raspberry Pi, ein VPS oder ein Mac oder Windows-Computer mit eingeschaltetem SSH-Server. frost nutzt den SSH-Client, den dein Computer schon hat, auf dem Server musst du also nichts installieren.

## Bevor du anfängst

- Auf dem Server müssen SSH und SFTP eingeschaltet sein. Die meisten Linux-Server haben beides. Bei einem NAS findest du sie in den Einstellungen für Terminal oder Dateidienste.
- Du brauchst ein Konto auf dem Server, das in den Ordner schreiben darf, den du nutzen willst. Ein eigenes Konto nur für Backups ist eine gute Idee.
- Unter Windows muss der OpenSSH-Client installiert sein. Meist ist er das. Falls nicht, füge ihn in den Einstellungen unter System > Optionale Features hinzu.

## In der Einrichtung

Starte `frost init` und wähle **Self-hosted**.

| Die Einrichtung fragt | Antwort |
| --- | --- |
| What is the server SSH address? | Ein Benutzer und Host, zum Beispiel `me@nas.local`, oder ein `Host` aus deiner SSH-Konfiguration. Häng `:2222` an, wenn der Server einen anderen Port nutzt |
| Which folder on the server? | Standardmäßig `frost`, also in deinem Home-Ordner dort. Ein vollständiger Pfad wie `/srv/backups/frost` geht auch |

Fehlt der letzte Teil des Ordners, legt die Einrichtung ihn an. Der Ordner, in dem er liegt, muss schon existieren.

## Der SSH-Schlüssel von frost

frost bringt einen eigenen SSH-Schlüssel mit, den die Einrichtung beim ersten Mal erstellt. Deine persönlichen Schlüssel und deinen SSH-Agenten braucht frost nicht. Es fragt nie nach einem Passwort, sodass geplante Backups sich jederzeit auf dieselbe Weise anmelden.

Der Server kennt den Schlüssel von frost noch nicht, deshalb fragt die Einrichtung beim ersten Mal, wie er auf den Server kommen soll:

- **Add it for me** (für mich hinzufügen) übergibt das Terminal an ssh. Beim ersten Verbinden mit einem Server zeigt ssh dessen Fingerabdruck und fragt, ob du ihm vertraust. Dann fragt es nach deinem Passwort auf dem Server, fügt den Schlüssel von frost hinzu, und die Einrichtung macht weiter. Dein Passwort geht nur an ssh. frost sieht und speichert es nie.
- **I'll add it myself** (selbst hinzufügen) zeigt, wo die Datei mit dem öffentlichen Schlüssel von frost liegt. Füge die Zeile aus dieser Datei auf dem Server zu `~/.ssh/authorized_keys` hinzu und drück dann `[enter]`.

| Computer | Öffentlicher Schlüssel von frost |
| --- | --- |
| macOS und Linux | `~/.config/frost/ssh/frost_ed25519.pub` |
| Windows | `%AppData%\frost\ssh\frost_ed25519.pub` |

Fügt die Einrichtung den Schlüssel für dich hinzu, beginnt seine Zeile mit `restrict`. Das deaktiviert Weiterleitungen und die Zuweisung eines Terminals, während frost weiterhin Dateien lesen und schreiben kann. Shell-Befehle bleiben möglich, sofern der Server das Konto nicht auf SFTP beschränkt.

### Den Schlüssel selbst hinzufügen

Unter macOS oder Linux fügt dieser Befehl den Schlüssel mit vorangestelltem `restrict` hinzu und fragt dabei nach deinem Passwort auf dem Server:

```sh
(printf 'restrict '; cat ~/.config/frost/ssh/frost_ed25519.pub) | ssh me@nas.local 'umask 077; mkdir -p .ssh; cat >> .ssh/authorized_keys'
```

Bei manchen NAS-Systemen kannst du einen SSH-Schlüssel auch in den Einstellungen deines Kontos einfügen.

Ein Windows-Server legt Schlüssel an anderen Orten ab, deshalb funktioniert **Add it for me** dort nicht. Füge die Zeile für ein normales Konto zu `C:\Users\<you>\.ssh\authorized_keys` hinzu, für ein Administratorkonto zu `C:\ProgramData\ssh\administrators_authorized_keys`.

## Ports und deine SSH-Konfiguration

frost liest deine SSH-Konfiguration `~/.ssh/config` genauso wie ssh. Ein `Host`-Eintrag kann Benutzer, Port und weitere Optionen festlegen. Du kannst seinen Namen als Adresse eingeben. frost bringt seinen eigenen Schlüssel mit, aber ausdrücklich angegebene `IdentityFile`-Einträge in deiner SSH-Konfiguration können ebenfalls angeboten werden.

## Gut zu wissen

- Das Dateisystem des Servers braucht Hardlinks. Mit ihnen stellt frost sicher, dass sich zwei Computer nie gegenseitig ihre Backup-Einträge überschreiben. ext4, Btrfs, XFS, ZFS, APFS und NTFS haben sie alle. Die Einrichtung prüft das beim Verbinden.
- Ändert sich der Host-Schlüssel des Servers, verweigert frost die Verbindung, genau wie ssh. Hast du den Server neu installiert, entferne seinen alten Schlüssel mit `ssh-keygen -R <host>` und starte dann `frost init` erneut.
- `frost status` zeigt, wie voll die Festplatte des Servers ist, und `frost backup` warnt, wenn sie fast voll ist.
- Liegt der Ordner auf einer Festplatte, die der Server einhängt, muss sie eingehängt sein, wenn Backups laufen. Fehlt der Ordner, schlägt das Backup fehl, statt woanders hinzuschreiben.
