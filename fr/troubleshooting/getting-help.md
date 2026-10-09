# Obtenir de l'aide

Si votre problème n'est pas traité dans cette documentation, voici comment en savoir plus et demander de l'aide.

## Avant tout

- `frost status` affiche le résultat de la dernière sauvegarde, l'état de vos sauvegardes et tout problème d'accès à votre stockage.
- `frost -h` liste toutes les commandes et options.
- Le journal des sauvegardes planifiées montre ce qui s'est passé pendant les sauvegardes automatiques. Voir [Sauvegardes automatiques](#scheduling).
- [Problèmes courants](#common-problems) rassemble les messages les plus fréquents.

## Demander sur GitHub

Ouvrez un ticket sur [github.com/whatithasisandalwayswillbe/frost/issues](https://github.com/whatithasisandalwayswillbe/frost/issues), en indiquant :

- Votre version de frost, donnée par `frost --version`, et votre système d'exploitation.
- Ce que vous avez lancé, et ce que vous attendiez.
- Ce qui s'est passé à la place, avec le message exact.
- Les lignes utiles de `frost status` ou du journal.

> Ne publiez jamais votre phrase de récupération, votre fichier de clé, vos clés d'accès ni un `config.toml` contenant des identifiants. `frost config` masque les identifiants, sauf si vous ajoutez `--show-secrets`. Relisez tout ce que vous collez avant de publier.

## Problèmes de sécurité

Ne signalez pas un problème de sécurité dans un ticket public. Voir [Sécurité et confidentialité](#security) pour le signaler en privé.
