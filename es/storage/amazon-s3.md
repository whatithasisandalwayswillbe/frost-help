# Amazon S3

Haz copias de seguridad en un bucket de Amazon S3. S3 admite las escrituras condicionales que necesita frost.

## Antes de empezar

1. Crea un bucket en la consola de AWS y apunta su región, como `us-east-1`.
2. Crea un usuario de IAM para frost, dale acceso solo a ese bucket y crea una clave de acceso para él: IAM > Users > your user > Security credentials > Create access key.

frost necesita leer, listar, escribir y borrar objetos en el bucket. Con una política como esta basta. Cambia `my-backups` por el nombre de tu bucket:

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

El único objeto que borra frost es el pequeño objeto de prueba que crea el asistente al conectarse.

## En el asistente

Ejecuta `frost init` y elige **Amazon S3**.

| El asistente pregunta | Respuesta |
| --- | --- |
| Which region is the bucket in? | La región del bucket, como `us-east-1` |
| What's the bucket called? | Su nombre, exactamente como lo creaste |
| Paste the access key ID. | El ID de clave de acceso de IAM |
| Paste the secret access key. | Se muestra una sola vez, junto al ID de clave de acceso, al crearla |

frost se conecta a `s3.<region>.amazonaws.com` y guarda tus copias en una carpeta `frost` dentro del bucket.

## Conviene saber

- Mantén los objetos de frost en una clase de almacenamiento que se pueda leer al instante, como S3 Standard o S3 Standard-IA. No añadas reglas de ciclo de vida que los pasen a Glacier Flexible Retrieval o Glacier Deep Archive, ni que los hagan caducar.
- No hace falta activar el control de versiones del bucket.
