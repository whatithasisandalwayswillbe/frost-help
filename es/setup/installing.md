# Instalar frost

frost se instala con un solo comando en macOS, Linux y Windows. Cada versión incluye su propio entorno de ejecución, así que no hace falta instalar nada antes.

## Sistemas compatibles

| Sistema | Procesadores |
| --- | --- |
| macOS | Apple silicon (`arm64`) e Intel (`amd64`) |
| Linux | `amd64` y `arm64` |
| Windows | `amd64` y `arm64` |

No hay paquete para ARM de 32 bits, como los sistemas Raspberry Pi más antiguos. En Windows, WSL instala el paquete de Linux.

## El instalador

En macOS o Linux, ejecuta esto en una terminal. En Windows, ejecútalo en Git Bash.

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | sh
```

El instalador:

1. Descarga la última versión para tu sistema.
2. Comprueba la firma de la versión y la suma de comprobación de la descarga, y se detiene si alguna no cuadra.
3. Instala frost en tu perfil de usuario y deja un lanzador `frost` en una carpeta de tu `PATH`.

Necesita `curl` o `wget`, `ssh-keygen` de OpenSSH 8.1 o posterior, y `sha256sum` o `shasum` para las comprobaciones. Para extraer los archivos usa `tar` en macOS y Linux, y `unzip` o PowerShell en Windows. Git Bash incluye `cygpath`, que el instalador de Windows también necesita.

El lanzador va a `/usr/local/bin` si tienes permiso de escritura ahí, y a `~/.local/bin` si no. En Windows va a `~/bin`. Si esa carpeta todavía no está en tu `PATH`, el instalador muestra la línea que la añade.

Cuando termine, ejecuta `frost init` para configurar tu primera copia de seguridad. Consulta [Configurar frost](#setting-up).

## Opciones del instalador

| Variable | Qué hace |
| --- | --- |
| `FROST_INSTALL_DIR` | Pone el lanzador en esta carpeta |
| `FROST_VERSION` | Instala esta versión, como `v0.1.0`, en lugar de la última |

Por ejemplo:

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | FROST_INSTALL_DIR="$HOME/bin" sh
```

Cambiar la carpeta del lanzador no mueve frost en sí. [Archivos y carpetas](#files-and-folders) indica dónde va cada cosa.

## Instalar a mano

1. Descarga el archivo comprimido para tu sistema desde la [última versión](https://github.com/whatithasisandalwayswillbe/frost/releases/latest). Los nombres son del tipo `frost_0.1.0_linux_amd64.tar.gz`, con `.zip` en Windows.
2. Verifica la descarga antes de ejecutar nada de su contenido, como se explica en «Verificar una descarga», más abajo.
3. Extráelo en una carpeta nueva y vacía.
4. Dentro de la carpeta extraída, ejecuta el instalador incluido y dale la carpeta donde quieres el lanzador.

En macOS o Linux:

```sh
./runtime/bin/node install.mjs "$PWD" "$HOME/.local/bin"
```

En Windows, en PowerShell:

```powershell
.\runtime\bin\node.exe .\install.mjs "$PWD" "$env:LOCALAPPDATA\frost\bin"
```

Después, añade la carpeta del lanzador a tu `PATH` si todavía no está. En Windows, `frost.cmd` funciona en el Símbolo del sistema y en PowerShell, y `frost` funciona en Git Bash.

Para usar un paquete extraído sin instalarlo, ejecuta directamente su lanzador `frost` (`frost.cmd` en Windows) y deja todos sus archivos juntos.

## Verificar una descarga

El instalador lo hace por ti. Para comprobar un archivo comprimido tú mismo, descárgalo junto con `checksums.txt` y `checksums.txt.sig` de la misma versión, y [`release-signing.pub`](https://github.com/whatithasisandalwayswillbe/frost/blob/main/install/release-signing.pub) del repositorio. Pon en `archive` el nombre del archivo comprimido y ejecuta:

```sh
(
  set -e
  archive='frost_X.Y.Z_linux_amd64.tar.gz'
  printf 'frost-release %s\n' "$(cat release-signing.pub)" > allowed_signers
  ssh-keygen -Y verify -f allowed_signers -I frost-release -n file -s checksums.txt.sig < checksums.txt
  selected_checksum=$(awk -v archive="$archive" '$2 == archive { line = $0; count++ } END { if (count != 1) exit 1; print line }' checksums.txt)
  printf '%s\n' "$selected_checksum" | shasum -a 256 -c -
)
```

Los comandos se detienen si la firma es incorrecta o si la lista firmada no contiene exactamente una entrada para tu archivo. La primera comprobación debería mostrar `Good "file" signature`, y la segunda, `OK` detrás del nombre de tu archivo. Si alguna no lo hace, no lo instales.
