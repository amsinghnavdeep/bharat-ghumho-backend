import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

interface Festival {
  id: string; name: string; icon: string; color: string; desc: string;
  peak_dates: string[]; best_book_window: string; avg_surge: number; corridor_count: number;
}
interface Corridor {
  from: string; from_code: string; to: string; to_code: string; flag: string;
  base_fare: number; peak_fare: number; savings_if_early: number;
  trend: { weeks_out: number; fare: number }[];
}
interface FestivalDetail extends Festival {
  corridors: Corridor[];
}

@Component({
  selector: 'app-festival-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './festival-calendar.component.html',
  styleUrls: ['./festival-calendar.component.css']
})
export class FestivalCalendarComponent implements OnInit {
  festivals = signal<Festival[]>([]);
  detail = signal<FestivalDetail | null>(null);
  selectedId = signal<string>('diwali');
  loading = signal(true);
  detailLoading = signal(false);
  expandedCorridor = signal<number | null>(null);
  avgSavings = 18500;

  constructor(
    private api: ApiService,
    public auth: AuthService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.api.get<Festival[]>('/festivals/').subscribe({
      next: (data) => {
        this.festivals.set(data);
        this.loading.set(false);
        this.selectFestival('diwali');
      },
      error: () => { this.loading.set(false); }
    });
  }

  selectFestival(id: string) {
    this.selectedId.set(id);
    this.expandedCorridor.set(null);
    this.detailLoading.set(true);
    this.api.get<FestivalDetail>(`/festivals/${id}`).subscribe({
      next: (d) => { this.detail.set(d); this.detailLoading.set(false); },
      error: () => { this.detailLoading.set(false); }
    });
  }

  toggleCorridor(i: number) {
    this.expandedCorridor.set(this.expandedCorridor() === i ? null : i);
  }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  }

  getBarHeight(trend: { weeks_out: number; fare: number }[], fare: number): number {
    const fares = trend.map(t => t.fare);
    const min = Math.min(...fares), max = Math.max(...fares);
    return 20 + ((fare - min) / (max - min + 1)) * 75;
  }

  getBarColor(trend: { weeks_out: number; fare: number }[], fare: number, accent: string): string {
    const fares = trend.map(t => t.fare);
    const min = Math.min(...fares), max = Math.max(...fares);
    const ratio = (fare - min) / (max - min + 1);
    if (ratio < 0.35) return '#138808';
    if (ratio < 0.65) return accent;
    return '#7A1F2B';
  }

  setAlert(c: Corridor, e: Event) {
    e.stopPropagation();
    if (!this.auth.isAuthenticated()) {
      this.auth.openAuth(false);
      this.toast.show('Sign in to set fare alerts 🔔');
      return;
    }
    this.toast.show(`Fare alert set for ${c.from_code} → ${c.to_code} 🔔`);
  }
}
