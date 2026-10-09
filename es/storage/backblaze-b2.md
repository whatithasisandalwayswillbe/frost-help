# Backblaze B2

Haz copias de seguridad en un bucket de Backblaze B2, a través de su API compatible con S3.

> La documentación de Backblaze no dice si B2 admite las escrituras condicionales que necesita frost. El asistente lo comprueba al conectarse. Si la prueba falla, elige otro proveedor. Consulta [Elegir almacenamiento](#choosing-storage).

## Antes de empezar

1. Crea un bucket en tu cuenta de Backblaze.
2. Apunta su endpoint: Buckets > your bucket > Endpoint. Tiene este aspecto: `s3.us-west-004.backblazeb2.com`.
3. Crea una clave de aplicación: Application Keys > Add a New Application Key. Limítala a este bucket.

## En el asistente

Ejecuta `frost init` y elige **Backblaze B2**.

| El asistente pregunta | Respuesta |
| --- | --- |
| What's the bucket's endpoint? | El endpoint de la página del bucket, como `s3.us-west-004.backblazeb2.com` |
| What's the bucket called? | Su nombre, exactamente como lo creaste |
| Paste the application key's keyID. | El keyID de tu nueva clave de aplicación |
| Paste the applicationKey. | Se muestra una sola vez, justo después de crear la clave |

frost deduce la región a partir del endpoint y guarda tus copias en una carpeta `frost` dentro del bucket.

## Conviene saber

No añadas reglas de ciclo de vida que borren objetos de la carpeta de frost. Las instantáneas comparten fragmentos, y quitar un solo objeto puede estropear muchas.
