# Backblaze B2

Sauvegardez vers un bucket Backblaze B2, au moyen de son API compatible S3.

> La documentation de Backblaze ne dit pas si B2 prend en charge les écritures conditionnelles dont frost a besoin. L'assistant le vérifie à la connexion. Si le test échoue, choisissez un autre fournisseur. Voir [Choisir un stockage](#choosing-storage).

## Avant de commencer

1. Créez un bucket dans votre compte Backblaze.
2. Notez son endpoint : Buckets > your bucket > Endpoint. Il ressemble à `s3.us-west-004.backblazeb2.com`.
3. Créez une clé d'application : Application Keys > Add a New Application Key. Limitez-la à ce bucket.

## Dans l'assistant

Lancez `frost init` et choisissez **Backblaze B2**.

| L'assistant demande | Réponse |
| --- | --- |
| What's the bucket's endpoint? | L'endpoint indiqué sur la page du bucket, comme `s3.us-west-004.backblazeb2.com` |
| What's the bucket called? | Son nom, exactement tel que vous l'avez créé |
| Paste the application key's keyID. | Le keyID de votre nouvelle clé d'application |
| Paste the applicationKey. | Affichée une seule fois, juste après la création de la clé |

frost déduit la région de l'endpoint et range vos sauvegardes dans un dossier `frost` du bucket.

## Bon à savoir

N'ajoutez pas de règle de cycle de vie qui supprime des objets du dossier de frost. Les instantanés partagent leurs blocs, et retirer un seul objet peut en abîmer beaucoup.
