# Rachit Sharma — Portfolio (Vite + Three.js)

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs ./dist
npm run preview
```

## Where to edit
| What | File |
|---|---|
| Experience, AI lab, projects, contact text | `index.html` |
| Skills + typed role lines | `src/data.js` |
| Colours (`--cy`, `--mg`, `--vi`), fonts, layout | `src/styles/main.css` |
| 3D shapes + scroll flight | `src/modules/scene.js` |
| Text decode, reveals, HUD, tilt/magnetic effects | `src/modules/*.js` |

## Deploy
Vercel / Netlify / Cloudflare Pages: build command `npm run build`, output dir `dist`.
GitHub Pages: set `base: '/<repo>/'` in a `vite.config.js`.
