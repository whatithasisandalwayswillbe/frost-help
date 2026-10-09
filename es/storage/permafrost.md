# Permafrost

Permafrost es un almacenamiento alojado hecho para frost. Para conectarte basta con una clave de acceso, sin bucket, región ni endpoint que configurar.

Tus copias se cifran en tu equipo antes de subirse, igual que con cualquier otro almacenamiento. Permafrost no puede leerlas.

## Conseguir una clave

1. Ejecuta `frost init` y elige **Permafrost**.
2. Elige **I don't have a key yet** (todavía no tengo clave). frost abre una página en tu navegador donde puedes conseguir una.
3. Cuando tengas tu clave, la página se la devuelve a frost, que la guarda al momento. Aunque salgas del asistente después, no la pierdes.

Si el navegador no se abre, ve tú a [getfro.st/perma](https://getfro.st/perma) y pulsa `[p]` en el asistente para pegar la clave que te den. Si no se completa la obtención de la clave, pulsa `[r]` para volver a intentarlo o `[p]` para pegar una. frost espera hasta 25 minutos.

Si ya tienes una clave, elige **I have a key** (tengo una clave) y pégala.

## Cómo llega la clave a frost

Mientras espera, frost escucha en `127.0.0.1`, una dirección a la que solo llega tu propio equipo. Le da a la página un valor aleatorio y solo acepta una clave que vuelva con ese mismo valor, así que ninguna otra página puede colarle a frost una clave suya.

La página también te muestra la clave, para que puedas copiarla tú en frost, por ejemplo cuando el navegador está en otro equipo.

## Claves rechazadas

Si Permafrost deja de aceptar tu clave de acceso, los comandos que acceden a tus copias se detienen con un error que lo explica. Ejecuta `frost init` y vuelve a configurar el almacenamiento para conseguir una que funcione.

| El asistente dice | Qué hacer |
| --- | --- |
| Permafrost didn't accept that access key | Comprueba que la copiaste entera. También puede que haya caducado |
| That access key can't store backups | Revisa sus permisos en tu cuenta de Permafrost |
| your Permafrost storage is full | Tu cuenta no tiene espacio libre. Revisa tu cuenta de Permafrost |

## Tu propio servidor

Cualquiera puede montar un servidor que hable la [API de Permafrost](https://github.com/whatithasisandalwayswillbe/frost/blob/main/docs/PERMAFROST.md).

Antes de ejecutar el asistente por primera vez, crea `config.toml` en la carpeta de configuración de frost, indicada en [Archivos y carpetas](#files-and-folders), con estos ajustes. Sustituye la dirección por la de tu servidor:

```toml
[storage]
backend = "permafrost"

[storage.permafrost]
url = "https://<your-server>"
```

Después ejecuta `frost init`, elige Permafrost, pega tu clave de acceso, elige tus carpetas y guarda. El asistente crea el repositorio si el servidor está vacío.

Si frost ya está configurado, usa `frost config edit` para cambiar a la vez el backend y la dirección del servidor en el archivo existente. Acepta el aviso si el nuevo servidor está vacío, escribe `yes` para guardar y vuelve a ejecutar `frost init`. `frost config set` rechaza un destino vacío, así que no puede preparar un servidor nuevo.

La dirección tiene que usar `https://`, salvo para un servidor en tu propio equipo, como `http://localhost:8080`. Deja el ajuste vacío para usar el servidor de Permafrost predeterminado.
