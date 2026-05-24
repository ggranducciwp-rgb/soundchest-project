# Widget chat (admin)

## Scopo

Icona chat **fissa in basso a destra** per inviare messaggi al team/admin. In futuro collegata a pannello riservato; oggi salva in `localStorage`.

## Elementi DOM

| ID / classe | Ruolo |
|-------------|--------|
| `#chatFab` | Pulsante floating (`.chat-fab`) |
| `#chatPanel` | Pannello dialog (`.chat-panel`) |
| `#chatBackdrop` | Overlay click-to-close |
| `#chatClose` | Chiudi |
| `#chatMessages` | Area bolle |
| `#chatForm` | Form: `name`, `email`, `message` |

## API JS (interne)

```js
openChat() / closeChat()
appendBubble(text, type)  // type: "bot" | "user"
saveMessage(payload)      // localStorage key: "soundchest_messages"
```

### Payload salvato

```json
{ "name": "...", "email": "...", "message": "...", "at": "ISO-8601" }
```

### Submit form

1. `preventDefault`
2. Bolle utente + `saveMessage`
3. Risposta bot dopo 600ms
4. `// TODO: fetch('/api/messages', ...)` per backend admin

## Accessibilità

- `role="dialog"`, `aria-labelledby="chatTitle"`
- `Escape` chiude il pannello
- FAB: `aria-expanded` true/false

## Stili

- FAB: verde bosco, hover scale + rotate, anello `::before` (`chatRing`), icona `chatIconPop`
- Panel: slide da basso-destra; full width su mobile

## Integrazione admin (roadmap)

1. Endpoint POST messaggi
2. Dashboard admin legge coda messaggi
3. Rimuovere o affiancare `localStorage` solo per demo

## Registro modifiche

| Data | Nota |
|------|------|
| 2026-05-24 | Chat UI + storage locale; backend non implementato. |
| 2026-05-24 | Animazione hover FAB potenziata. |
