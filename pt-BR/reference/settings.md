# Configurações

O frost guarda as configurações em `config.toml`, na pasta de configuração dele. Você pode mudá-las com `frost init`, `frost config set` ou `frost config edit`, ou em qualquer editor de texto.

## Ler e mudar configurações

| Comando | O que faz |
| --- | --- |
| `frost config` | Mostra todas as configurações. As credenciais ficam escondidas, a menos que você acrescente `--show-secrets` |
| `frost config get <key>` | Mostra uma configuração. Listas aparecem com um item por linha |
| `frost config set <key> <value...>` | Muda uma configuração e mostra o que mudou |
| `frost config edit [editor]` | Abre o `config.toml` em um editor |

Por exemplo:

```sh
frost config get schedule.every
frost config set schedule.every 6h
frost config set paths ~/Documents ~/Pictures
```

- Uma lista recebe um valor por item, e o `set` substitui a lista inteira.
- `true` e `false` ligam e desligam configurações.
- Mudar uma configuração de `schedule` atualiza a tarefa agendada na hora. No macOS e no Windows, uma mudança feita enquanto um backup agendado roda é aplicada assim que esse backup termina, então ele não é interrompido.
- Se você mudar onde fica o armazenamento, o frost confere o novo local antes de salvar. Veja [Mover seus backups](#moving-backups).

## Editar o arquivo

```sh
frost config edit
```

O frost abre uma cópia do `config.toml` no editor que você indicar, ou em `$VISUAL` ou `$EDITOR`, ou então no nano, vim ou vi. No Windows, a alternativa é o Bloco de Notas. Quando você fecha o editor, o frost lista o que mudou e salva a cópia quando você digita `yes`.

Se o arquivo não puder ser interpretado, o frost aponta o problema e oferece abri-lo de novo, então um erro de digitação não estraga seus backups agendados. Configurações desconhecidas contam como erro, então um nome escrito errado não passa despercebido.

## Editar você mesmo

Você também pode abrir o `config.toml` em qualquer editor de texto e salvá-lo. O frost lê o arquivo toda vez que roda, então a maioria das mudanças vale a partir da próxima execução. Dois tipos de mudança precisam de um passo a mais, que o frost dá na próxima vez que você rodar qualquer comando do frost:

- Uma mudança no agendamento atualiza a tarefa agendada, e o frost avisa com "config.toml changed. Scheduled job updated" (o config.toml mudou; tarefa agendada atualizada). No Linux, o próximo backup agendado também faz isso. Uma mudança feita enquanto um backup agendado roda espera ele terminar, como acontece com o `frost config set`.
- Um novo local de armazenamento passa pelas mesmas verificações do `frost config edit` na primeira vez que o frost o usa. Qualquer problema aparece como aviso.

Nada confere o arquivo antes de você salvar. Se ele não puder ser interpretado, os comandos do frost avisam até você corrigir.

## Todas as configurações

| Chave | Padrão | Significado |
| --- | --- | --- |
| `paths` | | As pastas que entram no backup |
| `exclude` | `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules`, `.cache` | Nomes e padrões deixados de fora. Veja [Excluir arquivos](#excluding-files) |
| `schedule.enabled` | `true` | Fazer backup automaticamente |
| `schedule.every` | `daily` | `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily` ou `weekly` |
| `schedule.time` | `15:00` | O horário dos backups, no formato de 24 horas. Veja [Backups automáticos](#scheduling) |
| `schedule.day` | `sunday` | O dia dos backups semanais, de `sunday` a `saturday` |
| `schedule.catch_up` | `true` | Faz backup quando o computador volta depois de perder um. `false` pula os backups perdidos |
| `verify.sample` | `20` | Quantos blocos a verificação por amostragem baixa. `0` desliga a verificação |
| `update.auto` | `true` | Instalar versões novas depois dos backups agendados. `false` só avisa sobre elas |
| `storage.backend` | | `permafrost` ou `s3` |
| `storage.permafrost.url` | | Vazio para o servidor padrão, `https://permafrost.wihiaawb.com`. Caso contrário, um endereço `https://`, ou `http://` para um servidor no seu próprio computador |
| `storage.permafrost.token` | | A sua chave de acesso do Permafrost |
| `storage.s3.endpoint` | | Como `s3.us-east-1.amazonaws.com`. Um endereço `https://` completo também funciona, e um `http://` desliga o TLS |
| `storage.s3.region` | | Vazio se o seu provedor não usa regiões |
| `storage.s3.bucket` | | O nome do bucket. Ele já precisa existir |
| `storage.s3.prefix` | `frost` | A pasta do bucket que guarda seus backups. Vazio para a raiz do bucket |
| `storage.s3.access_key_id` | | O ID da sua chave de acesso |
| `storage.s3.secret_access_key` | | A sua chave de acesso secreta |
| `storage.s3.insecure` | `false` | Usar HTTP sem criptografia quando o endpoint não tem esquema. Só para testes locais |

## Variáveis de ambiente

| Variável | Substitui |
| --- | --- |
| `FROST_S3_ACCESS_KEY_ID` ou `AWS_ACCESS_KEY_ID` | `storage.s3.access_key_id` |
| `FROST_S3_SECRET_ACCESS_KEY` ou `AWS_SECRET_ACCESS_KEY` | `storage.s3.secret_access_key` |
| `FROST_PERMAFROST_TOKEN` | `storage.permafrost.token` |
| `FROST_CONFIG_DIR` | A pasta de configuração, como `--config-dir` |
| `FROST_CACHE_DIR` | A pasta de cache |

O frost nunca grava no `config.toml` os valores que vêm do ambiente. Os backups agendados não enxergam as variáveis que você define no shell, então ainda precisam das credenciais no `config.toml`.
