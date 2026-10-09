# O navegador de snapshots

O `frost browse` abre um navegador de snapshots em tela cheia. Você pode percorrer seus arquivos como eram, comparar snapshots e restaurar o que escolher.

```sh
frost browse
```

O `frost restore` sem mais nada também abre o navegador. Um backup agendado pode rodar enquanto o navegador está aberto.

## Navegação

| Tecla | O que faz |
| --- | --- |
| `[↑]` `[↓]` ou `[k]` `[j]` | Move a seleção |
| `[pgup]` `[pgdn]` | Avança ou volta uma página |
| `[g]` `[G]` | Vai para o início ou para o fim |
| `[enter]` | Abre |
| `[esc]` | Volta, ou fecha um erro |
| `[h]` | Mostra todas as teclas |
| `[s]` | Mostra suas configurações |
| `[v]` | Mostra ou esconde a impressão digital da sua chave |
| `[q]` | Sai |

A tela de configurações é só para leitura. Mude as configurações com `frost config set` ou `frost config edit`.

## Início

A tela inicial mostra o último backup e a última verificação. Pressione `[enter]` para ver seus snapshots, ou `[r]` para atualizar.

## Snapshots

Os snapshots aparecem do mais recente para o mais antigo, agrupados por data. Em uma janela larga, um painel ao lado da lista mostra os detalhes do snapshot destacado: quando foi tirado, em qual computador, quantos arquivos tem, o tamanho e quantos dados novos acrescentou.

| Tecla | O que faz |
| --- | --- |
| `[enter]` | Abre os arquivos do snapshot |
| `[d]` | Compara com o snapshot anterior |
| `[m]` | Marca o snapshot. Depois pressione `[d]` em outro snapshot para comparar os dois |

Uma comparação lista o que foi adicionado, removido e modificado entre os dois snapshots.

## Arquivos

Você vê suas pastas e arquivos exatamente como estavam naquele snapshot.

| Tecla | O que faz |
| --- | --- |
| `[enter]` | Abre uma pasta |
| `[←]` | Sobe para a pasta de cima |
| `[space]` | Seleciona ou desmarca |
| `[a]` | Seleciona ou desmarca tudo nesta pasta |
| `[c]` | Limpa a seleção |
| `[r]` | Restaura a seleção, ou o item destacado se nada estiver selecionado |

## Restaurar

Depois de `[r]`, escolha para onde vão os arquivos:

| Tecla | Opção | O que faz |
| --- | --- | --- |
| `[1]` | New folder beside originals | Restaura em uma pasta nova ao lado dos originais, como `frost restore --beside` |
| `[2]` | New folder elsewhere | Deixa você escolher uma pasta e restaura em uma pasta nova dentro dela |
| `[3]` | Overwrite original files | Substitui os originais, como `frost restore --overwrite`. Pressione `[y]` para confirmar |

Antes de gravar qualquer coisa, o frost mostra onde cada item vai parar. Pressione `[enter]` para restaurar, `[c]` para trocar a pasta ou `[esc]` para cancelar. Confirmações e resultados longos rolam com `[pgup]` e `[pgdn]`.

"New folder elsewhere" abre o seletor de pastas do sistema: o Finder no macOS, o Explorador de Arquivos no Windows, e zenity, qarma ou matedialog no Linux. Por SSH, ou no Linux sem seletor, você digita a pasta. Pressione `[t]` com o seletor aberto para digitá-la mesmo assim.

Quando uma restauração termina, o frost mostra o que restaurou no Finder, no Explorador de Arquivos ou no gerenciador de arquivos do Linux. Um arquivo único aparece selecionado no macOS e no Windows; no Linux, a pasta dele é aberta. Nos outros casos, abre a pasta mais interna que contém tudo o que foi restaurado. Nada é aberto por SSH, sem tela gráfica ou quando a restauração falha.

[Restaurar arquivos](#restoring) explica cada opção em detalhes, e o que acontece quando uma restauração é interrompida.
