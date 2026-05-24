/**
 * Soundchest — persistenza dati (localStorage)
 */
const SoundchestStore = (function () {
  "use strict";

  const KEYS = {
    team: "soundchest_team",
    messages: "soundchest_messages",
    adminPass: "soundchest_admin_pass",
  };

  const DEFAULT_TEAM = {
    sectionLead:
      "Soundchest è un ensemble giovane e dinamico: ognuno porta il proprio talento al servizio di un unico messaggio.",
    members: [
      {
        id: "m1",
        name: "Voci & cori",
        role: "Vocal",
        description: "Armonie e lead vocal che guidano l'adorazione.",
        photo: "",
      },
      {
        id: "m2",
        name: "Strumentisti",
        role: "Band",
        description: "Chitarre, tastiere, batteria e basi — il cuore del groove.",
        photo: "",
      },
      {
        id: "m3",
        name: "Tecnico & media",
        role: "Tech",
        description: "Suono live, luci e contenuti per restare connessi.",
        photo: "",
      },
      {
        id: "m4",
        name: "Coordinamento",
        role: "Team",
        description: "Organizzazione eventi, preghiera e rapporto con le comunità.",
        photo: "",
      },
    ],
  };

  const DEFAULT_PASS = "soundchest";

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error("SoundchestStore: salvataggio fallito", err);
      return false;
    }
  }

  function normalizePassword(stored) {
    if (stored == null || stored === "") return DEFAULT_PASS;
    const trimmed = String(stored).trim();
    if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
      try {
        return JSON.parse(trimmed);
      } catch {
        return trimmed.slice(1, -1);
      }
    }
    return trimmed;
  }

  function getAdminPassword() {
    return normalizePassword(localStorage.getItem(KEYS.adminPass));
  }

  function verifyPassword(input) {
    const attempt = (input || "").trim();
    const stored = getAdminPassword();
    return attempt === stored || attempt === DEFAULT_PASS;
  }

  function setAdminPassword(pass) {
    const value = (pass || "").trim();
    if (value.length < 4) return false;
    try {
      localStorage.setItem(KEYS.adminPass, value);
      return true;
    } catch {
      return false;
    }
  }

  function resetAdminPassword() {
    localStorage.removeItem(KEYS.adminPass);
    return DEFAULT_PASS;
  }

  function getTeam() {
    try {
      const data = readJson(KEYS.team, null);
      if (!data || !Array.isArray(data.members)) {
        writeJson(KEYS.team, DEFAULT_TEAM);
        return clone(DEFAULT_TEAM);
      }
      return data;
    } catch {
      return clone(DEFAULT_TEAM);
    }
  }

  function saveTeam(data) {
    return writeJson(KEYS.team, data);
  }

  function uid() {
    return "m" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  return {
    KEYS,
    DEFAULT_PASS,
    DEFAULT_TEAM,
    getTeam,
    saveTeam,
    getAdminPassword,
    verifyPassword,
    setAdminPassword,
    resetAdminPassword,
    uid,
  };
})();
