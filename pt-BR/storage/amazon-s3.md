# Amazon S3

Faça backup em um bucket do Amazon S3. O S3 aceita as gravações condicionais de que o frost precisa.

## Antes de começar

1. Crie um bucket no console da AWS e anote a região dele, como `us-east-1`.
2. Crie um usuário do IAM para o frost, dê a ele acesso só a esse bucket e crie uma chave de acesso para ele: IAM > Users > your user > Security credentials > Create access key.

O frost precisa ler, listar, gravar e apagar objetos no bucket. Uma política como esta é suficiente. Troque `my-backups` pelo nome do seu bucket:

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

O único objeto que o frost apaga é o pequeno objeto de teste que a configuração cria ao se conectar.

## Na configuração

Execute `frost init` e escolha **Amazon S3**.

| A configuração pergunta | Resposta |
| --- | --- |
| Which region is the bucket in? | A região do bucket, como `us-east-1` |
| What's the bucket called? | O nome dele, exatamente como você criou |
| Paste the access key ID. | O ID da chave de acesso do IAM |
| Paste the secret access key. | Aparece uma única vez, ao lado do ID da chave de acesso, quando você a cria |

O frost se conecta a `s3.<region>.amazonaws.com` e guarda seus backups em uma pasta `frost` dentro do bucket.

## Bom saber

- Mantenha os objetos do frost em uma classe de armazenamento de leitura imediata, como S3 Standard ou S3 Standard-IA. Não crie regras de ciclo de vida que os movam para Glacier Flexible Retrieval ou Glacier Deep Archive, nem que os façam expirar.
- Não é preciso ativar o versionamento do bucket.
