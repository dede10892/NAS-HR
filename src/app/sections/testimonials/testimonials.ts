import {
  Component, Input, signal, computed,
  OnInit, OnDestroy, Inject, PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  @Input() lang: 'en' | 'ar' = 'en';
  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }

  // Infinite-loop track:
  //   displayItems = [clone-of-last, ...items, clone-of-first]
  //   trackIndex 1..items.length = real items
  //   trackIndex 0              = clone-of-last  → silently jump to items.length
  //   trackIndex items.length+1 = clone-of-first → silently jump to 1
  trackIndex  = signal(1);
  animated    = signal(true);   // false briefly during the no-transition position reset
  progressKey = signal(0);

  private animating = false;
  private timer?: ReturnType<typeof setInterval>;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Logical index 0 … items.length-1 — used for dots, counter, and active styling
  readonly active = computed(
    () => (this.trackIndex() - 1 + this.items.length) % this.items.length,
  );

  // Clone first and last to allow seamless wrap-around
  get displayItems() {
    return [this.items[this.items.length - 1], ...this.items, this.items[0]];
  }

  // Inline transform string — drives the track position
  get trackTranslate(): string {
    const pct = -(this.trackIndex() / this.displayItems.length) * 100;
    return `translateX(${pct}%)`;
  }

  ngOnInit(): void {
    if (this.isBrowser) this.startCycle();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  private startCycle(): void {
    this.timer = setInterval(() => this._slide(this.trackIndex() + 1), 5200);
  }

  private _slide(trackIdx: number): void {
    if (this.animating) return;
    clearInterval(this.timer);
    this.animating = true;
    this.animated.set(true);
    this.progressKey.update(k => k + 1);
    this.trackIndex.set(trackIdx);

    // After CSS transition completes, silently reset clones to real positions
    setTimeout(() => {
      const cloneFirst = this.displayItems.length - 1;
      if (this.trackIndex() === 0) {
        // Was showing clone-of-last; jump to real last
        this.animated.set(false);
        this.trackIndex.set(this.items.length);
        setTimeout(() => { this.animated.set(true); this.animating = false; if (this.isBrowser) this.startCycle(); }, 30);
      } else if (this.trackIndex() === cloneFirst) {
        // Was showing clone-of-first; jump to real first
        this.animated.set(false);
        this.trackIndex.set(1);
        setTimeout(() => { this.animated.set(true); this.animating = false; if (this.isBrowser) this.startCycle(); }, 30);
      } else {
        this.animating = false;
        if (this.isBrowser) this.startCycle();
      }
    }, 480);
  }

  goTo(i: number): void { this._slide(i + 1); }
  next(): void           { this._slide(this.trackIndex() + 1); }
  prev(): void           { this._slide(this.trackIndex() - 1); }
  pauseCycle():  void    { clearInterval(this.timer); }
  resumeCycle(): void    { if (this.isBrowser) this.startCycle(); }

  readonly stars = [1, 2, 3, 4, 5];

  readonly items = [
    {
      quote_en: 'NAS HR cut our monthly payroll processing time from 3 days to 3 hours. The WPS integration alone was worth every riyal.',
      quote_ar: 'قلّص NAS HR وقت معالجة الرواتب الشهرية من 3 أيام إلى 3 ساعات. تكامل WPS وحده كان يستحق كل ريال.',
      name: 'Sarah Al-Mansouri',
      title_en: 'HR Director',            title_ar: 'مدير الموارد البشرية',
      company: 'Gulf Retail Group',
      industry_en: 'Retail & FMCG',      industry_ar: 'التجزئة',
      initials: 'SA',
    },
    {
      quote_en: 'Finally an HRMS that handles end-of-service workflows and approvals out of the box. Our HR team stopped chasing manual follow-ups entirely.',
      quote_ar: 'أخيراً نظام HRMS يدير سير عمل نهاية الخدمة والموافقات. توقف فريق الموارد البشرية عن المتابعة اليدوية تماماً.',
      name: 'Ahmed Al-Rashidi',
      title_en: 'Operations Manager',     title_ar: 'مدير العمليات',
      company: 'Al Noor Healthcare',
      industry_en: 'Healthcare',          industry_ar: 'الرعاية الصحية',
      initials: 'AA',
    },
    {
      quote_en: 'The mobile ESS app transformed how our 800 employees interact with HR. Leave approvals that used to take a week now happen in minutes.',
      quote_ar: 'غيّر تطبيق ESS طريقة تفاعل موظفينا الـ 800 مع الموارد البشرية. موافقات الإجازة التي كانت تستغرق أسبوعاً تتم الآن في دقائق.',
      name: 'Fatima Al-Zahrawi',
      title_en: 'CEO',                    title_ar: 'الرئيس التنفيذي',
      company: 'Horizon Hospitality',
      industry_en: 'Hospitality',         industry_ar: 'الضيافة',
      initials: 'FA',
    },
    {
      quote_en: 'Managing crew scheduling across 12 hubs used to be a nightmare. NAS HR automated our rostering and compliance checks — a true game changer.',
      quote_ar: 'إدارة جداول الطاقم عبر 12 مركزاً كانت كابوساً حقيقياً. أتمت NAS HR عمليات الجدولة وفحوصات الامتثال تلقائياً — تحوّل حقيقي في طريقة عملنا.',
      name: 'Khalid Al-Hamdan',
      title_en: 'HR Manager',             title_ar: 'مدير الموارد البشرية',
      company: 'Emirates Aviation Services',
      industry_en: 'Aviation',            industry_ar: 'الطيران',
      initials: 'KH',
    },
    {
      quote_en: 'The configurable grade-based payroll structure saved us months of setup. Full compliance with local labour law right out of the box.',
      quote_ar: 'وفّر هيكل الرواتب القائم على الدرجات أشهراً من الإعداد. امتثال كامل لقانون العمل المحلي من البداية.',
      name: 'Layla Nasser',
      title_en: 'People & Culture Lead',  title_ar: 'مسؤول الموارد البشرية والثقافة المؤسسية',
      company: 'Government Transport Authority',
      industry_en: 'Government',          industry_ar: 'حكومي',
      initials: 'LN',
    },
  ];
}
