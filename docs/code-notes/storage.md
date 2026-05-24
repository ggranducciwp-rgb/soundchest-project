# js/storage.js — SoundchestStore

## Scopo

Modulo condiviso tra landing e admin per leggere/scrivere dati in `localStorage`.

## API

```js
SoundchestStore.getTeam()
SoundchestStore.saveTeam(data)   // boolean
SoundchestStore.verifyPassword(input)
SoundchestStore.getAdminPassword()
SoundchestStore.setAdminPassword(pass)
SoundchestStore.resetAdminPassword()
SoundchestStore.uid()
```

## Default

Alla prima visita, `getTeam()` inizializza quattro membri placeholder (ex ruoli generici).

## Registro modifiche

| Data | Nota |
|------|------|
| 2026-05-24 | Modulo estratto per admin + render team su index. |
| 2026-05-24 | verifyPassword, readJson sicuro, reset password. |
