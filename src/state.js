export const state = { mx: 0, my: 0, sp: 0 }; // mouse (-.5..5) and scroll progress (0..1)
export const $ = (s) => document.querySelector(s);
export const $$ = (s) => [...document.querySelectorAll(s)];
