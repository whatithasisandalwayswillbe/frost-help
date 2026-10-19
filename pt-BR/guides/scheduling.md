# Backups automáticos

O frost faz backup em horários programados usando o agendador do próprio sistema operacional. Entre um backup e outro, nada fica rodando em segundo plano.

## Mudar o agendamento

O `frost init` pergunta com que frequência fazer backup. Para mudar depois:

```sh
frost config set schedule.every 6h
```

As opções são `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily` e `weekly`. O padrão é `daily`.

Para escolher quando os backups rodam, defina um horário no formato de 24 horas e, para os backups semanais, o dia:

```sh
frost config set schedule.time 09:30
frost config set schedule.day friday
```

Os padrões são `15:00` e `sunday`. Para desligar os backups automáticos, ou ligá-los de novo:

```sh
frost config set schedule.enabled false
frost config set schedule.enabled true
```

Cada mudança atualiza a tarefa agendada na hora. No macOS e no Windows, uma mudança feita durante um backup agendado é aplicada assim que esse backup termina. Se você editar o `config.toml` por conta própria, o próximo comando do frost atualiza a tarefa.

## Quando os backups rodam

Os backups rodam no horário de `schedule.time`, na hora local do computador:

| `schedule.every` | Faz backup |
| --- | --- |
| `daily` | Todo dia nesse horário |
| `weekly` | Toda semana no dia `schedule.day`, nesse horário |
| `2h` a `12h` | Nesse horário, e a cada intervalo antes e depois dele. `6h` a partir das `15:00` roda às 03:00, 09:00, 15:00 e 21:00 |
| `hourly` | A cada hora, nos minutos desse horário |

O systemd atrasa cada execução em até 5 minutos, ao acaso.

## Backups perdidos

Se o computador estava desligado ou em repouso quando um backup deveria rodar, o frost faz o backup assim que ele volta. Não importa quantos backups ele perdeu, faz um só.

| Agendador | Faz o backup perdido |
| --- | --- |
| launchd (macOS) | Quando o Mac acorda, ou quando você entra na sessão depois de ele ficar desligado |
| systemd (Linux) | Quando o computador acorda ou liga, ou quando você entra na sessão se o lingering estiver desligado |
| Agendador de Tarefas (Windows) | Assim que puder, quando o computador volta e você está com a sessão iniciada |
| cron (Linux) | Até 15 minutos depois de o computador voltar |

Com o cron, o frost verifica a cada 15 minutos e só faz backup quando um está na hora ou foi perdido. Um horário que já tem backup, agendado ou feito por você, não ganha um segundo backup.

Para pular os backups perdidos, e o frost só fazer backup na hora certa:

```sh
frost config set schedule.catch_up false
```

Um backup agendado que começa antes de a rede voltar, ou antes de um disco ou compartilhamento de rede ser montado, tenta de novo por cerca de 5 minutos. Com um [disco local](#local-drive), o disco precisa estar conectado quando o backup roda. [Servidor próprio](#self-hosted) entra com a própria chave SSH do frost, então funciona sem você. Se outro backup estiver rodando, ele espera esse terminar.

No Windows, os backups agendados só rodam enquanto sua sessão do Windows estiver aberta. Eles não começam enquanto o computador está na bateria, e param se ele for desconectado da tomada. No macOS e com o systemd, os backups agendados rodam com prioridade baixa para não deixar o computador lento.

## A tarefa agendada

| Sistema | Agendador | Tarefa |
| --- | --- | --- |
| macOS | launchd | `~/Library/LaunchAgents/io.github.whatithasisandalwayswillbe.frost.plist` |
| Linux com systemd | Timer de usuário do systemd | `~/.config/systemd/user/frost-backup.service` e `frost-backup.timer` |
| Linux sem systemd | cron | Uma linha no seu crontab marcada com `# frost-backup` |
| Windows | Agendador de Tarefas | Uma tarefa chamada `frost backup` |

A tarefa executa `frost backup` com as pastas de configuração e de cache que estavam em uso quando ela foi criada. Se você mudar essas pastas, execute `frost init` de novo.

No macOS, a tarefa aparece em Ajustes do Sistema > Geral > Itens de Início e Extensões (System Settings > General > Login Items & Extensions) como **Node.js Foundation**, a responsável pelo ambiente de execução que o frost inclui. Desligá-la ali interrompe os backups agendados, e o `frost status` informa que a tarefa está faltando. Para interromper os backups agendados, use `frost config set schedule.enabled false`.

Com o systemd, o frost tenta ligar o lingering para o seu usuário (`loginctl enable-linger`) se puder confirmar que ele está desligado. O lingering permite que os backups rodem mesmo depois que você sai da sua conta. Se o frost não conseguir ligá-lo, os backups podem parar depois que você sair da conta. Ao remover o timer, o frost só desliga o lingering se tiver registrado que o ligou.

## Logs

| Agendador | Onde fica o log |
| --- | --- |
| launchd, cron e o Agendador de Tarefas | `frost.log` na pasta de cache do frost. Veja [Arquivos e pastas](#files-and-folders) |
| systemd | O journal. Leia com `journalctl --user -u frost-backup` |

Um log com mais de 1 MiB é esvaziado antes da próxima execução. O `frost status` também mostra se o último backup funcionou.

## Se a tarefa sumir

Se a tarefa for apagada ou desligada, o `frost status` mostra "scheduled job is missing" (a tarefa agendada está faltando). Recrie a tarefa com:

```sh
frost config set schedule.enabled true
```
