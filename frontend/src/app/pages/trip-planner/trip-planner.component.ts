import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast.service';

interface TripStop {
  id: number;
  city: string;
  arrive: string;
  depart: string;
  notes: string;
}

interface TripTemplate {
  name: string;
  emoji: string;
  tagline: string;
  duration: string;
  stops: { city: string; nights: number; notes: string }[];
}

@Component({
  selector: 'app-trip-planner',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
<!-- Spiritual India Hero -->
<section class="page-hero hero-trip">
  <div class="page-hero-overlay"></div>
  <div class="page-hero-pattern pat-lotus"></div>
  <!-- Floating diyas -->
  <div class="diya-row" aria-hidden="true">
    <span *ngFor="let d of diyaArr; let i=index" class="diya-flame" [style.animationDelay]="(i*0.4)+'s'" [style.left]="(8 + i*11)+'%'"></span>
  </div>
  <!-- Varanasi ghat silhouette -->
  <svg class="ghat-skyline" viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true">
    <g fill="rgba(255,215,138,.18)">
      <path d="M0 160 L0 90 L80 90 L80 70 L120 70 L120 50 L130 40 L140 50 L140 70 L180 70 L180 90 L240 90 L240 160 Z"/>
      <path d="M280 160 L280 80 L340 80 L340 60 L360 50 L380 40 L400 50 L420 60 L420 80 L480 80 L480 160 Z"/>
      <path d="M520 160 L520 100 L580 100 L580 70 L620 50 L660 70 L660 100 L720 100 L720 160 Z"/>
      <path d="M760 160 L760 70 L820 70 L820 50 L850 35 L880 50 L880 70 L940 70 L940 160 Z"/>
      <path d="M980 160 L980 90 L1040 90 L1040 65 L1080 45 L1120 65 L1120 90 L1180 90 L1180 160 Z"/>
      <path d="M1220 160 L1220 80 L1280 80 L1280 60 L1310 45 L1340 60 L1340 80 L1400 80 L1400 160 Z"/>
    </g>
    <g stroke="rgba(255,215,138,.35)" fill="none">
      <path d="M0 150 C100 142 200 152 300 146 C400 140 500 152 600 144 C700 136 800 152 900 146 C1000 140 1100 152 1200 146 C1300 140 1400 152 1440 144" stroke-width="1"/>
    </g>
    <!-- floating diya boats -->
    <g fill="#FF6B00" fill-opacity=".7">
      <ellipse cx="180" cy="144" rx="5" ry="2"/><circle cx="180" cy="140" r="2"/>
      <ellipse cx="420" cy="148" rx="5" ry="2"/><circle cx="420" cy="144" r="2"/>
      <ellipse cx="720" cy="146" rx="5" ry="2"/><circle cx="720" cy="142" r="2"/>
      <ellipse cx="1020" cy="148" rx="5" ry="2"/><circle cx="1020" cy="144" r="2"/>
      <ellipse cx="1280" cy="146" rx="5" ry="2"/><circle cx="1280" cy="142" r="2"/>
    </g>
  </svg>
  <!-- Om symbol watermark -->
  <svg class="om-watermark" viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r="80" fill="none" stroke="#FFD78A" stroke-opacity=".25" stroke-width="1"/>
    <circle cx="100" cy="100" r="65" fill="none" stroke="#FFD78A" stroke-opacity=".15" stroke-width=".7" stroke-dasharray="3 3"/>
    <text x="100" y="135" text-anchor="middle" font-size="120" fill="#FFD78A" fill-opacity=".25" font-family="serif">ॐ</text>
  </svg>
  <div class="w">
    <span class="page-hero-tag">Spiritual India</span>
    <h1>Find peace.<br/>Find <em>yourself</em>.</h1>
    <p>Plan your sacred journey across India's holiest cities — Varanasi, Rishikesh, Tirupati, Amritsar. Weather, currency and visa details populate automatically.</p>
    <div class="category-strip dark">
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21 L3 9 L8 6 L12 9 L16 6 L21 9 L21 21 Z M7 21 L7 13 L11 13 L11 21 M14 21 L14 14 L18 14 L18 21"/><path d="M12 9 L12 5 M11 5 L13 5"/></svg></span><span class="cat-label">Pilgrimage</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 20 L5 14 L8 14 L8 11 L12 8 L16 11 L16 14 L19 14 L19 20"/><path d="M3 20 L21 20"/></svg></span><span class="cat-label">Ashrams</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="6" r="2"/><path d="M9 12 L7 18 M15 12 L17 18 M12 8 L12 12 M8 12 L16 12"/></svg></span><span class="cat-label">Yoga</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9" stroke-dasharray="2 3"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/></svg></span><span class="cat-label">Meditation</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3 C13 5 14 7 14 9 C14 11 13 12 12 12 C11 12 10 11 10 9 C10 7 11 5 12 3 Z"/><path d="M9 13 L15 13 L14 17 L10 17 Z"/></svg></span><span class="cat-label">Festivals</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><polygon points="12,2 14.6,8.6 22,9.3 16.5,14 18.2,21 12,17.3 5.8,21 7.5,14 2,9.3 9.4,8.6"/></svg></span><span class="cat-label">Spiritual Tours</span></a>
    </div>
  </div>
</section>

<section class="tp pat-lotus">
  <div class="w">

    <div class="tp-templates sr">
      <div class="tp-tpl-head">
        <strong>Curated journeys</strong>
        <span>One click to load</span>
      </div>
      <div class="tp-tpl-grid">
        <button class="tp-tpl" *ngFor="let t of templates" (click)="loadTemplate(t)">
          <span class="tp-tpl-emoji">{{t.emoji}}</span>
          <strong>{{t.name}}</strong>
          <small>{{t.stops.length}} stops &middot; {{t.duration}}</small>
          <em>{{t.tagline}}</em>
        </button>
      </div>
    </div>

    <div class="tp-stops">
      <div class="tp-stop sr" *ngFor="let s of stops(); let i = index">
        <div class="tp-num">{{i + 1}}</div>
        <div class="tp-grid">
          <div class="form-group">
            <label>City / IATA</label>
            <input [(ngModel)]="s.city" placeholder="Delhi or DEL" />
          </div>
          <div class="form-group">
            <label>Arrive</label>
            <input type="date" [(ngModel)]="s.arrive" />
          </div>
          <div class="form-group">
            <label>Depart</label>
            <input type="date" [(ngModel)]="s.depart" />
          </div>
          <div class="form-group full">
            <label>Notes</label>
            <input [(ngModel)]="s.notes" placeholder="e.g. Taj Mahal at sunrise" />
          </div>
        </div>
        <small class="tp-night-count" *ngIf="stayLength(s) as n">{{n}}</small>
        <button class="ghost" (click)="remove(i)" *ngIf="stops().length > 1" aria-label="Remove stop">×</button>
      </div>
    </div>

    <div class="tp-suggestions sr" *ngIf="suggestions.length">
      <strong>Want to add another stop?</strong>
      <div class="tp-sug-row">
        <button *ngFor="let sug of suggestions" class="tp-sug" (click)="addSuggestion(sug)">+ {{sug}}</button>
      </div>
    </div>

    <div class="tp-actions">
      <button class="ghost" (click)="addStop()">+ Add stop</button>
      <button class="ghost" (click)="reset()">Reset</button>
      <button class="s-btn" (click)="save()">Save itinerary</button>
      <a class="ghost" routerLink="/destination/DEL">Browse destinations</a>
    </div>

    <div class="tp-summary" *ngIf="stops().length">
      <div><small>Stops</small><strong>{{stops().length}}</strong></div>
      <div><small>Total days</small><strong>{{totalDays() || '—'}}</strong></div>
      <div><small>First stop</small><strong>{{firstStop()}}</strong></div>
      <div><small>Last stop</small><strong>{{lastStop()}}</strong></div>
      <div><small>Indian cities</small><strong>{{indianCount()}}</strong></div>
    </div>
  </div>
</section>`,
  styles: [`
    /* Spiritual India hero */
    .hero-trip{background:linear-gradient(135deg,#0F0A2E 0%,#1F0D3D 35%,#3B1856 65%,#7A1F2B 100%);min-height:540px;padding-bottom:80px}
    .hero-trip .page-hero-overlay{background:radial-gradient(circle at 50% 30%,rgba(255,215,138,.22) 0%,transparent 55%),radial-gradient(circle at 30% 80%,rgba(212,168,67,.15) 0%,transparent 55%)}
    .hero-trip .page-hero-pattern{opacity:.15;filter:invert(1) brightness(1.6)}
    .ghat-skyline{position:absolute;left:0;right:0;bottom:0;width:100%;height:170px;z-index:2;pointer-events:none}
    .diya-row{position:absolute;bottom:140px;left:0;right:0;height:30px;pointer-events:none;z-index:3}
    .diya-flame{position:absolute;width:14px;height:18px;background:radial-gradient(circle at 50% 30%,#FFE49E 0%,#FF6B00 50%,#7A1F2B 100%);border-radius:50% 50% 30% 30%;filter:drop-shadow(0 0 8px rgba(255,107,0,.7));animation:flicker 1.6s ease-in-out infinite}
    .om-watermark{position:absolute;top:80px;right:8%;width:220px;height:220px;z-index:1;opacity:.55;animation:omPulse 6s ease-in-out infinite}
    @keyframes omPulse{0%,100%{transform:scale(1);opacity:.55}50%{transform:scale(1.05);opacity:.75}}
    @keyframes flicker{0%,100%{transform:scaleY(1) translateY(0)}50%{transform:scaleY(1.15) translateY(-2px)}}
    /* Body */
    .tp{padding:60px 0 80px;background:linear-gradient(180deg,#FDF7EC 0%,#F7F8FA 100%);min-height:100vh;position:relative}
    .tp.pat-lotus::before{content:'';position:absolute;inset:0;opacity:.06;pointer-events:none}
    .tp-head{margin-bottom:28px}
    .tp-head small{font-size:12px;color:#FF6B00;text-transform:uppercase;letter-spacing:1.2px;font-weight:700}
    .tp-head h1{font-size:36px;font-weight:900;letter-spacing:-1.5px;margin:6px 0 8px}
    .tp-head p{font-size:14px;color:#3D4A5C;max-width:560px;line-height:1.7}
    /* Diya-style numbered circle */
    .tp-num{position:relative;background:radial-gradient(circle at 50% 30%,#FFE49E 0%,#FF8A3D 50%,#7A1F2B 100%) !important;box-shadow:0 0 16px rgba(255,107,0,.45);color:#1A0A0F !important;text-shadow:0 1px 1px rgba(255,255,255,.5)}
    .tp-stops{display:flex;flex-direction:column;gap:14px;margin-bottom:18px}
    .tp-stop{background:#fff;border:1px solid #E5E9F0;border-radius:18px;padding:18px;display:flex;align-items:center;gap:14px;box-shadow:0 2px 8px rgba(0,0,0,.04)}
    .tp-num{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#FF6B00,#FF8A3D);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:14px;flex-shrink:0}
    .tp-grid{flex:1;display:grid;grid-template-columns:1.2fr 1fr 1fr 1.5fr;gap:12px}
    @media(max-width:760px){.tp-grid{grid-template-columns:1fr 1fr}.tp-grid .full{grid-column:1 / -1}}
    .form-group{display:flex;flex-direction:column;gap:4px}
    .form-group label{font-size:11px;color:#8B95A5;text-transform:uppercase;letter-spacing:.5px;font-weight:700}
    .form-group input{padding:10px 12px;border:1px solid #E5E9F0;border-radius:10px;font-size:13px;font-weight:500;outline:none}
    .form-group input:focus{border-color:#FF6B00}
    .ghost{padding:10px 16px;background:#fff;border:1px solid #E5E9F0;border-radius:10px;font-size:13px;font-weight:600;color:#0B1120;cursor:pointer;text-decoration:none}
    .ghost:hover{border-color:#FF6B00;color:#FF6B00}
    .tp-actions{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px}
    .s-btn{padding:14px 22px;background:linear-gradient(135deg,#FF6B00,#FF8A3D);border:none;border-radius:10px;color:#fff;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 6px 20px rgba(255,107,0,.2)}
    .tp-summary{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px}
    .tp-summary div{background:var(--surface,#fff);border:1px solid var(--border,#E5E9F0);border-radius:14px;padding:16px;text-align:center}
    .tp-summary small{display:block;font-size:11px;color:var(--text-3,#8B95A5);text-transform:uppercase;letter-spacing:.5px;font-weight:700;margin-bottom:4px}
    .tp-summary strong{font-size:18px;font-weight:900;color:var(--text-1,#0B1120)}
    .tp-emoji{display:inline-block;margin-left:8px;font-size:0.8em}
    .tp-templates{background:var(--surface,#fff);border:1px solid var(--border,#E5E9F0);border-radius:18px;padding:18px;margin-bottom:18px;position:relative}
    .tp-tpl-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px}
    .tp-tpl-head strong{font-size:14px;font-weight:800;color:var(--text-1,#0B1120)}
    .tp-tpl-head span{font-size:11px;color:var(--text-3,#8B95A5);text-transform:uppercase;letter-spacing:.7px;font-weight:700}
    .tp-tpl-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}
    .tp-tpl{background:linear-gradient(180deg,var(--ivory,#FFFDF8),var(--cream,#FFF7E8));border:1px solid var(--border,#E5E9F0);border-radius:14px;padding:14px;text-align:left;cursor:pointer;transition:all .25s;display:flex;flex-direction:column;gap:4px}
    .tp-tpl:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(212,168,67,.18);border-color:var(--gold,#D4A843)}
    .tp-tpl-emoji{font-size:24px}
    .tp-tpl strong{font-size:14px;font-weight:800;color:var(--text-1,#0B1120)}
    .tp-tpl small{font-size:11px;color:var(--text-3,#8B95A5);text-transform:uppercase;letter-spacing:.5px;font-weight:700}
    .tp-tpl em{font-size:12px;color:var(--text-2,#3D4A5C);font-style:normal;line-height:1.5}
    .tp-suggestions{background:var(--surface,#fff);border:1px solid var(--border,#E5E9F0);border-radius:14px;padding:14px;margin-bottom:18px}
    .tp-suggestions strong{display:block;font-size:13px;font-weight:700;color:var(--text-1,#0B1120);margin-bottom:8px}
    .tp-sug-row{display:flex;flex-wrap:wrap;gap:6px}
    .tp-sug{padding:8px 12px;background:var(--gold-light,#FBF3DC);color:var(--maroon,#7A1F2B);border:1px solid var(--gold,#D4A843);border-radius:100px;font-size:12px;font-weight:700;cursor:pointer;transition:all .2s}
    .tp-sug:hover{background:var(--gold,#D4A843);color:#fff;transform:translateY(-1px)}
    .tp-night-count{position:absolute;right:46px;top:14px;font-size:11px;color:var(--gold-h,#B98E2A);background:var(--gold-light,#FBF3DC);border-radius:100px;padding:4px 10px;font-weight:700;letter-spacing:.4px;text-transform:uppercase}
    .tp-stop{position:relative}
  `]
})
export class TripPlannerComponent {
  diyaArr = Array.from({length:8});
  stops = signal<TripStop[]>([
    { id: 1, city: 'Toronto (YYZ)', arrive: '', depart: '', notes: 'Departure' },
    { id: 2, city: 'Delhi (DEL)', arrive: '', depart: '', notes: 'Golden Triangle start' },
    { id: 3, city: 'Goa (GOI)', arrive: '', depart: '', notes: 'Beaches' }
  ]);

  templates: TripTemplate[] = [
    { name: 'Golden Triangle', emoji: '🛕', tagline: 'Delhi → Agra → Jaipur classic loop', duration: '7 nights', stops: [
      { city: 'Delhi (DEL)', nights: 2, notes: 'Old Delhi food walk + Qutub Minar' },
      { city: 'Agra (AGR)', nights: 2, notes: 'Taj Mahal sunrise + Agra Fort' },
      { city: 'Jaipur (JAI)', nights: 3, notes: 'Amber Fort + Hawa Mahal + bazaars' }
    ]},
    { name: 'Kerala Backwaters', emoji: '🌴', tagline: 'Cochin → Munnar → Alleppey', duration: '6 nights', stops: [
      { city: 'Kochi (COK)', nights: 2, notes: 'Fort Kochi + Chinese fishing nets' },
      { city: 'Munnar', nights: 2, notes: 'Tea estates + Eravikulam park' },
      { city: 'Alleppey (Alappuzha)', nights: 2, notes: 'Houseboat in backwaters' }
    ]},
    { name: 'Beaches & Forts', emoji: '🏖', tagline: 'Goa party + Mumbai food trail', duration: '7 nights', stops: [
      { city: 'Goa (GOI)', nights: 4, notes: 'North + South beaches' },
      { city: 'Mumbai (BOM)', nights: 3, notes: 'Gateway, Marine Drive, Bandra' }
    ]},
    { name: 'Mountains & Monasteries', emoji: '🏔', tagline: 'Himachal + Ladakh circuit', duration: '9 nights', stops: [
      { city: 'Delhi (DEL)', nights: 1, notes: 'Quick hop' },
      { city: 'Manali', nights: 3, notes: 'Solang valley + cafes' },
      { city: 'Leh (IXL)', nights: 4, notes: 'Pangong Lake + Nubra' },
      { city: 'Delhi (DEL)', nights: 1, notes: 'Return' }
    ]},
    { name: 'Wedding Express', emoji: '💍', tagline: 'Family circuit for big-fat-wedding season', duration: '8 nights', stops: [
      { city: 'Toronto (YYZ)', nights: 0, notes: 'Origin' },
      { city: 'Delhi (DEL)', nights: 3, notes: 'Sangeet + Mehndi' },
      { city: 'Udaipur (UDR)', nights: 3, notes: 'Wedding venue + lake palace' },
      { city: 'Mumbai (BOM)', nights: 2, notes: 'Reception + brunch' }
    ]}
  ];

  suggestions = ['Goa (GOI)', 'Jaipur (JAI)', 'Bengaluru (BLR)', 'Hyderabad (HYD)', 'Kolkata (CCU)', 'Chennai (MAA)', 'Varanasi (VNS)', 'Amritsar (ATQ)', 'Udaipur (UDR)'];

  constructor(private toast: ToastService) {}

  addStop() {
    const next = (this.stops().at(-1)?.id ?? 0) + 1;
    this.stops.update(list => [...list, { id: next, city: '', arrive: '', depart: '', notes: '' }]);
  }

  remove(i: number) {
    this.stops.update(list => list.filter((_, idx) => idx !== i));
  }

  reset() {
    this.stops.set([{ id: 1, city: '', arrive: '', depart: '', notes: '' }]);
    this.toast.info('Itinerary reset');
  }

  loadTemplate(t: TripTemplate) {
    let id = 1;
    let cursor = new Date();
    cursor.setDate(cursor.getDate() + 14);
    const list: TripStop[] = t.stops.map(s => {
      const arrive = new Date(cursor).toISOString().split('T')[0];
      cursor.setDate(cursor.getDate() + Math.max(s.nights, 1));
      const depart = new Date(cursor).toISOString().split('T')[0];
      return { id: id++, city: s.city, arrive, depart, notes: s.notes };
    });
    this.stops.set(list);
    this.toast.success(`Loaded "${t.name}" (${t.stops.length} stops)`);
  }

  addSuggestion(city: string) {
    const next = (this.stops().at(-1)?.id ?? 0) + 1;
    this.stops.update(list => [...list, { id: next, city, arrive: '', depart: '', notes: '' }]);
    this.toast.info(`Added ${city}`);
  }

  stayLength(s: TripStop): string | null {
    if (!s.arrive || !s.depart) return null;
    const a = new Date(s.arrive).getTime();
    const d = new Date(s.depart).getTime();
    if (isNaN(a) || isNaN(d) || d <= a) return null;
    const nights = Math.round((d - a) / 86400000);
    return `${nights} night${nights === 1 ? '' : 's'}`;
  }

  totalDays(): number {
    return this.stops().reduce((acc, s) => {
      if (s.arrive && s.depart) {
        const a = new Date(s.arrive).getTime();
        const d = new Date(s.depart).getTime();
        if (!isNaN(a) && !isNaN(d) && d > a) acc += Math.round((d - a) / 86400000);
      }
      return acc;
    }, 0);
  }

  indianCount(): number {
    const indianHints = [' (DEL)',' (BOM)',' (BLR)',' (MAA)',' (HYD)',' (CCU)',' (GOI)',' (JAI)',' (AGR)',' (COK)',' (TRV)',' (IXC)',' (PNQ)',' (AMD)',' (LKO)',' (UDR)',' (VNS)',' (ATQ)',' (IXL)','Munnar','Manali','Alleppey'];
    return this.stops().filter(s => indianHints.some(h => s.city.includes(h))).length;
  }

  firstStop(): string { return this.stops()[0]?.city || '—'; }
  lastStop(): string { return this.stops().at(-1)?.city || '—'; }

  save() {
    const filled = this.stops().filter(s => s.city.trim()).length;
    if (filled < 2) {
      this.toast.warning('Add at least 2 stops to save your itinerary');
      return;
    }
    try {
      localStorage.setItem('bg_itinerary', JSON.stringify(this.stops()));
      this.toast.success(`Itinerary saved (${filled} stops)`);
    } catch {
      this.toast.error('Could not save itinerary');
    }
  }
}
