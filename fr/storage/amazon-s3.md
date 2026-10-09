# Amazon S3

Sauvegardez vers un bucket Amazon S3. S3 prend en charge les écritures conditionnelles dont frost a besoin.

## Avant de commencer

1. Créez un bucket dans la console AWS et notez sa région, comme `us-east-1`.
2. Créez un utilisateur IAM pour frost, donnez-lui accès à ce seul bucket et créez-lui une clé d'accès : IAM > Users > your user > Security credentials > Create access key.

frost doit pouvoir lire, lister, écrire et supprimer des objets dans le bucket. Une stratégie comme celle-ci suffit. Remplacez `my-backups` par le nom de votre bucket :

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

Le seul objet que frost supprime est le petit objet de test que l'assistant crée lors de la connexion.

## Dans l'assistant

Lancez `frost init` et choisissez **Amazon S3**.

| L'assistant demande | Réponse |
| --- | --- |
| Which region is the bucket in? | La région du bucket, comme `us-east-1` |
| What's the bucket called? | Son nom, exactement tel que vous l'avez créé |
| Paste the access key ID. | L'identifiant de clé d'accès IAM |
| Paste the secret access key. | Affichée une seule fois, à côté de l'identifiant, au moment de la création |

frost se connecte à `s3.<region>.amazonaws.com` et range vos sauvegardes dans un dossier `frost` du bucket.

## Bon à savoir

- Gardez les objets de frost dans une classe de stockage lisible immédiatement, comme S3 Standard ou S3 Standard-IA. N'ajoutez pas de règle de cycle de vie qui les déplace vers Glacier Flexible Retrieval ou Glacier Deep Archive, ni qui les fait expirer.
- Le versionnage du bucket n'est pas nécessaire.
