import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  NgZone,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-lotus-3d',
  standalone: true,
  imports: [CommonModule],
  template: `
<section class="lotus3d-section">
  <div class="lotus3d-pattern pat-mandala" aria-hidden="true"></div>
  <div class="w">
    <div class="lotus3d-grid">
      <div class="lotus3d-copy sr">
        <span class="sec-tag gd"><span class="tag-lotus">✿</span> Atithi Devo Bhava</span>
        <h2 class="sec-title">Travel with India<br><em class="display-italic">in your heart.</em></h2>
        <p class="lotus3d-lead">
          The lotus blossoms in muddy water yet stays untouched — a 5,000-year-old
          symbol of beauty rising above. Every journey we plan is rooted in that spirit.
        </p>
        <div class="lotus3d-stats">
          <div class="l3-stat"><strong>28</strong><span>States, every flavour</span></div>
          <div class="l3-stat"><strong>22</strong><span>Official languages</span></div>
          <div class="l3-stat"><strong>40+</strong><span>UNESCO sites</span></div>
        </div>
      </div>
      <div class="lotus3d-canvas-wrap" aria-hidden="true">
        <canvas #canvas class="lotus3d-canvas"></canvas>
        <div class="lotus3d-halo"></div>
      </div>
    </div>
  </div>
</section>`
})
export class Lotus3dComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private group?: THREE.Group;
  private rafId = 0;
  private resizeObs?: ResizeObserver;

  constructor(private zone: NgZone, @Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    // Run outside Angular zone so RAF doesn't trigger change detection.
    this.zone.runOutsideAngular(() => this.initScene());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    this.resizeObs?.disconnect();
    this.renderer?.dispose();
    this.scene?.traverse(obj => {
      const mesh = obj as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const mat = mesh.material;
      if (Array.isArray(mat)) mat.forEach(m => m.dispose());
      else if (mat) mat.dispose();
    });
  }

  private initScene() {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement!;
    const w = parent.clientWidth || 400;
    const h = parent.clientHeight || 400;

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h, false);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    this.camera.position.set(0, 0, 5.2);

    this.group = new THREE.Group();
    this.scene.add(this.group);

    // Lotus petals — concentric rings of triangular petals on Y plane
    const petalGeom = new THREE.ConeGeometry(0.45, 1.1, 4, 1, true);
    const goldMat = new THREE.MeshBasicMaterial({
      color: 0xC9911A,
      wireframe: true,
      transparent: true,
      opacity: 0.55
    });
    const saffronMat = new THREE.MeshBasicMaterial({
      color: 0xFF6B00,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const peacockMat = new THREE.MeshBasicMaterial({
      color: 0x0D7377,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });

    // Ring 1 — outer 12 petals (peacock)
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const petal = new THREE.Mesh(petalGeom, peacockMat);
      petal.position.set(Math.cos(a) * 1.55, Math.sin(a) * 1.55, 0);
      petal.rotation.z = a + Math.PI / 2;
      petal.rotation.x = Math.PI / 2 * 0.18;
      petal.scale.set(1.05, 1.4, 1.05);
      this.group.add(petal);
    }
    // Ring 2 — middle 8 petals (saffron)
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + Math.PI / 16;
      const petal = new THREE.Mesh(petalGeom, saffronMat);
      petal.position.set(Math.cos(a) * 1.0, Math.sin(a) * 1.0, 0.15);
      petal.rotation.z = a + Math.PI / 2;
      petal.rotation.x = Math.PI / 2 * 0.32;
      petal.scale.set(0.95, 1.15, 0.95);
      this.group.add(petal);
    }
    // Ring 3 — inner 6 petals (gold)
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const petal = new THREE.Mesh(petalGeom, goldMat);
      petal.position.set(Math.cos(a) * 0.5, Math.sin(a) * 0.5, 0.3);
      petal.rotation.z = a + Math.PI / 2;
      petal.rotation.x = Math.PI / 2 * 0.5;
      petal.scale.set(0.75, 0.9, 0.75);
      this.group.add(petal);
    }

    // Centre — small golden sphere
    const centerGeom = new THREE.IcosahedronGeometry(0.32, 0);
    const centerMat = new THREE.MeshBasicMaterial({ color: 0xD4A843, wireframe: true });
    const center = new THREE.Mesh(centerGeom, centerMat);
    center.position.z = 0.45;
    this.group.add(center);

    // Outer halo torus
    const haloGeom = new THREE.TorusGeometry(2.35, 0.018, 12, 80);
    const haloMat = new THREE.MeshBasicMaterial({ color: 0xC9911A, transparent: true, opacity: 0.25 });
    const halo = new THREE.Mesh(haloGeom, haloMat);
    this.group.add(halo);

    // Tilt the whole flower slightly forward like a tilak
    this.group.rotation.x = -0.32;

    const animate = () => {
      if (!this.renderer || !this.scene || !this.camera || !this.group) return;
      this.rafId = requestAnimationFrame(animate);
      this.group.rotation.z += 0.0035;
      this.group.rotation.y = Math.sin(performance.now() * 0.0003) * 0.18;
      this.renderer.render(this.scene, this.camera);
    };
    animate();

    // Handle resize
    this.resizeObs = new ResizeObserver(() => {
      if (!this.renderer || !this.camera) return;
      const nw = parent.clientWidth;
      const nh = parent.clientHeight;
      if (!nw || !nh) return;
      this.renderer.setSize(nw, nh, false);
      this.camera.aspect = nw / nh;
      this.camera.updateProjectionMatrix();
    });
    this.resizeObs.observe(parent);
  }
}
