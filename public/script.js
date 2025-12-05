const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");
const copyright = document.getElementById("copyright");
const tabButtons = document.querySelectorAll("[data-tab-target]");
const tabSections = document.querySelectorAll(".tab-section");
const panelsContainer = document.getElementById("tab-panels");
let activeSection = document.querySelector('.tab-section.is-active');

const applyTheme = (isDark) => {
  root.dataset.theme = isDark ? "dark" : "light";
  toggle.setAttribute("aria-label", isDark ? "Activer le mode clair" : "Activer le mode sombre");
};

const storedTheme = localStorage.getItem("atechx-theme");
const initialDark = storedTheme ? storedTheme === "dark" : prefersDark.matches;
applyTheme(initialDark);

prefersDark.addEventListener("change", (event) => {
  if (!localStorage.getItem("atechx-theme")) {
    applyTheme(event.matches);
  }
});

toggle.addEventListener("click", () => {
  const isDark = root.dataset.theme !== "dark";
  localStorage.setItem("atechx-theme", isDark ? "dark" : "light");
  applyTheme(isDark);
});

const year = new Date().getFullYear();
copyright.textContent = `© ${year} `;

const setContainerHeight = (section) => {
  if (!section) return;
  const h = section.offsetHeight;
  panelsContainer.style.height = h + 'px';
};

const activateTab = (targetId) => {
  const nextSection = document.getElementById(targetId);
  if (!nextSection || nextSection === activeSection) return;

  tabButtons.forEach((button) => {
    const isActive = button.dataset.tabTarget === targetId;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  if (activeSection) {
    activeSection.classList.remove('is-active');
    activeSection.setAttribute('aria-hidden', 'true');
  }
  nextSection.classList.add('is-active');
  nextSection.setAttribute('aria-hidden', 'false');
  activeSection = nextSection;
  setContainerHeight(activeSection);

  // Trigger fade cycle animation
  panelsContainer.classList.remove('fade-cycle');
  // Force reflow to restart animation if same class applied quickly
  void panelsContainer.offsetWidth;
  panelsContainer.classList.add('fade-cycle');
};

tabButtons.forEach((button) => {
  button.addEventListener('click', () => activateTab(button.dataset.tabTarget));
});

if (activeSection) setContainerHeight(activeSection);

// --- Filtrage Tarifs ---
const tarifSection = document.getElementById('tab-support');
if (tarifSection) {
  const filterButtons = tarifSection.querySelectorAll('.filter-btn');
  const serviceCards = tarifSection.querySelectorAll('.service-card');

  const applyFilter = (filter) => {
    const cardsArray = Array.from(serviceCards);

    // Applique la visibilité
    cardsArray.forEach((card) => {
      const category = card.dataset.category;
      const shouldShow = filter === 'all' || category === filter;
      card.classList.toggle('is-hidden', !shouldShow);
    });

    // Remonte les cartes visibles en haut de la grille
    const grid = tarifSection.querySelector('.services-grid');
    if (grid) {
      const visible = cardsArray.filter((card) => !card.classList.contains('is-hidden'));
      const hidden = cardsArray.filter((card) => card.classList.contains('is-hidden'));

      // Réinjection dans l'ordre: visibles d'abord, puis cachées
      [...visible, ...hidden].forEach((card) => grid.appendChild(card));
    }

    // Recalcule la hauteur uniquement si l'onglet Tarifs est actif
    if (activeSection === tarifSection) {
      // léger délai pour laisser finir la transition
      setTimeout(() => setContainerHeight(tarifSection), 230);
    }
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterButtons.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle('is-active', isActive);
        b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      applyFilter(filter);
    });
  });
}
