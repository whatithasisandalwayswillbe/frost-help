# Servidor propio

Haz copias de seguridad en una carpeta de un equipo que gestionas tú, por SSH. Puede ser un servidor Linux, un NAS, una Raspberry Pi, un VPS, o un Mac o un equipo con Windows que tenga activado su servidor SSH. frost usa el cliente SSH que ya tiene tu equipo, así que no hay nada que instalar en el servidor.

## Antes de empezar

- El servidor necesita SSH y SFTP activados. La mayoría de servidores Linux tienen los dos. En un NAS, búscalos en los ajustes del terminal o de los servicios de archivos.
- Necesitas una cuenta en el servidor que pueda escribir en la carpeta que vas a usar. Una cuenta solo para copias de seguridad es buena idea.
- En Windows, el cliente OpenSSH tiene que estar instalado. Normalmente lo está. Si no, añádelo en Configuración, en Sistema > Características opcionales.

## En el asistente

Ejecuta `frost init` y elige **Self-hosted**.

| El asistente pregunta | Respuesta |
| --- | --- |
| What's the server's SSH address? | Un usuario y un host, como `me@nas.local`, o un `Host` de tu configuración de SSH. Añade `:2222` si usa otro puerto |
| Which folder on the server? | `frost` de forma predeterminada, que está en tu carpeta personal del servidor. También sirve una ruta completa como `/srv/backups/frost` |

El asistente crea la última parte de la carpeta si falta. La carpeta que la contiene ya tiene que existir.

## La clave SSH de frost

frost proporciona su propia clave SSH, que el asistente crea la primera vez. No necesita tus claves personales ni tu agente SSH, y nunca pide una contraseña, así que las copias programadas se conectan de la misma forma cada vez.

El servidor todavía no conoce la clave de frost, así que la primera vez el asistente te pregunta cómo añadirla:

- **Add it for me** (añadirla por mí) le pasa la terminal a ssh. La primera vez que te conectas a un servidor, ssh muestra su huella y te pregunta si confías en él. Después te pide tu contraseña del servidor, añade la clave de frost y el asistente continúa. Tu contraseña solo va a ssh. frost nunca la ve ni la guarda.
- **I'll add it myself** (la añado yo) muestra dónde está el archivo de la clave pública de frost. Añade la línea de ese archivo a `~/.ssh/authorized_keys` en el servidor y pulsa `[enter]`.

| Equipo | Clave pública de frost |
| --- | --- |
| macOS y Linux | `~/.config/frost/ssh/frost_ed25519.pub` |
| Windows | `%AppData%\frost\ssh\frost_ed25519.pub` |

Cuando el asistente añade la clave por ti, su línea empieza por `restrict`. Esto desactiva la redirección de conexiones y la asignación de terminales, pero frost sigue pudiendo leer y escribir archivos. Los comandos de shell siguen siendo posibles salvo que el servidor limite la cuenta a SFTP.

### Añadir la clave a mano

En macOS o Linux, este comando añade la clave precedida de `restrict` y te pide la contraseña del servidor:

```sh
(printf 'restrict '; cat ~/.config/frost/ssh/frost_ed25519.pub) | ssh me@nas.local 'umask 077; mkdir -p .ssh; cat >> .ssh/authorized_keys'
```

Algunos NAS también permiten pegar una clave SSH en los ajustes de tu cuenta.

Un servidor Windows guarda las claves en otros sitios, así que **Add it for me** no funciona ahí. Añade la línea a `C:\Users\<you>\.ssh\authorized_keys` para una cuenta normal, o a `C:\ProgramData\ssh\administrators_authorized_keys` para una de administrador.

## Puertos y tu configuración de SSH

frost lee tu configuración SSH, `~/.ssh/config`, igual que ssh. Una entrada `Host` puede definir el usuario, el puerto y otras opciones, y puedes usar su nombre como dirección. frost proporciona su propia clave, pero también se pueden ofrecer las claves indicadas explícitamente mediante `IdentityFile` en tu configuración SSH.

## Conviene saber

- El sistema de archivos del servidor tiene que admitir enlaces duros, que frost usa para asegurarse de que dos equipos nunca sobrescriban los registros de copia del otro. ext4, Btrfs, XFS, ZFS, APFS y NTFS los admiten todos. El asistente lo comprueba al conectarse.
- Si cambia la clave de host del servidor, frost se niega a conectarse, igual que ssh. Si reinstalaste el servidor, borra su clave antigua con `ssh-keygen -R <host>` y vuelve a ejecutar `frost init`.
- `frost status` muestra lo lleno que está el disco del servidor, y `frost backup` avisa cuando está casi lleno.
- Si la carpeta está en un disco que el servidor monta, ese disco tiene que estar montado cuando se hacen las copias. Si la carpeta no está, la copia falla en lugar de escribir en otro sitio.
