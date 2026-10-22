# Escolher o armazenamento

O Frost pode guardar seus backups no seu próprio servidor, em um disco, no Permafrost ou em um serviço compatível com S3. Onde quer que fiquem, tudo é criptografado antes no seu computador, então quem mantém o armazenamento não consegue ler seus arquivos.

## Suas opções

| Armazenamento | Bom para | O que você precisa |
| --- | --- | --- |
| [Servidor próprio](#self-hosted) | Um NAS, servidor doméstico ou VPS que você mantém | Acesso por SSH |
| [Disco local](#local-drive) | Um disco USB ou um segundo disco | Um disco conectado quando os backups rodam |
| [Permafrost](#permafrost) | Armazenamento hospedado feito para o Frost | Uma chave de acesso |
| [Provedores de nuvem](#cloud-providers) | Amazon S3, Cloudflare R2, Backblaze B2 ou Wasabi | Um bucket e as chaves dele |
| [Outro armazenamento compatível com S3](#other-s3) | Um servidor S3 que você mantém, como Ceph ou SeaweedFS, ou outro serviço S3 | Um bucket e as chaves dele |

Com um servidor próprio ou um disco local, seus backups ficam em um hardware que você controla, sem conta em lugar nenhum. O Permafrost e os provedores de nuvem guardam os backups fora de casa, sem uma máquina sua para manter.

## Gravações condicionais

O Frost precisa de um armazenamento que consiga criar um arquivo em um único passo, só se o nome dele estiver livre. Isso impede que dois computadores sobrescrevam os registros de backup um do outro. A configuração testa isso ao se conectar e recusa o armazenamento que falhar. Se o armazenamento não oferece suporte, nenhuma outra chave ou configuração resolve.

| Armazenamento | Gravações condicionais |
| --- | --- |
| Servidor próprio | Suportadas por servidores OpenSSH, em sistemas de arquivos com links físicos, como ext4, Btrfs, XFS, ZFS, APFS e NTFS |
| Disco local | Suportadas em NTFS, APFS, ext4, Btrfs e XFS. Outros sistemas de arquivos precisam passar no teste da configuração |
| Permafrost | Suportadas |
| Amazon S3 | [Documentadas](https://docs.aws.amazon.com/AmazonS3/latest/userguide/conditional-writes.html) |
| Cloudflare R2 | [Documentadas](https://developers.cloudflare.com/r2/api/s3/api/) |
| Ceph | Implementadas no servidor. A sua versão precisa passar no teste da configuração |
| SeaweedFS | [Documentadas](https://github.com/seaweedfs/seaweedfs/wiki/S3-Conditional-Operations). A sua versão precisa passar no teste da configuração |
| MinIO | Implementadas no servidor, que não é mais mantido. A sua versão precisa passar no teste da configuração |
| Backblaze B2 | Não confirmadas. A [referência de upload](https://www.backblaze.com/apidocs/s3-put-object) não cita `If-None-Match` |
| Wasabi | Não confirmadas. A [referência da API](https://docs.wasabi.com/apidocs/operations-on-objects) não comprova o suporte |
| Garage | Sem suporte, segundo o responsável pelo projeto |

Os dados dos serviços S3 foram conferidos na documentação e no código-fonte de cada projeto em outubro de 2026, sem testes reais. O que vale é o teste da própria configuração.

## O que levar em conta

- **Uma cópia fora de casa.** Um disco ou um servidor em casa pode se perder no mesmo incêndio ou roubo que o seu computador. Um servidor em outro lugar, o Permafrost ou um provedor de nuvem, não. Guarde uma segunda cópia independente de tudo o que for insubstituível em outro lugar.
- **Custo para restaurar.** Alguns provedores de nuvem cobram pelos downloads. Uma restauração completa baixa tudo, e cada verificação por amostragem baixa uma pequena amostra.
- **Classes de armazenamento de arquivamento.** O Frost lê os blocos diretamente, então não mova os objetos dele para uma classe de arquivamento que precise ser descongelada antes da leitura.
- **Exclusão e expiração.** O Frost nunca apaga seus backups. Não crie regras de ciclo de vida nem tarefas de limpeza que apaguem ou façam expirar arquivos da pasta dele, porque os snapshots compartilham blocos.
- **Acesso limitado.** Dê ao Frost uma chave de acesso que só alcance o próprio bucket, ou uma conta no servidor que não consiga mudar mais nada que importe para você.

## Trocar de armazenamento depois

Você pode mover seus backups para outro tipo de armazenamento sem enviar tudo de novo. Veja [Mover seus backups](#moving-backups).
