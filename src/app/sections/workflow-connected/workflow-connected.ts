import {
  Component, signal, OnInit, OnDestroy,
  PLATFORM_ID, Inject, Input,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface WfRow { left: string; pill: string; right: string; }

@Component({
  selector: 'app-workflow-connected',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workflow-connected.html',
  styleUrl: './workflow-connected.scss',
})
export class WorkflowConnectedComponent implements OnInit, OnDestroy {

  @Input() lang: 'en' | 'ar' = 'en';

  activeCycle = signal<number>(0);
  visible     = signal<boolean>(true);

  private cycleTimer: any;
  private fadeTimer:  any;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) this.startCycle();
  }

  ngOnDestroy() {
    clearTimeout(this.cycleTimer);
    clearTimeout(this.fadeTimer);
  }

  get currentRows(): WfRow[] { return this.cycles[this.activeCycle()].rows; }

  private startCycle() {
    this.cycleTimer = setTimeout(() => {
      this.visible.set(false);
      this.fadeTimer = setTimeout(() => {
        this.activeCycle.update(c => (c + 1) % this.cycles.length);
        this.visible.set(true);
        this.startCycle();
      }, 380);
    }, 3400);
  }

  readonly cycles: { rows: WfRow[] }[] = [
    { rows: [
      { left: 'Leave Request',      pill: 'Approved',   right: 'Payroll Ready' },
      { left: 'Permission Request', pill: 'Automated',  right: 'Manager Notified' },
      { left: 'Attendance Update',  pill: 'Synced',     right: 'HR Dashboard Updated' },
    ]},
    { rows: [
      { left: 'Offsite Work',       pill: 'Reviewed',   right: 'Finance Updated' },
      { left: 'HR Letter Request',  pill: 'Generated',  right: 'Document Ready' },
      { left: 'Employee Asset',     pill: 'Tracked',    right: 'Clearance Connected' },
    ]},
    { rows: [
      { left: 'KPI Earned',         pill: 'Calculated', right: 'Performance Updated' },
      { left: 'Training Progress',  pill: 'Completed',  right: 'Career Path Improved' },
      { left: 'Internal Job',       pill: 'Matched',    right: 'HR Action Created' },
    ]},
  ];
}
