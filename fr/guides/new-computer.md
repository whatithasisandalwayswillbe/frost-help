# Récupérer sur un nouvel ordinateur

Si votre ordinateur est perdu, cassé ou remplacé, vous pouvez récupérer vos fichiers sur un autre.

## Ce qu'il vous faut

- Votre phrase de récupération de 24 mots.
- Les informations de votre stockage : votre clé d'accès Permafrost, ou le nom du bucket et les clés d'accès de votre fournisseur S3.

Si vous avez encore l'ancien ordinateur, `frost key show` affiche la phrase.

## Étapes

1. [Installez frost](#installing) sur le nouvel ordinateur.
2. Lancez `frost init` et choisissez le même stockage, avec les mêmes informations qu'avant.
3. L'assistant trouve vos sauvegardes et demande leur phrase de récupération. Tapez les 24 mots.
4. Choisissez les dossiers à sauvegarder sur cet ordinateur, la liste d'exclusions et la planification, puis vérifiez et enregistrez.
5. Restaurez vos fichiers avant la première sauvegarde de cet ordinateur :

```sh
frost restore latest --to ~
```

Cette commande restaure votre instantané le plus récent dans un nouveau dossier `frost-restore-<id>` de votre dossier personnel, organisé comme les dossiers d'origine. Si les deux ordinateurs sont du même type, vous pouvez n'en restaurer qu'une partie en ajoutant les chemins tels qu'ils étaient sur l'ancien ordinateur, comme `/Users/you/Documents`.

Pour choisir quoi restaurer depuis un ordinateur d'un autre type, comme un instantané de Mac sur Windows, utilisez le navigateur d'instantanés. Lancez `frost browse`, sélectionnez ce que vous voulez, appuyez sur `[r]`, puis choisissez « New folder elsewhere ».

Utilisez `--to` plutôt que `--beside` ou `--overwrite`. `--beside` exige que les dossiers d'origine existent sur cet ordinateur, et `--overwrite` exige un instantané du même type d'ordinateur : macOS et Linux, ou Windows.

> Restaurez avant que cet ordinateur fasse sa première sauvegarde. Ensuite, `latest` désigne l'instantané le plus récent de cet ordinateur-ci. Si c'est déjà fait, lancez `frost status` pour trouver l'identifiant de votre ancien instantané, et restaurez celui-là.

## Deux ordinateurs, un seul stockage

Deux ordinateurs peuvent sauvegarder vers le même stockage avec la même phrase de récupération. Leurs instantanés partagent une même liste, et les données que les deux possèdent ne sont stockées qu'une fois.

`latest` désigne alors l'instantané le plus récent des deux ordinateurs confondus. Dans le navigateur d'instantanés, le panneau de détails indique quel ordinateur a pris chaque instantané. Pour restaurer les fichiers d'un ordinateur précis, choisissez son instantané par son identifiant.

## Si vous avez perdu la phrase

Si l'ancien ordinateur fonctionne encore, lancez `frost key show` dessus. Si vous avez perdu à la fois la phrase et l'ordinateur, personne ne peut déchiffrer vos sauvegardes. Voir [Votre phrase de récupération](#recovery-phrase).
