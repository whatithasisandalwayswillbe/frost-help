# Fazer backup

O `frost backup` faz backup das suas pastas agora. Só é enviado o que mudou desde o último backup.

## Fazer um backup

```sh
frost backup
```

O frost mostra o que mudou, quanto enviou e o resultado da verificação por amostragem:

```text
┌  backup  s3://my-backups/frost/
│
│  changes      3 added, 1 changed
│  files        1,204 (2.1 GB)
│  new data     14.2 MB in 9 chunks (9.8 MB uploaded after compression)
│  verified     ok, 20 random objects re-downloaded and checked
│
└  Saved snapshot maple-absurd-3f1c
```

Um arquivo conta como alterado quando muda o conteúdo, o tamanho, as permissões ou a data de modificação. Mudar só a data de modificação de uma pasta não conta, porque arquivos temporários mexem nela o tempo todo.

Se nada mudou, o frost não salva um snapshot novo:

```text
┌  backup  s3://my-backups/frost/
│
│  files        1,204 (2.1 GB)
│  verified     ok 3h ago, 20 objects checked
│
└  Already backed up. Nothing has changed since snapshot maple-absurd-3f1c, saved 3h ago.
```

Com os backups automáticos ligados, você raramente precisa executar isso. Veja [Backups automáticos](#scheduling).

## Ver uma prévia

```sh
frost backup --dry-run
```

Uma simulação lista cada arquivo com dados novos para enviar e o total, sem enviar nada nem salvar snapshot. `-n` é a forma curta de `--dry-run`.

## Opções

| Opção | O que faz |
| --- | --- |
| `-n`, `--dry-run` | Mostra o que seria enviado, sem enviar nada |
| `--path <dir>` | Faz backup desta pasta em vez das pastas de sempre. Repita para incluir mais pastas |
| `--exclude <pattern>` | Também ignora este padrão, só neste backup. Repita para incluir mais padrões |
| `--no-verify` | Pula a verificação por amostragem depois do backup |

Para mudar quais pastas entram em todos os backups, execute `frost init` de novo ou veja [Configurações](#settings).

## O que entra no backup

O frost faz backup de arquivos comuns, pastas e links simbólicos, com suas permissões e datas de modificação.

- Um link simbólico é salvo como o próprio link, e não como o arquivo para o qual ele aponta.
- Arquivos com links físicos entram no backup, e são restaurados, como arquivos separados.

O frost deixa de fora:

- Tudo o que está na sua lista de exclusões. Veja [Excluir arquivos](#excluding-files).
- Sockets, dispositivos e pipes.
- Donos de arquivo, ACLs e atributos estendidos.
- No macOS, os arquivos que o iCloud mantém só na nuvem. O frost não baixa esses arquivos: ele os pula e os lista.
- Os arquivos `.frost-partial-...` que uma restauração interrompida deixa para trás.

## Quando algo dá errado

| O que acontece | O que o frost faz |
| --- | --- |
| Um arquivo ou uma pasta não pode ser lido, por falta de permissão, por ter sido apagado no meio do backup ou por estar só no iCloud | Pula e lista o item. O snapshot é salvo mesmo assim, e o `frost status` mostra quantos itens foram pulados |
| Uma pasta da sua lista não está lá, como uma pasta em um disco desconectado | Pula a pasta e faz backup do resto. O `frost backup` e o `frost status` dizem qual pasta está faltando |
| Nenhuma das suas pastas está lá, ou uma existe mas não pode ser lida de jeito nenhum | Faz o backup inteiro falhar, para que um backup nunca pareça bem-sucedido sem ter salvado nada |
| Um arquivo muda enquanto o frost o lê, como um banco de dados em uso, o disco de uma máquina virtual ligada ou um download | Lê o arquivo de novo no fim do backup. Se ainda estiver mudando, o snapshot mantém a cópia anterior e o frost lista o arquivo. Um arquivo que nunca foi copiado por inteiro é pulado |

O frost não tira snapshots do sistema de arquivos nem de bancos de dados. Para fazer backup de um arquivo que está sempre em uso, faça com o programa que o usa fechado.

No macOS, algumas pastas precisam da sua permissão antes que o frost possa lê-las. Veja [Permissões do macOS](#macos-permissions).

## A verificação por amostragem

Depois de um backup que salva um snapshot, o frost baixa alguns blocos aleatórios, 20 por padrão, e os confere. Depois de um backup sem nada novo, ele só confere de novo se a última verificação tiver mais de um dia ou tiver encontrado algum problema. Se uma verificação falhar, o backup termina com erro. Veja [Verificar seus backups](#checking-backups).

## Backups interrompidos

Se um backup parar no meio, por causa de uma conexão perdida, de um notebook fechado ou de `Ctrl+C`, nada do que já foi enviado se perde. O frost registra os blocos conforme eles são enviados, e o próximo backup pula esses blocos.

## Um de cada vez

Só um backup ou uma restauração pode rodar por vez. Se outro já estiver rodando, como um backup agendado, o frost mostra "a backup or restore is already running, try again when it's done" (já há um backup ou uma restauração em andamento; tente de novo quando terminar). O navegador de snapshots pode ficar aberto enquanto um backup roda.
