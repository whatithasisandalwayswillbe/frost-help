# Configurer frost

`frost init` vous guide dans la configuration, une question à la fois. Relancez-le chaque fois que vous voulez revoir ou modifier vos réglages.

## Les écrans de l'assistant

Dans un terminal, `frost init` ouvre un assistant en plein écran. Il lui faut une fenêtre d'au moins 56 colonnes de large et 18 lignes de haut. La dernière ligne affiche toujours les touches disponibles : `[esc]` revient d'une étape et `[q]` quitte sans enregistrer.

### Stockage

Choisissez où vont vos sauvegardes :

- **Permafrost**, l'option recommandée. Une seule clé d'accès suffit, et si vous n'en avez pas encore, frost peut vous en obtenir une dans votre navigateur. Voir [Permafrost](#permafrost).
- **Backblaze B2**, **Amazon S3**, **Cloudflare R2** ou **Wasabi**. L'assistant ne demande que ce dont ce fournisseur a besoin, et indique où trouver chaque réponse.
- **Other S3-compatible** (autre service compatible S3), pour MinIO, Ceph et les autres services qui parlent le protocole S3.

Chaque fournisseur a sa propre page dans la section Stockage. Quand vous collez une clé secrète, `[tab]` l'affiche ou la masque.

Une fois vos réponses données, frost se connecte et vérifie qu'il peut écrire, lire, lister et supprimer un petit objet de test, et que le stockage accepte les écritures conditionnelles. En cas de problème, l'assistant l'explique en termes simples et vous ramène à la réponse la plus probablement en cause. Tout le reste de ce que vous avez saisi est conservé.

### Dossiers

Saisissez le chemin complet d'un dossier à sauvegarder et appuyez sur `[enter]`. `~` désigne votre dossier personnel, donc `~/Documents` fonctionne. Ajoutez autant de dossiers que vous voulez ; rien n'est choisi à votre place.

- frost sauvegarde des dossiers entiers. Pour sauvegarder un seul fichier, ajoutez le dossier qui le contient.
- Un dossier déjà dans la liste, ou situé dans un dossier qui y figure, n'est pas ajouté deux fois. Ajouter un dossier qui en contient d'autres de la liste les remplace.
- Un dossier qui n'existe pas encore reste dans la liste et est ignoré jusqu'à ce qu'il existe, comme un disque débranché.

Appuyez sur `[↑]` pour entrer dans la liste et sur `[x]` pour retirer le dossier sélectionné. Appuyez sur `[enter]` dans un champ vide pour passer à la suite.

### Exclusions

Cette étape liste les noms et motifs que frost laisse de côté à chaque sauvegarde. La liste commence avec les valeurs par défaut de frost : `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules` et `.cache`. Retirez ceux que vous voulez sauvegarder. [Exclure des fichiers](#excluding-files) explique le fonctionnement des motifs.

### Planification

Choisissez la fréquence des sauvegardes automatiques : toutes les heures, toutes les 6 ou 12 heures, chaque jour ou chaque semaine. Choisissez « Off » (désactivé) pour ne sauvegarder que lorsque vous lancez `frost backup`. D'autres intervalles sont disponibles avec `frost config set`. Voir [Sauvegardes automatiques](#scheduling).

### Phrase de récupération

Pour un nouveau stockage, frost crée votre clé et l'affiche sous forme de 24 mots. Les mots restent masqués tant que vous n'appuyez pas sur `[v]`, pour que vous puissiez d'abord vous assurer que personne ne voit votre écran. Notez-les, appuyez sur `[enter]`, puis tapez les deux mots demandés par l'assistant pour vérifier votre copie.

Si le stockage contient déjà des sauvegardes frost, l'assistant vous demande plutôt leur phrase de récupération. Si la clé déjà présente sur cet ordinateur les ouvre, cette étape est sautée.

### Récapitulatif

L'écran récapitulatif affiche tous les réglages à la fois. Utilisez `[↑]` et `[↓]` pour choisir une ligne et `[e]` pour la modifier, puis appuyez sur `[s]` pour enregistrer. `[v]` affiche l'empreinte de votre clé, un court identifiant qui désigne votre clé sans la révéler.

L'enregistrement écrit vos réglages et votre clé, et met en place la tâche planifiée. Une fois l'assistant terminé, lancez `frost backup --dry-run` pour prévisualiser votre première sauvegarde, ou `frost backup` pour la démarrer.

## Un stockage qui contient déjà des sauvegardes

L'assistant cherche des sauvegardes frost dès qu'il se connecte :

- Si la clé de cet ordinateur les ouvre, l'assistant se connecte et vous conservez tous vos instantanés.
- Si elles ont été faites avec une autre clé, l'assistant demande la phrase de récupération de cette clé. frost utilise ensuite cette clé sur cet ordinateur.
- Si le stockage est vide mais que les sauvegardes de cet ordinateur sont ailleurs, l'assistant vous prévient avant d'y démarrer un ensemble de sauvegardes séparé. Vos anciennes sauvegardes restent où elles sont, mais frost n'affiche plus que les nouvelles.

Pour déplacer des sauvegardes existantes, voir plutôt [Déplacer vos sauvegardes](#moving-backups).

## Relancer l'assistant

Lancez `frost init` quand vous voulez. Il s'ouvre avec vos réglages actuels : vous pouvez n'en changer qu'un et enregistrer.

L'assistant en plein écran ne pose pas de question sur deux réglages plus rares, et conserve leur valeur actuelle :

- Un serveur Permafrost personnel : `storage.permafrost.url`.
- Le dossier dans un bucket S3, `frost` par défaut : `storage.s3.prefix`.

Modifiez-les avec `frost config set`. Voir [Réglages](#settings).

## Sans terminal plein écran

Quand frost ne tourne pas dans un terminal interactif, par exemple avec une entrée redirigée, `frost init` pose des questions simples, une par ligne. Au lieu de la liste des fournisseurs, il propose Permafrost ou un bucket générique compatible S3, et il demande aussi le dossier dans le bucket. Les listes sont séparées par des virgules, et `-` laisse la liste d'exclusions vide. L'obtention d'une clé Permafrost dans le navigateur fonctionne aussi dans ce mode.
