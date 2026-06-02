import {
  Component, signal, AfterViewInit, OnDestroy,
  ElementRef, NgZone, Inject, PLATFORM_ID,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-why-nas',
  imports: [RouterLink, CommonModule],
  templateUrl: './why-nas.html',
  styleUrl: './why-nas.scss',
})
export class WhyNasPage implements AfterViewInit, OnDestroy {

  activePillar = signal(0);
  hoveredStat  = signal<number | null>(null);

  private anime: any = null;
  private observers: IntersectionObserver[] = [];
  private countersAnimated = false;
  private compareAnimated  = false;
  private heroStatsAnimated = false;

  constructor(
    private el: ElementRef,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const mod = await import('animejs' as any).catch(() => null);
    if (mod) this.anime = (mod as any).default ?? mod;

    this.zone.runOutsideAngular(() => {
      this.animateHeroIn();
      this.setupScrollObs();
      setTimeout(() => this.animatePanelIn(), 750);
    });
  }

  ngOnDestroy(): void {
    this.observers.forEach(o => o.disconnect());
  }

  /* ── Tab switching ── */
  switchPillar(i: number): void {
    if (i === this.activePillar()) return;
    this.activePillar.set(i);
    if (this.anime) {
      setTimeout(() => this.zone.runOutsideAngular(() => this.animatePanelIn()), 10);
    }
  }

  /* ── Anime.js: hero entrance ── */
  private animateHeroIn(): void {
    if (!this.anime) return;
    const a = this.anime;
    const h = this.el.nativeElement;

    a.timeline({ easing: 'easeOutExpo' })
      .add({ targets: h.querySelector('.wn-eyebrow'),
             opacity: [0,1], translateY: [18,0], duration: 560 })
      .add({ targets: h.querySelector('.why-headline'),
             opacity: [0,1], translateY: [24,0], duration: 640 }, '-=300')
      .add({ targets: h.querySelector('.why-sub'),
             opacity: [0,1], translateY: [14,0], duration: 560 }, '-=360')
      .add({ targets: h.querySelectorAll('.why-actions > *'),
             opacity: [0,1], translateY: [10,0], duration: 480,
             delay: a.stagger(80) }, '-=280')
      .add({ targets: h.querySelectorAll('.wn-stat'),
             opacity: [0,1], scale: [0.88,1], duration: 420,
             delay: a.stagger(55) }, '-=180')
      .add({ targets: h.querySelector('.whv-card'),
             opacity: [0,1], translateX: [40,0], duration: 720 }, 220)
      .add({ targets: h.querySelectorAll('.whv-chip'),
             opacity: [0,1], translateY: [8,0], scale: [0.9,1], duration: 340,
             delay: a.stagger(28) }, '-=520');
  }

  /* ── Anime.js: panel content transition ── */
  private animatePanelIn(): void {
    if (!this.anime) return;
    const a = this.anime;
    const h = this.el.nativeElement;

    a.timeline({ easing: 'easeOutExpo' })
      .add({ targets: h.querySelector('.wn-panel-badge'),
             opacity: [0,1], translateY: [8,0], duration: 300 })
      .add({ targets: h.querySelector('.wn-panel-title'),
             opacity: [0,1], translateY: [16,0], duration: 380 }, '-=120')
      .add({ targets: h.querySelector('.wn-panel-desc'),
             opacity: [0,1], translateY: [10,0], duration: 350 }, '-=220')
      .add({ targets: h.querySelectorAll('.wn-panel-points li'),
             opacity: [0,1], translateX: [-8,0], duration: 300,
             delay: a.stagger(30) }, '-=180')
      .add({ targets: h.querySelector('.wn-panel-visual > *'),
             opacity: [0,1], translateY: [16,0], scale: [0.96,1], duration: 460 }, '-=120');
  }

  /* ── Scroll observers ── */
  private setupScrollObs(): void {
    const h = this.el.nativeElement;

    const watchOnce = (selector: string, fn: () => void, threshold = 0.25) => {
      const el = h.querySelector(selector);
      if (!el) return;
      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) { obs.disconnect(); this.zone.runOutsideAngular(fn); }
      }, { threshold });
      obs.observe(el);
      this.observers.push(obs);
    };

    watchOnce('.wn-impact-section', () => {
      if (this.countersAnimated) return;
      this.countersAnimated = true;
      this.animateImpactSection();
    });

    watchOnce('.wn-compare-table', () => {
      if (this.compareAnimated) return;
      this.compareAnimated = true;
      this.animateCompareRows();
    }, 0.1);

    watchOnce('.wn-stats-strip', () => {
      if (this.heroStatsAnimated) return;
      this.heroStatsAnimated = true;
      this.countHeroStats();
    }, 0.5);
  }

  /* ── CountUp: impact numbers ── */
  private animateImpactSection(): void {
    if (!this.anime) return;
    const a = this.anime;
    const h = this.el.nativeElement;

    a({
      targets: h.querySelectorAll('.wn-impact-card'),
      opacity: [0,1], translateY: [28,0], scale: [0.92,1],
      duration: 560, delay: a.stagger(90), easing: 'easeOutExpo',
    });

    const configs: { end: number; suffix: string; decimals?: number }[] = [
      { end: 70,  suffix: '%' },
      { end: 3,   suffix: '×' },
      { end: 100, suffix: '%' },
      { end: 1,   suffix: ''  },
    ];

    import('countup.js').then(({ CountUp }) => {
      h.querySelectorAll('.wn-impact-num').forEach((el: Element, i: number) => {
        const cfg = configs[i];
        if (!cfg) return;
        const cu = new CountUp(el as HTMLElement, cfg.end, {
          startVal: 0,
          duration: 2,
          suffix: cfg.suffix,
          useEasing: true,
          useGrouping: false,
        });
        setTimeout(() => cu.start(), i * 120 + 200);
      });
    });
  }

  /* ── CountUp: hero stats ── */
  private countHeroStats(): void {
    const h = this.el.nativeElement;
    import('countup.js').then(({ CountUp }) => {
      const configs: { el: string; end: number; prefix?: string; suffix?: string }[] = [
        { el: '.wn-stat:nth-child(1) .wn-stat-val', end: 3000, suffix: '+' },
        { el: '.wn-stat:nth-child(3) .wn-stat-val', end: 5,    suffix: ''  },
      ];
      configs.forEach(cfg => {
        const el = h.querySelector(cfg.el);
        if (!el) return;
        const cu = new CountUp(el, cfg.end, {
          startVal: 0, duration: 1.8, suffix: cfg.suffix,
          separator: ',', useEasing: true,
        });
        cu.start();
      });
    });
  }

  /* ── Anime.js: compare rows ── */
  private animateCompareRows(): void {
    if (!this.anime) return;
    const a = this.anime;
    const h = this.el.nativeElement;
    a({
      targets: h.querySelectorAll('.wn-compare-row'),
      opacity: [0,1], translateX: [-18,0],
      duration: 420, delay: a.stagger(42), easing: 'easeOutExpo',
    });
  }

  /* ══ DATA ════════════════════════════════════════════ */

  pillars = [
    {
      label: 'Easy',
      tagline: 'Built for every user, not just HR teams',
      headline: 'Simple for everyone who uses it.',
      desc: 'NAS HR is designed to simplify daily HR work for employees, managers, and HR teams. Employees submit requests in seconds. Managers approve with one tap. HR teams see everything connected.',
      points: [
        'Less manual work',
        'Clearer processes',
        'Faster HR response',
        'Mobile-first for employees',
        'No complex training needed',
        'One app for everything',
      ],
    },
    {
      label: 'Smart',
      tagline: 'AI-powered workflows that reduce friction',
      headline: 'Smarter workflows. Faster decisions.',
      desc: 'NAS HR helps teams move from manual HR follow-up to intelligent, connected workflows. From AI assistance to automated approvals, everything is designed to reduce friction and increase speed.',
      points: [
        'Ask NAS AI for instant HR answers',
        'Smart request flows',
        'Connected approval workflows',
        'Real-time manager visibility',
        'Automated employee notifications',
        'Salary-ready reporting',
      ],
    },
    {
      label: 'Complete',
      tagline: 'Every HR function in one connected system',
      headline: 'One place for every HR operation.',
      desc: 'NAS HR connects the most important HR functions into one platform. No switching between tools. No data silos. Everything from employee records to salary-ready reports lives in one connected system.',
      points: [
        'Employee records & attendance',
        'Leave requests & approvals',
        'Reports & salary-ready data',
        'Internal jobs & LMS',
        'Mobile ESS app',
        'Ask NAS AI assistant',
      ],
    },
  ];

  stats = [
    { value: '3,000+', label: 'Employees managed' },
    { value: '5',      label: 'Industries served'  },
    { value: '100%',   label: 'Cloud-based'         },
    { value: '1',      label: 'Unified platform'    },
  ];

  compareRows = [
    { feature: 'Employee self-service (mobile app)', nas: true,  trad: false },
    { feature: 'Smart approval workflows',           nas: true,  trad: false },
    { feature: 'Real-time manager dashboard',        nas: true,  trad: false },
    { feature: 'AI HR assistant (Ask NAS AI)',       nas: true,  trad: false },
    { feature: 'Fingerprint / GPS attendance',       nas: true,  trad: true  },
    { feature: 'Salary-ready automated reports',     nas: true,  trad: false },
    { feature: 'Internal job board',                 nas: true,  trad: false },
    { feature: 'Learning management (LMS)',          nas: true,  trad: false },
  ];

  sections = [
    {
      eyebrow: 'Built to Make HR Easier',
      headline: 'Less manual work. Clearer processes. Faster HR response.',
      desc: 'NAS HR is designed to simplify daily HR work for everyone — employees, managers, and HR teams. Every workflow is built to reduce follow-up and make HR actions faster and more transparent.',
    },
    {
      eyebrow: 'Smarter Workflows. Faster Decisions.',
      headline: 'From manual follow-up to intelligent, connected workflows.',
      desc: 'NAS HR helps teams act faster with Ask NAS AI, smart request flows, connected approval chains, real-time manager visibility, and salary-ready reporting — all working together.',
    },
    {
      eyebrow: 'One Place for Every HR Operation',
      headline: 'Every essential HR capability, connected.',
      desc: 'Employee records, attendance, leave, services, manager dashboard, reports, salary data, internal jobs, LMS, and Ask NAS AI — all in one platform that shares data across every workflow.',
    },
  ];

  impactMetrics = [
    { num: '70%',  label: 'Less time on HR admin'      },
    { num: '3×',   label: 'Faster approval cycles'     },
    { num: '100%', label: 'Paperless HR operations'    },
    { num: '1',    label: 'Platform for everything HR' },
  ];

  modules = [
    { name: 'Smart Attendance'  },
    { name: 'Leave & Requests'  },
    { name: 'Payroll Reports'   },
    { name: 'Manager Dashboard' },
    { name: 'Ask NAS AI',        sky: true },
    { name: 'Internal Jobs'     },
    { name: 'Learning (LMS)'    },
    { name: 'HR Services'       },
  ];
}
