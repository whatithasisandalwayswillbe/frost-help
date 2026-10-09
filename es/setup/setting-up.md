# Configurar frost

`frost init` te guía por la configuración pregunta a pregunta. Vuelve a ejecutarlo cuando quieras revisar o cambiar tus ajustes.

## Las pantallas del asistente

En una terminal, `frost init` abre un asistente a pantalla completa. Necesita una ventana de al menos 56 columnas de ancho y 18 filas de alto. La última línea muestra siempre las teclas que puedes pulsar: `[esc]` vuelve un paso atrás y `[q]` sale sin guardar.

### Almacenamiento

Elige dónde van tus copias:

- **Permafrost**, la opción recomendada. Solo necesita una clave de acceso y nada más, y si todavía no tienes clave, frost puede conseguirte una en tu navegador. Consulta [Permafrost](#permafrost).
- **Backblaze B2**, **Amazon S3**, **Cloudflare R2** o **Wasabi**. El asistente pregunta solo lo que necesita ese proveedor y te dice dónde encontrar cada respuesta.
- **Other S3-compatible** (otro compatible con S3), para MinIO, Ceph y otros servicios que hablan el protocolo S3.

Cada proveedor tiene su propia página en la sección Almacenamiento. Cuando pegas una clave secreta, `[tab]` la muestra u oculta.

Cuando terminas de responder, frost se conecta y comprueba que puede escribir, leer, listar y borrar un pequeño objeto de prueba, y que el almacenamiento admite escrituras condicionales. Si algo falla, el asistente te lo explica con palabras sencillas y te devuelve a la respuesta que con más probabilidad lo ha causado. Todo lo demás que escribiste se conserva.

### Carpetas

Escribe la ruta completa de una carpeta que quieras respaldar y pulsa `[enter]`. `~` es tu carpeta de inicio, así que `~/Documents` funciona. Añade todas las carpetas que quieras; frost no elige ninguna por ti.

- frost respalda carpetas enteras. Para respaldar un solo archivo, añade la carpeta en la que está.
- Una carpeta que ya está en la lista, o que está dentro de una que lo está, no se añade dos veces. Añadir una carpeta que contiene otras de la lista las sustituye.
- Una carpeta que todavía no existe se queda en la lista y se omite hasta que exista, como un disco que no está conectado.

Pulsa `[↑]` para entrar en la lista y `[x]` para quitar la carpeta seleccionada. Pulsa `[enter]` con la casilla vacía para continuar.

### Exclusiones

Este paso enumera los nombres y patrones que frost deja fuera de todas las copias. La lista empieza con los valores predeterminados de frost: `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules` y `.cache`. Quita los que sí quieras respaldar. [Excluir archivos](#excluding-files) explica cómo funcionan los patrones.

### Programación

Elige cada cuánto hace frost copias por su cuenta: cada hora, cada 6 o 12 horas, a diario o cada semana. Elige "Off" (desactivado) para hacer copias solo cuando ejecutes `frost backup`. Hay más intervalos disponibles con `frost config set`. Consulta [Copias de seguridad automáticas](#scheduling).

### Frase de recuperación

Si el almacenamiento es nuevo, frost crea tu clave y te la muestra como 24 palabras. Las palabras siguen tapadas hasta que pulsas `[v]`, para que primero te asegures de que nadie más ve tu pantalla. Apúntalas, pulsa `[enter]` y escribe las dos palabras que te pida el asistente para comprobar tu copia.

Si el almacenamiento ya tiene copias de frost, el asistente te pide la frase de recuperación de esas copias. Si la clave que ya hay en este equipo las abre, se salta este paso.

### Revisión

La pantalla de revisión muestra todos los ajustes a la vez. Usa `[↑]` y `[↓]` para elegir una línea y `[e]` para cambiarla, y después pulsa `[s]` para guardar. `[v]` muestra la huella de tu clave, un ID corto que identifica tu clave sin revelarla.

Al guardar se escriben tus ajustes y tu clave, y se crea la tarea programada. Cuando termines, ejecuta `frost backup --dry-run` para ver una vista previa de tu primera copia, o `frost backup` para empezarla.

## Almacenamiento que ya tiene copias

El asistente busca copias de frost en cuanto se conecta:

- Si la clave de este equipo las abre, el asistente se conecta y conservas todas tus instantáneas.
- Si se hicieron con otra clave, el asistente te pide la frase de recuperación de esa clave. A partir de ahí, frost usa esa clave en este equipo.
- Si el almacenamiento está vacío pero las copias de este equipo están en otro sitio, el asistente te avisa antes de empezar allí un conjunto de copias aparte. Tus copias anteriores se quedan donde están, pero frost solo muestra las nuevas.

Si lo que quieres es mover las copias que ya tienes, consulta [Mover tus copias de seguridad](#moving-backups).

## Volver a ejecutar el asistente

Ejecuta `frost init` cuando quieras. Se abre con tus ajustes actuales, así que puedes cambiar una sola cosa y guardar.

El asistente a pantalla completa no pregunta por dos ajustes menos habituales, y mantiene el valor que tengan:

- Un servidor de Permafrost propio: `storage.permafrost.url`.
- La carpeta dentro de un bucket de S3, `frost` de forma predeterminada: `storage.s3.prefix`.

Cámbialos con `frost config set`. Consulta [Ajustes](#settings).

## Sin una terminal a pantalla completa

Cuando frost no se ejecuta en una terminal interactiva, por ejemplo con la entrada redirigida, `frost init` hace preguntas sencillas, una por línea. En lugar de la lista de proveedores, ofrece Permafrost o un bucket genérico compatible con S3, y también pregunta por la carpeta dentro del bucket. Las listas se separan con comas, y `-` deja vacía la lista de exclusiones. Conseguir una clave de Permafrost en el navegador también funciona en este modo.
