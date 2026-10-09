# Permisos de macOS

macOS protege algunas carpetas, como Escritorio, Documentos y Descargas, y los datos de apps como Mail y Safari. Un programa necesita tu permiso antes de poder leerlas.

## Copias que ejecutas tú

Cuando ejecutas `frost backup` en una terminal, macOS pregunta por tu app de terminal, como Terminal, iTerm, Visual Studio Code, Warp o Ghostty. Dale permiso y frost podrá leer esas carpetas.

## Copias programadas

Las copias programadas ejecutan el entorno de ejecución que incluye frost, que macOS trata como un programa propio:

```text
~/Library/Application Support/frost/app/runtime/bin/node
```

macOS pregunta por él la primera vez que lee `~/Desktop`, `~/Documents` o `~/Downloads`. Le niega el acceso a otras carpetas protegidas, como `~/Library/Mail` y `~/Library/Safari`, sin preguntar.

## Acceso total al disco

Para que frost pueda leer todas las carpetas que respaldas, dale acceso total al disco:

1. Abre Ajustes del Sistema > Privacidad y seguridad > Acceso total al disco (System Settings > Privacy & Security > Full Disk Access).
2. Haz clic en el botón de añadir, pulsa `Cmd+Shift+G` y pega la ruta del entorno de ejecución que aparece arriba.
3. Selecciona `node`, haz clic en Abrir y comprueba que su interruptor está activado.
4. Haz lo mismo con tu app de terminal, para las copias que ejecutas tú.

El permiso se mantiene cuando frost se actualiza.

Cuando macOS bloquea una copia, el error de frost indica qué app o archivo tienes que permitir.

## iCloud Drive

frost no descarga los archivos que iCloud guarda solo en la nube, así que una copia nunca llena tu disco ni se queda esperando descargas. Esos archivos se omiten y se enumeran. Para respaldarlos, haz que Finder los mantenga descargados en este Mac.

## Ítems de inicio

La tarea programada de frost aparece en Ajustes del Sistema > General > Ítems de inicio y extensiones (System Settings > General > Login Items & Extensions) como **Node.js Foundation**, el editor del entorno de ejecución que incluye frost. Déjala activada. Consulta [Copias de seguridad automáticas](#scheduling).
