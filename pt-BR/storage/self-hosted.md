# Servidor próprio

Faça backup em uma pasta de um computador que você mantém, por SSH. Pode ser um servidor Linux, um NAS, um Raspberry Pi, um VPS, ou um Mac ou computador Windows com o servidor SSH ativado. O frost usa o cliente SSH que o seu computador já tem, então não há nada para instalar no servidor.

## Antes de começar

- O servidor precisa ter SSH e SFTP ativados. A maioria dos servidores Linux tem os dois. Em um NAS, procure por eles nas configurações de terminal ou de serviços de arquivos.
- Você precisa de uma conta no servidor que possa gravar na pasta que vai usar. Uma conta só para backups é uma boa ideia.
- No Windows, o cliente OpenSSH precisa estar instalado. Normalmente já está. Se não estiver, adicione em Configurações, em Sistema > Recursos opcionais.

## Na configuração

Execute `frost init` e escolha **Self-hosted**.

| A configuração pergunta | Resposta |
| --- | --- |
| What is the server SSH address? | Um usuário e um host, como `me@nas.local`, ou um `Host` da sua configuração do SSH. Acrescente `:2222` para outra porta |
| Which folder on the server? | `frost` por padrão, que fica na sua pasta pessoal no servidor. Um caminho completo como `/srv/backups/frost` também funciona |

A configuração cria a última parte da pasta se ela não existir. A pasta que a contém já precisa existir.

## A chave SSH do frost

O frost fornece uma chave SSH própria, criada na primeira configuração. Ele não precisa das suas chaves pessoais nem do seu agente SSH e nunca pede uma senha, então os backups agendados se conectam sempre da mesma forma.

O servidor ainda não conhece a chave do frost, então, na primeira vez, a configuração pergunta como adicioná-la:

- **Add it for me** (adicionar por mim) passa o terminal para o ssh. Na primeira vez que você se conecta a um servidor, o ssh mostra a impressão digital dele e pergunta se você confia nele. Depois, pede a sua senha no servidor, adiciona a chave do frost e a configuração continua. A sua senha vai só para o ssh. O frost nunca a vê nem a guarda.
- **I'll add it myself** (vou adicionar eu mesmo) mostra onde fica o arquivo da chave pública do frost. Adicione a linha desse arquivo a `~/.ssh/authorized_keys` no servidor e pressione `[enter]`.

| Computador | Chave pública do frost |
| --- | --- |
| macOS e Linux | `~/.config/frost/ssh/frost_ed25519.pub` |
| Windows | `%AppData%\frost\ssh\frost_ed25519.pub` |

Quando a configuração adiciona a chave por você, a linha começa com `restrict`. Isso desativa o encaminhamento de conexões e a alocação de terminais, mas ainda deixa o frost ler e gravar arquivos. Comandos de shell continuam possíveis, a menos que o servidor limite a conta ao SFTP.

### Adicionar a chave à mão

No macOS ou no Linux, este comando adiciona a chave com `restrict` na frente e pede a sua senha no servidor:

```sh
(printf 'restrict '; cat ~/.config/frost/ssh/frost_ed25519.pub) | ssh me@nas.local 'umask 077; mkdir -p .ssh; cat >> .ssh/authorized_keys'
```

Alguns sistemas de NAS também deixam você colar uma chave SSH nas configurações da sua conta.

Um servidor Windows guarda as chaves em outros lugares, então **Add it for me** não funciona nele. Adicione a linha a `C:\Users\<you>\.ssh\authorized_keys` para uma conta padrão, ou a `C:\ProgramData\ssh\administrators_authorized_keys` para um administrador.

## Portas e a sua configuração do SSH

O frost lê sua configuração SSH, `~/.ssh/config`, da mesma forma que o ssh. Uma entrada `Host` pode definir o usuário, a porta e outras opções, e você pode usar seu nome como endereço. O frost fornece sua própria chave, mas chaves definidas explicitamente por `IdentityFile` na sua configuração SSH também podem ser oferecidas.

## Bom saber

- O sistema de arquivos do servidor precisa de links físicos, que o frost usa para garantir que dois computadores nunca sobrescrevam os registros de backup um do outro. ext4, Btrfs, XFS, ZFS, APFS e NTFS têm. A configuração verifica isso ao se conectar.
- Se a chave de host do servidor mudar, o frost se recusa a conectar, como faz o ssh. Se você reinstalou o servidor, remova a chave antiga com `ssh-keygen -R <host>` e execute `frost init` de novo.
- `frost status` mostra quão cheio está o disco do servidor, e `frost backup` avisa quando ele está quase cheio.
- Se a pasta fica em um disco que o servidor monta, esse disco precisa estar montado quando os backups rodam. Se a pasta não estiver lá, o backup falha em vez de gravar em outro lugar.
