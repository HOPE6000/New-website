/* ============================================================
   CART.JS — shared cart engine + slide-out drawer
   Loaded on EVERY page after main.js. The cart lives in
   localStorage so it survives navigation between pages.
   Whenever the cart changes a "cart:updated" event fires, so any
   page (e.g. Checkout) can re-render itself.
   ============================================================ */

const CART_KEY = "mom_cart_v1"; // unchanged so existing customers keep their cart

/* ---------- Small helpers ---------- */

const money = (amount) => "R" + amount;

const escapeHTML = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

/* ---------- Storage ---------- */

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    console.error("Cart read error", e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error("Cart save error", e);
  }
  renderCartUI();
  document.dispatchEvent(new CustomEvent("cart:updated"));
}

/* A line's identity is product + colour + size, so picking the same
   combination twice raises the quantity instead of adding a new row. */
const lineId = (item) => [item.key, item.colour, item.size].join("::");

/* ---------- Cart actions ---------- */

function addToCart(item) {
  const cart = getCart();
  const existing = cart.find((line) => lineId(line) === lineId(item));
  if (existing) existing.qty += item.qty;
  else cart.push(item);
  saveCart(cart);
}

function updateCartQty(id, qty) {
  const cart = getCart();
  const line = cart.find((l) => lineId(l) === id);
  if (!line) return;
  line.qty = Math.max(1, qty);
  saveCart(cart);
}

function removeFromCart(id) {
  saveCart(getCart().filter((line) => lineId(line) !== id));
}

/** +1 / -1 from the quantity buttons; dropping below 1 removes the line. */
function changeCartQty(id, delta) {
  const line = getCart().find((l) => lineId(l) === id);
  if (!line) return;
  if (line.qty + delta < 1) removeFromCart(id);
  else updateCartQty(id, line.qty + delta);
}

function clearCart() {
  saveCart([]);
}

const cartCount = () => getCart().reduce((sum, l) => sum + l.qty, 0);
const cartTotal = () => getCart().reduce((sum, l) => sum + l.qty * l.price, 0);

/* ---------- Shared line markup (drawer = "cart", checkout = "summary") ---------- */

function cartLineHTML(line, prefix) {
  const id = escapeHTML(lineId(line));
  return `
    <div class="${prefix}-line">
      <img src="${escapeHTML(line.image)}" alt="${escapeHTML(line.name)}" class="${prefix}-line-img">
      <div class="${prefix}-line-info">
        <span class="${prefix}-line-name">${escapeHTML(line.name)}</span>
        <span class="${prefix}-line-meta">${escapeHTML(line.colour)} · ${escapeHTML(line.size)}</span>
        <div class="${prefix}-line-qty">
          <button type="button" data-cart-action="minus" data-id="${id}">−</button>
          <span>${line.qty}</span>
          <button type="button" data-cart-action="plus" data-id="${id}">+</button>
        </div>
      </div>
      <div class="${prefix}-line-right">
        <span class="${prefix}-line-price">${money(line.price * line.qty)}</span>
        <button type="button" class="${prefix}-line-remove" data-cart-action="remove" data-id="${id}" aria-label="Remove"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`;
}

/** One click listener per list handles every +, − and remove button inside it. */
function bindCartActions(container) {
  container.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cart-action]");
    if (!btn) return;
    const { cartAction, id } = btn.dataset;
    if (cartAction === "plus") changeCartQty(id, 1);
    else if (cartAction === "minus") changeCartQty(id, -1);
    else if (cartAction === "remove") removeFromCart(id);
  });
}

/* ---------- Drawer UI ---------- */

function buildDrawer() {
  if (document.getElementById("cartDrawer")) return;

  const overlay = document.createElement("div");
  overlay.id = "cartOverlay";
  overlay.className = "cart-overlay";

  const drawer = document.createElement("aside");
  drawer.id = "cartDrawer";
  drawer.className = "cart-drawer";
  drawer.innerHTML = `
    <div class="cart-drawer-head">
      <h3><i class="fa-solid fa-bag-shopping"></i> Your Cart</h3>
      <button type="button" id="cartCloseBtn" class="cart-close-btn" aria-label="Close cart">&times;</button>
    </div>
    <div class="cart-drawer-body" id="cartDrawerBody"></div>
    <div class="cart-drawer-foot">
      <div class="cart-subtotal-row">
        <span>Subtotal</span>
        <strong id="cartSubtotal">R0</strong>
      </div>
      <a href="Checkout.html" class="submit-btn cart-checkout-btn" id="cartCheckoutBtn">
        Proceed to Checkout <i class="fa-solid fa-arrow-right"></i>
      </a>
    </div>`;

  document.body.append(overlay, drawer);

  overlay.addEventListener("click", closeCart);
  document.getElementById("cartCloseBtn").addEventListener("click", closeCart);
  bindCartActions(document.getElementById("cartDrawerBody"));
}

function setCartOpen(open) {
  document.getElementById("cartDrawer").classList.toggle("open", open);
  document.getElementById("cartOverlay").classList.toggle("open", open);
  document.body.style.overflow = open ? "hidden" : "";
}
const openCart = () => setCartOpen(true);
const closeCart = () => setCartOpen(false);

function renderCartUI() {
  const count = cartCount();

  // Every nav badge on the page (desktop + mobile)
  document.querySelectorAll(".cart-count-badge").forEach((badge) => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  });

  const body = document.getElementById("cartDrawerBody");
  if (!body) return; // drawer not built yet on this page load

  const cart = getCart();

  body.innerHTML = cart.length
    ? cart.map((line) => cartLineHTML(line, "cart")).join("")
    : `
      <div class="cart-empty">
        <i class="fa-solid fa-bag-shopping"></i>
        <p>Your cart is empty.</p>
        <a href="Womens.html" class="text-link">Browse products <i class="fa-solid fa-arrow-right"></i></a>
      </div>`;

  document
    .getElementById("cartCheckoutBtn")
    .classList.toggle("disabled-link", cart.length === 0);
  document.getElementById("cartSubtotal").textContent = money(cartTotal());
}

document.addEventListener("DOMContentLoaded", () => {
  buildDrawer();

  document.querySelectorAll(".cart-nav-trigger").forEach((trigger) =>
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      openCart();
    }),
  );

  renderCartUI();
});
