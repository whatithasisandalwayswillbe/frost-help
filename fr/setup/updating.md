# Mettre à jour frost

frost se met à jour tout seul, y compris si vous l'avez installé avec npm ou pnpm. Par défaut, il installe les nouvelles versions après les sauvegardes planifiées.

Inutile de mettre à jour vous-même le paquet `getfrost`. Un paquet plus ancien ne remplace jamais un frost plus récent.

## Mettre à jour maintenant

```sh
frost update
```

frost trouve la dernière version, vérifie sa signature et sa somme de contrôle, et s'assure que la nouvelle version démarre avant de basculer dessus. Vos réglages, votre clé et vos sauvegardes ne sont pas touchés.

Pour seulement vérifier s'il existe une version plus récente :

```sh
frost update --check
```

`frost update` n'installe jamais de préversion, ni de version plus ancienne que la vôtre.

## Mises à jour automatiques

Après une sauvegarde planifiée, frost cherche une nouvelle version au plus une fois toutes les 20 heures et l'installe de la même façon que `frost update`. Si la recherche ou l'installation échoue, la sauvegarde n'échoue pas pour autant.

`frost status` montre comment les mises à jour sont configurées et si la dernière a réussi. L'écran des réglages du navigateur d'instantanés l'affiche aussi.

Pour être averti des nouvelles versions sans qu'elles s'installent toutes seules :

```sh
frost config set update.auto false
```

`frost status` vous signale alors chaque nouvelle version, et rien n'est installé tant que vous ne lancez pas `frost update`.

> Les mises à jour automatiques n'ont lieu qu'après les sauvegardes planifiées. Si les sauvegardes automatiques sont désactivées, frost ne cherche aucune mise à jour en arrière-plan.

## Quand frost ne peut pas se mettre à jour

| Situation | Que faire |
| --- | --- |
| Vous ne pouvez pas écrire dans le dossier de l'application frost | Réinstallez-le avec l'installateur, sous votre propre utilisateur |
| frost a été compilé à partir des sources | Recompilez-le, ou installez une version avec l'installateur |

Si une mise à jour s'interrompt en cours de route, relancez l'installateur. Il répare l'installation.
