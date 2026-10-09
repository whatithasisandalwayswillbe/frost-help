# Désinstaller frost

frost n'a pas de commande de désinstallation, mais le retirer ne prend que quelques étapes.

> Désinstaller frost ne supprime pas vos sauvegardes. Si vous risquez d'en avoir besoin un jour, assurez-vous d'avoir votre phrase de récupération avant de supprimer la clé de cet ordinateur. `frost key show` l'affiche.

## 1. Retirez la tâche planifiée

```sh
frost config set schedule.enabled false
```

Cette commande retire la tâche du planificateur de votre système. Sous Linux avec systemd, elle désactive aussi lingering si frost a enregistré qu'il l'avait activé.

## 2. Supprimez les fichiers de frost

Cette étape supprime l'application, son lanceur, vos réglages, votre clé et le cache de frost. Si vous avez changé un emplacement, adaptez les chemins ci-dessous pour viser les fichiers et dossiers propres à frost. `FROST_CONFIG_DIR` et `FROST_CACHE_DIR` désignent directement les dossiers de frost ; `XDG_CONFIG_HOME`, `XDG_CACHE_HOME` et `XDG_DATA_HOME` contiennent un sous-dossier `frost`. Ne supprimez jamais un dossier racine XDG ni un dossier partagé. [Fichiers et dossiers](#files-and-folders) liste tous les emplacements.

Sous macOS :

```sh
rm -rf ~/Library/Application\ Support/frost ~/.config/frost ~/.cache/frost
rm -f /usr/local/bin/frost ~/.local/bin/frost
```

Sous Linux :

```sh
rm -rf ~/.local/share/frost ~/.config/frost ~/.cache/frost
rm -f /usr/local/bin/frost ~/.local/bin/frost
```

Sous Windows, dans PowerShell :

```powershell
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\frost", "$env:APPDATA\frost"
Remove-Item -Force "$HOME\bin\frost", "$HOME\bin\frost.cmd"
```

Si vous avez installé le lanceur ailleurs, supprimez-le à cet endroit.

## 3. Supprimez vos sauvegardes, si vous le souhaitez

Vos sauvegardes restent dans votre stockage tant que vous ne les supprimez pas. Avec un fournisseur S3, elles sont dans un dossier de votre bucket, `frost` sauf si vous en avez choisi un autre. Supprimez ce dossier pour les effacer. Sans votre phrase de récupération, personne ne peut lire ce qui y reste.
