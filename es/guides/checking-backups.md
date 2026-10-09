# Comprobar tus copias de seguridad

frost comprueba tus copias sobre la marcha, y `frost status` te muestra cómo están.

## frost status

```sh
frost status
```

```text
┌  frost  v0.1.0  s3://my-backups/frost/  key 6f154dc10058
│
│  last backup  ok 2h ago  maple-absurd-3f1c
│  next backup  ~in 4h  6h via launchd
│  health       ok 20 objects checked 2h ago
│  updates      automatic
│  protected    1,204 files, 2.1 GB, in 3 snapshots
│
├  snapshots
│
│  snapshot             taken                  files         size          new
│  maple-absurd-3f1c    2026-10-08 09:17       1,204       2.1 GB      14.2 MB
│  orbit-velvet-a02e    2026-10-08 03:17       1,201       2.1 GB       3.6 MB
│  canyon-pilot-77b9    2026-10-07 21:17       1,198       2.1 GB       2.1 GB
└
```

La primera línea muestra la versión de frost, tu almacenamiento y la huella de tu clave. Las filas de debajo muestran:

| Fila | Muestra |
| --- | --- |
| last backup | Cuándo se hizo la última copia y si funcionó. "ok, but" enumera las carpetas que no se encontraron, los elementos que no se pudieron leer y los archivos en uso que conservaron su copia anterior |
| next backup | Cuándo toca la siguiente copia automática, o que las copias automáticas están desactivadas |
| health | El resultado de la última comprobación aleatoria |
| updates | Si las actualizaciones son automáticas, y si ha salido una versión nueva |
| protected | Los archivos y el tamaño de la instantánea más reciente, y cuántas instantáneas tienes |
| missing | Instantáneas que este equipo conocía y que ya no están en el almacenamiento |

La lista muestra tus 10 instantáneas más recientes. La columna `new` indica cuántos datos nuevos añadió cada una. Para verlas todas:

```sh
frost status --all
```

## La comprobación aleatoria

Después de cada copia que guarda una instantánea, frost descarga una muestra aleatoria de fragmentos, los descifra uno a uno y comprueba que coinciden con su ID. También carga la lista de archivos de la instantánea más reciente y comprueba que frost conoce todos los fragmentos que necesita. Después de una copia sin cambios, frost solo repite la comprobación si la última tiene más de un día o encontró algún problema.

La muestra es de 20 fragmentos de forma predeterminada. Una muestra mayor detecta más problemas, pero descarga más:

```sh
frost config set verify.sample 50
```

`0` desactiva la comprobación aleatoria.

## Comprobar ahora

```sh
frost status --verify
```

Esto hace una comprobación aleatoria nueva y además compara el registro local de frost de tus fragmentos con todo lo que hay en tu almacenamiento. Termina con `1` si la comprobación falla, así que puedes ejecutarlo desde tu propio programador para comprobar con una frecuencia distinta de la de tus copias.

## Si una comprobación falla

La fila health enumera lo que ha fallado. Normalmente significa que tu almacenamiento ha perdido o dañado algunos fragmentos.

1. Ejecuta `frost backup`. Cualquier fragmento perdido cuyos datos sigan en tu equipo se vuelve a subir.
2. Ejecuta `frost status --verify` para volver a comprobar.

Los datos que ya no están en tu equipo no se pueden volver a subir, y las instantáneas antiguas que los necesitan no se podrán restaurar por completo.

## Instantáneas desaparecidas

Si desaparecen del almacenamiento instantáneas que este equipo conocía, `frost status` lo indica una vez. Si moviste tus copias, apunta frost a su nueva ubicación. Consulta [Mover tus copias de seguridad](#moving-backups). Si no, es que se borraron de tu almacenamiento.

> Una comprobación aleatoria toma una muestra de tus copias. Detecta los problemas pronto, pero no puede demostrar que todas las instantáneas se vayan a restaurar bien. Para los archivos que no te puedes permitir perder, guarda también una segunda copia independiente.
