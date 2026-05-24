# css/style.css

## Scopo

Stile **editoriale / indie-folk**: crema, verde bosco, serif per i titoli, sans per il corpo. Layout split About + sezione forest per il team.

## Design tokens (`:root`)

| Variabile | Valore / uso |
|-----------|----------------|
| `--cream` | `#f3ede4` — sfondo Chi siamo, Contatti |
| `--forest` | `#1c3329` — sezione Il gruppo, CTA, chat FAB |
| `--ink` / `--ink-muted` | Testo su crema |
| `--cream-on-forest` | Testo su verde |
| `--font-serif` | Cormorant Garamond |
| `--font-sans` | Inter |
| `--radius-float` | 24px — immagini decorative |

## Pattern principali

- **Hero**: video full-screen, overlay verde soft, titolo serif centrato (animazione lettere)
- **About**: `.about-split-inner` 50/50 testo + `assets/about-photo.jpg`
- **Gruppo**: `.section-forest` + `.forest-float` (3 img arrotondate) + `.members-forest`
- **Header**: `.header--overlay` su hero (testo crema), `.scrolled` su crema (testo scuro)
- **Reveal**: `.reveal` → `.visible`
- **Animazioni extra**: pillars stagger, `imgReveal` about, `floatDrift` decor forest, membri `fadeUp`, FAB `fabEnter`

## Registro modifiche

| Data | Nota |
|------|------|
| 2026-05-24 | Tema scuro purple/pink. |
| 2026-05-24 | B/N + accenti lime. |
| 2026-05-24 | Rebrand crema/verde bosco stile riferimento Heartland; Cormorant + Inter. |
| 2026-05-24 | Nav underline animata; animazioni leggere senza cambio contenuti. |
