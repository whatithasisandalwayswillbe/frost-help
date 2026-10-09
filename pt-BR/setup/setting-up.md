# Configurar o frost

O `frost init` guia você pela configuração, uma pergunta por vez. Execute de novo sempre que quiser revisar ou mudar suas configurações.

## As telas de configuração

Em um terminal, o `frost init` abre uma configuração em tela cheia. Ela precisa de uma janela com pelo menos 56 colunas de largura e 18 linhas de altura. A última linha sempre mostra as teclas que você pode usar: `[esc]` volta uma etapa e `[q]` sai sem salvar.

### Armazenamento

Escolha onde seus backups ficam:

- **Permafrost**, a opção recomendada. Ele precisa só de uma chave de acesso e mais nada, e se você ainda não tiver uma chave, o frost pode conseguir uma pelo navegador. Veja [Permafrost](#permafrost).
- **Backblaze B2**, **Amazon S3**, **Cloudflare R2** ou **Wasabi**. A configuração pergunta só o que aquele provedor precisa e diz onde encontrar cada resposta.
- **Other S3-compatible** (outro compatível com S3), para MinIO, Ceph e outros serviços que falam o protocolo S3.

Cada provedor tem a própria página na seção Armazenamento. Ao colar uma chave secreta, `[tab]` mostra ou esconde o que você digitou.

Quando você termina de responder, o frost se conecta e confere se consegue gravar, ler, listar e apagar um pequeno objeto de teste, e se o armazenamento aceita gravações condicionais. Se algo der errado, a configuração explica o motivo em palavras simples e leva você de volta à resposta que mais provavelmente causou o problema. Todo o resto que você digitou é mantido.

### Pastas

Digite o caminho completo de uma pasta para incluir no backup e pressione `[enter]`. `~` é a sua pasta pessoal, então `~/Documents` funciona. Adicione quantas pastas quiser; nada é escolhido por você.

- O frost faz backup de pastas inteiras. Para fazer backup de um único arquivo, adicione a pasta em que ele está.
- Uma pasta que já está na lista, ou que está dentro de uma pasta da lista, não é adicionada duas vezes. Adicionar uma pasta que contém outras da lista substitui essas pastas.
- Uma pasta que ainda não existe fica na lista e é ignorada até passar a existir, como um disco que não está conectado.

Pressione `[↑]` para entrar na lista e `[x]` para remover a pasta selecionada. Pressione `[enter]` com a caixa vazia para seguir.

### Exclusões

Esta etapa lista os nomes e padrões que o frost deixa de fora de todo backup. A lista começa com os padrões do frost: `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules` e `.cache`. Remova os que você quer incluir no backup. [Excluir arquivos](#excluding-files) explica como os padrões funcionam.

### Agendamento

Escolha com que frequência o frost faz backup sozinho: a cada hora, a cada 6 ou 12 horas, diariamente ou semanalmente. Escolha "Off" (desligado) para fazer backup só quando você executar `frost backup`. Outros intervalos estão disponíveis com `frost config set`. Veja [Backups automáticos](#scheduling).

### Frase de recuperação

Em um armazenamento novo, o frost cria a sua chave e a mostra como 24 palavras. As palavras ficam cobertas até você pressionar `[v]`, para que você confira antes que ninguém mais está vendo a sua tela. Anote as palavras, pressione `[enter]` e digite as duas palavras que a configuração pedir, para conferir a sua cópia.

Se o armazenamento já tiver backups do frost, a configuração pede a frase de recuperação desses backups. Se a chave que já está neste computador abre esses backups, esta etapa é pulada.

### Revisão

A tela de revisão mostra todas as configurações de uma vez. Use `[↑]` e `[↓]` para escolher uma linha e `[e]` para alterá-la, e depois pressione `[s]` para salvar. `[v]` mostra a impressão digital da sua chave, um ID curto que identifica a chave sem revelá-la.

Ao salvar, o frost grava suas configurações e sua chave e cria a tarefa agendada. Quando a configuração terminar, execute `frost backup --dry-run` para ver uma prévia do primeiro backup, ou `frost backup` para começar.

## Armazenamento que já tem backups

A configuração procura backups do frost assim que se conecta:

- Se a chave deste computador abre esses backups, a configuração se conecta e você mantém todos os seus snapshots.
- Se eles foram feitos com outra chave, a configuração pede a frase de recuperação dessa chave. A partir daí, o frost usa essa chave neste computador.
- Se o armazenamento estiver vazio, mas os backups deste computador estiverem em outro lugar, a configuração avisa você antes de começar ali um conjunto separado de backups. Os backups antigos continuam onde estão, mas o frost só mostra os novos.

Se o que você quer é mover os backups que já tem, veja [Mover seus backups](#moving-backups).

## Executar a configuração de novo

Execute `frost init` quando quiser. Ele abre com as suas configurações atuais, então você pode mudar uma coisa só e salvar.

A configuração em tela cheia não pergunta sobre duas configurações menos comuns, e mantém o valor que elas já tiverem:

- Um servidor Permafrost próprio: `storage.permafrost.url`.
- A pasta dentro de um bucket S3, `frost` por padrão: `storage.s3.prefix`.

Para um novo local, use `frost config edit`, aceite o aviso, salve e execute `frost init` de novo. O `frost config set` exige que já exista um repositório no novo local. Para configurar um servidor próprio pela primeira vez, veja [Permafrost](#permafrost). Veja [Configurações](#settings).

## Sem um terminal em tela cheia

Quando o frost não está rodando em um terminal interativo, por exemplo com a entrada redirecionada, o `frost init` faz perguntas simples, uma por linha. Em vez da lista de provedores, ele oferece o Permafrost ou um bucket genérico compatível com S3, e também pergunta pela pasta dentro do bucket. As listas são separadas por vírgulas, e `-` deixa a lista de exclusões vazia. Conseguir uma chave do Permafrost pelo navegador também funciona nesse modo.
