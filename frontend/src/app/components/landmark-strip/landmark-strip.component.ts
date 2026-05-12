import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Landmark {
  city: string;
  region: string;
  blurb: string;
  image: string;
  accent: 'sf' | 'gd' | 'gr' | 'pk' | 'mn';
  motif: string; // emoji
}

@Component({
  selector: 'app-landmark-strip',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
<section class="landmark-strip" id="discover-india">
  <div class="ls-pattern pat-kalamkari" aria-hidden="true"></div>

  <div class="w">
    <div class="sec-head sr">
      <div class="torana-frame">
        <div class="sec-tag gd"><span class="tag-lotus">✿</span> Incredible India</div>
      </div>
      <h2 class="sec-title">Discover the heart<br><em class="display-italic">of Bharat.</em></h2>
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
      <p class="sec-sub">From the Taj's marble glow to Kerala's emerald backwaters — every corner of India tells a story.</p>
    </div>

    <swiper-container #sw class="ls-swiper sr"
      slides-per-view="1.15"
      space-between="20"
      centered-slides="false"
      breakpoints='{"640":{"slidesPerView":2,"spaceBetween":22},"1024":{"slidesPerView":3,"spaceBetween":26}}'
      navigation="false"
      pagination="true"
      pagination-clickable="true"
      autoplay-delay="5500"
      autoplay-disable-on-interaction="false"
      loop="true"
      grab-cursor="true">
      <swiper-slide *ngFor="let l of landmarks">
        <article class="ls-card">
          <div class="ls-cover" [style.background-image]="'url(' + l.image + ')'">
            <div class="ls-overlay"></div>
            <div class="ls-motif" aria-hidden="true">{{l.motif}}</div>
            <span class="ls-region" [ngClass]="l.accent">{{l.region}}</span>
          </div>
          <div class="ls-body">
            <h3>{{l.city}}</h3>
            <p>{{l.blurb}}</p>
            <span class="ls-explore">Explore <span aria-hidden="true">→</span></span>
          </div>
        </article>
      </swiper-slide>
    </swiper-container>
  </div>
</section>`
})
export class LandmarkStripComponent implements AfterViewInit {
  @ViewChild('sw', { static: true }) sw!: ElementRef<HTMLElement>;

  landmarks: Landmark[] = [
    { city: 'Taj Mahal · Agra', region: 'Uttar Pradesh', blurb: 'A monument to eternal love, glowing pink at dawn and silver under moonlight.', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80', accent: 'gd', motif: '🕌' },
    { city: 'Hawa Mahal · Jaipur', region: 'Rajasthan', blurb: 'The Pink City\'s palace of winds — 953 latticed windows that breathe with the desert.', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80', accent: 'sf', motif: '🏛' },
    { city: 'Kerala Backwaters', region: 'God\'s Own Country', blurb: 'Drift through coconut-fringed canals on a houseboat as the sun melts into the lagoon.', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80', accent: 'gr', motif: '🌴' },
    { city: 'Varanasi Ghats', region: 'Banaras', blurb: 'India\'s spiritual heart — diyas drifting on the Ganges at sunset during Ganga Aarti.', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=900&q=80', accent: 'mn', motif: '🪔' },
    { city: 'Mysore Palace', region: 'Karnataka', blurb: 'A million bulbs illuminate this Indo-Saracenic marvel during Dussehra each year.', image: 'https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=900&q=80', accent: 'pk', motif: '👑' },
    { city: 'Goa Coastline', region: 'Konkan Coast', blurb: 'Sunset over Palolem, Portuguese chapels, beach shacks and the perfect king prawns.', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80', accent: 'sf', motif: '🌊' },
    { city: 'Khajuraho Temples', region: 'Madhya Pradesh', blurb: 'UNESCO-listed sandstone temples celebrated for their breathtaking 10th-century sculpture.', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=900&q=80', accent: 'gd', motif: '🛕' },
    { city: 'Leh-Ladakh', region: 'Himalayas', blurb: 'High-altitude monasteries, turquoise lakes and dramatic moonscape passes above 4,000m.', image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=900&q=80', accent: 'pk', motif: '⛰' }
  ];

  ngAfterViewInit(): void {
    // Swiper element is auto-registered via main.ts; no extra work needed.
  }
}
