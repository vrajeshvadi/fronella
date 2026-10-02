/* =====================================================================
   FRONELLA — Custom gift box builder
   Capacity comes from data.js → BOX_SIZES, piece weights from products.js.
   Selection is saved on this device (localStorage) automatically.
   ===================================================================== */
document.addEventListener("fronella:ready", () => {
  const Fr = window.Fronella, F = window.FRONELLA, { t, L, esc, I } = Fr;
  const root = document.getElementById("builder");
  if (!root) return;
  const KEY = "fronella-giftbox-v1";
  const sizes = F.BOX_SIZES;
  const sizeById = id => sizes.find(s => s.id === id);
  const eligible = Fr.products.filter(p => p.giftBox !== false);

  /* ---------- state ---------- */
  let state = { size: (sizes[1] || sizes[0]).id, items: {}, boxes: 1, date: "", notes: "", name: "" };
  try {
    const saved = JSON.parse(Fr.store.get(KEY) || "null");
    if (saved && typeof saved === "object") {
      if (sizeById(saved.size)) state.size = saved.size;
      if (saved.items) for (const id in saved.items) {
        const p = Fr.getProduct(id), q = parseInt(saved.items[id], 10);
        if (p && p.giftBox !== false && p.available && q > 0) state.items[id] = q;
      }
      state.boxes = Math.min(999, Math.max(1, parseInt(saved.boxes, 10) || 1));
      ["date", "notes", "name"].forEach(k => { if (typeof saved[k] === "string") state[k] = saved[k]; });
    }
  } catch (e) { /* ignore broken saves */ }

  const cap = () => sizeById(state.size).grams;
  const total = () => Object.entries(state.items).reduce((s, [id, q]) => s + (Fr.getProduct(id).pieceWeight * q), 0);
  const remaining = () => cap() - total();
  let savedOK = true;
  function save() { savedOK = Fr.store.set(KEY, JSON.stringify(state)); }

  /* ---------- elements ---------- */
  const $ = sel => root.querySelector(sel);
  const sizePicker = $("#size-picker"), list = $("#b-list"), q = $("#b-q"), catSel = $("#b-cat");
  const tray = $("#tray"), emptyMsg = $("#empty-msg"), fill = $("#meter-fill");
  const stTotal = $("#st-total"), stRem = $("#st-rem"), stCap = $("#st-cap");
  const selList = $("#sel-list"), boxesOut = $("#boxes-out");
  const fDate = $("#b-date"), fNotes = $("#b-notes"), fName = $("#b-name");
  const savedNote = $("#saved-note"), mobileBar = document.getElementById("b-mobilebar");

  /* ---------- size picker ---------- */
  const boxIcon = '<svg class="box-ic" viewBox="0 0 44 36" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12h36v20H4z"/><path d="M2 6h40v6H2zM22 6v26M15 2c3 0 7 4 7 4s-6 1-8-1 0-3 1-3zM29 2c-3 0-7 4-7 4s6 1 8-1 0-3-1-3z"/></svg>';
  function renderSizes() {
    sizePicker.innerHTML = sizes.map(s => `<button type="button" class="size-opt" role="radio" aria-checked="${s.id === state.size}" data-size="${s.id}">
      ${boxIcon}<strong>${esc(L(s.label))}</strong><small>${esc(L(s.note))}</small></button>`).join("");
  }
  sizePicker.addEventListener("click", e => {
    const b = e.target.closest(".size-opt"); if (!b) return;
    const s = sizeById(b.dataset.size);
    if (total() > s.grams) { Fr.toast(t("b.sizeBlocked", { w: total(), s: L(s.label) }), "err"); return; }
    state.size = s.id; save(); renderSizes(); update();
  });
  sizePicker.addEventListener("keydown", e => {
    if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(e.key)) return;
    e.preventDefault();
    const btns = [...sizePicker.querySelectorAll(".size-opt")], i = btns.indexOf(document.activeElement);
    const n = btns[(i + (e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1) + btns.length) % btns.length];
    n.focus(); n.click();
  });

  /* ---------- category select ---------- */
  function renderCatSelect() {
    const v = catSel.value || "all";
    catSel.innerHTML = `<option value="all">${esc(t("b.allCats"))}</option>` + F.CATEGORIES.map(c => `<option value="${c.id}">${esc(L(c.short))}</option>`).join("");
    catSel.value = v;
  }

  /* ---------- sweets list ---------- */
  const thumb = p => (p.images && p.images.length) ? `<img src="${esc(p.images[0])}" alt="" loading="lazy">` : window.FronellaArt.pieceArt(p);
  function renderList() {
    const terms = Fr.norm(q.value).split(/\s+/).filter(Boolean), c = catSel.value;
    const rows = eligible.filter(p => (c === "all" || p.category === c) && terms.every(tm => Fr.searchText(p).includes(tm)));
    list.innerHTML = rows.length ? rows.map(p => {
      const n = state.items[p.id] || 0;
      return `<div class="b-item${n ? " has-qty" : ""}${p.available ? "" : " is-off"}" data-id="${p.id}">
        <button type="button" class="thumb" data-open="${p.id}" aria-label="${esc(t("cta.view"))}: ${esc(L(p.name))}">${thumb(p)}</button>
        <div><div class="nm">${esc(L(p.name))}</div><div class="wt">${p.available ? esc(t("card.perPiece", { g: p.pieceWeight })) : esc(t("card.unavailable"))}</div></div>
        <div class="stepper" role="group" aria-label="${esc(L(p.name))}">
          <button type="button" data-dec aria-label="−">−</button><output aria-live="polite">${n}</output><button type="button" data-inc aria-label="+">+</button>
        </div></div>`;
    }).join("") : `<p class="empty">${esc(t("sweets.empty"))}</p>`;
    refreshSteppers();
  }
  function refreshSteppers() {
    const rem = remaining();
    list.querySelectorAll(".b-item").forEach(row => {
      const p = Fr.getProduct(row.dataset.id), n = state.items[p.id] || 0;
      row.querySelector("output").textContent = n;
      row.classList.toggle("has-qty", n > 0);
      row.querySelector("[data-dec]").disabled = n === 0;
      const inc = row.querySelector("[data-inc]");
      const blocked = !p.available || p.pieceWeight > rem;
      inc.setAttribute("aria-disabled", blocked);
      inc.style.opacity = blocked ? ".35" : "";
      inc.style.cursor = blocked ? "not-allowed" : "";
    });
  }
  function add(id, n, quiet) {
    const p = Fr.getProduct(id);
    if (!p || p.giftBox === false) return false;
    if (!p.available) { if (!quiet) Fr.toast(t("b.unavailable"), "err"); return false; }
    if (p.pieceWeight * n > remaining()) { Fr.toast(t("b.tooHeavy", { name: L(p.name), r: Math.max(0, remaining()) }), "err"); return false; }
    state.items[id] = (state.items[id] || 0) + n; save(); update(); return true;
  }
  function dec(id) {
    if (!state.items[id]) return;
    state.items[id]--; if (state.items[id] <= 0) delete state.items[id];
    save(); update();
  }
  list.addEventListener("click", e => {
    const row = e.target.closest(".b-item"); if (!row) return;
    if (e.target.closest("[data-inc]")) add(row.dataset.id, 1);
    if (e.target.closest("[data-dec]")) dec(row.dataset.id);
  });
  q.addEventListener("input", renderList);
  catSel.addEventListener("change", renderList);

  /* ---------- preview + summary ---------- */
  function pieceSize(w) { return Math.round(16 + Math.sqrt(w) * 4); }
  function update() {
    const tot = total(), c = cap(), rem = c - tot, pct = Math.min(100, (tot / c) * 100);
    // tray
    const entries = Object.entries(state.items);
    let html = "";
    entries.forEach(([id, n]) => {
      const p = Fr.getProduct(id), sz = pieceSize(p.pieceWeight), art = window.FronellaArt.pieceArt(p);
      for (let i = 0; i < n; i++) html += `<span class="piece" style="width:${sz}px;height:${Math.round(sz * .82)}px" title="${esc(L(p.name))}">${art}</span>`;
    });
    tray.innerHTML = html;
    emptyMsg.hidden = entries.length > 0;
    fill.style.width = pct + "%";
    fill.classList.toggle("full", rem < Math.min(...eligible.filter(p => p.available).map(p => p.pieceWeight)));
    const G = " " + t("unit.g");
    stTotal.textContent = tot + G; stRem.textContent = Math.max(0, rem) + G; stCap.textContent = c + G;
    $("#meter-label").textContent = t("b.of", { a: tot, b: c });
    // selection list
    selList.innerHTML = entries.map(([id, n]) => {
      const p = Fr.getProduct(id);
      return `<li><span class="dot" style="background:${p.color || "#E9D2A6"}"></span><span class="nm">${esc(L(p.name))}</span>
        <span class="q">${esc(t("b.pieces", { n }))} · ${n * p.pieceWeight} ${esc(t("unit.g"))}</span>
        <button type="button" data-remove="${id}" aria-label="${esc(t("b.clear"))}: ${esc(L(p.name))}">${I.trash}</button></li>`;
    }).join("");
    boxesOut.textContent = state.boxes;
    $("#size-label").textContent = L(sizeById(state.size).label);
    savedNote.hidden = !savedOK;
    if (mobileBar) {
      mobileBar.querySelector(".mb-text").textContent = t("b.mobileBar", { a: tot, b: c });
      mobileBar.querySelector(".meter-fill").style.width = pct + "%";
    }
    refreshSteppers();
  }
  selList.addEventListener("click", e => {
    const b = e.target.closest("[data-remove]"); if (!b) return;
    delete state.items[b.dataset.remove]; save(); update();
  });

  /* ---------- form fields ---------- */
  fDate.value = state.date; fNotes.value = state.notes; fName.value = state.name;
  fDate.addEventListener("change", () => { state.date = fDate.value; save(); });
  fNotes.addEventListener("input", () => { state.notes = fNotes.value; save(); });
  fName.addEventListener("input", () => { state.name = fName.value; save(); });
  root.querySelector("#boxes-dec").addEventListener("click", () => { state.boxes = Math.max(1, state.boxes - 1); save(); update(); });
  root.querySelector("#boxes-inc").addEventListener("click", () => { state.boxes = Math.min(999, state.boxes + 1); save(); update(); });

  root.querySelector("#b-clear").addEventListener("click", () => {
    if (!Object.keys(state.items).length) return;
    if (!confirm(t("b.confirmClear"))) return;
    state.items = {}; save(); update();
  });
  root.querySelector("#b-send").addEventListener("click", () => {
    const entries = Object.entries(state.items);
    if (!entries.length) { Fr.toast(t("b.needItems"), "err"); return; }
    const s = sizeById(state.size);
    const lines = [t("wa.boxIntro"), "",
      `${t("wa.size")}: ${L(s.label)}`,
      `${t("wa.qty")}: ${state.boxes}`, "",
      `${t("wa.contents")}:`,
      ...entries.map(([id, n]) => { const p = Fr.getProduct(id); return `• ${L(p.name)} × ${t("b.pieces", { n })} (≈ ${n * p.pieceWeight} ${t("unit.g")})`; }),
      "",
      `${t("wa.totalBox")}: ≈ ${t("b.of", { a: total(), b: s.grams })}`,
      state.date ? `${t("wa.date")}: ${Fr.fmtDate(state.date)}` : null,
      state.name.trim() ? `${t("wa.name")}: ${state.name.trim()}` : null,
      state.notes.trim() ? `${t("wa.notes")}: ${state.notes.trim()}` : null].filter(x => x !== null);
    Fr.openWhatsApp(lines.join("\n").replace(/\n{3,}/g, "\n\n"));
  });

  /* ---------- mobile summary bar ---------- */
  if (mobileBar) {
    const panel = document.getElementById("b-panel");
    mobileBar.querySelector("button").addEventListener("click", () => panel.scrollIntoView({ behavior: "smooth", block: "start" }));
    if ("IntersectionObserver" in window) {
      let builderVisible = false, panelVisible = false;
      const sync = () => { const show = builderVisible && !panelVisible; mobileBar.classList.toggle("show", show); document.body.classList.toggle("has-mobilebar", show && innerWidth <= 1020); };
      new IntersectionObserver(es => { builderVisible = es[0].isIntersecting; sync(); }).observe(root.querySelector(".b-left"));
      new IntersectionObserver(es => { panelVisible = es[0].isIntersecting; sync(); }, { threshold: .15 }).observe(panel);
      addEventListener("resize", sync);
    }
  }

  /* ---------- language + boot ---------- */
  document.addEventListener("langchange", () => { renderSizes(); renderCatSelect(); renderList(); update(); });
  renderSizes(); renderCatSelect(); renderList(); update();

  // ?add=<id> from product cards / popup
  const params = new URLSearchParams(location.search), addId = params.get("add");
  if (addId) {
    const p = Fr.getProduct(addId);
    if (p && add(addId, 1, false)) Fr.toast(t("b.added", { name: L(p.name) }));
    const u = new URL(location.href); u.searchParams.delete("add"); history.replaceState(null, "", u);
  }
  // when already on this page, "Add to gift box" links in the popup add directly
  document.addEventListener("click", e => {
    const a = e.target.closest("a[href^='gift-boxes.html?add=']"); if (!a) return;
    e.preventDefault();
    const id = new URL(a.href).searchParams.get("add"), p = Fr.getProduct(id);
    const m = document.querySelector(".modal.open .modal-close"); if (m) m.click();
    if (p && add(id, 1, false)) Fr.toast(t("b.added", { name: L(p.name) }));
  });
});
