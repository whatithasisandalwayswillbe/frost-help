# Outro armazenamento compatível com S3

Use um servidor S3 que você mesmo mantém, como Ceph ou SeaweedFS, ou qualquer outro serviço que fale o protocolo S3 e não tenha uma predefinição na configuração. Ele precisa aceitar gravações condicionais, o que a configuração testa. Veja [Escolher o armazenamento](#choosing-storage).

Se você quer fazer backup em uma máquina sua sem manter um servidor S3, [Servidor próprio](#self-hosted) é mais simples. Ele só precisa de SSH.

## Na configuração

Execute `frost init`, escolha **S3-compatible** e depois **Other S3-compatible**.

| A configuração pergunta | Resposta |
| --- | --- |
| What is the S3 endpoint? | O nome do host indicado na documentação do seu servidor ou provedor. Um nome de host sozinho, sem `https://`, significa HTTPS |
| Which region? | Só se o seu servidor ou provedor pedir. Caso contrário, deixe em branco |
| What is the bucket name? | O nome dele, exatamente como você criou. O bucket já precisa existir |
| Paste the Access Key ID. | Do console do seu servidor ou provedor |
| Paste the Secret Access Key. | Do console do seu servidor ou provedor |

O frost guarda seus backups em uma pasta `frost` dentro do bucket.

## Servidores que você mantém

| Servidor | O que saber |
| --- | --- |
| Ceph | O RADOS Gateway dele aceita gravações condicionais. Informe à configuração o endereço e a porta do gateway |
| SeaweedFS | O gateway S3 dele documenta gravações condicionais. Informe à configuração o endereço dele, como `http://<server>:8333` |
| MinIO | Aceita gravações condicionais, mas não é mais mantido, então não recebe correções. Um servidor existente continua funcionando se passar no teste da configuração. Informe à configuração o endereço dele, como `https://<server>:9000` |
| Garage | Não aceita gravações condicionais, então o frost não consegue usá-lo |

Crie antes o bucket e uma chave de acesso com as ferramentas do servidor.

## Um servidor sem TLS

Para um servidor no seu próprio computador ou na sua rede, informe o endpoint com `http://`, como `http://localhost:9000`. Isso desliga o TLS em todas as requisições, então use só em uma rede de confiança. Definir `storage.s3.insecure` como `true` seleciona HTTP quando o endpoint não tem esquema. Um `https://` ou `http://` explícito tem prioridade.

## A pasta dentro do bucket

O frost guarda tudo em uma pasta dentro do bucket, `frost` por padrão. A configuração em tela cheia não pergunta sobre ela.

Depois de concluir a configuração, para usar outra pasta ou a raiz do bucket antes do seu primeiro backup:

1. Execute `frost config edit` e mude `prefix` em `[storage.s3]`. Deixe vazio para usar a raiz do bucket. O frost avisa que ainda não há backups ali. Digite `yes` para salvar mesmo assim.
2. Execute `frost init` de novo. A tela de revisão avisa que isso começa um conjunto separado de backups. Pressione `[s]` para continuar.

Se você já tem backups, mova-os em vez disso, como explica [Mover seus backups](#moving-backups).
