# Primeros pasos

frost hace copias de seguridad de tus carpetas en el almacenamiento que elijas, y lo cifra todo en tu equipo antes de subirlo. Esta página te lleva desde la instalación de frost hasta tu primera copia de seguridad.

## Qué necesitas

- Un Mac, o un equipo con Linux o Windows, con un procesador Intel, AMD o ARM de 64 bits.
- Un lugar donde guardar tus copias: una clave de acceso de [Permafrost](#permafrost) o un bucket en un [proveedor compatible con S3](#choosing-storage).
- Una ventana de terminal de al menos 56 columnas de ancho y 18 filas de alto, para el asistente de configuración a pantalla completa.

No necesitas instalar Node.js ni nada más antes. frost trae su propio entorno de ejecución.

## 1. Instala frost

En macOS o Linux, ejecuta esto en una terminal. En Windows, ejecútalo en Git Bash.

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | sh
```

El instalador comprueba la firma de la versión antes de instalar nada. [Instalar frost](#installing) explica la instalación manual y las opciones del instalador.

## 2. Configúralo

```sh
frost init
```

El asistente de configuración pregunta una sola cosa en cada pantalla:

1. **Almacenamiento.** Dónde se guardan tus copias. Elige Permafrost o un proveedor compatible con S3 y pega las claves que te pida.
2. **Carpetas.** Las carpetas que quieres respaldar, como `~/Documents`.
3. **Exclusiones.** Archivos y carpetas que no se copian. Ya vienen algunos habituales, como `node_modules`.
4. **Programación.** Cada cuánto hace frost copias por su cuenta, o si no las hace.
5. **Frase de recuperación.** 24 palabras que desbloquean tus copias. Apúntalas.
6. **Revisión.** Compruébalo todo y pulsa `[s]` para guardar.

> Tu frase de recuperación es la única forma de leer tus copias de seguridad si pierdes este equipo. Nadie puede recuperarla por ti, ni tu proveedor de almacenamiento ni los autores de frost.

[Configurar frost](#setting-up) explica cada pantalla.

## 3. Haz una copia de seguridad

Comprueba qué subirá la primera copia:

```sh
frost backup --dry-run
```

Y luego ejecútala:

```sh
frost backup
```

La primera copia lo sube todo. Las siguientes solo suben lo que ha cambiado. Si activaste la programación, a partir de ahora frost hace las copias por su cuenta y no tienes que ejecutar nada.

## 4. Comprueba que todo va bien

```sh
frost status
```

`status` muestra la última copia, cuándo será la siguiente, el resultado de la última comprobación y tus instantáneas más recientes.

## Recuperar archivos

Abre el explorador de instantáneas, busca lo que necesitas, selecciónalo con `[space]` y pulsa `[r]`:

```sh
frost browse
```

También puedes restaurar desde la línea de comandos. Esto deja una copia del archivo en una carpeta nueva junto al original:

```sh
frost restore latest ~/Documents/report.pdf --beside
```

[Restaurar archivos](#restoring) explica las dos formas.

## Siguientes pasos

- [Cómo funciona frost](#how-it-works) explica las instantáneas, el cifrado y qué se sube.
- [Copias de seguridad automáticas](#scheduling) trata la programación.
- [Tu frase de recuperación](#recovery-phrase) explica cómo mantener tu clave a salvo.
