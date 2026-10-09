# Como o frost funciona

O frost tira snapshots das suas pastas, divide seus arquivos em blocos criptografados e envia só os blocos que o seu armazenamento ainda não tem.

## Em resumo

1. **Varredura.** O frost percorre suas pastas e pula tudo o que está na sua lista de exclusões. Arquivos cujo tamanho e data de modificação não mudaram desde o último backup não são lidos de novo.
2. **Divisão.** Os arquivos alterados são divididos em blocos de cerca de 1 MiB, em pontos definidos pelo conteúdo. Uma alteração no meio de um arquivo grande muda só os blocos ao redor.
3. **Criptografia.** Cada bloco novo é compactado quando isso o deixa menor e depois é criptografado com a sua chave.
4. **Envio.** Só são enviados os blocos que ainda não estão no armazenamento.
5. **Snapshot.** O frost salva a lista de arquivos, e os blocos que formam cada um, como um snapshot novo.
6. **Verificação.** O frost baixa uma amostra aleatória de blocos e confere cada um.

## Snapshots

Um snapshot é um registro das suas pastas no momento em que o backup rodou: cada arquivo e cada pasta, com conteúdo, permissões e data de modificação. Cada snapshot é completo por si só, então você pode restaurar qualquer um sem depender dos outros.

Os snapshots compartilham blocos. Um arquivo que não muda há um ano é guardado uma única vez, não importa em quantos snapshots ele apareça. Por isso, manter muitos snapshots ocupa pouco espaço extra.

Se nada mudou desde o último backup, o frost não salva um snapshot novo. Ele avisa que suas pastas já estão no backup.

Os IDs de snapshot têm este formato: `maple-absurd-3f1c`, duas palavras e mais quatro caracteres. [Restaurar arquivos](#restoring) explica como escolher um snapshot pelo ID ou pela data.

> O frost ainda não consegue apagar snapshots antigos, então todos ficam no armazenamento. Não apague à mão objetos da pasta do frost no seu armazenamento e não crie regras que os façam expirar. Os snapshots compartilham blocos, e remover um único objeto pode estragar muitos snapshots.

## Sua chave

O `frost init` cria uma chave aleatória de 256 bits no seu computador e mostra essa chave como uma frase de recuperação de 24 palavras. A chave nunca sai do seu computador. Tudo o que o frost envia é criptografado com ela antes, inclusive os nomes dos arquivos e a estrutura de pastas.

Quem tiver a frase e acesso ao seu armazenamento consegue ler seus backups. Sem a frase, ninguém consegue. Veja [Sua frase de recuperação](#recovery-phrase).

## O repositório

O frost guarda seus backups em uma única pasta do seu armazenamento, chamada repositório. Ela tem quatro tipos de objeto:

| Objeto | Contém |
| --- | --- |
| `frost.repo` | O ID do repositório e a versão do formato |
| `chunks/` | Os dados e as listas dos seus arquivos, criptografados |
| `snapshots/` | Um pequeno cabeçalho criptografado para cada snapshot: quando foi tirado, em qual computador e de quais pastas |
| `trees/` | Quais blocos guardam a lista de arquivos de cada snapshot |

Os nomes dos objetos são IDs com cara de aleatórios, então o seu provedor nunca vê os nomes dos seus arquivos. [Segurança e privacidade](#security) lista o que um provedor consegue ver.

## O cache local

O frost mantém, em uma pasta de cache no seu computador, um registro do que já enviou, para não precisar listar todo o armazenamento a cada backup. Ele compara esse registro com o armazenamento uma vez por semana.

O cache é descartável. Se ele se perder, o próximo backup o reconstrói a partir do armazenamento e lê seus arquivos de novo. A restauração não precisa dele.

## Sem serviço em segundo plano

O frost não fica rodando em segundo plano. Os backups automáticos são tarefas comuns do agendador do sistema operacional (launchd, systemd, cron ou o Agendador de Tarefas), que iniciam o frost, fazem um backup e terminam. Veja [Backups automáticos](#scheduling).

## Ele se confere

Depois de cada backup que salva um snapshot, o frost baixa uma amostra aleatória de blocos e confere se cada um é descriptografado e corresponde ao seu ID. Um backup sem nada novo repete a verificação quando a anterior tem mais de um dia. Veja [Verificar seus backups](#checking-backups).
