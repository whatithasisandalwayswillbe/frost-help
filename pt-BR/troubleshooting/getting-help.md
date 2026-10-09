# Como obter ajuda

Se o seu problema não está nesta documentação, veja aqui como descobrir mais e pedir ajuda.

## Antes de tudo

- O `frost status` mostra o resultado do último backup, a integridade dos seus backups e qualquer problema para acessar o armazenamento.
- O `frost -h` lista todos os comandos e opções.
- O log dos backups agendados mostra o que aconteceu durante os backups automáticos. Veja [Backups automáticos](#scheduling).
- [Problemas comuns](#common-problems) reúne as mensagens mais frequentes.

## Pergunte no GitHub

Abra uma issue em [github.com/whatithasisandalwayswillbe/frost/issues](https://github.com/whatithasisandalwayswillbe/frost/issues) e inclua:

- A sua versão do frost, de `frost --version`, e o seu sistema operacional.
- O que você executou e o que esperava que acontecesse.
- O que aconteceu de fato, com a mensagem exata.
- As linhas relacionadas do `frost status` ou do log.

> Nunca publique a sua frase de recuperação, o arquivo da chave, as suas chaves de acesso nem um `config.toml` com credenciais. O `frost config` esconde as credenciais, a menos que você acrescente `--show-secrets`. Revise tudo o que colar antes de publicar.

## Problemas de segurança

Não relate problemas de segurança em uma issue pública. Veja [Segurança e privacidade](#security) para relatar em particular.
