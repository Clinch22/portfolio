(function () {
  const notifications = [
    { title: "Order SO-1048 approved", time: "2 min ago" },
    { title: "Payment received from Kijani Foods", time: "8 min ago" },
    { title: "Inventory threshold reached: Diesel drums", time: "14 min ago" },
    { title: "New customer account created", time: "22 min ago" }
  ];

  function renderNotifications() {
    const list = document.getElementById("noticeList");
    if (!list) return;
    list.innerHTML = notifications.map((item) => `
      <div class="notice">
        <strong>${item.title}</strong>
        <span>${item.time}</span>
      </div>
    `).join("");
  }

  function initNotifications() {
    const button = document.getElementById("notificationsBtn");
    const panel = document.getElementById("notificationDropdown");
    renderNotifications();
    button?.addEventListener("click", () => {
      const open = panel.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
    });
    setInterval(() => {
      const sample = ["New payment captured", "Stock transfer completed", "Employee checked in", "Invoice exported"];
      notifications.unshift({ title: sample[Math.floor(Math.random() * sample.length)], time: "Just now" });
      notifications.length = Math.min(notifications.length, 5);
      renderNotifications();
    }, 18000);
  }

  window.SafariNotifications = { initNotifications };
})();
