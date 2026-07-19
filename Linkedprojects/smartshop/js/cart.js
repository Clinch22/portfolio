const Cart = {
  key: "smartshop-cart",
  all() {
    return store.get(this.key, []);
  },
  save(items) {
    store.set(this.key, items);
    updateHeaderCounts();
    document.dispatchEvent(new CustomEvent("cart:changed"));
  },
  add(id, quantity = 1) {
    const items = this.all();
    const existing = items.find((item) => item.id === id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({ id, quantity });
    }
    this.save(items);
    const product = getProduct(id);
    announce(`${product.name} added to cart`);
    openCartDrawer();
  },
  remove(id) {
    this.save(this.all().filter((item) => item.id !== id));
  },
  update(id, quantity) {
    const next = this.all().map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item);
    this.save(next);
  },
  clear() {
    this.save([]);
  },
  detailed() {
    return this.all().map((item) => ({ ...getProduct(item.id), quantity: item.quantity }));
  },
  subtotal() {
    return this.detailed().reduce((total, item) => total + item.price * item.quantity, 0);
  },
  count() {
    return this.all().reduce((total, item) => total + item.quantity, 0);
  }
};

const Wishlist = {
  key: "smartshop-wishlist",
  all() {
    return store.get(this.key, []);
  },
  has(id) {
    return this.all().includes(id);
  },
  toggle(id) {
    const exists = this.has(id);
    const next = exists ? this.all().filter((item) => item !== id) : [...this.all(), id];
    store.set(this.key, next);
    announce(exists ? "Removed from wishlist" : "Saved to wishlist");
    return !exists;
  }
};

function cartSummary() {
  const subtotal = Cart.subtotal();
  const shipping = subtotal > 0 && subtotal < 300 ? 18 : 0;
  const tax = Math.round(subtotal * 0.082);
  return { subtotal, shipping, tax, total: subtotal + shipping + tax };
}

function cartLineItem(item, compact = false) {
  return `
    <div class="cart-line">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <span>${currency.format(item.price)} ${compact ? `x ${item.quantity}` : ""}</span>
        ${compact ? "" : `
          <div class="quantity">
            <button data-qty="${item.id}" data-step="-1" aria-label="Decrease ${item.name}">-</button>
            <strong>${item.quantity}</strong>
            <button data-qty="${item.id}" data-step="1" aria-label="Increase ${item.name}">+</button>
          </div>
        `}
      </div>
      ${compact ? `<strong>${currency.format(item.price * item.quantity)}</strong>` : `<button class="icon-btn" data-remove="${item.id}" aria-label="Remove ${item.name}"><i class="fa-solid fa-xmark"></i></button>`}
    </div>
  `;
}

function bindCartControls(scope = document) {
  qsa("[data-remove]", scope).forEach((button) => button.addEventListener("click", () => Cart.remove(button.dataset.remove)));
  qsa("[data-qty]", scope).forEach((button) => {
    button.addEventListener("click", () => {
      const current = Cart.all().find((item) => item.id === button.dataset.qty);
      Cart.update(button.dataset.qty, current.quantity + Number(button.dataset.step));
    });
  });
}
