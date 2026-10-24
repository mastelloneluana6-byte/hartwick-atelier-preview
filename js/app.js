// ==========================================================================
// HARTWICK ATELIER — APPLICATION CONTROLLER
// Launch-Ready Preview with:
// - Phase 1 (§1 – §7) AND Phase 2 (§8.1 – §8.10) BOTH ACTIVE BY DEFAULT
// - Explicit Brief Number Badges (§1 through §8.10 + Product #01–#66)
// - One-click toggle to show/hide Brief Number Badges
// ==========================================================================

const SQS_CDN = "https://images.squarespace-cdn.com/content/v1/662ec4008fa24077e0d8b6b0/";

const STATE = {
  phase2Enabled: false,
  showBriefBadges: false,
  designConcept: "B", // "B" = Botanical Archive & Atelier (Warm Khadi + Interactive Dye Lab) | "A" = Architectural Gallery (Cool Chalk)
  activeDyeLabIndex: 0,
  glossaryCategoryFilter: "ALL",
  activeAtelierStageIndex: 0,
  currentView: "home",
  currentCollection: "all-apparel",
  techniqueFilter: "ALL",
  currentProductHandle: "tribeca-matka-silk-emerald",
  lastPdpHandle: "tribeca-matka-silk-emerald",
  cameFromPdp: false,
  activeGlossaryId: "02",
  selectedSize: "S",
  selectedImageIndex: 0,
  currency: "EUR",
  shippingRegion: "EU",
  cart: [],
  wishlist: ["tribeca-matka-silk-emerald", "palma-fresh-pink-cotton"],
  collectionSearchQuery: ""
};

function handleCollectionSearch(val) {
  STATE.collectionSearchQuery = val;
  renderApp();
  const input = document.getElementById("editorial-collection-search-input");
  if (input) {
    input.focus();
    const len = input.value.length;
    input.setSelectionRange(len, len);
  }
}

function clearCollectionSearch() {
  STATE.collectionSearchQuery = "";
  renderApp();
  const input = document.getElementById("editorial-collection-search-input");
  if (input) input.focus();
}

function openSearchInCollection() {
  if (STATE.currentView !== "collection") {
    navigateTo("collection", "all-apparel");
  }
  setTimeout(() => {
    const input = document.getElementById("editorial-collection-search-input");
    if (input) {
      input.scrollIntoView({ behavior: "smooth", block: "center" });
      input.focus();
    }
  }, 80);
}

// ==========================================================================
// SHANNON BOTANICAL DYES — REAL HAND-PAINTED BOTANICAL DOTS & SWATCHES
// Extracted directly from Shannon's PDFs (SH_CIRCLES_01, SH_MARIGOLD, SH_WALNUT, SH_POKEBERRY)
// ==========================================================================
const BOTANICAL_BLOTS = {
  "marigold": {
    name: "Marigold & Iron Vat",
    lotCode: "VAT-MRG-01",
    img: "assets/blots/dot_iron_rust.png",
    swatch: "assets/blots/swatch_marigold.png"
  },
  "goldenrod": {
    name: "Goldenrod & Alum Mordant",
    lotCode: "VAT-GLD-02",
    img: "assets/blots/dot_goldenrod.png",
    swatch: "assets/blots/swatch_marigold.png"
  },
  "walnut": {
    name: "Black Walnut & Ash",
    lotCode: "VAT-WLN-03",
    img: "assets/blots/dot_walnut.png",
    swatch: "assets/blots/swatch_walnut.png"
  },
  "indigo": {
    name: "Fermented Wild Indigo & Moss",
    lotCode: "VAT-IND-04",
    img: "assets/blots/dot_indigo_moss.png",
    swatch: "assets/blots/dot_indigo_moss.png"
  },
  "pokeberry": {
    name: "Pokeberry & Madder Root",
    lotCode: "VAT-PKB-05",
    img: "assets/blots/dot_apricot.png",
    swatch: "assets/blots/swatch_pokeberry.png"
  },
  "emerald": {
    name: "Wild Indigo & Pomegranate Rind",
    lotCode: "VAT-EMR-06",
    img: "assets/blots/dot_indigo_moss.png",
    swatch: "assets/blots/dot_sand_speckle.png"
  }
};

function renderBotanicalBlot(type = "marigold", size = 44) {
  const b = BOTANICAL_BLOTS[type] || BOTANICAL_BLOTS["marigold"];
  return `
    <span class="botanical-blot-wrap" title="Shannon Botanical Dye: ${b.name}">
      <img
        src="${b.img}"
        alt="${b.name}"
        class="botanical-blot-svg"
        style="width:${size}px;height:${size}px;object-fit:contain;mix-blend-mode:multiply"
      />
    </span>
  `;
}

function setDesignConcept(concept) {
  STATE.designConcept = concept;
  document.body.classList.toggle("concept-a", concept === "A");
  document.body.classList.toggle("concept-b", concept === "B");
  const btnA = document.getElementById("concept-btn-a");
  const btnB = document.getElementById("concept-btn-b");
  if (btnA) btnA.classList.toggle("review-jump-btn--active", concept === "A");
  if (btnB) btnB.classList.toggle("review-jump-btn--active", concept === "B");
  renderApp();
}

function selectDyeLabSpecimen(idx) {
  STATE.activeDyeLabIndex = idx;
  renderApp();
}

function setGlossaryCategoryFilter(cat) {
  STATE.glossaryCategoryFilter = cat;
  renderApp();
}

function selectMasterDossierTechnique(id) {
  STATE.activeGlossaryId = id;
  renderApp();
}

function stepMasterDossierTechnique(delta) {
  const idx = HERITAGE_GLOSSARY_LIST.findIndex(item => item.id === STATE.activeGlossaryId);
  const nextIdx = (idx + delta + HERITAGE_GLOSSARY_LIST.length) % HERITAGE_GLOSSARY_LIST.length;
  STATE.activeGlossaryId = HERITAGE_GLOSSARY_LIST[nextIdx].id;
  renderApp();
}

function selectAtelierStage(idx) {
  STATE.activeAtelierStageIndex = idx;
  renderApp();
}

// ==========================================================================
// 12 HERITAGE TECHNIQUES GLOSSARY (Matches Aloha Design Screenshots + Squarespace Copy)
// ==========================================================================
const HERITAGE_GLOSSARY_LIST = [
  {
    id: "01",
    key: "khadi",
    name: "Khadi",
    summary: "HANDSPUN AND HANDWOVEN NATURAL-FIBRE CLOTH.",
    blot: "marigold",
    botanicalLabel: "Unbleached Cotton & Marigold Mordant",
    paragraphs: [
      "Khadi is made from handspun and handwoven natural fibers. From the harvest to the yarn to the weave, the material is made by hand without the use of electricity. It is a textile that holds the story of nature and sustainable economies, community and ancient craft.",
      "Weavers in villages across South Asia have been producing Khadi yarn from hand-spun cotton and silk for millennia. Wearing Khadi has a different feeling than wearing industrially produced fabrics — khadi drapes and breathes with a supple softness in a rhythm that can only be created by skilled human hands. The feeling is truly luxurious."
    ],
    image: SQS_CDN + "3a6786b9-45ce-459e-83cb-4bee1d2e3554/184_HARTWICK_STYLE_FABRIC4R1A8940.jpg"
  },
  {
    id: "02",
    key: "hand-spun",
    name: "Hand spun",
    summary: "NATURAL FIBRES DRAWN OUT AND TWISTED INTO YARN.",
    blot: "goldenrod",
    botanicalLabel: "Goldenrod & Raw Silk Fibre",
    paragraphs: [
      "Natural fibers are drawn out by hand and twisted together on the traditional charkha spinning wheel to form a living yarn. Unlike high-tension industrial spinning, hand-spinning preserves the micro-air pockets and natural spring of cotton, linen, and wild Matka silk.",
      "Every subtle variation in yarn thickness—known as a slub—records the touch and cadence of the master spinner's hand."
    ],
    image: SQS_CDN + "1761394286610-IZ46RMUKJAHY9K3G8K4Z/034_HARTWICK_HANDWOVEN_TRIBECA_SKIRT_SILK_AMMAN_SHIRT_LINEN_SILK.jpg"
  },
  {
    id: "03",
    key: "handwoven",
    name: "Handwoven",
    summary: "YARNS BROUGHT TOGETHER ON A HANDLOOM.",
    blot: "walnut",
    botanicalLabel: "Black Walnut & Loom Selvedge",
    paragraphs: [
      "Handspun yarns are interlaced on wooden pit looms and frame looms powered solely by the weaver's hands and feet. Without mechanical motors, the shuttle passes at a human pace, allowing the warp and weft to settle gently.",
      "The resulting cloth possesses a true woven selvedge, remarkable longevity, and a fluid architectural drape that softens with every year of wear."
    ],
    image: SQS_CDN + "1761394348125-TQL5OWNVAINE40XD9OXN/007_HARTWICK_HANDWOVEN_TRIBECA_SKIRT_KHADI_TOKYO_SHIRT.jpg"
  },
  {
    id: "04",
    key: "block-print",
    name: "Block printed by hand",
    summary: "PATTERN BUILT BY HAND, LAYER BY LAYER, COLOUR BY COLOUR.",
    blot: "pokeberry",
    botanicalLabel: "Madder Root & Fermented Iron",
    paragraphs: [
      "In India, artisans have used hand carved wooden blocks to print on handwoven fabric for nearly four thousand years. Using hand carved wooden blocks, Master Printers print each colour, layer by layer using resist dyeing techniques.",
      "Each piece requires a minimum of 16 processes, with the silk resting for at least a day between each step. Handwork naturally results in variations in colour and placement. We cherish these nuances for their human touch."
    ],
    image: SQS_CDN + "643566b4-c934-4030-922c-ec6f24a25e06/218_HARTWICK_FINESILK_LARGESQUARE_SCARF_NATURALDYE_BLOCKPRINT.jpg"
  },
  {
    id: "05",
    key: "wooden-blocks",
    name: "Hand carved wooden blocks",
    summary: "THE PATTERN CUT INTO WOOD, ONE BLOCK FOR EACH COLOUR.",
    blot: "walnut",
    botanicalLabel: "Seasoned Teakwood & Oil Cure",
    paragraphs: [
      "Each block print started as a tree, then a seasoned teakwood block, carved by hand with tiny chisels and mallets into sets of intricate relief patterns. A single motif requires a separate master outline block (Rekh) and multiple filler blocks (Datta) for each individual botanical shade.",
      "Before touching cloth, newly carved blocks are cured in mustard or sesame oil for days so the wood grain never warps."
    ],
    image: SQS_CDN + "9fa64956-028e-4a2c-aae7-8ba0e194e764/088_HARTWICK_FINESILK_PETITSQUARE01_SCARF_NATURALDYE_BLOCKPRINT.jpg"
  },
  {
    id: "06",
    key: "natural-dye",
    name: "Natural dye",
    summary: "COLOUR DRAWN FROM PLANTS AND MINERALS.",
    blot: "emerald",
    botanicalLabel: "Wild Indigo, Pomegranate & Turmeric",
    paragraphs: [
      "Master Colorists use ancient methods to create natural dyes using indigenous plants and minerals including wild indigo, pomegranate bark and seeds, tamarind, turmeric, jaggery, ash, and fermented iron.",
      "These artisanal dye vats rely on rare botanical knowledge and the natural cycles of sun, wind, and mineral water—yielding living colours with depth that synthetic pigments can never replicate."
    ],
    image: SQS_CDN + "0c0b1cbc-4c3e-43ad-b43d-1c2c4916289f/080_HARTWICK_OKANAGAN_ROBE_KALAMALKA_BLOCKPRINT.jpg"
  },
  {
    id: "07",
    key: "ajrakh",
    name: "Ajrakh",
    summary: "RESIST PRINTING, DYEING, WASHING AND TIME.",
    blot: "indigo",
    botanicalLabel: "Kutch Indigo & Myrobalan Resist",
    paragraphs: [
      "Practiced in Kutch and Barmer for generations, Ajrakh is a complex 16-to-20 step ritual of washing, myrobalan (harde) pre-treatment, natural gum and clay resist stamping, and repeated immersions in indigo and madder root vats.",
      "Its geometric stars and architectural symmetries echo the night sky over the desert."
    ],
    image: SQS_CDN + "1761394438684-TA2MPGD3PKODZ9YQWDO3/002_HARTWICK_SAMARKAND_DRESS_NATURALDYE_BLACKMARBLEINLAY_BLOCKPRINT_LIMINAL_EMERALD_RUBY_AQUAMARINE_DIAMOND_DROPEARRINGS.jpg"
  },
  {
    id: "08",
    key: "ikat",
    name: "Ikat",
    summary: "YARNS TIED AND DYED BEFORE THEY ARE WOVEN.",
    blot: "indigo",
    botanicalLabel: "Resist-Bound Warp & Weft Yarn",
    paragraphs: [
      "Unlike surface printing, Ikat patterns are born inside the yarn itself before it ever touches the loom. Bundles of warp and weft threads are mathematically mapped, tightly bound with water-resistant bindings, and dyed in sequential natural vats.",
      "When the bindings are untied and aligned on the handloom, the motif emerges with a signature feathered edge."
    ],
    image: SQS_CDN + "8b35627c-73f1-47cc-8e79-c94a0388f034/125_HARTWICK_HANDWOVEN_TOKYO_SHIRT_IKAT.jpg"
  },
  {
    id: "09",
    key: "gota-patti",
    name: "Gota Patti",
    summary: "SMALL PIECES OF RIBBON APPLIED AND STITCHED TO CLOTH.",
    blot: "goldenrod",
    botanicalLabel: "Jaipur Zari Ribbon Appliqué",
    paragraphs: [
      "Originating in the royal courts of Rajasthan, Gota Patti is the art of folding, shaping, and hand-stitching fine metallic Zari ribbon onto silk and velvet. Each tiny leaf or geometric petal is couched by hand with invisible thread."
    ],
    image: SQS_CDN + "a5e7be67-eacc-4e15-88af-5074b40dcb52/002001_HARTWICK_HANDEMBROIDERY_VENICE_BELT_GOTAPATTI.jpg"
  },
  {
    id: "10",
    key: "jamdani",
    name: "Jamdani",
    summary: "MOTIFS INTRODUCED BY HAND AS THE CLOTH IS WOVEN.",
    blot: "marigold",
    botanicalLabel: "Discontinuous Supplementary Weft",
    paragraphs: [
      "Recognized by UNESCO as an Intangible Cultural Heritage of Humanity, Jamdani is an ancient Bengal technique where intricate motifs are inlaid directly on the loom using fine bamboo spindles—making the pattern appear to float weightlessly inside sheer handwoven cotton."
    ],
    image: SQS_CDN + "1761393856799-C31HGGNECZJKGKS125XU/001_HARTWICK_HANDWOVEN_PALMA_SKIRT_KHADI_HANOI_SHIRT_JAMDANI.jpg"
  },
  {
    id: "11",
    key: "banaras-brocade",
    name: "Banaras brocade",
    summary: "DECORATIVE WEAVING, OFTEN IN SILK WITH ZARI THREADS.",
    blot: "goldenrod",
    botanicalLabel: "Varanasi Silk & Gold Zari",
    paragraphs: [
      "Woven in the historic looms of Varanasi (Banaras), these heirloom textiles intertwine fine mulberry silk with metallic gold and silver Zari threads to create luminous, sculptural brocades."
    ],
    image: SQS_CDN + "8d28d4d4-4b30-44c7-999b-636e1a552025/002+_HARTWICK_HANDWOVEN_MARYLEBONE_COAT_IKAT_BOMBAY_TROUSERS_SITGES_TOTEBAG.jpg"
  },
  {
    id: "12",
    key: "mashru-silk",
    name: "Mashru silk",
    summary: "LUSTROUS SILK EXTERIOR WOVEN WITH A SOFT COTTON INTERIOR.",
    blot: "pokeberry",
    botanicalLabel: "Satin-Weave Silk Warp & Cotton Weft",
    paragraphs: [
      "Mashru is an ingenious heritage weave that places luminous, plant-dyed silk on the outer face of the fabric while keeping breathable, comforting handspun cotton against the wearer's skin."
    ],
    image: SQS_CDN + "1761392514754-DYC1QWQ3N3J75IQF4AHO/019_HARTWICK_HANDWOVEN_SAMARKAND_DRESS_SILKCOTTON_VICTORIANROUGE_NATURALDYE_BLOCKPRINT.jpg.jpg"
  }
];

const CRAFT_GLOSSARY_DATA = {
  "khadi": {
    id: "01",
    title: "KHADI & HANDLOOM WEAVING",
    subtitle: "Handspun & Handwoven Without Electricity",
    body: "Khadi is made from handspun and handwoven natural fibers. From the harvest to the yarn on the charkha spinning wheel to the handloom weave, the material is crafted entirely by hand without electricity. It breathes with a supple softness in a rhythm that can only be created by skilled human hands."
  },
  "hand-spun": {
    id: "02",
    title: "HAND SPUN — FROM FIBRE TO YARN",
    subtitle: "Natural Fibres Drawn Out and Twisted by Hand",
    body: "Natural fibers are drawn out and twisted together on the charkha spinning wheel to form yarn. Every subtle slub records the human rhythm of the master spinner."
  },
  "handwoven": {
    id: "03",
    title: "HANDWOVEN ON PIT & FRAME LOOMS",
    subtitle: "Yarns Brought Together on a Handloom",
    body: "Handspun yarns are woven together on wooden handlooms without electricity, creating a breathable, heirloom cloth with true selvedge edges."
  },
  "block-print": {
    id: "04",
    title: "16-STEP HAND BLOCK PRINTING",
    subtitle: "Hand-Carved Teakwood Blocks & Mud Resist",
    body: "Using hand carved wooden blocks, Master Printers print each colour layer by layer using ancient resist dyeing techniques. Each piece requires a minimum of 16 processes, with the cloth resting for at least a full day between each step."
  },
  "natural-dye": {
    id: "06",
    title: "NATURAL & AYURVEDIC DYES",
    subtitle: "Living Plant, Root & Mineral Alchemy",
    body: "Master Colorists use ancient methods to create natural dyes using indigenous plants and minerals including wild indigo, pomegranate bark and seeds, tamarind, turmeric, jaggery, ash, and fermented iron."
  },
  "zari": {
    id: "09",
    title: "GOTA PATTI & JAIPUR GOLDSMITHING",
    subtitle: "Royal Atelier Metalwork & Lapidary Craft",
    body: "Hand-woven metallic Zari threads, Gota Patti ribbon embroidery, and 22k/23k gold settings forged by master stonecutters and goldsmiths in Jaipur."
  }
};

const COLLECTION_META = {
  "all-apparel": {
    title: "Apparel Collection",
    description: "Limited edition garments tailored from handspun and handwoven Khadi, wild silk, and natural dye block prints. Crafted by Master Artisans in small numbered lots."
  },
  "skirts-dresses": {
    title: "Skirts & Dresses",
    description: "Architectural pleats and fluid column silhouettes in handspun Khadi cotton, Matka silk, and 16-step natural dye block prints."
  },
  "shirts-blouses": {
    title: "Shirts & Blouses",
    description: "Heirloom shirtmaking crafted from UNESCO-heritage Jamdani muslin, yarn-dyed Ikat, and handspun silk-linen."
  },
  "trousers": {
    title: "Trousers",
    description: "High-waisted wide-leg and sculptural barrel-leg trousers in heavyweight handloom Khadi twill and double Ikat."
  },
  "coats-accessories": {
    title: "Coats & Accessories",
    description: "Hand-quilted reversible Ikat coats, Gota Patti embroidered silk velvet belts, and natural dye quilted travel bags."
  },
  "lounge": {
    title: "Lounge",
    description: "Ankle-sweeping block-printed robes, organic mulmul pyjama sets, and breathable linen-khadi resort silhouettes."
  },
  "fine-silk": {
    title: "Fine Silk",
    description: "Block printed by hand in natural dye. Each piece requires a minimum of 16 processes, with the mulberry silk resting for at least a day between each step."
  },
  "fine-jewellery": {
    title: "Fine Jewellery",
    description: "Inspired by traditional Indian jewellery, Byzantine and Anatolian archaeology. Handcrafted to order by master stonecutters, stone setters, and goldsmiths in Jaipur in 22k/23k gold and sterling silver."
  },
  "yoga-wellness": {
    title: "Upaya Handwoven Yoga Mats (Phase 2 — §8.9)",
    description: "Handwoven on pit looms in heavyweight organic Khadi and Ikat cotton, infused with medicinal Ayurvedic dyes of turmeric, wild indigo, and Himalayan rose."
  },
  "lot-0325": {
    title: "Lot 0325 — Pre Order",
    description: "Upcoming limited edition artisanal production lot. Reserve your piece prior to loom completion."
  },
  "lot-0924": {
    title: "Lot 0924 — Available in Small Quantities",
    description: "Current atelier edition. Handcrafted in small quantities and ready for immediate dispatch."
  },
  "lot-0324": {
    title: "Lot 0324 — Archive / Sold Out",
    description: "Completed heritage lot. View archival colourways and register via The Dispatch for future re-editions."
  }
};

function formatPrice(product) {
  if (STATE.currency === "GBP") {
    return `£${product.price_gbp.toLocaleString("en-GB")}`;
  }
  if (STATE.currency === "USD") {
    const usd = product.price_usd || Math.round(product.price_eur * 1.09);
    return `$${usd.toLocaleString("en-US")}`;
  }
  return `€${product.price_eur.toLocaleString("en-IE")}`;
}

function formatAmount(eurAmount) {
  if (STATE.currency === "GBP") {
    const gbp = Math.round(eurAmount * 0.855);
    return `£${gbp.toLocaleString("en-GB")}`;
  }
  if (STATE.currency === "USD") {
    const usd = Math.round(eurAmount * 1.09);
    return `$${usd.toLocaleString("en-US")}`;
  }
  return `€${eurAmount.toLocaleString("en-IE")}`;
}

function renderDyeBlockIcon() {
  return `
    <svg class="dye-block-ornament" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2">
      <rect x="6" y="6" width="36" height="36" />
      <rect x="12" y="12" width="24" height="24" />
      <path d="M24 6V42M6 24H42M12 12L36 36M36 12L12 36" stroke-opacity="0.55"/>
      <circle cx="24" cy="24" r="5" fill="currentColor"/>
    </svg>
  `;
}

// ==========================================================================
// BRIEF BADGE TOGGLE & PHASE 1 / PHASE 2 MODE SWITCHER
// ==========================================================================
function toggleBriefBadges() {
  STATE.showBriefBadges = !STATE.showBriefBadges;
  document.body.classList.toggle("hide-brief-tags", !STATE.showBriefBadges);
  const btn = document.getElementById("badge-toggle-btn");
  if (btn) {
    btn.innerHTML = STATE.showBriefBadges
      ? "✓ Brief Numbers: Visible"
      : "Brief Numbers: Hidden (Click to Show)";
  }
}

function jumpToBriefSection(view, sectionId) {
  if (STATE.currentView !== view) {
    STATE.currentView = view;
    renderApp();
  }
  setTimeout(() => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, 80);
}

function openCartWithDemoItem() {
  if (STATE.cart.length === 0 && window.HARTWICK_PRODUCTS && window.HARTWICK_PRODUCTS.length > 0) {
    const sample = window.HARTWICK_PRODUCTS[0];
    STATE.cart.push({
      key: `${sample.handle}__S`,
      product: sample,
      size: "S",
      qty: 1
    });
    renderHeaderAndFooterNav();
    renderCartDrawer();
  }
  openCartDrawer();
}

function togglePhaseMode() {
  STATE.phase2Enabled = !STATE.phase2Enabled;
  if (!STATE.phase2Enabled) {
    if (STATE.currency === "USD") STATE.currency = "EUR";
    if (STATE.shippingRegion === "US") STATE.shippingRegion = "EU";
    if (["yoga-wellness"].includes(STATE.currentCollection)) {
      STATE.currentCollection = "all-apparel";
    }
    if (["journal", "wholesale", "wishlist"].includes(STATE.currentView)) {
      STATE.currentView = "home";
    }
    STATE.techniqueFilter = "ALL";
  }

  const btn = document.getElementById("phase-toggle-btn");
  if (btn) {
    if (STATE.phase2Enabled) {
      btn.style.background = "#FAF8F4";
      btn.style.color = "#1A1A1A";
      btn.innerHTML = "✦ Phase 1 + Phase 2 Complete (§1–§8.10 Active)";
    } else {
      btn.style.background = "rgba(250,248,244,0.14)";
      btn.style.color = "#FAF8F4";
      btn.innerHTML = "Mode: Phase 1 Only (§1–§7) · Click for Phase 1+2";
    }
  }

  const currSelect = document.getElementById("currency-select");
  if (currSelect) {
    currSelect.innerHTML = `
      <option value="EUR" ${STATE.currency === "EUR" ? "selected" : ""}>EUR (€) [§5.2]</option>
      <option value="GBP" ${STATE.currency === "GBP" ? "selected" : ""}>GBP (£) [§5.2]</option>
      ${STATE.phase2Enabled ? `<option value="USD" ${STATE.currency === "USD" ? "selected" : ""}>USD ($) [§8.7 P2]</option>` : ""}
    `;
  }

  const footerNote = document.getElementById("footer-currency-note");
  if (footerNote) {
    footerNote.innerHTML = "EUR (€) · GBP (£) · USD ($) — Insured Worldwide Fulfilment";
  }

  renderHeaderAndFooterNav();
  renderApp();
  renderCartDrawer();
}

function renderHeaderAndFooterNav() {
  const nav = document.getElementById("primary-nav");
  const actions = document.getElementById("header-actions");
  const footerLinks = document.getElementById("footer-links-list");

  if (nav) {
    nav.innerHTML = `
      <!-- 1. COLLECTION + (Quiet Luxury Streamlined Apparel Megamenu) -->
      <div class="nav-item nav-item--megamenu">
        <button class="nav-link" onclick="navigateTo('collection', 'all-apparel')">
          <span>Collection</span>
          <span class="nav-caret">+</span>
        </button>
        <div class="nav-megamenu nav-megamenu--apparel">
          <div class="nav-megamenu__col">
            <span class="nav-megamenu__eyebrow">Apparel</span>
            <button class="nav-megamenu__link nav-megamenu__link--featured" onclick="navigateTo('collection', 'all-apparel')">All Apparel</button>
            <button class="nav-megamenu__link" onclick="navigateTo('collection', 'skirts-dresses')">Skirts &amp; Dresses</button>
            <button class="nav-megamenu__link" onclick="navigateTo('collection', 'shirts-blouses')">Shirts &amp; Blouses</button>
            <button class="nav-megamenu__link" onclick="navigateTo('collection', 'trousers')">Trousers</button>
            <button class="nav-megamenu__link" onclick="navigateTo('collection', 'coats-accessories')">Coats &amp; Robes</button>
            <button class="nav-megamenu__link" onclick="navigateTo('collection', 'lounge')">Lounge</button>
          </div>
        </div>
      </div>

      <!-- 2. THE MASTERS -->
      <div class="nav-item">
        <button class="nav-link" onclick="navigateTo('the-masters')">
          <span>The Masters</span>
        </button>
      </div>

      <!-- 3. JOURNAL -->
      <div class="nav-item">
        <button class="nav-link" onclick="navigateTo('our-story')">
          <span>Journal</span>
        </button>
      </div>
    `;
  }

  if (actions) {
    const totalQty = STATE.cart.reduce((sum, i) => sum + i.qty, 0);
    actions.innerHTML = `
      <!-- ABOUT Dropdown (Positioned on the Right of Logo per CD Instructions) -->
      <div class="nav-item header-about-nav-item">
        <button class="nav-link header-action-btn" onclick="navigateTo('our-story')">
          <span>About</span>
          <span class="nav-caret">▾</span>
        </button>
        <div class="nav-dropdown nav-dropdown--right">
          <span class="nav-megamenu__eyebrow">The House</span>
          <button class="nav-dropdown__link" onclick="navigateTo('our-story')">Our Story</button>
          <button class="nav-dropdown__link" onclick="navigateTo('the-masters')">The Masters &amp; Glossary</button>
          <button class="nav-dropdown__link" onclick="openPrivateAppointmentModal()">Private Appointments</button>
          <button class="nav-dropdown__link" onclick="navigateTo('contact')">Contact</button>
          <button class="nav-dropdown__link" onclick="navigateTo('returns-policy')">Returns Policy</button>
        </div>
      </div>

      <button class="header-action-btn header-search-trigger" onclick="openSearchInCollection()" title="Search Collection">
        <span>Search</span>
      </button>

      <button class="header-action-btn" onclick="openPrivateAppointmentModal()" title="Private Client Appointments">
        <span>Private Appointments</span>
      </button>

      <button class="header-action-btn" onclick="openCartDrawer()">
        <span>Bag (${totalQty})</span>
      </button>
    `;
  }

  if (footerLinks) {
    footerLinks.innerHTML = `
      <li><button onclick="navigateTo('our-story')">Our Story</button></li>
      <li><button onclick="navigateTo('the-masters')">The Masters &amp; Glossary</button></li>
      <li><button onclick="openPrivateAppointmentModal()">Private Appointments</button></li>
      <li><button onclick="navigateTo('returns-policy')">Returns Policy</button></li>
      <li><button onclick="navigateTo('contact')">Contact</button></li>
    `;
  }
}

function updateReviewToolbarActive(activeStepOverride = null) {
  const map = {
    "home": "quick-btn-home",
    "pdp": "quick-btn-pdp",
    "record": "quick-btn-record",
    "the-masters": "quick-btn-masters"
  };
  const targetKey = activeStepOverride || STATE.currentView;
  ["quick-btn-home", "quick-btn-pdp", "quick-btn-record", "quick-btn-masters"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.toggle("review-jump-btn--active", map[targetKey] === id);
    }
  });

  const sel = document.getElementById("garment-switcher-select");
  if (sel && STATE.currentProductHandle) {
    sel.value = STATE.currentProductHandle;
  }

  const banner = document.getElementById("flow-return-banner");
  if (banner) {
    banner.style.display = "none";
  }
}

function goToProductionRecordFlow() {
  if (STATE.currentView !== "pdp") {
    STATE.currentView = "pdp";
    renderApp();
  }
  updateReviewToolbarActive("record");
  setTimeout(() => {
    const el = document.getElementById("pdp-fibre-to-garment") || document.getElementById("pdp-production-record");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 80);
}

function navigateToMastersTechnique(glossaryId) {
  STATE.cameFromPdp = (STATE.currentView === "pdp");
  if (STATE.currentView === "pdp" && STATE.currentProductHandle) {
    STATE.lastPdpHandle = STATE.currentProductHandle;
  }
  STATE.activeGlossaryId = glossaryId || "02";
  STATE.currentView = "the-masters";
  try {
    window.history.pushState({ view: "the-masters", param: STATE.activeGlossaryId }, "", "#the-masters");
  } catch (e) {}
  renderApp();
  updateReviewToolbarActive();
  setTimeout(() => {
    const row = document.getElementById(`glossary-row-${STATE.activeGlossaryId}`);
    if (row) {
      row.classList.add("open", "active-highlight");
      row.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, 90);
}

function returnToProductFromMasters() {
  STATE.cameFromPdp = false;
  navigateTo("pdp", STATE.lastPdpHandle || STATE.currentProductHandle || "tribeca-matka-silk-emerald");
}

function selectSizeAndReturnToPdp(size) {
  STATE.selectedSize = size;
  returnToProductFromMasters();
}

function navigateTo(view, param = null, skipPushState = false) {
  if (STATE.currentView === "pdp" && STATE.currentProductHandle) {
    STATE.lastPdpHandle = STATE.currentProductHandle;
  }
  if (view !== "the-masters") {
    STATE.cameFromPdp = (STATE.currentView === "pdp");
  }
  STATE.currentView = view;
  if (view === "collection" && param) {
    STATE.currentCollection = param;
    STATE.techniqueFilter = "ALL";
  }
  if (view === "pdp" && param) {
    STATE.currentProductHandle = param;
    STATE.lastPdpHandle = param;
    STATE.selectedSize = STATE.selectedSize || "S";
    STATE.selectedImageIndex = 0;
  }
  if (!skipPushState) {
    try {
      window.history.pushState({ view, param }, "", `#${view}${param ? "/" + param : ""}`);
    } catch (e) {}
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderApp();
  updateReviewToolbarActive();
}

window.addEventListener("popstate", (e) => {
  if (e.state && e.state.view) {
    navigateTo(e.state.view, e.state.param || null, true);
  } else {
    navigateTo("pdp", STATE.lastPdpHandle || "tribeca-matka-silk-emerald", true);
  }
});

// ==========================================================================
// VIEW 1: HOMEPAGE (SECTION 2 — VERBATIM 10-SECTION FLOW + PHASE 2 SHOWCASE)
// ==========================================================================
function renderHomepage() {
  const categories = [
    {
      id: "skirts-dresses",
      title: "Skirts & Dresses",
      sub: "Handspun Khadi & Matka Silk",
      img: SQS_CDN + "1761394286610-IZ46RMUKJAHY9K3G8K4Z/034_HARTWICK_HANDWOVEN_TRIBECA_SKIRT_SILK_AMMAN_SHIRT_LINEN_SILK.jpg"
    },
    {
      id: "shirts-blouses",
      title: "Shirts & Blouses",
      sub: "UNESCO Jamdani Muslin",
      img: SQS_CDN + "1761393856799-C31HGGNECZJKGKS125XU/001_HARTWICK_HANDWOVEN_PALMA_SKIRT_KHADI_HANOI_SHIRT_JAMDANI.jpg"
    },
    {
      id: "trousers",
      title: "Trousers",
      sub: "Handloom Twill & Double Ikat",
      img: SQS_CDN + "8d28d4d4-4b30-44c7-999b-636e1a552025/002+_HARTWICK_HANDWOVEN_MARYLEBONE_COAT_IKAT_BOMBAY_TROUSERS_SITGES_TOTEBAG.jpg"
    },
    {
      id: "coats-accessories",
      title: "Coats & Robes",
      sub: "Reversible Quilted Ikat",
      img: SQS_CDN + "0c0b1cbc-4c3e-43ad-b43d-1c2c4916289f/080_HARTWICK_OKANAGAN_ROBE_KALAMALKA_BLOCKPRINT.jpg"
    },
    {
      id: "fine-silk",
      title: "Fine Silk",
      sub: "16-Step Botanical Resist Print",
      img: SQS_CDN + "643566b4-c934-4030-922c-ec6f24a25e06/218_HARTWICK_FINESILK_LARGESQUARE_SCARF_NATURALDYE_BLOCKPRINT.jpg"
    }
  ];

    const brandPalette = [
    {
      id: "soot",
      name: "Soot",
      rgb: "40 / 41 / 36",
      hex: "#282924",
      tag: "PIG-SOOT-01",
      fibre: "Carbon soot on wild tussar silk",
      img: "assets/palette/soot.png"
    },
    {
      id: "inkstone",
      name: "Inkstone",
      rgb: "45 / 46 / 56",
      hex: "#2D2E38",
      tag: "PIG-INK-02",
      fibre: "Indigo vat & oxidized river slate",
      img: "assets/palette/inkstone.png"
    },
    {
      id: "moss",
      name: "Moss",
      rgb: "93 / 98 / 64",
      hex: "#5D6240",
      tag: "PIG-MOSS-03",
      fibre: "Goldenrod & myrobalan leaf fermentation",
      img: "assets/palette/moss.png"
    },
    {
      id: "mordant-amber",
      name: "Mordant Amber",
      rgb: "213 / 168 / 64",
      hex: "#D5A840",
      tag: "PIG-AMB-04",
      fibre: "Alum mordanted marigold & pomegranate",
      img: "assets/palette/mordant_amber.png"
    },
    {
      id: "deep-wine",
      name: "Deep Wine",
      rgb: "88 / 47 / 55",
      hex: "#582F37",
      tag: "PIG-WINE-05",
      fibre: "Madder root (Rubia cordifolia) slow simmer",
      img: "assets/palette/deep_wine.png"
    },
    {
      id: "peat-fibre",
      name: "Peat Fibre",
      rgb: "59 / 46 / 37",
      hex: "#3B2E25",
      tag: "PIG-PEAT-06",
      fibre: "Roasted walnut hull & peat tannin",
      img: "assets/palette/peat_fibre.png"
    },
    {
      id: "bare-clay",
      name: "Bare Clay",
      rgb: "222 / 182 / 190",
      hex: "#DEB6BE",
      tag: "PIG-CLAY-07",
      fibre: "Washed iron earth & wild madder blush",
      img: "assets/palette/bare_clay.png"
    },
    {
      id: "chalk-blue",
      name: "Chalk Blue",
      rgb: "235 / 243 / 255",
      hex: "#EBF3FF",
      tag: "PIG-CHLK-08",
      fibre: "First-dip vat indigo on raw unbleached khadi",
      img: "assets/palette/chalk_blue.png"
    }
  ];

  return `
    <div class="hale-homepage view-enter">
      <!-- 1. FULL-BLEED EDITORIAL HERO (Hale Mercantile Style with Whisper Captions) -->
      <section class="hale-hero">
        <img
          class="hale-hero__img"
          src="${SQS_CDN}647043be-fcc2-4ccd-a1ed-902e681194c4/156_HARTWICK_EDITORIAL_PARIS.jpg"
          alt="Hartwick Atelier Limited Edition Collections"
        />
        <div class="hale-hero__overlay">
          <div class="hale-hero__center-title">
            <span class="hale-hero__eyebrow">Autumn / Winter Edition</span>
            <h1 class="hale-hero__title">Woven with Intention</h1>
            <button class="hale-hero__cta" onclick="navigateTo('collection', 'all-apparel')">
              Explore Collection →
            </button>
          </div>
          <div class="hale-hero__captions">
            <span class="hale-hero__caption-left">Intimate Moments:</span>
            <span class="hale-hero__caption-right">Draped in Tactility</span>
          </div>
        </div>
      </section>

      <!-- 2. SERENE MANIFESTO STATEMENT (Quiet Luxury Centerpiece) -->
      <section class="hale-manifesto">
        <div class="hale-manifesto__inner">
          <p class="hale-manifesto__lead">
            “Our cloth transcends fashion to become a living record of craft, transforming spaces and silhouettes through texture, fold, and the poetry of human touch.”
          </p>
          <div class="hale-manifesto__sub">
            <span>European Studio · Master Guilds in India · 100% Handcrafted (0 kWh)</span>
          </div>
        </div>
      </section>

      <!-- 3. SHOP BY CATEGORY (Hale Mercantile 5-Column Tall Gallery Grid) -->
      <section class="hale-categories">
        <div class="hale-categories__header">
          <div>
            <span class="editorial-section-eyebrow">Shop by Category ──────────</span>
            <h2 class="editorial-large-title">Curated Silhouettes.</h2>
          </div>
          <div class="hale-categories__tabs">
            <button class="hale-cat-pill active" onclick="navigateTo('collection', 'all-apparel')">All Apparel</button>
            <button class="hale-cat-pill" onclick="navigateTo('collection', 'skirts-dresses')">Skirts</button>
            <button class="hale-cat-pill" onclick="navigateTo('collection', 'shirts-blouses')">Shirts</button>
            <button class="hale-cat-pill" onclick="navigateTo('collection', 'trousers')">Trousers</button>
            <button class="hale-cat-pill" onclick="navigateTo('collection', 'fine-silk')">Fine Silk</button>
          </div>
        </div>

        <div class="hale-categories__grid">
          ${categories.map(cat => `
            <article class="hale-cat-card" onclick="navigateTo('collection', '${cat.id}')">
              <div class="hale-cat-card__media">
                <img src="${cat.img}" alt="${cat.title}" loading="lazy" />
                <div class="hale-cat-card__overlay">
                  <h3 class="hale-cat-card__title">${cat.title}</h3>
                  <p class="hale-cat-card__sub">${cat.sub}</p>
                  <span class="hale-cat-card__link">View Category →</span>
                </div>
              </div>
            </article>
          `).join("")}
        </div>
      </section>

      <!-- 5. THE DISPATCH NEWSLETTER (Deep Espresso #241914) -->
      <section class="the-register-split-banner" id="home-the-register">
        <div class="the-register-split-banner__inner">
          <div class="the-register-split-banner__left">
            <span class="the-register-split-banner__eyebrow">The Register · The Dispatch ──────────</span>
            <h2 class="the-register-split-banner__quote">
              “Correspondence from the Atelier, when there is something worth sending.”
            </h2>
          </div>
          <div class="the-register-split-banner__right">
            <p class="the-register-split-banner__lead">
              The Dispatch carries production notes, material studies, conversations with Masters and considered notice of what the Atelier is making next.
            </p>
            <form class="the-register-split-banner__form" onsubmit="handleNewsletterSubmit(event, 'home-dispatch-msg')">
              <input
                type="email"
                class="the-register-split-banner__input"
                placeholder="Your email address"
                required
                aria-label="Your email address"
              />
              <button type="submit" class="the-register-split-banner__btn">
                JOIN THE REGISTER →
              </button>
            </form>
            <div id="home-dispatch-msg" class="dispatch-feedback"></div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function setTechniqueFilter(tech) {
  STATE.techniqueFilter = tech;
  renderApp();
}

function toggleWishlist(e, handle) {
  e.stopPropagation();
  if (STATE.wishlist.includes(handle)) {
    STATE.wishlist = STATE.wishlist.filter(h => h !== handle);
  } else {
    STATE.wishlist.push(handle);
  }
  renderHeaderAndFooterNav();
  renderApp();
}

function renderCollectionPage() {
  const meta = COLLECTION_META[STATE.currentCollection] || COLLECTION_META["all-apparel"];

  let pool = window.HARTWICK_PRODUCTS.filter(p => STATE.phase2Enabled || p.phase === 1);

  let filtered = pool;
  if (STATE.currentCollection === "all-apparel") {
    filtered = pool.filter(p =>
      ["skirts-dresses", "shirts-blouses", "trousers", "coats-accessories", "lounge"].includes(p.category)
    );
  } else if (STATE.currentCollection === "lot-0325") {
    filtered = pool.filter(p => p.lot === "Lot 0325");
  } else if (STATE.currentCollection === "lot-0924") {
    filtered = pool.filter(p => p.lot === "Lot 0924");
  } else if (STATE.currentCollection === "lot-0324") {
    filtered = pool.filter(p => p.lot === "Lot 0324");
  } else {
    filtered = pool.filter(p => p.category === STATE.currentCollection);
  }

  // Live High-End Search Filter
  const activeQuery = (STATE.collectionSearchQuery || "").trim();
  if (activeQuery !== "") {
    const q = activeQuery.toLowerCase();
    // If searching, search across the entire active pool if current category yields 0, or within current view
    filtered = pool.filter(p => {
      const searchable = [
        p.title,
        p.subtitle,
        p.commercial_expression,
        p.fabric_technique,
        p.short_description,
        p.fibre,
        p.lot,
        p.category
      ].filter(Boolean).join(" ").toLowerCase();
      return searchable.includes(q);
    });
  }

  const apparelTabs = [
    { id: "all-apparel", label: "All Apparel" },
    { id: "skirts-dresses", label: "Skirts & Dresses" },
    { id: "shirts-blouses", label: "Shirts & Blouses" },
    { id: "trousers", label: "Trousers" },
    { id: "coats-accessories", label: "Coats & Robes" },
    { id: "lounge", label: "Lounge" },
    { id: "fine-silk", label: "Fine Silk" },
    { id: "fine-jewellery", label: "Fine Jewellery" }
  ];

  const safeQuery = activeQuery.replace(/"/g, "&quot;");

  return `
    <div class="collection-view view-enter editorial-collection-view">
      <div class="collection-view__container">
        <!-- QUIET LUXURY COLLECTION HEADER (Clean, No Color Blot Strip) -->
        <header class="editorial-collection-header reveal-on-scroll">
          <div class="editorial-collection-header__left">
            <span class="editorial-section-eyebrow">The Collection ──────────</span>
            <h1 class="editorial-collection-header__title">${meta.title}.</h1>
            <p class="editorial-collection-header__desc">${meta.description}</p>
          </div>

          <!-- HIGH-END ATELIER SEARCH FIELD -->
          <div class="editorial-collection-search-box">
            <div class="editorial-search-field">
              <svg class="editorial-search-field__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                id="editorial-collection-search-input"
                class="editorial-search-field__input"
                placeholder="Search silhouettes, fabrics, lots..."
                value="${safeQuery}"
                oninput="handleCollectionSearch(this.value)"
                autocomplete="off"
                spellcheck="false"
                aria-label="Search Collection"
              />
              ${activeQuery ? `
                <button type="button" class="editorial-search-field__clear" onclick="clearCollectionSearch()" title="Clear search" aria-label="Clear search">✕</button>
              ` : ""}
            </div>
            <div class="editorial-search-field__meta">
              <span>${filtered.length} ${filtered.length === 1 ? "Piece" : "Pieces"} Available</span>
              ${activeQuery ? `<button type="button" class="editorial-search-field__reset" onclick="clearCollectionSearch()">Reset Search</button>` : ""}
            </div>
          </div>
        </header>

        <!-- HIGH-END CATEGORY FILTER BAR (No Scrollbar / Clean Wrap) -->
        <nav class="editorial-collection-tabs" aria-label="Collection Categories">
          ${apparelTabs.map(tab => `
            <button
              class="editorial-tab-btn ${STATE.currentCollection === tab.id && !activeQuery ? "active" : ""}"
              onclick="STATE.collectionSearchQuery=''; navigateTo('collection', '${tab.id}')"
            >
              ${tab.label}
            </button>
          `).join("")}
        </nav>

        <!-- EDITORIAL GALLERY GRID -->
        ${filtered.length > 0 ? `
          <div class="product-grid editorial-collection-grid">
            ${filtered.map((product, idx) => {
              const secondaryImg = product.images[1] || product.images[0];
              const delayClass = `reveal-delay-${(idx % 3) + 1}`;

              return `
                <article class="product-card editorial-product-card reveal-on-scroll ${delayClass}" onclick="navigateTo('pdp', '${product.handle}')">
                  <div class="product-card__media">
                    <img
                      class="product-card__img product-card__img--primary"
                      src="${product.images[0]}"
                      alt="${product.title}"
                      loading="lazy"
                    />
                    <img
                      class="product-card__img product-card__img--secondary"
                      src="${secondaryImg}"
                      alt="${product.title} alternate view"
                      loading="lazy"
                    />
                  </div>
                  <div class="editorial-card-info">
                    <div class="editorial-card-top-row">
                      <h2 class="editorial-card-title">${product.title}</h2>
                      <span class="editorial-card-price">${formatPrice(product)}</span>
                    </div>
                    <div class="editorial-card-sub-row">
                      <span class="editorial-card-expression">${product.commercial_expression}</span>
                    </div>
                  </div>
                </article>
              `;
            }).join("")}
          </div>
        ` : `
          <div class="editorial-empty-search">
            <p class="editorial-empty-search__title">No silhouettes found matching “${safeQuery}”.</p>
            <p class="editorial-empty-search__sub">Try searching for Khadi, Matka Silk, Linen, Skirt, Shirt, or Lot 0325.</p>
            <button type="button" class="editorial-outline-btn" onclick="clearCollectionSearch()">View All Apparel</button>
          </div>
        `}
      </div>
    </div>
  `;
}

function openCraftGlossaryModal(key) {
  const entry = CRAFT_GLOSSARY_DATA[key] || CRAFT_GLOSSARY_DATA["khadi"];
  const body = document.getElementById("phase2-modal-body");
  const backdrop = document.getElementById("phase2-modal-backdrop");
  if (body && backdrop) {
    body.innerHTML = `
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:14px">
        ${renderBotanicalBlot(key === "natural-dye" ? "emerald" : (key === "block-print" ? "pokeberry" : "marigold"), 54)}
        <div>
          <span class="section-eyebrow" style="margin-bottom:2px">Heritage Technique Record · #${entry.id || "01"}</span>
          <h3 style="font-family:var(--font-serif);font-size:25px;font-weight:400;margin:0">${entry.title}</h3>
        </div>
      </div>
      <p style="font-family:var(--font-serif);font-style:italic;font-size:16px;color:var(--text-secondary);margin-bottom:16px">${entry.subtitle}</p>
      <p style="font-size:15px;line-height:1.8;color:var(--text-secondary);margin-bottom:24px">${entry.body}</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <button class="btn-primary" onclick="closePhase2Modal();navigateToMastersTechnique('${entry.id || "01"}')">
          Open in The Masters Glossary ⟶
        </button>
        <button class="btn-outline" onclick="closePhase2Modal()">Continue Viewing Product</button>
      </div>
    `;
    backdrop.classList.add("open");
  }
}

function openPrivateAppointmentModal(productTitle = "") {
  const body = document.getElementById("phase2-modal-body");
  const backdrop = document.getElementById("phase2-modal-backdrop");
  if (body && backdrop) {
    body.innerHTML = `
      <div style="display:flex;align-items:center;gap:18px;margin-bottom:18px">
        ${renderBotanicalBlot("goldenrod", 72)}
        <div>
          <span class="section-eyebrow" style="margin-bottom:2px">The Circle · Hartwick Atelier</span>
          <h3 style="font-family:var(--font-serif);font-size:26px;font-weight:400;margin:0">Private Appointments</h3>
        </div>
      </div>
      <p style="font-size:15px;color:var(--text-secondary);line-height:1.78;margin-bottom:18px">
        The Circle invites you to book a one-on-one Private Appointment with our atelier for personalized styling, sizing guidance (XS–XL), bespoke measurements, or textile provenance${productTitle ? ` for <strong>${productTitle}</strong>` : ""}.
      </p>
      <form onsubmit="event.preventDefault();document.getElementById('appt-confirm-msg').innerHTML='Thank you. Our Private Client team at <strong>contact@HARTWICKATELIER.com</strong> will confirm your Private Appointment within 24 hours.';">
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" class="form-control" required placeholder="Your name" />
        </div>
        <div class="form-group">
          <label>Email Address</label>
          <input type="email" class="form-control" required placeholder="your@email.com" />
        </div>
        <div class="form-group">
          <label>Private Appointment Preference</label>
          <input type="text" class="form-control" value="${productTitle ? `Private Appointment: ${productTitle} (Size ${STATE.selectedSize})` : "Private Virtual Styling & Bespoke Sizing Consultation"}" />
        </div>
        <button type="submit" class="btn-primary" style="width:100%">Request Private Appointment</button>
        <div id="appt-confirm-msg" class="dispatch-feedback" style="margin-top:14px"></div>
      </form>
    `;
    backdrop.classList.add("open");
  }
}

function openSizeRecommendationModal() {
  const body = document.getElementById("phase2-modal-body");
  const backdrop = document.getElementById("phase2-modal-backdrop");
  if (body && backdrop) {
    body.innerHTML = `
      <span class="section-eyebrow">Interactive Fit Assistant</span>
      <h3 style="font-family:var(--font-serif);font-size:26px;font-weight:400;margin-bottom:14px">Find Your Hartwick Size (XS–XL)</h3>
      <p style="font-size:14px;color:var(--text-secondary);margin-bottom:20px">Enter your measurements for an instant silhouette-specific recommendation.</p>
      <div class="form-group">
        <label>Height (cm)</label>
        <input type="number" id="size-calc-height" class="form-control" value="170" />
      </div>
      <div class="form-group">
        <label>Natural Waist (cm)</label>
        <input type="number" id="size-calc-waist" class="form-control" value="71" />
      </div>
      <button class="btn-primary" style="width:100%" onclick="calculateRecommendedSize()">Calculate My Size</button>
      <div id="size-calc-result" class="dispatch-feedback" style="margin-top:16px"></div>
      <div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--border-subtle);display:flex;justify-content:space-between;align-items:center;gap:12px">
        <button class="btn-outline" style="width:100%" onclick="closePhase2Modal();returnToProductFromMasters()">← Return to Garment Page</button>
      </div>
    `;
    backdrop.classList.add("open");
  }
}

function calculateRecommendedSize() {
  const waist = parseInt(document.getElementById("size-calc-waist")?.value || "71", 10);
  let rec = "S";
  if (waist < 67) rec = "XS";
  else if (waist <= 72) rec = "S";
  else if (waist <= 78) rec = "M";
  else if (waist <= 84) rec = "L";
  else rec = "XL";

  STATE.selectedSize = rec;
  const res = document.getElementById("size-calc-result");
  if (res) {
    res.innerHTML = `Recommended Hartwick Atelier Size: <strong>Size ${rec}</strong> (Selected automatically on product page).`;
  }
  renderApp();
}

function closePhase2Modal() {
  const backdrop = document.getElementById("phase2-modal-backdrop");
  if (backdrop) backdrop.classList.remove("open");
}

function scrollToElementById(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function renderProductPage() {
  const product = window.HARTWICK_PRODUCTS.find(p => p.handle === STATE.currentProductHandle) || window.HARTWICK_PRODUCTS[1] || window.HARTWICK_PRODUCTS[0];
  const isSoldOut = product.status === "Sold Out";
  const numStr = String(product.catalogNumber || 1).padStart(2, "0");

  const rec1 = window.HARTWICK_PRODUCTS.find(p => p.handle === product.featured_product_1) || window.HARTWICK_PRODUCTS[2];
  const rec2 = window.HARTWICK_PRODUCTS.find(p => p.handle === product.featured_product_2) || window.HARTWICK_PRODUCTS[3];
  const rec3 = window.HARTWICK_PRODUCTS.find(p => p.handle !== product.handle && p.handle !== rec1.handle && p.handle !== rec2.handle) || window.HARTWICK_PRODUCTS[0];

  const activeImage = product.images[STATE.selectedImageIndex] || product.images[0];

  // Determine Botanical Dye Blot accent based on product colourway
  const lowerText = (product.title + " " + product.commercial_expression + " " + product.short_description).toLowerCase();
  let productBlot = "marigold";
  if (lowerText.includes("emerald") || lowerText.includes("green")) productBlot = "emerald";
  else if (lowerText.includes("indigo") || lowerText.includes("navy") || lowerText.includes("celeste")) productBlot = "indigo";
  else if (lowerText.includes("pink") || lowerText.includes("rouge") || lowerText.includes("rose") || lowerText.includes("madder")) productBlot = "pokeberry";
  else if (lowerText.includes("black") || lowerText.includes("walnut")) productBlot = "walnut";
  else if (lowerText.includes("gold") || lowerText.includes("23k") || lowerText.includes("mustard")) productBlot = "goldenrod";

  const styleTitle = product.subtitle || product.title;
  const expressionShort = product.title.replace(product.subtitle || "", "").replace(/^[\s—-]+/, "") || product.commercial_expression;
  const lotCode = product.lot ? product.lot.replace("Lot ", "LOT-") : "LOT-0325";
  const blotObj = BOTANICAL_BLOTS[productBlot] || BOTANICAL_BLOTS["marigold"];

  const ftg = product.fibre_to_garment || {
    product_name: product.title,
    sizing: `${product.sizes.join(", ")} (${product.fit_label})`,
    fiber: product.fibre,
    spinning: "Hand-drawn & twisted on the traditional wooden Charkha wheel (0 kWh)",
    weaving: product.fabric_technique,
    dyeing: product.commercial_expression,
    construction: "Single-tailor heirloom construction · French seams & hand-turned hems",
    glossary_loops: {
      fibre_id: "01",
      fibre_label: "01 Khadi",
      spinning_id: "02",
      spinning_label: "02 Hand Spun",
      weaving_id: "03",
      weaving_label: "03 Handwoven",
      dyeing_id: "06",
      dyeing_label: "06 Natural Dye",
      construction_id: "12",
      construction_label: "12 Heritage Finish"
    }
  };

  return `
    <div class="aloha-pdp view-enter editorial-elevated">
      <!-- 1. THREE-COLUMN HERO (High-Fashion Balconte & Aloha Editorial Architecture) -->
      <section class="aloha-pdp__hero-grid">
        <!-- LEFT COLUMN: Compact Title, Concise Lead & Collapsible High-End Accordions -->
        <div class="aloha-pdp__left">
          <div>
            <nav class="aloha-pdp__breadcrumb editorial-breadcrumb">
              <button onclick="navigateTo('collection', 'all-apparel')">Apparel</button>
              <span>/</span>
              <button onclick="navigateTo('collection', '${product.category}')">${product.category.replace("-", " & ")}</button>
            </nav>

            <h1 class="aloha-pdp__title editorial-title">${styleTitle}</h1>
            <p class="aloha-pdp__subtitle editorial-subtitle">${product.commercial_expression}</p>

            <!-- Concise Lead Paragraph -->
            <div class="aloha-pdp__story editorial-story editorial-story--compact">
              <p>${product.short_description}</p>
            </div>

            <!-- COMPACT COLLAPSIBLE ACCORDIONS (Left Column Uitklapmenu) -->
            <div class="pdp-accordions editorial-accordions pdp-left-accordions">
              <!-- 1. Description & Atelier Notes -->
              <div class="accordion-item" id="acc-left-story">
                <button type="button" class="accordion-trigger" onclick="toggleAccordion('acc-left-story')">
                  <span>Description &amp; Atelier Notes</span>
                  <span class="accordion-icon">+</span>
                </button>
                <div class="accordion-content">
                  <p>${product.long_description}</p>
                  <div class="botanical-hero-pill botanical-hero-pill--compact" onclick="navigateToMastersTechnique('${ftg.glossary_loops.dyeing_id}')" title="Inspect ${blotObj.name} in The Masters">
                    <img src="${blotObj.img}" alt="${blotObj.name}" class="botanical-hero-pill__dot" />
                    <div class="botanical-hero-pill__meta">
                      <span class="botanical-hero-pill__label">Botanical Vat · ${blotObj.lotCode}</span>
                      <span class="botanical-hero-pill__name">${blotObj.name} ↗</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 2. Fibre & Craft Provenance (Compact Collapsible Spec Rows) -->
              <div class="accordion-item" id="acc-left-specs">
                <button type="button" class="accordion-trigger" onclick="toggleAccordion('acc-left-specs')">
                  <span>Fibre &amp; Craft Provenance</span>
                  <span class="accordion-icon">+</span>
                </button>
                <div class="accordion-content">
                  <div class="pdp-compact-spec-table">
                    <div class="pdp-compact-spec-row" onclick="navigateToMastersTechnique('${ftg.glossary_loops.fibre_id}')">
                      <span class="pdp-compact-spec-label">Fibre</span>
                      <span class="pdp-compact-spec-val">${ftg.fiber} ↗</span>
                    </div>
                    <div class="pdp-compact-spec-row" onclick="navigateToMastersTechnique('${ftg.glossary_loops.spinning_id}')">
                      <span class="pdp-compact-spec-label">Spinning</span>
                      <span class="pdp-compact-spec-val">Charkha Handspun (0 kWh) ↗</span>
                    </div>
                    <div class="pdp-compact-spec-row" onclick="navigateToMastersTechnique('${ftg.glossary_loops.weaving_id}')">
                      <span class="pdp-compact-spec-label">Weaving</span>
                      <span class="pdp-compact-spec-val">${ftg.weaving} ↗</span>
                    </div>
                    <div class="pdp-compact-spec-row" onclick="navigateToMastersTechnique('${ftg.glossary_loops.dyeing_id}')">
                      <span class="pdp-compact-spec-label">Dyeing</span>
                      <span class="pdp-compact-spec-val">${expressionShort} ↗</span>
                    </div>
                    <div class="pdp-compact-spec-row" onclick="scrollToElementById('pdp-fibre-to-garment')">
                      <span class="pdp-compact-spec-label">Finishing</span>
                      <span class="pdp-compact-spec-val">Single-Tailor Heirloom Fit ↓</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 3. Care & Heirloom Repair -->
              <div class="accordion-item" id="acc-left-care">
                <button type="button" class="accordion-trigger" onclick="toggleAccordion('acc-left-care')">
                  <span>Care &amp; Repair</span>
                  <span class="accordion-icon">+</span>
                </button>
                <div class="accordion-content">
                  <p>Handwoven and naturally dyed textiles are living cloths. Gentle cold hand wash using pH-neutral soap or specialist eco dry clean. Dry flat in the shade. Complimentary heirloom repair guidance is offered for the life of the garment.</p>
                </div>
              </div>
            </div>

            <div class="hero-editorial-links" style="margin-top: 1.2rem;">
              <button type="button" class="editorial-text-link" onclick="scrollToElementById('pdp-fibre-to-garment')">
                <span>Explore Fibre to Garment</span>
                <span>↓</span>
              </button>
              <button type="button" class="editorial-text-link" onclick="navigateToMastersTechnique('${ftg.glossary_loops.dyeing_id}')">
                <span>Master &amp; Textile Glossary</span>
                <span>⟶</span>
              </button>
            </div>
          </div>
        </div>

        <!-- CENTER COLUMN: Pure Dominant Portrait Image + Calm Thumbnail Dots -->
        <div class="aloha-pdp__center">
          <div class="aloha-pdp__main-media editorial-main-media">
            <img src="${activeImage}" alt="${product.title}" />
          </div>
          <div class="aloha-pdp__thumbs editorial-thumbs">
            ${product.images.map((img, idx) => `
              <button
                type="button"
                class="aloha-pdp__thumb ${idx === STATE.selectedImageIndex ? "active" : ""}"
                onclick="selectPdpImage(${idx})"
                aria-label="View product image ${idx + 1}"
              >
                <img src="${img}" alt="${product.title} view ${idx + 1}" />
              </button>
            `).join("")}
          </div>
        </div>

        <!-- RIGHT COLUMN: Price, Sizes XS–XL, Clean Add to Bag, Accordions, Minimalist Register Notice -->
        <div class="aloha-pdp__right">
          <div class="aloha-pdp__price-block editorial-price-block">
            <span class="aloha-pdp__price">${formatPrice(product)} ${STATE.currency}</span>
            <span class="editorial-lot-badge">Numbered Atelier Edition · ${lotCode}</span>
          </div>

          <!-- Size Selector XS - XL -->
          <div class="aloha-pdp__size-block editorial-size-block">
            <div class="aloha-pdp__size-top">
              <span class="aloha-pdp__field-label">Size &nbsp;·&nbsp; <strong>${STATE.selectedSize}</strong></span>
              <button class="size-guide-trigger" onclick="navigateTo('size-guide')">Size Guide (XS–XL)</button>
            </div>
            <div class="aloha-pdp__size-grid">
              ${product.sizes.map(size => `
                <button
                  type="button"
                  class="aloha-size-btn ${STATE.selectedSize === size ? "active" : ""}"
                  onclick="selectPdpSize('${size}')"
                >
                  ${size}
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Primary CTA Button -->
          <button
            type="button"
            class="aloha-pdp__atc-btn editorial-atc-btn"
            ${isSoldOut ? "disabled" : ""}
            onclick="addToCart('${product.handle}')"
          >
            ${isSoldOut ? "Archive Edition" : `Add Size ${STATE.selectedSize} to Bag — ${formatPrice(product)}`}
          </button>

          <!-- Accordions: How It Fits & Delivery & Returns -->
          <div class="pdp-accordions editorial-accordions">
            <div class="accordion-item" id="acc-fit-right">
              <button class="accordion-trigger" onclick="toggleAccordion('acc-fit-right')">
                <span>How It Fits</span>
                <span class="accordion-icon">+</span>
              </button>
              <div class="accordion-content">
                <p><strong>${product.fit_label}</strong></p>
                <ul class="fit-bullets">
                  ${product.fit_bullets.map(b => `<li>${b}</li>`).join("")}
                </ul>
              </div>
            </div>
            <div class="accordion-item" id="acc-delivery-right">
              <button class="accordion-trigger" onclick="toggleAccordion('acc-delivery-right')">
                <span>Delivery &amp; Returns</span>
                <span class="accordion-icon">+</span>
              </button>
              <div class="accordion-content">
                <p>Dispatched via insured DHL Express across the EU, UK, and worldwide destinations. Complimentary shipping on orders over €500. Returns accepted within 14 days of delivery.</p>
              </div>
            </div>
          </div>

          
        </div>
      </section>

      <!-- 2. FULL-BLEED MASTER\'S TOOL BANNER (Inspired by Atelier / Thread Hero) -->
      <section class="masters-tool-banner editorial-masters-banner">
        <img
          class="masters-tool-banner__img"
          src="${SQS_CDN}3a6786b9-45ce-459e-83cb-4bee1d2e3554/184_HARTWICK_STYLE_FABRIC4R1A8940.jpg"
          alt="The Master\'s Tool — The Charkha"
        />
        <div class="masters-tool-banner__overlay editorial-tool-overlay">
          <div>
            <span class="editorial-section-eyebrow" style="color:#FAF8F4">The Master\'s Tool ──────────</span>
            <h2 class="editorial-tool-title">Woven with intention.</h2>
            <p class="editorial-tool-copy">
              Before a single thread is placed on the loom, raw natural fibre is drawn out and twisted by hand on the charkha spinning wheel—creating a living yarn that breathes with human rhythm.
            </p>
          </div>
          <button class="editorial-outline-btn" onclick="navigateToMastersTechnique('02')">
            Explore The Masters →
          </button>
        </div>
      </section>

      <!-- 3. ORIGIN & PROCESS — 5-COLUMN EDITORIAL GALLERY (Inspired by Atelier / Thread + Artistic Botanical Specimen Dots) -->
      <section class="ftg-thread-section" id="pdp-fibre-to-garment">
        <div class="ftg-thread-header">
          <div>
            <span class="editorial-section-eyebrow">Origin &amp; Process ──────────</span>
            <h2 class="editorial-large-title">From Fibre to Garment.</h2>
          </div>
          <p class="ftg-thread-lead">
            The five foundational human disciplines behind <em>${ftg.product_name}</em>. Click any stage to inspect its Master Dossier.
          </p>
        </div>

        <div class="ftg-thread-grid">
          <!-- 01 FIBRE -->
          <article class="ftg-thread-col" onclick="navigateToMastersTechnique('${ftg.glossary_loops.fibre_id}')" title="Inspect 01 Fibre">
            <div class="ftg-thread-dot-bar">
              <img src="assets/blots/dot_iron_rust.png" alt="01 Fibre Specimen" class="ftg-thread-dot" />
              <span class="ftg-thread-rule"></span>
              <span class="ftg-thread-num">01</span>
            </div>
            <h3 class="ftg-thread-col__title">Fibre</h3>
            <p class="ftg-thread-col__sub">Raw Natural Fibre ──────</p>
            <p class="ftg-thread-col__body">
              ${ftg.fiber}. Cultivated in small lots for organic breathability, natural slub, and heirloom longevity.
            </p>
            <span class="ftg-thread-col__link">+ Master Record ↗</span>
          </article>

          <!-- 02 SPINNING -->
          <article class="ftg-thread-col" onclick="navigateToMastersTechnique('${ftg.glossary_loops.spinning_id}')" title="Inspect 02 Spinning">
            <div class="ftg-thread-dot-bar">
              <img src="assets/blots/dot_goldenrod.png" alt="02 Spinning Specimen" class="ftg-thread-dot" />
              <span class="ftg-thread-rule"></span>
              <span class="ftg-thread-num">02</span>
            </div>
            <h3 class="ftg-thread-col__title">Spinning</h3>
            <p class="ftg-thread-col__sub">Charkha Handspun ──────</p>
            <p class="ftg-thread-col__body">
              ${ftg.spinning}. Low-tension hand spinning preserves micro-air pockets in the core yarn.
            </p>
            <span class="ftg-thread-col__link">+ Master Record ↗</span>
          </article>

          <!-- 03 WEAVING -->
          <article class="ftg-thread-col" onclick="navigateToMastersTechnique('${ftg.glossary_loops.weaving_id}')" title="Inspect 03 Weaving">
            <div class="ftg-thread-dot-bar">
              <img src="assets/blots/dot_walnut.png" alt="03 Weaving Specimen" class="ftg-thread-dot" />
              <span class="ftg-thread-rule"></span>
              <span class="ftg-thread-num">03</span>
            </div>
            <h3 class="ftg-thread-col__title">Weaving</h3>
            <p class="ftg-thread-col__sub">${ftg.weaving} ──────</p>
            <p class="ftg-thread-col__body">
              Woven throw by throw on pit looms without electricity (3–5m per day), creating true selvedge cloth.
            </p>
            <span class="ftg-thread-col__link">+ Master Record ↗</span>
          </article>

          <!-- 04 DYEING & PRINTING -->
          <article class="ftg-thread-col" onclick="navigateToMastersTechnique('${ftg.glossary_loops.dyeing_id}')" title="Inspect 04 Dyeing & Printing">
            <div class="ftg-thread-dot-bar">
              <img src="${blotObj.img}" alt="04 Botanical Dye Specimen" class="ftg-thread-dot" />
              <span class="ftg-thread-rule"></span>
              <span class="ftg-thread-num">04</span>
            </div>
            <h3 class="ftg-thread-col__title">Dyeing &amp; Printing</h3>
            <p class="ftg-thread-col__sub">${blotObj.name} ──────</p>
            <p class="ftg-thread-col__body">
              Bathed in living fermentation vats of wild plants, roots, and mineral mordants (${blotObj.lotCode}).
            </p>
            <span class="ftg-thread-col__link">+ Master Record ↗</span>
          </article>

          <!-- 05 FINISHING -->
          <article class="ftg-thread-col" onclick="navigateToMastersTechnique('${ftg.glossary_loops.construction_id}')" title="Inspect 05 Finishing">
            <div class="ftg-thread-dot-bar">
              <img src="assets/blots/dot_apricot.png" alt="05 Finishing Specimen" class="ftg-thread-dot" />
              <span class="ftg-thread-rule"></span>
              <span class="ftg-thread-num">05</span>
            </div>
            <h3 class="ftg-thread-col__title">Finishing</h3>
            <p class="ftg-thread-col__sub">Single-Tailor Fit ──────</p>
            <p class="ftg-thread-col__body">
              ${ftg.construction}. Cut and assembled by a single artisan with French seams to endure for generations.
            </p>
            <span class="ftg-thread-col__link">+ Master Record ↗</span>
          </article>
        </div>
      </section>

      <!-- 4. LOT RECORD & ARCHIVAL GARMENT PASSPORT (Balconte & Aloha 13.52.21 Pure Luxury Monograph) -->
      <section class="production-record-thread" id="pdp-production-record">
        <div class="production-record-thread__inner">
          <!-- Left Column: Editorial Monograph + Botanical Specimen Herbarium Strip -->
          <div class="production-record-thread__left">
            <span class="editorial-section-eyebrow">Lot Record · Provenance ──────────</span>
            <h2 class="editorial-large-title">The Production Record.</h2>
            <p class="production-record-thread__quote">
              “Each Hartwick Atelier garment carries a numbered record of its botanical dye bath, loom yardage, and guild lineage.”
            </p>

            <!-- ARTISTIC BOTANICAL SPECIMEN STRIP (Herbarium Grade) -->
            <div class="herbarium-specimen-strip">
              <span class="herbarium-specimen-strip__title">Botanical Pigment Archive · Certified Vats</span>
              <div class="herbarium-specimen-strip__dots">
                <div class="herbarium-dot-card" onclick="navigateToMastersTechnique('06')">
                  <img src="assets/blots/dot_indigo_moss.png" alt="Wild Indigo" />
                  <span class="herbarium-dot-card__tag">VAT-IND-04</span>
                  <span class="herbarium-dot-card__name">Indigofera tinctoria</span>
                </div>
                <div class="herbarium-dot-card" onclick="navigateToMastersTechnique('02')">
                  <img src="assets/blots/dot_goldenrod.png" alt="Goldenrod" />
                  <span class="herbarium-dot-card__tag">VAT-GLD-02</span>
                  <span class="herbarium-dot-card__name">Solidago virgaurea</span>
                </div>
                <div class="herbarium-dot-card" onclick="navigateToMastersTechnique('03')">
                  <img src="assets/blots/dot_walnut.png" alt="Black Walnut" />
                  <span class="herbarium-dot-card__tag">VAT-WLN-03</span>
                  <span class="herbarium-dot-card__name">Juglans nigra</span>
                </div>
              </div>
            </div>

            <div style="margin-top:28px">
              <button
                type="button"
                class="editorial-outline-btn"
                onclick="navigateToMastersTechnique('01')"
              >
                Open Master Dossier Workbench →
              </button>
            </div>
          </div>

          <!-- Right Column: 6 Open Horizontal Ledger Rows (Pure Aloha 13.52.21 Luxury, Zero Box Clutter) -->
          <div class="production-record-thread__right">
            <div class="record-thread-row" onclick="navigateToMastersTechnique('09')">
              <span class="record-thread-row__label">01 · Style &amp; Silhouette</span>
              <span class="record-thread-row__val">${product.subtitle || product.title} · Tailored Silhouette <span class="record-thread-arrow">↗</span></span>
            </div>
            <div class="record-thread-row" onclick="navigateToMastersTechnique('06')">
              <span class="record-thread-row__label">02 · Dyeing &amp; Printing</span>
              <span class="record-thread-row__val">${blotObj.name} (${blotObj.lotCode}) <span class="record-thread-arrow">↗</span></span>
            </div>
            <div class="record-thread-row" onclick="navigateToMastersTechnique('03')">
              <span class="record-thread-row__label">03 · Weaving &amp; Loom</span>
              <span class="record-thread-row__val">${product.fibre} · Handloom Pit Weave (0 kWh) <span class="record-thread-arrow">↗</span></span>
            </div>
            <div class="record-thread-row" onclick="navigateToMastersTechnique('02')">
              <span class="record-thread-row__label">04 · Archive Catalog</span>
              <span class="record-thread-row__val">${product.sku} · Catalog #${numStr} <span class="record-thread-arrow">↗</span></span>
            </div>
            <div class="record-thread-row" onclick="navigateToMastersTechnique('04')">
              <span class="record-thread-row__label">05 · Edition Lot</span>
              <span class="record-thread-row__val">${lotCode} · Small-Batch Loom Yardage (${product.status}) <span class="record-thread-arrow">↗</span></span>
            </div>
            <div class="record-thread-row" onclick="navigateToMastersTechnique('01')">
              <span class="record-thread-row__label">06 · Master Guild Origin</span>
              <span class="record-thread-row__val">${product.origin} <span class="record-thread-arrow">↗</span></span>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. COMPACT STREAMLINED CARE & REPAIR + SHIPPING & RETURNS BAND -->
      <section class="pdp-woven-band editorial-woven-band pdp-woven-band--compact">
        <div class="pdp-woven-band__inner">
          <div class="accordion-item" id="acc-band-care">
            <button type="button" class="accordion-trigger" onclick="toggleAccordion('acc-band-care')">
              <span class="editorial-acc-title">Care &amp; Repair</span>
              <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content">
              <p>Handwoven and naturally dyed textiles are living cloths. Gentle cold hand wash using pH-neutral soap or specialist eco dry clean. Dry flat in the shade. Complimentary heirloom repair guidance is offered for the life of the garment.</p>
            </div>
          </div>

          <div class="accordion-item" id="acc-band-shipping">
            <button type="button" class="accordion-trigger" onclick="toggleAccordion('acc-band-shipping')">
              <span class="editorial-acc-title">Shipping &amp; Returns</span>
              <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content">
              <p>Dispatched from our European studio via insured DHL Express. Returns accepted on unworn pieces with original lot tags within 14 days of receipt. <button type="button" onclick="navigateTo('returns-policy')" class="pdp-inline-policy-link">Read Full Returns Policy →</button></p>
            </div>
          </div>
        </div>
      </section>
      <!-- 6. RELATED WORKS ("WEAR IT WITH" — Balconte & Atelier / Thread Style Gallery) -->
      <section class="related-works-section editorial-related-works">
        <div class="related-works-header">
          <div>
            <span class="editorial-section-eyebrow">Curated Pairing ──────────</span>
            <h2 class="editorial-large-title">Related Works.</h2>
          </div>
          <button type="button" class="editorial-text-link" onclick="navigateTo('collection', 'all-apparel')">
            <span>View Entire Collection</span>
            <span>⟶</span>
          </button>
        </div>

        <div class="product-grid related-works-grid">
          ${[rec1, rec2, rec3].map(rec => `
            <article class="product-card related-work-card editorial-product-card" onclick="navigateTo('pdp', '${rec.handle}')">
              <div class="product-card__media">
                <img class="product-card__img product-card__img--primary" src="${rec.images[0]}" alt="${rec.title}" />
                <img class="product-card__img product-card__img--secondary" src="${rec.images[1] || rec.images[0]}" alt="${rec.title}" />
              </div>
              <div class="editorial-card-info">
                <div class="editorial-card-top-row">
                  <h3 class="editorial-card-title">${rec.title}</h3>
                  <span class="editorial-card-price">${formatPrice(rec)}</span>
                </div>
                <div class="editorial-card-sub-row">
                  <span class="editorial-card-expression">${rec.commercial_expression} ──────</span>
                </div>
              </div>
            </article>
          `).join("")}
        </div>
      </section>

      <!-- 7. THE DISPATCH / THE REGISTER (Deep Espresso #241914) -->
      <section class="the-register-split-banner" id="pdp-the-register">
        <div class="the-register-split-banner__inner">
          <div class="the-register-split-banner__left">
            <span class="the-register-split-banner__eyebrow">The Register · The Dispatch ──────────</span>
            <h2 class="the-register-split-banner__quote">
              “Correspondence from the Atelier, when there is something worth sending.”
            </h2>
          </div>
          <div class="the-register-split-banner__right">
            <p class="the-register-split-banner__lead">
              The Dispatch carries production notes, material studies, conversations with Masters and considered notice of what the Atelier is making next.
            </p>
            <form class="the-register-split-banner__form" onsubmit="handleNewsletterSubmit(event, 'pdp-register-msg')">
              <input
                type="email"
                class="the-register-split-banner__input"
                placeholder="Your email address"
                required
                aria-label="Your email address"
              />
              <button type="submit" class="the-register-split-banner__btn">
                JOIN THE REGISTER →
              </button>
            </form>
            <div id="pdp-register-msg" class="dispatch-feedback"></div>
          </div>
        </div>
      </section>

      
    </div>
  `;
}

function toggleGlossaryRow(id) {
  const row = document.getElementById(`glossary-row-${id}`);
  if (row) {
    row.classList.toggle("open");
  }
}

// ==========================================================================
// VIEW 4: THE MASTERS & GLOSSARY PAGE (TWO COMPLETELY DISTINCT UX ARCHITECTURES)
// - Direction 1 (Concept A): Linear Architectural Museum Monograph + 4-Chapter Bar
//   + 3-Column Swiss Grid + Filterable 12-Row Horizontal Accordion Table
// - Direction 2 (Concept B): Interactive Studio Workbench + Split-Screen Master
//   Dossier Explorer (01–12 Specimen Deck + Live Open Folio) + Horizontal
//   Herbarium Specimen Sheets + Interactive 4-Stage Atelier Process Switcher
// ==========================================================================
function renderTheMasters() {
  const isBotanicalAtelier = STATE.designConcept === "B";

  const botanicalSpecimens = [
    {
      img: "assets/blots/dot_iron_rust.png",
      swatch: "assets/blots/swatch_marigold.png",
      title: "Marigold & Fermented Iron",
      shortLabel: "01 Marigold",
      code: "VAT SPECIMEN 01",
      origin: "Rajasthan & Kutch Guilds",
      mordant: "Fermented Iron (Kasim) & Jaggery",
      note: "Sun-harvested Tagetes erecta petals steeped with aged iron to yield warm burnt sienna and deep rust.",
      productHandle: "tribeca-checkerboard-navy",
      glossaryId: "06"
    },
    {
      img: "assets/blots/dot_goldenrod.png",
      swatch: "assets/blots/swatch_marigold.png",
      title: "Goldenrod & Mineral Alum",
      shortLabel: "02 Goldenrod",
      code: "VAT SPECIMEN 02",
      origin: "West Bengal Silk Looms",
      mordant: "Mineral Alum & Myrobalan",
      note: "Luminous solar ochre fixed onto unbleached wild Matka silk and handspun Khadi cotton.",
      productHandle: "tribeca-matka-silk-emerald",
      glossaryId: "02"
    },
    {
      img: "assets/blots/dot_apricot.png",
      swatch: "assets/blots/swatch_pokeberry.png",
      title: "Madder Root & Pokeberry",
      shortLabel: "03 Madder",
      code: "VAT SPECIMEN 03",
      origin: "Bagru Master Printers",
      mordant: "Alum Earth & Pomegranate Bark",
      note: "Rubia cordifolia root simmered in clay vessels for botanical rose, terracotta, and soft apricot tones.",
      productHandle: "palma-fresh-pink-cotton",
      glossaryId: "04"
    },
    {
      img: "assets/blots/dot_indigo_moss.png",
      swatch: "assets/blots/dot_indigo_moss.png",
      title: "Wild Indigo & Pomegranate",
      shortLabel: "04 Indigo",
      code: "VAT SPECIMEN 04",
      origin: "Kutch Living Vat",
      mordant: "Tamarind Seed & Alkaline Ash",
      note: "Living fermentation of Indigofera tinctoria over-dyed with pomegranate rind for deep emerald and midnight.",
      productHandle: "tribeca-matka-silk-emerald",
      glossaryId: "06"
    },
    {
      img: "assets/blots/dot_walnut.png",
      swatch: "assets/blots/swatch_walnut.png",
      title: "Black Walnut Hull & Ash",
      shortLabel: "05 Walnut",
      code: "VAT SPECIMEN 05",
      origin: "Northern Handloom Guilds",
      mordant: "Natural Tannin & Wood Ash",
      note: "Rich organic umber and espresso tones drawn from matured walnut hulls without synthetic fixatives.",
      productHandle: "samarkand-black-marble-inlay",
      glossaryId: "03"
    },
    {
      img: "assets/blots/dot_sand_speckle.png",
      swatch: "assets/blots/swatch_marigold.png",
      title: "Myrobalan & Tamarind Seed",
      shortLabel: "06 Myrobalan",
      code: "VAT SPECIMEN 06",
      origin: "First Pre-Mordant Bath",
      mordant: "Terminalia chebula Fruit",
      note: "The essential first Ayurvedic bath that prepares raw handwoven cloth to bond permanently with plant colour.",
      productHandle: "palma-fine-silk-block-print",
      glossaryId: "01"
    }
  ];

  const activeSpec = botanicalSpecimens[STATE.activeDyeLabIndex] || botanicalSpecimens[0];
  const linkedProduct = window.HARTWICK_PRODUCTS.find(p => p.handle === activeSpec.productHandle) || window.HARTWICK_PRODUCTS[0];

  // Active item for Direction 2's Split-Screen Master Dossier Workbench
  const activeDossierItem = HERITAGE_GLOSSARY_LIST.find(item => item.id === STATE.activeGlossaryId) || HERITAGE_GLOSSARY_LIST[0];
  const activeDossierBlot = BOTANICAL_BLOTS[activeDossierItem.blot] || BOTANICAL_BLOTS["marigold"];

  // Map each glossary technique to a representative garment for Direction 2's live dossier garment connection
  const dossierProductMap = {
    "01": "palma-skirt-indigo-khadi",
    "02": "tribeca-matka-silk-emerald",
    "03": "tribeca-checkerboard-navy",
    "04": "palma-fine-silk-block-print",
    "05": "tribeca-checkerboard-navy",
    "06": "tribeca-matka-silk-emerald",
    "07": "palma-fresh-pink-cotton",
    "08": "tribeca-matka-silk-emerald",
    "09": "samarkand-black-marble-inlay",
    "10": "samarkand-black-marble-inlay",
    "11": "palma-fine-silk-block-print",
    "12": "samarkand-black-marble-inlay"
  };
  const dossierGarmentHandle = dossierProductMap[activeDossierItem.id] || STATE.lastPdpHandle || "tribeca-matka-silk-emerald";
  const dossierGarment = window.HARTWICK_PRODUCTS.find(p => p.handle === dossierGarmentHandle) || window.HARTWICK_PRODUCTS[0];

  // 4 Interactive Atelier Stages for Direction 2's Process Storyboard
  const atelierStages = [
    {
      stageNum: "STAGE I · 01 / HANDSPINNING",
      shortTitle: "I. Charkha Spinning",
      headline: "A Moment Held — Drawn & Twisted by Hand",
      tool: "Traditional Wooden Charkha Wheel",
      guild: "Bengal & Bihar Spinners' Guilds",
      cadence: "Electricity-Free · Human Rhythm",
      blotImg: "assets/blots/dot_goldenrod.png",
      swatchImg: "assets/blots/swatch_marigold.png",
      photo: SQS_CDN + "3a6786b9-45ce-459e-83cb-4bee1d2e3554/184_HARTWICK_STYLE_FABRIC4R1A8940.jpg",
      copy: "Where industrial spinning erases character in pursuit of mechanical uniformity, the hand-turned charkha wheel honours the natural breath, micro-air pockets, and subtle slub of raw cotton and wild Matka silk.",
      glossaryId: "02",
      productHandle: "tribeca-matka-silk-emerald"
    },
    {
      stageNum: "STAGE II · 02 / HANDWEAVING",
      shortTitle: "II. Pit Loom Weaving",
      headline: "A Process in Motion — Warp & Weft in Dialogue",
      tool: "Hand-Thrown Wooden Pit Loom",
      guild: "Master Weavers of Kutch & Bengal",
      cadence: "3 to 5 Metres Woven Per Day",
      blotImg: "assets/blots/dot_iron_rust.png",
      swatchImg: "assets/blots/swatch_walnut.png",
      photo: SQS_CDN + "8b35627c-73f1-47cc-8e79-c94a0388f034/125_HARTWICK_HANDWOVEN_TOKYO_SHIRT_IKAT.jpg",
      copy: "Passed throw by throw across the pit loom without electricity, warp and weft unite at a human pace—creating heirloom cloth that drapes with supple architectural structure and carries the signature of its maker.",
      glossaryId: "03",
      productHandle: "tribeca-checkerboard-navy"
    },
    {
      stageNum: "STAGE III · 03 / BLOCK PRINTING",
      shortTitle: "III. The Printing Table",
      headline: "At the Printing Table — 16 Sequential Impressions",
      tool: "Seasoned Hand-Carved Teakwood Blocks",
      guild: "Bagru & Jaipur Master Printers",
      cadence: "24h Open-Air Rest Between Layers",
      blotImg: "assets/blots/dot_apricot.png",
      swatchImg: "assets/blots/swatch_pokeberry.png",
      photo: SQS_CDN + "0c0b1cbc-4c3e-43ad-b43d-1c2c4916289f/080_HARTWICK_OKANAGAN_ROBE_KALAMALKA_BLOCKPRINT.jpg",
      copy: "Each block print begins as a seasoned teakwood block carved by hand, dipped into natural plant and mineral vats, and stamped layer by layer across metres of silk and Khadi. Between each of the 16 impressions, the cloth rests for a full day in open air.",
      glossaryId: "04",
      productHandle: "palma-fine-silk-block-print"
    },
    {
      stageNum: "STAGE IV · 04 / BOTANICAL ALCHEMY",
      shortTitle: "IV. Living Dye Vats",
      headline: "Sun, Water & Earth — Ayurvedic Dye Alchemy",
      tool: "Clay Fermentation Vats & Copper Vessels",
      guild: "Master Natural Colorists",
      cadence: "Solar Curing & Mineral Fixation",
      blotImg: "assets/blots/dot_indigo_moss.png",
      swatchImg: "assets/blots/swatch_marigold.png",
      photo: SQS_CDN + "643566b4-c934-4030-922c-ec6f24a25e06/218_HARTWICK_FINESILK_LARGESQUARE_SCARF_NATURALDYE_BLOCKPRINT.jpg",
      copy: "Unbleached cloth is first bathed in Myrobalan fruit and mineral alum before entering living vats of wild indigo, madder root, marigold, pomegranate rind, and black walnut—yielding colours that deepen with age.",
      glossaryId: "06",
      productHandle: "palma-fresh-pink-cotton"
    }
  ];
  const activeStage = atelierStages[STATE.activeAtelierStageIndex] || atelierStages[0];

  // Category filter for Direction 1's Swiss Index Table
  const categoryMap = {
    "ALL": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    "LOOM": ["01", "02", "03", "05", "07", "08"],
    "DYE": ["04", "06", "11"],
    "SURFACE": ["09", "10", "12"]
  };
  const visibleIds = categoryMap[STATE.glossaryCategoryFilter] || categoryMap["ALL"];
  const filteredGlossaryList = HERITAGE_GLOSSARY_LIST.filter(item => visibleIds.includes(item.id));

  if (isBotanicalAtelier) {
    // =========================================================================
    // DIRECTION 2 MASTERCLASS UX: THE BOTANICAL ARCHIVE & ATELIER WORKBENCH
    // (Completely distinct UX architecture from Direction 1!)
    // 1. Interactive 6-Circle Botanical Dye Vat Laboratory
    // 2. Interactive Split-Screen Master Dossier Workbench (01–12 Specimen Deck + Live Open Folio)
    // 3. 3 Horizontal Layered Herbarium Specimen Folios (The Cloth / Knowledge / Handwork)
    // 4. Interactive 4-Stage "In the Hands of the Maker" Atelier Process Switcher
    // =========================================================================
    return `
      <div class="masters-aloha-view view-enter">
        <!-- WORKBENCH I: INTERACTIVE BOTANICAL DYE VAT LABORATORY -->
        <section class="masters-botanical-hero-b">
          <div class="masters-botanical-hero-b__grid">
            <div>
              <span style="display:inline-block;font-size:10px;letter-spacing:0.24em;text-transform:uppercase;color:#6E5A49;margin-bottom:16px">
                ✦ Direction 2 UX · Interactive Atelier Workbench &amp; Master Dossiers
              </span>
              <blockquote style="font-family:var(--font-serif);font-size:clamp(1.85rem,3vw,2.7rem);font-weight:300;line-height:1.34;color:#1E1B18;text-transform:uppercase;letter-spacing:0.03em;margin-bottom:20px">
                “If we have the khadi spirit in us, we would surround ourselves with simplicity in every walk of life.”
              </blockquote>
              <p style="font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:22px">
                — Mahatma Gandhi
              </p>
              <p style="font-family:var(--font-serif);font-size:15.5px;line-height:1.78;color:var(--text-secondary);margin-bottom:26px;max-width:520px">
                Unlike a standard reading page, this Atelier Workbench lets you actively test Shannon’s 6 botanical dye vats on the right, open any of the 12 Master Dossier Folios below in split-screen view, and trace every technique back to its garment.
              </p>
              <div style="display:flex;gap:12px;flex-wrap:wrap">
                <button
                  type="button"
                  class="btn-primary"
                  onclick="scrollToElementById('masters-glossary-index')"
                >
                  Open Split-Screen Master Dossiers ↓
                </button>
                <button
                  type="button"
                  class="btn-outline"
                  onclick="returnToProductFromMasters()"
                >
                  ← Return to Garment Page
                </button>
              </div>
            </div>

            <!-- Interactive 6-Circle Botanical Dye Vat Laboratory -->
            <div class="dye-lab-interactive">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;flex-wrap:wrap;gap:8px">
                <span style="font-size:9.5px;letter-spacing:0.2em;text-transform:uppercase;color:#1E1B18;font-weight:600">
                  ✦ Interactive Botanical Dye Vat Laboratory (01–06)
                </span>
                <span style="font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:var(--text-muted)">
                  Click Any Botanical Circle Below
                </span>
              </div>

              <div class="dye-lab-interactive__circles">
                ${botanicalSpecimens.map((spec, idx) => `
                  <div
                    class="dye-lab-organic-specimen ${STATE.activeDyeLabIndex === idx ? "active" : ""}"
                    onclick="selectDyeLabSpecimen(${idx})"
                  >
                    <img src="${spec.img}" alt="${spec.title}" />
                    <span>${spec.shortLabel}</span>
                  </div>
                `).join("")}
              </div>

              <div style="background:#F3EFE8;padding:18px 20px;display:grid;grid-template-columns:1fr auto;gap:18px;align-items:center;margin-bottom:14px">
                <div>
                  <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#6E5A49;font-weight:600;margin-bottom:4px">
                    ${activeSpec.code} &nbsp;·&nbsp; Origin: ${activeSpec.origin}
                  </div>
                  <h3 style="font-family:var(--font-serif);font-size:21px;font-weight:400;color:#1E1B18;margin-bottom:6px">
                    ${activeSpec.title}
                  </h3>
                  <p style="font-family:var(--font-serif);font-style:italic;font-size:14px;color:var(--text-secondary);line-height:1.6;margin-bottom:10px">
                    ${activeSpec.note}
                  </p>
                  <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center;font-size:9.5px;letter-spacing:0.15em;text-transform:uppercase;color:#1E1B18">
                    <span><strong>Mordant / Fixative:</strong> ${activeSpec.mordant}</span>
                    <button
                      type="button"
                      onclick="selectMasterDossierTechnique('${activeSpec.glossaryId}');scrollToElementById('masters-glossary-index')"
                      style="background:none;border:none;color:#1E1B18;font-weight:600;text-decoration:underline;cursor:pointer;font-size:9.5px;letter-spacing:0.15em;text-transform:uppercase;padding:0"
                    >
                      Open Dossier #${activeSpec.glossaryId} ↓
                    </button>
                  </div>
                </div>
                <div style="text-align:center">
                  <img src="${activeSpec.swatch}" alt="${activeSpec.title} Swatch" style="width:88px;height:88px;object-fit:contain;mix-blend-mode:multiply;display:block;margin:0 auto" />
                  <span style="display:block;font-size:8px;letter-spacing:0.16em;text-transform:uppercase;color:var(--text-muted);margin-top:6px;font-weight:600">
                    Watercolor Swatch
                  </span>
                </div>
              </div>

              <div
                onclick="navigateTo('pdp', '${linkedProduct.handle}')"
                style="background:#F3EFE8;color:#1E1B18;padding:12px 16px;border:1px solid var(--border-strong);display:flex;justify-content:space-between;align-items:center;gap:14px;cursor:pointer"
              >
                <div style="display:flex;align-items:center;gap:14px">
                  <img src="${linkedProduct.images[0]}" alt="${linkedProduct.title}" style="width:46px;height:58px;object-fit:cover;border:1px solid var(--border-subtle)" />
                  <div>
                    <span style="display:block;font-size:8.5px;letter-spacing:0.2em;text-transform:uppercase;color:#6E5A49">
                      Garment Dyed in ${activeSpec.code} · ${linkedProduct.lot}
                    </span>
                    <strong style="font-size:11.5px;letter-spacing:0.14em;text-transform:uppercase;color:#1E1B18;display:block;margin-top:2px">
                      ${linkedProduct.title}
                    </strong>
                    <span style="font-family:var(--font-serif);font-style:italic;font-size:13px;color:var(--text-secondary)">
                      ${linkedProduct.commercial_expression} — ${formatPrice(linkedProduct)}
                    </span>
                  </div>
                </div>
                <span style="font-size:9.5px;letter-spacing:0.16em;text-transform:uppercase;color:#1E1B18;font-weight:600;white-space:nowrap">
                  Open Garment ⟶
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- WORKBENCH II: INTERACTIVE SPLIT-SCREEN MASTER DOSSIER WORKBENCH (01–12)
             (Replaces the vertical 12-row accordion of Direction 1 with a 2-Pane Specimen Deck + Live Master Folio!) -->
        <section class="masters-dossier-workbench" id="masters-glossary-index">
          <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px">
            <div>
              <span class="fibre-to-garment__eyebrow" style="color:#6E5A49">✦ Interactive Split-Screen Archive · 01 — 12</span>
              <h2 class="fibre-to-garment__title">THE MASTER DOSSIER &amp; SPECIMEN WORKBENCH</h2>
              <p style="font-family:var(--font-serif);font-size:16px;color:var(--text-secondary);margin-top:6px;max-width:680px">
                Select any of the 12 botanical specimen cards on the left to open its complete Master Dossier Folio on the right—complete with dual hand-painted dye seals, atelier provenance, and the garment crafted with that technique.
              </p>
            </div>
            <button
              type="button"
              class="btn-outline"
              style="padding:10px 18px;font-size:9.5px"
              onclick="returnToProductFromMasters()"
            >
              ← Return to Product Page
            </button>
          </div>

          <div class="masters-dossier-workbench__grid">
            <!-- LEFT PANE: 2-Column Tactile Specimen Deck (01–12) -->
            <div class="dossier-deck-panel">
              <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:10px;border-bottom:1px solid var(--border-strong)">
                <span style="font-size:9.5px;letter-spacing:0.2em;text-transform:uppercase;color:#1E1B18;font-weight:600">
                  12 Heritage Specimens
                </span>
                <span style="font-size:9px;letter-spacing:0.16em;text-transform:uppercase;color:#6E5A49">
                  Active: #${activeDossierItem.id} ${activeDossierItem.name}
                </span>
              </div>
              <div class="dossier-deck-grid">
                ${HERITAGE_GLOSSARY_LIST.map(item => {
                  const isSelected = item.id === activeDossierItem.id;
                  return `
                    <button
                      type="button"
                      class="dossier-deck-btn ${isSelected ? "active" : ""}"
                      onclick="selectMasterDossierTechnique('${item.id}')"
                    >
                      <div>
                        <span class="dossier-deck-btn__num">Specimen ${item.id}</span>
                        <span class="dossier-deck-btn__name">${item.name}</span>
                      </div>
                    </button>
                  `;
                }).join("")}
              </div>
            </div>

            <!-- RIGHT PANE: Open Master Dossier Folio -->
            <div class="dossier-folio-panel" id="glossary-row-${activeDossierItem.id}">
              <div class="dossier-folio-panel__top-bar">
                <span style="font-size:9.5px;letter-spacing:0.22em;text-transform:uppercase;color:#6E5A49;font-weight:600">
                  Atelier Master Dossier · Specimen #${activeDossierItem.id} of 12
                </span>
                <div style="display:flex;gap:8px">
                  <button
                    type="button"
                    class="btn-outline"
                    style="padding:6px 12px;font-size:9px"
                    onclick="stepMasterDossierTechnique(-1)"
                  >
                    ← Prev Dossier
                  </button>
                  <button
                    type="button"
                    class="btn-outline"
                    style="padding:6px 12px;font-size:9px"
                    onclick="stepMasterDossierTechnique(1)"
                  >
                    Next Dossier →
                  </button>
                </div>
              </div>

              <div class="dossier-folio-panel__header">
                <div style="max-width:440px">
                  <span style="display:block;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#6E5A49;margin-bottom:6px">
                    Heritage Technique #${activeDossierItem.id}
                  </span>
                  <h3 style="font-family:var(--font-serif);font-size:clamp(1.9rem,3vw,2.6rem);font-weight:300;text-transform:uppercase;letter-spacing:0.06em;color:#1E1B18;margin-bottom:8px">
                    ${activeDossierItem.name}
                  </h3>
                  <p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:var(--text-secondary)">
                    ${activeDossierItem.summary}
                  </p>
                </div>

                <!-- Dual Botanical Seal (Organic Unframed Watercolor Dot + Swatch) -->
                <div style="display:flex;align-items:center;gap:16px">
                  <img src="${activeDossierBlot.img}" alt="${activeDossierItem.botanicalLabel}" style="width:86px;height:86px;object-fit:contain;mix-blend-mode:multiply" />
                  <img src="${activeDossierBlot.swatch}" alt="${activeDossierItem.botanicalLabel} Swatch" style="width:82px;height:82px;object-fit:contain;mix-blend-mode:multiply" />
                  <div style="font-size:9px;letter-spacing:0.15em;text-transform:uppercase">
                    <span style="display:block;color:#6E5A49">${activeDossierBlot.lotCode}</span>
                    <strong style="display:block;color:#1E1B18;margin-top:2px;max-width:140px;line-height:1.3">${activeDossierItem.botanicalLabel}</strong>
                  </div>
                </div>
              </div>

              <!-- 4-Cell Atelier Provenance Strip -->
              <div class="dossier-folio-panel__meta-strip">
                <div class="dossier-meta-cell">
                  <span>Craft Discipline</span>
                  <strong>${activeDossierItem.name}</strong>
                </div>
                <div class="dossier-meta-cell">
                  <span>Botanical Seal</span>
                  <strong>${activeDossierBlot.lotCode}</strong>
                </div>
                <div class="dossier-meta-cell">
                  <span>Energy Input</span>
                  <strong>100% Hand / 0 kWh</strong>
                </div>
                <div class="dossier-meta-cell">
                  <span>Atelier Status</span>
                  <strong>Living Heritage</strong>
                </div>
              </div>

              <!-- Two-Column Dossier Body: Story + Archival Master Image -->
              <div style="display:grid;grid-template-columns:1.15fr 1fr;gap:28px;align-items:start;margin-bottom:28px">
                <div style="font-family:var(--font-serif);font-size:16px;line-height:1.82;color:var(--text-secondary)">
                  ${activeDossierItem.paragraphs.map(p => `<p style="margin-bottom:14px">${p}</p>`).join("")}
                </div>
                <div>
                  <div style="aspect-ratio:4/3;overflow:hidden;border:1px solid var(--border-strong);background:#EAE4DA">
                    <img src="${activeDossierItem.image}" alt="${activeDossierItem.name}" style="width:100%;height:100%;object-fit:cover" />
                  </div>
                  <div style="display:flex;justify-content:space-between;font-size:8.5px;letter-spacing:0.18em;text-transform:uppercase;color:var(--text-muted);margin-top:8px">
                    <span>Hartwick Atelier Archival Plate #${activeDossierItem.id}</span>
                    <span>Authentic Master Record</span>
                  </div>
                </div>
              </div>

              <!-- Live Connected Garment + Fibre-to-Garment Glossary Loop inside the Open Dossier -->
              <div style="background:#F3EFE8;border:1px solid var(--border-subtle);padding:20px 22px">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;padding-bottom:16px;border-bottom:1px solid var(--border-subtle)">
                  <div style="display:flex;align-items:center;gap:16px">
                    <img src="${dossierGarment.images[0]}" alt="${dossierGarment.title}" style="width:56px;height:72px;object-fit:cover;border:1px solid var(--border-subtle)" />
                    <div>
                      <span style="display:block;font-size:8.5px;letter-spacing:0.2em;text-transform:uppercase;color:#6E5A49">
                        Fibre-to-Garment Glossary Loop · Technique #${activeDossierItem.id} (${activeDossierItem.name}) · ${dossierGarment.lot}
                      </span>
                      <strong style="display:block;font-size:13.5px;letter-spacing:0.14em;text-transform:uppercase;color:#1E1B18;margin-top:3px">
                        ${dossierGarment.title}
                      </strong>
                      <span style="font-family:var(--font-serif);font-style:italic;font-size:14px;color:var(--text-secondary)">
                        ${dossierGarment.commercial_expression} — ${formatPrice(dossierGarment)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn-primary"
                    style="padding:12px 22px;font-size:10px"
                    onclick="navigateTo('pdp', '${dossierGarment.handle}')"
                  >
                    Inspect Garment &amp; Fibre Record ⟶
                  </button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;padding-top:14px;font-size:10px">
                  <div>
                    <span style="display:block;font-size:8px;letter-spacing:0.18em;text-transform:uppercase;color:#6E5A49;margin-bottom:3px">Product Name</span>
                    <strong style="color:#1E1B18;font-family:var(--font-serif);font-size:13px">${dossierGarment.title}</strong>
                  </div>
                  <div>
                    <span style="display:block;font-size:8px;letter-spacing:0.18em;text-transform:uppercase;color:#6E5A49;margin-bottom:3px">Sizing</span>
                    <strong style="color:#1E1B18;font-family:var(--font-serif);font-size:13px">${(dossierGarment.fibre_to_garment && dossierGarment.fibre_to_garment.sizing) || (dossierGarment.sizes || ["XS","S","M","L","XL"]).join(" · ")}</strong>
                  </div>
                  <div>
                    <span style="display:block;font-size:8px;letter-spacing:0.18em;text-transform:uppercase;color:#6E5A49;margin-bottom:3px">Fiber</span>
                    <strong style="color:#1E1B18;font-family:var(--font-serif);font-size:13px">${(dossierGarment.fibre_to_garment && dossierGarment.fibre_to_garment.fiber) || dossierGarment.fibre}</strong>
                  </div>
                  <div>
                    <span style="display:block;font-size:8px;letter-spacing:0.18em;text-transform:uppercase;color:#6E5A49;margin-bottom:3px">Spinning Details</span>
                    <strong style="color:#1E1B18;font-family:var(--font-serif);font-size:13px">${(dossierGarment.fibre_to_garment && dossierGarment.fibre_to_garment.spinning) || "Hand-spun on wooden Charkha"}</strong>
                  </div>
                  <div>
                    <span style="display:block;font-size:8px;letter-spacing:0.18em;text-transform:uppercase;color:#6E5A49;margin-bottom:3px">Construction</span>
                    <strong style="color:#1E1B18;font-family:var(--font-serif);font-size:13px">${(dossierGarment.fibre_to_garment && dossierGarment.fibre_to_garment.construction) || "Single-tailor French-seam assembly"}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- WORKBENCH III: HORIZONTAL LAYERED HERBARIUM SPECIMEN FOLIOS (THE 3 FOUNDATIONS)
             (Replaces the 3 vertical cards of Direction 1 with wide horizontal Herbarium Sheets!) -->
        <section class="masters-knowledge-triad">
          <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px">
            <div>
              <span class="fibre-to-garment__eyebrow" style="color:#6E5A49">✦ Three Herbarium Specimen Folios</span>
              <h2 class="fibre-to-garment__title">THE KNOWLEDGE BEHIND THE WORK</h2>
            </div>
            <span style="font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#6E5A49">
              Direction 2 UX: Horizontal Layered Herbarium Sheets + Atelier Ledgers
            </span>
          </div>

          <div class="herbarium-folio-stack">
            <!-- HERBARIUM FOLIO I: THE CLOTH -->
            <article class="herbarium-folio-row">
              <div class="herbarium-folio-row__specimen">
                <div style="display:flex;justify-content:center;align-items:center;gap:12px;margin-bottom:10px">
                  <img src="assets/blots/swatch_marigold.png" alt="Marigold Swatch Plate" style="width:104px;height:104px;object-fit:contain;mix-blend-mode:multiply" />
                  <img src="assets/blots/dot_iron_rust.png" alt="Iron Marigold Blot" style="width:74px;height:74px;object-fit:contain;mix-blend-mode:multiply" />
                </div>
                <span style="display:block;font-size:8.5px;letter-spacing:0.2em;text-transform:uppercase;color:#6E5A49;font-weight:600">
                  Herbarium Plate I · VAT-MRG-01
                </span>
              </div>
              <div>
                <span class="fibre-to-garment__eyebrow" style="color:#6E5A49">Foundation 01 · Materiality</span>
                <h3 style="font-family:var(--font-serif);font-size:26px;font-weight:400;color:#1E1B18;margin-bottom:10px">The Cloth</h3>
                <p style="font-family:var(--font-serif);font-size:16.5px;line-height:1.82;color:var(--text-secondary)">
                  From hand-harvested organic cotton and wild Matka silk to handspun yarn on the charkha, our textiles are woven without electricity. They breathe and drape with a supple rhythm that only human hands can create.
                </p>
              </div>
              <div class="herbarium-folio-row__ledger">
                <div class="herbarium-ledger-line"><span>Fibre</span><strong>Khadi &amp; Wild Matka Silk</strong></div>
                <div class="herbarium-ledger-line"><span>Spun On</span><strong>Hand-Turned Charkha</strong></div>
                <div class="herbarium-ledger-line"><span>Loom</span><strong>Wooden Pit Loom</strong></div>
                <button
                  type="button"
                  onclick="selectMasterDossierTechnique('01');scrollToElementById('masters-glossary-index')"
                  style="margin-top:12px;width:100%;background:#1E1B18;color:#FAF8F4;border:none;padding:10px;font-size:9.5px;letter-spacing:0.18em;text-transform:uppercase;cursor:pointer"
                >
                  Open Dossier #01 Khadi ↑
                </button>
              </div>
            </article>

            <!-- HERBARIUM FOLIO II: THE KNOWLEDGE -->
            <article class="herbarium-folio-row">
              <div class="herbarium-folio-row__specimen">
                <div style="display:flex;justify-content:center;align-items:center;gap:12px;margin-bottom:10px">
                  <img src="assets/blots/swatch_pokeberry.png" alt="Pokeberry Swatch Plate" style="width:104px;height:104px;object-fit:contain;mix-blend-mode:multiply" />
                  <img src="assets/blots/dot_goldenrod.png" alt="Goldenrod Blot" style="width:74px;height:74px;object-fit:contain;mix-blend-mode:multiply" />
                </div>
                <span style="display:block;font-size:8.5px;letter-spacing:0.2em;text-transform:uppercase;color:#6E5A49;font-weight:600">
                  Herbarium Plate II · VAT-PKB-05
                </span>
              </div>
              <div>
                <span class="fibre-to-garment__eyebrow" style="color:#6E5A49">Foundation 02 · Botanical Alchemy</span>
                <h3 style="font-family:var(--font-serif);font-size:26px;font-weight:400;color:#1E1B18;margin-bottom:10px">The Knowledge</h3>
                <p style="font-family:var(--font-serif);font-size:16.5px;line-height:1.82;color:var(--text-secondary)">
                  Master Colorists work with living vats of wild indigo, pomegranate rind, madder root, turmeric, myrobalan, and fermented iron—waiting on the warmth of the sun and the mineral balance of water.
                </p>
              </div>
              <div class="herbarium-folio-row__ledger">
                <div class="herbarium-ledger-line"><span>Pre-Mordant</span><strong>Myrobalan &amp; Alum</strong></div>
                <div class="herbarium-ledger-line"><span>Dye Bath</span><strong>Indigo, Madder &amp; Iron</strong></div>
                <div class="herbarium-ledger-line"><span>Fixation</span><strong>Open Sun &amp; River Air</strong></div>
                <button
                  type="button"
                  onclick="selectMasterDossierTechnique('06');scrollToElementById('masters-glossary-index')"
                  style="margin-top:12px;width:100%;background:#1E1B18;color:#FAF8F4;border:none;padding:10px;font-size:9.5px;letter-spacing:0.18em;text-transform:uppercase;cursor:pointer"
                >
                  Open Dossier #06 Natural Dye ↑
                </button>
              </div>
            </article>

            <!-- HERBARIUM FOLIO III: THE HANDWORK -->
            <article class="herbarium-folio-row">
              <div class="herbarium-folio-row__specimen">
                <div style="display:flex;justify-content:center;align-items:center;gap:12px;margin-bottom:10px">
                  <img src="assets/blots/swatch_walnut.png" alt="Walnut Swatch Plate" style="width:104px;height:104px;object-fit:contain;mix-blend-mode:multiply" />
                  <img src="assets/blots/dot_walnut.png" alt="Walnut Blot" style="width:74px;height:74px;object-fit:contain;mix-blend-mode:multiply" />
                </div>
                <span style="display:block;font-size:8.5px;letter-spacing:0.2em;text-transform:uppercase;color:#6E5A49;font-weight:600">
                  Herbarium Plate III · VAT-WLN-03
                </span>
              </div>
              <div>
                <span class="fibre-to-garment__eyebrow" style="color:#6E5A49">Foundation 03 · Patience</span>
                <h3 style="font-family:var(--font-serif);font-size:26px;font-weight:400;color:#1E1B18;margin-bottom:10px">The Handwork</h3>
                <p style="font-family:var(--font-serif);font-size:16.5px;line-height:1.82;color:var(--text-secondary)">
                  Whether carving teakwood blocks by hand, stamping 16 sequential resist layers, or couching metallic Gota Patti ribbon in Jaipur, time is measured by completion rather than the clock.
                </p>
              </div>
              <div class="herbarium-folio-row__ledger">
                <div class="herbarium-ledger-line"><span>Blocks</span><strong>Seasoned Hand-Carved Teak</strong></div>
                <div class="herbarium-ledger-line"><span>Impressions</span><strong>Up to 16 Layered Stamps</strong></div>
                <div class="herbarium-ledger-line"><span>Goldwork</span><strong>Jaipur Zari &amp; Gota Patti</strong></div>
                <button
                  type="button"
                  onclick="selectMasterDossierTechnique('04');scrollToElementById('masters-glossary-index')"
                  style="margin-top:12px;width:100%;background:#1E1B18;color:#FAF8F4;border:none;padding:10px;font-size:9.5px;letter-spacing:0.18em;text-transform:uppercase;cursor:pointer"
                >
                  Open Dossier #04 Block Print ↑
                </button>
              </div>
            </article>
          </div>
        </section>

        <!-- WORKBENCH IV: INTERACTIVE 4-STAGE ATELIER PROCESS STORYBOARD
             (Replaces the static 2-card diptych of Direction 1 with an interactive 4-Stage Maker Switcher!) -->
        <section class="atelier-process-workbench">
          <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px">
            <div>
              <span class="fibre-to-garment__eyebrow" style="color:#6E5A49">✦ Interactive 4-Stage Maker Storyboard</span>
              <h2 class="fibre-to-garment__title">WE CHERISH THESE NUANCES FOR THEIR HUMAN TOUCH</h2>
            </div>
            <span style="font-size:9.5px;letter-spacing:0.16em;text-transform:uppercase;color:var(--text-muted)">
              Click Any Stage (I–IV) to Inspect the Maker’s Process
            </span>
          </div>

          <div class="atelier-stage-tabs">
            ${atelierStages.map((stg, idx) => `
              <button
                type="button"
                class="atelier-stage-tab ${STATE.activeAtelierStageIndex === idx ? "active" : ""}"
                onclick="selectAtelierStage(${idx})"
              >
                <div>
                  <span style="display:block;font-size:8.5px;letter-spacing:0.2em;text-transform:uppercase;color:#6E5A49">Stage 0${idx + 1}</span>
                  <strong style="display:block;font-family:var(--font-serif);font-size:16px;font-weight:400;color:#1E1B18;margin-top:2px">${stg.shortTitle}</strong>
                </div>
              </button>
            `).join("")}
          </div>

          <div class="atelier-stage-showcase">
            <div style="aspect-ratio:16/10;overflow:hidden;border:1px solid var(--border-strong);background:#EAE4DA">
              <img src="${activeStage.photo}" alt="${activeStage.headline}" style="width:100%;height:100%;object-fit:cover" />
            </div>
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--border-subtle)">
                <span style="font-size:9.5px;letter-spacing:0.22em;text-transform:uppercase;color:#6E5A49;font-weight:600">
                  ${activeStage.stageNum}
                </span>
                <div style="display:flex;align-items:center;gap:10px">
                  <img src="${activeStage.blotImg}" alt="" style="width:62px;height:62px;object-fit:contain;mix-blend-mode:multiply" />
                  <img src="${activeStage.swatchImg}" alt="" style="width:58px;height:58px;object-fit:contain;mix-blend-mode:multiply" />
                </div>
              </div>
              <h3 style="font-family:var(--font-serif);font-size:clamp(1.6rem,2.4vw,2.15rem);font-weight:300;text-transform:uppercase;letter-spacing:0.05em;color:#1E1B18;margin-bottom:14px">
                ${activeStage.headline}
              </h3>
              <p style="font-family:var(--font-serif);font-size:16px;line-height:1.82;color:var(--text-secondary);margin-bottom:20px">
                ${activeStage.copy}
              </p>
              <div style="background:#F3EFE8;border:1px solid var(--border-subtle);padding:14px 18px;margin-bottom:22px;display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase">
                <div><span style="color:#6E5A49;display:block;font-size:8.5px">Master Tool</span><strong>${activeStage.tool}</strong></div>
                <div><span style="color:#6E5A49;display:block;font-size:8.5px">Guild &amp; Cadence</span><strong>${activeStage.cadence}</strong></div>
              </div>
              <div style="display:flex;gap:12px;flex-wrap:wrap">
                <button class="btn-primary" onclick="navigateTo('pdp', '${activeStage.productHandle}')">
                  Inspect Garment From This Stage ⟶
                </button>
                <button class="btn-outline" onclick="selectMasterDossierTechnique('${activeStage.glossaryId}');scrollToElementById('masters-glossary-index')">
                  Open Master Dossier ↑
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  // ===========================================================================
  // DIRECTION 1 MASTERCLASS UX: THE ARCHITECTURAL GALLERY (The Row / Jil Sander)
  // Linear Museum Exhibition Monograph + 4-Chapter Jump Bar + 3-Col Swiss Grid
  // + Filterable 12-Row Horizontal Accordion Table + Gallery Diptych
  // ===========================================================================
  return `
    <div class="masters-aloha-view view-enter">
      <!-- 1. ARCHITECTURAL EXHIBITION PLINTH HERO -->
      <section class="masters-khadi-hero">
        <div class="masters-khadi-hero__inner">
          <span class="masters-khadi-hero__eyebrow" style="color:#121212;letter-spacing:0.26em">Direction 1 UX · Architectural Gallery Monograph · 01 — 12</span>
          <blockquote class="masters-khadi-hero__quote" style="color:#121212">
            “If we have the khadi spirit in us, we would surround ourselves with simplicity in every walk of life.”
          </blockquote>
          <p class="masters-khadi-hero__author" style="color:#3A3A38">— Mahatma Gandhi</p>
        </div>
      </section>

      <!-- 4-CHAPTER ARCHITECTURAL EXHIBITION BAR (Unique to Direction 1 UX) -->
      <nav class="arch-chapter-bar" aria-label="Exhibition Chapters">
        <button type="button" class="arch-chapter-bar__btn" onclick="scrollToElementById('arch-chap-1')">
          <span class="arch-chapter-bar__num">Chapter I · Plate 01</span>
          <span class="arch-chapter-bar__label">Lineage &amp; Handwork ↓</span>
        </button>
        <button type="button" class="arch-chapter-bar__btn" onclick="scrollToElementById('arch-chap-2')">
          <span class="arch-chapter-bar__num">Chapter II · Triad</span>
          <span class="arch-chapter-bar__label">Three Foundations ↓</span>
        </button>
        <button type="button" class="arch-chapter-bar__btn" onclick="scrollToElementById('masters-glossary-index')">
          <span class="arch-chapter-bar__num">Chapter III · Index 01–12</span>
          <span class="arch-chapter-bar__label">Swiss Technique Table ↓</span>
        </button>
        <button type="button" class="arch-chapter-bar__btn" onclick="scrollToElementById('arch-chap-4')">
          <span class="arch-chapter-bar__num">Chapter IV · Diptych</span>
          <span class="arch-chapter-bar__label">Human Nuances ↓</span>
        </button>
      </nav>

      <!-- 2. CHAPTER I: EDITORIAL SPLIT MONOGRAPH -->
      <section class="masters-intro-split" id="arch-chap-1">
        <div class="masters-intro-split__img" style="position:relative">
          <span class="arch-crosshair arch-crosshair--tl">+</span>
          <span class="arch-crosshair arch-crosshair--tr">+</span>
          <span class="arch-crosshair arch-crosshair--bl">+</span>
          <span class="arch-crosshair arch-crosshair--br">+</span>
          <img
            src="${SQS_CDN}643566b4-c934-4030-922c-ec6f24a25e06/218_HARTWICK_FINESILK_LARGESQUARE_SCARF_NATURALDYE_BLOCKPRINT.jpg"
            alt="Master Artisan at the Printing Table"
          />
        </div>
        <div class="masters-intro-split__text">
          <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px">
            <img src="assets/blots/dot_walnut.png" alt="Walnut Dye Dot" style="width:42px;height:42px;mix-blend-mode:multiply" />
            <div>
              <span class="fibre-to-garment__eyebrow" style="margin-bottom:2px">Chapter I · Lineage &amp; Handwork</span>
              <span style="font-family:var(--font-serif);font-style:italic;font-size:15px;color:var(--text-secondary)">Centuries of Rare Artisanal Knowledge</span>
            </div>
          </div>
          <p>
            Textile history dates back to the beginning of human civilization. Masters hold knowledge developed over centuries—passed down from hand to hand, loom to loom, and dye vat to dye vat.
          </p>
          <p>
            Hartwick Atelier specializes in hand spun and handwoven fabrics, natural and ayurvedic dyes, and exquisite heritage handwork. These artisanal techniques rely on rare knowledge and the natural cycles of the sun, wind, and rain.
          </p>
          <p style="margin-bottom:24px">
            Each handcrafted piece in the collection is a living record of the master weavers, spinners, woodblock carvers, natural colorists, and goldsmiths who brought it into being.
          </p>

          <!-- Architectural Metric Ledger Strip -->
          <div style="display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #121212;border-bottom:1px solid #121212;padding:14px 0;margin-bottom:24px;gap:12px">
            <div>
              <span style="display:block;font-family:var(--font-serif);font-size:22px;color:#121212">12</span>
              <span style="font-size:8.5px;letter-spacing:0.18em;text-transform:uppercase;color:var(--text-muted)">Indexed Crafts</span>
            </div>
            <div>
              <span style="display:block;font-family:var(--font-serif);font-size:22px;color:#121212">16</span>
              <span style="font-size:8.5px;letter-spacing:0.18em;text-transform:uppercase;color:var(--text-muted)">Block Impressions</span>
            </div>
            <div>
              <span style="display:block;font-family:var(--font-serif);font-size:22px;color:#121212">0 kWh</span>
              <span style="font-size:8.5px;letter-spacing:0.18em;text-transform:uppercase;color:var(--text-muted)">Handloom Energy</span>
            </div>
          </div>

          <div style="display:flex;gap:12px;flex-wrap:wrap">
            <button type="button" class="btn-primary" onclick="scrollToElementById('masters-glossary-index')">
              Explore Glossary Table ↓
            </button>
            <button type="button" class="btn-outline" onclick="navigateTo('pdp', '${STATE.lastPdpHandle || "tribeca-matka-silk-emerald"}')">
              Inspect Garment Record ⟶
            </button>
          </div>
        </div>
      </section>

      <!-- 3. CHAPTER II: THE KNOWLEDGE BEHIND THE WORK — 3-COLUMN SWISS ARCHITECTURAL GRID -->
      <section class="masters-knowledge-triad" id="arch-chap-2">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px">
          <div>
            <span class="fibre-to-garment__eyebrow">Chapter II · Three Foundations</span>
            <h2 class="fibre-to-garment__title">THE KNOWLEDGE BEHIND THE WORK</h2>
          </div>
          <span style="font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:var(--text-muted)">
            Direction 1 UX: 3-Column Swiss Gallery Grid with Prominent Botanical Dots (76px)
          </span>
        </div>

        <div class="masters-knowledge-triad__grid">
          <article class="knowledge-card" style="background:var(--bg-primary);padding:40px 34px">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:22px">
                <div>
                  <span class="fibre-to-garment__eyebrow">01 · Materiality</span>
                  <h3 class="knowledge-card__title" style="font-size:24px;margin-bottom:0">The Cloth</h3>
                </div>
                <img
                  src="assets/blots/dot_iron_rust.png"
                  alt="Marigold Dot"
                  style="width:76px;height:76px;object-fit:contain;mix-blend-mode:multiply"
                />
              </div>
              <p class="knowledge-card__copy" style="font-size:16px;line-height:1.82">
                From hand-harvested organic cotton and wild Matka silk to handspun yarn on the charkha, our textiles are woven without electricity. They breathe and drape with a supple rhythm that only human hands can create.
              </p>
            </div>
            <div class="knowledge-card__blot-footer">
              <span>Index 01 · Marigold &amp; Iron</span>
              <button type="button" onclick="navigateToMastersTechnique('01')" style="background:none;border:none;font-size:9.5px;letter-spacing:0.18em;text-transform:uppercase;cursor:pointer;text-decoration:underline">
                01 Khadi ↓
              </button>
            </div>
          </article>

          <article class="knowledge-card" style="background:var(--bg-primary);padding:40px 34px">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:22px">
                <div>
                  <span class="fibre-to-garment__eyebrow">02 · Alchemy</span>
                  <h3 class="knowledge-card__title" style="font-size:24px;margin-bottom:0">The Knowledge</h3>
                </div>
                <img
                  src="assets/blots/dot_goldenrod.png"
                  alt="Goldenrod Dot"
                  style="width:76px;height:76px;object-fit:contain;mix-blend-mode:multiply"
                />
              </div>
              <p class="knowledge-card__copy" style="font-size:16px;line-height:1.82">
                Master Colorists work with living vats of wild indigo, pomegranate rind, madder root, turmeric, myrobalan, and fermented iron—waiting on the warmth of the sun and the mineral balance of water.
              </p>
            </div>
            <div class="knowledge-card__blot-footer">
              <span>Index 06 · Goldenrod &amp; Alum</span>
              <button type="button" onclick="navigateToMastersTechnique('06')" style="background:none;border:none;font-size:9.5px;letter-spacing:0.18em;text-transform:uppercase;cursor:pointer;text-decoration:underline">
                06 Natural Dye ↓
              </button>
            </div>
          </article>

          <article class="knowledge-card" style="background:var(--bg-primary);padding:40px 34px">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:22px">
                <div>
                  <span class="fibre-to-garment__eyebrow">03 · Patience</span>
                  <h3 class="knowledge-card__title" style="font-size:24px;margin-bottom:0">The Handwork</h3>
                </div>
                <img
                  src="assets/blots/dot_walnut.png"
                  alt="Walnut Dot"
                  style="width:76px;height:76px;object-fit:contain;mix-blend-mode:multiply"
                />
              </div>
              <p class="knowledge-card__copy" style="font-size:16px;line-height:1.82">
                Whether carving teakwood blocks by hand, stamping 16 sequential resist layers, or couching metallic Gota Patti ribbon in Jaipur, time is measured by completion rather than the clock.
              </p>
            </div>
            <div class="knowledge-card__blot-footer">
              <span>Index 04 · Black Walnut &amp; Ash</span>
              <button type="button" onclick="navigateToMastersTechnique('04')" style="background:none;border:none;font-size:9.5px;letter-spacing:0.18em;text-transform:uppercase;cursor:pointer;text-decoration:underline">
                04 Block Print ↓
              </button>
            </div>
          </article>
        </div>
      </section>

      <!-- 4. CHAPTER III: FILTERABLE 12-ROW SWISS ARCHITECTURAL ACCORDION TABLE -->
      <section class="masters-glossary-section" id="masters-glossary-index">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;margin-bottom:20px">
          <div>
            <span class="fibre-to-garment__eyebrow">Chapter III · The Archive Index · 01 — 12</span>
            <h2 class="fibre-to-garment__title">A GLOSSARY OF HERITAGE TECHNIQUES</h2>
          </div>
          <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
            <div class="arch-filter-pills">
              <button type="button" class="arch-filter-pill ${STATE.glossaryCategoryFilter === "ALL" ? "active" : ""}" onclick="setGlossaryCategoryFilter('ALL')">All 12</button>
              <button type="button" class="arch-filter-pill ${STATE.glossaryCategoryFilter === "LOOM" ? "active" : ""}" onclick="setGlossaryCategoryFilter('LOOM')">Fibre &amp; Loom</button>
              <button type="button" class="arch-filter-pill ${STATE.glossaryCategoryFilter === "DYE" ? "active" : ""}" onclick="setGlossaryCategoryFilter('DYE')">Botanical Dye &amp; Print</button>
              <button type="button" class="arch-filter-pill ${STATE.glossaryCategoryFilter === "SURFACE" ? "active" : ""}" onclick="setGlossaryCategoryFilter('SURFACE')">Surface &amp; Goldwork</button>
            </div>
            <button
              type="button"
              class="btn-outline"
              style="padding:9px 18px;font-size:9.5px"
              onclick="returnToProductFromMasters()"
            >
              ← Return to Product Page
            </button>
          </div>
        </div>

        <div class="glossary-list">
          ${filteredGlossaryList.map(item => {
            const isOpen = item.id === STATE.activeGlossaryId;
            return `
              <div class="glossary-row ${isOpen ? "open active-highlight" : ""}" id="glossary-row-${item.id}">
                <button type="button" class="glossary-row__trigger" onclick="toggleGlossaryRow('${item.id}')">
                  <span class="glossary-row__num" style="color:#121212;font-family:var(--font-sans);font-size:12px;letter-spacing:0.2em">${item.id}</span>
                  <span class="glossary-row__name">
                    <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#121212;margin-right:4px"></span>
                    <span>${item.name}</span>
                  </span>
                  <span class="glossary-row__summary">${item.summary}</span>
                  <span class="glossary-row__icon">+</span>
                </button>
                <div class="glossary-row__body">
                  <div class="glossary-row__story">
                    <div style="display:inline-flex;align-items:center;gap:12px;margin-bottom:18px;padding:8px 14px;background:#EFECE6;border:1px solid #121212">
                      ${renderBotanicalBlot(item.blot, 24)}
                      <div style="font-size:9.5px;letter-spacing:0.16em;text-transform:uppercase;color:#121212">
                        <span>Archive Index #${item.id} &nbsp;·&nbsp; ${item.botanicalLabel}</span>
                      </div>
                    </div>
                    ${item.paragraphs.map(p => `<p>${p}</p>`).join("")}
                    <div style="margin-top:22px;display:flex;gap:12px;flex-wrap:wrap">
                      <button
                        type="button"
                        class="btn-primary"
                        style="padding:11px 20px;font-size:10px"
                        onclick="navigateTo('pdp', '${STATE.lastPdpHandle || "tribeca-matka-silk-emerald"}')"
                      >
                        Inspect Garment Crafted With This Technique ⟶
                      </button>
                      <button
                        type="button"
                        class="btn-outline"
                        style="padding:11px 20px;font-size:10px"
                        onclick="navigateTo('collection', 'all-apparel')"
                      >
                        Browse All Collection Lots
                      </button>
                    </div>
                  </div>
                  <div style="aspect-ratio:4/3;overflow:hidden;background:var(--bg-secondary);border:1px solid var(--border-subtle)">
                    <img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover" />
                  </div>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </section>

      <!-- 5. CHAPTER IV: ARCHITECTURAL GALLERY DIPTYCH -->
      <section class="masters-diptych" id="arch-chap-4">
        <div style="text-align:center;max-width:760px;margin:0 auto">
          <span class="fibre-to-garment__eyebrow">Chapter IV · In the Hands of the Maker</span>
          <h2 class="fibre-to-garment__title">WE CHERISH THESE NUANCES FOR THEIR HUMAN TOUCH</h2>
        </div>

        <div class="masters-diptych__grid">
          <article class="diptych-card" style="background:var(--bg-primary);padding:34px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
              <span style="font-size:10.5px;letter-spacing:0.2em;text-transform:uppercase;color:var(--text-muted)">01 / Handspinning</span>
              <img src="assets/blots/dot_goldenrod.png" alt="Goldenrod Dot" style="width:38px;height:38px;mix-blend-mode:multiply" />
            </div>
            <div class="diptych-card__media">
              <img src="${SQS_CDN}3a6786b9-45ce-459e-83cb-4bee1d2e3554/184_HARTWICK_STYLE_FABRIC4R1A8940.jpg" alt="Handspinning — A Moment Held" />
            </div>
            <h3 style="font-family:var(--font-serif);font-size:23px;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px">
              A Moment Held.
            </h3>
            <p style="font-family:var(--font-serif);font-size:15.5px;color:var(--text-secondary);line-height:1.8">
              Where industrial spinning erases character in pursuit of uniformity, the hand-turned wheel honours the natural breath and subtle slub of raw cotton and silk.
            </p>
          </article>

          <article class="diptych-card" style="background:var(--bg-primary);padding:34px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
              <span style="font-size:10.5px;letter-spacing:0.2em;text-transform:uppercase;color:var(--text-muted)">02 / Handweaving</span>
              <img src="assets/blots/dot_iron_rust.png" alt="Iron Marigold Dot" style="width:38px;height:38px;mix-blend-mode:multiply" />
            </div>
            <div class="diptych-card__media">
              <img src="${SQS_CDN}8b35627c-73f1-47cc-8e79-c94a0388f034/125_HARTWICK_HANDWOVEN_TOKYO_SHIRT_IKAT.jpg" alt="Handweaving — A Process in Motion" />
            </div>
            <h3 style="font-family:var(--font-serif);font-size:23px;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px">
              A Process in Motion.
            </h3>
            <p style="font-family:var(--font-serif);font-size:15.5px;color:var(--text-secondary);line-height:1.8">
              Passed throw by throw across the pit loom, warp and weft unite without electricity—creating heirloom cloth that carries the quiet signature of its maker.
            </p>
          </article>
        </div>
      </section>

      <!-- 6. FROM THE HARTWICK ARCHIVE — AT THE PRINTING TABLE -->
      <section class="masters-intro-split" style="border-bottom:none">
        <div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
            <img src="assets/blots/dot_apricot.png" alt="Madder Dot" style="width:38px;height:38px;mix-blend-mode:multiply" />
            <span class="fibre-to-garment__eyebrow" style="margin-bottom:0">From the Hartwick Archive</span>
          </div>
          <h2 class="fibre-to-garment__title" style="margin-bottom:18px">AT THE PRINTING TABLE</h2>
          <p style="font-family:var(--font-serif);font-size:16px;color:var(--text-secondary);line-height:1.8;margin-bottom:18px">
            Each block print begins as a seasoned teakwood block carved by hand, dipped into natural plant and mineral vats, and stamped layer by layer across metres of silk and Khadi. Between each of the 16 impressions, the cloth rests for a full day in open air.
          </p>
          <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:26px">
            <button class="btn-primary" onclick="navigateTo('pdp', 'palma-fine-silk-block-print')">
              Inspect Block-Printed Silk Piece ⟶
            </button>
            <button class="btn-outline" onclick="navigateTo('journal')">
              Read The Journal ⟶
            </button>
          </div>
        </div>
        <div class="masters-intro-split__img" style="aspect-ratio:16/10">
          <img
            src="${SQS_CDN}0c0b1cbc-4c3e-43ad-b43d-1c2c4916289f/080_HARTWICK_OKANAGAN_ROBE_KALAMALKA_BLOCKPRINT.jpg"
            alt="At the Printing Table"
            style="filter:none"
          />
        </div>
      </section>
    </div>
  `;
}

function renderOurStory() {
  return `
    <div class="editorial-page view-enter">
      <header class="editorial-hero reveal-on-scroll">
        <div class="brief-section-banner">
          <span class="brief-tag">Brief §1.4 — About → Our Story (Verbatim Squarespace Copy &amp; Archival Photos)</span>
        </div>
        <span class="section-eyebrow">About Hartwick Atelier</span>
        <h1 class="editorial-hero__title">Our Story</h1>
        <p class="editorial-hero__lead">
          “Hartwick Atelier is the culmination of decades of world travel as creatives in fashion and film. At its roots, each collection is a portrait of nature and sustainability through refined handcraft. It's an analogue love story.”
        </p>
      </header>

      <div class="reveal-on-scroll" style="display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-bottom:64px">
        <img src="${SQS_CDN}1738813975247-BRZ8Q0E5KZ9K0MY6SHL2/IMG_7025.jpeg" alt="Angela Hartwick Archive" style="aspect-ratio:4/3;object-fit:cover;width:100%" />
        <img src="${SQS_CDN}1738813972432-DJ6MTSK4LYQOLCYX5APU/IMG_6991.jpeg" alt="Hartwick Atelier Travels" style="aspect-ratio:4/3;object-fit:cover;width:100%" />
      </div>

      <div class="story-timeline">
        <div class="story-chapter reveal-on-scroll">
          <div class="story-chapter__year">1990s</div>
          <div>
            <h3 style="font-family:var(--font-serif);font-size:22px;margin-bottom:10px">New York City &amp; Paris</h3>
            <p style="color:var(--text-secondary)">My work in fashion started in New York City in the 90s as an assistant — first to a well-known Costume Designer, then to fashion stylists and photographers. When I was hired as an assistant to a French movie star and moved to Paris, fashion became a language that I learned and lived through cinema, tailoring, and textile archives.</p>
          </div>
        </div>

        <div class="story-chapter reveal-on-scroll">
          <div class="story-chapter__year">2002</div>
          <div>
            <h3 style="font-family:var(--font-serif);font-size:22px;margin-bottom:10px">Morocco &amp; Analogue Photography</h3>
            <p style="color:var(--text-secondary)">In 2002, Daryl was starting his photography career and we spent a couple months in Morocco to shoot our first fashion book. Immersing ourselves in the souks, natural dye vats, and handloom guilds sparked a lifelong devotion to traditional craft.</p>
          </div>
        </div>

        <div class="story-chapter reveal-on-scroll">
          <div class="story-chapter__year">2003 – 2008</div>
          <div>
            <h3 style="font-family:var(--font-serif);font-size:22px;margin-bottom:10px">Costume Design &amp; Character Through Cloth</h3>
            <p style="color:var(--text-secondary)">In 2003, I became the lead costume designer for a French TV series. We shot 8 episodes concurrently with 8 main characters, developing narrative and emotion through the drape, weight, and history of fabric.</p>
          </div>
        </div>

        <div class="story-chapter reveal-on-scroll">
          <div class="story-chapter__year">Today</div>
          <div>
            <h3 style="font-family:var(--font-serif);font-size:22px;margin-bottom:10px">Hartwick Atelier</h3>
            <p style="color:var(--text-secondary)">Working directly with master weavers, natural colorists, woodblock carvers, and goldsmiths across India, Hartwick Atelier creates limited-edition, numbered lots that honour slow time, human hands, and heirloom quality.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderContactPage() {
  return `
    <div class="editorial-page view-enter">
      <header class="editorial-hero reveal-on-scroll">
        <div class="brief-section-banner">
          <span class="brief-tag">Brief §1.4 &amp; §2.10 — Contact Page (contact@HARTWICKATELIER.com)</span>
        </div>
        <span class="section-eyebrow">Client Services &amp; Enquiries</span>
        <h1 class="editorial-hero__title">Contact</h1>
        <p class="editorial-hero__lead">
          For private client styling, sizing assistance, or press enquiries, please reach out to our atelier directly at <a href="mailto:contact@HARTWICKATELIER.com" style="text-decoration:underline">contact@HARTWICKATELIER.com</a> or via the form below.
        </p>
      </header>

      <div class="contact-box reveal-on-scroll">
        <form onsubmit="handleContactSubmit(event)">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" class="form-control" required placeholder="Your name" />
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" class="form-control" required placeholder="your@email.com" />
          </div>
          <div class="form-group">
            <label>Subject</label>
            <input type="text" class="form-control" placeholder="Order / Sizing / Lot 0325 Pre-Order Enquiry" />
          </div>
          <div class="form-group">
            <label>Message</label>
            <textarea class="form-control" rows="5" required placeholder="How can our atelier assist you?"></textarea>
          </div>
          <button type="submit" class="btn-primary" style="width:100%">Send Message</button>
          <div id="contact-form-feedback" class="dispatch-feedback"></div>
        </form>
      </div>
    </div>
  `;
}

function renderSizeGuidePage() {
  const prod = window.HARTWICK_PRODUCTS.find(p => p.handle === (STATE.lastPdpHandle || STATE.currentProductHandle)) || window.HARTWICK_PRODUCTS[0];
  const garmentName = prod ? (prod.subtitle || prod.title) : "Garment";

  return `
    <div class="editorial-page view-enter">
      <div style="margin-bottom:28px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
        <button class="btn-outline" onclick="returnToProductFromMasters()" style="display:inline-flex;align-items:center;gap:10px;padding:11px 22px">
          <span>← Return to ${garmentName}</span>
        </button>
        <button class="btn-outline" onclick="navigateTo('collection', 'all-apparel')" style="padding:11px 20px">
          Browse Collection ⟶
        </button>
      </div>

      <header class="editorial-hero reveal-on-scroll">
        <div class="brief-section-banner">
          <span class="brief-tag">Brief §1.4 &amp; §4.4 — Size Guide (XS – XL)</span>
          ${STATE.phase2Enabled ? `<span class="brief-tag brief-tag--phase2" style="margin-left:8px">§8.6 Interactive Size Calculator</span>` : ""}
        </div>
        <span class="section-eyebrow">Garment Measurements</span>
        <h1 class="editorial-hero__title">Size Guide</h1>
        <p class="editorial-hero__lead">
          Hartwick Atelier garments are tailored for a relaxed yet structured drape. All pieces are offered in sizes XS through XL. Click any size row below to select it and return directly to your garment.
        </p>
        <div style="margin-top:20px;display:flex;justify-content:center;gap:12px;flex-wrap:wrap">
          ${STATE.phase2Enabled ? `
            <button class="btn-primary" onclick="openSizeRecommendationModal()">Launch Interactive Size Calculator</button>
          ` : ""}
          <button class="btn-outline" onclick="returnToProductFromMasters()">← Back to ${garmentName}</button>
        </div>
      </header>

      <table class="size-table reveal-on-scroll">
        <thead>
          <tr>
            <th>Hartwick Size</th>
            <th>EU</th>
            <th>UK</th>
            <th>Bust (cm)</th>
            <th>Natural Waist (cm)</th>
            <th>Hip (cm)</th>
            <th>Select &amp; Return</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>XS</strong></td><td>34</td><td>6</td><td>80 – 84</td><td>63 – 67</td><td>88 – 92</td>
            <td><button class="btn-outline" style="padding:6px 14px;font-size:9.5px" onclick="selectSizeAndReturnToPdp('XS')">Select XS →</button></td>
          </tr>
          <tr>
            <td><strong>S</strong></td><td>36</td><td>8 – 10</td><td>85 – 89</td><td>68 – 72</td><td>93 – 97</td>
            <td><button class="btn-outline" style="padding:6px 14px;font-size:9.5px" onclick="selectSizeAndReturnToPdp('S')">Select S →</button></td>
          </tr>
          <tr>
            <td><strong>M</strong></td><td>38 – 40</td><td>12</td><td>90 – 95</td><td>73 – 78</td><td>98 – 103</td>
            <td><button class="btn-outline" style="padding:6px 14px;font-size:9.5px" onclick="selectSizeAndReturnToPdp('M')">Select M →</button></td>
          </tr>
          <tr>
            <td><strong>L</strong></td><td>42</td><td>14</td><td>96 – 101</td><td>79 – 84</td><td>104 – 109</td>
            <td><button class="btn-outline" style="padding:6px 14px;font-size:9.5px" onclick="selectSizeAndReturnToPdp('L')">Select L →</button></td>
          </tr>
          <tr>
            <td><strong>XL</strong></td><td>44</td><td>16</td><td>102 – 108</td><td>85 – 91</td><td>110 – 116</td>
            <td><button class="btn-outline" style="padding:6px 14px;font-size:9.5px" onclick="selectSizeAndReturnToPdp('XL')">Select XL →</button></td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top:36px;text-align:center">
        <button class="btn-primary" onclick="returnToProductFromMasters()">
          ← Return to ${garmentName} (Size ${STATE.selectedSize})
        </button>
      </div>
    </div>
  `;
}

function renderReturnsPolicyPage() {
  const prod = window.HARTWICK_PRODUCTS.find(p => p.handle === (STATE.lastPdpHandle || STATE.currentProductHandle)) || window.HARTWICK_PRODUCTS[0];
  const garmentName = prod ? (prod.subtitle || prod.title) : "Garment";

  return `
    <div class="editorial-page view-enter">
      <div style="margin-bottom:28px">
        <button class="btn-outline" onclick="returnToProductFromMasters()" style="display:inline-flex;align-items:center;gap:10px;padding:11px 22px">
          <span>← Return to ${garmentName}</span>
        </button>
      </div>
      <header class="editorial-hero reveal-on-scroll">
        <div class="brief-section-banner">
          <span class="brief-tag">Brief §5.4 — Returns Policy Page &amp; §5.3 Shipping Zones</span>
        </div>
        <span class="section-eyebrow">Shipping, Duties &amp; Returns</span>
        <h1 class="editorial-hero__title">Returns Policy</h1>
        <p class="editorial-hero__lead">
          Every Hartwick Atelier garment is crafted by hand in limited quantities. We want you to treasure your piece for years to come.
        </p>
      </header>
      <div class="reveal-on-scroll" style="max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:24px;color:var(--text-secondary)">
        <div>
          <h3 style="font-family:var(--font-serif);color:var(--text-primary);font-size:21px;margin-bottom:8px">[§5.4] 14-Day Return Window</h3>
          <p>We accept returns on unworn, unwashed items with original lot tags attached within 14 days of delivery across the European Union, United Kingdom, and United States. To request a return authorization, please email <strong>contact@HARTWICKATELIER.com</strong> with your order number.</p>
        </div>
        <div>
          <h3 style="font-family:var(--font-serif);color:var(--text-primary);font-size:21px;margin-bottom:8px">[§5.3 &amp; §8.7] EU, UK &amp; US Shipping Rates</h3>
          <p>Orders are dispatched via insured DHL Express from our European fulfilment studio. Complimentary express shipping is offered on orders above €500 / £430 / $550. Standard insured shipping is €18 (EU), £22 (UK), and $45 (US — Phase 2 §8.7).</p>
        </div>
        <div>
          <h3 style="font-family:var(--font-serif);color:var(--text-primary);font-size:21px;margin-bottom:8px">Handcrafted Nuances</h3>
          <p>Because our textiles are spun, woven, and block-printed entirely by hand using natural plant and mineral dyes, subtle variations in weave slub and dye tone are intrinsic hallmarks of authenticity and are not considered defects.</p>
        </div>
        <div style="margin-top:16px">
          <button class="btn-primary" onclick="returnToProductFromMasters()">← Return to ${garmentName}</button>
        </div>
      </div>
    </div>
  `;
}

// ==========================================================================
// INTERACTIVE HANDLERS & SCROLL REVEAL OBSERVER
// ==========================================================================
function initScrollAnimations() {
  const elements = document.querySelectorAll(".reveal-on-scroll, .luxury-img-reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach(el => observer.observe(el));
}

function selectPdpImage(idx) {
  STATE.selectedImageIndex = idx;
  renderApp();
}

function selectPdpSize(size) {
  STATE.selectedSize = size;
  renderApp();
}

function toggleAccordion(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle("open");
}

function changeCurrency(newCurr) {
  STATE.currency = newCurr;
  renderApp();
  renderCartDrawer();
}

function changeShippingRegion(region) {
  STATE.shippingRegion = region;
  renderCartDrawer();
}

function addToCart(handle) {
  const product = window.HARTWICK_PRODUCTS.find(p => p.handle === handle);
  if (!product) return;
  const key = `${handle}__${STATE.selectedSize}`;
  const existing = STATE.cart.find(item => item.key === key);
  if (existing) {
    existing.qty += 1;
  } else {
    STATE.cart.push({
      key,
      product,
      size: STATE.selectedSize,
      qty: 1
    });
  }
  renderHeaderAndFooterNav();
  renderCartDrawer();
  openCartDrawer();
}

function removeFromCart(key) {
  STATE.cart = STATE.cart.filter(item => item.key !== key);
  renderHeaderAndFooterNav();
  renderCartDrawer();
}

function openCartDrawer() {
  document.getElementById("cart-backdrop").classList.add("open");
  document.getElementById("cart-drawer").classList.add("open");
}

function closeCartDrawer() {
  document.getElementById("cart-backdrop").classList.remove("open");
  document.getElementById("cart-drawer").classList.remove("open");
}

function renderCartDrawer() {
  const container = document.getElementById("cart-drawer-body");
  const footer = document.getElementById("cart-drawer-footer");
  if (!container || !footer) return;

  if (STATE.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;margin:auto;color:var(--text-muted)">
        <p style="font-family:var(--font-serif);font-size:20px;margin-bottom:12px;color:var(--text-primary)">Your bag is empty</p>
        <p style="font-size:13.5px;margin-bottom:24px">Explore our limited edition handwoven collections (#01–#66).</p>
        <button class="btn-outline" onclick="closeCartDrawer();navigateTo('collection','all-apparel')">Explore Apparel</button>
      </div>
    `;
    footer.innerHTML = "";
    return;
  }

  container.innerHTML = STATE.cart.map(item => `
    <div class="cart-item">
      <img class="cart-item__img" src="${item.product.images[0]}" alt="${item.product.title}" />
      <div>
        <div style="display:flex;justify-content:space-between;gap:8px">
          <h4 style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase">#${String(item.product.catalogNumber || 1).padStart(2, "0")} ${item.product.title}</h4>
          <button onclick="removeFromCart('${item.key}')" style="background:none;border:none;cursor:pointer;font-size:16px;line-height:1">×</button>
        </div>
        <p style="font-family:var(--font-serif);font-style:italic;font-size:13px;color:var(--text-secondary)">${item.product.commercial_expression}</p>
        <p style="font-size:11.5px;color:var(--text-muted);margin:4px 0">Size: ${item.size} · Qty: ${item.qty} · ${item.product.lot}</p>
        <p style="font-size:13.5px;font-weight:500">${formatPrice(item.product)}</p>
      </div>
    </div>
  `).join("");

  const subtotalEur = STATE.cart.reduce((sum, i) => sum + i.product.price_eur * i.qty, 0);
  const shippingEur = subtotalEur >= 500 ? 0 : (STATE.shippingRegion === "US" ? 45 : (STATE.shippingRegion === "UK" ? 25 : 18));
  const totalEur = subtotalEur + shippingEur;

  footer.innerHTML = `
    <div style="margin-bottom:10px;display:flex;gap:6px;flex-wrap:wrap">
      <span class="brief-tag">§5.1 Shopify Payments + Stripe</span>
      <span class="brief-tag">§5.2 EUR/GBP</span>
      <span class="brief-tag">§5.3 EU/UK Shipping</span>
      ${STATE.phase2Enabled ? `<span class="brief-tag brief-tag--phase2">§8.3 Loyalty &amp; §8.7 US/USD</span>` : ""}
    </div>
    <div style="margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;font-size:12px">
      <span style="text-transform:uppercase;letter-spacing:0.12em;color:var(--text-muted)">Shipping Zone [§5.3]:</span>
      <select onchange="changeShippingRegion(this.value)" style="padding:4px 8px;border:1px solid var(--border-strong);background:var(--bg-primary);font-size:11.5px">
        <option value="EU" ${STATE.shippingRegion === "EU" ? "selected" : ""}>European Union (DHL Express) [§5.3]</option>
        <option value="UK" ${STATE.shippingRegion === "UK" ? "selected" : ""}>United Kingdom (DHL Express) [§5.3]</option>
        ${STATE.phase2Enabled ? `<option value="US" ${STATE.shippingRegion === "US" ? "selected" : ""}>United States (DHL Express) [§8.7 P2]</option>` : ""}
      </select>
    </div>
    <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;color:var(--text-secondary)">
      <span>Subtotal</span>
      <span>${formatAmount(subtotalEur)}</span>
    </div>
    <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px;color:var(--text-secondary)">
      <span>Shipping (${STATE.shippingRegion})</span>
      <span>${shippingEur === 0 ? "Complimentary" : formatAmount(shippingEur)}</span>
    </div>
    ${STATE.phase2Enabled ? `
      <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:12px;color:#5C4628">
        <span>[§8.3] Atelier Circle Loyalty Earned</span>
        <span>+${subtotalEur * 2} Points</span>
      </div>
    ` : ""}
    <div style="display:flex;justify-content:space-between;font-size:15px;font-weight:500;padding-top:12px;border-top:1px solid var(--border-subtle);margin-bottom:18px">
      <span>Total (${STATE.currency}) [§5.2]</span>
      <span>${formatAmount(totalEur)}</span>
    </div>
    <button class="btn-primary" style="width:100%" onclick="handleCheckoutDemo()">
      Proceed to Checkout
    </button>
  `;
}

function handleCheckoutDemo() {
  alert(
    `HARTWICK ATELIER — SHOPIFY CHECKOUT (§5.1–§5.5 & §8.7)\n\n` +
    "• [§5.1] Payment Gateway: Shopify Payments + Stripe Active\n" +
    "• [§5.2 & §8.7] Multi-Currency: " + STATE.currency + " (EUR, GBP, USD)\n" +
    "• [§5.3 & §8.7] Shipping Zone: " + STATE.shippingRegion + " (EU, UK, US Configured)\n" +
    "• [§5.4] Returns Policy linked in Footer\n" +
    "• [§5.5] Transactional Email: Default Shopify confirmation with Hartwick Atelier logo."
  );
}

function handleNewsletterSubmit(e, feedbackId) {
  e.preventDefault();
  const el = document.getElementById(feedbackId);
  if (el) {
    el.innerHTML = `[§6.3] Thank you for joining <strong>The Dispatch</strong>. Please check your inbox for <em>"Confirm your subscription to The Dispatch"</em> to complete your GDPR double opt-in.`;
  }
  e.target.reset();
}

function handleContactSubmit(e) {
  e.preventDefault();
  const el = document.getElementById("contact-form-feedback");
  if (el) {
    el.innerHTML = `Thank you. Your message has been sent to <strong>contact@HARTWICKATELIER.com</strong>.`;
  }
  e.target.reset();
}

function openDispatchPopup() {
  const modal = document.getElementById("dispatch-popup-backdrop");
  if (modal) modal.classList.add("open");
}

function closeDispatchPopup() {
  const modal = document.getElementById("dispatch-popup-backdrop");
  if (modal) modal.classList.remove("open");
  localStorage.setItem("hartwick_dispatch_dismissed", Date.now().toString());
}

// ==========================================================================
// MAIN RENDERER
// ==========================================================================
function renderApp() {
  document.body.classList.toggle("view-home", STATE.currentView === "home");
  const main = document.getElementById("app-main");
  if (!main) return;

  switch (STATE.currentView) {
    case "home":
      main.innerHTML = renderHomepage();
      break;
    case "collection":
      main.innerHTML = renderCollectionPage();
      break;
    case "pdp":
      main.innerHTML = renderProductPage();
      break;
    case "the-masters":
      main.innerHTML = renderTheMasters();
      break;
    case "our-story":
      main.innerHTML = renderOurStory();
      break;
    case "contact":
      main.innerHTML = renderContactPage();
      break;
    case "size-guide":
      main.innerHTML = renderSizeGuidePage();
      break;
    case "returns-policy":
      main.innerHTML = renderReturnsPolicyPage();
      break;
    case "journal":
      main.innerHTML = renderJournalPage();
      break;
    case "wholesale":
      main.innerHTML = renderWholesalePage();
      break;
    case "wishlist":
      main.innerHTML = renderWishlistPage();
      break;
    default:
      main.innerHTML = renderHomepage();
  }

  requestAnimationFrame(() => {
    document.documentElement.scrollLeft = 0;
    document.body.scrollLeft = 0;
    initScrollAnimations();
  });
}

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  const header = document.getElementById("site-header");
  if (header) {
    if (y > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  const heroImg = document.getElementById("hero-parallax-img");
  if (heroImg && y < 900) {
    heroImg.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(1.03)`;
  }
}, { passive: true });

window.setFtgActiveCol = function(colEl) {
  if (!colEl) return;
  const track = colEl.closest(".ftg-3d-track");
  if (!track) return;
  track.querySelectorAll(".ftg-3d-col").forEach(c => {
    if (c === colEl) {
      c.classList.add("is-active-col");
    } else {
      c.classList.remove("is-active-col");
    }
  });
  track.classList.add("has-active-col");
};

window.clearFtgActiveCol = function(colEl) {
  if (!colEl) return;
  colEl.classList.remove("is-active-col");
  const track = colEl.closest(".ftg-3d-track");
  if (!track) return;
  if (!track.querySelector(".ftg-3d-col.is-active-col")) {
    track.classList.remove("has-active-col");
  }
};

window.resetAllFtgCols = function(trackEl) {
  if (!trackEl) return;
  trackEl.classList.remove("has-active-col");
  trackEl.querySelectorAll(".ftg-3d-col").forEach(c => c.classList.remove("is-active-col"));
};

function applyHashRouting() {
  const rawHash = (window.location.hash || "").replace(/^#\/?/, "").trim();
  if (!rawHash) return;
  const parts = rawHash.split("/");
  const view = parts[0];
  const param = parts[1];
  if (view === "pdp" && param) {
    STATE.currentView = "pdp";
    STATE.currentProductHandle = param;
    STATE.lastPdpHandle = param;
    STATE.selectedImageIndex = 0;
  } else if (view === "collection") {
    STATE.currentView = "collection";
    STATE.currentCollection = param || "all-apparel";
  } else if (view === "home" || view === "the-masters" || view === "our-story" || view === "contact" || view === "returns-policy") {
    STATE.currentView = view;
  }
}

window.addEventListener("hashchange", () => {
  applyHashRouting();
  renderApp();
  updateReviewToolbarActive();
});

document.addEventListener("DOMContentLoaded", () => {
  applyHashRouting();
  document.body.classList.toggle("hide-brief-tags", !STATE.showBriefBadges);
  document.body.classList.toggle("concept-a", STATE.designConcept === "A");
  document.body.classList.toggle("concept-b", STATE.designConcept === "B");
  renderHeaderAndFooterNav();
  renderApp();
  renderCartDrawer();
  updateReviewToolbarActive();
});
