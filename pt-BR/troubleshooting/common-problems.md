# Problemas comuns

Esta página reúne as mensagens e os problemas mais comuns. Cada título é o que o frost diz ou o que você percebe.

## "frost isn't set up yet, run `frost init`"

O frost não encontra o `config.toml`. Execute `frost init`. Se você usa `--config-dir` ou `FROST_CONFIG_DIR`, confira se apontam para a pasta certa.

## "no key on this machine"

O arquivo da chave está faltando. Se este computador já tem o armazenamento configurado, execute `frost key import` e digite a sua frase de recuperação. Caso contrário, execute `frost init`.

## "a backup or restore is already running"

Outro processo do frost está usando seus backups, normalmente um backup agendado. Espere terminar e tente de novo. Apagar o arquivo de bloqueio do frost não interrompe o outro processo.

## "the key on this machine doesn't match"

O seu armazenamento tem backups feitos com outra chave. Execute `frost key verify` e digite a frase que você anotou para ver de qual chave se trata. Se for a certa, execute `frost key import` com ela.

## O frost não encontra seus backups

Mensagens como "has no frost repository" significam que seus backups não estão onde o frost está procurando. O erro diz onde eles foram abertos pela última vez e como voltar a eles. Veja [Mover seus backups](#moving-backups).

## A configuração não consegue se conectar

A configuração explica o problema e leva você de volta à resposta que mais provavelmente o causou.

| A configuração diz | Confira |
| --- | --- |
| That access key ID wasn't recognised | Se você copiou o ID da chave de acesso inteiro |
| The secret key doesn't match the access key ID | Se você copiou a chave secreta inteira e se ela pertence a esse ID |
| There's no bucket with that name | O nome do bucket, ou crie o bucket antes |
| That key doesn't have the bucket permissions frost needs | Se a chave pode ler, listar, gravar e apagar objetos no bucket |
| The bucket is in a different region | A região ou o endpoint |
| Can't find ... | O endereço e a sua conexão com a internet |
| Nothing answered at that address | O endereço e a porta |
| The server's certificate isn't valid for that address | O endereço, e se o certificado do servidor o cobre |
| the storage didn't answer in time | A sua conexão com a internet; depois, tente de novo |

## "This storage doesn't support conditional writes"

O seu provedor não oferece um recurso de que o frost precisa para evitar que computadores sobrescrevam os registros de backup uns dos outros. Outras chaves ou configurações não resolvem. Escolha outro provedor. Veja [Escolher o armazenamento](#choosing-storage).

## "the Permafrost access key was rejected"

A chave pode estar errada ou ter expirado. Execute `frost init` e configure o armazenamento de novo para conseguir uma chave que funcione. Veja [Permafrost](#permafrost).

## Um backup não consegue ler uma pasta

No macOS, isso costuma ser uma permissão de privacidade. O erro diz o que você precisa permitir. Veja [Permissões do macOS](#macos-permissions). Em outros sistemas, confira se o seu usuário consegue ler a pasta.

## Arquivos listados como "couldn't be read"

O frost pulou esses arquivos e salvou o resto. As causas comuns são arquivos que você não tem permissão para ler, arquivos apagados durante o backup e, no macOS, arquivos que o iCloud mantém só na nuvem.

## Arquivos que "kept changing while they were read"

Um programa estava gravando nesses arquivos durante o backup, então o snapshot manteve a cópia anterior. Feche o programa e faça o backup de novo, ou deixe o próximo backup pegar os arquivos.

## Uma pasta aparece como "not found"

Uma pasta da sua lista não estava lá, então o frost fez backup do resto. Conecte o disco de novo ou, se a pasta mudou de lugar, atualize a lista com `frost init`.

## "scheduled job is missing"

A tarefa agendada foi apagada ou desligada. Recrie a tarefa com `frost config set schedule.enabled true`.

## Os backups agendados não rodam

- Confira a linha "next backup" do `frost status`.
- No macOS, confira o botão do frost em Ajustes do Sistema > Geral > Itens de Início e Extensões (System Settings > General > Login Items & Extensions). Ele aparece como Node.js Foundation.
- No Windows, os backups agendados não rodam na bateria.
- Com o cron ou o Agendador de Tarefas, um backup que deveria rodar com o computador desligado ou em repouso é pulado.
- Leia o log. Veja [Backups automáticos](#scheduling).

## "verification failed"

Uma verificação por amostragem encontrou dados faltando ou danificados no seu armazenamento. Veja [Verificar seus backups](#checking-backups).

## "can't restore beside the originals"

A pasta ao lado dos originais não pode ser usada, muitas vezes porque o snapshot veio de outro computador. Use `--to <dir>` em vez disso. Veja [Restaurar arquivos](#restoring).

## "can't overwrite the originals"

O snapshot veio de outro tipo de computador, ou o caminho até os originais passa por um link em que o frost não confia. Use `--beside` ou `--to <dir>` em vez disso.

## O frost não encontra o snapshot que você pediu

| O frost diz | Tente |
| --- | --- |
| no snapshot at or before ... | Uma data mais recente. A mensagem mostra o seu snapshot mais antigo |
| "maple" matches 2 snapshots, use more of the ID | Mais caracteres do ID, como `maple-absurd` |
| can't read "..." as a snapshot ID or time | Aspas em volta de datas com espaços, como `"3 days ago"` |

## O frost não consegue se atualizar

O frost foi instalado por um gerenciador de pacotes, a pasta dele não permite gravação ou ele foi compilado a partir do código-fonte. Veja [Atualizar o frost](#updating).

## O instalador para

| O instalador diz | O que fazer |
| --- | --- |
| need OpenSSH 8.1+ to verify the frost release signature | Instale ou atualize o OpenSSH. No Windows, o Git for Windows já o inclui |
| checksums.txt isn't signed by the frost release key. Don't install this. | Não instale. Tente mais tarde e [relate o problema](#getting-help) se continuar acontecendo |
| checksum mismatch | O download veio danificado. Execute o instalador de novo |
| 32-bit ARM isn't supported by the bundled runtime | Não existe pacote do frost para este computador |
