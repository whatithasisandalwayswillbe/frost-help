# Elegir almacenamiento

frost puede guardar tus copias en tu propio servidor, en un disco, en Permafrost o en un servicio compatible con S3. Vayan donde vayan, todo se cifra primero en tu equipo, así que quien gestiona el almacenamiento no puede leer tus archivos.

## Tus opciones

| Almacenamiento | Ideal para | Qué necesitas |
| --- | --- | --- |
| [Servidor propio](#self-hosted) | Un NAS, un servidor en casa o un VPS que gestionas tú | Acceso por SSH |
| [Disco local](#local-drive) | Un disco USB o un segundo disco | Un disco conectado cuando se hacen las copias |
| [Permafrost](#permafrost) | Almacenamiento alojado hecho para frost | Una clave de acceso |
| [Proveedores en la nube](#cloud-providers) | Amazon S3, Cloudflare R2, Backblaze B2 o Wasabi | Un bucket y sus claves |
| [Otro almacenamiento compatible con S3](#other-s3) | Un servidor S3 que gestionas tú, como Ceph o SeaweedFS, u otro servicio S3 | Un bucket y sus claves |

Con un servidor propio o un disco local, tus copias quedan en hardware que controlas tú, sin cuentas en ninguna parte. Permafrost y los proveedores en la nube las guardan fuera de casa, sin una máquina propia que mantener.

## Escrituras condicionales

frost necesita un almacenamiento que pueda crear un archivo en un solo paso, solo si su nombre está libre. Así se evita que dos equipos sobrescriban los registros de copia del otro. El asistente lo comprueba al conectarse y rechaza el almacenamiento que no lo cumple. Si el almacenamiento no lo admite, ni otras claves ni otros ajustes lo arreglan.

| Almacenamiento | Escrituras condicionales |
| --- | --- |
| Servidor propio | Admitidas por los servidores OpenSSH, en sistemas de archivos con enlaces duros, como ext4, Btrfs, XFS, ZFS, APFS y NTFS |
| Disco local | Admitidas en NTFS, APFS, ext4, Btrfs y XFS. Los demás sistemas de archivos tienen que superar la comprobación del asistente |
| Permafrost | Admitidas |
| Amazon S3 | [Documentadas](https://docs.aws.amazon.com/AmazonS3/latest/userguide/conditional-writes.html) |
| Cloudflare R2 | [Documentadas](https://developers.cloudflare.com/r2/api/s3/api/) |
| Ceph | Incluidas en el servidor. Tu versión tiene que superar la comprobación del asistente |
| SeaweedFS | [Documentadas](https://github.com/seaweedfs/seaweedfs/wiki/S3-Conditional-Operations). Tu versión tiene que superar la comprobación del asistente |
| MinIO | Incluidas en el servidor, que ya no se mantiene. Tu versión tiene que superar la comprobación del asistente |
| Backblaze B2 | Sin verificar. Su [referencia de subida](https://www.backblaze.com/apidocs/s3-put-object) no menciona `If-None-Match` |
| Wasabi | Sin verificar. Su [referencia de la API](https://docs.wasabi.com/apidocs/operations-on-objects) no deja clara la compatibilidad |
| Garage | No admitidas, según su responsable |

Los datos de los servicios S3 se comprobaron con la documentación y el código fuente de cada proyecto en octubre de 2026, sin pruebas reales. Lo que decide es la comprobación del propio asistente.

## Qué tener en cuenta

- **Una copia fuera de casa.** Un disco o un servidor en casa puede perderse en el mismo incendio o robo que tu equipo. Un servidor en otro lugar, Permafrost o un proveedor en la nube, no. Guarda una segunda copia independiente de todo lo irreemplazable en otro sitio.
- **Lo que cuesta restaurar.** Algunos proveedores en la nube cobran por las descargas. Una restauración completa lo descarga todo, y cada comprobación aleatoria descarga una pequeña muestra.
- **Clases de almacenamiento de archivo.** frost lee los fragmentos directamente, así que no muevas sus objetos a una clase de archivo que haya que descongelar antes de leer.
- **Borrado y caducidad.** frost nunca borra tus copias. No añadas reglas de ciclo de vida ni tareas de limpieza que borren o hagan caducar archivos de su carpeta, porque las instantáneas comparten fragmentos.
- **Acceso limitado.** Dale a frost una clave de acceso que solo llegue a su propio bucket, o una cuenta en el servidor que no pueda cambiar nada más que te importe.

## Cambiar de almacenamiento más adelante

Puedes mover tus copias a otro tipo de almacenamiento sin volver a subirlo todo. Consulta [Mover tus copias de seguridad](#moving-backups).
