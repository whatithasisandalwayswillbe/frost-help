# Mover seus backups

Seus backups podem ir para outra pasta, outro disco, outro servidor, outro bucket ou outro provedor sem que tudo seja enviado de novo.

O Permafrost não tem uma pasta para mover, então seus backups não podem entrar nem sair do Permafrost dessa forma. Para passar a usar o Permafrost ou deixar de usá-lo, comece um conjunto separado de backups com `frost init`.

| Você quer | Faça isto |
| --- | --- |
| Mover seus backups para outra pasta, disco, servidor ou bucket | Mova a pasta inteira do repositório e aponte o frost para o novo local. Nada é enviado de novo |
| Começar um conjunto separado de backups em outro lugar | Execute `frost init` e escolha o novo local vazio. Os backups antigos ficam onde estão, mas o frost só mostra os novos |
| Voltar a usar os backups de um local anterior | Aponte o frost de novo para o local antigo |

## Mover o repositório

O repositório é a pasta do seu armazenamento que contém `frost.repo`, `chunks/`, `snapshots/` e `trees/`. Mova ou copie os quatro, com todos os objetos de dentro, e mantenha os nomes exatamente como estão. Mover só o `frost.repo` não move seus backups.

Um servidor próprio, um disco local e um armazenamento S3 guardam os mesmos arquivos, então você pode copiar um repositório entre eles com rsync, rclone ou um gerenciador de arquivos. Por exemplo, este comando copia os backups de um disco para um servidor:

```sh
rsync -a /Volumes/Backup/frost/ me@nas.local:frost/
```

Depois, diga ao frost onde eles estão. Para outra pasta em um disco ou servidor:

```sh
frost config set storage.local.path /Volumes/Backup2/frost
frost config set storage.sftp.path backups/frost
```

Para outro bucket:

```sh
frost config set storage.s3.bucket new-bucket
```

Para outra pasta dentro do bucket:

```sh
frost config set storage.s3.prefix backups/frost
```

Para ir para outro tipo de armazenamento ou outro provedor, o que exige mudar várias configurações de uma vez, execute `frost init` e escolha o novo. A configuração encontra seus backups e se conecta a eles.

## Verificações antes de salvar

O `frost config set` confere um novo local de armazenamento antes de salvá-lo. Ele recusa um local sem repositório do frost ou com um repositório criado com outra chave. Se o local antigo tem snapshots do mesmo repositório, mas o novo não, ele também recusa essa mudança. O `frost config edit` mostra esses mesmos problemas como avisos, então ainda consegue salvar uma mudança que o `set` recusa. Se você mudar o local editando o `config.toml` por conta própria, o frost mostra esses avisos na primeira vez que o usar.

## Se o frost não encontrar seus backups

Quando seus backups não estão onde o frost espera, o erro e o `frost status` dizem onde eles foram abertos pela última vez e dão três saídas:

```text
Your backups were last opened in s3://old-bucket/frost/.
Since then storage.s3.bucket changed from old-bucket to new-bucket.

Do one of these:
  put it back:       frost config set storage.s3.bucket old-bucket
  keep the change:   move the entire repository folder (frost.repo, chunks/, snapshots/, and trees/) to s3://new-bucket/frost/
  start over there:  frost init (your old backups stay where they are)
```
