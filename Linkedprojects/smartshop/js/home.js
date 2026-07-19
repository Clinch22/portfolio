document.addEventListener("DOMContentLoaded", () => {
  const featured = qs("[data-featured-products]");
  if (featured) {
    featured.innerHTML = PRODUCTS.slice(0, 4).map(createProductCard).join("");
    bindProductActions(featured);
  }

  qsa("[data-counter]").forEach((node) => {
    const target = Number(node.dataset.counter);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 32));
    const timer = setInterval(() => {
      current = Math.min(target, current + step);
      node.textContent = target === 98 ? `${current}%` : current;
      if (current >= target) clearInterval(timer);
    }, 32);
  });
});
