(function () {
  const iconPaths = {
    layout: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    badge: '<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M8 17h8"/>',
    package: '<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h8.95a2 2 0 0 0 2-1.6l1.35-7.4H5.12"/>',
    trend: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    wallet: '<path d="M20 12V8H6a2 2 0 0 1 0-4h12v4"/><path d="M4 6v14a2 2 0 0 0 2 2h14v-6"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
    report: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h6"/>',
    calendar: '<path d="M8 2v4M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/>',
    settings: '<path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 8.6 19a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 5 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.44 3.9l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6A1.65 1.65 0 0 0 10.4 3V3a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 15.4 5a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.34.37.63.6.9.33.26.72.4 1.1.4H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51.7Z"/>',
    support: '<path d="M4 15a8 8 0 1 1 16 0"/><path d="M4 15v2a3 3 0 0 0 3 3h1v-7H7a3 3 0 0 0-3 3ZM20 15v2a3 3 0 0 1-3 3h-1v-7h1a3 3 0 0 1 3 3Z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
    printer: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>',
    expand: '<path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>',
    "chevron-left": '<path d="m15 18-6-6 6-6"/>',
    "chevron-right": '<path d="m9 18 6-6-6-6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>'
  };

  const orders = [
    ["SO-1048", "Kijani Foods", "Cold chain crates", 18420, "Completed", "2026-07-10"],
    ["SO-1047", "Mara Retail", "POS terminals", 9200, "Pending", "2026-07-10"],
    ["SO-1046", "Nakuru Depot", "Diesel drums", 27110, "Completed", "2026-07-09"],
    ["SO-1045", "Tana Logistics", "Packaging boxes", 4380, "Cancelled", "2026-07-09"],
    ["SO-1044", "Lamu Fresh", "Refrigerated crates", 12150, "Completed", "2026-07-08"],
    ["SO-1043", "Savannah Wholesale", "Barcode scanners", 6480, "Pending", "2026-07-08"],
    ["SO-1042", "Coast Mart", "Inventory tablets", 15300, "Completed", "2026-07-07"],
    ["SO-1041", "Highland Agro", "Storage pallets", 7980, "Pending", "2026-07-07"]
  ].map(([id, customer, product, amount, status, date]) => ({ id, customer, product, amount, status, date }));

  const inventory = [
    { image: "assets/images/product-crates.svg", name: "Cold Chain Crates", stock: 78, category: "Logistics", status: "In Stock" },
    { image: "assets/images/product-laptop.svg", name: "POS Terminals", stock: 44, category: "Retail Tech", status: "Reorder Soon" },
    { image: "assets/images/product-fuel.svg", name: "Diesel Drums", stock: 18, category: "Transport", status: "Low Stock" },
    { image: "assets/images/product-boxes.svg", name: "Packaging Boxes", stock: 63, category: "Warehouse", status: "In Stock" }
  ];

  const employees = [
    { image: "assets/images/avatar-amina.svg", name: "Amina Kariuki", department: "Operations", position: "ERP Manager", attendance: "Present" },
    { image: "assets/images/avatar-joel.svg", name: "Joel Mwangi", department: "Logistics", position: "Fleet Lead", attendance: "On Route" },
    { image: "assets/images/avatar-lina.svg", name: "Lina Otieno", department: "Finance", position: "Payroll Analyst", attendance: "Present" },
    { image: "assets/images/avatar-david.svg", name: "David Njoroge", department: "Inventory", position: "Warehouse Lead", attendance: "Present" }
  ];

  const activities = [
    ["New order", "SO-1048 created for Kijani Foods", "2 min ago", "cart"],
    ["Payment", "$18,420 captured through finance module", "6 min ago", "wallet"],
    ["Inventory", "Diesel drums crossed low-stock threshold", "13 min ago", "package"],
    ["Login", "Joel Mwangi checked in from mobile", "18 min ago", "badge"],
    ["Customer", "New account registered: Lamu Fresh", "24 min ago", "users"]
  ];

  const state = { page: 1, perPage: 5, sortKey: "date", sortDir: -1, query: "" };

  function icon(name) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.layout}</svg>`;
  }

  function injectIcons() {
    document.querySelectorAll("[data-icon]").forEach((el) => {
      el.innerHTML = icon(el.dataset.icon);
    });
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  }

  function renderOrders() {
    const body = document.getElementById("ordersBody");
    if (!body) return;
    const filtered = orders
      .filter((order) => Object.values(order).join(" ").toLowerCase().includes(state.query.toLowerCase()))
      .sort((a, b) => {
        const av = a[state.sortKey];
        const bv = b[state.sortKey];
        return av > bv ? state.sortDir : av < bv ? -state.sortDir : 0;
      });
    const pages = Math.max(1, Math.ceil(filtered.length / state.perPage));
    state.page = Math.min(state.page, pages);
    const start = (state.page - 1) * state.perPage;
    const rows = filtered.slice(start, start + state.perPage);
    body.innerHTML = rows.map((order) => `
      <tr>
        <td><strong>${order.id}</strong></td>
        <td>${order.customer}</td>
        <td>${order.product}</td>
        <td>${formatCurrency(order.amount)}</td>
        <td><span class="badge ${order.status.toLowerCase()}">${order.status}</span></td>
        <td>${order.date}</td>
      </tr>
    `).join("") || `<tr><td colspan="6">No orders match this search.</td></tr>`;
    document.getElementById("pageInfo").textContent = `Page ${state.page} of ${pages}`;
  }

  function renderInventory() {
    const grid = document.getElementById("inventoryGrid");
    if (!grid) return;
    grid.innerHTML = inventory.map((item) => `
      <article class="product-card">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <p>${item.category} • ${item.status}</p>
          <div class="progress" aria-label="${item.stock}% stock"><span style="width:${item.stock}%"></span></div>
          <div class="product-actions">
            <button aria-label="View ${item.name}">${icon("eye")}</button>
            <button aria-label="Edit ${item.name}">${icon("edit")}</button>
            <button aria-label="Delete ${item.name}">${icon("trash")}</button>
          </div>
        </div>
      </article>
    `).join("");
  }

  function renderEmployees() {
    const grid = document.getElementById("employeeGrid");
    if (!grid) return;
    grid.innerHTML = employees.map((person) => `
      <article class="employee-card">
        <span class="online-dot" aria-label="Online"></span>
        <img src="${person.image}" alt="${person.name}">
        <h3>${person.name}</h3>
        <p>${person.department}</p>
        <p>${person.position}</p>
        <span class="attendance">${person.attendance}</span>
      </article>
    `).join("");
  }

  function renderActivities() {
    const feed = document.getElementById("activityFeed");
    if (!feed) return;
    feed.innerHTML = activities.map(([title, detail, time, iconName]) => `
      <div class="timeline-item">
        <span class="timeline-icon">${icon(iconName)}</span>
        <p><strong>${title}</strong><br>${detail}<br><small>${time}</small></p>
      </div>
    `).join("");
  }

  function renderOrderBars() {
    const container = document.getElementById("ordersBars");
    if (!container) return;
    [58, 72, 46, 84, 69, 96, 75].forEach((value) => {
      const bar = document.createElement("span");
      bar.style.height = `${value}%`;
      container.appendChild(bar);
    });
  }

  function animateCounters() {
    document.querySelectorAll("[data-count]").forEach((el) => {
      const target = Number(el.dataset.count);
      const currency = el.textContent.includes("$");
      const startTime = performance.now();
      const step = (now) => {
        const progress = Math.min((now - startTime) / 1200, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        el.textContent = currency ? formatCurrency(value) : String(value);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  function initTable() {
    document.getElementById("orderSearch")?.addEventListener("input", (event) => {
      state.query = event.target.value;
      state.page = 1;
      renderOrders();
    });
    document.querySelectorAll("[data-sort]").forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.dataset.sort;
        state.sortDir = state.sortKey === key ? state.sortDir * -1 : 1;
        state.sortKey = key;
        renderOrders();
      });
    });
    document.getElementById("prevPage")?.addEventListener("click", () => {
      state.page = Math.max(1, state.page - 1);
      renderOrders();
    });
    document.getElementById("nextPage")?.addEventListener("click", () => {
      state.page += 1;
      renderOrders();
    });
  }

  function globalFilter() {
    const query = document.getElementById("globalSearch")?.value.toLowerCase() || "";
    document.querySelectorAll(".panel, .stat-card").forEach((el) => {
      el.style.display = el.textContent.toLowerCase().includes(query) || !query ? "" : "none";
    });
  }

  window.SafariDashboard = {
    init() {
      injectIcons();
      renderOrders();
      renderInventory();
      renderEmployees();
      renderActivities();
      renderOrderBars();
      initTable();
      animateCounters();
      document.getElementById("globalSearch")?.addEventListener("input", globalFilter);
    },
    icon
  };
})();
