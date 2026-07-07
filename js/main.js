/* =====================================================================
   WATERSIDE STORE — SITE LOGIC
   You should not need to edit this file. Products, prices and payment
   settings all live in js/products.js.
   ===================================================================== */

/* ---------- Load header & footer from /includes ---------- */
function loadInclude(id, file) {
  fetch(file)
    .then(function (r) { return r.text(); })
    .then(function (html) {
      document.getElementById(id).innerHTML = html;
    })
    .catch(function () {
      // Fails silently if opened directly from disk (file://).
      // Works normally once uploaded to hosting or run on a local server.
    });
}
loadInclude("site-header", "includes/header.html");
loadInclude("site-footer", "includes/footer.html");

/* ---------- Helpers ---------- */
var CUR = STORE_SETTINGS.currencySymbol;

function money(n) {
  return CUR + n.toFixed(2);
}

function findProduct(id) {
  var all = GROCERIES.concat(PRINTS);
  for (var i = 0; i < all.length; i++) {
    if (all[i].id === id) return all[i];
  }
  return null;
}

/* ---------- Render products ---------- */
function productCard(p, accentClass) {
  return (
    '<article class="card ' + accentClass + '">' +
      '<div class="card-img"><img src="' + p.image + '" alt="' + p.name + '" loading="lazy"></div>' +
      '<div class="card-body">' +
        '<h3>' + p.name + '</h3>' +
        '<p>' + p.description + '</p>' +
        '<div class="card-foot">' +
          '<span class="price">' + money(p.price) + '</span>' +
          '<button class="btn btn-add" data-id="' + p.id + '">Add to basket</button>' +
        '</div>' +
      '</div>' +
    '</article>'
  );
}

function renderProducts() {
  var g = document.getElementById("grid-groceries");
  var p = document.getElementById("grid-prints");
  g.innerHTML = GROCERIES.map(function (x) { return productCard(x, "card-green"); }).join("");
  p.innerHTML = PRINTS.map(function (x) { return productCard(x, "card-orange"); }).join("");
}
renderProducts();

/* ---------- Basket ---------- */
var basket = {}; // { productId: quantity }

function basketCount() {
  var n = 0;
  for (var id in basket) n += basket[id];
  return n;
}

function basketTotal() {
  var t = 0;
  for (var id in basket) {
    var prod = findProduct(id);
    if (prod) t += prod.price * basket[id];
  }
  return t;
}

function renderBasket() {
  var wrap = document.getElementById("basket-items");
  var totalBox = document.getElementById("basket-total");
  var fabCount = document.getElementById("basket-count");
  var ids = Object.keys(basket);

  fabCount.textContent = basketCount();

  if (ids.length === 0) {
    wrap.innerHTML = '<p class="basket-empty">Your basket is empty — add something from above.</p>';
    totalBox.hidden = true;
    return;
  }

  var html = "";
  ids.forEach(function (id) {
    var p = findProduct(id);
    if (!p) return;
    html +=
      '<div class="basket-row">' +
        '<span class="basket-name">' + p.name + '</span>' +
        '<span class="basket-qty">' +
          '<button class="qty-btn" data-minus="' + id + '" aria-label="Remove one">−</button>' +
          '<span>' + basket[id] + '</span>' +
          '<button class="qty-btn" data-plus="' + id + '" aria-label="Add one">+</button>' +
        '</span>' +
        '<span class="basket-price">' + money(p.price * basket[id]) + '</span>' +
      '</div>';
  });
  wrap.innerHTML = html;
  document.getElementById("basket-total-value").textContent = money(basketTotal());
  totalBox.hidden = false;
}

/* Add-to-basket + quantity buttons (event delegation) */
document.addEventListener("click", function (e) {
  var t = e.target;
  if (t.matches(".btn-add")) {
    var id = t.getAttribute("data-id");
    basket[id] = (basket[id] || 0) + 1;
    renderBasket();
    t.textContent = "Added ✓";
    setTimeout(function () { t.textContent = "Add to basket"; }, 900);
  }
  if (t.hasAttribute("data-plus")) {
    var idP = t.getAttribute("data-plus");
    basket[idP] += 1;
    renderBasket();
  }
  if (t.hasAttribute("data-minus")) {
    var idM = t.getAttribute("data-minus");
    basket[idM] -= 1;
    if (basket[idM] <= 0) delete basket[idM];
    renderBasket();
  }
});

/* ---------- Order text for the email ---------- */
function orderSummaryText() {
  var lines = [];
  for (var id in basket) {
    var p = findProduct(id);
    if (p) lines.push(basket[id] + " x " + p.name + " — " + money(p.price * basket[id]));
  }
  lines.push("TOTAL: " + money(basketTotal()));
  return lines.join("\n");
}

function makeOrderRef() {
  var d = new Date();
  return "WS-" +
    d.getFullYear().toString().slice(2) +
    String(d.getMonth() + 1).padStart(2, "0") +
    String(d.getDate()).padStart(2, "0") + "-" +
    Math.random().toString(36).slice(2, 6).toUpperCase();
}

/* ---------- Checkout / send order email ---------- */
var form = document.getElementById("order-form");
var errBox = document.getElementById("order-error");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  errBox.hidden = true;

  if (basketCount() === 0) {
    errBox.textContent = "Your basket is empty — add at least one product first.";
    errBox.hidden = false;
    return;
  }
  if (!form.checkValidity()) {
    errBox.textContent = "Please fill in all required fields (name, email, phone, address).";
    errBox.hidden = false;
    return;
  }

  var submitBtn = document.getElementById("order-submit");
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";

  var ref = makeOrderRef();
  var total = basketTotal();

  var payload = {
    _subject: "NEW ORDER " + ref + " — " + money(total),
    _template: "table",
    _captcha: "false",
    "Order number": ref,
    "Order": orderSummaryText(),
    "Total": money(total),
    "Name": form.name.value,
    "Email": form.email.value,
    "Phone": form.phone.value,
    "Address": form.address.value,
    "Delivery or collection": form.fulfilment.value,
    "Paying by": form.payment_method.value,
    "Notes": form.note.value || "—"
  };

  fetch("https://formsubmit.co/ajax/" + STORE_SETTINGS.orderEmail, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(function (r) {
      if (!r.ok) throw new Error("send-failed");
      return r.json();
    })
    .then(function () {
      showSuccess(ref, total);
    })
    .catch(function () {
      errBox.textContent = "Sorry — the order could not be sent. Please check your connection and try again, or call us.";
      errBox.hidden = false;
    })
    .finally(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send order";
    });
});

function showSuccess(ref, total) {
  form.hidden = true;
  var box = document.getElementById("order-success");
  box.hidden = false;

  document.getElementById("order-ref").textContent = ref;
  document.getElementById("order-amount").textContent = money(total);

  // PayPal.Me link with amount + currency pre-filled
  var paypal = "https://www.paypal.com/paypalme/" +
    STORE_SETTINGS.paypalUsername + "/" +
    total.toFixed(2) + STORE_SETTINGS.currencyCode;

  // Revolut.Me link (customer types the amount, shown above the button)
  var revolut = "https://revolut.me/" + STORE_SETTINGS.revolutUsername;

  var payBtnP = document.getElementById("pay-paypal");
  var payBtnR = document.getElementById("pay-revolut");
  payBtnP.href = paypal;
  payBtnR.href = revolut;

  // Highlight the method the customer chose
  var method = form.payment_method.value;
  payBtnP.style.order = method === "PayPal" ? "0" : "1";
  payBtnR.style.order = method === "Revolut" ? "0" : "1";

  box.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* Start a new order */
document.getElementById("new-order").addEventListener("click", function () {
  basket = {};
  renderBasket();
  form.reset();
  form.hidden = false;
  document.getElementById("order-success").hidden = true;
  document.getElementById("top").scrollIntoView({ behavior: "smooth" });
});

renderBasket();
