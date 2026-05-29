// ===== Year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Navbar scroll state =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// ===== Mobile menu =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
  })
);

// ===== Typing effect =====
const roles = [
  "AI / ML Engineer",
  "Data Scientist",
  "Computer Vision Enthusiast",
  "MLOps Practitioner",
];
const typedEl = document.getElementById("typed");
let roleIdx = 0, charIdx = 0, deleting = false;
function typeLoop() {
  const current = roles[roleIdx];
  typedEl.textContent = current.slice(0, charIdx);
  if (!deleting && charIdx < current.length) {
    charIdx++;
    setTimeout(typeLoop, 90);
  } else if (!deleting && charIdx === current.length) {
    deleting = true;
    setTimeout(typeLoop, 1600);
  } else if (deleting && charIdx > 0) {
    charIdx--;
    setTimeout(typeLoop, 45);
  } else {
    deleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    setTimeout(typeLoop, 350);
  }
}
typeLoop();

// ===== Reveal on scroll =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  revealObserver.observe(el);
});

// ===== Animated counters =====
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      let n = 0;
      const step = Math.max(1, Math.ceil(target / 30));
      const tick = () => {
        n += step;
        if (n >= target) {
          el.textContent = target + "+";
        } else {
          el.textContent = n;
          requestAnimationFrame(tick);
        }
      };
      tick();
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll(".stat-num").forEach((el) => counterObserver.observe(el));

// ===== Project filter =====
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      const match = filter === "all" || card.dataset.cat === filter;
      card.classList.toggle("hide", !match);
    });
  });
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll("section[id]");
const navAnchors = navLinks.querySelectorAll("a");
const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach((a) =>
          a.classList.toggle("active-link", a.getAttribute("href") === `#${id}`)
        );
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => spyObserver.observe(s));
