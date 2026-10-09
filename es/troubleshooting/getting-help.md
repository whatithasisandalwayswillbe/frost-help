# Obtener ayuda

Si tu problema no aparece en esta documentación, así puedes averiguar más y pedir ayuda.

## Antes de nada

- `frost status` muestra el resultado de la última copia, el estado de tus copias y cualquier problema para llegar a tu almacenamiento.
- `frost -h` enumera todos los comandos y opciones.
- El registro de las copias programadas muestra lo que pasó durante las copias automáticas. Consulta [Copias de seguridad automáticas](#scheduling).
- [Problemas frecuentes](#common-problems) reúne los mensajes más habituales.

## Pregunta en GitHub

Abre una incidencia en [github.com/whatithasisandalwayswillbe/frost/issues](https://github.com/whatithasisandalwayswillbe/frost/issues) e incluye:

- Tu versión de frost, de `frost --version`, y tu sistema operativo.
- Qué ejecutaste y qué esperabas que pasara.
- Qué pasó en realidad, con el mensaje exacto.
- Las líneas relacionadas de `frost status` o del registro.

> Nunca publiques tu frase de recuperación, tu archivo de clave, tus claves de acceso ni un `config.toml` con credenciales. `frost config` oculta las credenciales salvo que añadas `--show-secrets`. Revisa todo lo que pegues antes de publicarlo.

## Problemas de seguridad

No informes de problemas de seguridad en una incidencia pública. Consulta [Seguridad y privacidad](#security) para informar en privado.
