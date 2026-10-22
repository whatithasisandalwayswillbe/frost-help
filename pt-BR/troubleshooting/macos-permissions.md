# Permissões do macOS

O macOS protege algumas pastas, como Mesa, Documentos e Transferências, e os dados de apps como Mail e Safari. Um programa precisa da sua permissão antes de poder lê-las.

## Backups que você executa

Quando você executa `frost backup` em um terminal, o macOS pergunta sobre o seu app de terminal, como Terminal, iTerm, Visual Studio Code, Warp ou Ghostty. Permita, e o Frost consegue ler essas pastas.

## Backups agendados

Os backups agendados executam o ambiente de execução incluído no Frost, que o macOS trata como um programa à parte:

```text
~/Library/Application Support/frost/app/runtime/bin/node
```

O macOS pergunta sobre ele na primeira vez em que ele lê `~/Desktop`, `~/Documents` ou `~/Downloads`. O acesso a outras pastas protegidas, como `~/Library/Mail` e `~/Library/Safari`, é negado sem perguntar.

## Acesso total ao disco

Para que o Frost consiga ler todas as pastas do seu backup, dê a ele acesso total ao disco:

1. Abra Ajustes do Sistema > Privacidade e Segurança > Acesso Total ao Disco (System Settings > Privacy & Security > Full Disk Access).
2. Clique no botão de adicionar, pressione `Cmd+Shift+G` e cole o caminho do ambiente de execução mostrado acima.
3. Selecione `node`, clique em Abrir e confira se o botão dele está ativado.
4. Faça o mesmo com o seu app de terminal, para os backups que você executa.

A permissão continua valendo quando o Frost é atualizado.

Quando o macOS bloqueia um backup, o erro do Frost diz qual app ou arquivo você precisa permitir.

## Discos e compartilhamentos de rede

O macOS também pergunta antes de um programa usar discos removíveis e compartilhamentos de rede. Isso inclui fazer backup em um [disco local](#local-drive) e fazer backup de pastas que estão em um disco. Ele pergunta pelo seu app de terminal nos backups que você executa e pelo ambiente de execução do Frost nos agendados. O acesso total ao disco também cobre discos e compartilhamentos.

## iCloud Drive

O Frost não baixa os arquivos que o iCloud mantém só na nuvem, então um backup nunca enche o seu disco nem fica esperando downloads. Esses arquivos são pulados e listados. Para incluí-los no backup, faça o Finder mantê-los baixados neste Mac.

## Itens de início

A tarefa agendada do Frost aparece em Ajustes do Sistema > Geral > Itens de Início e Extensões (System Settings > General > Login Items & Extensions) como **Node.js Foundation**, a responsável pelo ambiente de execução que o Frost inclui. Deixe-a ativada. Veja [Backups automáticos](#scheduling).
