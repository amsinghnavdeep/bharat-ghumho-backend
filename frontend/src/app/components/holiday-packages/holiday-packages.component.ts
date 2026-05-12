import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Pkg {
  name: string;
  nights: number;
  cities: string[];
  image: string;
  pricePerPerson: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  inclusions: string[];
  tag?: string;
  tagClass?: 'sf' | 'gd' | 'gr' | 'mn';
}

@Component({
  selector: 'app-holiday-packages',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
<section class="packages-section" id="packages">
  <div class="packages-pattern pat-paisley" aria-hidden="true"></div>

  <div class="w">
    <div class="sec-head sr">
      <div class="torana-frame">
        <div class="sec-tag sf"><span class="tag-lotus">✿</span> Curated Journeys</div>
      </div>
      <h2 class="sec-title">Featured holiday<br><em class="display-italic">packages.</em></h2>
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
      <p class="sec-sub">Hand-picked itineraries by our India experts. Flights, stays, transfers, guides — sorted.</p>
    </div>

    <div class="pkg-grid">
      <a *ngFor="let p of packages; let i = index" class="pkg-card sr"
        routerLink="/holidays" [style.transition-delay]="(i * 0.08) + 's'">
        <div class="pkg-cover" [style.background-image]="'url(' + p.image + ')'">
          <div class="pkg-overlay"></div>
          <div class="pkg-arch-top" aria-hidden="true"></div>
          <span *ngIf="p.tag" class="pkg-tag" [ngClass]="p.tagClass || 'sf'">{{p.tag}}</span>
          <span class="pkg-nights">{{p.nights}} nights</span>
        </div>
        <div class="pkg-body">
          <h3>{{p.name}}</h3>
          <div class="pkg-cities">
            <span *ngFor="let c of p.cities; let last = last">
              {{c}}<span *ngIf="!last" class="pkg-dot">·</span>
            </span>
          </div>
          <div class="pkg-includes">
            <span *ngFor="let inc of p.inclusions" class="pkg-inc">{{inc}}</span>
          </div>
          <div class="pkg-foot">
            <div class="pkg-rating">
              <span class="pkg-stars">★ {{p.rating}}</span>
              <span class="pkg-rev">({{p.reviews}})</span>
            </div>
            <div class="pkg-price-block">
              <small *ngIf="p.originalPrice" class="pkg-strike">{{currency}}{{p.originalPrice | number:'1.0-0'}}</small>
              <strong>{{currency}}{{p.pricePerPerson | number:'1.0-0'}}</strong>
              <small class="pkg-pp">per person</small>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</section>`
})
export class HolidayPackagesComponent {
  currency = '$';
  packages: Pkg[] = [
    {
      name: 'Golden Triangle Heritage',
      nights: 6,
      cities: ['Delhi', 'Agra', 'Jaipur'],
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80',
      pricePerPerson: 1190,
      originalPrice: 1450,
      rating: 4.9,
      reviews: 1284,
      inclusions: ['4★ Stays', 'Daily Breakfast', 'AC Cab', 'Local Guide'],
      tag: 'Bestseller',
      tagClass: 'sf'
    },
    {
      name: 'Kerala Backwaters Escape',
      nights: 5,
      cities: ['Kochi', 'Munnar', 'Alleppey'],
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80',
      pricePerPerson: 920,
      originalPrice: 1100,
      rating: 4.8,
      reviews: 942,
      inclusions: ['Houseboat Night', 'Tea Plantation', 'Spice Walk', 'All Transfers'],
      tag: 'Honeymoon Pick',
      tagClass: 'gr'
    },
    {
      name: 'Rajasthan Royals',
      nights: 8,
      cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Pushkar'],
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80',
      pricePerPerson: 1640,
      originalPrice: 1980,
      rating: 4.9,
      reviews: 678,
      inclusions: ['Heritage Haveli', 'Camel Safari', 'Palace Dinner', 'Folk Show'],
      tag: 'Luxury',
      tagClass: 'gd'
    },
    {
      name: 'Himalayan Spiritual Circuit',
      nights: 7,
      cities: ['Rishikesh', 'Haridwar', 'Mussoorie'],
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=900&q=80',
      pricePerPerson: 1085,
      originalPrice: 1240,
      rating: 4.7,
      reviews: 412,
      inclusions: ['Yoga Sessions', 'Ganga Aarti', 'Trek + Cable Car', 'Vegetarian Meals'],
      tag: 'Wellness',
      tagClass: 'mn'
    }
  ];
}
