# Problemas frecuentes

Esta página reúne los mensajes y problemas más habituales. Cada título es lo que dice frost o lo que notas tú.

## "frost isn't set up yet, run `frost init`"

frost no encuentra `config.toml`. Ejecuta `frost init`. Si usas `--config-dir` o `FROST_CONFIG_DIR`, comprueba que apunta a la carpeta correcta.

## "no key on this machine"

Falta el archivo de la clave. Si este equipo ya tiene el almacenamiento configurado, ejecuta `frost key import` y escribe tu frase de recuperación. Si no, ejecuta `frost init`.

## "a backup or restore operation is already in progress"

Otro proceso de frost está usando tus copias, normalmente una copia programada. En ese caso, frost dice "a scheduled backup is already running" y cuándo empezó. Espera a que termine y vuelve a intentarlo. Borrar el archivo de bloqueo de frost no detiene el otro proceso.

## "the local encryption key does not match"

Tu almacenamiento tiene copias hechas con otra clave. Ejecuta `frost key verify` y escribe la frase que apuntaste para ver de qué clave se trata. Si es la correcta, ejecuta `frost key import` con ella.

## frost no encuentra tus copias

Mensajes como "has no frost repository" significan que tus copias no están donde frost las busca. El error indica dónde se abrieron por última vez y cómo volver a ellas. Consulta [Mover tus copias de seguridad](#moving-backups).

Si tus copias han desaparecido de Permafrost y tu clave de acceso sigue funcionando, lo más probable es que se borraran con esa clave. Escribe enseguida a care@getfro.st. Si otra persona podría tener tu clave, consigue una nueva en [getfro.st/perma/recover](https://getfro.st/perma/recover).

## El asistente no puede conectarse

El asistente explica el problema y te devuelve a la respuesta que con más probabilidad lo causa.

| El asistente dice | Comprueba |
| --- | --- |
| Access key ID not recognized | Que copiaste el ID de clave de acceso entero |
| The secret key does not match the access key ID | Que copiaste la clave secreta entera y que pertenece a ese ID |
| No bucket found with that name | El nombre del bucket, o crea el bucket primero |
| The provided key lacks necessary bucket permissions | Que la clave puede leer, listar, escribir y borrar objetos en el bucket |
| The bucket is located in a different region | La región o el endpoint |
| Cannot resolve ... | La dirección y tu conexión a internet |
| No response from that address | La dirección y el puerto |
| The server's TLS certificate is not valid for that address | La dirección, y que el certificado del servidor la cubre |
| the storage host timed out | Tu conexión a internet; después, vuelve a intentarlo |
| cannot reach Permafrost | Tu conexión a internet; después, vuelve a intentarlo |
| Cannot locate the server | La dirección SSH y tu red |
| The server did not respond | La dirección SSH, y que el servidor esté encendido |
| That server does not support SFTP | Que SFTP esté activado en los ajustes de SSH o de servicios de archivos del servidor |
| server returned text before opening SFTP subsystem | Que un script de inicio de sesión del servidor, como `.bashrc`, no muestre nada. Haz que solo muestre texto en shells interactivas |
| There's no folder ... on ... | La ruta de la carpeta. La carpeta que la contiene tiene que existir |
| The server denied write access to that folder | Los permisos de la carpeta para la cuenta con la que inicia sesión frost |
| ... not found. Connect the required drive and try again | Que el disco esté conectado y la ruta sea correcta |
| Unable to write to that folder | Los permisos de la carpeta. En macOS, consulta [Permisos de macOS](#macos-permissions) |
| Symbolic links and directory junctions are not supported for backup folders | Usa la ruta real de la carpeta |
| That drive is read-only | Usa un disco en el que puedas escribir |

## "This storage provider does not support conditional writes"

Tu almacenamiento no admite una función que frost necesita para que los equipos no sobrescriban los registros de copia de los demás. Ni otras claves ni otros ajustes lo arreglan. Elige otro almacenamiento. Consulta [Elegir almacenamiento](#choosing-storage).

Un servidor propio o un disco lo dice de otra manera. El servidor "cannot create hard links", o la carpeta está "on an unsupported filesystem". Usa una carpeta en un sistema de archivos como ext4, Btrfs, XFS, ZFS, APFS o NTFS.

## "the server didn't accept frost's SSH key"

Tu servidor propio rechazó la clave de frost, por ejemplo después de quitarla de `authorized_keys`. Ejecuta `frost init` y vuelve a añadir la clave. Consulta [Servidor propio](#self-hosted).

## "the server's SSH host key has changed"

frost se niega a conectarse cuando cambia la identidad del servidor, igual que ssh. Si reinstalaste el servidor o tiene una dirección nueva, borra su clave antigua con `ssh-keygen -R <host>` y vuelve a ejecutar `frost init`. Si no, averigua por qué cambió la clave antes de conectarte.

## "... not found. Connect the required drive and try again"

Tus copias están en un disco que no está conectado, o la ruta de la carpeta cambió. Conecta el disco. Si Windows le dio otra letra, consulta [Disco local](#local-drive).

## "the Permafrost access key was rejected"

El mensaje sigue con el motivo de Permafrost: la clave es incorrecta, otra más nueva la sustituyó o la cuenta se cerró. Usa tu clave más reciente o consigue una nueva. Consulta [Permafrost](#permafrost).

## "uploads are paused"

Permafrost no acepta copias nuevas de tu cuenta por ahora. El mensaje dice por qué y hasta cuándo, y restaurar sigue funcionando. Consulta [Permafrost](#permafrost).

## Una copia no puede leer una carpeta

En macOS, suele ser un permiso de privacidad. El error dice qué tienes que permitir. Consulta [Permisos de macOS](#macos-permissions). En otros sistemas, comprueba que tu usuario puede leer la carpeta.

## Archivos marcados como "couldn't be read"

frost se saltó esos archivos y guardó el resto. Las causas habituales son archivos que no tienes permiso para leer, archivos borrados durante la copia y, en macOS, archivos que iCloud guarda solo en la nube.

## Archivos que "continued changing while being read"

Un programa estaba escribiendo en esos archivos durante la copia, así que la instantánea conservó su copia anterior. Cierra el programa y vuelve a hacer la copia, o deja que la siguiente copia los recoja.

## Una carpeta aparece como "not found"

Una carpeta de tu lista no estaba, así que frost respaldó el resto. Vuelve a conectar el disco o, si la carpeta se movió, actualiza tu lista con `frost init`.

## "config.toml changed, but updating the scheduled job failed"

Editaste `config.toml` y frost no pudo actualizar la tarea programada para que coincida. El resto del mensaje dice por qué. Si menciona un ajuste, corrígelo en `config.toml`. frost lo vuelve a intentar con cada comando hasta que funcione.

## "config.toml changed where backups go"

Cambiaste en `config.toml` dónde se guardan las copias, y frost encontró un problema con la nueva ubicación la primera vez que la usó. El resto del mensaje dice cuál. Consulta [Mover tus copias de seguridad](#moving-backups).

## "scheduled job is missing"

La tarea programada se borró o se desactivó. Recupérala con `frost config set schedule.enabled true`.

## Las copias programadas no se hacen

- Revisa la fila "next backup" de `frost status`.
- En macOS, revisa el interruptor de frost en Ajustes del Sistema > General > Ítems de inicio y extensiones (System Settings > General > Login Items & Extensions). Aparece como Node.js Foundation.
- En Windows, las copias programadas requieren que tengas la sesión iniciada y no se hacen con batería.
- Con `schedule.catch_up` en `false`, una copia que tocaba con el equipo apagado o en reposo se salta.
- Lee el registro. Consulta [Copias de seguridad automáticas](#scheduling).

## "verification failed"

Una comprobación aleatoria encontró datos que faltan o están dañados en tu almacenamiento. Consulta [Comprobar tus copias de seguridad](#checking-backups).

## "cannot restore alongside original files"

No se puede usar la carpeta que hay junto a los originales, a menudo porque la instantánea viene de otro equipo. Usa `--to <dir>` en su lugar. Consulta [Restaurar archivos](#restoring).

## "cannot overwrite original files"

La instantánea viene de otro tipo de equipo, o la ruta a los originales pasa por un enlace del que frost no se fía. Usa `--beside` o `--to <dir>` en su lugar.

## La restauración indica que un archivo "changed after it was checked" o "has more than one link"

frost ha detectado que un archivo ya comprobado ha cambiado, o que un archivo cuya restauración no ha terminado tiene un enlace duro a otro nombre. Cierra los programas que estén modificando la carpeta de restauración y vuelve a intentarlo. Si el archivo sin terminar tiene un enlace duro, restaura en una carpeta nueva y vacía.

## frost no encuentra la instantánea que pides

| frost dice | Prueba |
| --- | --- |
| no snapshot at or before ... | Una fecha posterior. El mensaje muestra tu instantánea más antigua |
| "maple" matches 2 snapshots; provide additional ID characters | Más caracteres del ID, como `maple-absurd` |
| cannot parse "..." as a snapshot ID or timestamp | Comillas alrededor de las fechas con espacios, como `"3 days ago"` |

## frost no puede actualizarse

La carpeta de frost no admite escritura, o frost se compiló desde el código fuente. Consulta [Actualizar frost](#updating).

## El instalador se detiene

| El instalador dice | Qué hacer |
| --- | --- |
| need OpenSSH 8.1+ to verify the frost release signature | Instala o actualiza OpenSSH. En Windows, usa el instalador de PowerShell |
| checksums.txt signature does not match official frost release key; installation aborted | No lo instales. Inténtalo más tarde e [infórmalo](#getting-help) si sigue pasando |
| runtime inside ... lacks valid OpenJS Foundation signature; installation aborted | No lo instales. Inténtalo más tarde e [infórmalo](#getting-help) si sigue pasando |
| checksum mismatch | La descarga se dañó. Vuelve a ejecutar el instalador |
| 32-bit ARM isn't supported by the bundled runtime | No hay paquete de frost para este equipo |
| installing frost requires Node.js v22 or newer | Actualiza Node.js, o usa el instalador en lugar de npm o pnpm |

## No se encuentra `frost` después de instalar

Abre una terminal nueva. Las terminales que estaban abiertas mientras se instalaba frost no ven el nuevo `PATH`. Con pnpm, ejecuta `pnpm setup` una vez y luego abre una terminal nueva.
