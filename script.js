// ===== Year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Mobile menu =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.textContent = open ? "CLOSE" : "MENU";
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.textContent = "MENU";
  })
);

// ===== Reveal blocks =====
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08 }
);
document.querySelectorAll(".block, .marquee").forEach((el) => io.observe(el));

// ===== Project filter =====
const filterBtns = document.querySelectorAll(".filter-btn");
const rows = document.querySelectorAll(".work-row");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    let n = 0;
    rows.forEach((row) => {
      const match = f === "all" || row.dataset.cat === f;
      row.classList.toggle("hide", !match);
      if (match) {
        n++;
        const noEl = row.querySelector(".work-no");
        if (noEl) noEl.textContent = String(n).padStart(2, "0");
      }
    });
  });
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll("section[id]");
const anchors = navLinks.querySelectorAll("a");
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const id = e.target.id;
        anchors.forEach((a) =>
          a.classList.toggle("active-link", a.getAttribute("href") === `#${id}`)
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => spy.observe(s));
