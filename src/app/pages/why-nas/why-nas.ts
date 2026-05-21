import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-why-nas',
  imports: [RouterLink],
  templateUrl: './why-nas.html',
  styleUrl: './why-nas.scss',
})
export class WhyNasPage {
  activePillar = signal(0);
  hoveredStat  = signal<number | null>(null);

  pillars = [
    {
      label: 'Easy',
      tagline: 'Built for every user, not just HR teams',
      headline: 'Simple for everyone who uses it.',
      desc: 'NAS HR is designed to simplify daily HR work for employees, managers, and HR teams. Employees submit requests in seconds. Managers approve with one tap. HR teams see everything connected.',
      points: [
        'Less manual work',
        'Clearer processes',
        'Faster HR response',
        'Mobile-first for employees',
        'No complex training needed',
        'One app for everything',
      ],
      icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    },
    {
      label: 'Smart',
      tagline: 'AI-powered workflows that reduce friction',
      headline: 'Smarter workflows. Faster decisions.',
      desc: 'NAS HR helps teams move from manual HR follow-up to intelligent, connected workflows. From AI assistance to automated approvals, everything is designed to reduce friction and increase speed.',
      points: [
        'Ask NAS AI for instant HR answers',
        'Smart request flows',
        'Connected approval workflows',
        'Real-time manager visibility',
        'Automated employee notifications',
        'Salary-ready reporting',
      ],
      icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
    },
    {
      label: 'Complete',
      tagline: 'Every HR function in one connected system',
      headline: 'One place for every HR operation.',
      desc: 'NAS HR connects the most important HR functions into one platform. No switching between tools. No data silos. Everything from employee records to salary-ready reports lives in one connected system.',
      points: [
        'Employee records & attendance',
        'Leave requests & approvals',
        'Reports & salary-ready data',
        'Internal jobs & LMS',
        'Mobile ESS app',
        'Ask NAS AI assistant',
      ],
      icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    },
  ];

  stats = [
    { value: '3,000+', label: 'Employees managed' },
    { value: '5',      label: 'Industries served'  },
    { value: '100%',   label: 'Cloud-based'         },
    { value: '1',      label: 'Unified platform'    },
  ];

  compareRows = [
    { feature: 'Employee self-service (mobile app)', nas: true,  trad: false },
    { feature: 'Smart approval workflows',           nas: true,  trad: false },
    { feature: 'Real-time manager dashboard',        nas: true,  trad: false },
    { feature: 'AI HR assistant (Ask NAS AI)',       nas: true,  trad: false },
    { feature: 'Fingerprint / GPS attendance',       nas: true,  trad: true  },
    { feature: 'Salary-ready automated reports',     nas: true,  trad: false },
    { feature: 'Internal job board',                 nas: true,  trad: false },
    { feature: 'Learning management (LMS)',          nas: true,  trad: false },
  ];

  sections = [
    {
      eyebrow: 'Built to Make HR Easier',
      headline: 'Less manual work. Clearer processes. Faster HR response.',
      desc: 'NAS HR is designed to simplify daily HR work for everyone — employees, managers, and HR teams. Every workflow is built to reduce follow-up and make HR actions faster and more transparent.',
    },
    {
      eyebrow: 'Smarter Workflows. Faster Decisions.',
      headline: 'From manual follow-up to intelligent, connected workflows.',
      desc: 'NAS HR helps teams act faster with Ask NAS AI, smart request flows, connected approval chains, real-time manager visibility, and salary-ready reporting — all working together.',
    },
    {
      eyebrow: 'One Place for Every HR Operation',
      headline: 'Every essential HR capability, connected.',
      desc: 'Employee records, attendance, leave, services, manager dashboard, reports, salary data, internal jobs, LMS, and Ask NAS AI — all in one platform that shares data across every workflow.',
    },
  ];

  impactMetrics = [
    { num: '70%',    label: 'Less time on HR admin',       icon: '⏱' },
    { num: '3×',     label: 'Faster approval cycles',      icon: '⚡' },
    { num: '100%',   label: 'Paperless HR operations',     icon: '☁' },
    { num: '1',      label: 'Platform for everything HR',  icon: '🔗' },
  ];

  modules = [
    { name: 'Smart Attendance', icon: '📍' },
    { name: 'Leave & Requests', icon: '📋' },
    { name: 'Payroll Reports',  icon: '💰' },
    { name: 'Manager Dashboard',icon: '📊' },
    { name: 'Ask NAS AI',       icon: '✦',  sky: true },
    { name: 'Internal Jobs',    icon: '💼' },
    { name: 'Learning (LMS)',   icon: '🎓' },
    { name: 'HR Services',      icon: '🛎' },
  ];
}
