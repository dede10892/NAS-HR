import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hospitality',
  imports: [RouterLink],
  templateUrl: './hospitality.html',
  styleUrl: './hospitality.scss',
})
export class HospitalityPage {
  activeChallenge = signal(0);

  challenges = [
    { label: 'High Staff Turnover', desc: 'Continuously onboarding, training, and offboarding seasonal and part-time employees across properties.' },
    { label: 'Split & Rotating Shifts', desc: 'Coordinating front-of-house, back-of-house, and housekeeping schedules across 24/7 operations.' },
    { label: 'Multilingual Workforce', desc: 'Managing HR communications and services for employees from diverse language backgrounds.' },
    { label: 'Multi-Property Complexity', desc: 'Running separate HR policies, payroll structures, and staffing needs across hotels and branches.' },
    { label: 'Training & Certification', desc: 'Ensuring service staff meet brand standards through consistent training and tracked certifications.' },
    { label: 'Leave Coverage Planning', desc: 'Maintaining minimum staffing levels during peak seasons while processing leave fairly across teams.' },
  ];

  helps = [
    { label: 'Centralized Multi-Property HR', desc: 'Manage every hotel or branch from one platform with unified employee records, policies, and reporting.' },
    { label: 'Shift Scheduling & Attendance', desc: 'Auto-assign rotating shifts, track punches from any location, and flag coverage gaps before they become problems.' },
    { label: 'Built-in LMS for Training', desc: 'Deliver brand training, track completion, run assessments, and issue certificates — all from one system.' },
    { label: 'Mobile-First Employee Services', desc: 'Staff can submit requests, check balances, and receive HR notifications from any device, any location.' },
  ];

  modules = ['Smart Attendance', 'LMS', 'Leave Management', 'Employee Management', 'Manager Dashboard', 'Employee Services'];
}
