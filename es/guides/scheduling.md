# Copias de seguridad automáticas

frost hace copias según una programación, usando el propio programador de tu sistema operativo. Entre una copia y otra no queda nada funcionando en segundo plano.

## Cambiar la programación

`frost init` te pregunta cada cuánto hacer copias. Para cambiarlo más adelante:

```sh
frost config set schedule.every 6h
```

Las opciones son `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily` y `weekly`. La predeterminada es `daily`.

Para desactivar las copias automáticas, o volver a activarlas:

```sh
frost config set schedule.enabled false
frost config set schedule.enabled true
```

Cualquiera de los dos cambios actualiza la tarea programada al momento.

## Cuándo se hacen las copias

| Programador | A diario | Cada semana | Más a menudo |
| --- | --- | --- | --- |
| launchd (macOS) y cron (Linux) | 03:17 | Domingos a las 03:17 | En el minuto 17 de la hora |
| Programador de tareas (Windows) | 03:17 | Domingos a las 03:17 | Cada pocas horas, contando desde que se creó la tarea |
| systemd (Linux) | Medianoche | Lunes a medianoche | En punto |

Las horas son las locales de tu equipo. systemd retrasa cada ejecución hasta 5 minutos, al azar.

## Copias perdidas

launchd y systemd se ponen al día. Si tu equipo estaba apagado o en reposo cuando tocaba una copia, la copia se hace al despertar. cron y el Programador de tareas se saltan las ejecuciones que el equipo se perdió, y la siguiente llega a su hora.

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
