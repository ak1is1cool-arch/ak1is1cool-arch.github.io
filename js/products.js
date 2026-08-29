/* =====================================================================
   WATERSIDE STORE — PRODUCTS & SETTINGS
   =====================================================================
   THIS IS THE ONLY FILE YOU NEED TO EDIT DAY-TO-DAY.

   HOW TO ADD A PRODUCT:
   1. Copy one of the blocks between { and }, including the comma.
   2. Paste it into the correct list (NECESSITIES, DRINKS, SNACKS,
      MERCH or PRINTS).
   3. Change the id (must be unique), name, price, stock, description,
      image.
   4. Put the product photo into the /images folder and write its
      file name in "image" (e.g. "images/my-photo.jpg").
      If you don't have a photo yet, use "images/placeholder-grocery.svg"
      or "images/placeholder-print.svg".
   5. Save the file and re-upload it to your hosting. Done.

   STOCK: "stock" is how many units you have on hand. The site shows
   this next to the product and will not let a customer add more than
   that many to their basket. Just update the number whenever your
   stock changes.

   THE SITE HAS 5 SECTIONS, IN THIS ORDER:
   1. Necessities  (NECESSITIES list)
   2. Drinks        (DRINKS list)
   3. Snacks        (SNACKS list)
   4. Merch         (MERCH list)
   5. 3D Prints     (PRINTS list)

   HOW TO REMOVE A PRODUCT: delete its whole { ... }, block.
   HOW TO CHANGE A PRICE:   just change the number (use a dot: 4.50).
   ===================================================================== */

const STORE_SETTINGS = {
  storeName: "Waterside Store",

  // --- HOMEPAGE BANNER (top of the page) --------------------------------
  // Change these to update the big banner — no HTML editing needed.
  heroEyebrow: "Waterside Store — Quick Delivery for All Your Home Needs",   // small line above the banner
  // Banner background photos — they fade from one to the next automatically.
  // Add, remove or reorder entries to change the slideshow.
  heroImages: [
    { src: "images/hero-1.jpg", alt: "Waterside apartment building, street view" },
    { src: "images/hero-2.jpg", alt: "Waterside apartment building, side view" },
    { src: "images/hero-3.jpg", alt: "The courtyard outside the Waterside store" }
  ],
  heroSlideSeconds: 2, // how many seconds each photo stays up before fading to the next

  // Currency shown on the site
  currencySymbol: "€",
  currencyCode: "EUR", // used for the PayPal payment link

  // --- PAYMENTS: PUT YOUR OWN USERNAMES HERE ---------------------------
  // PayPal:  create a link at https://paypal.me  -> put the username here
  // Revolut: find your link in the Revolut app (Profile -> Revolut Me)
  paypalUsername: "WatersideShop",
  revolutUsername: "marcinhev9",

  // --- ORDER EMAILS ----------------------------------------------------
  // Orders are emailed to this address via formsubmit.co (free service).
  // IMPORTANT: the FIRST order you ever send will trigger a confirmation
  // email from FormSubmit to this inbox — click "Activate" in it once,
  // and every order after that arrives automatically.
  orderEmail: "a.k1is1coop@gmail.com"
};

/* ============================ NECESSITIES =========================== */

const NECESSITIES = [
  {
    id: "n1",
    name: "Free-Range Eggs (box of 6)",
    price: 2.49,
    stock: 40,
    description: "Six large free-range eggs from happy hens — perfect for breakfast, baking or a quick omelette.",
    images: ["images/eggs 6/eggs12-3-1682093471.jpg"]
  },
  {
    id: "n2",
    name: "Free-Range Eggs (box of 12)",
    price: 4.29,
    stock: 30,
    description: "A full dozen large free-range eggs — great value for bigger households or a weekend fry-up.",
    images: [
      "images/eggs 12/wrGHA.jpg"
    ]
  },
  {
    id: "n3",
    name: "Milk 500ml",
    price: 1.35,
    stock: 60,
    description: "Fresh, creamy milk in a handy 500ml size — perfect for topping up the fridge without waste.",
    images: [
      "images/milk 500ml/milk-4755234_1280.jpg"
    ]
  },
  {
    id: "n4",
    name: "Milk 1L",
    price: 2.15,
    stock: 60,
    description: "A full litre of fresh, creamy milk — ideal for tea, coffee, cereal and cooking.",
    images: [
      "images/milk 1l/dgfbnz.jpg"
    ]
  },
  {
    id: "n5",
    name: "Butter",
    price: 3.85,
    stock: 50,
    description: "Rich, creamy butter that spreads smoothly and adds real flavour to toast, baking and cooking.",
    images: [
      "images/butter/bob.jpg"
    ]
  },
  {
    id: "n6",
    name: "White Bread (half loaf)",
    price: 1.60,
    stock: 40,
    description: "A soft half loaf of white bread, sliced and ready for toast or sandwiches — perfect for smaller households.",
    images: [
      "images/white bread half loaf/aerth.jpg"
    ]
  },
  {
    id: "n7",
    name: "White Bread (full loaf)",
    price: 2.95,
    stock: 40,
    description: "A full loaf of soft, fresh white bread, sliced and ready for sandwiches, toast or a side to dinner.",
    images: [
      "images/white bread loaf/DSC_9293-1087x1536-817940156.jpg"
    ]
  }
];

/* =============================== DRINKS ============================= */

const DRINKS = [
  {
    id: "d1",
    name: "Coca-Cola 330ml",
    price: 1.95,
    stock: 40,
    description: "The original ice-cold cola with its classic crisp, refreshing taste — a timeless favourite in a 330ml can.",
    images: [
      "images/cola 330ml/interior_img3+10.16.27-original-3931983675.jpg",
      "images/cola 330ml/ChatGPT Image Aug 29, 2026, 01_13_41 PM.png"
    ]
  },
  {
    id: "d2",
    name: "Fanta Grape (Japan) 300ml",
    price: 3.25,
    stock: 15,
    description: "A Japan-exclusive Fanta flavour with a bold, sweet grape taste and light fizz in a distinctive bottle — a fun import treat.",
    images: [
      "images/fanta jpn300ml/214312-3475537022.webp",
      "images/fanta jpn300ml/fanta-grape-japan-300ml-candy-district-nutrition-facts-ingredients-2596257920.png"
    ]
  },
  {
    id: "d3",
    name: "Fanta Orange 330ml",
    price: 1.85,
    stock: 30,
    description: "Bright, fruity Fanta Orange with bold citrus flavour and lively fizz, best served ice-cold.",
    images: [
      "images/fanta orange 330ml/6999c14185e93ddda77e7ffad1b617f7-2229294885.png",
      "images/fanta orange 330ml/Fanta-orange-1309838025.jpg"
    ]
  },
  {
    id: "d4",
    name: "Pepsi Max Cherry 330ml",
    price: 1.85,
    stock: 25,
    description: "Crisp, sugar-free cola with a sweet cherry twist and Pepsi Max's signature bold taste.",
    images: [
      "images/pepsi max cherry 330ml/Pepsi-Max-Cherry-2977327970.jpg",
      "images/pepsi max cherry 330ml/pepsi-max-cherry-no-sugar-uk-330ml-Candy-District-nutrition-facts-ingredients-3141357015.png"
    ]
  },
  {
    id: "d5",
    name: "Red Bull Energy 250ml",
    price: 2.35,
    stock: 30,
    description: "The original energy drink — a quick pick-me-up with a crisp taste, perfect for a boost any time of day.",
    images: [
      "images/redbull 250ml/t4hj.jpg",
      "images/redbull 250ml/red-bull-energy-drink-250-ml-lot-de-8-2-768x768-3866715974.jpg"
    ]
  },
  {
    id: "d6",
    name: "Monster Energy Original 553ml",
    price: 3.10,
    stock: 20,
    description: "A big 553ml can of the classic Monster Energy blend, packed with caffeine and B vitamins for long-lasting energy.",
    images: [
      "images/mega monster og 553ml/silo-product-image-v2-24Jun2022-180119-5060335634399-Angle_A-46594-2452_400Wx400H-1934664528.jpg",
      "images/mega monster og 553ml/ChatGPT Image Aug 29, 2026, 01_19_44 PM.png"
    ]
  },
  {
    id: "d7",
    name: "Monster Nitro Blue Flash 500ml",
    price: 3.20,
    stock: 15,
    description: "Nitrogen-infused Monster with a light blueberry flavour and a smooth, lightly fizzy texture — a refined twist on the classic buzz.",
    images: [
      "images/monster blue flash 500ml/624865_1_1200-1802383984.jpg",
      "images/monster blue flash 500ml/ChatGPT Image Aug 29, 2026, 01_26_14 PM.png"
    ]
  },
  {
    id: "d8",
    name: "Monster VR46 Zero Sugar 500ml",
    price: 3.10,
    stock: 15,
    description: "Zero-sugar Monster Energy in the Valentino Rossi VR46 edition, delivering the classic energy kick without the sugar.",
    images: [
      "images/monster vr46 500ml/monster-valentino-rossi-zero-sugar-energy-drink-385054540.jpg",
      "images/monster vr46 500ml/ChatGPT Image Aug 29, 2026, 12_51_06 PM.png"
    ]
  },
  {
    id: "d9",
    name: "Mogu Mogu Lychee 320ml",
    price: 2.20,
    stock: 20,
    description: "A fruity lychee drink packed with chewy nata de coco jelly pieces for a fun, refreshing texture in every sip.",
    images: [
      "images/mogu lychee 320ml/51_36cfb748-c8d0-45dc-a32d-abe86b273b78-4163327337.jpg",
      "images/mogu lychee 320ml/270961-6.jpg"
    ]
  },
  {
    id: "d10",
    name: "Mogu Mogu Mango 320ml",
    price: 2.20,
    stock: 20,
    description: "Sweet, tropical mango juice loaded with bouncy nata de coco jelly bits for a refreshing chew-and-drink experience.",
    images: [
      "images/mogu mango 320ml/3_0b41112c-e774-4dc6-b551-8839d94c5a9e-3714382414.jpg",
      "images/mogu mango 320ml/mogumangojuice300ml7-1000x1000-3430090731.jpg"
    ]
  },
  {
    id: "d11",
    name: "Mogu Mogu Passion Fruit 320ml",
    price: 2.20,
    stock: 20,
    description: "Tangy passion fruit juice studded with soft, chewy nata de coco pieces for a satisfying fruity drink.",
    images: [
      "images/mogu passion 320ml/3_544c05fb-d5d2-42bd-a5ef-4a0048309164-3278751430.jpg",
      "images/mogu passion 320ml/Screenshot 2026-08-29 123904.png"
    ]
  }
];

/* =============================== SNACKS ============================== */

const SNACKS = [
  {
    id: "s1",
    name: "Mentos Fruit",
    price: 1.45,
    stock: 30,
    description: "Chewy Mentos rolls in a mix of fruity flavours — a classic on-the-go sweet.",
    images: [
      "images/mentos fruit/814bDnGb7qL._AC_SL1500-3979608018.jpg",
      "images/mentos fruit/Duck-ai-image-2026-08-29-12-56.jpeg"
    ]
  },
  {
    id: "s2",
    name: "Mystery PEZ + Dispenser",
    price: 4.50,
    stock: 12,
    description: "A surprise PEZ dispenser and refill pack — you won't know which character or flavour you'll get until it arrives.",
    images: [
      "images/mystery pez and dispenser/IMG_1820-3255152602.jpg",
      "images/mystery pez and dispenser/il_1080xN.6286926739_le8s-2789353753.jpg"
    ]
  },
  {
    id: "s3",
    name: "Mystery Toblerone",
    price: 5.95,
    stock: 10,
    description: "A mystery bar from the Toblerone range — could be milk, dark, white or fruit and nut. A sweet surprise every time.",
    images: [
      "images/mystery toblerone/81tIVT2oi7L-4080776493.jpg"
    ]
  },
  {
    id: "s4",
    name: "PEZ Fruit Flavours Refill Pack",
    price: 2.75,
    stock: 25,
    description: "A pack of classic PEZ fruit-flavoured candy refills, ready to reload any PEZ dispenser.",
    images: [
      "images/pez fruit flavours/pez-fruit-flavours-2854704481.webp",
      "images/pez fruit flavours/ChatGPT Image Aug 29, 2026, 02_00_34 PM.png"
    ]
  },
  {
    id: "s5",
    name: "Sour Patch Kids Paradise Twist",
    price: 2.95,
    stock: 20,
    description: "Sour Patch Kids with a tropical Paradise Twist — sour first, sweet after, in fruity tropical flavours.",
    images: [
      "images/sour patch kids paradise twist/d42332cd-86b0-48bf-9760-5dc4c6d6a91e_1346329731.webp",
      "images/sour patch kids paradise twist/ChatGPT Image Aug 29, 2026, 02_03_13 PM.png"
    ]
  },
  {
    id: "s6",
    name: "Toxic Waste Blue Sour Candy",
    price: 1.99,
    stock: 25,
    description: "Extremely sour blue hard candy in a mini barrel tub — not for the faint of taste buds.",
    images: [
      "images/toxic waste blue/OIP.webp",
      "images/toxic waste blue/ToxicWasteBlueBankMix-4195895061.jpg"
    ]
  }
];

/* ================================ MERCH =============================== */

const MERCH = [
  {
    id: "m1",
    name: "Basic Just Skate Shirt",
    price: 20.00,
    stock: 7,
    description: "Available in sizes 12–13, Small, Medium and Large. Please leave a note with your preferred size, otherwise Medium will be sent.",
    images: [
      "images/Basic Just skate shirt/il_794xN.8051113161_o5f3.jpg"
    ]
  },
  {
    id: "m2",
    name: "BASIC Graffiti Shirt",
    price: 20.00,
    stock: 10,
    description: "Available in sizes 12–13, Small, Medium and Large. Please leave a note with your preferred size, otherwise Medium will be sent.",
    images: [
      "images/Basic grafitti shirt/il_794xN.8045984673_riu9.jpg"
    ]
  },
  {
    id: "m3",
    name: "Blocky BASIC Shirt",
    price: 20.00,
    stock: 9,
    description: "Available in sizes 12–13, Small, Medium and Large. Please leave a note with your preferred size, otherwise Medium will be sent. BASIC is my own skate clothing brand. I designed these shirts myself using CorelDRAW. Thanks for supporting my small business!",
    images: [
      "images/Blocky basic shirt/il_794xN.8051077921_5kv0.jpg"
    ]
  }
];

/* ================================ PRINTS =============================== */

const PRINTS = [
  {
    id: "p1",
    name: "Twisty Gear Fidget",
    price: 7.00,
    stock: 4,
    description: "A compact, interlocking fidget toy made of multiple segments that form a circular, gear-like shape. It has a clean, matte finish and is designed to twist or move smoothly for a satisfying tactile feel.",
    images: [
      "images/3d printed Twisty gear fidget/Screenshot 2026-07-06 223357.png"
    ]
  },
  {
    id: "p2",
    name: "Flexi Hammerhead Shark",
    price: 8.43,
    stock: 3,
    description: "With its iconic hammer-shaped head and smooth articulated body, this little shark is ready to swim to your door.",
    images: [
      "images/3d printed flexi hammerhead shark/Screenshot 2026-07-07 083110.png"
    ]
  },
  {
    id: "p3",
    name: "Mystery 3D Print",
    price: 9.99,
    stock: 5,
    description: "A mystery 3D-printed item — the design and colour are a surprise, guaranteed to be a fun little print.",
    images: [
      "images/mystery 3d print/il_680x540.6672671685_kpei-1168534162.jpg"
    ]
  }
];
