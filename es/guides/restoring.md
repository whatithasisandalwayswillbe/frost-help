# Restaurar archivos

Recupera archivos de cualquier instantánea, en una carpeta nueva o encima de los originales.

Lo más fácil es usar el explorador de instantáneas. Ejecuta `frost browse`, busca lo que necesitas, selecciónalo con `[space]` y pulsa `[r]`. Consulta [El explorador de instantáneas](#snapshot-browser). Esta página explica cómo restaurar desde la línea de comandos.

## El comando restore

```sh
frost restore <snapshot> [paths...] --beside | --to <dir> | --overwrite
```

- **Instantánea**: de qué instantánea restaurar. Consulta «Elegir una instantánea», más abajo.
- **Rutas**: los archivos o carpetas que quieres restaurar, cada uno con todo lo que contiene. Si no indicas ninguna, se restaura la instantánea entera.
- **Destino**: exactamente una de estas opciones: `--beside`, `--to` o `--overwrite`.

Por ejemplo:

```sh
frost restore latest ~/Documents/taxes --beside
frost restore yesterday ~/notes.txt --to ~/Desktop
frost restore maple-absurd-3f1c --overwrite
```

`frost restore` sin nada detrás abre el explorador de instantáneas.

## Elegir una instantánea

| Escribes | Obtienes |
| --- | --- |
| `latest` | La instantánea más reciente |
| `maple-absurd-3f1c`, o solo `maple` | La instantánea con ese ID, o la única cuyo ID empieza por lo que has escrito |
| `3 days ago`, `12h`, `2w`, `1 month ago` | La instantánea más reciente en ese momento o antes |
| `yesterday`, `today` | La instantánea más reciente hasta el final de ese día |
| `2026-09-20`, `2026-09-20 14:30` | La instantánea más reciente en ese día o minuto, o antes, en tu hora local |

Las fechas relativas se escriben en inglés y admiten minutos (`m`), horas (`h`), días (`d`), semanas (`w`), meses (`mo`) y años (`y`), o las palabras completas. Pon entre comillas lo que lleve espacios, como `"3 days ago"`.

`frost status` enumera tus instantáneas con sus ID. Si lo que escribes coincide con más de un ID, frost te pide que escribas más caracteres.

## Dónde van los archivos

| Opción | Restaura en |
| --- | --- |
| `--beside` | Una carpeta nueva `frost-restore-<id>` junto a los originales |
| `--to <dir>` | Una carpeta nueva `frost-restore-<id>` dentro de `<dir>`, que ya tiene que existir |
| `--overwrite` | Las ubicaciones originales, sustituyendo lo que haya. frost pregunta antes, y `-y` se salta la pregunta |

Una carpeta nueva nunca sobrescribe nada. Dentro de ella, lo que restauras conserva su nombre y se organiza a partir de la carpeta que comparte tu selección:

| Restauras | `--beside` te da |
| --- | --- |
| `~/Documents/taxes` | `~/Documents/frost-restore-<id>/taxes/...` |
| `~/notes.txt` | `~/frost-restore-<id>/notes.txt` |
| `~/Documents/a` y `~/Pictures/b` | `~/frost-restore-<id>/Documents/a` y `~/frost-restore-<id>/Pictures/b` |

El nombre de la carpeta nueva usa el ID corto de la instantánea. Si ese nombre ya existe, frost añade `-1`, `-2`, etcétera.

`--beside` no funciona cuando tu selección solo comparte la raíz de un disco, cuando su carpeta no está en este equipo (como pasa con una instantánea de otro equipo) o cuando no puedes escribir ahí. Por ejemplo, restaurar junto al original una instantánea de toda tu carpeta de inicio supondría crear una carpeta nueva en `/Users` o `/home`. En esos casos, usa `--to`.

## Restaurar encima de los originales

`--overwrite` devuelve los archivos a su sitio y sustituye lo que haya. frost te muestra lo que va a hacer y pregunta antes:

```text
┌  restore maple-absurd-3f1c  2026-10-07 03:17 (1d ago)
│
│  paths        /home/you/Documents/taxes
▲  into         original locations (existing files will be replaced)
│
│  Go ahead? [y/N]
```

- Los archivos que ya coinciden con la instantánea se comprueban y se saltan, así que no se vuelven a descargar.
- Los archivos que no están en la instantánea no se tocan.
- Cada archivo se escribe primero en un archivo temporal oculto a su lado y después se intercambia. Necesitas espacio para las dos copias del archivo que se está restaurando.
- La instantánea tiene que venir del mismo tipo de equipo: instantáneas de macOS y Linux sobre macOS o Linux, y de Windows sobre Windows.
- frost no restaura a través de un enlace de carpeta que otro usuario haya podido modificar. Si ese es el problema, te lo dice antes de preguntar, y el explorador muestra en gris "Overwrite original files".

## Comprobaciones de seguridad

Cada fragmento se descifra y se compara con su ID antes de escribirlo. Cada archivo solo recibe su nombre real cuando está completo, así que una restauración fallida nunca deja un archivo a medio escribir donde había uno de verdad.

Los enlaces simbólicos restaurados conservan sus destinos originales, que pueden apuntar fuera de la carpeta de restauración.

## Restauraciones interrumpidas

Si una restauración se detiene, por una conexión perdida, `Ctrl+C` o porque el equipo entra en reposo, frost muestra el comando que la continúa:

```text
What's restored so far was kept. To carry on from there, run:

  frost restore maple-absurd-3f1c9a0b2e7 /home/you/Documents/taxes --beside
```

Es la misma restauración con el ID completo de la instantánea en lugar de `latest` o de una fecha, así que una copia hecha entretanto no cambia la instantánea a la que se refiere. Los archivos ya restaurados se comprueban y se saltan, y el archivo que frost estaba escribiendo continúa desde su último fragmento correcto. En Windows, algunas rutas necesitan un comando de PowerShell; el mensaje indica cuándo ejecutarlo en PowerShell.

Hasta que la restauración termina, su carpeta contiene un marcador `.frost-restore` y un archivo `.frost-partial-...`. Déjalos ahí; frost los quita al terminar.

Para restaurar después de perder tu equipo, consulta [Recuperar en un equipo nuevo](#new-computer).
