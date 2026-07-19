(function () {
  function initTheme() {
    const saved = localStorage.getItem("safari-theme");
    if (saved === "dark") document.body.classList.add("dark");
    document.getElementById("themeToggle")?.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("safari-theme", document.body.classList.contains("dark") ? "dark" : "light");
      window.SafariCharts?.renderAll();
      window.SafariApp?.toast("Theme preference updated.");
    });
  }

  window.SafariTheme = { initTheme };
})();
