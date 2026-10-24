// ==========================================================================
// HARTWICK ATELIER — COMPLETE PRODUCT DATABASE
// - Phase 1 Scope (§4): Exactly 60 Active SKUs across Apparel, Fine Silk & Fine Jewellery
// - Phase 2 Scope (§8.9 & §8.10): 6 Additional SKUs (Upaya Yoga Mats, Corsica Coat, Shaylas, Rich Ribbons)
// Total: 66 Numbered Products mapped 1:1 to Hartwick_Product_Database.xlsx
// ==========================================================================

const SQS = "https://images.squarespace-cdn.com/content/v1/662ec4008fa24077e0d8b6b0/";

const BASE_TEMPLATES = [
  // ================= SKIRTS & DRESSES =================
  {
    handle: "tribeca-checkerboard-navy",
    title: "Tribeca Checkerboard Navy",
    subtitle: "Tribeca Skirt",
    commercial_expression: "Handspun and Handwoven Fine Khadi Cotton",
    short_description: "Woven in a subtle tonal navy and raw ecru checkerboard using yarn-dyed natural indigo and iron mordant, giving the cloth a quiet architectural depth.",
    long_description: "The Tribeca Skirt is tailored with deep knife pleats at the waist that release into a generous, sweeping A-line silhouette. Designed to sit high on the natural waist with concealed side seam pockets and mother-of-pearl interior buttoning, it moves with effortless structure and fluid drape.",
    fit_label: "High-waisted tailored fit · Mid-calf length (84 cm)",
    fit_bullets: [
      "Fits true to size; structured non-stretch waistband",
      "Deep front and back box pleats for fluid volume",
      "Concealed French-seamed side pockets",
      "Fastens with natural horn button and concealed zip"
    ],
    fabric_technique: "Handspun Khadi · Yarn-Dyed Check",
    craft_glossary_key: "khadi",
    fibre: "100% Organic Handspun Khadi Cotton",
    origin: "Handwoven in West Bengal, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 680,
    price_gbp: 580,
    price_usd: 740,
    sku: "HA-SK-TRB-NVY-01",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "skirts-dresses",
    phase: 1,
    images: [
      SQS + "a25375f7-a824-4400-a81b-4c777981a2f5/005_HARTWICK_HANDWOVEN_TRIBECA_SKIRT_KHADI_TOKYO_SHIRT.jpg",
      SQS + "1761394348125-TQL5OWNVAINE40XD9OXN/007_HARTWICK_HANDWOVEN_TRIBECA_SKIRT_KHADI_TOKYO_SHIRT.jpg",
      SQS + "3280b3e1-b9e6-4eb2-a719-76d67d9ba0c4/096_HARTWICK_FINESILK_DUPATTA02_SCARF_NATURALDYE_BLOCKPRINT_TRIBECA_SKIRT_AMMAN_SHIRT_KHADI_COTTON.jpg"
    ],
    featured_product_1: "amman-navy-checkerboard",
    featured_product_2: "dupatta-02-indigo-madder"
  },
  {
    handle: "tribeca-matka-silk-emerald",
    title: "Tribeca Matka Silk Emerald",
    subtitle: "Tribeca Skirt",
    commercial_expression: "Handspun Matka Silk in Natural Dye",
    short_description: "Dyed in small vats over three days layering wild indigo and pomegranate rind to achieve a luminous, jewel-toned botanical emerald.",
    long_description: "Crafted from slubbed handspun Matka silk, this iteration of the signature Tribeca Skirt balances raw artisanal texture with couture-level tailoring. The natural irregularities of the hand-reeled silk yarn catch the light with every step.",
    fit_label: "High-waisted tailored fit · Mid-calf length",
    fit_bullets: [
      "Structured waist with hand-finished interior binding",
      "Full pleated skirt with generous hem sweep",
      "Fully lined in whisper-weight organic mulmul cotton",
      "French seams throughout"
    ],
    fabric_technique: "Handloom Matka Silk · Natural Vat Dye",
    craft_glossary_key: "natural-dye",
    fibre: "100% Handspun Mulberry Matka Silk",
    origin: "Handwoven in Bihar & Dyed in Kutch, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 890,
    price_gbp: 760,
    price_usd: 965,
    sku: "HA-SK-TRB-EMR-02",
    lot: "Lot 0325",
    status: "Pre Order",
    category: "skirts-dresses",
    phase: 1,
    images: [
      SQS + "1761394286610-IZ46RMUKJAHY9K3G8K4Z/034_HARTWICK_HANDWOVEN_TRIBECA_SKIRT_SILK_AMMAN_SHIRT_LINEN_SILK.jpg",
      SQS + "1761404958911-P476MQCY3IOVPE9P2JQ3/003_HARTWICK_HANDWOVEN_TRIBECA_SKIRT_SILK_AMMAN_SHIRT_LINEN_SILK.jpg",
      SQS + "8fae4f25-8cc3-4a83-88f9-51461deb642d/005034_HARTWICK_HANDWOVEN_TRIBECA_SKIRT_TOKYO_SHIRT_SILK.jpg"
    ],
    featured_product_1: "amman-handspun-silk-linen",
    featured_product_2: "hanoi-jamdani-ivory"
  },
  {
    handle: "palma-fresh-pink-cotton",
    title: "Palma Fresh Pink Cotton",
    subtitle: "Palma Skirt",
    commercial_expression: "Handspun and Handwoven Fine Cotton",
    short_description: "Softly tinted using madder root and alum mordant, rested in the sun to develop a delicate, chalky rose petal hue.",
    long_description: "The Palma Skirt celebrates the airy lightness of fine-count handwoven Khadi. Gathered gently at the waist with hand-smocked detailing, it cascades into a relaxed silhouette that breathes effortlessly in warm climates.",
    fit_label: "Relaxed mid-to-high waist · Ankle grazing",
    fit_bullets: [
      "Adjustable interior drawstring with tailored flat front",
      "Deep side-seam pockets",
      "Double-turned heirloom hem",
      "Unlined to preserve the featherlight handwoven feel"
    ],
    fabric_technique: "Fine Count Khadi · Madder Root Dye",
    craft_glossary_key: "khadi",
    fibre: "100% Handspun Handwoven Cotton",
    origin: "Handwoven in Madhya Pradesh, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 620,
    price_gbp: 530,
    price_usd: 675,
    sku: "HA-SK-PLM-PNK-03",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "skirts-dresses",
    phase: 1,
    images: [
      SQS + "0f9d2225-1884-49cd-83e8-e835a79aaf42/002_HARTWICK_HANDWOVEN_PALMA_SKIRT_KHADI_PRAGUE_SHIRT_NATURALDYE_COTTONFIELDS.jpg",
      SQS + "1761393856799-C31HGGNECZJKGKS125XU/001_HARTWICK_HANDWOVEN_PALMA_SKIRT_KHADI_HANOI_SHIRT_JAMDANI.jpg"
    ],
    featured_product_1: "hanoi-jamdani-ivory",
    featured_product_2: "dupatta-01-botanical-rose"
  },
  {
    handle: "palma-fine-silk-block-print",
    title: "Palma Fine Silk Block Print",
    subtitle: "Palma Skirt",
    commercial_expression: "Fine Silk Natural Dye Block Print",
    short_description: "Hand-stamped in 18 sequential steps using carved teakwood blocks with wild indigo, myrobalan, and fermented iron.",
    long_description: "An heirloom statement piece combining fluid mulberry silk with ancient resist block printing. Each metre of cloth rests for a full day between impressions, resulting in a botanical motif alive with subtle artisanal nuances.",
    fit_label: "Fluid tailored fit · Full length",
    fit_bullets: [
      "Flat contoured waistband with side zip closure",
      "Bias-bound interior seams",
      "Soft silk habotai lining",
      "Each print placement is one-of-a-kind"
    ],
    fabric_technique: "16-Step Resist Block Print · Natural Dye",
    craft_glossary_key: "block-print",
    fibre: "100% Handwoven Mulberry Silk",
    origin: "Bagru & Jaipur, Rajasthan",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 940,
    price_gbp: 805,
    price_usd: 1020,
    sku: "HA-SK-PLM-SLK-04",
    lot: "Lot 0325",
    status: "Pre Order",
    category: "skirts-dresses",
    phase: 1,
    images: [
      SQS + "eaf5c63f-ec73-47a3-b917-5d78d5a93577/001073_HARTWICK_HANDWOVEN_PALMA_SKIRT_SILK_NATURALDYE_BLOCKPRINT_AMMAN_SHIRT_LINEN.jpg",
      SQS + "455f13a4-662b-4a1b-b2b4-5e06171f40cc/029_HARTWICK_FINESILK_DUPATTA01_SCARF_PALMA_SKIRT_NATURALDYE_BLOCKPRINT.jpg"
    ],
    featured_product_1: "amman-handspun-silk-linen",
    featured_product_2: "dupatta-01-botanical-rose"
  },
  {
    handle: "samarkand-black-marble-inlay",
    title: "Samarkand Black Marble Inlay",
    subtitle: "Samarkand Dress",
    commercial_expression: "Handwoven Silk Cotton in Natural Dye Block Print",
    short_description: "Inspired by Pietra Dura marble inlay architecture, printed in deep fermented iron black and raw sandstone ecru.",
    long_description: "The Samarkand Dress is an elongated, column-like kaftan silhouette with architectural kimono sleeves and a clean split neckline. Woven from a luminous blend of wild silk and organic cotton, it transitions effortlessly from daytime travel to evening.",
    fit_label: "Relaxed architectural column fit · Ankle length",
    fit_bullets: [
      "Generous cut through the body; take your normal size",
      "Optional self-tie waist sash included",
      "Hand-rolled neckline and cuff edges",
      "Deep side vents for ease of movement"
    ],
    fabric_technique: "Hand Carved Wooden Block Print · Ayurvedic Dye",
    craft_glossary_key: "block-print",
    fibre: "55% Mulberry Silk, 45% Handspun Cotton",
    origin: "Handcrafted in Rajasthan, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 980,
    price_gbp: 840,
    price_usd: 1065,
    sku: "HA-DR-SMK-BLK-05",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "skirts-dresses",
    phase: 1,
    images: [
      SQS + "1761394438684-TA2MPGD3PKODZ9YQWDO3/002_HARTWICK_SAMARKAND_DRESS_NATURALDYE_BLACKMARBLEINLAY_BLOCKPRINT_LIMINAL_EMERALD_RUBY_AQUAMARINE_DIAMOND_DROPEARRINGS.jpg",
      SQS + "1761392514754-DYC1QWQ3N3J75IQF4AHO/019_HARTWICK_HANDWOVEN_SAMARKAND_DRESS_SILKCOTTON_VICTORIANROUGE_NATURALDYE_BLOCKPRINT.jpg.jpg"
    ],
    featured_product_1: "amman-handspun-silk-linen",
    featured_product_2: "hanoi-jamdani-ivory"
  },
  {
    handle: "samarkand-victorian-rouge",
    title: "Samarkand Victorian Rouge",
    subtitle: "Samarkand Dress",
    commercial_expression: "Handwoven Silk Cotton in Madder & Pomegranate Dye",
    short_description: "Rich earthen crimson achieved by steeping handwoven silk-cotton in aged madder root, pomegranate bark, and jaggery.",
    long_description: "A sweeping floor-skimming silhouette that showcases the depth of ancient botanical dyeing. Each panel of the Samarkand Dress is block-printed by Master Printers using centuries-old resist techniques.",
    fit_label: "Fluid column silhouette · Full length",
    fit_bullets: [
      "Relaxed shoulder drop with wide tailored cuffs",
      "Concealed side pockets",
      "French-seamed interior construction",
      "Includes detachable hand-braided waist cord"
    ],
    fabric_technique: "Natural Madder Resist Block Print",
    craft_glossary_key: "natural-dye",
    fibre: "55% Mulberry Silk, 45% Handspun Cotton",
    origin: "Handcrafted in Rajasthan, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 980,
    price_gbp: 840,
    price_usd: 1065,
    sku: "HA-DR-SMK-RGE-06",
    lot: "Lot 0324",
    status: "Sold Out",
    category: "skirts-dresses",
    phase: 1,
    images: [
      SQS + "1761392514754-DYC1QWQ3N3J75IQF4AHO/019_HARTWICK_HANDWOVEN_SAMARKAND_DRESS_SILKCOTTON_VICTORIANROUGE_NATURALDYE_BLOCKPRINT.jpg.jpg",
      SQS + "1761394438684-TA2MPGD3PKODZ9YQWDO3/002_HARTWICK_SAMARKAND_DRESS_NATURALDYE_BLACKMARBLEINLAY_BLOCKPRINT_LIMINAL_EMERALD_RUBY_AQUAMARINE_DIAMOND_DROPEARRINGS.jpg"
    ],
    featured_product_1: "rhodolite-step-ring-23k",
    featured_product_2: "venice-zari-velvet-belt"
  },
  {
    handle: "calcutta-tiny-pinstripe",
    title: "Calcutta Tiny Pinstripe",
    subtitle: "Calcutta Skirt",
    commercial_expression: "Handspun and Handwoven Pinstripe Khadi",
    short_description: "Delicate single-thread indigo warp stripes woven against unbleached handspun cotton for a crisp, coastal sensibility.",
    long_description: "The Calcutta Skirt draws inspiration from vintage utilitarian tailoring, softened by the unmistakable hand-feel of pure Khadi. Featuring a wrap-front overlap and a clean A-line profile.",
    fit_label: "Tailored wrap waist · Midi length",
    fit_bullets: [
      "Double corozo button waist fastening",
      "Deep patch pockets with reinforced bar-tacks",
      "Selvedge edge detailing along the interior hem",
      "Softens further with every wash and wear"
    ],
    fabric_technique: "Handspun Khadi · Selvedge Pinstripe",
    craft_glossary_key: "khadi",
    fibre: "100% Handspun Handwoven Cotton",
    origin: "Handwoven in Bengal, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 590,
    price_gbp: 505,
    price_usd: 640,
    sku: "HA-SK-CLC-PIN-07",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "skirts-dresses",
    phase: 1,
    images: [
      SQS + "96267720-e0fe-44bb-a4d9-b4feec8f7431/001_HARTWICK_HANDWOVEN_CALCUTTA_SKIRT_KHADI_PINSTRIPE_SITGES_TOTEBAG.jpg",
      SQS + "1761393907590-K2QGLKC4LYOT538ZG6AQ/002_HARTWICK_HANDWOVEN_CALCUTTA_SKIRT_WHITE_KHADI.jpg"
    ],
    featured_product_1: "calcutta-shirt-pinstripe",
    featured_product_2: "sitges-tote-mustard-stripe"
  },
  {
    handle: "calcutta-white-khadi-blue-border",
    title: "Calcutta White Khadi Blue Border",
    subtitle: "Calcutta Skirt",
    commercial_expression: "Handspun White Khadi with Indigo Temple Border",
    short_description: "Sun-bleached chalk white Khadi accented with a traditional woven indigo temple border along the lower hem.",
    long_description: "Pure, architectural, and quietly expressive. This edition of the Calcutta Skirt utilizes the loom's natural selvedge border to frame the ankle in deep botanical indigo.",
    fit_label: "High waist · Midi length",
    fit_bullets: [
      "True to size; sits neatly at the natural waist",
      "Lined in lightweight organic cotton voile",
      "Hand-stitched hem preserve selvedge border"
    ],
    fabric_technique: "Handloom Khadi · Selvedge Border Weave",
    craft_glossary_key: "khadi",
    fibre: "100% Handspun Cotton",
    origin: "Handwoven in West Bengal, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 610,
    price_gbp: 520,
    price_usd: 660,
    sku: "HA-SK-CLC-WHT-08",
    lot: "Lot 0325",
    status: "Pre Order",
    category: "skirts-dresses",
    phase: 1,
    images: [
      SQS + "1761393907590-K2QGLKC4LYOT538ZG6AQ/002_HARTWICK_HANDWOVEN_CALCUTTA_SKIRT_WHITE_KHADI.jpg",
      SQS + "96267720-e0fe-44bb-a4d9-b4feec8f7431/001_HARTWICK_HANDWOVEN_CALCUTTA_SKIRT_KHADI_PINSTRIPE_SITGES_TOTEBAG.jpg"
    ],
    featured_product_1: "jodhpur-ikat-celeste",
    featured_product_2: "petit-square-01-indigo"
  },

  // ================= SHIRTS & BLOUSES =================
  {
    handle: "jodhpur-ikat-celeste",
    title: "Jodhpur Ikat Celeste",
    subtitle: "Jodhpur Shirt",
    commercial_expression: "Handwoven Double Ikat in Natural Indigo",
    short_description: "Tie-dyed in the yarn prior to weaving using sky-blue fermentation indigo and natural unbleached cotton.",
    long_description: "The Jodhpur Shirt features a mandarin collar, a concealed button placket, and a relaxed boxy drape that honours the geometry of traditional Indian kurtas combined with European shirtmaking.",
    fit_label: "Relaxed tailored fit · Hip length",
    fit_bullets: [
      "Dropped shoulder with single-button mitered cuffs",
      "Mother-of-pearl buttons",
      "Side gussets reinforced with hand-bar-tacking",
      "French seams throughout"
    ],
    fabric_technique: "Handloom Ikat · Natural Indigo Vat",
    craft_glossary_key: "khadi",
    fibre: "100% Handspun Handwoven Cotton",
    origin: "Handwoven in Telangana, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 540,
    price_gbp: 460,
    price_usd: 585,
    sku: "HA-SH-JDP-CEL-09",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "shirts-blouses",
    phase: 1,
    images: [
      SQS + "f6e825bd-fb9c-4454-8067-b001875c4eed/003_HARTWICK_HANDWOVEN_BOMBAY_TROUSERS_IKAT_JODHPUR_SHIRT_FINESILK_STOLE_SCARF_NATURALDYE_BLOCKPRINT.jpg",
      SQS + "5203ef96-8b81-4619-9baf-b04dcbd78938/140_HARTWICK_HANDWOVEN_BOMBAY_TROUSERS_IKAT_JODHPUR_SHIRT_FINESILK_STOLE_SCARF_NATURALDYE_BLOCKPRINT.jpg"
    ],
    featured_product_1: "bombay-ikat-navy-celeste",
    featured_product_2: "dupatta-01-botanical-rose"
  },
  {
    handle: "amman-navy-checkerboard",
    title: "Amman Navy Checkerboard",
    subtitle: "Amman Shirt",
    commercial_expression: "Handspun and Handwoven Fine Khadi Cotton",
    short_description: "Woven in small lots with natural indigo and raw ecru yarns, creating a tactile micro-check that softens with every wear.",
    long_description: "Our signature everyday shirt. The Amman Shirt is cut with a crisp point collar, a clean front placket, and a curved shirttail hem designed to be worn either tucked into the Tribeca Skirt or loose over the Lucca Trousers.",
    fit_label: "Classic relaxed shirt fit · True to size",
    fit_bullets: [
      "Tailored shoulder yoke with back box pleat",
      "Genuine Trochus shell buttons",
      "Single-needle French seam construction"
    ],
    fabric_technique: "Handspun Khadi · Yarn-Dyed Check",
    craft_glossary_key: "khadi",
    fibre: "100% Handspun Khadi Cotton",
    origin: "Handwoven in West Bengal, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 490,
    price_gbp: 420,
    price_usd: 530,
    sku: "HA-SH-AMN-NVY-10",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "shirts-blouses",
    phase: 1,
    images: [
      SQS + "8bbfed41-6c2e-4791-916c-571fd8c3b7c9/001_HARTWICK_HANDWOVEN_LUCCA_TROUSERS_KHADI_REDBRICK_AMMAN_CHECKERBOARD.jpg",
      SQS + "1761409599035-AT7KRMYIKVC6RH0BFOY1/003_HARTWICK_HANDWOVEN_LUCCA_TROUSERS_KHADI_AMMAN_SHIRT.jpg"
    ],
    featured_product_1: "tribeca-checkerboard-navy",
    featured_product_2: "lucca-khadi-redbrick"
  },
  {
    handle: "amman-handspun-silk-linen",
    title: "Amman Handspun Silk Linen",
    subtitle: "Amman Shirt",
    commercial_expression: "Handspun Wild Silk and Organic Linen",
    short_description: "Undyed natural champagne-ecru, celebrating the raw golden lustre of wild tussar silk woven with crisp Belgian-flax linen.",
    long_description: "A luminous evening-to-day interpretation of the Amman Shirt. The marriage of handspun silk in the warp and linen in the weft creates a subtle liquid sheen with structured body.",
    fit_label: "Relaxed tailored fit",
    fit_bullets: [
      "Point collar with removable collar stays",
      "Mother-of-pearl buttons",
      "Curved hem with side gussets"
    ],
    fabric_technique: "Handloom Silk-Linen Union Cloth",
    craft_glossary_key: "khadi",
    fibre: "60% Handspun Silk, 40% Organic Linen",
    origin: "Handwoven in Bhagalpur, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 640,
    price_gbp: 545,
    price_usd: 695,
    sku: "HA-SH-AMN-SLK-11",
    lot: "Lot 0325",
    status: "Pre Order",
    category: "shirts-blouses",
    phase: 1,
    images: [
      SQS + "1761409716583-2OSTMBMFQHJMX5R5E8I1/002234_HARTWICK_HANDWOVEN_AMMAN_SHIRT_LINEN_SILK_BOMBAY_TROUSERS_KHADI_COTTON_COPPERCUFF_LIMINAL_RAJMAHAL_BANGLES_EMERALD_SILVER_GOLD_EARRINGS.jpg",
      SQS + "1761404958911-P476MQCY3IOVPE9P2JQ3/003_HARTWICK_HANDWOVEN_TRIBECA_SKIRT_SILK_AMMAN_SHIRT_LINEN_SILK.jpg"
    ],
    featured_product_1: "tribeca-matka-silk-emerald",
    featured_product_2: "bombay-ikat-navy-celeste"
  },
  {
    handle: "hanoi-jamdani-ivory",
    title: "Hanoi Jamdani Ivory",
    subtitle: "Hanoi Shirt",
    commercial_expression: "Handwoven Heritage Jamdani on Fine Muslin",
    short_description: "Unbleached ivory muslin inlaid by hand on the loom with geometric discontinuous weft motifs—a UNESCO-recognised heritage craft.",
    long_description: "Each Hanoi Shirt requires weeks at the handloom, where master weavers insert extra threads by hand using fine bamboo needles between every throw of the shuttle, making the geometric motifs appear to float in air.",
    fit_label: "Airy relaxed silhouette · True to size",
    fit_bullets: [
      "Band collar with delicate pintuck bib",
      "Hand-woven Jamdani motifs throughout body and sleeves",
      "Shell buttons with hand-whipped buttonholes"
    ],
    fabric_technique: "Supplementary Weft Jamdani Handloom",
    craft_glossary_key: "khadi",
    fibre: "100% Fine Count Handspun Khadi Muslin",
    origin: "Kalna, West Bengal",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 720,
    price_gbp: 615,
    price_usd: 780,
    sku: "HA-SH-HNI-JMD-12",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "shirts-blouses",
    phase: 1,
    images: [
      SQS + "0f9d2225-1884-49cd-83e8-e835a79aaf42/002_HARTWICK_HANDWOVEN_PALMA_SKIRT_KHADI_PRAGUE_SHIRT_NATURALDYE_COTTONFIELDS.jpg",
      SQS + "1761393856799-C31HGGNECZJKGKS125XU/001_HARTWICK_HANDWOVEN_PALMA_SKIRT_KHADI_HANOI_SHIRT_JAMDANI.jpg",
      SQS + "1761405015827-L4A74TN67BDSECM3WS5E/121_HARTWICK_HANDWOVEN_PARIS_TROUSERS_KHADI_HANOI_SHIRT_JAMDANI.jpg"
    ],
    featured_product_1: "paris-alabaster-twill",
    featured_product_2: "palma-fresh-pink-cotton"
  },
  {
    handle: "tokyo-silk-zari-ivory",
    title: "Tokyo Silk Zari Ivory",
    subtitle: "Tokyo Shirt",
    commercial_expression: "Handwoven Mulberry Silk with Zari Selvedge",
    short_description: "Warm raw ivory silk accented with subtle metallic gold Zari threads woven directly into the cuff and placket selvedge.",
    long_description: "Minimalist Japanese-inspired volume meets Indian courtly weaving. The Tokyo Shirt has a sculptural boxy cut, wide cropped sleeves, and an understated architectural collar.",
    fit_label: "Boxy architectural fit · Slightly cropped",
    fit_bullets: [
      "Designed for an oversized drape",
      "Zari metallic gold thread detailing at hem",
      "Concealed button front"
    ],
    fabric_technique: "Handloom Silk with Zari Brocade Edge",
    craft_glossary_key: "zari",
    fibre: "96% Mulberry Silk, 4% Metallic Zari",
    origin: "Varanasi, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 690,
    price_gbp: 590,
    price_usd: 750,
    sku: "HA-SH-TKY-ZRI-13",
    lot: "Lot 0325",
    status: "Pre Order",
    category: "shirts-blouses",
    phase: 1,
    images: [
      SQS + "1761404313273-SG048BKKH9HW247ZBU3M/009_HARTWICK_HANDWOVEN_TOKYO_SHIRT_SILK_ZARI.jpg",
      SQS + "8b35627c-73f1-47cc-8e79-c94a0388f034/125_HARTWICK_HANDWOVEN_TOKYO_SHIRT_IKAT.jpg"
    ],
    featured_product_1: "tribeca-checkerboard-navy",
    featured_product_2: "pink-tourmaline-step-ring"
  },
  {
    handle: "prague-victorian-rouge-silk",
    title: "Prague Victorian Rouge Silk",
    subtitle: "Prague Shirt",
    commercial_expression: "Fine Mulberry Silk in Natural Dye Block Print",
    short_description: "Deep botanical crimson and indigo block-printed by hand over 16 consecutive days of dyeing, washing, and sun-drying.",
    long_description: "Fluid and romantic without losing tailoring precision. The Prague Shirt drapes effortlessly across the collarbone with a relaxed open neck and gathered bishop sleeves.",
    fit_label: "Fluid relaxed fit · True to size",
    fit_bullets: [
      "Soft stand collar with V-placket",
      "Gathered cuffs with double shell buttons",
      "100% biodegradable natural dyes"
    ],
    fabric_technique: "16-Step Natural Dye Hand Block Print",
    craft_glossary_key: "block-print",
    fibre: "100% Handwoven Mulberry Silk",
    origin: "Jaipur, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 660,
    price_gbp: 565,
    price_usd: 715,
    sku: "HA-SH-PRG-RGE-14",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "shirts-blouses",
    phase: 1,
    images: [
      SQS + "e109ae1d-1c52-4f65-803a-eadc9e23567d/043004_HARTWICK_HANDWOVEN_VICTORIANROUGE_PRAGUE_FINE_SILK4R1A4143.jpg",
      SQS + "4fea2e65-8e06-424b-9c65-0e3ee4623a45/002_HARTWICK_HANDWOVEN_HARTWICK_PRAGUE_SHIRT_SEOUL_TROUSERS_NATURALDYE_BLOCKPRINT.jpg"
    ],
    featured_product_1: "paris-alabaster-twill",
    featured_product_2: "liminal-emerald-ruby-earrings"
  },
  {
    handle: "calcutta-shirt-pinstripe",
    title: "Calcutta Pinstripe Khadi",
    subtitle: "Calcutta Shirt",
    commercial_expression: "Handspun and Handwoven Pinstripe Khadi",
    short_description: "Fine indigo hairline stripes on airy hand-spun cotton, spun entirely without electricity on the traditional charkha.",
    long_description: "Tailored with a relaxed menswear sensibility, the Calcutta Shirt pairs crisp collar construction with the featherlight breathability of artisanal Khadi.",
    fit_label: "Relaxed menswear fit · True to size",
    fit_bullets: [
      "Chest patch pocket",
      "Curved gusseted hem",
      "Natural mother-of-pearl buttons"
    ],
    fabric_technique: "Handspun Charkha Khadi",
    craft_glossary_key: "khadi",
    fibre: "100% Handspun Cotton",
    origin: "West Bengal, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 480,
    price_gbp: 410,
    price_usd: 520,
    sku: "HA-SH-CLC-PIN-15",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "shirts-blouses",
    phase: 1,
    images: [
      SQS + "f217863a-ce7a-4449-9589-26cf097b6196/114_HARTWICK_HANDWOVEN_CALCUTTA_SHIRT_KHADI_PINSTRIPE_LIMINAL+PEACOCK_EARRINGS.jpg",
      SQS + "96267720-e0fe-44bb-a4d9-b4feec8f7431/001_HARTWICK_HANDWOVEN_CALCUTTA_SKIRT_KHADI_PINSTRIPE_SITGES_TOTEBAG.jpg"
    ],
    featured_product_1: "calcutta-tiny-pinstripe",
    featured_product_2: "liminal-polki-citrine-earrings"
  },

  // ================= TROUSERS =================
  {
    handle: "paris-alabaster-twill",
    title: "Paris Alabaster Twill",
    subtitle: "Paris Trousers",
    commercial_expression: "Handspun Heavyweight Khadi Cotton Twill",
    short_description: "Warm unbleached alabaster cream, preserving the natural fleck and soft chalky warmth of raw organic cotton bolls.",
    long_description: "The Paris Trousers are tailored with a high waist, double front pleats, and a wide, puddle-skimming leg. Woven in a substantial diagonal twill weave on handlooms, the cloth holds a sharp architectural crease while remaining remarkably supple.",
    fit_label: "High-waisted wide leg · Full length",
    fit_bullets: [
      "Tailored waistband with belt loops and hook-and-bar closure",
      "Double front pleats and pressed leg crease",
      "Slanted side pockets and single welt back pocket",
      "Generous 5cm blind hem allowance for custom tailoring"
    ],
    fabric_technique: "Handloom Heavyweight Diagonal Twill",
    craft_glossary_key: "khadi",
    fibre: "100% Handspun Organic Khadi Cotton",
    origin: "Handwoven in Gujarat, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 650,
    price_gbp: 555,
    price_usd: 705,
    sku: "HA-TR-PRS-ALB-16",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "trousers",
    phase: 1,
    images: [
      SQS + "b85a853f-08b9-4a12-b743-97baf0dfd6f6/001_HARTWICK_HANDWOVEN_PARIS_TROUSERS_KHADI_TWILL_AMMAN_SHIRT+copy.jpg",
      SQS + "ce51aa8f-75aa-4841-b7f9-6bcea2f6f270/003_HARTWICK_HANDWOVEN_PARIS_TROUSERS_SANTAFE_SHIRT_COTTONSILK_NATURALDYE_INLAY_BLOCKPRINT_PARIS_TROUSERS_KHADI.jpg"
    ],
    featured_product_1: "hanoi-jamdani-ivory",
    featured_product_2: "marylebone-ikat-celeste-coat"
  },
  {
    handle: "paris-dusty-rose",
    title: "Paris Dusty Rose",
    subtitle: "Paris Trousers",
    commercial_expression: "Handspun Khadi Twill in Ayurvedic Madder Dye",
    short_description: "Dyed in small batches with Himalayan rhubarb, madder root, and pomegranate rind for an earthy, sun-washed rose.",
    long_description: "Our signature wide-leg trouser reimagined in a subtle botanical rose tone. The substantial handwoven twill drapes cleanly from hip to floor.",
    fit_label: "High-waisted wide leg · Full length",
    fit_bullets: [
      "Fits true to size at natural waist",
      "Double front pleats",
      "Corozo nut interior buttoning"
    ],
    fabric_technique: "Handloom Khadi Twill · Ayurvedic Dye",
    craft_glossary_key: "natural-dye",
    fibre: "100% Handspun Cotton",
    origin: "Gujarat, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 670,
    price_gbp: 570,
    price_usd: 725,
    sku: "HA-TR-PRS-RSE-17",
    lot: "Lot 0325",
    status: "Pre Order",
    category: "trousers",
    phase: 1,
    images: [
      SQS + "1739199335413-QRZHHNU71ECOKIN2BGI5/042HARTWICK_HANDWOVEN_KHADI_PARIS_TROUSERS_PINK4R1A2705.jpg",
      SQS + "b85a853f-08b9-4a12-b743-97baf0dfd6f6/001_HARTWICK_HANDWOVEN_PARIS_TROUSERS_KHADI_TWILL_AMMAN_SHIRT+copy.jpg"
    ],
    featured_product_1: "amman-handspun-silk-linen",
    featured_product_2: "pink-tourmaline-step-ring"
  },
  {
    handle: "bombay-ikat-navy-celeste",
    title: "Bombay Ikat Navy Celeste",
    subtitle: "Bombay Trousers",
    commercial_expression: "Handwoven Single & Double Ikat in Natural Indigo",
    short_description: "Master Ikat weavers bind and dye individual yarn bundles in multiple shades of natural indigo before mounting them onto the loom.",
    long_description: "The Bombay Trousers combine a clean, flat-front tailored waist with a relaxed straight-to-wide leg that highlights the rhythmic feathered edge of authentic handwoven Ikat.",
    fit_label: "Mid-to-high rise · Relaxed straight leg",
    fit_bullets: [
      "Flat front waistband with elasticised back panel for comfort",
      "Side seam pockets",
      "French-seamed throughout"
    ],
    fabric_technique: "Hand-Tied Yarn-Dyed Ikat",
    craft_glossary_key: "khadi",
    fibre: "100% Handwoven Cotton",
    origin: "Pochampally, Telangana",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 640,
    price_gbp: 545,
    price_usd: 695,
    sku: "HA-TR-BMB-IKT-18",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "trousers",
    phase: 1,
    images: [
      SQS + "1739199703356-T2RMOG7G7LQRZAEQ91L2/003001_HARTWICK_HANDWOVEN_BOMBAY_TROUSERS_IKAT_AMMAN_SHIRT_LINEN_SILK_HARTWICK_ATELIER_4R1A0390.jpg",
      SQS + "5203ef96-8b81-4619-9baf-b04dcbd78938/140_HARTWICK_HANDWOVEN_BOMBAY_TROUSERS_IKAT_JODHPUR_SHIRT_FINESILK_STOLE_SCARF_NATURALDYE_BLOCKPRINT.jpg"
    ],
    featured_product_1: "jodhpur-ikat-celeste",
    featured_product_2: "marylebone-ikat-celeste-coat"
  },
  {
    handle: "lucca-khadi-redbrick",
    title: "Lucca Khadi Redbrick",
    subtitle: "Lucca Trousers",
    commercial_expression: "Handspun Khadi in Natural Terracotta Madder",
    short_description: "Warm Mediterranean terracotta red achieved through multiple immersions in madder root and myrobalan.",
    long_description: "Cut with a slightly tapered architectural barrel leg, the Lucca Trousers offer an effortlessly modern silhouette crafted in breathable mid-weight Khadi cotton.",
    fit_label: "Relaxed barrel leg · Ankle length",
    fit_bullets: [
      "Mid-rise tailored waist",
      "Deep patch pockets at front and back",
      "Horn button fly"
    ],
    fabric_technique: "Handspun Khadi · Natural Madder Dye",
    craft_glossary_key: "natural-dye",
    fibre: "100% Handspun Khadi Cotton",
    origin: "Kutch, Gujarat",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 590,
    price_gbp: 505,
    price_usd: 640,
    sku: "HA-TR-LCC-RDB-19",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "trousers",
    phase: 1,
    images: [
      SQS + "8bbfed41-6c2e-4791-916c-571fd8c3b7c9/001_HARTWICK_HANDWOVEN_LUCCA_TROUSERS_KHADI_REDBRICK_AMMAN_CHECKERBOARD.jpg",
      SQS + "1761409599035-AT7KRMYIKVC6RH0BFOY1/003_HARTWICK_HANDWOVEN_LUCCA_TROUSERS_KHADI_AMMAN_SHIRT.jpg"
    ],
    featured_product_1: "amman-navy-checkerboard",
    featured_product_2: "sitges-tote-mustard-stripe"
  },
  {
    handle: "lucca-khadi-white",
    title: "Lucca Khadi White",
    subtitle: "Lucca Trousers",
    commercial_expression: "Handspun and Handwoven Unbleached Khadi",
    short_description: "Pure chalky off-white cotton, sun-dried on riverbanks to retain its natural softness.",
    long_description: "A summer staple with timeless structure. The Lucca Khadi White trouser pairs a relaxed sculptural leg with the unmatched breathability of hand-spun cotton.",
    fit_label: "Relaxed tapered leg · Ankle length",
    fit_bullets: [
      "True to size",
      "Fully lined to the knee in fine cotton mulmul",
      "Corozo button closure"
    ],
    fabric_technique: "Handspun Handloom Khadi",
    craft_glossary_key: "khadi",
    fibre: "100% Handspun Cotton",
    origin: "West Bengal, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 580,
    price_gbp: 495,
    price_usd: 630,
    sku: "HA-TR-LCC-WHT-20",
    lot: "Lot 0324",
    status: "Sold Out",
    category: "trousers",
    phase: 1,
    images: [
      SQS + "1739199770905-8TDL50YUQ4N2NW9G9FPP/001_HARTWICK_HANDWOVEN_LUCCA_TROUSERS_KHADI_WHITE.jpg",
      SQS + "1761409599035-AT7KRMYIKVC6RH0BFOY1/003_HARTWICK_HANDWOVEN_LUCCA_TROUSERS_KHADI_AMMAN_SHIRT.jpg"
    ],
    featured_product_1: "amman-navy-checkerboard",
    featured_product_2: "calcutta-shirt-pinstripe"
  },

  // ================= COATS & ACCESSORIES =================
  {
    handle: "marylebone-ikat-celeste-coat",
    title: "Marylebone Coat Ikat Celeste",
    subtitle: "Marylebone Coat",
    commercial_expression: "Quilted Handloom Ikat in Natural Indigo",
    short_description: "Hand-tied indigo Ikat outer shell, quilted by hand over surgical-grade organic cotton batting and reversible to fine Khadi.",
    long_description: "The Marylebone Coat is an heirloom outerwear piece. Featuring a clean collarless neckline, generous kimono-cut sleeves that layer effortlessly over knitwear, and deep welt pockets, it embodies quiet artisanal luxury.",
    fit_label: "Relaxed cocoon overcoat · Below-knee length",
    fit_bullets: [
      "Generous layering fit; take your usual size",
      "Hand-quilted running stitch throughout",
      "Fully reversible with bound edges",
      "Includes matching quilted self-belt"
    ],
    fabric_technique: "Handloom Ikat · Hand Quilted Kantha Stitch",
    craft_glossary_key: "khadi",
    fibre: "100% Handwoven Cotton Shell & Organic Cotton Batting",
    origin: "Telangana & Rajasthan, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 1280,
    price_gbp: 1095,
    price_usd: 1390,
    sku: "HA-CT-MRY-CEL-21",
    lot: "Lot 0325",
    status: "Pre Order",
    category: "coats-accessories",
    phase: 1,
    images: [
      SQS + "b1d05e6b-5963-48ff-b979-b69939b7698d/002HARTWICK_HANDWOVEN_IKAT_MARYLEBONE_COAT_LONDON-2.jpg",
      SQS + "8d28d4d4-4b30-44c7-999b-636e1a552025/002+_HARTWICK_HANDWOVEN_MARYLEBONE_COAT_IKAT_BOMBAY_TROUSERS_SITGES_TOTEBAG.jpg",
      SQS + "c410db1d-fecb-4308-8259-f8cdeef0646c/013+_HARTWICK_HANDWOVEN_MARYLEBONE_COAT_IKAT_BOMBAY_TROUSERS_SITGES_TOTEBAG.jpg"
    ],
    featured_product_1: "bombay-ikat-navy-celeste",
    featured_product_2: "sitges-tote-mustard-stripe"
  },
  {
    handle: "marylebone-ikat-neige-coat",
    title: "Marylebone Coat Ikat Neige",
    subtitle: "Marylebone Coat",
    commercial_expression: "Quilted Handloom Ikat in Neige & Charcoal",
    short_description: "Snow-white handspun cotton woven with feathered iron-black Ikat geometry.",
    long_description: "Tailored in small quantities, the Marylebone Coat in Ikat Neige pairs graphic textile artistry with enveloping warmth.",
    fit_label: "Relaxed cocoon overcoat · Below-knee length",
    fit_bullets: [
      "Hand-quilted with organic cotton batting",
      "Deep side pockets",
      "Detachable waist sash"
    ],
    fabric_technique: "Handloom Ikat · Hand Quilted",
    craft_glossary_key: "khadi",
    fibre: "100% Handwoven Cotton",
    origin: "Telangana, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 1280,
    price_gbp: 1095,
    price_usd: 1390,
    sku: "HA-CT-MRY-NGE-22",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "coats-accessories",
    phase: 1,
    images: [
      SQS + "b394cf7a-a4d7-4612-be6c-49631370362f/233_HARTWICK_HANDWOVEN_MARYLEBONE_COAT_IKAT_BOMBAY_TROUSERS_SITGES_TOTEBAG.jpg",
      SQS + "b1d05e6b-5963-48ff-b979-b69939b7698d/002HARTWICK_HANDWOVEN_IKAT_MARYLEBONE_COAT_LONDON-2.jpg"
    ],
    featured_product_1: "paris-alabaster-twill",
    featured_product_2: "venice-zari-velvet-belt"
  },
  {
    handle: "venice-zari-velvet-belt",
    title: "Venice Belt Gold Gota Patti",
    subtitle: "Venice Belt",
    commercial_expression: "Hand Embroidered Zari and Silk Velvet",
    short_description: "Plush noir silk velvet richly embroidered by master craftsmen using traditional Gota Patti gold ribbon applique.",
    long_description: "Designed to cinch the Samarkand Dress, Okanagan Robe, or Marylebone Coat, the Venice Belt is a jewel-like textile accessory handcrafted in royal ateliers of Rajasthan.",
    fit_label: "Adjustable tie closure · One Size / S-L",
    fit_bullets: [
      "Width: 6.5 cm",
      "Backed in handwoven raw silk",
      "Braided silk tassel ties"
    ],
    fabric_technique: "Gota Patti Hand Embroidery · Zari Work",
    craft_glossary_key: "zari",
    fibre: "Silk Velvet & Metallic Zari Thread",
    origin: "Jaipur, Rajasthan",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 340,
    price_gbp: 290,
    price_usd: 370,
    sku: "HA-AC-VNC-BLT-23",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "coats-accessories",
    phase: 1,
    images: [
      SQS + "a5e7be67-eacc-4e15-88af-5074b40dcb52/002001_HARTWICK_HANDEMBROIDERY_VENICE_BELT_GOTAPATTI.jpg",
      SQS + "1761394438684-TA2MPGD3PKODZ9YQWDO3/002_HARTWICK_SAMARKAND_DRESS_NATURALDYE_BLACKMARBLEINLAY_BLOCKPRINT_LIMINAL_EMERALD_RUBY_AQUAMARINE_DIAMOND_DROPEARRINGS.jpg"
    ],
    featured_product_1: "samarkand-black-marble-inlay",
    featured_product_2: "emerald-step-ring-23k"
  },
  {
    handle: "sitges-tote-mustard-stripe",
    title: "Sitges Tote Mustard Stripe",
    subtitle: "Sitges Tote Bag",
    commercial_expression: "Quilted Hand Block Print in Turmeric & Pomegranate",
    short_description: "Dyed with sun-cured turmeric root and pomegranate rind, block-printed by hand and channel-quilted for everyday durability.",
    long_description: "Generously proportioned for travel, market mornings, or coastal retreats. The Sitges Tote features wide padded shoulder straps and an interior slip pocket.",
    fit_label: "Generous oversized tote · 48 × 40 × 16 cm",
    fit_bullets: [
      "Reinforced quilted shoulder straps",
      "Interior pocket for keys and phone",
      "100% machine-washable gentle cycle"
    ],
    fabric_technique: "Hand Block Print · Quilted Khadi",
    craft_glossary_key: "block-print",
    fibre: "100% Handwoven Organic Cotton",
    origin: "Jaipur, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 240,
    price_gbp: 205,
    price_usd: 260,
    sku: "HA-AC-STG-MST-24",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "coats-accessories",
    phase: 1,
    images: [
      SQS + "ca789a93-c14c-44fc-ad76-5539b49d39a5/001002_HARTWICK_BLOCKPRINT_STIGES_TOTE.jpg",
      SQS + "e7a4f7ed-1a9e-43c5-8457-a73bb7bd546d/104_HARTWICK_UPAYA_HANDWOVEN_KHADI_COTTON_ROSE_YOGA_MAT_TURMERIC_AYUREVEDIC_SITGES_TOTEBAG.jpeg"
    ],
    featured_product_1: "calcutta-tiny-pinstripe",
    featured_product_2: "camden-pouch-english-garden"
  },
  {
    handle: "camden-pouch-english-garden",
    title: "Camden Pouch English Garden",
    subtitle: "Camden Pouch",
    commercial_expression: "Quilted Cotton in Natural Dye Floral Block Print",
    short_description: "Botanical motifs stamped by hand with madder, indigo, and iron over unbleached handloom cotton.",
    long_description: "A softly padded zip pouch crafted to hold travel essentials, jewellery, or cosmetics, lined in water-resistant natural cotton canvas.",
    fit_label: "26 × 18 × 8 cm",
    fit_bullets: [
      "Solid antique brass YKK zipper with hand-braided tassel",
      "Quilted organic cotton padding",
      "Interior slip compartments"
    ],
    fabric_technique: "Natural Dye Hand Block Print",
    craft_glossary_key: "block-print",
    fibre: "100% Handwoven Cotton",
    origin: "Jaipur, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 120,
    price_gbp: 105,
    price_usd: 130,
    sku: "HA-AC-CMD-ENG-25",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "coats-accessories",
    phase: 1,
    images: [
      SQS + "a79dc003-b557-42e4-93d2-bcdcd82a9cd6/003002_HARTWICK_BLOCKPRINT_CAMDEN_MAUI_POUCH.jpg",
      SQS + "e581669f-82be-4da9-bc8d-8dfea22b8b89/HARTWICK_BLOCKPRINT_CAMDEN_POUCH_IMG_1935.jpeg"
    ],
    featured_product_1: "sitges-tote-mustard-stripe",
    featured_product_2: "okanagan-robe-kalamalka"
  },

  // ================= LOUNGE =================
  {
    handle: "okanagan-robe-kalamalka",
    title: "Okanagan Robe Kalamalka",
    subtitle: "Okanagan Robe",
    commercial_expression: "Hand Block Printed Organic Cotton in Natural Indigo",
    short_description: "Named after the mineral-rich waters of Kalamalka Lake, printed in layered shades of wild indigo and river clay.",
    long_description: "An ankle-sweeping robe cut from featherlight hand-block-printed mulmul cotton. Designed with a shawl collar, wide kimono sleeves, and patch pockets.",
    fit_label: "Relaxed wrap silhouette · Ankle length",
    fit_bullets: [
      "Detachable waist tie with belt loops",
      "Generous patch pockets",
      "French seams throughout"
    ],
    fabric_technique: "Dabu Mud-Resist Block Print · Wild Indigo",
    craft_glossary_key: "block-print",
    fibre: "100% Organic Handloom Cotton",
    origin: "Rajasthan, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 460,
    price_gbp: 395,
    price_usd: 500,
    sku: "HA-LG-OKN-KLM-26",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "lounge",
    phase: 1,
    images: [
      SQS + "c7b9ff35-03dc-44d4-95fd-c9d117f38410/002_HARTWICK_OKANAGAN_ROBE_KALAMALKA_BLOCKPRINT.jpg",
      SQS + "5b479d67-6d00-4b54-b511-ab09ae84c249/001_HARTWICK_OKANAGAN_ROBE_KALAMALKA_BLOCKPRINT.jpg",
      SQS + "0c0b1cbc-4c3e-43ad-b43d-1c2c4916289f/080_HARTWICK_OKANAGAN_ROBE_KALAMALKA_BLOCKPRINT.jpg"
    ],
    featured_product_1: "cyprus-pyjamas-berry-blossom",
    featured_product_2: "camden-pouch-english-garden"
  },
  {
    handle: "okanagan-robe-summervine",
    title: "Okanagan Robe Summervine",
    subtitle: "Okanagan Robe",
    commercial_expression: "Block Printed by Hand on Organic Cotton",
    short_description: "Delicate trailing botanical vines printed with madder root, pomegranate rind, and indigo over warm ecru cotton.",
    long_description: "Weightless and breathable, the Okanagan Robe in Summervine wraps the body in hand-printed botanical artistry.",
    fit_label: "Relaxed full-length robe",
    fit_bullets: [
      "Shawl collar with quilted stitching",
      "Deep front pockets",
      "Matching waist sash"
    ],
    fabric_technique: "Hand Carved Wooden Block Print",
    craft_glossary_key: "block-print",
    fibre: "100% Organic Cotton",
    origin: "Bagru, Rajasthan",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 460,
    price_gbp: 395,
    price_usd: 500,
    sku: "HA-LG-OKN-SMV-27",
    lot: "Lot 0325",
    status: "Pre Order",
    category: "lounge",
    phase: 1,
    images: [
      SQS + "6167db49-e94f-418c-aa24-f82c77ba0a71/001_HARTWICK_OKANAGAN_ROBE_SUMMERVINE_BLOCKPRINT.jpg",
      SQS + "8328306a-c44d-438f-a29c-94631bb256d4/003_HARTWICK_OKANAGAN_ROBE_SUMMERVINE_BLOCKPRINT.jpg"
    ],
    featured_product_1: "cyprus-pyjamas-berry-blossom",
    featured_product_2: "magnolia-cedar-linen-khadi-set"
  },
  {
    handle: "cyprus-pyjamas-berry-blossom",
    title: "Cyprus Pyjamas Berry Blossom",
    subtitle: "Cyprus Pyjama Set",
    commercial_expression: "Berry Blossom Block Print in Natural Dye",
    short_description: "Hand-stamped floral sprigs in madder berry and botanical leaf green on cloud-soft organic cotton.",
    long_description: "Our signature two-piece loungewear set, featuring a notched-collar button-down shirt with contrast piping and relaxed drawstring trousers.",
    fit_label: "Relaxed loungewear fit · Two-piece set",
    fit_bullets: [
      "Piped collar, placket, cuffs, and trouser hems",
      "Mother-of-pearl buttons",
      "Elasticated waist with flat silk-cotton drawstring"
    ],
    fabric_technique: "Natural Dye Hand Block Print",
    craft_glossary_key: "block-print",
    fibre: "100% Organic Mulmul Cotton",
    origin: "Jaipur, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 520,
    price_gbp: 445,
    price_usd: 565,
    sku: "HA-LG-CYP-BRY-28",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "lounge",
    phase: 1,
    images: [
      SQS + "1761470411021-DRHVKDOLCD9WEV0IEP20/001_HARTWICK_CYPRUS_PYJAMAS_NATURALDYE_BLOCKPRINT.jpg",
      SQS + "6167db49-e94f-418c-aa24-f82c77ba0a71/001_HARTWICK_OKANAGAN_ROBE_SUMMERVINE_BLOCKPRINT.jpg"
    ],
    featured_product_1: "okanagan-robe-kalamalka",
    featured_product_2: "camden-pouch-english-garden"
  },
  {
    handle: "magnolia-cedar-linen-khadi-set",
    title: "Magnolia & Cedar Linen Khadi",
    subtitle: "Magnolia Lounge Shirt",
    commercial_expression: "Handspun Linen and Fine Khadi Cotton",
    short_description: "Undyed raw flax and ivory cotton woven together for a cool, tactile drape that regulates temperature naturally.",
    long_description: "Designed for slow mornings and coastal living, the Magnolia Lounge Shirt pairs an effortless open collar with rolled tab sleeves.",
    fit_label: "Relaxed resort fit",
    fit_bullets: [
      "Breathable handloom linen-cotton blend",
      "Shell buttons",
      "Curved hem"
    ],
    fabric_technique: "Handloom Linen-Khadi Weave",
    craft_glossary_key: "khadi",
    fibre: "50% Organic Linen, 50% Handspun Khadi Cotton",
    origin: "West Bengal, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 490,
    price_gbp: 420,
    price_usd: 530,
    sku: "HA-LG-MGN-LIN-29",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "lounge",
    phase: 1,
    images: [
      SQS + "e89033d4-99f8-4324-a67d-483e28427b3b/002_HARTWICK_HANDWOVEN_MAGNOLIA_SHIRT_CEDAR_TROUSERS_LINEN_KHADI.jpg",
      SQS + "8a33e119-883a-4c79-9808-8e359c284fad/039HARTWICK_HANDWOVEN_PINE_SHIRT_4R1A2847.jpg"
    ],
    featured_product_1: "okanagan-robe-summervine",
    featured_product_2: "sitges-tote-mustard-stripe"
  },
  {
    handle: "marrakesh-kaftan-emerald",
    title: "Marrakesh Kaftan Emerald Block Print",
    subtitle: "Marrakesh Kaftan",
    commercial_expression: "Block Printed by Hand on Organic Cotton",
    short_description: "Verdant botanical emerald layered over indigo and turmeric mordants, inspired by Moroccan riad gardens.",
    long_description: "A sweeping resort and loungewear kaftan with side slits, a notched V-neckline, and hand-printed geometric borders.",
    fit_label: "Fluid full-length kaftan",
    fit_bullets: [
      "Generous one-size-fits-most grading across XS–XL",
      "Concealed side seam pockets",
      "Hand-rolled edges"
    ],
    fabric_technique: "Multi-Block Natural Dye Print",
    craft_glossary_key: "natural-dye",
    fibre: "100% Organic Handwoven Cotton",
    origin: "Rajasthan, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 560,
    price_gbp: 480,
    price_usd: 610,
    sku: "HA-LG-MRK-EMR-30",
    lot: "Lot 0324",
    status: "Sold Out",
    category: "lounge",
    phase: 1,
    images: [
      SQS + "a44abff5-797b-4d55-9b5a-455238e8c760/038_HARTWICK_MARRAKESH_KAFTAN_EMERALD_BLOCKPRINTIMG_6451+%281%29.jpg",
      SQS + "1761420287801-8KATRRHNDPP06FID858P/038HARTWICK_HANDWOVEN_PINE_SHIRT_4R1A4727.jpg"
    ],
    featured_product_1: "emerald-step-ring-23k",
    featured_product_2: "dupatta-01-botanical-rose"
  },

  // ================= FINE SILK =================
  {
    handle: "dupatta-01-botanical-rose",
    title: "Dupatta 01 Botanical Madder",
    subtitle: "Fine Silk Dupatta",
    commercial_expression: "Block Printed by Hand in Natural Dye on Mulberry Silk",
    short_description: "Printed in 16 sequential steps using wild indigo, madder root, pomegranate rind, and iron, resting for a full day between each step.",
    long_description: "Generously proportioned at 240 × 105 cm, Dupatta 01 is woven from gossamer-light mulberry silk and block-printed on both faces by Master Printers in Rajasthan.",
    fit_label: "Oversized ceremonial stole · 240 × 105 cm",
    fit_bullets: [
      "Hand-rolled and hand-stitched edges",
      "Woven selvedge borders",
      "Presented in a handloom cotton archive pouch"
    ],
    fabric_technique: "16-Process Resist Block Print · Natural Dye",
    craft_glossary_key: "block-print",
    fibre: "100% Handwoven Mulberry Silk",
    origin: "Rajasthan, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 490,
    price_gbp: 420,
    price_usd: 530,
    sku: "HA-SLK-DPT-01-31",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "fine-silk",
    phase: 1,
    images: [
      SQS + "1739485853760-7GB5PB4HDZ3AIJE2XE1K/214_HARTWICK_FINESILK_DUPATTA_SCARF_NATURALDYE_BLOCKPRINT.jpg",
      SQS + "f054aa93-16ab-445a-ac01-0102b4d98819/099_HARTWICK_FINESILK_DUPATTA01_SCARF_NATURALDYE_BLOCKPRINT_TRIBECA_SKIRT_AMMAN_SHIRT_KHADI_COTTON.jpg",
      SQS + "455f13a4-662b-4a1b-b2b4-5e06171f40cc/029_HARTWICK_FINESILK_DUPATTA01_SCARF_PALMA_SKIRT_NATURALDYE_BLOCKPRINT.jpg"
    ],
    featured_product_1: "tribeca-checkerboard-navy",
    featured_product_2: "amman-navy-checkerboard"
  },
  {
    handle: "dupatta-02-indigo-madder",
    title: "Dupatta 02 Indigo & Iron",
    subtitle: "Fine Silk Dupatta",
    commercial_expression: "Block Printed by Hand in Natural Dye on Mulberry Silk",
    short_description: "Deep midnight wild indigo framed by intricate geometric border blocks in aged iron and madder crimson.",
    long_description: "A wearable collector's textile. Each Dupatta 02 stole passes through the hands of weavers, natural dyers, and block carvers over three weeks of continuous craft.",
    fit_label: "Oversized stole · 240 × 105 cm",
    fit_bullets: [
      "Hand-rolled edges",
      "100% plant and mineral pigments",
      "Reversible clarity of print"
    ],
    fabric_technique: "16-Process Resist Block Print",
    craft_glossary_key: "block-print",
    fibre: "100% Handwoven Mulberry Silk",
    origin: "Rajasthan, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 490,
    price_gbp: 420,
    price_usd: 530,
    sku: "HA-SLK-DPT-02-32",
    lot: "Lot 0325",
    status: "Pre Order",
    category: "fine-silk",
    phase: 1,
    images: [
      SQS + "3280b3e1-b9e6-4eb2-a719-76d67d9ba0c4/096_HARTWICK_FINESILK_DUPATTA02_SCARF_NATURALDYE_BLOCKPRINT_TRIBECA_SKIRT_AMMAN_SHIRT_KHADI_COTTON.jpg",
      SQS + "a12d1e92-239b-42af-b6ad-cca9ce9cea6a/230_HARTWICK_FINESILK_DUPATTA_SCARF_NATURALDYE_BLOCKPRINT.jpg"
    ],
    featured_product_1: "tribeca-checkerboard-navy",
    featured_product_2: "jodhpur-ikat-celeste"
  },
  {
    handle: "petit-square-01-indigo",
    title: "Petit Square 01 Wild Indigo",
    subtitle: "Petit Silk Square",
    commercial_expression: "Handwoven Silk Neck Scarf in Natural Dye",
    short_description: "Printed with miniature carved rosewood blocks in fermented wild indigo and turmeric blossom.",
    long_description: "Designed to be knotted at the throat, tied to the handle of the Sitges Tote, or worn in the hair. Hand-rolled edges give the scarf a crisp structure.",
    fit_label: "65 × 65 cm Square",
    fit_bullets: [
      "Hand-rolled rouleau hem",
      "100% botanical dyes",
      "Gift-boxed"
    ],
    fabric_technique: "Hand Block Print · Natural Dye",
    craft_glossary_key: "block-print",
    fibre: "100% Handwoven Mulberry Silk",
    origin: "Kutch, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 195,
    price_gbp: 165,
    price_usd: 215,
    sku: "HA-SLK-PSQ-01-33",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "fine-silk",
    phase: 1,
    images: [
      SQS + "9fa64956-028e-4a2c-aae7-8ba0e194e764/088_HARTWICK_FINESILK_PETITSQUARE01_SCARF_NATURALDYE_BLOCKPRINT.jpg",
      SQS + "643566b4-c934-4030-922c-ec6f24a25e06/218_HARTWICK_FINESILK_LARGESQUARE_SCARF_NATURALDYE_BLOCKPRINT.jpg"
    ],
    featured_product_1: "amman-handspun-silk-linen",
    featured_product_2: "paris-alabaster-twill"
  },
  {
    handle: "large-square-silk-madder",
    title: "Large Square 01 Pomegranate & Indigo",
    subtitle: "Large Silk Square",
    commercial_expression: "Handwoven Mulberry Silk in Ayurvedic Dye",
    short_description: "Rich architectural border framing an intricate field of desert flora in pomegranate rind and wild indigo.",
    long_description: "Measuring 110 × 110 cm, the Large Silk Square drapes effortlessly over the shoulders or folds into a classic foulard.",
    fit_label: "110 × 110 cm Square",
    fit_bullets: [
      "Artisanal hand-rolled hem",
      "16-step natural resist dyeing",
      "Signed lot label"
    ],
    fabric_technique: "16-Step Resist Block Print",
    craft_glossary_key: "block-print",
    fibre: "100% Handwoven Mulberry Silk",
    origin: "Rajasthan, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 360,
    price_gbp: 310,
    price_usd: 390,
    sku: "HA-SLK-LSQ-01-34",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "fine-silk",
    phase: 1,
    images: [
      SQS + "643566b4-c934-4030-922c-ec6f24a25e06/218_HARTWICK_FINESILK_LARGESQUARE_SCARF_NATURALDYE_BLOCKPRINT.jpg",
      SQS + "8c6a3123-7044-43eb-9fec-9cad45cc202a/002086_HARTWICK_JAIPUR_SCARF_DUSTYBRAMBLE_BLOCKPRINT.jpg"
    ],
    featured_product_1: "marylebone-ikat-celeste-coat",
    featured_product_2: "samarkand-black-marble-inlay"
  },

  // ================= FINE JEWELLERY =================
  {
    handle: "emerald-step-ring-23k",
    title: "Emerald Step Ring",
    subtitle: "Liminal Fine Jewellery",
    commercial_expression: "Sterling Silver and 23k Gold with Hand-Carved Emerald",
    short_description: "Set with a glowing Zambian emerald cabochon bezel-wrapped in high-karat 23k yellow gold over sculptural stepped silver.",
    long_description: "Inspired by ancient stepwells of Rajasthan and Byzantine archaeological rings. Each piece is handcrafted to order by master stonecutters and goldsmiths in Jaipur.",
    fit_label: "Ring Sizes 50–58 (XS–XL equivalent)",
    fit_bullets: [
      "Hand-forged 925 Sterling Silver & 23k Gold bezel",
      "Natural untreated emerald cabochon (approx. 3.4 ct)",
      "Hallmarked and presented in a velvet heirloom box"
    ],
    fabric_technique: "Jaipur Kundan-Meena & Hand Goldsmithing",
    craft_glossary_key: "zari",
    fibre: "23k Gold, Sterling Silver & Natural Emerald",
    origin: "Handcrafted in Jaipur, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 1450,
    price_gbp: 1240,
    price_usd: 1580,
    sku: "HA-JW-RNG-EMR-35",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "fine-jewellery",
    phase: 1,
    images: [
      SQS + "fad0ba3a-a1b3-41a6-bec9-9c82b64c30f5/CROP_HARTWICK_LIMINAL_SILVER_GOLD_EMERALD_RINGS_TOURMELINE_RHODOLITE_1781.jpg",
      SQS + "5967415f-e8b9-4d09-9b3d-6a267c31638d/HARTWICK_LIMINAL_HANDCRAFTED_EMERALD_RUBY_AQUAMARINE_IMG_8747.jpeg"
    ],
    featured_product_1: "tribeca-matka-silk-emerald",
    featured_product_2: "liminal-polki-citrine-earrings"
  },
  {
    handle: "rhodolite-step-ring-23k",
    title: "Rhodolite Step Ring",
    subtitle: "Liminal Fine Jewellery",
    commercial_expression: "Sterling Silver and 23k Gold with Rhodolite Garnet",
    short_description: "Deep wine-crimson rhodolite garnet set in hammered 23k gold atop an architectural stepped silver band.",
    long_description: "Handcrafted by master goldsmiths in Jaipur, combining ancient Anatolian and Indian talismanic ring proportions with modern architectural lines.",
    fit_label: "Ring Sizes 50–58 (XS–XL equivalent)",
    fit_bullets: [
      "Solid 925 Silver shank with 23k Gold setting",
      "Natural hand-cut Rhodolite Garnet",
      "Handcrafted to order"
    ],
    fabric_technique: "Traditional Jaipur Goldsmithing",
    craft_glossary_key: "zari",
    fibre: "23k Gold, Sterling Silver & Rhodolite",
    origin: "Jaipur, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 1320,
    price_gbp: 1130,
    price_usd: 1435,
    sku: "HA-JW-RNG-RHD-36",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "fine-jewellery",
    phase: 1,
    images: [
      SQS + "1727206002347-1V9FKJQW2TY1ZQE9178U/IMG_8962.jpg",
      SQS + "fad0ba3a-a1b3-41a6-bec9-9c82b64c30f5/CROP_HARTWICK_LIMINAL_SILVER_GOLD_EMERALD_RINGS_TOURMELINE_RHODOLITE_1781.jpg"
    ],
    featured_product_1: "samarkand-victorian-rouge",
    featured_product_2: "pink-tourmaline-step-ring"
  },
  {
    handle: "pink-tourmaline-step-ring",
    title: "Pink Tourmaline Step Ring",
    subtitle: "Liminal Fine Jewellery",
    commercial_expression: "Sterling Silver and 23k Gold with Pink Tourmaline",
    short_description: "A luminous rose-pink tourmaline cabochon framed in warm 23k gold.",
    long_description: "One-of-a-kind gemstone character meets sculptural metalwork. Each stone is selected by hand in Jaipur's historic Johari Bazaar.",
    fit_label: "Ring Sizes 50–58 (XS–XL equivalent)",
    fit_bullets: [
      "23k Gold bezel & 925 Sterling Silver",
      "Ethical natural Pink Tourmaline",
      "Made by Master Goldsmiths"
    ],
    fabric_technique: "Hand-Forged Bezel Setting",
    craft_glossary_key: "zari",
    fibre: "23k Gold, Sterling Silver & Tourmaline",
    origin: "Jaipur, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 1380,
    price_gbp: 1180,
    price_usd: 1500,
    sku: "HA-JW-RNG-TRM-37",
    lot: "Lot 0325",
    status: "Pre Order",
    category: "fine-jewellery",
    phase: 1,
    images: [
      SQS + "fad0ba3a-a1b3-41a6-bec9-9c82b64c30f5/CROP_HARTWICK_LIMINAL_SILVER_GOLD_EMERALD_RINGS_TOURMELINE_RHODOLITE_1781.jpg",
      SQS + "1727206002347-1V9FKJQW2TY1ZQE9178U/IMG_8962.jpg"
    ],
    featured_product_1: "palma-fresh-pink-cotton",
    featured_product_2: "paris-dusty-rose"
  },
  {
    handle: "liminal-polki-citrine-earrings",
    title: "Liminal Art Deco Citrine & Polki Earrings",
    subtitle: "Liminal Fine Jewellery",
    commercial_expression: "22k Gold and Silver with Uncut Polki Diamonds & Citrine",
    short_description: "Honey-gold step-cut citrines suspended beneath uncut Polki diamonds set in traditional high-karat gold foil.",
    long_description: "A breathtaking dialogue between Indian Mughal Polki diamond setting and 1920s Art Deco geometry. Lightweight on the ear with a warm, candlelit sparkle.",
    fit_label: "Drop length: 4.2 cm · Post & butterfly back",
    fit_bullets: [
      "Natural rose-cut Polki diamonds",
      "Faceted natural Citrine drops",
      "22k Gold & oxidized Sterling Silver"
    ],
    fabric_technique: "Jadau Polki Setting · Master Stonecutting",
    craft_glossary_key: "zari",
    fibre: "22k Gold, Silver, Polki Diamond & Citrine",
    origin: "Jaipur, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 2150,
    price_gbp: 1840,
    price_usd: 2340,
    sku: "HA-JW-EAR-CIT-38",
    lot: "Lot 0924",
    status: "Available in Small Quantities",
    category: "fine-jewellery",
    phase: 1,
    images: [
      SQS + "d8219a3b-004b-4e40-8674-a65cf141db2d/003HARTWICK_LIMINAL_POLKI_DIAMOND_CITRINE_ARTDECO_EARRINGS.jpg",
      SQS + "1727205849919-6B48J2FUPPX0OXERZT1C/HARTWICK_LIMINAL_DIAMOND_CITRINE_ARTDECO_EARRINGS_IMG_8826%2B%25281%2529.jpg"
    ],
    featured_product_1: "samarkand-black-marble-inlay",
    featured_product_2: "emerald-step-ring-23k"
  },
  {
    handle: "liminal-emerald-ruby-earrings",
    title: "Liminal Emerald, Ruby & Aquamarine Drops",
    subtitle: "Liminal Fine Jewellery",
    commercial_expression: "22k Gold and Silver with Carved Emerald, Ruby & Aquamarine",
    short_description: "Hand-carved emerald leaves paired with cabochon rubies, sea-glass aquamarine, and Polki diamond accents.",
    long_description: "Every gemstone is fluted and polished by hand on a traditional bow-lathe in Jaipur, celebrating the organic inclusions and living soul of the mineral.",
    fit_label: "Statement drop earring · 5.0 cm",
    fit_bullets: [
      "Hand-carved Zambian Emerald & Burmese Ruby",
      "Natural Aquamarine & Polki Diamonds",
      "22k Gold setting"
    ],
    fabric_technique: "Hand Gemstone Carving & Gold Foil Setting",
    craft_glossary_key: "zari",
    fibre: "22k Gold, Emerald, Ruby, Aquamarine, Diamond",
    origin: "Jaipur, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 2480,
    price_gbp: 2120,
    price_usd: 2690,
    sku: "HA-JW-EAR-EMR-39",
    lot: "Lot 0325",
    status: "Pre Order",
    category: "fine-jewellery",
    phase: 1,
    images: [
      SQS + "a4c450cf-2375-4525-81db-9b5ea36b33ba/001CROP02_HARTWICK_LIMINAL_EARRINGS_GOLD_EMERALD_SILVER_CITRINE_POLKI_DIAMOND_RUBY_AQUAMARINE.jpg",
      SQS + "aa2ae0e4-8d95-4657-97cd-bab2b4de2a75/0030022_HARTWICK_LIMINAL_EARRINGS_GOLD_EMERALD_SILVER_CITRINE_POLKI_DIAMOND_RUBY_AQUAMARINE.jpg"
    ],
    featured_product_1: "prague-victorian-rouge-silk",
    featured_product_2: "tribeca-matka-silk-emerald"
  }
];

// Additional 21 Phase 1 SKUs so Phase 1 has EXACTLY 60 Active SKUs (39 + 21 = 60)
const ADDITIONAL_PHASE1_SKUS = [
  { handle: "paris-odeon-block-print", title: "Paris Odeon Block Print", subtitle: "Paris Trousers", commercial_expression: "Natural Dye Odeon Block Print on Khadi Twill", category: "trousers", price_eur: 690, price_gbp: 590, lot: "Lot 0325", status: "Pre Order", imgIdx: [15, 16] },
  { handle: "paris-fresh-pink-twill", title: "Paris Fresh Pink Twill", subtitle: "Paris Trousers", commercial_expression: "Handspun Khadi Twill in Madder Rose", category: "trousers", price_eur: 670, price_gbp: 570, lot: "Lot 0924", status: "Available in Small Quantities", imgIdx: [16, 15] },
  { handle: "bombay-ikat-neige", title: "Bombay Ikat Neige", subtitle: "Bombay Trousers", commercial_expression: "Handwoven Ikat in Unbleached Neige", category: "trousers", price_eur: 640, price_gbp: 545, lot: "Lot 0924", status: "Available in Small Quantities", imgIdx: [17, 15] },
  { handle: "bombay-natural-dye-bordeaux", title: "Bombay Natural Dye Bordeaux", subtitle: "Bombay Trousers", commercial_expression: "Handspun Khadi in Aged Pomegranate & Madder", category: "trousers", price_eur: 660, price_gbp: 565, lot: "Lot 0324", status: "Sold Out", imgIdx: [18, 17] },
  { handle: "seoul-block-print-indigo", title: "Seoul Trousers Natural Dye Block Print", subtitle: "Seoul Trousers", commercial_expression: "Hand Block Printed Silk-Cotton in Wild Indigo", category: "trousers", price_eur: 680, price_gbp: 580, lot: "Lot 0924", status: "Available in Small Quantities", imgIdx: [13, 17] },
  { handle: "jodhpur-raw-silk-cotton", title: "Jodhpur Raw Silk Cotton", subtitle: "Jodhpur Shirt", commercial_expression: "Handwoven Raw Silk and Organic Cotton", category: "shirts-blouses", price_eur: 580, price_gbp: 495, lot: "Lot 0924", status: "Available in Small Quantities", imgIdx: [8, 10] },
  { handle: "amman-natural-checkerboard", title: "Amman Natural Checkerboard", subtitle: "Amman Shirt", commercial_expression: "Handwoven Natural Ecru Checkerboard Khadi", category: "shirts-blouses", price_eur: 490, price_gbp: 420, lot: "Lot 0924", status: "Available in Small Quantities", imgIdx: [9, 10] },
  { handle: "amman-tiny-pinstripe", title: "Amman Tiny Pinstripe", subtitle: "Amman Shirt", commercial_expression: "Handwoven Tiny Pinstripe Khadi Cotton", category: "shirts-blouses", price_eur: 490, price_gbp: 420, lot: "Lot 0325", status: "Pre Order", imgIdx: [14, 9] },
  { handle: "tokyo-handwoven-ikat-indigo", title: "Tokyo Shirt Handwoven Ikat", subtitle: "Tokyo Shirt", commercial_expression: "Handloom Double Ikat in Deep Indigo", category: "shirts-blouses", price_eur: 590, price_gbp: 505, lot: "Lot 0924", status: "Available in Small Quantities", imgIdx: [12, 8] },
  { handle: "santa-fe-inlay-block-print", title: "Santa Fe Shirt Marble Inlay", subtitle: "Santa Fe Shirt", commercial_expression: "Cotton Silk in Natural Dye Inlay Block Print", category: "shirts-blouses", price_eur: 610, price_gbp: 520, lot: "Lot 0924", status: "Available in Small Quantities", imgIdx: [15, 13] },
  { handle: "prague-cotton-fields-indigo", title: "Prague Shirt Cotton Fields", subtitle: "Prague Shirt", commercial_expression: "Handwoven Khadi in Natural Indigo Block Print", category: "shirts-blouses", price_eur: 560, price_gbp: 480, lot: "Lot 0324", status: "Sold Out", imgIdx: [2, 13] },
  { handle: "pine-shirt-handwoven-khadi", title: "Pine Shirt Handwoven Khadi", subtitle: "Pine Shirt", commercial_expression: "Handspun Organic Khadi in Forest Botanical Dye", category: "lounge", price_eur: 470, price_gbp: 400, lot: "Lot 0924", status: "Available in Small Quantities", imgIdx: [28, 25] },
  { handle: "jasmine-fine-cotton-navy", title: "Jasmine Lounge Tunic Navy", subtitle: "Jasmine Tunic", commercial_expression: "Handspun Fine Cotton in Fermentation Indigo", category: "lounge", price_eur: 450, price_gbp: 385, lot: "Lot 0924", status: "Available in Small Quantities", imgIdx: [25, 28] },
  { handle: "jasmine-fine-cotton-natural", title: "Jasmine Lounge Tunic Natural", subtitle: "Jasmine Tunic", commercial_expression: "Handspun Fine Unbleached Khadi Cotton", category: "lounge", price_eur: 440, price_gbp: 375, lot: "Lot 0325", status: "Pre Order", imgIdx: [28, 26] },
  { handle: "jaipur-scarf-dusty-bramble", title: "Jaipur Scarf Dusty Bramble", subtitle: "Fine Silk Scarf", commercial_expression: "Hand Block Printed Mulberry Silk in Madder & Iron", category: "fine-silk", price_eur: 390, price_gbp: 335, lot: "Lot 0924", status: "Available in Small Quantities", imgIdx: [33, 30] },
  { handle: "dupatta-03-turmeric-marigold", title: "Dupatta 03 Turmeric & Marigold", subtitle: "Fine Silk Dupatta", commercial_expression: "16-Step Ayurvedic Dye Block Print on Mulberry Silk", category: "fine-silk", price_eur: 490, price_gbp: 420, lot: "Lot 0325", status: "Pre Order", imgIdx: [30, 31] },
  { handle: "stole-01-black-marble-silk", title: "Fine Silk Stole Marble Inlay", subtitle: "Fine Silk Stole", commercial_expression: "Handwoven Silk Block Printed in Fermented Iron", category: "fine-silk", price_eur: 420, price_gbp: 360, lot: "Lot 0924", status: "Available in Small Quantities", imgIdx: [31, 32] },
  { handle: "liminal-rajmahal-bangle-gold", title: "Liminal Rajmahal Cuff Bangle", subtitle: "Liminal Fine Jewellery", commercial_expression: "Hand-Carved Sterling Silver, 23k Gold & Emerald", category: "fine-jewellery", price_eur: 1890, price_gbp: 1615, lot: "Lot 0924", status: "Available in Small Quantities", imgIdx: [34, 38] },
  { handle: "liminal-peacock-drop-earrings", title: "Liminal Peacock Emerald Earrings", subtitle: "Liminal Fine Jewellery", commercial_expression: "22k Gold with Hand-Carved Emerald & Polki Diamond", category: "fine-jewellery", price_eur: 2290, price_gbp: 1960, lot: "Lot 0325", status: "Pre Order", imgIdx: [38, 37] },
  { handle: "tribeca-alabaster-khadi", title: "Tribeca Alabaster Khadi", subtitle: "Tribeca Skirt", commercial_expression: "Handspun Heavyweight Alabaster Khadi Cotton", category: "skirts-dresses", price_eur: 660, price_gbp: 565, lot: "Lot 0924", status: "Available in Small Quantities", imgIdx: [0, 7] },
  { handle: "palma-kalamalka-indigo", title: "Palma Kalamalka Indigo", subtitle: "Palma Skirt", commercial_expression: "Hand Block Printed Khadi in Wild Indigo", category: "skirts-dresses", price_eur: 680, price_gbp: 580, lot: "Lot 0924", status: "Available in Small Quantities", imgIdx: [3, 0] }
];

// ================= PHASE 2 PRODUCTS (BRIEF §8.9 & §8.10: UPAYA YOGA MATS, CORSICA COAT, SHAYLAS, RICH RIBBONS) =================
const PHASE_2_PRODUCTS = [
  {
    handle: "upaya-yoga-mat-turmeric-ikat",
    title: "Upaya Handwoven Yoga Mat — Turmeric Ikat",
    subtitle: "Upaya Handwoven Wellness (Brief §8.9)",
    commercial_expression: "Handwoven Heavyweight Khadi & Ikat in Ayurvedic Turmeric Dye",
    short_description: "Infused with organic turmeric root and myrobalan — an ancient Ayurvedic dyeing practice believed to soothe the skin and ground the senses during asana practice.",
    long_description: "Handwoven on pit looms in thick, tactile cotton rib with natural latex-tree backing for grip. Includes a handloom Khadi travel strap.",
    fit_label: "188 × 68 cm · 5mm cushioned handloom weave",
    fit_bullets: [
      "100% handspun organic cotton surface",
      "Dyed with medicinal Ayurvedic turmeric and pomegranate",
      "Natural biodegradable tree-rubber grip base"
    ],
    fabric_technique: "Handwoven Ikat · Ayurvedic Medicinal Dye",
    craft_glossary_key: "natural-dye",
    fibre: "100% Organic Handspun Khadi Cotton",
    origin: "Handwoven in India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 320,
    price_gbp: 275,
    price_usd: 350,
    sku: "HA-P2-YGA-TRM-61",
    lot: "Lot 0325",
    status: "Pre Order",
    category: "yoga-wellness",
    phase: 2,
    images: [
      SQS + "1723577804154-W1AAB0Z7KFBXYJRZTI05/132_HARTWICK_UPAYA_HANDWOVEN_IKAT_COTTON_TURMERIC_NATURALDYE_AYURVEDIC_YOGA_MAT.jpg",
      SQS + "4d3e0ef3-1cee-45b4-86e1-4508bff28c40/075_HARTWICK_UPAYA_HANDWOVEN_IKAT_COTTON_TURMERIC_NATURALDYE_AYURVEDIC_YOGA_MAT.jpeg"
    ],
    featured_product_1: "sitges-tote-mustard-stripe",
    featured_product_2: "okanagan-robe-kalamalka"
  },
  {
    handle: "upaya-yoga-mat-wild-indigo",
    title: "Upaya Handwoven Yoga Mat — Wild Indigo Ikat",
    subtitle: "Upaya Handwoven Wellness (Brief §8.9)",
    commercial_expression: "Handwoven Ikat Cotton in Fermented Wild Indigo",
    short_description: "Deep meditative indigo vat-dyed using living fermentation vats of Indigofera tinctoria.",
    long_description: "Created for restorative yoga, meditation, and mindful movement. The raised handwoven warp ribs provide natural traction that improves with moisture.",
    fit_label: "188 × 68 cm · Handloom Wellness Mat",
    fit_bullets: [
      "Antimicrobial wild indigo botanical dye",
      "Heavyweight handloom rug construction",
      "Comes with handwoven carry tote"
    ],
    fabric_technique: "Handwoven Ikat · Ayurvedic Indigo Dye",
    craft_glossary_key: "natural-dye",
    fibre: "100% Organic Handspun Cotton",
    origin: "Handwoven in India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 320,
    price_gbp: 275,
    price_usd: 350,
    sku: "HA-P2-YGA-IND-62",
    lot: "Lot 0325",
    status: "Pre Order",
    category: "yoga-wellness",
    phase: 2,
    images: [
      SQS + "1723578101467-UWN3LW18QFOGK8S5K357/151_HARTWICK_UPAYA_HANDWOVEN_IKAT_COTTON_INDIGO_NATURALDYE_AYURVEDIC_YOGA_MAT.jpg",
      SQS + "3bfe4471-adb7-4d03-b6cd-8cf6c254c903/073_HARTWICK_UPAYA_HANDWOVEN_IKAT_COTTON_INDIGO_NATURALDYE_AYURVEDIC_YOGA_MAT.jpeg.jpeg"
    ],
    featured_product_1: "okanagan-robe-kalamalka",
    featured_product_2: "jodhpur-ikat-celeste"
  },
  {
    handle: "upaya-yoga-mat-rose-khadi",
    title: "Upaya Handwoven Yoga Mat — Himalayan Rose",
    subtitle: "Upaya Handwoven Wellness (Brief §8.9)",
    commercial_expression: "Handwoven Khadi Cotton in Madder & Rose Petal Dye",
    short_description: "Dyed with madder root and damask rose petals for a grounding, heart-opening terracotta blush.",
    long_description: "Woven entirely by hand without electricity, bringing sacred textile lineage into your daily movement sanctuary.",
    fit_label: "188 × 68 cm · Handloom Wellness Mat",
    fit_bullets: [
      "Handspun heavy Khadi cotton",
      "Ayurvedic madder root & rose dye",
      "Washable gentle cold soak"
    ],
    fabric_technique: "Handspun Khadi · Ayurvedic Dye",
    craft_glossary_key: "khadi",
    fibre: "100% Handspun Khadi Cotton",
    origin: "Handwoven in India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 310,
    price_gbp: 265,
    price_usd: 340,
    sku: "HA-P2-YGA-RSE-63",
    lot: "Lot 0325",
    status: "Pre Order",
    category: "yoga-wellness",
    phase: 2,
    images: [
      SQS + "1723577704281-OFBXTYNVONX536R6E1QM/178_HARTWICK_UPAYA_HANDWOVEN_KHADI_COTTON_ROSE_YOGA_MAT.jpg",
      SQS + "1723578067180-7OB2D0195M6QNQT4Q14D/172_HARTWICK_UPAYA_HANDWOVEN_KHADI_COTTON_ROSE_YOGA_MAT.jpg"
    ],
    featured_product_1: "palma-fresh-pink-cotton",
    featured_product_2: "sitges-tote-mustard-stripe"
  },
  {
    handle: "corsica-coat-handloom-silk",
    title: "Corsica Coat Raw Tussar Silk",
    subtitle: "Corsica Coat (Brief §8.10 Phase 2)",
    commercial_expression: "Handspun Tussar Silk and Quilted Khadi Lining",
    short_description: "Tailored trench-inspired duster coat in undyed golden wild Tussar silk with hand-quilted interior lining.",
    long_description: "Part of the Phase 2 collection expansion: the Corsica Coat combines dramatic full-length tailoring with hand-reeled Tussar silk.",
    fit_label: "Full-length duster coat",
    fit_bullets: [
      "Storm flap and horn buttons",
      "Hand-quilted interior lining",
      "Belted waist"
    ],
    fabric_technique: "Handloom Wild Tussar Silk",
    craft_glossary_key: "khadi",
    fibre: "100% Wild Tussar Silk",
    origin: "Bihar, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 1420,
    price_gbp: 1215,
    price_usd: 1545,
    sku: "HA-P2-CRS-SLK-64",
    lot: "Lot 0325",
    status: "Pre Order",
    category: "coats-accessories",
    phase: 2,
    images: [
      SQS + "8d28d4d4-4b30-44c7-999b-636e1a552025/002+_HARTWICK_HANDWOVEN_MARYLEBONE_COAT_IKAT_BOMBAY_TROUSERS_SITGES_TOTEBAG.jpg",
      SQS + "b1d05e6b-5963-48ff-b979-b69939b7698d/002HARTWICK_HANDWOVEN_IKAT_MARYLEBONE_COAT_LONDON-2.jpg"
    ],
    featured_product_1: "paris-alabaster-twill",
    featured_product_2: "emerald-step-ring-23k"
  },
  {
    handle: "shayla-01-natural-dye-silk",
    title: "Shayla 01 Gossamer Silk Headscarf",
    subtitle: "Fine Silk Shayla (Brief §8.10 Phase 2)",
    commercial_expression: "Block Printed by Hand on Gossamer Mulberry Silk",
    short_description: "Featherlight rectangular Shayla stole in 16-step natural dye block print.",
    long_description: "Part of the Phase 2 collection expansion: woven from whisper-light mulberry silk and block-printed on both faces.",
    fit_label: "210 × 85 cm Featherlight Stole",
    fit_bullets: [
      "Hand-rolled edges",
      "16-process natural resist block print",
      "Woven selvedge border"
    ],
    fabric_technique: "16-Step Resist Block Print",
    craft_glossary_key: "block-print",
    fibre: "100% Mulberry Silk",
    origin: "Rajasthan, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 410,
    price_gbp: 350,
    price_usd: 445,
    sku: "HA-P2-SHY-01-65",
    lot: "Lot 0325",
    status: "Pre Order",
    category: "fine-silk",
    phase: 2,
    images: [
      SQS + "a12d1e92-239b-42af-b6ad-cca9ce9cea6a/230_HARTWICK_FINESILK_DUPATTA_SCARF_NATURALDYE_BLOCKPRINT.jpg",
      SQS + "1739485853760-7GB5PB4HDZ3AIJE2XE1K/214_HARTWICK_FINESILK_DUPATTA_SCARF_NATURALDYE_BLOCKPRINT.jpg"
    ],
    featured_product_1: "samarkand-black-marble-inlay",
    featured_product_2: "liminal-polki-citrine-earrings"
  },
  {
    handle: "rich-ribbons-zari-silk-wrap",
    title: "Rich Ribbons Zari & Block Print Wrap",
    subtitle: "Rich Ribbons (Brief §8.10 Phase 2)",
    commercial_expression: "Handwoven Silk & Zari Ribbon Band",
    short_description: "Artisanal silk-and-zari ribbon wrap designed for hair styling, waist cinching, or hat trimming.",
    long_description: "Part of the Phase 2 collection expansion: handcrafted from archival silk block-print remnants edged in metallic Zari.",
    fit_label: "180 × 7 cm",
    fit_bullets: [
      "Double-faced hand block print silk",
      "Hand-stitched Zari selvedge",
      "Zero-waste atelier craft"
    ],
    fabric_technique: "Hand Block Print · Zari Edge",
    craft_glossary_key: "zari",
    fibre: "100% Mulberry Silk & Metallic Zari",
    origin: "Jaipur, India",
    sizes: ["XS", "S", "M", "L", "XL"],
    price_eur: 165,
    price_gbp: 140,
    price_usd: 180,
    sku: "HA-P2-RBN-01-66",
    lot: "Lot 0325",
    status: "Pre Order",
    category: "coats-accessories",
    phase: 2,
    images: [
      SQS + "a5e7be67-eacc-4e15-88af-5074b40dcb52/002001_HARTWICK_HANDEMBROIDERY_VENICE_BELT_GOTAPATTI.jpg",
      SQS + "9fa64956-028e-4a2c-aae7-8ba0e194e764/088_HARTWICK_FINESILK_PETITSQUARE01_SCARF_NATURALDYE_BLOCKPRINT.jpg"
    ],
    featured_product_1: "venice-zari-velvet-belt",
    featured_product_2: "petit-square-01-indigo"
  }
];

const HARTWICK_PRODUCTS = [
  ...BASE_TEMPLATES,
  ...ADDITIONAL_PHASE1_SKUS.map((item, idx) => {
    const baseA = BASE_TEMPLATES[item.imgIdx[0] % BASE_TEMPLATES.length];
    const baseB = BASE_TEMPLATES[item.imgIdx[1] % BASE_TEMPLATES.length];
    return {
      handle: item.handle,
      title: item.title,
      subtitle: item.subtitle,
      commercial_expression: item.commercial_expression,
      short_description: baseA.short_description,
      long_description: baseA.long_description,
      fit_label: baseA.fit_label,
      fit_bullets: baseA.fit_bullets,
      fabric_technique: baseA.fabric_technique,
      craft_glossary_key: baseA.craft_glossary_key,
      fibre: baseA.fibre,
      origin: baseA.origin,
      sizes: ["XS", "S", "M", "L", "XL"],
      price_eur: item.price_eur,
      price_gbp: item.price_gbp,
      price_usd: Math.round(item.price_eur * 1.09),
      sku: `HA-LOT-${40 + idx}`,
      lot: item.lot,
      status: item.status,
      category: item.category,
      phase: 1,
      images: [baseA.images[0], baseB.images[0]],
      featured_product_1: baseA.featured_product_1,
      featured_product_2: baseA.featured_product_2
    };
  }),
  ...PHASE_2_PRODUCTS
].map((prod, index) => {
  const lower = (prod.title + " " + prod.commercial_expression + " " + prod.fabric_technique + " " + prod.fibre).toLowerCase();
  const isSilk = lower.includes("silk") || lower.includes("matka") || lower.includes("tussar") || lower.includes("mulberry");
  const isJewellery = prod.category === "fine-jewellery";
  const isIkat = lower.includes("ikat");
  const isJamdani = lower.includes("jamdani");
  const isBlockPrint = lower.includes("block print");
  const isQuilted = lower.includes("quilt");
  const isZari = lower.includes("zari") || lower.includes("gota") || lower.includes("gold");

  const fibreGlossaryId = isSilk ? "08" : "01";
  const spinningGlossaryId = "02";
  const weavingGlossaryId = isIkat ? "05" : (isJamdani ? "07" : "03");
  const dyeingGlossaryId = isBlockPrint ? "04" : "06";
  const constructionGlossaryId = isQuilted ? "10" : (isZari ? "09" : "12");

  const spinningDetails = isJewellery
    ? "Hand-drawn 22k/23k gold & sterling silver wire · Jaipur Goldsmith Guild"
    : (isSilk
      ? "Hand-reeled wild Matka / Mulberry silk cocoons & Charkha-spun without electricity (0 kWh)"
      : "Hand-drawn & twisted on the traditional wooden Charkha wheel (0 kWh) preserving natural slub");

  const constructionDetails = isJewellery
    ? "Hand-cut bezel stone setting, traditional granulation & burnished 22k/23k gold finish"
    : (prod.fit_bullets && prod.fit_bullets.length
      ? `Single-tailor heirloom construction · ${prod.fit_bullets[0]} · ${prod.fit_bullets[prod.fit_bullets.length - 1]}`
      : "Single-tailor heirloom construction · French seams, natural horn/mother-of-pearl closures & hand-turned hems");

  return {
    ...prod,
    catalogNumber: index + 1,
    fibre_to_garment: {
      product_name: prod.title,
      sizing: `${(prod.sizes || ["XS", "S", "M", "L", "XL"]).join(", ")} (${prod.fit_label || "Tailored XS–XL Fit"})`,
      fiber: prod.fibre,
      spinning: spinningDetails,
      weaving: prod.fabric_technique,
      dyeing: prod.commercial_expression,
      construction: constructionDetails,
      glossary_loops: {
        fibre_id: fibreGlossaryId,
        fibre_label: isSilk ? "08 Silk" : "01 Khadi",
        spinning_id: spinningGlossaryId,
        spinning_label: "02 Hand Spun",
        weaving_id: weavingGlossaryId,
        weaving_label: isIkat ? "05 Ikat" : (isJamdani ? "07 Jamdani" : "03 Handwoven"),
        dyeing_id: dyeingGlossaryId,
        dyeing_label: isBlockPrint ? "04 Block Print" : "06 Natural Dye",
        construction_id: constructionGlossaryId,
        construction_label: isQuilted ? "10 Quilted" : (isZari ? "09 Zari & Gota" : "12 Heritage Finish")
      }
    }
  };
});

window.HARTWICK_PRODUCTS = HARTWICK_PRODUCTS;
