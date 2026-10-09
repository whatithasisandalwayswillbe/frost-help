# Comandos

O frost tem oito comandos. O `frost -h` lista todos, com cada opção.

## Opções globais

Funcionam com qualquer comando:

| Opção | O que faz |
| --- | --- |
| `--config-dir <dir>` | Usa outra pasta de configuração |
| `-h`, `--help` | Mostra a ajuda, com todos os comandos e opções |
| `-v`, `--version` | Mostra a versão do frost. Coloque antes de qualquer comando |

## frost init

Configura o frost: do que fazer backup, onde e com que frequência. Execute de novo para revisar ou mudar suas configurações. Veja [Configurar o frost](#setting-up).

```sh
frost init
```

## frost backup

Faz backup agora. Veja [Fazer backup](#backing-up).

```sh
frost backup [--dry-run] [--path <dir>] [--exclude <pattern>] [--no-verify]
```

| Opção | O que faz |
| --- | --- |
| `-n`, `--dry-run` | Mostra o que seria enviado, sem enviar nada |
| `--path <dir>` | Faz backup desta pasta em vez das pastas de sempre. Pode ser repetida |
| `--exclude <pattern>` | Também deixa de fora os arquivos que correspondem a este padrão. Pode ser repetida |
| `--no-verify` | Pula a verificação por amostragem depois do backup |

## frost restore

Recupera arquivos de um snapshot. Sem nada depois, abre o navegador de snapshots. Veja [Restaurar arquivos](#restoring).

```sh
frost restore [snapshot] [paths...] --beside | --to <dir> | --overwrite
```

| Opção | O que faz |
| --- | --- |
| `--beside` | Restaura em uma pasta nova ao lado dos originais |
| `--to <dir>` | Restaura em uma pasta nova dentro desta pasta |
| `--overwrite` | Restaura por cima dos originais, substituindo o que estiver lá. Pergunta antes |
| `-y`, `--yes` | Não pergunta antes de sobrescrever |

## frost status

Mostra os snapshots recentes, o agendamento e a integridade dos seus backups. Veja [Verificar seus backups](#checking-backups).

```sh
frost status [--verify] [--all]
```

| Opção | O que faz |
| --- | --- |
| `--verify` | Faz uma verificação nova antes |
| `-a`, `--all` | Lista todos os snapshots, não só os 10 mais recentes |

## frost browse

Abre o navegador de snapshots. Veja [O navegador de snapshots](#snapshot-browser).

```sh
frost browse
```

## frost config

Lê ou muda as configurações sem executar o assistente de novo. Veja [Configurações](#settings).

```sh
frost config [--show-secrets]
frost config get <key> [--show-secrets]
frost config set <key> <value...>
frost config edit [editor]
```

| Opção | O que faz |
| --- | --- |
| `--show-secrets` | Mostra as credenciais completas em vez de escondê-las |

## frost key

Mostra, confere ou importa a sua frase de recuperação. Veja [Sua frase de recuperação](#recovery-phrase).

```sh
frost key show
frost key verify
frost key import
```

## frost update

Atualiza o frost para a versão mais recente. Veja [Atualizar o frost](#updating).

```sh
frost update [--check]
```

| Opção | O que faz |
| --- | --- |
| `--check` | Só diz se existe uma versão mais nova |

## Códigos de saída

O frost termina com `0` quando um comando dá certo, e com `1` em qualquer erro. Isso inclui um backup ou um `frost status --verify` cuja verificação encontra um problema, então scripts podem testar o resultado:

```sh
frost status --verify || echo "frost check failed" >&2
```
