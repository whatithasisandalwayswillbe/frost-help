# Problèmes courants

Cette page rassemble les messages et problèmes les plus fréquents. Chaque titre reprend ce qu'affiche frost, ou ce que vous constatez.

## « frost isn't set up yet, run `frost init` »

frost ne trouve pas `config.toml`. Lancez `frost init`. Si vous utilisez `--config-dir` ou `FROST_CONFIG_DIR`, vérifiez qu'ils pointent vers le bon dossier.

## « no key on this machine »

Le fichier de clé est absent. Si cet ordinateur a déjà un stockage configuré, lancez `frost key import` et tapez votre phrase de récupération. Sinon, lancez `frost init`.

## « a backup or restore is already running »

Un autre processus frost utilise vos sauvegardes, en général une sauvegarde planifiée. Dans ce cas, frost affiche « a scheduled backup is already running » et l'heure de son début. Attendez qu'il se termine et réessayez. Supprimer le fichier de verrou de frost n'arrête pas l'autre processus.

## « the key on this machine doesn't match »

Votre stockage contient des sauvegardes faites avec une autre clé. Lancez `frost key verify` et tapez la phrase que vous avez notée pour savoir de quelle clé il s'agit. Si c'est la bonne, lancez `frost key import` avec elle.

## frost ne trouve pas vos sauvegardes

Des messages comme « has no frost repository » signifient que vos sauvegardes ne sont pas là où frost les cherche. L'erreur indique où elles ont été ouvertes pour la dernière fois et comment y revenir. Voir [Déplacer vos sauvegardes](#moving-backups).

Si vos sauvegardes ont disparu de Permafrost alors que votre clé d'accès fonctionne toujours, elles ont très probablement été supprimées avec cette clé. Écrivez sans attendre à care@getfro.st. Si quelqu'un d'autre pourrait avoir votre clé, obtenez-en une nouvelle sur [getfro.st/perma/recover](https://getfro.st/perma/recover).

## L'assistant n'arrive pas à se connecter

L'assistant explique le problème et vous ramène à la réponse la plus probablement en cause.

| L'assistant affiche | À vérifier |
| --- | --- |
| That access key ID wasn't recognised | Que vous avez copié l'identifiant de clé d'accès en entier |
| The secret key doesn't match the access key ID | Que vous avez copié la clé secrète en entier, et qu'elle correspond à cet identifiant |
| There's no bucket with that name | Le nom du bucket, ou créez d'abord le bucket |
| That key doesn't have the bucket permissions frost needs | Que la clé peut lire, lister, écrire et supprimer des objets dans le bucket |
| The bucket is in a different region | La région ou l'endpoint |
| Can't find ... | L'adresse et votre connexion internet |
| Nothing answered at that address | L'adresse et le port |
| The server's certificate isn't valid for that address | L'adresse, et que le certificat du serveur la couvre |
| the storage didn't answer in time | Votre connexion internet, puis réessayez |
| can't reach Permafrost | Votre connexion internet, puis réessayez |

## « This storage doesn't support conditional writes »

Votre fournisseur ne prend pas en charge une fonction dont frost a besoin pour empêcher les ordinateurs d'écraser leurs registres de sauvegarde respectifs. D'autres clés ou d'autres réglages n'y changeront rien. Choisissez un autre fournisseur. Voir [Choisir un stockage](#choosing-storage).

## « the Permafrost access key was rejected »

Le message donne ensuite la raison de Permafrost : la clé est erronée, une clé plus récente l'a remplacée, ou le compte a été fermé. Utilisez votre clé la plus récente, ou obtenez-en une nouvelle. Voir [Permafrost](#permafrost).

## « uploads are paused »

Permafrost n'accepte pas de nouvelles sauvegardes pour votre compte en ce moment. Le message indique pourquoi et jusqu'à quand, et les restaurations continuent de fonctionner. Voir [Permafrost](#permafrost).

## Une sauvegarde ne peut pas lire un dossier

Sous macOS, c'est en général une autorisation de confidentialité. L'erreur indique quoi autoriser. Voir [Autorisations macOS](#macos-permissions). Sur les autres systèmes, vérifiez que votre utilisateur peut lire le dossier.

## Des fichiers marqués « couldn't be read »

frost a ignoré ces fichiers et enregistré le reste. Les causes courantes sont des fichiers que vous n'avez pas le droit de lire, des fichiers supprimés pendant la sauvegarde et, sous macOS, des fichiers qu'iCloud conserve uniquement en ligne.

## Des fichiers qui « kept changing while they were read »

Un programme écrivait dans ces fichiers pendant la sauvegarde : l'instantané a donc gardé leur copie précédente. Fermez le programme et relancez la sauvegarde, ou laissez la suivante s'en charger.

## Un dossier marqué « not found »

Un dossier de votre liste était absent, alors frost a sauvegardé le reste. Rebranchez le disque ou, si le dossier a été déplacé, mettez à jour votre liste avec `frost init`.

## « config.toml changed, but updating the scheduled job failed »

Vous avez modifié `config.toml`, et frost n'a pas pu mettre à jour la tâche planifiée en conséquence. La suite du message explique pourquoi. S'il cite un réglage, corrigez-le dans `config.toml`. frost réessaie à chaque commande jusqu'à ce que cela fonctionne.

## « config.toml changed where backups go »

Vous avez changé dans `config.toml` l'endroit où vont les sauvegardes, et frost a trouvé un problème avec le nouvel emplacement la première fois qu'il l'a utilisé. La suite du message dit lequel. Voir [Déplacer vos sauvegardes](#moving-backups).

## « scheduled job is missing »

La tâche planifiée a été supprimée ou désactivée. Remettez-la en place avec `frost config set schedule.enabled true`.

## Les sauvegardes planifiées ne se lancent pas

- Regardez la ligne « next backup » de `frost status`.
- Sous macOS, vérifiez l'interrupteur de frost dans Réglages Système > Général > Ouverture et extensions (System Settings > General > Login Items & Extensions). Il apparaît sous le nom Node.js Foundation.
- Sous Windows, les sauvegardes planifiées exigent une session ouverte et ne se lancent pas sur batterie.
- Avec `schedule.catch_up` à `false`, une sauvegarde prévue pendant que l'ordinateur était éteint ou en veille est sautée.
- Consultez le journal. Voir [Sauvegardes automatiques](#scheduling).

## « verification failed »

Une vérification par échantillonnage a trouvé des données manquantes ou abîmées dans votre stockage. Voir [Vérifier vos sauvegardes](#checking-backups).

## « can't restore beside the originals »

Le dossier à côté des originaux n'est pas utilisable, souvent parce que l'instantané vient d'un autre ordinateur. Utilisez plutôt `--to <dir>`. Voir [Restaurer des fichiers](#restoring).

## « can't overwrite the originals »

L'instantané vient d'un autre type d'ordinateur, ou le chemin vers les originaux passe par un lien auquel frost ne fait pas confiance. Utilisez plutôt `--beside` ou `--to <dir>`.

## La restauration signale qu’un fichier « changed after it was checked » ou « has more than one link »

frost a constaté qu’un fichier déjà vérifié avait changé, ou qu’un fichier dont la restauration n’est pas terminée possède un lien physique vers un autre nom. Fermez les programmes qui modifient le dossier de restauration, puis réessayez. Si un fichier dont la restauration n’est pas terminée possède un lien physique, restaurez plutôt dans un nouveau dossier vide.

## frost ne trouve pas l'instantané demandé

| frost affiche | Essayez |
| --- | --- |
| no snapshot at or before ... | Une date plus tardive. Le message indique votre instantané le plus ancien |
| "maple" matches 2 snapshots, use more of the ID | Une plus grande partie de l'identifiant, comme `maple-absurd` |
| can't read "..." as a snapshot ID or time | Des guillemets autour des dates qui contiennent des espaces, comme `"3 days ago"` |

## frost ne peut pas se mettre à jour

Le dossier de frost n'est pas accessible en écriture, ou frost a été compilé à partir des sources. Voir [Mettre à jour frost](#updating).

## L'installateur s'arrête

| L'installateur affiche | Que faire |
| --- | --- |
| need OpenSSH 8.1+ to verify the frost release signature | Installez ou mettez à jour OpenSSH. Sous Windows, utilisez plutôt l'installateur PowerShell |
| checksums.txt isn't signed by the frost release key. Don't install this. | Ne l'installez pas. Réessayez plus tard, et [signalez-le](#getting-help) si le problème persiste |
| the runtime in ... isn't signed by the OpenJS Foundation. Don't install this. | Ne l'installez pas. Réessayez plus tard, et [signalez-le](#getting-help) si le problème persiste |
| checksum mismatch | Le téléchargement est abîmé. Relancez l'installateur |
| 32-bit ARM isn't supported by the bundled runtime | Il n'existe pas de paquet frost pour cet ordinateur |
| installing frost needs Node.js 22 or newer | Mettez à jour Node.js, ou utilisez l'installateur au lieu de npm ou pnpm |

## `frost` est introuvable après l'installation

Ouvrez un nouveau terminal. Les terminaux ouverts pendant l'installation de frost ne voient pas le nouveau `PATH`. Avec pnpm, lancez une fois `pnpm setup`, puis ouvrez un nouveau terminal.
