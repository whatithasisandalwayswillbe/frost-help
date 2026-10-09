# Recuperar em um computador novo

Se o seu computador for perdido, quebrar ou for trocado, você pode recuperar seus arquivos em outro.

## O que você precisa

- A sua frase de recuperação de 24 palavras.
- Os dados do seu armazenamento: a sua chave de acesso do Permafrost, ou o nome do bucket e as chaves de acesso do seu provedor S3.

Se você ainda tiver o computador antigo, o `frost key show` mostra a frase.

## Passos

1. [Instale o frost](#installing) no computador novo.
2. Execute `frost init` e escolha o mesmo armazenamento, com os mesmos dados de antes.
3. A configuração encontra seus backups e pede a frase de recuperação deles. Digite as 24 palavras.
4. Escolha as pastas para fazer backup neste computador, a lista de exclusões e o agendamento, e depois revise e salve.
5. Restaure seus arquivos antes do primeiro backup deste computador:

```sh
frost restore latest --to ~
```

Isso restaura o snapshot mais recente em uma pasta nova `frost-restore-<id>` dentro da sua pasta pessoal, organizada como as pastas originais. Se os dois computadores forem do mesmo tipo, você pode restaurar só uma parte acrescentando os caminhos como eram no computador antigo, como `/Users/you/Documents`.

Para escolher o que restaurar de um computador de outro tipo, como um snapshot de Mac no Windows, use o navegador de snapshots. Execute `frost browse`, selecione o que quiser, pressione `[r]` e escolha "New folder elsewhere".

Use `--to`, e não `--beside` nem `--overwrite`. O `--beside` precisa que as pastas originais existam neste computador, e o `--overwrite` precisa de um snapshot do mesmo tipo de computador: macOS e Linux, ou Windows.

> Restaure antes de este computador fazer o primeiro backup. Depois disso, `latest` passa a ser o snapshot mais recente deste próprio computador. Se isso já aconteceu, execute `frost status` para encontrar o ID do seu snapshot antigo e restaure esse.

## Dois computadores, um armazenamento

Dois computadores podem fazer backup no mesmo armazenamento com a mesma frase de recuperação. Os snapshots deles ficam em uma única lista, e os dados que os dois têm são guardados uma só vez.

Nesse caso, `latest` é o snapshot mais recente de qualquer um dos dois. No navegador de snapshots, o painel de detalhes mostra qual computador tirou cada snapshot. Para restaurar os arquivos de um computador específico, escolha o snapshot dele pelo ID.

## Se você perdeu a frase

Se o computador antigo ainda funcionar, execute `frost key show` nele. Se a frase e o computador se perderam, ninguém consegue descriptografar seus backups. Veja [Sua frase de recuperação](#recovery-phrase).
