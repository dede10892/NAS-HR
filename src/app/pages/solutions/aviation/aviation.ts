import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-aviation',
  imports: [RouterLink],
  templateUrl: './aviation.html',
  styleUrl: './aviation.scss',
})
export class AviationPage {
  activeChallenge = signal(0);

  challenges = [
    { label: 'Complex Shift Scheduling', desc: 'Managing rotating crew shifts, split duties, and 24/7 operations across ground, cabin, and technical staff.' },
    { label: 'Compliance Tracking', desc: 'Keeping employee records, certifications, and license renewals up to date across large regulated workforces.' },
    { label: 'Multi-Entity HR', desc: 'Coordinating HR processes across ground handling, catering, cargo, and maintenance subsidiaries.' },
    { label: 'High Employee Turnover', desc: 'Onboarding, training, and offboarding large seasonal and contractual workforces efficiently.' },
    { label: 'Leave & Absence Management', desc: 'Handling leave requests for round-the-clock staff while maintaining operational coverage standards.' },
    { label: 'Dispersed Workforce', desc: 'Supporting employees across terminals, hangars, and remote locations with mobile-first HR access.' },
  ];

  helps = [
    { label: 'Shift & Attendance Automation', desc: 'Manage rotating shifts, track punches from multiple locations, and sync attendance data for payroll-ready reports.' },
    { label: 'Document & Certificate Tracking', desc: 'Keep employee certifications, medical records, and license expiries in one place with automated alerts.' },
    { label: 'Multi-Entity Support', desc: 'Run HR across multiple subsidiaries and cost centers from a single platform with unified reporting.' },
    { label: 'Mobile Employee Services', desc: 'Give every crew member and ground staff instant mobile access to leave, requests, HR letters, and payslips.' },
  ];

  modules = ['Smart Attendance', 'Leave Management', 'Employee Management', 'Reports & Salary', 'Manager Dashboard', 'Employee Services'];
}
