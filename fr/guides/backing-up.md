# Sauvegarder

`frost backup` sauvegarde vos dossiers immédiatement. Seul ce qui a changé depuis la dernière sauvegarde est envoyé.

## Lancer une sauvegarde

```sh
frost backup
```

Frost affiche ce qui a changé, la quantité envoyée et le résultat de sa vérification par échantillonnage :

```text
┌  backup  sftp://me@nas.local/~/frost
│
│  changes      3 added, 1 changed
│  files        1,204 (2.1 GB)
│  new data     14.2 MB in 9 chunks (9.8 MB uploaded after compression)
│  verified     ok, 21 random objects re-downloaded and checked
│
└  Saved snapshot maple-absurd-3f1c
```

Un fichier est considéré comme modifié quand son contenu, sa taille, ses permissions ou sa date de modification changent. Un simple changement de la date de modification d'un dossier ne compte pas, car les fichiers temporaires la modifient sans arrêt.

Si rien n'a changé, Frost n'enregistre pas de nouvel instantané :

```text
┌  backup  sftp://me@nas.local/~/frost
│
│  files        1,204 (2.1 GB)
│  verified     ok 3h ago, 21 objects checked
│
└  Already backed up. No changes detected since snapshot maple-absurd-3f1c, saved 3h ago.
```

Une sauvegarde se termine par un avertissement `storage` quand votre stockage demande votre attention, par exemple quand un compte Permafrost, le disque d'un serveur ou un disque local est presque plein.

Avec les sauvegardes automatiques activées, vous aurez rarement besoin de lancer cette commande vous-même. Voir [Sauvegardes automatiques](#scheduling).

## Prévisualiser une sauvegarde

```sh
frost backup --dry-run
```

Une simulation liste chaque fichier contenant des données nouvelles à envoyer, ainsi que le total, sans rien envoyer ni enregistrer d'instantané. `-n` est la forme courte de `--dry-run`.

## Options

| Option | Effet |
| --- | --- |
| `-n`, `--dry-run` | Montre ce qui serait envoyé, sans rien envoyer |
| `--path <dir>` | Sauvegarde ce dossier à la place de vos dossiers habituels. Répétez-la pour en ajouter d'autres |
| `--exclude <pattern>` | Exclut aussi ce motif, pour cette sauvegarde seulement. Répétez-la pour ajouter d'autres motifs |
| `--no-verify` | Saute la vérification par échantillonnage après la sauvegarde |

Pour changer les dossiers sauvegardés à chaque fois, relancez `frost init` ou consultez [Réglages](#settings).

## Ce qui est sauvegardé

Frost sauvegarde les fichiers ordinaires, les dossiers et les liens symboliques, avec leurs permissions et leurs dates de modification.

- Un lien symbolique est enregistré en tant que lien, pas comme le fichier vers lequel il pointe.
- Les fichiers liés par des liens physiques sont sauvegardés et restaurés comme des fichiers distincts.

Frost laisse de côté :

- Tout ce qui figure dans votre liste d'exclusions. Voir [Exclure des fichiers](#excluding-files).
- Les sockets, les périphériques et les tubes.
- Les propriétaires des fichiers, les ACL et les attributs étendus.
- Sous macOS, les fichiers qu'iCloud conserve uniquement en ligne. Frost ne les télécharge pas : il les ignore et les liste.
- Les fichiers `.frost-partial-...` laissés par une restauration interrompue.

## Quand quelque chose se passe mal

| Ce qui se passe | Ce que fait Frost |
| --- | --- |
| Un fichier ou un dossier est illisible, faute de permissions, parce qu'il a été supprimé en cours de sauvegarde ou parce qu'il n'existe que dans iCloud | Il l'ignore et le liste. L'instantané est tout de même enregistré, et `frost status` indique combien d'éléments ont été ignorés |
| Un dossier de votre liste est absent, par exemple sur un disque débranché | Il l'ignore et sauvegarde le reste. `frost backup` et `frost status` indiquent le dossier manquant |
| Aucun de vos dossiers n'est présent, ou l'un existe mais est totalement illisible | La sauvegarde entière échoue, pour qu'une sauvegarde n'ait jamais l'air réussie sans rien avoir enregistré |
| Un fichier change pendant que Frost le lit, comme une base de données en cours d'utilisation, le disque d'une machine virtuelle en marche ou un téléchargement | Il le relit à la fin de la sauvegarde. S'il change encore, l'instantané garde sa copie précédente et Frost le liste. Un fichier qui n'a jamais pu être sauvegardé intact est ignoré |

Frost ne prend pas d'instantanés du système de fichiers ni des bases de données. Pour sauvegarder un fichier toujours en cours d'utilisation, faites-le pendant que le programme qui l'utilise est fermé.

Sous macOS, certains dossiers exigent votre autorisation avant que Frost puisse les lire. Voir [Autorisations macOS](#macos-permissions).

## La vérification par échantillonnage

Après une sauvegarde qui enregistre un instantané, Frost télécharge quelques blocs au hasard, 20 par défaut, et les contrôle. Après une sauvegarde sans nouveauté, il ne recommence que si la dernière vérification date de plus d'un jour ou a trouvé un problème. Si une vérification échoue, la sauvegarde signale une erreur. Voir [Vérifier vos sauvegardes](#checking-backups).

## Sauvegardes interrompues

Si une sauvegarde s'arrête en cours de route, à cause d'une connexion perdue, d'un portable refermé ou de `Ctrl+C`, rien de ce qui a déjà été envoyé n'est perdu. Frost note les blocs au fur et à mesure de l'envoi, et la sauvegarde suivante les saute.

## Près d'une sauvegarde planifiée

Si une sauvegarde planifiée commence dans l'heure, ou s'est terminée dans l'heure précédente, `frost backup` vous le signale et demande avant de commencer :

```text
┌  backup  sftp://me@nas.local/~/frost
│
│  A scheduled backup starts in 40m, at 15:00.
│  Back up now anyway? [Y/n]
```

Appuyez sur Entrée pour sauvegarder quand même, ou tapez `n` pour arrêter. Pour les plannings de moins de 4 heures, la fenêtre correspond au quart de l'intervalle. Une sauvegarde terminée ne compte que si elle a réussi et que vous n'avez pas sauvegardé depuis. Frost ne pose la question que dans un terminal, et jamais pour une prévisualisation ni avec `--path` ou `--exclude`.

## Une à la fois

Une sauvegarde ou une restauration en ligne de commande verrouille son cache local pendant son exécution. Si une autre commande a besoin de ce cache, Frost affiche « a backup or restore operation is already in progress; try again when it completes » (une sauvegarde ou une restauration est déjà en cours, réessayez quand elle sera terminée). Si l'autre est une sauvegarde planifiée, Frost affiche « a scheduled backup is already running » (une sauvegarde planifiée est déjà en cours) et l'heure de son début. Une sauvegarde planifiée qui trouve le cache verrouillé attend à la place, jusqu'à une heure. Le navigateur d'instantanés libère le verrou du cache : il peut donc rester ouvert et restaurer des fichiers pendant une sauvegarde. Chaque dossier de cache et chaque ordinateur ont leur propre verrou.
