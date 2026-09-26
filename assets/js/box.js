(function () {
  const SHOP = window.SHOP || {};
  const FAMILIES = window.FAMILIES || [];
  const SWEETS = window.SWEETS || [];
  const BOXES = (SHOP.boxes && SHOP.boxes.length) ? SHOP.boxes : [{ name: "Small", pieces: 9, price: 0 }, { name: "Medium", pieces: 16, price: 0 }, { name: "Large", pieces: 25, price: 0 }];
  const BY = Object.fromEntries(SWEETS.map(s => [s.slug, s]));
  const rs = n => "₹" + Math.round(n).toLocaleString("en-IN");
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const piecePrice = s => s.price * (s.pieceGrams || 25) / 1000;
  const waNum = (SHOP.whatsapp || "").replace(/\D/g, "");
  const KEY = "fronella-box";

  // ---------- menu
  const mbtn = document.querySelector(".menu-btn"), nav = document.getElementById("nav");
  mbtn.addEventListener("click", () => { const o = nav.classList.toggle("open"); mbtn.setAttribute("aria-expanded", o); });

  // ---------- state
  let state = { size: Math.min(1, BOXES.length - 1), qty: {} };
  function load() {
    const h = location.hash.match(/box=([^&]+)/);
    let src = null;
    if (h) src = decodeURIComponent(h[1]);
    else { try { src = localStorage.getItem(KEY); } catch (e) {} }
    if (!src) return;
    const [size, items] = src.split(":");
    const sz = parseInt(size, 10);
    if (!isNaN(sz) && BOXES[sz]) state.size = sz;
    (items || "").split(",").forEach(p => {
      const [slug, n] = p.split(".");
      const k = parseInt(n, 10);
      if (BY[slug] && k > 0) state.qty[slug] = Math.min(k, 99);
    });
  }
  const encode = () => state.size + ":" + Object.entries(state.qty).map(([k, v]) => k + "." + v).join(",");
  function save() {
    try { localStorage.setItem(KEY, encode()); } catch (e) {}
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  }
  const count = () => Object.values(state.qty).reduce((a, b) => a + b, 0);
  const cap = () => BOXES[state.size].pieces;

  // ---------- box sizes
  const sizesEl = document.getElementById("sizes");
  function renderSizes() {
    sizesEl.innerHTML = BOXES.map((b, i) => `
      <button type="button" class="size" role="radio" aria-checked="${i === state.size}" data-i="${i}">
        <span class="size-grid" style="--n:${Math.round(Math.sqrt(b.pieces))}">${"<i></i>".repeat(b.pieces)}</span>
        <b>${esc(b.name)}</b><span>${b.pieces} pieces${b.price ? ", box " + rs(b.price) : ""}</span>
      </button>`).join("");
  }
  sizesEl.addEventListener("click", e => {
    const b = e.target.closest(".size"); if (!b) return;
    state.size = +b.dataset.i; renderSizes(); update();
  });

  // ---------- sweets list
  const listEl = document.getElementById("list");
  listEl.innerHTML = FAMILIES.map(f => {
    const items = SWEETS.filter(s => s.family === f.id);
    return `<div class="pgroup" data-family="${f.id}"><h3>${esc(f.name)}</h3>${items.map(s => `
      <div class="prow" data-slug="${s.slug}" data-name="${esc((s.name + " " + s.desc).toLowerCase())}">
        <img src="assets/img/sweets/${s.slug}.jpg" alt="" width="720" height="540" loading="lazy">
        <div class="pinfo"><b>${esc(s.name)}${s.sugarFree ? ' <abbr class="sf" title="Sugar-free">SF</abbr>' : ""}</b>
          <span>About ${rs(piecePrice(s))} a piece <em>(${rs(s.price)} per kg)</em></span></div>
        <div class="step">
          <button type="button" class="minus" aria-label="Remove one ${esc(s.name)}">−</button>
          <output aria-live="polite" aria-label="${esc(s.name)} pieces">0</output>
          <button type="button" class="plus" aria-label="Add one ${esc(s.name)}">+</button>
        </div>
      </div>`).join("")}</div>`;
  }).join("");
  listEl.addEventListener("click", e => {
    const row = e.target.closest(".prow"); if (!row) return;
    const slug = row.dataset.slug;
    if (e.target.closest(".plus")) {
      if (count() >= cap()) { flash("Your box is full. Choose a bigger box or remove a sweet."); return; }
      state.qty[slug] = (state.qty[slug] || 0) + 1;
    } else if (e.target.closest(".minus")) {
      if (!state.qty[slug]) return;
      state.qty[slug]--; if (!state.qty[slug]) delete state.qty[slug];
    } else return;
    update();
  });

  // filters
  const chipsEl = document.getElementById("chips"), q = document.getElementById("q");
  let active = "all";
  chipsEl.innerHTML = [`<button class="chip" aria-pressed="true" data-f="all">All</button>`]
    .concat(FAMILIES.map(f => `<button class="chip" aria-pressed="false" data-f="${f.id}">${esc(f.name)}</button>`)).join("");
  function filter() {
    const t = q.value.trim().toLowerCase(); let any = 0;
    listEl.querySelectorAll(".pgroup").forEach(g => {
      let n = 0;
      g.querySelectorAll(".prow").forEach(r => {
        const ok = (active === "all" || g.dataset.family === active) && (!t || r.dataset.name.includes(t));
        r.hidden = !ok; if (ok) n++;
      });
      g.hidden = !n; any += n;
    });
    document.getElementById("noresult").hidden = !!any;
  }
  chipsEl.addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    active = b.dataset.f;
    chipsEl.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c === b));
    filter();
  });
  q.addEventListener("input", filter);

  // ---------- summary
  const $ = id => document.getElementById(id);
  function totals() {
    let grams = 0, sweets = 0;
    for (const [slug, n] of Object.entries(state.qty)) { const s = BY[slug]; grams += n * (s.pieceGrams || 25); sweets += n * piecePrice(s); }
    const box = BOXES[state.size].price || 0;
    return { grams, sweets, box, total: sweets + box };
  }
  function text() {
    const b = BOXES[state.size], t = totals();
    const lines = Object.entries(state.qty).map(([slug, n]) => `- ${BY[slug].name} × ${n}`);
    return [`Custom gift box: ${b.name} (${b.pieces} pieces)`, ...lines,
      `Approximate weight: ${t.grams} g`, `Estimated total: ${rs(t.total)}`].join("\n");
  }
  function update() {
    const n = count(), c = cap(), full = n >= c, over = n > c, t = totals();
    // rows
    listEl.querySelectorAll(".prow").forEach(r => {
      const k = state.qty[r.dataset.slug] || 0;
      r.querySelector("output").textContent = k;
      r.classList.toggle("in", k > 0);
      r.querySelector(".minus").disabled = !k;
      r.querySelector(".plus").disabled = full;
    });
    // tray
    const pieces = [];
    for (const [slug, k] of Object.entries(state.qty)) for (let i = 0; i < k; i++) pieces.push(slug);
    const cols = Math.round(Math.sqrt(c));
    $("tray").style.setProperty("--n", cols);
    $("tray").innerHTML = Array.from({ length: Math.max(c, pieces.length) }, (_, i) => pieces[i]
      ? `<span class="cell full${i >= c ? " extra" : ""}" title="${esc(BY[pieces[i]].name)}"><img src="assets/img/sweets/${pieces[i]}.jpg" alt=""></span>`
      : `<span class="cell"></span>`).join("");
    $("fill").textContent = `${n} of ${c} pieces`;
    $("warn").hidden = !over;
    if (over) $("warn").textContent = `This box holds ${c} pieces and you have ${n}. Remove ${n - c} or choose a bigger box.`;
    // lines
    $("lines").innerHTML = Object.entries(state.qty).map(([slug, k]) => {
      const s = BY[slug];
      return `<li><span class="ln">${esc(s.name)} <i>× ${k}</i></span><span class="lw">${k * (s.pieceGrams || 25)} g</span><b>${rs(k * piecePrice(s))}</b></li>`;
    }).join("");
    $("nolines").hidden = n > 0;
    $("t-weight").textContent = t.grams.toLocaleString("en-IN") + " g";
    $("t-sweets").textContent = rs(t.sweets);
    $("row-box").hidden = !t.box; $("t-box").textContent = rs(t.box);
    $("t-total").textContent = rs(t.total);
    $("bar-fill").textContent = `${n} of ${c} pieces`;
    $("bar-total").textContent = rs(t.total);
    // actions
    const ready = n > 0 && !over;
    ["copy", "share"].forEach(id => $(id).disabled = !ready);
    if (waNum) {
      $("send").hidden = false;
      $("send").classList.toggle("off", !ready);
      $("send").setAttribute("aria-disabled", !ready);
      $("send").href = ready ? `https://wa.me/${waNum}?text=${encodeURIComponent("Hello Fronella, I would like to order this box.\n\n" + text())}` : "#";
    }
    save();
  }
  $("send").addEventListener("click", e => { if ($("send").classList.contains("off")) { e.preventDefault(); flash("Add sweets to your box first."); } });

  // ---------- actions
  let tt;
  function flash(msg) { const el = $("toast"); el.textContent = msg; el.classList.add("on"); clearTimeout(tt); tt = setTimeout(() => el.classList.remove("on"), 2600); }
  async function copy(str, msg) {
    try { await navigator.clipboard.writeText(str); flash(msg); }
    catch (e) { window.prompt("Copy this:", str); }
  }
  $("copy").addEventListener("click", () => copy(text(), "Box details copied."));
  $("share").addEventListener("click", () => copy(location.href.split("#")[0] + "#box=" + encodeURIComponent(encode()), "Link copied. Anyone with the link sees this box."));
  $("reset").addEventListener("click", () => { state.qty = {}; update(); flash("Your box is empty."); });

  document.getElementById("yr").textContent = new Date().getFullYear();
  load(); renderSizes(); filter(); update();
})();
