import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface CultureCategory {
  icon: string;
  title: string;
  description: string;
  accent: 'sf' | 'gd' | 'gr' | 'pk' | 'mn';
  link: string;
  stats: string;
}

@Component({
  selector: 'app-culture-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
<section class="culture-section" id="explore-culture">
  <div class="culture-pattern" aria-hidden="true"></div>

  <div class="w">
    <div class="sec-head sr">
      <div class="torana-frame">
        <div class="sec-tag mn"><span class="tag-lotus">✿</span> Heritage &amp; Soul</div>
      </div>
      <h2 class="sec-title">Explore Indian<br><em class="display-italic">culture.</em></h2>
      <div class="madhubani-title-line" aria-hidden="true">
        <svg viewBox="0 0 320 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="10" x2="130" y2="10" stroke="rgba(122,31,43,0.3)" stroke-width="1"/>
          <ellipse cx="160" cy="10" rx="12" ry="6" stroke="rgba(122,31,43,0.5)" stroke-width="1.2"/>
          <circle cx="145" cy="10" r="3" fill="rgba(122,31,43,0.35)"/>
          <circle cx="175" cy="10" r="3" fill="rgba(122,31,43,0.35)"/>
          <circle cx="160" cy="10" r="2" fill="rgba(122,31,43,0.5)"/>
          <line x1="190" y1="10" x2="320" y2="10" stroke="rgba(122,31,43,0.3)" stroke-width="1"/>
        </svg>
      </div>
      <p class="sec-sub">5,000 years of art, architecture, faith and flavour — packaged into journeys you'll talk about for the rest of your life.</p>
    </div>

    <div class="culture-grid">
      <a *ngFor="let c of categories; let i = index" class="culture-card sr"
        [routerLink]="c.link" [style.transition-delay]="(i * 0.07) + 's'">
        <div class="cc-arch" [ngClass]="c.accent" aria-hidden="true"></div>
        <div class="cc-icon" [ngClass]="c.accent">{{c.icon}}</div>
        <h3>{{c.title}}</h3>
        <p>{{c.description}}</p>
        <div class="cc-foot">
          <span class="cc-stats">{{c.stats}}</span>
          <span class="cc-cta">Explore →</span>
        </div>
      </a>
    </div>
  </div>
</section>`
})
export class CultureCategoriesComponent {
  categories: CultureCategory[] = [
    { icon: '🛕', title: 'Heritage Sites', description: 'UNESCO-listed temples, forts and tombs that have shaped civilisations.', accent: 'gd', link: '/holidays', stats: '40+ UNESCO sites' },
    { icon: '🪔', title: 'Festivals', description: 'Diwali, Holi, Navratri, Onam — book around India\'s most magical weeks.', accent: 'sf', link: '/festival-calendar', stats: 'All-year calendar' },
    { icon: '🎨', title: 'Arts & Crafts', description: 'Madhubani, Pattachitra, Tanjore — meet the artisans behind the brush.', accent: 'mn', link: '/holidays', stats: '28 craft regions' },
    { icon: '🍛', title: 'Cuisine', description: 'From Awadhi biryani to Chettinad fire to Bengali sweet — eat your way home.', accent: 'sf', link: '/holidays', stats: 'Regional food trails' },
    { icon: '🧵', title: 'Handloom & Textiles', description: 'Banarasi silk, Kanjeevaram, Pashmina, Patola — woven memory you can wear.', accent: 'gd', link: '/holidays', stats: '12 textile regions' },
    { icon: '🕉', title: 'Spiritual Tourism', description: 'Char Dham, Buddhist circuit, Sufi shrines, Sikh gurudwaras — journeys for the soul.', accent: 'pk', link: '/holidays', stats: 'Sacred circuits' }
  ];
}
