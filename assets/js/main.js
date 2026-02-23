const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const parent = toggle.closest('.dropdown');
    const isOpen = parent.classList.contains('open');

    document.querySelectorAll('.dropdown').forEach((dropdown) => {
      dropdown.classList.remove('open');
      const button = dropdown.querySelector('[data-dropdown-toggle]');
      if (button) button.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      parent.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown').forEach((dropdown) => {
      dropdown.classList.remove('open');
      const button = dropdown.querySelector('[data-dropdown-toggle]');
      if (button) button.setAttribute('aria-expanded', 'false');
    });
  }
});

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    document.querySelectorAll('.resource-card').forEach((card) => {
      const cardCategory = card.dataset.category;
      if (category === 'all' || cardCategory === category) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
