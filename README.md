# FutStar

Sitio web de FutStar, plataforma de acompañamiento integral para futbolistas de divisiones formativas en Argentina: psicología deportiva, nutrición y educación financiera con profesionales matriculados.

HTML + CSS + JavaScript sin frameworks ni build: se sube tal cual a Hostinger (o cualquier hosting estático).

## Páginas

| Archivo | Contenido |
|---|---|
| `index.html` | Sitio público para clubes: propuesta, datos de la investigación, módulos, cómo funciona, profesionales, privacidad, precio y pedido de demo |
| `app/jugador.html` | App del jugador. En el celular ocupa toda la pantalla; en la computadora se ve dentro de un marco de celular. Cada pantalla tiene su link: `#bienvenida`, `#privacidad`, `#inicio`, `#psicologia`, `#video`, `#receta`, `#consultar`, `#asistente`, `#ayuda`, `#perfil` |
| `app/club.html` | Panel del club: `#inicio`, `#tendencias`, `#reporte`, `#jugadores`, `#suscripcion`. Arriba a la derecha se cambia a la vista de directivo (solo lectura) |
| `app/equipo.html` | Bandeja del equipo FutStar: consultas anónimas, derivación, agenda editorial, contenidos, especialistas y clubes |
| `docs/` | Proceso de diseño: arquitectura, wireframes y sistema de diseño |

## Dónde editar cada cosa

- **Colores, tipografías y componentes** → `assets/css/futstar.css`
- **Estructura de las pantallas** → `assets/css/maqueta.css`
- **Videos, recetas, especialistas, métricas y consultas de ejemplo** → `assets/js/datos.js`
- **Íconos** → `assets/js/icons.js`
- **Fotos** → guardalas en `assets/img/fotos/` con los nombres de `assets/img/fotos/LEEME.md` y aparecen solas. Si falta una foto, se ve una trama de cancha.

## Publicar en Hostinger

Subí todo el contenido del repositorio a `public_html`. La portada es `index.html`.

El club, los profesionales, las matrículas y las métricas son de ejemplo.
