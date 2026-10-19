# Disco local

Faça backup em uma pasta de um disco: um disco USB externo, um segundo disco interno ou um disco em uma dock. Tudo é criptografado como em qualquer outro armazenamento, então um disco perdido não entrega os seus arquivos.

## Na configuração

Execute `frost init`, escolha **Local drive** e digite o caminho completo de uma pasta em um disco conectado.

| Sistema | Exemplo |
| --- | --- |
| macOS | `/Volumes/Backup/frost` |
| Linux | `/mnt/backup/frost` ou `/media/<you>/Backup/frost` |
| Windows | `E:\frost` |

A configuração cria a última pasta do caminho se ela não existir. A pasta que a contém, normalmente o próprio disco, precisa estar lá.

## Quando o disco não está conectado

O frost só cria a pasta durante a configuração. Se o disco não estiver conectado quando um backup rodar, a pasta não existe, e o backup falha com uma mensagem pedindo para conectar o disco. Ele nunca grava seus backups no que mais estiver nesse caminho. Um backup agendado espera o disco por cerca de 5 minutos antes, caso ele ainda esteja sendo montado.

No Windows, um disco pode receber outra letra quando você o conecta de novo. Devolva a letra antiga no Gerenciamento de Disco, ou execute `frost init` e digite o caminho novo.

## Guarde uma cópia em outro lugar

Um disco ao lado do seu computador pode ser perdido, roubado ou danificado junto com ele. Guarde outra cópia de tudo o que for insubstituível em outro lugar, como um disco que você deixa fora de casa ou um [servidor próprio](#self-hosted) em outro local. [Mover seus backups](#moving-backups) mostra como copiar um repositório.

## Compartilhamentos de rede

Para um NAS, [Servidor próprio](#self-hosted) costuma ser a melhor escolha. Um compartilhamento de rede montado no seu computador só funciona se o sistema de arquivos dele conseguir criar arquivos com segurança, o que a configuração verifica ao se conectar. No Windows, use o caminho `\\server\share` do compartilhamento em vez de uma letra de unidade mapeada, porque os backups agendados podem não ver letras mapeadas.

## Bom saber

- O frost não segue links nem junções dentro da pasta. No Windows, ele também recusa uma pasta acessada por meio de um deles. Use o caminho real da pasta.
- No macOS, os backups agendados precisam de permissão para usar discos removíveis e de rede. Veja [Permissões do macOS](#macos-permissions).
- `frost status` mostra quão cheio está o disco, e `frost backup` avisa quando ele está quase cheio.
- Discos formatados como NTFS, APFS, ext4, Btrfs ou XFS funcionam. Discos exFAT e FAT funcionam quando passam na verificação da configuração.
