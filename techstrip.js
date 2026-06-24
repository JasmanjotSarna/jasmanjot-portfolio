// ===== TECH STRIP =====

const techTrack = document.getElementById('techTrack');

if (techTrack) {
  // Pause animation on hover
  techTrack.addEventListener('mouseenter', () => {
    techTrack.style.animationPlayState = 'paused';
  });

  // Resume animation on mouse leave
  techTrack.addEventListener('mouseleave', () => {
    techTrack.style.animationPlayState = 'running';
  });

  // Enhanced touch support for mobile
  let touchStartX = 0;
  let touchStartTime = 0;

  techTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartTime = Date.now();
    techTrack.style.animationPlayState = 'paused';
  }, false);

  techTrack.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchDuration = Date.now() - touchStartTime;
    
    // Resume animation if swipe is quick
    if (touchDuration > 300) {
      techTrack.style.animationPlayState = 'running';
    }
  }, false);

  // Ensure animation works with reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    techTrack.style.animationPlayState = 'running';
  }
}

// Duplicate tech items for seamless loop
function setupTechStripLoop() {
  const track = document.getElementById('techTrack');
  if (!track) return;

  const items = Array.from(track.children);
  
  // Clone items for seamless loop
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupTechStripLoop);
} else {
  setupTechStripLoop();
}
