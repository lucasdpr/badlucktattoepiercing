(function () {
  "use strict";

  const S = window.SITE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.documentElement.classList.add("js");

  const waLink = (artistId, text) => {
    const num = S.artists[artistId].whatsapp;
    return `https://wa.me/${num}` + (text ? `?text=${encodeURIComponent(text)}` : "");
  };

  const CREDIT = { fran: "Feito pela Fran", joia: "Joia da Fran", catalogo: "Catálogo da Fran", pexels: "Foto ilustrativa" };

  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const money = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  let toastTimer;
  function toast(msg) {
    const el = $("[data-toast]");
    el.textContent = msg;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2600);
  }

  /* ---------- Links de WhatsApp vindos de data.js ---------- */
  $$("[data-wa]").forEach((a) => {
    a.href = waLink(a.dataset.wa, a.dataset.waText);
  });
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Header: sombra ao rolar + tema conforme a seção ---------- */
  const header = $("[data-header]");
  const themeMeta = $('meta[name="theme-color"]');
  const progressBar = $("[data-progress]");
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const zones = $$("[data-zone]");
  const zoneObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const dark = entry.target.dataset.zone === "dark";
        header.classList.toggle("is-dark", dark);
        themeMeta.setAttribute("content", dark ? "#15110E" : "#F6EFE6");
      });
    },
    // Linha logo abaixo do header decide o tema
    { rootMargin: "-72px 0px -90% 0px" }
  );
  zones.forEach((z) => zoneObserver.observe(z));
  // Hero não tem data-zone: ao voltar ao topo, tema claro
  new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) {
        header.classList.remove("is-dark");
        themeMeta.setAttribute("content", "#F6EFE6");
      }
    },
    { rootMargin: "-72px 0px -90% 0px" }
  ).observe($("#topo"));

  /* ---------- Menu mobile ---------- */
  const navToggle = $("[data-nav-toggle]");
  const navList = $("[data-nav-list]");
  const closeNav = () => {
    navToggle.setAttribute("aria-expanded", "false");
    navList.classList.remove("is-open");
  };
  navToggle.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") !== "true";
    navToggle.setAttribute("aria-expanded", String(open));
    navList.classList.toggle("is-open", open);
  });
  navList.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeNav();
  });

  /* ---------- Reveal ao rolar ---------- */
  if (reduceMotion || !("IntersectionObserver" in window)) {
    $$(".reveal").forEach((el) => el.classList.add("is-in"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    $$(".reveal").forEach((el) => revealObserver.observe(el));
  }

  /* ---------- Ilustrações das joias ---------- */
  // Ilustrações de "como fica" cada joia (gradientes #g-metal / #g-gem definidos no index.html)
  const EAR = `
    <path class="sc-skin" d="M118 96 C132 44 204 18 250 56 C292 90 290 166 266 214 C248 250 226 266 219 302 C213 342 202 376 168 382 C136 387 116 362 122 330 C124 312 112 300 108 282 C104 262 112 250 110 232 C108 208 104 140 118 96 Z"/>
    <path class="sc-line" d="M118 96 C132 44 204 18 250 56 C292 90 290 166 266 214 C248 250 226 266 219 302 C213 342 202 376 168 382 C136 387 116 362 122 330"/>
    <path class="sc-line sc-soft" d="M142 92 C164 62 214 54 240 84 C262 110 258 162 240 196"/>
    <path class="sc-line sc-soft" d="M150 126 C182 104 222 116 226 152 C230 186 206 214 190 246 C178 268 166 282 150 288"/>
    <path class="sc-line sc-soft" d="M122 214 C106 224 106 254 126 264"/>
    <path class="sc-line sc-soft" d="M150 290 C168 286 186 276 194 260"/>`;
  const NOSE = `
    <path class="sc-skin" d="M180 -40 C176 0 172 32 160 58 C150 80 120 106 100 122 C92 132 86 140 92 149 C96 152 100 149 104 148 C112 147 117 151 123 153 C131 156 136 164 134 180 L132 240 L280 240 L280 -40 Z"/>
    <path class="sc-line" d="M180 -40 C176 0 172 32 160 58 C150 80 120 106 100 122 C92 132 86 140 92 149 C96 152 100 149 104 148 C112 147 117 151 123 153 C131 156 136 164 134 180 L132 240"/>
    <path class="sc-line sc-soft" d="M112 140 C106 130 120 122 128 134"/>
    <path class="sc-line sc-soft" d="M196 52 C188 50 180 54 176 60"/>`;
  const SPARK = (x, y) =>
    `<path class="sc-spark" d="M${x} ${y - 9} L${x + 2} ${y - 2} L${x + 9} ${y} L${x + 2} ${y + 2} L${x} ${y + 9} L${x - 2} ${y + 2} L${x - 9} ${y} L${x - 2} ${y - 2} Z"/>`;
  const SCENES = {
    "ear-ring": `<g transform="translate(66 4) scale(.43)">${EAR}</g>
      <circle cx="178" cy="50" r="12" fill="none" stroke="url(#g-metal)" stroke-width="4.5"/>
      <circle cx="178" cy="62" r="3" fill="url(#g-gem)"/>${SPARK(200, 34)}`,
    "ear-studs": `<g transform="translate(66 4) scale(.43)">${EAR}</g>
      <circle cx="139" cy="157" r="5.5" fill="url(#g-gem)" stroke="#cfcac4"/>
      <circle cx="129" cy="143" r="3.8" fill="url(#g-gem)" stroke="#cfcac4"/>${SPARK(156, 146)}`,
    "nose-dring": `<g transform="translate(-60 -95) scale(1.55)">${NOSE}
      <path d="M112 133 L112 156 C96 156 96 133 112 133" fill="none" stroke="url(#g-metal)" stroke-width="3" stroke-linecap="round"/>
      <circle cx="112" cy="133" r="2.6" fill="url(#g-metal)"/></g>${SPARK(98, 92)}`,
    "nose-gem": `<g transform="translate(-60 -95) scale(1.55)">${NOSE}
      <circle cx="117" cy="135" r="4.5" fill="url(#g-gem)" stroke="#cfcac4"/></g>${SPARK(150, 96)}`,
    "lip-labret": `<rect class="sc-skin" width="240" height="180"/>
      <path class="sc-lip" d="M58 84 C80 66 104 62 120 72 C136 62 160 66 182 84 C162 89 140 91 120 91 C100 91 78 89 58 84 Z"/>
      <path class="sc-lip sc-lip--low" d="M58 84 C78 89 100 91 120 91 C140 91 162 89 182 84 C168 112 142 120 120 120 C98 120 72 112 58 84 Z"/>
      <circle cx="120" cy="138" r="5.5" fill="url(#g-gem)" stroke="#cfcac4"/>${SPARK(140, 130)}`,
    barbell: `<ellipse cx="120" cy="128" rx="74" ry="7" fill="rgba(59,46,38,.12)"/>
      <rect x="76" y="89" width="88" height="6" rx="3" fill="url(#g-metal)" stroke="#bdb8b2" stroke-width=".8"/>
      <circle cx="68" cy="92" r="13" fill="url(#g-metal)" stroke="#bdb8b2"/>
      <circle cx="172" cy="92" r="13" fill="url(#g-metal)" stroke="#bdb8b2"/>${SPARK(66, 86)}`,
  };

  /* ---------- Mapas do explorador (viewBox 300 x 400) ---------- */
  const SKIN_BG = `<rect class="sc-skin" width="300" height="400"/>`;
  const MAPS = {
    ear: `<path class="ear__fill" d="M118 96 C132 44 204 18 250 56 C292 90 290 166 266 214 C248 250 226 266 219 302 C213 342 202 376 168 382 C136 387 116 362 122 330 C124 312 112 300 108 282 C104 262 112 250 110 232 C108 208 104 140 118 96 Z"/>
      <path class="sc-line" d="M118 96 C132 44 204 18 250 56 C292 90 290 166 266 214 C248 250 226 266 219 302 C213 342 202 376 168 382 C136 387 116 362 122 330"/>
      <path class="sc-line sc-soft" d="M142 92 C164 62 214 54 240 84 C262 110 258 162 240 196"/>
      <path class="sc-line sc-soft" d="M150 126 C182 104 222 116 226 152 C230 186 206 214 190 246 C178 268 166 282 150 288"/>
      <path class="sc-line sc-soft" d="M160 136 C178 150 196 150 214 140"/>
      <path class="sc-line sc-soft" d="M122 214 C106 224 106 254 126 264"/>
      <path class="sc-line sc-soft" d="M150 290 C168 286 186 276 194 260"/>
      <path class="sc-line sc-soft" d="M146 176 C160 168 176 172 180 186"/>`,
    nose: `<rect width="300" height="400" fill="url(#g-skin)"/>
      <path d="M30 40 C62 20 104 22 128 44" fill="none" stroke="#6f4033" stroke-width="7" stroke-linecap="round" opacity=".5"/>
      <path d="M270 40 C238 20 196 22 172 44" fill="none" stroke="#6f4033" stroke-width="7" stroke-linecap="round" opacity=".5"/>
      <g filter="url(#f-blur)">
        <path d="M98 60 C122 130 114 200 84 262 L50 262 C64 180 64 110 76 60Z" fill="#c07f69" opacity=".4"/>
        <path d="M202 60 C178 130 186 200 216 262 L250 262 C236 180 236 110 224 60Z" fill="#c07f69" opacity=".4"/>
        <path d="M138 40 C142 130 140 200 142 258 L158 258 C160 200 158 130 162 40Z" fill="#fff" opacity=".32"/>
        <circle cx="150" cy="282" r="30" fill="#fff" opacity=".38"/>
      </g>
      <g filter="url(#f-blur)">
        <ellipse cx="96" cy="300" rx="30" ry="30" fill="#c07f69" opacity=".3"/>
        <ellipse cx="204" cy="300" rx="30" ry="30" fill="#c07f69" opacity=".3"/>
      </g>
      <path d="M112 250 C82 254 66 284 76 308 C84 326 108 332 126 324" fill="none" stroke="#b97862" stroke-width="2.6" stroke-linecap="round" opacity=".8"/>
      <path d="M188 250 C218 254 234 284 224 308 C216 326 192 332 174 324" fill="none" stroke="#b97862" stroke-width="2.6" stroke-linecap="round" opacity=".8"/>
      <path d="M126 296 C140 308 160 308 174 296" fill="none" stroke="#b97862" stroke-width="2.2" stroke-linecap="round" opacity=".55"/>
      <ellipse cx="122" cy="318" rx="16" ry="9" transform="rotate(-14 122 318)" fill="#6a3a30" opacity=".72"/>
      <ellipse cx="178" cy="318" rx="16" ry="9" transform="rotate(14 178 318)" fill="#6a3a30" opacity=".72"/>
      <path d="M146 326 C148 338 152 338 154 326" fill="none" stroke="#b97862" stroke-width="2.2" stroke-linecap="round" opacity=".7"/>
      <path d="M134 346 C132 368 128 386 124 400" fill="none" stroke="#b97862" stroke-width="2" stroke-linecap="round" opacity=".4"/>
      <path d="M166 346 C168 368 172 386 176 400" fill="none" stroke="#b97862" stroke-width="2" stroke-linecap="round" opacity=".4"/>`,
    mouth: `<rect width="300" height="400" fill="url(#g-skin)"/>
      <ellipse cx="128" cy="76" rx="8" ry="4.5" fill="#6a3a30" opacity=".55"/><ellipse cx="172" cy="76" rx="8" ry="4.5" fill="#6a3a30" opacity=".55"/>
      <path d="M104 62 C112 96 188 96 196 62" fill="none" stroke="#b97862" stroke-width="2" stroke-linecap="round" opacity=".6"/>
      <g filter="url(#f-blur)">
        <path d="M137 98 L129 172 L150 180 L171 172 L163 98Z" fill="#fff" opacity=".2"/>
        <ellipse cx="150" cy="330" rx="62" ry="30" fill="#fff" opacity=".22"/>
        <ellipse cx="150" cy="292" rx="70" ry="16" fill="#c07f69" opacity=".25"/>
      </g>
      <path d="M137 100 C134 130 130 156 128 172" fill="none" stroke="#b97862" stroke-width="2" stroke-linecap="round" opacity=".45"/>
      <path d="M163 100 C166 130 170 156 172 172" fill="none" stroke="#b97862" stroke-width="2" stroke-linecap="round" opacity=".45"/>
      <path d="M56 214 C84 222 116 224 150 224 C184 224 216 222 244 214 C236 250 204 276 150 276 C96 276 64 250 56 214 Z" fill="url(#g-lip-low)"/>
      <path d="M56 214 C74 200 102 178 126 176 C138 176 146 182 150 184 C154 182 162 176 174 176 C198 178 226 200 244 214 C216 222 184 224 150 224 C116 224 84 222 56 214 Z" fill="url(#g-lip-up)"/>
      <path d="M56 214 C84 222 116 224 150 224 C184 224 216 222 244 214" fill="none" stroke="#8a4a42" stroke-width="2.6" stroke-linecap="round"/>
      <ellipse cx="150" cy="250" rx="34" ry="7" fill="#fff" opacity=".4" filter="url(#f-blur)"/>`,
    navel: `<rect width="300" height="400" fill="url(#g-skin)"/>
      <g filter="url(#f-blur)">
        <rect x="-30" y="-20" width="100" height="440" fill="#c07f69" opacity=".38"/>
        <rect x="230" y="-20" width="100" height="440" fill="#c07f69" opacity=".38"/>
        <ellipse cx="150" cy="216" rx="30" ry="40" fill="#a8665a" opacity=".22"/>
        <path d="M146 40 C148 100 148 150 150 186 L154 186 C152 150 152 100 154 40Z" fill="#fff" opacity=".18"/>
      </g>
      <path d="M0 336 C62 326 112 354 150 396 C188 354 238 326 300 336" fill="none" stroke="#b97862" stroke-width="2.4" stroke-linecap="round" opacity=".45"/>
      <ellipse cx="150" cy="216" rx="14" ry="23" fill="url(#g-navel)"/>
      <path d="M133 206 C136 192 164 192 167 206" fill="none" stroke="#d9a490" stroke-width="3" stroke-linecap="round"/>
      <path d="M134 222 C138 240 162 240 166 222" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".5"/>`,
    nipple: `${SKIN_BG}
      <circle cx="150" cy="200" r="58" class="sc-areola"/><circle cx="150" cy="200" r="17" class="sc-areola sc-areola--in"/>`,
    surface: `<rect width="300" height="400" fill="#f7e8df"/>
      <path d="M150 14 C84 14 60 70 66 140 C70 190 80 236 100 262 L200 262 C220 236 230 190 234 140 C240 70 216 14 150 14Z" fill="url(#g-hair)"/>
      <path d="M120 150 C122 196 122 222 114 244 L186 244 C178 222 178 196 180 150Z" fill="url(#g-skin)"/>
      <path d="M114 244 C84 256 40 262 0 276 L0 400 L300 400 L300 276 C260 262 216 256 186 244 Z" fill="url(#g-skin)"/>
      <ellipse cx="150" cy="172" rx="48" ry="20" fill="#c07f69" opacity=".38" filter="url(#f-blur)"/>
      <ellipse cx="150" cy="334" rx="70" ry="50" fill="#fff" opacity=".2" filter="url(#f-blur)"/>
      <ellipse cx="150" cy="108" rx="52" ry="64" fill="url(#g-skin)"/>
      <path d="M96 104 C96 50 204 46 206 104 C194 80 172 70 150 72 C128 70 106 80 96 104Z" fill="url(#g-hair)"/>
      <path d="M116 98 C126 93 136 94 144 98" fill="none" stroke="#6f4033" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>
      <path d="M156 98 C164 94 174 93 184 98" fill="none" stroke="#6f4033" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>
      <path d="M118 112 C126 119 136 119 142 112" fill="none" stroke="#6b3a30" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M158 112 C164 119 174 119 182 112" fill="none" stroke="#6b3a30" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M150 114 C149 126 146 134 148 140 C150 143 153 143 155 140" fill="none" stroke="#b97862" stroke-width="2" stroke-linecap="round"/>
      <path d="M136 158 C143 153 150 155 150 156 C150 155 157 153 164 158 C158 167 142 167 136 158Z" fill="url(#g-lip-up)"/>
      <path d="M112 262 C86 254 54 258 22 274" fill="none" stroke="#b97862" stroke-width="3" stroke-linecap="round" opacity=".55"/>
      <path d="M188 262 C214 254 246 258 278 274" fill="none" stroke="#b97862" stroke-width="3" stroke-linecap="round" opacity=".55"/>
      <path d="M112 270 C86 262 54 266 22 282" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".35"/>
      <path d="M188 270 C214 262 246 266 278 282" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".35"/>
      <path d="M138 252 C146 259 154 259 162 252" fill="none" stroke="#b97862" stroke-width="2" stroke-linecap="round" opacity=".6"/>`,
    intimate: `<rect width="300" height="400" fill="url(#g-intimate)"/>
      <circle cx="150" cy="190" r="92" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.5"/>
      <circle cx="150" cy="190" r="70" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.5" stroke-dasharray="3 6"/>
      <path d="M150 158 L166 174 L150 222 L134 174 Z M134 174 L166 174 M142 158 L150 174 L158 158" fill="url(#g-gem)" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>
      <text x="150" y="320" text-anchor="middle" class="sc-label">atendimento reservado</text>`,
  };

  /* ---------- Explorador de piercings ---------- */
  const tabsEl = $("[data-explorer-tabs]");
  const panelEl = $("[data-explorer-panel]");
  const mapEl = $("[data-map]");
  let currentArea = null;

  function swapPanel(html) {
    panelEl.innerHTML = html;
    panelEl.classList.remove("is-swapping");
    void panelEl.offsetWidth; // reinicia a animação
    panelEl.classList.add("is-swapping");
  }

  function panelHtml({ kicker, title, text, price, area, spot, list }) {
    return `
      <span class="explorer__kicker">${escapeHtml(kicker)}</span>
      <h4>${escapeHtml(title)}</h4>
      <p>${escapeHtml(text)}</p>
      ${list ? `<ul class="explorer__list">${list.map((li) => `<li>${escapeHtml(li)}</li>`).join("")}</ul>` : ""}
      <span class="explorer__price">${escapeHtml(price)}</span>
      <button class="btn btn-ink" data-book-area="${area}" ${spot ? `data-spot-label="${escapeHtml(spot)}"` : ""}>${spot ? `Quero ${escapeHtml(spot.toLowerCase())}` : "Quero agendar"}</button>`;
  }

  function spotPoints(sp) {
    return sp.pts || [[sp.x, sp.y]];
  }

  function renderMap(area) {
    const draws = area.spots
      .filter((sp) => sp.draw)
      .map((sp) => `<g class="map__draw" data-draw="${sp.id}">${sp.draw}</g>`)
      .join("");
    const buttons = area.spots
      .map((sp) =>
        spotPoints(sp)
          .map(
            ([x, y], i) =>
              `<button class="spot" style="left:${x}%;top:${y}%" data-spot="${sp.id}" aria-pressed="false" ${i > 0 ? 'tabindex="-1" aria-hidden="true"' : ""}>
                <span class="sr-only">${escapeHtml(sp.label)}</span>${i === 0 ? `<span class="spot__tip" aria-hidden="true">${escapeHtml(sp.label)}</span>` : ""}
              </button>`
          )
          .join("")
      )
      .join("");
    mapEl.className = `map map--${area.map}`;
    mapEl.innerHTML = `<div class="map__frame"><svg class="map__art" viewBox="0 0 300 400" aria-hidden="true">${MAPS[area.map]}${draws}</svg></div>
      <div class="map__spots">${buttons}</div>`;
    mapEl.classList.remove("is-swapping");
    void mapEl.offsetWidth;
    mapEl.classList.add("is-swapping");
  }

  function selectSpot(id) {
    const area = currentArea;
    const sp = area.spots.find((x) => x.id === id);
    $$(".spot", mapEl).forEach((b) => {
      const on = b.dataset.spot === id;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    $$(".map__draw", mapEl).forEach((g) => g.classList.toggle("is-on", g.dataset.draw === id));
    swapPanel(panelHtml({ kicker: area.label, title: sp.label, text: sp.text, price: sp.from || area.from, area: area.id, spot: sp.label }));
  }

  function renderArea(index) {
    const area = S.piercingAreas[index];
    currentArea = area;
    $$(".tab", tabsEl).forEach((t, i) => {
      t.setAttribute("aria-selected", String(i === index));
      t.tabIndex = i === index ? 0 : -1;
    });
    panelEl.setAttribute("aria-labelledby", `tab-${area.id}`);
    renderMap(area);
    const hint = area.spots.length ? ` · ${area.spots.length} opções — toque nos pontos` : "";
    swapPanel(
      panelHtml({
        kicker: `${String(index + 1).padStart(2, "0")}${hint}`,
        title: area.label,
        text: area.text,
        price: area.from,
        area: area.id,
        list: area.spots.length ? null : ["Conversa antes do procedimento", "Privacidade total", "Orientação completa de cuidados"],
      })
    );
  }

  tabsEl.innerHTML = S.piercingAreas
    .map(
      (a) =>
        `<button class="tab" role="tab" id="tab-${a.id}" aria-selected="false" tabindex="-1">${escapeHtml(a.label)}</button>`
    )
    .join("");
  const tabs = $$(".tab", tabsEl);
  tabs.forEach((tab, i) => tab.addEventListener("click", () => renderArea(i)));
  tabsEl.addEventListener("keydown", (e) => {
    const current = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
    let next = null;
    if (e.key === "ArrowRight") next = (current + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    renderArea(next);
    tabs[next].focus();
  });
  mapEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-spot]");
    if (b) selectSpot(b.dataset.spot);
  });
  renderArea(0);

  panelEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-book-area]");
    if (!btn) return;
    const area = btn.dataset.bookArea;
    Wizard.start({ service: "piercing", areas: [area], spot: btn.dataset.spotLabel ? { area, label: btn.dataset.spotLabel } : null });
  });

  /* ---------- Catálogo de joias + sacolinha ---------- */
  // Sacolinha compartilhada: chave → nome que vai na mensagem
  const bag = new Map();
  const jewelryEl = $("[data-jewelry]");
  jewelryEl.innerHTML = S.jewelry
    .map(
      (j) => `
      <li class="jewel" data-jewel="${j.id}" data-view="${j.photo ? "photo" : "scene"}">
        <div class="jewel__scene">
          <svg viewBox="0 0 240 180" role="img" aria-label="Ilustração: ${escapeHtml(j.name)} ${escapeHtml(j.where || "")}">${SCENES[j.scene] || ""}</svg>
          ${j.photo ? `<img class="jewel__photo" src="${j.photo}" alt="Foto: ${escapeHtml(j.name.toLowerCase())}" loading="lazy" referrerpolicy="no-referrer">
          <span class="jewel__credit">${CREDIT[j.credit] || ""}</span>
          <span class="jewel__toggle" role="group" aria-label="Ver foto ou como fica">
            <button type="button" data-view="photo" aria-pressed="true">Foto</button><button type="button" data-view="scene" aria-pressed="false">Como fica</button>
          </span>` : ""}
          ${j.where ? `<span class="jewel__where">${escapeHtml(j.where)}</span>` : ""}
        </div>
        <div class="jewel__body">
          <b>${escapeHtml(j.name)}</b>
          <small>${escapeHtml(j.material)}</small>
          <span class="jewel__price">${j.from ? "<small>a partir de </small>" : ""}${money(j.price)}</span>
        </div>
        <button class="jewel__add" aria-pressed="false" aria-label="Separar ${escapeHtml(j.name)}">+</button>
      </li>`
    )
    .join("");

  const jewelName = (id) => S.jewelry.find((j) => j.id === id).name;
  const bagNames = () => [...bag.values()];

  function renderBag() {
    const box = $("[data-bag]");
    box.hidden = bag.size === 0;
    $("[data-bag-count]").textContent = `${bag.size} ${bag.size === 1 ? "joia separada" : "joias separadas"}`;
    $("[data-bag-list]").textContent = bagNames().join(" · ");
    $$(".jewel", jewelryEl).forEach((li) => {
      const on = bag.has(li.dataset.jewel);
      li.classList.toggle("is-picked", on);
      $(".jewel__add", li).setAttribute("aria-pressed", String(on));
    });
    syncShop();
    Wizard.refreshBag();
  }

  function setJewelView(li, view) {
    li.dataset.view = view;
    $$(".jewel__toggle button", li).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.view === view)));
  }
  $$(".jewel__photo", jewelryEl).forEach((img) => {
    // Foto externa fora do ar: fica só a ilustração
    const fail = () => {
      const li = img.closest(".jewel");
      setJewelView(li, "scene");
      li.classList.add("no-photo");
    };
    img.addEventListener("error", fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });

  jewelryEl.addEventListener("click", (e) => {
    const viewBtn = e.target.closest(".jewel__toggle button");
    if (viewBtn) return setJewelView(viewBtn.closest(".jewel"), viewBtn.dataset.view);
    const btn = e.target.closest(".jewel__add");
    if (!btn) return;
    const id = btn.closest(".jewel").dataset.jewel;
    if (bag.has(id)) {
      bag.delete(id);
    } else {
      bag.set(id, jewelName(id));
      toast(`${jewelName(id)} separada ✨`);
    }
    renderBag();
  });

  /* ---------- Vitrine de joias ---------- */
  const SHOP_PREVIEW = 12;
  const SH = S.shop;
  const shopEl = $("[data-shop]");
  const shopFiltersEl = $("[data-shop-filters]");
  const shopMoreBtn = $("[data-shop-more]");
  const shopKey = (p) => `shop:${p.id}`;
  let shopFilter = "all";
  let shopExpanded = false;

  const catLabel = (id) => SH.categories.find((c) => c.id === id).label;

  shopEl.innerHTML = SH.products
    .map(
      (p) => `
      <li class="shop-card" data-product="${p.id}" data-cat="${p.cat}">
        <button class="shop-card__stage" data-zoom="${p.id}" aria-label="Ampliar: ${escapeHtml(p.name)}">
          <img class="shop-card__photo" src="assets/img/vitrine/${p.id}.webp" alt="${escapeHtml(p.name)}" loading="lazy" width="800" height="800">
        </button>
        <div class="shop-card__body">
          <span class="shop-card__cat">${escapeHtml(catLabel(p.cat))}</span>
          <b>${escapeHtml(p.name)}</b>
          <div class="shop-card__foot">
            <span class="shop-card__price">${p.price ? money(p.price) : "Valor sob consulta"}</span>
            <button class="btn btn-small btn-ink shop-card__add" aria-pressed="false">Separar</button>
          </div>
        </div>
      </li>`
    )
    .join("");

  function syncShop() {
    $$(".shop-card", shopEl).forEach((li) => {
      const p = SH.products.find((x) => x.id === li.dataset.product);
      const on = bag.has(shopKey(p));
      li.classList.toggle("is-picked", on);
      const btn = $(".shop-card__add", li);
      btn.textContent = on ? "Separada ✓" : "Separar";
      btn.setAttribute("aria-pressed", String(on));
    });
  }

  let visibleShop = [];
  function applyShop(animate) {
    visibleShop = [];
    let shown = 0;
    $$(".shop-card", shopEl).forEach((li) => {
      const match = shopFilter === "all" || li.dataset.cat === shopFilter;
      const extra = match && shopFilter === "all" && !shopExpanded && shown >= SHOP_PREVIEW;
      li.hidden = !match || extra;
      li.classList.remove("is-entering");
      if (match && !extra) {
        shown++;
        visibleShop.push(SH.products.find((x) => x.id === li.dataset.product));
        if (animate && !reduceMotion) {
          void li.offsetWidth;
          li.classList.add("is-entering");
        }
      }
    });
    const hasMore = shopFilter === "all" && SH.products.length > SHOP_PREVIEW;
    shopMoreBtn.hidden = !hasMore;
    shopMoreBtn.textContent = shopExpanded ? "Mostrar menos" : `Ver todas as ${SH.products.length} joias`;
    shopMoreBtn.setAttribute("aria-expanded", String(shopExpanded));
  }

  shopEl.addEventListener("click", (e) => {
    const li = e.target.closest(".shop-card");
    if (!li) return;
    const p = SH.products.find((x) => x.id === li.dataset.product);
    if (e.target.closest(".shop-card__add")) {
      const key = shopKey(p);
      if (bag.has(key)) bag.delete(key);
      else {
        bag.set(key, p.name);
        toast(`${p.name} separada ✨`);
      }
      renderBag();
      return;
    }
    if (e.target.closest("[data-zoom]")) {
      const list = visibleShop.map((x) => ({ src: `assets/img/vitrine/${x.id}.webp`, alt: x.name, title: x.name }));
      Lightbox.open(list, visibleShop.indexOf(p), e.target.closest("[data-zoom]"));
    }
  });

  shopFiltersEl.innerHTML = [{ id: "all", label: "Todas" }, ...SH.categories]
    .map((c, i) => `<button class="tab" data-shop-filter="${c.id}" aria-pressed="${i === 0}">${escapeHtml(c.label)}</button>`)
    .join("");
  shopFiltersEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-shop-filter]");
    if (!b) return;
    shopFilter = b.dataset.shopFilter;
    $$("[data-shop-filter]", shopFiltersEl).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    applyShop(true);
  });
  shopMoreBtn.addEventListener("click", () => {
    shopExpanded = !shopExpanded;
    applyShop(shopExpanded);
    if (!shopExpanded) $(".shop").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });
  applyShop(false);

  /* ---------- Lightbox (compartilhado) ---------- */
  const Lightbox = (() => {
    const dlg = $("[data-lightbox]");
    const img = $("[data-lb-img]");
    const title = $("[data-lb-title]");
    const counter = $("[data-lb-counter]");
    const link = $("[data-lb-link]");
    let items = [];
    let index = 0;
    let opener = null;

    function show(i) {
      index = (i + items.length) % items.length;
      const it = items[index];
      img.src = it.src;
      img.alt = it.alt || "";
      title.textContent = it.title || "";
      counter.textContent = `${index + 1} / ${items.length}`;
      link.hidden = !it.link;
      if (it.link) link.href = it.link;
    }

    function open(list, i, from) {
      items = list;
      opener = from || null;
      show(i);
      if (typeof dlg.showModal === "function") dlg.showModal();
      else dlg.setAttribute("open", "");
      document.body.style.overflow = "hidden";
    }

    function close() {
      if (dlg.open) dlg.close();
    }

    dlg.addEventListener("close", () => {
      document.body.style.overflow = "";
      if (opener) opener.focus();
    });
    $("[data-lb-close]").addEventListener("click", close);
    $("[data-lb-prev]").addEventListener("click", () => show(index - 1));
    $("[data-lb-next]").addEventListener("click", () => show(index + 1));
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg) close();
    });
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") show(index + 1);
      if (e.key === "ArrowLeft") show(index - 1);
    });

    // Swipe no celular
    let startX = null;
    const fig = $(".lightbox__fig");
    fig.addEventListener("pointerdown", (e) => (startX = e.clientX));
    fig.addEventListener("pointerup", (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
      startX = null;
    });

    return { open };
  })();

  /* ---------- Galeria piercing ---------- */
  const GALLERY_PREVIEW = 8;
  const pGallery = $("[data-piercing-gallery]");
  const gFilters = $("[data-gallery-filters]");
  const gMore = $("[data-gallery-more]");
  let gFilter = "all";
  let gExpanded = false;
  let gVisible = [];

  pGallery.innerHTML = S.piercingGallery
    .map(
      (p, i) =>
        `<button data-i="${i}" data-cat="${p.cat}" data-title="${escapeHtml(p.title)}" aria-label="Ampliar: ${escapeHtml(p.title)}">
          <img src="${p.src}" alt="${escapeHtml(p.alt)}" loading="lazy" width="720" height="900">
        </button>`
    )
    .join("");

  function applyGallery(animate) {
    gVisible = [];
    let shown = 0;
    $$("button", pGallery).forEach((b) => {
      const match = gFilter === "all" || b.dataset.cat === gFilter;
      const extra = match && gFilter === "all" && !gExpanded && shown >= GALLERY_PREVIEW;
      b.hidden = !match || extra;
      b.classList.remove("is-entering");
      if (match && !extra) {
        shown++;
        gVisible.push(S.piercingGallery[Number(b.dataset.i)]);
        if (animate && !reduceMotion) {
          void b.offsetWidth;
          b.classList.add("is-entering");
        }
      }
    });
    const hasMore = gFilter === "all" && S.piercingGallery.length > GALLERY_PREVIEW;
    gMore.hidden = !hasMore;
    gMore.textContent = gExpanded ? "Mostrar menos" : `Ver todos os ${S.piercingGallery.length} trabalhos`;
    gMore.setAttribute("aria-expanded", String(gExpanded));
  }

  gFilters.innerHTML = [{ id: "all", label: "Todos" }, ...S.piercingGalleryCats]
    .map((c, i) => `<button class="tab" data-g-filter="${c.id}" aria-pressed="${i === 0}">${escapeHtml(c.label)}</button>`)
    .join("");
  gFilters.addEventListener("click", (e) => {
    const b = e.target.closest("[data-g-filter]");
    if (!b) return;
    gFilter = b.dataset.gFilter;
    $$("[data-g-filter]", gFilters).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    applyGallery(true);
  });
  gMore.addEventListener("click", () => {
    gExpanded = !gExpanded;
    applyGallery(gExpanded);
    if (!gExpanded) $(".gallery-wrap").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });
  pGallery.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    const item = S.piercingGallery[Number(b.dataset.i)];
    Lightbox.open(gVisible, gVisible.indexOf(item), b);
  });
  applyGallery(false);

  /* ---------- Aviso de agenda do Italo ---------- */
  (() => {
    const cfg = S.agenda;
    const el = $("[data-agenda]");
    if (!cfg || !cfg.enabled || !el) return;
    el.hidden = false;
    el.dataset.status = cfg.status || "open";
    $("[data-agenda-text]", el).textContent = cfg.text;
  })();

  /* ---------- Estilos do Italo ---------- */
  const STYLE_ICONS = {
    star: `<polygon points="24.0,4.0 29.0,17.1 43.0,17.8 32.1,26.6 35.8,40.2 24.0,32.5 12.2,40.2 15.9,26.6 5.0,17.8 19.0,17.1" fill="#e3a92b" stroke="#15110e" stroke-width="2" stroke-linejoin="round"/><path d="M24 24 L24.0 4.0 L29.0 17.1 Z" fill="#a8741c"/><path d="M24 24 L43.0 17.8 L32.1 26.6 Z" fill="#a8741c"/><path d="M24 24 L35.8 40.2 L24.0 32.5 Z" fill="#a8741c"/><path d="M24 24 L12.2 40.2 L15.9 26.6 Z" fill="#a8741c"/><path d="M24 24 L5.0 17.8 L19.0 17.1 Z" fill="#a8741c"/>`,
    blackwork: `<path d="M30 6 A18 18 0 1 0 42 34 A15 15 0 1 1 30 6 Z" fill="#15110e"/>`,
    dots: [0, 1, 2, 3, 4]
      .map((r) => [0, 1, 2, 3, 4].map((c) => `<circle cx="${8 + c * 8}" cy="${8 + r * 8}" r="${(3.2 - r * 0.55).toFixed(2)}" fill="#15110e"/>`).join(""))
      .join(""),
    line: `<path d="M6 34 C14 10 22 10 24 24 C26 38 34 38 42 14" fill="none" stroke="#15110e" stroke-width="1.6" stroke-linecap="round"/><circle cx="42" cy="14" r="2" fill="#15110e"/>`,
    letter: `<text x="24" y="33" text-anchor="middle" font-family="Yellowtail, cursive" font-size="26" fill="#15110e">Aa</text>`,
  };
  const stylesEl = $("[data-styles]");
  stylesEl.innerHTML = S.styles
    .map(
      (st) => `
      <li>
        <button class="style-card${st.note ? " style-card--main" : ""}" data-style="${escapeHtml(st.name)}">
          ${st.note ? `<span class="style-card__ribbon">${escapeHtml(st.note)}</span>` : ""}
          <span class="style-card__icon" aria-hidden="true"><svg viewBox="0 0 48 48">${STYLE_ICONS[st.icon] || ""}</svg></span>
          <b>${escapeHtml(st.name)}</b>
          <span>${escapeHtml(st.text)}</span>
          <span class="style-card__cta">Orçar nesse estilo <svg aria-hidden="true"><use href="#i-arrow"/></svg></span>
        </button>
      </li>`
    )
    .join("");
  stylesEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-style]");
    if (b) Wizard.start({ service: "tattoo", style: b.dataset.style });
  });

  /* ---------- Portfólio com filtro ---------- */
  const grid = $("[data-portfolio]");
  const tagLabel = { colorido: "Old school colorido", blackwork: "Blackwork" };
  grid.innerHTML = S.portfolio
    .map(
      (p, i) =>
        `<button class="t-card" data-i="${i}" data-tags="${p.tags.join(" ")}" aria-label="Ampliar: ${escapeHtml(p.title)}">
          <span class="t-card__img"><img src="${p.src}" alt="${escapeHtml(p.alt)}" loading="lazy"></span>
          <span class="t-card__label">${escapeHtml(p.title)}<small>${escapeHtml(tagLabel[p.tags[0]] || "")}</small></span>
        </button>`
    )
    .join("");

  // Mostra só os primeiros trabalhos em "Todos"; o resto aparece em "Ver mais"
  const PREVIEW = 8;
  const moreBtn = $("[data-more]");
  let filter = "all";
  let expanded = false;
  let visiblePortfolio = [];

  function applyPortfolio(animate) {
    visiblePortfolio = [];
    let shown = 0;
    $$(".t-card", grid).forEach((card) => {
      const match = filter === "all" || card.dataset.tags.split(" ").includes(filter);
      const extra = match && filter === "all" && !expanded && shown >= PREVIEW;
      card.classList.toggle("is-hidden", !match);
      card.classList.toggle("is-extra", extra);
      card.classList.remove("is-entering");
      if (match && !extra) {
        shown++;
        visiblePortfolio.push(S.portfolio[Number(card.dataset.i)]);
        if (animate) {
          void card.offsetWidth;
          card.classList.add("is-entering");
        }
      }
    });
    const hasMore = filter === "all" && S.portfolio.length > PREVIEW;
    moreBtn.hidden = !hasMore;
    moreBtn.textContent = expanded ? "Mostrar menos" : "Ver mais trabalhos";
    moreBtn.setAttribute("aria-expanded", String(expanded));
  }

  $("[data-filters]").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    filter = btn.dataset.filter;
    $$("[data-filter]").forEach((b) => {
      const on = b === btn;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    applyPortfolio(true);
  });
  moreBtn.addEventListener("click", () => {
    expanded = !expanded;
    applyPortfolio(expanded);
    if (!expanded) grid.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });
  applyPortfolio(false);

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".t-card");
    if (!card) return;
    const item = S.portfolio[Number(card.dataset.i)];
    Lightbox.open(visiblePortfolio, visiblePortfolio.indexOf(item), card);
  });

  /* ---------- Flash ---------- */
  const flashEl = $("[data-flash]");
  flashEl.innerHTML = S.flashes
    .map(
      (f) => `
      <article class="flash-card" data-flash-id="${f.id}">
        <div class="flash-card__img"><img src="${f.src}" alt="Flash: ${escapeHtml(f.name)}" loading="lazy"></div>
        <h4>${escapeHtml(f.name)}</h4>
        <div class="flash-card__meta"><span>${escapeHtml(f.size)}</span><span>${escapeHtml(f.price)}</span></div>
        <button class="btn btn-red" data-want="${f.id}">Quero esse</button>
      </article>`
    )
    .join("");
  flashEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-want]");
    if (!btn) return;
    const flash = S.flashes.find((f) => f.id === btn.dataset.want);
    Wizard.start({ service: "tattoo", flash });
  });

  // Inclinação 3D nos cards (apenas mouse)
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    $$(".flash-card", flashEl).forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => (card.style.transform = ""));
    });
  }

  /* ---------- Tire sua sorte (baralho) ---------- */
  const deckEl = $("[data-deck]");
  const drawBtn = $("[data-draw]");
  const drawnFront = $("[data-drawn-front]");
  const drawStatus = $("[data-draw-status]");
  let lastDraw = null;
  let drawing = false;

  drawBtn.addEventListener("click", () => {
    if (drawing) return;
    drawing = true;
    const pool = S.flashes.filter((f) => f.id !== lastDraw);
    const pick = pool[Math.floor(Math.random() * pool.length)];
    lastDraw = pick.id;
    deckEl.classList.remove("is-revealed");
    deckEl.classList.add("is-shuffling");
    const reveal = () => {
      drawnFront.innerHTML = `
        <span class="drawn__corner" aria-hidden="true">13</span>
        <span class="drawn__img"><img src="${pick.src}" alt="Flash: ${escapeHtml(pick.name)}"></span>
        <b class="drawn__name">${escapeHtml(pick.name)}</b>
        <span class="drawn__meta">${escapeHtml(pick.size)} · ${escapeHtml(pick.price)}</span>
        <button class="btn btn-red btn-small" data-want="${pick.id}">Quero esse</button>`;
      deckEl.classList.remove("is-shuffling");
      deckEl.classList.add("is-revealed");
      drawBtn.textContent = "Tirar outra carta";
      drawStatus.textContent = `Sua carta: ${pick.name}.`;
      drawing = false;
    };
    // Espera a carta voltar ao monte antes de trocar a frente
    setTimeout(reveal, reduceMotion ? 0 : 900);
  });
  deckEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-want]");
    if (btn) Wizard.start({ service: "tattoo", flash: S.flashes.find((f) => f.id === btn.dataset.want) });
  });

  /* ---------- FAQ ---------- */
  $("[data-faq]").innerHTML = S.faq
    .map((f) => `<details><summary>${escapeHtml(f.q)}</summary><p>${escapeHtml(f.a)}</p></details>`)
    .join("");

  /* ---------- FAB WhatsApp ---------- */
  const fabBtn = $("[data-fab-btn]");
  const fabMenu = $("[data-fab-menu]");
  const setFab = (open) => {
    fabBtn.setAttribute("aria-expanded", String(open));
    fabMenu.hidden = !open;
  };
  fabBtn.addEventListener("click", () => setFab(fabMenu.hidden));
  document.addEventListener("click", (e) => {
    if (!e.target.closest("[data-fab]")) setFab(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setFab(false);
      closeNav();
    }
  });

  /* ---------- Agendamento (wizard) ---------- */
  const Wizard = (() => {
    const form = $("[data-wizard]");
    const steps = $$(".step", form);
    const progress = $$(".wizard__progress li", form);
    const prevBtn = $("[data-prev]", form);
    const nextBtn = $("[data-next]", form);
    const sizeOut = $("[data-size-out]", form);
    let current = 1;
    let chosenFlash = null;
    let chosenSpot = null;

    // Próximos 14 dias como botões (mais rápido que um calendário, principalmente no celular)
    const pad = (n) => String(n).padStart(2, "0");
    const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });
    const month = new Intl.DateTimeFormat("pt-BR", { month: "short" });
    const clean = (str) => str.replace(".", "").replace(/^./, (c) => c.toUpperCase());
    const days = [`<label class="day day--any"><input type="radio" name="date" value="" checked><span><small>Qualquer</small><b>✦</b><small>dia</small></span></label>`];
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const top = i === 0 ? "Hoje" : i === 1 ? "Amanhã" : clean(weekday.format(d));
      days.push(`<label class="day"><input type="radio" name="date" value="${iso(d)}"><span><small>${top}</small><b>${d.getDate()}</b><small>${clean(month.format(d))}</small></span></label>`);
    }
    $("[data-days]", form).innerHTML = days.join("");

    $("[data-style-pills]", form).innerHTML = S.styles
      .map((st) => `<label class="pill"><input type="radio" name="tstyle" value="${escapeHtml(st.name)}"><span>${escapeHtml(st.name)}</span></label>`)
      .join("") +
      `<label class="pill"><input type="radio" name="tstyle" value="Ainda não sei"><span>Não sei</span></label>`;

    $("[data-area-pills]", form).innerHTML = S.piercingAreas
      .map(
        (a) =>
          `<label class="pill"><input type="checkbox" name="areas" value="${a.id}"><span>${escapeHtml(a.label)}</span></label>`
      )
      .join("") +
      `<label class="pill"><input type="checkbox" name="areas" value="duvida"><span>Ainda não sei</span></label>`;

    const service = () => form.elements.service.value;
    const wantsPiercing = () => ["piercing", "both"].includes(service());
    const wantsTattoo = () => ["tattoo", "both"].includes(service());

    function syncDetailBlocks() {
      $('[data-for="piercing"]', form).classList.toggle("is-visible", wantsPiercing());
      $('[data-for="tattoo"]', form).classList.toggle("is-visible", wantsTattoo());
    }

    function refreshBag() {
      const box = $("[data-bag-inline]", form);
      box.hidden = bag.size === 0;
      if (bag.size) {
        box.innerHTML = `<span>Joias separadas: <b>${bagNames().map(escapeHtml).join(", ")}</b></span>
          <button type="button" data-clear-bag>limpar</button>`;
      }
      updatePhone();
    }

    function refreshFlash() {
      const box = $("[data-flash-chosen]", form);
      box.hidden = !chosenFlash;
      if (chosenFlash) {
        box.innerHTML = `<span>Flash escolhido: <b>${escapeHtml(chosenFlash.name)}</b></span>
          <button type="button" data-clear-flash>trocar</button>`;
      }
      updatePhone();
    }

    form.addEventListener("click", (e) => {
      if (e.target.closest("[data-clear-bag]")) {
        bag.clear();
        renderBag();
      }
      if (e.target.closest("[data-clear-flash]")) {
        chosenFlash = null;
        refreshFlash();
      }
    });

    function go(n) {
      current = n;
      steps.forEach((s) => s.classList.toggle("is-active", Number(s.dataset.step) === n));
      progress.forEach((li, i) => {
        li.classList.toggle("is-active", i + 1 === n);
        li.classList.toggle("is-done", i + 1 < n);
      });
      prevBtn.hidden = n === 1;
      nextBtn.hidden = n === steps.length;
      if (n === 2) syncDetailBlocks();
      if (n === 4) renderPreviews();
      $$(".field-error", form).forEach((el) => (el.hidden = true));
      updatePhone();
    }

    function focusStep() {
      const title = $(".step.is-active .step__title", form);
      title.setAttribute("tabindex", "-1");
      title.focus({ preventScroll: true });
      const top = form.getBoundingClientRect().top + window.scrollY - 90;
      if (form.getBoundingClientRect().top < 60) window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    }

    function showError(key) {
      const el = $(`[data-error="${key}"]`, form);
      el.hidden = false;
      return false;
    }

    function validate(n) {
      if (n === 1 && !service()) return showError("service");
      if (n === 2) {
        const hasArea = $$('input[name="areas"]:checked', form).length > 0 || bag.size > 0;
        const hasTattoo = !!form.elements.ttype.value || !!chosenFlash || form.elements.tidea.value.trim();
        if ((wantsPiercing() && !hasArea) || (wantsTattoo() && !hasTattoo)) return showError("details");
      }
      if (n === 3) {
        const name = form.elements.name;
        const ok = name.value.trim().length > 1;
        name.classList.toggle("is-invalid", !ok);
        if (!ok) {
          name.focus();
          return showError("name");
        }
      }
      return true;
    }

    nextBtn.addEventListener("click", () => {
      if (!validate(current)) return;
      go(current + 1);
      focusStep();
    });
    prevBtn.addEventListener("click", () => {
      go(current - 1);
      focusStep();
    });
    form.addEventListener("submit", (e) => e.preventDefault());
    form.addEventListener("change", (e) => {
      if (e.target.name === "service") {
        syncDetailBlocks();
        $('[data-error="service"]', form).hidden = true;
      }
      if (e.target.name === "care") syncCareNote();
      if (e.target.name === "ttype" && e.target.value !== "Flash pronto" && chosenFlash) {
        chosenFlash = null;
        refreshFlash();
      }
      updatePhone();
    });
    form.elements.tsize.addEventListener("input", (e) => {
      sizeOut.textContent = `${e.target.value}${Number(e.target.value) >= 40 ? "+" : ""} cm`;
    });

    function formatDate(value) {
      if (!value) return "";
      const [y, m, d] = value.split("-");
      const date = new Date(Number(y), Number(m) - 1, Number(d));
      return date.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit" });
    }

    function whenLine() {
      const date = formatDate(form.elements.date.value);
      const shift = form.elements.shift.value;
      if (date && shift) return `Prefiro ${date}, de ${shift}.`;
      if (date) return `Prefiro ${date}.`;
      if (shift) return `Prefiro de ${shift}.`;
      return "Tenho flexibilidade de data.";
    }

    function greeting(artist) {
      const name = form.elements.name.value.trim();
      return `Oi, ${artist}! Me chamo ${name || "…"} e vim pelo site.`;
    }

    // "Pra vocês saberem": primeira vez, medo de agulha, saúde, acessibilidade
    const CARE = {
      first: "É minha primeira vez",
      fear: "Tenho medo de agulha, então prefiro ir com calma",
      health: "Tenho alergia ou alguma restrição de saúde",
      access: "Preciso de acessibilidade no atendimento",
    };
    const careNote = $("[data-care-note]", form);
    function careLines() {
      const picked = $$('input[name="care"]:checked', form).map((i) => CARE[i.value]);
      const note = form.elements.carenote.value.trim();
      if (!picked.length && !note) return [];
      const lines = ["", "Pra vocês saberem:", ...picked.map((t) => `• ${t}`)];
      if (note) lines.push(`• ${note}`);
      return lines;
    }
    function syncCareNote() {
      // O campo de detalhes aparece para medo, saúde ou acessibilidade
      careNote.hidden = !$$('input[name="care"]:checked', form).some((i) => i.value !== "first") && !form.elements.carenote.value.trim();
    }

    function piercingMessage() {
      const areaIds = $$('input[name="areas"]:checked', form).map((i) => i.value);
      const areas = areaIds.map((id) =>
        id === "duvida" ? "ainda não sei o local" : S.piercingAreas.find((a) => a.id === id).label.toLowerCase()
      );
      if (chosenSpot && areaIds.includes(chosenSpot.area)) areas[areaIds.indexOf(chosenSpot.area)] += ` (${chosenSpot.label.toLowerCase()})`;
      const lines = [greeting("Fran"), "", "Quero agendar um piercing."];
      if (areas.length) lines.push(`• Local: ${areas.join(", ")}`);
      if (bag.size) lines.push(`• Joias que gostei: ${bagNames().join(", ")}`);
      lines.push(`• ${whenLine()}`, ...careLines());
      return lines.join("\n");
    }

    function tattooMessage() {
      const f = form.elements;
      const lines = [greeting("Italo"), "", "Quero fazer uma tattoo."];
      if (chosenFlash) lines.push(`• Flash: ${chosenFlash.name}`);
      else if (f.ttype.value) lines.push(`• Tipo: ${f.ttype.value}`);
      if (f.tstyle.value) lines.push(`• Estilo: ${f.tstyle.value}`);
      if (f.tplace.value.trim()) lines.push(`• Local: ${f.tplace.value.trim()}`);
      if (!chosenFlash) lines.push(`• Tamanho aproximado: ${sizeOut.textContent}`);
      if (f.tidea.value.trim()) lines.push(`• Ideia: ${f.tidea.value.trim()}`);
      lines.push(`• ${whenLine()}`, ...careLines());
      if (f.ttype.value === "Tenho uma referência") lines.push("", "Vou te mandar a referência aqui na conversa.");
      return lines.join("\n");
    }

    function previewCard(artistId, label, message) {
      const a = S.artists[artistId];
      return `
        <div class="preview">
          <div class="preview__head"><svg aria-hidden="true"><use href="#i-whats"/></svg>${escapeHtml(a.name)} · ${label}<small>${escapeHtml(a.phoneLabel)}</small></div>
          <div class="preview__bubble">${escapeHtml(message)}</div>
          <a class="btn" href="${waLink(artistId, message)}" target="_blank" rel="noopener">
            <svg aria-hidden="true"><use href="#i-whats"/></svg>Enviar para ${escapeHtml(a.name.split(" ")[0])}
          </a>
        </div>`;
    }

    // Celular com a mensagem montada ao vivo
    const phoneChat = $("[data-phone-chat]");
    const phoneName = $("[data-phone-name]");
    const phoneSub = $("[data-phone-sub]");
    const phoneAvatar = $("[data-phone-avatar]");
    const AVATAR = {
      fran: `<img src="assets/img/fran-avatar.webp" alt="">`,
      italo: `<img src="assets/img/italo/avatar.webp" alt="">`,
      none: `<img src="assets/img/logo.png" alt="">`,
    };
    function updatePhone() {
      const targets = [];
      if (wantsPiercing()) targets.push(["fran", piercingMessage()]);
      if (wantsTattoo()) targets.push(["italo", tattooMessage()]);
      if (targets.length === 1) {
        const a = S.artists[targets[0][0]];
        phoneAvatar.innerHTML = AVATAR[targets[0][0]];
        phoneName.textContent = a.name;
        phoneSub.textContent = a.phoneLabel;
      } else if (targets.length === 2) {
        phoneAvatar.innerHTML = AVATAR.none;
        phoneName.textContent = "Fran & Italo";
        phoneSub.textContent = "2 mensagens";
      } else {
        phoneAvatar.innerHTML = AVATAR.none;
        phoneName.textContent = "Bad Luck";
        phoneSub.textContent = "Tattoo & Piercing";
      }
      const count = String(targets.length);
      const grew = phoneChat.dataset.count !== count;
      phoneChat.dataset.count = count;
      phoneChat.innerHTML = targets.length
        ? targets
            .map(
              ([id, msg]) =>
                `${targets.length > 1 ? `<span class="phone__to">Para ${escapeHtml(S.artists[id].name.split(" ")[0])}</span>` : ""}
                <div class="phone__bubble${grew ? " is-new" : ""}">${escapeHtml(msg)}<span class="phone__time">agora ✓✓</span></div>`
            )
            .join("")
        : `<p class="phone__hint">Escolha o serviço ao lado e veja sua mensagem sendo montada aqui ✨</p>`;
      phoneChat.scrollTop = phoneChat.scrollHeight;
    }
    form.addEventListener("input", updatePhone);

    function renderPreviews() {
      const out = [];
      if (wantsPiercing()) out.push(previewCard("fran", "Piercing", piercingMessage()));
      if (wantsTattoo()) out.push(previewCard("italo", "Tattoo", tattooMessage()));
      $("[data-previews]", form).innerHTML = out.join("");
    }

    // Entrada a partir de outros pontos do site (flash, explorador, botões)
    function start({ service: svc, areas = [], flash = null, spot = null, style = null } = {}) {
      form.reset();
      sizeOut.textContent = "10 cm";
      chosenFlash = flash;
      chosenSpot = spot;
      if (svc) form.elements.service.value = svc;
      areas.forEach((id) => {
        const box = $(`input[name="areas"][value="${id}"]`, form);
        if (box) box.checked = true;
      });
      if (flash) form.elements.ttype.value = "Flash pronto";
      if (style) form.elements.tstyle.value = style;
      refreshFlash();
      refreshBag();
      syncCareNote();
      go(svc ? 2 : 1);
      $("#agendar").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      if (flash) toast(`Flash “${flash.name}” selecionado`);
    }

    go(1);
    return { start, refreshBag };
  })();

  $$("[data-book]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const svc = btn.dataset.book === "fran" ? "piercing" : "tattoo";
      Wizard.start({ service: svc });
    })
  );
})();
