# Déplacer vos sauvegardes

Vos sauvegardes peuvent passer dans un autre dossier, sur un autre disque ou un autre serveur, dans un autre bucket ou chez un autre fournisseur sans que tout soit renvoyé.

Permafrost n'a pas de dossier à déplacer, donc vos sauvegardes ne peuvent pas entrer dans Permafrost ni en sortir de cette façon. Pour passer à Permafrost ou le quitter, démarrez un ensemble de sauvegardes séparé avec `frost init`.

| Vous voulez | Faites ceci |
| --- | --- |
| Déplacer vos sauvegardes vers un autre dossier, disque, serveur ou bucket | Déplacez tout le dossier du dépôt, puis indiquez à Frost le nouvel emplacement. Rien n'est renvoyé |
| Démarrer un ensemble de sauvegardes séparé ailleurs | Lancez `frost init` et choisissez le nouvel emplacement vide. Vos anciennes sauvegardes restent où elles sont, mais Frost n'affiche plus que les nouvelles |
| Réutiliser les sauvegardes d'un ancien emplacement | Indiquez de nouveau l'ancien emplacement à Frost |

## Déplacer le dépôt

Le dépôt est le dossier de votre stockage qui contient `frost.repo`, `chunks/`, `snapshots/` et `trees/`. Déplacez ou copiez les quatre, avec tous les objets qu'ils contiennent, et gardez leurs noms exactement tels quels. Déplacer seulement `frost.repo` ne déplace pas vos sauvegardes.

Un serveur auto-hébergé, un disque local et un stockage S3 contiennent tous les mêmes fichiers, donc vous pouvez copier un dépôt de l'un à l'autre avec rsync, rclone ou un gestionnaire de fichiers. Par exemple, cette commande copie des sauvegardes d'un disque vers un serveur :

```sh
rsync -a /Volumes/Backup/frost/ me@nas.local:frost/
```

Indiquez ensuite à Frost où elles se trouvent. Pour un autre dossier sur un disque ou un serveur :

```sh
frost config set storage.local.path /Volumes/Backup2/frost
frost config set storage.sftp.path backups/frost
```

Pour un autre bucket :

```sh
frost config set storage.s3.bucket new-bucket
```

Pour un autre dossier dans le bucket :

```sh
frost config set storage.s3.prefix backups/frost
```

Pour passer à un autre type de stockage ou chez un autre fournisseur, ce qui implique de changer plusieurs réglages à la fois, lancez `frost init` et choisissez la nouvelle destination. L'assistant trouve vos sauvegardes et s'y connecte.

## Contrôles avant l'enregistrement

`frost config set` vérifie un nouvel emplacement de stockage avant de l'enregistrer. Il refuse un emplacement sans dépôt Frost ou avec un dépôt créé avec une autre clé. Si l'ancien emplacement contient des instantanés du même dépôt mais que le nouveau n'en contient pas, il refuse aussi ce changement. `frost config edit` présente ces mêmes problèmes sous forme d'avertissements : il peut donc encore enregistrer un changement que `set` refuse. Si vous changez l'emplacement en modifiant vous-même `config.toml`, Frost affiche ces avertissements la première fois qu'il l'utilise.

## Si Frost ne trouve pas vos sauvegardes

Quand vos sauvegardes ne sont pas là où Frost les attend, l'erreur et `frost status` indiquent où elles ont été ouvertes pour la dernière fois et proposent trois solutions :

```text
Your backups were last opened in s3://old-bucket/frost/.
Since then storage.s3.bucket changed from old-bucket to new-bucket.

Do one of these:
  put it back:       frost config set storage.s3.bucket old-bucket
  keep the change:   move the entire repository folder (frost.repo, chunks/, snapshots/, and trees/) to s3://new-bucket/frost/
  start over there:  frost init (your old backups stay where they are)
```
