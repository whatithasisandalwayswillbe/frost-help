# Réglages

Frost conserve ses réglages dans `config.toml`, dans son dossier de configuration. Vous pouvez les modifier avec `frost init`, `frost config set` ou `frost config edit`, ou dans n'importe quel éditeur de texte.

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
- Modifier un réglage `schedule` met à jour la tâche planifiée immédiatement. Sous macOS et Windows, un changement fait pendant une sauvegarde planifiée s'applique dès qu'elle se termine, pour ne pas l'interrompre.
- Si vous changez l'emplacement de votre stockage, Frost vérifie le nouvel emplacement avant de l'enregistrer. Voir [Déplacer vos sauvegardes](#moving-backups).

## Modifier le fichier

```sh
frost config edit
```

Frost ouvre une copie de `config.toml` dans l'éditeur que vous indiquez, ou dans `$VISUAL` ou `$EDITOR`, ou à défaut dans nano, vim ou vi. Sous Windows, c'est le Bloc-notes par défaut. Quand vous fermez l'éditeur, Frost liste ce que vous avez modifié et enregistre la copie dès que vous tapez `yes`.

Si le fichier ne peut pas être lu, Frost vous signale le problème et propose de le rouvrir : une faute de frappe ne peut donc pas casser vos sauvegardes planifiées. Les réglages inconnus comptent comme des erreurs, pour qu'un nom mal orthographié ne passe pas inaperçu.

## Le modifier vous-même

Vous pouvez aussi ouvrir `config.toml` dans n'importe quel éditeur de texte et l'enregistrer. Frost le lit à chaque exécution, donc la plupart des changements s'appliquent dès la suivante. Deux types de changement demandent une étape de plus, que Frost effectue la prochaine fois que vous lancez une commande Frost :

- Un planning modifié met à jour la tâche planifiée, et Frost l'indique par « config.toml changed. Scheduled job updated » (config.toml a changé, tâche planifiée mise à jour). Sous Linux, la sauvegarde planifiée suivante le fait aussi. Un changement fait pendant une sauvegarde planifiée attend qu'elle se termine, comme avec `frost config set`.
- Un nouvel emplacement de stockage passe les mêmes vérifications qu'avec `frost config edit`, la première fois que Frost l'utilise. Tout problème s'affiche sous forme d'avertissement.

Rien ne vérifie le fichier avant que vous l'enregistriez. S'il ne peut pas être lu, les commandes Frost le signalent jusqu'à ce que vous le corrigiez.

## Tous les réglages

| Clé | Par défaut | Signification |
| --- | --- | --- |
| `paths` | | Les dossiers à sauvegarder |
| `exclude` | `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules`, `.cache` | Les noms et motifs à exclure. Voir [Exclure des fichiers](#excluding-files) |
| `schedule.enabled` | `true` | Sauvegarder automatiquement |
| `schedule.every` | `daily` | `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily` ou `weekly` |
| `schedule.time` | `15:00` | L'heure des sauvegardes, au format 24 heures. Voir [Sauvegardes automatiques](#scheduling) |
| `schedule.day` | `sunday` | Le jour des sauvegardes hebdomadaires, de `sunday` à `saturday` |
| `schedule.catch_up` | `true` | Sauvegarde au retour de l'ordinateur après une sauvegarde manquée. `false` saute les sauvegardes manquées |
| `verify.sample` | `20` | Le nombre de blocs téléchargés par la vérification par échantillonnage. `0` la désactive |
| `update.auto` | `true` | Installer les nouvelles versions après les sauvegardes planifiées. `false` vous en informe seulement |
| `storage.backend` | | `permafrost`, `s3`, `sftp` pour [Serveur auto-hébergé](#self-hosted), ou `local` pour un [disque local](#local-drive) |
| `storage.sftp.host` | | L'adresse SSH de votre serveur, comme `me@nas.local`, ou un `Host` de votre configuration SSH |
| `storage.sftp.port` | `0` | Le port SSH du serveur. `0` utilise le port de votre configuration SSH, ou 22 |
| `storage.sftp.path` | `frost` | Le dossier sur le serveur. Un chemin relatif part de votre dossier personnel sur le serveur |
| `storage.local.path` | | Le chemin complet du dossier sur un disque |
| `storage.permafrost.url` | | Vide pour le serveur par défaut, `https://permafrost.wihiaawb.com`. Sinon une adresse `https://`, ou `http://` pour un serveur sur votre propre ordinateur |
| `storage.permafrost.token` | | Votre clé d'accès Permafrost |
| `storage.s3.endpoint` | | Par exemple `s3.us-east-1.amazonaws.com`. Une adresse `https://` complète fonctionne aussi, et une adresse `http://` désactive TLS |
| `storage.s3.region` | | Vide si votre serveur ou fournisseur n'utilise pas de région |
| `storage.s3.bucket` | | Le nom du bucket. Il doit déjà exister |
| `storage.s3.prefix` | `frost` | Le dossier du bucket qui contient vos sauvegardes. Vide pour la racine du bucket |
| `storage.s3.access_key_id` | | Votre identifiant de clé d'accès |
| `storage.s3.secret_access_key` | | Votre clé d'accès secrète |
| `storage.s3.insecure` | `false` | Utiliser le HTTP sans chiffrement quand l'endpoint n'indique pas de protocole. Pour les tests en local uniquement |

## Variables d'environnement

| Variable | Remplace |
| --- | --- |
| `FROST_S3_ACCESS_KEY_ID` ou `AWS_ACCESS_KEY_ID` | `storage.s3.access_key_id` |
| `FROST_S3_SECRET_ACCESS_KEY` ou `AWS_SECRET_ACCESS_KEY` | `storage.s3.secret_access_key` |
| `FROST_PERMAFROST_TOKEN` | `storage.permafrost.token` |
| `FROST_CONFIG_DIR` | Le dossier de configuration, comme `--config-dir` |
| `FROST_CACHE_DIR` | Le dossier de cache |

Frost n'écrit jamais dans `config.toml` les valeurs issues de l'environnement. Les sauvegardes planifiées ne voient pas les variables définies dans votre shell : elles ont donc toujours besoin des identifiants dans `config.toml`.
