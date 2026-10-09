# Wasabi

Faça backup em um bucket da Wasabi.

> A documentação da Wasabi não comprova que ela aceita as gravações condicionais de que o frost precisa. A configuração testa isso ao se conectar. Se o teste falhar, escolha outro provedor. Veja [Escolher o armazenamento](#choosing-storage).

## Antes de começar

1. Crie um bucket no console da Wasabi e anote a região dele, como `us-east-1` ou `eu-central-1`.
2. Crie uma chave de acesso: Access Keys > Create New Access Key. Se puder, use um usuário com acesso só a esse bucket.

## Na configuração

Execute `frost init` e escolha **Wasabi**.

| A configuração pergunta | Resposta |
| --- | --- |
| Which region is the bucket in? | A região do bucket, como `us-east-1` |
| What's the bucket called? | O nome dele, exatamente como você criou |
| Paste the access key. | A chave de acesso que você criou |
| Paste the secret key. | Aparece uma única vez, quando você cria a chave |

O frost se conecta a `s3.<region>.wasabisys.com` e guarda seus backups em uma pasta `frost` dentro do bucket.

## Bom saber

Não crie regras de ciclo de vida que apaguem objetos da pasta do frost. Os snapshots compartilham blocos, e remover um único objeto pode estragar muitos snapshots.
