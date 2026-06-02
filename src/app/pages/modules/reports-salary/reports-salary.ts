import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountUpDirective } from '../../../directives/count-up.directive';

@Component({
  selector: 'app-reports-salary',
  imports: [RouterLink, CountUpDirective],
  templateUrl: './reports-salary.html',
  styleUrl: './reports-salary.scss',
})
export class ReportsSalaryPage {
  activeTab   = signal(0);
  isAnimating = signal(true);

  setTab(i: number) {
    if (i === this.activeTab()) return;
    this.isAnimating.set(false);
    setTimeout(() => { this.activeTab.set(i); this.isAnimating.set(true); }, 130);
  }

  tabs = [
    {
      label:      'Salary Insights',
      desc:       'View salary breakdowns, additions, deductions, and payroll-ready summaries for each employee and department.',
      metrics:    ['Total payroll cost', 'Deductions breakdown', 'Additions summary', 'Per-employee detail'],
      color:      '#4CB4B5',
      screenshot: '/attendence-reports/HR dashboard.png',
      badge:      { val: 'EGP 1.24M', lbl: 'Total Payroll' },
    },
    {
      label:      'Payroll-Ready',
      desc:       'Export structured payroll data ready for finance teams — clean, accurate, and connected to attendance records.',
      metrics:    ['Export to Excel/CSV', 'Finance-ready format', 'Approval status', 'Period selection'],
      color:      '#0FB86A',
      screenshot: '/attendence-reports/ss.png',
      badge:      { val: '1-click', lbl: 'Finance Export' },
    },
    {
      label:      'Attendance',
      desc:       'Track check-in/check-out records, late arrivals, early departures, and missing punches across your workforce.',
      metrics:    ['Daily attendance', 'Monthly summaries', 'Missing punches', 'Shift compliance'],
      color:      '#75DEFF',
      screenshot: '/attendence-reports/HR dashboard.png',
      badge:      { val: '98.2%', lbl: 'Attendance Rate' },
    },
    {
      label:      'Leave Reports',
      desc:       'Analyse leave taken, pending balances, leave type distribution, and team absence patterns.',
      metrics:    ['Leave balance per employee', 'Leave type breakdown', 'Team absence view', 'Approval timeline'],
      color:      '#F79008',
      screenshot: '/attendence-reports/ss.png',
      badge:      { val: '12 types', lbl: 'Leave Types' },
    },
    {
      label:      'Employee',
      desc:       'Generate reports on employee headcount, contract status, department distribution, and workforce structure.',
      metrics:    ['Headcount by department', 'Contract types', 'New joiners', 'Leavers summary'],
      color:      '#BFAAE0',
      screenshot: '/attendence-reports/ss.png',
      badge:      { val: '248', lbl: 'Employees' },
    },
    {
      label:      'Custom Reports',
      desc:       'Build custom report templates with the fields and filters your HR and finance teams need.',
      metrics:    ['Custom field selection', 'Date range filters', 'Department filters', 'Save & reuse templates'],
      color:      '#4CB4B5',
      screenshot: '/attendence-reports/HR dashboard.png',
      badge:      { val: '∞', lbl: 'Saved Templates' },
    },
  ];

  reportTypes = [
    { icon: 'salary',     title: 'Salary Reports',    desc: 'Full payroll breakdown by employee, department, or period. Export to Excel or CSV in one click.',           tags: ['Additions', 'Deductions', 'Net Pay'] },
    { icon: 'attendance', title: 'Attendance Reports', desc: 'Daily, weekly, and monthly attendance summaries with late arrivals, absences, and punch records.',          tags: ['Late Arrivals', 'Absences', 'Overtime'] },
    { icon: 'leave',      title: 'Leave Reports',      desc: 'Track leave balances, approved requests, and team absence patterns across all leave types.',                tags: ['Balance Remaining', 'Leave Type', 'Approvals'] },
    { icon: 'headcount',  title: 'Headcount Reports',  desc: 'Live workforce data including joiners, leavers, contract types, and department distribution.',              tags: ['Joiners', 'Leavers', 'By Department'] },
    { icon: 'payroll',    title: 'Payroll Exports',    desc: 'Finance-ready files with all the data your accounting team needs — formatted and accurate.',                 tags: ['Excel', 'CSV', 'Finance Format'] },
    { icon: 'custom',     title: 'Custom Builder',     desc: 'Choose your fields, set filters, and save templates your team can re-run any time.',                        tags: ['Custom Fields', 'Saved Templates', 'Filters'] },
  ];

  flowInputs = [
    { label: 'GPS Check-in',       icon: 'M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z M12 10a1 1 0 100-2 1 1 0 000 2z' },
    { label: 'Leave Requests',     icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { label: 'Employee Records',   icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0' },
    { label: 'Shift Records',      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  flowOutputs = [
    { label: 'Salary Report',      icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' },
    { label: 'Payroll Export',     icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' },
    { label: 'Attendance Report',  icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { label: 'Finance Summary',    icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  ];

  flowSteps = [
    { num: '01', title: 'Attendance Data',   desc: 'Check-ins, shifts, and punches collected automatically from fingerprint, GPS, and mobile devices.',   icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',                                                                                                                                     screenshot: '/attendence-reports/attendance report .jpeg' },
    { num: '02', title: 'HR Processing',     desc: 'Leave requests, permissions, and employee records are merged and validated in real time by the system.', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',                                                  screenshot: '/attendence-reports/Work Shift (2).png' },
    { num: '03', title: 'Report Generation', desc: 'Instant summaries generated by period, department, or employee — ready to review in your dashboard.',   icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', screenshot: '/attendence-reports/Bonus History .jpeg' },
    { num: '04', title: 'Finance Export',    desc: 'One-click payroll-ready files exported to Excel or CSV — formatted exactly for your finance team.',      icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',                                                                                                                    screenshot: '/attendence-reports/HR dashboard.png' },
  ];
}
