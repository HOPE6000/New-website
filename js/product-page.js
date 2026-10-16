/* ============================================================
   PRODUCT-PAGE.JS — catalogue + product detail for Mens & Womens
   Needs: products-data.js, main.js, cart.js (loaded before this)
   The page picks its products with <body data-catalog="mens|womens">
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const catalog = document.body.dataset.catalog;
  const PRODUCTS = PRODUCT_CATALOGS[catalog];
  const $ = (id) => document.getElementById(id);

  let state = { key: null, colour: 0, size: null, qty: 1 };

  /* ---------- Small UI helpers ---------- */

  /** Mark one element in a group as the active one. */
  function setActive(group, selector, active) {
    group
      .querySelectorAll(selector)
      .forEach((el) => el.classList.toggle("active", el === active));
  }

  function showSizeError(show) {
    $("pdSizes").classList.toggle("size-error", show);
    $("pdSizeError").classList.toggle("visible", show);
  }

  function showToast(message) {
    let toast = $("pdToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "pdToast";
      toast.className = "pd-toast";
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    toast.classList.add("visible");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("visible"), 2500);
  }

  /* ---------- Catalogue grid ---------- */

  function renderCatalog() {
    const grid = $("catalogGrid");
    grid.innerHTML = Object.entries(PRODUCTS)
      .map(
        ([key, p]) => `
          <div class="catalog-card">
            <div class="catalog-img"><img src="${p.images[0]}" alt="${p.name}"></div>
            <div class="catalog-body">
              <span class="car-type">${p.category}</span>
              <h3 class="car-name">${p.name}</h3>
              <div class="catalog-bottom">
                <span class="price-num">R${p.price}</span>
                <button class="hire-btn select-product-btn" data-key="${key}">View Product</button>
              </div>
            </div>
          </div>`,
      )
      .join("");

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".select-product-btn");
      if (!btn) return;
      selectProduct(btn.dataset.key);
      $("product-detail").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ---------- Product detail panel ---------- */

  function renderGallery(p) {
    const main = $("pdMainImg");
    const thumbs = $("pdThumbs");
    main.src = p.images[0];
    main.alt = p.name;

    thumbs.innerHTML = "";
    p.images.forEach((src, i) => {
      const thumb = document.createElement("img");
      thumb.src = src;
      thumb.alt = `${p.name} view ${i + 1}`;
      thumb.className = i === 0 ? "active" : "";
      thumb.addEventListener("click", () => {
        main.src = src;
        setActive(thumbs, "img", thumb);
      });
      thumbs.appendChild(thumb);
    });
  }

  function renderColours(p) {
    const wrap = $("pdColours");
    wrap.innerHTML = "";
    p.colours.forEach((colour, i) => {
      const swatch = document.createElement("button");
      swatch.type = "button";
      swatch.className = "swatch" + (i === 0 ? " active" : "");
      swatch.style.background = colour.hex;
      swatch.title = colour.name;
      swatch.addEventListener("click", () => {
        state.colour = i;
        $("pdColourName").textContent = colour.name;
        setActive(wrap, ".swatch", swatch);
      });
      wrap.appendChild(swatch);
    });
    $("pdColourName").textContent = p.colours[0].name;
  }

  function renderSizes(p) {
    const wrap = $("pdSizes");
    wrap.innerHTML = "";
    p.sizes.forEach((size) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "size-btn";
      btn.textContent = size;
      btn.addEventListener("click", () => {
        state.size = size;
        setActive(wrap, ".size-btn", btn);
        showSizeError(false);
      });
      wrap.appendChild(btn);
    });
  }

  function selectProduct(key) {
    const p = PRODUCTS[key];
    if (!p) return;
    state = { key, colour: 0, size: null, qty: 1 };

    $("pdCategory").textContent = p.category;
    $("pdTitle").textContent = p.name;
    $("pdPrice").textContent = "R" + p.price;
    $("pdDetails").textContent = p.details;
    $("pdQtyVal").textContent = "1";

    renderGallery(p);
    renderColours(p);
    renderSizes(p);
    showSizeError(false);
  }

  /* ---------- Buying ---------- */

  function sizeIsSelected() {
    if (state.size) return true;
    showSizeError(true);
    $("pdSizes").scrollIntoView({ behavior: "smooth", block: "center" });
    return false;
  }

  function buildCartItem() {
    const p = PRODUCTS[state.key];
    return {
      key: `${catalog}-${state.key}`,
      name: p.name,
      price: p.price,
      colour: p.colours[state.colour].name,
      size: state.size,
      qty: state.qty,
      image: p.images[0],
    };
  }

  function changeQty(delta) {
    state.qty = Math.min(10, Math.max(1, state.qty + delta));
    $("pdQtyVal").textContent = state.qty;
  }

  /* ---------- Wire everything up ---------- */

  renderCatalog();

  $("pdQtyMinus").addEventListener("click", () => changeQty(-1));
  $("pdQtyPlus").addEventListener("click", () => changeQty(1));

  $("pdAddCartBtn").addEventListener("click", () => {
    if (!sizeIsSelected()) return;
    addToCart(buildCartItem());
    showToast("Added to cart");
  });

  $("pdBuyBtn").addEventListener("click", () => {
    if (!sizeIsSelected()) return;
    addToCart(buildCartItem());
    window.location.href = "Checkout.html";
  });

  // Pre-select a product when linked from the homepage (?item=training-hoodie)
  const urlItem = new URLSearchParams(window.location.search).get("item");
  selectProduct(
    urlItem && PRODUCTS[urlItem] ? urlItem : Object.keys(PRODUCTS)[0],
  );

  revealOnScroll(".catalog-card, .pd-gallery, .pd-info");
});
