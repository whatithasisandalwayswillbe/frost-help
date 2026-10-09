# Permafrost

Permafrost est un stockage hébergé conçu pour frost. Pour vous connecter, une seule clé d'accès suffit, sans bucket, région ni endpoint à configurer.

Vos sauvegardes sont chiffrées sur votre ordinateur avant l'envoi, comme avec n'importe quel autre stockage. Permafrost ne peut pas les lire.

## Obtenir une clé

1. Lancez `frost init` et choisissez **Permafrost**.
2. Choisissez **I don't have a key yet** (je n'ai pas encore de clé). frost ouvre dans votre navigateur une page où vous pouvez en obtenir une.
3. Une fois votre clé obtenue, la page la renvoie à frost, qui l'enregistre aussitôt. Même si vous quittez l'assistant ensuite, elle n'est pas perdue.

Si le navigateur ne s'ouvre pas, rendez-vous vous-même sur [getfro.st/perma](https://getfro.st/perma), puis appuyez sur `[p]` dans l'assistant pour coller la clé obtenue. Si l'obtention de la clé n'aboutit pas, appuyez sur `[r]` pour réessayer ou sur `[p]` pour coller une clé. frost patiente jusqu'à 25 minutes.

Si vous avez déjà une clé, choisissez **I have a key** (j'ai une clé) et collez-la.

## Comment la clé parvient à frost

Pendant l'attente, frost écoute sur `127.0.0.1`, une adresse que seul votre ordinateur peut joindre. Il transmet à la page une valeur aléatoire et n'accepte qu'une clé qui revient avec cette même valeur : aucune autre page ne peut donc lui glisser une clé à elle.

La page vous affiche aussi la clé, pour que vous puissiez la copier vous-même dans frost, par exemple quand le navigateur est sur un autre ordinateur.

## Clés refusées

Si Permafrost cesse d'accepter votre clé d'accès, les commandes qui accèdent à vos sauvegardes s'arrêtent avec une erreur qui l'explique. Lancez `frost init` et configurez à nouveau le stockage pour obtenir une clé qui fonctionne.

| L'assistant affiche | Que faire |
| --- | --- |
| Permafrost didn't accept that access key | Vérifiez que vous l'avez copiée en entier. Elle a peut-être aussi expiré |
| That access key can't store backups | Vérifiez ses autorisations dans votre compte Permafrost |
| your Permafrost storage is full | Votre compte n'a plus d'espace libre. Consultez votre compte Permafrost |

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

L'adresse doit utiliser `https://`, sauf pour un serveur sur votre propre ordinateur, comme `http://localhost:8080`. Laissez ce réglage vide pour utiliser le serveur Permafrost par défaut.
