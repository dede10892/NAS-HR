import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lms',
  imports: [RouterLink],
  templateUrl: './lms.html',
  styleUrl: './lms.scss',
})
export class LmsPage {
  activeStep = signal(0);

  learningFlow = [
    {
      label: 'Assign Course',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      desc: 'HR or managers assign courses to individual employees, teams, or entire departments — with deadlines and priorities.',
    },
    {
      label: 'Employee Learns',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      desc: 'Employees access their courses through the NAS HR mobile app or web portal — at their own pace, in Arabic or English.',
    },
    {
      label: 'Quiz or Assessment',
      icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      desc: 'At the end of each course, employees complete a quiz or assessment to demonstrate knowledge and unlock the next step.',
    },
    {
      label: 'Certificate Issued',
      icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
      desc: 'NAS HR automatically issues a digital certificate on course completion — visible in the employee profile.',
    },
    {
      label: 'Progress Tracked',
      icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
      desc: 'HR and managers track completion rates, assessment scores, and learning progress across the whole team in real time.',
    },
    {
      label: 'Career Development',
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      desc: 'Learning progress connects to employee performance and career development plans — closing the loop from training to growth.',
    },
  ];

  value = [
    { label: 'Builds employee skills', desc: 'Structured courses that connect to real job requirements.' },
    { label: 'Supports structured training', desc: 'Assign, track, and report on training across the company.' },
    { label: 'Improves visibility over learning', desc: 'See who has completed what — in real time.' },
    { label: 'Connects learning to performance', desc: 'Learning progress feeds into employee performance data.' },
    { label: 'Encourages employee development', desc: 'Certificates and progress tracking motivate employees to grow.' },
  ];
}
