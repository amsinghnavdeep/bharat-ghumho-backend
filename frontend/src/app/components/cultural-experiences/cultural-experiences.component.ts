import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Experience {
  title: string;
  location: string;
  desc: string;
  icon: string;
  category: string;
  catClass: string;
  gradient: string;
}

@Component({
  selector: 'app-cultural-experiences',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="section-divider" aria-hidden="true"><span class="sd-mark"></span></div>
<section class="cultural-exp" id="experiences">
  <div class="ce-pattern pat-rangoli"></div>
  <div class="w">
    <div class="sec-head sr">
      <div class="sec-tag sf">Cultural Experiences</div>
      <h2 class="sec-title">Live India,<br>don't just visit.</h2>
      <p class="sec-sub">Immerse in yoga retreats, Ayurvedic healing, classical dance, and culinary journeys that connect you to India's soul.</p>
    </div>

    <div class="ce-tabs">
      <button *ngFor="let c of categories"
              class="ce-tab"
              [class.active]="activeTab === c.key"
              (click)="activeTab = c.key">
        <span>{{c.icon}}</span>{{c.label}}
      </button>
    </div>

    <div class="ce-grid">
      <div *ngFor="let e of filteredExperiences(); let i = index"
           class="ce-card sr"
           [style.transition-delay]="(i * 0.08) + 's'">
        <div class="cec-visual" [style.background]="e.gradient">
          <span class="cec-icon">{{e.icon}}</span>
          <div class="cec-cat" [ngClass]="e.catClass">{{e.category}}</div>
        </div>
        <div class="cec-body">
          <h3>{{e.title}}</h3>
          <span class="cec-loc">{{e.location}}</span>
          <p>{{e.desc}}</p>
        </div>
      </div>
    </div>

    <div class="ce-quote sr">
      <blockquote>
        <span class="ceq-mark">"</span>
        India is the cradle of the human race, the birthplace of human speech, the mother of history, the grandmother of legend, and the great-grandmother of tradition.
        <footer>— Mark Twain</footer>
      </blockquote>
    </div>
  </div>
</section>`
})
export class CulturalExperiencesComponent {
  activeTab = 'all';

  categories = [
    { key: 'all', label: 'All', icon: '✦' },
    { key: 'wellness', label: 'Wellness', icon: '🧘' },
    { key: 'dance', label: 'Dance & Music', icon: '💃' },
    { key: 'cuisine', label: 'Cuisine', icon: '🍛' },
    { key: 'festivals', label: 'Festivals', icon: '🎆' },
    { key: 'spiritual', label: 'Spiritual', icon: '🙏' }
  ];

  experiences: Experience[] = [
    { title: 'Rishikesh Yoga Retreat', location: 'Uttarakhand', desc: 'Practice yoga at the world capital of yoga — ashrams along the Ganges, sunrise meditation, and ancient Vedantic teachings.', icon: '🧘', category: 'wellness', catClass: 'gr', gradient: 'linear-gradient(135deg,#0A2E1A,#138808)' },
    { title: 'Kerala Ayurveda Spa', location: 'Kovalam, Kerala', desc: 'Panchakarma detox and traditional oil therapies perfected over 3,000 years of Ayurvedic science.', icon: '🌿', category: 'wellness', catClass: 'gr', gradient: 'linear-gradient(135deg,#0D7377,#138808)' },
    { title: 'Bharatanatyam Performance', location: 'Chennai, Tamil Nadu', desc: 'Witness 2000-year-old classical temple dance — expressive abhinaya and rhythmic footwork in sacred settings.', icon: '💃', category: 'dance', catClass: 'sf', gradient: 'linear-gradient(135deg,#7A1F2B,#C9911A)' },
    { title: 'Kathak Dance Workshop', location: 'Lucknow, UP', desc: 'Learn the Mughal-court dance form — spinning chakkars, rhythmic tatkar, and expressive storytelling through movement.', icon: '🩰', category: 'dance', catClass: 'sf', gradient: 'linear-gradient(135deg,#5C2E0E,#C9911A)' },
    { title: 'Lucknow Nawabi Cuisine', location: 'Lucknow, UP', desc: 'Dum biryani, galouti kebab, and tunday kulfi — taste the royal legacy of Awadhi dum-pukht cooking.', icon: '🍛', category: 'cuisine', catClass: 'gd', gradient: 'linear-gradient(135deg,#3A1A10,#C9911A)' },
    { title: 'Rajasthani Thali Trail', location: 'Jaipur, Rajasthan', desc: 'From dal-baati-churma to ker-sangri — explore the desert cuisine that\'s as colourful as the state itself.', icon: '🥘', category: 'cuisine', catClass: 'gd', gradient: 'linear-gradient(135deg,#FF6B00,#F5A623)' },
    { title: 'Pushkar Camel Fair', location: 'Pushkar, Rajasthan', desc: 'One of the world\'s largest camel fairs — a carnival of folk music, dance, hot-air balloons, and desert culture.', icon: '🐪', category: 'festivals', catClass: 'sf', gradient: 'linear-gradient(135deg,#C9911A,#FF6B00)' },
    { title: 'Varanasi Ganga Aarti', location: 'Varanasi, UP', desc: 'Witness the mesmerizing evening fire ceremony on the banks of the Ganges — thousands of oil lamps, chanting, and devotion.', icon: '🪔', category: 'spiritual', catClass: 'gd', gradient: 'linear-gradient(135deg,#1A0A0F,#5C2E0E,#C9911A)' },
    { title: 'Amritsar Golden Temple', location: 'Amritsar, Punjab', desc: 'The holiest Sikh shrine — 24-hour langar feeding 100,000 daily, reflected in the shimmering sarovar.', icon: '🕍', category: 'spiritual', catClass: 'gd', gradient: 'linear-gradient(135deg,#C9911A,#F5A623,#FFD700)' }
  ];

  filteredExperiences(): Experience[] {
    if (this.activeTab === 'all') return this.experiences;
    return this.experiences.filter(e => e.category === this.activeTab);
  }
}
