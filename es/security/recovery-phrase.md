# Tu frase de recuperación

Tu frase de recuperación es tu clave de cifrado escrita como 24 palabras. Es la única forma de leer tus copias de seguridad.

> Si pierdes la frase de recuperación y el equipo, tus copias se pierden. Nadie puede recuperarlas: ni quien guarda tus copias, ni Permafrost, ni los autores de Frost.

## Guárdala bien

El asistente te muestra la frase cuando crea tu clave. Apúntala en papel o guárdala en un gestor de contraseñas de confianza, y tenla en un lugar distinto del equipo que respaldas.

También hay una copia en tu equipo, en el archivo `key` de la carpeta de configuración de Frost, para que las copias programadas funcionen sin ti. En macOS y Linux, Frost la crea con permisos solo para tu usuario. En Windows, hereda los permisos de tu perfil de usuario. Las carpetas compartidas o los cambios de permisos pueden dejarla expuesta. Cualquiera que pueda leer ese archivo, o ejecutar programas como tú, puede leer tus copias, así que usa cifrado de disco completo y bloqueo de pantalla.

Para leer tus copias, alguien necesita la frase y también acceso a tu almacenamiento. Mantén en privado también las claves de tu almacenamiento.

## Mostrarla

```sh
frost key show
```

Frost te avisa primero y solo muestra la frase después de que escribas `show`. Asegúrate de que nadie mira tu pantalla y de que no la estás compartiendo.

## Comprobar tu copia

```sh
frost key verify
```

Escribe la frase que apuntaste. Frost te dice si es una frase válida, si coincide con la clave de este equipo y si abre tus copias. Nunca muestra la frase. Comprueba tu copia de vez en cuando.

## Usarla en otro equipo

`frost init` te pide la frase cuando se conecta a un almacenamiento que ya tiene tus copias. Para ponerla directamente en un equipo:

```sh
frost key import
```

Si el almacenamiento ya está configurado, Frost comprueba primero que la frase lo abre. Si ya hay otra clave en el equipo, Frost pregunta antes de sustituirla. Las copias hechas con la clave antigua necesitan la frase antigua para restaurarse.

Consulta [Recuperar en un equipo nuevo](#new-computer) para ver todos los pasos.

## Escribir la frase

Escribe las 24 palabras en orden, separadas por espacios. Da igual si usas mayúsculas. Las palabras salen de la lista estándar BIP39 en inglés, de 2.048 palabras, así que Frost puede avisarte cuando una está mal escrita:

| Frost dice | Significa |
| --- | --- |
| entered 23 words, but a recovery phrase must contain exactly 24 words | Falta o sobra una palabra |
| word 5 is not a valid recovery word; check the spelling | Esa palabra está mal escrita |
| all words are valid individually, but together they do not form a valid recovery phrase; check their order and spelling | Hay dos palabras intercambiadas, o una es otra palabra real distinta |
| that recovery phrase is valid, but it does not match these backups | La frase es de otro conjunto de copias |

## La huella de la clave

La huella es un ID corto, como `6f154dc10058`, que identifica tu clave sin revelarla. `frost status` la muestra, y el explorador de instantáneas también cuando pulsas `[v]`. Las huellas coincidentes ayudan a identificar una clave, pero son demasiado cortas para demostrar que dos claves son idénticas. Frost comprueba la propia clave al abrir tus copias.

## Cambiar tu clave

Frost no puede cambiar la clave de las copias que ya tienes. Si otra persona ha podido ver tu frase, puede leer esas copias mientras tenga acceso a tu almacenamiento, así que cambia las claves de tu almacenamiento y mantenlas en privado.
