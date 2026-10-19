# Provedores de nuvem

A configuração tem predefinições para quatro provedores de nuvem que falam o protocolo S3. Execute `frost init`, escolha **S3-compatible** e depois o seu provedor. Para qualquer outro serviço S3, ou um servidor S3 que você mesmo mantém, veja [Outro armazenamento compatível com S3](#other-s3).

Cada predefinição guarda seus backups em uma pasta `frost` dentro do bucket, para que o bucket possa guardar outras coisas também. Dê ao frost uma chave que só alcance esse bucket e não crie regras de ciclo de vida que apaguem, façam expirar ou arquivem objetos da pasta dele. Os snapshots compartilham blocos, e remover um único objeto pode estragar muitos snapshots.

## Amazon S3

O S3 aceita as gravações condicionais de que o frost precisa.

1. Crie um bucket no console da AWS e anote a região dele, como `us-east-1`.
2. Crie um usuário do IAM para o frost e uma chave de acesso para ele: IAM > Users > your user > Security credentials > Create access key.

O frost precisa ler, listar, gravar e apagar objetos no bucket, embora o único objeto que ele apaga seja o pequeno objeto de teste que a configuração cria ao se conectar. Uma política como esta é suficiente. Troque `my-backups` pelo nome do seu bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::my-backups"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::my-backups/*"
    }
  ]
}
```

| A configuração pergunta | Resposta |
| --- | --- |
| Which region is the bucket in? | A região do bucket, como `us-east-1` |
| What's the bucket called? | O nome dele, exatamente como você criou |
| Paste the access key ID. | O ID da chave de acesso do IAM |
| Paste the secret access key. | Aparece uma única vez, ao lado do ID da chave de acesso, quando você a cria |

O frost se conecta a `s3.<region>.amazonaws.com`. Mantenha os objetos dele em uma classe de armazenamento de leitura imediata, como S3 Standard ou S3 Standard-IA, e não em Glacier Flexible Retrieval ou Glacier Deep Archive. Não é preciso ativar o versionamento do bucket.

## Cloudflare R2

O R2 aceita as gravações condicionais de que o frost precisa.

1. No painel da Cloudflare, crie um bucket do R2.
2. Anote o ID da sua conta. Ele fica na página de visão geral do R2: 32 letras e números.
3. Crie um token de API: R2 > Manage R2 API Tokens > Create API token, com a permissão Object Read & Write. Se puder, limite o token ao seu bucket.

| A configuração pergunta | Resposta |
| --- | --- |
| What's your Cloudflare account ID? | O ID de 32 caracteres da página de visão geral do R2 |
| What's the bucket called? | O nome dele, exatamente como você criou |
| Paste the Access Key ID. | O Access Key ID do seu novo token de API |
| Paste the Secret Access Key. | Aparece uma única vez, ao lado do Access Key ID |

O frost se conecta a `<account-id>.r2.cloudflarestorage.com` com a região `auto`.

## Backblaze B2

A documentação da Backblaze não diz se o B2 aceita as gravações condicionais de que o frost precisa. A configuração testa isso ao se conectar. Se o teste falhar, escolha outro armazenamento.

1. Crie um bucket na sua conta da Backblaze.
2. Anote o endpoint dele: Buckets > your bucket > Endpoint. Ele tem este formato: `s3.us-west-004.backblazeb2.com`.
3. Crie uma chave de aplicativo: Application Keys > Add a New Application Key. Limite a chave a esse bucket.

| A configuração pergunta | Resposta |
| --- | --- |
| What's the bucket's endpoint? | O endpoint da página do bucket, como `s3.us-west-004.backblazeb2.com` |
| What's the bucket called? | O nome dele, exatamente como você criou |
| Paste the application key's keyID. | O keyID da sua nova chave de aplicativo |
| Paste the applicationKey. | Aparece uma única vez, logo depois de você criar a chave |

O frost deduz a região a partir do endpoint.

## Wasabi

A documentação da Wasabi não comprova que ela aceita as gravações condicionais de que o frost precisa. A configuração testa isso ao se conectar. Se o teste falhar, escolha outro armazenamento.

1. Crie um bucket no console da Wasabi e anote a região dele, como `us-east-1` ou `eu-central-1`.
2. Crie uma chave de acesso: Access Keys > Create New Access Key. Se puder, use um usuário com acesso só a esse bucket.

| A configuração pergunta | Resposta |
| --- | --- |
| Which region is the bucket in? | A região do bucket, como `us-east-1` |
| What's the bucket called? | O nome dele, exatamente como você criou |
| Paste the access key. | A chave de acesso que você criou |
| Paste the secret key. | Aparece uma única vez, quando você cria a chave |

O frost se conecta a `s3.<region>.wasabisys.com`.
