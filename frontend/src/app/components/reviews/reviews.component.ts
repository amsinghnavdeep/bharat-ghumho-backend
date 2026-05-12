import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
<section class="reviews" id="reviews">
  <div class="reviews-pattern" aria-hidden="true"></div>
  <div class="w">
    <div class="sec-head sr">
      <div class="torana-frame">
        <div class="sec-tag sf"><span class="tag-lotus">✿</span> Traveller Stories</div>
      </div>
      <h2 class="sec-title">Trusted by thousands<br><em class="display-italic">going home.</em></h2>
      <div class="madhubani-title-line" aria-hidden="true">
        <svg viewBox="0 0 320 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="10" x2="130" y2="10" stroke="rgba(255,107,0,0.25)" stroke-width="1"/>
          <ellipse cx="160" cy="10" rx="12" ry="6" stroke="rgba(255,107,0,0.45)" stroke-width="1.2"/>
          <circle cx="145" cy="10" r="3" fill="rgba(255,107,0,0.3)"/>
          <circle cx="175" cy="10" r="3" fill="rgba(255,107,0,0.3)"/>
          <circle cx="160" cy="10" r="2" fill="rgba(255,107,0,0.5)"/>
          <line x1="190" y1="10" x2="320" y2="10" stroke="rgba(255,107,0,0.25)" stroke-width="1"/>
        </svg>
      </div>
      <p class="sec-sub">Real stories from the Indian diaspora who found a better way to book their journey back home.</p>
    </div>
    <swiper-container class="rev-swiper sr"
      slides-per-view="1.05"
      space-between="20"
      breakpoints='{"640":{"slidesPerView":2,"spaceBetween":22},"1024":{"slidesPerView":3,"spaceBetween":24}}'
      pagination="true"
      pagination-clickable="true"
      navigation="true"
      autoplay-delay="6500"
      autoplay-disable-on-interaction="false"
      loop="true"
      grab-cursor="true">
      <swiper-slide *ngFor="let r of reviews; let i = index">
      <div class="rev-card mehndi-card" [style.transition-delay]="(i * 0.09) + 's'">
        <!-- Mehndi corner decoration (madhubani style) -->
        <div class="mehndi-corner tl" aria-hidden="true">
          <svg viewBox="0 0 52 52" fill="none">
            <path d="M2,50 Q2,2 50,2" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.45"/>
            <path d="M8,50 Q8,8 50,8" stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.2"/>
            <ellipse cx="10" cy="28" rx="5" ry="12" fill="none" stroke="currentColor" stroke-width="0.9" opacity="0.3" transform="rotate(-45,10,28)"/>
            <ellipse cx="28" cy="10" rx="12" ry="5" fill="none" stroke="currentColor" stroke-width="0.9" opacity="0.3" transform="rotate(-45,28,10)"/>
            <circle cx="7" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="1" opacity="0.4"/>
            <circle cx="7" cy="7" r="1.5" fill="currentColor" opacity="0.35"/>
            <circle cx="18" cy="44" r="2.5" fill="currentColor" opacity="0.3"/>
            <circle cx="44" cy="18" r="2.5" fill="currentColor" opacity="0.3"/>
            <path d="M2,30 Q10,22 18,30" stroke="currentColor" stroke-width="0.9" fill="none" opacity="0.25"/>
            <path d="M30,2 Q22,10 30,18" stroke="currentColor" stroke-width="0.9" fill="none" opacity="0.25"/>
            <circle cx="12" cy="36" r="1.5" fill="currentColor" opacity="0.2"/>
            <circle cx="36" cy="12" r="1.5" fill="currentColor" opacity="0.2"/>
          </svg>
        </div>
        <div class="mehndi-corner br" aria-hidden="true">
          <svg viewBox="0 0 52 52" fill="none">
            <path d="M50,2 Q50,50 2,50" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.45"/>
            <path d="M44,2 Q44,44 2,44" stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.2"/>
            <ellipse cx="42" cy="24" rx="5" ry="12" fill="none" stroke="currentColor" stroke-width="0.9" opacity="0.3" transform="rotate(45,42,24)"/>
            <ellipse cx="24" cy="42" rx="12" ry="5" fill="none" stroke="currentColor" stroke-width="0.9" opacity="0.3" transform="rotate(45,24,42)"/>
            <circle cx="45" cy="45" r="4" fill="none" stroke="currentColor" stroke-width="1" opacity="0.4"/>
            <circle cx="45" cy="45" r="1.5" fill="currentColor" opacity="0.35"/>
            <circle cx="34" cy="8" r="2.5" fill="currentColor" opacity="0.3"/>
            <circle cx="8" cy="34" r="2.5" fill="currentColor" opacity="0.3"/>
            <path d="M50,22 Q42,30 34,22" stroke="currentColor" stroke-width="0.9" fill="none" opacity="0.25"/>
            <path d="M22,50 Q30,42 22,34" stroke="currentColor" stroke-width="0.9" fill="none" opacity="0.25"/>
          </svg>
        </div>
        <div class="rev-stars">★★★★★</div>
        <p class="rev-text">"{{r.text}}"</p>
        <div class="rev-author">
          <div class="rev-av" [ngClass]="r.avClass">{{r.initial}}</div>
          <div>
            <div class="rev-name">{{r.name}}</div>
            <div class="rev-route">✈ {{r.route}}</div>
          </div>
          <div class="rev-savings" *ngIf="r.savings">
            <span class="rs-label">Saved</span>
            <span class="rs-amount">{{r.savings}}</span>
          </div>
        </div>
      </div>
      </swiper-slide>
    </swiper-container>
    <!-- Trust row -->
    <div class="trust-row sr">
      <div class="trust-stat" *ngFor="let t of trustStats">
        <strong>{{t.value}}</strong><span>{{t.label}}</span>
      </div>
    </div>
  </div>
</section>`
})
export class ReviewsComponent {
  reviews = [
    { text: 'Multi-city actually works. Booked YYZ to DEL to GOI to BOM and back in one search. Saved $230 vs booking each leg separately.', name: 'Priya S.', route: 'Toronto → Delhi → Goa → Mumbai', initial: 'P', avClass: 'sf', savings: '$230' },
    { text: 'The festival calendar caught a fare drop before Navratri. Vancouver to Mumbai for $498. Best deal I have ever found online.', name: 'Rahul M.', route: 'Vancouver → Mumbai', initial: 'R', avClass: 'gr', savings: '$320' },
    { text: 'Booked 6 people for my sister\'s wedding. Group booking handled seating and baggage in one go. Absolute lifesaver.', name: 'Ankit J.', route: 'Calgary → Jaipur', initial: 'A', avClass: 'gd', savings: '$680' },
    { text: 'The baggage calculator saved me $200. I was about to book a cheap fare that would have cost a fortune in excess fees.', name: 'Deepa N.', route: 'Sydney → Bangalore', initial: 'D', avClass: 'sf', savings: '$200' },
    { text: 'I fly Dubai to Kerala 4 times a year. Fare alerts are a game changer. Saved over $600 this year alone.', name: 'Vijay R.', route: 'Dubai → Kochi', initial: 'V', avClass: 'gr', savings: '$600+' },
    { text: 'Holi fare prediction was spot on. Booked London to Delhi 2 months early and saved £380 vs last-minute prices. Gem.', name: 'Meera K.', route: 'London → Delhi', initial: 'M', avClass: 'gd', savings: '£380' },
  ];
  trustStats = [
    { value: '50K+', label: 'Happy travellers' },
    { value: '₹12 Cr+', label: 'Saved collectively' },
    { value: '4.9★', label: 'App store rating' },
    { value: '99.9%', label: 'Uptime' },
  ];
}
