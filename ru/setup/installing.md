# Установка Frost

Frost устанавливается одной командой в macOS, Linux и Windows. В каждую версию входит своя среда выполнения, так что заранее ничего ставить не нужно.

## Поддерживаемые системы

| Система | Процессоры |
| --- | --- |
| macOS | Apple Silicon (`arm64`) и Intel (`amd64`) |
| Linux | `amd64` и `arm64` |
| Windows | `amd64` и `arm64` |

Пакета для 32-битного ARM, например для старых Raspberry Pi, нет. В Windows через WSL устанавливается пакет для Linux.

## Установщик

В macOS или Linux выполните эту команду в терминале:

```sh
curl -fsSL https://getfro.st/install.sh | sh
```

В Windows выполните эту команду в PowerShell:

```powershell
irm https://getfro.st/install.ps1 | iex
```

Установщик:

1. Скачивает последнюю версию для вашей системы.
2. Проверяет подпись версии и контрольную сумму загрузки и останавливается, если что-то не сходится.
3. Устанавливает Frost в ваш профиль пользователя и кладёт лаунчер `frost` в папку из `PATH`.

В macOS и Linux ему нужны `curl` или `wget`, `ssh-keygen` из OpenSSH 8.1 или новее и `sha256sum` или `shasum` для проверки. В Windows ему нужен Windows PowerShell 5.1, который входит в Windows 10 и 11, или PowerShell 7. Подпись он проверяет средой выполнения из самой версии, после того как Windows подтвердит, что её подписала OpenJS Foundation.

В macOS и Linux лаунчер попадает в `/usr/local/bin`, если у вас есть право записи туда, иначе в `~/.local/bin`. Если этой папки ещё нет в `PATH`, установщик покажет строку, которая её туда добавит. В Windows лаунчер попадает в `%LocalAppData%\frost\bin`, и установщик сам добавляет эту папку в `PATH`. Терминалы, открытые до установки, нужно перезапустить, чтобы они нашли `frost`.

Установщик через `curl` работает и в Git Bash в Windows. Там ему нужен `cygpath`, который есть в Git Bash, для распаковки он использует `unzip` или PowerShell, а лаунчер кладёт в `~/bin`.

Когда установка закончится, выполните `frost init`, чтобы настроить первую резервную копию. Подробнее в разделе [Настройка Frost](#setting-up).

## Параметры установщика

| Переменная | Что делает |
| --- | --- |
| `FROST_INSTALL_DIR` | Кладёт лаунчер в указанную папку. Установщик для Windows не добавляет её в `PATH` |
| `FROST_VERSION` | Устанавливает указанную версию, например `v0.1.0`, вместо последней |

Например, в macOS или Linux:

```sh
curl -fsSL https://getfro.st/install.sh | FROST_INSTALL_DIR="$HOME/bin" sh
```

В Windows сначала задайте переменную в том же окне PowerShell:

```powershell
$env:FROST_VERSION = 'v0.1.0'; irm https://getfro.st/install.ps1 | iex
```

Смена папки лаунчера не перемещает сам Frost. Где что лежит, показано в разделе [Файлы и папки](#files-and-folders).

## Через npm или pnpm

Если у вас уже есть Node.js 22 или новее, Frost можно установить через npm:

```sh
npm install -g getfrost
```

Или через pnpm:

```sh
pnpm add -g getfrost
```

Пакет называется `getfrost`, а команда, которую он даёт, называется `frost`. При первом запуске `frost` скачивает версию для вашей системы, проверяет её подпись и контрольную сумму так же, как установщик, и устанавливает её в ваш профиль пользователя. Затем он выполняет вашу команду. После этого каждая команда `frost` сразу передаётся установленному Frost, а он сам следит за обновлениями.

Если вы пользуетесь pnpm и ещё ни разу не запускали `pnpm setup`, сначала выполните его, чтобы глобальные команды pnpm оказались в `PATH`.

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
