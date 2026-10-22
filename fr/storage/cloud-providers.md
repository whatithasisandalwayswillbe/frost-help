# Fournisseurs cloud

L'assistant propose des préréglages pour quatre fournisseurs cloud qui parlent le protocole S3. Lancez `frost init`, choisissez **S3-compatible**, puis votre fournisseur. Pour tout autre service S3, ou un serveur S3 que vous gérez vous-même, voir [Autre stockage compatible S3](#other-s3).

Chaque préréglage range vos sauvegardes dans un dossier `frost` du bucket, pour que le bucket puisse contenir autre chose. Donnez à frost une clé qui n'atteint que ce bucket, et n'ajoutez pas de règle de cycle de vie qui supprime, fait expirer ou archive des objets de son dossier. Les instantanés partagent leurs blocs, et retirer un seul objet peut en abîmer beaucoup.

## Amazon S3

S3 prend en charge les écritures conditionnelles dont frost a besoin.

1. Créez un bucket dans la console AWS et notez sa région, comme `us-east-1`.
2. Créez un utilisateur IAM pour frost et créez-lui une clé d'accès : IAM > Users > your user > Security credentials > Create access key.

frost doit pouvoir lire, lister, écrire et supprimer des objets dans le bucket, même si le seul objet qu'il supprime est le petit objet de test que l'assistant crée lors de la connexion. Une stratégie comme celle-ci suffit. Remplacez `my-backups` par le nom de votre bucket :

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::my-backups"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::my-backups/*"
    }
  ]
}
```

| L'assistant demande | Réponse |
| --- | --- |
| Which region hosts the bucket? | La région du bucket, comme `us-east-1` |
| What is the bucket name? | Son nom, exactement tel que vous l'avez créé |
| Paste the Access Key ID. | L'identifiant de clé d'accès IAM |
| Paste the Secret Access Key. | Affichée une seule fois, à côté de l'identifiant, au moment de la création |

frost se connecte à `s3.<region>.amazonaws.com`. Gardez ses objets dans une classe de stockage lisible immédiatement, comme S3 Standard ou S3 Standard-IA, et non Glacier Flexible Retrieval ou Glacier Deep Archive. Le versionnage du bucket n'est pas nécessaire.

## Cloudflare R2

R2 prend en charge les écritures conditionnelles dont frost a besoin.

1. Dans le tableau de bord Cloudflare, créez un bucket R2.
2. Notez votre identifiant de compte. Il figure sur la page de présentation de R2 : 32 lettres et chiffres.
3. Créez un jeton d'API : R2 > Manage R2 API Tokens > Create API token, avec l'autorisation Object Read & Write. Si possible, limitez-le à votre bucket.

| L'assistant demande | Réponse |
| --- | --- |
| What is your Cloudflare Account ID? | L'identifiant de 32 caractères de la page de présentation de R2 |
| What is the bucket name? | Son nom, exactement tel que vous l'avez créé |
| Paste the Access Key ID. | L'Access Key ID de votre nouveau jeton d'API |
| Paste the Secret Access Key. | Affichée une seule fois, à côté de l'Access Key ID |

frost se connecte à `<account-id>.r2.cloudflarestorage.com` avec la région `auto`.

## Backblaze B2

La documentation de Backblaze ne dit pas si B2 prend en charge les écritures conditionnelles dont frost a besoin. L'assistant le vérifie à la connexion. Si le test échoue, choisissez un autre stockage.

1. Créez un bucket dans votre compte Backblaze.
2. Notez son endpoint : Buckets > your bucket > Endpoint. Il ressemble à `s3.us-west-004.backblazeb2.com`.
3. Créez une clé d'application : Application Keys > Add a New Application Key. Limitez-la à ce bucket.

| L'assistant demande | Réponse |
| --- | --- |
| What is the bucket endpoint? | L'endpoint indiqué sur la page du bucket, comme `s3.us-west-004.backblazeb2.com` |
| What is the bucket name? | Son nom, exactement tel que vous l'avez créé |
| Paste the application key's keyID. | Le keyID de votre nouvelle clé d'application |
| Paste the applicationKey. | Affichée une seule fois, juste après la création de la clé |

frost déduit la région de l'endpoint.

## Wasabi

La documentation de Wasabi ne permet pas d'affirmer qu'il prend en charge les écritures conditionnelles dont frost a besoin. L'assistant le vérifie à la connexion. Si le test échoue, choisissez un autre stockage.

1. Créez un bucket dans la console Wasabi et notez sa région, comme `us-east-1` ou `eu-central-1`.
2. Créez une clé d'accès : Access Keys > Create New Access Key. Si possible, utilisez un utilisateur qui n'a accès qu'à ce bucket.

| L'assistant demande | Réponse |
| --- | --- |
| Which region hosts the bucket? | La région du bucket, comme `us-east-1` |
| What is the bucket name? | Son nom, exactement tel que vous l'avez créé |
| Paste the Access Key. | La clé d'accès que vous avez créée |
| Paste the Secret Key. | Affichée une seule fois, à la création de la clé |

frost se connecte à `s3.<region>.wasabisys.com`.
