function renderCartPage() {
  const items = Cart.detailed();
  const list = qs("[data-cart-page-items]");
  const summaryNode = qs("[data-cart-summary]");
  if (!items.length) {
    list.innerHTML = `<div class="empty-state"><i class="fa-solid fa-bag-shopping"></i><h3>Your cart is empty</h3><p>Start with a featured pick from the shop.</p><a class="btn" href="shop.html">Shop now</a></div>`;
  } else {
    list.innerHTML = items.map((item) => cartLineItem(item)).join("");
  }
  const summary = cartSummary();
  summaryNode.innerHTML = `
    <h2>Order summary</h2>
    <div class="summary-row"><span>Subtotal</span><strong>${currency.format(summary.subtotal)}</strong></div>
    <div class="summary-row"><span>Shipping</span><strong>${summary.shipping ? currency.format(summary.shipping) : "Free"}</strong></div>
    <div class="summary-row"><span>Estimated tax</span><strong>${currency.format(summary.tax)}</strong></div>
    <div class="coupon-box"><input class="field" placeholder="Promo code" aria-label="Promo code"><button class="btn btn-secondary" type="button">Apply</button></div>
    <div class="summary-row total"><span>Total</span><strong>${currency.format(summary.total)}</strong></div>
    <a class="btn btn-full ${items.length ? "" : "is-disabled"}" href="${items.length ? "checkout.html" : "shop.html"}">${items.length ? "Continue to checkout" : "Shop products"}</a>
    <p class="secure-note"><i class="fa-solid fa-shield-halved"></i><span>Demo checkout uses client-side validation only and does not process payment information.</span></p>
  `;
  bindCartControls(list);
}

document.addEventListener("DOMContentLoaded", renderCartPage);
document.addEventListener("cart:changed", renderCartPage);
