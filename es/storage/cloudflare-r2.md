# Cloudflare R2

Haz copias de seguridad en un bucket de Cloudflare R2. R2 admite las escrituras condicionales que necesita frost.

## Antes de empezar

1. En el panel de Cloudflare, crea un bucket de R2.
2. Apunta tu ID de cuenta. Está en la página de resumen de R2: 32 letras y números.
3. Crea un token de API: R2 > Manage R2 API Tokens > Create API token, con el permiso Object Read & Write. Si puedes, limítalo a tu bucket.

## En el asistente

Ejecuta `frost init` y elige **Cloudflare R2**.

| El asistente pregunta | Respuesta |
| --- | --- |
| What's your Cloudflare account ID? | El ID de 32 caracteres de la página de resumen de R2 |
| What's the bucket called? | Su nombre, exactamente como lo creaste |
| Paste the Access Key ID. | El Access Key ID de tu nuevo token de API |
| Paste the Secret Access Key. | Se muestra una sola vez, junto al Access Key ID |

frost se conecta a `<account-id>.r2.cloudflarestorage.com` con la región `auto` y guarda tus copias en una carpeta `frost` dentro del bucket.

## Conviene saber

No añadas reglas de ciclo de vida que borren o hagan caducar objetos de la carpeta de frost. Las instantáneas comparten fragmentos, y quitar un solo objeto puede estropear muchas.
