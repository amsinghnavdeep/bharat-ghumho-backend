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
    <svg class="logo-bird" viewBox="0 0 60 50" fill="none">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FF6B00"/><stop offset="100%" stop-color="#D4A843"/>
        </linearGradient>
      </defs>
      <polygon points="30,2 58,28 42,28" fill="url(#logoGrad)"/>
      <polygon points="30,2 18,28 30,18" fill="#E05E00"/>
      <polygon points="18,28 42,28 52,46 8,46" fill="#138808"/>
      <polygon points="30,18 42,28 36,38" fill="#0F6B06"/>
      <path d="M28,30 C28,30 26,34 24,36 C22,38 22,42 26,42 C28,42 30,40 32,38 C34,36 36,34 34,30 C33,28 29,28 28,30Z" fill="white" opacity="0.95"/>
      <circle cx="30" cy="8" r="2.5" fill="#D4A843" opacity="0.9"/>
    </svg>
    <div class="logo-text">
      <span class="logo-b">Bharat</span><em>Ghumho</em>
      <span class="logo-sub">भारत घूमो</span>
    </div>
  </a>
  <div class="nav-links">
    <a routerLink="/flights" routerLinkActive="active" class="nav-link"><span class="nl-icon">✈</span><span>Flights</span></a>
    <a routerLink="/hotels" routerLinkActive="active" class="nav-link"><span class="nl-icon">🏨</span><span>Hotels</span></a>
    <a routerLink="/cars" routerLinkActive="active" class="nav-link"><span class="nl-icon">🚗</span><span>Cars</span></a>
    <a routerLink="/holidays" routerLinkActive="active" class="nav-link"><span class="nl-icon">🏝</span><span>Holidays</span></a>
    <a routerLink="/trip-planner" routerLinkActive="active" class="nav-link nav-link-special"><span class="nl-icon">🗺</span><span>Trip Planner</span></a>
    <a routerLink="/festival-calendar" routerLinkActive="active" class="nav-link nav-link-festival"><span class="nl-icon">🪔</span><span>Festivals</span></a>
  </div>
  <div class="nav-right">
    <button class="nav-theme-toggle" (click)="theme.toggle()" [title]="theme.theme()==='dark' ? 'Switch to light' : 'Switch to dark'" aria-label="Toggle theme">
      <span *ngIf="theme.theme()==='dark'">☀</span>
      <span *ngIf="theme.theme()==='light'">🌙</span>
    </button>
    <select class="cur-select" [(ngModel)]="currency" (ngModelChange)="onCurrency()" title="Currency">
      <option *ngFor="let c of currencies">{{c}}</option>
    </select>
    <ng-container *ngIf="!auth.isAuthenticated()">
      <button class="nav-sign" (click)="auth.openAuth(false)">Sign In</button>
      <button class="nav-cta has-ripple" (click)="auth.openAuth(true)">🙏 Get Started</button>
    </ng-container>
    <div class="user-menu" *ngIf="auth.isAuthenticated()">
      <button class="user-trigger" (click)="toggleUser()">
        <span class="user-av">{{initial()}}</span>
        <span class="user-name">{{auth.userSignal()?.name}}</span>
        <span class="caret">▾</span>
      </button>
      <div class="user-pop" *ngIf="userOpen()">
        <a routerLink="/dashboard" (click)="closeUser()">📊 Dashboard</a>
        <a routerLink="/dashboard" (click)="closeUser()">🎫 My Bookings</a>
        <a routerLink="/dashboard" (click)="closeUser()">❤ Favorites</a>
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
  <div class="drawer-brand">
    <svg width="28" height="24" viewBox="0 0 60 50" fill="none">
      <polygon points="30,2 58,28 42,28" fill="#FF6B00"/>
      <polygon points="30,2 18,28 30,18" fill="#E05E00"/>
      <polygon points="18,28 42,28 52,46 8,46" fill="#138808"/>
    </svg>
    <span>Bharat<em style="font-style:normal;background:linear-gradient(135deg,#FF6B00,#D4A843);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">Ghumho</em></span>
  </div>
  <div class="drawer-devanagari">भारत घूमो</div>
  <a routerLink="/flights" routerLinkActive="active" (click)="closeMobile()"><span class="ic">✈</span> Flights</a>
  <a routerLink="/hotels" routerLinkActive="active" (click)="closeMobile()"><span class="ic">🏨</span> Hotels</a>
  <a routerLink="/cars" routerLinkActive="active" (click)="closeMobile()"><span class="ic">🚗</span> Cars</a>
  <a routerLink="/holidays" routerLinkActive="active" (click)="closeMobile()"><span class="ic">🏝</span> Holidays</a>
  <a routerLink="/trip-planner" routerLinkActive="active" (click)="closeMobile()"><span class="ic">🗺</span> Trip Planner</a>
  <a routerLink="/festival-calendar" routerLinkActive="active" (click)="closeMobile()"><span class="ic">🪔</span> Festival Calendar</a>
  <ng-container *ngIf="auth.isAuthenticated()">
    <div class="drawer-divider"></div>
    <a routerLink="/dashboard" routerLinkActive="active" (click)="closeMobile()"><span class="ic">📊</span> Dashboard</a>
  </ng-container>
  <div class="drawer-divider"></div>
  <div class="drawer-currency">
    <span>Currency</span>
    <select [(ngModel)]="currency" (ngModelChange)="onCurrency()">
      <option *ngFor="let c of currencies">{{c}}</option>
    </select>
  </div>
  <ng-container *ngIf="!auth.isAuthenticated()">
    <button class="drawer-cta" (click)="closeMobile();auth.openAuth(true)">🙏 Get Started</button>
  </ng-container>
  <ng-container *ngIf="auth.isAuthenticated()">
    <button class="drawer-cta" (click)="closeMobile();logout()">Sign out</button>
  </ng-container>
  <div class="drawer-theme">
    <span>{{theme.theme()==='dark' ? '🌙 Dark mode' : '☀ Light mode'}}</span>
    <button class="nav-theme-toggle" (click)="theme.toggle()" aria-label="Toggle theme">
      <span *ngIf="theme.theme()==='dark'">☀</span>
      <span *ngIf="theme.theme()==='light'">🌙</span>
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
    .nl-icon{font-size:11px;opacity:.6;margin-right:3px}
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
