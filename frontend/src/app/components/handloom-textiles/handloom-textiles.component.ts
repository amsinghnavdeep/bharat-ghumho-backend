import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Textile {
  name: string;
  origin: string;
  desc: string;
  icon: string;
  weave: string;
  gradient: string;
}

@Component({
  selector: 'app-handloom-textiles',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="section-divider" aria-hidden="true"><span class="sd-mark"></span></div>
<section class="handloom" id="handloom">
  <div class="handloom-bg pat-kalamkari"></div>
  <div class="w">
    <div class="sec-head sr">
      <div class="sec-tag gr">Handloom & Textiles</div>
      <h2 class="sec-title">Woven by hand,<br>worn with pride.</h2>
      <p class="sec-sub">India's handloom heritage spans millennia. From the royal Banarasi to tribal Ikat, every weave tells a cultural story.</p>
    </div>

    <div class="hl-showcase">
      <div class="hl-featured sr">
        <div class="hlf-visual">
          <div class="hlf-gradient" style="background:linear-gradient(135deg,#5C2E0E,#C9911A,#7A1F2B)"></div>
          <span class="hlf-icon">🪡</span>
          <div class="hlf-badge">Most Coveted</div>
        </div>
        <div class="hlf-content">
          <h3>Banarasi Silk</h3>
          <span class="hlf-origin">Varanasi, Uttar Pradesh</span>
          <p>The pinnacle of Indian weaving. Gold and silver brocade sarees that take up to 6 months to handcraft — worn at weddings across India for over 500 years.</p>
          <div class="hlf-details">
            <div class="hlf-detail"><strong>6 months</strong><span>to weave</span></div>
            <div class="hlf-detail"><strong>GI Tagged</strong><span>since 2009</span></div>
            <div class="hlf-detail"><strong>Zari work</strong><span>gold thread</span></div>
          </div>
        </div>
      </div>

      <div class="hl-grid">
        <div *ngFor="let t of textiles; let i = index"
             class="hl-card sr"
             [style.transition-delay]="(i * 0.08) + 's'">
          <div class="hlc-top" [style.background]="t.gradient">
            <span class="hlc-icon">{{t.icon}}</span>
            <span class="hlc-weave">{{t.weave}}</span>
          </div>
          <div class="hlc-body">
            <h4>{{t.name}}</h4>
            <span class="hlc-origin">{{t.origin}}</span>
            <p>{{t.desc}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="hl-stats sr">
      <div class="hl-stat" *ngFor="let s of stats">
        <strong>{{s.value}}</strong>
        <span>{{s.label}}</span>
      </div>
    </div>
  </div>
</section>`
})
export class HandloomTextilesComponent {
  textiles: Textile[] = [
    { name: 'Pashmina', origin: 'Kashmir', desc: 'Gossamer-fine cashmere from Changthangi goats — the softest hand-spun wool in the world.', icon: '🧣', weave: 'Hand-spun', gradient: 'linear-gradient(135deg,#1A3A5C,#0D7377)' },
    { name: 'Kanchipuram Silk', origin: 'Tamil Nadu', desc: 'Temple-town silk with contrasting borders and checks — every South Indian bride\'s first choice.', icon: '👘', weave: 'Silk weave', gradient: 'linear-gradient(135deg,#7A1F2B,#C9911A)' },
    { name: 'Chanderi', origin: 'Madhya Pradesh', desc: 'Sheer fabric with gold and silver motifs — a Mughal-era creation that drapes like a dream.', icon: '🌸', weave: 'Sheer weave', gradient: 'linear-gradient(135deg,#C9911A,#F5A623)' },
    { name: 'Pochampally Ikat', origin: 'Telangana', desc: 'Resist-dye technique creating geometric patterns — tied and dyed before weaving.', icon: '🔶', weave: 'Ikat tie-dye', gradient: 'linear-gradient(135deg,#0D7377,#138808)' },
    { name: 'Phulkari', origin: 'Punjab', desc: 'Flower-work embroidery on hand-spun cotton — vibrant mirror-work that lights up every celebration.', icon: '🌺', weave: 'Embroidery', gradient: 'linear-gradient(135deg,#FF6B00,#F5A623)' },
    { name: 'Muga Silk', origin: 'Assam', desc: 'Golden silk from semi-domesticated silkworms — exclusive to Assam and naturally shimmering.', icon: '🐛', weave: 'Wild silk', gradient: 'linear-gradient(135deg,#5C2E0E,#C9911A)' }
  ];

  stats = [
    { value: '4.3M+', label: 'Handloom Weavers' },
    { value: '95%', label: 'Hand-crafted' },
    { value: '128+', label: 'Unique Weaves' },
    { value: '2nd', label: 'Largest Exporter' }
  ];
}
