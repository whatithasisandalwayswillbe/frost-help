# Problemas comuns

Esta página reúne as mensagens e os problemas mais comuns. Cada título é o que o Frost diz ou o que você percebe.

## "Frost isn't set up yet, run `frost init`"

O Frost não encontra o `config.toml`. Execute `frost init`. Se você usa `--config-dir` ou `FROST_CONFIG_DIR`, confira se apontam para a pasta certa.

## "no key on this machine"

O arquivo da chave está faltando. Se este computador já tem o armazenamento configurado, execute `frost key import` e digite a sua frase de recuperação. Caso contrário, execute `frost init`.

## "a backup or restore operation is already in progress"

Outro processo do Frost está usando seus backups, normalmente um backup agendado. Nesse caso, o Frost mostra "a scheduled backup is already running" e quando ele começou. Espere terminar e tente de novo. Apagar o arquivo de bloqueio do Frost não interrompe o outro processo.

## "the local encryption key does not match"

O seu armazenamento tem backups feitos com outra chave. Execute `frost key verify` e digite a frase que você anotou para ver de qual chave se trata. Se for a certa, execute `frost key import` com ela.

## O Frost não encontra seus backups

Mensagens como "has no Frost repository" significam que seus backups não estão onde o Frost está procurando. O erro diz onde eles foram abertos pela última vez e como voltar a eles. Veja [Mover seus backups](#moving-backups).

Se seus backups sumiram do Permafrost e a sua chave de acesso ainda funciona, o mais provável é que tenham sido apagados com essa chave. Escreva imediatamente para care@getfro.st. Se outra pessoa puder ter a sua chave, consiga uma nova em [getfro.st/perma/recover](https://getfro.st/perma/recover).

## A configuração não consegue se conectar

A configuração explica o problema e leva você de volta à resposta que mais provavelmente o causou.

| A configuração diz | Confira |
| --- | --- |
| Access key ID not recognized | Se você copiou o ID da chave de acesso inteiro |
| The secret key does not match the access key ID | Se você copiou a chave secreta inteira e se ela pertence a esse ID |
| No bucket found with that name | O nome do bucket, ou crie o bucket antes |
| The provided key lacks necessary bucket permissions | Se a chave pode ler, listar, gravar e apagar objetos no bucket |
| The bucket is located in a different region | A região ou o endpoint |
| Cannot resolve ... | O endereço e a sua conexão com a internet |
| No response from that address | O endereço e a porta |
| The server's TLS certificate is not valid for that address | O endereço, e se o certificado do servidor o cobre |
| the storage host timed out | A sua conexão com a internet; depois, tente de novo |
| cannot reach Permafrost | A sua conexão com a internet; depois, tente de novo |
| Cannot locate the server | O endereço SSH e a sua rede |
| The server did not respond | O endereço SSH, e se o servidor está ligado |
| That server does not support SFTP | Se o SFTP está ativado nas configurações de SSH ou de serviços de arquivos do servidor |
| server returned text before opening SFTP subsystem | Se um script de login do servidor, como `.bashrc`, mostra alguma coisa. Faça ele mostrar texto só em shells interativos |
| There's no folder ... on ... | O caminho da pasta. A pasta que a contém precisa existir |
| The server denied write access to that folder | As permissões da pasta para a conta com que o Frost entra |
| ... not found. Connect the required drive and try again | Se o disco está conectado e o caminho está certo |
| Unable to write to that folder | As permissões da pasta. No macOS, veja [Permissões do macOS](#macos-permissions) |
| Symbolic links and directory junctions are not supported for backup folders | Use o caminho real da pasta |
| That drive is read-only | Use um disco em que você possa gravar |

## "This storage provider does not support conditional writes"

O seu armazenamento não oferece um recurso de que o Frost precisa para evitar que computadores sobrescrevam os registros de backup uns dos outros. Outras chaves ou configurações não resolvem. Escolha outro armazenamento. Veja [Escolher o armazenamento](#choosing-storage).

Um servidor próprio ou um disco diz isso de outro jeito. O servidor "cannot create hard links", ou a pasta está "on an unsupported filesystem". Use uma pasta em um sistema de arquivos como ext4, Btrfs, XFS, ZFS, APFS ou NTFS.

## "the server didn't accept Frost's SSH key"

O seu servidor próprio recusou a chave do Frost, por exemplo depois que ela foi removida de `authorized_keys`. Execute `frost init` e adicione a chave de novo. Veja [Servidor próprio](#self-hosted).

## "the server's SSH host key has changed"

O Frost se recusa a conectar quando a identidade do servidor muda, como faz o ssh. Se você reinstalou o servidor ou ele ganhou um endereço novo, remova a chave antiga com `ssh-keygen -R <host>` e execute `frost init` de novo. Caso contrário, descubra por que a chave mudou antes de se conectar.

## "... not found. Connect the required drive and try again"

Seus backups estão em um disco que não está conectado, ou o caminho da pasta mudou. Conecte o disco. Se o Windows deu outra letra a ele, veja [Disco local](#local-drive).

## "the Permafrost access key was rejected"

A mensagem continua com o motivo do Permafrost: a chave está errada, uma chave mais nova a substituiu ou a conta foi encerrada. Use a sua chave mais recente ou consiga uma nova. Veja [Permafrost](#permafrost).

## "uploads are paused"

O Permafrost não está aceitando backups novos da sua conta agora. A mensagem diz por quê e até quando, e restaurar continua funcionando. Veja [Permafrost](#permafrost).

## Um backup não consegue ler uma pasta

No macOS, isso costuma ser uma permissão de privacidade. O erro diz o que você precisa permitir. Veja [Permissões do macOS](#macos-permissions). Em outros sistemas, confira se o seu usuário consegue ler a pasta.

## Arquivos listados como "couldn't be read"

O Frost pulou esses arquivos e salvou o resto. As causas comuns são arquivos que você não tem permissão para ler, arquivos apagados durante o backup e, no macOS, arquivos que o iCloud mantém só na nuvem.

## Arquivos que "continued changing while being read"

Um programa estava gravando nesses arquivos durante o backup, então o snapshot manteve a cópia anterior. Feche o programa e faça o backup de novo, ou deixe o próximo backup pegar os arquivos.

## Uma pasta aparece como "not found"

Uma pasta da sua lista não estava lá, então o Frost fez backup do resto. Conecte o disco de novo ou, se a pasta mudou de lugar, atualize a lista com `frost init`.

## "config.toml changed, but updating the scheduled job failed"

Você editou o `config.toml`, e o Frost não conseguiu atualizar a tarefa agendada para combinar. O resto da mensagem diz por quê. Se ela citar uma configuração, corrija-a no `config.toml`. O Frost tenta de novo a cada comando até dar certo.

## "config.toml changed where backups go"

Você mudou no `config.toml` onde os backups ficam, e o Frost encontrou um problema no novo local na primeira vez que o usou. O resto da mensagem diz qual. Veja [Mover seus backups](#moving-backups).

## "scheduled job is missing"

A tarefa agendada foi apagada ou desligada. Recrie a tarefa com `frost config set schedule.enabled true`.

## Os backups agendados não rodam

- Confira a linha "next backup" do `frost status`.
- No macOS, confira o botão do Frost em Ajustes do Sistema > Geral > Itens de Início e Extensões (System Settings > General > Login Items & Extensions). Ele aparece como Node.js Foundation.
- No Windows, os backups agendados exigem que sua sessão do Windows esteja aberta e não rodam na bateria.
- Com `schedule.catch_up` em `false`, um backup que deveria rodar com o computador desligado ou em repouso é pulado.
- Leia o log. Veja [Backups automáticos](#scheduling).

## "verification failed"

Uma verificação por amostragem encontrou dados faltando ou danificados no seu armazenamento. Veja [Verificar seus backups](#checking-backups).

## "cannot restore alongside original files"

A pasta ao lado dos originais não pode ser usada, muitas vezes porque o snapshot veio de outro computador. Use `--to <dir>` em vez disso. Veja [Restaurar arquivos](#restoring).

## "cannot overwrite original files"

O snapshot veio de outro tipo de computador, ou o caminho até os originais passa por um link em que o Frost não confia. Use `--beside` ou `--to <dir>` em vez disso.

## A restauração informa que um arquivo "changed after it was checked" ou "has more than one link"

O Frost detectou que um arquivo já verificado mudou, ou que um arquivo cuja restauração ainda não terminou tem um link físico para outro nome. Feche os programas que estão alterando a pasta de restauração e tente novamente. Se o arquivo inacabado tiver um link físico, restaure em uma nova pasta vazia.

## O Frost não encontra o snapshot que você pediu

| O Frost diz | Tente |
| --- | --- |
| no snapshot at or before ... | Uma data mais recente. A mensagem mostra o seu snapshot mais antigo |
| "maple" matches 2 snapshots; provide additional ID characters | Mais caracteres do ID, como `maple-absurd` |
| cannot parse "..." as a snapshot ID or timestamp | Aspas em volta de datas com espaços, como `"3 days ago"` |

## O Frost não consegue se atualizar

A pasta do Frost não permite gravação, ou o Frost foi compilado a partir do código-fonte. Veja [Atualizar o Frost](#updating).

## O instalador para

| O instalador diz | O que fazer |
| --- | --- |
| need OpenSSH 8.1+ to verify the Frost release signature | Instale ou atualize o OpenSSH. No Windows, use o instalador do PowerShell |
| checksums.txt signature does not match official Frost release key; installation aborted | Não instale. Tente mais tarde e [relate o problema](#getting-help) se continuar acontecendo |
| runtime inside ... lacks valid OpenJS Foundation signature; installation aborted | Não instale. Tente mais tarde e [relate o problema](#getting-help) se continuar acontecendo |
| checksum mismatch | O download veio danificado. Execute o instalador de novo |
| 32-bit ARM isn't supported by the bundled runtime | Não existe pacote do Frost para este computador |
| installing Frost requires Node.js v22 or newer | Atualize o Node.js, ou use o instalador em vez do npm ou do pnpm |

## O `frost` não é encontrado depois da instalação

Abra um terminal novo. Terminais que estavam abertos durante a instalação do Frost não enxergam o novo `PATH`. Com o pnpm, execute `pnpm setup` uma vez e depois abra um terminal novo.
