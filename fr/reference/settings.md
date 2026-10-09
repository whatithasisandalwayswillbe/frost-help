# Réglages

frost conserve ses réglages dans `config.toml`, dans son dossier de configuration. Vous pouvez les modifier avec `frost init`, `frost config set` ou `frost config edit`.

## Lire et modifier les réglages

| Commande | Effet |
| --- | --- |
| `frost config` | Affiche tous les réglages. Les identifiants sont masqués, sauf si vous ajoutez `--show-secrets` |
| `frost config get <key>` | Affiche un réglage. Les listes affichent un élément par ligne |
| `frost config set <key> <value...>` | Modifie un réglage et montre ce qui a changé |
| `frost config edit [editor]` | Ouvre `config.toml` dans un éditeur |

Par exemple :

```sh
frost config get schedule.every
frost config set schedule.every 6h
frost config set paths ~/Documents ~/Pictures
```

- Une liste prend une valeur par élément, et `set` remplace la liste entière.
- `true` et `false` activent et désactivent les réglages.
- Modifier `schedule.enabled` ou `schedule.every` met à jour la tâche planifiée immédiatement.
- Si vous changez l'emplacement de votre stockage, frost vérifie le nouvel emplacement avant de l'enregistrer. Voir [Déplacer vos sauvegardes](#moving-backups).

## Modifier le fichier

```sh
frost config edit
```

frost ouvre une copie de `config.toml` dans l'éditeur que vous indiquez, ou dans `$VISUAL` ou `$EDITOR`, ou à défaut dans nano, vim ou vi. Sous Windows, c'est le Bloc-notes par défaut. Quand vous fermez l'éditeur, frost liste ce que vous avez modifié et enregistre la copie dès que vous tapez `yes`.

Si le fichier ne peut pas être lu, frost vous dit pourquoi et propose de le rouvrir : une faute de frappe ne peut donc pas casser vos sauvegardes planifiées. Les réglages inconnus comptent comme des erreurs, pour qu'un nom mal orthographié ne passe pas inaperçu.

## Tous les réglages

| Clé | Par défaut | Signification |
| --- | --- | --- |
| `paths` | | Les dossiers à sauvegarder |
| `exclude` | `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules`, `.cache` | Les noms et motifs à exclure. Voir [Exclure des fichiers](#excluding-files) |
| `schedule.enabled` | `true` | Sauvegarder automatiquement |
| `schedule.every` | `daily` | `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily` ou `weekly` |
| `verify.sample` | `20` | Le nombre de blocs téléchargés par la vérification par échantillonnage. `0` la désactive |
| `update.auto` | `true` | Installer les nouvelles versions après les sauvegardes planifiées. `false` vous en informe seulement |
| `storage.backend` | | `permafrost` ou `s3` |
| `storage.permafrost.url` | | Vide pour le serveur par défaut. Sinon une adresse `https://`, ou `http://` pour un serveur sur votre propre ordinateur |
| `storage.permafrost.token` | | Votre clé d'accès Permafrost |
| `storage.s3.endpoint` | | Par exemple `s3.us-east-1.amazonaws.com`. Une adresse `https://` complète fonctionne aussi, et une adresse `http://` désactive TLS |
| `storage.s3.region` | | Vide si votre fournisseur n'utilise pas de région |
| `storage.s3.bucket` | | Le nom du bucket. Il doit déjà exister |
| `storage.s3.prefix` | `frost` | Le dossier du bucket qui contient vos sauvegardes. Vide pour la racine du bucket |
| `storage.s3.access_key_id` | | Votre identifiant de clé d'accès |
| `storage.s3.secret_access_key` | | Votre clé d'accès secrète |
| `storage.s3.insecure` | `false` | Utiliser le HTTP simple. Pour les tests en local uniquement |

## Variables d'environnement

| Variable | Remplace |
| --- | --- |
| `FROST_S3_ACCESS_KEY_ID` ou `AWS_ACCESS_KEY_ID` | `storage.s3.access_key_id` |
| `FROST_S3_SECRET_ACCESS_KEY` ou `AWS_SECRET_ACCESS_KEY` | `storage.s3.secret_access_key` |
| `FROST_PERMAFROST_TOKEN` | `storage.permafrost.token` |
| `FROST_CONFIG_DIR` | Le dossier de configuration, comme `--config-dir` |
| `FROST_CACHE_DIR` | Le dossier de cache |

frost n'écrit jamais dans `config.toml` les valeurs issues de l'environnement. Les sauvegardes planifiées ne voient pas les variables définies dans votre shell : elles ont donc toujours besoin des identifiants dans `config.toml`.
