import * as THREE from 'three';
import { $, state } from '../state.js';
const wire = (g, c) => new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending }));

export function initScene() {
  const rd = new THREE.WebGLRenderer({ canvas: $('#gl'), antialias: true, alpha: true });
  rd.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(65, 1, 0.1, 1200);
  scene.fog = new THREE.FogExp2(0x04050d, 0.0022);

  // star tunnel
  const N = 5000, pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
  const pal = [0x5cf2ff, 0xff3df2, 0x8b5cff, 0xffffff].map((c) => new THREE.Color(c));
  for (let i = 0; i < N; i++) {
    const a = Math.random() * 6.283, r = 15 + Math.random() * 130, c = pal[(Math.random() * 4) | 0];
    pos.set([Math.cos(a) * r, Math.sin(a) * r, 40 - Math.random() * 900], i * 3);
    col.set([c.r, c.g, c.b], i * 3);
  }
  const pg = new THREE.BufferGeometry();
  pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  pg.setAttribute('color', new THREE.BufferAttribute(col, 3));
  scene.add(new THREE.Points(pg, new THREE.PointsMaterial({ size: 1.6, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false })));

  // set pieces along the flight path
  const core = wire(new THREE.IcosahedronGeometry(11, 2), 0x5cf2ff), core2 = wire(new THREE.IcosahedronGeometry(6, 1), 0xff3df2);
  core.position.set(14, 0, -30); core2.position.copy(core.position);
  const knot = wire(new THREE.TorusKnotGeometry(12, 3, 140, 16), 0x8b5cff); knot.position.set(-22, 0, -210);
  const rings = Array.from({ length: 7 }, (_, i) => { const t = wire(new THREE.TorusGeometry(10 + i * 4, 0.25, 8, 80), i % 2 ? 0xff3df2 : 0x5cf2ff); t.position.set(18, 0, -400 - i * 16); return t; });
  const oct = wire(new THREE.OctahedronGeometry(14, 0), 0x5cf2ff); oct.position.set(-18, 0, -600);
  const ico = wire(new THREE.IcosahedronGeometry(16, 1), 0xff3df2); ico.position.set(0, 0, -780);
  scene.add(core, core2, knot, oct, ico, ...rings);

  const resize = () => { rd.setSize(innerWidth, innerHeight); cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); };
  resize(); addEventListener('resize', resize);

  let cz = 30, t = 0;
  (function loop() {
    t += 0.01;
    const tz = 30 - state.sp * 790;
    cz += (tz - cz) * 0.06;
    cam.position.set(cam.position.x + (state.mx * 14 - cam.position.x) * 0.05, cam.position.y + (-state.my * 10 - cam.position.y) * 0.05, cz);
    cam.rotation.z = (tz - cz) * 0.0012 + Math.sin(t) * 0.01;
    core.rotation.set(t * 0.6, t, 0); core2.rotation.set(-t, -t * 1.4, 0);
    knot.rotation.set(t * 0.7, t * 0.5, 0);
    rings.forEach((r, i) => r.rotation.set(t * (0.5 + i * 0.1), t * 0.3, 0));
    oct.rotation.set(t * 0.6, t, 0); ico.rotation.set(0, -t, t * 0.5);
    core.scale.setScalar(1 + Math.sin(t * 2) * 0.04);
    rd.render(scene, cam);
    requestAnimationFrame(loop);
  })();
}
