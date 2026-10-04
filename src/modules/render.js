import { $, $$ } from '../state.js';
import { skills } from '../data.js';
export function renderSkills() {
  $('#sk').innerHTML = Object.entries(skills).map(([k, v]) =>
    `<div class="glass rv"><h3>${k}</h3><div class="chips">${v.split(',').map((x) => `<span class="chip">${x}</span>`).join('')}</div></div>`).join('');
}
export function renderDots() {
  $('#dots').innerHTML = $$('section').map((s) => `<a href="#${s.id}" aria-label="${s.dataset.n}"><span>${s.dataset.n}</span></a>`).join('');
}
