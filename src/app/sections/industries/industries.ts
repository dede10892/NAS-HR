import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface IndustryNode { label: string; icon: string; }

interface Industry {
  key:       string;
  label:     string;
  sublabel:  string;
  sentence:  string;
  color:     string;
  tabIcon:   string;
  nodes:     IndustryNode[];
  challenges: { title: string; desc: string }[];
  helps:      { title: string; desc: string }[];
}

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './industries.html',
  styleUrl:    './industries.scss',
})
export class IndustriesComponent {
  @Input() lang: 'en' | 'ar' = 'en';

  active    = signal(0);
  switching = signal(false);

  switchTo(i: number) {
    if (i === this.active()) return;
    this.switching.set(true);
    setTimeout(() => { this.active.set(i); this.switching.set(false); }, 220);
  }

  get ind(): Industry { return this.industries[this.active()]; }

  // SVG viewBox dimensions — used to convert node coords to % for responsive positioning
  private readonly VW = 440;
  private readonly VH = 420;

  readonly nodePositions = computed(() => {
    const nodes = this.industries[this.active()].nodes;
    const count = nodes.length;
    const cx = 220, cy = 210, r = 130;
    const startAngle = -Math.PI / 2;
    return nodes.map((node, i) => {
      const angle = startAngle + (i / count) * 2 * Math.PI;
      const x = Math.round(cx + r * Math.cos(angle));
      const y = Math.round(cy + r * Math.sin(angle));
      // Percentage positions for the center of the card overlay
      const leftPct = +(x / this.VW * 100).toFixed(2);
      const topPct  = +(y / this.VH * 100).toFixed(2);
      const delay = +(i * 0.1).toFixed(2);
      return { label: node.label, icon: node.icon, x, y, leftPct, topPct, delay };
    });
  });

  readonly industries: Industry[] = [
    {
      key: 'retail',
      label: 'Retail',
      sublabel: '& FMCG',
      sentence: 'NAS HR connects every branch, manager, and employee in one platform — so HR is always close, even at scale.',
      color: '#F96C4D',
      tabIcon: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
      nodes: [
        { label: 'Store Staff',    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' },
        { label: 'Branch Mgrs',   icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
        { label: 'Warehouse',     icon: 'M20 7H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 12H4V9h16v10zM10 11v2H7v-2H5v6h2v-2h3v2h2v-6h-2zm7 0h-2v6h2v-2h2v-1h-2v-1h2v-2h-2z' },
        { label: 'Sales Teams',   icon: 'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z' },
        { label: 'Area Managers', icon: 'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z' },
        { label: 'Head Office',   icon: 'M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z' },
        { label: 'Customer Svc',  icon: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z' },
      ],
      challenges: [
        { title: 'No direct link between HR and branch employees', desc: 'Staff across locations have no easy way to reach HR or receive updates without visiting.' },
        { title: 'Attendance tracked differently in every branch', desc: 'Each store uses paper, spreadsheets, or different methods — HR has no unified view.' },
        { title: 'Leave and requests get lost in follow-up', desc: 'Requests travel by phone or paper and often go unanswered until someone chases them.' },
        { title: 'Branch managers rely on HR calls for decisions', desc: 'Managers cannot act on leave or approval requests without calling HR back-and-forth.' },
        { title: 'No single view of workforce data or reports', desc: 'HR cannot pull a consistent report across branches without manually compiling data.' },
      ],
      helps: [
        { title: 'One HRIS connecting all branches', desc: 'Every location, employee, and HR action is managed from one platform in real time.' },
        { title: 'GPS, QR and fingerprint attendance', desc: 'Live attendance data flows from every store into one dashboard across all shifts.' },
        { title: 'Automated request workflows', desc: 'Leave, permission, and overtime requests route instantly to the right person with no chasing.' },
        { title: 'Mobile approval dashboard for managers', desc: 'Branch managers approve requests and view team status from their phone, instantly.' },
        { title: 'Live HR reports across all locations', desc: 'Attendance, leave, and payroll data are always ready — pulled across all branches in one click.' },
      ],
    },
    {
      key: 'aviation',
      label: 'Aviation',
      sublabel: '& Airlines',
      sentence: 'NAS HR keeps aviation teams synchronized across airports, shifts, and time zones — without manual follow-up.',
      color: '#4CB4B5',
      tabIcon: 'M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z',
      nodes: [
        { label: 'Cabin Crew',   icon: 'M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z' },
        { label: 'Ground Staff', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
        { label: 'Operations',   icon: 'M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.28L13 17v5l5-2.88c3.12-1.96 5-5.27 5-9.12 0-5.72-4.25-10.44-10-10.95zM11 2.05C5.25 2.56 1 7.28 1 13c0 3.85 1.88 7.16 5 9.12L11 25v-5l-2.28-1.72C6.81 17 5 14.21 5 11c0-4.08 3.05-7.44 7-7.93V2.05z' },
        { label: 'Maintenance',  icon: 'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z' },
        { label: 'Station Mgr',  icon: 'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z' },
        { label: 'Remote Staff', icon: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z' },
      ],
      challenges: [
        { title: 'Crew at different stations have no HR access', desc: 'Cabin crew and ground staff cannot reach HR or get updates without visiting an office.' },
        { title: 'No unified attendance view across airports', desc: 'Shift attendance is tracked per station — HR has no live crew availability picture.' },
        { title: 'Leave requests wait days for approval', desc: 'Approvals depend on reaching a manager between flights, creating long unresolved queues.' },
        { title: 'Managers cannot act on requests remotely', desc: 'HR requests pile up when managers are in the air or between stations with no system access.' },
        { title: 'Compliance records spread across systems', desc: 'Certifications, licenses, and medical records expire unnoticed with no central tracking.' },
      ],
      helps: [
        { title: 'One platform connecting all stations', desc: 'Every airport, department, and crew member is linked through one unified HR system.' },
        { title: 'Mobile check-in and self-service for crew', desc: 'Crew check in digitally and access payslips, leave, and HR letters from any device.' },
        { title: 'Automated leave and permission workflows', desc: 'Every request routes instantly to the right manager with no manual follow-up needed.' },
        { title: 'One-tap mobile approvals for managers', desc: 'Managers approve or reject HR requests from their phone — on the ground or in transit.' },
        { title: 'Compliance tracking and operational reports', desc: 'Credential alerts, audit trails, and live workforce reports are always current and ready.' },
      ],
    },
    {
      key: 'hospitality',
      label: 'Hospitality',
      sublabel: '& Hotels',
      sentence: 'NAS HR gives hospitality managers real-time visibility so service never stops, even when teams span three shifts.',
      color: '#F79008',
      tabIcon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10',
      nodes: [
        { label: 'Front Office',  icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
        { label: 'Housekeeping',  icon: 'M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3h-3z' },
        { label: 'Food & Bev',    icon: 'M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-8-15.03-8-15.03 0h15.03zM1.02 17h15v2h-15z' },
        { label: 'Security',      icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z' },
        { label: 'Maintenance',   icon: 'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z' },
        { label: 'Guest Exp.',    icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
      ],
      challenges: [
        { title: 'Employees have no direct HR access across departments', desc: 'Staff working split shifts in different areas must visit HR in person for any request.' },
        { title: 'Shift-based attendance tracked with no live visibility', desc: 'Absence and late arrivals are noticed only after service gaps have already happened.' },
        { title: 'Leave and overtime requests handled by paper or phone', desc: 'Requests travel manually between staff, managers, and HR — often getting lost mid-way.' },
        { title: 'Managers on the floor cannot approve requests in time', desc: 'Pending approvals stay unanswered while managers handle guests and service operations.' },
        { title: 'Coverage gaps and leave conflicts discovered too late', desc: 'HR has no fast way to check balances, prepare payroll exports, or flag service risks.' },
      ],
      helps: [
        { title: 'Centralized HR connecting all departments', desc: 'Every property, department, and employee is managed from one connected HR platform.' },
        { title: 'Live shift attendance and mobile self-service', desc: 'Employees clock in digitally and manage their own requests through a mobile ESS app.' },
        { title: 'Automated leave and overtime workflows', desc: 'Every request routes instantly to the right manager — nothing sits in a manual queue.' },
        { title: 'Real-time approvals from any device', desc: 'Managers approve requests and view team status with one tap from anywhere in the property.' },
        { title: 'Live leave ledger and payroll-ready reports', desc: 'Coverage gaps, leave balances, and salary exports update automatically and in real time.' },
      ],
    },
    {
      key: 'healthcare',
      label: 'Healthcare',
      sublabel: '& Clinics',
      sentence: 'NAS HR helps healthcare teams run 24/7 operations without compliance gaps or HR bottlenecks.',
      color: '#0FB86A',
      tabIcon: 'M22 12h-4l-3 9L9 3l-3 9H2',
      nodes: [
        { label: 'Doctors',     icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z' },
        { label: 'Nurses',      icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
        { label: 'Admin Staff',  icon: 'M20 6h-2.18c.07-.44.18-.88.18-1.35C18 2.54 16.36 1 14.5 1c-1.22 0-2.22.72-2.87 1.72L12 3.4l-.63-1.68C10.72 1.72 9.72 1 8.5 1 6.64 1 5 2.54 5 4.65c0 .48.11.91.18 1.35H3c-1.11 0-2 .89-2 2v13c0 1.11.89 2 2 2h18c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-9.13-1.96c.37-.51.94-.79 1.63-.04.68.71 1.09 1.62.5 2.5H10c-.13-.79.14-1.7.87-2.46zM3 8h18v4H3V8zm0 13V14h7v7H3zm9 0v-7h7v7h-7z' },
        { label: 'Lab Teams',   icon: 'M7 2v2h1v14c0 1.66 1.34 3 3 3s3-1.34 3-3V4h1V2H7zm3 16c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm1-4.14V14H9v-.14C7.86 13.41 7 12.31 7 11h8c0 1.31-.86 2.41-2 2.86z' },
        { label: 'Reception',   icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
        { label: 'Emergency',   icon: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' },
      ],
      challenges: [
        { title: 'Clinical staff have no HR access without leaving the floor', desc: 'Doctors and nurses must physically visit HR for every leave, payslip, or service request.' },
        { title: 'Round-the-clock shifts have no unified attendance view', desc: 'Tracking attendance across rotating specialties and night shifts is done manually and slowly.' },
        { title: 'Leave requests during critical hours go unanswered', desc: 'Approval requests sit in inboxes while departments go understaffed during peak operations.' },
        { title: 'Managers in busy clinical areas cannot respond in time', desc: 'HR approvals are delayed because managers are occupied with operations and patient care.' },
        { title: 'Compliance records and salary reports are always delayed', desc: 'Credentials, overtime, and deduction calculations are computed manually for every payroll.' },
      ],
      helps: [
        { title: 'One platform for all staff, departments, and locations', desc: 'A single HR system connects every doctor, nurse, and admin team in real time.' },
        { title: 'Digital check-in and mobile self-service for clinical staff', desc: 'Staff log attendance and access payslips, HR letters, and leave balance from their phone.' },
        { title: 'Parallel leave and permission approval workflows', desc: 'Requests route automatically to the right approver — no bottlenecks, no waiting queues.' },
        { title: 'Real-time manager dashboard with pending approvals', desc: 'Managers see all team requests and approve from a mobile dashboard with one tap.' },
        { title: 'Automated compliance tracking and salary-ready reports', desc: 'Credential alerts, audit trails, and payroll exports update live without manual effort.' },
      ],
    },
    {
      key: 'government',
      label: 'Government',
      sublabel: '& Public Sector',
      sentence: 'NAS HR helps public sector teams manage large employee structures, approvals, records, and HR services through one connected digital platform.',
      color: '#75DEFF',
      tabIcon: 'M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11',
      nodes: [
        { label: 'Departments',  icon: 'M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z' },
        { label: 'Employees',    icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
        { label: 'Managers',     icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' },
        { label: 'Reg. Offices', icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z' },
        { label: 'Admin Teams',  icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z' },
        { label: 'Services',     icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z' },
      ],
      challenges: [
        { title: 'No direct link between HR and employees across departments', desc: 'Staff have no clear channel to reach HR or receive updates without physical visits.' },
        { title: 'Attendance across sites and shifts has no unified view', desc: 'Multiple locations track time independently — HR cannot see absences across departments.' },
        { title: 'Service requests travel through email and paper slowly', desc: 'Leave, permission, and HR forms take too long moving between staff, managers, and HR.' },
        { title: 'Approval chains cross multiple levels and often stall', desc: 'Requests idle for days as they move between managers, departments, and approvers manually.' },
        { title: 'Leadership has no real-time visibility into HR or records', desc: 'Audit logs, status reports, and HR data are produced manually, always delayed.' },
      ],
      helps: [
        { title: 'Centralized platform for all departments and employees', desc: 'All departments, roles, and employee records are managed from one connected HR system.' },
        { title: 'Digital attendance and employee self-service at every site', desc: 'Employees check in digitally and submit all requests from their own secure portal.' },
        { title: 'Automated approval workflows per department', desc: 'Every request moves automatically to the right approver at the right level, every time.' },
        { title: 'Structured manager dashboard with full request visibility', desc: 'Managers see pending approvals and team HR status in real time from any device.' },
        { title: 'Timestamped audit trails and live departmental reports', desc: 'Every HR action is logged with user, time, and status — always ready for leadership review.' },
      ],
    },
  ];
}
