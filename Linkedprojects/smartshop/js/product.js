document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(location.search).get("id");
  const product = getProduct(id);
  document.title = `${product.name} | SmartShop`;
  const detail = qs("[data-product-detail]");
  const wished = Wishlist.has(product.id);
  detail.innerHTML = `
    <div class="detail-media reveal">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="detail-copy reveal">
      <span class="eyebrow">${product.category}</span>
      <h1>${product.name}</h1>
      <div class="rating">${renderStars(product.rating)} ${product.rating} rating</div>
      <p>${product.description}</p>
      <div class="price-row"><strong>${currency.format(product.price)}</strong><s>${currency.format(product.oldPrice)}</s><span>${product.stock} in stock</span></div>
      <div class="spec-grid">${product.specs.map((spec) => `<span><i class="fa-solid fa-check"></i> ${spec}</span>`).join("")}</div>
      <div class="hero-actions">
        <button class="btn" data-add="${product.id}"><i class="fa-solid fa-bag-shopping"></i> Add to cart</button>
        <button class="btn btn-secondary" data-wishlist="${product.id}"><i class="fa-${wished ? "solid" : "regular"} fa-heart"></i> ${wished ? "Saved" : "Save"}</button>
      </div>
    </div>
  `;
  bindProductActions(detail);
  const related = PRODUCTS.filter((item) => item.category === product.category && item.id !== product.id).concat(PRODUCTS.filter((item) => item.id !== product.id)).slice(0, 4);
  qs("[data-related]").innerHTML = related.map(createProductCard).join("");
  bindProductActions(qs("[data-related]"));
});
