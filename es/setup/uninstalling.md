# Desinstalar frost

frost no tiene un comando para desinstalarse, pero quitarlo solo lleva unos pocos pasos.

> Desinstalar frost no borra tus copias de seguridad. Si es posible que algún día quieras recuperarlas, asegúrate de tener tu frase de recuperación antes de borrar la clave de este equipo. `frost key show` te la muestra.

## 1. Quita la tarea programada

```sh
frost config set schedule.enabled false
```

Esto quita la tarea del programador de tu sistema operativo. Si frost dice que la tarea se quitará cuando termine la copia en marcha, espera a que termine antes del siguiente paso. Mientras no termine, `frost status` dice que ya hay una copia o restauración en marcha. En Linux con systemd, también vuelve a desactivar lingering si frost dejó constancia de haberlo activado.

## 2. Borra los archivos de frost

Esto borra la aplicación, su lanzador, tus ajustes, tu clave y la caché de frost. Si cambiaste alguna ubicación, adapta las rutas de abajo para que apunten a los archivos y carpetas propios de frost. `FROST_CONFIG_DIR` y `FROST_CACHE_DIR` indican directamente las carpetas de frost; `XDG_CONFIG_HOME`, `XDG_CACHE_HOME` y `XDG_DATA_HOME` contienen una subcarpeta `frost`. Nunca borres la carpeta raíz de XDG ni una carpeta compartida. [Archivos y carpetas](#files-and-folders) indica todas las ubicaciones.

En macOS:

```sh
rm -rf ~/Library/Application\ Support/frost ~/.config/frost ~/.cache/frost
rm -f /usr/local/bin/frost ~/.local/bin/frost
```

En Linux:

```sh
rm -rf ~/.local/share/frost ~/.config/frost ~/.cache/frost
rm -f /usr/local/bin/frost ~/.local/bin/frost
```

En Windows, en PowerShell:

```powershell
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\frost", "$env:APPDATA\frost"
Remove-Item -Force "$HOME\bin\frost", "$HOME\bin\frost.cmd" -ErrorAction SilentlyContinue
```

El instalador de Windows también añadió `%LocalAppData%\frost\bin` a tu `PATH`. Esto la quita de nuevo:

```powershell
$environment = [Microsoft.Win32.Registry]::CurrentUser.OpenSubKey('Environment', $true)
$path = $environment.GetValue('Path', '', 'DoNotExpandEnvironmentNames') -split ';' | Where-Object { $_ -and [Environment]::ExpandEnvironmentVariables($_).TrimEnd('\') -ne "$env:LOCALAPPDATA\frost\bin" }
$environment.SetValue('Path', ($path -join ';'), 'ExpandString')
```

Si instalaste el lanzador en otro sitio, bórralo de allí. Si instalaste con npm o pnpm, quita también el paquete:

```sh
npm uninstall -g getfrost
pnpm remove -g getfrost
```

## 3. Borra tus copias, si quieres

Tus copias se quedan en tu almacenamiento hasta que las borres. En un servidor propio o un disco local, están en la carpeta que elegiste en el asistente. En un bucket S3, están en una carpeta del bucket, `frost` salvo que hayas elegido otra. Borra esa carpeta para eliminarlas. Sin tu frase de recuperación, nadie puede leer lo que quede en ella.
