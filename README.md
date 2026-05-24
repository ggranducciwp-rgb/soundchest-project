# Soundchest — Landing page

Landing page statica per il gruppo musicale cristiano **Soundchest**.

## Percorso progetto

```
/Users/giacomogranducci/Church Projects/soundchest-landing/
```

Apri questa cartella in VS Code: **File → Open Folder…**

## Avvio rapido

1. Apri `index.html` con [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), oppure apri il file nel browser.
2. Aggiungi il video in `assets/intro.mp4` (opzionale: `assets/video-poster.jpg`).

## Documentazione codice

Note tecniche per componente: [`docs/code-notes/`](docs/code-notes/README.md)

## Admin team

Apri `admin/index.html` — password default: `soundchest`

Gestisci membri (nome, ruolo, testo, foto) e il testo della sezione «Il gruppo».

## Struttura

| Percorso | Ruolo |
|----------|--------|
| `index.html` | Pagina unica (tutte le sezioni) |
| `admin/index.html` | Pannello gestione team |
| `css/style.css` | Stili globali e componenti |
| `css/admin.css` | Stili area admin |
| `js/storage.js` | Dati condivisi (team) |
| `js/main.js` | Nav, animazioni, video, chat, render team |
| `js/admin.js` | CRUD team |
| `assets/` | Media statici |
| `docs/code-notes/` | Documentazione sviluppo |
