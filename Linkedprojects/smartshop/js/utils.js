const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const store = {
  get(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function getProduct(id) {
  return PRODUCTS.find((product) => product.id === id) || PRODUCTS[0];
}

function productUrl(id) {
  return `product.html?id=${encodeURIComponent(id)}`;
}

function announce(message) {
  let region = qs("#live-region");
  if (!region) {
    region = document.createElement("div");
    region.id = "live-region";
    region.className = "sr-only";
    region.setAttribute("aria-live", "polite");
    document.body.appendChild(region);
  }
  region.textContent = message;
}

function renderStars(rating) {
  const full = Math.round(rating);
  return Array.from({ length: 5 }, (_, index) => index < full ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>').join("");
}

function createProductCard(product) {
  const wished = Wishlist.has(product.id);
  return `
    <article class="product-card" data-category="${product.category}" data-name="${product.name.toLowerCase()}">
      <a class="product-media" href="${productUrl(product.id)}" style="--accent:${product.accent}">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span>${product.badge}</span>
      </a>
      <div class="product-info">
        <div class="product-meta">
          <span>${product.category}</span>
          <span class="rating">${renderStars(product.rating)} ${product.rating}</span>
        </div>
        <h3><a href="${productUrl(product.id)}">${product.name}</a></h3>
        <p>${product.description}</p>
        <div class="product-actions">
          <strong>${currency.format(product.price)}</strong>
          <div>
            <button class="icon-btn wishlist-btn ${wished ? "is-active" : ""}" data-wishlist="${product.id}" aria-label="Toggle ${product.name} wishlist"><i class="fa-${wished ? "solid" : "regular"} fa-heart"></i></button>
            <button class="btn btn-small" data-add="${product.id}"><i class="fa-solid fa-bag-shopping"></i> Add</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function bindProductActions(scope = document) {
  qsa("[data-add]", scope).forEach((button) => {
    button.addEventListener("click", () => Cart.add(button.dataset.add));
  });
  qsa("[data-wishlist]", scope).forEach((button) => {
    button.addEventListener("click", () => {
      const active = Wishlist.toggle(button.dataset.wishlist);
      button.classList.toggle("is-active", active);
      button.innerHTML = `<i class="fa-${active ? "solid" : "regular"} fa-heart"></i>`;
      updateHeaderCounts();
    });
  });
}

function updateHeaderCounts() {
  const count = Cart.count();
  qsa("[data-cart-count]").forEach((node) => node.textContent = count);
  qsa("[data-wishlist-count]").forEach((node) => node.textContent = Wishlist.all().length);
}
