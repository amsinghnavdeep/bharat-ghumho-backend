import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  template: `
<section class="features" id="features">
  <!-- Kalamkari lotus & vine background -->
  <div class="features-pattern pat-kalamkari" aria-hidden="true"></div>

  <!-- Madhubani-style border line at top -->
  <div class="features-border-top" aria-hidden="true">
    <svg viewBox="0 0 1440 18" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,9 C30,3 60,15 90,9 C120,3 150,15 180,9 C210,3 240,15 270,9 C300,3 330,15 360,9 C390,3 420,15 450,9 C480,3 510,15 540,9 C570,3 600,15 630,9 C660,3 690,15 720,9 C750,3 780,15 810,9 C840,3 870,15 900,9 C930,3 960,15 990,9 C1020,3 1050,15 1080,9 C1110,3 1140,15 1170,9 C1200,3 1230,15 1260,9 C1290,3 1320,15 1350,9 C1380,3 1410,15 1440,9" fill="none" stroke="rgba(201,145,26,0.35)" stroke-width="1.8"/>
      <path d="M0,14 C40,8 80,20 120,14 C160,8 200,20 240,14 C280,8 320,20 360,14 C400,8 440,20 480,14 C520,8 560,20 600,14 C640,8 680,20 720,14 C760,8 800,20 840,14 C880,8 920,20 960,14 C1000,8 1040,20 1080,14 C1120,8 1160,20 1200,14 C1240,8 1280,20 1320,14 C1360,8 1400,20 1440,14" fill="none" stroke="rgba(201,145,26,0.18)" stroke-width="1"/>
    </svg>
  </div>

  <div class="w">
    <div class="sec-head sr">
      <!-- Torana arch framing the tag -->
      <div class="torana-frame">
        <div class="sec-tag gd">
          <span class="tag-lotus">✿</span> Crafted for Desis
        </div>
      </div>
      <h2 class="sec-title">Built for the way<br><em class="display-italic">Indians travel.</em></h2>
      <!-- Madhubani divider under title -->
      <div class="madhubani-title-line" aria-hidden="true">
        <svg viewBox="0 0 320 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="10" x2="130" y2="10" stroke="rgba(201,145,26,0.3)" stroke-width="1"/>
          <ellipse cx="160" cy="10" rx="12" ry="6" stroke="rgba(201,145,26,0.5)" stroke-width="1.2"/>
          <circle cx="145" cy="10" r="3" fill="rgba(201,145,26,0.35)"/>
          <circle cx="175" cy="10" r="3" fill="rgba(201,145,26,0.35)"/>
          <circle cx="160" cy="10" r="2" fill="rgba(201,145,26,0.5)"/>
          <line x1="190" y1="10" x2="320" y2="10" stroke="rgba(201,145,26,0.3)" stroke-width="1"/>
        </svg>
      </div>
      <p class="sec-sub">Not another booking engine. A platform that understands multi-city family trips, wedding season, and 40kg suitcases.</p>
    </div>
    <div class="feat-grid">
      <!-- Hero card — spans 2 columns -->
      <div class="tilt-card hero-card temple-card sr">
        <div class="temple-arch" aria-hidden="true"></div>
        <div class="tc-icon sf">🗺</div>
        <h3>Multi-City Route Builder</h3>
        <p>Build complex itineraries across India. Compare airlines on every leg of your journey — all in one search.</p>
        <div class="mini-routes">
          <div class="mini-leg">
            <span class="ml-dot sf"></span>
            <strong>YYZ</strong><span class="arrow"> → </span><strong>DEL</strong>
            <span class="info">Air India · Direct</span><span class="mp">$689</span>
          </div>
          <div class="mini-leg">
            <span class="ml-dot gd"></span>
            <strong>DEL</strong><span class="arrow"> → </span><strong>GOI</strong>
            <span class="info">IndiGo · 2h 35m</span><span class="mp">$82</span>
          </div>
          <div class="mini-leg">
            <span class="ml-dot gr"></span>
            <strong>GOI</strong><span class="arrow"> → </span><strong>BOM</strong>
            <span class="info">Vistara · 1h 15m</span><span class="mp">$65</span>
          </div>
          <div class="mini-leg">
            <span class="ml-dot sf"></span>
            <strong>BOM</strong><span class="arrow"> → </span><strong>YYZ</strong>
            <span class="info">Emirates · 1 stop</span><span class="mp">$712</span>
          </div>
        </div>
        <div class="card-total-row">
          <span class="card-total-label">Total round trip</span>
          <span class="card-total-price">$1,548</span>
        </div>
      </div>

      <div class="tilt-card temple-card sr" style="transition-delay:.08s">
        <div class="temple-arch" aria-hidden="true"></div>
        <div class="tc-icon gr">🪔</div>
        <h3>Festival Calendar</h3>
        <p>Fare alerts for Diwali, Holi, Navratri and wedding season. Book at the right time, save hundreds.</p>
        <div class="feat-festivals">
          <div class="ff-item" *ngFor="let f of festivals">
            <span class="ff-icon">{{f.icon}}</span>
            <span class="ff-name">{{f.name}}</span>
            <span class="ff-date">{{f.date}}</span>
          </div>
        </div>
      </div>

      <div class="tilt-card temple-card sr" style="transition-delay:.16s">
        <div class="temple-arch" aria-hidden="true"></div>
        <div class="tc-icon sf">👨‍👩‍👧‍👦</div>
        <h3>Family Group Booking</h3>
        <p>Book for the whole family. Sit together, share baggage allowance, one dashboard for everyone.</p>
        <div class="feat-pill-row">
          <span class="feat-pill">Seat Selection</span>
          <span class="feat-pill">Shared Baggage</span>
          <span class="feat-pill">Group Check-in</span>
        </div>
      </div>

      <div class="tilt-card temple-card sr" style="transition-delay:.24s">
        <div class="temple-arch" aria-hidden="true"></div>
        <div class="tc-icon gd">🧳</div>
        <h3>Baggage Calculator</h3>
        <p>India trips mean extra luggage. Calculate excess fees across all airlines before you book.</p>
        <div class="baggage-bar">
          <div class="bg-track"><div class="bg-fill" style="width:72%"></div></div>
          <div class="bg-label"><span>23 kg free</span><span class="bg-excess">+5 kg = $48</span></div>
        </div>
      </div>

      <div class="tilt-card temple-card sr" style="transition-delay:.32s">
        <div class="temple-arch" aria-hidden="true"></div>
        <div class="tc-icon sf">🤖</div>
        <h3>AI Trip Planner</h3>
        <p>Family of 4, Diwali week, under $4000. Our AI plans flights, hotels and transfers in minutes.</p>
        <div class="ai-prompt-preview">
          <span class="aip-quote">"Plan my Diwali trip, 4 people, Toronto to Delhi, under $3,800"</span>
          <span class="aip-badge">AI ✦</span>
        </div>
      </div>

      <div class="tilt-card temple-card sr" style="transition-delay:.40s">
        <div class="temple-arch" aria-hidden="true"></div>
        <div class="tc-icon gr">🔔</div>
        <h3>Smart Fare Alerts</h3>
        <p>Set your route and budget. We monitor 24/7 and notify you the moment fares drop to your price.</p>
        <div class="alert-preview">
          <div class="ap-item"><span class="ap-dot green"></span><span>YYZ→DEL dropped to <strong>$649</strong></span></div>
          <div class="ap-item"><span class="ap-dot gold"></span><span>LHR→BOM · Watch active</span></div>
        </div>
      </div>
    </div>
  </div>
</section>`
})
export class FeaturesComponent {
  festivals = [
    { icon: '🪔', name: 'Diwali', date: 'Oct 20' },
    { icon: '🎨', name: 'Holi', date: 'Mar 14' },
    { icon: '💒', name: 'Wedding Season', date: 'Nov–Feb' },
  ];
}
