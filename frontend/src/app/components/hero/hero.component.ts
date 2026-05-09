import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-hero', standalone: true, imports: [CommonModule],
  template: `
<section class="hero" id="hero">
  <!-- Rich Indian background layers -->
  <div class="hero-bg-warm"></div>
  <div class="hero-mandala-bg pat-mandala"></div>
  <div class="hero-overlay"></div>

  <!-- Animated diya particles -->
  <div class="hero-particles" aria-hidden="true">
    <div *ngFor="let p of diyas" class="diya-particle"
      [style.left]="p.left" [style.top]="p.top"
      [style.animationDuration]="p.dur" [style.animationDelay]="p.del"
      [style.width]="p.sz" [style.height]="p.sz" [style.opacity]="p.op"></div>
  </div>

  <!-- Decorative arch border top -->
  <div class="hero-arch-top" aria-hidden="true">
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
      <path d="M0,60 L0,30 Q180,0 360,30 Q540,60 720,30 Q900,0 1080,30 Q1260,60 1440,30 L1440,60 Z" fill="rgba(212,168,67,0.08)"/>
      <path d="M0,60 L0,40 Q180,15 360,40 Q540,65 720,40 Q900,15 1080,40 Q1260,65 1440,40 L1440,60 Z" fill="rgba(212,168,67,0.05)"/>
    </svg>
  </div>

  <!-- Floating ornament plane -->
  <div class="hero-plane" aria-hidden="true">
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="planeBody" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#FFFFFF"/><stop offset="60%" stop-color="#F1CD7C"/><stop offset="100%" stop-color="#D4A843"/>
        </linearGradient>
        <linearGradient id="planeAccent" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#FF6B00"/><stop offset="100%" stop-color="#7A1F2B"/>
        </linearGradient>
      </defs>
      <path d="M6 36 L46 22 L58 18 C60 17 62 19 60 21 L52 28 L26 50 C25 51 23 51 22 49 L18 42 L8 38 C6 37 6 37 6 36 Z" fill="url(#planeBody)" stroke="#7A1F2B" stroke-width="0.6"/>
      <path d="M22 49 L30 40 L34 44 L26 50 C25 51 23 51 22 49 Z" fill="url(#planeAccent)" opacity="0.85"/>
      <path d="M46 22 L40 16 L36 18 L42 26 Z" fill="#FFFFFF" stroke="#D4A843" stroke-width="0.4"/>
    </svg>
  </div>
  <div class="hero-plane-trail" aria-hidden="true"></div>

  <!-- RIGHT SIDE — Animated Mandala Art (replaces WebGL globe) -->
  <div class="hero-mandala-art" aria-hidden="true">
    <svg viewBox="0 0 500 500" class="mandala-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="manGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#D4A843" stop-opacity="0.25"/>
          <stop offset="60%" stop-color="#FF6B00" stop-opacity="0.08"/>
          <stop offset="100%" stop-color="#0B1120" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFD700" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#FF6B00" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- Background glow -->
      <circle cx="250" cy="250" r="240" fill="url(#manGlow)"/>
      <!-- Outer rings -->
      <circle cx="250" cy="250" r="220" fill="none" stroke="rgba(212,168,67,0.12)" stroke-width="1"/>
      <circle cx="250" cy="250" r="190" fill="none" stroke="rgba(212,168,67,0.18)" stroke-width="0.8" stroke-dasharray="8 4"/>
      <circle cx="250" cy="250" r="160" fill="none" stroke="rgba(255,107,0,0.15)" stroke-width="1"/>
      <circle cx="250" cy="250" r="130" fill="none" stroke="rgba(212,168,67,0.2)" stroke-width="0.8"/>
      <circle cx="250" cy="250" r="100" fill="none" stroke="rgba(255,107,0,0.18)" stroke-width="1" stroke-dasharray="4 4"/>
      <circle cx="250" cy="250" r="70" fill="none" stroke="rgba(212,168,67,0.25)" stroke-width="1"/>
      <circle cx="250" cy="250" r="42" fill="none" stroke="rgba(255,107,0,0.3)" stroke-width="1.2"/>
      <!-- Outer lotus petals (8 petals) -->
      <g class="petals-outer" transform="translate(250,250)">
        <ellipse rx="18" ry="55" fill="rgba(212,168,67,0.14)" stroke="rgba(212,168,67,0.35)" stroke-width="0.8" transform="rotate(0) translate(0,-160)"/>
        <ellipse rx="18" ry="55" fill="rgba(212,168,67,0.14)" stroke="rgba(212,168,67,0.35)" stroke-width="0.8" transform="rotate(45) translate(0,-160)"/>
        <ellipse rx="18" ry="55" fill="rgba(212,168,67,0.14)" stroke="rgba(212,168,67,0.35)" stroke-width="0.8" transform="rotate(90) translate(0,-160)"/>
        <ellipse rx="18" ry="55" fill="rgba(212,168,67,0.14)" stroke="rgba(212,168,67,0.35)" stroke-width="0.8" transform="rotate(135) translate(0,-160)"/>
        <ellipse rx="18" ry="55" fill="rgba(212,168,67,0.14)" stroke="rgba(212,168,67,0.35)" stroke-width="0.8" transform="rotate(180) translate(0,-160)"/>
        <ellipse rx="18" ry="55" fill="rgba(212,168,67,0.14)" stroke="rgba(212,168,67,0.35)" stroke-width="0.8" transform="rotate(225) translate(0,-160)"/>
        <ellipse rx="18" ry="55" fill="rgba(212,168,67,0.14)" stroke="rgba(212,168,67,0.35)" stroke-width="0.8" transform="rotate(270) translate(0,-160)"/>
        <ellipse rx="18" ry="55" fill="rgba(212,168,67,0.14)" stroke="rgba(212,168,67,0.35)" stroke-width="0.8" transform="rotate(315) translate(0,-160)"/>
      </g>
      <!-- Mid lotus petals (8 petals) -->
      <g class="petals-mid" transform="translate(250,250)">
        <ellipse rx="14" ry="40" fill="rgba(255,107,0,0.12)" stroke="rgba(255,107,0,0.3)" stroke-width="0.8" transform="rotate(22.5) translate(0,-110)"/>
        <ellipse rx="14" ry="40" fill="rgba(255,107,0,0.12)" stroke="rgba(255,107,0,0.3)" stroke-width="0.8" transform="rotate(67.5) translate(0,-110)"/>
        <ellipse rx="14" ry="40" fill="rgba(255,107,0,0.12)" stroke="rgba(255,107,0,0.3)" stroke-width="0.8" transform="rotate(112.5) translate(0,-110)"/>
        <ellipse rx="14" ry="40" fill="rgba(255,107,0,0.12)" stroke="rgba(255,107,0,0.3)" stroke-width="0.8" transform="rotate(157.5) translate(0,-110)"/>
        <ellipse rx="14" ry="40" fill="rgba(255,107,0,0.12)" stroke="rgba(255,107,0,0.3)" stroke-width="0.8" transform="rotate(202.5) translate(0,-110)"/>
        <ellipse rx="14" ry="40" fill="rgba(255,107,0,0.12)" stroke="rgba(255,107,0,0.3)" stroke-width="0.8" transform="rotate(247.5) translate(0,-110)"/>
        <ellipse rx="14" ry="40" fill="rgba(255,107,0,0.12)" stroke="rgba(255,107,0,0.3)" stroke-width="0.8" transform="rotate(292.5) translate(0,-110)"/>
        <ellipse rx="14" ry="40" fill="rgba(255,107,0,0.12)" stroke="rgba(255,107,0,0.3)" stroke-width="0.8" transform="rotate(337.5) translate(0,-110)"/>
      </g>
      <!-- Inner lotus (16 petals) -->
      <g class="petals-inner" transform="translate(250,250)">
        <ellipse rx="8" ry="26" fill="rgba(212,168,67,0.2)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(0) translate(0,-62)"/>
        <ellipse rx="8" ry="26" fill="rgba(212,168,67,0.2)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(22.5) translate(0,-62)"/>
        <ellipse rx="8" ry="26" fill="rgba(212,168,67,0.2)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(45) translate(0,-62)"/>
        <ellipse rx="8" ry="26" fill="rgba(212,168,67,0.2)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(67.5) translate(0,-62)"/>
        <ellipse rx="8" ry="26" fill="rgba(212,168,67,0.2)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(90) translate(0,-62)"/>
        <ellipse rx="8" ry="26" fill="rgba(212,168,67,0.2)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(112.5) translate(0,-62)"/>
        <ellipse rx="8" ry="26" fill="rgba(212,168,67,0.2)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(135) translate(0,-62)"/>
        <ellipse rx="8" ry="26" fill="rgba(212,168,67,0.2)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(157.5) translate(0,-62)"/>
        <ellipse rx="8" ry="26" fill="rgba(212,168,67,0.2)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(180) translate(0,-62)"/>
        <ellipse rx="8" ry="26" fill="rgba(212,168,67,0.2)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(202.5) translate(0,-62)"/>
        <ellipse rx="8" ry="26" fill="rgba(212,168,67,0.2)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(225) translate(0,-62)"/>
        <ellipse rx="8" ry="26" fill="rgba(212,168,67,0.2)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(247.5) translate(0,-62)"/>
        <ellipse rx="8" ry="26" fill="rgba(212,168,67,0.2)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(270) translate(0,-62)"/>
        <ellipse rx="8" ry="26" fill="rgba(212,168,67,0.2)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(292.5) translate(0,-62)"/>
        <ellipse rx="8" ry="26" fill="rgba(212,168,67,0.2)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(315) translate(0,-62)"/>
        <ellipse rx="8" ry="26" fill="rgba(212,168,67,0.2)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(337.5) translate(0,-62)"/>
      </g>
      <!-- Diagonal lines -->
      <line x1="30" y1="250" x2="470" y2="250" stroke="rgba(212,168,67,0.1)" stroke-width="0.8"/>
      <line x1="250" y1="30" x2="250" y2="470" stroke="rgba(212,168,67,0.1)" stroke-width="0.8"/>
      <line x1="90" y1="90" x2="410" y2="410" stroke="rgba(212,168,67,0.08)" stroke-width="0.8"/>
      <line x1="410" y1="90" x2="90" y2="410" stroke="rgba(212,168,67,0.08)" stroke-width="0.8"/>
      <!-- City dots (Indian diaspora) -->
      <circle cx="250" cy="250" r="8" fill="rgba(212,168,67,0.9)" class="city-pulse"/>
      <circle cx="250" cy="250" r="20" fill="none" stroke="rgba(212,168,67,0.4)" stroke-width="1" class="city-ring"/>
      <!-- Diaspora city dots on the mandala ring -->
      <circle cx="250" cy="80" r="4" fill="rgba(255,107,0,0.8)" class="city-dot"/>
      <circle cx="380" cy="150" r="4" fill="rgba(255,107,0,0.8)" class="city-dot"/>
      <circle cx="420" cy="300" r="4" fill="rgba(212,168,67,0.8)" class="city-dot"/>
      <circle cx="340" cy="420" r="4" fill="rgba(255,107,0,0.8)" class="city-dot"/>
      <circle cx="160" cy="420" r="4" fill="rgba(212,168,67,0.8)" class="city-dot"/>
      <circle cx="80" cy="300" r="4" fill="rgba(255,107,0,0.8)" class="city-dot"/>
      <circle cx="120" cy="150" r="4" fill="rgba(212,168,67,0.8)" class="city-dot"/>
      <!-- Center lotus -->
      <circle cx="250" cy="250" r="16" fill="rgba(255,107,0,0.15)" stroke="rgba(212,168,67,0.6)" stroke-width="1.5"/>
      <circle cx="250" cy="250" r="6" fill="url(#centerGlow)"/>
      <!-- OM symbol approximation with circle + dot -->
      <circle cx="250" cy="250" r="3" fill="#D4A843"/>
      <!-- Torana arch decoration at top -->
      <path d="M155,30 Q250,5 345,30" fill="none" stroke="rgba(212,168,67,0.3)" stroke-width="1.5"/>
      <path d="M170,30 Q250,15 330,30" fill="none" stroke="rgba(255,107,0,0.2)" stroke-width="1"/>
      <!-- Small dot accents on arch -->
      <circle cx="155" cy="30" r="3" fill="rgba(212,168,67,0.5)"/>
      <circle cx="250" cy="7" r="3" fill="rgba(212,168,67,0.5)"/>
      <circle cx="345" cy="30" r="3" fill="rgba(212,168,67,0.5)"/>
    </svg>
  </div>

  <div class="w">
    <div class="hero-content">
      <div class="hero-devanagari">भारत घूमो</div>
      <div class="hero-badges-row">
        <div class="hero-namaste"><span class="ns-emoji">🙏</span><span>Namaste, traveller</span></div>
        <div class="hero-badge"><div class="hero-badge-dot"></div><span>18.5M Indians abroad</span></div>
      </div>
      <h1>Find your best<br>fare <span class="grad-s">home</span>.<br><span class="grad-g">Every time.</span></h1>
      <p class="hero-sub">Multi-city flight search built for the Indian diaspora. Compare every airline across 6 corridors — one search, best prices, zero fees.</p>
      <div class="hero-btns">
        <button class="btn-p has-ripple" (click)="scrollToBooking()">
          <span class="btn-icon">✈</span> Search Flights
        </button>
        <button class="btn-s" (click)="auth.openAppModal()">
          <span class="btn-icon">📱</span> Download App
        </button>
      </div>
      <div class="hero-stats">
        <div class="hero-stat" *ngFor="let s of stats; let i = index" [attr.data-idx]="i">
          <div class="hero-stat-diya" aria-hidden="true"></div>
          <strong>{{s.current}}</strong>
          <span>{{s.label}}</span>
        </div>
      </div>
      <!-- Festival badge -->
      <div class="hero-festival-row">
        <div class="festival-badge" *ngFor="let f of festivals">
          <span class="fst-icon">{{f.icon}}</span>
          <span>{{f.name}}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Decorative bottom wave -->
  <div class="hero-bottom-wave" aria-hidden="true">
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
      <path d="M0,80 L0,40 Q120,80 240,40 Q360,0 480,40 Q600,80 720,40 Q840,0 960,40 Q1080,80 1200,40 Q1320,0 1440,40 L1440,80 Z" fill="var(--cream)"/>
    </svg>
  </div>
</section>`,
  styles: [`
    .hero-bg-warm{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 50%, rgba(122,31,43,0.35) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(212,168,67,0.15) 0%, transparent 50%);z-index:0}
    .hero-mandala-art{position:absolute;top:50%;right:-8%;transform:translateY(-50%);width:56%;max-width:640px;z-index:1;pointer-events:none}
    .mandala-svg{width:100%;height:100%;animation:mandalaSpin 120s linear infinite}
    .petals-outer{animation:mandalaSpin 90s linear infinite reverse}
    .petals-mid{animation:mandalaSpin 60s linear infinite}
    .petals-inner{animation:mandalaSpin 40s linear infinite reverse}
    @keyframes mandalaSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    .city-pulse{animation:cityPulse 2s ease-in-out infinite}
    .city-ring{animation:cityRing 2s ease-in-out infinite}
    .city-dot{animation:cityPulse 2.5s ease-in-out infinite}
    @keyframes cityPulse{0%,100%{opacity:1;r:8}50%{opacity:0.6;r:10}}
    @keyframes cityRing{0%,100%{r:20;opacity:0.4}50%{r:28;opacity:0}}
    .diya-particle{position:absolute;border-radius:50%;background:radial-gradient(circle, #FFD700 0%, #FF6B00 50%, transparent 100%);animation:diyaFloat linear infinite;box-shadow:0 0 6px 2px rgba(255,180,0,0.3)}
    @keyframes diyaFloat{0%{transform:translateY(100vh) scale(0);opacity:0}10%{opacity:0.8}85%{opacity:0.6}100%{transform:translateY(-5vh) scale(1.2);opacity:0}}
    .hero-devanagari{font-family:'Yatra One',serif;font-size:13px;letter-spacing:4px;color:var(--gold);opacity:0.7;margin-bottom:12px;animation:fadeInUp .6s ease-out both}
    .hero-badges-row{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:22px;animation:fadeInUp .8s ease-out .05s both}
    .hero-festival-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:32px;animation:fadeInUp .8s ease-out .5s both}
    .festival-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;background:rgba(212,168,67,0.08);border:1px solid rgba(212,168,67,0.2);border-radius:100px;font-size:11px;font-weight:600;color:rgba(255,255,255,.6)}
    .fst-icon{font-size:14px}
    .hero-stat-diya{width:6px;height:6px;border-radius:50%;background:radial-gradient(circle,#FFD700,#FF6B00);box-shadow:0 0 8px 3px rgba(255,180,0,0.4);margin-bottom:6px;animation:diyaGlow 2s ease-in-out infinite}
    @keyframes diyaGlow{0%,100%{box-shadow:0 0 8px 3px rgba(255,180,0,0.4)}50%{box-shadow:0 0 14px 5px rgba(255,180,0,0.6)}}
    .btn-icon{margin-right:4px;font-size:15px}
    .hero-bottom-wave{position:absolute;bottom:0;left:0;right:0;z-index:4;pointer-events:none}
    .hero-bottom-wave svg{display:block;width:100%;height:80px}
    html[data-theme="dark"] .hero-bottom-wave svg path{fill:var(--page)}
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  private timers: any[] = [];
  stats = [
    { count: 6, prefix: '', suffix: '', label: 'Global Corridors', current: '0' },
    { count: 180, prefix: '$', suffix: '+', label: 'Avg Savings/Trip', current: '$0' },
    { count: 99.9, prefix: '', suffix: '%', label: 'Uptime', current: '0%' }
  ];
  diyas: { left: string; top: string; dur: string; del: string; sz: string; op: string }[] = [];
  festivals = [
    { icon: '🪔', name: 'Diwali Fares' },
    { icon: '🎨', name: 'Holi Deals' },
    { icon: '💒', name: 'Wedding Season' },
    { icon: '🥭', name: 'Summer Breaks' }
  ];

  constructor(public auth: AuthService) {
    for (let i = 0; i < 35; i++) {
      this.diyas.push({
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        dur: (10 + Math.random() * 18) + 's',
        del: (Math.random() * 12) + 's',
        sz: (2 + Math.random() * 4) + 'px',
        op: (0.3 + Math.random() * 0.5).toString()
      });
    }
  }

  ngOnInit() { this.animateCounters(); }
  ngOnDestroy() { this.timers.forEach(t => clearTimeout(t)); }

  scrollToBooking() { document.getElementById('flights')?.scrollIntoView({ behavior: 'smooth' }); }

  animateCounters() {
    const dur = 1800; const start = performance.now();
    const step = (ts: number) => {
      const p = Math.min((ts - start) / dur, 1); const e = 1 - Math.pow(1 - p, 3);
      this.stats.forEach(s => {
        let v = e * s.count;
        v = s.count % 1 === 0 ? Math.round(v) : Math.round(v * 10) / 10;
        s.current = s.prefix + v + s.suffix;
      });
      if (p < 1) requestAnimationFrame(step);
      else this.stats.forEach(s => s.current = s.prefix + s.count + s.suffix);
    };
    const t = setTimeout(() => requestAnimationFrame(step), 900);
    this.timers.push(t);
  }
}
