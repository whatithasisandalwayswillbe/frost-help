# Fichiers et dossiers

frost range l'application, vos réglages et son cache dans des dossiers distincts de votre ordinateur.

## L'application

| Système | Dossier de l'application |
| --- | --- |
| macOS | `~/Library/Application Support/frost/app` |
| Linux | `~/.local/share/frost/app`, ou `$XDG_DATA_HOME/frost/app` |
| Windows | `%LocalAppData%\frost\app` |

Le dossier de l'application contient l'environnement d'exécution fourni et chaque version installée. Gardez-le intact.

Le lanceur `frost` se trouve dans `/usr/local/bin` ou `~/.local/bin` sous macOS et Linux, et dans `~/bin` sous Windows, sauf si vous avez choisi un autre dossier à l'installation. Voir [Installer frost](#installing).

## Réglages et clé

| Fichier | macOS et Linux | Windows |
| --- | --- | --- |
| Réglages | `~/.config/frost/config.toml` | `%AppData%\frost\config.toml` |
| Clé | `~/.config/frost/key` | `%AppData%\frost\key` |

## Cache

| Fichier | macOS et Linux | Windows |
| --- | --- | --- |
| Registre de ce qui a été envoyé | `~/.cache/frost/manifest-<repo>.jsonl` | `%LocalAppData%\frost\manifest-<repo>.jsonl` |
| Dernier emplacement où vos sauvegardes ont été ouvertes | `~/.cache/frost/storage-<config>.json` | `%LocalAppData%\frost\storage-<config>.json` |
| Dernière recherche de mise à jour | `~/.cache/frost/update.json` | `%LocalAppData%\frost\update.json` |
| Journal des sauvegardes planifiées | `~/.cache/frost/frost.log` | `%LocalAppData%\frost\frost.log` |

Avec systemd, les sauvegardes planifiées écrivent dans le journal système plutôt que dans `frost.log`. Voir [Sauvegardes automatiques](#scheduling), qui indique aussi où se trouve la tâche planifiée.

Le registre de ce qui a été envoyé est jetable. Si vous le supprimez, la sauvegarde suivante le reconstruit à partir de votre stockage et relit tous vos fichiers. Les restaurations n'en ont pas besoin. À côté se trouve un fichier `.lock` qui empêche deux processus frost d'écrire en même temps. Supprimer ce fichier de verrou n'arrête pas un frost en cours d'exécution.

## Changer les dossiers

Sous macOS et Linux, frost respecte `XDG_CONFIG_HOME` et `XDG_CACHE_HOME`. `FROST_CONFIG_DIR` et `FROST_CACHE_DIR` passent avant les deux, et `--config-dir` change le dossier de configuration le temps d'une commande.

Si vous changez ces dossiers, relancez `frost init` pour que la tâche planifiée les utilise aussi.
