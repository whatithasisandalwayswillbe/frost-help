# El explorador de instantáneas

`frost browse` abre un explorador de instantáneas a pantalla completa. Puedes recorrer tus archivos tal como estaban, comparar instantáneas y restaurar lo que elijas.

```sh
frost browse
```

`frost restore` sin nada detrás también abre el explorador. Una copia programada puede ejecutarse mientras el explorador está abierto.

## Moverse

| Tecla | Qué hace |
| --- | --- |
| `[↑]` `[↓]` o `[k]` `[j]` | Moverse |
| `[pgup]` `[pgdn]` | Avanzar o retroceder una página |
| `[g]` `[G]` | Saltar al principio o al final |
| `[enter]` | Abrir |
| `[esc]` | Volver, o cerrar un error |
| `[h]` | Mostrar todas las teclas |
| `[s]` | Mostrar tus ajustes |
| `[v]` | Mostrar u ocultar la huella de tu clave |
| `[q]` | Salir |

La pantalla de ajustes es de solo lectura. Cambia los ajustes con `frost config set` o `frost config edit`.

## Inicio

La pantalla de inicio muestra tu última copia y la última comprobación. Pulsa `[enter]` para ver tus instantáneas, o `[r]` para actualizar.

## Instantáneas

Las instantáneas aparecen de la más reciente a la más antigua, agrupadas por fecha. En una ventana ancha, un panel junto a la lista muestra los detalles de la instantánea resaltada: cuándo se tomó, en qué equipo, cuántos archivos contiene, su tamaño y cuántos datos nuevos añadió.

| Tecla | Qué hace |
| --- | --- |
| `[enter]` | Abrir los archivos de la instantánea |
| `[d]` | Compararla con la instantánea anterior |
| `[m]` | Marcarla. Después pulsa `[d]` sobre otra instantánea para comparar las dos |

Una comparación enumera lo que se añadió, se quitó y se modificó entre las dos instantáneas.

## Archivos

Ves tus carpetas y archivos exactamente como estaban en esa instantánea.

| Tecla | Qué hace |
| --- | --- |
| `[enter]` | Abrir una carpeta |
| `[←]` | Subir a la carpeta superior |
| `[space]` | Seleccionar o deseleccionar |
| `[a]` | Seleccionar o deseleccionar todo lo de esta carpeta |
| `[c]` | Borrar la selección |
| `[r]` | Restaurar la selección, o el elemento resaltado si no hay nada seleccionado |

## Restaurar

Después de `[r]`, elige dónde van los archivos:

| Tecla | Opción | Qué hace |
| --- | --- | --- |
| `[1]` | New folder beside originals | Restaura en una carpeta nueva junto a los originales, como `frost restore --beside` |
| `[2]` | New folder elsewhere | Te deja elegir una carpeta y restaura en una carpeta nueva dentro de ella |
| `[3]` | Overwrite original files | Sustituye los originales, como `frost restore --overwrite`. Pulsa `[y]` para confirmar |

Antes de escribir nada, frost te muestra dónde irá cada cosa. Pulsa `[enter]` para restaurar, `[c]` para cambiar la carpeta o `[esc]` para cancelar. Las confirmaciones y los resultados largos se desplazan con `[pgup]` y `[pgdn]`.

"New folder elsewhere" abre el selector de carpetas de tu sistema: Finder en macOS, el Explorador de archivos en Windows, y zenity, qarma o matedialog en Linux. Por SSH, o en Linux sin selector, escribes la carpeta a mano. Pulsa `[t]` con el selector abierto para escribirla de todos modos.

Cuando termina una restauración, frost muestra lo restaurado en Finder, el Explorador de archivos o el gestor de archivos de Linux. Si es un solo archivo, aparece seleccionado; si no, se abre la carpeta que lo contiene todo. No se abre nada por SSH, sin pantalla gráfica o cuando la restauración falla.

[Restaurar archivos](#restoring) explica cada opción en detalle, y qué pasa cuando se interrumpe una restauración.
