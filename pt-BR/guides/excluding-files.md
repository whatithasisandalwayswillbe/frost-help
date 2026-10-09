# Excluir arquivos

A sua lista de exclusões deixa arquivos e pastas fora de todos os backups. Nas configurações, ela se chama `exclude`.

## Os padrões iniciais

Uma lista nova traz `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules` e `.cache`. Remova os que você quer incluir no backup.

## Como os padrões funcionam

- **Um nome ou padrão sem barra** corresponde a qualquer arquivo ou pasta com esse nome, em qualquer lugar. `node_modules` deixa de fora todas as pastas `node_modules` e tudo o que há nelas.
- **Um padrão com barra** é um caminho completo. Ele deixa de fora esse caminho e tudo o que está abaixo dele. `~` é a sua pasta pessoal, como em `~/Downloads/Movies`.

Os padrões aceitam estes curingas:

| Curinga | Corresponde a |
| --- | --- |
| `*` | Qualquer quantidade de caracteres, exceto `/` |
| `?` | Um único caractere qualquer, exceto `/` |
| `[abc]` | Um dos caracteres listados. `[a-z]` é um intervalo, e `[^abc]` é qualquer caractere fora da lista |
| `\` | O caractere seguinte, literalmente, então `\*` corresponde a um `*` de verdade |

Os padrões diferenciam maiúsculas de minúsculas, então `*.MOV` não deixa de fora `clip.mov`.

As pastas da sua lista nunca são excluídas em si; só o que está dentro delas.

## Exemplos

| Padrão | Deixa de fora |
| --- | --- |
| `*.iso` | Todas as imagens de disco |
| `.git` | Todas as pastas do Git |
| `Cache*` | Tudo cujo nome começa com `Cache` |
| `~/Library/Caches` | A pasta de cache da sua pasta pessoal no macOS |
| `~/Videos/*.mov` | Os arquivos `.mov` que estão diretamente em `~/Videos`, mas não nas subpastas |

## Mudar a lista

Execute `frost init` e altere a etapa de exclusões, ou use `frost config edit`. Você também pode definir a lista inteira com um único comando, que substitui a lista atual:

```sh
frost config set exclude .DS_Store node_modules '*.tmp' '~/Downloads'
```

Coloque entre aspas os padrões com `*` ou `~`, para que o shell não os expanda antes.

Para deixar algo de fora em um único backup:

```sh
frost backup --exclude '*.iso'
```

Excluir algo não o remove dos snapshots que você já tem.
