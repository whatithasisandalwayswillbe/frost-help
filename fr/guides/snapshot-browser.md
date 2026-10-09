# Le navigateur d'instantanés

`frost browse` ouvre un navigateur d'instantanés en plein écran. Vous pouvez y parcourir vos fichiers tels qu'ils étaient, comparer des instantanés et restaurer ce que vous choisissez.

```sh
frost browse
```

`frost restore` sans rien d'autre ouvre aussi le navigateur. Une sauvegarde planifiée peut tourner pendant que le navigateur est ouvert.

## Se déplacer

| Touche | Effet |
| --- | --- |
| `[↑]` `[↓]` ou `[k]` `[j]` | Se déplacer |
| `[pgup]` `[pgdn]` | Avancer ou reculer d'une page |
| `[g]` `[G]` | Aller tout en haut ou tout en bas |
| `[enter]` | Ouvrir |
| `[esc]` | Revenir en arrière, ou fermer une erreur |
| `[h]` | Afficher toutes les touches |
| `[s]` | Afficher vos réglages |
| `[v]` | Afficher ou masquer l'empreinte de votre clé |
| `[q]` | Quitter |

L'écran des réglages est en lecture seule. Modifiez vos réglages avec `frost config set` ou `frost config edit`.

## Accueil

L'écran d'accueil affiche votre dernière sauvegarde et la dernière vérification. Appuyez sur `[enter]` pour parcourir vos instantanés, ou sur `[r]` pour actualiser.

## Instantanés

Les instantanés sont listés du plus récent au plus ancien, regroupés par date. Dans une fenêtre large, un panneau à côté de la liste affiche les détails de l'instantané en surbrillance : sa date, l'ordinateur d'origine, son nombre de fichiers, sa taille et la quantité de données nouvelles qu'il a ajoutées.

| Touche | Effet |
| --- | --- |
| `[enter]` | Ouvrir les fichiers de l'instantané |
| `[d]` | Le comparer à l'instantané précédent |
| `[m]` | Le marquer. Appuyez ensuite sur `[d]` sur un autre instantané pour comparer les deux |

Une comparaison liste ce qui a été ajouté, supprimé et modifié entre les deux instantanés.

## Fichiers

Vous voyez vos dossiers et fichiers exactement tels qu'ils étaient dans cet instantané.

| Touche | Effet |
| --- | --- |
| `[enter]` | Ouvrir un dossier |
| `[←]` | Remonter au dossier parent |
| `[space]` | Sélectionner ou désélectionner |
| `[a]` | Sélectionner ou désélectionner tout le contenu de ce dossier |
| `[c]` | Vider la sélection |
| `[r]` | Restaurer la sélection, ou l'élément en surbrillance si rien n'est sélectionné |

## Restaurer

Après `[r]`, choisissez où vont les fichiers :

| Touche | Option | Effet |
| --- | --- | --- |
| `[1]` | New folder beside originals | Restaure dans un nouveau dossier à côté des originaux, comme `frost restore --beside` |
| `[2]` | New folder elsewhere | Vous laisse choisir un dossier, puis restaure dans un nouveau dossier à l'intérieur |
| `[3]` | Overwrite original files | Remplace les originaux, comme `frost restore --overwrite`. Appuyez sur `[y]` pour confirmer |

Avant d'écrire quoi que ce soit, frost montre où chaque élément va atterrir. Appuyez sur `[enter]` pour restaurer, `[c]` pour changer de dossier ou `[esc]` pour annuler. Les confirmations et résultats longs défilent avec `[pgup]` et `[pgdn]`.

« New folder elsewhere » ouvre le sélecteur de dossiers de votre système : le Finder sous macOS, l'Explorateur de fichiers sous Windows, et zenity, qarma ou matedialog sous Linux. En SSH, ou sous Linux sans sélecteur, vous saisissez le dossier vous-même. Appuyez sur `[t]` pendant que le sélecteur est ouvert pour le saisir quand même.

Une fois la restauration terminée, frost montre ce qu'il a restauré dans le Finder, l'Explorateur de fichiers ou votre gestionnaire de fichiers Linux. Un fichier seul apparaît sélectionné sous macOS et Windows ; sous Linux, son dossier s'ouvre. Dans les autres cas, le dossier le plus profond contenant tous les éléments restaurés s'ouvre. Rien ne s'ouvre en SSH, sans affichage graphique ou si la restauration échoue.

[Restaurer des fichiers](#restoring) détaille chaque option, et ce qui se passe quand une restauration est interrompue.
