import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationCardComponent, DestinationCardData } from '../destination-card/destination-card.component';

@Component({
  selector: 'app-destinations-carousel',
  standalone: true,
  imports: [CommonModule, DestinationCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
<swiper-container class="dest-swiper"
  slides-per-view="1.1"
  space-between="18"
  centered-slides="false"
  breakpoints='{"560":{"slidesPerView":2,"spaceBetween":18},"900":{"slidesPerView":3,"spaceBetween":20},"1200":{"slidesPerView":4,"spaceBetween":22}}'
  navigation="true"
  pagination="true"
  pagination-clickable="true"
  autoplay-delay="4500"
  autoplay-disable-on-interaction="false"
  loop="true"
  grab-cursor="true">
  <swiper-slide *ngFor="let d of destinations">
    <app-destination-card [d]="d" [showWeather]="showWeather"/>
  </swiper-slide>
</swiper-container>`
})
export class DestinationsCarouselComponent {
  @Input() destinations: DestinationCardData[] = [];
  @Input() showWeather = true;
}
