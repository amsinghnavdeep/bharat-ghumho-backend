import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { RoutesSectionComponent } from '../../components/routes-section/routes-section.component';
import { ReviewsComponent } from '../../components/reviews/reviews.component';
import { CtaComponent } from '../../components/cta/cta.component';
import { SearchTabsComponent } from '../../components/search-tabs/search-tabs.component';
import { WeatherWidgetComponent } from '../../components/weather-widget/weather-widget.component';
import { CurrencyConverterComponent } from '../../components/currency-converter/currency-converter.component';
import { DestinationCardData } from '../../components/destination-card/destination-card.component';
import { DestinationsCarouselComponent } from '../../components/destinations-carousel/destinations-carousel.component';
import { LandmarkStripComponent } from '../../components/landmark-strip/landmark-strip.component';
import { CultureCategoriesComponent } from '../../components/culture-categories/culture-categories.component';
import { HolidayPackagesComponent } from '../../components/holiday-packages/holiday-packages.component';
import { Lotus3dComponent } from '../../components/lotus-3d/lotus-3d.component';

@Component({
  selector: 'app-home', standalone: true,
  imports: [
    CommonModule, HeroComponent, FeaturesComponent, RoutesSectionComponent,
    ReviewsComponent, CtaComponent, SearchTabsComponent, WeatherWidgetComponent,
    CurrencyConverterComponent, DestinationsCarouselComponent, LandmarkStripComponent,
    CultureCategoriesComponent, HolidayPackagesComponent, Lotus3dComponent
  ],
  template: `
    <app-hero/>
    <!-- Bead chain divider between hero and search tabs -->
    <div class="bead-chain-wrap" aria-hidden="true">
      <div class="bead-chain">
        <svg viewBox="0 0 380 18" preserveAspectRatio="xMidYMid meet">
          <g>
            <circle cx="20" cy="9" r="3.2" fill="#D4A843"/>
            <circle cx="40" cy="9" r="2.4" fill="#FF6B00" opacity=".85"/>
            <circle cx="58" cy="9" r="3.2" fill="#D4A843"/>
            <circle cx="76" cy="9" r="2.4" fill="#138808" opacity=".85"/>
            <circle cx="94" cy="9" r="3.2" fill="#D4A843"/>
            <circle cx="112" cy="9" r="2.4" fill="#7A1F2B" opacity=".85"/>
            <circle cx="130" cy="9" r="3.2" fill="#D4A843"/>
            <circle cx="148" cy="9" r="2.4" fill="#FF6B00" opacity=".85"/>
            <circle cx="166" cy="9" r="3.2" fill="#D4A843"/>
            <path d="M188 4 L196 9 L188 14 L180 9 Z" fill="#FF6B00"/>
            <circle cx="208" cy="9" r="3.2" fill="#D4A843"/>
            <circle cx="226" cy="9" r="2.4" fill="#138808" opacity=".85"/>
            <circle cx="244" cy="9" r="3.2" fill="#D4A843"/>
            <circle cx="262" cy="9" r="2.4" fill="#7A1F2B" opacity=".85"/>
            <circle cx="280" cy="9" r="3.2" fill="#D4A843"/>
            <circle cx="298" cy="9" r="2.4" fill="#FF6B00" opacity=".85"/>
            <circle cx="316" cy="9" r="3.2" fill="#D4A843"/>
            <circle cx="334" cy="9" r="2.4" fill="#138808" opacity=".85"/>
            <circle cx="352" cy="9" r="3.2" fill="#D4A843"/>
          </g>
        </svg>
      </div>
    </div>
    <section class="search-tabs-wrap">
      <div class="w">
        <app-search-tabs />
      </div>
    </section>
    <app-landmark-strip/>
    <section class="trending">
      <div class="w">
        <div class="sec-head sr">
          <div class="torana-frame">
            <div class="sec-tag sf"><span class="tag-lotus">✿</span> Trending now</div>
          </div>
          <h2 class="sec-title">Top <em class="display-italic">destinations.</em></h2>
          <div class="madhubani-title-line" aria-hidden="true">
            <svg viewBox="0 0 320 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="10" x2="130" y2="10" stroke="rgba(201,145,26,0.3)" stroke-width="1"/>
              <ellipse cx="160" cy="10" rx="12" ry="6" stroke="rgba(201,145,26,0.5)" stroke-width="1.2"/>
              <circle cx="145" cy="10" r="3" fill="rgba(201,145,26,0.35)"/>
              <circle cx="175" cy="10" r="3" fill="rgba(201,145,26,0.35)"/>
              <circle cx="160" cy="10" r="2" fill="rgba(201,145,26,0.5)"/>
              <line x1="190" y1="10" x2="320" y2="10" stroke="rgba(201,145,26,0.3)" stroke-width="1"/>
            </svg>
          </div>
          <p class="sec-sub">Swipe through the cities India loves — weather, currency, fares, all live.</p>
        </div>
        <app-destinations-carousel [destinations]="destinations" [showWeather]="true" />
      </div>
    </section>
    <section class="widgets">
      <div class="w widgets-grid">
        <app-currency-converter />
        <app-weather-widget [city]="'Mumbai'" [showForecast]="true" />
        <app-weather-widget [city]="'Goa'" [showForecast]="true" />
      </div>
    </section>
    <app-culture-categories/>
    <app-features/>
    <app-holiday-packages/>
    <app-lotus-3d/>
    <app-routes-section/>
    <app-reviews/>
    <app-cta/>
  `,
  styles: [`
    .search-tabs-wrap{padding:0 0 24px;background:var(--page)}
    .trending{position:relative;padding:96px 0 80px;background:var(--page)}
    .trending::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><g fill='none' stroke='%23C9911A' stroke-opacity='.05' stroke-width='1'><circle cx='80' cy='80' r='30'/><circle cx='80' cy='80' r='50'/><circle cx='80' cy='80' r='70'/></g></svg>");background-size:160px 160px;opacity:.6;pointer-events:none}
    .trending > .w{position:relative;z-index:1}
    .widgets{padding:30px 0 60px;background:var(--page)}
    .widgets-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px}
    @media(max-width:900px){.widgets-grid{grid-template-columns:1fr}}
  `]
})
export class HomeComponent {
  destinations: DestinationCardData[] = [
    { code: 'GOI', name: 'Goa', country: 'India', tagline: 'Beach paradise', fromPrice: 380, currency: '$', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80' },
    { code: 'AGR', name: 'Agra', country: 'India', tagline: 'Wonder of the world', fromPrice: 420, currency: '$', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80' },
    { code: 'DEL', name: 'Delhi', country: 'India', tagline: 'Heritage & culture', fromPrice: 690, currency: '$', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80' },
    { code: 'JAI', name: 'Jaipur', country: 'India', tagline: 'Pink city', fromPrice: 720, currency: '$', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80' },
    { code: 'COK', name: 'Kochi', country: 'India', tagline: 'Backwaters & spice', fromPrice: 620, currency: '$', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80' },
    { code: 'BLR', name: 'Bangalore', country: 'India', tagline: 'Tech & gardens', fromPrice: 580, currency: '$', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80' },
    { code: 'BOM', name: 'Mumbai', country: 'India', tagline: 'Maximum city', fromPrice: 540, currency: '$', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80' },
    { code: 'MAA', name: 'Chennai', country: 'India', tagline: 'Temple coast', fromPrice: 510, currency: '$', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80' }
  ];
}
