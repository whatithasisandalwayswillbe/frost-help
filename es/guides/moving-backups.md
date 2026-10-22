# Mover tus copias de seguridad

Tus copias pueden pasar a otra carpeta, otro disco, otro servidor, otro bucket u otro proveedor sin volver a subirlo todo.

Permafrost no tiene una carpeta que mover, así que tus copias no pueden entrar ni salir de Permafrost de esta forma. Para pasarte a Permafrost o dejarlo, empieza un conjunto de copias aparte con `frost init`.

| Quieres | Haz esto |
| --- | --- |
| Mover tus copias a otra carpeta, disco, servidor o bucket | Mueve la carpeta del repositorio entera y apunta frost a la nueva ubicación. No se vuelve a subir nada |
| Empezar un conjunto de copias aparte en otro sitio | Ejecuta `frost init` y elige la nueva ubicación vacía. Tus copias anteriores se quedan donde están, pero frost solo muestra las nuevas |
| Volver a usar las copias de una ubicación anterior | Apunta frost de nuevo a la ubicación anterior |

## Mover el repositorio

El repositorio es la carpeta de tu almacenamiento que contiene `frost.repo`, `chunks/`, `snapshots/` y `trees/`. Mueve o copia las cuatro, con todos los objetos que contienen, y deja sus nombres exactamente como están. Mover solo `frost.repo` no mueve tus copias.

Un servidor propio, un disco local y un almacenamiento S3 contienen los mismos archivos, así que puedes copiar un repositorio entre ellos con rsync, rclone o un gestor de archivos. Por ejemplo, este comando copia las copias de un disco a un servidor:

```sh
rsync -a /Volumes/Backup/frost/ me@nas.local:frost/
```

Después, dile a frost dónde están. Para otra carpeta en un disco o un servidor:

```sh
frost config set storage.local.path /Volumes/Backup2/frost
frost config set storage.sftp.path backups/frost
```

Para otro bucket:

```sh
frost config set storage.s3.bucket new-bucket
```

Para otra carpeta dentro del bucket:

```sh
frost config set storage.s3.prefix backups/frost
```

Para pasar a otro tipo de almacenamiento u otro proveedor, lo que supone cambiar varios ajustes a la vez, ejecuta `frost init` y elige el nuevo. El asistente encuentra tus copias y se conecta a ellas.

## Comprobaciones antes de guardar

`frost config set` comprueba una nueva ubicación de almacenamiento antes de guardarla. Rechaza una ubicación sin repositorio de frost o con uno creado con otra clave. Si la ubicación anterior contiene instantáneas del mismo repositorio pero la nueva no, también rechaza el cambio. `frost config edit` muestra esos mismos problemas como avisos, así que todavía puede guardar un cambio que `set` rechaza. Si cambias la ubicación editando `config.toml` tú mismo, frost muestra esos avisos la primera vez que la usa.

## Si frost no encuentra tus copias

Cuando tus copias no están donde frost espera, el error y `frost status` indican dónde se abrieron por última vez y te dan tres salidas:

```text
Your backups were last opened in s3://old-bucket/frost/.
Since then storage.s3.bucket changed from old-bucket to new-bucket.

Do one of these:
  put it back:       frost config set storage.s3.bucket old-bucket
  keep the change:   move the entire repository folder (frost.repo, chunks/, snapshots/, and trees/) to s3://new-bucket/frost/
  start over there:  frost init (your old backups stay where they are)
```
