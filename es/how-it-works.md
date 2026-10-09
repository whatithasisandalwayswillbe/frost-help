# Cómo funciona frost

frost toma instantáneas de tus carpetas, divide tus archivos en fragmentos cifrados y sube solo los fragmentos que tu almacenamiento todavía no tiene.

## En resumen

1. **Recorre.** frost recorre tus carpetas y se salta todo lo que esté en tu lista de exclusiones. Los archivos cuyo tamaño y fecha de modificación no han cambiado desde la última copia no se vuelven a leer mientras la caché de frost siga teniendo registrados todos sus fragmentos.
2. **Divide.** Los archivos que han cambiado se dividen en fragmentos de 1 MiB aproximadamente, en puntos que dependen de su contenido. Un cambio en mitad de un archivo grande solo afecta a los fragmentos de alrededor.
3. **Cifra.** Cada fragmento nuevo se comprime si así ocupa menos y después se cifra con tu clave.
4. **Sube.** Solo se suben los fragmentos que no están ya en el almacenamiento.
5. **Guarda una instantánea.** frost guarda la lista de archivos, y los fragmentos que forman cada uno, como una instantánea nueva.
6. **Comprueba.** frost descarga una muestra aleatoria de fragmentos y los revisa.

## Instantáneas

Una instantánea es un registro de tus carpetas en el momento en que se hizo la copia: cada archivo y cada carpeta, con su contenido, sus permisos y su fecha de modificación. Cada instantánea está completa por sí misma, así que puedes restaurar cualquiera sin necesitar las demás.

Las instantáneas comparten fragmentos. Un archivo que no ha cambiado en un año se guarda una sola vez, aunque aparezca en muchas instantáneas, así que conservar muchas apenas ocupa espacio extra.

Si nada ha cambiado desde la última copia, frost no guarda una instantánea nueva. Te avisa de que tus carpetas ya están respaldadas.

Los ID de instantánea tienen este aspecto: `maple-absurd-3f1c`, dos palabras y cuatro caracteres más. [Restaurar archivos](#restoring) explica cómo elegir una instantánea por su ID o por la fecha.

> frost todavía no puede borrar instantáneas antiguas, así que todas se quedan en el almacenamiento. No borres a mano objetos de la carpeta de frost en tu almacenamiento ni añadas reglas que los hagan caducar. Las instantáneas comparten fragmentos, y quitar un solo objeto puede estropear muchas.

## Tu clave

`frost init` crea en tu equipo una clave aleatoria de 256 bits y te la muestra como una frase de recuperación de 24 palabras. La clave nunca sale de tu equipo. Todo lo que frost sube se cifra antes con ella, incluidos los nombres de archivo y la estructura de carpetas.

Cualquiera que tenga la frase y acceso a tu almacenamiento puede leer tus copias. Sin la frase, nadie puede. Consulta [Tu frase de recuperación](#recovery-phrase).

## El repositorio

frost guarda tus copias en una sola carpeta de tu almacenamiento, llamada repositorio. Contiene cuatro tipos de objeto:

| Objeto | Contiene |
| --- | --- |
| `frost.repo` | El ID del repositorio y la versión de su formato |
| `chunks/` | Los datos y las listas de tus archivos, cifrados |
| `snapshots/` | Una pequeña cabecera cifrada por instantánea: cuándo se tomó, en qué equipo y de qué carpetas |
| `trees/` | Qué fragmentos contienen la lista de archivos de cada instantánea |

Los nombres de los objetos son ID de aspecto aleatorio, así que tu proveedor nunca ve los nombres de tus archivos. [Seguridad y privacidad](#security) detalla lo que puede ver un proveedor.

## La caché local

frost lleva un registro de lo que ya ha subido en una carpeta de caché de tu equipo, para no tener que listar todo tu almacenamiento en cada copia. Compara ese registro con el almacenamiento una vez por semana, cuando cambia la ubicación de almacenamiento o después de que una comprobación detecte datos que faltan.

La caché es prescindible. Si se pierde, la siguiente copia la reconstruye a partir del almacenamiento y vuelve a leer tus archivos. Para restaurar no se necesita en absoluto.

## Sin servicio en segundo plano

frost no se queda funcionando en segundo plano. Las copias automáticas son tareas normales del programador de tu sistema operativo (launchd, systemd, cron o el Programador de tareas), que inician frost, hacen una copia y terminan. Consulta [Copias de seguridad automáticas](#scheduling).

## Se comprueba a sí mismo

Después de cada copia que guarda una instantánea, frost descarga una muestra aleatoria de fragmentos y comprueba que cada uno se descifra y coincide con su ID. Una copia sin cambios repite la comprobación cuando la anterior tiene más de un día. Consulta [Comprobar tus copias de seguridad](#checking-backups).
