# Cloudflare R2

Faça backup em um bucket do Cloudflare R2. O R2 aceita as gravações condicionais de que o frost precisa.

## Antes de começar

1. No painel da Cloudflare, crie um bucket do R2.
2. Anote o ID da sua conta. Ele fica na página de visão geral do R2: 32 letras e números.
3. Crie um token de API: R2 > Manage R2 API Tokens > Create API token, com a permissão Object Read & Write. Se puder, limite o token ao seu bucket.

## Na configuração

Execute `frost init` e escolha **Cloudflare R2**.

| A configuração pergunta | Resposta |
| --- | --- |
| What's your Cloudflare account ID? | O ID de 32 caracteres da página de visão geral do R2 |
| What's the bucket called? | O nome dele, exatamente como você criou |
| Paste the Access Key ID. | O Access Key ID do seu novo token de API |
| Paste the Secret Access Key. | Aparece uma única vez, ao lado do Access Key ID |

O frost se conecta a `<account-id>.r2.cloudflarestorage.com` com a região `auto` e guarda seus backups em uma pasta `frost` dentro do bucket.

## Bom saber

Não crie regras de ciclo de vida que apaguem ou façam expirar objetos da pasta do frost. Os snapshots compartilham blocos, e remover um único objeto pode estragar muitos snapshots.
