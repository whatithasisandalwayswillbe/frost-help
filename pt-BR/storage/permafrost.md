# Permafrost

O Permafrost é um armazenamento hospedado feito para o frost. Para se conectar basta uma chave de acesso, sem bucket, região ou endpoint para configurar.

Seus backups são criptografados no seu computador antes do envio, como em qualquer outro armazenamento. O Permafrost não consegue lê-los.

## Conseguir uma chave

1. Execute `frost init` e escolha **Permafrost**.
2. Escolha **I don't have a key yet** (ainda não tenho uma chave). O frost abre uma página no navegador onde você pode conseguir uma.
3. Quando você tiver a chave, a página a devolve para o frost, que a salva na hora. Mesmo que você saia da configuração depois, ela não se perde.

Se o navegador não abrir, acesse [getfro.st/perma](https://getfro.st/perma) e pressione `[p]` na configuração para colar a chave que a página der. Se a obtenção da chave não terminar, pressione `[r]` para tentar de novo ou `[p]` para colar uma chave. O frost espera até 25 minutos.

Se você já tem uma chave, escolha **I have a key** (tenho uma chave) e cole a chave.

## Como a chave chega ao frost

Enquanto espera, o frost escuta em `127.0.0.1`, um endereço que só o seu próprio computador alcança. Ele entrega à página um valor aleatório e só aceita uma chave que volte com esse mesmo valor, então nenhuma outra página consegue empurrar para o frost uma chave dela.

A página também mostra a chave para você, que pode copiá-la para o frost, por exemplo quando o navegador está em outro computador.

## Chaves recusadas

Se o Permafrost deixar de aceitar a sua chave de acesso, os comandos que acessam seus backups param com um erro que explica isso. Execute `frost init` e configure o armazenamento de novo para conseguir uma chave que funcione.

| A configuração diz | O que fazer |
| --- | --- |
| Permafrost didn't accept that access key | Confira se você copiou a chave inteira. Ela também pode ter expirado |
| That access key can't store backups | Confira as permissões dela na sua conta do Permafrost |
| your Permafrost storage is full | A sua conta está sem espaço livre. Confira a sua conta do Permafrost |

## O seu próprio servidor

Qualquer pessoa pode rodar um servidor que fale a [API do Permafrost](https://github.com/whatithasisandalwayswillbe/frost/blob/main/docs/PERMAFROST.md).

Antes de executar o assistente pela primeira vez, crie `config.toml` na pasta de configuração do frost, indicada em [Arquivos e pastas](#files-and-folders), com estas configurações. Troque o endereço pelo do seu servidor:

```toml
[storage]
backend = "permafrost"

[storage.permafrost]
url = "https://<your-server>"
```

Depois execute `frost init`, escolha Permafrost, cole a sua chave de acesso, escolha suas pastas e salve. O assistente cria o repositório se o servidor estiver vazio.

Se o frost já estiver configurado, use `frost config edit` para mudar o backend e o endereço do servidor juntos no arquivo existente. Aceite o aviso se o novo servidor estiver vazio, digite `yes` para salvar e execute `frost init` de novo. O `frost config set` recusa um destino vazio, então não pode preparar um novo servidor.

O endereço precisa usar `https://`, exceto para um servidor no seu próprio computador, como `http://localhost:8080`. Deixe a configuração vazia para usar o servidor padrão do Permafrost.
