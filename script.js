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
document.querySelectorAll('a, button, .tag, .social-btn, .hero-social-link').forEach(el => {
  el.addEventListener('mouseenter', () => { ring.style.width = '56px'; ring.style.height = '56px'; ring.style.borderColor = 'var(--accent)'; });
  el.addEventListener('mouseleave', () => { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.borderColor = 'var(--accent-glow)'; });
});

// ── Typing animation
const phrases = [
  "Building at the intersection of AI, Math & Markets.",
  "LLM Engineer in progress.",
  "Builder. Not job seeker.",
  "Going deep on the math that runs the future.",
  "Making things that think.",
];
let pi = 0, ci = 0, deleting = false, wait = 0;
const typed = document.getElementById('typed');
function type() {
  const phrase = phrases[pi];
  if (wait > 0) { wait--; setTimeout(type, 80); return; }
  if (!deleting) {
    typed.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) { deleting = true; wait = 30; }
    setTimeout(type, 55);
  } else {
    typed.textContent = phrase.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    setTimeout(type, 28);
  }
}
type();

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
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
});
