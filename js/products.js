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
    name: "Free-Range Eggs (box of 6) ",
    price: 5.13,
    stock: 100,
    description: "Large free-range eggs.",
    image: "images/eggs12-3-1682093471.jpg"
  },
  {
    id: "n2",
    name: "White bread",
    price: 4.15,
    stock: 150,
    description: "Fresh loaf of delicious bread.",
    image: "images/DSC_9293-1087x1536-817940156.jpg"
  },
  {
    id: "n3",
    name: " Butter ",
    price: 4.12,
    stock: 200,
    description: "Rich, creamy Butter.",
    image: "images/bob.jpg"
  },
  {
	  id: "n4",
    name: " Milk ",
    price: 3.42,
    stock: 200,
    description: " Rich creamy milk 1l of it.",
    image: "images/milk-4755234_1280.jpg"
  }
];

/* =============================== DRINKS ============================= */

const DRINKS = [
  {
    id: "d1",
    name: "RedBull energy",
    price: 3.43,
    stock: 5,
    description: "  Feeling tired? Have a cold redbull to boost your energy.",
    image: "images/t4hj.jpg"
  },
  {
    id: "d2",
    name: "Pepsi Max cherry",
    price: 2.84,
    stock: 18,
    description: " Pepsi Max cherry is a refreshing, carbonated soft drink renowned for its crisp taste and signature blend of sweet caramel and subtle spice flavors. Served ice-cold, it delivers a smooth, bubbly experience that has made it one of the world's most popular beverages. Perfect for enjoying on its own or pairing with meals, Pepsi Max offers a refreshing taste that suits any occasion, from everyday moments to celebrations with family and friends.",
    image: "images/Pepsi-Max-Cherry-2977327970.jpg"
  },
  {
    id: "d3",
    name: "Fanta Orange",
    price: 3.17,
    stock: 5,
    description: "Fanta Orange is a vibrant, fruit-flavored carbonated soft drink bursting with bold, refreshing orange taste and lively fizz. Its bright citrus flavor and crisp bubbles make it a fun and refreshing choice for any occasion. Best served chilled, Fanta Orange is perfect for enjoying on its own, with meals, or as a refreshing treat to brighten your day.",
    image: "images/6999c14185e93ddda77e7ffad1b617f7-2229294885.png"
  },
  {
    id: "d4",
    name: "Monster Energy",
    price: 4.13,
    stock: 10,
    description: "Monster Energy is a bold, high-performance energy drink crafted for those who live life at full throttle. Packed with a powerful blend of caffeine, B vitamins, taurine, and other energy-boosting ingredients, it delivers long-lasting energy, enhanced focus, and a smooth, refreshing taste. Whether you're hitting the gym, tackling a long workday, gaming, or chasing your next adventure, Monster Energy helps fuel your drive and keep you performing at your best.",
    image: "images/2GvxNat-1118042074 (1).jpg"
  }
];

/* =============================== SNACKS ============================== */

const SNACKS = [
  {
    id: "s1",
    name: "Toblerone",
    price: 7.73,
    stock: 3,
    description: "Mystery Toblerone.",
    image: "images/81tIVT2oi7L-4080776493.jpg"
  },
  {
    id: "s2",
    name: "Toxic waste blue sour candy",
    price: 4.00,
    stock: 2,
    description: "Very sour candy.",
    image: "images/OIP.webp"
  }
   ];

/* ================================ MERCH =============================== */

const MERCH = [
  {
    id: "m1",
    name: "Blocky BASIC Shirt",
    price: 20.00,
    stock: 9,
    description: "Available in sizes 12–13, Small, Medium and Large. Please leave a note with your preferred size, otherwise Medium will be sent. BASIC is my own skate clothing brand. I designed these shirts myself using CorelDRAW. Thanks for supporting my small business!",
    image: "images/il_794xN.8051077921_5kv0.jpg"
  },
  {
    id: "m2",
    name: "Basic Just Skate Shirt",
    price: 20.00,
    stock: 7,
    description: "Available in sizes 12–13, Small, Medium and Large. Please leave a note with your preferred size, otherwise Medium will be sent.",
    image: "images/il_794xN.8051113161_o5f3.jpg"
  },
  {
    id: "m3",
    name: "BASIC Graffiti Shirt",
    price: 20.00,
    stock: 10,
    description: "Available in sizes 12–13, Small, Medium and Large. Please leave a note with your preferred size, otherwise Medium will be sent.",
    image: "images/il_794xN.8045984673_riu9.jpg"
  }
];

const PRINTS = [
  {
    id: "p1",
    name: "mystery fidget",
    price: 9.99,
    stock: 5,
    description: "Mystery fidget guaranteed to keep you satisfied!",
    image: "images/il_680x540.6672671685_kpei-1168534162.jpg"
  },
  {
    id: "p2",
    name: "Twisty Gear Fidget",
    price: 7.00,
    stock: 4,
    description: "A compact, interlocking fidget toy made of multiple segments that form a circular, gear-like shape. It has a clean, matte finish and is designed to twist or move smoothly for a satisfying tactile feel.",
    image: "images/Screenshot 2026-07-06 223357.png"
  },
  {
    id: "p3",
    name: "	Flexi hammerhead shark",
    price: 8.43,
    stock: 3,
    description: "With its iconic hammer-shaped head and smooth articulated body this little shark is ready to swim to your door.",
    image: "images/Screenshot 2026-07-07 083110.png"
  },
  {
    id: "p4",
    name: "The Shooting Star ( Sensory Expanded Fidget Toy )",
    price: 13.63,
    stock: 2,
    description: "Meet the Shooting Star fidget!This design has a special feature that lets it spin up and down the handle like a passthrough fidget!.",
    image: "images/Screenshot 2026-07-07 134728.png"
  }
];
