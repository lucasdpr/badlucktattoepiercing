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

  /* ---------- Explorador de piercings ---------- */
  const tabsEl = $("[data-explorer-tabs]");
  const panelEl = $("[data-explorer-panel]");
  const earEl = $("[data-ear]");
  const artEl = $("[data-explorer-art]");
  const spotsEl = $("[data-ear-spots]");

  spotsEl.innerHTML = S.earSpots
    .map(
      (sp) =>
        `<button class="ear__spot" style="left:${sp.x}%;top:${sp.y}%" data-spot="${sp.id}" aria-pressed="false">
          <span class="sr-only">${escapeHtml(sp.label)}</span><span class="ear__tip" aria-hidden="true">${escapeHtml(sp.label)}</span>
        </button>`
    )
    .join("");

  function swapPanel(html) {
    panelEl.innerHTML = html;
    panelEl.classList.remove("is-swapping");
    void panelEl.offsetWidth; // reinicia a animação
    panelEl.classList.add("is-swapping");
  }

  function panelHtml({ kicker, title, text, price, area, spot }) {
    return `
      <span class="explorer__kicker">${escapeHtml(kicker)}</span>
      <h4>${escapeHtml(title)}</h4>
      <p>${escapeHtml(text)}</p>
      <span class="explorer__price">${escapeHtml(price)}</span>
      <button class="btn btn-ink" data-book-area="${area}" ${spot ? `data-spot-label="${escapeHtml(spot)}"` : ""}>Quero esse</button>`;
  }

  function selectSpot(id) {
    const sp = S.earSpots.find((x) => x.id === id);
    const area = S.piercingAreas.find((a) => a.ear);
    $$(".ear__spot", spotsEl).forEach((b) => {
      const on = b.dataset.spot === id;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    swapPanel(panelHtml({ kicker: "Orelha", title: sp.label, text: sp.text, price: area.from, area: area.id, spot: sp.label }));
  }

  function renderArea(index) {
    const area = S.piercingAreas[index];
    $$(".tab", tabsEl).forEach((t, i) => {
      t.setAttribute("aria-selected", String(i === index));
      t.tabIndex = i === index ? 0 : -1;
    });
    panelEl.setAttribute("aria-labelledby", `tab-${area.id}`);
    earEl.hidden = !area.ear;
    artEl.hidden = !!area.ear;
    if (area.ear) {
      $$(".ear__spot", spotsEl).forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });
      swapPanel(
        panelHtml({
          kicker: `${String(index + 1).padStart(2, "0")} · Toque nos pontos`,
          title: area.label,
          text: area.text,
          price: area.from,
          area: area.id,
        })
      );
      return;
    }
    artEl.innerHTML = area.img
      ? `<span class="explorer__photo"><img src="${area.img}" alt="Exemplo de ${escapeHtml(area.label.toLowerCase())} feito pela Fran" loading="lazy"></span>`
      : `<span class="explorer__icon" aria-hidden="true"><svg><use href="#j-${area.icon}"/></svg></span>`;
    artEl.classList.remove("is-swapping");
    void artEl.offsetWidth;
    artEl.classList.add("is-swapping");
    swapPanel(
      panelHtml({
        kicker: String(index + 1).padStart(2, "0"),
        title: area.label,
        text: area.text,
        price: area.from,
        area: area.id,
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
  spotsEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-spot]");
    if (b) selectSpot(b.dataset.spot);
  });
  renderArea(0);

  panelEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-book-area]");
    if (btn) Wizard.start({ service: "piercing", areas: [btn.dataset.bookArea], spot: btn.dataset.spotLabel || null });
  });

  /* ---------- Catálogo de joias + sacolinha ---------- */
  const bag = new Set();
  const jewelryEl = $("[data-jewelry]");
  jewelryEl.innerHTML = S.jewelry
    .map(
      (j) => `
      <li class="jewel" data-jewel="${j.id}">
        <span class="jewel__icon" aria-hidden="true"><svg><use href="#j-${j.icon}"/></svg></span>
        <b>${escapeHtml(j.name)}</b>
        <small>${escapeHtml(j.material)}</small>
        <span class="jewel__price">${j.from ? "<small>a partir de </small>" : ""}${money(j.price)}</span>
        <button class="jewel__add" aria-pressed="false" aria-label="Separar ${escapeHtml(j.name)}">+</button>
      </li>`
    )
    .join("");

  const jewelName = (id) => S.jewelry.find((j) => j.id === id).name;

  function renderBag() {
    const box = $("[data-bag]");
    const names = [...bag].map(jewelName);
    box.hidden = bag.size === 0;
    $("[data-bag-count]").textContent = `${bag.size} ${bag.size === 1 ? "joia separada" : "joias separadas"}`;
    $("[data-bag-list]").textContent = names.join(" · ");
    $$(".jewel", jewelryEl).forEach((li) => {
      const on = bag.has(li.dataset.jewel);
      li.classList.toggle("is-picked", on);
      $(".jewel__add", li).setAttribute("aria-pressed", String(on));
    });
    Wizard.refreshBag();
  }

  jewelryEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".jewel__add");
    if (!btn) return;
    const id = btn.closest(".jewel").dataset.jewel;
    if (bag.has(id)) {
      bag.delete(id);
    } else {
      bag.add(id);
      toast(`${jewelName(id)} separada ✨`);
    }
    renderBag();
  });

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
  const pGallery = $("[data-piercing-gallery]");
  pGallery.innerHTML = S.piercingGallery
    .map(
      (p, i) =>
        `<button data-i="${i}" data-title="${escapeHtml(p.title)}" aria-label="Ampliar: ${escapeHtml(p.title)}">
          <img src="${p.src}" alt="${escapeHtml(p.alt)}" loading="lazy">
        </button>`
    )
    .join("");
  pGallery.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) Lightbox.open(S.piercingGallery, Number(b.dataset.i), b);
  });

  /* ---------- Portfólio com filtro ---------- */
  const grid = $("[data-portfolio]");
  const tagLabel = { colorido: "Old school colorido", blackwork: "Blackwork", fineline: "Fineline" };
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
    const dateInput = form.elements.date;
    let current = 1;
    let chosenFlash = null;
    let chosenSpot = null;

    // Datas no passado não fazem sentido
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    dateInput.min = today.toISOString().slice(0, 10);

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
        box.innerHTML = `<span>Joias separadas: <b>${[...bag].map((id) => escapeHtml(jewelName(id))).join(", ")}</b></span>
          <button type="button" data-clear-bag>limpar</button>`;
      }
    }

    function refreshFlash() {
      const box = $("[data-flash-chosen]", form);
      box.hidden = !chosenFlash;
      if (chosenFlash) {
        box.innerHTML = `<span>Flash escolhido: <b>${escapeHtml(chosenFlash.name)}</b></span>
          <button type="button" data-clear-flash>trocar</button>`;
      }
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
      if (e.target.name === "ttype" && e.target.value !== "Flash pronto" && chosenFlash) {
        chosenFlash = null;
        refreshFlash();
      }
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
      const first = form.elements.first.checked ? " É minha primeira vez!" : "";
      return `Oi, ${artist}! Me chamo ${name} e vim pelo site.${first}`;
    }

    function piercingMessage() {
      const areaIds = $$('input[name="areas"]:checked', form).map((i) => i.value);
      const areas = areaIds.map((id) =>
        id === "duvida" ? "ainda não sei o local" : S.piercingAreas.find((a) => a.id === id).label.toLowerCase()
      );
      if (chosenSpot && areaIds.includes("orelha")) areas[areaIds.indexOf("orelha")] += ` (${chosenSpot.toLowerCase()})`;
      const lines = [greeting("Fran"), "", "Quero agendar um piercing."];
      if (areas.length) lines.push(`• Local: ${areas.join(", ")}`);
      if (bag.size) lines.push(`• Joias que gostei: ${[...bag].map(jewelName).join(", ")}`);
      lines.push(`• ${whenLine()}`);
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
      lines.push(`• ${whenLine()}`);
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

    function renderPreviews() {
      const out = [];
      if (wantsPiercing()) out.push(previewCard("fran", "Piercing", piercingMessage()));
      if (wantsTattoo()) out.push(previewCard("italo", "Tattoo", tattooMessage()));
      $("[data-previews]", form).innerHTML = out.join("");
    }

    // Entrada a partir de outros pontos do site (flash, explorador, botões)
    function start({ service: svc, areas = [], flash = null, spot = null } = {}) {
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
      refreshFlash();
      refreshBag();
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
