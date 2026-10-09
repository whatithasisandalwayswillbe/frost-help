# Excluir archivos

Tu lista de exclusiones deja fuera de todas las copias los archivos y carpetas que indiques. En tus ajustes se llama `exclude`.

## Los valores predeterminados

Una lista nueva incluye `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules` y `.cache`. Quita los que sí quieras respaldar.

## Cómo funcionan los patrones

- **Un nombre o patrón sin barra** coincide con cualquier archivo o carpeta con ese nombre, esté donde esté. `node_modules` excluye todas las carpetas `node_modules` y todo lo que contienen.
- **Un patrón con barra** es una ruta completa. Excluye esa ruta y todo lo que hay debajo. `~` es tu carpeta de inicio, como en `~/Downloads/Movies`.

Los patrones admiten estos comodines:

| Comodín | Coincide con |
| --- | --- |
| `*` | Cualquier número de caracteres, salvo `/` |
| `?` | Un solo carácter cualquiera, salvo `/` |
| `[abc]` | Uno de los caracteres indicados. `[a-z]` es un rango, y `[^abc]` es cualquier carácter que no esté en la lista |
| `\` | El siguiente carácter tal cual, así que `\*` coincide con un `*` de verdad |

Los patrones distinguen mayúsculas de minúsculas, así que `*.MOV` no excluye `clip.mov`.

Las carpetas de tu lista nunca se excluyen a sí mismas; solo lo que hay dentro de ellas.

## Ejemplos

| Patrón | Excluye |
| --- | --- |
| `*.iso` | Todas las imágenes de disco |
| `.git` | Todas las carpetas de Git |
| `Cache*` | Todo lo que tenga un nombre que empiece por `Cache` |
| `~/Library/Caches` | La carpeta de caché de tu carpeta de inicio en macOS |
| `~/Videos/*.mov` | Los archivos `.mov` que están directamente en `~/Videos`, pero no los de sus subcarpetas |

## Cambiar la lista

Ejecuta `frost init` y cambia el paso de exclusiones, o usa `frost config edit`. También puedes fijar la lista entera con un solo comando, que sustituye la que había:

```sh
frost config set exclude .DS_Store node_modules '*.tmp' '~/Downloads'
```

Pon entre comillas los patrones que lleven `*` o `~`, para que tu shell no los expanda antes.

Para excluir algo en una sola copia:

```sh
frost backup --exclude '*.iso'
```

Excluir algo no lo quita de las instantáneas que ya tienes.
