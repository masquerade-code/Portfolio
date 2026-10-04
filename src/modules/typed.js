import { $ } from '../state.js';
import { roles } from '../data.js';
export function initTyped() {
  const el = $('#role'); let ri = 0, ci = 0, del = false;
  (function tick() {
    const r = roles[ri];
    el.textContent = r.slice(0, ci);
    ci += del ? -1 : 1;
    let d = del ? 25 : 60;
    if (!del && ci > r.length) { del = true; d = 1400; }
    else if (del && ci < 0) { del = false; ri = (ri + 1) % roles.length; ci = 0; d = 300; }
    setTimeout(tick, d);
  })();
}
