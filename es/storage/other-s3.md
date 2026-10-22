# Otro almacenamiento compatible con S3

Usa un servidor S3 que gestiones tú, como Ceph o SeaweedFS, o cualquier otro servicio que hable el protocolo S3 y no tenga configuración propia en el asistente. Tiene que admitir escrituras condicionales, algo que el asistente comprueba. Consulta [Elegir almacenamiento](#choosing-storage).

Si quieres hacer copias en una máquina tuya sin mantener un servidor S3, [Servidor propio](#self-hosted) es más sencillo. Solo necesita SSH.

## En el asistente

Ejecuta `frost init`, elige **S3-compatible** y después **Other S3-compatible**.

| El asistente pregunta | Respuesta |
| --- | --- |
| What is the S3 endpoint? | El nombre de host que indique la documentación de tu servidor o proveedor. Un nombre de host solo, sin `https://`, significa HTTPS |
| Which region? | Solo si tu servidor o proveedor la pide. Si no, déjalo en blanco |
| What is the bucket name? | Su nombre, exactamente como lo creaste. El bucket ya tiene que existir |
| Paste the Access Key ID. | De la consola de tu servidor o proveedor |
| Paste the Secret Access Key. | De la consola de tu servidor o proveedor |

frost guarda tus copias en una carpeta `frost` dentro del bucket.

## Servidores que gestionas tú

| Servidor | Qué conviene saber |
| --- | --- |
| Ceph | Su RADOS Gateway admite escrituras condicionales. Dale al asistente la dirección y el puerto de la pasarela |
| SeaweedFS | Su pasarela S3 documenta las escrituras condicionales. Dale al asistente su dirección, como `http://<server>:8333` |
| MinIO | Admite escrituras condicionales, pero ya no se mantiene, así que no recibe correcciones. Un servidor existente sigue funcionando si supera la comprobación del asistente. Dale al asistente su dirección, como `https://<server>:9000` |
| Garage | No admite escrituras condicionales, así que frost no puede usarlo |

Crea antes el bucket y una clave de acceso con las herramientas del servidor.

## Un servidor sin TLS

Para un servidor en tu propio equipo o tu red, indica el endpoint con `http://`, como `http://localhost:9000`. Eso desactiva TLS en todas las peticiones, así que úsalo solo en una red de confianza. Poner `storage.s3.insecure` a `true` selecciona HTTP cuando el endpoint no tiene esquema. Un `https://` o `http://` explícito tiene prioridad.

## La carpeta dentro del bucket

frost lo guarda todo en una carpeta dentro del bucket, `frost` de forma predeterminada. El asistente a pantalla completa no pregunta por ella.

Después de completar el asistente, para usar otra carpeta o la raíz del bucket antes de tu primera copia:

1. Ejecuta `frost config edit` y cambia `prefix` en `[storage.s3]`. Déjalo vacío para usar la raíz del bucket. frost te avisa de que allí todavía no hay copias. Escribe `yes` para guardar de todos modos.
2. Vuelve a ejecutar `frost init`. Su pantalla de revisión te avisa de que así empieza un conjunto de copias aparte. Pulsa `[s]` para seguir.

Si ya tienes copias, muévelas en su lugar, como se explica en [Mover tus copias de seguridad](#moving-backups).
