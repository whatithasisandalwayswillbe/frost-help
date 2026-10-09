# Segurança e privacidade

O frost criptografa seus backups no seu computador, com uma chave que só você tem, antes de enviar qualquer coisa. Nem o seu provedor de armazenamento, nem quem opera o Permafrost, nem os autores do frost conseguem lê-los.

## O que é criptografado

O frost criptografa tudo o que está nos seus backups: o conteúdo dos arquivos, os nomes, a estrutura de pastas e os detalhes de cada snapshot. A sua chave nunca sai do seu computador, e não existe cópia dela em nenhum outro lugar.

| Parte | Como |
| --- | --- |
| Chave | 256 bits aleatórios, criados no seu computador pelo `frost init` |
| Frase de recuperação | A própria chave, escrita como 24 palavras BIP39 |
| Criptografia | XChaCha20-Poly1305, com um nonce aleatório novo para cada objeto |
| Nomes dos blocos | HMAC-SHA256 do conteúdo do bloco, calculado com a sua chave |
| Compactação | zstd, antes da criptografia, só quando deixa os dados menores |

## O que o seu provedor consegue ver

O seu provedor de armazenamento, seja um serviço S3 ou o Permafrost, consegue ver:

- Quantos objetos você tem, o tamanho deles e quando foram enviados.
- Quais objetos são blocos, cabeçalhos de snapshot ou índices de listas de arquivos.
- Quando você faz backup e restaura, e de qual endereço IP.
- Quantos dados novos cada backup envia, o que dá uma ideia de quanto mudou. Um backup sem nada novo não salva snapshot, então snapshots novos indicam quando algo mudou.
- O tamanho aproximado de um arquivo pequeno depois da compactação, mas não o que ele é nem como se chama. Arquivos grandes são divididos em blocos de tamanhos diferentes, então não aparecem como um único objeto do tamanho deles.

Ele não consegue verificar se você tem um determinado arquivo conhecido. Tanto os nomes dos blocos quanto os pontos de corte dependem da sua chave.

## Contra o que o frost protege

- O seu provedor, ou alguém com uma cópia do seu bucket, lendo seus arquivos.
- Alguém na rede entre você e o seu armazenamento. As conexões usam TLS, a menos que você escolha HTTP sem criptografia para um servidor local, e cada objeto é autenticado de qualquer forma.
- Adulteração. Um objeto alterado, trocado ou truncado não é descriptografado, e o frost nunca o aceita em silêncio.
- Uma restauração gravando fora da pasta que você escolheu.
- Downloads do frost adulterados. Cada versão é assinada, e o instalador e o `frost update` conferem a assinatura antes de instalar qualquer coisa.

## Contra o que ele não protege

- **Alguém com acesso ao seu computador.** O arquivo da chave fica no seu computador para que os backups agendados funcionem. Quem conseguir lê-lo, ou executar programas como você, consegue ler seus backups. Use criptografia de disco completo e bloqueio de tela.
- **Perda de dados no armazenamento.** O seu provedor pode apagar ou reter seus objetos. As verificações por amostragem podem perceber isso, mas o frost não consegue impedir. Mantenha uma segunda cópia independente de tudo o que você não pode perder.
- **Snapshots escondidos.** Um provedor poderia esconder seus snapshots mais recentes e servir só os antigos. Um computador que já viu os mais novos avisa que eles sumiram, mas um computador novo não tem como saber. Cada snapshot servido continua sendo autêntico.
- **Horários e tamanhos.** Quando você faz backup, e de quanto, fica visível, como mostrado acima.

## Arquivos no seu computador

No macOS e no Linux, o frost cria seus arquivos de modo que só o seu usuário consegue lê-los. No Windows, eles herdam as permissões do seu perfil de usuário.

| Arquivo | Contém |
| --- | --- |
| `key` | A sua frase de recuperação, em texto puro |
| `config.toml` | Suas configurações e as credenciais do armazenamento |
| `manifest-*.jsonl` | IDs de blocos, caminhos de arquivos, tamanhos e datas de modificação. Ele nunca sai do seu computador |
| `frost.log` | A saída dos backups agendados, incluindo os caminhos que não puderam ser lidos |

[Arquivos e pastas](#files-and-folders) mostra onde eles ficam.

## Recomendações

- Guarde a sua frase de recuperação fora do computador, em papel ou em um gerenciador de senhas de confiança.
- Execute `frost key verify` de vez em quando para garantir que a frase anotada está certa.
- Dê ao frost credenciais de armazenamento que só alcancem o próprio bucket.
- Confira o `frost status` de vez em quando e investigue na hora qualquer problema de integridade.

## Relatar um problema de segurança

Por favor, não abra uma issue pública. Relate em particular pela [aba Security](https://github.com/whatithasisandalwayswillbe/frost/security) do repositório do frost no GitHub, em **Report a vulnerability**. Inclua o que você encontrou, como reproduzir e o que um atacante poderia conseguir. Você recebe uma resposta em até uma semana.
