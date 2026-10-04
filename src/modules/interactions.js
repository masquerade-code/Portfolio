import { $, $$ } from '../state.js';
export function initInteractions() {
  const cur = $('#cur');
  $$('a,.card,.chip').forEach((e) => {
    e.addEventListener('pointerenter', () => cur.classList.add('h'));
    e.addEventListener('pointerleave', () => cur.classList.remove('h'));
  });
  $$('.mag').forEach((e) => {
    e.addEventListener('pointermove', (v) => { const r = e.getBoundingClientRect(); e.style.transform = `translate(${(v.clientX - r.left - r.width / 2) * 0.3}px,${(v.clientY - r.top - r.height / 2) * 0.4}px)`; });
    e.addEventListener('pointerleave', () => (e.style.transform = ''));
  });
  $$('.card').forEach((c) => {
    c.addEventListener('pointermove', (e) => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.transform = `rotateY(${(x - 0.5) * 16}deg) rotateX(${(0.5 - y) * 16}deg) scale(1.03)`;
      c.style.setProperty('--x', x * 100 + '%'); c.style.setProperty('--y', y * 100 + '%');
    });
    c.addEventListener('pointerleave', () => (c.style.transform = ''));
  });
}
