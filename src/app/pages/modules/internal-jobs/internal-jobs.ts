import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-internal-jobs',
  imports: [RouterLink],
  templateUrl: './internal-jobs.html',
  styleUrl: './internal-jobs.scss',
})
export class InternalJobsPage {
  activeStep = signal(0);

  flow = [
    {
      label: 'HR Publishes Vacancy',
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      desc: 'HR creates and publishes an internal vacancy with role details, requirements, and department visibility settings.',
    },
    {
      label: 'Employee Discovers Job',
      icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      desc: 'Employees browse available internal positions from the mobile app or portal — filtered by department and level.',
    },
    {
      label: 'Employee Applies',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      desc: 'Employees submit their application through a structured flow — directly from the NAS HR mobile app.',
    },
    {
      label: 'Manager or HR Reviews',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
      desc: 'HR or the hiring manager reviews applications, shortlists candidates, and moves them through the approval stages.',
    },
    {
      label: 'Application Status Updates',
      icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
      desc: 'Employees receive real-time status updates on their applications — applied, under review, shortlisted, or closed.',
    },
  ];

  features = [
    'Publish Internal Vacancies',
    'Employee Applications',
    'Application Tracking',
    'HR Review & Shortlisting',
    'Career Mobility Support',
    'Department-Based Visibility',
  ];

  value = [
    { label: 'Improves internal career growth', desc: 'Employees see and pursue real opportunities within the company.' },
    { label: 'Supports talent retention', desc: 'Keep your best people by giving them a path to grow.' },
    { label: 'Reduces external hiring dependency', desc: 'Fill roles from within before going to the open market.' },
    { label: 'Gives employees visibility', desc: 'Everyone sees what opportunities are available to them.' },
    { label: 'Helps HR organise internal applications', desc: 'Track and manage all internal applications in one place.' },
  ];
}
