import {
  Component, signal, OnInit, OnDestroy,
  PLATFORM_ID, Inject, Input,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-industries-hub',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './industries-hub.html',
  styleUrl: './industries-hub.scss',
})
export class IndustriesHubComponent implements OnInit, OnDestroy {

  @Input() lang: 'en' | 'ar' = 'en';
  mode     = signal<'before' | 'after'>('after');
  activeRow = signal<number>(0);
  private timer: any;
  private rowTimer: any;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startTimer();
      this.startRowTimer();
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    clearInterval(this.rowTimer);
  }

  setMode(m: 'before' | 'after') {
    this.mode.set(m);
    clearInterval(this.timer);
    this.startTimer();
  }

  private startTimer() {
    this.timer = setInterval(() =>
      this.mode.update(m => m === 'before' ? 'after' : 'before'), 4500);
  }

  private startRowTimer() {
    this.rowTimer = setInterval(() =>
      this.activeRow.update(i => (i + 1) % this.rows.length), 1500);
  }

  readonly rows = [
    {
      left:         'Attendance tracking',
      afterStatus:  'AUTOMATED',
      beforeStatus: 'DELAYS',
      right:        'Payroll processing',
    },
    {
      left:         'Leave & HR requests',
      afterStatus:  'STREAMLINED',
      beforeStatus: 'ERRORS',
      right:        'Manager approvals',
    },
    {
      left:         'Performance reviews',
      afterStatus:  'CENTRALIZED',
      beforeStatus: 'SCATTERED',
      right:        'HR reports & insights',
    },
  ];
}
