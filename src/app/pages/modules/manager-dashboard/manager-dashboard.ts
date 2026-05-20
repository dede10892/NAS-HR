import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manager-dashboard',
  imports: [RouterLink],
  templateUrl: './manager-dashboard.html',
  styleUrl: './manager-dashboard.scss',
})
export class ManagerDashboardPage {
  activeFeature = signal(0);

  features = [
    {
      label: 'Pending Approvals',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
      desc: 'See all pending employee requests in one view — leave, permissions, missions, and more. Approve or reject with one tap.',
      stat: '5 pending',
    },
    {
      label: 'Team Attendance',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      desc: 'Monitor who is checked in, who is late, and who is absent — updated in real time across your entire team.',
      stat: '18/20 present',
    },
    {
      label: 'Leave Requests',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      desc: 'Review team leave requests, check leave balance overlap, and approve or defer with full context.',
      stat: '3 requests',
    },
    {
      label: 'Department Overview',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0',
      desc: 'Get a complete view of your department — headcount, active employees, and current team structure.',
      stat: '24 employees',
    },
    {
      label: 'Performance Snapshot',
      icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
      desc: 'Track team KPIs, performance indicators, and employee activity progress from one connected view.',
      stat: '87% on track',
    },
    {
      label: 'Request Timeline',
      icon: 'M4 6h16M4 10h16M4 14h16M4 18h16',
      desc: 'View a chronological timeline of all team requests, approvals, and HR actions — with full audit visibility.',
      stat: 'Last 30 days',
    },
  ];

  businessValue = [
    { label: 'Faster approvals', desc: 'Approve requests from anywhere — no manual follow-up needed.' },
    { label: 'Better team visibility', desc: 'See attendance, requests, and activity in real time.' },
    { label: 'Less manual communication', desc: 'Employees get notified automatically when requests are resolved.' },
    { label: 'Clearer decisions', desc: 'All context — leave balance, past requests, team schedule — in one view.' },
    { label: 'Stronger employee support', desc: 'Managers can act on requests faster, improving the employee experience.' },
  ];
}
