# Fronella — By Khodiyar Dairy Farm

Static website (HTML, CSS, JavaScript). No backend, no admin panel, no build step, no prices.
Pages: Home, Sweets, Gift Boxes, Bulk Orders, About, Contact. English + Gujarati.

---

## 1. Put it on GitHub Pages

1. Create a new repository on GitHub, for example `fronella`.
2. Upload **everything in this folder** (keep the folder structure, including the empty-looking `.nojekyll` file).
   - On github.com: *Add file → Upload files* → drag the contents in → *Commit changes*.
3. Go to **Settings → Pages**. Under *Build and deployment* pick **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. After a minute the site is live at `https://<your-username>.github.io/fronella/`.
5. Optional custom domain: in *Settings → Pages → Custom domain* enter e.g. `www.fronella.in`, then add the DNS records GitHub shows you at your domain provider.

To preview on your own computer, open the folder in a terminal and run `python3 -m http.server`, then visit `http://localhost:8000`.

---

## 2. Everyday edits (all in `assets/js/`)

Edit the file on GitHub (click the file → pencil icon → *Commit changes*). The site updates in about a minute.

| What you want to change | File | What to edit |
|---|---|---|
| Phone, WhatsApp, address, hours | `data.js` | `FRONELLA.SITE` |
| Gift box sizes (250 g / 500 g / 1 kg) | `data.js` | `FRONELLA.BOX_SIZES` — `grams` is the box capacity |
| Add / remove / rename a sweet | `products.js` | copy an existing `{ … },` block |
| Mark a sweet out of stock | `products.js` | `available: false` |
| Hide a sweet from the gift box builder | `products.js` | `giftBox: false` |
| Weight of one piece (used by the box builder) | `products.js` | `pieceWeight: 10` (grams) |
| Show a sweet on the Home page | `products.js` | `featured: true` |
| Ingredients / shelf life / storage | `products.js` | `ingredients`, `shelfLifeDays`, `storage` |
| Ingredient & allergen names | `data.js` | `FRONELLA.INGREDIENTS`, `FRONELLA.ALLERGENS` |
| Any button / heading wording | `i18n.js` | same key in both `en` and `gu` |

Always keep commas between blocks and quotes around text — a missing comma stops the page from loading.

### Adding photos
1. Crop out any printed prices from catalogue photos.
2. Save as JPG (about 1200 × 1000 px, under ~250 KB) into `assets/img/products/`, named after the sweet's `id`, e.g. `kaju-katri-1.jpg`, `kaju-katri-2.jpg`.
3. In `products.js` set `images: ["assets/img/products/kaju-katri-1.jpg", "assets/img/products/kaju-katri-2.jpg"]`.
   The first photo is used on cards; all photos appear in the popup gallery.
   Sweets with `images: []` show a built-in illustration instead.

### Recipe details are marked "general guidance"
Every sweet currently has `verified: false`, so its popup shows a note that ingredients, allergens and shelf life
are typical for that kind of sweet, not confirmed for your recipe. When the kitchen confirms a sweet's details,
correct them in `products.js` and set `verified: true` — the note disappears for that sweet.

---

## 3. Before going live — please check

- **Piece weights** in `products.js` are estimates (e.g. kaju katri 10 g, burfi 25 g, ladoo 30-35 g, ghari 50 g). Weigh a few pieces and update them so the gift box builder is accurate.
- **House specials** — Thrivan Burfi, Rasbihari, Marshall Cake, Chandni Cake, Exotica, Brij Ladoo — have deliberately general descriptions. Replace them with your own.
- **Rasbihari** is set to `giftBox: false` (very perishable). Change it if you do pack it in boxes.
- **Spelling**: the logo artwork says *Khodiyar*, the printed box says *Khodiyar*. The site uses *Khodiyar*; change `byline` in `data.js` if needed.
- **About page** text (`about.*` keys in `i18n.js`) is a first draft — adjust it to your real story.
- **Google Maps pin**: the map searches "Aryanagar Main Road, Pedak Road, Rajkot". For an exact pin, replace the `iframe src` in `contact.html` with the embed link from Google Maps → Share → Embed a map.

---

## 4. How the gift box builder works

- Capacity = selected size in `BOX_SIZES`; each piece adds its `pieceWeight`.
- The **+** button refuses a piece that would exceed the box, and you can't switch to a smaller box than the current contents.
- Partly filled boxes are allowed; customers choose the number of identical boxes, an event date and notes.
- The selection is saved in the visitor's own browser (same device only) and sent to WhatsApp as a ready-made message.

## 5. Folder map

```
index.html  sweets.html  gift-boxes.html  bulk-orders.html  about.html  contact.html
assets/css/style.css        design (colours at the top: #0D6582 / #F0D778)
assets/js/data.js           contact info, box sizes, categories, ingredients
assets/js/products.js       all 65 sweets
assets/js/i18n.js           English + Gujarati interface text
assets/js/art.js            built-in sweet illustrations
assets/js/main.js           shared behaviour (language, popup, WhatsApp)
assets/js/catalog.js        Sweets page search + filters
assets/js/giftbox.js        gift box builder
assets/img/                 logo, favicon, box photos; products/ for sweet photos
```
