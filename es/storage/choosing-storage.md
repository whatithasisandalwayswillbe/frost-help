# Elegir almacenamiento

frost guarda tus copias en Permafrost o en cualquier proveedor compatible con S3 que admita escrituras condicionales. En los dos casos, todo se cifra antes de salir de tu equipo, así que tu proveedor no puede leerlo.

## Tus opciones

- **[Permafrost](#permafrost)** es un almacenamiento alojado hecho para frost. Solo necesita una clave de acceso, sin bucket, región ni endpoint que configurar.
- **El almacenamiento compatible con S3** funciona con un bucket que creas en un proveedor como [Amazon S3](#amazon-s3), [Cloudflare R2](#cloudflare-r2), [Backblaze B2](#backblaze-b2) o [Wasabi](#wasabi), o en un servidor que gestionas tú, como [MinIO](#other-s3).

## Escrituras condicionales

frost necesita un almacenamiento que admita escrituras condicionales atómicas (`If-None-Match: *`). Impiden que dos equipos sobrescriban los registros de copia del otro. El asistente lo comprueba al conectarse y rechaza el almacenamiento que no lo cumple. Si el proveedor no lo admite, ni otras claves ni otros ajustes lo arreglan.

| Proveedor | Escrituras condicionales |
| --- | --- |
| Permafrost | Admitidas |
| Amazon S3 | [Documentadas](https://docs.aws.amazon.com/AmazonS3/latest/userguide/conditional-writes.html) |
| Cloudflare R2 | [Documentadas](https://developers.cloudflare.com/r2/api/s3/api/) |
| MinIO | Incluidas en el servidor. Tu versión tiene que superar la comprobación del asistente |
| Backblaze B2 | Sin verificar. Su [referencia de subida](https://www.backblaze.com/apidocs/s3-put-object) no menciona `If-None-Match` |
| Wasabi | Sin verificar. Su [referencia de la API](https://docs.wasabi.com/apidocs/operations-on-objects) no deja clara la compatibilidad |
| Garage | No admitidas, según su responsable |

Esto se comprobó con la documentación y el código fuente de cada proveedor el 2 de octubre de 2026, sin pruebas reales. Lo que decide es la comprobación del propio asistente.

## Qué tener en cuenta

- **Lo que cuesta restaurar.** Algunos proveedores cobran por las descargas. Una restauración completa lo descarga todo, y cada comprobación aleatoria descarga una pequeña muestra.
- **Clases de almacenamiento de archivo.** frost lee los fragmentos directamente, así que no muevas sus objetos a una clase de archivo que haya que descongelar antes de leer.
- **Borrado y caducidad.** frost nunca borra tus copias. No añadas reglas de ciclo de vida que borren o hagan caducar objetos de su carpeta, porque las instantáneas comparten fragmentos.
- **Claves limitadas.** Dale a frost una clave de acceso que solo llegue a su propio bucket.

## Cambiar de almacenamiento más adelante

Puedes mover tus copias a otro proveedor sin volver a subirlo todo. Consulta [Mover tus copias de seguridad](#moving-backups).
