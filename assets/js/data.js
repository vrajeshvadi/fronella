// Product list. Edit names, prices and descriptions here.
// price      = rupees per kg
// pieceGrams = average weight of one piece in grams. Used by the gift box builder
//              to estimate the price of each piece. These are starting estimates:
//              weigh a few pieces of each sweet and update the numbers.
// Photos live in assets/img/sweets/<slug>.jpg
window.FAMILIES = [
 {
  "id": "katri",
  "name": "Kaju katri & rolls",
  "section": "dry",
  "blurb": "Seven katri flavours and four silver-wrapped rolls."
 },
 {
  "id": "dryfruit",
  "name": "Dry fruit specialties",
  "section": "dry",
  "blurb": "Shahi slabs, layered slices, fusion bites and a sugar-free option."
 },
 {
  "id": "ladoo",
  "name": "Ladoos",
  "section": "milk",
  "blurb": "From classic motichoor to chocolate."
 },
 {
  "id": "penda",
  "name": "Pendas",
  "section": "milk",
  "blurb": "From white and mawa to kesar badam."
 },
 {
  "id": "burfi",
  "name": "Burfis",
  "section": "milk",
  "blurb": "From mango and chocolate to kesar badam."
 },
 {
  "id": "milkcake",
  "name": "Milk cakes & classics",
  "section": "milk",
  "blurb": "Kalakand, milk cakes, thabdi, topra paak and ghari."
 }
];
window.SWEETS = [
 {
  "name": "Kaju Katri",
  "slug": "kaju-katri",
  "section": "dry",
  "family": "katri",
  "kind": "Kaju Katri",
  "price": 1000,
  "desc": "Classic cashew diamonds finished with silver varq.",
  "sugarFree": false,
  "pieceGrams": 12
 },
 {
  "name": "Chocolate Kaju Katri",
  "slug": "chocolate-kaju-katri",
  "section": "dry",
  "family": "katri",
  "kind": "Kaju Katri",
  "price": 1100,
  "desc": "Cashew katri topped with a rippled chocolate layer.",
  "sugarFree": false,
  "pieceGrams": 12
 },
 {
  "name": "Pista Kaju Katri",
  "slug": "pista-kaju-katri",
  "section": "dry",
  "family": "katri",
  "kind": "Kaju Katri",
  "price": 1100,
  "desc": "Two-layer cashew and pistachio katri with silver varq.",
  "sugarFree": false,
  "pieceGrams": 12
 },
 {
  "name": "Kesar Kaju Katri",
  "slug": "kesar-kaju-katri",
  "section": "dry",
  "family": "katri",
  "kind": "Kaju Katri",
  "price": 1100,
  "desc": "Saffron cashew layer under a smooth cream top.",
  "sugarFree": false,
  "pieceGrams": 12
 },
 {
  "name": "Gulab Kaju Katri",
  "slug": "gulab-kaju-katri",
  "section": "dry",
  "family": "katri",
  "kind": "Kaju Katri",
  "price": 1100,
  "desc": "Rose-scented cashew layer with a creamy top.",
  "sugarFree": false,
  "pieceGrams": 12
 },
 {
  "name": "Strawberry Kaju Katri",
  "slug": "strawberry-kaju-katri",
  "section": "dry",
  "family": "katri",
  "kind": "Kaju Katri",
  "price": 1100,
  "desc": "Strawberry cashew diamonds studded with nuts.",
  "sugarFree": false,
  "pieceGrams": 12
 },
 {
  "name": "Biscoff Kaju Katri",
  "slug": "biscoff-kaju-katri",
  "section": "dry",
  "family": "katri",
  "kind": "Kaju Katri",
  "price": 1200,
  "desc": "Cashew katri blended with caramel Biscoff.",
  "sugarFree": false,
  "pieceGrams": 12
 },
 {
  "name": "Kaju Anjeer Roll",
  "slug": "kaju-anjeer-roll",
  "section": "dry",
  "family": "katri",
  "kind": "Kaju Roll",
  "price": 1100,
  "desc": "Silver-wrapped cashew roll with a fig centre.",
  "sugarFree": false,
  "pieceGrams": 20
 },
 {
  "name": "Kaju Kesar Roll",
  "slug": "kaju-kesar-roll",
  "section": "dry",
  "family": "katri",
  "kind": "Kaju Roll",
  "price": 1100,
  "desc": "Cashew roll with a saffron-infused core.",
  "sugarFree": false,
  "pieceGrams": 20
 },
 {
  "name": "Kaju Blueberry Roll",
  "slug": "kaju-blueberry-roll",
  "section": "dry",
  "family": "katri",
  "kind": "Kaju Roll",
  "price": 1100,
  "desc": "Cashew roll with a blueberry filling.",
  "sugarFree": false,
  "pieceGrams": 20
 },
 {
  "name": "Kaju Pista Roll",
  "slug": "kaju-pista-roll",
  "section": "dry",
  "family": "katri",
  "kind": "Kaju Roll",
  "price": 1100,
  "desc": "Cashew roll with a pistachio centre.",
  "sugarFree": false,
  "pieceGrams": 20
 },
 {
  "name": "Exotica",
  "slug": "exotica",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Signature",
  "price": 1100,
  "desc": "Creamy cashew squares with mixed dry fruits.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Dry Fruit Date Bites",
  "slug": "dry-fruit-date-bites",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Signature",
  "price": 1100,
  "desc": "Dates bound with crunchy almonds and cashews.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Dry Fruit Creamy Ball",
  "slug": "dry-fruit-creamy-ball",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Signature",
  "price": 1100,
  "desc": "Creamy dry-fruit balls crowned with pistachio.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Dry Fruit Biscoff Basket",
  "slug": "dry-fruit-biscoff-basket",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Fusion",
  "price": 1280,
  "desc": "Nut-crusted cups with a Biscoff cream centre.",
  "sugarFree": false,
  "pieceGrams": 30
 },
 {
  "name": "Hazelnut Blast",
  "slug": "hazelnut-blast",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Fusion",
  "price": 1280,
  "desc": "Cashew cups with a chocolate-hazelnut filling.",
  "sugarFree": false,
  "pieceGrams": 30
 },
 {
  "name": "Kaju Cranberry Delight",
  "slug": "kaju-cranberry-delight",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Fusion",
  "price": 1280,
  "desc": "Cranberry-studded cashew squares.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Dry Fruit Gulab Shahi",
  "slug": "dry-fruit-gulab-shahi",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Shahi",
  "price": 1280,
  "desc": "Whole dry fruits set with rose petals.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Kaju Shahi",
  "slug": "kaju-shahi",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Shahi",
  "price": 1280,
  "desc": "Rich cashew slab loaded with mixed nuts.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Pista Shahi",
  "slug": "pista-shahi",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Shahi",
  "price": 1280,
  "desc": "Pistachio-packed slab with a creamy top.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Dry Fruit Khazana",
  "slug": "dry-fruit-khazana",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Signature",
  "price": 1280,
  "desc": "Pistachio pods packed with crushed nuts.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Pista Madhur",
  "slug": "pista-madhur",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Layered",
  "price": 1280,
  "desc": "Layered pistachio and dry-fruit slice.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Cream Kesar Dry Fruit",
  "slug": "cream-kesar-dry-fruit",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Layered",
  "price": 1280,
  "desc": "Saffron dry-fruit base with a cream topping.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Kaju Pistachio",
  "slug": "kaju-pistachio",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Layered",
  "price": 1280,
  "desc": "Cashew and pistachio layers with a cream finish.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Almond Saffron",
  "slug": "almond-saffron",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Layered",
  "price": 1280,
  "desc": "Saffron almond layer under a cream top.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Strawberry Piña",
  "slug": "strawberry-pina",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Layered",
  "price": 1280,
  "desc": "Strawberry and pineapple layers with nuts and cream.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Rose Delight",
  "slug": "rose-delight",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Layered",
  "price": 1280,
  "desc": "Rose dry-fruit layers finished with petals.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Roasted Badam",
  "slug": "roasted-badam",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Signature",
  "price": 1280,
  "desc": "A crunchy slab of roasted almonds.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Dry Fruit Anjeer Bite",
  "slug": "dry-fruit-anjeer-bite",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Signature",
  "price": 1280,
  "desc": "Fig and dry-fruit square topped with pistachio.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Dry Fruit Honey Ball",
  "slug": "dry-fruit-honey-ball",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Signature",
  "price": 1280,
  "desc": "Honey-glazed clusters of almonds and cashews.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Kaju Strawberry Pizza",
  "slug": "kaju-strawberry-pizza",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Kaju Pizza",
  "price": 1280,
  "desc": "Cashew wedges with a strawberry-nut filling.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Kaju Diamond Pizza",
  "slug": "kaju-diamond-pizza",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Kaju Pizza",
  "price": 1280,
  "desc": "Pistachio-dusted cashew wedges with a nut filling.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Kaju Strawberry Cream",
  "slug": "kaju-strawberry-cream",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Fusion",
  "price": 1280,
  "desc": "Strawberry dry-fruit rounds with a cream crown.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Sugar-Free Badam",
  "slug": "sugar-free-badam",
  "section": "dry",
  "family": "dryfruit",
  "kind": "Sugar-free",
  "price": 1400,
  "desc": "Sugar-free almond and dry-fruit slab.",
  "sugarFree": true,
  "pieceGrams": 25
 },
 {
  "name": "Kesar Badam Ladoo",
  "slug": "kesar-badam-ladoo",
  "section": "milk",
  "family": "ladoo",
  "kind": "Ladoo",
  "price": 540,
  "desc": "Saffron ladoo coated with sliced almonds.",
  "sugarFree": false,
  "pieceGrams": 35
 },
 {
  "name": "Pista Ladoo",
  "slug": "pista-ladoo",
  "section": "milk",
  "family": "ladoo",
  "kind": "Ladoo",
  "price": 540,
  "desc": "Pistachio ladoo rolled in crushed pista.",
  "sugarFree": false,
  "pieceGrams": 35
 },
 {
  "name": "Brij Ladoo",
  "slug": "brij-ladoo",
  "section": "milk",
  "family": "ladoo",
  "kind": "Ladoo",
  "price": 520,
  "desc": "Coconut-dusted ladoo with raisins.",
  "sugarFree": false,
  "pieceGrams": 35
 },
 {
  "name": "Magaj Ladoo",
  "slug": "magaj-ladoo",
  "section": "milk",
  "family": "ladoo",
  "kind": "Ladoo",
  "price": 480,
  "desc": "Traditional gram-flour ladoo made with ghee.",
  "sugarFree": false,
  "pieceGrams": 35
 },
 {
  "name": "Chocolate Ladoo",
  "slug": "chocolate-ladoo",
  "section": "milk",
  "family": "ladoo",
  "kind": "Ladoo",
  "price": 500,
  "desc": "Rich ladoo covered in chocolate chips.",
  "sugarFree": false,
  "pieceGrams": 35
 },
 {
  "name": "Motichoor Ladoo",
  "slug": "motichoor-ladoo",
  "section": "milk",
  "family": "ladoo",
  "kind": "Ladoo",
  "price": 320,
  "desc": "Fine boondi ladoo, the festive classic.",
  "sugarFree": false,
  "pieceGrams": 35
 },
 {
  "name": "White Penda",
  "slug": "white-penda",
  "section": "milk",
  "family": "penda",
  "kind": "Penda",
  "price": 420,
  "desc": "Soft, milky white penda.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Mawa Penda",
  "slug": "mawa-penda",
  "section": "milk",
  "family": "penda",
  "kind": "Penda",
  "price": 440,
  "desc": "Caramel-toned penda made from rich mawa.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Rajwadi Penda",
  "slug": "rajwadi-penda",
  "section": "milk",
  "family": "penda",
  "kind": "Penda",
  "price": 440,
  "desc": "Royal-style penda with a grainy texture.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Chocolate Penda",
  "slug": "chocolate-penda",
  "section": "milk",
  "family": "penda",
  "kind": "Penda",
  "price": 440,
  "desc": "Rich cocoa penda.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Kesar Penda",
  "slug": "kesar-penda",
  "section": "milk",
  "family": "penda",
  "kind": "Penda",
  "price": 480,
  "desc": "Saffron-infused penda.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Thabdi Penda",
  "slug": "thabdi-penda",
  "section": "milk",
  "family": "penda",
  "kind": "Penda",
  "price": 480,
  "desc": "Thabdi-style penda with a grainy bite.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Kesar Badam Penda",
  "slug": "kesar-badam-penda",
  "section": "milk",
  "family": "penda",
  "kind": "Penda",
  "price": 540,
  "desc": "Saffron penda with almond.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Chocolate Burfi",
  "slug": "chocolate-burfi",
  "section": "milk",
  "family": "burfi",
  "kind": "Burfi",
  "price": 420,
  "desc": "Chocolate layer over classic milk burfi.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Mango Burfi",
  "slug": "mango-burfi",
  "section": "milk",
  "family": "burfi",
  "kind": "Burfi",
  "price": 420,
  "desc": "Mango layer over milk burfi.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Thrivan Burfi",
  "slug": "thrivan-burfi",
  "section": "milk",
  "family": "burfi",
  "kind": "Burfi",
  "price": 460,
  "desc": "Three layers: pistachio, chocolate and rose.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Bournvita Burfi",
  "slug": "bournvita-burfi",
  "section": "milk",
  "family": "burfi",
  "kind": "Burfi",
  "price": 460,
  "desc": "Layered malt burfi topped with a cherry.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "GemNut Burfi",
  "slug": "gemnut-burfi",
  "section": "milk",
  "family": "burfi",
  "kind": "Burfi",
  "price": 460,
  "desc": "Milk burfi with tutti-frutti and nuts.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Butterscotch Burfi",
  "slug": "butterscotch-burfi",
  "section": "milk",
  "family": "burfi",
  "kind": "Burfi",
  "price": 460,
  "desc": "Butterscotch milk burfi with almond flakes.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Mawa Milk Burfi",
  "slug": "mawa-milk-burfi",
  "section": "milk",
  "family": "burfi",
  "kind": "Burfi",
  "price": 460,
  "desc": "Mawa burfi with chocolate chips and pistachio.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Kesar Anjeer Burfi",
  "slug": "kesar-anjeer-burfi",
  "section": "milk",
  "family": "burfi",
  "kind": "Burfi",
  "price": 480,
  "desc": "Saffron burfi layered on a fig base.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Pista Burfi",
  "slug": "pista-burfi",
  "section": "milk",
  "family": "burfi",
  "kind": "Burfi",
  "price": 500,
  "desc": "Pistachio burfi topped with slivered pista.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Kesar Badam Burfi",
  "slug": "kesar-badam-burfi",
  "section": "milk",
  "family": "burfi",
  "kind": "Burfi",
  "price": 500,
  "desc": "Saffron burfi with almonds.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Kalakand",
  "slug": "kalakand",
  "section": "milk",
  "family": "milkcake",
  "kind": "Kalakand",
  "price": 480,
  "desc": "Moist, grainy milk kalakand with pistachio.",
  "sugarFree": false,
  "pieceGrams": 30
 },
 {
  "name": "Biscoff Kalakand",
  "slug": "biscoff-kalakand",
  "section": "milk",
  "family": "milkcake",
  "kind": "Kalakand",
  "price": 600,
  "desc": "Kalakand with a Biscoff crumb top.",
  "sugarFree": false,
  "pieceGrams": 30
 },
 {
  "name": "Malai Cake",
  "slug": "malai-cake",
  "section": "milk",
  "family": "milkcake",
  "kind": "Milk Cake",
  "price": 520,
  "desc": "Soft malai cake topped with pistachio.",
  "sugarFree": false,
  "pieceGrams": 30
 },
 {
  "name": "Marshall Cake",
  "slug": "marshall-cake",
  "section": "milk",
  "family": "milkcake",
  "kind": "Milk Cake",
  "price": 460,
  "desc": "Two-layer milk cake, saffron and caramel.",
  "sugarFree": false,
  "pieceGrams": 30
 },
 {
  "name": "Chandni Cake",
  "slug": "chandni-cake",
  "section": "milk",
  "family": "milkcake",
  "kind": "Milk Cake",
  "price": 460,
  "desc": "Layered pistachio and saffron milk cake.",
  "sugarFree": false,
  "pieceGrams": 30
 },
 {
  "name": "Rasbihari",
  "slug": "rasbihari",
  "section": "milk",
  "family": "milkcake",
  "kind": "Milk Cake",
  "price": 460,
  "desc": "Pistachio layer on a milk-cake base.",
  "sugarFree": false,
  "pieceGrams": 30
 },
 {
  "name": "Thabdi",
  "slug": "thabdi",
  "section": "milk",
  "family": "milkcake",
  "kind": "Classic",
  "price": 460,
  "desc": "Classic Gujarati thabdi with nuts.",
  "sugarFree": false,
  "pieceGrams": 30
 },
 {
  "name": "Topra Paak",
  "slug": "topra-paak",
  "section": "milk",
  "family": "milkcake",
  "kind": "Classic",
  "price": 420,
  "desc": "Coconut paak with a soft bite.",
  "sugarFree": false,
  "pieceGrams": 25
 },
 {
  "name": "Dry Fruit Ghari",
  "slug": "dry-fruit-ghari",
  "section": "milk",
  "family": "milkcake",
  "kind": "Classic",
  "price": 640,
  "desc": "Surat-style ghari filled with dry fruits.",
  "sugarFree": false,
  "pieceGrams": 50
 }
];
