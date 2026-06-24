// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileOverlay = document.getElementById('mobileOverlay');

menuToggle.addEventListener('click', () => {
  mobileOverlay.classList.toggle('open');
});
mobileOverlay.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileOverlay.classList.remove('open'));
});

// Contact form — placeholder until you wire up a backend (see TODO in index.html)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thanks for reaching out! (Connect this form to Formspree or another backend to actually receive messages — see the TODO comment in index.html)');
  contactForm.reset();
});

// Scroll reveal animation
const revealEls = document.querySelectorAll('.section, .about-card, .project-card, .personality-card, .stat-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();