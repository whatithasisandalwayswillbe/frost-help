# Ajustes

frost guarda sus ajustes en `config.toml`, dentro de su carpeta de configuración. Puedes cambiarlos con `frost init`, `frost config set` o `frost config edit`.

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
- Cambiar `schedule.enabled` o `schedule.every` actualiza la tarea programada al momento.
- Si cambias dónde está tu almacenamiento, frost comprueba la nueva ubicación antes de guardarla. Consulta [Mover tus copias de seguridad](#moving-backups).

## Editar el archivo

```sh
frost config edit
```

frost abre una copia de `config.toml` en el editor que indiques, o en `$VISUAL` o `$EDITOR`, o si no en nano, vim o vi. En Windows, la alternativa es el Bloc de notas. Al cerrar el editor, frost enumera lo que has cambiado y guarda la copia cuando escribes `yes`.

Si el archivo no se puede interpretar, frost te dice por qué y te ofrece abrirlo de nuevo, así que una errata no puede estropear tus copias programadas. Los ajustes desconocidos cuentan como errores, así que un nombre mal escrito no pasa desapercibido.

## Todos los ajustes

| Clave | Valor predeterminado | Significado |
| --- | --- | --- |
| `paths` | | Las carpetas que se respaldan |
| `exclude` | `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules`, `.cache` | Nombres y patrones que se excluyen. Consulta [Excluir archivos](#excluding-files) |
| `schedule.enabled` | `true` | Hacer copias automáticamente |
| `schedule.every` | `daily` | `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily` o `weekly` |
| `verify.sample` | `20` | Cuántos fragmentos descarga la comprobación aleatoria. `0` la desactiva |
| `update.auto` | `true` | Instalar versiones nuevas después de las copias programadas. `false` solo te avisa de ellas |
| `storage.backend` | | `permafrost` o `s3` |
| `storage.permafrost.url` | | Vacío para el servidor predeterminado. Si no, una dirección `https://`, o `http://` para un servidor en tu propio equipo |
| `storage.permafrost.token` | | Tu clave de acceso de Permafrost |
| `storage.s3.endpoint` | | Como `s3.us-east-1.amazonaws.com`. También vale una dirección completa `https://`, y una `http://` desactiva TLS |
| `storage.s3.region` | | Vacío si tu proveedor no usa regiones |
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
