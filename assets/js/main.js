/* =====================================================================
   FRONELLA - shared site behaviour
   (language, header, product cards, product popup, WhatsApp, toasts)
   ===================================================================== */
(function () {
  const F = window.FRONELLA;
  const LANG_KEY = "fronella-lang";

  /* ---------- safe storage ---------- */
  const store = {
    get(k) {
      try {
        return localStorage.getItem(k);
      } catch (e) {
        return null;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem(k, v);
        return true;
      } catch (e) {
        return false;
      }
    },
    del(k) {
      try {
        localStorage.removeItem(k);
      } catch (e) {}
    },
  };

  /* ---------- language ---------- */
  let lang = store.get(LANG_KEY) === "gu" ? "gu" : "en";
  const params = new URLSearchParams(location.search);
  if (params.get("lang") === "gu" || params.get("lang") === "en")
    lang = params.get("lang");

  function t(key, vars) {
    let s = (F.I18N[lang] && F.I18N[lang][key]) || F.I18N.en[key] || key;
    if (vars) for (const k in vars) s = s.split("{" + k + "}").join(vars[k]);
    return s;
  }
  const L = (obj) => (obj ? obj[lang] || obj.en || "" : "");
  const esc = (s) =>
    String(s == null ? "" : s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );

  function applyI18n(root) {
    root = root || document;
    document.documentElement.lang = lang;
    root.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    root.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      el.placeholder = t(el.dataset.i18nPh);
    });
    root.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.dataset.i18nAria));
    });
    root.querySelectorAll("[data-i18n-title]").forEach((el) => {
      el.title = t(el.dataset.i18nTitle);
    });
    root.querySelectorAll("[data-site]").forEach((el) => {
      const k = el.dataset.site,
        S = F.SITE;
      el.textContent =
        k === "phone"
          ? S.phoneDisplay
          : typeof S[k] === "object"
            ? L(S[k])
            : S[k];
    });
    root.querySelectorAll("[data-href]").forEach((el) => {
      const k = el.dataset.href;
      if (k === "tel") el.href = "tel:" + F.SITE.phoneDial;
      if (k === "wa") el.href = waLink(t("wa.contactIntro"));
      if (k === "map")
        el.href =
          "https://www.google.com/maps/search/?api=1&query=" +
          encodeURIComponent(F.SITE.mapQuery);
    });
  }
  function setLang(l) {
    lang = l;
    store.set(LANG_KEY, l);
    applyI18n();
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  /* ---------- icons ---------- */
  const I = {
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zm8.4-18.2C18.1 1.3 15.2.1 12 .1 5.5.1.1 5.4.1 12c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.7c1.7.9 3.7 1.4 5.7 1.4 6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4z"/></svg>',
    phone:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l3.5 2"/></svg>',
    close:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v6M12 7.5v.01"/></svg>',
    search:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    trash:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>',
  };

  /* ---------- data helpers ---------- */
  const products = F.PRODUCTS;
  const byId = Object.fromEntries(products.map((p) => [p.id, p]));
  const catById = Object.fromEntries(F.CATEGORIES.map((c) => [c.id, c]));
  const getProduct = (id) => byId[id];
  function allergensOf(p) {
    const set = new Set();
    (p.ingredients || []).forEach((k) => {
      const ing = F.INGREDIENTS[k];
      if (ing && ing.allergen) set.add(ing.allergen);
    });
    (p.allergensExtra || []).forEach((a) => set.add(a));
    return [...set];
  }
  const norm = (s) =>
    String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");
  function searchText(p) {
    const c = catById[p.category] || {};
    const ings = (p.ingredients || [])
      .map((k) =>
        F.INGREDIENTS[k] ? F.INGREDIENTS[k].en + " " + F.INGREDIENTS[k].gu : "",
      )
      .join(" ");
    return norm(
      [
        p.name.en,
        p.name.gu,
        c.name && c.name.en,
        c.name && c.name.gu,
        ings,
      ].join(" "),
    );
  }

  /* ---------- media ---------- */
  function mediaHTML(p, idx) {
    const imgs = p.images || [];
    if (imgs.length)
      return `<img src="${esc(imgs[idx || 0])}" alt="${esc(L(p.name))}" loading="lazy" decoding="async">`;
    return window.FronellaArt.productArt(p);
  }

  /* ---------- WhatsApp ---------- */
  function waLink(text) {
    return (
      "https://wa.me/" + F.SITE.whatsapp + "?text=" + encodeURIComponent(text)
    );
  }
  function openWhatsApp(text) {
    window.open(waLink(text), "_blank", "noopener");
  }

  /* ---------- toast ---------- */
  function toast(msg, type) {
    let wrap = document.querySelector(".toast-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.className = "toast-wrap";
      wrap.setAttribute("aria-live", "polite");
      document.body.appendChild(wrap);
    }
    const el = document.createElement("div");
    el.className = "toast" + (type === "err" ? " err" : "");
    el.innerHTML = `<span>${esc(msg)}</span><button type="button" aria-label="${esc(t("toast.close"))}">×</button>`;
    el.querySelector("button").onclick = () => el.remove();
    wrap.appendChild(el);
    setTimeout(() => el.remove(), 3800);
    while (wrap.children.length > 3) wrap.firstChild.remove();
  }

  /* ---------- product card ---------- */
  function productCard(p) {
    const c = catById[p.category];
    const off = !p.available;
    const canBox = p.available && p.giftBox !== false;
    return `<article class="p-card${off ? " is-off" : ""}" data-id="${p.id}">
      <button class="p-media" type="button" data-open="${p.id}" aria-label="${esc(t("cta.view"))}: ${esc(L(p.name))}">
        ${mediaHTML(p)}
        ${off ? `<span class="badge warn">${esc(t("card.unavailable"))}</span>` : ""}
      </button>
      <div class="p-body">
        <span class="p-cat">${esc(c ? L(c.short) : "")}</span>
        <h3 class="p-name">${esc(L(p.name))}</h3>
        <span class="p-weight">${esc(t("card.perPiece", { g: p.pieceWeight }))}</span>
        <div class="p-actions">
          <button class="btn btn-outline btn-sm" type="button" data-open="${p.id}">${esc(t("cta.view"))}</button>
          ${canBox ? `<a class="btn btn-gold btn-sm btn-icon" href="gift-boxes.html?add=${p.id}#builder" title="${esc(t("cta.addBox"))}" aria-label="${esc(t("cta.addBox"))}: ${esc(L(p.name))}">${I.gift}</a>` : ""}
        </div>
      </div>
    </article>`;
  }

  /* ---------- product modal ---------- */
  let modal, lastFocus;
  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement("div");
    modal.className = "modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "m-title");
    modal.innerHTML = `<div class="modal-backdrop" data-close></div><div class="modal-panel" tabindex="-1"></div>`;
    document.body.appendChild(modal);
    modal.addEventListener("click", (e) => {
      if (e.target.closest("[data-close]")) closeProduct();
    });
    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("open")) return;
      if (e.key === "Escape") closeProduct();
      if (e.key === "Tab") {
        // focus trap
        const f = modal.querySelectorAll(
          "button, a[href], input, select, textarea",
        );
        if (!f.length) return;
        const first = f[0],
          last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
    return modal;
  }
  let currentId = null;
  function renderModal(p, imgIdx) {
    const c = catById[p.category];
    const imgs = p.images || [];
    const ings = (p.ingredients || [])
      .map((k) =>
        F.INGREDIENTS[k]
          ? `<span class="tag">${esc(L(F.INGREDIENTS[k]))}</span>`
          : "",
      )
      .join("");
    const alg = allergensOf(p)
      .map((a) => `<span class="tag allergen">${esc(L(F.ALLERGENS[a]))}</span>`)
      .join("");
    const st = F.STORAGE[p.storage] || F.STORAGE.ambient;
    const canBox = p.available && p.giftBox !== false;
    const thumbs =
      imgs.length > 1
        ? `<div class="m-thumbs">${imgs
            .map(
              (src, i) =>
                `<button type="button" data-img="${i}" aria-current="${i === imgIdx}" aria-label="Photo ${i + 1}"><img src="${esc(src)}" alt=""></button>`,
            )
            .join("")}</div>`
        : "";
    const panel = modal.querySelector(".modal-panel");
    panel.innerHTML = `
      <button class="modal-close" type="button" data-close aria-label="${esc(t("nav.close"))}">${I.close}</button>
      <div class="m-gallery">
        <div class="m-main">${mediaHTML(p, imgIdx)}${!imgs.length ? `<span class="badge">${esc(t("card.photoSoon"))}</span>` : ""}</div>
        ${thumbs}
      </div>
      <div class="m-info">
        <span class="p-cat">${esc(c ? L(c.name) : "")}</span>
        <h2 id="m-title">${esc(L(p.name))}</h2>
        ${!p.available ? `<span class="badge warn">${esc(t("card.unavailable"))}</span>` : ""}
        <p class="m-desc">${esc(L(p.description))}</p>
        <div class="m-facts">
          <div class="m-fact"><h4>${esc(t("m.ingredients"))}</h4><div class="tags">${ings}</div></div>
          <div class="m-fact"><h4>${esc(t("m.allergens"))}</h4><div class="tags">${alg || "-"}</div><p class="small-note">${esc(t("m.mayContain"))}</p></div>
          <div class="m-fact"><h4>${esc(t("m.shelf"))}</h4><p>${esc(t("m.shelfVal", { n: p.shelfLifeDays }))}</p></div>
          <div class="m-fact"><h4>${esc(t("m.storage"))}</h4><p>${esc(L(st))}</p></div>
          <div class="m-fact"><h4>${esc(t("m.weight"))}</h4><p>${esc(t("card.perPiece", { g: p.pieceWeight }))}</p></div>
        </div>
        ${!p.verified ? `<div class="guidance">${I.info}<span>${esc(t("m.guidance"))}</span></div>` : ""}
        <div class="m-actions">
          <a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(t("m.enquire", { name: L(p.name) }))}">${I.wa}<span>${esc(t("cta.enquire"))}</span></a>
          ${canBox ? `<a class="btn btn-gold" href="gift-boxes.html?add=${p.id}#builder" data-addbox="${p.id}">${I.gift}<span>${esc(t("cta.addBox"))}</span></a>` : ""}
        </div>
      </div>`;
    panel
      .querySelectorAll("[data-img]")
      .forEach((b) => (b.onclick = () => renderModal(p, +b.dataset.img)));
  }
  function openProduct(id, opts) {
    const p = getProduct(id);
    if (!p) return;
    ensureModal();
    lastFocus = document.activeElement;
    currentId = id;
    renderModal(p, 0);
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-close").focus();
    if (!(opts && opts.noHistory)) {
      const u = new URL(location.href);
      u.searchParams.set("item", id);
      history.replaceState(null, "", u);
    }
  }
  function closeProduct() {
    if (!modal) return;
    modal.classList.remove("open");
    currentId = null;
    document.body.style.overflow = "";
    const u = new URL(location.href);
    if (u.searchParams.has("item")) {
      u.searchParams.delete("item");
      history.replaceState(null, "", u);
    }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener("click", (e) => {
    const o = e.target.closest("[data-open]");
    if (o) {
      e.preventDefault();
      openProduct(o.dataset.open);
    }
  });
  document.addEventListener("langchange", () => {
    if (currentId) renderModal(getProduct(currentId), 0);
  });

  /* ---------- header / chrome ---------- */
  function initChrome() {
    const page = document.body.dataset.page;
    document.querySelectorAll(".nav-links a").forEach((a) => {
      if (a.dataset.nav === page) a.setAttribute("aria-current", "page");
    });
    const btn = document.querySelector(".menu-btn"),
      links = document.querySelector(".nav-links");
    if (btn && links) {
      btn.addEventListener("click", () => {
        const open = links.classList.toggle("open");
        btn.setAttribute("aria-expanded", open);
      });
      links.addEventListener("click", (e) => {
        if (e.target.closest("a")) {
          links.classList.remove("open");
          btn.setAttribute("aria-expanded", "false");
        }
      });
    }
    document
      .querySelectorAll(".lang-toggle")
      .forEach((b) =>
        b.addEventListener("click", () => setLang(lang === "en" ? "gu" : "en")),
      );
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();

    // reveal on scroll
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (es) =>
          es.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("in");
              io.unobserve(en.target);
            }
          }),
        { rootMargin: "0px 0px -8% 0px" },
      );
      document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    } else
      document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("in"));
  }

  /* ---------- Home page ---------- */
  function initHome() {
    const catGrid = document.getElementById("home-cats");
    const feat = document.getElementById("home-featured");
    function render() {
      if (catGrid)
        catGrid.innerHTML = F.CATEGORIES.map((c) => {
          const rep =
            products.find((p) => p.category === c.id && p.featured) ||
            products.find((p) => p.category === c.id);
          const n = products.filter((p) => p.category === c.id).length;
          return `<a class="cat-tile" href="sweets.html?cat=${c.id}"><span class="art">${rep ? window.FronellaArt.pieceArt(rep) : ""}</span>
          <strong>${esc(L(c.short))}</strong><span>${esc(t(n === 1 ? "sweets.count1" : "sweets.count", { n }))}</span></a>`;
        }).join("");
      if (feat)
        feat.innerHTML = products
          .filter((p) => p.featured)
          .slice(0, 8)
          .map(productCard)
          .join("");
      document
        .querySelectorAll("[data-count]")
        .forEach(
          (el) => (el.textContent = t("home.badge", { n: products.length })),
        );
      const sz = document.getElementById("home-sizes");
      if (sz)
        sz.innerHTML = F.BOX_SIZES.map(
          (s) =>
            `<div class="size-card"><strong>${esc(L(s.label))}</strong><span>${esc(L(s.note))}</span></div>`,
        ).join("");
    }
    render();
    document.addEventListener("langchange", render);
  }

  /* ---------- Bulk + contact forms ---------- */
  function initForms() {
    const bulk = document.getElementById("bulk-form");
    if (bulk)
      bulk.addEventListener("submit", (e) => {
        e.preventDefault();
        const d = Object.fromEntries(new FormData(bulk));
        const err = bulk.querySelector(".form-error");
        if (!d.name || !d.occasion) {
          err.textContent = t("f.required");
          return;
        }
        err.textContent = "";
        const occ = bulk.querySelector(
          `select[name=occasion] option[value="${d.occasion}"]`,
        );
        const lines = [
          t("wa.bulkIntro"),
          "",
          `${t("wa.name")}: ${d.name}`,
          d.phone && `${t("wa.phone")}: ${d.phone}`,
          `${t("wa.occasion")}: ${occ ? occ.textContent : d.occasion}`,
          d.date && `${t("wa.date")}: ${fmtDate(d.date)}`,
          d.qty && `${t("wa.quantity")}: ${d.qty}`,
          d.sweets && `${t("wa.sweets")}: ${d.sweets}`,
          d.location && `${t("wa.location")}: ${d.location}`,
          d.notes && `${t("wa.notes")}: ${d.notes}`,
        ].filter(Boolean);
        openWhatsApp(lines.join("\n"));
      });
    const cf = document.getElementById("contact-form");
    if (cf)
      cf.addEventListener("submit", (e) => {
        e.preventDefault();
        const d = Object.fromEntries(new FormData(cf));
        openWhatsApp(
          [
            t("wa.contactIntro"),
            "",
            d.message || "",
            d.name ? `\n- ${d.name}` : "",
          ]
            .join("\n")
            .trim(),
        );
      });
    // pre-select occasion from URL (?occasion=wedding)
    const occ = params.get("occasion");
    const sel = document.querySelector("#bulk-form select[name=occasion]");
    if (occ && sel) sel.value = occ;
    const today = new Date().toISOString().slice(0, 10);
    document
      .querySelectorAll("input[type=date]")
      .forEach((i) => (i.min = today));
  }
  function fmtDate(v) {
    if (!v) return "";
    const d = new Date(v + "T00:00:00");
    try {
      return d.toLocaleDateString(lang === "gu" ? "gu-IN" : "en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "short",
      });
    } catch (e) {
      return v;
    }
  }

  /* ---------- expose + boot ---------- */
  window.Fronella = {
    t,
    L,
    esc,
    I,
    lang: () => lang,
    store,
    products,
    getProduct,
    catById,
    allergensOf,
    searchText,
    norm,
    productCard,
    mediaHTML,
    openProduct,
    waLink,
    openWhatsApp,
    toast,
    applyI18n,
    fmtDate,
  };

  document.addEventListener("DOMContentLoaded", () => {
    applyI18n();
    initChrome();
    if (document.body.dataset.page === "home") initHome();
    initForms();
    document.dispatchEvent(new CustomEvent("fronella:ready"));
    const item = params.get("item");
    if (item && getProduct(item)) openProduct(item, { noHistory: true });
  });
})();
