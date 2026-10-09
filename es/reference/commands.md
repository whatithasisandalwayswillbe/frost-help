# Comandos

frost tiene ocho comandos. `frost -h` los enumera todos, con cada opción.

## Opciones globales

Funcionan con todos los comandos:

| Opción | Qué hace |
| --- | --- |
| `--config-dir <dir>` | Usa otra carpeta de configuración |
| `-h`, `--help` | Muestra la ayuda, con todos los comandos y opciones |
| `-v`, `--version` | Muestra la versión de frost. Ponla antes de cualquier comando |

## frost init

Configura frost: qué respaldar, dónde y cada cuánto. Vuelve a ejecutarlo para revisar o cambiar tus ajustes. Consulta [Configurar frost](#setting-up).

```sh
frost init
```

## frost backup

Hace una copia de seguridad ahora. Consulta [Hacer copias de seguridad](#backing-up).

```sh
frost backup [--dry-run] [--path <dir>] [--exclude <pattern>] [--no-verify]
```

| Opción | Qué hace |
| --- | --- |
| `-n`, `--dry-run` | Muestra lo que se subiría, sin subir nada |
| `--path <dir>` | Respalda esta carpeta en lugar de las habituales. Se puede repetir |
| `--exclude <pattern>` | Excluye también los archivos que coincidan con este patrón. Se puede repetir |
| `--no-verify` | Se salta la comprobación aleatoria después de la copia |

## frost restore

Recupera archivos de una instantánea. Sin nada detrás, abre el explorador de instantáneas. Consulta [Restaurar archivos](#restoring).

```sh
frost restore [snapshot] [paths...] --beside | --to <dir> | --overwrite
```

| Opción | Qué hace |
| --- | --- |
| `--beside` | Restaura en una carpeta nueva junto a los originales |
| `--to <dir>` | Restaura en una carpeta nueva dentro de esta carpeta |
| `--overwrite` | Restaura encima de los originales, sustituyendo lo que haya. Pregunta antes |
| `-y`, `--yes` | No pregunta antes de sobrescribir |

## frost status

Muestra las instantáneas recientes, la programación y el estado de tus copias. Consulta [Comprobar tus copias de seguridad](#checking-backups).

```sh
frost status [--verify] [--all]
```

| Opción | Qué hace |
| --- | --- |
| `--verify` | Hace antes una comprobación nueva |
| `-a`, `--all` | Enumera todas las instantáneas, no solo las 10 últimas |

## frost browse

Abre el explorador de instantáneas. Consulta [El explorador de instantáneas](#snapshot-browser).

```sh
frost browse
```

## frost config

Lee o cambia ajustes sin volver a pasar por el asistente. Consulta [Ajustes](#settings).

```sh
frost config [--show-secrets]
frost config get <key> [--show-secrets]
frost config set <key> <value...>
frost config edit [editor]
```

| Opción | Qué hace |
| --- | --- |
| `--show-secrets` | Muestra las credenciales completas en lugar de ocultarlas |

## frost key

Muestra, comprueba o importa tu frase de recuperación. Consulta [Tu frase de recuperación](#recovery-phrase).

```sh
frost key show
frost key verify
frost key import
```

## frost update

Actualiza frost a la última versión. Consulta [Actualizar frost](#updating).

```sh
frost update [--check]
```

| Opción | Qué hace |
| --- | --- |
| `--check` | Solo dice si hay una versión más reciente |

## Códigos de salida

frost termina con `0` cuando un comando sale bien, y con `1` ante cualquier error. Eso incluye una copia o un `frost status --verify` cuya comprobación encuentra un problema, así que los scripts pueden comprobar el resultado:

```sh
frost status --verify || echo "frost check failed" >&2
```
