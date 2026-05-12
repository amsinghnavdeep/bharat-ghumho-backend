import { Component, HostListener, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { AppModalComponent } from './components/app-modal/app-modal.component';
import { ToastComponent } from './components/toast/toast.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavComponent, FooterComponent, AuthModalComponent, AppModalComponent, ToastComponent, BackToTopComponent],
    template: `<app-nav></app-nav><router-outlet></router-outlet><app-footer></app-footer><app-auth-modal></app-auth-modal><app-app-modal></app-app-modal><app-toast></app-toast><app-back-to-top></app-back-to-top>
<a class="whatsapp-float" [href]="whatsappLink()" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.129 6.744 3.047 9.379L1.054 31.25l6.1-1.955A15.9 15.9 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.31 22.609c-.391 1.102-1.938 2.016-3.164 2.281-.84.18-1.937.32-5.633-1.21-4.727-1.961-7.766-6.766-8-7.078-.226-.313-1.875-2.5-1.875-4.766s1.18-3.383 1.602-3.844c.421-.46.914-.578 1.218-.578.305 0 .61.004.875.016.281.012.66-.106 1.031.789.39.93 1.328 3.242 1.445 3.477.117.234.195.508.039.82-.156.312-.234.508-.468.781-.235.274-.496.613-.707.824-.235.234-.48.489-.207.96s1.211 2 2.601 3.24c1.789 1.595 3.297 2.09 3.766 2.324.469.234.742.195 1.015-.117.274-.313 1.172-1.367 1.485-1.836.312-.469.625-.39 1.054-.234.43.156 2.742 1.293 3.21 1.527.47.234.782.352.899.547.117.196.117 1.133-.274 2.227z"/></svg>
</a>`
})
  export class AppComponent implements AfterViewInit {
    constructor(private auth: AuthService) {}

  @HostListener('document:keydown.escape')
    onEsc() { this.auth.closeAuth(); this.auth.closeAppModal(); }

  whatsappLink(): string {
    const page = typeof window !== 'undefined' ? window.location.pathname : '/';
    const msg = encodeURIComponent(`Hi! I was browsing ${page} on Bharat Ghumho and would like to know more.`);
    return `https://wa.me/14372637644?text=${msg}`;
  }

  ngAfterViewInit() {
        const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                          if (entry.isIntersecting) {
                                      entry.target.classList.add('v');
                                      observer.unobserve(entry.target);
                          }
                });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        setTimeout(() => {
                document.querySelectorAll('.sr').forEach(el => observer.observe(el));
        }, 150);
  }
}
