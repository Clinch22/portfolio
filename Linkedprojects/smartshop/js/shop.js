let activeCategory = new URLSearchParams(location.search).get("category") || "All";

function renderFilters() {
  const filters = qs("[data-filters]");
  filters.innerHTML = CATEGORIES.map((category) => `
    <button class="pill ${category === activeCategory ? "is-active" : ""}" data-category="${category}">${category}</button>
  `).join("");
  qsa("[data-category]", filters).forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      renderProducts();
      renderFilters();
    });
  });
}

function filteredProducts() {
  const term = qs("[data-shop-search]").value.trim().toLowerCase();
  const sort = qs("[data-sort]").value;
  const products = PRODUCTS
    .filter((product) => activeCategory === "All" || product.category === activeCategory)
    .filter((product) => !term || product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term) || product.description.toLowerCase().includes(term));

  return products.sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return PRODUCTS.indexOf(a) - PRODUCTS.indexOf(b);
  });
}

function renderProducts() {
  const grid = qs("[data-products]");
  const empty = qs("[data-no-results]");
  const products = filteredProducts();
  grid.innerHTML = products.map(createProductCard).join("");
  empty.hidden = products.length > 0;
  bindProductActions(grid);
  renderWishlist();
}

function renderWishlist() {
  const grid = qs("[data-wishlist-products]");
  const empty = qs("[data-empty-wishlist]");
  const products = Wishlist.all().map(getProduct);
  grid.innerHTML = products.map(createProductCard).join("");
  empty.hidden = products.length > 0;
  bindProductActions(grid);
}

document.addEventListener("DOMContentLoaded", () => {
  renderFilters();
  renderProducts();
  qs("[data-shop-search]").addEventListener("input", renderProducts);
  qs("[data-sort]").addEventListener("change", renderProducts);
});
