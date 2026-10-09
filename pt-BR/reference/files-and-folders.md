# Arquivos e pastas

O frost guarda o aplicativo, suas configurações e o cache dele em pastas separadas do seu computador.

## O aplicativo

| Sistema | Pasta do aplicativo |
| --- | --- |
| macOS | `~/Library/Application Support/frost/app` |
| Linux | `~/.local/share/frost/app`, ou `$XDG_DATA_HOME/frost/app` |
| Windows | `%LocalAppData%\frost\app` |

A pasta do aplicativo guarda o ambiente de execução incluído e cada versão instalada. Mantenha a pasta inteira.

O inicializador `frost` fica em `/usr/local/bin` ou `~/.local/bin` no macOS e no Linux, e em `~/bin` no Windows, a menos que você tenha escolhido outra pasta na instalação. Veja [Instalar o frost](#installing).

## Configurações e chave

| Arquivo | macOS e Linux | Windows |
| --- | --- | --- |
| Configurações | `~/.config/frost/config.toml` | `%AppData%\frost\config.toml` |
| Chave | `~/.config/frost/key` | `%AppData%\frost\key` |

## Cache

| Arquivo | macOS e Linux | Windows |
| --- | --- | --- |
| Registro do que já foi enviado | `~/.cache/frost/manifest-<repo>.jsonl` | `%LocalAppData%\frost\manifest-<repo>.jsonl` |
| Onde seus backups foram abertos pela última vez | `~/.cache/frost/storage-<config>.json` | `%LocalAppData%\frost\storage-<config>.json` |
| Última busca por atualizações | `~/.cache/frost/update.json` | `%LocalAppData%\frost\update.json` |
| Log dos backups agendados | `~/.cache/frost/frost.log` | `%LocalAppData%\frost\frost.log` |

Com o systemd, os backups agendados gravam o log no journal em vez do `frost.log`. Veja [Backups automáticos](#scheduling), que também mostra onde fica a tarefa agendada.

O registro do que já foi enviado é descartável. Se você o apagar, o próximo backup o reconstrói a partir do armazenamento e lê todos os seus arquivos de novo. A restauração não precisa dele. Ao lado dele há um arquivo `.lock` que impede dois processos do frost de gravar ao mesmo tempo. Apagar o arquivo de bloqueio não interrompe um frost em execução.

## Mudar as pastas

No macOS e no Linux, o frost segue `XDG_CONFIG_HOME` e `XDG_CACHE_HOME`. `FROST_CONFIG_DIR` e `FROST_CACHE_DIR` têm prioridade sobre as duas, e `--config-dir` muda a pasta de configuração para um único comando.

Se você mudar essas pastas, execute `frost init` de novo para que a tarefa agendada também as use.
