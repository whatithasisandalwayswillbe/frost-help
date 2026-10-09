# Commandes

frost a huit commandes. `frost -h` les liste toutes, avec chaque option.

## Options globales

Elles fonctionnent avec toutes les commandes :

| Option | Effet |
| --- | --- |
| `--config-dir <dir>` | Utilise un autre dossier de configuration |
| `-h`, `--help` | Affiche l'aide, avec toutes les commandes et options |
| `-v`, `--version` | Affiche la version de frost. À placer avant toute commande |

## frost init

Configure frost : quoi sauvegarder, où et à quelle fréquence. Relancez-le pour revoir ou modifier vos réglages. Voir [Configurer frost](#setting-up).

```sh
frost init
```

## frost backup

Sauvegarde immédiatement. Voir [Sauvegarder](#backing-up).

```sh
frost backup [--dry-run] [--path <dir>] [--exclude <pattern>] [--no-verify]
```

| Option | Effet |
| --- | --- |
| `-n`, `--dry-run` | Montre ce qui serait envoyé, sans rien envoyer |
| `--path <dir>` | Sauvegarde ce dossier à la place de vos dossiers habituels. Répétable |
| `--exclude <pattern>` | Exclut aussi les fichiers correspondant à ce motif. Répétable |
| `--no-verify` | Saute la vérification par échantillonnage après la sauvegarde |

## frost restore

Récupère des fichiers depuis un instantané. Sans rien d'autre, ouvre le navigateur d'instantanés. Voir [Restaurer des fichiers](#restoring).

```sh
frost restore [snapshot] [paths...] --beside | --to <dir> | --overwrite
```

| Option | Effet |
| --- | --- |
| `--beside` | Restaure dans un nouveau dossier à côté des originaux |
| `--to <dir>` | Restaure dans un nouveau dossier à l'intérieur de ce dossier |
| `--overwrite` | Restaure par-dessus les originaux, en remplaçant ce qui s'y trouve. Demande d'abord confirmation |
| `-y`, `--yes` | Ne demande pas confirmation avant d'écraser |

## frost status

Affiche les instantanés récents, la planification et l'état de vos sauvegardes. Voir [Vérifier vos sauvegardes](#checking-backups).

```sh
frost status [--verify] [--all]
```

| Option | Effet |
| --- | --- |
| `--verify` | Lance d'abord une nouvelle vérification |
| `-a`, `--all` | Liste tous les instantanés, pas seulement les 10 derniers |

## frost browse

Ouvre le navigateur d'instantanés. Voir [Le navigateur d'instantanés](#snapshot-browser).

```sh
frost browse
```

## frost config

Lit ou modifie les réglages sans repasser par l'assistant. Voir [Réglages](#settings).

```sh
frost config [--show-secrets]
frost config get <key> [--show-secrets]
frost config set <key> <value...>
frost config edit [editor]
```

| Option | Effet |
| --- | --- |
| `--show-secrets` | Affiche les identifiants en entier au lieu de les masquer |

## frost key

Affiche, vérifie ou importe votre phrase de récupération. Voir [Votre phrase de récupération](#recovery-phrase).

```sh
frost key show
frost key verify
frost key import
```

## frost update

Met frost à jour vers la dernière version. Voir [Mettre à jour frost](#updating).

```sh
frost update [--check]
```

| Option | Effet |
| --- | --- |
| `--check` | Indique seulement s'il existe une version plus récente |

## Codes de sortie

frost se termine avec `0` quand une commande réussit, et avec `1` en cas d'erreur. Cela inclut une sauvegarde ou un `frost status --verify` dont la vérification trouve un problème : les scripts peuvent donc tester le résultat.

```sh
frost status --verify || echo "frost check failed" >&2
```
