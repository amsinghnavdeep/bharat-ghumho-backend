import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  template: `
<section class="reviews" id="reviews">
  <div class="reviews-pattern" aria-hidden="true"></div>
  <div class="w">
    <div class="sec-head sr">
      <div class="sec-tag sf"><span class="tag-lotus">✿</span> Traveller Stories</div>
      <h2 class="sec-title">Trusted by thousands<br><em class="display-italic">going home.</em></h2>
      <p class="sec-sub">Real stories from the Indian diaspora who found a better way to book their journey back home.</p>
    </div>
    <div class="rev-grid">
      <div *ngFor="let r of reviews; let i = index" class="rev-card mehndi-card sr" [style.transition-delay]="(i * 0.09) + 's'">
        <!-- Mehndi corner decoration -->
        <div class="mehndi-corner tl" aria-hidden="true">
          <svg viewBox="0 0 40 40" fill="none"><path d="M2,38 Q2,2 38,2" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5"/><circle cx="8" cy="32" r="2" fill="currentColor" opacity="0.4"/><circle cx="32" cy="8" r="2" fill="currentColor" opacity="0.4"/><path d="M2,20 Q12,12 20,20 Q28,28 38,20" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/></svg>
        </div>
        <div class="mehndi-corner br" aria-hidden="true">
          <svg viewBox="0 0 40 40" fill="none"><path d="M38,2 Q38,38 2,38" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5"/><circle cx="32" cy="8" r="2" fill="currentColor" opacity="0.4"/><circle cx="8" cy="32" r="2" fill="currentColor" opacity="0.4"/></svg>
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
    </div>
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
