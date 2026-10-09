# Primeiros passos

O frost faz backup das suas pastas no armazenamento que você escolher e criptografa tudo no seu computador antes do envio. Esta página leva você da instalação do frost até o seu primeiro backup.

## O que você precisa

- Um Mac, ou um computador com Linux ou Windows, com processador Intel, AMD ou ARM de 64 bits.
- Um lugar para guardar seus backups: uma chave de acesso do [Permafrost](#permafrost) ou um bucket em um [provedor compatível com S3](#choosing-storage).
- Uma janela de terminal com pelo menos 56 colunas de largura e 18 linhas de altura, para a configuração em tela cheia.

Você não precisa instalar o Node.js nem mais nada antes. O frost traz o próprio ambiente de execução.

## 1. Instale o frost

No macOS ou no Linux, execute isto em um terminal. No Windows, execute no Git Bash.

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | sh
```

O instalador confere a assinatura da versão antes de instalar qualquer coisa. [Instalar o frost](#installing) explica a instalação manual e as opções do instalador.

## 2. Configure

```sh
frost init
```

A configuração pergunta uma coisa por tela:

1. **Armazenamento.** Onde seus backups ficam. Escolha o Permafrost ou um provedor compatível com S3 e cole as chaves pedidas.
2. **Pastas.** As pastas que entram no backup, como `~/Documents`.
3. **Exclusões.** Arquivos e pastas que ficam de fora. Alguns comuns, como `node_modules`, já vêm preenchidos.
4. **Agendamento.** A frequência dos backups automáticos, ou a opção de desativá-los.
5. **Frase de recuperação.** 24 palavras que destravam seus backups. Anote todas.
6. **Revisão.** Confira tudo e pressione `[s]` para salvar.

> A frase de recuperação é a única forma de ler seus backups se você perder este computador. Ninguém consegue recuperá-la para você, nem o seu provedor de armazenamento nem os autores do frost.

[Configurar o frost](#setting-up) explica cada tela.

## 3. Faça o backup

Veja antes o que o primeiro backup vai enviar:

```sh
frost backup --dry-run
```

Depois, execute:

```sh
frost backup
```

O primeiro backup envia tudo. Os seguintes enviam só o que mudou. Se você ativou o agendamento, o frost agora faz backup sozinho e você não precisa executar nada.

## 4. Acompanhe

```sh
frost status
```

O `status` mostra o último backup, quando será o próximo, o resultado da última verificação e seus snapshots mais recentes.

## Recuperar arquivos

Abra o navegador de snapshots, encontre o que você precisa, selecione com `[space]` e pressione `[r]`:

```sh
frost browse
```

Ou restaure pela linha de comando. Isto coloca uma cópia do arquivo em uma pasta nova ao lado do original:

```sh
frost restore latest ~/Documents/report.pdf --beside
```

[Restaurar arquivos](#restoring) explica as duas formas.

## Próximos passos

- [Como o frost funciona](#how-it-works) explica os snapshots, a criptografia e o que é enviado.
- [Backups automáticos](#scheduling) trata do agendamento.
- [Sua frase de recuperação](#recovery-phrase) explica como manter sua chave em segurança.
