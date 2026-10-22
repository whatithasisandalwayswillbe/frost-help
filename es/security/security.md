# Seguridad y privacidad

Frost cifra tus copias en tu equipo, con una clave que solo tienes tú, antes de guardar nada. Sin la clave, nadie puede leerlas: ni un proveedor en la nube, ni quien opera Permafrost, ni nadie más con acceso a tu servidor o tu disco, ni los autores de Frost.

Frost no tiene cuentas y no recopila nada sobre ti ni sobre cómo lo usas. Solo se conecta a tu almacenamiento y a GitHub, para buscar y descargar actualizaciones.

## Qué se cifra

Frost cifra todo lo que hay dentro de tus copias: el contenido de los archivos, sus nombres, la estructura de carpetas y los detalles de cada instantánea. El asistente también envía un pequeño objeto de prueba sin cifrar y después lo borra. No contiene archivos, nombres ni la clave de cifrado. Frost nunca envía tu clave a un servidor ni guarda una copia bajo custodia.

| Elemento | Cómo |
| --- | --- |
| Clave | 256 bits aleatorios, creados en tu equipo por `frost init` |
| Frase de recuperación | La propia clave, escrita como 24 palabras BIP39 |
| Cifrado | XChaCha20-Poly1305, con un nonce aleatorio nuevo para cada objeto |
| Nombres de los fragmentos | HMAC-SHA256 del contenido del fragmento, calculado con tu clave |
| Compresión | zstd, antes del cifrado, solo cuando reduce el tamaño |

## Qué puede ver tu almacenamiento

Quien gestiona tu almacenamiento, o puede leerlo, ve lo siguiente. Es un proveedor en la nube o Permafrost, o, en un servidor propio o un disco, cualquiera con acceso a él.

- Cuántos objetos tienes, cuánto ocupan y cuándo se subieron.
- Qué objetos son fragmentos, cabeceras de instantánea o índices de listas de archivos.
- Cuándo haces copias y restauras, y desde qué dirección IP.
- Cuántos datos nuevos sube cada copia, lo que da una pista de cuánto ha cambiado. Una copia sin cambios no guarda instantánea, así que las instantáneas nuevas indican cuándo ha cambiado algo.
- Aproximadamente cuánto ocupa un archivo pequeño una vez comprimido, pero no qué es ni cómo se llama. Los archivos grandes se dividen en fragmentos de distintos tamaños, así que no aparecen como un único objeto de su tamaño.

No puede comprobar si tienes un archivo conocido concreto. Tanto los nombres de los fragmentos como los puntos de corte dependen de tu clave.

## De qué te protege Frost

- De que quien gestiona o alcanza tu almacenamiento lea tus archivos, también con una copia de tu bucket, de la carpeta de tu servidor o de tu disco.
- De quien esté en la red entre tú y tu almacenamiento. Las conexiones usan TLS o SSH salvo que elijas un endpoint S3 con `http://` o actives `storage.s3.insecure` para un endpoint sin esquema. Permafrost solo permite `http://` en tu propio equipo. Usa HTTP sin cifrar solo para pruebas locales. En cualquier caso, cada objeto de la copia está autenticado.
- De alguien que se haga pasar por tu servidor propio. SSH comprueba la clave de host del servidor y rechaza una que haya cambiado. Consulta [Servidor propio](#self-hosted).
- De manipulaciones. Un objeto modificado, cambiado por otro o truncado no se descifra, y Frost nunca lo acepta sin avisar.
- De que una restauración escriba fuera de la carpeta que elegiste.
- De descargas de Frost manipuladas. Cada versión está firmada, y los instaladores, el paquete de npm `getfrost` y `frost update` comprueban la firma antes de instalar nada.

## De qué no puede protegerte

- **De alguien con acceso a tu equipo.** El archivo de la clave está en tu equipo para que las copias programadas puedan funcionar, igual que la clave SSH de Frost para un servidor propio. Cualquiera que pueda leer el archivo de la clave, o ejecutar programas como tú, puede leer tus copias. Usa cifrado de disco completo y bloqueo de pantalla.
- **De la pérdida de datos en el almacenamiento.** Quien controla tu almacenamiento podría borrar o retener tus objetos, y un disco puede estropearse o perderse. Las comprobaciones aleatorias pueden notarlo, pero Frost no puede impedirlo. Guarda una segunda copia independiente de todo lo que no te puedas permitir perder, en otro sitio que no sea el disco junto a tu equipo.
- **De instantáneas ocultas.** El almacenamiento podría ocultar tus instantáneas más recientes y servir solo las antiguas. Un equipo que ya ha visto las más nuevas avisa de que faltan, pero un equipo nuevo no puede saberlo. Cada instantánea que se sirve sigue siendo auténtica.
- **De lo que revelan los horarios y los tamaños.** Cuándo haces copias, y de cuánto, es visible, como se indica arriba.

## Archivos en tu equipo

En macOS y Linux, Frost crea sus archivos privados con permisos solo para tu usuario. Los permisos existentes y los registros creados por el programador pueden ser distintos. En Windows, los archivos heredan los permisos de tu perfil de usuario, salvo la clave SSH de Frost, cuya carpeta solo puede abrir tu cuenta. Guarda la configuración y la caché en carpetas que otros usuarios no puedan leer.

| Archivo | Contiene |
| --- | --- |
| `key` | Tu frase de recuperación, en texto sin cifrar |
| `config.toml` | Tus ajustes y las credenciales de tu almacenamiento |
| `ssh/frost_ed25519` | La clave SSH de Frost para un servidor propio |
| `manifest-*.jsonl` | ID de fragmentos, rutas de archivos, tamaños y fechas de modificación. Nunca sale de tu equipo |
| `frost.log` | La salida de las copias programadas, incluidas las rutas que no se pudieron leer |

[Archivos y carpetas](#files-and-folders) indica dónde están.

## Recomendaciones

- Guarda tu frase de recuperación fuera de línea, en papel o en un gestor de contraseñas de confianza.
- Ejecuta `frost key verify` de vez en cuando para asegurarte de que la frase que apuntaste es correcta.
- Dale a Frost unas credenciales de almacenamiento que solo lleguen a su propio bucket, o una cuenta en el servidor que no pueda cambiar nada más que te importe.
- Echa un vistazo a `frost status` de vez en cuando, y revisa enseguida cualquier problema de estado.

## Informar de un problema de seguridad

Por favor, no abras una incidencia pública. Infórmalo en privado desde la [pestaña Security](https://github.com/whatithasisandalwayswillbe/frost/security) del repositorio de Frost en GitHub, con **Report a vulnerability**. Incluye qué has encontrado, cómo reproducirlo y qué podría conseguir un atacante. Recibirás respuesta en menos de una semana.
