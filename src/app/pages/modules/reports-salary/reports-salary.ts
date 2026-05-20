import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reports-salary',
  imports: [RouterLink],
  templateUrl: './reports-salary.html',
  styleUrl: './reports-salary.scss',
})
export class ReportsSalaryPage {
  activeTab = signal(0);

  tabs = [
    {
      label: 'Salary Insights',
      desc: 'View salary breakdowns, additions, deductions, and payroll-ready summaries for each employee and department.',
      metrics: ['Total payroll cost', 'Deductions breakdown', 'Additions summary', 'Per-employee detail'],
    },
    {
      label: 'Payroll-Ready Reports',
      desc: 'Export structured payroll data ready for finance teams — clean, accurate, and connected to attendance records.',
      metrics: ['Export to Excel/CSV', 'Finance-ready format', 'Approval status', 'Period selection'],
    },
    {
      label: 'Attendance Reports',
      desc: 'Track check-in/check-out records, late arrivals, early departures, and missing punches across your workforce.',
      metrics: ['Daily attendance', 'Monthly summaries', 'Missing punches', 'Shift compliance'],
    },
    {
      label: 'Leave Reports',
      desc: 'Analyse leave taken, pending balances, leave type distribution, and team absence patterns.',
      metrics: ['Leave balance per employee', 'Leave type breakdown', 'Team absence view', 'Approval timeline'],
    },
    {
      label: 'Employee Reports',
      desc: 'Generate reports on employee headcount, contract status, department distribution, and workforce structure.',
      metrics: ['Headcount by department', 'Contract types', 'New joiners', 'Leavers summary'],
    },
    {
      label: 'Custom Reports',
      desc: 'Build custom report templates with the fields and filters your HR and finance teams need.',
      metrics: ['Custom field selection', 'Date range filters', 'Department filters', 'Save & reuse templates'],
    },
  ];

  value = [
    { label: 'Cleaner reporting', desc: 'All HR data in one place — no spreadsheet assembly.' },
    { label: 'Faster salary preparation', desc: 'Payroll-ready exports that finance can use directly.' },
    { label: 'Better visibility', desc: 'Real-time numbers across attendance, leave, and salary.' },
    { label: 'Less manual work', desc: 'Stop building reports manually — NAS HR generates them.' },
    { label: 'Accurate coordination', desc: 'HR and finance work from the same connected data.' },
  ];
}
