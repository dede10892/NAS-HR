import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-features',
  imports: [RouterLink, CommonModule],
  templateUrl: './all-features.html',
  styleUrl: './all-features.scss',
})
export class AllFeaturesPage {
  activeModule = signal(0);
  isAnimating   = signal(true);

  setModule(i: number) {
    if (i === this.activeModule()) return;
    this.isAnimating.set(false);
    setTimeout(() => { this.activeModule.set(i); this.isAnimating.set(true); }, 130);
  }

  modules = [
    {
      label:         'Employee Management',
      category:      'Core HR',
      color:         'teal',
      icon:          'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0',
      desc:          'Manage employee profiles, records, documents, contracts, and org structures across entities and departments.',
      benefits:      ['Complete employee profiles', 'Document management', 'Multi-entity support', 'Org chart visibility'],
      route:         '/modules/hr-dashboard',
      screenshot:    '/attendence-reports/HR dashboard.png',
      live:          true,
    },
    {
      label:         'Smart Attendance',
      category:      'Core HR',
      color:         'teal',
      icon:          'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      desc:          'Track attendance, manage shifts, handle missing punches, and sync data with payroll-ready reports.',
      benefits:      ['Shift scheduling', 'Missing punch handling', 'GPS & fingerprint check-in', 'Payroll-ready sync'],
      route:         '/modules/smart-attendance',
      screenshot:    '/attendence-reports/Fingerprint (3).png',
      live:          true,
    },
    {
      label:         'Leave Management',
      category:      'Core HR',
      color:         'teal',
      icon:          'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      desc:          'Handle all leave types, balance tracking, approval workflows, and leave calendar visibility.',
      benefits:      ['Multiple leave types', 'Balance tracking', 'Approval workflows', 'Team calendar'],
      route:         null,
      screenshot:    '/attendence-reports/Vacation Request.png',
      live:          true,
    },
    {
      label:         'Reports & Salary',
      category:      'Finance',
      color:         'green',
      icon:          'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      desc:          'Generate salary insights, attendance reports, and payroll-ready data for HR and finance teams.',
      benefits:      ['Salary insights', 'Payroll-ready exports', 'Attendance reports', 'Custom report builder'],
      route:         '/modules/reports-salary',
      screenshot:    '/attendence-reports/attendance report .jpeg',
      live:          true,
    },
    {
      label:         'Manager Dashboard',
      category:      'Productivity',
      color:         'sky',
      icon:          'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
      desc:          'Give managers real-time visibility over team attendance, requests, approvals, and performance.',
      benefits:      ['Pending approvals', 'Team attendance view', 'Request timeline', 'Department overview'],
      route:         '/modules/hr-dashboard',
      screenshot:    '/attendence-reports/HR dashboard.png',
      live:          true,
    },
    {
      label:         'Ask NAS AI',
      category:      'AI',
      color:         'purple',
      icon:          'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
      desc:          'An intelligent HR assistant for employees, managers, and HR teams — powered by context-aware AI.',
      benefits:      ['Leave & request handling', 'Policy answers', 'Attendance queries', 'Approval support'],
      route:         '/modules/ask-nas-ai',
      screenshot:    '/attendence-reports/2B Bot (3).png',
      live:          true,
    },
    {
      label:         'Internal Jobs',
      category:      'Productivity',
      color:         'sky',
      icon:          'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      desc:          'Publish internal vacancies, allow employees to apply, and manage career mobility from one place.',
      benefits:      ['Internal vacancy publishing', 'Employee applications', 'Application tracking', 'HR review tools'],
      route:         '/modules/internal-jobs',
      screenshot:    '/attendence-reports/intenal Jobs.jpeg',
      live:          true,
    },
    {
      label:         'LMS',
      category:      'Learning',
      color:         'orange',
      icon:          'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      desc:          'Deliver training, track employee learning progress, issue certificates, and connect learning to career growth.',
      benefits:      ['Course assignment', 'Progress tracking', 'Quizzes & assessments', 'Certificates'],
      route:         '/modules/lms',
      screenshot:    null,
      live:          true,
    },
    {
      label:         'Services',
      category:      'Core HR',
      color:         'teal',
      icon:          'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      desc:          'Mobile-first HR services for employees — requests, HR letters, assets, and end-of-service from their phones.',
      benefits:      ['13 employee services', 'Mobile-first', 'Real-time status', 'Manager notifications'],
      route:         null,
      screenshot:    '/attendence-reports/Request Permission (close) (1).png',
      live:          true,
    },
  ];

  stats = [
    { num: '9',    label: 'Integrated Modules' },
    { num: '100%', label: 'Mobile Ready' },
    { num: '1',    label: 'Connected Platform' },
    { num: '<30m', label: 'Avg Approval Time' },
  ];
}
