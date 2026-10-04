import { $$ } from '../state.js';
import { BOOT_MS } from './boot.js';
const CH = '!<>-_\\/[]{}=+*^?#01';
function scramble(el) {
  const t = el.dataset.t; let f = 0;
  const id = setInterval(() => {
    el.textContent = [...t].map((c, i) => (c === ' ' ? ' ' : i < f / 2 ? c : CH[(Math.random() * CH.length) | 0])).join('');
    if (++f > t.length * 2 + 4) { el.textContent = t; clearInterval(id); }
  }, 32);
}
export function initScramble() {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { scramble(e.target); io.unobserve(e.target); }
  }), { threshold: 0.3 });
  $$('.sc').forEach((e) => {
    e.textContent = e.dataset.t;
    setTimeout(() => io.observe(e), e.closest('#hero') ? BOOT_MS : 0);
  });
}
