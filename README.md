# FutStar

Maqueta navegable de FutStar, plataforma de acompañamiento integral para futbolistas de divisiones formativas en Argentina. Es un proyecto de tesis universitaria y demo comercial: no es una plataforma funcional.

Sitio estático (HTML, CSS y JS), sin paso de build. Se abre `index.html` en el navegador o se sube tal cual a cualquier hosting estático.

## Etapas

1. **Arquitectura y estrategia**: `docs/etapa-1-arquitectura.html`
2. **Wireframes**: `docs/etapa-2-wireframes.html`
3. **Sistema de diseño**: `docs/etapa-3-sistema.html`. Los tokens y componentes reutilizables están en `assets/css/futstar.css` y los íconos en `assets/js/icons.js`.
4. **Maqueta final**: `docs/etapa-4-presentacion.html` (mapa de pantallas, recorridos, guion de 12 minutos y estructura para Figma)

## Maqueta navegable

La portada es `index.html`. Desde ahí se abren los cuatro recorridos:

| Archivo | Pantallas |
|---|---|
| `maqueta/jugador.html` | 1 a 10: app del jugador (mobile). Cada pantalla tiene su link: `#bienvenida`, `#privacidad`, `#inicio`, `#psicologia`, `#video`, `#receta`, `#consultar`, `#asistente`, `#ayuda`, `#perfil` |
| `maqueta/club.html` | 11 a 15: panel del club (desktop): `#inicio`, `#tendencias`, `#reporte`, `#jugadores`, `#suscripcion`. Arriba a la derecha se cambia a la vista de directivo |
| `maqueta/landing.html` | A: landing pública para clubes |
| `maqueta/admin.html` | B: bandeja del equipo FutStar |

- Estilos: `assets/css/futstar.css` (sistema de diseño) y `assets/css/maqueta.css` (pantallas).
- Datos de ejemplo: `assets/js/datos.js` (videos, especialistas, recetas, métricas y consultas).
- Fotos: se suman en `assets/img/fotos/` con los nombres de `assets/img/fotos/LEEME.md`.

## Publicar en Hostinger

Subí todo el contenido del repositorio a `public_html`. No hace falta compilar nada.

Los datos de la demo (club, especialistas, matrículas y métricas) son ficticios.
