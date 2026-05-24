/**
 * Soundchest Admin — gestione team
 * Login: password "soundchest" (vedi initLogin)
 */
(function () {
  "use strict";

  const SESSION_KEY = "soundchest_admin_session";
  const ADMIN_PASSWORD = "soundchest";
  const MAX_PHOTO_BYTES = 900000;

  let teamData = null;
  let draftPhoto = "";
  let adminReady = false;

  function $(id) {
    return document.getElementById(id);
  }

  function isLoggedIn() {
    try {
      return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      return false;
    }
  }

  function setLoggedIn(value) {
    try {
      if (value) sessionStorage.setItem(SESSION_KEY, "1");
      else sessionStorage.removeItem(SESSION_KEY);
    } catch (_) {}
  }

  function toast(msg) {
    const el = $("adminToast");
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      el.hidden = true;
    }, 2600);
  }

  function showLoginView() {
    const loginScreen = $("loginScreen");
    const adminApp = $("adminApp");
    if (loginScreen) loginScreen.style.display = "";
    if (adminApp) adminApp.style.display = "none";
    setLoggedIn(false);
  }

  function showAdminView() {
    const loginScreen = $("loginScreen");
    const adminApp = $("adminApp");
    const loginError = $("loginError");
    if (loginScreen) loginScreen.style.display = "none";
    if (adminApp) adminApp.style.display = "block";
    if (loginError) loginError.style.display = "none";
    setLoggedIn(true);
    initAdminPanel();
  }

  function checkPassword(value) {
    const pass = (value || "").trim();
    if (pass === ADMIN_PASSWORD) return true;
    if (typeof SoundchestStore !== "undefined" && SoundchestStore.verifyPassword) {
      return SoundchestStore.verifyPassword(pass);
    }
    return false;
  }

  function initLogin() {
    const loginForm = $("loginForm");
    const loginBtn = $("loginBtn");
    const adminPass = $("adminPass");
    const loginError = $("loginError");

    function attemptLogin() {
      const pass = adminPass ? adminPass.value : "";
      if (checkPassword(pass)) {
        showAdminView();
        return;
      }
      if (loginError) {
        loginError.style.display = "block";
        loginError.textContent = "Password non corretta. Usa: soundchest";
      }
    }

    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        attemptLogin();
      });
    }

    if (loginBtn) {
      loginBtn.addEventListener("click", function (e) {
        e.preventDefault();
        attemptLogin();
      });
    }

    if (adminPass) {
      adminPass.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          attemptLogin();
        }
      });
    }
  }

  function getInitials(name) {
    return (name || "?")
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s || "";
    return d.innerHTML;
  }

  function getStore() {
    if (typeof SoundchestStore === "undefined") {
      console.warn("storage.js non caricato — dati team non persistenti");
      return null;
    }
    return SoundchestStore;
  }

  function loadUI() {
    const store = getStore();
    if (store) {
      teamData = store.getTeam();
    } else {
      teamData = { sectionLead: "", members: [] };
    }
    const sectionLead = $("sectionLead");
    if (sectionLead) sectionLead.value = teamData.sectionLead || "";
    renderAdminList();
  }

  function renderAdminList() {
    const list = $("adminMembersList");
    if (!list || !teamData) return;

    list.innerHTML = "";
    if (!teamData.members.length) {
      list.innerHTML =
        '<li class="admin-desc">Nessun membro. Clicca «Aggiungi persona».</li>';
      return;
    }

    teamData.members.forEach((m) => {
      const li = document.createElement("li");
      li.className = "admin-member-item";

      let thumb;
      if (m.photo) {
        thumb = document.createElement("img");
        thumb.className = "admin-member-thumb";
        thumb.src = m.photo;
        thumb.alt = m.name;
      } else {
        thumb = document.createElement("div");
        thumb.className = "admin-member-thumb";
        thumb.textContent = getInitials(m.name);
      }

      const info = document.createElement("div");
      info.className = "admin-member-info";
      info.innerHTML =
        "<strong>" +
        escapeHtml(m.name) +
        "</strong><span>" +
        escapeHtml(m.role || "—") +
        "</span>";

      const actions = document.createElement("div");
      actions.className = "admin-member-actions";
      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.className = "admin-btn-sm";
      editBtn.textContent = "Modifica";
      editBtn.addEventListener("click", () => openModal(m.id));

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "admin-btn-sm admin-btn-sm--danger";
      delBtn.textContent = "Elimina";
      delBtn.addEventListener("click", () => deleteMember(m.id));

      actions.appendChild(editBtn);
      actions.appendChild(delBtn);

      li.appendChild(thumb);
      li.appendChild(info);
      li.appendChild(actions);
      list.appendChild(li);
    });
  }

  function setPhotoPreview(src) {
    const photoPreview = $("photoPreview");
    if (!photoPreview) return;
    photoPreview.innerHTML = "";
    if (src) {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Anteprima";
      photoPreview.appendChild(img);
    } else {
      photoPreview.textContent = "Anteprima";
    }
  }

  function openModalDialog() {
    const modal = $("memberModal");
    if (!modal) return;
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
  }

  function closeModalDialog() {
    const modal = $("memberModal");
    if (!modal) return;
    if (typeof modal.close === "function") modal.close();
    else modal.removeAttribute("open");
  }

  function openModal(id) {
    const memberPhoto = $("memberPhoto");
    const memberId = $("memberId");
    const memberName = $("memberName");
    const memberRole = $("memberRole");
    const memberDesc = $("memberDesc");
    const modalTitle = $("modalTitle");

    draftPhoto = "";
    if (memberPhoto) memberPhoto.value = "";

    if (id) {
      const m = teamData.members.find((x) => x.id === id);
      if (!m) return;
      if (modalTitle) modalTitle.textContent = "Modifica membro";
      if (memberId) memberId.value = m.id;
      if (memberName) memberName.value = m.name;
      if (memberRole) memberRole.value = m.role || "";
      if (memberDesc) memberDesc.value = m.description;
      draftPhoto = m.photo || "";
    } else {
      if (modalTitle) modalTitle.textContent = "Nuovo membro";
      if (memberId) memberId.value = "";
      if (memberName) memberName.value = "";
      if (memberRole) memberRole.value = "";
      if (memberDesc) memberDesc.value = "";
      draftPhoto = "";
    }

    setPhotoPreview(draftPhoto);
    openModalDialog();
  }

  function deleteMember(id) {
    if (!confirm("Eliminare questo membro dal team?")) return;
    teamData.members = teamData.members.filter((m) => m.id !== id);
    const store = getStore();
    if (store && !store.saveTeam(teamData)) {
      toast("Errore salvataggio");
      return;
    }
    renderAdminList();
    toast("Membro eliminato");
  }

  function initAdminPanel() {
    if (adminReady) {
      loadUI();
      return;
    }
    adminReady = true;

    loadUI();

    const logoutBtn = $("logoutBtn");
    const addMemberBtn = $("addMemberBtn");
    const leadForm = $("leadForm");
    const passForm = $("passForm");
    const resetPassBtn = $("resetPassBtn");
    const memberForm = $("memberForm");
    const memberPhoto = $("memberPhoto");
    const clearPhotoBtn = $("clearPhotoBtn");
    const modalClose = $("modalClose");
    const cancelMemberBtn = $("cancelMemberBtn");
    const memberModal = $("memberModal");
    const storageWarning = $("storageWarning");

    if (logoutBtn) logoutBtn.addEventListener("click", showLoginView);

    if (addMemberBtn) addMemberBtn.addEventListener("click", () => openModal(null));

    if (modalClose) modalClose.addEventListener("click", closeModalDialog);
    if (cancelMemberBtn) cancelMemberBtn.addEventListener("click", closeModalDialog);

    if (memberModal) {
      memberModal.addEventListener("cancel", (e) => {
        e.preventDefault();
        closeModalDialog();
      });
    }

    if (memberPhoto) {
      memberPhoto.addEventListener("change", () => {
        const file = memberPhoto.files && memberPhoto.files[0];
        if (!file) return;
        if (file.size > MAX_PHOTO_BYTES) {
          alert("Immagine troppo grande (max ~900 KB).");
          memberPhoto.value = "";
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          draftPhoto = reader.result;
          setPhotoPreview(draftPhoto);
        };
        reader.readAsDataURL(file);
      });
    }

    if (clearPhotoBtn) {
      clearPhotoBtn.addEventListener("click", () => {
        draftPhoto = "";
        if (memberPhoto) memberPhoto.value = "";
        setPhotoPreview("");
      });
    }

    if (memberForm) {
      memberForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const store = getStore();
        const memberId = $("memberId");
        const memberName = $("memberName");
        const memberRole = $("memberRole");
        const memberDesc = $("memberDesc");

        const payload = {
          id: (memberId && memberId.value) || (store ? store.uid() : "m" + Date.now()),
          name: memberName ? memberName.value.trim() : "",
          role: memberRole ? memberRole.value.trim() : "",
          description: memberDesc ? memberDesc.value.trim() : "",
          photo: draftPhoto,
        };

        if (!payload.name || !payload.description) return;

        const idx = teamData.members.findIndex((m) => m.id === payload.id);
        if (idx >= 0) teamData.members[idx] = payload;
        else teamData.members.push(payload);

        if (store && !store.saveTeam(teamData)) {
          toast("Salvataggio fallito — foto troppo grande?");
          return;
        }
        closeModalDialog();
        renderAdminList();
        toast("Membro salvato");
      });
    }

    if (leadForm) {
      leadForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const sectionLead = $("sectionLead");
        teamData.sectionLead = sectionLead ? sectionLead.value.trim() : "";
        const store = getStore();
        if (store && !store.saveTeam(teamData)) {
          toast("Errore salvataggio");
          return;
        }
        toast("Testo aggiornato");
      });
    }

    if (passForm) {
      passForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newPass = $("newPass");
        const store = getStore();
        if (store && newPass && store.setAdminPassword(newPass.value)) {
          passForm.reset();
          toast("Password aggiornata");
        }
      });
    }

    if (resetPassBtn) {
      resetPassBtn.addEventListener("click", () => {
        const store = getStore();
        if (store) store.resetAdminPassword();
        toast("Password ripristinata: soundchest");
      });
    }

    try {
      localStorage.setItem("_sc_test", "1");
      localStorage.removeItem("_sc_test");
    } catch {
      if (storageWarning) storageWarning.style.display = "block";
    }
  }

  function boot() {
    initLogin();
    if (isLoggedIn()) showAdminView();
    else showLoginView();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
