/**
 * Soundchest Landing — main script
 */
(function () {
  "use strict";

  const STORAGE_KEY = "soundchest_messages";

  // ——— Header scroll ———
  const header = document.getElementById("header");
  const hero = document.getElementById("intro");
  const onScroll = () => {
    const scrollY = window.scrollY;
    const pastHero = hero && scrollY > hero.offsetHeight * 0.12;
    const atHeroTop = scrollY < 24;

    if (atHeroTop) {
      header.classList.add("header--overlay");
      header.classList.remove("header--glass", "scrolled");
    } else {
      header.classList.add("header--glass");
      header.classList.remove("header--overlay");
      header.classList.toggle("scrolled", pastHero);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ——— Mobile nav ———
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.classList.toggle("active", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // ——— Hero title letter animation ———
  const heroTitle = document.getElementById("heroTitle");
  if (heroTitle && !heroTitle.dataset.built) {
    const text = heroTitle.textContent.trim();
    heroTitle.textContent = "";
    heroTitle.setAttribute("aria-label", text);
    [...text].forEach((ch, i) => {
      const span = document.createElement("span");
      span.className = "hero-title-char";
      span.style.setProperty("--i", String(i));
      span.textContent = ch === " " ? "\u00a0" : ch;
      heroTitle.appendChild(span);
    });
    heroTitle.dataset.built = "1";
    requestAnimationFrame(() => heroTitle.classList.add("hero-title--play"));
  }

  // ——— Reveal on scroll ———
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  document.querySelectorAll(".hero .reveal:not(.hero-title-wrap)").forEach((el) => {
    setTimeout(() => el.classList.add("visible"), 400);
  });

  // ——— Team (da admin / localStorage) ———
  const membersList = document.getElementById("membersList");
  const teamLead = document.getElementById("teamLead");

  function getInitials(name) {
    return (name || "?")
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  function renderTeam() {
    if (!membersList || typeof SoundchestStore === "undefined") return;

    const { sectionLead, members } = SoundchestStore.getTeam();

    if (teamLead) teamLead.textContent = sectionLead;

    membersList.innerHTML = "";

    if (!members.length) {
      membersList.innerHTML =
        '<li class="members-empty">Nessun membro ancora. Aggiungili dall\'<a href="admin/">area admin</a>.</li>';
      return;
    }

    members.forEach((m) => {
      const li = document.createElement("li");
      li.className = "member-forest";

      const photo = document.createElement("div");
      photo.className = "member-forest-photo";

      if (m.photo) {
        const img = document.createElement("img");
        img.src = m.photo;
        img.alt = m.name || "Membro del team";
        img.loading = "lazy";
        photo.appendChild(img);
      } else {
        photo.textContent = getInitials(m.name);
      }

      const name = document.createElement("h3");
      name.className = "member-forest-name";
      name.textContent = m.name || "";

      li.appendChild(photo);
      li.appendChild(name);

      if (m.role) {
        const role = document.createElement("p");
        role.className = "member-forest-role";
        role.textContent = m.role;
        li.appendChild(role);
      }

      const desc = document.createElement("p");
      desc.className = "member-forest-desc";
      desc.textContent = m.description || "";
      li.appendChild(desc);

      membersList.appendChild(li);
    });
  }

  function escapeHtml(str) {
    const d = document.createElement("div");
    d.textContent = str || "";
    return d.innerHTML;
  }

  renderTeam();
  window.addEventListener("storage", (e) => {
    if (e.key === SoundchestStore.KEYS.team) renderTeam();
  });

  // ——— Video intro ———
  const video = document.getElementById("introVideo");
  const videoWrap = video?.closest(".hero-media");

  function hidePlaceholder() {
    if (videoWrap) videoWrap.classList.add("video-ready");
  }

  if (video) {
    video.addEventListener("loadeddata", hidePlaceholder);
    video.addEventListener("canplay", hidePlaceholder);
    video.addEventListener("error", () => {});
    if (video.readyState >= 2) hidePlaceholder();
  }

  // ——— Anno footer ———
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ——— Chat widget ———
  const chatFab = document.getElementById("chatFab");
  const chatPanel = document.getElementById("chatPanel");
  const chatBackdrop = document.getElementById("chatBackdrop");
  const chatClose = document.getElementById("chatClose");
  const chatForm = document.getElementById("chatForm");
  const chatMessages = document.getElementById("chatMessages");

  function openChat() {
    chatPanel.classList.add("open");
    chatBackdrop.classList.add("open");
    chatPanel.setAttribute("aria-hidden", "false");
    chatBackdrop.setAttribute("aria-hidden", "false");
    chatFab.setAttribute("aria-expanded", "true");
    chatForm.querySelector("input[name='name']")?.focus();
  }

  function closeChat() {
    chatPanel.classList.remove("open");
    chatBackdrop.classList.remove("open");
    chatPanel.setAttribute("aria-hidden", "true");
    chatBackdrop.setAttribute("aria-hidden", "true");
    chatFab.setAttribute("aria-expanded", "false");
  }

  chatFab.addEventListener("click", () => {
    chatPanel.classList.contains("open") ? closeChat() : openChat();
  });
  chatClose.addEventListener("click", closeChat);
  chatBackdrop.addEventListener("click", closeChat);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && chatPanel.classList.contains("open")) closeChat();
  });

  function appendBubble(text, type) {
    const div = document.createElement("div");
    div.className = `chat-bubble chat-bubble--${type}`;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function saveMessage(payload) {
    try {
      const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      list.push({ ...payload, at: new Date().toISOString() });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (_) {}
  }

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(chatForm);
    const name = fd.get("name")?.toString().trim() || "";
    const email = fd.get("email")?.toString().trim() || "";
    const message = fd.get("message")?.toString().trim() || "";

    if (!name || !email || !message) return;

    appendBubble(message, "user");
    saveMessage({ name, email, message });

    setTimeout(() => {
      appendBubble(
        `Grazie ${name}! Il messaggio è stato registrato. Ti risponderemo presto.`,
        "bot"
      );
    }, 600);

    chatForm.reset();
  });
})();
