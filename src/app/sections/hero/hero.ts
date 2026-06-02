import {
  Component, ElementRef, AfterViewInit, OnDestroy,
  NgZone, input, signal, computed
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountUpDirective } from '../../directives/count-up.directive';

interface Metric  { val: string; lbl: string; variant?: 'sky' | 'green'; }
interface Bar     { day: string; pct: number; today?: boolean; }
interface FeedRow { initials: string; name: string; action: string; time: string; color: string; }

interface ModuleView {
  metrics:    Metric[];
  chartLabel: string;
  bars:       Bar[];
  feed:       FeedRow[];
}

interface HeroModule { name: string; sky?: boolean; view: ModuleView; }

@Component({
  selector: 'app-hero',
  imports: [RouterLink, CountUpDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  readonly lang = input<string>('en');

  private boundMouseMove?: (e: MouseEvent) => void;

  activeModule = signal(0);
  fading       = signal(false);

  /* Deterministic particles — no Math.random() for SSR safety */
  readonly particles = Array.from({ length: 48 }, (_, i) => ({
    left:     ((i * 37 + 11) % 97),
    top:      ((i * 53 + 7)  % 95),
    size:     (i % 3) + 1,
    dur:      5 + (i % 6) * 1.5,
    delay:    -((i * 1.3)  % 8),
    opacity:  0.18 + (i % 4) * 0.08,
  }));

  readonly currentView = computed(() => this.modules[this.activeModule()].view);

  modules: HeroModule[] = [
    {
      name: 'Employees',
      view: {
        metrics: [
          { val: '248', lbl: 'Active Staff' },
          { val: '12',  lbl: 'On Leave',   variant: 'sky' },
          { val: '97%', lbl: 'Attendance', variant: 'green' },
        ],
        chartLabel: 'Weekly Attendance',
        bars: [
          { day: 'M', pct: 92 }, { day: 'T', pct: 88 },
          { day: 'W', pct: 95 }, { day: 'T', pct: 91 },
          { day: 'F', pct: 97, today: true },
        ],
        feed: [
          { initials: 'SA', name: 'Sara Al-Mansoori', action: 'Leave approved',    time: '2m',  color: '#4CB4B5' },
          { initials: 'MK', name: 'Mohammed Khalid',  action: 'Clocked in',         time: '8m',  color: '#75DEFF' },
          { initials: 'FH', name: 'Fatima Hassan',    action: 'Request submitted',  time: '15m', color: '#8B6EF0' },
        ],
      },
    },
    {
      name: 'Attendance',
      view: {
        metrics: [
          { val: '241', lbl: 'Present',    variant: 'green' },
          { val: '7',   lbl: 'Late',       variant: 'sky' },
          { val: '0',   lbl: 'Absent' },
        ],
        chartLabel: 'Check-in Rate This Week',
        bars: [
          { day: 'M', pct: 95 }, { day: 'T', pct: 89 },
          { day: 'W', pct: 93 }, { day: 'T', pct: 96 },
          { day: 'F', pct: 98, today: true },
        ],
        feed: [
          { initials: 'AK', name: 'Ahmed Al-Kaabi', action: 'Clocked in · 8:02 AM',    time: '1m',  color: '#4ade80' },
          { initials: 'LM', name: 'Layla Mansouri', action: 'Late check-in · 9:15 AM', time: '5m',  color: '#FEBC2E' },
          { initials: 'KJ', name: 'Khalid Jassim',  action: 'Clocked out · 5:00 PM',   time: '12m', color: '#4CB4B5' },
        ],
      },
    },
    {
      name: 'Leave',
      view: {
        metrics: [
          { val: '3', lbl: 'Pending',  variant: 'sky' },
          { val: '8', lbl: 'Approved', variant: 'green' },
          { val: '2', lbl: 'Rejected' },
        ],
        chartLabel: 'Leave Requests This Week',
        bars: [
          { day: 'M', pct: 40 }, { day: 'T', pct: 70 },
          { day: 'W', pct: 25 }, { day: 'T', pct: 55 },
          { day: 'F', pct: 50, today: true },
        ],
        feed: [
          { initials: 'SA', name: 'Sara Al-Mansoori', action: 'Annual leave approved',   time: '2m', color: '#4CB4B5' },
          { initials: 'RB', name: 'Rania Badawi',     action: 'Sick leave submitted',    time: '1h', color: '#FEBC2E' },
          { initials: 'OM', name: 'Omar Mohammed',    action: 'Emergency leave pending', time: '2h', color: '#75DEFF' },
        ],
      },
    },
    {
      name: 'Ask AI',
      sky: true,
      view: {
        metrics: [
          { val: '142',  lbl: 'Queries Today' },
          { val: '98%',  lbl: 'Resolved',  variant: 'green' },
          { val: '3.2s', lbl: 'Avg. Time', variant: 'sky' },
        ],
        chartLabel: 'AI Queries This Week',
        bars: [
          { day: 'M', pct: 65 }, { day: 'T', pct: 82 },
          { day: 'W', pct: 100 }, { day: 'T', pct: 74 },
          { day: 'F', pct: 88, today: true },
        ],
        feed: [
          { initials: 'FH', name: 'Fatima Hassan',   action: '"Leave balance?" → 14 days', time: '1m', color: '#75DEFF' },
          { initials: 'MK', name: 'Mohammed Khalid', action: '"Payroll date?" → Jan 30',   time: '4m', color: '#8B6EF0' },
          { initials: 'NR', name: 'Noura Rashid',    action: '"Team schedule" generated',  time: '9m', color: '#4CB4B5' },
        ],
      },
    },
    {
      name: 'Payroll',
      view: {
        metrics: [
          { val: '248',   lbl: 'Processed',  variant: 'green' },
          { val: '99.8%', lbl: 'Accurate',   variant: 'sky' },
          { val: '0',     lbl: 'Errors' },
        ],
        chartLabel: 'Monthly Processing',
        bars: [
          { day: 'W1', pct: 88 }, { day: 'W2', pct: 92 },
          { day: 'W3', pct: 95 }, { day: 'W4', pct: 99 },
          { day: 'Now', pct: 100, today: true },
        ],
        feed: [
          { initials: 'SY', name: 'HR System',        action: 'Feb payroll processed',  time: '2h', color: '#4CB4B5' },
          { initials: 'MK', name: 'Mohammed Khalid',  action: 'Overtime · +AED 420',    time: '3h', color: '#4ade80' },
          { initials: 'SA', name: 'Sara Al-Mansoori', action: 'Deduction updated',      time: '5h', color: '#75DEFF' },
        ],
      },
    },
    {
      name: 'Reports',
      view: {
        metrics: [
          { val: '18', lbl: 'Generated' },
          { val: '4',  lbl: 'Scheduled', variant: 'sky' },
          { val: '2',  lbl: 'Pending',   variant: 'green' },
        ],
        chartLabel: 'Reports This Week',
        bars: [
          { day: 'M', pct: 55 }, { day: 'T', pct: 90 },
          { day: 'W', pct: 70 }, { day: 'T', pct: 100 },
          { day: 'F', pct: 60, today: true },
        ],
        feed: [
          { initials: 'SY', name: 'System',         action: 'Attendance report exported', time: '1h', color: '#4CB4B5' },
          { initials: 'KA', name: 'Khalid Al-Ali',  action: 'Payroll summary downloaded', time: '2h', color: '#75DEFF' },
          { initials: 'HR', name: 'HR Analytics',   action: 'Q1 report scheduled',        time: '4h', color: '#8B6EF0' },
        ],
      },
    },
  ];

  toggleModule(i: number) {
    if (this.activeModule() === i) return;
    this.fading.set(true);
    setTimeout(() => {
      this.activeModule.set(i);
      this.fading.set(false);
    }, 180);
  }

  constructor(private zone: NgZone, private elRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.boundMouseMove = (e: MouseEvent) => {
        const el   = this.elRef.nativeElement;
        const rect = el.getBoundingClientRect();
        const mx   = ((e.clientX - rect.left) / rect.width  - 0.5).toFixed(3);
        const my   = ((e.clientY - rect.top)  / rect.height - 0.5).toFixed(3);
        el.style.setProperty('--mx', mx);
        el.style.setProperty('--my', my);
      };
      this.elRef.nativeElement.addEventListener('mousemove', this.boundMouseMove);
    });
  }

  ngOnDestroy() {
    if (this.boundMouseMove)
      this.elRef.nativeElement.removeEventListener('mousemove', this.boundMouseMove);
  }
}
