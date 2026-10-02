/* =====================================================================
   FRONELLA — built-in sweet illustrations
   Used automatically when a product has no photo in `images`.
   ===================================================================== */
(function () {
  let uid = 0;

  function hexToRgb(h) { h = h.replace("#", ""); if (h.length === 3) h = h.split("").map(c => c + c).join(""); const n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
  function rgbToHex(r, g, b) { return "#" + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join(""); }
  /* amt > 0 lightens, amt < 0 darkens (−1 … 1) */
  function shade(hex, amt) { const [r, g, b] = hexToRgb(hex); const t = amt < 0 ? 0 : 255, p = Math.abs(amt); return rgbToHex(r + (t - r) * p, g + (t - g) * p, b + (t - b) * p); }
  function lum(hex) { const [r, g, b] = hexToRgb(hex); return (0.299 * r + 0.587 * g + 0.114 * b) / 255; }
  function rng(seed) { let h = 2166136261; for (const ch of seed) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return function () { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  const CASHEW = "#EFE2C6", PISTA = "#8DB35E", ALMOND = "#C79A62", SAFFRON = "#E2731F", SILVER = "#FFFFFF";

  function toppings(p, R, n, area, oy) {
    oy = oy || 0;
    // small nut slivers/dots on top surfaces
    const ings = p.ingredients || [];
    const cols = [];
    if (ings.includes("pistachio")) cols.push(PISTA);
    if (ings.includes("almond")) cols.push(ALMOND);
    if (ings.includes("saffron")) cols.push(SAFFRON);
    if (ings.includes("strawberry") || ings.includes("cranberry")) cols.push("#C2283F");
    if (ings.includes("candyButtons")) cols.push("#E53935", "#1E88E5", "#FDD835", "#43A047");
    if (ings.includes("blueberry")) cols.push("#3B3F86");
    if (!cols.length && (ings.includes("mixedNuts") || ings.includes("cashew"))) cols.push(ALMOND, PISTA);
    if (!cols.length) return "";
    let s = "";
    for (let i = 0; i < n; i++) {
      const x = (R() - .5) * area[0], y = oy + (R() - .5) * area[1], rot = R() * 180, c = cols[i % cols.length];
      s += `<rect x="${(x - 3.5).toFixed(1)}" y="${(y - 1.4).toFixed(1)}" width="7" height="2.8" rx="1.4" fill="${c}" transform="rotate(${rot.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
    }
    return s;
  }
  function varq(R, area, oy) {
    oy = oy || 0;
    let s = "";
    for (let i = 0; i < 4; i++) {
      const x = (R() - .5) * area[0], y = oy + (R() - .5) * area[1], w = 6 + R() * 10;
      s += `<path d="M${x} ${y}l${w} ${-w * .3}l${w * .4} ${w * .6}l${-w * .9} ${w * .3}z" fill="${SILVER}" opacity=".55"/>`;
    }
    return s;
  }
  function flecks(R, c, n, rx, ry, cy) {
    let s = "";
    for (let i = 0; i < n; i++) {
      const a = R() * Math.PI * 2, r = Math.sqrt(R());
      const x = Math.cos(a) * rx * r, y = cy + Math.sin(a) * ry * r;
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.8 + R() * 1.4).toFixed(1)}" fill="${R() > .5 ? shade(c, -.25) : shade(c, .35)}" opacity=".8"/>`;
    }
    return s;
  }

  const SHAPES = {
    diamond(p, c, R) {
      return `<path d="M-52 0L0 38L0 47L-52 9Z" fill="${shade(c, -.16)}"/><path d="M52 0L0 38L0 47L52 9Z" fill="${shade(c, -.28)}"/>
        <path d="M0-38L52 0L0 38L-52 0Z" fill="${c}"/><path d="M0-38L52 0L0 38L-52 0Z" fill="url(#gl)" />
        ${lum(c) > .6 || p.ingredients.includes("silverLeaf") ? varq(R, [50, 26]) : ""}${toppings(p, R, 0, [0, 0])}`;
    },
    roll(p, c, R) {
      const outer = CASHEW;
      return `<ellipse cx="0" cy="9" rx="34" ry="28" fill="${shade(outer, -.18)}"/><ellipse cx="0" cy="0" rx="34" ry="28" fill="${outer}"/>
        <ellipse cx="0" cy="0" rx="34" ry="28" fill="url(#gl)"/>
        <ellipse cx="0" cy="0" rx="18" ry="15" fill="${c}"/><path d="M-12 2a12 10 0 0 1 22-4" stroke="${shade(c, .35)}" stroke-width="2" fill="none" opacity=".7"/>
        ${flecks(R, c, 8, 13, 10, 0)}`;
    },
    ball(p, c, R) {
      const id = "b" + (++uid);
      return `<defs><radialGradient id="${id}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="${shade(c, .35)}"/><stop offset=".6" stop-color="${c}"/><stop offset="1" stop-color="${shade(c, -.3)}"/></radialGradient></defs>
        <circle cx="0" cy="0" r="32" fill="url(#${id})"/>${flecks(R, c, 16, 26, 26, 0)}${toppings(p, R, 5, [34, 30])}`;
    },
    ladoo(p, c, R) {
      const id = "l" + (++uid);
      let beads = "";
      for (let i = 0; i < 70; i++) { const a = R() * Math.PI * 2, r = Math.sqrt(R()) * 29; beads += `<circle cx="${(Math.cos(a) * r).toFixed(1)}" cy="${(Math.sin(a) * r).toFixed(1)}" r="${(2 + R() * 1.6).toFixed(1)}" fill="${R() > .45 ? shade(c, .22) : shade(c, -.12)}"/>`; }
      return `<defs><radialGradient id="${id}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="${shade(c, .3)}"/><stop offset="1" stop-color="${shade(c, -.28)}"/></radialGradient></defs>
        <circle r="34" fill="url(#${id})"/>${beads}<circle r="34" fill="url(#gl)" opacity=".6"/>`;
    },
    square(p, c, R) {
      return `<path d="M-42-12L-4 8L-4 30L-42 10Z" fill="${shade(c, -.14)}"/><path d="M-4 8L44-14L44 8L-4 30Z" fill="${shade(c, -.28)}"/>
        <path d="M-42 0L-4 20" stroke="${shade(c, .3)}" stroke-width="3" opacity=".6"/><path d="M-4 20L44-2" stroke="${shade(c, .2)}" stroke-width="3" opacity=".6"/>
        <path d="M-42-12L6-34L44-14L-4 8Z" fill="${c}"/><path d="M-42-12L6-34L44-14L-4 8Z" fill="url(#gl)"/>
        ${toppings(p, R, 7, [46, 18], -12)}
        ${p.ingredients.includes("silverLeaf") ? varq(R, [40, 14], -12) : ""}`;
    },
    bar(p, c, R) {
      const centre = p.id === "thabdi" ? shade(c, -.25) : (lum(c) > .8 ? "#E9C98A" : shade(c, -.15));
      return `<path d="M-50-8L-10 12L-10 30L-50 10Z" fill="${shade(c, -.14)}"/><path d="M-10 12L50-14L50 4L-10 30Z" fill="${shade(c, -.26)}"/>
        <path d="M-50-8L10-34L50-14L-10 12Z" fill="${c}"/>
        <ellipse cx="0" cy="-11" rx="20" ry="8" fill="${centre}" opacity=".55"/>
        ${flecks(R, c, 22, 34, 12, -11)}${p.ingredients.includes("silverLeaf") ? varq(R, [44, 14], -11) : ""}
        ${p.ingredients.includes("pistachio") ? toppings({ ingredients: ["pistachio"] }, R, 6, [40, 12], -11) : ""}`;
    },
    penda(p, c, R) {
      return `<ellipse cx="0" cy="9" rx="38" ry="17" fill="${shade(c, -.22)}"/><ellipse cx="0" cy="0" rx="38" ry="17" fill="${c}"/>
        <ellipse cx="0" cy="0" rx="38" ry="17" fill="url(#gl)"/>
        <ellipse cx="0" cy="-1" rx="12" ry="5" fill="${shade(c, -.18)}"/>${flecks(R, c, 10, 30, 12, 0)}
        ${p.ingredients.includes("saffron") ? `<path d="M-4-2l8 1" stroke="${SAFFRON}" stroke-width="1.6"/>` : ""}
        ${p.ingredients.includes("pistachio") || p.ingredients.includes("almond") ? `<ellipse cx="2" cy="-2" rx="5" ry="2.3" fill="${p.ingredients.includes("pistachio") ? PISTA : ALMOND}" transform="rotate(-15 2 -2)"/>` : ""}`;
    },
    basket(p, c, R) {
      let ridges = "";
      for (let i = -3; i <= 3; i++) ridges += `<path d="M${i * 8} 0L${i * 6} 26" stroke="${shade(CASHEW, -.2)}" stroke-width="1.5"/>`;
      return `<path d="M-32-4L32-4L24 28Q0 34-24 28Z" fill="${shade(CASHEW, -.06)}"/>${ridges}
        <ellipse cx="0" cy="-4" rx="32" ry="10" fill="${shade(CASHEW, -.2)}"/><ellipse cx="0" cy="-5" rx="28" ry="8" fill="${c}"/>
        <ellipse cx="0" cy="-8" rx="16" ry="4" fill="${shade(c, .25)}" opacity=".7"/>${toppings(p, R, 5, [36, 6], -6)}`;
    },
    pizza(p, c, R) {
      return `<ellipse cx="0" cy="7" rx="46" ry="20" fill="${shade(CASHEW, -.2)}"/><ellipse cx="0" cy="0" rx="46" ry="20" fill="${CASHEW}"/>
        <ellipse cx="0" cy="-1" rx="38" ry="15" fill="${c}"/>${flecks(R, c, 10, 32, 12, -1)}
        ${toppings(Object.assign({}, p, { ingredients: p.ingredients.concat(["pistachio", "almond"]) }), R, 12, [60, 20])}`;
    },
    bite(p, c, R) {
      return `<ellipse cx="0" cy="8" rx="32" ry="20" fill="${shade(c, -.25)}"/><ellipse cx="0" cy="0" rx="32" ry="20" fill="${c}"/>
        <ellipse cx="0" cy="0" rx="32" ry="20" fill="url(#gl)"/>${flecks(R, c, 18, 26, 15, 0)}${toppings(p, R, 4, [30, 14])}`;
    },
    ghari(p, c, R) {
      return `<ellipse cx="0" cy="20" rx="42" ry="10" fill="${shade(c, -.2)}"/>
        <path d="M-42 20C-42-14-20-30 0-30S42-14 42 20Z" fill="${c}"/><path d="M-42 20C-42-14-20-30 0-30S42-14 42 20Z" fill="url(#gl)"/>
        <path d="M-22-18C-12-6-12 8-16 18M0-30V18M22-18C12-6 12 8 16 18" stroke="${shade(c, -.12)}" stroke-width="1.5" fill="none" opacity=".7"/>
        <ellipse cx="-12" cy="-16" rx="12" ry="5" fill="#fff" opacity=".45" transform="rotate(-25 -12 -16)"/>`;
    },
    dome(p, c, R) {
      const nut = p.ingredients.includes("pistachio") ? PISTA : (p.ingredients.includes("almond") ? ALMOND : (p.ingredients.includes("rose") ? "#C2385A" : ALMOND));
      return `<ellipse cx="0" cy="16" rx="36" ry="11" fill="${shade(c, -.22)}"/>
        <path d="M-36 16C-36-12-18-26 0-26S36-12 36 16Z" fill="${c}"/><path d="M-36 16C-36-12-18-26 0-26S36-12 36 16Z" fill="url(#gl)"/>
        ${flecks(R, c, 12, 24, 12, 0)}<ellipse cx="0" cy="-26" rx="8" ry="4.5" fill="${nut}"/><ellipse cx="-2" cy="-27.5" rx="3" ry="1.3" fill="#fff" opacity=".5"/>`;
    }
  };

  const GLT = `<defs><linearGradient id="gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".08"/></linearGradient></defs>`;

  /* each SVG gets its own gradient id so hidden copies never break others */
  function piece(p, R, gid) {
    const fn = SHAPES[p.art] || SHAPES.square;
    return fn(p, p.color || "#E9D2A6", R).replace(/url\(#gl\)/g, `url(#${gid})`);
  }
  function GL(gid) { return GLT.replace('id="gl"', `id="${gid}"`); }

  /* Full product illustration (card / modal) */
  function productArt(p) {
    const R = rng(p.id), bg = "bg" + (++uid), gid = "gl" + (++uid);
    const shadow = (x, y, s) => `<ellipse cx="${x}" cy="${y + 26 * s}" rx="${44 * s}" ry="${9 * s}" fill="#5A4220" opacity=".16"/>`;
    const k = { diamond: .8, pizza: .86, bar: .9, square: .94 }[p.art] || 1;
    const at = (x, y, s) => (s *= k, `${shadow(x, y, s)}<g transform="translate(${x} ${y}) scale(${s})">${piece(p, R, gid)}</g>`);
    return `<svg viewBox="0 0 240 196" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${(p.name.en || "").replace(/"/g, "")}" preserveAspectRatio="xMidYMid slice">
      ${GL(gid)}<defs><radialGradient id="${bg}" cx=".5" cy=".38" r=".75"><stop offset="0" stop-color="#FFFBF1"/><stop offset="1" stop-color="#EFE3C8"/></radialGradient></defs>
      <rect width="240" height="196" fill="url(#${bg})"/>
      <g fill="none" stroke="#C9A949" stroke-width=".8" opacity=".35"><circle cx="120" cy="96" r="88"/><circle cx="120" cy="96" r="82" stroke-dasharray="2 4"/></g>
      <ellipse cx="120" cy="142" rx="98" ry="30" fill="#fff"/><ellipse cx="120" cy="142" rx="98" ry="30" fill="none" stroke="#C9A949" stroke-width="2"/>
      <ellipse cx="120" cy="142" rx="86" ry="24" fill="none" stroke="#E9D9A8" stroke-width="1"/>
      ${at(82, 110, .74)}${at(158, 106, .74)}${at(120, 134, .92)}
    </svg>`;
  }

  /* Single piece (category tiles, gift-box preview) */
  function pieceArt(p) {
    const R = rng(p.id), gid = "gl" + (++uid);
    return `<svg viewBox="-56 -46 112 92" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${GL(gid)}<ellipse cx="0" cy="30" rx="40" ry="8" fill="#5A4220" opacity=".14"/>${piece(p, R, gid)}</svg>`;
  }

  window.FronellaArt = { productArt, pieceArt, shade };
})();
