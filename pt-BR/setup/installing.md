# Instalar o frost

O frost se instala com um único comando no macOS, no Linux e no Windows. Cada versão traz o próprio ambiente de execução, então não é preciso instalar mais nada antes.

## Sistemas compatíveis

| Sistema | Processadores |
| --- | --- |
| macOS | Apple Silicon (`arm64`) e Intel (`amd64`) |
| Linux | `amd64` e `arm64` |
| Windows | `amd64` e `arm64` |

Não existe pacote para ARM de 32 bits, como os sistemas Raspberry Pi mais antigos. No Windows, o WSL instala o pacote do Linux.

## O instalador

No macOS ou no Linux, execute isto em um terminal. No Windows, execute no Git Bash.

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | sh
```

O instalador:

1. Baixa a versão mais recente para o seu sistema.
2. Confere a assinatura da versão e a soma de verificação do download, e para se alguma estiver errada.
3. Instala o frost no seu perfil de usuário e coloca um inicializador `frost` em uma pasta do seu `PATH`.

Ele precisa de `curl` ou `wget`, do `ssh-keygen` do OpenSSH 8.1 ou mais recente, e de `sha256sum` ou `shasum` para as verificações. A extração usa `tar` no macOS e no Linux, e `unzip` ou PowerShell no Windows. O Git Bash fornece o `cygpath`, de que o instalador para Windows também precisa.

O inicializador vai para `/usr/local/bin` se você tiver permissão de escrita ali, e para `~/.local/bin` se não tiver. No Windows, ele vai para `~/bin`. Se essa pasta ainda não estiver no seu `PATH`, o instalador mostra a linha que a adiciona.

Quando terminar, execute `frost init` para configurar o seu primeiro backup. Veja [Configurar o frost](#setting-up).

## Opções do instalador

| Variável | O que faz |
| --- | --- |
| `FROST_INSTALL_DIR` | Coloca o inicializador nesta pasta |
| `FROST_VERSION` | Instala esta versão, como `v0.1.0`, em vez da mais recente |

Por exemplo:

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | FROST_INSTALL_DIR="$HOME/bin" sh
```

Mudar a pasta do inicializador não move o frost em si. [Arquivos e pastas](#files-and-folders) mostra onde fica cada coisa.

## Instalar manualmente

1. Baixe o arquivo compactado para o seu sistema na [versão mais recente](https://github.com/whatithasisandalwayswillbe/frost/releases/latest). Os nomes são parecidos com `frost_0.1.0_linux_amd64.tar.gz`, com `.zip` no Windows.
2. Verifique o download antes de executar qualquer coisa dele, como mostra a seção "Verificar um download", mais abaixo.
3. Extraia o conteúdo em uma pasta nova e vazia.
4. Dentro da pasta extraída, execute o instalador incluído e informe a pasta do inicializador.

No macOS ou no Linux:

```sh
./runtime/bin/node install.mjs "$PWD" "$HOME/.local/bin"
```

No Windows, no PowerShell:

```powershell
.\runtime\bin\node.exe .\install.mjs "$PWD" "$env:LOCALAPPDATA\frost\bin"
```

Depois, adicione a pasta do inicializador ao seu `PATH`, se ela ainda não estiver lá. No Windows, o `frost.cmd` funciona no Prompt de Comando e no PowerShell, e o `frost` funciona no Git Bash.

Para rodar um pacote extraído sem instalar, use diretamente o inicializador `frost` dele (`frost.cmd` no Windows) e mantenha todos os arquivos juntos.

## Verificar um download

O instalador faz isso por você. Para conferir um arquivo compactado por conta própria, baixe-o junto com `checksums.txt` e `checksums.txt.sig` da mesma versão, e baixe [`release-signing.pub`](https://github.com/whatithasisandalwayswillbe/frost/blob/main/install/release-signing.pub) do repositório. Coloque em `archive` o nome do arquivo compactado e execute:

```sh
(
  set -e
  archive='frost_X.Y.Z_linux_amd64.tar.gz'
  printf 'frost-release %s\n' "$(cat release-signing.pub)" > allowed_signers
  ssh-keygen -Y verify -f allowed_signers -I frost-release -n file -s checksums.txt.sig < checksums.txt
  selected_checksum=$(awk -v archive="$archive" '$2 == archive { line = $0; count++ } END { if (count != 1) exit 1; print line }' checksums.txt)
  printf '%s\n' "$selected_checksum" | shasum -a 256 -c -
)
```

Os comandos param se a assinatura estiver incorreta ou se a lista assinada não tiver exatamente uma entrada para o seu arquivo. A primeira verificação deve mostrar `Good "file" signature`, e a segunda deve mostrar `OK` depois do nome do seu arquivo. Se alguma não mostrar, não instale.
