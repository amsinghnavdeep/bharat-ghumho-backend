import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import { FavoritesService } from '../../services/favorites.service';
import { ToastService } from '../../services/toast.service';
import { Car } from '../../models';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<!-- Wander India Hero -->
<section class="page-hero hero-cars">
  <div class="page-hero-overlay"></div>
  <div class="page-hero-pattern pat-warli"></div>
  <!-- Mountain silhouettes at bottom -->
  <svg class="cars-mountains" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 220 L0 130 L120 80 L210 110 L330 50 L420 90 L540 30 L640 70 L760 20 L850 60 L970 40 L1080 90 L1200 50 L1320 100 L1440 70 L1440 220 Z" fill="rgba(212,168,67,.35)"/>
    <path d="M0 220 L0 170 L130 130 L240 150 L350 100 L470 130 L580 90 L700 120 L820 80 L930 110 L1050 80 L1180 130 L1300 110 L1440 130 L1440 220 Z" fill="rgba(255,107,0,.4)"/>
    <path d="M0 220 L0 190 L100 180 L220 200 L340 180 L460 200 L580 190 L700 200 L820 180 L940 200 L1060 190 L1180 200 L1300 180 L1440 200 L1440 220 Z" fill="rgba(122,31,43,.55)"/>
  </svg>
  <!-- Hot air balloon -->
  <svg class="balloon" viewBox="0 0 80 110" aria-hidden="true">
    <ellipse cx="40" cy="38" rx="32" ry="36" fill="url(#balG)"/>
    <defs>
      <linearGradient id="balG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FF6B00"/><stop offset="50%" stop-color="#D4A843"/><stop offset="100%" stop-color="#138808"/>
      </linearGradient>
    </defs>
    <path d="M14 60 L40 80 L66 60" stroke="#D4A843" stroke-width="1.5" fill="none"/>
    <line x1="22" y1="63" x2="32" y2="90" stroke="#D4A843" stroke-width="1"/>
    <line x1="58" y1="63" x2="48" y2="90" stroke="#D4A843" stroke-width="1"/>
    <rect x="32" y="88" width="16" height="10" fill="#7A1F2B" rx="1"/>
  </svg>
  <!-- Compass top-right -->
  <svg class="compass" viewBox="0 0 60 60" aria-hidden="true">
    <circle cx="30" cy="30" r="28" fill="none" stroke="#FFD78A" stroke-opacity=".55" stroke-width="1.5"/>
    <circle cx="30" cy="30" r="22" fill="none" stroke="#FFD78A" stroke-opacity=".35" stroke-width=".8" stroke-dasharray="2 3"/>
    <polygon points="30,8 33,30 30,52 27,30" fill="#FF6B00" fill-opacity=".85"/>
    <polygon points="30,8 33,30 30,30" fill="#fff" fill-opacity=".4"/>
    <circle cx="30" cy="30" r="2.5" fill="#D4A843"/>
    <text x="30" y="6" text-anchor="middle" font-size="6" fill="#FFD78A">N</text>
  </svg>
  <div class="w">
    <span class="page-hero-tag">Wander India</span>
    <h1>Adventure awaits on<br/>every <em>road</em></h1>
    <p>From compact hatchbacks for narrow lanes to chauffeur-driven SUVs for high-altitude road trips across India's biggest cities.</p>
    <div class="category-strip dark">
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21 L8 11 L11 16 L14 9 L17 14 L21 21 Z"/><path d="M8 11 L8 6 L11 6"/></svg></span><span class="cat-label">Trekking</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 4 C9 4 7 6 7 9 C7 11 9 12 9 14 L9 16 L15 16 L15 14 C15 12 17 11 17 9 C17 6 15 4 12 4 Z"/><path d="M9 18 L15 18 M9 20 L15 20"/><circle cx="12" cy="8" r="1"/></svg></span><span class="cat-label">Rajasthan</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 16 C4 12 6 10 8 10 C8 8 10 6 12 6 C14 6 16 8 16 10 C18 10 20 12 20 16 L20 18 L4 18 Z"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/></svg></span><span class="cat-label">Wildlife</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 20 L12 4 L21 20 Z"/><path d="M9 14 L15 14"/></svg></span><span class="cat-label">Camping</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 12 C5 9 8 15 12 12 C16 9 19 15 22 12"/><path d="M2 17 C5 14 8 20 12 17 C16 14 19 20 22 17"/></svg></span><span class="cat-label">Water Sports</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21 C3 21 6 12 12 12 C18 12 21 21 21 21"/><path d="M9 12 L9 8 C9 6 10 5 12 5 C14 5 15 6 15 8 L15 12"/><circle cx="6" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg></span><span class="cat-label">Road Trips</span></a>
    </div>
  </div>
</section>

<section class="cars pat-warli">
  <div class="w">

    <div class="filter-bar">
      <div class="form-group">
        <label>City</label>
        <select [(ngModel)]="city" (ngModelChange)="reload()">
          <option value="">All cities</option>
          <option *ngFor="let c of cities" [value]="c.code">{{c.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <label>Type</label>
        <select [(ngModel)]="type" (ngModelChange)="reload()">
          <option value="all">All</option>
          <option value="hatchback">Hatchback</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="luxury">Luxury</option>
        </select>
      </div>
      <div class="form-group">
        <label>Max \${{maxPrice}}/day</label>
        <input type="range" min="20" max="200" step="5" [(ngModel)]="maxPrice" (ngModelChange)="reload()" />
      </div>
      <div class="cars-meta">{{filtered().length}} cars</div>
    </div>

    <div class="placeholder" *ngIf="loading()">Loading…</div>
    <div class="cars-empty" *ngIf="!loading() && !filtered().length">No cars match those filters.</div>

    <div class="cars-grid">
      <div class="car-card" *ngFor="let c of filtered()">
        <div class="car-row">
          <div>
            <strong>{{c.name}}</strong>
            <span class="car-pill">{{c.type}}</span>
          </div>
          <button class="heart" [class.on]="isFav(c.id)" (click)="toggleFav(c)" aria-label="Save"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
        </div>
        <div class="car-meta">
          <span>👥 {{c.seats}}</span>
          <span>{{c.transmission}}</span>
          <span>{{c.fuel}}</span>
          <span *ngIf="c.ac">AC</span>
        </div>
        <div class="car-meta city">📍 {{c.city}} · {{c.provider}}</div>
        <div class="car-foot">
          <div>
            <small>Per day</small>
            <strong>{{c.currency}} {{c.price_per_day}}</strong>
          </div>
          <button class="s-btn" (click)="book(c)">Rent now</button>
        </div>
      </div>
    </div>
  </div>
</section>`,
  styles: [`
    /* Wander India hero */
    .hero-cars{background:linear-gradient(135deg,#0B4E52 0%,#0D7377 35%,#B8851F 75%,#FF6B00 100%);min-height:520px;padding-bottom:80px}
    .hero-cars .page-hero-overlay{background:radial-gradient(circle at 20% 30%,rgba(255,107,0,.2) 0%,transparent 55%),radial-gradient(circle at 80% 80%,rgba(13,115,119,.4) 0%,transparent 55%)}
    .hero-cars .page-hero-pattern{opacity:.14;filter:invert(1) brightness(1.4)}
    .cars-mountains{position:absolute;left:0;right:0;bottom:0;width:100%;height:220px;z-index:2;pointer-events:none}
    .balloon{position:absolute;top:50px;right:14%;width:88px;height:118px;z-index:3;animation:balloonFloat 9s ease-in-out infinite;filter:drop-shadow(0 8px 18px rgba(0,0,0,.25))}
    @keyframes balloonFloat{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-22px) rotate(2deg)}}
    .compass{position:absolute;top:90px;right:6%;width:80px;height:80px;z-index:3;animation:compassSpin 30s linear infinite;opacity:.85}
    @keyframes compassSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
    /* Body */
    .cars{padding:60px 0 80px;background:linear-gradient(180deg,#FCF5E6 0%,#F7F8FA 100%);min-height:100vh;position:relative}
    .cars.pat-warli::before{content:'';position:absolute;inset:0;opacity:.08;pointer-events:none}
    .car-card{position:relative;overflow:hidden}
    .car-card::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:3px;background:linear-gradient(90deg,transparent,#D4A843 25%,#FF6B00 50%,#138808 75%,transparent);transition:left .6s}
    .car-card:hover::before{left:100%}
    .cars-head{margin-bottom:28px;text-align:center}
    .cars-head small{font-size:12px;color:#FF6B00;text-transform:uppercase;letter-spacing:1.2px;font-weight:700}
    .cars-head h1{font-size:42px;font-weight:900;letter-spacing:-2px;margin:6px 0 8px}
    .cars-head h1 em{font-style:normal;background:linear-gradient(135deg,#FF6B00,#FF8A3D);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .cars-head p{color:#3D4A5C;font-size:15px;max-width:560px;margin:0 auto;line-height:1.7}
    .filter-bar{background:#fff;border:1px solid #E5E9F0;border-radius:18px;padding:18px;display:grid;grid-template-columns:1fr 1fr 1.4fr auto;gap:14px;align-items:center;margin-bottom:24px;box-shadow:0 4px 16px rgba(0,0,0,.05)}
    @media(max-width:760px){.filter-bar{grid-template-columns:1fr 1fr}.filter-bar .cars-meta{grid-column:1/-1;text-align:left}}
    .form-group{display:flex;flex-direction:column;gap:4px}
    .form-group label{font-size:11px;font-weight:700;color:#3D4A5C;text-transform:uppercase;letter-spacing:.5px}
    .form-group input,.form-group select{padding:10px 12px;border:1px solid #E5E9F0;border-radius:10px;font-size:13px;font-weight:500;outline:none;background:#fff}
    .form-group input:focus,.form-group select:focus{border-color:#FF6B00}
    .form-group input[type=range]{padding:0}
    .cars-meta{font-size:12px;color:#8B95A5;font-weight:600;text-align:right}
    .placeholder,.cars-empty{padding:32px;text-align:center;color:#8B95A5;background:#fff;border:1px dashed #E5E9F0;border-radius:16px}
    .cars-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}
    .car-card{background:#fff;border:1px solid #E5E9F0;border-radius:18px;padding:20px;display:flex;flex-direction:column;gap:10px;box-shadow:0 2px 8px rgba(0,0,0,.04);transition:all .35s}
    .car-card:hover{box-shadow:0 18px 40px rgba(0,0,0,.08);transform:translateY(-4px)}
    .car-row{display:flex;justify-content:space-between;align-items:flex-start;gap:8px}
    .car-row strong{font-size:16px;font-weight:800;display:inline-block;margin-right:6px}
    .car-pill{display:inline-block;padding:3px 10px;border-radius:6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;background:#FFF4EC;color:#FF6B00}
    .heart{background:none;border:1px solid #E5E9F0;color:#CDD3DC;font-size:18px;width:32px;height:32px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
    .heart.on,.heart:hover{color:#DC2626;border-color:#FECACA}
    .car-meta{display:flex;gap:10px;flex-wrap:wrap;font-size:12px;color:#3D4A5C}
    .car-meta.city{color:#8B95A5;font-weight:600}
    .car-foot{display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:10px;border-top:1px solid #F0F2F6}
    .car-foot small{display:block;font-size:11px;color:#8B95A5;text-transform:uppercase;letter-spacing:.5px;font-weight:700}
    .car-foot strong{font-size:22px;font-weight:900;background:linear-gradient(135deg,#FF6B00,#FF8A3D);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .s-btn{padding:10px 20px;background:linear-gradient(135deg,#FF6B00,#FF8A3D);border:none;border-radius:10px;color:#fff;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 6px 16px rgba(255,107,0,.2);transition:all .25s}
    .s-btn:hover{transform:scale(1.05)}
  `]
})
export class CarsComponent implements OnInit {
  cars = signal<Car[]>([]);
  loading = signal(true);

  city = '';
  type: 'all' | 'hatchback' | 'sedan' | 'suv' | 'luxury' = 'all';
  maxPrice = 200;

  cities = [
    { code: 'DEL', name: 'Delhi' }, { code: 'BOM', name: 'Mumbai' }, { code: 'GOI', name: 'Goa' },
    { code: 'BLR', name: 'Bangalore' }, { code: 'COK', name: 'Kochi' }, { code: 'HYD', name: 'Hyderabad' },
    { code: 'MAA', name: 'Chennai' }, { code: 'JAI', name: 'Jaipur' }
  ];

  filtered = computed(() => this.cars().filter(c => c.price_per_day <= this.maxPrice));

  constructor(private cs: CarService, private fav: FavoritesService, private toast: ToastService, private router: Router) {}

  ngOnInit(): void {
    this.fav.list().subscribe();
    this.reload();
  }

  reload() {
    this.loading.set(true);
    this.cs.search(this.city || undefined, this.type, this.maxPrice).subscribe(c => {
      this.cars.set(c);
      this.loading.set(false);
    });
  }

  isFav(id: string): boolean { return this.fav.has(id); }

  toggleFav(c: Car) {
    if (this.isFav(c.id)) {
      const fid = this.fav.favorites().find(f => f.entity_id === c.id)?.id;
      if (fid) this.fav.remove(fid).subscribe(() => this.toast.show('Removed from favorites'));
      return;
    }
    this.fav.add({ type: 'car', entity_id: c.id, title: c.name, metadata: { city: c.city, type: c.type } })
      .subscribe(r => { if (r) this.toast.show('Saved to favorites'); });
  }

  book(c: Car) {
    this.router.navigate(['/booking', 'car', c.id], {
      queryParams: { title: c.name, price: c.price_per_day, currency: c.currency }
    });
  }
}
