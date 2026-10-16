/* ============================================================
   PRODUCTS-DATA.JS — every product on the site, in one place
   To add or edit a product, change it here. Mens.html and
   Womens.html pick their catalogue via <body data-catalog="…">.
   ============================================================ */

/* Reusable pieces */
const SIZES_XS_XXL = ["XS", "S", "M", "L", "XL", "XXL"];
const SIZES_S_XXL = ["S", "M", "L", "XL", "XXL"];

const COLOURS = {
  black: { name: "Black", hex: "#1a1a1a" },
  charcoal: { name: "Charcoal", hex: "#4a4a4a" },
  olive: { name: "Olive", hex: "#5c5f3a" },
  grey: { name: "Grey", hex: "#8a8a8a" },
  navy: { name: "Navy", hex: "#0f2d5e" },
  white: { name: "White", hex: "#f4f0e8" },
  sand: { name: "Sand", hex: "#c9b78a" },
  armyGreen: { name: "Army Green", hex: "#4b5a3a" },
};

const PRODUCT_CATALOGS = {
  /* ---------------------------- MENS ---------------------------- */
  mens: {
    "tshirt-shorts": {
      name: "T-shirt $ shorts",
      category: "T-shirt · Squat-Proof",
      price: 450,
      sizes: SIZES_XS_XXL,
      colours: [COLOURS.black, COLOURS.charcoal, COLOURS.olive],
      images: [
        "Mans-Product/Man3.jpg",
        "Mans-Product/Man2.jpg",
        "Mans-Product/Man1.jpg",
      ],
      details:
        "High-waist leggings with a wide comfort band that won't roll down mid-set. Squat-proof, opaque even under gym lighting, with a hidden waistband pocket for a key or card.",
    },
    "training-hoodie": {
      name: "Oversized Training Hoodie",
      category: "Hoodie · Heavyweight",
      price: 650,
      sizes: SIZES_S_XXL,
      colours: [COLOURS.black, COLOURS.grey, COLOURS.navy],
      images: [
        "Mans-Product/Man4.jpg",
        "Mans-Product/Man1.jpg",
        "Mans-Product/Man2.jpg",
      ],
      details:
        "Oversized fit, 400gsm brushed fleece hoodie built for warm-ups and walking out the gym. Kangaroo pocket, ribbed cuffs, drawcord hood.",
    },
    "performance-tank": {
      name: "Performance Tank Top",
      category: "Tank · Lightweight",
      price: 320,
      sizes: SIZES_XS_XXL,
      colours: [COLOURS.black, COLOURS.white, COLOURS.sand],
      images: [
        "Mans-Product/Man1.jpg",
        "Mans-Product/Man2.jpg",
        "Mans-Product/Man3.jpg",
      ],
      details:
        "Drop-arm racerback tank in an ultralight breathable mesh blend. Built for range of motion on push day without any fabric bunching.",
    },
    "flex-shorts": {
      name: "Flex Training Shorts",
      category: "Shorts · 7-Inch Inseam",
      price: 380,
      sizes: SIZES_S_XXL,
      colours: [COLOURS.black, COLOURS.charcoal, COLOURS.armyGreen],
      images: [
        "Mans-Product/Man4.jpg",
        "Mans-Product/Man3.jpg",
        "Mans-Product/Man1.jpg",
      ],
      details:
        "7-inch inseam training shorts with a built-in liner and zip pocket. Four-way stretch side panels for deep squats and lunges.",
    },
  },

  /* --------------------------- WOMENS --------------------------- */
  womens: {
    "sculpt-leggings": {
      name: "Sculpt High-Waist Leggings",
      category: "Leggings · Squat-Proof",
      price: 450,
      sizes: SIZES_XS_XXL,
      colours: [COLOURS.black, COLOURS.charcoal, COLOURS.olive],
      images: [
        "Womans-Product/Woman3.JPG",
        "Womans-Product/Woman2.JPG",
        "Womans-Product/Woman1.JPG",
      ],
      details:
        "High-waist leggings with a wide comfort band that won't roll down mid-set. Squat-proof, opaque even under gym lighting, with a hidden waistband pocket for a key or card.",
    },
    "training-hoodie": {
      name: "Oversized Training Hoodie",
      category: "Hoodie · Heavyweight",
      price: 650,
      sizes: SIZES_S_XXL,
      colours: [COLOURS.black, COLOURS.grey, COLOURS.navy],
      images: [
        "Womans-Product/Woman4.JPG",
        "Womans-Product/Woman1.JPG",
        "Womans-Product/Woman2.JPG",
      ],
      details:
        "Oversized fit, 400gsm brushed fleece hoodie built for warm-ups and walking out the gym. Kangaroo pocket, ribbed cuffs, drawcord hood.",
    },
    "performance-tank": {
      name: "Performance Tank Top",
      category: "Tank · Lightweight",
      price: 320,
      sizes: SIZES_XS_XXL,
      colours: [COLOURS.black, COLOURS.white, COLOURS.sand],
      images: [
        "Womans-Product/Woman1.JPG",
        "Womans-Product/Woman2.JPG",
        "Womans-Product/Woman3.JPG",
      ],
      details:
        "Drop-arm racerback tank in an ultralight breathable mesh blend. Built for range of motion on push day without any fabric bunching.",
    },
    "flex-shorts": {
      name: "Flex Training Shorts",
      category: "Shorts · 7-Inch Inseam",
      price: 380,
      sizes: SIZES_S_XXL,
      colours: [COLOURS.black, COLOURS.charcoal, COLOURS.armyGreen],
      images: [
        "Womans-Product/Woman4.JPG",
        "Womans-Product/Woman3.JPG",
        "Womans-Product/Woman1.JPG",
      ],
      details:
        "7-inch inseam training shorts with a built-in liner and zip pocket. Four-way stretch side panels for deep squats and lunges.",
    },
  },
};
