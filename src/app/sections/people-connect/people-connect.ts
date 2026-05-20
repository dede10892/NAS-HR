import { Component, Input, signal, ElementRef, inject, afterNextRender, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';

export interface ConnectRow {
  left:   string;
  before: string;
  after:  string;
  right:  string;
}

@Component({
  selector: 'app-people-connect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './people-connect.html',
  styleUrl: './people-connect.scss',
})
export class PeopleConnectComponent {
  @Input() lang: 'en' | 'ar' = 'en';
  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }

  connected = signal(false);

  private el         = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  readonly rows: ConnectRow[] = [
    { left: 'Manual employee records',  before: 'Delays',               after: 'Automated', right: 'Leave requests'      },
    { left: 'Attendance corrections',   before: 'Manual follow-up',     after: 'On time',   right: 'Attendance punching' },
    { left: 'Leave approvals',          before: 'Missing data',         after: 'Accurate',  right: 'Missions & permissions' },
    { left: 'Document requests',        before: 'Approval bottlenecks', after: 'Compliant', right: 'Learning progress'   },
    { left: 'Shift scheduling',         before: 'Payroll errors',       after: 'Connected', right: 'Performance feedback' },
  ];

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => this.connected.set(true), 180);
            io.disconnect();
          }
        },
        { threshold: 0.28 }
      );
      io.observe(this.el.nativeElement);
    });
  }
}
