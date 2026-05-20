import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-healthcare',
  imports: [RouterLink],
  templateUrl: './healthcare.html',
  styleUrl: './healthcare.scss',
})
export class HealthcarePage {
  activeChallenge = signal(0);

  challenges = [
    { label: 'Critical Shift Coverage', desc: 'Ensuring adequate staffing levels for clinical and support teams across all shifts without gaps.' },
    { label: 'License & Credential Compliance', desc: 'Tracking medical licenses, certifications, and mandatory renewals for clinical staff across departments.' },
    { label: 'Leave Coverage for Patient Care', desc: 'Balancing leave requests while maintaining safe patient-to-staff ratios and care continuity.' },
    { label: 'Large, Multi-Department Workforce', desc: 'Managing HR for doctors, nurses, technicians, admin, and support staff under different policies.' },
    { label: 'Mandatory Training & CPD', desc: 'Tracking continuing professional development, mandatory courses, and onboarding training completion.' },
    { label: 'Payroll Accuracy for Variable Shifts', desc: 'Calculating on-call pay, overtime, and shift differentials accurately from attendance data.' },
  ];

  helps = [
    { label: 'Credential & Document Management', desc: 'Store and track licenses, certifications, and renewal dates with automated alerts before expiry.' },
    { label: 'Shift & Attendance Automation', desc: 'Schedule shifts with coverage rules, track attendance in real-time, and generate payroll-ready reports.' },
    { label: 'CPD & Training Tracking', desc: 'Assign mandatory courses, track completion, assess knowledge, and issue certificates through the LMS.' },
    { label: 'Leave Management with Coverage Rules', desc: 'Enforce minimum staffing levels during leave approvals to protect patient care continuity.' },
  ];

  modules = ['Smart Attendance', 'LMS', 'Reports & Salary', 'Leave Management', 'Employee Management', 'Employee Services'];
}
