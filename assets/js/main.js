(function () {
  const SHOP = window.SHOP || {};
  const FAMILIES = window.FAMILIES || [];
  const SWEETS = window.SWEETS || [];
  const rs = n => "₹" + n.toLocaleString("en-IN");
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const waNum = (SHOP.whatsapp || "").replace(/\D/g, "");
  const waLink = text => `https://wa.me/${waNum}?text=${encodeURIComponent(text)}`;

  // ---------- menu
  const btn = document.querySelector(".menu-btn");
  const nav = document.getElementById("nav");
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", e => {
    if (e.target.tagName === "A") { nav.classList.remove("open"); btn.setAttribute("aria-expanded", false); }
  });

  // ---------- sweets
  const groupsEl = document.getElementById("groups");
  const chipsEl = document.getElementById("chips");
  const q = document.getElementById("q");
  const countEl = document.getElementById("count");
  const emptyEl = document.getElementById("empty");
  let active = "all";

  const range = list => {
    const p = list.map(s => s.price);
    return `${rs(Math.min(...p))} to ${rs(Math.max(...p))} per kg`;
  };

  const card = s => `
    <article class="card" data-name="${esc((s.name + " " + s.desc + " " + s.kind).toLowerCase())}">
      <div class="ph"><img src="assets/img/sweets/${s.slug}.jpg" alt="${esc(s.name)}" width="720" height="540" loading="lazy"></div>
      <h4>${esc(s.name)}${s.sugarFree ? ' <abbr class="sf" title="Sugar-free">SF</abbr>' : ""}</h4>
      <p class="ds">${esc(s.desc)}</p>
      <p class="pr">${rs(s.price)} <span>per kg</span></p>
      ${waNum ? `<a class="ask" href="${waLink("Hello Fronella, I would like to order " + s.name + ".")}" target="_blank" rel="noopener">Order on WhatsApp</a>` : ""}
    </article>`;

  groupsEl.innerHTML = FAMILIES.map(f => {
    const list = SWEETS.filter(s => s.family === f.id);
    return `<section class="group" data-family="${f.id}" aria-labelledby="g-${f.id}">
      <div class="group-head">
        <h3 id="g-${f.id}">${esc(f.name)}</h3>
        <p>${esc(f.blurb)} <span class="gr">${list.length} sweets, ${range(list)}</span></p>
      </div>
      <div class="grid">${list.map(card).join("")}</div>
    </section>`;
  }).join("");

  chipsEl.innerHTML = [`<button class="chip" aria-pressed="true" data-f="all">All sweets</button>`]
    .concat(FAMILIES.map(f => `<button class="chip" aria-pressed="false" data-f="${f.id}">${esc(f.name)}</button>`)).join("");

  function apply() {
    const term = q.value.trim().toLowerCase();
    let shown = 0;
    groupsEl.querySelectorAll(".group").forEach(g => {
      const famOk = active === "all" || g.dataset.family === active;
      let n = 0;
      g.querySelectorAll(".card").forEach(c => {
        const ok = famOk && (!term || c.dataset.name.includes(term));
        c.hidden = !ok; if (ok) n++;
      });
      g.hidden = n === 0; shown += n;
    });
    countEl.textContent = shown === SWEETS.length ? `Showing all ${shown} sweets` : `Showing ${shown} of ${SWEETS.length} sweets`;
    emptyEl.hidden = shown !== 0;
    document.getElementById("empty-q").textContent = q.value.trim();
  }
  chipsEl.addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    active = b.dataset.f;
    chipsEl.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c === b));
    apply();
  });
  q.addEventListener("input", apply);
  document.getElementById("clear").addEventListener("click", () => {
    q.value = ""; active = "all";
    chipsEl.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c.dataset.f === "all"));
    apply(); q.focus();
  });
  apply();

  // ---------- price list
  const plEl = document.getElementById("plist");
  const col = (title, section) => {
    const fams = FAMILIES.filter(f => f.section === section);
    return `<div class="pcol"><h3>${title}</h3>${fams.map(f => {
      const list = SWEETS.filter(s => s.family === f.id);
      return `<h4>${esc(f.name)}</h4><ul>${list.map(s =>
        `<li><span>${esc(s.name)}${s.sugarFree ? ' <abbr class="sf" title="Sugar-free">SF</abbr>' : ""}</span><i aria-hidden="true"></i><b>${rs(s.price)}</b></li>`).join("")}</ul>`;
    }).join("")}</div>`;
  };
  plEl.innerHTML = col("Dry fruit sweets", "dry") + col("Milk sweets", "milk");

  // ---------- WhatsApp buttons and contact details
  document.querySelectorAll(".wa-only").forEach(a => {
    if (waNum) { a.href = waLink(a.dataset.wa); a.target = "_blank"; a.rel = "noopener"; }
    else a.remove();
  });
  const rows = [];
  if (SHOP.phone) rows.push(["Phone", `<a href="tel:${esc(SHOP.phone.replace(/\s/g, ""))}">${esc(SHOP.phone)}</a>`]);
  if (waNum) rows.push(["WhatsApp", `<a href="${waLink("Hello Fronella")}" target="_blank" rel="noopener">+${waNum}</a>`]);
  if (SHOP.email) rows.push(["Email", `<a href="mailto:${esc(SHOP.email)}">${esc(SHOP.email)}</a>`]);
  if (SHOP.address) rows.push(["Address", esc(SHOP.address).replace(/\n/g, "<br>") + (SHOP.mapLink ? `<br><a href="${esc(SHOP.mapLink)}" target="_blank" rel="noopener">Open in Google Maps</a>` : "")]);
  if (SHOP.hours) rows.push(["Opening hours", esc(SHOP.hours)]);
  if (SHOP.instagram) rows.push(["Instagram", `<a href="https://instagram.com/${esc(SHOP.instagram)}" target="_blank" rel="noopener">@${esc(SHOP.instagram)}</a>`]);
  const contact = document.getElementById("contact");
  if (rows.length) {
    contact.innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
    document.getElementById("order-lead").textContent = "Call or message us to order, or download the full catalogue with photos and prices.";
  } else contact.remove();
  if (SHOP.fssai) { const f = document.getElementById("fssai"); f.textContent = "FSSAI licence no. " + SHOP.fssai; f.hidden = false; }
  document.getElementById("yr").textContent = new Date().getFullYear();
})();
