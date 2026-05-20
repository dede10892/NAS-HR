import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-government',
  imports: [RouterLink],
  templateUrl: './government.html',
  styleUrl: './government.scss',
})
export class GovernmentPage {
  activeChallenge = signal(0);

  challenges = [
    { label: 'Large Workforce Administration', desc: 'Managing thousands of employees across departments, directorates, and administrative entities.' },
    { label: 'Approval Chains & Audit Trails', desc: 'Maintaining documented approval workflows for every HR action with full accountability.' },
    { label: 'End-of-Service Calculations', desc: 'Accurately computing gratuity, end-of-service entitlements, and benefit settlements for departing employees.' },
    { label: 'Paper-Based Processes', desc: 'Digitizing manual HR forms, paper leave requests, and in-person approvals into automated digital workflows.' },
    { label: 'Citizen-Facing HR Reporting', desc: 'Generating accurate, structured HR data reports for leadership, auditors, and administrative oversight.' },
    { label: 'Career Development & Training', desc: 'Structured learning programs, skills tracking, and internal career paths for public sector employees.' },
  ];

  helps = [
    { label: 'Structured Approval Workflows', desc: 'Multi-level approval chains with full digital audit trails for every HR request and action.' },
    { label: 'End-of-Service & Benefits Automation', desc: 'Calculate entitlements accurately based on service period, role, and policy — reducing manual errors.' },
    { label: 'HR Reports & Data Oversight', desc: 'Generate department-level and entity-wide reports for HR analytics, budgeting, and leadership reviews.' },
    { label: 'Internal Mobility & LMS', desc: 'Publish internal vacancies and deliver structured learning programs to support public sector development.' },
  ];

  modules = ['Employee Management', 'Reports & Salary', 'LMS', 'Internal Jobs', 'Employee Services', 'Manager Dashboard'];
}
