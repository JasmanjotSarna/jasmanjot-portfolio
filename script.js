// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.section, .hero-text, .hero-terminal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ===== Terminal boot animation =====
const lines = [
  { text: '$ whoami', cls: '' },
  { text: 'jasmanjot-singh-sarna', cls: 'accent' },
  { text: '$ status --check', cls: '' },
  { text: '[ok] AI & ML Engineer', cls: 'ok' },
  { text: '[ok] Data Analyst', cls: 'ok' },
  { text: '[ok] Future AI Builder', cls: 'ok' },
  { text: '$ portfolio --run', cls: '' },
  { text: 'loading projects... done', cls: 'accent' },
];

const terminalBody = document.getElementById('terminalBody');
let lineIndex = 0;
let charIndex = 0;

function typeLine() {
  if (lineIndex >= lines.length) {
    terminalBody.innerHTML += '<span class="cursor">&nbsp;</span>';
    return;
  }
  const current = lines[lineIndex];
  const partial = current.text.slice(0, charIndex);

  const renderedLines = lines.slice(0, lineIndex).map(l =>
    `<span class="${l.cls}">${l.text}</span>`
  ).join('\n');

  terminalBody.innerHTML = renderedLines +
    (lineIndex > 0 ? '\n' : '') +
    `<span class="${current.cls}">${partial}</span><span class="cursor">&nbsp;</span>`;

  charIndex++;
  if (charIndex <= current.text.length) {
    setTimeout(typeLine, 28);
  } else {
    lineIndex++;
    charIndex = 0;
    setTimeout(typeLine, 220);
  }
}
typeLine();

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();