/* ============================================================
   MAIN.JS — behaviour shared by every page
   Load order on each page:  main.js → cart.js → page script
   ============================================================ */

/* ---------- Site settings (edit here, applies to every page) ---------- */

// TODO: replace the Instagram / Facebook / TikTok links with the real profile URLs.
const SOCIAL_LINKS = [
  {
    label: "Instagram",
    icon: "fa-brands fa-instagram",
    url: "https://www.instagram.com/",
  },
  {
    label: "Facebook",
    icon: "fa-brands fa-facebook-f",
    url: "https://www.facebook.com/",
  },
  {
    label: "TikTok",
    icon: "fa-brands fa-tiktok",
    url: "https://www.tiktok.com/",
  },
  {
    label: "WhatsApp",
    icon: "fa-brands fa-whatsapp",
    url: "https://wa.me/27843212744",
  },
];

/* ---------- Helpers other scripts can call ---------- */

/** Fade-and-slide elements in as they scroll into view. */
function revealOnScroll(selector) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      }),
    { threshold: 0.1 },
  );
  document.querySelectorAll(selector).forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

/* ---------- Header: scroll state + mobile menu ---------- */

function initHeader() {
  const header = document.getElementById("header");
  const toggle = document.getElementById("mobileToggle");
  const mobileNav = document.getElementById("mobileNav");

  window.addEventListener("scroll", () =>
    header.classList.toggle("scrolled", window.scrollY > 60),
  );

  const setMenu = (open) => {
    toggle.classList.toggle("open", open);
    mobileNav.classList.toggle("open", open);
  };
  toggle.addEventListener("click", () =>
    setMenu(!mobileNav.classList.contains("open")),
  );
  // Close the menu after any link inside it is tapped
  mobileNav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
}

/* ---------- Footer: social icons ---------- */

function initSocialLinks() {
  document.querySelectorAll("[data-social]").forEach((container) => {
    container.innerHTML = SOCIAL_LINKS.map(
      ({ label, icon, url }) =>
        `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${label}" title="${label}"><i class="${icon}"></i></a>`,
    ).join("");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initSocialLinks();
});
