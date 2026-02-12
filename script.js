document.addEventListener("DOMContentLoaded", () => {
  const headerElement = document.querySelector(".site-header");

  function updateHeaderHeightCssVariable() {
    const headerHeight = headerElement ? headerElement.offsetHeight : 0;
    document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
  }

  updateHeaderHeightCssVariable();
  window.addEventListener("resize", updateHeaderHeightCssVariable);

  // Mobile navigation toggle
  const menuToggleButton = document.querySelector(".menu-toggle");
  const navigationList = document.getElementById("primary-navigation");

  function setMenuOpenState(shouldOpen) {
    if (!menuToggleButton) return;
    const isOpen = Boolean(shouldOpen);
    menuToggleButton.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("no-scroll", isOpen);
    document.documentElement.classList.toggle("nav-open", isOpen);
  }

  menuToggleButton?.addEventListener("click", () => {
    const isExpanded = menuToggleButton.getAttribute("aria-expanded") === "true";
    setMenuOpenState(!isExpanded);
  });

  navigationList?.querySelectorAll("a").forEach((anchor) => {
    anchor.addEventListener("click", () => setMenuOpenState(false));
  });

  // Smooth scroll enhancement (CSS handles most cases)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href) return;
      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Reveal animations via IntersectionObserver
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReducedMotion) {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    document.body.classList.add("no-motion");
  }

  // Current year in footer
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
});
