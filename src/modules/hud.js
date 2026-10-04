import { $, $$, state } from '../state.js';
export function initHud() {
  const cur = $('#cur'), secs = $$('section'), dots = $$('#dots a');
  setInterval(() => { $('#clk').textContent = new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata' }); }, 1000);
  addEventListener('pointermove', (e) => {
    state.mx = e.clientX / innerWidth - 0.5; state.my = e.clientY / innerHeight - 0.5;
    cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px';
    $('#cx').textContent = e.clientX; $('#cy').textContent = e.clientY;
  });
  const onScroll = () => {
    const h = document.documentElement;
    state.sp = scrollY / (h.scrollHeight - innerHeight || 1);
    $('#dp').textContent = String(Math.round(state.sp * 100)).padStart(3, '0');
    secs.forEach((s, i) => { const r = s.getBoundingClientRect(); dots[i].classList.toggle('on', r.top < innerHeight / 2 && r.bottom > innerHeight / 2); });
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
}
