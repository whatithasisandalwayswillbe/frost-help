# Desinstalar o frost

O frost não tem um comando de desinstalação, mas removê-lo leva só alguns passos.

> Desinstalar o frost não apaga os seus backups. Se você talvez queira recuperá-los um dia, garanta que tem a sua frase de recuperação antes de apagar a chave deste computador. O `frost key show` mostra a frase.

## 1. Remova a tarefa agendada

```sh
frost config set schedule.enabled false
```

Isso remove a tarefa do agendador do sistema operacional. No Linux com systemd, também desliga o lingering de novo se o frost tiver registrado que o ligou.

## 2. Apague os arquivos do frost

Isto apaga o aplicativo, o inicializador, suas configurações, sua chave e o cache do frost. Se você mudou algum local, ajuste os caminhos abaixo para apontar para os arquivos e pastas do próprio frost. `FROST_CONFIG_DIR` e `FROST_CACHE_DIR` indicam diretamente as pastas do frost; `XDG_CONFIG_HOME`, `XDG_CACHE_HOME` e `XDG_DATA_HOME` contêm uma subpasta `frost`. Nunca apague uma pasta raiz do XDG nem uma pasta compartilhada. [Arquivos e pastas](#files-and-folders) lista todos os locais.

No macOS:

```sh
rm -rf ~/Library/Application\ Support/frost ~/.config/frost ~/.cache/frost
rm -f /usr/local/bin/frost ~/.local/bin/frost
```

No Linux:

```sh
rm -rf ~/.local/share/frost ~/.config/frost ~/.cache/frost
rm -f /usr/local/bin/frost ~/.local/bin/frost
```

No Windows, no PowerShell:

```powershell
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\frost", "$env:APPDATA\frost"
Remove-Item -Force "$HOME\bin\frost", "$HOME\bin\frost.cmd"
```

Se você instalou o inicializador em outro lugar, apague-o de lá.

## 3. Apague seus backups, se quiser

Seus backups ficam no armazenamento até você apagá-los. Com um provedor S3, eles estão em uma pasta do seu bucket, `frost`, a menos que você tenha escolhido outra. Apague essa pasta para removê-los. Sem a sua frase de recuperação, ninguém consegue ler o que sobrar nela.
