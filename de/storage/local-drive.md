# Lokales Laufwerk

Sichere in einen Ordner auf einem Laufwerk: einer externen USB-Festplatte, einer zweiten internen Festplatte oder einem Laufwerk in einem Dock. Alles wird genauso verschlüsselt wie bei jedem anderen Speicher, ein verlorenes Laufwerk verrät deine Dateien also nicht.

## In der Einrichtung

Starte `frost init`, wähle **Local drive** und gib den vollständigen Pfad eines Ordners auf einem angeschlossenen Laufwerk ein.

| System | Beispiel |
| --- | --- |
| macOS | `/Volumes/Backup/frost` |
| Linux | `/mnt/backup/frost` oder `/media/<you>/Backup/frost` |
| Windows | `E:\frost` |

Fehlt der letzte Ordner des Pfads, legt die Einrichtung ihn an. Der Ordner, in dem er liegt, meist das Laufwerk selbst, muss vorhanden sein.

## Wenn das Laufwerk nicht angeschlossen ist

Frost legt den Ordner nur während der Einrichtung an. Ist das Laufwerk nicht angeschlossen, wenn ein Backup läuft, fehlt der Ordner, und das Backup schlägt mit dem Hinweis fehl, das Laufwerk anzuschließen. Es schreibt deine Backups nie an das, was sonst unter diesem Pfad liegt. Ein geplantes Backup wartet vorher etwa 5 Minuten auf das Laufwerk, falls es gerade erst eingehängt wird.

Unter Windows kann ein Laufwerk beim erneuten Anschließen einen anderen Buchstaben bekommen. Gib ihm in der Datenträgerverwaltung seinen alten Buchstaben zurück, oder starte `frost init` und gib den neuen Pfad ein.

## Eine Kopie an einem anderen Ort

Ein Laufwerk neben deinem Computer kann zusammen mit ihm verloren gehen, gestohlen werden oder kaputtgehen. Bewahre von allem Unersetzlichen eine weitere Kopie an einem anderen Ort auf, etwa auf einem Laufwerk, das du außer Haus lagerst, oder auf einem [eigenen Server](#self-hosted) an einem anderen Ort. [Backups verschieben](#moving-backups) zeigt, wie du ein Repository kopierst.

## Netzwerkfreigaben

Für ein NAS ist [Eigener Server](#self-hosted) meist die bessere Wahl. Eine Netzwerkfreigabe, die auf deinem Computer eingehängt ist, funktioniert nur, wenn ihr Dateisystem Dateien sicher anlegen kann. Das prüft die Einrichtung beim Verbinden. Unter Windows nutzt du den Pfad `\\server\share` der Freigabe statt eines verbundenen Laufwerksbuchstabens, denn geplante Backups sehen verbundene Buchstaben möglicherweise nicht.

## Gut zu wissen

- Frost folgt im Ordner keinen Links oder Junctions. Unter Windows lehnt es außerdem einen Ordner ab, der über einen solchen erreicht wird. Nutze den echten Pfad des Ordners.
- Unter macOS brauchen geplante Backups die Erlaubnis, Wechseldatenträger und Netzlaufwerke zu nutzen. Siehe [macOS-Berechtigungen](#macos-permissions).
- `frost status` zeigt, wie voll das Laufwerk ist, und `frost backup` warnt, wenn es fast voll ist.
- Laufwerke mit NTFS, APFS, ext4, Btrfs oder XFS funktionieren. Laufwerke mit exFAT und FAT funktionieren, wenn sie den Test der Einrichtung bestehen.
