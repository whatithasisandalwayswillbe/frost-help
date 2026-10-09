# Exclure des fichiers

Votre liste d'exclusions tient des fichiers et des dossiers à l'écart de toutes les sauvegardes. Dans vos réglages, elle s'appelle `exclude`.

## Les valeurs par défaut

Une nouvelle liste contient `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules` et `.cache`. Retirez ceux que vous voulez sauvegarder.

## Fonctionnement des motifs

- **Un nom ou un motif sans barre oblique** correspond à tout fichier ou dossier portant ce nom, où qu'il soit. `node_modules` exclut tous les dossiers `node_modules` et leur contenu.
- **Un motif avec une barre oblique** est un chemin complet. Il exclut ce chemin et tout ce qui se trouve en dessous. `~` désigne votre dossier personnel, comme dans `~/Downloads/Movies`.

Les motifs acceptent ces jokers :

| Joker | Correspond à |
| --- | --- |
| `*` | N'importe quel nombre de caractères, sauf `/` |
| `?` | Un seul caractère quelconque, sauf `/` |
| `[abc]` | Un des caractères listés. `[a-z]` est une plage, et `[^abc]` tout caractère absent de la liste |
| `\` | Le caractère suivant tel quel : `\*` correspond donc à un vrai `*` |

Les motifs tiennent compte de la casse : `*.MOV` n'exclut pas `clip.mov`.

Les dossiers de votre liste ne sont jamais exclus eux-mêmes ; seul leur contenu peut l'être.

## Exemples

| Motif | Exclut |
| --- | --- |
| `*.iso` | Toutes les images disque |
| `.git` | Tous les dossiers Git |
| `Cache*` | Tout ce dont le nom commence par `Cache` |
| `~/Library/Caches` | Le dossier de cache de votre dossier personnel macOS |
| `~/Videos/*.mov` | Les fichiers `.mov` situés directement dans `~/Videos`, mais pas dans ses sous-dossiers |

## Modifier la liste

Lancez `frost init` et modifiez l'étape des exclusions, ou utilisez `frost config edit`. Vous pouvez aussi définir toute la liste en une seule commande, qui remplace l'ancienne :

```sh
frost config set exclude .DS_Store node_modules '*.tmp' '~/Downloads'
```

Mettez entre guillemets les motifs qui contiennent `*` ou `~`, pour que votre shell ne les développe pas avant.

Pour exclure quelque chose le temps d'une seule sauvegarde :

```sh
frost backup --exclude '*.iso'
```

Exclure quelque chose ne le retire pas des instantanés que vous avez déjà.
