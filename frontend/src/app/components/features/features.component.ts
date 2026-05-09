import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  template: `
<section class="features" id="features">
  <!-- Paisley background -->
  <div class="features-pattern pat-paisley" aria-hidden="true"></div>
  <div class="w">
    <div class="sec-head sr">
      <div class="sec-tag gd">
        <span class="tag-lotus">✿</span> Crafted for Desis
      </div>
      <h2 class="sec-title">Built for the way<br><em class="display-italic">Indians travel.</em></h2>
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
