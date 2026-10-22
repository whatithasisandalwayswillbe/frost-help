# Proveedores en la nube

El asistente tiene configuraciones para cuatro proveedores en la nube que hablan el protocolo S3. Ejecuta `frost init`, elige **S3-compatible** y después tu proveedor. Para cualquier otro servicio S3, o un servidor S3 que gestiones tú, consulta [Otro almacenamiento compatible con S3](#other-s3).

Cada configuración guarda tus copias en una carpeta `frost` dentro del bucket, para que el bucket pueda contener otras cosas. Dale a Frost una clave que solo llegue a ese bucket, y no añadas reglas de ciclo de vida que borren, hagan caducar o archiven objetos de su carpeta. Las instantáneas comparten fragmentos, y quitar un solo objeto puede estropear muchas.

## Amazon S3

S3 admite las escrituras condicionales que necesita Frost.

1. Crea un bucket en la consola de AWS y apunta su región, como `us-east-1`.
2. Crea un usuario de IAM para Frost y una clave de acceso para él: IAM > Users > your user > Security credentials > Create access key.

Frost necesita leer, listar, escribir y borrar objetos en el bucket, aunque el único objeto que borra es el pequeño objeto de prueba que crea el asistente al conectarse. Con una política como esta basta. Cambia `my-backups` por el nombre de tu bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::my-backups"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::my-backups/*"
    }
  ]
}
```

| El asistente pregunta | Respuesta |
| --- | --- |
| Which region hosts the bucket? | La región del bucket, como `us-east-1` |
| What is the bucket name? | Su nombre, exactamente como lo creaste |
| Paste the Access Key ID. | El ID de clave de acceso de IAM |
| Paste the Secret Access Key. | Se muestra una sola vez, junto al ID de clave de acceso, al crearla |

Frost se conecta a `s3.<region>.amazonaws.com`. Mantén sus objetos en una clase de almacenamiento que se pueda leer al instante, como S3 Standard o S3 Standard-IA, y no en Glacier Flexible Retrieval ni Glacier Deep Archive. No hace falta activar el control de versiones del bucket.

## Cloudflare R2

R2 admite las escrituras condicionales que necesita Frost.

1. En el panel de Cloudflare, crea un bucket de R2.
2. Apunta tu ID de cuenta. Está en la página de resumen de R2: 32 letras y números.
3. Crea un token de API: R2 > Manage R2 API Tokens > Create API token, con el permiso Object Read & Write. Si puedes, limítalo a tu bucket.

| El asistente pregunta | Respuesta |
| --- | --- |
| What is your Cloudflare Account ID? | El ID de 32 caracteres de la página de resumen de R2 |
| What is the bucket name? | Su nombre, exactamente como lo creaste |
| Paste the Access Key ID. | El Access Key ID de tu nuevo token de API |
| Paste the Secret Access Key. | Se muestra una sola vez, junto al Access Key ID |

Frost se conecta a `<account-id>.r2.cloudflarestorage.com` con la región `auto`.

## Backblaze B2

La documentación de Backblaze no dice si B2 admite las escrituras condicionales que necesita Frost. El asistente lo comprueba al conectarse. Si la prueba falla, elige otro almacenamiento.

1. Crea un bucket en tu cuenta de Backblaze.
2. Apunta su endpoint: Buckets > your bucket > Endpoint. Tiene este aspecto: `s3.us-west-004.backblazeb2.com`.
3. Crea una clave de aplicación: Application Keys > Add a New Application Key. Limítala a este bucket.

| El asistente pregunta | Respuesta |
| --- | --- |
| What is the bucket endpoint? | El endpoint de la página del bucket, como `s3.us-west-004.backblazeb2.com` |
| What is the bucket name? | Su nombre, exactamente como lo creaste |
| Paste the application key's keyID. | El keyID de tu nueva clave de aplicación |
| Paste the applicationKey. | Se muestra una sola vez, justo después de crear la clave |

Frost deduce la región a partir del endpoint.

## Wasabi

La documentación de Wasabi no deja claro si admite las escrituras condicionales que necesita Frost. El asistente lo comprueba al conectarse. Si la prueba falla, elige otro almacenamiento.

1. Crea un bucket en la consola de Wasabi y apunta su región, como `us-east-1` o `eu-central-1`.
2. Crea una clave de acceso: Access Keys > Create New Access Key. Si puedes, usa un usuario con acceso solo a este bucket.

| El asistente pregunta | Respuesta |
| --- | --- |
| Which region hosts the bucket? | La región del bucket, como `us-east-1` |
| What is the bucket name? | Su nombre, exactamente como lo creaste |
| Paste the Access Key. | La clave de acceso que creaste |
| Paste the Secret Key. | Se muestra una sola vez, al crear la clave |

Frost se conecta a `s3.<region>.wasabisys.com`.
