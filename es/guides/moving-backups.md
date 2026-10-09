# Mover tus copias de seguridad

Tus copias pueden pasar a otra carpeta, otro bucket u otro proveedor sin volver a subirlo todo.

| Quieres | Haz esto |
| --- | --- |
| Mover tus copias a otra carpeta u otro bucket | Mueve la carpeta del repositorio entera y apunta frost a la nueva ubicación. No se vuelve a subir nada |
| Empezar un conjunto de copias aparte en otro sitio | Ejecuta `frost init` y elige la nueva ubicación vacía. Tus copias anteriores se quedan donde están, pero frost solo muestra las nuevas |
| Volver a usar las copias de una ubicación anterior | Apunta frost de nuevo a la ubicación anterior |

## Mover el repositorio

El repositorio es la carpeta de tu almacenamiento que contiene `frost.repo`, `chunks/`, `snapshots/` y `trees/`. Mueve o copia las cuatro, con todos los objetos que contienen, y deja sus nombres exactamente como están. Mover solo `frost.repo` no mueve tus copias.

Después, dile a frost dónde están. Para otro bucket:

```sh
frost config set storage.s3.bucket new-bucket
```

Para otra carpeta dentro del bucket:

```sh
frost config set storage.s3.prefix backups/frost
```

Para pasar a otro proveedor, lo que supone cambiar varios ajustes a la vez, ejecuta `frost init` y elige el proveedor nuevo. El asistente encuentra tus copias y se conecta a ellas.

## Comprobaciones antes de guardar

`frost config set` comprueba una nueva ubicación de almacenamiento antes de guardarla. Rechaza una ubicación sin repositorio de frost o con uno creado con otra clave. Si la ubicación anterior contiene instantáneas del mismo repositorio pero la nueva no, también rechaza el cambio. `frost config edit` muestra esos mismos problemas como avisos, así que todavía puede guardar un cambio que `set` rechaza.

## Si frost no encuentra tus copias

Cuando tus copias no están donde frost espera, el error y `frost status` indican dónde se abrieron por última vez y te dan tres salidas:

```text
Your backups were last opened in s3://old-bucket/frost/.
Since then storage.s3.bucket changed from old-bucket to new-bucket.

Do one of these:
  put it back:       frost config set storage.s3.bucket old-bucket
  keep the change:   move the whole folder (frost.repo, chunks/, snapshots/ and trees/) to s3://new-bucket/frost/
  start over there:  frost init (your old backups stay where they are)
```
