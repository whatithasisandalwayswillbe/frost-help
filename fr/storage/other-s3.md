# Autre stockage compatible S3

Utilisez n'importe quel autre service qui parle le protocole S3, comme MinIO, Ceph ou un fournisseur sans préréglage dans l'assistant. Il doit prendre en charge les écritures conditionnelles. Voir [Choisir un stockage](#choosing-storage).

## Dans l'assistant

Lancez `frost init` et choisissez **Other S3-compatible**.

| L'assistant demande | Réponse |
| --- | --- |
| What's the S3 endpoint? | Le nom d'hôte indiqué dans la documentation de votre fournisseur. Un nom d'hôte seul, sans `https://`, signifie HTTPS |
| Which region? | Seulement si votre fournisseur en demande une. Sinon, laissez vide |
| What's the bucket called? | Son nom, exactement tel que vous l'avez créé. Le bucket doit déjà exister |
| Paste the access key ID. | Depuis la console de votre fournisseur |
| Paste the secret access key. | Depuis la console de votre fournisseur |

frost range vos sauvegardes dans un dossier `frost` du bucket.

## Un serveur sans TLS

Pour un serveur de test sur votre ordinateur ou votre réseau, indiquez l'endpoint avec `http://`, comme `http://localhost:9000`. TLS est alors désactivé pour toutes les requêtes : ne le faites que sur un réseau de confiance. Régler `storage.s3.insecure` sur `true` a le même effet.

## Le dossier dans le bucket

frost range tout dans un dossier du bucket, `frost` par défaut. L'assistant en plein écran ne pose pas la question.

Pour utiliser un autre dossier, ou la racine du bucket, avant votre première sauvegarde :

1. Lancez `frost config edit` et modifiez `prefix` sous `[storage.s3]`. Laissez-le vide pour la racine du bucket. frost vous avertit qu'il n'y a pas encore de sauvegarde à cet endroit. Tapez `yes` pour enregistrer quand même.
2. Relancez `frost init`. Son écran récapitulatif vous avertit que vous démarrez ainsi un ensemble de sauvegardes séparé. Appuyez sur `[s]` pour continuer.

Si vous avez déjà des sauvegardes, déplacez-les plutôt, comme expliqué dans [Déplacer vos sauvegardes](#moving-backups).

## MinIO

Le serveur MinIO prend en charge les écritures conditionnelles, mais votre version doit passer le test de l'assistant. Créez un bucket et une clé d'accès dans la console MinIO, puis indiquez à l'assistant l'adresse et le port de votre serveur MinIO, comme `https://<server>:9000`.
