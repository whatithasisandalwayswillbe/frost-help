# Установка frost

frost устанавливается одной командой в macOS, Linux и Windows. В каждую версию входит своя среда выполнения, так что заранее ничего ставить не нужно.

## Поддерживаемые системы

| Система | Процессоры |
| --- | --- |
| macOS | Apple Silicon (`arm64`) и Intel (`amd64`) |
| Linux | `amd64` и `arm64` |
| Windows | `amd64` и `arm64` |

Пакета для 32-битного ARM, например для старых Raspberry Pi, нет. В Windows через WSL устанавливается пакет для Linux.

## Установщик

В macOS или Linux выполните эту команду в терминале. В Windows выполните её в Git Bash.

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | sh
```

Установщик:

1. Скачивает последнюю версию для вашей системы.
2. Проверяет подпись версии и контрольную сумму загрузки и останавливается, если что-то не сходится.
3. Устанавливает frost в ваш профиль пользователя и кладёт лаунчер `frost` в папку из `PATH`.

Ему нужны `curl` или `wget`, `ssh-keygen` из OpenSSH 8.1 или новее и `sha256sum` или `shasum` для проверки. Для распаковки используются `tar` в macOS и Linux, а в Windows `unzip` или PowerShell. Git Bash предоставляет `cygpath`, который также нужен установщику в Windows.

Лаунчер попадает в `/usr/local/bin`, если у вас есть право записи туда, иначе в `~/.local/bin`. В Windows он попадает в `~/bin`. Если этой папки ещё нет в `PATH`, установщик покажет строку, которая её туда добавит.

Когда установка закончится, выполните `frost init`, чтобы настроить первую резервную копию. Подробнее в разделе [Настройка frost](#setting-up).

## Параметры установщика

| Переменная | Что делает |
| --- | --- |
| `FROST_INSTALL_DIR` | Кладёт лаунчер в указанную папку |
| `FROST_VERSION` | Устанавливает указанную версию, например `v0.1.0`, вместо последней |

Например:

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | FROST_INSTALL_DIR="$HOME/bin" sh
```

Смена папки лаунчера не перемещает сам frost. Где что лежит, показано в разделе [Файлы и папки](#files-and-folders).

## Установка вручную

1. Скачайте архив для своей системы со страницы [последней версии](https://github.com/whatithasisandalwayswillbe/frost/releases/latest). Имена архивов выглядят как `frost_0.1.0_linux_amd64.tar.gz`, для Windows с расширением `.zip`.
2. Прежде чем что-либо из него запускать, проверьте загрузку, как описано ниже в подразделе «Проверка загрузки».
3. Распакуйте архив в новую пустую папку.
4. В распакованной папке запустите входящий в пакет установщик и укажите ему папку для лаунчера.

В macOS или Linux:

```sh
./runtime/bin/node install.mjs "$PWD" "$HOME/.local/bin"
```

В Windows, в PowerShell:

```powershell
.\runtime\bin\node.exe .\install.mjs "$PWD" "$env:LOCALAPPDATA\frost\bin"
```

Затем добавьте папку лаунчера в `PATH`, если её там ещё нет. В Windows `frost.cmd` работает в командной строке и PowerShell, а `frost` работает в Git Bash.

Чтобы пользоваться распакованным пакетом без установки, запускайте его лаунчер `frost` (в Windows `frost.cmd`) напрямую и держите все его файлы вместе.

## Проверка загрузки

Установщик делает это за вас. Чтобы проверить архив самостоятельно, скачайте его вместе с `checksums.txt` и `checksums.txt.sig` той же версии, а также [`release-signing.pub`](https://github.com/whatithasisandalwayswillbe/frost/blob/main/install/release-signing.pub) из репозитория. Запишите имя архива в `archive` и выполните:

```sh
(
  set -e
  archive='frost_X.Y.Z_linux_amd64.tar.gz'
  printf 'frost-release %s\n' "$(cat release-signing.pub)" > allowed_signers
  ssh-keygen -Y verify -f allowed_signers -I frost-release -n file -s checksums.txt.sig < checksums.txt
  selected_checksum=$(awk -v archive="$archive" '$2 == archive { line = $0; count++ } END { if (count != 1) exit 1; print line }' checksums.txt)
  printf '%s\n' "$selected_checksum" | shasum -a 256 -c -
)
```

Команды останавливаются, если подпись неверна или в подписанном списке нет ровно одной записи для вашего архива. Первая проверка должна вывести `Good "file" signature`, а вторая `OK` после имени вашего архива. Если хотя бы одна этого не делает, не устанавливайте архив.
