# Permafrost

O Permafrost é um armazenamento hospedado feito para o frost. Para se conectar basta uma chave de acesso, sem bucket, região ou endpoint para configurar.

Seus backups são criptografados no seu computador antes do envio, como em qualquer outro armazenamento. O Permafrost não consegue lê-los.

## Conseguir uma chave

1. Execute `frost init` e escolha **Permafrost**.
2. Escolha **I don't have a key yet** (ainda não tenho uma chave). O frost abre [getfro.st/perma](https://getfro.st/perma) no navegador. Se ele não abrir, acesse o endereço você mesmo.
3. Consiga a sua chave lá e copie.
4. Cole a chave na configuração.

Se você já tem uma chave, escolha **I have a key** (tenho uma chave) e cole a chave.

## Conseguir uma chave nova

Se você perder a sua chave, acesse [getfro.st/perma/recover](https://getfro.st/perma/recover) e informe o e-mail que usou para consegui-la. O e-mail que você recebe leva a uma chave nova. A nova substitui a antiga, que para de funcionar em todos os computadores.

Em cada computador que usa o Permafrost, troque pela chave nova:

```sh
frost config set storage.permafrost.token <new key>
```

Enquanto o Permafrost não estiver aceitando envios, o `frost config set` não consegue fazer a verificação do armazenamento. Use `frost config edit` no lugar e coloque a chave em `token`, dentro de `[storage.permafrost]`.

## Espaço usado

O `frost status` mostra quanto do seu armazenamento no Permafrost você usa. Quando o Permafrost tem algo a avisar, como o armazenamento estar quase cheio, o `frost status` e o `frost backup` mostram isso como um aviso. Veja [Verificar seus backups](#checking-backups).

## Quando o Permafrost recusa

Os erros do Permafrost dizem o motivo. Os comandos que acessam seus backups param com essa mensagem.

| Você vê | O que significa |
| --- | --- |
| the Permafrost access key was rejected | A chave está errada, uma chave mais nova a substituiu ou a conta foi encerrada. A mensagem diz qual dos casos. Use a sua chave mais recente ou consiga uma nova |
| uploads are paused | O Permafrost não está aceitando backups novos por enquanto. Restaurar continua funcionando. A mensagem diz por quê, até quando e o que fazer |
| your Permafrost storage is full | O envio não cabe. A mensagem diz quanto você armazena e o que fazer |

Na configuração, os dois primeiros aparecem como "Permafrost didn't accept that access key" e "Permafrost won't store backups with that access key", seguidos do mesmo motivo.

## O seu próprio servidor

Qualquer pessoa pode rodar um servidor que fale a [API do Permafrost](https://github.com/whatithasisandalwayswillbe/frost/blob/main/docs/PERMAFROST.md). Um servidor compatível precisa seguir as regras da API para objetos e erros, inclusive recusar envios vazios. O frost tenta de novo automaticamente quando um servidor está ocupado.

Antes de executar o assistente pela primeira vez, crie `config.toml` na pasta de configuração do frost, indicada em [Arquivos e pastas](#files-and-folders), com estas configurações. Troque o endereço pelo do seu servidor:

```toml
[storage]
backend = "permafrost"

[storage.permafrost]
url = "https://<your-server>"
```

Depois execute `frost init`, escolha Permafrost, cole a sua chave de acesso, escolha suas pastas e salve. O assistente cria o repositório se o servidor estiver vazio.

Se o frost já estiver configurado, use `frost config edit` para mudar o backend e o endereço do servidor juntos no arquivo existente. Aceite o aviso se o novo servidor estiver vazio, digite `yes` para salvar e execute `frost init` de novo. O `frost config set` recusa um destino vazio, então não pode preparar um novo servidor.

O endereço precisa usar `https://`, exceto para um servidor no seu próprio computador, como `http://localhost:8080`. Deixe a configuração vazia para usar o servidor padrão do Permafrost, `https://permafrost.wihiaawb.com`.
