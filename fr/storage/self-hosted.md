# Serveur auto-hébergé

Sauvegardez vers un dossier sur un ordinateur que vous gérez, par SSH. Cela peut être un serveur Linux, un NAS, un Raspberry Pi, un VPS, ou un Mac ou un PC Windows dont le serveur SSH est activé. Frost utilise le client SSH que votre ordinateur possède déjà : il n'y a rien à installer sur le serveur.

## Avant de commencer

- SSH et SFTP doivent être activés sur le serveur. La plupart des serveurs Linux ont les deux. Sur un NAS, cherchez-les dans les réglages du terminal ou des services de fichiers.
- Il vous faut un compte sur le serveur qui peut écrire dans le dossier que vous allez utiliser. Un compte réservé aux sauvegardes est une bonne idée.
- Sous Windows, le client OpenSSH doit être installé. Il l'est en général. Sinon, ajoutez-le dans Paramètres, sous Système > Fonctionnalités facultatives.

## Dans l'assistant

Lancez `frost init` et choisissez **Self-hosted**.

| L'assistant demande | Réponse |
| --- | --- |
| What is the server SSH address? | Un utilisateur et un hôte, comme `me@nas.local`, ou un `Host` de votre configuration SSH. Ajoutez `:2222` pour un autre port |
| Which folder on the server? | `frost` par défaut, qui se trouve dans votre dossier personnel sur le serveur. Un chemin complet comme `/srv/backups/frost` fonctionne aussi |

L'assistant crée la dernière partie du dossier si elle manque. Le dossier qui la contient doit déjà exister.

## La clé SSH de Frost

Frost fournit sa propre clé SSH, que l'assistant crée la première fois. Il n'a pas besoin de vos clés personnelles ni de votre agent SSH, et ne demande jamais de mot de passe, si bien que les sauvegardes planifiées se connectent toujours de la même façon.

Le serveur ne connaît pas encore la clé de Frost, donc la première fois, l'assistant vous demande comment l'ajouter :

- **Add it for me** (l'ajouter pour moi) passe le terminal à ssh. À la première connexion à un serveur, ssh affiche son empreinte et vous demande si vous lui faites confiance. Il demande ensuite votre mot de passe sur le serveur, ajoute la clé de Frost, puis l'assistant reprend. Votre mot de passe ne va qu'à ssh. Frost ne le voit jamais et ne le garde pas.
- **I'll add it myself** (je l'ajoute moi-même) indique où se trouve le fichier de clé publique de Frost. Ajoutez la ligne de ce fichier à `~/.ssh/authorized_keys` sur le serveur, puis appuyez sur `[enter]`.

| Ordinateur | Clé publique de Frost |
| --- | --- |
| macOS et Linux | `~/.config/frost/ssh/frost_ed25519.pub` |
| Windows | `%AppData%\frost\ssh\frost_ed25519.pub` |

Quand l'assistant ajoute la clé pour vous, sa ligne commence par `restrict`. Cela désactive la redirection de connexions et l'allocation d'un terminal, tout en permettant à Frost de lire et d'écrire des fichiers. Les commandes shell restent possibles à moins que le serveur ne limite le compte à SFTP.

### Ajouter la clé vous-même

Sous macOS ou Linux, cette commande ajoute la clé précédée de `restrict`, en demandant votre mot de passe sur le serveur :

```sh
(printf 'restrict '; cat ~/.config/frost/ssh/frost_ed25519.pub) | ssh me@nas.local 'umask 077; mkdir -p .ssh; cat >> .ssh/authorized_keys'
```

Certains NAS permettent aussi de coller une clé SSH dans les réglages de votre compte.

Un serveur Windows range les clés ailleurs, donc **Add it for me** n'y fonctionne pas. Ajoutez la ligne à `C:\Users\<you>\.ssh\authorized_keys` pour un compte standard, ou à `C:\ProgramData\ssh\administrators_authorized_keys` pour un administrateur.

## Ports et configuration SSH

Frost lit votre configuration SSH, `~/.ssh/config`, comme ssh. Une entrée `Host` peut définir l'utilisateur, le port et d'autres options, et vous pouvez saisir son nom comme adresse. Frost fournit sa propre clé, mais les clés indiquées explicitement par `IdentityFile` dans votre configuration SSH peuvent aussi être proposées.

## Bon à savoir

- Le système de fichiers du serveur doit gérer les liens physiques, avec lesquels Frost s'assure que deux ordinateurs n'écrasent jamais les registres de sauvegarde l'un de l'autre. ext4, Btrfs, XFS, ZFS, APFS et NTFS les gèrent tous. L'assistant le vérifie à la connexion.
- Si la clé d'hôte du serveur change, Frost refuse de se connecter, comme ssh. Si vous avez réinstallé le serveur, supprimez son ancienne clé avec `ssh-keygen -R <host>`, puis relancez `frost init`.
- `frost status` indique à quel point le disque du serveur est plein, et `frost backup` vous avertit quand il est presque plein.
- Si le dossier se trouve sur un disque que le serveur monte, ce disque doit être monté pendant les sauvegardes. Si le dossier n'est pas là, la sauvegarde échoue au lieu d'écrire ailleurs.
