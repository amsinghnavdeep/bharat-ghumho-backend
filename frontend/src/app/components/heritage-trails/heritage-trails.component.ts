import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Trail {
  name: string;
  desc: string;
  stops: string[];
  duration: string;
  icon: string;
  gradient: string;
  tagClass: string;
}

@Component({
  selector: 'app-heritage-trails',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="section-divider" aria-hidden="true"><span class="sd-mark"></span></div>
<section class="trails" id="trails">
  <div class="trails-bg pat-warli"></div>
  <div class="w">
    <div class="sec-head sr">
      <div class="sec-tag gr">Heritage Trails</div>
      <h2 class="sec-title">Curated journeys<br>across India.</h2>
      <p class="sec-sub">Multi-city heritage trails designed for the culturally curious. Each route connects India's most iconic landmarks.</p>
    </div>

    <div class="trail-cards">
      <div *ngFor="let t of trails; let i = index"
           class="trail-card sr"
           [style.transition-delay]="(i * 0.1) + 's'">
        <div class="tc-header" [style.background]="t.gradient">
          <span class="tc-icon">{{t.icon}}</span>
          <div class="tc-dur">{{t.duration}}</div>
        </div>
        <div class="tc-content">
          <h3>{{t.name}}</h3>
          <p>{{t.desc}}</p>
          <div class="tc-route">
            <div *ngFor="let s of t.stops; let last = last" class="tc-stop">
              <div class="tc-dot" [ngClass]="t.tagClass"></div>
              <span>{{s}}</span>
              <span *ngIf="!last" class="tc-arrow">&#8594;</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="trails-cta sr">
      <div class="trails-cta-inner">
        <div class="trails-cta-pattern pat-mandala"></div>
        <div class="trails-cta-content">
          <h3>Plan Your Cultural Journey</h3>
          <p>Our AI Trip Planner builds heritage-focused itineraries with flights, hotels, and local guides — all in one search.</p>
          <button class="btn-p" (click)="scrollToPlanner()">Plan My Trip</button>
        </div>
        <div class="trails-cta-stats">
          <div class="tcs-item"><strong>500+</strong><span>Heritage Experiences</span></div>
          <div class="tcs-item"><strong>120+</strong><span>Local Guides</span></div>
          <div class="tcs-item"><strong>4.9</strong><span>Avg Rating</span></div>
        </div>
      </div>
    </div>
  </div>
</section>`
})
export class HeritageTrailsComponent {
  trails: Trail[] = [
    {
      name: 'Golden Triangle Classic',
      desc: 'The quintessential first-timer\'s route — Mughal splendour, pink city charm, and the capital\'s grandeur.',
      stops: ['Delhi', 'Agra', 'Jaipur'],
      duration: '7 Days',
      icon: '🕌',
      gradient: 'linear-gradient(135deg,#C9911A,#FF6B00)',
      tagClass: 'sf'
    },
    {
      name: 'Temple Trail of the South',
      desc: 'Dravidian temple architecture, Carnatic music, and the spiritual heart of peninsular India.',
      stops: ['Chennai', 'Mahabalipuram', 'Madurai', 'Rameswaram'],
      duration: '10 Days',
      icon: '🛕',
      gradient: 'linear-gradient(135deg,#7A1F2B,#C9911A)',
      tagClass: 'gd'
    },
    {
      name: 'Himalayan Spiritual Path',
      desc: 'Sacred pilgrimage through mountain ashrams, river temples, and the yoga capital of the world.',
      stops: ['Haridwar', 'Rishikesh', 'Devprayag', 'Badrinath'],
      duration: '12 Days',
      icon: '🏔️',
      gradient: 'linear-gradient(135deg,#0D7377,#138808)',
      tagClass: 'gr'
    },
    {
      name: 'Royal Rajasthan Circuit',
      desc: 'Desert forts, lake palaces, and colourful bazaars — ride the Maharaja trail across Rajasthan.',
      stops: ['Jaipur', 'Jodhpur', 'Jaisalmer', 'Udaipur'],
      duration: '14 Days',
      icon: '🏰',
      gradient: 'linear-gradient(135deg,#5C2E0E,#C9911A,#FF6B00)',
      tagClass: 'sf'
    }
  ];

  scrollToPlanner() {
    document.getElementById('flights')?.scrollIntoView({ behavior: 'smooth' });
  }
}
