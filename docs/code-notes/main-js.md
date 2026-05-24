# js/main.js

## Scopo

Nav, reveal, **animazione titolo hero**, **render team**, video, footer, chat.

## Dipendenze

Caricare prima `js/storage.js`.

## Moduli logici

| Blocco | Doc correlata |
|--------|---------------|
| Header / nav | [header.md](header.md) |
| Hero title build + play | [hero.md](hero.md) |
| `renderTeam()` | [gruppo.md](gruppo.md), [storage.md](storage.md) |
| Video intro | [hero.md](hero.md) — parent `.hero-media` |
| Header overlay | [header.md](header.md) |
| `renderTeam` → `.member-forest` | [gruppo.md](gruppo.md) |
| Chat | [chat.md](chat.md) |

## renderTeam

Ascolta `storage` event per aggiornare la lista se admin salva in altra tab.

## Registro modifiche

| Data | Nota |
|------|------|
| 2026-05-24 | Script iniziale ~160 righe. |
| 2026-05-24 | Titolo animato + team dinamico da SoundchestStore. |
| 2026-05-24 | Header overlay hero; markup team `.member-forest`. |
