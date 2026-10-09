# Sua frase de recuperação

A sua frase de recuperação é a sua chave de criptografia escrita como 24 palavras. Ela é a única forma de ler seus backups.

> Se você perder a frase de recuperação e o computador, seus backups estão perdidos. Ninguém consegue recuperá-los: nem o seu provedor de armazenamento, nem o Permafrost, nem os autores do frost.

## Guarde bem

A configuração mostra a frase quando cria a sua chave. Anote em papel ou guarde em um gerenciador de senhas de confiança, e mantenha em um lugar diferente do computador que você está protegendo.

Também há uma cópia no seu computador, no arquivo `key` da pasta de configuração do frost, para que os backups agendados funcionem sem você. Só o seu usuário consegue lê-la. Quem conseguir ler esse arquivo, ou executar programas como você, consegue ler seus backups, então use criptografia de disco completo e bloqueio de tela.

Para ler seus backups, alguém precisa ter a frase e também acesso ao seu armazenamento. Mantenha as chaves do seu armazenamento em sigilo também.

## Mostrar a frase

```sh
frost key show
```

O frost avisa antes e só mostra a frase depois que você digitar `show`. Confira se ninguém está olhando a sua tela e se você não está compartilhando a tela.

## Conferir a sua cópia

```sh
frost key verify
```

Digite a frase que você anotou. O frost diz se ela é válida, se corresponde à chave deste computador e se abre seus backups. Ele nunca mostra a frase. Confira a sua cópia de vez em quando.

## Usar em outro computador

O `frost init` pede a frase quando se conecta a um armazenamento que já tem seus backups. Para colocá-la diretamente em um computador:

```sh
frost key import
```

Se o armazenamento já estiver configurado, o frost confere primeiro se a frase o abre. Se já houver outra chave no computador, o frost pergunta antes de substituí-la. Backups feitos com a chave antiga precisam da frase antiga para serem restaurados.

Veja [Recuperar em um computador novo](#new-computer) para o passo a passo completo.

## Digitar a frase

Digite as 24 palavras em ordem, separadas por espaços. Maiúsculas não fazem diferença. As palavras vêm da lista padrão BIP39 em inglês, com 2.048 palavras, então o frost consegue avisar quando uma está escrita errado:

| O frost diz | Significa |
| --- | --- |
| that's 23 words, a recovery phrase has 24 | Falta ou sobra uma palavra |
| word 5, "hapy", isn't a recovery phrase word | Essa palavra está escrita errado |
| all the words are real, but they don't make a valid phrase | Duas palavras estão trocadas de lugar, ou uma é outra palavra real |
| that's a valid phrase, but not the one for these backups | A frase é de outro conjunto de backups |

## A impressão digital da chave

A impressão digital é um ID curto, como `6f154dc10058`, que identifica a sua chave sem revelá-la. O `frost status` a mostra, e o navegador de snapshots também, quando você pressiona `[v]`. Dois computadores com a mesma impressão digital têm a mesma chave.

## Trocar a sua chave

O frost não consegue trocar a chave dos backups que você já tem. Se outra pessoa pode ter visto a sua frase, ela consegue ler esses backups enquanto tiver acesso ao seu armazenamento, então troque as chaves do seu armazenamento e mantenha-as em sigilo.
