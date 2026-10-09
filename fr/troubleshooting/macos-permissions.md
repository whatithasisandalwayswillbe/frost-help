# Autorisations macOS

macOS protège certains dossiers, comme Bureau, Documents et Téléchargements, ainsi que les données d'apps comme Mail et Safari. Un programme a besoin de votre autorisation avant de pouvoir les lire.

## Les sauvegardes que vous lancez vous-même

Quand vous lancez `frost backup` dans un terminal, macOS vous interroge au sujet de votre app de terminal, comme Terminal, iTerm, Visual Studio Code, Warp ou Ghostty. Autorisez-la, et frost pourra lire ces dossiers.

## Les sauvegardes planifiées

Les sauvegardes planifiées lancent l'environnement d'exécution fourni avec frost, que macOS considère comme un programme à part entière :

```text
~/Library/Application Support/frost/app/runtime/bin/node
```

macOS vous interroge à son sujet la première fois qu'il lit `~/Desktop`, `~/Documents` ou `~/Downloads`. Il lui refuse l'accès aux autres dossiers protégés, comme `~/Library/Mail` et `~/Library/Safari`, sans rien demander.

## Accès complet au disque

Pour que frost puisse lire tous les dossiers que vous sauvegardez, donnez-lui l'accès complet au disque :

1. Ouvrez Réglages Système > Confidentialité et sécurité > Accès complet au disque (System Settings > Privacy & Security > Full Disk Access).
2. Cliquez sur le bouton d'ajout, appuyez sur `Cmd+Shift+G` et collez le chemin de l'environnement d'exécution indiqué plus haut.
3. Sélectionnez `node`, cliquez sur Ouvrir, puis vérifiez que son interrupteur est activé.
4. Faites de même pour votre app de terminal, pour les sauvegardes que vous lancez vous-même.

L'autorisation est conservée lors des mises à jour de frost.

Quand macOS bloque une sauvegarde, l'erreur de frost indique quelle app ou quel fichier autoriser.

## iCloud Drive

frost ne télécharge pas les fichiers qu'iCloud conserve uniquement en ligne : une sauvegarde ne remplit donc jamais votre disque et n'attend jamais de téléchargement. Ces fichiers sont ignorés et listés. Pour les sauvegarder, demandez au Finder de les garder téléchargés sur ce Mac.

## Ouverture

La tâche planifiée de frost apparaît dans Réglages Système > Général > Ouverture et extensions (System Settings > General > Login Items & Extensions) sous le nom **Node.js Foundation**, l'éditeur de l'environnement d'exécution fourni avec frost. Laissez-la activée. Voir [Sauvegardes automatiques](#scheduling).
