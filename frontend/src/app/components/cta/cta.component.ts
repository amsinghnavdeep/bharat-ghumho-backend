import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cta',
  standalone: true,
  template: `
<div class="section-divider" aria-hidden="true"><span class="sd-mark"></span></div>
<section class="cta"><div class="w">
  <div class="cta-box sr">
    <!-- Mandala decorations -->
    <div class="cta-mandala cta-m1" aria-hidden="true"></div>
    <div class="cta-mandala cta-m2" aria-hidden="true"></div>
    <div class="cta-blob b1"></div>
    <div class="cta-blob b2"></div>
    <!-- Torana arch top -->
    <div class="cta-arch" aria-hidden="true">
      <svg viewBox="0 0 600 60" preserveAspectRatio="none">
        <path d="M0,60 Q150,10 300,40 Q450,70 600,40" fill="none" stroke="rgba(212,168,67,0.25)" stroke-width="2"/>
        <circle cx="0" cy="60" r="6" fill="rgba(212,168,67,0.3)"/>
        <circle cx="300" cy="40" r="8" fill="rgba(255,107,0,0.4)"/>
        <circle cx="600" cy="40" r="6" fill="rgba(212,168,67,0.3)"/>
      </svg>
    </div>
    <div class="cta-om" aria-hidden="true">ॐ</div>
    <h2>Ready to find your<br>best fare <span class="sf">home</span>?</h2>
    <p>Join 50,000+ Indians abroad who found a smarter way to book their journey back to Bharat.</p>
    <div class="cta-btns">
      <button class="btn-p has-ripple" (click)="scrollToFlights()">✈ Search Flights Free</button>
      <button class="btn-s" (click)="auth.openAppModal()">📱 Download App</button>
    </div>
    <div class="cta-trust">No credit card required &middot; Free forever &middot; 🙏 Built for Desis</div>
    <!-- Festival tags -->
    <div class="cta-festivals">
      <span class="cf-tag">🪔 Diwali deals</span>
      <span class="cf-tag">🎨 Holi fares</span>
      <span class="cf-tag">💒 Wedding season</span>
      <span class="cf-tag">🥭 Summer breaks</span>
    </div>
  </div>
</div></section>`
})
export class CtaComponent {
  constructor(public auth: AuthService) {}
  scrollToFlights() { document.getElementById('flights')?.scrollIntoView({ behavior: 'smooth' }); }
}
