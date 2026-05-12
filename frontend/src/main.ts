import { bootstrapApplication } from '@angular/platform-browser';
import { register as registerSwiper } from 'swiper/element/bundle';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

registerSwiper();

bootstrapApplication(AppComponent, appConfig).catch(e => console.error(e));
