import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-hero', standalone: true, imports: [CommonModule, RouterLink],
  template: `
<section class="hero" id="hero">
  <!-- Deep layered Indian background -->
  <div class="hero-bg-warm"></div>
  <div class="hero-kalamkari-bg" aria-hidden="true"></div>
  <div class="hero-overlay"></div>

  <!-- Animated diya particles -->
  <div class="hero-particles" aria-hidden="true">
    <div *ngFor="let p of diyas" class="diya-particle"
      [style.left]="p.left" [style.top]="p.top"
      [style.animationDuration]="p.dur" [style.animationDelay]="p.del"
      [style.width]="p.sz" [style.height]="p.sz" [style.opacity]="p.op"></div>
  </div>

  <!-- LEFT side kalamkari column ornament -->
  <div class="hero-kalam-left" aria-hidden="true">
    <svg viewBox="0 0 60 600" fill="none">
      <g stroke="#D4A843" stroke-opacity="0.18" stroke-width="1.2" fill="none">
        <line x1="30" y1="0" x2="30" y2="600"/>
        <ellipse cx="30" cy="80" rx="10" ry="24"/><ellipse cx="30" cy="80" rx="14" ry="28" stroke-opacity="0.08"/>
        <circle cx="30" cy="80" r="4" fill="#D4A843" fill-opacity="0.15"/>
        <ellipse cx="30" cy="180" rx="10" ry="24"/><ellipse cx="30" cy="180" rx="14" ry="28" stroke-opacity="0.08"/>
        <circle cx="30" cy="180" r="4" fill="#D4A843" fill-opacity="0.15"/>
        <ellipse cx="30" cy="280" rx="10" ry="24"/><ellipse cx="30" cy="280" rx="14" ry="28" stroke-opacity="0.08"/>
        <circle cx="30" cy="280" r="4" fill="#D4A843" fill-opacity="0.15"/>
        <ellipse cx="30" cy="380" rx="10" ry="24"/><ellipse cx="30" cy="380" rx="14" ry="28" stroke-opacity="0.08"/>
        <circle cx="30" cy="380" r="4" fill="#D4A843" fill-opacity="0.15"/>
        <ellipse cx="30" cy="480" rx="10" ry="24"/><ellipse cx="30" cy="480" rx="14" ry="28" stroke-opacity="0.08"/>
        <circle cx="30" cy="480" r="4" fill="#D4A843" fill-opacity="0.15"/>
        <path d="M30,56 Q20,68 10,80 Q20,92 30,104" stroke-opacity="0.12"/>
        <path d="M30,156 Q20,168 10,180 Q20,192 30,204" stroke-opacity="0.12"/>
        <path d="M30,256 Q20,268 10,280 Q20,292 30,304" stroke-opacity="0.12"/>
      </g>
    </svg>
  </div>

  <!-- RIGHT — Stunning Peacock Art (kalamkari style) -->
  <div class="hero-peacock-art" aria-hidden="true">
    <svg viewBox="0 0 520 520" class="peacock-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="eyeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#D4A843"/>
          <stop offset="35%" stop-color="#0B4E52"/>
          <stop offset="70%" stop-color="#0D7377"/>
          <stop offset="100%" stop-color="#138808"/>
        </radialGradient>
        <radialGradient id="bodyGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#138808"/>
          <stop offset="55%" stop-color="#0D7377"/>
          <stop offset="100%" stop-color="#0B3D2E"/>
        </radialGradient>
        <radialGradient id="bgGlow" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stop-color="rgba(13,115,119,0.15)"/>
          <stop offset="60%" stop-color="rgba(212,168,67,0.06)"/>
          <stop offset="100%" stop-color="transparent"/>
        </radialGradient>
        <linearGradient id="neckGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#138808"/>
          <stop offset="100%" stop-color="#0D7377"/>
        </linearGradient>
      </defs>

      <!-- Background glow circles -->
      <circle cx="262" cy="300" r="210" fill="url(#bgGlow)"/>
      <circle cx="262" cy="300" r="195" fill="none" stroke="rgba(212,168,67,0.07)" stroke-width="1"/>
      <circle cx="262" cy="300" r="165" fill="none" stroke="rgba(13,115,119,0.08)" stroke-width="0.8" stroke-dasharray="6 4"/>
      <circle cx="262" cy="300" r="135" fill="none" stroke="rgba(212,168,67,0.06)" stroke-width="1"/>

      <!-- Peacock tail feathers (13 feathers, -78° to +78°) -->
      <g *ngFor="let f of peacockFeathers" [attr.transform]="'translate(262,320) rotate(' + f.rot + ')'">
        <!-- Feather stem -->
        <line x1="0" y1="0" x2="0" [attr.y2]="f.stemEnd"
              stroke="#0B3D2E" stroke-width="1.2" [attr.opacity]="f.opacity * 0.55"/>
        <!-- Feather vane (ellipse shape) -->
        <ellipse cx="0" [attr.cy]="f.vaneCy" [attr.rx]="f.vaneHalf" [attr.ry]="f.vaneRy"
                 fill="rgba(13,115,119,0.18)" stroke="rgba(13,115,119,0.35)" stroke-width="0.8"
                 [attr.opacity]="f.opacity"/>
        <!-- Vane edge highlight -->
        <ellipse cx="0" [attr.cy]="f.vaneCy" [attr.rx]="f.vaneHalf - 2" [attr.ry]="f.vaneRy - 6"
                 fill="none" stroke="rgba(19,136,8,0.15)" stroke-width="0.5" [attr.opacity]="f.opacity"/>
        <!-- Eye outer glow -->
        <circle cx="0" [attr.cy]="f.tipY" [attr.r]="f.eyeOuter + 3"
                fill="rgba(19,136,8,0.1)" stroke="rgba(212,168,67,0.25)" stroke-width="0.8"
                [attr.opacity]="f.opacity"/>
        <!-- Eye outer ring -->
        <circle cx="0" [attr.cy]="f.tipY" [attr.r]="f.eyeOuter"
                fill="rgba(13,115,119,0.25)" stroke="rgba(212,168,67,0.55)" stroke-width="1.2"
                [attr.opacity]="f.opacity"/>
        <!-- Eye middle -->
        <circle cx="0" [attr.cy]="f.tipY" [attr.r]="f.eyeR"
                fill="rgba(11,78,82,0.6)" stroke="rgba(212,168,67,0.7)" stroke-width="1"
                [attr.opacity]="f.opacity"/>
        <!-- Eye inner dark -->
        <circle cx="0" [attr.cy]="f.tipY" [attr.r]="f.eyeInner"
                fill="rgba(11,17,32,0.7)" stroke="rgba(212,168,67,0.4)" stroke-width="0.8"
                [attr.opacity]="f.opacity"/>
        <!-- Eye gold highlight dot -->
        <circle cx="0" [attr.cy]="f.tipY" r="2.5" fill="#D4A843" [attr.opacity]="f.opacity"/>
        <!-- Decorative dots on stem -->
        <circle cx="0" [attr.cy]="f.dot1" r="1.5" fill="rgba(212,168,67,0.4)" [attr.opacity]="f.opacity * 0.6"/>
        <circle cx="0" [attr.cy]="f.dot2" r="1.5" fill="rgba(212,168,67,0.4)" [attr.opacity]="f.opacity * 0.6"/>
      </g>

      <!-- Decorative kalamkari ring at tail base -->
      <circle cx="262" cy="320" r="36" fill="rgba(13,115,119,0.12)"
              stroke="rgba(212,168,67,0.35)" stroke-width="1.5" stroke-dasharray="5 3"/>
      <circle cx="262" cy="320" r="28" fill="rgba(11,78,82,0.1)"
              stroke="rgba(212,168,67,0.2)" stroke-width="1"/>
      <!-- Lotus petals at tail base -->
      <g transform="translate(262,320)">
        <ellipse rx="5" ry="15" fill="rgba(212,168,67,0.25)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(0) translate(0,-20)"/>
        <ellipse rx="5" ry="15" fill="rgba(212,168,67,0.25)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(45) translate(0,-20)"/>
        <ellipse rx="5" ry="15" fill="rgba(212,168,67,0.25)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(90) translate(0,-20)"/>
        <ellipse rx="5" ry="15" fill="rgba(212,168,67,0.25)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(135) translate(0,-20)"/>
        <ellipse rx="5" ry="15" fill="rgba(212,168,67,0.25)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(180) translate(0,-20)"/>
        <ellipse rx="5" ry="15" fill="rgba(212,168,67,0.25)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(225) translate(0,-20)"/>
        <ellipse rx="5" ry="15" fill="rgba(212,168,67,0.25)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(270) translate(0,-20)"/>
        <ellipse rx="5" ry="15" fill="rgba(212,168,67,0.25)" stroke="rgba(212,168,67,0.5)" stroke-width="0.8" transform="rotate(315) translate(0,-20)"/>
      </g>

      <!-- Body -->
      <ellipse cx="262" cy="385" rx="42" ry="60" fill="url(#bodyGrad)" stroke="#0B3D2E" stroke-width="1.8"/>
      <!-- Breast pattern -->
      <ellipse cx="262" cy="368" rx="24" ry="30" fill="#138808" opacity="0.5" stroke="rgba(212,168,67,0.25)" stroke-width="0.8"/>
      <!-- Scale/feather pattern on breast -->
      <path d="M248,360 Q255,355 262,360 Q269,355 276,360" stroke="rgba(212,168,67,0.3)" stroke-width="0.8" fill="none"/>
      <path d="M246,368 Q254,363 262,368 Q270,363 278,368" stroke="rgba(212,168,67,0.3)" stroke-width="0.8" fill="none"/>
      <path d="M248,376 Q255,371 262,376 Q269,371 276,376" stroke="rgba(212,168,67,0.3)" stroke-width="0.8" fill="none"/>
      <!-- Wings (subtle) -->
      <path d="M220,385 Q195,360 208,325 Q222,338 228,385Z" fill="#0B4E52" stroke="#0B3D2E" stroke-width="1.2" opacity="0.75"/>
      <path d="M304,385 Q329,360 316,325 Q302,338 296,385Z" fill="#0B4E52" stroke="#0B3D2E" stroke-width="1.2" opacity="0.75"/>
      <!-- Wing highlight -->
      <path d="M220,375 Q205,358 212,335" stroke="rgba(19,136,8,0.3)" stroke-width="1" fill="none"/>
      <path d="M304,375 Q319,358 312,335" stroke="rgba(19,136,8,0.3)" stroke-width="1" fill="none"/>

      <!-- Neck (S-curve with dual stroke) -->
      <path d="M262,328 Q254,290 257,255 Q260,220 257,192" stroke="#0B3D2E" stroke-width="22" fill="none" stroke-linecap="round"/>
      <path d="M262,328 Q254,290 257,255 Q260,220 257,192" stroke="#0D7377" stroke-width="16" fill="none" stroke-linecap="round"/>
      <path d="M262,328 Q254,290 257,255 Q260,220 257,192" stroke="#138808" stroke-width="8" fill="none" stroke-linecap="round"/>
      <!-- Neck iridescent highlight -->
      <path d="M258,325 Q251,288 254,252 Q257,218 254,192" stroke="rgba(212,168,67,0.2)" stroke-width="3" fill="none" stroke-linecap="round"/>

      <!-- Head -->
      <circle cx="255" cy="178" r="24" fill="url(#bodyGrad)" stroke="#0B3D2E" stroke-width="1.8"/>
      <circle cx="255" cy="175" r="14" fill="#138808" opacity="0.4"/>
      <!-- Cheek patch -->
      <path d="M267,183 Q275,178 272,170" stroke="#0B3D2E" stroke-width="1" fill="rgba(19,136,8,0.4)"/>
      <!-- Eye -->
      <circle cx="247" cy="173" r="6" fill="#0B1120" stroke="#D4A843" stroke-width="1.2"/>
      <circle cx="246" cy="171" r="2.5" fill="rgba(255,255,255,0.65)"/>
      <!-- Beak -->
      <path d="M272,180 L286,183 L280,188 Z" fill="#D4A843" stroke="#0B3D2E" stroke-width="0.8"/>
      <!-- Head pattern (kalamkari detail) -->
      <path d="M244,165 Q252,160 260,165" stroke="rgba(212,168,67,0.35)" stroke-width="0.8" fill="none"/>

      <!-- Crown / Crest (5 feathers) -->
      <line x1="255" y1="155" x2="243" y2="128" stroke="#138808" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="243" cy="125" r="5.5" fill="#D4A843" stroke="#0B3D2E" stroke-width="1"/>
      <circle cx="243" cy="125" r="2.5" fill="#0B3D2E"/>
      <line x1="255" y1="155" x2="252" y2="124" stroke="#138808" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="252" cy="121" r="5.5" fill="#D4A843" stroke="#0B3D2E" stroke-width="1"/>
      <circle cx="252" cy="121" r="2.5" fill="#0B3D2E"/>
      <line x1="255" y1="155" x2="260" y2="122" stroke="#138808" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="260" cy="119" r="6" fill="#D4A843" stroke="#0B3D2E" stroke-width="1.2"/>
      <circle cx="260" cy="119" r="3" fill="#0B3D2E"/>
      <line x1="255" y1="155" x2="268" y2="128" stroke="#138808" stroke-width="2" stroke-linecap="round"/>
      <circle cx="268" cy="125" r="5" fill="#D4A843" stroke="#0B3D2E" stroke-width="1"/>
      <circle cx="268" cy="125" r="2" fill="#0B3D2E"/>
      <line x1="255" y1="155" x2="278" y2="136" stroke="#138808" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="278" cy="133" r="4" fill="#D4A843" stroke="#0B3D2E" stroke-width="0.8" opacity="0.8"/>

      <!-- Legs -->
      <line x1="249" y1="442" x2="238" y2="474" stroke="#0B3D2E" stroke-width="3" stroke-linecap="round"/>
      <line x1="275" y1="442" x2="286" y2="474" stroke="#0B3D2E" stroke-width="3" stroke-linecap="round"/>
      <!-- Feet (3 toes each) -->
      <path d="M238,474 L226,480 M238,474 L234,482 M238,474 L242,482" stroke="#0B3D2E" stroke-width="2" stroke-linecap="round"/>
      <path d="M286,474 L298,480 M286,474 L290,482 M286,474 L282,482" stroke="#0B3D2E" stroke-width="2" stroke-linecap="round"/>

      <!-- Ground lotus decoration -->
      <ellipse cx="262" cy="480" rx="70" ry="10" fill="rgba(212,168,67,0.06)" stroke="rgba(212,168,67,0.15)" stroke-width="1"/>
      <ellipse cx="262" cy="480" rx="45" ry="6" fill="rgba(19,136,8,0.05)" stroke="rgba(19,136,8,0.15)" stroke-width="0.8"/>

      <!-- Kalamkari decorative corner ornaments -->
      <g opacity="0.25" stroke="#D4A843" stroke-width="1" fill="none">
        <!-- Top right corner vine -->
        <path d="M480,30 Q470,45 450,40 Q440,55 460,65"/>
        <circle cx="480" cy="30" r="4" fill="#D4A843"/>
        <circle cx="460" cy="65" r="3" fill="#D4A843"/>
        <!-- Bottom right corner -->
        <path d="M490,490 Q475,475 460,480 Q445,465 455,450"/>
        <circle cx="490" cy="490" r="4" fill="#D4A843"/>
      </g>
    </svg>
  </div>

  <!-- Floating ornament plane -->
  <div class="hero-plane" aria-hidden="true">
    <svg viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="planeBody" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#FFFFFF"/><stop offset="60%" stop-color="#F1CD7C"/><stop offset="100%" stop-color="#D4A843"/>
        </linearGradient>
      </defs>
      <path d="M6 36 L46 22 L58 18 C60 17 62 19 60 21 L52 28 L26 50 C25 51 23 51 22 49 L18 42 L8 38 C6 37 6 37 6 36 Z" fill="url(#planeBody)" stroke="#7A1F2B" stroke-width="0.6"/>
      <path d="M22 49 L30 40 L34 44 L26 50 C25 51 23 51 22 49 Z" fill="#FF6B00" opacity="0.85"/>
      <path d="M46 22 L40 16 L36 18 L42 26 Z" fill="#FFFFFF" stroke="#D4A843" stroke-width="0.4"/>
    </svg>
  </div>
  <div class="hero-plane-trail" aria-hidden="true"></div>

  <div class="w">
    <div class="hero-content">
      <!-- Devanagari header with kalamkari style -->
      <div class="hero-devanagari-wrap">
        <span class="hero-deva-line"></span>
        <span class="hero-devanagari">भारत घूमो</span>
        <span class="hero-deva-line"></span>
      </div>
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
        <a class="btn-s" routerLink="/hotels">
          <span class="btn-icon">🏨</span> Book Hotel
        </a>
        <a class="btn-s" routerLink="/cars">
          <span class="btn-icon">🚗</span> Book Car
        </a>
        <a class="btn-s" routerLink="/holidays">
          <span class="btn-icon">🏝</span> Book Holiday/Honeymoon
        </a>
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
      <!-- Festival badges row -->
      <div class="hero-festival-row">
        <div class="festival-badge" *ngFor="let f of festivals">
          <span class="fst-icon">{{f.icon}}</span>
          <span>{{f.name}}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom torana arch wave -->
  <div class="hero-bottom-wave" aria-hidden="true">
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
      <path d="M0,80 L0,40 Q120,80 240,40 Q360,0 480,40 Q600,80 720,40 Q840,0 960,40 Q1080,80 1200,40 Q1320,0 1440,40 L1440,80 Z" fill="var(--cream)"/>
      <path d="M0,80 L0,55 Q180,75 360,55 Q540,35 720,55 Q900,75 1080,55 Q1260,35 1440,55 L1440,80 Z" fill="var(--cream)" opacity="0.5"/>
    </svg>
  </div>
</section>`,
  styles: [`
    .hero-kalamkari-bg{position:absolute;inset:0;z-index:1;opacity:1;pointer-events:none;
      background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><g fill='none' stroke='%23C9911A' stroke-opacity='.065' stroke-width='1.2'><ellipse cx='100' cy='100' rx='10' ry='26' transform='rotate(0,100,100)'/><ellipse cx='100' cy='100' rx='10' ry='26' transform='rotate(45,100,100)'/><ellipse cx='100' cy='100' rx='10' ry='26' transform='rotate(90,100,100)'/><ellipse cx='100' cy='100' rx='10' ry='26' transform='rotate(135,100,100)'/><circle cx='100' cy='100' r='9'/><circle cx='100' cy='100' r='4'/><path d='M114,86 Q132,62 148,52 Q162,42 172,32'/><path d='M86,114 Q62,132 48,152 Q38,166 28,172'/><path d='M114,114 Q132,138 148,148 Q162,162 172,172'/><path d='M86,86 Q62,62 48,48 Q38,32 28,28'/><circle cx='172' cy='32' r='6'/><circle cx='28' cy='172' r='6'/><circle cx='172' cy='172' r='6'/><circle cx='28' cy='28' r='6'/><circle cx='100' cy='56' r='3'/><circle cx='144' cy='100' r='3'/><circle cx='100' cy='144' r='3'/><circle cx='56' cy='100' r='3'/></g></svg>");
      background-size:200px 200px;}
    .hero-kalam-left{position:absolute;left:0;top:0;bottom:0;width:60px;z-index:2;pointer-events:none;opacity:.6}
    .hero-kalam-left svg{width:100%;height:100%}
    .hero-bg-warm{position:absolute;inset:0;background:radial-gradient(ellipse at 25% 50%, rgba(122,31,43,0.4) 0%, transparent 55%), radial-gradient(ellipse at 75% 20%, rgba(212,168,67,0.12) 0%, transparent 45%);z-index:0}
    .hero-peacock-art{position:absolute;top:50%;right:-5%;transform:translateY(-50%);width:54%;max-width:600px;z-index:1;pointer-events:none}
    .peacock-svg{width:100%;height:100%;filter:drop-shadow(0 0 40px rgba(13,115,119,0.2)) drop-shadow(0 0 80px rgba(212,168,67,0.08));animation:peacockBreathe 8s ease-in-out infinite}
    @keyframes peacockBreathe{0%,100%{transform:scale(1) translateY(0)}50%{transform:scale(1.015) translateY(-6px)}}
    .hero-devanagari-wrap{display:flex;align-items:center;gap:10px;margin-bottom:14px;animation:fadeInUp .6s ease-out both}
    .hero-devanagari{font-family:'Yatra One',serif;font-size:15px;letter-spacing:5px;color:var(--gold);opacity:0.8}
    .hero-deva-line{flex:0 0 30px;height:1px;background:linear-gradient(90deg,transparent,rgba(212,168,67,0.5))}
    .hero-deva-line:last-child{background:linear-gradient(270deg,transparent,rgba(212,168,67,0.5))}
    .hero-badges-row{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:24px;animation:fadeInUp .8s ease-out .05s both}
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

  peacockFeathers = Array.from({ length: 13 }, (_, i) => {
    const rot = -78 + i * 13;
    const dist = Math.abs(i - 6);
    const prog = 1 - dist / 6.5;
    const len = Math.round(148 + prog * 22);
    const eyeR = Math.round(10 + prog * 6);
    const op = Math.round((0.38 + prog * 0.62) * 100) / 100;
    return {
      rot,
      tipY: -len,
      stemEnd: -(len - 14),
      vaneCy: Math.round(-len * 0.46),
      vaneRy: Math.round(len * 0.42),
      vaneHalf: Math.round(5 + prog * 4),
      eyeR,
      eyeOuter: eyeR + 4,
      eyeInner: Math.round(eyeR * 0.45),
      opacity: op,
      dot1: Math.round(-len * 0.28),
      dot2: Math.round(-len * 0.60),
    };
  });

  constructor(public auth: AuthService, private router: Router) {
    for (let i = 0; i < 32; i++) {
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

  scrollToBooking() { this.router.navigate(['/flights']); }

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
