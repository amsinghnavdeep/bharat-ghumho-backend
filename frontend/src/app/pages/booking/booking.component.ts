import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';
import { BookingType } from '../../models';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
<section class="bk-page">
  <div class="w">
    <a routerLink="/dashboard" class="bk-back">← Dashboard</a>
    <h1>Confirm your {{type}}</h1>
    <div class="book-stepper" role="list">
      <div class="book-step" [class.active]="step()==='details'" [class.done]="step()==='review' || step()==='confirmed'" role="listitem">
        <span class="book-step-num">1</span><div class="book-step-label">Traveler details</div>
      </div>
      <div class="book-step" [class.active]="step()==='review'" [class.done]="step()==='confirmed'" role="listitem">
        <span class="book-step-num">2</span><div class="book-step-label">Review</div>
      </div>
      <div class="book-step" [class.active]="step()==='confirmed'" role="listitem">
        <span class="book-step-num">3</span><div class="book-step-label">Confirmation</div>
      </div>
    </div>

    <div class="bk-grid">
      <div class="bk-form">
        <ng-container *ngIf="step()==='details'">
          <h2>Traveler details</h2>
          <div class="form-group">
            <label>Full name</label>
            <input [(ngModel)]="travelerName" placeholder="As on passport" />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input [(ngModel)]="travelerEmail" type="email" placeholder="you@example.com" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Travelers</label>
              <input type="number" min="1" max="9" [(ngModel)]="travelers" />
            </div>
            <div class="form-group">
              <label>Start date</label>
              <input type="date" [(ngModel)]="startDate" />
            </div>
            <div class="form-group" *ngIf="needsEnd">
              <label>End date</label>
              <input type="date" [(ngModel)]="endDate" />
            </div>
          </div>
          <button class="s-btn" (click)="step.set('review')" [disabled]="!travelerName || !travelerEmail">Continue to review</button>
        </ng-container>

        <ng-container *ngIf="step()==='review'">
          <h2>Review</h2>
          <dl class="bk-review">
            <div><dt>Type</dt><dd>{{type}}</dd></div>
            <div><dt>Item</dt><dd>{{title}}</dd></div>
            <div><dt>Traveler</dt><dd>{{travelerName}}</dd></div>
            <div><dt>Email</dt><dd>{{travelerEmail}}</dd></div>
            <div><dt>Travelers</dt><dd>{{travelers}}</dd></div>
            <div *ngIf="startDate"><dt>Start</dt><dd>{{startDate}}</dd></div>
            <div *ngIf="endDate"><dt>End</dt><dd>{{endDate}}</dd></div>
          </dl>
          <div class="bk-row">
            <button class="ghost-btn" (click)="step.set('details')">Back</button>
            <button class="s-btn" (click)="confirm()" [disabled]="saving()">{{saving() ? 'Booking…' : 'Confirm booking'}}</button>
          </div>
        </ng-container>

        <ng-container *ngIf="step()==='confirmed'">
          <div class="bk-success">
            <!-- Animated lotus bloom -->
            <svg class="bk-lotus" viewBox="0 0 120 120" aria-hidden="true">
              <g transform="translate(60 60)">
                <ellipse class="lp" cx="0" cy="-32" rx="10" ry="22" fill="#FFC58A"/>
                <ellipse class="lp lp2" cx="22" cy="-22" rx="10" ry="22" fill="#FF8A3D" transform="rotate(45)"/>
                <ellipse class="lp lp3" cx="32" cy="0" rx="10" ry="22" fill="#FF6B00" transform="rotate(90)"/>
                <ellipse class="lp lp4" cx="22" cy="22" rx="10" ry="22" fill="#FF8A3D" transform="rotate(135)"/>
                <ellipse class="lp lp5" cx="0" cy="32" rx="10" ry="22" fill="#FFC58A" transform="rotate(180)"/>
                <ellipse class="lp lp6" cx="-22" cy="22" rx="10" ry="22" fill="#FF8A3D" transform="rotate(225)"/>
                <ellipse class="lp lp7" cx="-32" cy="0" rx="10" ry="22" fill="#FF6B00" transform="rotate(270)"/>
                <ellipse class="lp lp8" cx="-22" cy="-22" rx="10" ry="22" fill="#FF8A3D" transform="rotate(315)"/>
                <circle r="12" fill="#D4A843"/>
                <circle r="6" fill="#7A1F2B"/>
              </g>
            </svg>
            <!-- Confetti -->
            <div class="bk-confetti" aria-hidden="true">
              <span *ngFor="let i of [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]" [style.left]="(i*5+5)+'%'" [style.animationDelay]="(i*0.15)+'s'"></span>
            </div>
            <div class="mughal-arch-frame lg" style="display:inline-block">
              <h2>Booking confirmed!</h2>
            </div>
            <p>Reference <strong>{{confirmationId()}}</strong>. We've emailed your confirmation.</p>
            <div class="bk-row">
              <a class="ghost-btn" routerLink="/dashboard">View bookings</a>
              <a class="s-btn" routerLink="/">Back home</a>
            </div>
          </div>
        </ng-container>
      </div>

      <aside class="bk-summary">
        <h3>Order summary</h3>
        <div class="bk-line"><span>{{title}}</span><strong>{{currency}} {{price | number:'1.0-2'}}</strong></div>
        <div class="bk-line"><span>Travelers ({{travelers}})</span><strong>×{{travelers}}</strong></div>
        <div class="bk-line"><span>Taxes & fees</span><strong>{{currency}} {{taxes() | number:'1.0-2'}}</strong></div>
        <hr />
        <div class="bk-total"><span>Total</span><strong>{{currency}} {{total() | number:'1.0-2'}}</strong></div>
      </aside>
    </div>
  </div>
</section>`,
  styles: [`
    .bk-page{padding:120px 0 80px;background:linear-gradient(180deg,var(--cream,#FFF7E8) 0%,#F8F2E8 100%);min-height:100vh;position:relative}
    .bk-page::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'><g fill='none' stroke='%237A1F2B' stroke-opacity='.05' stroke-width='1'><path d='M40 90 C40 60 60 50 80 60 C90 40 110 40 120 60 C140 50 160 70 150 90 C160 100 150 130 130 130 C120 150 80 150 70 130 C40 130 30 100 40 90Z'/></g></svg>");pointer-events:none}
    .bk-page > *{position:relative;z-index:1}
    .bk-summary{position:relative;overflow:visible}
    .bk-summary::before,.bk-summary::after{content:'';position:absolute;width:32px;height:32px;background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='none' stroke='%23D4A843' stroke-width='1.5'><path d='M2 2 L18 2 M2 2 L2 18 M2 14 L8 8 L14 14 M14 2 C18 6 14 10 18 14'/></svg>") no-repeat center/contain;opacity:.55}
    .bk-summary::before{top:-6px;left:-6px}
    .bk-summary::after{top:-6px;right:-6px;transform:scaleX(-1)}
    .bk-lotus{width:120px;height:120px;animation:lotusBloom 1.4s ease-out both}
    .lp{transform-origin:60px 60px;animation:lotusPetal 1.4s ease-out both}
    .bk-confetti{position:absolute;top:0;left:0;right:0;height:380px;pointer-events:none;overflow:hidden}
    .bk-confetti span{position:absolute;top:-20px;width:10px;height:14px;background:#D4A843;animation:confettiDrop 3.4s ease-in infinite;opacity:.85}
    .bk-confetti span:nth-child(odd){background:#FF6B00}
    .bk-confetti span:nth-child(3n){background:#138808}
    .bk-confetti span:nth-child(5n){background:#7A1F2B}
    .bk-success{position:relative}
    .bk-back{font-size:13px;color:#8B95A5;font-weight:600;text-decoration:none;display:inline-block;margin-bottom:12px}
    .bk-back:hover{color:#FF6B00}
    h1{font-size:32px;font-weight:900;letter-spacing:-1.5px;margin-bottom:18px;text-transform:capitalize}
    .bk-stepper{display:flex;gap:6px;margin-bottom:28px;flex-wrap:wrap}
    .bk-step{padding:10px 18px;background:#fff;border:1px solid #E5E9F0;border-radius:10px;font-size:12px;font-weight:600;color:#8B95A5}
    .bk-step.active{background:#0B1120;color:#fff;border-color:#0B1120}
    .bk-step.done{background:#EDFCE9;color:#138808;border-color:#bbf7d0}
    .bk-grid{display:grid;grid-template-columns:1fr 320px;gap:24px}
    @media(max-width:760px){.bk-grid{grid-template-columns:1fr}}
    .bk-form,.bk-summary{background:#fff;border:1px solid #E5E9F0;border-radius:18px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,.04)}
    .bk-form h2{font-size:18px;font-weight:800;margin-bottom:16px}
    .form-group{margin-bottom:16px}
    .form-group label{display:block;font-size:12px;font-weight:700;color:#3D4A5C;margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px}
    .form-group input{width:100%;padding:12px 14px;border:1px solid #E5E9F0;border-radius:10px;font-size:14px;font-weight:500;color:#0B1120;outline:none}
    .form-group input:focus{border-color:#FF6B00}
    .form-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
    @media(max-width:600px){.form-row{grid-template-columns:1fr}}
    .bk-review{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px}
    .bk-review div{display:flex;flex-direction:column;gap:2px;background:#F7F8FA;padding:12px;border-radius:10px}
    .bk-review dt{font-size:11px;color:#8B95A5;text-transform:uppercase;letter-spacing:.5px;font-weight:700}
    .bk-review dd{font-size:14px;font-weight:700;color:#0B1120;margin:0}
    .bk-row{display:flex;gap:8px;flex-wrap:wrap}
    .ghost-btn{padding:14px 20px;background:#fff;border:1px solid #E5E9F0;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;text-decoration:none;color:#0B1120}
    .ghost-btn:hover{border-color:#FF6B00;color:#FF6B00}
    .s-btn{padding:14px 22px;background:linear-gradient(135deg,#FF6B00,#FF8A3D);border:none;border-radius:10px;color:#fff;font-size:14px;font-weight:700;cursor:pointer;text-decoration:none;display:inline-block;box-shadow:0 6px 20px rgba(255,107,0,.2)}
    .s-btn:disabled{opacity:.6;cursor:not-allowed}
    .bk-summary h3{font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:.5px;color:#8B95A5;margin-bottom:14px}
    .bk-line{display:flex;justify-content:space-between;font-size:14px;color:#3D4A5C;margin-bottom:8px}
    .bk-line strong{color:#0B1120;font-weight:700}
    .bk-summary hr{border:none;border-top:1px solid #F0F2F6;margin:14px 0}
    .bk-total{display:flex;justify-content:space-between;font-size:18px;font-weight:900;color:#0B1120}
    .bk-success{text-align:center;padding:32px 0}
    .bk-tick{display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;border-radius:50%;background:#EDFCE9;color:#138808;font-size:32px;font-weight:900;margin-bottom:18px}
  `]
})
export class BookingComponent implements OnInit {
  type: BookingType = 'flight';
  entityId = '';
  title = '';
  price = 0;
  currency = 'CAD';

  travelerName = '';
  travelerEmail = '';
  travelers = 1;
  startDate = '';
  endDate = '';

  step = signal<'details' | 'review' | 'confirmed'>('details');
  saving = signal(false);
  confirmationId = signal('');

  needsEnd = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private toast: ToastService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.type = (this.route.snapshot.paramMap.get('type') as BookingType) || 'flight';
    this.entityId = this.route.snapshot.paramMap.get('id') || '';
    const qp = this.route.snapshot.queryParamMap;
    this.title = qp.get('title') || `${this.type[0].toUpperCase() + this.type.slice(1)} ${this.entityId}`;
    this.price = Number(qp.get('price') || 0);
    this.currency = qp.get('currency') || 'CAD';
    this.needsEnd = ['hotel', 'car', 'package'].includes(this.type);
    const u = this.auth.userSignal();
    if (u) {
      this.travelerName = u.name;
      this.travelerEmail = u.email;
    }
    const today = new Date(); today.setDate(today.getDate() + 14);
    this.startDate = today.toISOString().split('T')[0];
    if (this.needsEnd) {
      const end = new Date(today); end.setDate(end.getDate() + 4);
      this.endDate = end.toISOString().split('T')[0];
    }
  }

  taxes() { return Math.round(this.price * this.travelers * 0.18); }
  total() { return this.price * this.travelers + this.taxes(); }

  confirm() {
    this.saving.set(true);
    this.bookingService.create({
      type: this.type,
      entity_id: this.entityId,
      title: this.title,
      price: this.total(),
      currency: this.currency,
      travelers: this.travelers,
      start_date: this.startDate,
      end_date: this.endDate || undefined,
      details: { traveler_name: this.travelerName, traveler_email: this.travelerEmail }
    }).subscribe(b => {
      this.saving.set(false);
      if (b) {
        this.confirmationId.set(b.id);
        this.step.set('confirmed');
        this.toast.show('Booking confirmed!');
      } else {
        this.toast.show('Booking failed. Please try again.');
      }
    });
  }
}
