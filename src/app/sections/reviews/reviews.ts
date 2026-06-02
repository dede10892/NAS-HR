import {
  Component, Input, signal, OnInit, OnDestroy,
  PLATFORM_ID, Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

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

  /* active goes 0 → 1 → … → 5 → (silent snap to 0) → 1 → … */
  active       = signal(0);
  noTransition = signal(false);

  private timer:     any;
  private snapTimer: any;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  reviews = [
    {
      quote: 'NAS HR completely transformed how we handle attendance across our 12 branches. What used to take our HR team hours each week now happens automatically. The fingerprint integration is flawless.',
      name: 'Layla Al-Rashidi', role: 'HR Director',
      company: 'Gulf Retail Group', industry: 'Retail',
      initials: 'LA', color: '#4CB4B5',
    },
    {
      quote: 'Managing leave requests for over 400 medical staff used to be a nightmare. With NAS HR, employees submit everything from their phones and managers approve instantly. It has saved us so much back-and-forth.',
      name: 'Dr. Khalid Mansour', role: 'Operations Manager',
      company: 'MedCare Hospital', industry: 'Healthcare',
      initials: 'KM', color: '#0FB86A',
    },
    {
      quote: 'The Mobile ESS app is a game changer for our cabin crew and ground staff. They can check shifts, request time off, and view payslips without ever stepping into the HR office. Our team loves it.',
      name: 'Sara Al-Hamdan', role: 'People & Culture Lead',
      company: 'Horizon Airlines', industry: 'Aviation',
      initials: 'SH', color: '#75DEFF',
    },
    {
      quote: 'We rolled out NAS HR across 3 hotels in under a month. The onboarding support was exceptional and the platform handled our complex shift scheduling and multi-department structure with no issues at all.',
      name: 'Faisal Nour', role: 'Group HR Manager',
      company: 'Prestige Hospitality', industry: 'Hospitality',
      initials: 'FN', color: '#F79008',
    },
    {
      quote: 'The reporting and analytics module gives us visibility we never had before. I can pull salary reports, KPI summaries, and headcount data in seconds. It has made our board presentations so much stronger.',
      name: 'Nora Al-Zaabi', role: 'Chief Human Resources Officer',
      company: 'National Development Authority', industry: 'Government',
      initials: 'NZ', color: '#BFAAE0',
    },
  ];

  /* Renders the 5 cards + 5 duplicate cards = 10 total */
  get doubledReviews() { return [...this.reviews, ...this.reviews]; }

  /* Dot indicator uses modulo so it always maps to 0–4 */
  get displayActive() { return this.active() % this.reviews.length; }

  /* translateX using 10-card track */
  get offset(): string {
    return `translateX(calc(-${this.active()} * (100% / ${this.reviews.length * 2})))`;
  }

  /* ── Navigation ── */
  prev() {
    if (this.active() === 0) {
      // Jump (no animation) to duplicate position, then step back
      this.noTransition.set(true);
      this.active.set(this.reviews.length);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        this.noTransition.set(false);
        this.active.update(i => i - 1);
      }));
    } else {
      this.active.update(i => i - 1);
    }
    this.resetTimer();
  }

  next() {
    this.active.update(i => i + 1);
    this.scheduleSnap();
    this.resetTimer();
  }

  goTo(i: number) {
    this.active.set(i);
    this.resetTimer();
  }

  /* After CSS transition (560ms), silently snap to position 0 if at duplicate boundary */
  private scheduleSnap() {
    clearTimeout(this.snapTimer);
    this.snapTimer = setTimeout(() => {
      if (this.active() >= this.reviews.length) {
        this.noTransition.set(true);
        this.active.set(0);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          this.noTransition.set(false);
        }));
      }
    }, 560);
  }

  /* ── Timer ── */
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) this.startTimer();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    clearTimeout(this.snapTimer);
  }

  private startTimer() {
    this.timer = setInterval(() => {
      this.active.update(i => i + 1);
      this.scheduleSnap();
    }, 4500);
  }

  private resetTimer() {
    clearInterval(this.timer);
    this.startTimer();
  }
}
