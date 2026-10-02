/* =====================================================================
   FRONELLA — SITE DATA  (edit this file to manage the website)
   ---------------------------------------------------------------------
   Everything the shop owner normally changes lives here:
     • SITE        - phone, WhatsApp, address, hours
     • BOX_SIZES   - gift box sizes (grams)
     • CATEGORIES  - sweet categories
     • INGREDIENTS - ingredient names in English + Gujarati
     • PRODUCTS    - every sweet (in products.js)

   After editing, save the file and refresh the page. No build step.
   NEVER add prices anywhere — the website is price-free by design.
   ===================================================================== */

window.FRONELLA = window.FRONELLA || {};

FRONELLA.SITE = {
  brand: "Fronella",
  byline: { en: "By Khodiyar Dairy Farm", gu: "ખોડિયાર ડેરી ફાર્મ દ્વારા" },
  phoneDisplay: "+91 96380 69311",
  phoneDial: "+919638069311",        // used for the Call button
  whatsapp: "919638069311",          // country code + number, digits only
  address: {
    en: "Aryanagar Main Road, Aryanagar Society, Pedak Road, Rajkot, Gujarat",
    gu: "આર્યનગર મેઇન રોડ, આર્યનગર સોસાયટી, પેડક રોડ, રાજકોટ, ગુજરાત"
  },
  hours: { en: "Open daily, 6:00 am - 10:30 pm", gu: "દરરોજ ખુલ્લું, સવારે 6:00 - રાત્રે 10:30" },
  mapQuery: "Aryanagar Main Road, Pedak Road, Rajkot, Gujarat"
};

/* Gift box sizes. `grams` is the capacity used by the box builder.
   Add / remove sizes freely, e.g. { id: "2000", grams: 2000, ... } */
FRONELLA.BOX_SIZES = [
  { id: "250",  grams: 250,  label: { en: "250 g", gu: "250 ગ્રામ" }, note: { en: "A thoughtful little hello", gu: "નાની, મીઠી ભેટ" } },
  { id: "500",  grams: 500,  label: { en: "500 g", gu: "500 ગ્રામ" }, note: { en: "Perfect for families", gu: "પરિવાર માટે યોગ્ય" } },
  { id: "1000", grams: 1000, label: { en: "1 kg",  gu: "1 કિલો" },   note: { en: "The grand celebration box", gu: "ભવ્ય ઉજવણી માટે" } }
];

/* Categories. `id` is used by products; `art` picks the illustration
   shown when a sweet has no photo yet. */
FRONELLA.CATEGORIES = [
  { id: "kaju-katri", name: { en: "Kaju Katri & Kaju Slices", gu: "કાજુ કતરી અને કાજુ સ્લાઇસ" },
    short: { en: "Kaju Katri", gu: "કાજુ કતરી" },
    blurb: { en: "Silky cashew fudge, cut into classic diamonds.", gu: "રેશમી કાજુની કતરી, પરંપરાગત હીરા આકારમાં." } },
  { id: "kaju-rolls", name: { en: "Kaju Rolls", gu: "કાજુ રોલ" },
    short: { en: "Kaju Rolls", gu: "કાજુ રોલ" },
    blurb: { en: "Cashew dough rolled around rich, fruity centres.", gu: "સ્વાદિષ્ટ ભરણ સાથે વાળેલા કાજુ રોલ." } },
  { id: "dry-fruit", name: { en: "Premium Dry Fruit & Fusion Specialties", gu: "પ્રીમિયમ ડ્રાયફ્રૂટ અને ફ્યુઝન સ્પેશિયાલિટી" },
    short: { en: "Dry Fruit & Fusion", gu: "ડ્રાયફ્રૂટ અને ફ્યુઝન" },
    blurb: { en: "Our signature creations — nuts, fruit and modern flavours.", gu: "અમારી ખાસ રચનાઓ — સૂકો મેવો, ફળ અને નવા સ્વાદ." } },
  { id: "burfi", name: { en: "Burfi Varieties", gu: "બરફીની વેરાયટી" },
    short: { en: "Burfi", gu: "બરફી" },
    blurb: { en: "Soft mawa squares in classic and playful flavours.", gu: "પરંપરાગત અને નવા સ્વાદમાં નરમ માવા બરફી." } },
  { id: "penda", name: { en: "Penda Varieties", gu: "પેંડાની વેરાયટી" },
    short: { en: "Penda", gu: "પેંડા" },
    blurb: { en: "Saurashtra's favourite — slow-cooked milk pendas.", gu: "સૌરાષ્ટ્રના પ્રિય — ધીમા તાપે બનેલા દૂધના પેંડા." } },
  { id: "ladoo", name: { en: "Ladoo Varieties", gu: "લાડુની વેરાયટી" },
    short: { en: "Ladoo", gu: "લાડુ" },
    blurb: { en: "Festive ladoos, hand-rolled in pure ghee.", gu: "શુદ્ધ ઘીમાં હાથે વાળેલા તહેવારી લાડુ." } },
  { id: "milk-cakes", name: { en: "Milk Cakes, Kalakand & Traditional Mawa Delicacies", gu: "મિલ્ક કેક, કલાકંદ અને પરંપરાગત માવાની વાનગીઓ" },
    short: { en: "Milk Cakes & Mawa", gu: "મિલ્ક કેક અને માવો" },
    blurb: { en: "Grainy, caramelised and creamy dairy classics.", gu: "દાણાદાર, શેકેલી અને મલાઈદાર દૂધની વાનગીઓ." } }
];

/* Ingredient dictionary. Products list ingredient keys; names are shown
   in the visitor's language. `allergen` links to ALLERGENS below. */
FRONELLA.INGREDIENTS = {
  cashew:      { en: "Cashew nuts", gu: "કાજુ", allergen: "treeNuts" },
  almond:      { en: "Almonds", gu: "બદામ", allergen: "treeNuts" },
  pistachio:   { en: "Pistachios", gu: "પિસ્તા", allergen: "treeNuts" },
  walnut:      { en: "Walnuts", gu: "અખરોટ", allergen: "treeNuts" },
  hazelnut:    { en: "Hazelnuts", gu: "હેઝલનટ", allergen: "treeNuts" },
  mixedNuts:   { en: "Mixed dry fruits", gu: "મિક્સ ડ્રાયફ્રૂટ", allergen: "treeNuts" },
  sugar:       { en: "Sugar", gu: "ખાંડ" },
  sweetener:   { en: "Sugar substitute (sugar-free sweetener)", gu: "સુગર-ફ્રી સ્વીટનર" },
  honey:       { en: "Honey", gu: "મધ" },
  ghee:        { en: "Pure ghee", gu: "શુદ્ધ ઘી", allergen: "milk" },
  milk:        { en: "Milk", gu: "દૂધ", allergen: "milk" },
  mawa:        { en: "Mawa (khoya)", gu: "માવો", allergen: "milk" },
  cream:       { en: "Fresh cream / malai", gu: "મલાઈ", allergen: "milk" },
  chhena:      { en: "Chhena (fresh milk solids)", gu: "છેના", allergen: "milk" },
  milkPowder:  { en: "Milk powder", gu: "મિલ્ક પાવડર", allergen: "milk" },
  saffron:     { en: "Saffron (kesar)", gu: "કેસર" },
  cardamom:    { en: "Cardamom", gu: "એલચી" },
  nutmeg:      { en: "Nutmeg", gu: "જાયફળ" },
  rose:        { en: "Rose (gulkand / rose essence)", gu: "ગુલાબ (ગુલકંદ / એસેન્સ)" },
  cocoa:       { en: "Cocoa", gu: "કોકો" },
  chocolate:   { en: "Chocolate", gu: "ચોકલેટ", allergen: "soy" },
  biscoff:     { en: "Caramelised spiced biscuit (Biscoff)", gu: "બિસ્કોફ બિસ્કિટ", allergen: "gluten" },
  biscoffSpread:{ en: "Biscoff spread", gu: "બિસ્કોફ સ્પ્રેડ", allergen: "gluten" },
  strawberry:  { en: "Strawberry", gu: "સ્ટ્રોબેરી" },
  blueberry:   { en: "Blueberry", gu: "બ્લુબેરી" },
  cranberry:   { en: "Dried cranberries", gu: "ક્રેનબેરી" },
  pineapple:   { en: "Pineapple", gu: "અનાનસ" },
  mango:       { en: "Mango", gu: "કેરી" },
  fig:         { en: "Figs (anjeer)", gu: "અંજીર" },
  dates:       { en: "Dates (khajur)", gu: "ખજૂર" },
  raisins:     { en: "Raisins", gu: "કિસમિસ" },
  coconut:     { en: "Coconut (topra)", gu: "ટોપરું" },
  besan:       { en: "Gram flour (besan)", gu: "ચણાનો લોટ (બેસન)" },
  maida:       { en: "Refined wheat flour", gu: "મેંદો", allergen: "gluten" },
  maltPowder:  { en: "Chocolate malt drink powder", gu: "ચોકલેટ માલ્ટ પાવડર", allergen: "gluten" },
  candyButtons:{ en: "Sugar-coated chocolate buttons", gu: "રંગીન ચોકલેટ બટન", allergen: "soy" },
  butterscotch:{ en: "Butterscotch / caramel", gu: "બટરસ્કોચ", allergen: "milk" },
  silverLeaf:  { en: "Edible silver leaf (varakh)", gu: "ચાંદીનો વરખ" },
  flavour:     { en: "Permitted natural / nature-identical flavour", gu: "માન્ય ફ્લેવર" },
  colour:      { en: "Permitted food colour", gu: "માન્ય ખાદ્ય રંગ" }
};

FRONELLA.ALLERGENS = {
  treeNuts: { en: "Tree nuts", gu: "સૂકો મેવો (ટ્રી નટ્સ)" },
  milk:     { en: "Milk / dairy", gu: "દૂધ / ડેરી" },
  gluten:   { en: "Gluten (wheat)", gu: "ગ્લુટેન (ઘઉં)" },
  soy:      { en: "Soy (may be present in chocolate)", gu: "સોયા (ચોકલેટમાં હોઈ શકે)" }
};

/* Storage advice, chosen per product with `storage: "ambient"` etc. */
FRONELLA.STORAGE = {
  ambient: { en: "Keep in an airtight container in a cool, dry place away from sunlight. In hot or humid weather, refrigerate.",
             gu: "એરટાઇટ ડબ્બામાં ઠંડી, સૂકી જગ્યાએ તડકાથી દૂર રાખો. ગરમી કે ભેજમાં ફ્રિજમાં રાખો." },
  chill:   { en: "Keep refrigerated in an airtight container. Rest at room temperature for 10 minutes before serving.",
             gu: "એરટાઇટ ડબ્બામાં ફ્રિજમાં રાખો. પીરસતા પહેલાં 10 મિનિટ રૂમ તાપમાને રાખો." },
  chillFresh: { en: "Highly perishable — keep refrigerated at all times and enjoy fresh.",
             gu: "જલ્દી બગડી શકે — હંમેશાં ફ્રિજમાં રાખો અને તાજું જ માણો." }
};
