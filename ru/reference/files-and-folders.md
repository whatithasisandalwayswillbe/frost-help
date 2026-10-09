# Файлы и папки

frost хранит приложение, ваши настройки и свой кэш в разных папках на компьютере.

## Приложение

| Система | Папка приложения |
| --- | --- |
| macOS | `~/Library/Application Support/frost/app` |
| Linux | `~/.local/share/frost/app` или `$XDG_DATA_HOME/frost/app` |
| Windows | `%LocalAppData%\frost\app` |

В папке приложения лежат встроенная среда выполнения и каждая установленная версия. Не удаляйте из неё ничего.

Лаунчер `frost` находится в `/usr/local/bin` или `~/.local/bin` в macOS и Linux и в `~/bin` в Windows, если при установке вы не выбрали другую папку. Подробнее в разделе [Установка frost](#installing).

## Настройки и ключ

| Файл | macOS и Linux | Windows |
| --- | --- | --- |
| Настройки | `~/.config/frost/config.toml` | `%AppData%\frost\config.toml` |
| Ключ | `~/.config/frost/key` | `%AppData%\frost\key` |

## Кэш

| Файл | macOS и Linux | Windows |
| --- | --- | --- |
| Учёт отправленного | `~/.cache/frost/manifest-<repo>.jsonl` | `%LocalAppData%\frost\manifest-<repo>.jsonl` |
| Где копии открывались в последний раз | `~/.cache/frost/storage-<config>.json` | `%LocalAppData%\frost\storage-<config>.json` |
| Последняя проверка обновлений | `~/.cache/frost/update.json` | `%LocalAppData%\frost\update.json` |
| Журнал копирования по расписанию | `~/.cache/frost/frost.log` | `%LocalAppData%\frost\frost.log` |

С systemd копирование по расписанию пишет журнал не в `frost.log`, а в журнал systemd. См. раздел [Автоматическое резервное копирование](#scheduling), где также указано, где лежит задание по расписанию.

Учёт отправленного можно потерять без последствий. Если его удалить, следующая копия восстановит его по хранилищу и заново прочитает все файлы. Для восстановления файлов он не нужен. Рядом лежит файл `.lock`, который не даёт двум процессам frost писать одновременно. Удаление этого файла блокировки не останавливает работающий frost.

## Как сменить папки

В macOS и Linux frost учитывает `XDG_CONFIG_HOME` и `XDG_CACHE_HOME`. `FROST_CONFIG_DIR` и `FROST_CACHE_DIR` важнее их обеих, а `--config-dir` меняет папку конфигурации для одной команды.

Если вы меняете эти папки, снова запустите `frost init`, чтобы задание по расписанию тоже стало их использовать.
