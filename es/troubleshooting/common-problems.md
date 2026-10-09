# Problemas frecuentes

Esta página reúne los mensajes y problemas más habituales. Cada título es lo que dice frost o lo que notas tú.

## "frost isn't set up yet, run `frost init`"

frost no encuentra `config.toml`. Ejecuta `frost init`. Si usas `--config-dir` o `FROST_CONFIG_DIR`, comprueba que apunta a la carpeta correcta.

## "no key on this machine"

Falta el archivo de la clave. Si este equipo ya tiene el almacenamiento configurado, ejecuta `frost key import` y escribe tu frase de recuperación. Si no, ejecuta `frost init`.

## "a backup or restore is already running"

Otro proceso de frost está usando tus copias, normalmente una copia programada. Espera a que termine y vuelve a intentarlo. Borrar el archivo de bloqueo de frost no detiene el otro proceso.

## "the key on this machine doesn't match"

Tu almacenamiento tiene copias hechas con otra clave. Ejecuta `frost key verify` y escribe la frase que apuntaste para ver de qué clave se trata. Si es la correcta, ejecuta `frost key import` con ella.

## frost no encuentra tus copias

Mensajes como "has no frost repository" significan que tus copias no están donde frost las busca. El error indica dónde se abrieron por última vez y cómo volver a ellas. Consulta [Mover tus copias de seguridad](#moving-backups).

## El asistente no puede conectarse

El asistente explica el problema y te devuelve a la respuesta que con más probabilidad lo causa.

| El asistente dice | Comprueba |
| --- | --- |
| That access key ID wasn't recognised | Que copiaste el ID de clave de acceso entero |
| The secret key doesn't match the access key ID | Que copiaste la clave secreta entera y que pertenece a ese ID |
| There's no bucket with that name | El nombre del bucket, o crea el bucket primero |
| That key doesn't have the bucket permissions frost needs | Que la clave puede leer, listar, escribir y borrar objetos en el bucket |
| The bucket is in a different region | La región o el endpoint |
| Can't find ... | La dirección y tu conexión a internet |
| Nothing answered at that address | La dirección y el puerto |
| The server's certificate isn't valid for that address | La dirección, y que el certificado del servidor la cubre |
| the storage didn't answer in time | Tu conexión a internet; después, vuelve a intentarlo |

## "This storage doesn't support conditional writes"

Tu proveedor no admite una función que frost necesita para que los equipos no sobrescriban los registros de copia de los demás. Ni otras claves ni otros ajustes lo arreglan. Elige otro proveedor. Consulta [Elegir almacenamiento](#choosing-storage).

## "the Permafrost access key was rejected"

La clave puede ser incorrecta o haber caducado. Ejecuta `frost init` y vuelve a configurar el almacenamiento para conseguir una que funcione. Consulta [Permafrost](#permafrost).

## Una copia no puede leer una carpeta

En macOS, suele ser un permiso de privacidad. El error dice qué tienes que permitir. Consulta [Permisos de macOS](#macos-permissions). En otros sistemas, comprueba que tu usuario puede leer la carpeta.

## Archivos marcados como "couldn't be read"

frost se saltó esos archivos y guardó el resto. Las causas habituales son archivos que no tienes permiso para leer, archivos borrados durante la copia y, en macOS, archivos que iCloud guarda solo en la nube.

## Archivos que "kept changing while they were read"

Un programa estaba escribiendo en esos archivos durante la copia, así que la instantánea conservó su copia anterior. Cierra el programa y vuelve a hacer la copia, o deja que la siguiente copia los recoja.

## Una carpeta aparece como "not found"

Una carpeta de tu lista no estaba, así que frost respaldó el resto. Vuelve a conectar el disco o, si la carpeta se movió, actualiza tu lista con `frost init`.

## "scheduled job is missing"

La tarea programada se borró o se desactivó. Recupérala con `frost config set schedule.enabled true`.

## Las copias programadas no se hacen

- Revisa la fila "next backup" de `frost status`.
- En macOS, revisa el interruptor de frost en Ajustes del Sistema > General > Ítems de inicio y extensiones (System Settings > General > Login Items & Extensions). Aparece como Node.js Foundation.
- En Windows, las copias programadas no se hacen con batería.
- Con cron o el Programador de tareas, una copia que tocaba con el equipo apagado o en reposo se salta.
- Lee el registro. Consulta [Copias de seguridad automáticas](#scheduling).

## "verification failed"

Una comprobación aleatoria encontró datos que faltan o están dañados en tu almacenamiento. Consulta [Comprobar tus copias de seguridad](#checking-backups).

## "can't restore beside the originals"

No se puede usar la carpeta que hay junto a los originales, a menudo porque la instantánea viene de otro equipo. Usa `--to <dir>` en su lugar. Consulta [Restaurar archivos](#restoring).

## "can't overwrite the originals"

La instantánea viene de otro tipo de equipo, o la ruta a los originales pasa por un enlace del que frost no se fía. Usa `--beside` o `--to <dir>` en su lugar.

## frost no encuentra la instantánea que pides

| frost dice | Prueba |
| --- | --- |
| no snapshot at or before ... | Una fecha posterior. El mensaje muestra tu instantánea más antigua |
| "maple" matches 2 snapshots, use more of the ID | Más caracteres del ID, como `maple-absurd` |
| can't read "..." as a snapshot ID or time | Comillas alrededor de las fechas con espacios, como `"3 days ago"` |

## frost no puede actualizarse

frost lo instaló un gestor de paquetes, su carpeta no admite escritura o se compiló desde el código fuente. Consulta [Actualizar frost](#updating).

## El instalador se detiene

| El instalador dice | Qué hacer |
| --- | --- |
| need OpenSSH 8.1+ to verify the frost release signature | Instala o actualiza OpenSSH. En Windows, Git for Windows lo incluye |
| checksums.txt isn't signed by the frost release key. Don't install this. | No lo instales. Inténtalo más tarde e [infórmalo](#getting-help) si sigue pasando |
| checksum mismatch | La descarga se dañó. Vuelve a ejecutar el instalador |
| 32-bit ARM isn't supported by the bundled runtime | No hay paquete de frost para este equipo |
