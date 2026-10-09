# Backups verschieben

Deine Backups können in einen anderen Ordner, einen anderen Bucket oder zu einem anderen Anbieter umziehen, ohne dass alles erneut hochgeladen wird.

| Du willst | So geht's |
| --- | --- |
| Deine Backups in einen anderen Ordner oder Bucket verschieben | Verschieb den ganzen Repository-Ordner und verweise frost dann auf den neuen Ort. Nichts wird erneut hochgeladen |
| Woanders einen separaten Satz Backups beginnen | Starte `frost init` und wähle den neuen, leeren Ort. Deine alten Backups bleiben, wo sie sind, aber frost zeigt nur die neuen an |
| Zu Backups zurückkehren, von denen du weggezogen bist | Verweise frost wieder auf den alten Ort |

## Das Repository verschieben

Das Repository ist der Ordner in deinem Speicher, der `frost.repo`, `chunks/`, `snapshots/` und `trees/` enthält. Verschieb oder kopiere alle vier mit jedem Objekt darin und lass ihre Namen genau so, wie sie sind. Nur `frost.repo` zu verschieben verschiebt deine Backups nicht.

Sag frost danach, wo sie liegen. Für einen anderen Bucket:

```sh
frost config set storage.s3.bucket new-bucket
```

Für einen anderen Ordner im Bucket:

```sh
frost config set storage.s3.prefix backups/frost
```

Für einen Umzug zu einem anderen Anbieter, bei dem sich mehrere Einstellungen auf einmal ändern, starte `frost init` und wähle den neuen Anbieter. Die Einrichtung findet deine Backups und verbindet sich mit ihnen.

## Prüfungen vor dem Speichern

`frost config set` prüft einen neuen Speicherort, bevor es ihn speichert. Es lehnt einen Ort ohne Backups ab, einen mit Backups, die mit einem anderen Schlüssel erstellt wurden, und einen mit `frost.repo`, aber ohne Snapshots. `frost config edit` zeigt dieselben Probleme als Warnungen an und kann eine Änderung, die `set` ablehnt, deshalb trotzdem speichern.

## Wenn frost deine Backups nicht findet

Liegen deine Backups nicht dort, wo frost sie erwartet, sagen die Fehlermeldung und `frost status`, wo sie zuletzt geöffnet wurden, und bieten drei Auswege an:

```text
Your backups were last opened in s3://old-bucket/frost/.
Since then storage.s3.bucket changed from old-bucket to new-bucket.

Do one of these:
  put it back:       frost config set storage.s3.bucket old-bucket
  keep the change:   move the whole folder (frost.repo, chunks/, snapshots/ and trees/) to s3://new-bucket/frost/
  start over there:  frost init (your old backups stay where they are)
```
