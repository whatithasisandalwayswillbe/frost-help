# Copias de seguridad automáticas

frost hace copias según una programación, usando el propio programador de tu sistema operativo. Entre una copia y otra no queda nada funcionando en segundo plano.

## Cambiar la programación

`frost init` te pregunta cada cuánto hacer copias. Para cambiarlo más adelante:

```sh
frost config set schedule.every 6h
```

Las opciones son `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily` y `weekly`. La predeterminada es `daily`.

Para elegir cuándo se hacen las copias, indica una hora en formato de 24 horas y, para las copias semanales, el día:

```sh
frost config set schedule.time 09:30
frost config set schedule.day friday
```

Los valores predeterminados son `15:00` y `sunday`. Para desactivar las copias automáticas, o volver a activarlas:

```sh
frost config set schedule.enabled false
frost config set schedule.enabled true
```

Cada cambio actualiza la tarea programada al momento. En macOS y Windows, un cambio hecho durante una copia programada se aplica en cuanto esa copia termina. Si editas `config.toml` tú mismo, el siguiente comando de frost actualiza la tarea.

## Cuándo se hacen las copias

Las copias se hacen a la hora de `schedule.time`, en la hora local de tu equipo:

| `schedule.every` | Hace la copia |
| --- | --- |
| `daily` | Todos los días a esa hora |
| `weekly` | Cada semana el día `schedule.day`, a esa hora |
| `2h` a `12h` | A esa hora, y cada intervalo antes y después. `6h` desde las `15:00` se ejecuta a las 03:00, 09:00, 15:00 y 21:00 |
| `hourly` | Cada hora, en los minutos de esa hora |

systemd retrasa cada ejecución hasta 5 minutos, al azar.

## Copias perdidas

Si tu equipo estaba apagado o en reposo cuando tocaba una copia, frost la hace en cuanto vuelve. Aunque se haya perdido varias, hace una sola copia.

| Programador | Hace la copia perdida |
| --- | --- |
| launchd (macOS) | Cuando tu Mac se despierta, o cuando inicias sesión después de tenerlo apagado |
| systemd (Linux) | Cuando tu equipo se despierta o arranca, o cuando inicias sesión si el lingering está desactivado |
| Programador de tareas (Windows) | En cuanto puede, cuando tu equipo vuelve y tienes la sesión iniciada |
| cron (Linux) | En los 15 minutos siguientes a que vuelva tu equipo |

Con cron, frost comprueba cada 15 minutos y solo hace una copia cuando toca o cuando se perdió una. Si una hora ya está cubierta, por una copia programada o por una que hiciste tú, no se hace una segunda copia.

Para saltarte las copias perdidas, de modo que frost solo copie a su hora:

```sh
frost config set schedule.catch_up false
```

Una copia programada que empieza antes de que vuelva tu red lo reintenta durante unos 5 minutos. Si hay otra copia en marcha, espera a que termine.

En Windows, las copias programadas solo se ejecutan mientras tengas la sesión iniciada. No empiezan mientras el equipo funciona con batería, y se detienen si lo desenchufas. En macOS y con systemd, las copias programadas se ejecutan con baja prioridad para no ralentizar tu equipo.

## La tarea programada

| Sistema | Programador | Tarea |
| --- | --- | --- |
| macOS | launchd | `~/Library/LaunchAgents/io.github.whatithasisandalwayswillbe.frost.plist` |
| Linux con systemd | Temporizador de usuario de systemd | `~/.config/systemd/user/frost-backup.service` y `frost-backup.timer` |
| Linux sin systemd | cron | Una línea de tu crontab marcada con `# frost-backup` |
| Windows | Programador de tareas | Una tarea llamada `frost backup` |

La tarea ejecuta `frost backup` con las carpetas de configuración y de caché que estaban en uso cuando se creó. Si cambias esas carpetas, vuelve a ejecutar `frost init`.

En macOS, la tarea aparece en Ajustes del Sistema > General > Ítems de inicio y extensiones (System Settings > General > Login Items & Extensions) como **Node.js Foundation**, el editor del entorno de ejecución que incluye frost. Si la desactivas ahí, se detienen las copias programadas y `frost status` indica que falta la tarea. Para detener las copias programadas, usa mejor `frost config set schedule.enabled false`.

Con systemd, frost intenta activar lingering para tu usuario (`loginctl enable-linger`) si puede confirmar que está desactivado. Lingering permite que las copias se hagan aunque hayas cerrado sesión. Si frost no puede activarlo, las copias pueden dejar de ejecutarse al cerrar sesión. Al quitar el temporizador, frost solo desactiva lingering si dejó constancia de haberlo activado.

## Registros

| Programador | Dónde va el registro |
| --- | --- |
| launchd, cron y el Programador de tareas | `frost.log` en la carpeta de caché de frost. Consulta [Archivos y carpetas](#files-and-folders) |
| systemd | El journal. Léelo con `journalctl --user -u frost-backup` |

Un registro de más de 1 MiB se vacía antes de la siguiente ejecución. `frost status` también muestra si la última copia funcionó.

## Si la tarea desaparece

Si la tarea se borra o se desactiva, `frost status` muestra "scheduled job is missing" (falta la tarea programada). Recupérala con:

```sh
frost config set schedule.enabled true
```
