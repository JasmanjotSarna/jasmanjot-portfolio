// ===== NAVIGATION =====

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileOverlay = document.getElementById('mobileOverlay');
const overlayClose = document.getElementById('overlayClose');

if (menuToggle && mobileOverlay) {
  menuToggle.addEventListener('click', () => {
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    menuToggle.setAttribute('aria-expanded', 'true');
  });

  overlayClose?.addEventListener('click', closeMenu);
  mobileOverlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileOverlay.classList.contains('open')) {
      closeMenu();
    }
  });
}

function closeMenu() {
  mobileOverlay?.classList.remove('open');
  document.body.style.overflow = '';
  if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
}

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
    }
  });
});

// Active nav link indicator
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

function highlightNavLink() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNavLink);
highlightNavLink();
