# Permissões do macOS

O macOS protege algumas pastas, como Mesa, Documentos e Transferências, e os dados de apps como Mail e Safari. Um programa precisa da sua permissão antes de poder lê-las.

## Backups que você executa

Quando você executa `frost backup` em um terminal, o macOS pergunta sobre o seu app de terminal, como Terminal, iTerm, Visual Studio Code, Warp ou Ghostty. Permita, e o frost consegue ler essas pastas.

## Backups agendados

Os backups agendados executam o ambiente de execução incluído no frost, que o macOS trata como um programa à parte:

```text
~/Library/Application Support/frost/app/runtime/bin/node
```

O macOS pergunta sobre ele na primeira vez em que ele lê `~/Desktop`, `~/Documents` ou `~/Downloads`. O acesso a outras pastas protegidas, como `~/Library/Mail` e `~/Library/Safari`, é negado sem perguntar.

## Acesso total ao disco

Para que o frost consiga ler todas as pastas do seu backup, dê a ele acesso total ao disco:

1. Abra Ajustes do Sistema > Privacidade e Segurança > Acesso Total ao Disco (System Settings > Privacy & Security > Full Disk Access).
2. Clique no botão de adicionar, pressione `Cmd+Shift+G` e cole o caminho do ambiente de execução mostrado acima.
3. Selecione `node`, clique em Abrir e confira se o botão dele está ativado.
4. Faça o mesmo com o seu app de terminal, para os backups que você executa.

A permissão continua valendo quando o frost é atualizado.

Quando o macOS bloqueia um backup, o erro do frost diz qual app ou arquivo você precisa permitir.

## iCloud Drive

O frost não baixa os arquivos que o iCloud mantém só na nuvem, então um backup nunca enche o seu disco nem fica esperando downloads. Esses arquivos são pulados e listados. Para incluí-los no backup, faça o Finder mantê-los baixados neste Mac.

## Itens de início

A tarefa agendada do frost aparece em Ajustes do Sistema > Geral > Itens de Início e Extensões (System Settings > General > Login Items & Extensions) como **Node.js Foundation**, a responsável pelo ambiente de execução que o frost inclui. Deixe-a ativada. Veja [Backups automáticos](#scheduling).
