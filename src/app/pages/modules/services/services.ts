import { Component, signal, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class ServicesPage {
  activeService = signal(0);

  services = [
    { label: 'Permission Request',  icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',       desc: 'Employees submit short-time permission requests directly from the mobile app.',          value: 'Reduces manual communication and keeps permissions documented.',              screenshot: '/assets/app-screens/screen-services-fingerprint.png' },
    { label: 'Offsite Work Request', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z', desc: 'Request to work from an external location based on company policy.', value: 'Keeps flexible work organised and visible.',                                  screenshot: '/assets/app-screens/screen-services-field.png' },
    { label: 'Attendance History',  icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', desc: 'View attendance records, punch-in/out history, and missing punches.',  value: 'Improves transparency and reduces HR inquiries.',                            screenshot: '/assets/app-screens/screen-services-location.png' },
    { label: 'Vacation Request',    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', desc: 'Submit vacation requests and track leave balance in real time.',       value: 'Automates the leave process and clarifies request status.',                 screenshot: null },
    { label: 'Penalty History',     icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', desc: 'View penalties or attendance-related deductions transparently.',         value: 'Increases transparency and reduces payroll confusion.',                    screenshot: null },
    { label: 'KPIs Earned',         icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',                           desc: 'View earned KPIs, achievements, and performance progress.',                value: 'Motivates employees and connects them to performance results.',            screenshot: null },
    { label: 'Official Holidays',   icon: 'M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9', desc: 'View company and public holidays in a clear calendar.',                value: 'Keeps employees informed and reduces unnecessary requests.',              screenshot: null },
    { label: 'Internal Jobs',       icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', desc: 'Browse and apply for internal vacancies from the mobile app.', value: 'Supports internal mobility and talent utilisation.',                        screenshot: null },
    { label: 'Company Assets',      icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18', desc: 'View all assets assigned to the employee.',                          value: 'Improves asset tracking and supports offboarding clearance.',            screenshot: null },
    { label: 'Resignation Request', icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1', desc: 'Submit a resignation through a structured, documented workflow.',     value: 'Helps HR manage notice periods, approvals, and exit procedures.',         screenshot: null },
    { label: 'HR Letter Request',   icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', desc: 'Request official HR letters — employment, salary, or experience.', value: 'Reduces manual HR work and speeds up document handling.',                  screenshot: null },
    { label: 'Loan Request',        icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 6v1m0 5v-1m0 0c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', desc: 'Submit loan or advance payment requests through a structured flow.', value: 'Keeps financial requests organised and connected to payroll workflows.',  screenshot: '/assets/app-screens/screen-services-loan.png' },
    { label: 'End of Service',      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', desc: 'Access end-of-service information and initiate clearance requests.', value: 'Supports exit management, clearance, and final settlement preparation.',   screenshot: null },
  ];
}
