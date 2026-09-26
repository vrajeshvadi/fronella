# Fronella by Khodiyar Dairy Farm website

A static website for the shop: the Diwali 2026 sweet collection with photos, prices, a price list, gift boxes, and a download link for the PDF catalogue. It needs no server, database or build step, so it runs on GitHub Pages for free.

## Files

| File or folder | What it holds |
| --- | --- |
| `index.html` | The main page |
| `box.html` | The "Build a box" page where customers make their own gift box |
| `assets/js/config.js` | Your phone, WhatsApp, address, hours, Instagram, FSSAI number and gift box sizes |
| `assets/js/data.js` | Every sweet: name, description, price per kg, family, weight of one piece |
| `assets/css/style.css` | Colours, fonts and layout |
| `assets/img/sweets/` | One photo per sweet, named after the sweet |
| `catalogue/` | The PDF catalogue visitors can download |

## 1. Add your contact details

Open `assets/js/config.js` and fill in the values, for example:

```js
whatsapp: "919876543210",
phone: "+91 98765 43210",
address: "Shop 4, Example Road\nVadodara, Gujarat",
```

Once `whatsapp` is filled in, every sweet gets an "Order on WhatsApp" link and the order and gift box sections get WhatsApp buttons. Anything left as `""` stays hidden.

## 2. Set up the gift box builder

Customers pick a box size, add sweets piece by piece and see an estimated price. They can then send the box to you on WhatsApp, copy the details, or copy a link that opens the same box.

The price of each piece is worked out as **price per kg × weight of one piece**. Two things to check:

- **Piece weights.** Every sweet in `assets/js/data.js` has `pieceGrams`, the average weight of one piece. The numbers in the file are starting estimates (for example 12 g for kaju katri, 35 g for a ladoo). Weigh a few pieces of each sweet and update them so the prices are accurate.
- **Box sizes and prices.** In `assets/js/config.js`, `boxes` lists the sizes (9, 16 and 25 pieces to start). Set `price` to the cost of the empty box, or leave it at `0` to show only the sweets' price. You can rename sizes, change the number of pieces, or add more sizes.

## 3. Put it on GitHub Pages

1. Sign in at github.com and create a new repository, for example `fronella`. Make it **Public**.
2. On the new repository page, click **uploading an existing file**.
3. Unzip this folder on your computer and drag everything inside it (`index.html`, `box.html`, `assets`, `catalogue`, `README.md`, `.nojekyll`) into the upload area. Click **Commit changes**.
4. Go to **Settings → Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main** and folder to **/ (root)**. Click **Save**.
5. After a minute or two the site is live at `https://YOUR-USERNAME.github.io/fronella/`.

The `.nojekyll` file is hidden on some computers. If it doesn't upload, the site still works.

### Using your own domain (optional)

In **Settings → Pages → Custom domain**, enter your domain (for example `www.fronella.in`) and follow GitHub's instructions to add a DNS record with your domain provider.

## 4. Changing sweets or prices

- **Price or description:** edit the sweet in `assets/js/data.js` and upload the file again.
- **New sweet:** add an entry in `data.js` (including `pieceGrams`) and put a 4:3 photo named `<slug>.jpg` in `assets/img/sweets/`. The `slug` is the name in lowercase with dashes, for example `kaju-katri`.
- **New catalogue:** replace the PDF in `catalogue/`, keeping the same file name.

On GitHub you can edit a file in the browser: open it, click the pencil icon, make the change and click **Commit changes**. The site updates within a couple of minutes.
