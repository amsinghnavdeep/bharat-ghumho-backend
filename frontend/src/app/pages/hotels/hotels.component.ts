import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { FavoritesService } from '../../services/favorites.service';
import { ReviewsService } from '../../services/reviews.service';
import { ToastService } from '../../services/toast.service';
import { Hotel, Review } from '../../models';
import { ReviewCardComponent } from '../../components/review-card/review-card.component';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, FormsModule, ReviewCardComponent],
  template: `
<!-- Heritage Trails Hero -->
<section class="page-hero hero-hotels">
  <div class="page-hero-overlay"></div>
  <div class="page-hero-pattern pat-kalamkari"></div>
  <div class="jali-overlay"></div>
  <!-- Haveli/palace silhouette watermark -->
  <svg class="page-hero-watermark haveli" viewBox="0 0 500 400" aria-hidden="true">
    <g fill="#FFD78A" fill-opacity=".22" stroke="#FFD78A" stroke-opacity=".35" stroke-width="1">
      <!-- Palace dome cluster -->
      <path d="M30 380 L30 200 L60 200 L60 170 L80 170 L80 150 L90 140 L100 150 L100 170 L120 170 L120 200 L150 200 L150 380 Z"/>
      <path d="M170 380 L170 180 L200 180 L200 150 L210 140 L220 130 L230 120 C238 110 248 110 256 120 L266 130 L276 140 L286 150 L286 180 L316 180 L316 380 Z"/>
      <path d="M210 130 C214 120 222 120 226 130 L222 130 Z" fill="#7A1F2B" fill-opacity=".4"/>
      <!-- Arches -->
      <path d="M194 380 L194 280 C194 260 210 245 230 245 C250 245 266 260 266 280 L266 380 Z" fill="#7A1F2B" fill-opacity=".25"/>
      <!-- Side cupolas -->
      <path d="M336 380 L336 220 L356 220 L356 200 L362 192 L370 184 L378 192 L384 200 L384 220 L404 220 L404 380 Z"/>
      <path d="M420 380 L420 240 L440 240 L440 220 L450 210 L460 220 L460 240 L480 240 L480 380 Z"/>
      <!-- Domes peaks -->
      <circle cx="90" cy="138" r="6" fill="#D4A843" fill-opacity=".4"/>
      <circle cx="230" cy="118" r="7" fill="#D4A843" fill-opacity=".4"/>
      <circle cx="370" cy="182" r="5" fill="#D4A843" fill-opacity=".4"/>
    </g>
  </svg>
  <div class="w">
    <span class="page-hero-tag">Heritage Trails</span>
    <span class="ph-deva">शाही ठहराव</span>
    <div class="mughal-arch-frame lg" style="display:inline-block">
      <h1>Stay in <em>Royal Comfort</em></h1>
    </div>
    <p>From restored havelis and palace-hotels to ocean-view luxury — vetted, price-matched and full of stories.</p>
    <div class="category-strip dark">
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21 L3 9 L8 6 L12 9 L16 6 L21 9 L21 21 Z M7 21 L7 13 L11 13 L11 21 M14 21 L14 14 L18 14 L18 21"/></svg></span><span class="cat-label">Forts</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 18 L3 12 L7 8 L12 4 L17 8 L21 12 L21 18 Z M9 18 L9 13 L15 13 L15 18 M2 21 L22 21"/></svg></span><span class="cat-label">Palaces</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21 L21 21 M4 21 L4 10 L20 10 L20 21 M2 10 L12 3 L22 10"/></svg></span><span class="cat-label">Museums</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 21 L6 11 C6 7 9 4 12 4 C15 4 18 7 18 11 L18 21 Z M9 21 L9 14 L15 14 L15 21 M12 4 L12 2"/></svg></span><span class="cat-label">Monuments</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21 L3 12 L12 6 L21 12 L21 21 Z M8 21 L8 15 L11 15 L11 21 M13 21 L13 15 L16 15 L16 21"/></svg></span><span class="cat-label">Architecture</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V5a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5 A2.5 2.5 0 0 0 6.5 22H20v-5H6.5A2.5 2.5 0 0 0 4 19.5z"/></svg></span><span class="cat-label">History</span></a>
    </div>
  </div>
</section>

<section class="hot pat-kalamkari">
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
        <label>Min stars</label>
        <select [(ngModel)]="minStars" (ngModelChange)="reload()">
          <option [ngValue]="0">All</option>
          <option [ngValue]="3">3★+</option>
          <option [ngValue]="4">4★+</option>
          <option [ngValue]="5">5★ only</option>
        </select>
      </div>
      <div class="form-group">
        <label>Max ₹{{maxPrice}}</label>
        <input type="range" min="2000" max="50000" step="500" [(ngModel)]="maxPrice" (ngModelChange)="reload()" />
      </div>
      <div class="hot-meta">{{filtered().length}} hotels</div>
    </div>

    <div class="placeholder" *ngIf="loading()">Loading…</div>
    <div class="hot-empty" *ngIf="!loading() && !filtered().length">No hotels match your filters.</div>

    <div class="hot-grid">
      <article class="hot-card" *ngFor="let h of filtered()">
        <div class="hot-cover" [style.background]="cover(h)">
          <span class="hot-stars">{{stars(h.stars)}}</span>
          <button class="heart" [class.on]="isFav(h.id)" (click)="toggleFav(h)" aria-label="Toggle favorite"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
        </div>
        <div class="hot-body">
          <div class="hot-row">
            <strong>{{h.name}}</strong>
            <span class="hot-rating">★ {{h.rating | number:'1.1-1'}}</span>
          </div>
          <small class="hot-loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="12" height="12"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> {{h.city_name || h.city}}<span *ngIf="h.state">, {{h.state}}</span></small>
          <p class="hot-desc">{{h.description}}</p>
          <div class="hot-amen">
            <span *ngFor="let a of (h.amenities || []).slice(0,4)">{{a}}</span>
          </div>
          <div class="hot-foot">
            <div>
              <small>Per night</small>
              <strong>{{h.currency || 'INR'}} {{(h.price ?? h.price_per_night) | number:'1.0-0'}}</strong>
            </div>
            <div class="hot-actions">
              <button class="ghost" (click)="openDetails(h)">Reviews</button>
              <button class="s-btn" (click)="book(h)">Book now</button>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Reviews modal-ish panel -->
    <div class="rev-panel" *ngIf="activeHotel()">
      <div class="rev-panel-bg" (click)="activeHotel.set(null)"></div>
      <div class="rev-panel-card">
        <header>
          <strong>{{activeHotel()!.name}}</strong>
          <button class="ghost" (click)="activeHotel.set(null)">×</button>
        </header>
        <div class="rev-panel-stat" *ngIf="averageRating() > 0">
          Average rating: <strong>{{averageRating() | number:'1.1-1'}} / 5</strong>
        </div>
        <div class="rev-panel-empty" *ngIf="!reviews().length">No reviews yet.</div>
        <div class="rev-panel-list">
          <app-review-card *ngFor="let r of reviews()" [r]="r" />
        </div>
      </div>
    </div>
  </div>
</section>`,
  styles: [`
    /* Heritage Trails hero */
    .hero-hotels{background:linear-gradient(135deg,#3D2817 0%,#5C3A1F 30%,#8B5A2B 60%,#B8851F 100%);min-height:520px}
    .hero-hotels .page-hero-overlay{background:radial-gradient(circle at 25% 50%,rgba(212,168,67,.32) 0%,transparent 55%),radial-gradient(circle at 75% 30%,rgba(122,31,43,.22) 0%,transparent 55%)}
    .hero-hotels .page-hero-pattern{opacity:.18;filter:invert(1) brightness(1.6)}
    .hero-hotels .jali-overlay{z-index:1;opacity:.18}
    .hero-hotels .haveli{opacity:.55;width:46%;right:-3%;bottom:0;top:auto;transform:none;max-width:560px}
    .hot{padding:60px 0 80px;background:linear-gradient(180deg,var(--cream) 0%,#F8F2E8 100%);min-height:100vh;position:relative}
    .hot.pat-kalamkari{background:linear-gradient(180deg,var(--cream) 0%,#F8F2E8 100%)}
    .hot.pat-kalamkari::before{content:'';position:absolute;inset:0;opacity:.08;pointer-events:none}
    .hot-card{position:relative;overflow:hidden}
    .hot-card::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:90px;height:18px;background:radial-gradient(ellipse at 50% 100%,#D4A843,transparent 70%);z-index:3;pointer-events:none;opacity:.65}
    .hot-card:hover{box-shadow:0 16px 40px rgba(122,31,43,.22)}
    .hot-head{margin-bottom:28px;text-align:center}
    .hot-head small{font-size:12px;color:#138808;text-transform:uppercase;letter-spacing:1.2px;font-weight:700}
    .hot-head h1{font-size:42px;font-weight:900;letter-spacing:-2px;margin:6px 0 8px}
    .hot-head h1 em{font-style:normal;background:linear-gradient(135deg,#138808,#34D399);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .hot-head p{color:#3D4A5C;font-size:15px;max-width:560px;margin:0 auto;line-height:1.7}
    .filter-bar{background:#fff;border:1px solid #E5E9F0;border-radius:18px;padding:18px;display:grid;grid-template-columns:1fr 1fr 1.4fr auto;gap:14px;align-items:center;margin-bottom:24px;box-shadow:0 4px 16px rgba(0,0,0,.05)}
    @media(max-width:760px){.filter-bar{grid-template-columns:1fr 1fr}.filter-bar .hot-meta{grid-column:1/-1;text-align:left}}
    .form-group{display:flex;flex-direction:column;gap:4px}
    .form-group label{font-size:11px;font-weight:700;color:#3D4A5C;text-transform:uppercase;letter-spacing:.5px}
    .form-group input,.form-group select{padding:10px 12px;border:1px solid #E5E9F0;border-radius:10px;font-size:13px;font-weight:500;outline:none;background:#fff}
    .form-group input[type=range]{padding:0}
    .hot-meta{font-size:12px;color:#8B95A5;font-weight:600;text-align:right}
    .placeholder,.hot-empty{padding:32px;text-align:center;color:#8B95A5;background:#fff;border:1px dashed #E5E9F0;border-radius:16px}
    .hot-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px}
    .hot-card{background:#fff;border:1px solid #E5E9F0;border-radius:18px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.05);transition:all .35s}
    .hot-card:hover{box-shadow:0 18px 40px rgba(0,0,0,.08);transform:translateY(-4px)}
    .hot-cover{position:relative;height:140px}
    .hot-stars{position:absolute;top:12px;left:12px;background:rgba(255,255,255,.95);color:#F59E0B;padding:4px 10px;border-radius:6px;font-size:13px;font-weight:700}
    .heart{position:absolute;top:12px;right:12px;background:rgba(255,255,255,.95);border:none;color:#CDD3DC;font-size:16px;width:32px;height:32px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center}
    .heart.on,.heart:hover{color:#DC2626}
    .hot-body{padding:18px;display:flex;flex-direction:column;gap:8px}
    .hot-row{display:flex;justify-content:space-between;align-items:center}
    .hot-row strong{font-size:16px;font-weight:800;letter-spacing:-.3px}
    .hot-rating{font-size:13px;font-weight:700;color:#F59E0B}
    .hot-loc{font-size:12px;color:#8B95A5;font-weight:600}
    .hot-desc{font-size:13px;color:#3D4A5C;line-height:1.6;margin:0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
    .hot-amen{display:flex;gap:6px;flex-wrap:wrap}
    .hot-amen span{font-size:10px;background:#EDFCE9;color:#138808;padding:2px 8px;border-radius:6px;font-weight:700;text-transform:uppercase;letter-spacing:.5px}
    .hot-foot{display:flex;justify-content:space-between;align-items:center;margin-top:6px;padding-top:10px;border-top:1px solid #F0F2F6;gap:8px}
    .hot-foot small{display:block;font-size:11px;color:#8B95A5;text-transform:uppercase;letter-spacing:.5px;font-weight:700}
    .hot-foot strong{font-size:18px;font-weight:900;background:linear-gradient(135deg,#FF6B00,#FF8A3D);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .hot-actions{display:flex;gap:6px}
    .ghost{padding:10px 14px;background:#fff;border:1px solid #E5E9F0;border-radius:10px;font-size:12px;font-weight:700;cursor:pointer;color:#0B1120}
    .ghost:hover{border-color:#FF6B00;color:#FF6B00}
    .s-btn{padding:10px 16px;background:linear-gradient(135deg,#FF6B00,#FF8A3D);border:none;border-radius:10px;color:#fff;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 6px 16px rgba(255,107,0,.2)}
    .rev-panel{position:fixed;inset:0;z-index:1500;display:flex;align-items:center;justify-content:center;padding:20px}
    .rev-panel-bg{position:absolute;inset:0;background:rgba(11,17,32,.6);backdrop-filter:blur(6px)}
    .rev-panel-card{position:relative;background:#fff;border-radius:20px;padding:28px;max-width:640px;width:100%;max-height:80vh;overflow:auto;box-shadow:0 30px 80px rgba(0,0,0,.3)}
    .rev-panel-card header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
    .rev-panel-card header strong{font-size:18px;font-weight:800}
    .rev-panel-stat{font-size:14px;color:#3D4A5C;margin-bottom:18px;padding:10px 14px;background:#F7F8FA;border-radius:10px}
    .rev-panel-stat strong{color:#138808;font-weight:800}
    .rev-panel-empty{padding:32px;text-align:center;color:#8B95A5}
    .rev-panel-list{display:flex;flex-direction:column;gap:10px}
  `]
})
export class HotelsComponent implements OnInit {
  hotels = signal<Hotel[]>([]);
  loading = signal(true);
  activeHotel = signal<Hotel | null>(null);
  reviews = signal<Review[]>([]);
  averageRating = signal(0);

  city = '';
  minStars = 0;
  maxPrice = 30000;

  cities = [
    { code: 'DEL', name: 'Delhi' }, { code: 'BOM', name: 'Mumbai' }, { code: 'GOI', name: 'Goa' },
    { code: 'BLR', name: 'Bangalore' }, { code: 'COK', name: 'Kochi' }, { code: 'HYD', name: 'Hyderabad' },
    { code: 'MAA', name: 'Chennai' }, { code: 'JAI', name: 'Jaipur' }, { code: 'AGR', name: 'Agra' }
  ];

  filtered = computed(() => this.hotels().filter(h => (h.price ?? h.price_per_night ?? 0) <= this.maxPrice));

  themes = ['linear-gradient(135deg,#FF6B00,#FFB366)','linear-gradient(135deg,#138808,#34D399)','linear-gradient(135deg,#3730A3,#818CF8)','linear-gradient(135deg,#BE185D,#F472B6)','linear-gradient(135deg,#92400E,#FBBF24)'];

  constructor(
    private hs: HotelService,
    private fav: FavoritesService,
    private rs: ReviewsService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fav.list().subscribe();
    this.reload();
  }

  reload() {
    this.loading.set(true);
    this.hs.search(this.city || undefined, this.maxPrice, this.minStars || undefined).subscribe(h => {
      this.hotels.set(h);
      this.loading.set(false);
    });
  }

  cover(h: Hotel): string {
    if (h.image) return `url(${h.image}) center/cover`;
    const i = (h.id?.charCodeAt(h.id.length - 1) || 0) % this.themes.length;
    return this.themes[i];
  }

  stars(n: number): string { return '★'.repeat(Math.max(0, Math.min(5, Math.floor(n || 0)))); }

  isFav(id: string): boolean { return this.fav.has(id); }

  toggleFav(h: Hotel) {
    if (this.isFav(h.id)) {
      const fid = this.fav.favorites().find(f => f.entity_id === h.id)?.id;
      if (fid) this.fav.remove(fid).subscribe(() => this.toast.show('Removed from favorites'));
      return;
    }
    this.fav.add({ type: 'hotel', entity_id: h.id, title: h.name, metadata: { city: h.city, stars: h.stars } })
      .subscribe(r => { if (r) this.toast.show('Saved to favorites'); });
  }

  openDetails(h: Hotel) {
    this.activeHotel.set(h);
    this.reviews.set([]);
    this.averageRating.set(0);
    this.rs.list('hotel', h.id).subscribe(r => {
      this.reviews.set(r.reviews);
      this.averageRating.set(r.average_rating);
    });
  }

  book(h: Hotel) {
    this.router.navigate(['/booking', 'hotel', h.id], {
      queryParams: { title: h.name, price: h.price ?? h.price_per_night, currency: h.currency || 'INR' }
    });
  }
}
