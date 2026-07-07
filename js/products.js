/* =====================================================================
   WATERSIDE STORE — PRODUCTS & SETTINGS
   =====================================================================
   THIS IS THE ONLY FILE YOU NEED TO EDIT DAY-TO-DAY.

   HOW TO ADD A PRODUCT:
   1. Copy one of the blocks between { and }, including the comma.
   2. Paste it into the correct list (groceries or prints).
   3. Change the id (must be unique), name, price, description, image.
   4. Put the product photo into the /images folder and write its
      file name in "image" (e.g. "images/my-photo.jpg").
      If you don't have a photo yet, use "images/placeholder-grocery.svg"
      or "images/placeholder-print.svg".
   5. Save the file and re-upload it to your hosting. Done.

   HOW TO REMOVE A PRODUCT: delete its whole { ... }, block.
   HOW TO CHANGE A PRICE:   just change the number (use a dot: 4.50).
   ===================================================================== */

const STORE_SETTINGS = {
  storeName: "Waterside Store",

  // Currency shown on the site
  currencySymbol: "€",
  currencyCode: "EUR", // used for the PayPal payment link

  // --- PAYMENTS: PUT YOUR OWN USERNAMES HERE ---------------------------
  // PayPal:  create a link at https://paypal.me  -> put the username here
  // Revolut: find your link in the Revolut app (Profile -> Revolut Me)
  paypalUsername: "chachachakc@gmail.com",
  revolutUsername: "@marcinhev9",

  // --- ORDER EMAILS ----------------------------------------------------
  // Orders are emailed to this address via formsubmit.co (free service).
  // IMPORTANT: the FIRST order you ever send will trigger a confirmation
  // email from FormSubmit to this inbox — click "Activate" in it once,
  // and every order after that arrives automatically.
  orderEmail: "a.k1is1cool@gmail.com"
};

/* ============================ GROCERIES ============================ */

const GROCERIES = [
  {
    id: "g1",
    name: "Free-Range Eggs (box of 12) ",
    price: 9.63,
    description: "Large free-range eggs.",
    image: "images/eggs12-3-1682093471.jpg"
  },
  {
    id: "g2",
    name: "White bread",
    price: 5.43,
    description: "Fresh loaf of delicious bread.",
    image: "images/DSC_9293-1087x1536-817940156.jpg"
  },
  {
    id: "g3",
    name: "Irish Butter 227g",
    price: 4.89,
    description: " Rich, creamy Butter.",
    image: "images/bob.jpg"
  },
  {
	id: "g4",
    name: "KitKat Original",
    price: 3.95,
    description: "Delicious creamy chocolate waffer with a crunch.",
    image:"images/kitkat-kitkat.jpg"
  },
   {
    id: "g5",
    name: "RedBull energy",    
	price: 4.65,
    description: " ( +15c recycling deposit ) Feeling tired? Have a cold redbull to boost your energy.",
    image: "images/t4hj.jpg"
	},
	{id: "g6",
    name: "CoCa Cola",     
	price: 4.65,
    description: " ( +15c recycling deposit ) Coca-Cola is a refreshing, carbonated soft drink renowned for its crisp taste and signature blend of sweet caramel and subtle spice flavors. Served ice-cold, it delivers a smooth, bubbly experience that has made it one of the world's most popular beverages. Perfect for enjoying on its own or pairing with meals, Coca-Cola offers a refreshing taste that suits any occasion, from everyday moments to celebrations with family and friends..",
    image:"images/interior_img3+10.16.27-original-3931983675.jpg",
	},
	{id: "g7",
    name: "Fanta Orange",    
	price: 4.65,
    description: " ( +15c recycling deposit ) Fanta Orange is a vibrant, fruit-flavored carbonated soft drink bursting with bold, refreshing orange taste and lively fizz. Its bright citrus flavor and crisp bubbles make it a fun and refreshing choice for any occasion. Best served chilled, Fanta Orange is perfect for enjoying on its own, with meals, or as a refreshing treat to brighten your day.",
    image:"images/7f7d371f37ff89341684f1e571762575-1214081714.jpg"
	},
	{ 
	id: "g8",
    name: "Monster Energy",    
	price: 4.65,
    description: "( +15c recycling deposit ) Monster Energy is a bold, high-performance energy drink crafted for those who live life at full throttle. Packed with a powerful blend of caffeine, B vitamins, taurine, and other energy-boosting ingredients, it delivers long-lasting energy, enhanced focus, and a smooth, refreshing taste. Whether you're hitting the gym, tackling a long workday, gaming, or chasing your next adventure, Monster Energy helps fuel your drive and keep you performing at your best..",
    image:"images/2GvxNat-1118042074 (1).jpg"
	}
	];
/* ============================ 3D PRINTS ============================ */

const PRINTS = [
  {
    id: "p1",
    name: "mystery fidget",
    price: 9.99,
    description: "Mystery fidget gaurenteed to keep you satisfied!",
    image: "images/il_680x540.6672671685_kpei-1168534162.jpg"
  },
  {
    id: "p2",
    name: "Twisty Gear Fidget",
    price: 7.00,
    description: "A compact, interlocking fidget toy made of multiple segments that form a circular, gear-like shape. It has a clean, matte finish and is designed to twist or move smoothly for a satisfying tactile feel.",
    image: "images/Screenshot 2026-07-06 223357.png"
  },
  {
    id: "p3",
    name: "	Flexi hammerhead shark",
    price: 8.43,
    description: "With its iconic hammer-shaped head and smooth articulated body this little shark is ready to swim to your door.",
    image: "images/Screenshot 2026-07-07 083110.png"
  },
  {
    id: "p4",
    name: "The Shooting Star ( Sensory Expanded Fidget Toy )",
    price: 13.63,
    description: "Meet the Shooting Star fidget!This design has a special feature that lets it spin up and down the handle like a passthrough fidget!.",
    image: "images/Screenshot 2026-07-07 134728.png"
  }
];
