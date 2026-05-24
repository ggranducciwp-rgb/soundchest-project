# Setup progetto e workflow documentazione

## Percorso ufficiale

```
/Users/giacomogranducci/Church Projects/soundchest-landing/
```

Il progetto era stato generato inizialmente in una cartella interna Cursor (`~/.cursor/projects/empty-window/soundchest-landing/`) e **copiato** qui per renderlo visibile in VS Code sotto la home utente.

## Domanda ricevuta

**Richiesta utente (2026-05-24):**

1. Non vedeva file/cartella del progetto → spostare in `giacomogranducci/Church Projects`.
2. Ad ogni modifica codice, creare/aggiornare `.md` in `docs/code-notes/` con sezioni strutturate, registro modifiche, controllo obbligatorio prima di lavorare, riferimenti nei commit e sezione «Domanda ricevuta» per richieste nuove.

**Decisioni:**

- Cartella madre: `Church Projects/soundchest-landing/`.
- Indice doc: [README.md](README.md) in questa cartella.
- Un file `.md` per componente (header, hero, about, …) + `index.md` panoramica.
- README root del repo con percorso assoluto per apertura rapida.

## Come aprire in VS Code

1. **File → Open Folder…**
2. Seleziona `Church Projects/soundchest-landing`
3. (Opzionale) Live Server su `index.html`

## Git

Repository git può essere reinizializzato nella cartella Church Projects se `.git` risulta incompleto:

```bash
cd "/Users/giacomogranducci/Church Projects/soundchest-landing"
git init
```

## Checklist assistente (ogni task)

- [ ] Leggere i `.md` in `docs/code-notes/` correlati
- [ ] Implementare modifica codice
- [ ] Aggiornare `.md` + **Registro modifiche**
- [ ] Citare file doc nella risposta e nel messaggio commit

## Domanda ricevuta (2026-05-24)

Ribrandizzare in bianco/nero con accenti giovanili, animare il titolo hero, area admin per team (nome, ruolo, testo, foto).

**Decisioni:** palette in `style.css`; titolo con span per lettera; dati team in `localStorage` via `storage.js`; UI admin in `admin/`.

## Domanda ricevuta (2026-05-24 — mockup)

Allineare grafica al riferimento “Heartland Echoes”: crema, verde bosco, serif, hero video, about split, sezione scura con immagini arrotondate. **Contenuti Soundchest invariati.**

**Decisioni:** font Cormorant Garamond + Inter; `about-photo.jpg` per split e decor; team in `.section-forest`.

## Registro modifiche

| Data | Nota |
|------|------|
| 2026-05-24 | Creazione cartella Church Projects, copia progetto, prima passata `docs/code-notes/`. |
| 2026-05-24 | Admin team + rebrand visivo documentato in style/hero/gruppo/admin.md. |
