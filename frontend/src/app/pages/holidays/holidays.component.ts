import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HolidayService } from '../../services/holiday.service';
import { FavoritesService } from '../../services/favorites.service';
import { ToastService } from '../../services/toast.service';
import { HolidayPackage } from '../../models';

@Component({
  selector: 'app-holidays',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<!-- Festival Journeys Hero -->
<section class="page-hero hero-holidays">
  <div class="page-hero-overlay"></div>
  <div class="page-hero-pattern pat-rangoli"></div>
  <!-- Floating lanterns -->
  <div class="lantern-field" aria-hidden="true">
    <svg class="lantern lan-1" viewBox="0 0 50 80"><defs><radialGradient id="lanG1" cx="50%" cy="40%" r="50%"><stop offset="0%" stop-color="#FFE49E"/><stop offset="60%" stop-color="#FF6B00"/><stop offset="100%" stop-color="#7A1F2B"/></radialGradient></defs><line x1="25" y1="0" x2="25" y2="14" stroke="#D4A843"/><ellipse cx="25" cy="38" rx="20" ry="26" fill="url(#lanG1)"/><rect x="22" y="62" width="6" height="6" fill="#7A1F2B"/><path d="M22 70 L25 78 L28 70" stroke="#D4A843" fill="none"/></svg>
    <svg class="lantern lan-2" viewBox="0 0 50 80"><defs><radialGradient id="lanG2" cx="50%" cy="40%" r="50%"><stop offset="0%" stop-color="#FFE49E"/><stop offset="60%" stop-color="#FF8A3D"/><stop offset="100%" stop-color="#7A1F2B"/></radialGradient></defs><line x1="25" y1="0" x2="25" y2="14" stroke="#D4A843"/><ellipse cx="25" cy="38" rx="20" ry="26" fill="url(#lanG2)"/><rect x="22" y="62" width="6" height="6" fill="#7A1F2B"/></svg>
    <svg class="lantern lan-3" viewBox="0 0 50 80"><defs><radialGradient id="lanG3" cx="50%" cy="40%" r="50%"><stop offset="0%" stop-color="#FFE49E"/><stop offset="60%" stop-color="#D4A843"/><stop offset="100%" stop-color="#7A1F2B"/></radialGradient></defs><line x1="25" y1="0" x2="25" y2="14" stroke="#D4A843"/><ellipse cx="25" cy="38" rx="20" ry="26" fill="url(#lanG3)"/><rect x="22" y="62" width="6" height="6" fill="#7A1F2B"/></svg>
    <svg class="lantern lan-4" viewBox="0 0 50 80"><defs><radialGradient id="lanG4" cx="50%" cy="40%" r="50%"><stop offset="0%" stop-color="#FFE49E"/><stop offset="60%" stop-color="#FF6B00"/><stop offset="100%" stop-color="#7A1F2B"/></radialGradient></defs><line x1="25" y1="0" x2="25" y2="14" stroke="#D4A843"/><ellipse cx="25" cy="38" rx="20" ry="26" fill="url(#lanG4)"/><rect x="22" y="62" width="6" height="6" fill="#7A1F2B"/></svg>
    <svg class="lantern lan-5" viewBox="0 0 50 80"><defs><radialGradient id="lanG5" cx="50%" cy="40%" r="50%"><stop offset="0%" stop-color="#FFE49E"/><stop offset="60%" stop-color="#FF8A3D"/><stop offset="100%" stop-color="#7A1F2B"/></radialGradient></defs><line x1="25" y1="0" x2="25" y2="14" stroke="#D4A843"/><ellipse cx="25" cy="38" rx="20" ry="26" fill="url(#lanG5)"/><rect x="22" y="62" width="6" height="6" fill="#7A1F2B"/></svg>
  </div>
  <!-- Skyline silhouette bottom -->
  <svg class="hol-skyline" viewBox="0 0 1440 130" preserveAspectRatio="none" aria-hidden="true">
    <g fill="rgba(122,31,43,.7)">
      <path d="M0 130 L0 88 L60 88 L60 70 L90 70 L90 50 L100 40 L110 50 L110 70 L140 70 L140 88 L170 88 L170 130 Z"/>
      <path d="M200 130 L200 76 L240 76 L240 60 L260 48 L270 38 L280 48 L300 60 L300 76 L340 76 L340 130 Z"/>
      <path d="M380 130 L380 80 L420 80 L420 65 L450 50 L480 65 L480 80 L520 80 L520 130 Z"/>
      <path d="M560 130 L560 90 L600 90 L600 70 L640 50 L680 70 L680 90 L720 90 L720 130 Z"/>
      <path d="M760 130 L760 70 L800 70 L800 55 L830 40 L860 55 L860 70 L900 70 L900 130 Z"/>
      <path d="M940 130 L940 85 L980 85 L980 65 L1020 50 L1060 65 L1060 85 L1100 85 L1100 130 Z"/>
      <path d="M1140 130 L1140 75 L1180 75 L1180 55 L1210 40 L1240 55 L1240 75 L1280 75 L1280 130 Z"/>
      <path d="M1320 130 L1320 88 L1360 88 L1360 70 L1390 55 L1420 70 L1420 88 L1440 88 L1440 130 Z"/>
    </g>
  </svg>
  <div class="w">
    <span class="page-hero-tag">Festival Journeys</span>
    <h1>Celebrate India —<br/><em>curated journeys</em></h1>
    <p>Hand-picked itineraries that put you at the heart of Holi colors, Diwali lights, Onam feasts and India's most luminous festivals.</p>
    <div class="category-strip dark">
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="7" cy="8" r="3" fill="currentColor" fill-opacity=".4"/><circle cx="16" cy="6" r="2.5" fill="currentColor" fill-opacity=".3"/><circle cx="18" cy="14" r="3" fill="currentColor" fill-opacity=".4"/><circle cx="10" cy="16" r="2" fill="currentColor" fill-opacity=".5"/><circle cx="6" cy="18" r="2" fill="currentColor" fill-opacity=".3"/></svg></span><span class="cat-label">Holi</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3 C13 5 14 7 14 9 C14 11 13 12 12 12 C11 12 10 11 10 9 C10 7 11 5 12 3 Z" fill="currentColor" fill-opacity=".3"/><path d="M9 13 L15 13 L14 17 L10 17 Z"/><path d="M8 18 L16 18 L15 22 L9 22 Z"/></svg></span><span class="cat-label">Diwali</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 22 L7 6 L11 4 L11 22 M13 22 L13 4 L17 6 L17 22"/><path d="M5 22 L19 22"/></svg></span><span class="cat-label">Dussehra</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 4 C9 4 7 6 7 9 C7 11 9 12 9 14 L9 16 L15 16 L15 14 C15 12 17 11 17 9 C17 6 15 4 12 4 Z"/><path d="M9 18 L15 18 M9 20 L15 20"/></svg></span><span class="cat-label">Pushkar Fair</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="5" r="2"/><path d="M12 7 L12 12 L8 16 L8 21 M12 12 L16 16 L16 21"/></svg></span><span class="cat-label">Navratri</span></a>
      <a class="cat-pill"><span class="cat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 6 C10 6 8 8 8 10 C8 12 10 13 12 14 C14 13 16 12 16 10 C16 8 14 6 12 6 Z"/><circle cx="12" cy="10" r="1.5" fill="currentColor"/><path d="M6 18 C6 16 8 14 12 14 C16 14 18 16 18 18"/></svg></span><span class="cat-label">Onam</span></a>
    </div>
  </div>
</section>

<section class="hol pat-rangoli">
  <div class="w">

    <div class="filter-bar">
      <div class="form-group">
        <label>Theme</label>
        <select [(ngModel)]="theme" (ngModelChange)="reload()">
          <option value="all">All themes</option>
          <option value="heritage">Heritage</option>
          <option value="beach">Beach</option>
          <option value="nature">Nature</option>
          <option value="adventure">Adventure</option>
          <option value="spiritual">Spiritual</option>
          <option value="wildlife">Wildlife</option>
          <option value="luxury">Luxury</option>
        </select>
      </div>
      <div class="form-group">
        <label>Max \${{maxBudget}}</label>
        <input type="range" min="200" max="3000" step="50" [(ngModel)]="maxBudget" />
      </div>
      <div class="form-group">
        <label>Search</label>
        <input [(ngModel)]="search" placeholder="Goa, Taj, Houseboat..." />
      </div>
      <div class="hol-meta">{{filtered().length}} packages</div>
    </div>

    <div class="placeholder" *ngIf="loading()">Loading…</div>
    <div class="hol-empty" *ngIf="!loading() && !filtered().length">No packages match your filters. Try widening the budget.</div>

    <div class="hol-grid">
      <article class="pkg-card" *ngFor="let p of filtered()">
        <div class="pkg-cover" [style.background]="getBg(p)">
          <span class="pkg-theme">{{p.theme}}</span>
          <button class="heart" [class.on]="isFav(p.id)" (click)="toggleFav(p)" aria-label="Save"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
        </div>
        <div class="pkg-body">
          <strong class="pkg-name">{{p.name}}</strong>
          <div class="pkg-meta">
            <span>{{p.days}}D / {{p.nights}}N</span>
            <span>★ {{p.rating}}</span>
            <span>{{p.reviews_count}} reviews</span>
          </div>
          <div class="pkg-cities">{{p.cities.join(' → ')}}</div>
          <ul class="pkg-includes">
            <li *ngFor="let h of p.highlights.slice(0,3)">✓ {{h}}</li>
          </ul>
          <div class="pkg-foot">
            <div>
              <small>Per person</small>
              <strong>{{p.currency}} {{p.price_per_person}}</strong>
            </div>
            <button class="s-btn" (click)="book(p)">Book package</button>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>`,
  styles: [`
    /* Festival Journeys hero */
    .hero-holidays{background:linear-gradient(135deg,#7A1F2B 0%,#A02638 25%,#FF6B00 55%,#FF8A3D 80%,#D4A843 100%);min-height:540px;padding-bottom:80px}
    .hero-holidays .page-hero-overlay{background:radial-gradient(circle at 70% 20%,rgba(255,228,158,.35) 0%,transparent 55%),radial-gradient(circle at 20% 80%,rgba(122,31,43,.35) 0%,transparent 60%)}
    .hero-holidays .page-hero-pattern{opacity:.22;filter:invert(1) brightness(1.4)}
    .lantern-field{position:absolute;top:20px;left:0;right:0;height:100%;pointer-events:none;z-index:2}
    .lantern{position:absolute;width:42px;height:68px;filter:drop-shadow(0 0 18px rgba(255,228,158,.6))}
    .lan-1{left:8%;top:30px;animation:lanFloat 6s ease-in-out infinite}
    .lan-2{left:24%;top:60px;animation:lanFloat 7s ease-in-out infinite .8s}
    .lan-3{right:30%;top:40px;animation:lanFloat 5.5s ease-in-out infinite 1.4s;width:50px;height:80px}
    .lan-4{right:14%;top:80px;animation:lanFloat 6.5s ease-in-out infinite 2s}
    .lan-5{right:6%;top:30px;animation:lanFloat 5s ease-in-out infinite 1s}
    @keyframes lanFloat{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-18px) rotate(3deg)}}
    .hol-skyline{position:absolute;left:0;right:0;bottom:0;width:100%;height:130px;z-index:2;pointer-events:none}
    /* Body */
    .hol{padding:60px 0 80px;background:linear-gradient(180deg,#FCEBD5 0%,#FFF7E8 100%);min-height:100vh;position:relative}
    .hol.pat-rangoli::before{content:'';position:absolute;inset:0;opacity:.1;pointer-events:none}
    .pkg-card{position:relative;overflow:hidden}
    .pkg-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#FF6B00,#fff,#138808);z-index:3}
    .hol-head{margin-bottom:28px;text-align:center}
    .hol-head small{font-size:12px;color:#138808;text-transform:uppercase;letter-spacing:1.2px;font-weight:700}
    .hol-head h1{font-size:42px;font-weight:900;letter-spacing:-2px;margin:6px 0 8px}
    .hol-head h1 em{font-style:normal;background:linear-gradient(135deg,#138808,#34D399);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .hol-head p{color:#3D4A5C;font-size:15px;max-width:560px;margin:0 auto;line-height:1.7}
    .filter-bar{background:#fff;border:1px solid #E5E9F0;border-radius:18px;padding:18px;display:grid;grid-template-columns:1fr 1.4fr 1.4fr auto;gap:14px;align-items:center;margin-bottom:24px;box-shadow:0 4px 16px rgba(0,0,0,.05)}
    @media(max-width:760px){.filter-bar{grid-template-columns:1fr 1fr}.filter-bar .hol-meta{grid-column:1/-1;text-align:left}}
    .form-group{display:flex;flex-direction:column;gap:4px}
    .form-group label{font-size:11px;font-weight:700;color:#3D4A5C;text-transform:uppercase;letter-spacing:.5px}
    .form-group input,.form-group select{padding:10px 12px;border:1px solid #E5E9F0;border-radius:10px;font-size:13px;font-weight:500;outline:none;background:#fff}
    .form-group input:focus,.form-group select:focus{border-color:#FF6B00}
    .form-group input[type=range]{padding:0}
    .hol-meta{font-size:12px;color:#8B95A5;font-weight:600;text-align:right}
    .placeholder,.hol-empty{padding:32px;text-align:center;color:#8B95A5;background:#fff;border:1px dashed #E5E9F0;border-radius:16px}
    .hol-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:18px}
    .pkg-card{background:#fff;border:1px solid #E5E9F0;border-radius:20px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 4px 16px rgba(0,0,0,.05);transition:all .35s}
    .pkg-card:hover{box-shadow:0 24px 48px rgba(0,0,0,.1);transform:translateY(-4px)}
    .pkg-cover{position:relative;height:160px}
    .pkg-theme{position:absolute;top:14px;left:14px;background:rgba(255,255,255,.92);color:#0B1120;padding:4px 12px;border-radius:6px;font-size:11px;font-weight:700;text-transform:capitalize;backdrop-filter:blur(8px)}
    .heart{position:absolute;top:14px;right:14px;background:rgba(255,255,255,.92);border:none;color:#CDD3DC;font-size:18px;width:36px;height:36px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
    .heart.on,.heart:hover{color:#DC2626}
    .pkg-body{padding:20px;display:flex;flex-direction:column;gap:10px;flex:1}
    .pkg-name{font-size:18px;font-weight:800;letter-spacing:-.5px}
    .pkg-meta{display:flex;gap:12px;font-size:12px;color:#3D4A5C}
    .pkg-meta span:nth-child(2){color:#F59E0B;font-weight:700}
    .pkg-meta span:last-child{color:#8B95A5}
    .pkg-cities{font-size:12px;color:#8B95A5;letter-spacing:.5px;text-transform:uppercase;font-weight:700}
    .pkg-includes{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:4px;font-size:13px;color:#3D4A5C}
    .pkg-includes li{padding-left:0}
    .pkg-foot{display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:14px;border-top:1px solid #F0F2F6}
    .pkg-foot small{display:block;font-size:11px;color:#8B95A5;text-transform:uppercase;letter-spacing:.5px;font-weight:700}
    .pkg-foot strong{font-size:24px;font-weight:900;background:linear-gradient(135deg,#FF6B00,#FF8A3D);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .s-btn{padding:12px 20px;background:linear-gradient(135deg,#FF6B00,#FF8A3D);border:none;border-radius:10px;color:#fff;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 6px 16px rgba(255,107,0,.2)}
  `]
})
export class HolidaysComponent implements OnInit {
  packages = signal<HolidayPackage[]>([]);
  loading = signal(true);

  theme: string = 'all';
  maxBudget = 2000;
  search = '';

  filtered = computed(() => {
    const q = this.search.toLowerCase().trim();
    return this.packages().filter(p => {
      if (p.price_per_person > this.maxBudget) return false;
      if (q && !(`${p.name} ${p.theme} ${p.cities.join(' ')} ${p.highlights.join(' ')}`.toLowerCase().includes(q))) return false;
      return true;
    });
  });

  themeBg: Record<string, string> = {
    heritage: 'linear-gradient(135deg,#92400E,#FBBF24)',
    beach: 'linear-gradient(135deg,#06B6D4,#FBBF24)',
    nature: 'linear-gradient(135deg,#138808,#34D399)',
    adventure: 'linear-gradient(135deg,#7C2D12,#FB923C)',
    spiritual: 'linear-gradient(135deg,#7C3AED,#FBBF24)',
    wildlife: 'linear-gradient(135deg,#166534,#4ADE80)',
    luxury: 'linear-gradient(135deg,#0B1120,#A16207)'
  };

  constructor(private hs: HolidayService, private fav: FavoritesService, private toast: ToastService, private router: Router) {}

  ngOnInit(): void {
    this.fav.list().subscribe();
    this.reload();
  }

  reload() {
    this.loading.set(true);
    this.hs.list(this.theme).subscribe(p => {
      this.packages.set(p);
      this.loading.set(false);
    });
  }

  getBg(p: HolidayPackage): string {
    return this.themeBg[p.theme] ?? 'linear-gradient(135deg,#FF6B00,#138808)';
  }

  isFav(id: string): boolean { return this.fav.has(id); }

  toggleFav(p: HolidayPackage) {
    if (this.isFav(p.id)) {
      const fid = this.fav.favorites().find(f => f.entity_id === p.id)?.id;
      if (fid) this.fav.remove(fid).subscribe(() => this.toast.show('Removed from favorites'));
      return;
    }
    this.fav.add({ type: 'package', entity_id: p.id, title: p.name, metadata: { theme: p.theme, days: p.days } })
      .subscribe(r => { if (r) this.toast.show('Saved to favorites'); });
  }

  book(p: HolidayPackage) {
    this.router.navigate(['/booking', 'package', p.id], {
      queryParams: { title: p.name, price: p.price_per_person, currency: p.currency }
    });
  }
}
