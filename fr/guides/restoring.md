# Restaurer des fichiers

Récupérez des fichiers depuis n'importe quel instantané, dans un nouveau dossier ou par-dessus les originaux.

Le plus simple est d'utiliser le navigateur d'instantanés. Lancez `frost browse`, trouvez ce qu'il vous faut, sélectionnez-le avec `[space]` et appuyez sur `[r]`. Voir [Le navigateur d'instantanés](#snapshot-browser). Cette page explique comment restaurer en ligne de commande.

## La commande restore

```sh
frost restore <snapshot> [paths...] --beside | --to <dir> | --overwrite
```

- **Instantané** : l'instantané à partir duquel restaurer. Voir « Choisir un instantané » plus bas.
- **Chemins** : les fichiers ou dossiers à restaurer, chacun avec tout ce qu'il contient. Sans chemin, tout l'instantané est restauré.
- **Destination** : exactement une option parmi `--beside`, `--to` et `--overwrite`.

Par exemple :

```sh
frost restore latest ~/Documents/taxes --beside
frost restore yesterday ~/notes.txt --to ~/Desktop
frost restore maple-absurd-3f1c --overwrite
```

`frost restore` sans rien d'autre ouvre le navigateur d'instantanés.

## Choisir un instantané

| Vous tapez | Vous obtenez |
| --- | --- |
| `latest` | L'instantané le plus récent |
| `maple-absurd-3f1c`, ou simplement `maple` | L'instantané portant cet identifiant, ou le seul dont l'identifiant commence par ce que vous avez tapé |
| `3 days ago`, `12h`, `2w`, `1 month ago` | L'instantané le plus récent à ce moment-là ou avant |
| `yesterday`, `today` | L'instantané le plus récent à la fin de ce jour-là |
| `2026-09-20`, `2026-09-20 14:30` | L'instantané le plus récent ce jour-là ou à cette minute, ou avant, à votre heure locale |

Les durées relatives s'écrivent en anglais et acceptent les minutes (`m`), heures (`h`), jours (`d`), semaines (`w`), mois (`mo`) et années (`y`), ou les mots en toutes lettres. Mettez entre guillemets ce qui contient une espace, comme `"3 days ago"`.

`frost status` liste vos instantanés et leurs identifiants. Si ce que vous tapez correspond à plusieurs identifiants, frost vous demande d'en taper davantage.

## Où vont les fichiers

| Option | Restaure dans |
| --- | --- |
| `--beside` | Un nouveau dossier `frost-restore-<id>` à côté des originaux |
| `--to <dir>` | Un nouveau dossier `frost-restore-<id>` dans `<dir>`, qui doit déjà exister |
| `--overwrite` | Les emplacements d'origine, en remplaçant ce qui s'y trouve. frost demande d'abord confirmation, et `-y` saute la question |

Un nouveau dossier n'écrase jamais rien. À l'intérieur, ce que vous restaurez garde son nom et s'organise à partir du dossier que partage votre sélection :

| Vous restaurez | `--beside` donne |
| --- | --- |
| `~/Documents/taxes` | `~/Documents/frost-restore-<id>/taxes/...` |
| `~/notes.txt` | `~/frost-restore-<id>/notes.txt` |
| `~/Documents/a` et `~/Pictures/b` | `~/frost-restore-<id>/Documents/a` et `~/frost-restore-<id>/Pictures/b` |

Le nom du nouveau dossier utilise l'identifiant court de l'instantané. S'il est déjà pris, frost ajoute `-1`, `-2` et ainsi de suite.

`--beside` ne fonctionne pas quand votre sélection ne partage que la racine d'un disque, quand son dossier n'existe pas sur cet ordinateur (comme avec un instantané venant d'un autre ordinateur), ou quand vous ne pouvez pas y écrire. Par exemple, restaurer à côté de l'original un instantané de tout votre dossier personnel reviendrait à créer un dossier dans `/Users` ou `/home`. Dans ces cas-là, utilisez `--to`.

## Restaurer par-dessus les originaux

`--overwrite` remet les fichiers à leur place d'origine et remplace ce qui s'y trouve. frost vous montre ce qu'il va faire et demande d'abord :

```text
┌  restore maple-absurd-3f1c  2026-10-07 03:17 (1d ago)
│
│  paths        /home/you/Documents/taxes
▲  into         original locations (existing files will be replaced)
│
│  Go ahead? [y/N]
```

- Les fichiers déjà identiques à l'instantané sont vérifiés puis sautés : ils ne sont pas retéléchargés.
- Les fichiers absents de l'instantané ne sont pas touchés.
- Chaque fichier est d'abord écrit dans un fichier temporaire caché à côté de lui, puis mis à sa place. Il vous faut assez d'espace pour les deux copies du fichier en cours de restauration.
- L'instantané doit venir du même type d'ordinateur : instantanés macOS et Linux sur macOS ou Linux, instantanés Windows sur Windows.
- frost refuse de restaurer à travers un lien de dossier qu'un autre utilisateur aurait pu modifier. Si c'est le cas, il le dit avant de poser la question, et le navigateur grise « Overwrite original files ».

## Contrôles de sécurité

Chaque bloc est déchiffré et comparé à son identifiant avant d'être écrit. Chaque fichier ne prend son vrai nom qu'une fois complet : une restauration qui échoue ne laisse donc jamais un fichier à moitié écrit à la place d'un vrai.

Les liens symboliques restaurés gardent leurs cibles d'origine, qui peuvent pointer hors du dossier de restauration.

## Restaurations interrompues

Si une restauration s'arrête, à cause d'une connexion perdue, de `Ctrl+C` ou de la mise en veille de l'ordinateur, frost affiche la commande qui la reprend :

```text
What's restored so far was kept. To carry on from there, run:

  frost restore maple-absurd-3f1c9a0b2e7 /home/you/Documents/taxes --beside
```

C'est la même restauration, avec l'identifiant complet de l'instantané à la place de `latest` ou d'une date : une sauvegarde faite entre-temps ne change donc pas l'instantané visé. Les fichiers déjà restaurés sont vérifiés puis sautés, et le fichier que frost était en train d'écrire reprend à partir de son dernier bloc correct.

Tant que la restauration n'est pas terminée, son dossier contient un marqueur `.frost-restore` et un fichier `.frost-partial-...`. Laissez-les en place ; frost les supprime à la fin.

Pour restaurer après avoir perdu votre ordinateur, voir [Récupérer sur un nouvel ordinateur](#new-computer).
