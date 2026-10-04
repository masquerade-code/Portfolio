import { $ } from '../state.js';
export const BOOT_MS = 2100;
export const boot = () => setTimeout(() => $('#boot').classList.add('off'), BOOT_MS);
