// ===== ANIMATIONS & SCROLL TRIGGERS =====

// Intersection Observer for scroll animations
const revealOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal, .fade-up, .slide-up').forEach(el => {
  observer.observe(el);
});

// Stagger animations for grid items
const gridItems = document.querySelectorAll(
  '.about-card, .project-card, .achievement-card, .skill-chip, .timeline-item'
);

const gridObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.animation = 'fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
      }, index * 50);
      gridObserver.unobserve(entry.target);
    }
  });
}, revealOptions);

gridItems.forEach(item => {
  item.style.opacity = '0';
  gridObserver.observe(item);
});

// Counter animation for stats
function animateCounter(element) {
  if (element.dataset.animated) return;
  
  const target = parseInt(element.textContent, 10);
  const increment = Math.ceil(target / 30);
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = current;
    }
  }, 50);
  
  element.dataset.animated = 'true';
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(num => animateCounter(num));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.github-stat').forEach(stat => {
  statsObserver.observe(stat);
});

// Parallax effect for hero section
const heroSection = document.querySelector('.hero');
if (heroSection) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElements = heroSection.querySelectorAll('.floating-element');
    parallaxElements.forEach((el, index) => {
      const speed = 0.3 + (index * 0.1);
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Smooth scroll behavior
if (document.documentElement.style.scrollBehavior === undefined) {
  document.documentElement.style.scrollBehavior = 'smooth';
}

// Footer year update
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Page fade-in animation
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});
