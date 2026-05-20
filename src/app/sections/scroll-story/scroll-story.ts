import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  HostListener,
  ElementRef,
  signal,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface StoryStep {
  tag: string;
  title: string;
  description: string;
}

interface CalDay {
  n: string;
  type: string;
}

@Component({
  selector: 'app-scroll-story',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-story.html',
  styleUrl: './scroll-story.scss',
})
export class ScrollStoryComponent implements OnInit, OnDestroy {
  @Input() lang: 'en' | 'ar' = 'en';
  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }

  activeStep = signal(0);

  readonly days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  // May 2026 starts on Friday (index 4 in Mo-Su grid)
  readonly calDays: CalDay[] = [
    { n: '', type: 'empty' }, { n: '', type: 'empty' },
    { n: '', type: 'empty' }, { n: '', type: 'empty' },
    { n: '1', type: 'present' },
    { n: '2', type: 'weekend' }, { n: '3', type: 'weekend' },
    { n: '4', type: 'present' }, { n: '5', type: 'present' },
    { n: '6', type: 'present' }, { n: '7', type: 'present' },
    { n: '8', type: 'present' },
    { n: '9', type: 'weekend' }, { n: '10', type: 'weekend' },
    { n: '11', type: 'present' }, { n: '12', type: 'present' },
    { n: '13', type: 'present' }, { n: '14', type: 'absent' },
    { n: '15', type: 'present' },
    { n: '16', type: 'weekend' }, { n: '17', type: 'weekend' },
    { n: '18', type: 'present' }, { n: '19', type: 'present' },
    { n: '20', type: 'present' }, { n: '21', type: 'late' },
    { n: '22', type: 'present' },
    { n: '23', type: 'weekend' }, { n: '24', type: 'weekend' },
    { n: '25', type: 'present' }, { n: '26', type: 'present' },
    { n: '27', type: 'present' }, { n: '28', type: 'present' },
    { n: '29', type: 'present' },
    { n: '30', type: 'weekend' }, { n: '31', type: 'weekend' },
    { n: '', type: 'empty' },
  ];

  readonly steps: StoryStep[] = [
    {
      tag: '01',
      title: 'Employee Records & Digital Profiles',
      description:
        'Centralize employee data, documents, job information, reporting lines, and HR history in one secure workspace.',
    },
    {
      tag: '02',
      title: 'Attendance, Shifts & Requests',
      description:
        'Manage attendance, shift schedules, leave requests, approvals, and employee self-service workflows from one connected platform.',
    },
    {
      tag: '03',
      title: 'Learning & Career Growth',
      description:
        'Connect LMS, training plans, skills development, and career paths to help employees grow with clear visibility.',
    },
    {
      tag: '04',
      title: 'Performance & Payroll Readiness',
      description:
        'Build a strong foundation for performance tracking, KPIs, appraisals, and payroll automation based on real employee data.',
    },
  ];

  private wrapperEl: HTMLElement | null = null;
  private isBrowser: boolean;
  private isDesktop = false;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.wrapperEl = this.el.nativeElement.querySelector('.ss-wrapper');
      this.isDesktop = window.innerWidth > 1024;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      this.isDesktop = window.innerWidth > 1024;
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.wrapperEl || !this.isBrowser || !this.isDesktop) return;
    const rect = this.wrapperEl.getBoundingClientRect();
    const totalScrollable = this.wrapperEl.offsetHeight - window.innerHeight;
    if (totalScrollable <= 0) return;
    const scrolled = -rect.top;
    const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
    const step = Math.min(this.steps.length - 1, Math.floor(p * this.steps.length));
    this.activeStep.set(step);
  }

  /** Dot nav — primary interaction on mobile, supplemental on desktop */
  goTo(i: number): void {
    this.activeStep.set(i);
  }

  ngOnDestroy(): void {}
}
