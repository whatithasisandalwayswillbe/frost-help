# Choisir un stockage

frost range vos sauvegardes sur Permafrost, ou chez n'importe quel fournisseur compatible S3 qui accepte les écritures conditionnelles. Dans tous les cas, tout est chiffré avant de quitter votre ordinateur : votre fournisseur ne peut rien lire.

## Vos options

- **[Permafrost](#permafrost)** est un stockage hébergé conçu pour frost. Il suffit d'une clé d'accès, sans bucket, région ni endpoint à configurer.
- **Le stockage compatible S3** s'appuie sur un bucket que vous créez chez un fournisseur comme [Amazon S3](#amazon-s3), [Cloudflare R2](#cloudflare-r2), [Backblaze B2](#backblaze-b2) ou [Wasabi](#wasabi), ou sur un serveur que vous gérez vous-même, comme [MinIO](#other-s3).

## Écritures conditionnelles

frost a besoin d'un stockage qui accepte les écritures conditionnelles atomiques (`If-None-Match: *`). Elles empêchent deux ordinateurs d'écraser les registres de sauvegarde l'un de l'autre. L'assistant le vérifie à la connexion et refuse un stockage qui échoue. Si le fournisseur ne les prend pas en charge, ni d'autres clés ni d'autres réglages n'y changeront rien.

| Fournisseur | Écritures conditionnelles |
| --- | --- |
| Permafrost | Prises en charge |
| Amazon S3 | [Documentées](https://docs.aws.amazon.com/AmazonS3/latest/userguide/conditional-writes.html) |
| Cloudflare R2 | [Documentées](https://developers.cloudflare.com/r2/api/s3/api/) |
| MinIO | Intégrées au serveur. Votre version doit passer le test de l'assistant |
| Backblaze B2 | Non vérifiées. Sa [référence d'envoi](https://www.backblaze.com/apidocs/s3-put-object) ne mentionne pas `If-None-Match` |
| Wasabi | Non vérifiées. Sa [référence d'API](https://docs.wasabi.com/apidocs/operations-on-objects) ne permet pas de conclure |
| Garage | Non prises en charge, selon son mainteneur |

Ces informations ont été vérifiées dans la documentation et le code source de chaque fournisseur le 2 octobre 2026, sans tests réels. C'est le test de l'assistant qui tranche.

## Points à considérer

- **Le coût d'une restauration.** Certains fournisseurs facturent les téléchargements. Une restauration complète télécharge tout, et chaque vérification par échantillonnage télécharge un petit échantillon.
- **Les classes de stockage d'archivage.** frost relit les blocs directement : ne déplacez pas ses objets vers une classe d'archivage qu'il faut décongeler avant de lire.
- **Suppression et expiration.** frost ne supprime jamais vos sauvegardes. N'ajoutez pas de règle de cycle de vie qui supprime ou fait expirer des objets de son dossier, car les instantanés partagent leurs blocs.
- **Des clés limitées.** Donnez à frost une clé d'accès qui n'atteint que son propre bucket.

## Changer de stockage plus tard

Vous pouvez déplacer vos sauvegardes chez un autre fournisseur sans tout renvoyer. Voir [Déplacer vos sauvegardes](#moving-backups).
