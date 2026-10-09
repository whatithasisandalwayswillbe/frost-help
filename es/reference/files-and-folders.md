# Archivos y carpetas

frost guarda la aplicación, tus ajustes y su caché en carpetas separadas de tu equipo.

## La aplicación

| Sistema | Carpeta de la aplicación |
| --- | --- |
| macOS | `~/Library/Application Support/frost/app` |
| Linux | `~/.local/share/frost/app`, o `$XDG_DATA_HOME/frost/app` |
| Windows | `%LocalAppData%\frost\app` |

La carpeta de la aplicación contiene el entorno de ejecución incluido y cada versión instalada. Mantenla completa.

El lanzador `frost` está en `/usr/local/bin` o `~/.local/bin` en macOS y Linux, y en `~/bin` en Windows, salvo que hayas elegido otra carpeta al instalar. Consulta [Instalar frost](#installing).

## Ajustes y clave

| Archivo | macOS y Linux | Windows |
| --- | --- | --- |
| Ajustes | `~/.config/frost/config.toml` | `%AppData%\frost\config.toml` |
| Clave | `~/.config/frost/key` | `%AppData%\frost\key` |

## Caché

| Archivo | macOS y Linux | Windows |
| --- | --- | --- |
| Registro de lo que se ha subido | `~/.cache/frost/manifest-<repo>.jsonl` | `%LocalAppData%\frost\manifest-<repo>.jsonl` |
| Dónde se abrieron tus copias por última vez | `~/.cache/frost/storage-<config>.json` | `%LocalAppData%\frost\storage-<config>.json` |
| Última búsqueda de actualizaciones | `~/.cache/frost/update.json` | `%LocalAppData%\frost\update.json` |
| Registro de las copias programadas | `~/.cache/frost/frost.log` | `%LocalAppData%\frost\frost.log` |

Con systemd, las copias programadas escriben su registro en el journal en lugar de en `frost.log`. Consulta [Copias de seguridad automáticas](#scheduling), donde también se indica dónde está la tarea programada.

El registro de lo que se ha subido es prescindible. Si lo borras, la siguiente copia lo reconstruye a partir de tu almacenamiento y vuelve a leer todos tus archivos. Para restaurar no se necesita. A su lado hay un archivo `.lock` que impide que dos procesos de frost escriban a la vez. Borrar el archivo de bloqueo no detiene un frost que esté en marcha.

## Cambiar las carpetas

En macOS y Linux, frost respeta `XDG_CONFIG_HOME` y `XDG_CACHE_HOME`. `FROST_CONFIG_DIR` y `FROST_CACHE_DIR` tienen prioridad sobre ambas, y `--config-dir` cambia la carpeta de configuración para un solo comando.

Si cambias estas carpetas, vuelve a ejecutar `frost init` para que la tarea programada también las use.
