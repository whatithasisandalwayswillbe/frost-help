# Erste Schritte

frost sichert deine Ordner in einem Speicher deiner Wahl und verschlüsselt alles auf deinem Computer, bevor es hochgeladen wird. Diese Seite führt dich von der Installation bis zu deinem ersten Backup.

## Was du brauchst

- Einen Mac, Linux- oder Windows-Computer mit einem 64-Bit-Prozessor von Intel, AMD oder ARM.
- Einen Ort für deine Backups: einen [Permafrost](#permafrost)-Zugriffsschlüssel oder einen Bucket bei einem [S3-kompatiblen Anbieter](#choosing-storage).
- Ein Terminalfenster mit mindestens 56 Spalten und 18 Zeilen für die Einrichtung im Vollbild.

Node.js oder sonst etwas musst du vorher nicht installieren. frost bringt seine eigene Laufzeitumgebung mit.

## 1. frost installieren

Führe unter macOS oder Linux diesen Befehl in einem Terminal aus. Unter Windows führst du ihn in Git Bash aus.

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | sh
```

Das Installationsprogramm prüft die Signatur der Version, bevor es irgendetwas installiert. [frost installieren](#installing) erklärt die manuelle Installation und die Optionen des Installationsprogramms.

## 2. Einrichten

```sh
frost init
```

Die Einrichtung fragt auf jedem Bildschirm genau eine Sache ab:

1. **Speicher.** Wo deine Backups liegen. Wähle Permafrost oder einen S3-kompatiblen Anbieter und füge die angeforderten Schlüssel ein.
2. **Ordner.** Die Ordner, die gesichert werden, zum Beispiel `~/Documents`.
3. **Ausschlüsse.** Dateien und Ordner, die nicht gesichert werden. Ein paar übliche wie `node_modules` sind schon eingetragen.
4. **Zeitplan.** Wie oft frost von selbst sichert, oder gar nicht.
5. **Wiederherstellungsphrase.** 24 Wörter, mit denen du deine Backups entsperrst. Schreib sie auf.
6. **Übersicht.** Prüfe alles und drück dann `[s]` zum Speichern.

> Deine Wiederherstellungsphrase ist die einzige Möglichkeit, deine Backups zu lesen, wenn dieser Computer verloren geht. Niemand kann sie für dich wiederherstellen, weder dein Speicheranbieter noch die Entwickler von frost.

[frost einrichten](#setting-up) erklärt jeden Bildschirm.

## 3. Backup erstellen

Sieh dir zuerst an, was das erste Backup hochladen wird:

```sh
frost backup --dry-run
```

Dann starte es:

```sh
frost backup
```

Das erste Backup lädt alles hoch. Spätere Backups laden nur hoch, was sich geändert hat. Wenn du den Zeitplan eingeschaltet hast, sichert frost ab jetzt von selbst, und du musst nichts mehr ausführen.

## 4. Den Stand prüfen

```sh
frost status
```

`status` zeigt das letzte Backup, wann das nächste läuft, das Ergebnis der letzten Prüfung und deine neuesten Snapshots.

## Dateien zurückholen

Öffne den Snapshot-Browser, such dir heraus, was du brauchst, wähle es mit `[space]` aus und drück `[r]`:

```sh
frost browse
```

Oder stell die Datei über die Kommandozeile wieder her. Dieser Befehl legt eine Kopie der Datei in einem neuen Ordner neben dem Original ab:

```sh
frost restore latest ~/Documents/report.pdf --beside
```

[Dateien wiederherstellen](#restoring) erklärt beide Wege.

## Wie es weitergeht

- [So funktioniert frost](#how-it-works) erklärt Snapshots, die Verschlüsselung und was hochgeladen wird.
- [Automatische Backups](#scheduling) behandelt den Zeitplan.
- [Deine Wiederherstellungsphrase](#recovery-phrase) erklärt, wie du deinen Schlüssel sicher aufbewahrst.
