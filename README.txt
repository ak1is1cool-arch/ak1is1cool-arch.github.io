=========================================================
 WATERSIDE STORE — HOW TO SET UP, EDIT AND UPLOAD
=========================================================

WHAT'S IN THE FOLDER
--------------------
index.html              The main (and only) page
css/style.css           All colours, fonts and layout
js/products.js          <-- PRODUCTS, PRICES & SETTINGS (edit this one)
js/main.js              Site logic (no need to touch)
includes/header.html    The header (shop name, menu)
includes/footer.html    The footer (contact details, hours)
images/                 Product photos go here

3 THINGS TO DO BEFORE GOING LIVE
--------------------------------
1. PAYMENTS — open js/products.js and replace:
      paypalUsername:  "YOUR-PAYPAL-USERNAME"
      revolutUsername: "YOUR-REVOLUT-USERNAME"
   - PayPal: create your link at https://paypal.me (e.g. paypal.me/watersidestore
     means the username is "watersidestore").
   - Revolut: in the app go to Profile -> "Revolut Me" to see your link
     (e.g. revolut.me/marcink -> username is "marcink").

2. ACTIVATE ORDER EMAILS (one time only) — orders are emailed to
   a.k1is1cool@gmail.com through formsubmit.co (free, no account needed).
   After uploading the site, place ONE test order yourself.
   FormSubmit will send a confirmation email to a.k1is1cool@gmail.com —
   click "Activate" in that email once. Every order after that lands
   in the inbox automatically, formatted as a table with the order
   number, items, total, customer details and chosen payment method.

3. FOOTER DETAILS — open includes/footer.html and put in your real
   phone number and any opening/collection info.

HOW TO CHANGE THE TOP BANNER
-----------------------------
The banner now shows a slideshow of photos that fade from one to the
next. Open js/products.js and edit the HOMEPAGE BANNER section:

  heroEyebrow       the small line above the photos
  heroImages        the list of banner photos, e.g.
                       { src: "images/hero-1.jpg", alt: "Description" },
                       { src: "images/hero-2.jpg", alt: "Description" }
                     Add, remove or reorder entries to change the
                     slideshow. Put each photo in the /images folder
                     first and reference its file name in "src".
  heroSlideSeconds  how many seconds each photo stays up before
                     fading to the next (e.g. 5)

Just edit the list and re-upload the file (and any new photos).

HOW TO ADD OR EDIT PRODUCTS
---------------------------
Open js/products.js. There are five lists, one per section, shown on
the page left to right / top to bottom in this order:
  1. NECESSITIES  ("The Larder")
  2. DRINKS        ("The Cellar")
  3. SNACKS        ("The Tuck Shop")
  4. MERCH         ("The Emporium")
  5. PRINTS        ("The Atelier")

Each product looks like this:

  {
    id: "d5",                          <- must be unique across ALL lists
    name: "Organic Milk 1L",
    price: 2.89,                       <- use a dot, not a comma
    stock: 10,                         <- units you have on hand
    description: "Fresh from the farm.",
    image: "images/milk.jpg"           <- file name in the images folder
  },

To add:    copy a block, paste it in the list, change the details.
To edit:   change the text or price directly.
To remove: delete the whole { ... }, block.
Photos:    drop a .jpg or .png into the /images folder and reference it.
           No photo yet? Use "images/placeholder-grocery.svg" or
           "images/placeholder-print.svg".
Then re-upload the changed file(s) to your hosting.

STOCK LEVELS
------------
Every product has a "stock" number — how many you currently have.
It's shown on the product card (e.g. "8 in stock") and the customer
is not allowed to add more than that number to their basket; the
"Add to basket" button disables itself once the limit is reached.
Just edit the number whenever your stock changes and re-upload.

HOW ORDERS & PAYMENT WORK
-------------------------
1. Customer adds items to the basket and fills in the checkout form.
2. The order is emailed to you instantly with a unique order number
   (e.g. WS-260706-K3P9).
3. The customer sees PayPal and Revolut buttons for the total, and is
   told to put the order number in the payment reference.
4. You match the payment to the order and confirm by email.

UPLOADING TO HOSTING
--------------------
Upload the ENTIRE folder contents (keeping the folder structure) to
your hosting's public folder (usually called public_html, www or htdocs)
via the hosting file manager or FTP. That's it — no database, no PHP.

Note: the header/footer are loaded by the browser, so the site must be
viewed through hosting (or a local server) — opening index.html straight
from your desktop will show the page without the header and footer.
It also works perfectly on free static hosts (Netlify, Cloudflare
Pages, GitHub Pages).

CHANGING COLOURS
----------------
Open css/style.css — the colours are the variables at the very top
(--green, --orange, etc.). Change the hex codes and the whole site
updates.
