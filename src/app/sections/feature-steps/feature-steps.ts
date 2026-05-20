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

export interface Step {
  num: string;
  title: string;
  desc: string;
  tags: string[];
}

@Component({
  selector: 'app-feature-steps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-steps.html',
  styleUrl: './feature-steps.scss',
})
export class FeatureStepsComponent implements OnInit, OnDestroy {
  @Input() lang: 'en' | 'ar' = 'en';
  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }

  active = signal(0);

  readonly steps: Step[] = [
    {
      num: '01',
      title: 'Centralized HRIS for Scalable Workflows',
      desc: 'One unified system for all employee records, org structures, and HR policies — built to scale across your entire organization.',
      tags: ['Employee Records', 'Org Charts', 'Multi-entity'],
    },
    {
      num: '02',
      title: 'Employee Self-Service Requests',
      desc: 'Empower employees to submit, track, and manage their own HR requests — without manual follow-ups or paperwork.',
      tags: ['Leave Requests', 'Document Access', 'Approval Workflows'],
    },
    {
      num: '03',
      title: 'Attendance & Shift Management',
      desc: 'Automate attendance tracking, shift scheduling, and overtime calculation with full visibility for managers.',
      tags: ['Time Tracking', 'Shift Planning', 'Overtime Alerts'],
    },
    {
      num: '04',
      title: 'Learning & Development Tracking',
      desc: 'Build training programs, assign courses, and track skill development across every level of your workforce.',
      tags: ['LMS Integration', 'Training Plans', 'Skills Matrix'],
    },
    {
      num: '05',
      title: 'Performance & Employee Engagement',
      desc: 'Run structured review cycles, set and monitor KPIs, and keep teams aligned, motivated, and growing.',
      tags: ['Review Cycles', 'KPI Tracking', '360° Feedback'],
    },
    {
      num: '06',
      title: 'Payroll & Analytics Dashboard',
      desc: 'Process payroll with full accuracy and gain real-time visibility into workforce costs and key HR metrics.',
      tags: ['Payroll Processing', 'HR Analytics', 'Cost Reports'],
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
      this.wrapperEl = this.el.nativeElement.querySelector('.fs-scroll-zone');
      this.isDesktop = window.innerWidth >= 1024;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) this.isDesktop = window.innerWidth >= 1024;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.wrapperEl || !this.isBrowser || !this.isDesktop) return;
    const rect = this.wrapperEl.getBoundingClientRect();
    const scrollable = this.wrapperEl.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const p = Math.max(0, Math.min(1, -rect.top / scrollable));
    this.active.set(Math.min(this.steps.length - 1, Math.floor(p * this.steps.length)));
  }

  goTo(i: number): void {
    this.active.set(i);
  }

  ngOnDestroy(): void {}
}
