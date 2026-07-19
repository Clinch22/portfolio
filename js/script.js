const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

document.body.classList.add("loading");
window.addEventListener("load", () => {
  $(".loader")?.classList.add("hidden");
  document.body.classList.remove("loading");
});

const header = $(".site-header");
const backTop = $(".back-top");
const setScrolled = () => {
  header?.classList.toggle("scrolled", scrollY > 20);
  backTop?.classList.toggle("show", scrollY > 420);
};
setScrolled();
addEventListener("scroll", setScrolled, { passive: true });

$(".menu-toggle")?.addEventListener("click", () => {
  $(".nav-links")?.classList.toggle("open");
});

$$(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => $(".nav-links")?.classList.remove("open"));
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .16 });
$$(".reveal").forEach((el) => revealObserver.observe(el));

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count || 0);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 45));
    const tick = () => {
      current = Math.min(target, current + step);
      el.textContent = current + (el.dataset.suffix || "");
      if (current < target) requestAnimationFrame(tick);
    };
    tick();
    counterObserver.unobserve(el);
  });
}, { threshold: .5 });
$$("[data-count]").forEach((el) => counterObserver.observe(el));

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    $$(".bar span", entry.target).forEach((bar) => {
      bar.style.width = bar.dataset.value || "80%";
    });
    skillObserver.unobserve(entry.target);
  });
}, { threshold: .22 });
$$(".skill-card").forEach((el) => skillObserver.observe(el));

$$(".btn").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const ripple = document.createElement("span");
    const rect = btn.getBoundingClientRect();
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height)}px`;
    ripple.style.left = `${event.clientX - rect.left - rect.width / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - rect.height / 2}px`;
    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });
});

if (matchMedia("(pointer: fine)").matches) {
  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);
  addEventListener("pointermove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });
}
