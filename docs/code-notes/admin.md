# Area admin (`admin/`)

## Accesso

- URL: `admin/index.html` (meglio con **Live Server**)
- Password: **`soundchest`** (hardcoded in `admin.js` → `ADMIN_PASSWORD`)
- Pulsante **Entra** `type="button"` `#loginBtn` + submit form (doppio canale)
- Sessione: `sessionStorage` → `soundchest_admin_session`

## Architettura login (2026-05-24)

Login separato dal pannello:

1. `initLogin()` al `DOMContentLoaded`
2. `showAdminView()` / `showLoginView()` usano `style.display` (non solo `hidden`)
3. `initAdminPanel()` solo dopo login (eventi CRUD team)

## Team + foto

Invariato: modale con upload Base64, `SoundchestStore.saveTeam`.

## Registro modifiche

| Data | Nota |
|------|------|
| 2026-05-24 | Creazione admin. |
| 2026-05-24 | Fix storage/login. |
| 2026-05-24 | Login riscritto: DOMContentLoaded, password fissa, `#loginBtn`. |
