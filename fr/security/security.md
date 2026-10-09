# Sécurité et confidentialité

frost chiffre vos sauvegardes sur votre ordinateur, avec une clé que vous seul détenez, avant le moindre envoi. Ni votre fournisseur de stockage, ni l'opérateur de Permafrost, ni les auteurs de frost ne peuvent les lire.

## Ce qui est chiffré

frost chiffre tout ce que contiennent vos sauvegardes : le contenu des fichiers, leurs noms, la structure des dossiers et les détails de chaque instantané. frost n'envoie jamais votre clé à un serveur et n'en conserve aucune copie sous séquestre.

| Élément | Comment |
| --- | --- |
| Clé | 256 bits aléatoires, créés sur votre ordinateur par `frost init` |
| Phrase de récupération | La clé elle-même, écrite sous forme de 24 mots BIP39 |
| Chiffrement | XChaCha20-Poly1305, avec un nonce aléatoire neuf pour chaque objet |
| Noms des blocs | HMAC-SHA256 du contenu du bloc, calculé avec votre clé |
| Compression | zstd, avant le chiffrement, seulement quand elle réduit la taille |

## Ce que votre fournisseur peut voir

Votre fournisseur de stockage, qu'il s'agisse d'un hébergeur S3 ou de Permafrost, peut voir :

- Combien d'objets vous avez, leur taille et leur date d'envoi.
- Quels objets sont des blocs, des en-têtes d'instantanés ou des index de listes de fichiers.
- Quand vous sauvegardez et restaurez, et depuis quelle adresse IP.
- La quantité de données nouvelles envoyée à chaque sauvegarde, qui donne une idée de ce qui a changé. Une sauvegarde sans nouveauté n'enregistre pas d'instantané : les nouveaux instantanés révèlent donc quand quelque chose a changé.
- La taille approximative d'un petit fichier une fois compressé, mais pas sa nature ni son nom. Les gros fichiers sont découpés en blocs de tailles variables, et n'apparaissent donc pas comme un seul objet de leur taille.

Il ne peut pas vérifier si vous possédez un fichier connu donné. Les noms des blocs comme les points de découpage dépendent de votre clé.

## Contre quoi frost vous protège

- Votre fournisseur, ou quiconque possède une copie de votre bucket, qui lirait vos fichiers.
- Quelqu'un sur le réseau entre vous et votre stockage. Les connexions passent par TLS, sauf si vous choisissez un endpoint S3 en `http://` ou activez `storage.s3.insecure` pour un endpoint sans protocole indiqué. Permafrost n'autorise `http://` que sur votre propre ordinateur. Réservez le HTTP sans chiffrement aux tests en local. Chaque objet de sauvegarde est authentifié dans tous les cas.
- Les falsifications. Un objet modifié, échangé ou tronqué ne se déchiffre pas, et frost ne l'accepte jamais en silence.
- Une restauration qui écrirait hors du dossier choisi.
- Les téléchargements de frost falsifiés. Chaque version est signée, et l'installateur comme `frost update` vérifient la signature avant toute installation.

## Ce contre quoi il ne peut rien

- **Quelqu'un qui a accès à votre ordinateur.** Le fichier de clé est sur votre ordinateur pour que les sauvegardes planifiées puissent tourner. Quiconque peut le lire, ou lancer des programmes en votre nom, peut lire vos sauvegardes. Utilisez le chiffrement complet du disque et un verrouillage de l'écran.
- **La perte de données dans le stockage.** Votre fournisseur pourrait supprimer ou retenir vos objets. Les vérifications par échantillonnage peuvent le remarquer, mais frost ne peut pas l'empêcher. Gardez une seconde copie indépendante de tout ce que vous ne pouvez pas vous permettre de perdre.
- **Les instantanés masqués.** Un fournisseur pourrait cacher vos instantanés les plus récents et ne servir que les anciens. Un ordinateur qui a déjà vu les plus récents signale leur disparition, mais un nouvel ordinateur ne peut pas s'en rendre compte. Chaque instantané servi reste authentique.
- **Les horaires et les volumes.** Le moment de vos sauvegardes et leur taille restent visibles, comme indiqué plus haut.

## Fichiers sur votre ordinateur

Sous macOS et Linux, frost crée ses fichiers privés avec des autorisations réservées à votre utilisateur. Les autorisations existantes et les journaux créés par le planificateur peuvent être différents. Sous Windows, les fichiers héritent des autorisations de votre profil utilisateur. Gardez la configuration et le cache dans des dossiers que les autres utilisateurs ne peuvent pas lire.

| Fichier | Contenu |
| --- | --- |
| `key` | Votre phrase de récupération, en clair |
| `config.toml` | Vos réglages et les identifiants de votre stockage |
| `manifest-*.jsonl` | Identifiants de blocs, chemins de fichiers, tailles et dates de modification. Il ne quitte jamais votre ordinateur |
| `frost.log` | La sortie des sauvegardes planifiées, y compris les chemins illisibles |

[Fichiers et dossiers](#files-and-folders) indique leur emplacement.

## Recommandations

- Gardez votre phrase de récupération hors ligne, sur papier ou dans un gestionnaire de mots de passe de confiance.
- Lancez `frost key verify` de temps en temps, pour vous assurer que la phrase notée est la bonne.
- Donnez à frost des identifiants de stockage qui n'atteignent que son propre bucket.
- Consultez `frost status` de temps en temps, et examinez sans attendre tout problème d'état.

## Signaler un problème de sécurité

N'ouvrez pas de ticket public. Signalez-le en privé depuis l'[onglet Security](https://github.com/whatithasisandalwayswillbe/frost/security) du dépôt GitHub de frost, avec **Report a vulnerability**. Indiquez ce que vous avez trouvé, comment le reproduire et ce qu'un attaquant pourrait en tirer. Vous aurez une réponse sous une semaine.
