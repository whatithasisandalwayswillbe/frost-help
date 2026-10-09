# Otro almacenamiento compatible con S3

Usa cualquier otro servicio que hable el protocolo S3, como MinIO, Ceph o un proveedor sin configuración propia en el asistente. Tiene que admitir escrituras condicionales. Consulta [Elegir almacenamiento](#choosing-storage).

## En el asistente

Ejecuta `frost init` y elige **Other S3-compatible**.

| El asistente pregunta | Respuesta |
| --- | --- |
| What's the S3 endpoint? | El nombre de host que indique la documentación de tu proveedor. Un nombre de host solo, sin `https://`, significa HTTPS |
| Which region? | Solo si tu proveedor la pide. Si no, déjalo en blanco |
| What's the bucket called? | Su nombre, exactamente como lo creaste. El bucket ya tiene que existir |
| Paste the access key ID. | De la consola de tu proveedor |
| Paste the secret access key. | De la consola de tu proveedor |

frost guarda tus copias en una carpeta `frost` dentro del bucket.

## Un servidor sin TLS

Para un servidor de pruebas en tu propio equipo o tu red, indica el endpoint con `http://`, como `http://localhost:9000`. Eso desactiva TLS en todas las peticiones, así que úsalo solo en una red de confianza. Poner `storage.s3.insecure` a `true` selecciona HTTP cuando el endpoint no tiene esquema. Un `https://` o `http://` explícito tiene prioridad.

## La carpeta dentro del bucket

frost lo guarda todo en una carpeta dentro del bucket, `frost` de forma predeterminada. El asistente a pantalla completa no pregunta por ella.

Después de completar el asistente, para usar otra carpeta o la raíz del bucket antes de tu primera copia:

1. Ejecuta `frost config edit` y cambia `prefix` en `[storage.s3]`. Déjalo vacío para usar la raíz del bucket. frost te avisa de que allí todavía no hay copias. Escribe `yes` para guardar de todos modos.
2. Vuelve a ejecutar `frost init`. Su pantalla de revisión te avisa de que así empieza un conjunto de copias aparte. Pulsa `[s]` para seguir.

Si ya tienes copias, muévelas en su lugar, como se explica en [Mover tus copias de seguridad](#moving-backups).

## MinIO

El servidor de MinIO admite escrituras condicionales, pero la versión que uses tiene que superar la comprobación del asistente. Crea un bucket y una clave de acceso en la consola de MinIO y dale al asistente la dirección y el puerto de tu servidor MinIO, como `https://<server>:9000`.
