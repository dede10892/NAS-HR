import { Component, Input, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.scss',
})
export class ReviewsComponent implements OnInit, OnDestroy {
  @Input() lang: 'en' | 'ar' = 'en';
  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }

  active = signal(0);
  private timer: any;

  reviews = [
    {
      quote: 'NAS HR completely transformed how we handle attendance across our 12 branches. What used to take our HR team hours each week now happens automatically. The fingerprint integration is flawless.',
      name: 'Layla Al-Rashidi',
      role: 'HR Director',
      company: 'Gulf Retail Group',
      industry: 'Retail',
      initials: 'LA',
      color: '#4CB4B5',
    },
    {
      quote: 'Managing leave requests for over 400 medical staff used to be a nightmare. With NAS HR, employees submit everything from their phones and managers approve instantly. It has saved us so much back-and-forth.',
      name: 'Dr. Khalid Mansour',
      role: 'Operations Manager',
      company: 'MedCare Hospital',
      industry: 'Healthcare',
      initials: 'KM',
      color: '#0FB86A',
    },
    {
      quote: 'The Mobile ESS app is a game changer for our cabin crew and ground staff. They can check shifts, request time off, and view payslips without ever stepping into the HR office. Our team loves it.',
      name: 'Sara Al-Hamdan',
      role: 'People & Culture Lead',
      company: 'Horizon Airlines',
      industry: 'Aviation',
      initials: 'SH',
      color: '#75DEFF',
    },
    {
      quote: 'We rolled out NAS HR across 3 hotels in under a month. The onboarding support was exceptional and the platform handled our complex shift scheduling and multi-department structure with no issues at all.',
      name: 'Faisal Nour',
      role: 'Group HR Manager',
      company: 'Prestige Hospitality',
      industry: 'Hospitality',
      initials: 'FN',
      color: '#F79008',
    },
    {
      quote: 'The reporting and analytics module gives us visibility we never had before. I can pull salary reports, KPI summaries, and headcount data in seconds. It has made our board presentations so much stronger.',
      name: 'Nora Al-Zaabi',
      role: 'Chief Human Resources Officer',
      company: 'National Development Authority',
      industry: 'Government',
      initials: 'NZ',
      color: '#BFAAE0',
    },
  ];

  get offset(): string {
    // 100% = track width = total cards wide. Each card = 1/total of track.
    return `translateX(calc(-${this.active()} * (100% / ${this.reviews.length})))`;
  }

  prev() {
    this.active.update(i => (i === 0 ? this.reviews.length - 1 : i - 1));
    this.resetTimer();
  }

  next() {
    this.active.update(i => (i === this.reviews.length - 1 ? 0 : i + 1));
    this.resetTimer();
  }

  goTo(i: number) {
    this.active.set(i);
    this.resetTimer();
  }

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  private startTimer() {
    this.timer = setInterval(() => {
      this.active.update(i => (i === this.reviews.length - 1 ? 0 : i + 1));
    }, 4500);
  }

  private resetTimer() {
    clearInterval(this.timer);
    this.startTimer();
  }
}
