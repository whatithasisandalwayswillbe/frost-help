# Cloudflare R2

Sauvegardez vers un bucket Cloudflare R2. R2 prend en charge les écritures conditionnelles dont frost a besoin.

## Avant de commencer

1. Dans le tableau de bord Cloudflare, créez un bucket R2.
2. Notez votre identifiant de compte. Il figure sur la page de présentation de R2 : 32 lettres et chiffres.
3. Créez un jeton d'API : R2 > Manage R2 API Tokens > Create API token, avec l'autorisation Object Read & Write. Si possible, limitez-le à votre bucket.

## Dans l'assistant

Lancez `frost init` et choisissez **Cloudflare R2**.

| L'assistant demande | Réponse |
| --- | --- |
| What's your Cloudflare account ID? | L'identifiant de 32 caractères de la page de présentation de R2 |
| What's the bucket called? | Son nom, exactement tel que vous l'avez créé |
| Paste the Access Key ID. | L'Access Key ID de votre nouveau jeton d'API |
| Paste the Secret Access Key. | Affichée une seule fois, à côté de l'Access Key ID |

frost se connecte à `<account-id>.r2.cloudflarestorage.com` avec la région `auto` et range vos sauvegardes dans un dossier `frost` du bucket.

## Bon à savoir

N'ajoutez pas de règle de cycle de vie qui supprime ou fait expirer des objets du dossier de frost. Les instantanés partagent leurs blocs, et retirer un seul objet peut en abîmer beaucoup.
