import {
  Component, signal, afterNextRender, inject, OnDestroy
} from '@angular/core';
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
export class SmartAttendancePage implements OnDestroy {
  lang         = signal<'en' | 'ar'>('en');
  activeScreen = signal(0);                          // 0=gps  1=fingerprint  2=history
  checkedIn    = signal(0);
  fpState      = signal<'idle' | 'scanning' | 'done'>('idle');

  private reveal        = inject(RevealService);
  private counterTimer? : ReturnType<typeof setInterval>;
  private screenTimer?  : ReturnType<typeof setInterval>;
  private fpTimer?      : ReturnType<typeof setTimeout>;

  constructor() {
    afterNextRender(() => {
      this.reveal.init();
      this.animateCounter();
      this.startScreenCycle();
    });
  }

  /* ── counter: 0 → 342 on load ── */
  private animateCounter() {
    const target = 342;
    let val = 0;
    this.counterTimer = setInterval(() => {
      val = Math.min(target, val + 5);
      this.checkedIn.set(val);
      if (val >= target) clearInterval(this.counterTimer);
    }, 16);
  }

  /* ── auto-cycle screens every 4 s ── */
  private startScreenCycle() {
    this.screenTimer = setInterval(() => {
      this.activeScreen.update(s => {
        const next = (s + 1) % 3;
        if (next === 1) this.triggerFp();
        return next;
      });
    }, 4000);
  }

  /* ── fingerprint: idle → scanning → done ── */
  private triggerFp() {
    clearTimeout(this.fpTimer);
    this.fpState.set('idle');
    this.fpTimer = setTimeout(() => {
      this.fpState.set('scanning');
      this.fpTimer = setTimeout(() => this.fpState.set('done'), 1800);
    }, 500);
  }

  /* ── manual tab select ── */
  selectScreen(i: number) {
    this.activeScreen.set(i);
    if (i === 1) this.triggerFp();
  }

  ngOnDestroy() {
    clearInterval(this.counterTimer);
    clearInterval(this.screenTimer);
    clearTimeout(this.fpTimer);
  }

  t(en: string, ar: string) { return this.lang() === 'ar' ? ar : en; }

  readonly attendees = [
    { initials: 'SA', name: 'Sara Al-Mansoori', time: '08:52 AM', status: 'on-time', color: '#4CB4B5' },
    { initials: 'KH', name: 'Khalid Hassan',    time: '08:59 AM', status: 'on-time', color: '#0FB86A' },
    { initials: 'NR', name: 'Nour Rashid',      time: '09:14 AM', status: 'late',    color: '#F14437' },
    { initials: 'AM', name: 'Ahmed Al-Mutairi', time: '09:01 AM', status: 'on-time', color: '#F79008' },
  ];
}
