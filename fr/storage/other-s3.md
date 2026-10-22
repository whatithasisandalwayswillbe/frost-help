# Autre stockage compatible S3

Utilisez un serveur S3 que vous gérez vous-même, comme Ceph ou SeaweedFS, ou n'importe quel autre service qui parle le protocole S3 sans préréglage dans l'assistant. Il doit prendre en charge les écritures conditionnelles, ce que l'assistant vérifie. Voir [Choisir un stockage](#choosing-storage).

Pour sauvegarder vers une machine à vous sans faire tourner de serveur S3, [Serveur auto-hébergé](#self-hosted) est plus simple. Il suffit de SSH.

## Dans l'assistant

Lancez `frost init`, choisissez **S3-compatible**, puis **Other S3-compatible**.

| L'assistant demande | Réponse |
| --- | --- |
| What is the S3 endpoint? | Le nom d'hôte indiqué dans la documentation de votre serveur ou de votre fournisseur. Un nom d'hôte seul, sans `https://`, signifie HTTPS |
| Which region? | Seulement si votre serveur ou votre fournisseur en demande une. Sinon, laissez vide |
| What is the bucket name? | Son nom, exactement tel que vous l'avez créé. Le bucket doit déjà exister |
| Paste the Access Key ID. | Depuis la console de votre serveur ou de votre fournisseur |
| Paste the Secret Access Key. | Depuis la console de votre serveur ou de votre fournisseur |

frost range vos sauvegardes dans un dossier `frost` du bucket.

## Les serveurs que vous gérez

| Serveur | À savoir |
| --- | --- |
| Ceph | Sa RADOS Gateway prend en charge les écritures conditionnelles. Indiquez à l'assistant l'adresse et le port de la passerelle |
| SeaweedFS | Sa passerelle S3 documente les écritures conditionnelles. Indiquez à l'assistant son adresse, comme `http://<server>:8333` |
| MinIO | Il prend en charge les écritures conditionnelles mais n'est plus maintenu, donc il ne reçoit plus de corrections. Un serveur existant fonctionne toujours s'il passe le test de l'assistant. Indiquez à l'assistant son adresse, comme `https://<server>:9000` |
| Garage | Il ne prend pas en charge les écritures conditionnelles, donc frost ne peut pas l'utiliser |

Créez d'abord le bucket et une clé d'accès avec les outils du serveur.

## Un serveur sans TLS

Pour un serveur sur votre ordinateur ou votre réseau, indiquez l'endpoint avec `http://`, comme `http://localhost:9000`. TLS est alors désactivé pour toutes les requêtes : ne le faites que sur un réseau de confiance. Régler `storage.s3.insecure` sur `true` choisit HTTP si l'endpoint n'indique pas de protocole. Un `https://` ou `http://` explicite est prioritaire.

## Le dossier dans le bucket

frost range tout dans un dossier du bucket, `frost` par défaut. L'assistant en plein écran ne pose pas la question.

Après avoir terminé la configuration, pour utiliser un autre dossier ou la racine du bucket avant votre première sauvegarde :

1. Lancez `frost config edit` et modifiez `prefix` sous `[storage.s3]`. Laissez-le vide pour la racine du bucket. frost vous avertit qu'il n'y a pas encore de sauvegarde à cet endroit. Tapez `yes` pour enregistrer quand même.
2. Relancez `frost init`. Son écran récapitulatif vous avertit que vous démarrez ainsi un ensemble de sauvegardes séparé. Appuyez sur `[s]` pour continuer.

Si vous avez déjà des sauvegardes, déplacez-les plutôt, comme expliqué dans [Déplacer vos sauvegardes](#moving-backups).
