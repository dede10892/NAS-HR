import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IndustriesComponent } from '../../../sections/industries/industries';

@Component({
  selector: 'app-solutions-overview',
  imports: [RouterLink, IndustriesComponent],
  templateUrl: './solutions-overview.html',
  styleUrl: './solutions-overview.scss',
})
export class SolutionsOverviewPage {
  activeIndustry = signal(0);
  switching = signal(false);

  switchIndustry(i: number) {
    if (this.activeIndustry() === i) return;
    this.switching.set(true);
    setTimeout(() => {
      this.activeIndustry.set(i);
      this.switching.set(false);
    }, 200);
  }

  industries = [
    {
      key: 'aviation',
      label: 'Aviation',
      sublabel: '& Airlines',
      route: '/solutions/aviation',
      eyebrow: 'Aviation & Airlines',
      headline: 'HR built for the pace of aviation.',
      desc: 'From crew scheduling to compliance, NAS HR helps aviation companies manage a complex, multi-shift workforce across airports and operations hubs — with mobile access for every employee.',
      icon: 'M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z',
      color: '#4CB4B5',
      screenshot: '/screenshots/screen-1.png',
      benefits: ['Shift & crew scheduling', 'Compliance tracking', 'Multi-location attendance', 'Mobile ESS for cabin crew', 'Automated leave approvals', 'Real-time manager dashboard'],
      stat: { val: '24/7', lbl: 'Operations coverage' },
    },
    {
      key: 'hospitality',
      label: 'Hospitality',
      sublabel: '& Hotels',
      route: '/solutions/hospitality',
      eyebrow: 'Hospitality & Hotels',
      headline: 'Manage a hospitality workforce effortlessly.',
      desc: 'Hotels and restaurants run on people. NAS HR gives managers real-time visibility into shift coverage, leave balances, and staff requests — so service never stops.',
      icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10',
      color: '#F79008',
      screenshot: '/screenshots/screen-2.png',
      benefits: ['Shift planning & swaps', 'Fingerprint attendance', 'Leave & overtime requests', 'Payroll-ready reporting', 'Manager approvals on mobile', 'Multi-property support'],
      stat: { val: '↓40%', lbl: 'Less admin time' },
    },
    {
      key: 'healthcare',
      label: 'Healthcare',
      sublabel: '& Clinics',
      route: '/solutions/healthcare',
      eyebrow: 'Healthcare & Clinics',
      headline: 'HR that keeps pace with healthcare demands.',
      desc: 'Healthcare teams operate around the clock. NAS HR supports hospitals, clinics, and labs with automated workflows, credential tracking, and round-the-clock ESS access.',
      icon: 'M22 12h-4l-3 9L9 3l-3 9H2',
      color: '#0FB86A',
      screenshot: '/screenshots/screen-3.png',
      benefits: ['Staff credential management', 'Shift rotation scheduling', 'Compliance audit trails', 'Leave & absence tracking', 'Salary-ready reports', 'Mobile staff self-service'],
      stat: { val: '100%', lbl: 'Compliance visibility' },
    },
    {
      key: 'retail',
      label: 'Retail',
      sublabel: '& FMCG',
      route: '/solutions/retail-fmcg',
      eyebrow: 'Retail & FMCG',
      headline: 'Scale your retail HR with confidence.',
      desc: 'Retail moves fast. NAS HR helps manage high-volume, multi-location teams — from part-time floor staff to corporate employees — with one connected platform.',
      icon: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
      color: '#F96C4D',
      screenshot: '/attendence-reports/HR%20dashboard.png',
      benefits: ['Multi-branch employee management', 'High-volume attendance tracking', 'Seasonal workforce management', 'Automated payroll exports', 'Internal job board', 'Mobile ESS for floor staff'],
      stat: { val: '3×', lbl: 'Faster onboarding' },
    },
    {
      key: 'government',
      label: 'Government',
      sublabel: '& Public Sector',
      route: '/solutions/government',
      eyebrow: 'Government & Public Sector',
      headline: 'Compliant, transparent HR for the public sector.',
      desc: 'Government bodies require strict data governance and audit-ready records. NAS HR delivers structured HR management with full audit trails and role-based access controls.',
      icon: 'M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11',
      color: '#75DEFF',
      screenshot: '/attendence-reports/Work%20Shift%20(2).png',
      benefits: ['Role-based access controls', 'Full audit trail & logs', 'Structured approval chains', 'Policy-compliant leave rules', 'Reports for leadership', 'Secure data management'],
      stat: { val: '↑95%', lbl: 'Process transparency' },
    },
  ];

  sharedFeatures = [
    { icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', label: 'Mobile ESS App', desc: 'iOS & Android self-service for every employee' },
    { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'Manager Dashboard', desc: 'Real-time visibility into team activity' },
    { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Smart Attendance', desc: 'Fingerprint, face ID, GPS & QR check-in' },
    { icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', label: 'Ask NAS AI', desc: 'AI-powered HR assistant, always available' },
    { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Payroll Reports', desc: 'One-click salary exports & analytics' },
    { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Leave Management', desc: 'Automated workflows and approval chains' },
  ];

  platformStats = [
    { val: '500+', lbl: 'Companies' },
    { val: '50K+', lbl: 'Employees managed' },
    { val: '5', lbl: 'Industries served' },
    { val: '6', lbl: 'Countries' },
  ];
}
