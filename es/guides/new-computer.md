# Recuperar en un equipo nuevo

Si tu equipo se pierde, se estropea o lo cambias por otro, puedes recuperar tus archivos en uno distinto.

## Qué necesitas

- Tu frase de recuperación de 24 palabras.
- Los datos de tu almacenamiento: tu clave de acceso de Permafrost, o el nombre del bucket y las claves de acceso de tu proveedor S3.

Si todavía tienes el equipo antiguo, `frost key show` te muestra la frase.

## Pasos

1. [Instala frost](#installing) en el equipo nuevo.
2. Ejecuta `frost init` y elige el mismo almacenamiento, con los mismos datos que antes.
3. El asistente encuentra tus copias y te pide su frase de recuperación. Escribe las 24 palabras.
4. Elige las carpetas que quieres respaldar en este equipo, la lista de exclusiones y la programación, y luego revisa y guarda.
5. Restaura tus archivos antes de la primera copia de este equipo:

```sh
frost restore latest --to ~
```

Esto restaura tu instantánea más reciente en una carpeta nueva `frost-restore-<id>` dentro de tu carpeta de inicio, organizada como las carpetas originales. Si los dos equipos son del mismo tipo, puedes restaurar solo una parte añadiendo las rutas tal como eran en el equipo antiguo, como `/Users/you/Documents`.

Para elegir qué restaurar de un equipo de otro tipo, como una instantánea de un Mac en Windows, usa el explorador de instantáneas. Ejecuta `frost browse`, selecciona lo que quieras, pulsa `[r]` y elige "New folder elsewhere".

Usa `--to` y no `--beside` ni `--overwrite`. `--beside` necesita que las carpetas originales existan en este equipo, y `--overwrite` necesita una instantánea del mismo tipo de equipo: macOS y Linux, o Windows.

> Restaura antes de que este equipo haga su primera copia. Después, `latest` se refiere a la instantánea más reciente del propio equipo. Si eso ya ha pasado, ejecuta `frost status` para encontrar el ID de tu instantánea antigua y restaura esa.

## Dos equipos, un almacenamiento

Dos equipos pueden hacer copias en el mismo almacenamiento con la misma frase de recuperación. Sus instantáneas comparten una sola lista, y los datos que tienen los dos se guardan una sola vez.

En ese caso, `latest` es la instantánea más reciente de cualquiera de los dos equipos. En el explorador de instantáneas, el panel de detalles muestra qué equipo tomó cada instantánea. Para restaurar los archivos de un equipo concreto, elige su instantánea por el ID.

## Si has perdido la frase

Si el equipo antiguo todavía funciona, ejecuta `frost key show` en él. Si has perdido la frase y también el equipo, nadie puede descifrar tus copias. Consulta [Tu frase de recuperación](#recovery-phrase).
