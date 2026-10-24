# Primeiros passos

O Frost faz backup das suas pastas no armazenamento que você escolher, do seu próprio servidor ou um disco a um provedor de nuvem, e criptografa tudo no seu computador antes de guardar. Esta página leva você da instalação do Frost até o seu primeiro backup.

## O que você precisa

- Um Mac, ou um computador com Linux ou Windows, com processador Intel, AMD ou ARM de 64 bits.
- Um lugar para guardar seus backups: um servidor que você acessa por SSH, um disco, uma chave de acesso do [Permafrost](#permafrost) ou um bucket compatível com S3. [Escolher o armazenamento](#choosing-storage) compara as opções.
- Uma janela de terminal com pelo menos 56 colunas de largura e 18 linhas de altura, para a configuração em tela cheia.

Você não precisa instalar o Node.js nem mais nada antes. O Frost traz o próprio ambiente de execução.

## 1. Instale o Frost

No macOS ou no Linux, execute isto em um terminal:

```sh
curl -fsSL https://getfro.st/install.sh | sh
```

No Windows, execute isto no PowerShell:

```powershell
irm https://getfro.st/install.ps1 | iex
```

O instalador confere a assinatura da versão antes de instalar qualquer coisa. [Instalar o Frost](#installing) explica npm e pnpm, a instalação manual e as opções do instalador.

## 2. Configure

```sh
frost init
```

A configuração pergunta uma coisa por tela:

1. **Armazenamento.** Onde seus backups ficam. Escolha o Permafrost, um serviço compatível com S3, o seu próprio servidor ou um disco, e responda ao que for perguntado.
2. **Pastas.** As pastas que entram no backup, como `~/Documents`.
3. **Exclusões.** Arquivos e pastas que ficam de fora. Alguns comuns, como `node_modules`, já vêm preenchidos.
4. **Agendamento.** A frequência dos backups automáticos, ou a opção de desativá-los.
5. **Frase de recuperação.** 24 palavras que destravam seus backups. Anote todas.
6. **Revisão.** Confira tudo e pressione `[s]` para salvar.

> A frase de recuperação é a única forma de ler seus backups se você perder este computador. Ninguém consegue recuperá-la para você, nem quem guarda seus backups nem os autores do Frost.

[Configurar o Frost](#setting-up) explica cada tela.

## 3. Faça o backup

Veja antes o que o primeiro backup vai enviar:

```sh
frost backup --dry-run
```

Depois, execute:

```sh
frost backup
```

O primeiro backup envia tudo. Os seguintes enviam só o que mudou. Se você ativou o agendamento, o Frost agora faz backup sozinho e você não precisa executar nada.

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

- [Como o Frost funciona](#how-it-works) explica os snapshots, a criptografia e o que é enviado.
- [Backups automáticos](#scheduling) trata do agendamento.
- [Sua frase de recuperação](#recovery-phrase) explica como manter sua chave em segurança.
