# Footer

## Scopo

Copyright dinamico con anno corrente.

## Markup

```html
<footer class="footer">
  <p>© <span id="year"></span> Soundchest — Tutti i diritti riservati</p>
</footer>
```

## JS

In `main.js`:

```js
document.getElementById("year").textContent = new Date().getFullYear();
```

## Stili

- Bordo superiore sottile, testo `--text-muted`, padding 2rem

## Registro modifiche

| Data | Nota |
|------|------|
| 2026-05-24 | Anno via JS al load. |
