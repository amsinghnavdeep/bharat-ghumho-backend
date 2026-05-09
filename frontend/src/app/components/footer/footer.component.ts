import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
<footer class="footer">
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
            <svg width="32" height="28" viewBox="0 0 60 50" fill="none">
              <polygon points="30,2 58,28 42,28" fill="#FF6B00"/>
              <polygon points="30,2 18,28 30,18" fill="#E05E00"/>
              <polygon points="18,28 42,28 52,46 8,46" fill="#138808"/>
              <polygon points="30,18 42,28 36,38" fill="#0F6B06"/>
              <path d="M28,30 C28,30 26,34 24,36 C22,38 22,42 26,42 C28,42 30,40 32,38 C34,36 36,34 34,30 C33,28 29,28 28,30Z" fill="white" opacity="0.95"/>
            </svg>
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
          <p class="footer-copy">&copy; 2026 Bharat Ghumho &middot; Mississauga, ON &middot; New Delhi, IN</p>
        </div>
        <div class="footer-links">
          <div class="footer-col">
            <h4>✈ Product</h4>
            <a routerLink="/flights">Flight Search</a>
            <a routerLink="/hotels">Hotels</a>
            <a routerLink="/cars">Cars</a>
            <a routerLink="/holidays">Holidays</a>
            <a routerLink="/trip-planner">AI Trip Planner</a>
          </div>
          <div class="footer-col">
            <h4>🛠 Travel Tools</h4>
            <a href="#features">Multi-City Search</a>
            <a href="#">Baggage Calculator</a>
            <a href="#">Fare Alerts</a>
            <a href="#">Festival Calendar</a>
            <a href="#">Visa Help</a>
          </div>
          <div class="footer-col">
            <h4>🏢 Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
            <a href="#">Press</a>
            <a href="#">Contact</a>
          </div>
          <div class="footer-col">
            <h4>⚖ Legal</h4>
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
  <!-- Lotus border decoration -->
  <div class="footer-lotus-bar" aria-hidden="true">✿ ✿ ✿ ✿ ✿ ✿ ✿ ✿ ✿ ✿ ✿ ✿</div>
</footer>`
})
export class FooterComponent {}
