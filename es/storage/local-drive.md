# Disco local

Haz copias de seguridad en una carpeta de un disco: un disco USB externo, un segundo disco interno o un disco en una base. Todo se cifra igual que con cualquier otro almacenamiento, así que un disco perdido no revela tus archivos.

## En el asistente

Ejecuta `frost init`, elige **Local drive** y escribe la ruta completa de una carpeta en un disco conectado.

| Sistema | Ejemplo |
| --- | --- |
| macOS | `/Volumes/Backup/frost` |
| Linux | `/mnt/backup/frost` o `/media/<you>/Backup/frost` |
| Windows | `E:\frost` |

El asistente crea la última carpeta de la ruta si falta. La carpeta que la contiene, normalmente el propio disco, tiene que estar ahí.

## Cuando el disco no está conectado

frost solo crea la carpeta durante el asistente. Si el disco no está conectado cuando se hace una copia, falta la carpeta, y la copia falla con un mensaje que te pide conectar el disco. Nunca escribe tus copias en lo que haya en esa ruta. Una copia programada espera antes unos 5 minutos al disco, por si se está montando todavía.

En Windows, un disco puede recibir otra letra al volver a conectarlo. Devuélvele su letra anterior en Administración de discos, o ejecuta `frost init` y escribe la ruta nueva.

## Una copia en otro sitio

Un disco junto a tu equipo puede perderse, robarse o estropearse a la vez que él. Guarda otra copia de todo lo irreemplazable en otro sitio, como un disco que guardes fuera de casa o un [servidor propio](#self-hosted) en otro lugar. [Mover tus copias de seguridad](#moving-backups) explica cómo copiar un repositorio.

## Carpetas compartidas en red

Para un NAS, [Servidor propio](#self-hosted) suele ser la mejor opción. Una carpeta compartida en red montada en tu equipo solo funciona si su sistema de archivos puede crear archivos de forma segura, algo que el asistente comprueba al conectarse. En Windows, usa la ruta `\\server\share` de la carpeta compartida en lugar de una letra de unidad de red, porque puede que las copias programadas no vean esas letras.

## Conviene saber

- frost no sigue enlaces ni uniones dentro de la carpeta. En Windows, también rechaza una carpeta a la que se llega a través de uno. Usa la ruta real de la carpeta.
- En macOS, las copias programadas necesitan permiso para usar discos extraíbles y volúmenes de red. Consulta [Permisos de macOS](#macos-permissions).
- `frost status` muestra lo lleno que está el disco, y `frost backup` avisa cuando está casi lleno.
- Funcionan los discos con NTFS, APFS, ext4, Btrfs o XFS. Los discos con exFAT y FAT funcionan si superan la comprobación del asistente.
