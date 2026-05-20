import { Component, signal, afterNextRender, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealService } from '../../services/reveal.service';
import { SelfServiceComponent } from '../../sections/self-service/self-service';

@Component({
  selector: 'app-smart-attendance-page',
  standalone: true,
  imports: [RouterLink, SelfServiceComponent],
  templateUrl: './smart-attendance.html',
  styleUrl: './smart-attendance.scss',
})
export class SmartAttendancePage {
  lang = signal<'en' | 'ar'>('en');
  private reveal = inject(RevealService);

  constructor() {
    afterNextRender(() => this.reveal.init());
  }

  t(en: string, ar: string) { return this.lang() === 'ar' ? ar : en; }
}
