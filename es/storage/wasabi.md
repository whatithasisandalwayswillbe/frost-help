# Wasabi

Haz copias de seguridad en un bucket de Wasabi.

> La documentación de Wasabi no deja claro si admite las escrituras condicionales que necesita frost. El asistente lo comprueba al conectarse. Si la prueba falla, elige otro proveedor. Consulta [Elegir almacenamiento](#choosing-storage).

## Antes de empezar

1. Crea un bucket en la consola de Wasabi y apunta su región, como `us-east-1` o `eu-central-1`.
2. Crea una clave de acceso: Access Keys > Create New Access Key. Si puedes, usa un usuario con acceso solo a este bucket.

## En el asistente

Ejecuta `frost init` y elige **Wasabi**.

| El asistente pregunta | Respuesta |
| --- | --- |
| Which region is the bucket in? | La región del bucket, como `us-east-1` |
| What's the bucket called? | Su nombre, exactamente como lo creaste |
| Paste the access key. | La clave de acceso que creaste |
| Paste the secret key. | Se muestra una sola vez, al crear la clave |

frost se conecta a `s3.<region>.wasabisys.com` y guarda tus copias en una carpeta `frost` dentro del bucket.

## Conviene saber

No añadas reglas de ciclo de vida que borren objetos de la carpeta de frost. Las instantáneas comparten fragmentos, y quitar un solo objeto puede estropear muchas.
