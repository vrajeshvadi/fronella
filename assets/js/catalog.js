/* =====================================================================
   FRONELLA — Sweets page: search + category filters
   ===================================================================== */
document.addEventListener("fronella:ready", () => {
  const Fr = window.Fronella, F = window.FRONELLA, { t, L, esc } = Fr;
  const input = document.getElementById("q");
  const chipsEl = document.getElementById("cat-chips");
  const out = document.getElementById("catalog");
  const meta = document.getElementById("result-meta");
  const searchBox = input.closest(".search");
  const params = new URLSearchParams(location.search);
  let cat = F.CATEGORIES.some(c => c.id === params.get("cat")) ? params.get("cat") : "all";
  let q = params.get("q") || "";
  input.value = q;
  const index = Fr.products.map(p => ({ p, text: Fr.searchText(p), name: Fr.norm(p.name.en + " " + p.name.gu) }));

  function renderChips() {
    const count = id => id === "all" ? Fr.products.length : Fr.products.filter(p => p.category === id).length;
    const all = [{ id: "all", label: t("sweets.all") }].concat(F.CATEGORIES.map(c => ({ id: c.id, label: L(c.short) })));
    chipsEl.innerHTML = all.map(c => `<button type="button" class="chip" data-cat="${c.id}" aria-pressed="${c.id === cat}">${esc(c.label)}<span class="n">${count(c.id)}</span></button>`).join("");
  }
  function syncURL() {
    const u = new URL(location.href);
    cat === "all" ? u.searchParams.delete("cat") : u.searchParams.set("cat", cat);
    q ? u.searchParams.set("q", q) : u.searchParams.delete("q");
    history.replaceState(null, "", u);
  }
  function render() {
    const terms = Fr.norm(q).split(/\s+/).filter(Boolean);
    let list = index.filter(x => (cat === "all" || x.p.category === cat) && terms.every(term => x.text.includes(term)));
    if (terms.length) list.sort((a, b) => (terms.every(tm => b.name.includes(tm)) ? 1 : 0) - (terms.every(tm => a.name.includes(tm)) ? 1 : 0));
    searchBox.classList.toggle("has-value", !!q);
    meta.textContent = t(list.length === 1 ? "sweets.count1" : "sweets.count", { n: list.length });
    if (!list.length) {
      out.innerHTML = `<div class="empty"><img src="assets/img/lotus-antique.png" alt=""><p>${esc(t("sweets.empty"))}</p><button class="btn btn-outline btn-sm" type="button" id="reset">${esc(t("sweets.reset"))}</button></div>`;
      out.querySelector("#reset").onclick = () => { q = ""; cat = "all"; input.value = ""; renderChips(); render(); syncURL(); };
      return;
    }
    if (cat === "all" && !terms.length) {
      out.innerHTML = F.CATEGORIES.map(c => {
        const items = list.filter(x => x.p.category === c.id);
        if (!items.length) return "";
        return `<section class="cat-section" id="cat-${c.id}"><header><div><h2>${esc(L(c.name))}</h2><p>${esc(L(c.blurb))}</p></div></header>
          <div class="grid">${items.map(x => Fr.productCard(x.p)).join("")}</div></section>`;
      }).join("");
    } else {
      out.innerHTML = `<div class="grid">${list.map(x => Fr.productCard(x.p)).join("")}</div>`;
    }
  }
  chipsEl.addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    cat = b.dataset.cat; renderChips(); render(); syncURL();
  });
  let timer;
  input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(() => { q = input.value.trim(); render(); syncURL(); }, 120); });
  searchBox.querySelector(".clear").addEventListener("click", () => { input.value = ""; q = ""; render(); syncURL(); input.focus(); });
  document.addEventListener("langchange", () => { renderChips(); render(); });
  renderChips(); render();
});
