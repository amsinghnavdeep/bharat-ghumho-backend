import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HeritageSite {
  name: string;
  location: string;
  desc: string;
  icon: string;
  gradient: string;
  tag: string;
  tagClass: string;
}

@Component({
  selector: 'app-heritage-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="section-divider" aria-hidden="true"><span class="sd-mark"></span></div>
<section class="heritage" id="heritage">
  <div class="heritage-pattern pat-kalamkari"></div>
  <div class="w">
    <div class="sec-head sr">
      <div class="sec-tag gd">Heritage of India</div>
      <h2 class="sec-title">Timeless wonders<br>await your visit.</h2>
      <p class="sec-sub">From Mughal masterpieces to Dravidian temples, explore India's UNESCO treasures and hidden gems.</p>
    </div>

    <div class="heritage-grid">
      <div *ngFor="let s of sites; let i = index"
           class="heritage-card sr"
           [style.transition-delay]="(i * 0.08) + 's'">
        <div class="hc-visual" [style.background]="s.gradient">
          <span class="hc-icon">{{s.icon}}</span>
          <div class="hc-tag" [ngClass]="s.tagClass">{{s.tag}}</div>
        </div>
        <div class="hc-body">
          <h3>{{s.name}}</h3>
          <span class="hc-loc">{{s.location}}</span>
          <p>{{s.desc}}</p>
        </div>
      </div>
    </div>

    <div class="heritage-banner sr">
      <div class="hb-pattern pat-mandala"></div>
      <div class="hb-content">
        <div class="hb-stat">
          <strong>42</strong>
          <span>UNESCO World Heritage Sites</span>
        </div>
        <div class="hb-divider"></div>
        <div class="hb-stat">
          <strong>5000+</strong>
          <span>Years of Civilization</span>
        </div>
        <div class="hb-divider"></div>
        <div class="hb-stat">
          <strong>28</strong>
          <span>States to Explore</span>
        </div>
        <div class="hb-divider"></div>
        <div class="hb-stat">
          <strong>22</strong>
          <span>Official Languages</span>
        </div>
      </div>
    </div>
  </div>
</section>`
})
export class HeritageShowcaseComponent {
  sites: HeritageSite[] = [
    { name: 'Taj Mahal', location: 'Agra, Uttar Pradesh', desc: 'A white-marble mausoleum and UNESCO icon — the crown jewel of Mughal architecture and eternal symbol of love.', icon: '🕌', gradient: 'linear-gradient(135deg,#1A0A0F,#2E1218,#3D1420)', tag: 'UNESCO', tagClass: 'gd' },
    { name: 'Hampi Ruins', location: 'Karnataka', desc: 'Bouldered landscapes meet Vijayanagara-era temples — an open-air museum of medieval Dravidian splendour.', icon: '🏛️', gradient: 'linear-gradient(135deg,#0D1F3A,#1A3A5C,#0D7377)', tag: 'Explore', tagClass: 'sf' },
    { name: 'Varanasi Ghats', location: 'Uttar Pradesh', desc: 'The oldest living city on earth. Sacred ghats along the Ganges where spirituality meets centuries of tradition.', icon: '🪔', gradient: 'linear-gradient(135deg,#2A0E16,#5C1A2B,#7A1F2B)', tag: 'Spiritual', tagClass: 'gr' },
    { name: 'Rajasthan Forts', location: 'Jaipur, Jodhpur, Udaipur', desc: 'Amber, Mehrangarh, and City Palace — living monuments of Rajput valour and timeless desert royalty.', icon: '🏰', gradient: 'linear-gradient(135deg,#1A0A0F,#3A1A10,#5C2E0E)', tag: 'Royal', tagClass: 'gd' },
    { name: 'Kerala Backwaters', location: 'Alleppey, Kerala', desc: 'Lush green networks of lagoons, canals, and rivers — cruise on a houseboat through tropical serenity.', icon: '🌴', gradient: 'linear-gradient(135deg,#0A2E1A,#138808,#0D7377)', tag: 'Nature', tagClass: 'gr' },
    { name: 'Khajuraho Temples', location: 'Madhya Pradesh', desc: 'Nagara-style temples adorned with exquisite sculptural art — a UNESCO testament to Chandela craftsmanship.', icon: '🛕', gradient: 'linear-gradient(135deg,#2E1218,#5C2E0E,#C9911A)', tag: 'UNESCO', tagClass: 'gd' }
  ];
}
