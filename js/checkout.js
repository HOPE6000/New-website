/* ============================================================
   CHECKOUT.JS — order summary + sending the order by email
   Needs: main.js, cart.js and the EmailJS library (loaded before this)
   ============================================================ */

if (window.emailjs) emailjs.init({ publicKey: "OIpobcGu-x3f5L92s" });

document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);
  const form = $("checkoutForm");
  const submitBtn = form.querySelector(".submit-btn");

  /* ---------- Order summary (re-renders whenever the cart changes) ---------- */

  function renderOrderSummary() {
    const cart = getCart();
    const isEmpty = cart.length === 0;

    $("summaryEmpty").hidden = !isEmpty;
    $("summaryFilled").hidden = isEmpty;
    submitBtn.disabled = isEmpty;
    if (isEmpty) return;

    $("summaryLines").innerHTML = cart
      .map((line) => cartLineHTML(line, "summary"))
      .join("");
    $("sumTotal").textContent = money(cartTotal());
  }

  bindCartActions($("summaryLines"));
  document.addEventListener("cart:updated", renderOrderSummary);
  renderOrderSummary();

  /* ---------- Sending the order ---------- */

  /** Show a status on the submit button, then restore it after `ms`.
      `state` is a CSS class from shared.css: "is-success" or "is-error". */
  function flashButton(text, state, ms) {
    const original = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = text;
    submitBtn.classList.add(state);

    setTimeout(() => {
      submitBtn.innerHTML = original;
      submitBtn.classList.remove(state);
      submitBtn.disabled = getCart().length === 0;
    }, ms);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Honeypot: a hidden field that only bots fill in
    if ($("website").value) return;

    const cart = getCart();
    if (cart.length === 0) return; // button is disabled when empty; safety net

    // The EmailJS template has a single "product" field, so every cart
    // line goes into one readable multi-line summary.
    const orderLines = cart
      .map(
        (l) =>
          `${l.qty} x ${l.name} (${l.colour}, ${l.size}) — ${money(l.price * l.qty)}`,
      )
      .join("\n");

    const original = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    // Promise.resolve().then() also routes a missing EmailJS library to .catch()
    Promise.resolve()
      .then(() =>
        emailjs.send("service_oft329f", "template_pty6vkq", {
          full_name: $("fullName").value,
          email: $("email").value,
          phone: $("phone").value,
          product: orderLines,
          size: "",
          colour: "",
          qty: cartCount(),
          order_total: money(cartTotal()),
          address: $("address").value,
          payment: $("fPayment").value,
          details: $("details").value,
          time: new Date().toLocaleString(),
        }),
      )
      .then(() => {
        submitBtn.innerHTML = original; // flashButton restores from this text
        form.reset();
        clearCart(); // fires cart:updated → summary switches to "cart is empty"
        flashButton("✓ Order Sent!", "is-success", 3000);
      })
      .catch((error) => {
        console.error(error);
        submitBtn.innerHTML = original;
        flashButton("Failed — WhatsApp Us Instead", "is-error", 5000);
      });
  });
});
