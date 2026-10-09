# Atualizar o frost

O frost se atualiza sozinho. Por padrão, ele instala as versões novas depois dos backups agendados.

## Atualizar agora

```sh
frost update
```

O frost encontra a versão mais recente, confere a assinatura e a soma de verificação, e garante que a versão nova inicia antes de trocar para ela. Suas configurações, sua chave e seus backups não são alterados.

Para só conferir se existe uma versão mais nova:

```sh
frost update --check
```

O `frost update` nunca instala uma versão de pré-lançamento, nem uma versão mais antiga do que a sua.

## Atualizações automáticas

Depois de um backup agendado, o frost procura uma versão nova no máximo uma vez por dia e a instala do mesmo jeito que o `frost update`. Se a busca ou a instalação falhar, o backup não falha por causa disso.

O `frost status` mostra como as atualizações estão configuradas e se a última funcionou. A tela de configurações do navegador de snapshots também mostra isso.

Para ser avisado das versões novas sem instalá-las automaticamente:

```sh
frost config set update.auto false
```

Daí em diante, o `frost status` avisa quando sai uma versão, e nada é instalado até você executar `frost update`.

> As atualizações automáticas só rodam depois dos backups agendados. Com os backups automáticos desligados, o frost não procura atualizações em segundo plano.

## Quando o frost não consegue se atualizar

| Quando | O que fazer |
| --- | --- |
| Um gerenciador de pacotes instalou o frost (Homebrew, Nix, Snap, Scoop ou um pacote do sistema) | Atualize com esse gerenciador de pacotes |
| Você não tem permissão de escrita na pasta do aplicativo do frost | Reinstale com o instalador, usando o seu próprio usuário |
| O frost foi compilado a partir do código-fonte | Compile de novo, ou instale uma versão com o instalador |

Se uma atualização parar no meio, execute o instalador de novo. Ele repara a instalação.
