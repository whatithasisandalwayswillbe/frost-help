# Outro armazenamento compatível com S3

Use qualquer outro serviço que fale o protocolo S3, como MinIO, Ceph ou um provedor sem opção própria na configuração. Ele precisa aceitar gravações condicionais. Veja [Escolher o armazenamento](#choosing-storage).

## Na configuração

Execute `frost init` e escolha **Other S3-compatible**.

| A configuração pergunta | Resposta |
| --- | --- |
| What's the S3 endpoint? | O nome do host indicado na documentação do seu provedor. Um nome de host sozinho, sem `https://`, significa HTTPS |
| Which region? | Só se o seu provedor pedir. Caso contrário, deixe em branco |
| What's the bucket called? | O nome dele, exatamente como você criou. O bucket já precisa existir |
| Paste the access key ID. | Do console do seu provedor |
| Paste the secret access key. | Do console do seu provedor |

O frost guarda seus backups em uma pasta `frost` dentro do bucket.

## Um servidor sem TLS

Para um servidor de teste no seu próprio computador ou na sua rede, informe o endpoint com `http://`, como `http://localhost:9000`. Isso desliga o TLS em todas as requisições, então use só em uma rede de confiança. Definir `storage.s3.insecure` como `true` seleciona HTTP quando o endpoint não tem esquema. Um `https://` ou `http://` explícito tem prioridade.

## A pasta dentro do bucket

O frost guarda tudo em uma pasta dentro do bucket, `frost` por padrão. A configuração em tela cheia não pergunta sobre ela.

Depois de concluir a configuração, para usar outra pasta ou a raiz do bucket antes do seu primeiro backup:

1. Execute `frost config edit` e mude `prefix` em `[storage.s3]`. Deixe vazio para usar a raiz do bucket. O frost avisa que ainda não há backups ali. Digite `yes` para salvar mesmo assim.
2. Execute `frost init` de novo. A tela de revisão avisa que isso começa um conjunto separado de backups. Pressione `[s]` para continuar.

Se você já tem backups, mova-os em vez disso, como explica [Mover seus backups](#moving-backups).

## MinIO

O servidor do MinIO aceita gravações condicionais, mas a versão que você usa precisa passar no teste da configuração. Crie um bucket e uma chave de acesso no console do MinIO e informe à configuração o endereço e a porta do seu servidor MinIO, como `https://<server>:9000`.
