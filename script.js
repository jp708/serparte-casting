/* deleFOCO · Soy talento — script */
document.body.classList.remove("theme-light");
document.body.classList.add("mode-b2c", "theme-dark");

const state = { lang: "es", statusKey: null };

const copy = {
  es: { pageTitle: "Soy Talento: Creá tu perfil | deleFOCO Casting", pageDesc: "Creá tu perfil de talento en deleFOCO: actuación, modelaje, danza, música y presentación. Postulate a castings activos en Costa Rica y Centroamérica.", toTop: "Volver arriba", themeDark: "Oscuro", themeLight: "Claro",
    errors: "Completá los campos obligatorios antes de enviar.",
    ok: "Listo. Se abrió WhatsApp con tu mensaje: envialo para completar tu perfil.",
    blocked: "Tu navegador bloqueó WhatsApp. Permití las ventanas emergentes e intentá de nuevo.",
    sent: "¡Listo! Recibimos tu perfil. Lo revisamos y te escribimos pronto.",
    fail: "No pudimos enviar tu perfil. Probá de nuevo o escribinos por WhatsApp.",
    ask: "Hola, tengo una consulta sobre cómo crear mi perfil de talento en deleFOCO.",
    apply: "Postularme", deadline: "Fecha límite", profile: "Perfil buscado" },
  en: { pageTitle: "I'm Talent: Create your profile | deleFOCO Casting", pageDesc: "Create your talent profile at deleFOCO: acting, modeling, dance, music and hosting. Apply to active castings in Costa Rica and Central America.", toTop: "Back to top", themeDark: "Dark", themeLight: "Light",
    errors: "Please complete the required fields before sending.",
    ok: "Done. WhatsApp opened with your message: send it to complete your profile.",
    blocked: "Your browser blocked WhatsApp. Allow pop-ups and try again.",
    sent: "Done! We received your profile. We will review it and write to you soon.",
    fail: "We could not send your profile. Try again or message us on WhatsApp.",
    ask: "Hi, I have a question about creating my talent profile at deleFOCO.",
    apply: "Apply", deadline: "Deadline", profile: "Profile wanted" }
};
Object.assign(copy.es, { notify: "Hola, quiero que me avisen cuando haya nuevos castings para mi perfil de talento.", applyMsg: "Hola, quiero postularme al casting «{t}» (fecha límite: {d}). ¿Me indican cómo aplicar?", allOpps: "Ver todas las oportunidades", allOppsWA: "Quiero que me avisen de castings" });
Object.assign(copy.en, { notify: "Hi, I want to be notified when there are new castings for my talent profile.", applyMsg: "Hi, I want to apply to the casting \"{t}\" (deadline: {d}). Could you tell me how to apply?", allOpps: "See all opportunities", allOppsWA: "Notify me about castings" });
Object.assign(copy.es, { advisor: "Hola, quiero hablar con un asesor de deleFOCO sobre mi perfil de talento." });
Object.assign(copy.en, { advisor: "Hi, I would like to talk to a deleFOCO advisor about my talent profile." });
Object.assign(copy.es, { wa_select: "Hola, quiero saber cómo llegar a deleFOCO SELECT y qué incluye.", wa_rep: "Hola, quiero información sobre la representación de deleFOCO." });
Object.assign(copy.en, { wa_select: "Hi, I want to know how to get into deleFOCO SELECT and what it includes.", wa_rep: "Hi, I want information about deleFOCO representation." });

function setText(id, value, html = false) {
  const el = document.getElementById(id);
  if (!el) return;
  html ? (el.innerHTML = value) : (el.textContent = value);
}

const colorToggle = document.getElementById("colorToggle");

function updateThemeToggle() {
  if (!colorToggle) return;
  const isDark = document.body.classList.contains("theme-dark");
  const text = colorToggle.querySelector(".color-toggle-text");
  const icon = colorToggle.querySelector(".color-toggle-icon");
  const label = isDark ? copy[state.lang].themeLight : copy[state.lang].themeDark;
  if (text) text.textContent = label;
  if (icon) icon.textContent = isDark ? "☀" : "☾";
  colorToggle.setAttribute("aria-label", label);
  colorToggle.setAttribute("title", label);
  colorToggle.setAttribute("aria-pressed", String(isDark));
}

colorToggle?.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("theme-dark");
  document.body.classList.toggle("theme-light", !isDark);
  updateThemeToggle();
});

function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll(".lang-btn").forEach((b) =>
    b.classList.toggle("active", b.dataset.lang === state.lang)
  );
  const c = copy[state.lang];
  // Textos con data-en: alterna entre español (original) e inglés
  document.querySelectorAll("[data-en]").forEach((el) => {
    if (!("es" in el.dataset)) el.dataset.es = el.tagName === "OPTION" ? el.textContent : el.innerHTML;
    const value = state.lang === "en" ? el.dataset.en : el.dataset.es;
    if (el.tagName === "OPTION") el.textContent = value;
    else el.innerHTML = value;
  });
  // Atributos traducibles: data-en-placeholder, data-en-aria-label, data-en-aria-roledescription
  ["placeholder", "aria-label", "aria-roledescription"].forEach((attr) => {
    document.querySelectorAll("[data-en-" + attr + "]").forEach((el) => {
      const esKey = "data-es-" + attr;
      if (!el.hasAttribute(esKey)) el.setAttribute(esKey, el.getAttribute(attr) || "");
      el.setAttribute(
        attr,
        state.lang === "en" ? el.getAttribute("data-en-" + attr) : el.getAttribute(esKey)
      );
    });
  });
  // Título de la pestaña y meta descripción
  document.title = c.pageTitle;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", c.pageDesc);
  // Botón "volver arriba" (se crea más abajo)
  const toTopBtn = document.querySelector(".to-top");
  if (toTopBtn) toTopBtn.setAttribute("aria-label", c.toTop);
  updateThemeToggle();
  window.dispatchEvent(new Event("langchange"));
}

document.querySelectorAll(".lang-btn").forEach((btn) =>
  btn.addEventListener("click", () => {
    state.lang = btn.dataset.lang;
    applyLanguage();
  })
);


const WA = "https://wa.me/50686823430?text=";
function sendWA(text, statusEl) {
  const w = window.open(WA + encodeURIComponent(text), "_blank", "noopener,noreferrer");
  state.statusKey = w ? "ok" : "blocked";
  statusEl.dataset.key = state.statusKey; statusEl.textContent = copy[state.lang][state.statusKey];
}
window.addEventListener("langchange", () => {
  document.querySelectorAll(".form-status[data-key]").forEach((s) => (s.textContent = copy[state.lang][s.dataset.key]));
  const q = document.getElementById("waQuestion");
  if (q) q.href = WA + encodeURIComponent(copy[state.lang].ask);
  document.querySelectorAll("[data-wa]").forEach((a) => (a.href = WA + encodeURIComponent(copy[state.lang]["wa_" + a.dataset.wa])));
  document.querySelectorAll(".js-advisor").forEach((a) => (a.href = WA + encodeURIComponent(copy[state.lang].advisor)));
});

applyLanguage();

/* Hero carousel */
(function () {
  const root = document.getElementById("heroCarousel");
  if (!root) return;
  const slides = Array.from(root.querySelectorAll(".hero-carousel-slide"));
  const dots = Array.from(root.querySelectorAll(".hero-carousel-dots button"));
  const prevBtn = document.getElementById("heroCarouselPrev");
  const nextBtn = document.getElementById("heroCarouselNext");
  let current = 0;
  let timer = null;
  const AUTOPLAY_MS = 5000;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
      dot.setAttribute("aria-selected", i === current ? "true" : "false");
    });
  }
  function next() {
    goTo(current + 1);
  }
  function prev() {
    goTo(current - 1);
  }
  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(next, AUTOPLAY_MS);
  }
  function stopAutoplay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  nextBtn && nextBtn.addEventListener("click", () => {
    next();
    startAutoplay();
  });
  prevBtn && prevBtn.addEventListener("click", () => {
    prev();
    startAutoplay();
  });
  dots.forEach((dot) =>
    dot.addEventListener("click", () => {
      goTo(Number(dot.dataset.index));
      startAutoplay();
    })
  );
  root.addEventListener("mouseenter", stopAutoplay);
  root.addEventListener("mouseleave", startAutoplay);
  goTo(0);
  startAutoplay();
})();

/* Scroll progress + to-top + reveal */
(function () {
  const reduce =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);

  const toTop = document.createElement("button");
  toTop.type = "button";
  toTop.className = "to-top";
  toTop.setAttribute("aria-label", copy[state.lang].toTop);
  toTop.textContent = "↑";
  toTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
  );
  document.body.appendChild(toTop);

  const topbar = document.querySelector(".topbar");
  let ticking = false;
  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";
    if (topbar) topbar.classList.toggle("is-scrolled", y > 8);
    toTop.classList.toggle("show", y > 600);
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );
  onScroll();

  const carousel = document.getElementById("heroCarousel");
  if (carousel && !reduce) {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => carousel.classList.add("kb-on"))
    );
  }

  if ("IntersectionObserver" in window) {
    const targets = document.querySelectorAll(
      ".section-heading, .service-grid, .cases-grid, .timeline, .talent-grid, .levels, .after-send, .spot, .quotes, .talent-mosaic, .opp-grid, .market-grid, .compare, .faq-list, .contact-intro, .lead-form"
    );
    if (targets.length) {
      document.documentElement.classList.add("js-reveal");
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );
      targets.forEach((el) => {
        el.classList.add("reveal");
        io.observe(el);
      });
    }
  }
})();



/* Aviso de privacidad */
(function () {
  const dlg = document.getElementById("privacyDialog");
  if (!dlg) return;
  const close = () => dlg.close();
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-privacy]");
    if (!a) return;
    e.preventDefault();
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
  });
  document.getElementById("privacyClose")?.addEventListener("click", close);
  document.getElementById("privacyOk")?.addEventListener("click", close);
  dlg.addEventListener("click", (e) => { if (e.target === dlg) close(); });
})();


/* Crear mi perfil: mensaje de WhatsApp en primera persona, como lo escribiría el talento */
function composeProfile(f, L) {
  const v = (n) => (f.elements[n] ? f.elements[n].value.trim() : "");
  const sel = (n) => { const o = f.elements[n]?.selectedOptions[0]; return o ? o.textContent.trim() : ""; };
  const langs = [...f.querySelectorAll('[name="langs"]:checked')].map((c) => c.closest("label").textContent.trim()).join(", ");
  const en = L === "en";
  const rows = [
    [en ? "Name" : "Nombre", v("name")],
    [en ? "Contact" : "Contacto", v("contact")],
    [en ? "Main category" : "Categoría principal", sel("cat")],
    [en ? "Age" : "Edad", sel("age")],
    [en ? "City" : "Ciudad", v("city")],
    [en ? "Languages" : "Idiomas", langs],
    [en ? "Photos" : "Fotos", v("photos")],
    [en ? "Book / showreel" : "Book / showreel", v("book")]
  ].filter((r) => r[1]).map((r) => r[0] + ": " + r[1]);
  return [
    en ? "Hi, deleFOCO team! I want to create my talent profile. Here are my details:" : "¡Hola, equipo de deleFOCO! Quiero crear mi perfil de talento. Estos son mis datos:",
    "", ...rows, "",
    en ? "Could you confirm the next steps? Thank you!" : "¿Me confirman los próximos pasos? ¡Gracias!",
    "", en ? "— Sent from the deleFOCO \"I'm talent\" page" : "— Enviado desde la página «Soy talento» de deleFOCO"
  ].join("\n");
}

const PROFILE_ENDPOINT = ""; // URL que reciba multipart/form-data (fotos incluidas). Vacío = WhatsApp.
document.getElementById("profileForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = e.target, st = document.getElementById("profStatus");
  const say = (k) => { st.dataset.key = k; st.textContent = copy[state.lang][k]; };
  if (!f.checkValidity()) { say("errors"); f.reportValidity(); return; }
  if (PROFILE_ENDPOINT) {
    try {
      const r = await fetch(PROFILE_ENDPOINT, { method: "POST", body: new FormData(f) });
      if (!r.ok) throw new Error(r.status);
      f.reset(); say("sent");
    } catch (err) { say("fail"); }
    return;
  }
  sendWA(composeProfile(f, state.lang), st);
});

/* Convocatorias abiertas.
   EJEMPLOS: reemplazar por datos reales del módulo Oportunidades (filtro categoría "Casting"),
   p. ej. fetch("/api/oportunidades?cat=casting").then(r => r.json()) con este mismo formato. */
// Pegá aquí la URL REAL del módulo Oportunidades cuando la confirmes. Vacío = los botones usan
// la sección de convocatorias de esta página y WhatsApp (nada apunta a una página que no existe).
const OPP_URL = "";
const OPPS = [
  { type: { es: "Comercial", en: "Commercial" }, title: { es: "Campaña nacional de telecomunicaciones", en: "National telecom campaign" }, profile: { es: "Adultos 30–44, español e inglés", en: "Adults 30–44, Spanish & English" }, deadline: "2026-10-16" },
  { type: { es: "Serie", en: "Series" }, title: { es: "Serie web: elenco de apoyo", en: "Web series: supporting cast" }, profile: { es: "Actores 18–29, San José", en: "Actors 18–29, San José" }, deadline: "2026-10-20" },
  { type: { es: "Videoclip", en: "Music video" }, title: { es: "Videoclip: bailarines urbanos", en: "Music video: urban dancers" }, profile: { es: "Bailarines 18–35, hip hop y dancehall", en: "Dancers 18–35, hip hop & dancehall" }, deadline: "2026-10-24" },
  { type: { es: "Cine", en: "Film" }, title: { es: "Largometraje: familias y extras", en: "Feature film: families & extras" }, profile: { es: "Familias y adultos mayores, Guanacaste", en: "Families and seniors, Guanacaste" }, deadline: "2026-10-30" },
  { type: { es: "Moda", en: "Fashion" }, title: { es: "Catálogo de temporada", en: "Seasonal catalog" }, profile: { es: "Modelos 18–29, talla estándar", en: "Models 18–29, standard sizes" }, deadline: "2026-11-05" },
  { type: { es: "Evento", en: "Event" }, title: { es: "Presentadores para evento corporativo", en: "Hosts for a corporate event" }, profile: { es: "Presentadores bilingües", en: "Bilingual hosts" }, deadline: "2026-11-12" }
];
function renderOpps() {
  const g = document.getElementById("oppGrid"); if (!g) return;
  const L = state.lang, c = copy[L];
  g.innerHTML = OPPS.map((o) => {
    const d = new Date(o.deadline + "T12:00:00").toLocaleDateString(L === "en" ? "en-US" : "es-CR", { day: "numeric", month: "long", year: "numeric" });
    return '<article class="opp"><span class="opp-type">' + o.type[L] + "</span><h3>" + o.title[L] + '</h3><p class="opp-row"><b>' + c.profile + "</b>" + o.profile[L] + '</p><p class="opp-row"><b>' + c.deadline + "</b>" + d + '</p><a class="btn btn-red" href="' + (OPP_URL || WA + encodeURIComponent(c.applyMsg.replace("{t}", o.title[L]).replace("{d}", d))) + '" target="_blank" rel="noopener"><span>' + c.apply + "</span> <span>→</span></a></article>";
  }).join("");
}
function wireOppLinks() {
  const c = copy[state.lang];
  document.querySelectorAll("[data-opp]").forEach((a) => {
    if (OPP_URL) { a.href = OPP_URL; a.target = "_blank"; a.rel = "noopener"; }
    else { a.href = "#oportunidades"; a.removeAttribute("target"); }
  });
  const all = document.getElementById("oppAll");
  if (all) {
    all.href = OPP_URL || WA + encodeURIComponent(c.notify);
    all.querySelector("[data-lbl]").textContent = OPP_URL ? c.allOpps : c.allOppsWA;
  }
}
window.addEventListener("langchange", () => { renderOpps(); wireOppLinks(); });
renderOpps();
wireOppLinks();


/* Menú hamburguesa (móvil / tablet) */
(function () {
  const bar = document.querySelector(".topbar"), btn = document.getElementById("navToggle");
  if (!bar || !btn) return;
  const set = (open) => { bar.classList.toggle("is-open", open); btn.setAttribute("aria-expanded", String(open)); };
  btn.addEventListener("click", () => set(!bar.classList.contains("is-open")));
  bar.addEventListener("click", (e) => { if (e.target.closest(".nav a, .header-cta, .audience-item")) set(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
  window.matchMedia("(min-width:1281px)").addEventListener("change", (e) => { if (e.matches) set(false); });
})();

/* Selector "Busco talento / Soy talento": tocar cualquier parte de la píldora (menos "Soy talento") lleva a la otra página */
(function () {
  const sw = document.querySelector(".audience-switch");
  if (!sw) return;
  sw.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    const cur = sw.querySelector(".audience-item.active");
    if (cur) { const r = cur.getBoundingClientRect(); if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) return; } // "Soy talento" = página actual
    const other = sw.querySelector(".audience-item:not(.active)");
    if (other) window.location.href = other.href;
  });
})();