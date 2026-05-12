import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-nav', standalone: true, imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  template: `
<nav class="nav" [class.scrolled]="scrolled()">
<div class="nav-inner">
  <a routerLink="/" class="logo" (click)="closeMobile()">
    <img class="logo-img" src="assets/logo-bird.png" alt="Bharat Ghumho" width="44" height="36" />
    <div class="logo-text">
      <span class="logo-b">Bharat</span><em>Ghumho</em>
      <span class="logo-sub">भारत घूमो</span>
    </div>
  </a>
  <div class="nav-links">
    <a routerLink="/flights" routerLinkActive="active" class="nav-link">
      <span class="nl-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg></span><span>Flights</span>
    </a>
    <a routerLink="/hotels" routerLinkActive="active" class="nav-link">
      <span class="nl-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v13"/><path d="M3 13h18"/><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M7 21v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3"/><path d="M13 21v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3"/></svg></span><span>Hotels</span>
    </a>
    <a routerLink="/cars" routerLinkActive="active" class="nav-link">
      <span class="nl-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 16H9m10 0h1.5a1 1 0 0 0 1-1v-3.6a1 1 0 0 0-.4-.8L19 9.2 17.2 5.4A2 2 0 0 0 15.4 4H8.6a2 2 0 0 0-1.8 1.4L5 9.2 2.9 10.6a1 1 0 0 0-.4.8V15a1 1 0 0 0 1 1H5"/><circle cx="7" cy="16" r="2"/><circle cx="17" cy="16" r="2"/></svg></span><span>Cars</span>
    </a>
    <a routerLink="/holidays" routerLinkActive="active" class="nav-link">
      <span class="nl-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 0 1-6.71-9"/><path d="M8.5 8a4 4 0 0 1 7 0"/><path d="M12 8a8 8 0 0 1 7.7 6"/><path d="M12 8v13"/><path d="M3 21h18"/></svg></span><span>Holidays</span>
    </a>
    <a routerLink="/festival-calendar" routerLinkActive="active" class="nav-link nav-link-festival">
      <span class="nl-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c1.5 2 2 3.5 2 5a2 2 0 0 1-4 0c0-1.5.5-3 2-5z"/><path d="M7 9h10l-1 4H8z"/><path d="M6 13h12l-1 8H7z"/></svg></span><span>Festivals</span>
    </a>
  </div>
  <div class="nav-right">
    <button class="nav-theme-toggle" (click)="theme.toggle()" [title]="theme.theme()==='dark' ? 'Switch to light' : 'Switch to dark'" aria-label="Toggle theme">
      <svg *ngIf="theme.theme()==='dark'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
      <svg *ngIf="theme.theme()==='light'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
    </button>
    <select class="cur-select" [(ngModel)]="currency" (ngModelChange)="onCurrency()" title="Currency">
      <option *ngFor="let c of currencies">{{c}}</option>
    </select>
    <ng-container *ngIf="!auth.isAuthenticated()">
      <button class="nav-sign" (click)="auth.openAuth(false)">Sign In</button>
      <button class="nav-cta has-ripple" (click)="auth.openAuth(true)"><span class="namaste-ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-.55 0-1 .45-1 1v6.6L9 7.5V4a1 1 0 0 0-2 0v6c0 .27.1.52.29.71l3 3c.2.2.45.29.71.29h2c.26 0 .51-.1.71-.29l3-3c.19-.19.29-.44.29-.71V4a1 1 0 0 0-2 0v3.5L13 9.6V3c0-.55-.45-1-1-1zM6 16a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v6H6v-6z"/></svg></span> Get Started</button>
    </ng-container>
    <div class="user-menu" *ngIf="auth.isAuthenticated()">
      <button class="user-trigger" (click)="toggleUser()">
        <span class="user-av">{{initial()}}</span>
        <span class="user-name">{{auth.userSignal()?.name}}</span>
        <span class="caret">▾</span>
      </button>
      <div class="user-pop" *ngIf="userOpen()">
        <a routerLink="/dashboard" (click)="closeUser()"><svg class="pop-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg> Dashboard</a>
        <a routerLink="/dashboard" (click)="closeUser()"><svg class="pop-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"/><path d="M13 5v14"/></svg> My Bookings</a>
        <a routerLink="/dashboard" (click)="closeUser()"><svg class="pop-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> Favorites</a>
        <hr />
        <button (click)="logout()">Sign out</button>
      </div>
    </div>
  </div>
  <button class="hamburger" [class.active]="mobileOpen()" (click)="toggleMobile()" aria-label="Open menu"><span></span><span></span><span></span></button>
</div>
<div class="nav-pattern-bar" *ngIf="scrolled()"></div>
</nav>
<div class="drawer-backdrop" [class.open]="mobileOpen()" (click)="closeMobile()"></div>
<aside class="mobile-drawer" [class.open]="mobileOpen()" role="dialog" aria-label="Navigation menu">
  <button class="drawer-close" (click)="closeMobile()" aria-label="Close menu">&times;</button>
  <!-- Decorative Mughal arch -->
  <svg class="drawer-arch" viewBox="0 0 260 80" aria-hidden="true">
    <path d="M10 78 L10 50 C10 22 60 6 130 6 C200 6 250 22 250 50 L250 78"
          fill="none" stroke="#D4A843" stroke-width="1.5" stroke-opacity=".55"/>
    <path d="M22 78 L22 52 C22 30 64 16 130 16 C196 16 238 30 238 52 L238 78"
          fill="none" stroke="#D4A843" stroke-width="1" stroke-opacity=".35"/>
    <circle cx="130" cy="8" r="3" fill="#D4A843" fill-opacity=".7"/>
    <circle cx="130" cy="20" r="2" fill="#FF6B00" fill-opacity=".7"/>
  </svg>
  <div class="drawer-brand">
    <img src="assets/logo-bird.png" alt="Bharat Ghumho" width="36" height="30" />
    <span>Bharat<em style="font-style:normal;background:linear-gradient(135deg,#FF6B00,#D4A843);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">Ghumho</em></span>
  </div>
  <div class="drawer-devanagari">भारत घूमो</div>
  <a routerLink="/flights" routerLinkActive="active" (click)="closeMobile()"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg></span> Flights</a>
  <a routerLink="/hotels" routerLinkActive="active" (click)="closeMobile()"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v13"/><path d="M3 13h18"/><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M7 21v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3"/><path d="M13 21v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3"/></svg></span> Hotels</a>
  <a routerLink="/cars" routerLinkActive="active" (click)="closeMobile()"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 16H9m10 0h1.5a1 1 0 0 0 1-1v-3.6a1 1 0 0 0-.4-.8L19 9.2 17.2 5.4A2 2 0 0 0 15.4 4H8.6a2 2 0 0 0-1.8 1.4L5 9.2 2.9 10.6a1 1 0 0 0-.4.8V15a1 1 0 0 0 1 1H5"/><circle cx="7" cy="16" r="2"/><circle cx="17" cy="16" r="2"/></svg></span> Cars</a>
  <a routerLink="/holidays" routerLinkActive="active" (click)="closeMobile()"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 0 1-6.71-9"/><path d="M8.5 8a4 4 0 0 1 7 0"/><path d="M12 8a8 8 0 0 1 7.7 6"/><path d="M12 8v13"/><path d="M3 21h18"/></svg></span> Holidays</a>
  <a routerLink="/festival-calendar" routerLinkActive="active" (click)="closeMobile()"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c1.5 2 2 3.5 2 5a2 2 0 0 1-4 0c0-1.5.5-3 2-5z"/><path d="M7 9h10l-1 4H8z"/><path d="M6 13h12l-1 8H7z"/></svg></span> Festival Calendar</a>
  <ng-container *ngIf="auth.isAuthenticated()">
    <div class="drawer-divider"></div>
    <a routerLink="/dashboard" routerLinkActive="active" (click)="closeMobile()"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg></span> Dashboard</a>
  </ng-container>
  <div class="drawer-divider"></div>
  <div class="drawer-currency">
    <span>Currency</span>
    <select [(ngModel)]="currency" (ngModelChange)="onCurrency()">
      <option *ngFor="let c of currencies">{{c}}</option>
    </select>
  </div>
  <ng-container *ngIf="!auth.isAuthenticated()">
    <button class="drawer-cta" (click)="closeMobile();auth.openAuth(true)">Get Started →</button>
  </ng-container>
  <ng-container *ngIf="auth.isAuthenticated()">
    <button class="drawer-cta" (click)="closeMobile();logout()">Sign out</button>
  </ng-container>
  <div class="drawer-theme">
    <span>{{theme.theme()==='dark' ? 'Dark mode' : 'Light mode'}}</span>
    <button class="nav-theme-toggle" (click)="theme.toggle()" aria-label="Toggle theme">
      <svg *ngIf="theme.theme()==='dark'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
      <svg *ngIf="theme.theme()==='light'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
    </button>
  </div>
  <div class="drawer-lotus" aria-hidden="true">✿ ✿ ✿</div>
</aside>`,
  styles: [`
    .logo-text{display:flex;flex-direction:column;line-height:1.1}
    .logo-b{font-size:18px;font-weight:900;color:var(--white);letter-spacing:-.3px}
    .logo-text em{font-style:normal;font-size:18px;font-weight:900;background:linear-gradient(135deg,var(--saffron),#FFB366,var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .logo-sub{font-size:9px;color:rgba(255,255,255,.35);letter-spacing:2px;font-weight:500}
    .nav-pattern-bar{height:2px;background:linear-gradient(90deg,var(--saffron),var(--gold),var(--green),var(--gold),var(--maroon),var(--gold),var(--saffron));background-size:200%;animation:patternScroll 4s linear infinite}
    @keyframes patternScroll{0%{background-position:0%}100%{background-position:200%}}
    .nl-icon{font-size:11px;opacity:.7;margin-right:5px;display:inline-flex;align-items:center;justify-content:center;width:15px;height:15px;color:currentColor}
    .nl-icon svg{width:15px;height:15px}
    .logo-img{width:44px;height:36px;object-fit:contain;filter:drop-shadow(0 2px 6px rgba(255,107,0,.25));flex-shrink:0;transition:transform .35s}
    .logo:hover .logo-img{transform:scale(1.07) rotate(-3deg)}
    .pop-ic{width:16px;height:16px;display:inline-block;vertical-align:-3px;margin-right:8px;color:currentColor;flex-shrink:0}
    .namaste-ic{display:inline-flex;width:14px;height:14px;margin-right:6px;vertical-align:-2px;color:currentColor}
    .namaste-ic svg{width:14px;height:14px}
    .user-pop a,.user-pop button{display:flex;align-items:center;gap:6px}
    /* Drawer SVG sizing */
    .mobile-drawer .ic{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;color:var(--gold);margin-right:6px}
    .mobile-drawer .ic svg{width:18px;height:18px}
    /* Nav-link micro-animation: lotus appears on hover */
    .nav-link::after{content:'\u272a';position:absolute;right:-2px;top:50%;transform:translateY(-50%) scale(.4);opacity:0;font-size:10px;color:var(--gold);transition:all .3s;pointer-events:none}
    .nav-link:hover::after{opacity:.7;transform:translateY(-50%) scale(1) translateX(2px)}
    .nav-link.active::after{opacity:0}
    .nav-link-special{background:linear-gradient(135deg,rgba(212,168,67,.1),rgba(255,107,0,.08));border:1px solid rgba(212,168,67,.2);border-radius:8px}
    .nav-link-special.active{background:linear-gradient(135deg,rgba(212,168,67,.2),rgba(255,107,0,.15));border-color:rgba(212,168,67,.4)}
    .nav-link-festival{background:linear-gradient(135deg,rgba(255,107,0,.1),rgba(245,166,35,.08));border:1px solid rgba(255,107,0,.2);border-radius:8px}
    .nav-link-festival.active{background:linear-gradient(135deg,rgba(255,107,0,.2),rgba(245,166,35,.15));border-color:rgba(255,107,0,.45)}
    .cur-select{padding:8px 10px;border:1px solid rgba(255,255,255,.12);border-radius:8px;font-size:12px;font-weight:700;background:rgba(255,255,255,.06);color:var(--white);cursor:pointer;outline:none}
    .cur-select:focus{border-color:var(--gold)}
    .user-menu{position:relative}
    .user-trigger{display:flex;align-items:center;gap:8px;padding:6px 12px 6px 6px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:100px;cursor:pointer;font-size:13px;font-weight:700;color:var(--white)}
    .user-trigger:hover{border-color:var(--gold)}
    .user-av{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--saffron),var(--gold));color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900}
    .caret{font-size:10px;color:rgba(255,255,255,.45)}
    .user-pop{position:absolute;top:calc(100% + 8px);right:0;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:6px;min-width:190px;box-shadow:0 20px 50px rgba(0,0,0,.18);z-index:1000;border-top:3px solid var(--gold)}
    .user-pop a,.user-pop button{display:block;width:100%;text-align:left;padding:10px 14px;border-radius:10px;font-size:13px;font-weight:600;color:var(--text-1);text-decoration:none;background:none;border:none;cursor:pointer}
    .user-pop a:hover,.user-pop button:hover{background:var(--gold-light);color:var(--saffron)}
    .user-pop hr{border:none;border-top:1px solid var(--border-light);margin:4px 0}
    .nav-link.active span:last-child{background:linear-gradient(135deg,var(--saffron),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .nav-link.active::after{content:'';position:absolute;bottom:-4px;left:20%;right:20%;height:2px;background:linear-gradient(90deg,var(--saffron),var(--gold));border-radius:2px}
    .drawer-devanagari{font-size:12px;color:var(--gold);opacity:.7;letter-spacing:3px;margin:-12px 0 16px;font-family:'Yatra One',serif}
    .drawer-lotus{text-align:center;font-size:18px;color:var(--gold);opacity:.4;margin-top:auto;letter-spacing:8px;padding-top:16px}
  `]
})
export class NavComponent {
  scrolled = signal(false);
  mobileOpen = signal(false);
  userOpen = signal(false);
  currency = 'CAD';
  currencies = ['CAD', 'USD', 'GBP', 'EUR', 'AED', 'SGD', 'AUD', 'INR'];

  constructor(public auth: AuthService, public theme: ThemeService, private router: Router, private toast: ToastService) {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bg_currency');
      if (stored) this.currency = stored;
    }
  }

  @HostListener('window:scroll') onScroll() { this.scrolled.set(window.scrollY > 50); }
  @HostListener('document:click', ['$event']) onDocClick(e: MouseEvent) {
    const t = e.target as HTMLElement;
    if (!t.closest('.user-menu')) this.userOpen.set(false);
  }
  @HostListener('document:keydown.escape') onEsc() { this.closeMobile(); this.closeUser(); }

  toggleMobile() {
    this.mobileOpen.update(v => !v);
    if (typeof document !== 'undefined') document.body.style.overflow = this.mobileOpen() ? 'hidden' : '';
  }
  closeMobile() {
    this.mobileOpen.set(false);
    if (typeof document !== 'undefined') document.body.style.overflow = '';
  }
  toggleUser() { this.userOpen.update(v => !v); }
  closeUser() { this.userOpen.set(false); }
  initial(): string { return (this.auth.userSignal()?.name?.[0] || 'U').toUpperCase(); }
  logout() { this.auth.logout(); this.userOpen.set(false); this.toast.show('Signed out — Alvida! 🙏'); this.router.navigate(['/']); }
  onCurrency() {
    if (typeof window !== 'undefined') localStorage.setItem('bg_currency', this.currency);
    this.toast.show(`Currency: ${this.currency}`);
  }
}
