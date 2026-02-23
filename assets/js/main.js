function getSiteRootPath() {
  const script = document.currentScript || document.querySelector('script[src*="assets/js/main.js"]');
  const src = script?.getAttribute('src') || 'assets/js/main.js';
  const scriptUrl = new URL(src, window.location.href);
  return scriptUrl.pathname.replace(/\/assets\/js\/main\.js$/, '');
}

function normalizePartialUrls(container, rootPath) {
  container.querySelectorAll('[href^="/"]').forEach((link) => {
    link.setAttribute('href', `${rootPath}${link.getAttribute('href')}`);
  });

  container.querySelectorAll('[src^="/"]').forEach((item) => {
    item.setAttribute('src', `${rootPath}${item.getAttribute('src')}`);
  });
}

async function loadPartial(selector, path, rootPath) {
  const mount = document.querySelector(selector);
  if (!mount) return;

  const response = await fetch(path);
  if (!response.ok) return;

  mount.innerHTML = await response.text();
  normalizePartialUrls(mount, rootPath);
}

function removeLegacyChrome() {
  document.querySelectorAll('.site-header').forEach((header) => {
    if (!header.closest('#site-header')) header.remove();
  });

  document.querySelectorAll('.site-footer').forEach((footer) => {
    if (!footer.closest('#site-footer')) footer.remove();
  });
}

function initNavigation() {
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

  const { nav, subnav } = document.body.dataset;

  if (nav) {
    const navLink = document.querySelector(`[data-nav-link="${nav}"]`);
    if (navLink) {
      if (navLink.classList.contains('dropdown')) {
        const toggle = navLink.querySelector('[data-dropdown-toggle]');
        if (toggle) toggle.classList.add('active');
      } else {
        navLink.classList.add('active');
      }
    }
  }

  if (subnav) {
    const subnavLink = document.querySelector(`[data-subnav-link="${subnav}"]`);
    if (subnavLink) subnavLink.classList.add('active');
  }
}

function initResourceFilters() {
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
}

async function initSiteChrome() {
  const rootPath = getSiteRootPath();
  removeLegacyChrome();

  await Promise.all([
    loadPartial('#site-header', `${rootPath}/partials/header.html`, rootPath),
    loadPartial('#site-footer', `${rootPath}/partials/footer.html`, rootPath),
  ]);

  initNavigation();
  initResourceFilters();
}

initSiteChrome();
