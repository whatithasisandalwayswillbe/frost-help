# Permafrost

Permafrost es un almacenamiento alojado hecho para frost. Para conectarte basta con una clave de acceso, sin bucket, región ni endpoint que configurar.

Tus copias se cifran en tu equipo antes de subirse, igual que con cualquier otro almacenamiento. Permafrost no puede leerlas.

## Conseguir una clave

1. Ejecuta `frost init` y elige **Permafrost**.
2. Elige **I don't have a key yet** (todavía no tengo clave). frost abre [getfro.st/perma](https://getfro.st/perma) en tu navegador. Si no se abre, entra tú.
3. Consigue ahí tu clave y cópiala.
4. Pégala en el asistente.

Si ya tienes una clave, elige **I have a key** (tengo una clave) y pégala.

## Conseguir una clave nueva

Si pierdes tu clave, ve a [getfro.st/perma/recover](https://getfro.st/perma/recover) e introduce la dirección de correo con la que la conseguiste. El correo que recibes te lleva a una clave nueva. La nueva sustituye a la anterior, que deja de funcionar en todos tus equipos.

En cada equipo que use Permafrost, cambia a la clave nueva:

```sh
frost config set storage.permafrost.token <new key>
```

Mientras Permafrost no acepte subidas, `frost config set` no puede hacer su comprobación del almacenamiento. Usa `frost config edit` en su lugar y pon la clave en `token`, bajo `[storage.permafrost]`.

## Espacio usado

`frost status` muestra cuánto de tu almacenamiento de Permafrost usas. Cuando Permafrost tiene algo que contarte, como que el almacenamiento está casi lleno, `frost status` y `frost backup` lo muestran como aviso. Consulta [Comprobar tus copias de seguridad](#checking-backups).

## Cuando Permafrost rechaza algo

Los errores de Permafrost dicen el motivo. Los comandos que acceden a tus copias se detienen con ese mensaje.

| Ves | Qué significa |
| --- | --- |
| the Permafrost access key was rejected | La clave es incorrecta, otra más nueva la sustituyó o la cuenta se cerró. El mensaje dice cuál de estas. Usa tu clave más reciente o consigue una nueva |
| uploads are paused | Permafrost no acepta copias nuevas por ahora. Restaurar sigue funcionando. El mensaje dice por qué, hasta cuándo y qué hacer |
| your Permafrost storage is full | La subida no cabe. El mensaje dice cuánto guardas y qué hacer |

Durante la configuración, los dos primeros aparecen como "Permafrost didn't accept that access key" y "Permafrost won't store backups with that access key", seguidos del mismo motivo.

## Tu propio servidor

Cualquiera puede montar un servidor que hable la [API de Permafrost](https://github.com/whatithasisandalwayswillbe/frost/blob/main/docs/PERMAFROST.md). Un servidor compatible debe seguir sus reglas sobre objetos y errores, incluido el rechazo de subidas vacías. frost lo intenta de nuevo automáticamente cuando un servidor está ocupado.

Antes de ejecutar el asistente por primera vez, crea `config.toml` en la carpeta de configuración de frost, indicada en [Archivos y carpetas](#files-and-folders), con estos ajustes. Sustituye la dirección por la de tu servidor:

```toml
[storage]
backend = "permafrost"

[storage.permafrost]
url = "https://<your-server>"
```

Después ejecuta `frost init`, elige Permafrost, pega tu clave de acceso, elige tus carpetas y guarda. El asistente crea el repositorio si el servidor está vacío.

Si frost ya está configurado, usa `frost config edit` para cambiar a la vez el backend y la dirección del servidor en el archivo existente. Acepta el aviso si el nuevo servidor está vacío, escribe `yes` para guardar y vuelve a ejecutar `frost init`. `frost config set` rechaza un destino vacío, así que no puede preparar un servidor nuevo.

La dirección tiene que usar `https://`, salvo para un servidor en tu propio equipo, como `http://localhost:8080`. Deja el ajuste vacío para usar el servidor de Permafrost predeterminado, `https://permafrost.wihiaawb.com`.
