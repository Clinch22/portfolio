const filterButtons = document.querySelectorAll("[data-filter]");
const designs = document.querySelectorAll("[data-category]");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    designs.forEach((design) => {
      design.style.display = filter === "all" || design.dataset.category === filter ? "inline-block" : "none";
    });
  });
});

const modal = document.querySelector(".modal");
const modalTitle = document.querySelector("[data-modal-title]");
const modalDesc = document.querySelector("[data-modal-desc]");
const modalMeta = document.querySelector("[data-modal-meta]");
const modalVisual = document.querySelector(".modal-visual");
designs.forEach((design) => {
  design.addEventListener("click", () => {
    if (!modal) return;
    modalTitle.textContent = design.dataset.title;
    modalDesc.textContent = design.dataset.description;
    modalMeta.textContent = `${design.dataset.software} / ${design.dataset.year} / ${design.dataset.category}`;
    const image = design.querySelector(".design-art img");
    modalVisual.innerHTML = image ? `<img src="${image.getAttribute("src")}" alt="${image.getAttribute("alt") || design.dataset.title}">` : design.querySelector(".design-art").innerHTML;
    modal.classList.add("open");
  });
});
document.querySelector(".modal-close")?.addEventListener("click", () => modal?.classList.remove("open"));
modal?.addEventListener("click", (event) => {
  if (event.target === modal) modal.classList.remove("open");
});
addEventListener("keydown", (event) => {
  if (event.key === "Escape") modal?.classList.remove("open");
});

