# Backblaze B2

Faça backup em um bucket do Backblaze B2, pela API compatível com S3 dele.

> A documentação da Backblaze não diz se o B2 aceita as gravações condicionais de que o frost precisa. A configuração testa isso ao se conectar. Se o teste falhar, escolha outro provedor. Veja [Escolher o armazenamento](#choosing-storage).

## Antes de começar

1. Crie um bucket na sua conta da Backblaze.
2. Anote o endpoint dele: Buckets > your bucket > Endpoint. Ele tem este formato: `s3.us-west-004.backblazeb2.com`.
3. Crie uma chave de aplicativo: Application Keys > Add a New Application Key. Limite a chave a esse bucket.

## Na configuração

Execute `frost init` e escolha **Backblaze B2**.

| A configuração pergunta | Resposta |
| --- | --- |
| What's the bucket's endpoint? | O endpoint da página do bucket, como `s3.us-west-004.backblazeb2.com` |
| What's the bucket called? | O nome dele, exatamente como você criou |
| Paste the application key's keyID. | O keyID da sua nova chave de aplicativo |
| Paste the applicationKey. | Aparece uma única vez, logo depois de você criar a chave |

O frost deduz a região a partir do endpoint e guarda seus backups em uma pasta `frost` dentro do bucket.

## Bom saber

Não crie regras de ciclo de vida que apaguem objetos da pasta do frost. Os snapshots compartilham blocos, e remover um único objeto pode estragar muitos snapshots.
