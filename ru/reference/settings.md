# Настройки

frost хранит настройки в файле `config.toml` в своей папке конфигурации. Изменить их можно через `frost init`, `frost config set` или `frost config edit`.

## Чтение и изменение настроек

| Команда | Что делает |
| --- | --- |
| `frost config` | Выводит все настройки. Учётные данные скрыты, если не добавить `--show-secrets` |
| `frost config get <key>` | Выводит одну настройку. Списки выводятся по одному элементу в строке |
| `frost config set <key> <value...>` | Меняет одну настройку и показывает, что изменилось |
| `frost config edit [editor]` | Открывает `config.toml` в редакторе |

Например:

```sh
frost config get schedule.every
frost config set schedule.every 6h
frost config set paths ~/Documents ~/Pictures
```

- Список получает по одному значению на элемент, а `set` заменяет список целиком.
- `true` и `false` включают и выключают настройки.
- Изменение `schedule.enabled` или `schedule.every` сразу обновляет задание по расписанию.
- Если вы меняете место хранения, frost проверяет новое место перед сохранением. Подробнее в разделе [Перенос резервных копий](#moving-backups).

## Редактирование файла

```sh
frost config edit
```

frost открывает копию `config.toml` в указанном вами редакторе, иначе в `$VISUAL` или `$EDITOR`, а если их нет, в nano, vim или vi. В Windows в этом случае открывается Блокнот. Когда вы закроете редактор, frost покажет, что вы изменили, и сохранит копию, как только вы введёте `yes`.

Если файл не удаётся разобрать, frost объяснит почему и предложит открыть его снова, так что опечатка не сломает копирование по расписанию. Неизвестные настройки тоже считаются ошибкой, поэтому имя с опечаткой не пройдёт незамеченным.

## Все настройки

| Ключ | По умолчанию | Значение |
| --- | --- | --- |
| `paths` | | Папки для копирования |
| `exclude` | `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules`, `.cache` | Имена и шаблоны, которые исключаются. См. раздел [Исключение файлов](#excluding-files) |
| `schedule.enabled` | `true` | Делать копии автоматически |
| `schedule.every` | `daily` | `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily` или `weekly` |
| `verify.sample` | `20` | Сколько блоков скачивает выборочная проверка. `0` её выключает |
| `update.auto` | `true` | Устанавливать новые версии после копирования по расписанию. `false` только сообщает о них |
| `storage.backend` | | `permafrost` или `s3` |
| `storage.permafrost.url` | | Пусто для сервера по умолчанию. Иначе адрес `https://` или `http://` для сервера на вашем компьютере |
| `storage.permafrost.token` | | Ваш ключ доступа Permafrost |
| `storage.s3.endpoint` | | Например `s3.us-east-1.amazonaws.com`. Подойдёт и полный адрес `https://`, а адрес `http://` выключает TLS |
| `storage.s3.region` | | Пусто, если ваш провайдер не использует регионы |
| `storage.s3.bucket` | | Имя бакета. Бакет должен уже существовать |
| `storage.s3.prefix` | `frost` | Папка в бакете, где лежат копии. Пусто для корня бакета |
| `storage.s3.access_key_id` | | Идентификатор вашего ключа доступа |
| `storage.s3.secret_access_key` | | Ваш секретный ключ доступа |
| `storage.s3.insecure` | `false` | Использовать обычный HTTP для эндпоинтов без указания протокола. Только для локальных тестов |

## Переменные окружения

| Переменная | Заменяет |
| --- | --- |
| `FROST_S3_ACCESS_KEY_ID` или `AWS_ACCESS_KEY_ID` | `storage.s3.access_key_id` |
| `FROST_S3_SECRET_ACCESS_KEY` или `AWS_SECRET_ACCESS_KEY` | `storage.s3.secret_access_key` |
| `FROST_PERMAFROST_TOKEN` | `storage.permafrost.token` |
| `FROST_CONFIG_DIR` | Папку конфигурации, как `--config-dir` |
| `FROST_CACHE_DIR` | Папку кэша |

frost никогда не записывает значения из окружения в `config.toml`. Копирование по расписанию не видит переменных, заданных в вашей оболочке, поэтому учётные данные всё равно должны быть в `config.toml`.
