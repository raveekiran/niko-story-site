document.documentElement.classList.add("js");

const revealItems = document.querySelectorAll(".reveal");
const moodCards = document.querySelectorAll(".mood-card");
const editCards = document.querySelectorAll(".edit-card");
const collectionCards = document.querySelectorAll(".collection-card");
const heroBg = document.querySelector(".hero-bg");
const heroBgFrames = document.querySelectorAll(".hero-bg-frame");
const heroThumbs = document.querySelectorAll(".hero-thumb");
const spotlightTitle = document.querySelector("#spotlight-title");
const spotlightText = document.querySelector("#spotlight-text");
const spotlightImage = document.querySelector("#spotlight-image");
const editSpotlightTitle = document.querySelector("#edit-spotlight-title");
const editSpotlightText = document.querySelector("#edit-spotlight-text");
const editSpotlightLink = document.querySelector("#edit-spotlight-link");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

function activateMood(card) {
  moodCards.forEach((item) => item.classList.toggle("is-active", item === card));
  if (spotlightTitle && spotlightText && spotlightImage) {
    spotlightTitle.textContent = card.dataset.title;
    spotlightText.textContent = card.dataset.copy;
    spotlightImage.src = card.dataset.image;
    spotlightImage.alt = card.querySelector("h3").textContent;
  }
  document.documentElement.style.setProperty("--accent", card.dataset.accent);
}

moodCards.forEach((card) => {
  card.addEventListener("mouseenter", () => activateMood(card));
  card.addEventListener("focus", () => activateMood(card));
  card.addEventListener("click", () => activateMood(card));
  card.tabIndex = 0;
});

function activateEdit(card, shouldScroll = false) {
  const targetId = card.dataset.target;
  const target = document.querySelector(`#${targetId}`);

  editCards.forEach((item) => item.classList.toggle("is-active", item === card));
  collectionCards.forEach((item) =>
    item.classList.toggle("is-featured", item.id === targetId)
  );

  editSpotlightTitle.textContent = card.dataset.title;
  editSpotlightText.textContent = card.dataset.copy;
  editSpotlightLink.href = `#${targetId}`;

  if (shouldScroll && target) {
    target.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

editCards.forEach((card) => {
  card.addEventListener("mouseenter", () => activateEdit(card));
  card.addEventListener("focus", () => activateEdit(card));
  card.addEventListener("click", () => activateEdit(card, true));
});

function activateHeroFrame(button) {
  if (!heroBg) return;

  const targetFrame = button.dataset.frame;
  heroBg.classList.add("is-manual");

  heroThumbs.forEach((item) => item.classList.toggle("is-active", item === button));
  heroBgFrames.forEach((frame) =>
    frame.classList.toggle("is-selected", frame.classList.contains(targetFrame))
  );
}

heroThumbs.forEach((button) => {
  button.addEventListener("mouseenter", () => activateHeroFrame(button));
  button.addEventListener("focus", () => activateHeroFrame(button));
  button.addEventListener("click", () => activateHeroFrame(button));
});
