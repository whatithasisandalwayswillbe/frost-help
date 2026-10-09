# Installer frost

frost s'installe en une seule commande sous macOS, Linux et Windows. Chaque version embarque son propre environnement d'exécution : rien d'autre à installer avant.

## Systèmes pris en charge

| Système | Processeurs |
| --- | --- |
| macOS | Apple silicon (`arm64`) et Intel (`amd64`) |
| Linux | `amd64` et `arm64` |
| Windows | `amd64` et `arm64` |

Il n'existe pas de paquet pour l'ARM 32 bits, comme les anciens systèmes Raspberry Pi. Sous Windows, WSL installe le paquet Linux.

## L'installateur

Sous macOS ou Linux, lancez cette commande dans un terminal. Sous Windows, lancez-la dans Git Bash.

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | sh
```

L'installateur :

1. Télécharge la dernière version pour votre système.
2. Vérifie la signature de la version et la somme de contrôle du téléchargement, et s'arrête si l'une des deux ne correspond pas.
3. Installe frost dans votre profil utilisateur et place un lanceur `frost` dans un dossier de votre `PATH`.

Il lui faut `curl` ou `wget`, `ssh-keygen` d'OpenSSH 8.1 ou plus récent, et `sha256sum` ou `shasum` pour les vérifications. L'extraction utilise `tar` sous macOS et Linux, et `unzip` ou PowerShell sous Windows. Git Bash fournit `cygpath`, dont l'installateur Windows a aussi besoin.

Le lanceur va dans `/usr/local/bin` si vous pouvez y écrire, sinon dans `~/.local/bin`. Sous Windows, il va dans `~/bin`. Si ce dossier n'est pas encore dans votre `PATH`, l'installateur affiche la ligne qui l'ajoute.

Une fois terminé, lancez `frost init` pour configurer votre première sauvegarde. Voir [Configurer frost](#setting-up).

## Options de l'installateur

| Variable | Effet |
| --- | --- |
| `FROST_INSTALL_DIR` | Place le lanceur dans ce dossier |
| `FROST_VERSION` | Installe cette version, comme `v0.1.0`, au lieu de la dernière |

Par exemple :

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | FROST_INSTALL_DIR="$HOME/bin" sh
```

Changer le dossier du lanceur ne déplace pas frost lui-même. [Fichiers et dossiers](#files-and-folders) indique où va chaque élément.

## Installer à la main

1. Téléchargez l'archive pour votre système depuis la [dernière version](https://github.com/whatithasisandalwayswillbe/frost/releases/latest). Les noms ressemblent à `frost_0.1.0_linux_amd64.tar.gz`, avec `.zip` sous Windows.
2. Vérifiez le téléchargement avant d'en exécuter quoi que ce soit, comme expliqué plus bas dans « Vérifier un téléchargement ».
3. Extrayez-la dans un nouveau dossier vide.
4. Dans le dossier extrait, lancez l'installateur fourni en lui indiquant le dossier du lanceur.

Sous macOS ou Linux :

```sh
./runtime/bin/node install.mjs "$PWD" "$HOME/.local/bin"
```

Sous Windows, dans PowerShell :

```powershell
.\runtime\bin\node.exe .\install.mjs "$PWD" "$env:LOCALAPPDATA\frost\bin"
```

Ajoutez ensuite le dossier du lanceur à votre `PATH` s'il n'y est pas déjà. Sous Windows, `frost.cmd` fonctionne dans l'Invite de commandes et PowerShell, et `frost` dans Git Bash.

Pour utiliser un paquet extrait sans l'installer, lancez directement son lanceur `frost` (`frost.cmd` sous Windows) et gardez tous ses fichiers ensemble.

## Vérifier un téléchargement

L'installateur s'en charge pour vous. Pour vérifier une archive vous-même, téléchargez-la avec `checksums.txt` et `checksums.txt.sig` de la même version, ainsi que [`release-signing.pub`](https://github.com/whatithasisandalwayswillbe/frost/blob/main/install/release-signing.pub) depuis le dépôt. Mettez le nom de l'archive dans `archive`, puis lancez :

```sh
(
  set -e
  archive='frost_X.Y.Z_linux_amd64.tar.gz'
  printf 'frost-release %s\n' "$(cat release-signing.pub)" > allowed_signers
  ssh-keygen -Y verify -f allowed_signers -I frost-release -n file -s checksums.txt.sig < checksums.txt
  selected_checksum=$(awk -v archive="$archive" '$2 == archive { line = $0; count++ } END { if (count != 1) exit 1; print line }' checksums.txt)
  printf '%s\n' "$selected_checksum" | shasum -a 256 -c -
)
```

Les commandes s'arrêtent si la signature est incorrecte ou si la liste signée ne contient pas exactement une entrée pour votre archive. La première vérification doit afficher `Good "file" signature`, et la seconde `OK` après le nom de votre archive. Si l'une des deux échoue, ne l'installez pas.
