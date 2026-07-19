const loader = document.getElementById("loader");
const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navPanel = document.getElementById("navPanel");
const navLinks = document.querySelectorAll(".nav-link");
const backTop = document.getElementById("backTop");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hidden"), 500);
});

const closeMenu = () => {
  navPanel.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
};

menuToggle.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const sections = [...document.querySelectorAll("section[id]")];

const setScrollState = () => {
  const scrolled = window.scrollY > 40;
  header.classList.toggle("scrolled", scrolled);
  backTop.classList.toggle("visible", window.scrollY > 500);

  let current = "home";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
};

window.addEventListener("scroll", setScrollState);
setScrollState();

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.querySelectorAll(".ripple").forEach((button) => {
  button.addEventListener("click", (event) => {
    const dot = document.createElement("span");
    const rect = button.getBoundingClientRect();
    dot.className = "ripple-dot";
    dot.style.left = `${event.clientX - rect.left}px`;
    dot.style.top = `${event.clientY - rect.top}px`;
    button.append(dot);
    dot.addEventListener("animationend", () => dot.remove());
  });
});

const counters = document.querySelectorAll(".counter");
let countersStarted = false;

const animateCounters = () => {
  if (countersStarted) return;
  countersStarted = true;

  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const duration = 1300;
    const startTime = performance.now();

    const update = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = counter.dataset.target === "98" ? `${value}%` : `${value}+`;
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  });
};

const statsObserver = new IntersectionObserver(
  (entries) => {
    if (entries.some((entry) => entry.isIntersecting)) animateCounters();
  },
  { threshold: 0.35 }
);

const statsBand = document.querySelector(".stats-band");
if (statsBand) statsObserver.observe(statsBand);

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.querySelector("i").className = isOpen ? "fa-solid fa-minus" : "fa-solid fa-plus";
  });
});

const testimonials = [...document.querySelectorAll(".testimonial")];
const dotsContainer = document.getElementById("testimonialDots");
const shell = document.getElementById("testimonialShell");
let testimonialIndex = 0;
let testimonialTimer;

const renderTestimonial = (index) => {
  testimonialIndex = (index + testimonials.length) % testimonials.length;
  testimonials.forEach((item, itemIndex) => {
    item.classList.toggle("active", itemIndex === testimonialIndex);
  });
  dotsContainer.querySelectorAll("button").forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === testimonialIndex);
  });
};

testimonials.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Show testimonial ${index + 1}`);
  dot.addEventListener("click", () => renderTestimonial(index));
  dotsContainer.append(dot);
});

document.getElementById("prevTestimonial").addEventListener("click", () => renderTestimonial(testimonialIndex - 1));
document.getElementById("nextTestimonial").addEventListener("click", () => renderTestimonial(testimonialIndex + 1));

const startTestimonials = () => {
  testimonialTimer = setInterval(() => renderTestimonial(testimonialIndex + 1), 4500);
};

const stopTestimonials = () => clearInterval(testimonialTimer);

shell.addEventListener("mouseenter", stopTestimonials);
shell.addEventListener("mouseleave", startTestimonials);
renderTestimonial(0);
startTestimonials();

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    lightboxImg.src = card.dataset.img;
    lightboxImg.alt = card.dataset.title;
    lightboxTitle.textContent = card.dataset.title;
    lightbox.classList.add("open");
  });
});

const closeLightbox = () => {
  lightbox.classList.remove("open");
  lightboxImg.src = "";
};

document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
    closeMenu();
  }
});

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.checkValidity()) {
    formMessage.textContent = "Please complete every field with valid contact information.";
    formMessage.style.color = "#ef4444";
    contactForm.reportValidity();
    return;
  }

  formMessage.textContent = "Thanks. Your request has been received.";
  formMessage.style.color = "#10b981";
  contactForm.reset();
});

const newsletterForm = document.getElementById("newsletterForm");
const newsletterMessage = document.getElementById("newsletterMessage");

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!newsletterForm.checkValidity()) {
    newsletterMessage.textContent = "Enter a valid email address.";
    return;
  }

  newsletterMessage.textContent = "Subscribed. Welcome to PrimeFix updates.";
  newsletterForm.reset();
});
