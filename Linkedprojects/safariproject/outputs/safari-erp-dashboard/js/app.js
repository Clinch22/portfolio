(function () {
  function toast(message) {
    const zone = document.getElementById("toastZone");
    if (!zone) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    zone.appendChild(el);
    setTimeout(() => el.remove(), 3600);
  }

  function updateClock() {
    const now = new Date();
    document.getElementById("currentDate").textContent = now.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    document.getElementById("clock").textContent = now.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }

  function initSidebar() {
    const toggle = document.getElementById("sidebarToggle");
    const overlay = document.getElementById("overlay");
    const closeMobile = () => {
      document.body.classList.remove("sidebar-open");
      overlay.classList.remove("open");
    };
    toggle?.addEventListener("click", () => {
      if (window.innerWidth < 981) {
        document.body.classList.toggle("sidebar-open");
        overlay.classList.toggle("open", document.body.classList.contains("sidebar-open"));
      } else {
        document.body.classList.toggle("sidebar-collapsed");
      }
    });
    overlay?.addEventListener("click", closeMobile);
    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", () => {
        document.querySelector(".menu a.active")?.classList.remove("active");
        link.classList.add("active");
        closeMobile();
      });
    });
  }

  function initButtons() {
    document.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", (event) => {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height)}px`;
        ripple.style.left = `${event.clientX - rect.left - rect.width / 2}px`;
        ripple.style.top = `${event.clientY - rect.top - rect.height / 2}px`;
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });

    document.getElementById("printDashboard")?.addEventListener("click", () => window.print());
    document.getElementById("fullscreenBtn")?.addEventListener("click", () => {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
    });
    document.getElementById("exportOrders")?.addEventListener("click", () => toast("Order export prepared as a CSV preview."));
    document.getElementById("fab")?.addEventListener("click", () => toast("Quick record action opened."));
  }

  function initLiveFeed() {
    setInterval(() => {
      const feed = document.getElementById("activityFeed");
      if (!feed || !window.SafariDashboard) return;
      const item = document.createElement("div");
      item.className = "timeline-item";
      item.innerHTML = `
        <span class="timeline-icon">${window.SafariDashboard.icon("bell")}</span>
        <p><strong>Live alert</strong><br>ERP module sync completed successfully.<br><small>Just now</small></p>
      `;
      feed.prepend(item);
      while (feed.children.length > 6) feed.lastElementChild.remove();
    }, 24000);
  }

  document.addEventListener("DOMContentLoaded", () => {
    window.SafariApp = { toast };
    window.SafariTheme?.initTheme();
    window.SafariDashboard?.init();
    window.SafariCalendar?.initCalendar();
    window.SafariNotifications?.initNotifications();
    window.SafariCharts?.renderAll();
    initSidebar();
    initButtons();
    initLiveFeed();
    updateClock();
    setInterval(updateClock, 1000);
    setTimeout(() => document.querySelector(".loading-screen")?.classList.add("hide"), 700);
    window.addEventListener("resize", () => window.SafariCharts?.renderAll());
    setTimeout(() => toast("Safari ERP dashboard is synchronized."), 1100);
  });
})();
