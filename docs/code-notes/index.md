# index.html — Panoramica

## Scopo

Pagina singola (SPA statica) per **Soundchest**, gruppo musicale cristiano: video intro, presentazione, composizione del team, contatti e widget chat verso l’admin (futuro pannello riservato).

## Struttura file

```
soundchest-landing/
├── index.html      ← questa pagina
├── css/style.css
├── js/main.js
├── assets/         ← intro.mp4, video-poster.jpg
└── docs/code-notes/
```

## Sezioni nel DOM

| `id` | File doc |
|------|----------|
| `#intro` | [hero.md](hero.md) |
| `#chi-siamo` | [about.md](about.md) |
| `#gruppo` | [gruppo.md](gruppo.md) |
| `#contatti` | [contact.md](contact.md) |
| Header | [header.md](header.md) |
| Chat / FAB | [chat.md](chat.md) |
| Footer | [footer.md](footer.md) |

## Dipendenze esterne

- Google Fonts: **Outfit**, **Space Grotesk** (link in `<head>`).
- Nessun framework JS/CSS.

## Script e stili

- `css/style.css` — vedi [style.md](style.md)
- `js/main.js` — vedi [main-js.md](main-js.md)

## Admin

- Team: [admin.md](admin.md) → `admin/index.html`
- Chat: ancora `localStorage` (backend futuro)

## Script

- `js/storage.js` — vedi [storage.md](storage.md)

## Registro modifiche

| Data | Nota |
|------|------|
| 2026-05-24 | Creazione iniziale landing + struttura doc in `docs/code-notes/`. |
| 2026-05-24 | Palette B/N, titolo animato, admin team. |
| 2026-05-24 | Grafica crema/verde bosco (layout split + forest). |
