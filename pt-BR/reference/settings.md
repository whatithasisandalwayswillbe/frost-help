# Configurações

O frost guarda as configurações em `config.toml`, na pasta de configuração dele. Você pode mudá-las com `frost init`, `frost config set` ou `frost config edit`.

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
- Mudar `schedule.enabled` ou `schedule.every` atualiza a tarefa agendada na hora.
- Se você mudar onde fica o armazenamento, o frost confere o novo local antes de salvar. Veja [Mover seus backups](#moving-backups).

## Editar o arquivo

```sh
frost config edit
```

O frost abre uma cópia do `config.toml` no editor que você indicar, ou em `$VISUAL` ou `$EDITOR`, ou então no nano, vim ou vi. No Windows, a alternativa é o Bloco de Notas. Quando você fecha o editor, o frost lista o que mudou e salva a cópia quando você digita `yes`.

Se o arquivo não puder ser interpretado, o frost diz o motivo e oferece abri-lo de novo, então um erro de digitação não estraga seus backups agendados. Configurações desconhecidas contam como erro, então um nome escrito errado não passa despercebido.

## Todas as configurações

| Chave | Padrão | Significado |
| --- | --- | --- |
| `paths` | | As pastas que entram no backup |
| `exclude` | `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules`, `.cache` | Nomes e padrões deixados de fora. Veja [Excluir arquivos](#excluding-files) |
| `schedule.enabled` | `true` | Fazer backup automaticamente |
| `schedule.every` | `daily` | `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily` ou `weekly` |
| `verify.sample` | `20` | Quantos blocos a verificação por amostragem baixa. `0` desliga a verificação |
| `update.auto` | `true` | Instalar versões novas depois dos backups agendados. `false` só avisa sobre elas |
| `storage.backend` | | `permafrost` ou `s3` |
| `storage.permafrost.url` | | Vazio para o servidor padrão. Caso contrário, um endereço `https://`, ou `http://` para um servidor no seu próprio computador |
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
