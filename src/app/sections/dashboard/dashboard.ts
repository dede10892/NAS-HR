import {
  Component, Input, signal,
  OnInit, OnDestroy, Inject, PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  @Input() lang: 'en' | 'ar' = 'en';
  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }

  active = signal(0);
  ready  = signal(true);
  dir    = signal<'next' | 'prev'>('next');

  private timer?: ReturnType<typeof setInterval>;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit():    void { if (this.isBrowser) this.startCycle(); }
  ngOnDestroy(): void { clearInterval(this.timer); }

  private startCycle(): void {
    this.timer = setInterval(
      () => this.goTo((this.active() + 1) % this.slides.length, 'next'),
      4800,
    );
  }

  goTo(i: number, direction: 'next' | 'prev' = 'next'): void {
    if (i === this.active() || !this.ready()) return;
    clearInterval(this.timer);
    this.dir.set(direction);
    this.ready.set(false);
    setTimeout(() => { this.active.set(i); this.ready.set(true); }, 300);
    if (this.isBrowser) this.startCycle();
  }

  next(): void { this.goTo((this.active() + 1) % this.slides.length, 'next'); }
  prev(): void { this.goTo((this.active() - 1 + this.slides.length) % this.slides.length, 'prev'); }

  pauseCycle():  void { clearInterval(this.timer); }
  resumeCycle(): void { if (this.isBrowser) this.startCycle(); }

  slides = [
    {
      src:      'screenshots/screen-1.png',
      label_en: 'Employee Profiles',
      label_ar: 'ملفات الموظفين',
      url:      'nashr.app/employees/profile',
    },
    {
      src:      'screenshots/screen-2.png',
      label_en: 'All Employees',
      label_ar: 'جميع الموظفين',
      url:      'nashr.app/employees',
    },
    {
      src:      'screenshots/screen-3.png',
      label_en: 'Live Dashboard',
      label_ar: 'لوحة التحكم',
      url:      'nashr.app/dashboard',
    },
  ];
}
