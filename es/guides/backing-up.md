# Hacer copias de seguridad

`frost backup` hace ahora mismo una copia de seguridad de tus carpetas. Solo se sube lo que ha cambiado desde la última copia.

## Hacer una copia

```sh
frost backup
```

frost muestra qué ha cambiado, cuánto ha subido y el resultado de su comprobación aleatoria:

```text
┌  backup  s3://my-backups/frost/
│
│  changes      3 added, 1 changed
│  files        1,204 (2.1 GB)
│  new data     14.2 MB in 9 chunks (9.8 MB uploaded after compression)
│  verified     ok, 20 random objects re-downloaded and checked
│
└  Saved snapshot maple-absurd-3f1c
```

Un archivo cuenta como cambiado cuando cambian su contenido, su tamaño, sus permisos o su fecha de modificación. Que solo cambie la fecha de modificación de una carpeta no cuenta, porque los archivos temporales la alteran todo el tiempo.

Si nada ha cambiado, frost no guarda una instantánea nueva:

```text
┌  backup  s3://my-backups/frost/
│
│  files        1,204 (2.1 GB)
│  verified     ok 3h ago, 20 objects checked
│
└  Already backed up. Nothing has changed since snapshot maple-absurd-3f1c, saved 3h ago.
```

Con las copias automáticas activadas, rara vez tendrás que ejecutar esto tú. Consulta [Copias de seguridad automáticas](#scheduling).

## Ver una vista previa

```sh
frost backup --dry-run
```

Una simulación enumera cada archivo con datos nuevos que subir y el total, sin subir nada ni guardar ninguna instantánea. `-n` es la forma corta de `--dry-run`.

## Opciones

| Opción | Qué hace |
| --- | --- |
| `-n`, `--dry-run` | Muestra lo que se subiría, sin subir nada |
| `--path <dir>` | Respalda esta carpeta en lugar de las habituales. Repítela para añadir más carpetas |
| `--exclude <pattern>` | Excluye también este patrón, solo en esta copia. Repítela para añadir más patrones |
| `--no-verify` | Se salta la comprobación aleatoria después de la copia |

Para cambiar qué carpetas se respaldan siempre, vuelve a ejecutar `frost init` o consulta [Ajustes](#settings).

## Qué se respalda

frost respalda archivos normales, carpetas y enlaces simbólicos, con sus permisos y fechas de modificación.

- Un enlace simbólico se guarda como el propio enlace, no como el archivo al que apunta.
- Los archivos con enlaces físicos se respaldan y restauran como archivos independientes.

frost deja fuera:

- Todo lo que esté en tu lista de exclusiones. Consulta [Excluir archivos](#excluding-files).
- Sockets, dispositivos y tuberías.
- Propietarios de archivo, ACL y atributos extendidos.
- En macOS, los archivos que iCloud guarda solo en la nube. frost no los descarga: los omite y los enumera.
- Los archivos `.frost-partial-...` que deja una restauración interrumpida.

## Cuando algo sale mal

| Qué pasa | Qué hace frost |
| --- | --- |
| Un archivo o una carpeta no se puede leer, por falta de permisos, porque se borró durante la copia o porque solo está en iCloud | Lo omite y lo enumera. La instantánea se guarda igualmente, y `frost status` muestra cuántos elementos se omitieron |
| Una carpeta de tu lista no está, por ejemplo una de un disco desconectado | La omite y respalda el resto. `frost backup` y `frost status` indican qué carpeta falta |
| No está ninguna de tus carpetas, o una existe pero no se puede leer en absoluto | Hace fallar la copia entera, para que nunca parezca que todo va bien sin haber guardado nada |
| Un archivo cambia mientras frost lo lee, como una base de datos en uso, el disco de una máquina virtual en marcha o una descarga | Lo vuelve a leer al final de la copia. Si sigue cambiando, la instantánea conserva su copia anterior y frost lo enumera. Si nunca se llegó a copiar entero, se omite |

frost no toma instantáneas del sistema de archivos ni de bases de datos. Para respaldar un archivo que siempre está en uso, hazlo con el programa que lo usa cerrado.

En macOS, algunas carpetas necesitan tu permiso antes de que frost pueda leerlas. Consulta [Permisos de macOS](#macos-permissions).

## La comprobación aleatoria

Después de una copia que guarda una instantánea, frost descarga unos cuantos fragmentos al azar, 20 de forma predeterminada, y los comprueba. Después de una copia sin cambios, solo vuelve a comprobar si la última comprobación tiene más de un día o encontró algún problema. Si una comprobación falla, la copia termina con un error. Consulta [Comprobar tus copias de seguridad](#checking-backups).

## Copias interrumpidas

Si una copia se detiene a medias, por una conexión perdida, un portátil cerrado o `Ctrl+C`, no se desperdicia nada de lo ya subido. frost anota los fragmentos a medida que se suben, y la siguiente copia se los salta.

## De una en una

Solo puede haber una copia o restauración en marcha a la vez. Si ya hay otra, por ejemplo una copia programada, frost muestra "a backup or restore is already running, try again when it's done" (ya hay una copia o restauración en marcha; inténtalo cuando termine). El explorador de instantáneas puede seguir abierto mientras se hace una copia.
