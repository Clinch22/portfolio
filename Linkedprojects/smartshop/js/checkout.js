function renderCheckoutSummary() {
  const items = Cart.detailed();
  const summaryNode = qs("[data-checkout-summary]");
  if (!items.length) {
    summaryNode.innerHTML = `<div class="empty-state"><i class="fa-solid fa-cart-shopping"></i><h3>No items to checkout</h3><p>Add a product before placing an order.</p><a class="btn" href="shop.html">Browse products</a></div>`;
    return;
  }
  const summary = cartSummary();
  summaryNode.innerHTML = `
    <h2>Order summary</h2>
    ${items.map((item) => cartLineItem(item, true)).join("")}
    <div class="summary-row"><span>Subtotal</span><strong>${currency.format(summary.subtotal)}</strong></div>
    <div class="summary-row"><span>Shipping</span><strong>${summary.shipping ? currency.format(summary.shipping) : "Free"}</strong></div>
    <div class="summary-row"><span>Estimated tax</span><strong>${currency.format(summary.tax)}</strong></div>
    <div class="summary-row total"><span>Total</span><strong>${currency.format(summary.total)}</strong></div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCheckoutSummary();
  qsa(".payment-tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      qsa(".payment-tabs button").forEach((tab) => tab.classList.remove("is-active"));
      button.classList.add("is-active");
    });
  });
  qs("[data-checkout-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!Cart.count()) {
      announce("Add products before checking out");
      location.href = "shop.html";
      return;
    }
    Cart.clear();
    location.href = "success.html";
  });
});
