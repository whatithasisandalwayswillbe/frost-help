# Votre phrase de récupération

Votre phrase de récupération, c'est votre clé de chiffrement écrite sous forme de 24 mots. C'est le seul moyen de lire vos sauvegardes.

> Si vous perdez la phrase de récupération et l'ordinateur, vos sauvegardes sont perdues. Personne ne peut les récupérer : ni la personne qui stocke vos sauvegardes, ni Permafrost, ni les auteurs de Frost.

## La conserver en lieu sûr

L'assistant vous montre la phrase quand il crée votre clé. Notez-la sur papier ou gardez-la dans un gestionnaire de mots de passe de confiance, et rangez-la ailleurs que sur l'ordinateur que vous sauvegardez.

Une copie se trouve aussi sur votre ordinateur, dans le fichier `key` du dossier de configuration de Frost, pour que les sauvegardes planifiées puissent tourner sans vous. Sous macOS et Linux, Frost la crée avec des autorisations réservées à votre utilisateur. Sous Windows, elle hérite des autorisations de votre profil utilisateur. Un dossier partagé ou des autorisations modifiées peuvent l'exposer. Quiconque peut lire ce fichier, ou lancer des programmes en votre nom, peut lire vos sauvegardes : utilisez le chiffrement complet du disque et un verrouillage de l'écran.

Pour lire vos sauvegardes, il faut à la fois la phrase et un accès à votre stockage. Gardez aussi les clés de votre stockage pour vous.

## L'afficher

```sh
frost key show
```

Frost vous avertit d'abord, et n'affiche la phrase qu'après que vous avez tapé `show`. Assurez-vous que personne ne regarde votre écran et que vous ne le partagez pas.

## Vérifier votre copie

```sh
frost key verify
```

Tapez la phrase que vous avez notée. Frost vous dit si c'est une phrase valide, si elle correspond à la clé de cet ordinateur et si elle ouvre vos sauvegardes. Il n'affiche jamais la phrase. Vérifiez votre copie de temps en temps.

## L'utiliser sur un autre ordinateur

`frost init` demande la phrase lorsqu'il se connecte à un stockage qui contient déjà vos sauvegardes. Pour l'installer directement sur un ordinateur :

```sh
frost key import
```

Si un stockage est configuré, Frost vérifie d'abord que la phrase l'ouvre. Si une autre clé se trouve déjà sur l'ordinateur, Frost demande confirmation avant de la remplacer. Les sauvegardes faites avec l'ancienne clé ont besoin de l'ancienne phrase pour être restaurées.

Voir [Récupérer sur un nouvel ordinateur](#new-computer) pour toutes les étapes.

## Saisir la phrase

Tapez les 24 mots dans l'ordre, séparés par des espaces. Les majuscules n'ont pas d'importance. Les mots viennent de la liste anglaise standard BIP39, qui en compte 2 048, ce qui permet à Frost de vous signaler une faute de frappe :

| Frost affiche | Cela signifie |
| --- | --- |
| entered 23 words, but a recovery phrase must contain exactly 24 words | Il manque un mot, ou il y en a un de trop |
| word 5 is not a valid recovery word; check the spelling | Ce mot est mal orthographié |
| all words are valid individually, but together they do not form a valid recovery phrase; check their order and spelling | Deux mots sont inversés, ou l'un d'eux est un autre mot existant |
| that recovery phrase is valid, but it does not match these backups | La phrase appartient à un autre ensemble de sauvegardes |

## L'empreinte de la clé

L'empreinte est un court identifiant, comme `6f154dc10058`, qui désigne votre clé sans la révéler. `frost status` l'affiche, tout comme le navigateur d'instantanés quand vous appuyez sur `[v]`. Des empreintes identiques aident à reconnaître une clé, mais elles sont trop courtes pour prouver que deux clés sont identiques. Frost vérifie la clé elle-même à l'ouverture de vos sauvegardes.

## Changer de clé

Frost ne peut pas changer la clé des sauvegardes existantes. Si quelqu'un a pu voir votre phrase, il peut lire ces sauvegardes tant qu'il a accès à votre stockage : changez donc les clés de votre stockage et gardez-les pour vous.
