# Premiers pas

frost sauvegarde vos dossiers vers le stockage de votre choix, et chiffre tout sur votre ordinateur avant l'envoi. Cette page vous accompagne de l'installation de frost jusqu'à votre première sauvegarde.

## Ce qu'il vous faut

- Un Mac, ou un ordinateur sous Linux ou Windows, avec un processeur Intel, AMD ou ARM 64 bits.
- Un endroit où garder vos sauvegardes : une clé d'accès [Permafrost](#permafrost), ou un bucket chez un [fournisseur compatible S3](#choosing-storage).
- Une fenêtre de terminal d'au moins 56 colonnes de large et 18 lignes de haut, pour l'assistant de configuration en plein écran.

Inutile d'installer Node.js ou quoi que ce soit d'autre au préalable. frost embarque son propre environnement d'exécution.

## 1. Installez frost

Sous macOS ou Linux, lancez cette commande dans un terminal. Sous Windows, lancez-la dans Git Bash.

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | sh
```

L'installateur vérifie la signature de la version avant d'installer quoi que ce soit. [Installer frost](#installing) présente l'installation manuelle et les options de l'installateur.

## 2. Configurez-le

```sh
frost init
```

L'assistant pose une seule question par écran :

1. **Stockage.** L'endroit où vont vos sauvegardes. Choisissez Permafrost ou un fournisseur compatible S3, puis collez les clés demandées.
2. **Dossiers.** Les dossiers à sauvegarder, comme `~/Documents`.
3. **Exclusions.** Les fichiers et dossiers à laisser de côté. Quelques classiques, comme `node_modules`, sont déjà remplis.
4. **Planification.** La fréquence des sauvegardes automatiques, ou leur désactivation.
5. **Phrase de récupération.** 24 mots qui déverrouillent vos sauvegardes. Notez-les.
6. **Récapitulatif.** Vérifiez tout, puis appuyez sur `[s]` pour enregistrer.

> Votre phrase de récupération est le seul moyen de lire vos sauvegardes si vous perdez cet ordinateur. Personne ne peut la retrouver pour vous, ni votre fournisseur de stockage ni les auteurs de frost.

[Configurer frost](#setting-up) détaille chaque écran.

## 3. Sauvegardez

Voyez d'abord ce que la première sauvegarde va envoyer :

```sh
frost backup --dry-run
```

Puis lancez-la :

```sh
frost backup
```

La première sauvegarde envoie tout. Les suivantes n'envoient que ce qui a changé. Si vous avez activé la planification, frost sauvegarde désormais tout seul et vous n'avez rien à lancer.

## 4. Gardez un œil dessus

```sh
frost status
```

`status` affiche la dernière sauvegarde, l'heure de la prochaine, le résultat de la dernière vérification et vos instantanés récents.

## Récupérer des fichiers

Ouvrez le navigateur d'instantanés, trouvez ce qu'il vous faut, sélectionnez-le avec `[space]` et appuyez sur `[r]` :

```sh
frost browse
```

Vous pouvez aussi restaurer en ligne de commande. Cette commande place une copie du fichier dans un nouveau dossier, à côté de l'original :

```sh
frost restore latest ~/Documents/report.pdf --beside
```

[Restaurer des fichiers](#restoring) présente les deux méthodes.

## Pour aller plus loin

- [Fonctionnement de frost](#how-it-works) explique les instantanés, le chiffrement et ce qui est envoyé.
- [Sauvegardes automatiques](#scheduling) traite de la planification.
- [Votre phrase de récupération](#recovery-phrase) explique comment protéger votre clé.
