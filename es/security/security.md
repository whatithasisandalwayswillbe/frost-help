# Seguridad y privacidad

frost cifra tus copias en tu equipo, con una clave que solo tienes tú, antes de subir nada. Ni tu proveedor de almacenamiento, ni quien opera Permafrost, ni los autores de frost pueden leerlas.

## Qué se cifra

frost cifra todo lo que hay dentro de tus copias: el contenido de los archivos, sus nombres, la estructura de carpetas y los detalles de cada instantánea. frost nunca envía tu clave a un servidor ni guarda una copia bajo custodia.

| Elemento | Cómo |
| --- | --- |
| Clave | 256 bits aleatorios, creados en tu equipo por `frost init` |
| Frase de recuperación | La propia clave, escrita como 24 palabras BIP39 |
| Cifrado | XChaCha20-Poly1305, con un nonce aleatorio nuevo para cada objeto |
| Nombres de los fragmentos | HMAC-SHA256 del contenido del fragmento, calculado con tu clave |
| Compresión | zstd, antes del cifrado, solo cuando reduce el tamaño |

## Qué puede ver tu proveedor

Tu proveedor de almacenamiento, ya sea un servicio S3 o Permafrost, puede ver:

- Cuántos objetos tienes, cuánto ocupan y cuándo se subieron.
- Qué objetos son fragmentos, cabeceras de instantánea o índices de listas de archivos.
- Cuándo haces copias y restauras, y desde qué dirección IP.
- Cuántos datos nuevos sube cada copia, lo que da una pista de cuánto ha cambiado. Una copia sin cambios no guarda instantánea, así que las instantáneas nuevas indican cuándo ha cambiado algo.
- Aproximadamente cuánto ocupa un archivo pequeño una vez comprimido, pero no qué es ni cómo se llama. Los archivos grandes se dividen en fragmentos de distintos tamaños, así que no aparecen como un único objeto de su tamaño.

No puede comprobar si tienes un archivo conocido concreto. Tanto los nombres de los fragmentos como los puntos de corte dependen de tu clave.

## De qué te protege frost

- De que tu proveedor, o alguien con una copia de tu bucket, lea tus archivos.
- De quien esté en la red entre tú y tu almacenamiento. Las conexiones usan TLS salvo que elijas un endpoint S3 con `http://` o actives `storage.s3.insecure` para un endpoint sin esquema. Permafrost solo permite `http://` en tu propio equipo. Usa HTTP sin cifrar solo para pruebas locales. En cualquier caso, cada objeto de la copia está autenticado.
- De manipulaciones. Un objeto modificado, cambiado por otro o truncado no se descifra, y frost nunca lo acepta sin avisar.
- De que una restauración escriba fuera de la carpeta que elegiste.
- De descargas de frost manipuladas. Cada versión está firmada, y el instalador y `frost update` comprueban la firma antes de instalar nada.

## De qué no puede protegerte

- **De alguien con acceso a tu equipo.** El archivo de la clave está en tu equipo para que las copias programadas puedan funcionar. Cualquiera que pueda leerlo, o ejecutar programas como tú, puede leer tus copias. Usa cifrado de disco completo y bloqueo de pantalla.
- **De la pérdida de datos en el almacenamiento.** Tu proveedor podría borrar o retener tus objetos. Las comprobaciones aleatorias pueden notarlo, pero frost no puede impedirlo. Guarda una segunda copia independiente de todo lo que no te puedas permitir perder.
- **De instantáneas ocultas.** Un proveedor podría ocultar tus instantáneas más recientes y servir solo las antiguas. Un equipo que ya ha visto las más nuevas avisa de que faltan, pero un equipo nuevo no puede saberlo. Cada instantánea que se sirve sigue siendo auténtica.
- **De lo que revelan los horarios y los tamaños.** Cuándo haces copias, y de cuánto, es visible, como se indica arriba.

## Archivos en tu equipo

En macOS y Linux, frost crea sus archivos privados con permisos solo para tu usuario. Los permisos existentes y los registros creados por el programador pueden ser distintos. En Windows, los archivos heredan los permisos de tu perfil de usuario. Guarda la configuración y la caché en carpetas que otros usuarios no puedan leer.

| Archivo | Contiene |
| --- | --- |
| `key` | Tu frase de recuperación, en texto sin cifrar |
| `config.toml` | Tus ajustes y las credenciales de tu almacenamiento |
| `manifest-*.jsonl` | ID de fragmentos, rutas de archivos, tamaños y fechas de modificación. Nunca sale de tu equipo |
| `frost.log` | La salida de las copias programadas, incluidas las rutas que no se pudieron leer |

[Archivos y carpetas](#files-and-folders) indica dónde están.

## Recomendaciones

- Guarda tu frase de recuperación fuera de línea, en papel o en un gestor de contraseñas de confianza.
- Ejecuta `frost key verify` de vez en cuando para asegurarte de que la frase que apuntaste es correcta.
- Dale a frost unas credenciales de almacenamiento que solo lleguen a su propio bucket.
- Echa un vistazo a `frost status` de vez en cuando, y revisa enseguida cualquier problema de estado.

## Informar de un problema de seguridad

Por favor, no abras una incidencia pública. Infórmalo en privado desde la [pestaña Security](https://github.com/whatithasisandalwayswillbe/frost/security) del repositorio de frost en GitHub, con **Report a vulnerability**. Incluye qué has encontrado, cómo reproducirlo y qué podría conseguir un atacante. Recibirás respuesta en menos de una semana.
