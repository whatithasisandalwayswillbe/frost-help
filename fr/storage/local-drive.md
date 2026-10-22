# Disque local

Sauvegardez vers un dossier sur un disque : un disque USB externe, un second disque interne ou un disque dans une station d'accueil. Tout est chiffré comme avec n'importe quel autre stockage, donc un disque perdu ne livre pas vos fichiers.

## Dans l'assistant

Lancez `frost init`, choisissez **Local drive** et saisissez le chemin complet d'un dossier sur un disque branché.

| Système | Exemple |
| --- | --- |
| macOS | `/Volumes/Backup/frost` |
| Linux | `/mnt/backup/frost` ou `/media/<you>/Backup/frost` |
| Windows | `E:\frost` |

L'assistant crée le dernier dossier du chemin s'il manque. Le dossier qui le contient, en général le disque lui-même, doit être là.

## Quand le disque n'est pas branché

Frost ne crée le dossier que pendant la configuration. Si le disque n'est pas branché au moment d'une sauvegarde, le dossier manque et la sauvegarde échoue avec un message vous invitant à brancher le disque. Frost n'écrit jamais vos sauvegardes dans ce qui se trouverait d'autre à cet emplacement. Une sauvegarde planifiée attend d'abord le disque environ 5 minutes, au cas où il serait en train d'être monté.

Sous Windows, un disque peut changer de lettre quand vous le rebranchez. Rendez-lui son ancienne lettre dans la Gestion des disques, ou lancez `frost init` et saisissez le nouveau chemin.

## Une copie ailleurs

Un disque posé à côté de votre ordinateur peut être perdu, volé ou endommagé en même temps que lui. Gardez une autre copie de tout ce qui est irremplaçable ailleurs, par exemple sur un disque rangé hors de chez vous ou sur un [serveur auto-hébergé](#self-hosted) situé ailleurs. [Déplacer vos sauvegardes](#moving-backups) explique comment copier un dépôt.

## Partages réseau

Pour un NAS, [Serveur auto-hébergé](#self-hosted) est en général le meilleur choix. Un partage réseau monté sur votre ordinateur ne fonctionne que si son système de fichiers peut créer des fichiers en toute sécurité, ce que l'assistant vérifie à la connexion. Sous Windows, utilisez le chemin `\\server\share` du partage plutôt qu'une lettre de lecteur réseau, car les sauvegardes planifiées peuvent ne pas voir les lettres de lecteur réseau.

## Bon à savoir

- Frost ne suit pas les liens ni les jonctions à l'intérieur du dossier. Sous Windows, il refuse aussi un dossier atteint par l'un d'eux. Utilisez le vrai chemin du dossier.
- Sous macOS, les sauvegardes planifiées ont besoin d'une autorisation pour utiliser les disques amovibles et les volumes réseau. Voir [Autorisations macOS](#macos-permissions).
- `frost status` indique à quel point le disque est plein, et `frost backup` vous avertit quand il est presque plein.
- Les disques formatés en NTFS, APFS, ext4, Btrfs ou XFS fonctionnent. Les disques exFAT et FAT fonctionnent s'ils passent le test de l'assistant.
