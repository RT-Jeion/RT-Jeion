// ── Cursor
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animCursor(){
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  cursor.style.left = mx - 5 + 'px';
  cursor.style.top  = my - 5 + 'px';
  ring.style.left   = rx - 18 + 'px';
  ring.style.top    = ry - 18 + 'px';
  requestAnimationFrame(animCursor);
})();
document.querySelectorAll('a, button, .tag, .hero-social-link, .contact-link, .btn-scroll').forEach(el => {
  el.addEventListener('mouseenter', () => { ring.style.width = '56px'; ring.style.height = '56px'; ring.style.borderColor = 'var(--accent)'; });
  el.addEventListener('mouseleave', () => { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.borderColor = 'var(--accent-glow)'; });
});

// ── Typing animation (per spec)
const phrases = [
  "building llm from scratch...",
  "researching quant strategies...",
  "focus = \"build, not get hired\"",
];
const typingSpeed = 55; // ms per char
const deletingSpeed = 28; // ms per char
const pauseAtEnd = 2000; // ms pause when line complete
let pi = 0, ci = 0, deleting = false;
const typed = document.getElementById('typed');
function typeLoop() {
  const phrase = phrases[pi];
  if (!deleting) {
    ci++;
    typed.textContent = phrase.slice(0, ci);
    if (ci >= phrase.length) {
      setTimeout(() => { deleting = true; setTimeout(typeLoop, deletingSpeed); }, pauseAtEnd);
      return;
    }
    setTimeout(typeLoop, typingSpeed);
  } else {
    ci--;
    typed.textContent = phrase.slice(0, ci);
    if (ci <= 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
      setTimeout(typeLoop, typingSpeed);
      return;
    }
    setTimeout(typeLoop, deletingSpeed);
  }
}
typeLoop();

// ── Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .tl-item').forEach(el => observer.observe(el));

// ── Stagger tl-items
document.querySelectorAll('.tl-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.06}s`;
});

// ── Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    const rect = s.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom > 120) current = s.id;
  });
  navLinks.forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      const id = href.slice(1);
      if (id === current) a.classList.add('active'); else a.classList.remove('active');
    }
  });
});

// ── Smooth scroll for the contact CTA
document.querySelectorAll('[data-scroll-target]').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    const targetSelector = trigger.getAttribute('data-scroll-target');
    const target = targetSelector ? document.querySelector(targetSelector) : null;
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
