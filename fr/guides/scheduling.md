# Sauvegardes automatiques

frost sauvegarde selon un calendrier grâce au planificateur de votre système d'exploitation. Entre deux sauvegardes, rien ne tourne en arrière-plan.

## Changer la planification

`frost init` vous demande à quelle fréquence sauvegarder. Pour la changer plus tard :

```sh
frost config set schedule.every 6h
```

Les choix possibles sont `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily` et `weekly`. La valeur par défaut est `daily`.

Pour choisir quand les sauvegardes ont lieu, indiquez une heure au format 24 heures et, pour les sauvegardes hebdomadaires, le jour :

```sh
frost config set schedule.time 09:30
frost config set schedule.day friday
```

Les valeurs par défaut sont `15:00` et `sunday`. Pour désactiver les sauvegardes automatiques, ou les réactiver :

```sh
frost config set schedule.enabled false
frost config set schedule.enabled true
```

Chaque changement met à jour la tâche planifiée immédiatement. Sous macOS et Windows, un changement fait pendant une sauvegarde planifiée s'applique dès qu'elle se termine. Si vous modifiez `config.toml` vous-même, la commande frost suivante met à jour la tâche.

## Quand les sauvegardes ont lieu

Les sauvegardes ont lieu à l'heure de `schedule.time`, à l'heure locale de votre ordinateur :

| `schedule.every` | Sauvegarde |
| --- | --- |
| `daily` | Chaque jour à cette heure |
| `weekly` | Chaque semaine le jour `schedule.day`, à cette heure |
| `2h` à `12h` | À cette heure, puis à chaque intervalle avant et après. `6h` à partir de `15:00` s'exécute à 03:00, 09:00, 15:00 et 21:00 |
| `hourly` | Toutes les heures, aux minutes de cette heure |

systemd décale chaque exécution de 5 minutes au maximum, au hasard.

## Sauvegardes manquées

Si votre ordinateur était éteint ou en veille au moment prévu, frost sauvegarde dès son retour. Quel que soit le nombre de sauvegardes manquées, il n'en fait qu'une.

| Planificateur | Lance la sauvegarde manquée |
| --- | --- |
| launchd (macOS) | Au réveil du Mac, ou quand vous ouvrez une session après qu'il a été éteint |
| systemd (Linux) | Au réveil ou au démarrage de l'ordinateur, ou quand vous ouvrez une session si le lingering est désactivé |
| Planificateur de tâches (Windows) | Dès que possible, quand l'ordinateur est de retour et que votre session est ouverte |
| cron (Linux) | Dans les 15 minutes qui suivent le retour de l'ordinateur |

Avec cron, frost vérifie toutes les 15 minutes et ne sauvegarde que lorsqu'une sauvegarde est prévue ou a été manquée. Une heure déjà couverte, par une sauvegarde planifiée ou par une que vous avez lancée vous-même, ne donne pas lieu à une deuxième sauvegarde.

Pour sauter les sauvegardes manquées, et ne sauvegarder qu'à l'heure prévue :

```sh
frost config set schedule.catch_up false
```

Une sauvegarde planifiée qui démarre avant le retour du réseau, ou avant qu'un disque ou un partage soit monté, réessaie pendant environ 5 minutes. Avec un [disque local](#local-drive), le disque doit être branché pendant la sauvegarde. [Serveur auto-hébergé](#self-hosted) se connecte avec la propre clé SSH de frost, donc il fonctionne sans vous. Si une autre sauvegarde est en cours, elle attend qu'elle se termine.

Sous Windows, les sauvegardes planifiées ne s'exécutent que lorsque votre session est ouverte. Elles ne démarrent pas quand l'ordinateur est sur batterie, et s'arrêtent si vous le débranchez. Sous macOS et avec systemd, elles tournent en basse priorité pour ne pas ralentir votre ordinateur.

## La tâche planifiée

| Système | Planificateur | Tâche |
| --- | --- | --- |
| macOS | launchd | `~/Library/LaunchAgents/io.github.whatithasisandalwayswillbe.frost.plist` |
| Linux avec systemd | Minuteur utilisateur systemd | `~/.config/systemd/user/frost-backup.service` et `frost-backup.timer` |
| Linux sans systemd | cron | Une ligne de votre crontab marquée `# frost-backup` |
| Windows | Planificateur de tâches | Une tâche nommée `frost backup` |

La tâche lance `frost backup` avec les dossiers de configuration et de cache utilisés au moment de sa création. Si vous changez ces dossiers, relancez `frost init`.

Sous macOS, la tâche apparaît dans Réglages Système > Général > Ouverture et extensions (System Settings > General > Login Items & Extensions) sous le nom **Node.js Foundation**, l'éditeur de l'environnement d'exécution fourni avec frost. La désactiver à cet endroit arrête les sauvegardes planifiées, et `frost status` signale que la tâche est manquante. Pour arrêter les sauvegardes planifiées, utilisez plutôt `frost config set schedule.enabled false`.

Avec systemd, frost essaie d'activer lingering pour votre utilisateur (`loginctl enable-linger`) s'il peut confirmer que cette option est désactivée. Lingering permet aux sauvegardes de s'exécuter lorsque votre session est fermée. Si frost ne peut pas l'activer, les sauvegardes peuvent s'arrêter après la fermeture de votre session. Quand il retire le minuteur, frost ne désactive lingering que s'il a enregistré qu'il l'avait activé.

## Journaux

| Planificateur | Où va le journal |
| --- | --- |
| launchd, cron et le Planificateur de tâches | `frost.log` dans le dossier de cache de frost. Voir [Fichiers et dossiers](#files-and-folders) |
| systemd | Le journal système. Lisez-le avec `journalctl --user -u frost-backup` |

Un journal de plus de 1 Mio est vidé avant l'exécution suivante. `frost status` indique aussi si la dernière sauvegarde a réussi.

## Si la tâche disparaît

Si la tâche est supprimée ou désactivée, `frost status` affiche « scheduled job is missing » (la tâche planifiée est manquante). Remettez-la en place avec :

```sh
frost config set schedule.enabled true
```
