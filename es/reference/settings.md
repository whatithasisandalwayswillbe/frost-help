# Ajustes

frost guarda sus ajustes en `config.toml`, dentro de su carpeta de configuración. Puedes cambiarlos con `frost init`, `frost config set` o `frost config edit`, o en cualquier editor de texto.

## Leer y cambiar ajustes

| Comando | Qué hace |
| --- | --- |
| `frost config` | Muestra todos los ajustes. Las credenciales se ocultan salvo que añadas `--show-secrets` |
| `frost config get <key>` | Muestra un ajuste. Las listas muestran un elemento por línea |
| `frost config set <key> <value...>` | Cambia un ajuste y muestra qué ha cambiado |
| `frost config edit [editor]` | Abre `config.toml` en un editor |

Por ejemplo:

```sh
frost config get schedule.every
frost config set schedule.every 6h
frost config set paths ~/Documents ~/Pictures
```

- Una lista recibe un valor por elemento, y `set` sustituye la lista entera.
- `true` y `false` activan y desactivan ajustes.
- Cambiar un ajuste de `schedule` actualiza la tarea programada al momento. En macOS y Windows, un cambio hecho mientras se ejecuta una copia programada se aplica en cuanto esa copia termina, así que no se interrumpe.
- Si cambias dónde está tu almacenamiento, frost comprueba la nueva ubicación antes de guardarla. Consulta [Mover tus copias de seguridad](#moving-backups).

## Editar el archivo

```sh
frost config edit
```

frost abre una copia de `config.toml` en el editor que indiques, o en `$VISUAL` o `$EDITOR`, o si no en nano, vim o vi. En Windows, la alternativa es el Bloc de notas. Al cerrar el editor, frost enumera lo que has cambiado y guarda la copia cuando escribes `yes`.

Si el archivo no se puede interpretar, frost te señala el problema y te ofrece abrirlo de nuevo, así que una errata no puede estropear tus copias programadas. Los ajustes desconocidos cuentan como errores, así que un nombre mal escrito no pasa desapercibido.

## Editarlo tú mismo

También puedes abrir `config.toml` en cualquier editor de texto y guardarlo. frost lo lee cada vez que se ejecuta, así que la mayoría de los cambios se aplican desde la siguiente ejecución. Dos tipos de cambio necesitan un paso más, que frost da la próxima vez que ejecutes cualquier comando de frost:

- Si cambias la programación, frost actualiza la tarea programada y lo indica con "config.toml changed. Scheduled job updated" (config.toml cambió; tarea programada actualizada). En Linux, la siguiente copia programada también lo hace. Un cambio hecho mientras se ejecuta una copia programada espera a que termine, igual que con `frost config set`.
- Una nueva ubicación de almacenamiento recibe las mismas comprobaciones que con `frost config edit` la primera vez que frost la usa. Cualquier problema aparece como aviso.

Nada comprueba el archivo antes de que lo guardes. Si no se puede interpretar, los comandos de frost lo indican hasta que lo arregles.

## Todos los ajustes

| Clave | Valor predeterminado | Significado |
| --- | --- | --- |
| `paths` | | Las carpetas que se respaldan |
| `exclude` | `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules`, `.cache` | Nombres y patrones que se excluyen. Consulta [Excluir archivos](#excluding-files) |
| `schedule.enabled` | `true` | Hacer copias automáticamente |
| `schedule.every` | `daily` | `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily` o `weekly` |
| `schedule.time` | `15:00` | La hora de las copias, en formato de 24 horas. Consulta [Copias de seguridad automáticas](#scheduling) |
| `schedule.day` | `sunday` | El día de las copias semanales, de `sunday` a `saturday` |
| `schedule.catch_up` | `true` | Hace una copia cuando tu equipo vuelve tras perderse una. `false` se salta las copias perdidas |
| `verify.sample` | `20` | Cuántos fragmentos descarga la comprobación aleatoria. `0` la desactiva |
| `update.auto` | `true` | Instalar versiones nuevas después de las copias programadas. `false` solo te avisa de ellas |
| `storage.backend` | | `permafrost`, `s3`, `sftp` para [Servidor propio](#self-hosted), o `local` para un [disco local](#local-drive) |
| `storage.sftp.host` | | La dirección SSH de tu servidor, como `me@nas.local`, o un `Host` de tu configuración de SSH |
| `storage.sftp.port` | `0` | El puerto SSH del servidor. `0` usa el puerto de tu configuración de SSH, o el 22 |
| `storage.sftp.path` | `frost` | La carpeta del servidor. Una ruta relativa empieza en tu carpeta personal del servidor |
| `storage.local.path` | | La ruta completa de la carpeta en un disco |
| `storage.permafrost.url` | | Vacío para el servidor predeterminado, `https://permafrost.wihiaawb.com`. Si no, una dirección `https://`, o `http://` para un servidor en tu propio equipo |
| `storage.permafrost.token` | | Tu clave de acceso de Permafrost |
| `storage.s3.endpoint` | | Como `s3.us-east-1.amazonaws.com`. También vale una dirección completa `https://`, y una `http://` desactiva TLS |
| `storage.s3.region` | | Vacío si tu servidor o proveedor no usa regiones |
| `storage.s3.bucket` | | El nombre del bucket. Ya tiene que existir |
| `storage.s3.prefix` | `frost` | La carpeta del bucket que contiene tus copias. Vacío para la raíz del bucket |
| `storage.s3.access_key_id` | | Tu ID de clave de acceso |
| `storage.s3.secret_access_key` | | Tu clave de acceso secreta |
| `storage.s3.insecure` | `false` | Usar HTTP sin cifrar cuando el endpoint no tiene esquema. Solo para pruebas locales |

## Variables de entorno

| Variable | Sustituye a |
| --- | --- |
| `FROST_S3_ACCESS_KEY_ID` o `AWS_ACCESS_KEY_ID` | `storage.s3.access_key_id` |
| `FROST_S3_SECRET_ACCESS_KEY` o `AWS_SECRET_ACCESS_KEY` | `storage.s3.secret_access_key` |
| `FROST_PERMAFROST_TOKEN` | `storage.permafrost.token` |
| `FROST_CONFIG_DIR` | La carpeta de configuración, como `--config-dir` |
| `FROST_CACHE_DIR` | La carpeta de caché |

frost nunca escribe en `config.toml` los valores que vienen del entorno. Las copias programadas no ven las variables que defines en tu shell, así que siguen necesitando las credenciales en `config.toml`.
