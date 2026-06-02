import { Component, signal, OnDestroy, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Industry {
  name: string;
  iconPaths: string[];
  challenge: string;
  helps: string[];
  color: string;
}

@Component({
  selector: 'app-solutions-by-industry',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './solutions-by-industry.html',
  styleUrl: './solutions-by-industry.scss',
})
export class SolutionsByIndustryComponent implements OnDestroy {
  activeIndex = signal(0);

  private intervalId?: ReturnType<typeof setInterval>;

  industries: Industry[] = [
    {
      name: 'Aviation & Airlines',
      iconPaths: ['M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z'],
      challenge: 'Complex shifts, approvals, and workforce scheduling.',
      helps: ['Shift tracking', 'Approvals', 'Attendance visibility', 'Employee requests'],
      color: '#4CB4B5',
    },
    {
      name: 'Hospitality',
      iconPaths: ['M3 22V8l9-6 9 6v14', 'M9 22v-6h6v6'],
      challenge: 'High staff movement and daily operational pressure.',
      helps: ['Mobile requests', 'Attendance history', 'Holidays', 'HR letters'],
      color: '#75DEFF',
    },
    {
      name: 'Healthcare',
      iconPaths: ['M22 12h-4l-3 9L9 3l-3 9H2'],
      challenge: 'Sensitive workforce operations need accuracy and control.',
      helps: ['Role-based approvals', 'Employee records', 'Policy access', 'Reporting'],
      color: '#0FB86A',
    },
    {
      name: 'Retail & FMCG',
      iconPaths: [
        'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z',
        'M3 6h18',
        'M16 10a4 4 0 0 1-8 0',
      ],
      challenge: 'Multi-branch teams need fast people operations.',
      helps: ['Branch attendance', 'Internal jobs', 'KPIs earned', 'Manager approvals'],
      color: '#F79008',
    },
    {
      name: 'Government & Public',
      iconPaths: [
        'M3 22h18',
        'M6 18V11',
        'M10 18V11',
        'M14 18V11',
        'M18 18V11',
        'M12 2L2 7h20z',
      ],
      challenge: 'Structured workflows require clarity and compliance.',
      helps: ['Official holidays', 'Permissions', 'Loans', 'End of service'],
      color: '#BFAAE0',
    },
  ];

  constructor() {
    afterNextRender(() => {
      this.intervalId = setInterval(() => {
        this.next();
      }, 3500);
    });
  }

  setActive(i: number): void {
    this.activeIndex.set(i);
  }

  next(): void {
    this.activeIndex.set((this.activeIndex() + 1) % this.industries.length);
  }

  prev(): void {
    this.activeIndex.set(
      (this.activeIndex() - 1 + this.industries.length) % this.industries.length
    );
  }

  trackByIndex(index: number): number {
    return index;
  }

  ngOnDestroy(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
    }
  }
}
