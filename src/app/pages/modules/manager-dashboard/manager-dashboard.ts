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
  selectedRow   = signal(-1);
  isAnimating   = signal(true);

  setFeature(i: number) {
    if (i === this.activeFeature()) return;
    this.isAnimating.set(false);
    setTimeout(() => {
      this.activeFeature.set(i);
      this.selectedRow.set(-1);
      this.isAnimating.set(true);
    }, 120);
  }

  setFeatureFromNav(navIndex: number) {
    if (navIndex >= 1 && navIndex <= this.features.length) {
      this.setFeature(navIndex - 1);
    }
  }

  features = [
    {
      label: 'Employees',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0',
      desc: 'View, manage, and filter all employees across departments — with full profile access, contact details, and employment history.',
      stat: '152 employees',
    },
    {
      label: 'Payroll',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      desc: 'Process monthly payroll, view salary structures, manage deductions, and export payslips for every employee.',
      stat: '$2,100 avg',
    },
    {
      label: 'Requests',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
      desc: 'Manage all HR service requests — leave, permissions, letters, loans, and more — with approval status in real time.',
      stat: '12 pending',
    },
    {
      label: 'Shift Management',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      desc: 'Create, assign, and adjust work shifts for all employees and departments from one centralized shift planner.',
      stat: '8 active shifts',
    },
    {
      label: 'Performance',
      icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
      desc: 'Track KPIs, run appraisals, and monitor performance reviews across teams with full visibility into targets.',
      stat: '87% on track',
    },
    {
      label: 'Reports',
      icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      desc: 'Generate HR reports on attendance, headcount, payroll, and more — export to Excel or PDF in one click.',
      stat: '5 new reports',
    },
  ];

  featureViews = [
    {
      stats: [
        { num: '152', lbl: 'Total',          color: 'teal',   icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0' },
        { num: '14',  lbl: 'New This Month', color: 'green',  icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
        { num: '6',   lbl: 'On Leave',       color: 'orange', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { num: '3',   lbl: 'On Probation',   color: 'red',    icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
      ],
      tableTitle: 'All Employees',
      cols: ['ID', 'Name', 'Department', 'Title'],
      rows: [
        ['101', 'Mohammed Ali',    'HR',           'HR Manager'],
        ['127', 'Ahmed Hamdy',     'HR',           'HR Specialist'],
        ['172', 'Yaqeen Hamed',    'Business Dev', 'Specialist'],
        ['008', 'Admin',           'IT',           'Developer'],
        ['671', 'Mohammed Shehab', 'Business Dev', 'Head of BD'],
      ],
    },
    {
      stats: [
        { num: '$2.4M',  lbl: 'Total Payroll', color: 'teal',   icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        { num: '$2,100', lbl: 'Avg Salary',    color: 'green',  icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z' },
        { num: '5',      lbl: 'Pending',       color: 'orange', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
        { num: '98%',    lbl: 'Processed',     color: 'green',  icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
      ],
      tableTitle: 'Payroll Summary',
      cols: ['Employee', 'Basic', 'Allowances', 'Net Pay'],
      rows: [
        ['Mohammed Ali',    'LE 8,500',  'LE 1,200', 'LE 9,700'],
        ['Ahmed Hamdy',     'LE 7,200',  'LE 800',   'LE 8,000'],
        ['Yaqeen Hamed',    'LE 6,500',  'LE 600',   'LE 7,100'],
        ['Admin',           'LE 9,000',  'LE 1,500', 'LE 10,500'],
        ['Mohammed Shehab', 'LE 11,000', 'LE 2,000', 'LE 13,000'],
      ],
    },
    {
      stats: [
        { num: '12',  lbl: 'Pending',     color: 'orange', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
        { num: '48',  lbl: 'This Month',  color: 'teal',   icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
        { num: '3',   lbl: 'Urgent',      color: 'red',    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
        { num: '94%', lbl: 'Approved',    color: 'green',  icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
      ],
      tableTitle: 'Recent Requests',
      cols: ['Employee', 'Type', 'Status', 'Date'],
      rows: [
        ['Mohammed Ali',    'Annual Leave',   'Pending',  'Jun 1'],
        ['Ahmed Hamdy',     'Permission',     'Approved', 'May 30'],
        ['Yaqeen Hamed',    'Sick Leave',     'Pending',  'May 29'],
        ['Admin',           'Work From Home', 'Approved', 'May 28'],
        ['Mohammed Shehab', 'Overtime',       'Approved', 'May 27'],
      ],
    },
    {
      stats: [
        { num: '8',   lbl: 'Active Shifts', color: 'teal',   icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
        { num: '152', lbl: 'Assigned',      color: 'green',  icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0' },
        { num: '4',   lbl: 'Unassigned',    color: 'orange', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
        { num: '2',   lbl: 'Conflicts',     color: 'red',    icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
      ],
      tableTitle: 'Shift Schedule',
      cols: ['Employee', 'Shift', 'Days', 'Hours'],
      rows: [
        ['Mohammed Ali',    'Morning',   'Sun–Thu', '09:00–17:00'],
        ['Ahmed Hamdy',     'Morning',   'Sun–Thu', '09:00–17:00'],
        ['Yaqeen Hamed',    'Afternoon', 'Sun–Thu', '14:00–22:00'],
        ['Admin',           'Morning',   'Sun–Thu', '09:00–17:00'],
        ['Mohammed Shehab', 'Flexible',  'Sun–Thu', '08:00–16:00'],
      ],
    },
    {
      stats: [
        { num: '87%', lbl: 'On Track',     color: 'green',  icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
        { num: '12',  lbl: 'Reviews Due',  color: 'orange', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
        { num: '94',  lbl: 'Avg Score',    color: 'teal',   icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
        { num: '3',   lbl: 'Below Target', color: 'red',    icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
      ],
      tableTitle: 'Performance Reviews',
      cols: ['Employee', 'Score', 'KPIs Met', 'Status'],
      rows: [
        ['Mohammed Ali',    '92%', '8 / 9', 'On Track'],
        ['Ahmed Hamdy',     '88%', '7 / 9', 'On Track'],
        ['Yaqeen Hamed',    '95%', '9 / 9', 'Excellent'],
        ['Admin',           '79%', '6 / 9', 'Needs Review'],
        ['Mohammed Shehab', '91%', '8 / 9', 'On Track'],
      ],
    },
    {
      stats: [
        { num: '5',  lbl: 'New Reports',    color: 'teal',   icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
        { num: '24', lbl: 'Generated',      color: 'green',  icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
        { num: '3',  lbl: 'Scheduled',      color: 'orange', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
        { num: '2',  lbl: 'Pending Export', color: 'red',    icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' },
      ],
      tableTitle: 'Recent Reports',
      cols: ['Report Name', 'Type', 'Generated', 'Format'],
      rows: [
        ['Attendance Jun', 'Attendance', 'Jun 1',  'PDF'],
        ['Payroll May',    'Payroll',    'May 31', 'Excel'],
        ['Headcount Q2',   'HR',         'May 30', 'PDF'],
        ['Leave Balance',  'Leave',      'May 29', 'Excel'],
        ['Shift Summary',  'Shifts',     'May 28', 'PDF'],
      ],
    },
  ];

  navItems = [
    { label: 'Dashboard',        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { label: 'Employees',        icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0' },
    { label: 'Payroll',          icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Requests',         icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { label: 'Shift Management', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Performance',      icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { label: 'Reports',          icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { label: 'Configurations',   icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    { label: 'Policies',         icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { label: 'Structure',        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { label: 'Terminations',     icon: 'M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6' },
  ];

  metrics = [
    { val: '1,248', label: 'Employees Managed',  icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0' },
    { val: '98.2%', label: 'Avg Attendance Rate', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { val: '$2.4M', label: 'Monthly Payroll',     icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { val: '< 30m', label: 'Avg Approval Time',  icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  businessValue = [
    { label: 'Full employee visibility',     desc: 'HR sees every employee record, department, and status from one connected system.',      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0' },
    { label: 'Automated payroll processing', desc: 'Run payroll in minutes — deductions, bonuses, and allowances calculated automatically.', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Faster request resolution',    desc: 'All HR service requests are tracked, routed, and resolved with no manual follow-up.',   icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { label: 'Real-time attendance data',    desc: 'Monitor who is present, late, or absent across the entire company in real time.',        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];
}
