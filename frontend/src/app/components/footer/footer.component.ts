import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
<footer class="footer">
  <!-- Mughal skyline divider -->
  <div class="footer-skyline" aria-hidden="true">
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="skyGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#D4A843" stop-opacity=".5"/>
          <stop offset="100%" stop-color="#7A1F2B" stop-opacity=".7"/>
        </linearGradient>
      </defs>
      <!-- Taj Mahal silhouette -->
      <g fill="url(#skyGrad)">
        <path d="M200 100 L200 70 L210 70 L210 60 L220 60 C220 50 230 40 240 40 C240 30 250 20 260 20 L260 8 L270 8 L275 0 L280 8 L290 8 L290 20 C300 20 310 30 310 40 C320 40 330 50 330 60 L340 60 L340 70 L350 70 L350 100 Z"/>
        <rect x="268" y="45" width="14" height="55" fill="#7A1F2B" fill-opacity=".5"/>
        <!-- Red Fort -->
        <path d="M450 100 L450 65 L465 65 L465 50 L480 50 L480 65 L495 65 L495 50 L510 50 L510 65 L525 65 L525 50 L540 50 L540 65 L555 65 L555 50 L570 50 L570 65 L580 65 L580 100 Z"/>
        <!-- Gateway of India -->
        <path d="M700 100 L700 40 L720 40 L720 30 L740 30 L740 20 L780 20 L780 30 L800 30 L800 40 L820 40 L820 100 Z"/>
        <rect x="750" y="50" width="20" height="50" fill="#7A1F2B" fill-opacity=".4" rx="10"/>
        <!-- Qutub Minar -->
        <path d="M960 100 L960 80 L955 80 L955 55 L957 55 L957 30 L959 30 L959 12 L965 12 L965 30 L967 30 L967 55 L969 55 L969 80 L964 80 L964 100 Z"/>
        <!-- Hawa Mahal -->
        <path d="M1090 100 L1090 60 L1100 60 L1100 50 L1108 50 L1108 40 L1115 40 L1120 30 L1125 40 L1132 40 L1132 50 L1140 50 L1140 60 L1150 60 L1150 50 L1158 50 L1158 40 L1165 40 L1170 30 L1175 40 L1182 40 L1182 50 L1190 50 L1190 60 L1200 60 L1200 100 Z"/>
        <!-- Lotus dome -->
        <path d="M1290 100 L1290 70 C1290 55 1310 50 1320 50 C1330 50 1350 55 1350 70 L1350 100 Z"/>
      </g>
    </svg>
  </div>
  <!-- Top wave -->
  <div class="footer-wave-top" aria-hidden="true">
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
      <path d="M0,0 L0,30 Q180,60 360,30 Q540,0 720,30 Q900,60 1080,30 Q1260,0 1440,30 L1440,0 Z" fill="var(--navy)"/>
    </svg>
  </div>
  <div class="footer-body">
    <div class="w">
      <div class="footer-inner">
        <div class="footer-brand">
          <!-- Logo -->
          <div class="footer-logo">
            <img src="assets/logo-bird.png" alt="Bharat Ghumho" width="40" height="34" class="footer-logo-img" />
            <span>Bharat<em>Ghumho</em></span>
          </div>
          <p class="footer-devanagari">भारत घूमो</p>
          <p class="footer-tagline">Find the best fare home. Every time.</p>
          <span class="made-in-india" title="Made in India">
            <span class="mii-flag" aria-hidden="true"><div class="sf"></div><div class="wh"></div><div class="gr"></div></span>
            Made with ♥ in India
          </span>
          <!-- Indian corridors badge -->
          <div class="footer-corridors">
            <span class="corridor-item">🇨🇦 Canada</span>
            <span class="corridor-item">🇬🇧 UK</span>
            <span class="corridor-item">🇦🇪 UAE</span>
            <span class="corridor-item">🇺🇸 USA</span>
            <span class="corridor-item">🇦🇺 AUS</span>
            <span class="corridor-item">🇸🇬 SGP</span>
          </div>
          <!-- Social icons -->
          <div class="footer-social" aria-label="Follow us">
            <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
            <a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.8c-.7.3-1.5.5-2.4.6.9-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1A4 4 0 0 0 12 8.7c0 .3 0 .6.1.9-3.3-.2-6.3-1.8-8.3-4.2-.3.6-.5 1.3-.5 2 0 1.4.7 2.6 1.8 3.3-.7 0-1.3-.2-1.8-.5 0 2 1.4 3.6 3.2 4-.3.1-.7.1-1.1.1-.3 0-.5 0-.8-.1.5 1.6 2 2.8 3.8 2.8a8 8 0 0 1-5 1.7H2a11.4 11.4 0 0 0 6.2 1.8c7.4 0 11.5-6.2 11.5-11.5v-.5c.8-.6 1.5-1.3 2-2.1z"/></svg></a>
            <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9V14.9H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></svg></a>
            <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.4a3 3 0 0 0-2.1-2.1c-1.9-.5-9.4-.5-9.4-.5s-7.5 0-9.4.5A3 3 0 0 0 0 7.4a31 31 0 0 0 0 9.2 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 0-9.2zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg></a>
            <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.3 18.4H5.7V9.7h2.6v8.7zM7 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm11.4 9.9h-2.6v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.3H10.2V9.7h2.5v1.2a2.8 2.8 0 0 1 2.5-1.4c2.7 0 3.2 1.8 3.2 4.1v4.8z"/></svg></a>
          </div>
          <p class="footer-copy">&copy; 2026 Bharat Ghumho &middot; Mississauga, ON &middot; New Delhi, IN</p>
        </div>
        <div class="footer-links">
          <div class="footer-col">
            <h4><svg class="foot-h" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg> Product</h4>
            <a routerLink="/flights">Flight Search</a>
            <a routerLink="/hotels">Hotels</a>
            <a routerLink="/cars">Cars</a>
            <a routerLink="/holidays">Holidays/Honeymoon</a>
          </div>
          <div class="footer-col">
            <h4><svg class="foot-h" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> Travel Tools</h4>
            <a href="#features">Multi-City Search</a>
            <a href="#">Baggage Calculator</a>
            <a href="#">Fare Alerts</a>
            <a href="#">Festival Calendar</a>
            <a href="#">Visa Help</a>
          </div>
          <div class="footer-col">
            <h4><svg class="foot-h" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v8h4"/><path d="M18 9h2a2 2 0 0 1 2 2v11h-4"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg> Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
            <a href="#">Press</a>
            <a href="#">Contact</a>
          </div>
          <div class="footer-col">
            <h4><svg class="foot-h" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 16l3-8 3 8c-2 1-4 1-6 0"/><path d="M2 16l3-8 3 8c-2 1-4 1-6 0"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg> Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Help Centre</a>
            <a href="#">API Docs</a>
          </div>
        </div>
      </div>
      <!-- Bottom bar -->
      <div class="footer-bottom">
        <span>Built with <span style="color:#FF6B00">♥</span> for the Indian diaspora 🙏</span>
        <div class="footer-tricolor" aria-label="Indian flag colours">
          <div class="tc-saffron"></div>
          <div class="tc-white"></div>
          <div class="tc-green"></div>
        </div>
        <span class="footer-om">ॐ</span>
      </div>
    </div>
  </div>
  <!-- Peacock-feather chain decoration -->
  <div class="footer-lotus-bar" aria-hidden="true">
    <svg viewBox="0 0 480 16" preserveAspectRatio="xMidYMid meet" class="feather-chain">
      <line x1="0" y1="8" x2="480" y2="8" stroke="#D4A843" stroke-opacity=".18" stroke-width="1" stroke-dasharray="2 5"/>
      <g class="feather-eyes">
        <g transform="translate(16,8)"><ellipse rx="6" ry="3.5" fill="#0D7377" fill-opacity=".75"/><ellipse rx="3.5" ry="2" fill="#D4A843"/><circle r=".8" fill="#1A0A0F"/></g>
        <g transform="translate(48,8)"><ellipse rx="6" ry="3.5" fill="#0D7377" fill-opacity=".75"/><ellipse rx="3.5" ry="2" fill="#D4A843"/><circle r=".8" fill="#1A0A0F"/></g>
        <g transform="translate(80,8)"><ellipse rx="6" ry="3.5" fill="#0D7377" fill-opacity=".75"/><ellipse rx="3.5" ry="2" fill="#D4A843"/><circle r=".8" fill="#1A0A0F"/></g>
        <g transform="translate(112,8)"><ellipse rx="6" ry="3.5" fill="#0D7377" fill-opacity=".75"/><ellipse rx="3.5" ry="2" fill="#D4A843"/><circle r=".8" fill="#1A0A0F"/></g>
        <g transform="translate(144,8)"><ellipse rx="6" ry="3.5" fill="#0D7377" fill-opacity=".75"/><ellipse rx="3.5" ry="2" fill="#D4A843"/><circle r=".8" fill="#1A0A0F"/></g>
        <g transform="translate(176,8)"><ellipse rx="6" ry="3.5" fill="#0D7377" fill-opacity=".75"/><ellipse rx="3.5" ry="2" fill="#D4A843"/><circle r=".8" fill="#1A0A0F"/></g>
        <g transform="translate(208,8)"><ellipse rx="6" ry="3.5" fill="#0D7377" fill-opacity=".75"/><ellipse rx="3.5" ry="2" fill="#D4A843"/><circle r=".8" fill="#1A0A0F"/></g>
        <g transform="translate(240,8)"><ellipse rx="6" ry="3.5" fill="#0D7377" fill-opacity=".75"/><ellipse rx="3.5" ry="2" fill="#D4A843"/><circle r=".8" fill="#1A0A0F"/></g>
        <g transform="translate(272,8)"><ellipse rx="6" ry="3.5" fill="#0D7377" fill-opacity=".75"/><ellipse rx="3.5" ry="2" fill="#D4A843"/><circle r=".8" fill="#1A0A0F"/></g>
        <g transform="translate(304,8)"><ellipse rx="6" ry="3.5" fill="#0D7377" fill-opacity=".75"/><ellipse rx="3.5" ry="2" fill="#D4A843"/><circle r=".8" fill="#1A0A0F"/></g>
        <g transform="translate(336,8)"><ellipse rx="6" ry="3.5" fill="#0D7377" fill-opacity=".75"/><ellipse rx="3.5" ry="2" fill="#D4A843"/><circle r=".8" fill="#1A0A0F"/></g>
        <g transform="translate(368,8)"><ellipse rx="6" ry="3.5" fill="#0D7377" fill-opacity=".75"/><ellipse rx="3.5" ry="2" fill="#D4A843"/><circle r=".8" fill="#1A0A0F"/></g>
        <g transform="translate(400,8)"><ellipse rx="6" ry="3.5" fill="#0D7377" fill-opacity=".75"/><ellipse rx="3.5" ry="2" fill="#D4A843"/><circle r=".8" fill="#1A0A0F"/></g>
        <g transform="translate(432,8)"><ellipse rx="6" ry="3.5" fill="#0D7377" fill-opacity=".75"/><ellipse rx="3.5" ry="2" fill="#D4A843"/><circle r=".8" fill="#1A0A0F"/></g>
        <g transform="translate(464,8)"><ellipse rx="6" ry="3.5" fill="#0D7377" fill-opacity=".75"/><ellipse rx="3.5" ry="2" fill="#D4A843"/><circle r=".8" fill="#1A0A0F"/></g>
      </g>
    </svg>
  </div>
</footer>`,
  styles: [`
    .footer-skyline{position:absolute;top:-18px;left:0;right:0;height:78px;pointer-events:none;z-index:1;line-height:0;overflow:hidden}
    .footer-skyline svg{width:100%;height:100%;display:block;opacity:.75}
    .footer-logo-img{width:40px;height:34px;object-fit:contain;flex-shrink:0;filter:drop-shadow(0 4px 12px rgba(255,107,0,.25))}
    .foot-h{width:14px;height:14px;display:inline-block;vertical-align:-2px;margin-right:4px;color:currentColor}
    .footer-social{display:flex;gap:10px;margin:14px 0 10px;flex-wrap:wrap}
    .footer-social a{width:34px;height:34px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:rgba(212,168,67,.1);border:1px solid rgba(212,168,67,.25);color:#D4A843;transition:all .3s}
    .footer-social a:hover{background:linear-gradient(135deg,rgba(212,168,67,.35),rgba(255,107,0,.25));border-color:rgba(212,168,67,.55);color:#fff;transform:translateY(-2px)}
    .footer-social svg{width:16px;height:16px}
    .feather-chain{width:100%;height:18px;display:block;max-width:880px;margin:0 auto}
  `]
})
export class FooterComponent {}
