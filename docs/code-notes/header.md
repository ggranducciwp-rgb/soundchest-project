# Header e navigazione

## Scopo

Nav minimal: brand “Soundchest” a sinistra, link uppercase a destra.

## Hover link

`.nav a::after` — sottolineatura `scaleX(0→1)` da sinistra a destra.

## Stati navbar (`main.js`)

| Condizione | Classi |
|------------|--------|
| `scrollY < 24` (top hero) | `.header--overlay` — trasparente, testo crema |
| Scroll ma ancora in hero | `.header--glass` — vetro scuro + blur |
| Oltre hero | `.header--glass.scrolled` — vetro crema semitrasparente |

## Classi CSS

- `.header--overlay` — nessuno sfondo crema
- `.header--glass` — `backdrop-filter: blur(18px)`, sfondo rgba semitrasparente

## Registro modifiche

| Data | Nota |
|------|------|
| 2026-05-24 | Logo + hamburger. |
| 2026-05-24 | Brand testuale; overlay/scrolled legati al hero. |
| 2026-05-24 | Animazione sottolineatura nav. |
| 2026-05-24 | Navbar vetro al scroll; top hero invariato. |
