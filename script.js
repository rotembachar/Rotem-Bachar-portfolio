(function () {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Highlight active dot in side nav
  const sections = Array.from(document.querySelectorAll("[data-observe]"));
  const dots = Array.from(document.querySelectorAll(".side-nav__dot"));
  const mapDotById = new Map(dots.map(d => [d.getAttribute("href")?.replace("#",""), d]));

  function setActive(id) {
    dots.forEach(d => d.classList.remove("is-active"));
    const dot = mapDotById.get(id);
    if (dot) dot.classList.add("is-active");
  }

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b) => (b.intersectionRatio - a.intersectionRatio));

    if (visible.length > 0) setActive(visible[0].target.id);
  }, {
    root: null,
    rootMargin: "0px 0px -55% 0px",
    threshold: [0.15, 0.25, 0.4, 0.55, 0.7]
  });

  sections.forEach(s => observer.observe(s));

  // Smooth scroll
  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      const href = dot.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();
