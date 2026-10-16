/* ============================================================
   HOME.JS — homepage only (needs main.js loaded first)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // Bestseller cards: cross-fade through each card's photos
  document.querySelectorAll(".car-card").forEach((card) => {
    const slides = card.querySelectorAll(".car-images img");
    if (!slides.length) return;

    let current = 0;
    slides[0].style.opacity = "1";
    setInterval(() => {
      slides[current].style.opacity = "0";
      current = (current + 1) % slides.length;
      slides[current].style.opacity = "1";
    }, 3000);
  });

  revealOnScroll(
    ".why-card, .plan-card, .car-card, .about-strip-img, .about-strip-text, .stat-item, .cta-inner",
  );
});
