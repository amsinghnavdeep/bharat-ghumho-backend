import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WeatherWidgetComponent } from '../weather-widget/weather-widget.component';

export interface DestinationCardData {
  code: string;
  name: string;
  country?: string;
  image?: string;
  fromPrice?: number;
  currency?: string;
  tagline?: string;
}

@Component({
  selector: 'app-destination-card',
  standalone: true,
  imports: [CommonModule, RouterLink, WeatherWidgetComponent],
  template: `
<a class="dest-card" [routerLink]="['/destination', d.code]">
  <div class="dest-cover" [style.background-image]="bg">
    <div class="dest-cover-overlay"></div>
    <div class="dest-cover-tag" *ngIf="d.tagline">{{d.tagline}}</div>
    <span class="dest-cover-code">{{d.code}}</span>
    <div class="dest-cover-arch" aria-hidden="true"></div>
  </div>
  <div class="dest-body">
    <div class="dest-row">
      <div>
        <strong>{{d.name}}</strong>
        <span class="dest-country" *ngIf="d.country">{{d.country}}</span>
      </div>
      <div class="dest-price" *ngIf="d.fromPrice">
        <small>From</small>
        <strong>{{d.currency || 'C$'}}{{d.fromPrice}}</strong>
      </div>
    </div>
    <app-weather-widget *ngIf="showWeather" [city]="d.name" />
  </div>
</a>`,
  styles: [`
    .dest-card{display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--border);border-radius:20px;overflow:hidden;box-shadow:var(--shadow-sm);transition:all .35s;text-decoration:none;color:inherit;position:relative;height:100%}
    .dest-card::before{content:'';position:absolute;inset:0;border-radius:20px;padding:1px;background:linear-gradient(135deg,transparent 60%,rgba(212,168,67,.45));-webkit-mask:linear-gradient(#000,#000) content-box,linear-gradient(#000,#000);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;opacity:0;transition:opacity .35s}
    .dest-card:hover{box-shadow:var(--shadow-lg);transform:translateY(-6px);border-color:rgba(212,168,67,.35)}
    .dest-card:hover::before{opacity:1}
    .dest-cover{position:relative;height:170px;background-size:cover;background-position:center;background-color:#1A0A0F;overflow:hidden}
    .dest-card:hover .dest-cover{transform:scale(1.02)}
    .dest-cover{transition:transform .6s ease}
    .dest-cover-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(26,10,15,.15) 0%,transparent 35%,rgba(26,10,15,.55) 100%);pointer-events:none}
    .dest-cover-arch{position:absolute;left:0;right:0;bottom:-1px;height:18px;background:radial-gradient(20px 18px at 25px 18px,var(--surface) 99%,transparent 100%) repeat-x;background-size:50px 18px;pointer-events:none}
    .dest-cover-tag{position:absolute;top:12px;left:12px;background:linear-gradient(135deg,#FF6B00,#D4A843);color:#fff;padding:5px 12px;border-radius:100px;font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.6px;font-family:var(--font-ui);box-shadow:0 4px 12px rgba(255,107,0,.35);border:1px solid rgba(255,255,255,.18)}
    .dest-cover-code{position:absolute;top:12px;right:12px;background:rgba(26,10,15,.6);color:#fff;padding:4px 10px;border-radius:8px;font-size:10.5px;font-weight:900;letter-spacing:1.2px;font-family:var(--font-ui);backdrop-filter:blur(6px);border:1px solid rgba(212,168,67,.3)}
    .dest-body{padding:16px 16px 14px;display:flex;flex-direction:column;gap:10px;flex:1}
    .dest-row{display:flex;justify-content:space-between;align-items:flex-start;gap:8px}
    .dest-row strong{font-size:17px;font-weight:800;display:block;color:var(--text-1);font-family:var(--font-display);letter-spacing:-.3px}
    .dest-country{font-size:11.5px;color:var(--text-3);display:block;font-family:var(--font-ui);margin-top:2px;letter-spacing:.3px}
    .dest-price{text-align:right}
    .dest-price small{display:block;font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:.6px;font-family:var(--font-ui);font-weight:700}
    .dest-price strong{font-size:19px;font-weight:900;background:linear-gradient(135deg,#FF6B00,#D4A843);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-family:var(--font-ui)}
  `]
})
export class DestinationCardComponent {
  @Input() d!: DestinationCardData;
  @Input() showWeather = false;
  get bg() { return this.d.image ? `url(${this.d.image})` : 'linear-gradient(135deg,#FF6B00,#138808)'; }
}
