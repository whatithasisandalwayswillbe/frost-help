# Choisir un stockage

frost peut ranger vos sauvegardes sur votre propre serveur, sur un disque, sur Permafrost ou chez un service compatible S3. Où qu'elles aillent, tout est d'abord chiffré sur votre ordinateur, donc la personne qui gère le stockage ne peut pas lire vos fichiers.

## Vos options

| Stockage | Idéal pour | Ce qu'il vous faut |
| --- | --- | --- |
| [Serveur auto-hébergé](#self-hosted) | Un NAS, un serveur à la maison ou un VPS que vous gérez | Un accès SSH |
| [Disque local](#local-drive) | Un disque USB ou un second disque | Un disque branché pendant les sauvegardes |
| [Permafrost](#permafrost) | Un stockage hébergé conçu pour frost | Une clé d'accès |
| [Fournisseurs cloud](#cloud-providers) | Amazon S3, Cloudflare R2, Backblaze B2 ou Wasabi | Un bucket et ses clés |
| [Autre stockage compatible S3](#other-s3) | Un serveur S3 que vous gérez, comme Ceph ou SeaweedFS, ou un autre service S3 | Un bucket et ses clés |

Avec un serveur auto-hébergé ou un disque local, vos sauvegardes restent sur du matériel que vous contrôlez, sans compte nulle part. Permafrost et les fournisseurs cloud les gardent hors de chez vous, sans machine à entretenir.

## Écritures conditionnelles

frost a besoin d'un stockage capable de créer un fichier en une seule étape, seulement si son nom est libre. Cela empêche deux ordinateurs d'écraser les registres de sauvegarde l'un de l'autre. L'assistant le vérifie à la connexion et refuse un stockage qui échoue. Si le stockage ne le prend pas en charge, ni d'autres clés ni d'autres réglages n'y changeront rien.

| Stockage | Écritures conditionnelles |
| --- | --- |
| Serveur auto-hébergé | Prises en charge par les serveurs OpenSSH, sur des systèmes de fichiers avec liens physiques, comme ext4, Btrfs, XFS, ZFS, APFS et NTFS |
| Disque local | Prises en charge sur NTFS, APFS, ext4, Btrfs et XFS. Les autres systèmes de fichiers doivent passer le test de l'assistant |
| Permafrost | Prises en charge |
| Amazon S3 | [Documentées](https://docs.aws.amazon.com/AmazonS3/latest/userguide/conditional-writes.html) |
| Cloudflare R2 | [Documentées](https://developers.cloudflare.com/r2/api/s3/api/) |
| Ceph | Intégrées au serveur. Votre version doit passer le test de l'assistant |
| SeaweedFS | [Documentées](https://github.com/seaweedfs/seaweedfs/wiki/S3-Conditional-Operations). Votre version doit passer le test de l'assistant |
| MinIO | Intégrées au serveur, qui n'est plus maintenu. Votre version doit passer le test de l'assistant |
| Backblaze B2 | Non vérifiées. Sa [référence d'envoi](https://www.backblaze.com/apidocs/s3-put-object) ne mentionne pas `If-None-Match` |
| Wasabi | Non vérifiées. Sa [référence d'API](https://docs.wasabi.com/apidocs/operations-on-objects) ne permet pas de conclure |
| Garage | Non prises en charge, selon son mainteneur |

Les informations sur les services S3 ont été vérifiées dans la documentation et le code source de chaque projet en octobre 2026, sans tests réels. C'est le test de l'assistant qui tranche.

## Points à considérer

- **Une copie hors de chez vous.** Un disque ou un serveur à la maison peut disparaître dans le même incendie ou le même cambriolage que votre ordinateur. Un serveur situé ailleurs, Permafrost ou un fournisseur cloud, non. Gardez une seconde copie indépendante de tout ce qui est irremplaçable dans un autre lieu.
- **Le coût d'une restauration.** Certains fournisseurs cloud facturent les téléchargements. Une restauration complète télécharge tout, et chaque vérification par échantillonnage télécharge un petit échantillon.
- **Les classes de stockage d'archivage.** frost relit les blocs directement : ne déplacez pas ses objets vers une classe d'archivage qu'il faut décongeler avant de lire.
- **Suppression et expiration.** frost ne supprime jamais vos sauvegardes. N'ajoutez pas de règle de cycle de vie ni de tâche de nettoyage qui supprime ou fait expirer des fichiers de son dossier, car les instantanés partagent leurs blocs.
- **Un accès limité.** Donnez à frost une clé d'accès qui n'atteint que son propre bucket, ou un compte sur le serveur qui ne peut rien modifier d'autre d'important pour vous.

## Changer de stockage plus tard

Vous pouvez déplacer vos sauvegardes vers un autre type de stockage sans tout renvoyer. Voir [Déplacer vos sauvegardes](#moving-backups).
