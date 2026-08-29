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

/* ---------- Hero banner (eyebrow + rotating photos come from STORE_SETTINGS) ---------- */
function renderHero() {
  var eyebrow = document.getElementById("hero-eyebrow");
  if (eyebrow) eyebrow.textContent = STORE_SETTINGS.heroEyebrow;

  var carousel = document.getElementById("hero-image-carousel");
  var images = STORE_SETTINGS.heroImages || [];
  if (!carousel || images.length === 0) return;

  carousel.innerHTML = images.map(function (img, i) {
    return '<img src="' + img.src + '" alt="' + (img.alt || "") + '" class="hero-slide' +
      (i === 0 ? " active" : "") + '" loading="' + (i === 0 ? "eager" : "lazy") + '">';
  }).join("");

  if (images.length > 1) {
    var slides = carousel.querySelectorAll(".hero-slide");
    var current = 0;
    var seconds = STORE_SETTINGS.heroSlideSeconds || 5;
    setInterval(function () {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, seconds * 1000);
  }
}
renderHero();

/* ---------- Helpers ---------- */
var CUR = STORE_SETTINGS.currencySymbol;

function money(n) {
  return CUR + n.toFixed(2);
}

function findProduct(id) {
  var all = NECESSITIES.concat(DRINKS, SNACKS, MERCH, PRINTS);
  for (var i = 0; i < all.length; i++) {
    if (all[i].id === id) return all[i];
  }
  return null;
}

/* ---------- Render products ---------- */
function productCard(p, accentClass) {
  var stock = typeof p.stock === "number" ? p.stock : 0;
  var stockLabel = stock > 0
    ? '<span class="stock-badge" data-stock-for="' + p.id + '">' + stock + ' in stock</span>'
    : '<span class="stock-badge stock-out" data-stock-for="' + p.id + '">Out of stock</span>';

  var images = (p.images && p.images.length) ? p.images : [p.image];
  var slidesHtml = images.map(function (src, i) {
    return '<img src="' + src + '" alt="' + p.name + '" class="card-slide' +
      (i === 0 ? " active" : "") + '" loading="lazy">';
  }).join("");

  var sliderControls = "";
  if (images.length > 1) {
    var dotsHtml = images.map(function (src, i) {
      return '<span class="card-dot' + (i === 0 ? " active" : "") + '" data-index="' + i + '"></span>';
    }).join("");
    sliderControls =
      '<button type="button" class="card-slide-btn card-slide-prev" data-slide-prev aria-label="Previous photo">&#8249;</button>' +
      '<button type="button" class="card-slide-btn card-slide-next" data-slide-next aria-label="Next photo">&#8250;</button>' +
      '<div class="card-dots">' + dotsHtml + '</div>';
  }

  return (
    '<article class="card reveal ' + accentClass + '">' +
      '<div class="card-img"' + (images.length > 1 ? ' data-multi' : '') + ' data-product-id="' + p.id + '">' +
        '<div class="card-slides">' + slidesHtml + '</div>' +
        sliderControls +
      '</div>' +
      '<div class="card-body">' +
        '<h3>' + p.name + '</h3>' +
        '<p>' + p.description + '</p>' +
        stockLabel +
        '<div class="card-foot">' +
          '<span class="price">' + money(p.price) + '</span>' +
          '<button class="btn btn-add" data-id="' + p.id + '"' + (stock === 0 ? ' disabled' : '') + '>' +
            (stock === 0 ? 'Out of stock' : 'Add to basket') +
          '</button>' +
        '</div>' +
      '</div>' +
    '</article>'
  );
}

function renderProducts() {
  var n = document.getElementById("grid-necessities");
  var d = document.getElementById("grid-drinks");
  var s = document.getElementById("grid-snacks");
  var m = document.getElementById("grid-merch");
  var p = document.getElementById("grid-prints");
  n.innerHTML = NECESSITIES.map(function (x) { return productCard(x, "card-necessities"); }).join("");
  d.innerHTML = DRINKS.map(function (x) { return productCard(x, "card-drinks"); }).join("");
  s.innerHTML = SNACKS.map(function (x) { return productCard(x, "card-snacks"); }).join("");
  m.innerHTML = MERCH.map(function (x) { return productCard(x, "card-merch"); }).join("");
  p.innerHTML = PRINTS.map(function (x) { return productCard(x, "card-prints"); }).join("");
}
renderProducts();
initProductSliders();
initScrollReveal();

/* ---------- Product photo sliders (manual only — no auto-play) ---------- */
function goToCardSlide(container, index) {
  var slides = container.querySelectorAll(".card-slide");
  if (!slides.length) return;
  index = ((index % slides.length) + slides.length) % slides.length;
  slides.forEach(function (s, i) { s.classList.toggle("active", i === index); });
  var dots = container.querySelectorAll(".card-dot");
  dots.forEach(function (d, i) { d.classList.toggle("active", i === index); });
  container.dataset.current = index;
}

function initProductSliders() {
  document.querySelectorAll(".card-img[data-multi]").forEach(function (container) {
    container.dataset.current = "0";
  });
}

/* Prev/next arrows + dot clicks (event delegation) */
document.addEventListener("click", function (e) {
  var prevBtn = e.target.closest("[data-slide-prev]");
  if (prevBtn) {
    e.preventDefault();
    e.stopPropagation();
    var containerP = prevBtn.closest(".card-img");
    var curP = parseInt(containerP.dataset.current || "0", 10);
    goToCardSlide(containerP, curP - 1);
    return;
  }
  var nextBtn = e.target.closest("[data-slide-next]");
  if (nextBtn) {
    e.preventDefault();
    e.stopPropagation();
    var containerN = nextBtn.closest(".card-img");
    var curN = parseInt(containerN.dataset.current || "0", 10);
    goToCardSlide(containerN, curN + 1);
    return;
  }
  var dotBtn = e.target.closest(".card-dot");
  if (dotBtn && !dotBtn.closest(".lightbox-box")) {
    e.preventDefault();
    e.stopPropagation();
    var containerD = dotBtn.closest(".card-img");
    goToCardSlide(containerD, parseInt(dotBtn.dataset.index, 10));
    return;
  }
  var slideImg = e.target.closest(".card-slide");
  if (slideImg) {
    var containerI = slideImg.closest(".card-img");
    if (containerI) {
      var pid = containerI.getAttribute("data-product-id");
      var prod = findProduct(pid);
      if (prod) {
        var images = (prod.images && prod.images.length) ? prod.images : [prod.image];
        var startIndex = parseInt(containerI.dataset.current || "0", 10);
        openLightbox(images, startIndex, prod.name);
      }
    }
  }
});

/* ---------- Product photo lightbox ---------- */
function openLightbox(images, startIndex, caption) {
  closeLightbox(); // just in case one is already open

  var overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.id = "lightbox-overlay";

  var slidesHtml = images.map(function (src, i) {
    return '<img src="' + src + '" alt="' + caption + '" class="lightbox-slide' +
      (i === startIndex ? " active" : "") + '">';
  }).join("");

  var navHtml = "";
  var dotsHtml = "";
  if (images.length > 1) {
    navHtml =
      '<button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous photo">&#8249;</button>' +
      '<button type="button" class="lightbox-nav lightbox-next" aria-label="Next photo">&#8250;</button>';
    dotsHtml = '<div class="lightbox-dots">' + images.map(function (src, i) {
      return '<span class="card-dot' + (i === startIndex ? " active" : "") + '" data-index="' + i + '"></span>';
    }).join("") + '</div>';
  }

  overlay.innerHTML =
    '<div class="lightbox-box">' +
      '<div class="lightbox-frame">' +
        slidesHtml +
        navHtml +
        '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
      '</div>' +
      '<p class="lightbox-caption">' + caption + '</p>' +
      dotsHtml +
    '</div>';

  document.body.appendChild(overlay);
  overlay.dataset.current = startIndex;

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) { closeLightbox(); return; }
    if (e.target.closest(".lightbox-close")) { closeLightbox(); return; }
    if (e.target.closest(".lightbox-prev")) { lightboxGo(overlay, -1); return; }
    if (e.target.closest(".lightbox-next")) { lightboxGo(overlay, 1); return; }
    var dot = e.target.closest(".card-dot");
    if (dot) { lightboxGoTo(overlay, parseInt(dot.dataset.index, 10)); }
  });

  document.addEventListener("keydown", lightboxKeyHandler);
}

function lightboxGo(overlay, delta) {
  var slides = overlay.querySelectorAll(".lightbox-slide");
  var cur = parseInt(overlay.dataset.current || "0", 10);
  lightboxGoTo(overlay, cur + delta, slides.length);
}

function lightboxGoTo(overlay, index, len) {
  var slides = overlay.querySelectorAll(".lightbox-slide");
  var count = len || slides.length;
  index = ((index % count) + count) % count;
  slides.forEach(function (s, i) { s.classList.toggle("active", i === index); });
  overlay.querySelectorAll(".lightbox-dots .card-dot").forEach(function (d, i) {
    d.classList.toggle("active", i === index);
  });
  overlay.dataset.current = index;
}

function lightboxKeyHandler(e) {
  var overlay = document.getElementById("lightbox-overlay");
  if (!overlay) return;
  if (e.key === "Escape") { closeLightbox(); }
  else if (e.key === "ArrowLeft") { lightboxGo(overlay, -1); }
  else if (e.key === "ArrowRight") { lightboxGo(overlay, 1); }
}

function closeLightbox() {
  var overlay = document.getElementById("lightbox-overlay");
  if (overlay) overlay.remove();
  document.removeEventListener("keydown", lightboxKeyHandler);
}

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

/* Keep the "X in stock" labels and Add buttons in sync with the basket */
function updateStockUI() {
  var all = NECESSITIES.concat(DRINKS, SNACKS, MERCH, PRINTS);
  all.forEach(function (p) {
    var total = typeof p.stock === "number" ? p.stock : 0;
    var inBasket = basket[p.id] || 0;
    var remaining = total - inBasket;

    var badge = document.querySelector('[data-stock-for="' + p.id + '"]');
    if (badge) {
      if (total === 0) {
        badge.textContent = "Out of stock";
        badge.classList.add("stock-out");
      } else if (remaining <= 0) {
        badge.textContent = "All " + total + " in your basket";
        badge.classList.add("stock-out");
      } else {
        badge.textContent = remaining + " in stock";
        badge.classList.remove("stock-out");
      }
    }

    var addBtn = document.querySelector('.btn-add[data-id="' + p.id + '"]');
    if (addBtn && addBtn.dataset.flash !== "1") {
      if (total === 0) {
        addBtn.disabled = true;
        addBtn.textContent = "Out of stock";
      } else if (remaining <= 0) {
        addBtn.disabled = true;
        addBtn.textContent = "Max in basket";
      } else {
        addBtn.disabled = false;
        addBtn.textContent = "Add to basket";
      }
    }
  });

  // Disable the "+" button in the basket once the stock limit is reached
  document.querySelectorAll("[data-plus]").forEach(function (btn) {
    var id = btn.getAttribute("data-plus");
    var p = findProduct(id);
    var total = p && typeof p.stock === "number" ? p.stock : 0;
    btn.disabled = (basket[id] || 0) >= total;
  });
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
    updateStockUI();
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
  updateStockUI();
}

/* Add-to-basket + quantity buttons (event delegation) */
document.addEventListener("click", function (e) {
  var t = e.target;
  if (t.matches(".btn-add") && !t.disabled) {
    var id = t.getAttribute("data-id");
    var prodA = findProduct(id);
    var stockA = prodA && typeof prodA.stock === "number" ? prodA.stock : 0;
    if ((basket[id] || 0) >= stockA) { renderBasket(); return; } // limit reached, nothing to do
    basket[id] = (basket[id] || 0) + 1;
    renderBasket();
    t.textContent = "Added ✓";
    t.dataset.flash = "1";
    setTimeout(function () {
      delete t.dataset.flash;
      updateStockUI(); // restores the correct label ("Add to basket" / "Max in basket")
    }, 900);
  }
  if (t.hasAttribute("data-plus") && !t.disabled) {
    var idP = t.getAttribute("data-plus");
    var prodP = findProduct(idP);
    var stockP = prodP && typeof prodP.stock === "number" ? prodP.stock : 0;
    if (basket[idP] >= stockP) return; // limit reached
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

/* =====================================================================
   FANCY EXTRAS — scroll reveals, hero bubbles, ripples, confetti,
   and a few easter eggs for the curious. Nothing here affects orders,
   products or pricing — purely decorative.
   ===================================================================== */

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  var els = document.querySelectorAll(".reveal:not(.observed)");
  if (!("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in-view"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  els.forEach(function (el) {
    el.classList.add("observed");
    io.observe(el);
  });
}
// Header/footer + category heads are already in the DOM at load time
document.addEventListener("DOMContentLoaded", initScrollReveal);
initScrollReveal();

/* ---------- Hero bubbles ---------- */
(function () {
  var field = document.getElementById("hero-particles");
  if (!field) return;
  var count = window.innerWidth < 640 ? 10 : 18;
  for (var i = 0; i < count; i++) {
    var b = document.createElement("span");
    b.className = "bubble";
    var size = (Math.random() * 10 + 4).toFixed(0) + "px";
    b.style.setProperty("--size", size);
    b.style.setProperty("--x", (Math.random() * 100).toFixed(1) + "%");
    b.style.setProperty("--dur", (Math.random() * 10 + 9).toFixed(1) + "s");
    b.style.setProperty("--delay", (Math.random() * 10).toFixed(1) + "s");
    b.style.setProperty("--drift", (Math.random() * 60 - 30).toFixed(0) + "px");
    field.appendChild(b);
  }
})();

/* ---------- Button ripple ---------- */
document.addEventListener("click", function (e) {
  var btn = e.target.closest(".btn");
  if (!btn) return;
  var rect = btn.getBoundingClientRect();
  var size = Math.max(rect.width, rect.height);
  var ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
  ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
  btn.appendChild(ripple);
  setTimeout(function () { ripple.remove(); }, 650);
});

/* ---------- Basket count "pop" + FAB glow whenever an item is added ---------- */
(function () {
  var origRenderBasket = renderBasket;
  var lastCount = 0;
  renderBasket = function () {
    origRenderBasket();
    var count = basketCount();
    var fab = document.getElementById("basket-fab");
    var badge = document.getElementById("basket-count");
    if (count > lastCount) {
      badge.classList.remove("pop");
      void badge.offsetWidth; // restart animation
      badge.classList.add("pop");
      fab.classList.remove("glow");
      void fab.offsetWidth;
      fab.classList.add("glow");
    }
    lastCount = count;
  };
})();

/* ---------- Confetti burst on order success ---------- */
function fireConfetti(customColors) {
  var colors = customColors || ["#b4924c", "#d3b271", "#6e958f", "#0f2027", "#f6f1e7"];
  var n = 60;
  for (var i = 0; i < n; i++) {
    (function () {
      var piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.left = (Math.random() * 100) + "vw";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = (Math.random() * 1.8 + 2.2) + "s";
      piece.style.transform = "rotate(" + (Math.random() * 360) + "deg)";
      if (Math.random() > 0.5) piece.style.borderRadius = "50%";
      document.body.appendChild(piece);
      setTimeout(function () { piece.remove(); }, 4200);
    })();
  }
}

// Hook into the existing showSuccess() to celebrate a completed order
(function () {
  var origShowSuccess = showSuccess;
  showSuccess = function (ref, total) {
    origShowSuccess(ref, total);
    fireConfetti();
  };
})();

/* =====================================================================
   EASTER EGGS
   1. Konami code           → secret discount modal + confetti
   2. Click the "W" logo 6x → it spins and a little boat sails past
   3. Type "splash" anywhere → a burst of water droplets
   ===================================================================== */

function showEggModal(emoji, title, message, codeText) {
  var overlay = document.createElement("div");
  overlay.className = "egg-overlay";
  overlay.innerHTML =
    '<div class="egg-modal">' +
      '<span class="egg-emoji">' + emoji + '</span>' +
      '<h3>' + title + '</h3>' +
      '<p>' + message + '</p>' +
      (codeText ? '<code>' + codeText + '</code><br>' : '') +
      '<button type="button" class="btn btn-green" id="egg-close">Lovely, thanks</button>' +
    '</div>';
  document.body.appendChild(overlay);
  function close() { overlay.remove(); }
  overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
  document.getElementById("egg-close").addEventListener("click", close);
  document.addEventListener("keydown", function esc(e) {
    if (e.key === "Escape") { close(); document.removeEventListener("keydown", esc); }
  });
}

/* 1. Konami code */
(function () {
  var sequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  var pos = 0;
  document.addEventListener("keydown", function (e) {
    var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === sequence[pos]) {
      pos++;
      if (pos === sequence.length) {
        pos = 0;
        fireConfetti();
        showEggModal("🌊", "You found the tide's secret!", "A little something for making it this far down the rabbit hole. Mention this code with your next order.", "TIDE-SECRET-10");
      }
    } else {
      pos = (key === sequence[0]) ? 1 : 0;
    }
  });
})();

/* 2. Click the logo 6 times quickly */
(function () {
  var clicks = 0;
  var timer = null;
  document.addEventListener("click", function (e) {
    var mark = e.target.closest(".brand-mark");
    if (!mark) return;
    clicks++;
    clearTimeout(timer);
    timer = setTimeout(function () { clicks = 0; }, 1600);
    mark.classList.remove("spin-once");
    void mark.offsetWidth;
    mark.classList.add("spin-once");
    if (clicks >= 6) {
      clicks = 0;
      sailBoat();
    }
  });
})();

function sailBoat() {
  var boat = document.createElement("div");
  boat.textContent = "⛵";
  boat.setAttribute("aria-hidden", "true");
  boat.style.position = "fixed";
  boat.style.top = "72px";
  boat.style.left = "-8vw";
  boat.style.fontSize = "2.4rem";
  boat.style.zIndex = "998";
  boat.style.pointerEvents = "none";
  boat.style.filter = "drop-shadow(0 6px 8px rgba(0,0,0,0.3))";
  boat.style.transition = "transform 4.5s linear, top 4.5s ease-in-out";
  document.body.appendChild(boat);
  requestAnimationFrame(function () {
    boat.style.transform = "translateX(118vw) rotate(-4deg)";
    boat.style.top = "58px";
  });
  setTimeout(function () { boat.remove(); }, 4700);
}

/* 3. Type "splash" anywhere (not while typing in a field) */
(function () {
  var word = "splash";
  var pos = 0;
  document.addEventListener("keydown", function (e) {
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return;
    var key = e.key.toLowerCase();
    if (key === word[pos]) {
      pos++;
      if (pos === word.length) {
        pos = 0;
        splashBurst();
      }
    } else {
      pos = (key === word[0]) ? 1 : 0;
    }
  });
})();

function splashBurst() {
  var n = 22;
  for (var i = 0; i < n; i++) {
    (function () {
      var drop = document.createElement("span");
      drop.textContent = "💧";
      drop.style.position = "fixed";
      drop.style.left = (Math.random() * 100) + "vw";
      drop.style.top = "-30px";
      drop.style.fontSize = (Math.random() * 14 + 12) + "px";
      drop.style.zIndex = "998";
      drop.style.pointerEvents = "none";
      drop.style.transition = "transform " + (Math.random() * 1 + 1.4) + "s cubic-bezier(.4,.6,.6,1), opacity 1.8s ease";
      document.body.appendChild(drop);
      requestAnimationFrame(function () {
        drop.style.transform = "translateY(" + (window.innerHeight + 60) + "px)";
        drop.style.opacity = "0.15";
      });
      setTimeout(function () { drop.remove(); }, 2200);
    })();
  }
}

/* A little something for anyone peeking at the console */
console.log(
  "%c⚓ Waterside Store %c— psst, try the Konami code, or click the logo a few times…",
  "color:#b4924c;font-size:16px;font-weight:bold;",
  "color:#6b7580;font-size:12px;"
);

/* =====================================================================
   FANCIER EXTRAS — ROUND 2
   Scroll progress, cursor dust, tilting cards, a magnetic basket,
   plus five more easter eggs on top of the original three.
   ===================================================================== */

/* ---------- Scroll progress bar ---------- */
(function () {
  var bar = document.getElementById("scroll-progress");
  if (!bar) return;
  function update() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    bar.style.width = pct + "%";
  }
  document.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

/* ---------- Cursor gold-dust trail (lightweight, throttled) ---------- */
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return; // skip on touch
  var last = 0;
  document.addEventListener("mousemove", function (e) {
    var now = Date.now();
    if (now - last < 55) return;
    last = now;
    var mote = document.createElement("span");
    mote.className = "dust-mote";
    mote.style.left = (e.clientX - 2) + "px";
    mote.style.top = (e.clientY - 2) + "px";
    document.body.appendChild(mote);
    setTimeout(function () { mote.remove(); }, 900);
  });
})();

/* ---------- 3D tilt on product cards ---------- */
(function () {
  if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return; // skip on touch
  document.addEventListener("mousemove", function (e) {
    var card = e.target.closest(".card");
    if (!card) return;
    var r = card.getBoundingClientRect();
    var px = (e.clientX - r.left) / r.width - 0.5;
    var py = (e.clientY - r.top) / r.height - 0.5;
    var rx = (-py * 8).toFixed(2);
    var ry = (px * 10).toFixed(2);
    card.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-6px) scale(1.015)";
  });
  document.addEventListener("mouseout", function (e) {
    var card = e.target.closest(".card");
    if (!card) return;
    if (e.relatedTarget && card.contains(e.relatedTarget)) return;
    card.style.transform = "";
  });
})();

/* ---------- Magnetic basket FAB ---------- */
(function () {
  var fab = document.getElementById("basket-fab");
  if (!fab || (window.matchMedia && window.matchMedia("(pointer: coarse)").matches)) return;
  var range = 70;
  document.addEventListener("mousemove", function (e) {
    var r = fab.getBoundingClientRect();
    var cx = r.left + r.width / 2;
    var cy = r.top + r.height / 2;
    var dx = e.clientX - cx;
    var dy = e.clientY - cy;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < range) {
      var pull = (1 - dist / range) * 0.35;
      fab.style.transform = "translate(" + (dx * pull) + "px," + (dy * pull) + "px)";
    } else {
      fab.style.transform = "";
    }
  });
})();

/* ---------- Toast helper (used by several easter eggs) ---------- */
function showEggToast(text) {
  var toast = document.createElement("div");
  toast.className = "egg-toast";
  toast.textContent = text;
  document.body.appendChild(toast);
  setTimeout(function () { toast.remove(); }, 3200);
}

/* =====================================================================
   MORE EASTER EGGS (4–8)
   4. Type "party"  → disco hue-shift mode + confetti
   5. Type "fish"   → a little school of fish swims across
   6. Triple-click the footer copyright → hidden credits card
   7. Long-press (hold ~1.2s) the basket button → treasure chest reward
   8. Idle 45s with no interaction → a jellyfish drifts by, once
   ===================================================================== */

/* Generic word-watcher, reused for "party" and "fish" so listeners
   don't fight each other over which key they're tracking. */
function watchForWord(word, callback) {
  var pos = 0;
  document.addEventListener("keydown", function (e) {
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return;
    var key = e.key.toLowerCase();
    if (key === word[pos]) {
      pos++;
      if (pos === word.length) { pos = 0; callback(); }
    } else {
      pos = (key === word[0]) ? 1 : 0;
    }
  });
}

/* 4. Party mode */
watchForWord("party", function () {
  document.body.classList.add("party-mode");
  fireConfetti();
  showEggToast("🪩 Party mode! Someone's excited about groceries.");
  setTimeout(function () { document.body.classList.remove("party-mode"); }, 6000);
});

/* 5. Fish school */
watchForWord("fish", function () {
  var n = 6;
  for (var i = 0; i < n; i++) {
    (function (i) {
      setTimeout(function () {
        var fish = document.createElement("span");
        fish.className = "egg-fish-school";
        fish.textContent = Math.random() > 0.5 ? "🐟" : "🐠";
        fish.style.setProperty("--fy", (8 + Math.random() * 60) + "vh");
        fish.style.setProperty("--fs", (1.1 + Math.random() * 1.2) + "rem");
        fish.style.animationDuration = (3 + Math.random() * 2) + "s";
        document.body.appendChild(fish);
        setTimeout(function () { fish.remove(); }, 5200);
      }, i * 160);
    })(i);
  }
});

/* 6. Triple-click footer credit → hidden credits card */
(function () {
  var credit = document.getElementById("footer-credit");
  var clicks = 0, timer = null;
  document.addEventListener("click", function (e) {
    if (!e.target.closest("#footer-credit")) return;
    clicks++;
    clearTimeout(timer);
    timer = setTimeout(function () { clicks = 0; }, 1200);
    if (clicks >= 3) {
      clicks = 0;
      var overlay = document.createElement("div");
      overlay.className = "egg-overlay";
      overlay.innerHTML =
        '<div class="egg-modal egg-credits">' +
          '<span class="egg-emoji">🌙</span>' +
          '<h3>Built by the water, at night</h3>' +
          '<p>Thanks for poking around. This little shop was pieced together with care — and a few too many cups of tea. Enjoy your shopping.</p>' +
          '<button type="button" class="btn btn-green" id="egg-close">Back to shopping</button>' +
        '</div>';
      document.body.appendChild(overlay);
      overlay.addEventListener("click", function (ev) { if (ev.target === overlay) overlay.remove(); });
      document.getElementById("egg-close").addEventListener("click", function () { overlay.remove(); });
    }
  });
  // Just in case the footer hasn't loaded yet when this runs, re-check via delegation above (closest handles late DOM insert fine).
  void credit;
})();

/* 7. Long-press the basket FAB → treasure chest reward */
(function () {
  var fab = document.getElementById("basket-fab");
  if (!fab) return;
  var pressTimer = null;
  var fired = false;

  function start(e) {
    fired = false;
    pressTimer = setTimeout(function () {
      fired = true;
      openTreasureChest(e);
    }, 1200);
  }
  function cancel() {
    clearTimeout(pressTimer);
  }
  fab.addEventListener("mousedown", start);
  fab.addEventListener("touchstart", start, { passive: true });
  ["mouseup", "mouseleave", "touchend", "touchcancel"].forEach(function (evt) {
    fab.addEventListener(evt, cancel);
  });
  // Prevent the long-press from also being treated as a normal basket-jump click
  fab.addEventListener("click", function (e) {
    if (fired) { e.preventDefault(); fired = false; }
  });
})();

function openTreasureChest(e) {
  var cx = window.innerWidth - 60;
  var cy = window.innerHeight - 60;
  var coins = 14;
  for (var i = 0; i < coins; i++) {
    (function () {
      var coin = document.createElement("span");
      coin.className = "egg-coin";
      coin.textContent = "🪙";
      coin.style.setProperty("--cx", cx + "px");
      coin.style.setProperty("--cy", cy + "px");
      coin.style.setProperty("--dx", (Math.random() * 220 - 260) + "px");
      coin.style.setProperty("--dy", (-(Math.random() * 180 + 60)) + "px");
      document.body.appendChild(coin);
      setTimeout(function () { coin.remove(); }, 1100);
    })();
  }
  fireConfetti(["#b4924c", "#d3b271", "#fff2cf"]);
  showEggToast("💰 Found the treasure! Ask us about our regulars' discount.");
}

/* 8. Idle jellyfish — a single ambient drift-by after 45s of no interaction */
(function () {
  var idleTimer = null;
  var shown = false;

  function spawnJellyfish() {
    if (shown) return;
    shown = true;
    var j = document.createElement("span");
    j.className = "egg-jellyfish";
    j.textContent = "🪼";
    j.style.top = (20 + Math.random() * 50) + "vh";
    document.body.appendChild(j);
    setTimeout(function () { j.remove(); }, 14200);
  }

  function resetIdle() {
    clearTimeout(idleTimer);
    if (!shown) idleTimer = setTimeout(spawnJellyfish, 45000);
  }

  ["mousemove", "keydown", "click", "scroll", "touchstart"].forEach(function (evt) {
    document.addEventListener(evt, resetIdle, { passive: true });
  });
  resetIdle();
})();
