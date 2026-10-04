import './styles/main.css';
import { renderSkills, renderDots } from './modules/render.js';
import { boot } from './modules/boot.js';
import { initScramble } from './modules/scramble.js';
import { initReveal } from './modules/reveal.js';
import { initTyped } from './modules/typed.js';
import { initHud } from './modules/hud.js';
import { initInteractions } from './modules/interactions.js';
import { initScene } from './modules/scene.js';

renderSkills(); renderDots(); // build dynamic DOM first
boot(); initScramble(); initReveal(); initTyped(); initHud(); initInteractions(); initScene();
