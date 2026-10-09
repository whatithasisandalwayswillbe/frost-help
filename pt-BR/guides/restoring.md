# Restaurar arquivos

Recupere arquivos de qualquer snapshot, em uma pasta nova ou por cima dos originais.

O jeito mais fácil é usar o navegador de snapshots. Execute `frost browse`, encontre o que você precisa, selecione com `[space]` e pressione `[r]`. Veja [O navegador de snapshots](#snapshot-browser). Esta página explica como restaurar pela linha de comando.

## O comando restore

```sh
frost restore <snapshot> [paths...] --beside | --to <dir> | --overwrite
```

- **Snapshot**: de qual snapshot restaurar. Veja "Escolher um snapshot", mais abaixo.
- **Caminhos**: os arquivos ou pastas a restaurar, cada um com tudo o que contém. Sem caminhos, o snapshot inteiro é restaurado.
- **Destino**: exatamente uma destas opções: `--beside`, `--to` ou `--overwrite`.

Por exemplo:

```sh
frost restore latest ~/Documents/taxes --beside
frost restore yesterday ~/notes.txt --to ~/Desktop
frost restore maple-absurd-3f1c --overwrite
```

O `frost restore` sem mais nada abre o navegador de snapshots.

## Escolher um snapshot

| Você digita | Você recebe |
| --- | --- |
| `latest` | O snapshot mais recente |
| `maple-absurd-3f1c`, ou só `maple` | O snapshot com esse ID, ou o único cujo ID começa com o que você digitou |
| `3 days ago`, `12h`, `2w`, `1 month ago` | O snapshot mais recente naquele momento ou antes |
| `yesterday`, `today` | O snapshot mais recente até o fim daquele dia |
| `2026-09-20`, `2026-09-20 14:30` | O snapshot mais recente naquele dia ou minuto, ou antes, no seu horário local |

As datas relativas são escritas em inglês e aceitam minutos (`m`), horas (`h`), dias (`d`), semanas (`w`), meses (`mo`) e anos (`y`), ou as palavras por extenso. Coloque entre aspas o que tiver espaços, como `"3 days ago"`.

O `frost status` lista seus snapshots e os IDs deles. Se o que você digitou corresponder a mais de um ID, o frost pede que você digite mais caracteres.

## Para onde vão os arquivos

| Opção | Restaura em |
| --- | --- |
| `--beside` | Uma pasta nova `frost-restore-<id>` ao lado dos originais |
| `--to <dir>` | Uma pasta nova `frost-restore-<id>` dentro de `<dir>`, que já precisa existir |
| `--overwrite` | Os locais originais, substituindo o que estiver lá. O frost pergunta antes, e `-y` pula a pergunta |

Uma pasta nova nunca sobrescreve nada. Dentro dela, o que você restaura mantém o próprio nome e é organizado a partir da pasta que a sua seleção tem em comum:

| Você restaura | `--beside` gera |
| --- | --- |
| `~/Documents/taxes` | `~/Documents/frost-restore-<id>/taxes/...` |
| `~/notes.txt` | `~/frost-restore-<id>/notes.txt` |
| `~/Documents/a` e `~/Pictures/b` | `~/frost-restore-<id>/Documents/a` e `~/frost-restore-<id>/Pictures/b` |

O nome da pasta nova usa o ID curto do snapshot. Se esse nome já existir, o frost acrescenta `-1`, `-2` e assim por diante.

O `--beside` não funciona quando a seleção só tem em comum a raiz de um disco, quando a pasta dela não está neste computador (como acontece com um snapshot de outro computador) ou quando você não pode gravar ali. Por exemplo, restaurar ao lado do original um snapshot da sua pasta pessoal inteira significaria criar uma pasta nova em `/Users` ou `/home`. Nesses casos, use `--to`.

## Restaurar por cima dos originais

O `--overwrite` devolve os arquivos ao lugar de onde vieram e substitui o que estiver lá. O frost mostra o que vai fazer e pergunta antes:

```text
┌  restore maple-absurd-3f1c  2026-10-07 03:17 (1d ago)
│
│  paths        /home/you/Documents/taxes
▲  into         original locations (existing files will be replaced)
│
│  Go ahead? [y/N]
```

- Arquivos que já são iguais ao snapshot são conferidos e pulados, então não são baixados de novo.
- Arquivos que não estão no snapshot não são tocados.
- Cada arquivo é gravado primeiro em um arquivo temporário oculto ao lado dele e só depois trocado. Você precisa de espaço para as duas cópias do arquivo que está sendo restaurado.
- O snapshot precisa vir do mesmo tipo de computador: snapshots do macOS e do Linux sobre macOS ou Linux, e do Windows sobre Windows.
- O frost não restaura passando por um link de pasta que outro usuário possa ter alterado. Se esse for o problema, ele avisa antes de perguntar, e o navegador deixa "Overwrite original files" em cinza.

## Verificações de segurança

Cada bloco é descriptografado e conferido com o seu ID antes de ser gravado. Cada arquivo só recebe o nome de verdade quando está completo, então uma restauração que falha nunca deixa um arquivo pela metade no lugar de um arquivo de verdade.

Os links simbólicos restaurados mantêm os destinos originais, que podem apontar para fora da pasta de restauração.

## Restaurações interrompidas

Se uma restauração parar, por causa de uma conexão perdida, de `Ctrl+C` ou do computador entrando em repouso, o frost mostra o comando que continua de onde parou:

```text
What's restored so far was kept. To carry on from there, run:

  frost restore maple-absurd-3f1c9a0b2e7 /home/you/Documents/taxes --beside
```

É a mesma restauração com o ID completo do snapshot no lugar de `latest` ou de uma data, então um backup feito no meio-tempo não muda o snapshot a que ela se refere. Os arquivos já restaurados são conferidos e pulados, e o arquivo que o frost estava gravando continua do último bloco bom. No Windows, alguns caminhos precisam de um comando do PowerShell; a mensagem indica quando executá-lo no PowerShell.

Até a restauração terminar, a pasta dela contém um marcador `.frost-restore` e um arquivo `.frost-partial-...`. Deixe os dois onde estão; o frost os remove ao terminar.

Para restaurar depois de perder o seu computador, veja [Recuperar em um computador novo](#new-computer).
