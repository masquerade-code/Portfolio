import { $$ } from '../state.js';
function count(n) {
  const T = +n.dataset.c, s = n.dataset.s || '', t0 = performance.now();
  (function f(t) {
    const p = Math.min((t - t0) / 1800, 1);
    n.textContent = Math.round(T * (1 - Math.pow(1 - p, 4))) + s;
    if (p < 1) requestAnimationFrame(f);
  })(t0);
}
export function initReveal() {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.querySelectorAll('[data-c]').forEach(count);
    io.unobserve(e.target);
  }), { threshold: 0.12 });
  $$('.rv').forEach((e, i) => { e.style.transitionDelay = (i % 3) * 100 + 'ms'; io.observe(e); });
}
