# Verificar seus backups

O frost confere seus backups enquanto trabalha, e o `frost status` mostra como eles estão.

## frost status

```sh
frost status
```

```text
┌  frost  v0.1.0  s3://my-backups/frost/  key 6f154dc10058
│
│  last backup  ok 2h ago  maple-absurd-3f1c
│  next backup  ~in 4h  6h via launchd
│  health       ok 20 objects checked 2h ago
│  updates      automatic
│  protected    1,204 files, 2.1 GB, in 3 snapshots
│
├  snapshots
│
│  snapshot             taken                  files         size          new
│  maple-absurd-3f1c    2026-10-08 09:17       1,204       2.1 GB      14.2 MB
│  orbit-velvet-a02e    2026-10-08 03:17       1,201       2.1 GB       3.6 MB
│  canyon-pilot-77b9    2026-10-07 21:17       1,198       2.1 GB       2.1 GB
└
```

A primeira linha mostra a versão do frost, o seu armazenamento e a impressão digital da sua chave. As linhas abaixo dela mostram:

| Linha | Mostra |
| --- | --- |
| last backup | Quando o último backup rodou e se funcionou. "ok, but" lista as pastas não encontradas, os itens que não puderam ser lidos e os arquivos em uso que mantiveram a cópia anterior |
| next backup | Quando é o próximo backup automático, ou que os backups automáticos estão desligados |
| health | O resultado da última verificação por amostragem |
| updates | Se as atualizações são automáticas e se saiu uma versão nova |
| protected | Os arquivos e o tamanho do snapshot mais recente, e quantos snapshots você tem |
| missing | Snapshots que este computador conhecia e que não estão mais no armazenamento |

A lista mostra seus 10 snapshots mais recentes. A coluna `new` indica quantos dados novos cada um acrescentou. Para ver todos:

```sh
frost status --all
```

## A verificação por amostragem

Depois de cada backup que salva um snapshot, o frost baixa uma amostra aleatória de blocos, descriptografa cada um e confere se corresponde ao seu ID. Ele também carrega a lista de arquivos do snapshot mais recente e confere se conhece todos os blocos de que ela precisa. Depois de um backup sem nada novo, o frost só repete a verificação se a última tiver mais de um dia ou tiver encontrado algum problema.

A amostra tem 20 blocos por padrão. Uma amostra maior encontra mais problemas, mas baixa mais dados:

```sh
frost config set verify.sample 50
```

`0` desliga a verificação por amostragem.

## Verificar agora

```sh
frost status --verify
```

Isso faz uma verificação nova e ainda compara o registro local de blocos do frost com tudo o que está no seu armazenamento. O comando termina com `1` se a verificação falhar, então você pode rodá-lo pelo seu próprio agendador para verificar com uma frequência diferente da dos backups.

## Se uma verificação falhar

A linha health lista o que falhou. Normalmente, isso significa que o armazenamento perdeu ou danificou alguns blocos.

1. Execute `frost backup`. Qualquer bloco perdido cujos dados ainda estejam no seu computador é enviado de novo.
2. Execute `frost status --verify` para conferir de novo.

Dados que não estão mais no seu computador não podem ser enviados de novo, e os snapshots antigos que precisam deles não poderão ser restaurados por completo.

## Snapshots desaparecidos

Se snapshots que este computador conhecia sumirem do armazenamento, o `frost status` avisa uma vez. Se você moveu seus backups, aponte o frost para o novo local. Veja [Mover seus backups](#moving-backups). Caso contrário, eles foram apagados do seu armazenamento.

> Uma verificação por amostragem testa só uma parte dos seus backups. Ela encontra problemas cedo, mas não prova que todo snapshot vai ser restaurado. Para os arquivos que você não pode perder, mantenha também um segundo backup independente.
