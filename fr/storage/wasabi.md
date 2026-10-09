# Wasabi

Sauvegardez vers un bucket Wasabi.

> La documentation de Wasabi ne permet pas d'affirmer qu'il prend en charge les écritures conditionnelles dont frost a besoin. L'assistant le vérifie à la connexion. Si le test échoue, choisissez un autre fournisseur. Voir [Choisir un stockage](#choosing-storage).

## Avant de commencer

1. Créez un bucket dans la console Wasabi et notez sa région, comme `us-east-1` ou `eu-central-1`.
2. Créez une clé d'accès : Access Keys > Create New Access Key. Si possible, utilisez un utilisateur qui n'a accès qu'à ce bucket.

## Dans l'assistant

Lancez `frost init` et choisissez **Wasabi**.

| L'assistant demande | Réponse |
| --- | --- |
| Which region is the bucket in? | La région du bucket, comme `us-east-1` |
| What's the bucket called? | Son nom, exactement tel que vous l'avez créé |
| Paste the access key. | La clé d'accès que vous avez créée |
| Paste the secret key. | Affichée une seule fois, à la création de la clé |

frost se connecte à `s3.<region>.wasabisys.com` et range vos sauvegardes dans un dossier `frost` du bucket.

## Bon à savoir

N'ajoutez pas de règle de cycle de vie qui supprime des objets du dossier de frost. Les instantanés partagent leurs blocs, et retirer un seul objet peut en abîmer beaucoup.
