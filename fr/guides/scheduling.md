# Sauvegardes automatiques

frost sauvegarde selon un calendrier grâce au planificateur de votre système d'exploitation. Entre deux sauvegardes, rien ne tourne en arrière-plan.

## Changer la planification

`frost init` vous demande à quelle fréquence sauvegarder. Pour la changer plus tard :

```sh
frost config set schedule.every 6h
```

Les choix possibles sont `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily` et `weekly`. La valeur par défaut est `daily`.

Pour désactiver les sauvegardes automatiques, ou les réactiver :

```sh
frost config set schedule.enabled false
frost config set schedule.enabled true
```

Chacun de ces changements met à jour la tâche planifiée immédiatement.

## Quand les sauvegardes ont lieu

| Planificateur | Chaque jour | Chaque semaine | Plus souvent |
| --- | --- | --- | --- |
| launchd (macOS) et cron (Linux) | 03:17 | Le dimanche à 03:17 | À la 17e minute de l'heure |
| Planificateur de tâches (Windows) | 03:17 | Le dimanche à 03:17 | Toutes les quelques heures, à partir du moment où la tâche a été créée |
| systemd (Linux) | Minuit | Le lundi à minuit | À l'heure pile |

Les heures sont celles de votre ordinateur. systemd décale chaque exécution de 5 minutes au maximum, au hasard.

## Sauvegardes manquées

launchd et systemd rattrapent le retard. Si votre ordinateur était éteint ou en veille au moment prévu, la sauvegarde a lieu à son réveil. cron et le Planificateur de tâches sautent les exécutions manquées, et la suivante a lieu à l'heure.

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
