# Vérifier vos sauvegardes

frost vérifie vos sauvegardes au fil de l'eau, et `frost status` vous montre où elles en sont.

## frost status

```sh
frost status
```

```text
┌  frost  v0.1.0  s3://my-backups/frost/  key 6f154dc10058
│
│  last backup  ok 2h ago  maple-absurd-3f1c
│  next backup  ~in 4h  6h via launchd
│  health       ok 21 objects checked 2h ago
│  updates      automatic
│  protected    1,204 files, 2.1 GB, in 3 snapshots
│
├  snapshots
│
│  snapshot             taken                  files         size          new
│  maple-absurd-3f1c    2026-10-08 09:17       1,204       2.1 GB      14.2 MB
│  orbit-velvet-a02e    2026-10-08 03:17       1,201       2.1 GB       3.6 MB
│  canyon-pilot-77b9    2026-10-07 21:17       1,198       2.1 GB       2.1 GB
└
```

La première ligne indique la version de frost, votre stockage et l'empreinte de votre clé. Les lignes suivantes indiquent :

| Ligne | Contenu |
| --- | --- |
| last backup | Quand la dernière sauvegarde a eu lieu et si elle a réussi. « ok, but » liste les dossiers introuvables, les éléments illisibles et les fichiers occupés qui ont gardé leur copie précédente |
| next backup | L'heure de la prochaine sauvegarde automatique, ou le fait qu'elles sont désactivées |
| health | Le résultat de la dernière vérification par échantillonnage |
| updates | Si les mises à jour sont automatiques, et si une nouvelle version est sortie |
| protected | Le nombre de fichiers et la taille du dernier instantané, et le nombre total d'instantanés |
| missing | Des instantanés connus de cet ordinateur qui ne sont plus dans le stockage |

La liste affiche vos 10 instantanés les plus récents. La colonne `new` indique la quantité de données nouvelles ajoutée par chacun. Pour les afficher tous :

```sh
frost status --all
```

## La vérification par échantillonnage

Après chaque sauvegarde qui enregistre un instantané, frost télécharge un échantillon aléatoire de blocs, les déchiffre un par un et vérifie que chacun correspond à son identifiant. Il charge aussi la liste de fichiers de l'instantané le plus récent et vérifie qu'il connaît chaque bloc dont elle a besoin. Après une sauvegarde sans nouveauté, frost ne refait la vérification que si la dernière date de plus d'un jour ou a trouvé un problème.

L'échantillon compte 20 blocs par défaut. Un échantillon plus grand repère plus de problèmes, mais télécharge davantage :

```sh
frost config set verify.sample 50
```

`0` désactive la vérification par échantillonnage.

## Vérifier maintenant

```sh
frost status --verify
```

Cette commande lance une nouvelle vérification et compare en plus la liste locale des blocs de frost avec tout ce que contient votre stockage. Elle vérifie 20 blocs même si `verify.sample` vaut `0`. Elle se termine avec `1` si la vérification échoue : vous pouvez donc la lancer depuis votre propre planificateur pour vérifier à un autre rythme que vos sauvegardes.

## Si une vérification échoue

La ligne health liste ce qui a échoué. En général, cela signifie que votre stockage a perdu ou abîmé certains blocs.

1. Lancez `frost backup`. Tout bloc manquant dont les données sont encore sur votre ordinateur est renvoyé.
2. Lancez `frost status --verify` pour vérifier à nouveau.

Les données qui ne sont plus sur votre ordinateur ne peuvent pas être renvoyées, et les anciens instantanés qui en ont besoin ne pourront pas être restaurés entièrement. Une sauvegarde ne remplace pas automatiquement un bloc encore présent mais endommagé. Récupérez une copie intacte auprès de votre fournisseur ou dans une sauvegarde indépendante, puis vérifiez à nouveau.

## Instantanés manquants

Si des instantanés connus de cet ordinateur disparaissent du stockage, `frost status` le signale une fois. Si vous avez déplacé vos sauvegardes, indiquez à frost leur nouvel emplacement. Voir [Déplacer vos sauvegardes](#moving-backups). Sinon, c'est qu'ils ont été supprimés de votre stockage.

> Une vérification par échantillonnage ne contrôle qu'une partie de vos sauvegardes. Elle repère les problèmes tôt, mais ne prouve pas que chaque instantané se restaurera. Pour les fichiers que vous ne pouvez pas vous permettre de perdre, gardez aussi une seconde sauvegarde indépendante.
