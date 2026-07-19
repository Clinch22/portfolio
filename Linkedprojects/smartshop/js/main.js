function navMarkup() {
  return `
    <a class="brand" href="index.html" aria-label="SmartShop home">
      <span class="brand-mark"><i class="fa-solid fa-bolt"></i></span>
      <span>SmartShop</span>
    </a>
    <nav class="desktop-nav" aria-label="Primary navigation">
      <a href="index.html">Home</a>
      <a href="shop.html">Shop</a>
      <a href="cart.html">Cart</a>
      <a href="checkout.html">Checkout</a>
    </nav>
    <div class="nav-actions">
      <button class="icon-btn" data-open-search aria-label="Open search"><i class="fa-solid fa-magnifying-glass"></i></button>
      <a class="icon-btn badge-btn" href="shop.html#wishlist" aria-label="Wishlist"><i class="fa-regular fa-heart"></i><span data-wishlist-count>0</span></a>
      <button class="icon-btn badge-btn" data-open-cart aria-label="Open cart"><i class="fa-solid fa-bag-shopping"></i><span data-cart-count>0</span></button>
      <button class="icon-btn mobile-menu-btn" data-menu aria-label="Open menu"><i class="fa-solid fa-bars"></i></button>
    </div>
  `;
}

function footerMarkup() {
  return `
    <div class="footer-grid">
      <div>
        <a class="brand" href="index.html"><span class="brand-mark"><i class="fa-solid fa-bolt"></i></span><span>SmartShop</span></a>
        <p>A polished portfolio storefront built with semantic HTML, CSS, and vanilla JavaScript.</p>
      </div>
      <div>
        <h3>Explore</h3>
        <a href="shop.html">New arrivals</a>
        <a href="shop.html?category=Audio">Audio</a>
        <a href="shop.html?category=Home%20Office">Home office</a>
      </div>
      <div>
        <h3>Support</h3>
        <a href="cart.html">Shopping cart</a>
        <a href="checkout.html">Secure checkout</a>
        <a href="404.html">Help center</a>
      </div>
      <div>
        <h3>Newsletter</h3>
        <form class="newsletter">
          <input type="email" placeholder="Email address" aria-label="Email address" required>
          <button class="btn" type="submit">Join</button>
        </form>
      </div>
    </div>
    <p class="footer-bottom">Designed for portfolio presentation. No real purchases are processed.</p>
  `;
}

function setupShell() {
  qs(".site-header")?.insertAdjacentHTML("beforeend", navMarkup());
  qs(".site-footer")?.insertAdjacentHTML("beforeend", footerMarkup());

  document.body.insertAdjacentHTML("beforeend", `
    <aside class="cart-drawer" data-cart-drawer aria-label="Shopping cart" aria-hidden="true">
      <div class="drawer-panel">
        <div class="drawer-head">
          <h2>Your Cart</h2>
          <button class="icon-btn" data-close-cart aria-label="Close cart"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="drawer-items" data-drawer-items></div>
        <div class="drawer-total" data-drawer-total></div>
      </div>
    </aside>
    <div class="search-modal" data-search-modal aria-hidden="true">
      <div class="search-panel">
        <button class="icon-btn" data-close-search aria-label="Close search"><i class="fa-solid fa-xmark"></i></button>
        <label for="global-search">Search SmartShop</label>
        <input id="global-search" type="search" placeholder="Try headphones, laptop, chair">
        <div class="search-results" data-search-results></div>
      </div>
    </div>
  `);

  qsa("[data-open-cart]").forEach((button) => button.addEventListener("click", openCartDrawer));
  qsa("[data-close-cart]").forEach((button) => button.addEventListener("click", closeCartDrawer));
  qs("[data-open-search]")?.addEventListener("click", openSearch);
  qs("[data-close-search]")?.addEventListener("click", closeSearch);
  qs("[data-menu]")?.addEventListener("click", () => document.body.classList.toggle("menu-open"));
  qs(".newsletter")?.addEventListener("submit", (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    announce("Thanks for joining the SmartShop newsletter");
  });

  const search = qs("#global-search");
  search?.addEventListener("input", () => renderSearchResults(search.value));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCartDrawer();
      closeSearch();
    }
  });
  document.addEventListener("cart:changed", renderDrawer);
  renderDrawer();
  updateHeaderCounts();
}

function openCartDrawer() {
  renderDrawer();
  const drawer = qs("[data-cart-drawer]");
  drawer?.classList.add("is-open");
  drawer?.setAttribute("aria-hidden", "false");
}

function closeCartDrawer() {
  const drawer = qs("[data-cart-drawer]");
  drawer?.classList.remove("is-open");
  drawer?.setAttribute("aria-hidden", "true");
}

function openSearch() {
  const modal = qs("[data-search-modal]");
  modal?.classList.add("is-open");
  modal?.setAttribute("aria-hidden", "false");
  qs("#global-search")?.focus();
  renderSearchResults("");
}

function closeSearch() {
  const modal = qs("[data-search-modal]");
  modal?.classList.remove("is-open");
  modal?.setAttribute("aria-hidden", "true");
}

function renderSearchResults(term) {
  const results = qs("[data-search-results]");
  if (!results) return;
  const normalized = term.trim().toLowerCase();
  const matched = PRODUCTS.filter((product) => !normalized || product.name.toLowerCase().includes(normalized) || product.category.toLowerCase().includes(normalized)).slice(0, 5);
  results.innerHTML = matched.map((product) => `
    <a class="search-row" href="${productUrl(product.id)}">
      <img src="${product.image}" alt="${product.name}">
      <span>${product.name}<small>${product.category}</small></span>
      <strong>${currency.format(product.price)}</strong>
    </a>
  `).join("");
}

function renderDrawer() {
  const items = Cart.detailed();
  const list = qs("[data-drawer-items]");
  const total = qs("[data-drawer-total]");
  if (!list || !total) return;
  list.innerHTML = items.length ? items.map((item) => cartLineItem(item)).join("") : `<div class="empty-state"><i class="fa-solid fa-bag-shopping"></i><h3>Your cart is empty</h3><p>Find something sharp in the shop.</p></div>`;
  const summary = cartSummary();
  total.innerHTML = `
    <div><span>Subtotal</span><strong>${currency.format(summary.subtotal)}</strong></div>
    <a class="btn btn-full ${items.length ? "" : "is-disabled"}" href="${items.length ? "checkout.html" : "shop.html"}">${items.length ? "Checkout" : "Start shopping"}</a>
  `;
  bindCartControls(list);
}

document.addEventListener("DOMContentLoaded", setupShell);
