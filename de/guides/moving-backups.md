# Backups verschieben

Deine Backups können in einen anderen Ordner, auf ein anderes Laufwerk, auf einen anderen Server, in einen anderen Bucket oder zu einem anderen Anbieter umziehen, ohne dass alles erneut hochgeladen wird.

Permafrost hat keinen Ordner, den du verschieben könntest. Deshalb können Backups auf diesem Weg weder zu Permafrost noch von dort umziehen. Um zu Permafrost oder davon weg zu wechseln, beginne mit `frost init` einen separaten Satz Backups.

| Du willst | So geht's |
| --- | --- |
| Deine Backups in einen anderen Ordner, auf ein anderes Laufwerk, auf einen anderen Server oder in einen anderen Bucket verschieben | Verschieb den ganzen Repository-Ordner und verweise frost dann auf den neuen Ort. Nichts wird erneut hochgeladen |
| Woanders einen separaten Satz Backups beginnen | Starte `frost init` und wähle den neuen, leeren Ort. Deine alten Backups bleiben, wo sie sind, aber frost zeigt nur die neuen an |
| Zu Backups zurückkehren, von denen du weggezogen bist | Verweise frost wieder auf den alten Ort |

## Das Repository verschieben

Das Repository ist der Ordner in deinem Speicher, der `frost.repo`, `chunks/`, `snapshots/` und `trees/` enthält. Verschieb oder kopiere alle vier mit jedem Objekt darin und lass ihre Namen genau so, wie sie sind. Nur `frost.repo` zu verschieben verschiebt deine Backups nicht.

Ein eigener Server, ein lokales Laufwerk und S3-Speicher enthalten alle dieselben Dateien, du kannst ein Repository also mit rsync, rclone oder einem Dateimanager zwischen ihnen kopieren. Dieser Befehl kopiert zum Beispiel Backups von einem Laufwerk auf einen Server:

```sh
rsync -a /Volumes/Backup/frost/ me@nas.local:frost/
```

Sag frost danach, wo sie liegen. Für einen anderen Ordner auf einem Laufwerk oder Server:

```sh
frost config set storage.local.path /Volumes/Backup2/frost
frost config set storage.sftp.path backups/frost
```

Für einen anderen Bucket:

```sh
frost config set storage.s3.bucket new-bucket
```

Für einen anderen Ordner im Bucket:

```sh
frost config set storage.s3.prefix backups/frost
```

Für einen Umzug zu einer anderen Art von Speicher oder einem anderen Anbieter, bei dem sich mehrere Einstellungen auf einmal ändern, starte `frost init` und wähle das Neue aus. Die Einrichtung findet deine Backups und verbindet sich mit ihnen.

## Prüfungen vor dem Speichern

`frost config set` prüft einen neuen Speicherort, bevor es ihn speichert. Es lehnt einen Ort ohne frost-Repository ab oder einen mit einem Repository, das mit einem anderen Schlüssel erstellt wurde. Enthält der alte Ort Snapshots desselben Repositorys, der neue aber nicht, lehnt es auch diese Änderung ab. `frost config edit` zeigt dieselben Probleme als Warnungen an und kann eine Änderung, die `set` ablehnt, deshalb trotzdem speichern. Änderst du den Ort, indem du `config.toml` selbst bearbeitest, zeigt frost diese Warnungen, wenn es ihn zum ersten Mal nutzt.

## Wenn frost deine Backups nicht findet

Liegen deine Backups nicht dort, wo frost sie erwartet, sagen die Fehlermeldung und `frost status`, wo sie zuletzt geöffnet wurden, und bieten drei Auswege an:

```text
Your backups were last opened in s3://old-bucket/frost/.
Since then storage.s3.bucket changed from old-bucket to new-bucket.

Do one of these:
  put it back:       frost config set storage.s3.bucket old-bucket
  keep the change:   move the entire repository folder (frost.repo, chunks/, snapshots/, and trees/) to s3://new-bucket/frost/
  start over there:  frost init (your old backups stay where they are)
```
