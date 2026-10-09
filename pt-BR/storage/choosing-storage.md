# Escolher o armazenamento

O frost guarda seus backups no Permafrost ou em qualquer provedor compatível com S3 que aceite gravações condicionais. Em todos os casos, tudo é criptografado antes de sair do seu computador, então o seu provedor não consegue ler nada.

## Suas opções

- **[Permafrost](#permafrost)** é um armazenamento hospedado feito para o frost. Ele precisa só de uma chave de acesso, sem bucket, região ou endpoint para configurar.
- **Armazenamento compatível com S3** usa um bucket que você cria em um provedor como [Amazon S3](#amazon-s3), [Cloudflare R2](#cloudflare-r2), [Backblaze B2](#backblaze-b2) ou [Wasabi](#wasabi), ou em um servidor que você mesmo mantém, como o [MinIO](#other-s3).

## Gravações condicionais

O frost precisa de um armazenamento que aceite gravações condicionais atômicas (`If-None-Match: *`). Elas impedem que dois computadores sobrescrevam os registros de backup um do outro. A configuração testa isso ao se conectar e recusa o armazenamento que falhar. Se o provedor não oferece suporte, nenhuma outra chave ou configuração resolve.

| Provedor | Gravações condicionais |
| --- | --- |
| Permafrost | Suportadas |
| Amazon S3 | [Documentadas](https://docs.aws.amazon.com/AmazonS3/latest/userguide/conditional-writes.html) |
| Cloudflare R2 | [Documentadas](https://developers.cloudflare.com/r2/api/s3/api/) |
| MinIO | Implementadas no servidor. A sua versão precisa passar no teste da configuração |
| Backblaze B2 | Não confirmadas. A [referência de upload](https://www.backblaze.com/apidocs/s3-put-object) não cita `If-None-Match` |
| Wasabi | Não confirmadas. A [referência da API](https://docs.wasabi.com/apidocs/operations-on-objects) não comprova o suporte |
| Garage | Sem suporte, segundo o responsável pelo projeto |

Isso foi conferido na documentação e no código-fonte de cada provedor em 2 de outubro de 2026, sem testes reais. O que vale é o teste da própria configuração.

## O que levar em conta

- **Custo para restaurar.** Alguns provedores cobram pelos downloads. Uma restauração completa baixa tudo, e cada verificação por amostragem baixa uma pequena amostra.
- **Classes de armazenamento de arquivamento.** O frost lê os blocos diretamente, então não mova os objetos dele para uma classe de arquivamento que precise ser descongelada antes da leitura.
- **Exclusão e expiração.** O frost nunca apaga seus backups. Não crie regras de ciclo de vida que apaguem ou façam expirar objetos da pasta dele, porque os snapshots compartilham blocos.
- **Chaves limitadas.** Dê ao frost uma chave de acesso que só alcance o próprio bucket.

## Trocar de armazenamento depois

Você pode mover seus backups para outro provedor sem enviar tudo de novo. Veja [Mover seus backups](#moving-backups).
