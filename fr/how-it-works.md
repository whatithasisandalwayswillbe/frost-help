# Fonctionnement de frost

frost prend des instantanés de vos dossiers, découpe vos fichiers en blocs chiffrés et n'envoie que les blocs que votre stockage n'a pas encore.

## En bref

1. **Parcours.** frost parcourt vos dossiers et ignore tout ce qui figure dans votre liste d'exclusions. Les fichiers dont la taille et la date de modification n'ont pas changé depuis la dernière sauvegarde ne sont pas relus.
2. **Découpage.** Les fichiers modifiés sont découpés en blocs d'environ 1 Mio, à des endroits qui dépendent de leur contenu. Une modification au milieu d'un gros fichier ne touche que les blocs qui l'entourent.
3. **Chiffrement.** Chaque nouveau bloc est compressé quand cela le rend plus petit, puis chiffré avec votre clé.
4. **Envoi.** Seuls les blocs absents du stockage sont envoyés.
5. **Instantané.** frost enregistre la liste des fichiers, et les blocs qui composent chacun d'eux, sous forme d'un nouvel instantané.
6. **Vérification.** frost télécharge un échantillon aléatoire de blocs et les contrôle.

## Les instantanés

Un instantané est un relevé de vos dossiers au moment où la sauvegarde s'est faite : chaque fichier et chaque dossier, avec son contenu, ses permissions et sa date de modification. Chaque instantané est complet à lui seul, vous pouvez donc restaurer n'importe lequel sans les autres.

Les instantanés partagent leurs blocs. Un fichier inchangé depuis un an n'est stocké qu'une fois, quel que soit le nombre d'instantanés qui le contiennent. Conserver beaucoup d'instantanés prend donc peu de place en plus.

Si rien n'a changé depuis la dernière sauvegarde, frost n'enregistre pas de nouvel instantané. Il vous indique que vos dossiers sont déjà sauvegardés.

Les identifiants d'instantané ressemblent à `maple-absurd-3f1c` : deux mots et quatre caractères. [Restaurer des fichiers](#restoring) explique comment choisir un instantané par son identifiant ou par sa date.

> frost ne sait pas encore supprimer les anciens instantanés : tous restent dans le stockage. Ne supprimez pas à la main d'objets du dossier de frost dans votre stockage, et n'ajoutez pas de règle qui les fait expirer. Les instantanés partagent leurs blocs, et retirer un seul objet peut en abîmer beaucoup.

## Votre clé

`frost init` crée sur votre ordinateur une clé aléatoire de 256 bits et vous la présente sous forme d'une phrase de récupération de 24 mots. La clé ne quitte jamais votre ordinateur. Tout ce que frost envoie est d'abord chiffré avec elle, y compris les noms de fichiers et la structure des dossiers.

Quiconque possède la phrase et un accès à votre stockage peut lire vos sauvegardes. Sans la phrase, personne ne le peut. Voir [Votre phrase de récupération](#recovery-phrase).

## Le dépôt

frost range vos sauvegardes dans un seul dossier de votre stockage, appelé dépôt. Il contient quatre types d'objets :

| Objet | Contenu |
| --- | --- |
| `frost.repo` | L'identifiant du dépôt et la version de son format |
| `chunks/` | Les données et les listes de vos fichiers, chiffrées |
| `snapshots/` | Un petit en-tête chiffré par instantané : sa date, l'ordinateur et les dossiers concernés |
| `trees/` | Les blocs qui contiennent la liste de fichiers de chaque instantané |

Les noms des objets sont des identifiants d'apparence aléatoire, votre fournisseur ne voit donc jamais vos noms de fichiers. [Sécurité et confidentialité](#security) détaille ce qu'un fournisseur peut voir.

## Le cache local

frost tient à jour, dans un dossier de cache sur votre ordinateur, la liste de ce qu'il a déjà envoyé, pour ne pas avoir à lister tout votre stockage à chaque sauvegarde. Il compare cette liste avec le stockage une fois par semaine.

Le cache est jetable. S'il disparaît, la sauvegarde suivante le reconstruit à partir du stockage et relit vos fichiers. Les restaurations n'en ont pas besoin du tout.

## Pas de service en arrière-plan

frost ne tourne pas en arrière-plan. Les sauvegardes automatiques sont de simples tâches du planificateur de votre système (launchd, systemd, cron ou le Planificateur de tâches), qui lancent frost, font une sauvegarde et s'arrêtent. Voir [Sauvegardes automatiques](#scheduling).

## Il se vérifie lui-même

Après chaque sauvegarde qui enregistre un instantané, frost télécharge un échantillon aléatoire de blocs et vérifie que chacun se déchiffre et correspond à son identifiant. Une sauvegarde sans nouveauté refait la vérification quand la précédente date de plus d'un jour. Voir [Vérifier vos sauvegardes](#checking-backups).
