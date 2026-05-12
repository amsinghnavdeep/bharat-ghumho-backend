import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ArtForm {
  name: string;
  region: string;
  desc: string;
  icon: string;
  pattern: string;
  accent: string;
}

@Component({
  selector: 'app-arts-crafts',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="section-divider" aria-hidden="true"><span class="sd-mark"></span></div>
<section class="arts-crafts" id="arts-crafts">
  <div class="ac-pattern pat-paisley"></div>
  <div class="w">
    <div class="sec-head sr">
      <div class="sec-tag sf">Arts & Crafts</div>
      <h2 class="sec-title">India's living<br>art traditions.</h2>
      <p class="sec-sub">Discover the art forms passed down through generations. Each piece tells a story of devotion, nature, and community.</p>
    </div>

    <div class="ac-marquee">
      <div class="ac-track">
        <div *ngFor="let a of arts; let i = index" class="ac-card" [style.--ac-accent]="a.accent">
          <div class="ac-card-head">
            <span class="ac-icon">{{a.icon}}</span>
            <div class="ac-card-pattern" [ngClass]="a.pattern"></div>
          </div>
          <div class="ac-card-body">
            <h3>{{a.name}}</h3>
            <span class="ac-region">{{a.region}}</span>
            <p>{{a.desc}}</p>
          </div>
        </div>
        <div *ngFor="let a of arts; let i = index" class="ac-card" [style.--ac-accent]="a.accent" aria-hidden="true">
          <div class="ac-card-head">
            <span class="ac-icon">{{a.icon}}</span>
            <div class="ac-card-pattern" [ngClass]="a.pattern"></div>
          </div>
          <div class="ac-card-body">
            <h3>{{a.name}}</h3>
            <span class="ac-region">{{a.region}}</span>
            <p>{{a.desc}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="ac-highlight sr">
      <div class="ach-left">
        <div class="ach-badge">GI Tagged</div>
        <h3>Geographical Indications of India</h3>
        <p>Over 400 products across India carry the prestigious GI tag — from Darjeeling Tea to Mysore Silk. Travel to the source and bring home authentic, artisan-crafted treasures.</p>
      </div>
      <div class="ach-right">
        <div *ngFor="let g of giItems" class="ach-item">
          <span class="ach-dot" [style.background]="g.color"></span>
          <div>
            <strong>{{g.name}}</strong>
            <span>{{g.region}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`
})
export class ArtsCraftsComponent {
  arts: ArtForm[] = [
    { name: 'Madhubani', region: 'Bihar', desc: 'Intricate line-work depicting mythological scenes, painted by women of Mithila for centuries.', icon: '🎨', pattern: 'pat-lotus', accent: '#FF6B00' },
    { name: 'Tanjore Painting', region: 'Tamil Nadu', desc: 'Rich gold-leaf art adorning deities with vibrant colors, gems, and semi-precious stones.', icon: '✨', pattern: 'pat-rangoli', accent: '#C9911A' },
    { name: 'Warli Art', region: 'Maharashtra', desc: 'Tribal geometric art using circles, triangles, and lines to depict daily life and nature.', icon: '🔺', pattern: 'pat-warli', accent: '#7A1F2B' },
    { name: 'Pattachitra', region: 'Odisha', desc: 'Cloth-based scroll painting featuring mythological narratives and ornate borders.', icon: '📜', pattern: 'pat-paisley', accent: '#138808' },
    { name: 'Kalamkari', region: 'Andhra Pradesh', desc: 'Hand-painted or block-printed cotton textiles depicting epics and floral motifs.', icon: '🖊️', pattern: 'pat-kalamkari', accent: '#0D7377' },
    { name: 'Blue Pottery', region: 'Jaipur, Rajasthan', desc: 'Turco-Persian origin pottery with distinctive blue dye and floral patterns on quartz base.', icon: '🏺', pattern: 'pat-lotus', accent: '#1A3A5C' },
    { name: 'Dhokra Casting', region: 'Chhattisgarh', desc: 'Lost-wax metal casting technique over 4000 years old, creating tribal figurines and jewellery.', icon: '🗿', pattern: 'pat-rangoli', accent: '#5C2E0E' },
    { name: 'Chikankari', region: 'Lucknow, UP', desc: 'Delicate hand-embroidery on muslin with shadow-work and jali stitches, a Mughal legacy.', icon: '🧵', pattern: 'pat-mandala', accent: '#C9911A' }
  ];

  giItems = [
    { name: 'Darjeeling Tea', region: 'West Bengal', color: '#138808' },
    { name: 'Pashmina', region: 'Kashmir', color: '#C9911A' },
    { name: 'Mysore Silk', region: 'Karnataka', color: '#7A1F2B' },
    { name: 'Banarasi Saree', region: 'Varanasi', color: '#FF6B00' },
    { name: 'Kanchipuram Silk', region: 'Tamil Nadu', color: '#0D7377' },
    { name: 'Kolhapuri Chappal', region: 'Maharashtra', color: '#5C2E0E' }
  ];
}
