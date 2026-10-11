# Permafrost

Permafrost est un stockage hébergé conçu pour frost. Pour vous connecter, une seule clé d'accès suffit, sans bucket, région ni endpoint à configurer.

Vos sauvegardes sont chiffrées sur votre ordinateur avant l'envoi, comme avec n'importe quel autre stockage. Permafrost ne peut pas les lire.

## Obtenir une clé

1. Lancez `frost init` et choisissez **Permafrost**.
2. Choisissez **I don't have a key yet** (je n'ai pas encore de clé). frost ouvre [getfro.st/perma](https://getfro.st/perma) dans votre navigateur. S'il ne s'ouvre pas, rendez-vous-y vous-même.
3. Obtenez-y votre clé et copiez-la.
4. Collez-la dans l'assistant.

Si vous avez déjà une clé, choisissez **I have a key** (j'ai une clé) et collez-la.

## Obtenir une nouvelle clé

Si vous avez perdu votre clé, rendez-vous sur [getfro.st/perma/recover](https://getfro.st/perma/recover) et saisissez l'adresse e-mail avec laquelle vous l'avez obtenue. L'e-mail que vous recevez mène à une nouvelle clé. Celle-ci remplace l'ancienne, qui cesse de fonctionner sur tous vos ordinateurs.

Sur chaque ordinateur qui utilise Permafrost, remplacez l'ancienne clé par la nouvelle :

```sh
frost config set storage.permafrost.token <new key>
```

Tant que Permafrost n'accepte pas d'envois, `frost config set` ne peut pas faire sa vérification du stockage. Utilisez plutôt `frost config edit` et placez la clé dans `token` sous `[storage.permafrost]`.

## Espace utilisé

`frost status` indique la part de votre stockage Permafrost que vous utilisez. Quand Permafrost a quelque chose à vous signaler, par exemple un stockage presque plein, `frost status` et `frost backup` l'affichent sous forme d'avertissement. Voir [Vérifier vos sauvegardes](#checking-backups).

## Quand Permafrost refuse

Les erreurs de Permafrost en donnent la raison. Les commandes qui accèdent à vos sauvegardes s'arrêtent avec ce message.

| Vous voyez | Ce que cela signifie |
| --- | --- |
| the Permafrost access key was rejected | La clé est erronée, une clé plus récente l'a remplacée, ou le compte a été fermé. Le message précise lequel. Utilisez votre clé la plus récente, ou obtenez-en une nouvelle |
| uploads are paused | Permafrost n'accepte pas de nouvelles sauvegardes pour le moment. Les restaurations fonctionnent toujours. Le message indique pourquoi, jusqu'à quand et quoi faire |
| your Permafrost storage is full | L'envoi ne tient plus. Le message indique combien vous stockez et quoi faire |

Dans l'assistant, les deux premiers s'affichent sous la forme « Permafrost didn't accept that access key » et « Permafrost won't store backups with that access key », suivis de la même raison.

## Votre propre serveur

Tout le monde peut faire tourner un serveur qui parle l'[API Permafrost](https://github.com/whatithasisandalwayswillbe/frost/blob/main/docs/PERMAFROST.md).

Avant de lancer l'assistant pour la première fois, créez `config.toml` dans le dossier de configuration de frost, indiqué dans [Fichiers et dossiers](#files-and-folders), avec ces réglages. Remplacez l'adresse par celle de votre serveur :

```toml
[storage]
backend = "permafrost"

[storage.permafrost]
url = "https://<your-server>"
```

Lancez ensuite `frost init`, choisissez Permafrost, collez votre clé d'accès, choisissez vos dossiers et enregistrez. L'assistant crée le dépôt si le serveur est vide.

Si frost est déjà configuré, utilisez `frost config edit` pour modifier ensemble le backend et l'adresse du serveur dans le fichier existant. Acceptez l'avertissement si le nouveau serveur est vide, tapez `yes` pour enregistrer, puis relancez `frost init`. `frost config set` refuse une destination vide : il ne peut donc pas préparer un nouveau serveur.

L'adresse doit utiliser `https://`, sauf pour un serveur sur votre propre ordinateur, comme `http://localhost:8080`. Laissez ce réglage vide pour utiliser le serveur Permafrost par défaut, `https://permafrost.wihiaawb.com`.
