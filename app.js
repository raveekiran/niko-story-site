document.documentElement.classList.add("js");

const revealItems = document.querySelectorAll(".reveal");
const signatureCards = document.querySelectorAll(".signature-card");
const shopCards = document.querySelectorAll(".shop-card");
const navToggle = document.querySelector(".nav-toggle");
const siteHeader = document.querySelector(".site-header");
const siteNavLinks = document.querySelectorAll(".site-nav a");

const signatureTitle = document.querySelector("#signature-title");
const signatureCopy = document.querySelector("#signature-copy");
const signatureColor = document.querySelector("#signature-color");
const signatureFinish = document.querySelector("#signature-finish");
const signatureNumber = document.querySelector("#signature-number");
const signatureImage = document.querySelector("#signature-image");

const shopTitle = document.querySelector("#shop-title");
const shopName = document.querySelector("#shop-name");
const shopCopy = document.querySelector("#shop-copy");
const shopFormats = document.querySelector("#shop-formats");
const shopCta = document.querySelector("#shop-cta");
const shopImage = document.querySelector("#shop-image");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

function activateSignature(card) {
  signatureCards.forEach((item) => item.classList.toggle("is-active", item === card));
  signatureTitle.textContent = card.dataset.title;
  signatureCopy.textContent = card.dataset.copy;
  signatureColor.textContent = card.dataset.color;
  signatureFinish.textContent = card.dataset.finish;
  signatureNumber.textContent = card.dataset.number;
  signatureImage.src = card.dataset.image;
  signatureImage.alt = `${card.dataset.color} signature shade`;
}

signatureCards.forEach((card) => {
  card.addEventListener("mouseenter", () => activateSignature(card));
  card.addEventListener("focus", () => activateSignature(card));
  card.addEventListener("click", () => activateSignature(card));
});

function activateShop(card) {
  shopCards.forEach((item) => item.classList.toggle("is-active", item === card));
  shopTitle.textContent = card.dataset.title;
  shopName.textContent = card.dataset.name;
  shopCopy.textContent = card.dataset.copy;
  shopFormats.textContent = card.dataset.formats;
  shopCta.textContent = card.dataset.cta;
  shopImage.src = card.dataset.image;
  shopImage.alt = card.dataset.name;
}

shopCards.forEach((card) => {
  card.addEventListener("mouseenter", () => activateShop(card));
  card.addEventListener("focus", () => activateShop(card));
  card.addEventListener("click", () => activateShop(card));
});

if (navToggle && siteHeader) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteHeader.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}
