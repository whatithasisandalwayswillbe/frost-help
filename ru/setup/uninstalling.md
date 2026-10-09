# Удаление frost

Отдельной команды удаления у frost нет, но убрать его можно за несколько шагов.

> Удаление frost не удаляет резервные копии. Если они могут когда-нибудь понадобиться, убедитесь, что у вас есть фраза восстановления, прежде чем удалять ключ с этого компьютера. Показать её можно командой `frost key show`.

## 1. Удалите задание по расписанию

```sh
frost config set schedule.enabled false
```

Эта команда удаляет задание из планировщика операционной системы. В Linux с systemd она также снова выключает lingering, если frost сохранил запись о том, что сам его включил.

## 2. Удалите файлы frost

На этом шаге удаляются приложение, его лаунчер, ваши настройки, ваш ключ и кэш frost. Если вы меняли расположение, исправьте пути ниже так, чтобы они указывали на собственные файлы и папки frost. `FROST_CONFIG_DIR` и `FROST_CACHE_DIR` указывают прямо на папки frost; в `XDG_CONFIG_HOME`, `XDG_CACHE_HOME` и `XDG_DATA_HOME` используется подпапка `frost`. Никогда не удаляйте сам корневой каталог XDG или общую папку. Все расположения перечислены в разделе [Файлы и папки](#files-and-folders).

В macOS:

```sh
rm -rf ~/Library/Application\ Support/frost ~/.config/frost ~/.cache/frost
rm -f /usr/local/bin/frost ~/.local/bin/frost
```

В Linux:

```sh
rm -rf ~/.local/share/frost ~/.config/frost ~/.cache/frost
rm -f /usr/local/bin/frost ~/.local/bin/frost
```

В Windows, в PowerShell:

```powershell
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\frost", "$env:APPDATA\frost"
Remove-Item -Force "$HOME\bin\frost", "$HOME\bin\frost.cmd"
```

Если вы ставили лаунчер в другое место, удалите его оттуда.

## 3. Удалите резервные копии, если хотите

Копии остаются в хранилище, пока вы их не удалите. У S3-провайдера они лежат в одной папке бакета, по умолчанию `frost`, если вы не выбрали другую. Удалите эту папку, чтобы убрать копии. Без вашей фразы восстановления никто не сможет прочитать то, что в ней останется.
