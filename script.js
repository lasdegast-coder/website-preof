/* ═══════════════════════════════════════════════════════════════════
   Impact Connect — gedeelde JavaScript
   Draait op elke pagina. Wat er precies gebeurt, hangt af van
   <body data-page="..."> in het HTML-bestand.
   ═══════════════════════════════════════════════════════════════════ */

/* ── kleine helpers ──────────────────────────────────────────────── */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/** Lucide-icoon als SVG-string. */
function icon(name, size = 16, opts = {}) {
  const inner = ICON_PATHS[name];
  if (!inner) return "";
  const stroke = opts.color || "currentColor";
  const fill = opts.fill || "none";
  const sw = opts.strokeWidth || 2;
  const cls = "ic" + (opts.className ? " " + opts.className : "");
  const style = opts.style ? ` style="${opts.style}"` : "";
  return `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}"
    stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"${style}>${inner}</svg>`;
}

/** Het merkteken: opkomende zon boven twee golven. */
// Het merkteken: de Vollers Bridge, een dekbalk met daaronder een boog.
// Nagetekend van het merkboard (impact-connect/Logo Impact Connect.JPG).
// `size` is de breedte, de hoogte volgt de verhouding 124:82.
function bridgeMark(size = 30, color = "#13352A") {
  const h = Math.round((size * 82) / 124);
  return `<svg width="${size}" height="${h}" viewBox="0 0 124 82" fill="none" aria-hidden="true">
    <g fill="${color}">
      <rect x="0" y="0" width="124" height="8"/>
      <rect x="57.5" y="20.5" width="9" height="4"/>
      <path d="M4.5 83 A57.5 57.5 0 0 1 119.5 83 L111 83 A49 49 0 0 0 13 83 Z"/>
      <rect x="0" y="57" width="10" height="25"/>
      <rect x="114" y="57" width="10" height="25"/>
    </g>
  </svg>`;
}

/* ── illustraties (staan in voor echte foto's) ───────────────────── */
let sceneId = 0;
const SCENES = {
  event() {
    const id = "evg" + (++sceneId);
    const crowd = [30, 58, 86, 114, 142, 170, 198, 226, 254, 282].map((x, i) => `
      <circle cx="${x}" cy="${150 - (i % 3) * 4}" r="9" fill="${i % 2 ? "#C2683A" : "#5AB97F"}" opacity="0.9"/>
      <rect x="${x - 9}" y="${158 - (i % 3) * 4}" width="18" height="34" rx="7" fill="${i % 2 ? "#C2683A" : "#5AB97F"}" opacity="0.9"/>`).join("");
    const confetti = [[40, 28], [120, 20], [210, 30], [280, 22], [160, 16]].map(([x, y], i) =>
      `<rect x="${x}" y="${y}" width="5" height="5" rx="1" fill="#D8C9A0" opacity="0.8" transform="rotate(${i * 30} ${x} ${y})"/>`).join("");
    return `<svg viewBox="0 0 320 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style="display:block">
      <rect width="320" height="200" fill="#13352A"/>
      <rect width="320" height="200" fill="url(#${id})" opacity="0.5"/>
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2B6B4F"/><stop offset="1" stop-color="#06281D"/></linearGradient></defs>
      <rect x="92" y="44" width="136" height="58" rx="6" fill="#13352A" stroke="#C2683A" stroke-width="2"/>
      <rect x="104" y="56" width="50" height="34" rx="3" fill="#C2683A" opacity="0.55"/>
      <circle cx="186" cy="66" r="9" fill="#5AB97F"/>
      <rect x="172" y="76" width="28" height="20" rx="3" fill="#5AB97F" opacity="0.7"/>
      ${crowd}${confetti}
    </svg>`;
  },
  field() {
    return `<svg viewBox="0 0 320 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style="display:block">
      <rect width="320" height="200" fill="#2B6B4F"/>
      <circle cx="250" cy="50" r="22" fill="#5AB97F" opacity="0.85"/>
      <path d="M0 110 Q80 70 160 100 T320 96 V200 H0Z" fill="#13352A"/>
      <path d="M0 130 Q90 100 180 124 T320 124 V200 H0Z" fill="#06281D"/>
      <path d="M0 150 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#C2683A" stroke-width="3" fill="none" opacity="0.6"/>
      <path d="M0 166 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#5AB97F" stroke-width="3" fill="none" opacity="0.5"/>
      <circle cx="96" cy="96" r="9" fill="#EDE6D4"/>
      <rect x="88" y="104" width="16" height="30" rx="6" fill="#EDE6D4"/>
      <rect x="112" y="78" width="3" height="60" fill="#D8C9A0"/>
    </svg>`;
  },
  talk() {
    return `<svg viewBox="0 0 320 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style="display:block">
      <rect width="320" height="200" fill="#D9EEDF"/>
      <rect x="40" y="150" width="240" height="14" rx="5" fill="#2B6B4F" opacity="0.25"/>
      <circle cx="110" cy="92" r="20" fill="#2B6B4F"/><rect x="84" y="116" width="52" height="44" rx="14" fill="#2B6B4F"/>
      <circle cx="210" cy="92" r="20" fill="#2B6B4F"/><rect x="184" y="116" width="52" height="44" rx="14" fill="#2B6B4F"/>
      <rect x="120" y="44" width="42" height="26" rx="8" fill="#C2683A"/><path d="M132 70 l8 10 l4 -10Z" fill="#C2683A"/>
      <rect x="166" y="56" width="36" height="22" rx="8" fill="#5AB97F"/><path d="M188 78 l-8 9 l-3 -9Z" fill="#5AB97F"/>
    </svg>`;
  },
  portrait(seed = 0) {
    const tones = [["#2B6B4F", "#EDE6D4"], ["#13352A", "#D8C9A0"], ["#2B6B4F", "#D9EEDF"], ["#3F7C6A", "#EDE6D4"]];
    const [bg, fg] = tones[seed % tones.length];
    return `<svg viewBox="0 0 200 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style="display:block">
      <rect width="200" height="200" fill="${bg}"/>
      <circle cx="100" cy="150" r="64" fill="${fg}" opacity="0.95"/>
      <circle cx="100" cy="84" r="40" fill="${fg}"/>
      <circle cx="100" cy="84" r="40" fill="#000" opacity="0.04"/>
    </svg>`;
  },
};

/* ── thema's, niveaus, logo's ────────────────────────────────────── */
const themeColor = (id) => (THEMES.find((t) => t.id === id) || {}).color || "#000";
const themeLabel = (id) => (THEMES.find((t) => t.id === id) || {}).label || id;

function pill(text, bg = "#000", color = "#fff", border) {
  const b = border ? `border:${border};` : "";
  return `<span class="pill" style="background:${bg};color:${color};${b}">${text}</span>`;
}
function themePill(theme) {
  const c = themeColor(theme);
  return `<span class="pill" style="background:#fff;color:${c};border:1px solid ${c}33">
    <span class="pill-dot" style="background:${c}"></span>${esc(themeLabel(theme))}</span>`;
}
function levelDots(level, color) {
  const dots = [1, 2, 3, 4].map((n) =>
    `<i style="${n <= level ? `background:${color}` : ""}"></i>`).join("");
  return `<span class="levels"><span class="levels-dots">${dots}</span>
    <span class="levels-label">${esc(LEVELS[level] || "")}</span></span>`;
}

function companyLogo(org, logoKey, size = 46) {
  const src = logoKey && LOGOS[logoKey];
  const h = Math.round(size * 0.7);
  const box = `width:${size}px;height:${h}px`;
  if (src) {
    return `<span class="logo-badge" style="${box};padding:${Math.round(size * 0.1)}px">
      <img src="${esc(src)}" alt="${esc(org)}"></span>`;
  }
  const initials = org.replace(/[^A-Za-z0-9 ]/g, "").split(" ").filter(Boolean)
    .slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return `<span class="logo-badge is-initials" style="${box};font-size:${Math.round(size * 0.28)}px">${esc(initials)}</span>`;
}

const LOGOS = {
  tno: "assets/logos/tno.png", arcadis: "assets/logos/arcadis.png", rws: "assets/logos/rws.png",
  shell: "assets/logos/shell.png", prorail: "assets/logos/prorail.png", haskoning: "assets/logos/haskoning.png",
  coolblue: "assets/logos/coolblue.png", de: "assets/logos/de.png", heineken: "assets/logos/heineken.png",
  bol: "assets/logos/bol.png", bp: "assets/logos/bp.png", npo: "assets/logos/npo.png",
  heijmans: "assets/logos/heijmans.png", pwc: "assets/logos/pwc.png", klm: "assets/logos/klm.png",
  engie: "assets/logos/engie.png",
};
const UU_LOGO = "assets/logos/uu-logo.png";

/* ── datums ──────────────────────────────────────────────────────── */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHNAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

function parseEventDate(d) {
  if (!d || /year-round/i.test(d)) {
    return { sortKey: 8.64e15 - 1, display: "Year-round", monthLabel: "Year-round & ongoing", yearRound: true };
  }
  const dm = d.match(/(\d{2})-(\d{2})-(\d{4})/);
  if (dm) {
    const [, dd, mm, yyyy] = dm;
    const dt = new Date(`${yyyy}-${mm}-${dd}`);
    const re = d.match(/to\s+(\d{2})-(\d{2})-(\d{4})/);
    let disp = `${parseInt(dd)} ${MONTHS[parseInt(mm) - 1]} ${yyyy}`;
    if (re) disp = `${parseInt(dd)}–${parseInt(re[1])} ${MONTHS[parseInt(re[2]) - 1]} ${yyyy}`;
    return { sortKey: dt.getTime(), display: disp, monthLabel: `${MONTHNAMES[parseInt(mm) - 1]} ${yyyy}` };
  }
  const my = d.match(/([A-Za-z]+)\s+(\d{4})/);
  if (my) {
    const mi = MONTHNAMES.findIndex((m) => m.toLowerCase() === my[1].toLowerCase());
    if (mi >= 0) {
      const dt = new Date(parseInt(my[2]), mi, 15);
      return { sortKey: dt.getTime(), display: `${my[1]} ${my[2]}`, monthLabel: `${MONTHNAMES[mi]} ${my[2]}`, fuzzy: true };
    }
  }
  return { sortKey: 8.64e15, display: d, monthLabel: "Dates to be confirmed", fuzzy: true, tbc: true };
}

function deadlineInfo(d) {
  if (!d || d === "Year-round") return { label: "Year-round", soon: false };
  const date = new Date(d);
  const days = Math.ceil((date - new Date()) / 86400000);
  return {
    label: `Apply by ${date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`,
    soon: days <= 30 && days >= 0,
  };
}

/* ── afgeleide lijsten ───────────────────────────────────────────── */
const PARTNER_INTERNSHIPS = [...INTERNSHIPS, ...WORKSTUDENT].filter((i) => i.kind === "partner");
const OTHER_INTERNSHIPS   = [...INTERNSHIPS, ...WORKSTUDENT].filter((i) => i.kind !== "partner");
const ALL_ITEMS = [...PARTNER_INTERNSHIPS, ...THESIS, ...OTHER_INTERNSHIPS];

const LISTS = {
  partner: { data: PARTNER_INTERNSHIPS, mode: "internship", accent: "#C2683A", page: "internships.html" },
  thesis:  { data: THESIS,              mode: "thesis",     accent: "#2B6B4F", page: "thesis.html" },
  other:   { data: OTHER_INTERNSHIPS,   mode: "internship", accent: "#7C8C4E", page: "other-internships.html" },
};
const listOf = (item) => THESIS.includes(item) ? "thesis"
  : PARTNER_INTERNSHIPS.includes(item) ? "partner" : "other";

/* ── bewaarde items (blijven staan via localStorage) ─────────────── */
const SAVED_KEY = "impact-connect:saved";
function loadSaved() {
  try { return new Set(JSON.parse(localStorage.getItem(SAVED_KEY) || "[]")); }
  catch (e) { return new Set(); }
}
let saved = loadSaved();
function persistSaved() {
  try { localStorage.setItem(SAVED_KEY, JSON.stringify([...saved])); } catch (e) {}
}
function toggleSave(org) {
  if (saved.has(org)) { saved.delete(org); }
  else { saved.add(org); toast(`Saved “${org}”`); }
  persistSaved();
  paintSaved();
}
function paintSaved() {
  $$("[data-saved-count]").forEach((el) => { el.textContent = saved.size; });
  $$(".opp-save").forEach((btn) => {
    const on = saved.has(btn.dataset.org);
    const accent = btn.dataset.accent || "#C2683A";
    btn.innerHTML = icon("Bookmark", 17, { color: on ? accent : "#CCC", fill: on ? accent : "none" });
  });
  const pf = $("#panel-save");
  if (pf) {
    const on = saved.has(pf.dataset.org);
    const accent = pf.dataset.accent;
    pf.style.borderColor = on ? accent : "#DDD";
    pf.style.color = on ? accent : "#555";
    pf.innerHTML = icon("Bookmark", 16, { color: on ? accent : "currentColor", fill: on ? accent : "none" })
      + (on ? " Saved" : " Save");
  }
}

/* ── toasts ──────────────────────────────────────────────────────── */
function toast(msg) {
  let host = $(".toasts");
  if (!host) { host = document.createElement("div"); host.className = "toasts"; document.body.appendChild(host); }
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<span class="tick">${icon("Check", 14, { color: "#fff" })}</span>${esc(msg)}`;
  host.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

/* ── onthullen bij scrollen ──────────────────────────────────────── */
function initReveal(root = document) {
  const els = $$(".reveal:not(.shown)", root);
  if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("shown")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const d = parseInt(e.target.dataset.delay || "0", 10);
      setTimeout(() => e.target.classList.add("shown"), d);
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  els.forEach((e) => io.observe(e));
}

/* ── leesvoortgang ───────────────────────────────────────────────── */
function initScrollProgress() {
  const bar = $("#scroll-progress");
  if (!bar) return;
  const paint = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", paint, { passive: true });
  paint();
}

/* ═══════════════════════════════════════════════════════════════════
   ZIJPANEEL met alle details van één plek
   ═══════════════════════════════════════════════════════════════════ */
function conceptEmailFor(item, mode) {
  if (!item.contactEmail) return "";
  const org = mode === "thesis"
    ? `the thesis opportunity at ${item.org.split(" · ")[0]}`
    : `the ${item.org} opportunity`;
  return `Dear ${item.contactPerson || "Sir/Madam"},

My name is [your name], a ${mode === "thesis" ? "Master's student" : "student"} at Utrecht University. Through Impact Connect I came across ${org}, and I would love to learn more.

[One or two lines about yourself: your programme, your year, and why this opportunity fits your interests.]

Would you be open to a short call or a coffee to discuss the possibilities?

Kind regards,
[Your name]
[Phone number]`;
}

function openPanel(item, mode, accent) {
  closePanel();
  const dl = deadlineInfo(item.deadline);
  const isPartner = item.kind === "partner";
  const isThesis = mode === "thesis";
  const isProg = mode === "programme";
  const label = isThesis ? "Thesis internship" : isProg ? "Programme"
    : mode === "workstudent" ? "Work-student job" : "Internship";
  const conceptEmail = conceptEmailFor(item, mode);
  const mailHref = item.contactEmail
    ? `mailto:${item.contactEmail}?subject=${encodeURIComponent(`Interest via Impact Connect, ${item.org}`)}&body=${encodeURIComponent(conceptEmail)}`
    : "";

  const pills = [
    isPartner ? pill("★ Partner", "#13352A") : "",
    isThesis ? (item.thesisType === "defined" ? pill("Defined topic", "#2B6B4F") : pill("Open application", "#7C8C4E")) : "",
    dl.soon ? pill("Closing soon", "#C00A35") : "",
  ].join("");

  let topic = "";
  if (isThesis && item.thesisType === "defined") {
    topic = `<div class="panel-note">
      <div class="kicker">Proposed thesis topic</div>
      <p class="quote">“${esc(item.title)}”</p>
      <p><strong>Research question:</strong> ${esc(item.question)}</p></div>`;
  } else if (isThesis && item.thesisType === "open") {
    topic = `<div class="panel-note">
      <div class="kicker">Open thesis application</div>
      <p>Bring your own research question in <strong>${esc(item.field)}</strong>. The organisation provides data and supervision.</p></div>`;
  }

  const facts = [
    ["MapPin", "Location", item.loc],
    ["Clock", isProg ? "Commitment" : "Time", isProg ? item.commit : item.hours],
    !isProg && ["Banknote", "Pay", item.paid ? (item.salary || "Paid") : "Unpaid"],
    isProg && ["Clock", "Duration", item.duration],
    ["Globe", "Language", item.lang === "NL" ? "Dutch" : "English / Intl"],
    ["Calendar", "Deadline", dl.label.replace("Apply by ", "")],
    !isProg && ["BarChart3", "Level", `${item.level} / 4`],
  ].filter(Boolean).map(([ic, k, v]) => `<div class="fact">
      <span style="color:${accent}">${icon(ic, 15)}</span>
      <span><span class="k">${esc(k)}</span><span class="v">${esc(v)}</span></span></div>`).join("");

  const alumni = (item.alumni && item.alumni.length) ? `<div class="alumni">
      <h4>${icon("UserCircle2", 15)} ${isProg ? "Students who joined" : "Students who did this role"}</h4>
      ${item.alumni.map((a) => `<figure style="border-left-color:${accent}">
        <blockquote>"${esc(a.quote)}"</blockquote>
        <figcaption>${esc(a.name)}</figcaption></figure>`).join("")}
    </div>` : "";

  const partnerBlock = isPartner ? `
    <div class="partner-note">
      ${icon("UserCircle2", 22, { color: "#13352A", style: "margin-top:1px" })}
      <div><strong style="font-size:13.5px">Partner of Impact Connect.</strong>
      <p>We set up this connection and keep the relationship warm in the background, reaching out is up to you. Use the contact and concept email below to get the ball rolling.</p></div>
    </div>
    ${item.contactEmail ? `
    <div style="margin-top:18px">
      <h4 style="font-weight:800;letter-spacing:1px">Your contact at ${esc(item.org.split(" · ")[0])}</h4>
      <div class="contact-card">
        <span class="avatar" style="background:${accent}">${icon("UserCircle2", 21, { color: "#fff" })}</span>
        <div style="min-width:0">
          <div class="who">${esc(item.contactPerson)}</div>
          <a href="mailto:${esc(item.contactEmail)}">${icon("Mail", 13)} ${esc(item.contactEmail)}</a>
        </div>
      </div>
      <h4 style="font-weight:800;letter-spacing:1px;margin:20px 0 10px">Concept email, make it yours</h4>
      <div class="email-draft" id="email-draft">${esc(conceptEmail)}</div>
      <div style="display:flex;gap:10px;margin-top:12px">
        <button class="btn-copy" id="copy-email">${icon("Copy", 15)} Copy email</button>
        <span style="font-size:12px;color:#999;align-self:center">Fill in the [brackets] before sending.</span>
      </div>
    </div>` : ""}` : "";

  const applyLabel = isThesis && item.thesisType === "open" ? "Apply with your topic"
    : isProg ? "Go to programme" : "Apply on their site";
  const applyBtn = isPartner
    ? `<a class="btn-apply" style="background:#13352A" href="${esc(mailHref)}">${icon("Mail", 16)} Email ${esc(item.contactPerson ? item.contactPerson.split(" ")[0] : "the partner")}</a>`
    : `<a class="btn-apply" style="background:${accent}" href="${esc(item.apply || "#")}"${item.apply ? ' target="_blank" rel="noreferrer"' : ""}>${esc(applyLabel)} ${icon("ExternalLink", 16)}</a>`;

  const wrap = document.createElement("div");
  wrap.id = "panel-root";
  wrap.innerHTML = `
    <div class="overlay" data-close></div>
    <aside class="panel" role="dialog" aria-label="${esc(item.org)}">
      <div class="panel-head" style="background:${accent}">
        <span class="label">${bridgeMark(16, "#fff")} ${esc(label)}</span>
        <button class="icon-btn" data-close aria-label="Close">${icon("X", 17, { color: "#fff" })}</button>
      </div>
      <div class="panel-body">
        <div style="display:flex;gap:8px;flex-wrap:wrap">${pills}</div>
        <div class="panel-org">${companyLogo(item.org, item.logo, 58)}<h2>${esc(item.org)}</h2></div>
        ${!isProg ? `<div style="margin-bottom:20px">${levelDots(item.level, accent)}</div>` : ""}
        ${topic}
        <div class="panel-facts">${facts}</div>
        <h4>${isProg ? "About this programme" : "About this opportunity"}</h4>
        <p>${esc(item.desc)}</p>
        <h4>${isProg ? "Who it's for" : "What they're looking for"}</h4>
        <p style="margin-bottom:8px">${esc(item.looking)}</p>
        ${alumni}
        ${partnerBlock}
      </div>
      <div class="panel-foot">
        <button class="btn-save" id="panel-save" data-org="${esc(item.org)}" data-accent="${accent}"></button>
        ${applyBtn}
      </div>
    </aside>`;
  document.body.appendChild(wrap);
  document.body.style.overflow = "hidden";
  paintSaved();

  $$("[data-close]", wrap).forEach((el) => el.addEventListener("click", closePanel));
  $("#panel-save", wrap).addEventListener("click", () => toggleSave(item.org));
  const copy = $("#copy-email", wrap);
  if (copy) {
    copy.addEventListener("click", () => {
      navigator.clipboard.writeText(conceptEmail).then(() => {
        copy.innerHTML = icon("Copy", 15) + " Copied!";
        setTimeout(() => { copy.innerHTML = icon("Copy", 15) + " Copy email"; }, 2000);
      }).catch(() => {});
    });
  }
}

function closePanel() {
  const el = $("#panel-root");
  if (el) el.remove();
  document.body.style.overflow = "";
  if (location.hash.startsWith("#opp=")) {
    history.replaceState(null, "", location.pathname + location.search);
  }
}

/* ═══════════════════════════════════════════════════════════════════
   OVERZICHTSPAGINA'S (partner / thesis / overig)
   ═══════════════════════════════════════════════════════════════════ */
function oppCard(item, accent, mode) {
  const dl = deadlineInfo(item.deadline);
  const pills = [
    item.kind === "partner" ? pill("★ Partner", "#13352A") : "",
    mode === "thesis" ? (item.thesisType === "defined" ? pill("Defined topic", "#2B6B4F") : pill("Open application", "#7C8C4E")) : "",
    dl.soon ? pill("Closing soon", "#C00A35") : "",
  ].join("");

  let lead = "";
  if (mode === "thesis" && item.thesisType === "defined" && item.title) {
    lead = `<p class="opp-title">“${esc(item.title)}”</p>`;
  } else if (mode === "thesis" && item.thesisType === "open" && item.field) {
    lead = `<p class="opp-field"><strong>Bring your own topic in:</strong> ${esc(item.field)}</p>`;
  }

  return `<article class="opp-card reveal" data-org="${esc(item.org)}" style="border-top-color:${accent}">
    <button class="opp-save" data-org="${esc(item.org)}" data-accent="${accent}" aria-label="Save"></button>
    <div class="opp-head">${companyLogo(item.org, item.logo, 88)}<h3>${esc(item.org)}</h3></div>
    <div class="opp-pills">${pills}</div>
    ${lead}
    <p class="opp-desc">${esc(item.desc.slice(0, 110))}…</p>
    ${mode !== "programme" ? `<div class="opp-levels">${levelDots(item.level, accent)}</div>` : ""}
    <div class="opp-meta">
      <span>${icon("MapPin", 12)} ${esc(item.loc)}</span>
      <span>${icon("Clock", 12)} ${esc(mode === "programme" ? item.commit : item.hours)}</span>
      ${mode !== "programme" ? `<span>${icon("Banknote", 12)} ${esc(item.paid ? (item.salary || "Paid") : "Unpaid")}</span>` : ""}
      <span class="${dl.soon ? "soon" : ""}">${icon("Calendar", 12)} ${esc(dl.label)}</span>
    </div>
  </article>`;
}

function initListing(key) {
  const cfg = LISTS[key];
  if (!cfg) return;
  const { data, mode, accent } = cfg;
  const grid = $("#listing-grid");
  const state = { query: "", paidOnly: false };

  // tellers in de paginakop
  const stats = $("#hero-stats");
  if (stats) {
    const paid = data.filter((d) => d.paid).length;
    const partners = data.filter((d) => d.kind === "partner").length;
    stats.innerHTML = [
      `${data.length} open`,
      mode !== "programme" && paid ? `${paid} paid` : null,
      partners ? `${partners} partner roles` : null,
    ].filter(Boolean).map((t) => `<span>${t}</span>`).join("");
  }

  function render() {
    const q = state.query.toLowerCase();
    const list = data.filter((it) =>
      (!state.paidOnly || it.paid) &&
      (q === "" || it.org.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q)));

    if (!list.length) {
      grid.className = "";
      grid.innerHTML = `<div class="empty-state"><p>Nothing here yet for these filters.</p></div>`;
      return;
    }
    grid.className = "listing-grid";
    grid.innerHTML = list.map((it, i) => oppCard(it, accent, mode)
      .replace('class="opp-card reveal"', `class="opp-card reveal" data-delay="${Math.min(i, 6) * 70}"`)).join("");
    paintSaved();
    initReveal(grid);
  }

  grid.addEventListener("click", (e) => {
    const save = e.target.closest(".opp-save");
    if (save) { e.stopPropagation(); toggleSave(save.dataset.org); return; }
    const card = e.target.closest(".opp-card");
    if (!card) return;
    const item = data.find((d) => d.org === card.dataset.org);
    if (item) openPanel(item, mode, accent);
  });

  const search = $("#listing-search");
  if (search) search.addEventListener("input", (e) => { state.query = e.target.value; render(); });

  const paid = $("#filter-paid");
  if (paid) {
    paid.addEventListener("click", () => {
      state.paidOnly = !state.paidOnly;
      paid.classList.toggle("on", state.paidOnly);
      render();
    });
  }

  render();

  // diepe link: internships.html#opp=Naam
  const m = decodeURIComponent(location.hash).match(/^#opp=(.+)$/);
  if (m) {
    const item = data.find((d) => d.org === m[1]);
    if (item) openPanel(item, mode, accent);
  }
}

/* ═══════════════════════════════════════════════════════════════════
   EVENTS
   ═══════════════════════════════════════════════════════════════════ */
function eventCard(ev) {
  const hasLink = ev.link && ev.link.startsWith("http");
  return `<div class="ev-card" style="border-left-color:${themeColor(ev.cat)}">
    <div class="ev-body">
      <div style="margin-bottom:8px">${themePill(ev.cat)}</div>
      <h4>${esc(ev.name)}</h4>
      ${ev.desc ? `<p>${esc(ev.desc)}</p>` : ""}
      <div class="ev-meta">
        <span>${icon("MapPin", 13)} ${esc(ev.loc)}</span>
        ${ev.time && ev.time !== "tbc" ? `<span>${icon("Clock", 13)} ${esc(ev.time)}</span>` : ""}
        <span>${icon("Ticket", 13)} ${esc(ev.cost)}</span>
      </div>
    </div>
    ${hasLink
      ? `<a class="ev-signup" href="${esc(ev.link)}" target="_blank" rel="noreferrer">Sign up ${icon("ExternalLink", 14)}</a>`
      : `<span class="ev-nolink">Link to confirm</span>`}
  </div>`;
}

/* ── De events uit de Google Sheet halen ─────────────────────────────
   Zelfde aanpak als bij de programma's: één gepubliceerd tabblad als
   CSV. Het adres staat in EVENT_SHEET bovenin data.js. Mislukt het,
   dan blijft de lijst in data.js staan.
------------------------------------------------------------------- */
const EVENT_COLS = {
  name: ["event", "event name", "name"],
  desc: ["short description", "description"],
  date: ["date"],
  time: ["time"],
  loc:  ["location"],
  cost: ["cost", "costs"],
  link: ["registration link", "link", "url"],
  cat:  ["category", "theme"],
};

// De sheet schrijft categorieën voluit; de site gebruikt korte namen.
const EVENT_CAT_MAP = {
  "general": "general",
  "energy": "energy",
  "ecology and food": "ecology", "ecology": "ecology", "food": "ecology",
  "cities": "cities",
  "governance": "governance",
  "business and innovation": "business", "business": "business",
};

function rowsToEvents(rows) {
  const headIdx = rows.findIndex((r) => r.some((c) => /^\s*event\s*$/i.test(c || "")));
  if (headIdx < 0) return [];
  const head = rows[headIdx].map((h) => (h || "").trim().toLowerCase());
  const col = {};
  for (const key in EVENT_COLS) col[key] = head.findIndex((h) => EVENT_COLS[key].includes(h));
  if (col.name < 0) return [];

  const out = [];
  for (let i = headIdx + 1; i < rows.length; i++) {
    const r = rows[i];
    const name = cellOrNull(r[col.name]);
    if (!name || /^event$/i.test(name)) continue;          // leeg of herhaalde kopregel
    const get = (k) => (col[k] >= 0 ? cellOrNull(r[col[k]]) : null);
    const cat = (get("cat") || "").trim().toLowerCase();
    out.push({
      name,
      desc: get("desc") || "",
      date: get("date") || "",
      time: get("time") || "",
      loc:  get("loc")  || "",
      cost: get("cost") || "",
      link: get("link") || "",
      cat: EVENT_CAT_MAP[cat] || "general",
    });
  }
  return out;
}

async function loadEventSheet() {
  const url = (typeof EVENT_SHEET === "string" ? EVENT_SHEET : "").trim();
  if (!url) return null;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(res.status + " " + res.statusText);
    const list = rowsToEvents(parseCSV(await res.text()));
    if (!list.length) throw new Error("geen bruikbare rijen");
    return list;
  } catch (err) {
    console.warn("[Impact Connect] events konden niet geladen worden:", err.message);
    return null;
  }
}

async function initEvents() {
  let events = EVENTS;
  draw();

  const live = await loadEventSheet();
  if (live && live.length) { events = live; draw(); }

function draw() {
  const enriched = events.map((e) => ({ ...e, parsed: parseEventDate(e.date) }));

  // kopcijfers
  const stats = $("#hero-stats");
  if (stats) {
    const free = events.filter((e) => /free/i.test(e.cost || "")).length;
    stats.innerHTML = [`${events.length} events`, `${free} free for students`, "Updated by hand"]
      .map((t) => `<span>${t}</span>`).join("");
  }

  // eerstvolgende event
  const dated = enriched.filter((e) => !e.parsed.tbc && !e.parsed.yearRound)
    .sort((a, b) => a.parsed.sortKey - b.parsed.sortKey);
  const nxt = dated[0];
  const nextHost = $("#next-up");
  if (nxt && nextHost) {
    const href = nxt.link && nxt.link.startsWith("http") ? nxt.link : "#";
    nextHost.innerHTML = `<a class="next-up" href="${esc(href)}" target="_blank" rel="noreferrer">
      <div class="ghost">${icon("Zap", 170, { strokeWidth: 1.1 })}</div>
      <div class="when"><div class="label">Next up</div><div class="date">${esc(nxt.parsed.display)}</div></div>
      <div class="body"><div class="name">${esc(nxt.name)}</div>
        <div class="meta"><span>${icon("MapPin", 14)} ${esc(nxt.loc)}</span>
        <span>${icon("Ticket", 14)} ${esc(nxt.cost)}</span></div></div>
      <span class="go">Sign up ${icon("ArrowUpRight", 16)}</span></a>`;
  }

  // tijdlijn per maand
  const sorted = [...enriched].sort((a, b) => a.parsed.sortKey - b.parsed.sortKey);
  const groups = new Map();
  sorted.forEach((e) => {
    if (!groups.has(e.parsed.monthLabel)) groups.set(e.parsed.monthLabel, []);
    groups.get(e.parsed.monthLabel).push(e);
  });

  $("#ev-timeline").innerHTML = [...groups.entries()].map(([month, evs]) => {
    const kind = evs[0].parsed.tbc ? "tbc" : evs[0].parsed.yearRound ? "year" : "";
    return `<div class="ev-month ${kind}">
      <div class="spine"></div><div class="knob"></div>
      <h3>${esc(month)}</h3>
      <div class="ev-list">${evs.map((ev) =>
        `<div><div class="ev-date">${esc(ev.parsed.display)}</div>${eventCard(ev)}</div>`).join("")}</div>
    </div>`;
  }).join("");
}   // einde draw()
}   // einde initEvents()

/* ═══════════════════════════════════════════════════════════════════
   PROGRAMMES
   ═══════════════════════════════════════════════════════════════════ */

/* ── De Google Sheet uitlezen ────────────────────────────────────────
   De adressen staan in PROGRAMME_SHEETS bovenin data.js. Elk adres is
   één gepubliceerd tabblad in CSV-vorm. Gaat er iets mis, dan blijft
   PROGRAMMES_DATA staan; de bezoeker ziet dan de laatst meegeleverde
   lijst in plaats van een lege pagina.
------------------------------------------------------------------- */

// CSV-lezer die omgaat met aanhalingstekens, en met komma's en
// regeleindes bínnen een veld. De omschrijvingen in de sheet zitten
// vol komma's, dus tekst simpelweg op komma's splitsen gaat mis.
function parseCSV(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  text = String(text).replace(/\r\n?/g, "\n");
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c !== '"') { field += c; continue; }
      if (text[i + 1] === '"') { field += '"'; i++; continue; }
      quoted = false;
    } else if (c === '"') { quoted = true; }
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows;
}

// Kolomkoppen uit de sheet → velden op de site. Meerdere schrijfwijzen
// toegestaan, zodat een kleine wijziging in de sheet niets breekt.
const PROG_COLS = {
  name:     ["programme name", "program name", "name"],
  desc:     ["description"],
  signup:   ["sign up date", "signup date", "sign-up date"],
  duration: ["duration"],
  lang:     ["language"],
  level:    ["experience level", "level"],
  url:      ["url", "link"],
  loc:      ["location"],
  cost:     ["costs", "cost"],
  logo:     ["logo", "logo url", "image"],       // optionele kolom in de sheet
};

// Naam → logobestand. De sleutels in PROGRAMME_LOGOS mogen slordig zijn;
// hoofdletters, spaties en leestekens worden genegeerd bij het opzoeken.
const progKey = (n) => (n || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
const PROGRAMME_LOGO_INDEX = (() => {
  const out = {};
  const src = (typeof PROGRAMME_LOGOS === "object" && PROGRAMME_LOGOS) || {};
  for (const k in src) out[progKey(k)] = src[k];
  return out;
})();
function programmeLogo(p) {
  if (p.logo) return p.logo;                     // kolom "Logo" uit de sheet gaat voor
  return PROGRAMME_LOGO_INDEX[progKey(p.name)] || null;
}

// Witte logo's krijgen een donker vlak, anders vallen ze weg op het kaartje.
const PROG_DARK_SET = new Set(
  ((typeof PROGRAMME_LOGOS_ON_DARK !== "undefined" && PROGRAMME_LOGOS_ON_DARK) || []).map(progKey)
);
const logoOnDark = (p) => PROG_DARK_SET.has(progKey(p.name));

function cellOrNull(v) {
  const s = (v == null ? "" : String(v)).trim();
  if (!s) return null;
  if (/^not specified/i.test(s)) return null;      // "Not specified in database"
  return s;
}

// "Not paid" → false, "Paid" → true, "tuition fee" → onbekend.
// Let op: bij "tuition fee" betaalt de student juist zélf.
function derivePaid(cost) {
  const c = (cost || "").toLowerCase();
  if (!c) return null;
  if (c.includes("not paid")) return false;
  if (/\bpaid\b/.test(c)) return true;
  return null;
}

function rowsToProgrammes(rows, cat) {
  const headIdx = rows.findIndex((r) => r.some((c) => /programme name/i.test(c || "")));
  if (headIdx < 0) return [];
  const head = rows[headIdx].map((h) => (h || "").trim().toLowerCase());
  const col = {};
  for (const key in PROG_COLS) col[key] = head.findIndex((h) => PROG_COLS[key].includes(h));
  if (col.name < 0) return [];

  const out = [];
  for (let i = headIdx + 1; i < rows.length; i++) {
    const r = rows[i];
    const name = cellOrNull(r[col.name]);
    if (!name || /^programme name$/i.test(name)) continue;   // leeg of herhaalde kopregel
    const get = (k) => (col[k] >= 0 ? cellOrNull(r[col[k]]) : null);
    const cost = get("cost");
    out.push({
      cat, name,
      desc: get("desc") || "",
      url: get("url"), lang: get("lang"), level: get("level"),
      duration: get("duration"), signup: get("signup"), loc: get("loc"),
      logo: get("logo"), paid: derivePaid(cost), cost,
    });
  }
  return out;
}

async function loadProgrammeSheets() {
  if (typeof PROGRAMME_SHEETS !== "object" || !PROGRAMME_SHEETS) return null;
  const entries = Object.keys(PROGRAMME_SHEETS)
    .map((cat) => [cat, (PROGRAMME_SHEETS[cat] || "").trim()])
    .filter(([, url]) => url.length > 0);
  if (!entries.length) return null;                          // niets ingesteld

  const fetched = await Promise.all(entries.map(async ([cat, url]) => {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(res.status + " " + res.statusText);
      const list = rowsToProgrammes(parseCSV(await res.text()), cat);
      if (!list.length) throw new Error("geen bruikbare rijen");
      return list;
    } catch (err) {
      console.warn(`[Impact Connect] tabblad "${cat}" kon niet geladen worden:`, err.message);
      return null;
    }
  }));

  const liveCats = new Set(entries.filter((_, i) => fetched[i]).map(([cat]) => cat));
  if (!liveCats.size) return null;                           // alles mislukt → terugval

  const live = fetched.filter(Boolean).reduce((a, b) => a.concat(b), []);
  // Categorieën zonder werkend tabblad blijven uit data.js komen.
  const rest = knownCats(PROGRAMMES_DATA).filter((p) => !liveCats.has(p.cat));
  return live.concat(rest);
}

// Programma's met een categorie die niet in PROGRAMME_CATS staat, negeren.
// Anders tellen oude categorieën wel mee in het totaal maar is er geen
// knop om ze te zien.
function knownCats(list) {
  const ids = new Set(PROGRAMME_CATS.map((c) => c.id));
  return list.filter((p) => ids.has(p.cat));
}

async function initProgrammes() {
  let cat = "volunteer";
  let programmes = knownCats(PROGRAMMES_DATA);      // wordt vervangen zodra de sheet binnen is
  const catHost = $("#prog-cats");
  const grid = $("#tease-grid");

  function paintCats() {
    const counts = Object.fromEntries(PROGRAMME_CATS.map((c) =>
      [c.id, programmes.filter((p) => p.cat === c.id).length]));
    const total = $("#prog-total");
    if (total) total.textContent = programmes.length;
    catHost.innerHTML = PROGRAMME_CATS.map((c) =>
      `<button class="prog-cat${c.id === cat ? " on" : ""}" data-cat="${c.id}">${esc(c.label)} <b>${counts[c.id]}</b></button>`).join("");
  }

  function render() {
    const list = programmes.filter((p) => p.cat === cat);
    grid.innerHTML = list.map((p, i) => {
      const hint = p.paid === true ? "Paid" : p.paid === false ? "Unpaid" : (p.lang || null);
      const mono = (p.name || "?").replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase();
      return `<div class="tease-card reveal" data-delay="${Math.min(i, 8) * 50}" data-name="${esc(p.name)}">
        ${p.paid === true ? `<span class="paid-tag">Paid</span>` : ""}
        <div class="mono-wrap">${programmeLogo(p)
          ? `<div class="prog-logo${logoOnDark(p) ? " on-dark" : ""}"><img src="${esc(programmeLogo(p))}" alt="" loading="lazy"></div>`
          : `<div class="mono">${esc(mono)}</div>`}</div>
        <div class="tc-body"><div class="tc-name">${esc(p.name)}</div>
        ${hint ? `<div class="tc-hint">${esc(hint)}</div>` : ""}</div>
        <div class="tc-foot">Excited? Let's talk ${icon("ArrowUpRight", 14)}</div>
      </div>`;
    }).join("");
    initReveal(grid);
  }

  catHost.addEventListener("click", (e) => {
    const btn = e.target.closest(".prog-cat");
    if (!btn) return;
    cat = btn.dataset.cat;
    $$(".prog-cat", catHost).forEach((b) => b.classList.toggle("on", b.dataset.cat === cat));
    render();
  });

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".tease-card");
    if (!card) return;
    const p = programmes.find((x) => x.name === card.dataset.name);
    if (p) openProgrammePopup(p);
  });

  paintCats();
  render();

  // Live versie uit de Google Sheet. Lukt dat niet, dan blijft
  // PROGRAMMES_DATA staan en merkt de bezoeker er niets van.
  const live = await loadProgrammeSheets();
  if (live && live.length) {
    programmes = live;
    paintCats();
    render();
  }
}

function openProgrammePopup(p) {
  const subject = encodeURIComponent(`Question about: ${p.name}`);
  const body = encodeURIComponent(`Hi Impact Connect,\n\nI'd love to know more about "${p.name}" and whether it could be a fit for me. Could we plan a short appointment?\n\nThanks!`);
  const apptSubject = encodeURIComponent(`Appointment request, ${p.name}`);
  const apptBody = encodeURIComponent(`Hi Impact Connect,\n\nI'd like to plan an appointment to talk about "${p.name}" (and other programmes that might fit me).\n\nMy name:\nMy study programme:\nWhen I'm free:\n\nThanks!`);

  const wrap = document.createElement("div");
  wrap.id = "prog-pop-root";
  wrap.innerHTML = `
    <div class="prog-pop-overlay" data-close></div>
    <div class="prog-pop" role="dialog" aria-label="${esc(p.name)}">
      <div class="head">
        <div class="ghost">${icon("Rocket", 120, { strokeWidth: 1.1 })}</div>
        <button class="icon-btn" data-close aria-label="Close">${icon("X", 16, { color: "#fff" })}</button>
        <div class="kicker">Interested in this programme?</div>
        <div class="name">${esc(p.name)}</div>
      </div>
      <div class="body">
        <p>We keep the details for a conversation, that's how we find the right fit for <em>you</em>. Reach out and we'll take it from there.</p>
        <div class="actions">
          <a class="primary" href="mailto:LinkingGSS@gmail.com?subject=${apptSubject}&body=${apptBody}">${icon("Sparkles", 17)} Plan an appointment</a>
          <a class="ghost-btn" href="mailto:LinkingGSS@gmail.com?subject=${subject}&body=${body}">${icon("Mail", 16)} Email us directly</a>
        </div>
      </div>
    </div>`;
  document.body.appendChild(wrap);
  $$("[data-close]", wrap).forEach((el) => el.addEventListener("click", () => wrap.remove()));
  const esckey = (e) => { if (e.key === "Escape") { wrap.remove(); window.removeEventListener("keydown", esckey); } };
  window.addEventListener("keydown", esckey);
}

/* ═══════════════════════════════════════════════════════════════════
   PARTNERMUUR (home)
   ═══════════════════════════════════════════════════════════════════ */
function initWall() {
  const catHost = $("#wall-cats");
  const grid = $("#wall-grid");
  if (!catHost || !grid) return;
  let cat = "all";

  catHost.innerHTML = WALL_CATS.map((c) =>
    `<button class="wall-cat${c.id === cat ? " on" : ""}" data-cat="${c.id}">${esc(c.label)}</button>`).join("");
  $("#wall-count") && ($("#wall-count").textContent = WALL.length);

  grid.innerHTML = WALL.map((p) => `<div class="wall-tile${p.big ? " big" : ""}" data-cat="${p.cat}">
      ${companyLogo(p.name, p.logo, p.big ? 92 : 70)}
      <div class="tile-name">${esc(p.name)}</div>
      <div class="tile-back"><div class="n">${esc(p.name)}</div><div class="o">${esc(p.offer)}</div></div>
    </div>`).join("");

  catHost.addEventListener("click", (e) => {
    const btn = e.target.closest(".wall-cat");
    if (!btn) return;
    cat = btn.dataset.cat;
    $$(".wall-cat", catHost).forEach((b) => b.classList.toggle("on", b.dataset.cat === cat));
    $$(".wall-tile", grid).forEach((t) => {
      const on = cat !== "all" && t.dataset.cat === cat;
      t.classList.toggle("lit", on);
      t.classList.toggle("dim", cat !== "all" && !on);
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════
   HOME: logoband, categorieën, eerstvolgende events
   ═══════════════════════════════════════════════════════════════════ */
function initHome() {
  // logoband
  const band = $("#logo-band-track");
  if (band) {
    const keys = ["klm", "pwc", "arcadis", "heineken", "rws", "shell", "tno", "haskoning", "prorail", "coolblue", "bol", "heijmans"];
    const row = keys.map((k) => `<span class="logo-item"><img src="${LOGOS[k]}" alt="${k}"></span>`).join("");
    band.innerHTML = row + row;
  }

  // tellers op de vier categoriepanelen
  const counts = {
    partner: `${PARTNER_INTERNSHIPS.length} open`,
    thesis: `${THESIS.length} open`,
    other: `${OTHER_INTERNSHIPS.length} open`,
    programmes: `${PROGRAMMES_DATA.length} programmes`,
  };
  $$("[data-cat-count]").forEach((el) => { el.textContent = counts[el.dataset.catCount] || ""; });

  // scene-illustraties in de categoriepanelen
  $$("[data-scene]").forEach((el) => { el.innerHTML = SCENES[el.dataset.scene] ? SCENES[el.dataset.scene]() : ""; });
  $$("[data-portrait]").forEach((el) => { el.innerHTML = SCENES.portrait(parseInt(el.dataset.portrait, 10) || 0); });

  // eerstvolgende drie events
  const teaser = $("#events-teaser");
  if (teaser) {
    const next = EVENTS.map((e) => ({ ...e, parsed: parseEventDate(e.date) }))
      .filter((e) => !e.parsed.tbc && !e.parsed.yearRound)
      .sort((a, b) => a.parsed.sortKey - b.parsed.sortKey).slice(0, 3);
    teaser.innerHTML = next.map((ev, i) => {
      const href = ev.link && ev.link.startsWith("http") ? ev.link : "events.html";
      return `<a class="teaser-card reveal" data-delay="${i * 120}" href="${esc(href)}" target="_blank" rel="noreferrer">
        <div class="date">${esc(ev.parsed.display)}</div>
        <div class="name">${esc(ev.name)}</div>
        <p>${esc((ev.desc || "").slice(0, 90))}…</p>
        <div class="teaser-meta"><span>${icon("MapPin", 13)} ${esc(ev.loc)}</span>
        <span>${icon("Ticket", 13)} ${esc(ev.cost)}</span></div></a>`;
    }).join("");
    initReveal(teaser);
  }
  $$("[data-events-count]").forEach((el) => { el.textContent = EVENTS.length; });

  initWall();
}

/* ═══════════════════════════════════════════════════════════════════
   COMMANDOPALET (⌘K)
   ═══════════════════════════════════════════════════════════════════ */
const NAV_CMDS = [
  { label: "Partner internships", href: "internships.html", icon: "Briefcase" },
  { label: "Thesis internships", href: "thesis.html", icon: "FileText" },
  { label: "Other internships", href: "other-internships.html", icon: "Globe" },
  { label: "Events", href: "events.html", icon: "Calendar" },
  { label: "Programmes", href: "programmes.html", icon: "Rocket" },
];

let cmdk = null;
function openCmdK() {
  if (cmdk) return;
  cmdk = document.createElement("div");
  cmdk.id = "cmdk-root";
  cmdk.innerHTML = `
    <div class="cmdk-overlay" data-close></div>
    <div class="cmdk" role="dialog" aria-label="Search">
      <div class="cmdk-input">
        ${icon("Search", 20, { color: "#999" })}
        <input id="cmdk-q" placeholder="Search opportunities or jump to a page…" autocomplete="off">
        <kbd>esc</kbd>
      </div>
      <div class="cmdk-results" id="cmdk-results"></div>
      <div class="cmdk-foot"><span><kbd>↑↓</kbd> navigate</span><span><kbd>↵</kbd> open</span>
        <span class="right">Impact Connect quick search</span></div>
    </div>`;
  document.body.appendChild(cmdk);

  const input = $("#cmdk-q", cmdk);
  const results = $("#cmdk-results", cmdk);
  let rows = [], sel = 0;

  function compute(q) {
    const ql = q.toLowerCase();
    const navs = NAV_CMDS.filter((n) => !ql || n.label.toLowerCase().includes(ql))
      .map((n) => ({ type: "nav", ...n }));
    const opps = ALL_ITEMS.filter((it) => !ql || it.org.toLowerCase().includes(ql)
      || (it.desc || "").toLowerCase().includes(ql)).slice(0, 6).map((o) => ({ type: "opp", item: o }));
    return [...navs, ...opps];
  }

  function paint() {
    if (!rows.length) { results.innerHTML = `<div class="cmdk-empty">No matches. Try another search.</div>`; return; }
    results.innerHTML = rows.map((r, i) => {
      if (r.type === "nav") {
        return `<div class="cmdk-row${i === sel ? " sel" : ""}" data-i="${i}">
          <span class="sq">${icon(r.icon, 16)}</span>
          <span class="lbl">Go to ${esc(r.label)}</span><span class="tag">Page</span></div>`;
      }
      const o = r.item;
      return `<div class="cmdk-row${i === sel ? " sel" : ""}" data-i="${i}">
        ${companyLogo(o.org, o.logo, 40)}
        <div class="grow"><div class="o-name">${esc(o.org)}</div>
        <div class="o-desc">${esc((o.desc || "").slice(0, 60))}…</div></div>
        ${icon("ArrowUpRight", 16, { color: "#ccc", style: "margin-left:auto" })}</div>`;
    }).join("");
  }

  function activate(r) {
    if (!r) return;
    if (r.type === "nav") { location.href = r.href; return; }
    const key = listOf(r.item);
    location.href = `${LISTS[key].page}#opp=${encodeURIComponent(r.item.org)}`;
  }

  function refresh() { rows = compute(input.value); sel = 0; paint(); }
  refresh();
  setTimeout(() => input.focus(), 40);

  input.addEventListener("input", refresh);
  results.addEventListener("mouseover", (e) => {
    const row = e.target.closest(".cmdk-row");
    if (row) { sel = parseInt(row.dataset.i, 10); paint(); }
  });
  results.addEventListener("click", (e) => {
    const row = e.target.closest(".cmdk-row");
    if (row) activate(rows[parseInt(row.dataset.i, 10)]);
  });
  $$("[data-close]", cmdk).forEach((el) => el.addEventListener("click", closeCmdK));

  cmdk._keys = (e) => {
    if (e.key === "Escape") { closeCmdK(); }
    if (e.key === "ArrowDown") { e.preventDefault(); sel = Math.min(rows.length - 1, sel + 1); paint(); }
    if (e.key === "ArrowUp") { e.preventDefault(); sel = Math.max(0, sel - 1); paint(); }
    if (e.key === "Enter") { e.preventDefault(); activate(rows[sel]); }
  };
  window.addEventListener("keydown", cmdk._keys);
}

function closeCmdK() {
  if (!cmdk) return;
  window.removeEventListener("keydown", cmdk._keys);
  cmdk.remove();
  cmdk = null;
}

/* ═══════════════════════════════════════════════════════════════════
   AFSPRAAKFORMULIER
   ═══════════════════════════════════════════════════════════════════ */
function openForm() {
  if ($("#form-root")) return;
  const steps = ["What brings you here?", "Your interests", "Practical fit", "Your details"];
  const data = { types: [], fields: [], level: "", commit: "", paid: "", lang: "", name: "", email: "", notes: "" };
  let step = 0, done = false;

  const wrap = document.createElement("div");
  wrap.id = "form-root";
  document.body.appendChild(wrap);

  const canNext = () => step === 0 ? data.types.length > 0
    : step === 1 ? data.fields.length > 0
    : step === 3 ? !!(data.name && data.email) : true;

  function bodyFor() {
    if (step === 0) {
      return `<div class="type-grid">${TYPE_OPTIONS.map((t) => `
        <button type="button" class="type-card${data.types.includes(t.id) ? " on" : ""}" data-type="${t.id}">
          <span class="badge">${icon(t.icon, 18, { color: data.types.includes(t.id) ? "#fff" : "#888" })}</span>
          <div class="lbl">${esc(t.label)}</div><div class="sub">${esc(t.desc)}</div>
        </button>`).join("")}</div>`;
    }
    if (step === 1) {
      return `<p style="font-size:13.5px;color:#555;margin:0 0 14px">Pick the themes that excite you, choose as many as you like.</p>
        <div class="chip-row">${FIELD_OPTIONS.map((f) =>
          `<button type="button" class="chip${data.fields.includes(f) ? " on" : ""}" data-field="${esc(f)}">${esc(f)}</button>`).join("")}</div>`;
    }
    if (step === 2) {
      const group = (key, label, opts) => `<div><label>${label}</label><div class="chip-row">${
        opts.map((o) => `<button type="button" class="chip${data[key] === o ? " on" : ""}" data-set="${key}" data-val="${esc(o)}">${esc(o)}</button>`).join("")
      }</div></div>`;
      return `<div class="field-stack">
        ${group("level", "Your experience level", ["Beginner", "Some experience", "Advanced"])}
        ${group("commit", "Time you can commit", ["A few hrs/week", "1 day/week", "2–3 days/week", "Full-time"])}
        ${group("paid", "Paid or unpaid?", ["Paid only", "Either is fine", "Doesn't matter"])}
        ${group("lang", "Language", ["English", "Dutch", "Either"])}
      </div>`;
    }
    return `<div class="form-stack">
      <div><label>Your name</label><input id="f-name" placeholder="First and last name" value="${esc(data.name)}"></div>
      <div><label>University email</label><input id="f-email" placeholder="you@students.uu.nl" value="${esc(data.email)}"></div>
      <div><label>Anything else? <span style="font-weight:400;color:#999">(optional)</span></label>
        <textarea id="f-notes" rows="3" placeholder="Dream role, specific companies, constraints…">${esc(data.notes)}</textarea></div>
      <p class="form-note">We'll use this only to plan your appointment and suggest relevant programmes. You can ask us to delete your details anytime.</p>
    </div>`;
  }

  function render() {
    const inner = done ? `
      <div class="modal-done">
        <div class="tick">${icon("Check", 32, { color: "#2B6B4F" })}</div>
        <h3>Thanks, ${esc(data.name.split(" ")[0] || "there")}!</h3>
        <p>We've got your request. The Impact Connect team will reach out (usually within a few days) to plan a short appointment and inspire you with programmes from our database that fit where you want to go.</p>
        <button class="btn-next" data-close>Back to browsing</button>
      </div>` : `
      <div class="progress">${steps.map((_, i) => `<i class="${i <= step ? "on" : ""}"></i>`).join("")}</div>
      <div class="modal-body">
        <h3>${esc(steps[step])}</h3>
        <p class="step-of">Step ${step + 1} of ${steps.length}</p>
        ${bodyFor()}
      </div>
      <div class="modal-foot">
        <button class="btn-text" id="f-back">${step === 0 ? "Cancel" : "← Back"}</button>
        ${step < steps.length - 1
          ? `<button class="btn-next" id="f-next"${canNext() ? "" : " disabled"}>Continue ${icon("ChevronRight", 16)}</button>`
          : `<button class="btn-next finish" id="f-submit"${canNext() ? "" : " disabled"}>${icon("Check", 17)} Request appointment</button>`}
      </div>`;

    wrap.innerHTML = `
      <div class="modal-overlay" data-close></div>
      <div class="modal-wrap">
        <div class="modal" role="dialog" aria-label="Plan an appointment">
          <div class="modal-head">
            <div class="t">${bridgeMark(26, "#13352A")}<strong>Plan an appointment</strong></div>
            <button class="icon-btn" data-close aria-label="Close">${icon("X", 17)}</button>
          </div>
          ${inner}
        </div>
      </div>`;
    bind();
  }

  function bind() {
    $$("[data-close]", wrap).forEach((el) => el.addEventListener("click", () => wrap.remove()));

    $$("[data-type]", wrap).forEach((b) => b.addEventListener("click", () => {
      const id = b.dataset.type;
      data.types = data.types.includes(id) ? data.types.filter((x) => x !== id) : [...data.types, id];
      render();
    }));
    $$("[data-field]", wrap).forEach((b) => b.addEventListener("click", () => {
      const f = b.dataset.field;
      data.fields = data.fields.includes(f) ? data.fields.filter((x) => x !== f) : [...data.fields, f];
      render();
    }));
    $$("[data-set]", wrap).forEach((b) => b.addEventListener("click", () => {
      data[b.dataset.set] = b.dataset.val;
      render();
    }));

    ["name", "email", "notes"].forEach((k) => {
      const el = $("#f-" + k, wrap);
      if (!el) return;
      el.addEventListener("input", () => {
        data[k] = el.value;
        const btn = $("#f-submit", wrap);
        if (btn) btn.disabled = !canNext();
      });
    });

    const back = $("#f-back", wrap);
    if (back) back.addEventListener("click", () => { if (step === 0) wrap.remove(); else { step--; render(); } });
    const next = $("#f-next", wrap);
    if (next) next.addEventListener("click", () => { if (canNext()) { step++; render(); } });
    const submit = $("#f-submit", wrap);
    if (submit) submit.addEventListener("click", () => { if (canNext()) { done = true; render(); } });
  }

  render();
}

/* ═══════════════════════════════════════════════════════════════════
   OPSTARTEN
   ═══════════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  // merkteken + UU-logo in header en footer
  $$("[data-mark]").forEach((el) => el.innerHTML = bridgeMark(+el.dataset.size || 42, el.dataset.mark));
  $$("[data-uu-logo]").forEach((el) => {
    const s = +el.dataset.uuLogo || 38;
    el.innerHTML = `<img src="${UU_LOGO}" alt="Utrecht University" width="${s}" height="${s}">`;
  });
  $$("[data-icon]").forEach((el) => el.innerHTML = icon(el.dataset.icon, +el.dataset.size || 16, {
    strokeWidth: +el.dataset.stroke || 2,
    color: el.dataset.color || undefined,
    fill: el.dataset.fill || undefined,
  }));

  paintSaved();
  initScrollProgress();
  initReveal();

  // afspraak-knoppen overal
  $$("[data-open-form]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); openForm(); }));
  // zoekknop + sneltoets
  $$("[data-open-cmdk]").forEach((b) => b.addEventListener("click", openCmdK));
  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      cmdk ? closeCmdK() : openCmdK();
    }
    if (e.key === "Escape" && $("#panel-root")) closePanel();
  });
  // dropdown ook bruikbaar op touch
  $$(".nav-drop > .nav-link").forEach((a) => a.addEventListener("click", (e) => {
    if (window.matchMedia("(hover: none)").matches) {
      e.preventDefault();
      a.parentElement.classList.toggle("open");
    }
  }));

  const page = document.body.dataset.page;
  if (page === "home") initHome();
  else if (page === "listing") initListing(document.body.dataset.list);
  else if (page === "events") initEvents();
  else if (page === "programmes") initProgrammes();
});
