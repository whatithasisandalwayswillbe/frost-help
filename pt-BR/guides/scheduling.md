# Backups automáticos

O frost faz backup em horários programados usando o agendador do próprio sistema operacional. Entre um backup e outro, nada fica rodando em segundo plano.

## Mudar o agendamento

O `frost init` pergunta com que frequência fazer backup. Para mudar depois:

```sh
frost config set schedule.every 6h
```

As opções são `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily` e `weekly`. O padrão é `daily`.

Para desligar os backups automáticos, ou ligá-los de novo:

```sh
frost config set schedule.enabled false
frost config set schedule.enabled true
```

As duas mudanças atualizam a tarefa agendada na hora.

## Quando os backups rodam

| Agendador | Diário | Semanal | Mais frequente |
| --- | --- | --- | --- |
| launchd (macOS) e cron (Linux) | 03:17 | Domingos às 03:17 | Aos 17 minutos de cada hora |
| Agendador de Tarefas (Windows) | 03:17 | Domingos às 03:17 | A cada poucas horas, contando a partir de quando a tarefa foi criada |
| systemd (Linux) | Meia-noite | Segundas à meia-noite | Na hora cheia |

Os horários seguem a hora local do computador. O systemd atrasa cada execução em até 5 minutos, ao acaso.

## Backups perdidos

O launchd e o systemd recuperam o atraso. Se o computador estava desligado ou em repouso quando um backup deveria rodar, o backup roda quando ele acorda. O cron e o Agendador de Tarefas pulam as execuções que o computador perdeu, e a próxima acontece no horário.

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
