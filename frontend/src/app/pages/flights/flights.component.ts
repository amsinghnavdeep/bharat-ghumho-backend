import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { FavoritesService } from '../../services/favorites.service';
import { ToastService } from '../../services/toast.service';
import { Flight } from '../../models';
import { FareAlertModalComponent } from '../../components/fare-alert-modal/fare-alert-modal.component';
import { PriceChartComponent } from '../../components/price-chart/price-chart.component';

interface FareDay { label: string; value: number; date: string; }

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [CommonModule, FormsModule, FareAlertModalComponent, PriceChartComponent],
  template: `
<!-- Bollywood Dream Hero -->
<section class="page-hero hero-flights">
  <div class="page-hero-overlay"></div>
  <div class="page-hero-pattern pat-rangoli"></div>
  <!-- Spotlight rays -->
  <div class="ray-burst" aria-hidden="true">
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="rayLight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFD78A" stop-opacity=".55"/>
          <stop offset="100%" stop-color="#FFD78A" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <g transform="translate(400 200)" fill="url(#rayLight)" opacity=".4">
        <polygon points="0,0 -380,-200 -360,-220"/>
        <polygon points="0,0 -380,-100 -370,-130"/>
        <polygon points="0,0 -380,0 -380,-30"/>
        <polygon points="0,0 -380,100 -370,130"/>
        <polygon points="0,0 -380,200 -360,220"/>
        <polygon points="0,0 380,-200 360,-220"/>
        <polygon points="0,0 380,-100 370,-130"/>
        <polygon points="0,0 380,0 380,-30"/>
        <polygon points="0,0 380,100 370,130"/>
        <polygon points="0,0 380,200 360,220"/>
      </g>
    </svg>
  </div>
  <!-- Film-reel watermark -->
  <svg class="page-hero-watermark film-reel" viewBox="0 0 400 400" aria-hidden="true">
    <g fill="none" stroke="#FFD78A" stroke-width="1.5" stroke-opacity=".4">
      <circle cx="200" cy="200" r="170"/>
      <circle cx="200" cy="200" r="100"/>
      <circle cx="200" cy="200" r="20" fill="#FFD78A" fill-opacity=".15"/>
    </g>
    <g fill="#FFD78A" fill-opacity=".18">
      <circle cx="200" cy="50" r="20"/>
      <circle cx="335" cy="135" r="20"/>
      <circle cx="335" cy="265" r="20"/>
      <circle cx="200" cy="350" r="20"/>
      <circle cx="65" cy="265" r="20"/>
      <circle cx="65" cy="135" r="20"/>
    </g>
  </svg>
  <div class="w">
    <span class="page-hero-tag">Bollywood Dream</span>
    <h1>Find your best <em>fare</em><br/>like a blockbuster opening</h1>
    <p>One-way, round-trip and multi-city searches across India and the diaspora corridors — compare every airline, every cabin, zero fees.</p>
    <!-- Film strip border bottom -->
    <div class="film-strip" aria-hidden="true">
      <span *ngFor="let i of [0,1,2,3,4,5,6,7,8,9,10,11]"></span>
    </div>
    <div class="category-strip dark">
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg></span><span class="cat-label">Film Locations</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 L14.6 8.6 L22 9.3 L16.5 14 L18.2 21 L12 17.3 L5.8 21 L7.5 14 L2 9.3 L9.4 8.6 Z"/></svg></span><span class="cat-label">Star Experiences</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M6 3 L8 7 M10 3 L12 7 M14 3 L16 7 M18 3 L20 7"/></svg></span><span class="cat-label">Behind the Scenes</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="14" height="14" rx="2"/><path d="M17 9 L22 6 L22 18 L17 15"/></svg></span><span class="cat-label">Film History</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.5"/><path d="M8 6 L10 4 L14 4 L16 6"/></svg></span><span class="cat-label">Fan Moments</span></a>
    </div>
  </div>
</section>

<section class="flights pat-rangoli">
  <div class="w">
    <div class="search-bar">
      <div class="form-group">
        <label>From</label>
        <input [(ngModel)]="from" maxlength="3" placeholder="YYZ" />
      </div>
      <div class="form-group">
        <label>To</label>
        <input [(ngModel)]="to" maxlength="3" placeholder="DEL" />
      </div>
      <div class="form-group">
        <label>Stops</label>
        <select [(ngModel)]="maxStops">
          <option [ngValue]="-1">Any</option>
          <option [ngValue]="0">Direct only</option>
          <option [ngValue]="1">≤ 1 stop</option>
        </select>
      </div>
      <div class="form-group">
        <label>Cabin</label>
        <select [(ngModel)]="cabin">
          <option value="any">Any</option>
          <option value="Economy">Economy</option>
          <option value="Premium Economy">Premium Economy</option>
          <option value="Business">Business</option>
        </select>
      </div>
      <button class="s-btn" (click)="search()">Search</button>
      <button class="ghost" (click)="alertOpen.set(true)"><svg class="bi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg> Alert me</button>
    </div>

    <div class="fl-side" *ngIf="filtered().length">
      <app-price-chart [data]="fareDays()" title="Cheapest dates (next 7 days)" [currency]="'$'"></app-price-chart>
    </div>

    <div class="placeholder" *ngIf="loading()">Loading flights…</div>
    <div class="fl-empty" *ngIf="!loading() && !filtered().length">No flights match. Try clearing filters or different airports.</div>

    <div class="fl-list">
      <article class="fc" *ngFor="let f of filtered()">
        <div class="fc-top">
          <div class="fc-air">
            <div class="air-logo" [style.background]="f.color">{{f.code}}</div>
            <div class="fc-air-info">
              {{f.airline}}
              <small>{{f.flight}} · {{f.aircraft}}</small>
            </div>
          </div>
          <div class="fc-price">
            <strong>\${{f.price}}</strong>
            <small>per person</small>
          </div>
        </div>
        <div class="fc-mid">
          <div class="fc-t">
            <strong>{{f.depTime}}</strong>
            <span>{{f.from}}</span>
          </div>
          <div class="fc-path">
            <div class="dur">{{f.duration}}</div>
            <span class="dot s"></span>
            <span class="dot e"></span>
            <div class="stops" [ngClass]="f.stopsClass">{{f.stopsLabel}}</div>
          </div>
          <div class="fc-t">
            <strong>{{f.arrTime}}</strong>
            <span>{{f.to}} <em *ngIf="f.arrDay">{{f.arrDay}}</em></span>
          </div>
        </div>
        <div class="fc-bot">
          <button class="ghost-sm" (click)="toggleFav(f)"><svg class="bi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path [attr.fill]="isFav(f.id) ? '#FF6B00' : 'none'" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> {{isFav(f.id) ? 'Saved' : 'Save'}}</button>
          <button class="ghost-sm" (click)="openAlert(f)"><svg class="bi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg> Alert</button>
          <button (click)="book(f)">Book {{f.cabin}}</button>
        </div>
      </article>
    </div>
  </div>
  <app-fare-alert-modal [open]="alertOpen()" [defaults]="alertDefaults()" (close)="alertOpen.set(false)"></app-fare-alert-modal>
</section>`,
  styles: [`
    /* Bollywood Dream hero */
    .hero-flights{background:linear-gradient(135deg,#0A0E27 0%,#1A0F3D 35%,#3B0A2E 70%,#7A1F2B 100%);min-height:480px}
    .hero-flights .page-hero-overlay{background:radial-gradient(circle at 30% 40%,rgba(255,107,0,.22) 0%,transparent 55%),radial-gradient(circle at 70% 60%,rgba(212,168,67,.18) 0%,transparent 50%)}
    .hero-flights .page-hero-pattern.pat-rangoli{opacity:.08;filter:invert(1) brightness(2)}
    .ray-burst{position:absolute;inset:0;z-index:1;pointer-events:none;display:flex;align-items:center;justify-content:center;animation:rayPulse 8s ease-in-out infinite}
    .ray-burst svg{width:110%;height:110%}
    @keyframes rayPulse{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:.85;transform:scale(1.05)}}
    .hero-flights .film-reel{animation:reelSpin 28s linear infinite;right:-4%}
    @keyframes reelSpin{from{transform:translateY(-50%) rotate(0deg)}to{transform:translateY(-50%) rotate(360deg)}}
    .film-strip{display:flex;gap:6px;margin-top:18px;background:#0A0E27;border:2px solid rgba(212,168,67,.55);border-radius:6px;padding:6px 8px;width:fit-content;box-shadow:0 6px 20px rgba(212,168,67,.18)}
    .film-strip span{width:14px;height:18px;background:rgba(212,168,67,.18);border-radius:2px;display:block}
    .film-strip span:nth-child(odd){background:rgba(255,107,0,.35)}
    .bi{width:13px;height:13px;display:inline-block;vertical-align:-2px;margin-right:4px}
    /* Body */
    .flights{padding:60px 0 80px;background:linear-gradient(180deg,var(--cream) 0%,#F7F8FA 100%);min-height:100vh;position:relative}
    .flights.pat-rangoli::before{content:'';position:absolute;inset:0;opacity:.06;pointer-events:none}
    .fc{position:relative;overflow:hidden}
    .fc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#FF6B00,#D4A843,#138808);transform:scaleX(0);transform-origin:left;transition:transform .45s}
    .fc:hover::before{transform:scaleX(1)}
    .fl-head{margin-bottom:28px;text-align:center}
    .fl-head small{font-size:12px;color:#FF6B00;text-transform:uppercase;letter-spacing:1.2px;font-weight:700}
    .fl-head h1{font-size:42px;font-weight:900;letter-spacing:-2px;margin:6px 0 8px}
    .fl-head h1 em{font-style:normal;background:linear-gradient(135deg,#FF6B00,#FF8A3D);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .fl-head p{color:#3D4A5C;font-size:15px;max-width:560px;margin:0 auto;line-height:1.7}
    .search-bar{background:#fff;border:1px solid #E5E9F0;border-radius:18px;padding:16px;display:grid;grid-template-columns:1fr 1fr 1fr 1fr auto auto;gap:12px;align-items:end;margin-bottom:18px;box-shadow:0 4px 16px rgba(0,0,0,.05)}
    @media(max-width:760px){.search-bar{grid-template-columns:1fr 1fr}.search-bar .s-btn,.search-bar .ghost{grid-column:span 1}}
    .form-group{display:flex;flex-direction:column;gap:4px}
    .form-group label{font-size:11px;font-weight:700;color:#3D4A5C;text-transform:uppercase;letter-spacing:.5px}
    .form-group input,.form-group select{padding:10px 12px;border:1px solid #E5E9F0;border-radius:10px;font-size:13px;font-weight:500;outline:none;background:#fff}
    .form-group input:focus,.form-group select:focus{border-color:#FF6B00}
    .s-btn{padding:12px 22px;background:linear-gradient(135deg,#FF6B00,#FF8A3D);border:none;border-radius:10px;color:#fff;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 6px 16px rgba(255,107,0,.2)}
    .ghost{padding:12px 16px;background:#fff;border:1px solid #E5E9F0;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;color:#0B1120}
    .ghost:hover{border-color:#FF6B00;color:#FF6B00}
    .fl-side{margin-bottom:18px}
    .placeholder,.fl-empty{padding:32px;text-align:center;color:#8B95A5;background:#fff;border:1px dashed #E5E9F0;border-radius:16px}
    .fl-list{display:flex;flex-direction:column;gap:12px}
    .fc{background:#fff;border:1px solid #E5E9F0;border-radius:18px;padding:20px;box-shadow:0 2px 8px rgba(0,0,0,.04);transition:all .35s}
    .fc:hover{box-shadow:0 12px 32px rgba(0,0,0,.08);transform:translateY(-2px)}
    .fc-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;gap:12px;flex-wrap:wrap}
    .fc-air{display:flex;align-items:center;gap:12px}
    .air-logo{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;color:#fff;flex-shrink:0}
    .fc-air-info{font-size:14px;font-weight:700}
    .fc-air-info small{display:block;font-size:11px;font-weight:400;color:#8B95A5;margin-top:2px}
    .fc-price strong{font-size:24px;font-weight:900;letter-spacing:-1px;background:linear-gradient(135deg,#FF6B00,#FF8A3D);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .fc-price small{display:block;font-size:11px;color:#8B95A5;-webkit-text-fill-color:initial}
    .fc-mid{display:flex;align-items:center;gap:18px}
    .fc-t{text-align:center}
    .fc-t strong{display:block;font-size:18px;font-weight:800;letter-spacing:-.5px}
    .fc-t span{font-size:11px;color:#8B95A5}
    .fc-t em{font-style:normal;color:#FF6B00;margin-left:2px}
    .fc-path{flex:1;position:relative;height:28px;display:flex;align-items:center}
    .fc-path::before{content:'';position:absolute;top:50%;left:8px;right:8px;height:1.5px;background:linear-gradient(90deg,#FF6B00,#138808)}
    .fc-path .dot{width:8px;height:8px;border-radius:50%;position:absolute;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.1)}
    .fc-path .dot.s{left:0;background:#FF6B00}.fc-path .dot.e{right:0;background:#138808}
    .fc-path .dur{position:absolute;top:-16px;left:50%;transform:translateX(-50%);font-size:11px;color:#8B95A5;font-weight:600;white-space:nowrap}
    .fc-path .stops{position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);font-size:10px;font-weight:700;white-space:nowrap;padding:2px 8px;border-radius:4px}
    .stops.direct{color:#138808;background:#EDFCE9}
    .stops.one,.stops.one-stop{color:#FF6B00;background:#FFF4EC}
    .fc-bot{display:flex;justify-content:flex-end;align-items:center;gap:8px;margin-top:18px}
    .ghost-sm{padding:8px 14px;background:#fff;border:1px solid #E5E9F0;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;color:#0B1120}
    .ghost-sm:hover{border-color:#FF6B00;color:#FF6B00}
    .fc-bot button:last-child{padding:10px 24px;background:linear-gradient(135deg,#FF6B00,#FF8A3D);color:#fff;border:none;border-radius:10px;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(255,107,0,.2)}
  `]
})
export class FlightsComponent implements OnInit {
  flights = signal<Flight[]>([]);
  loading = signal(true);
  alertOpen = signal(false);
  alertDefaults = signal<{ from?: string; to?: string; target?: number; currency?: string } | null>(null);

  from = 'YYZ';
  to = 'DEL';
  maxStops = -1;
  cabin = 'any';

  filtered = computed(() => this.flights().filter(f => {
    if (this.maxStops >= 0 && f.stops > this.maxStops) return false;
    if (this.cabin !== 'any' && f.cabin !== this.cabin) return false;
    return true;
  }));

  fareDays = computed<FareDay[]>(() => {
    const flights = this.filtered();
    if (!flights.length) return [];
    const min = Math.min(...flights.map(f => f.price));
    const days: FareDay[] = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today); d.setDate(d.getDate() + i);
      const variance = Math.round(min * (0.85 + ((i * 17 + 13) % 30) / 100));
      days.push({
        label: d.toLocaleDateString('en-US', { weekday: 'short' }),
        value: variance,
        date: d.toISOString().split('T')[0]
      });
    }
    return days;
  });

  constructor(
    private fs: FlightService,
    private fav: FavoritesService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fav.list().subscribe();
    this.search();
  }

  search() {
    this.loading.set(true);
    this.fs.search(this.from.toUpperCase(), this.to.toUpperCase()).subscribe({
      next: r => { this.flights.set(Array.isArray(r) ? r : []); this.loading.set(false); },
      error: () => { this.flights.set([]); this.loading.set(false); }
    });
  }

  isFav(id: string): boolean { return this.fav.has(id); }

  toggleFav(f: Flight) {
    if (this.isFav(f.id)) {
      const fid = this.fav.favorites().find(x => x.entity_id === f.id)?.id;
      if (fid) this.fav.remove(fid).subscribe(() => this.toast.show('Removed from favorites'));
      return;
    }
    this.fav.add({
      type: 'flight', entity_id: f.id, title: `${f.airline} ${f.flight}`,
      metadata: { from: f.from, to: f.to, price: f.price }
    }).subscribe(r => { if (r) this.toast.show('Saved to favorites'); });
  }

  openAlert(f: Flight) {
    this.alertDefaults.set({ from: f.from, to: f.to, target: Math.round(f.price * 0.9), currency: 'CAD' });
    this.alertOpen.set(true);
  }

  book(f: Flight) {
    this.router.navigate(['/booking', 'flight', f.id], {
      queryParams: { title: `${f.airline} ${f.from}→${f.to}`, price: f.price, currency: 'CAD' }
    });
  }
}
