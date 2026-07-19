(function () {
  const state = { date: new Date() };
  const events = new Set([3, 8, 12, 17, 22, 28]);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function renderCalendar() {
    const grid = document.getElementById("calendarGrid");
    const title = document.getElementById("calendarTitle");
    if (!grid || !title) return;

    const year = state.date.getFullYear();
    const month = state.date.getMonth();
    const first = new Date(year, month, 1).getDay();
    const count = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    title.textContent = state.date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
    grid.innerHTML = "";

    days.forEach((day) => {
      const el = document.createElement("div");
      el.className = "calendar-day";
      el.textContent = day;
      grid.appendChild(el);
    });

    for (let i = 0; i < first; i += 1) {
      grid.appendChild(document.createElement("span"));
    }

    for (let day = 1; day <= count; day += 1) {
      const button = document.createElement("button");
      button.className = "calendar-cell";
      button.textContent = day;
      button.setAttribute("aria-label", `Open tasks for ${day}`);
      if (events.has(day)) button.classList.add("has-event");
      if (today.getFullYear() === year && today.getMonth() === month && today.getDate() === day) {
        button.classList.add("today");
      }
      button.addEventListener("click", () => window.SafariApp?.toast(`Calendar opened for day ${day}.`));
      grid.appendChild(button);
    }
  }

  function initCalendar() {
    document.getElementById("prevMonth")?.addEventListener("click", () => {
      state.date.setMonth(state.date.getMonth() - 1);
      renderCalendar();
    });
    document.getElementById("nextMonth")?.addEventListener("click", () => {
      state.date.setMonth(state.date.getMonth() + 1);
      renderCalendar();
    });
    renderCalendar();
  }

  window.SafariCalendar = { initCalendar, renderCalendar };
})();
