# Actualizar frost

frost se actualiza solo. De forma predeterminada, instala las versiones nuevas después de las copias programadas.

## Actualizar ahora

```sh
frost update
```

frost busca la última versión, comprueba su firma y su suma de comprobación, y se asegura de que la versión nueva arranca antes de cambiar a ella. Tus ajustes, tu clave y tus copias no se tocan.

Para comprobar solo si hay una versión más reciente:

```sh
frost update --check
```

`frost update` nunca instala una versión preliminar, ni una más antigua que la que tienes.

## Actualizaciones automáticas

Después de una copia programada, frost busca una versión nueva como mucho una vez al día y la instala igual que `frost update`. Si la búsqueda o la instalación fallan, la copia no falla por ello.

`frost status` muestra cómo están configuradas las actualizaciones y si la última funcionó. La pantalla de ajustes del explorador de instantáneas también lo muestra.

Para enterarte de las versiones nuevas sin que se instalen solas:

```sh
frost config set update.auto false
```

Desde ese momento, `frost status` te avisa cuando sale una versión, y no se instala nada hasta que ejecutes `frost update`.

> Las actualizaciones automáticas solo se ejecutan después de las copias programadas. Con las copias automáticas desactivadas, frost no busca actualizaciones en segundo plano.

## Cuándo frost no puede actualizarse

| Cuándo | Qué hacer en su lugar |
| --- | --- |
| Un gestor de paquetes instaló frost (Homebrew, Nix, Snap, Scoop o un paquete del sistema) | Actualízalo con ese gestor de paquetes |
| No puedes escribir en la carpeta de la aplicación de frost | Reinstálalo con el instalador, con tu propio usuario |
| frost se compiló desde el código fuente | Vuelve a compilarlo, o instala una versión con el instalador |

Si una actualización se queda a medias, vuelve a ejecutar el instalador. Repara la instalación.
