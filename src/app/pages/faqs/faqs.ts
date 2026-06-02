import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-faqs',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './faqs.html',
  styleUrl: './faqs.scss',
})
export class FaqsPage {
  openCategory = signal(0);
  activeFaq    = signal<string | null>(null);
  searchQuery  = signal('');

  toggleCategory(i: number) {
    this.openCategory.set(i);
    this.activeFaq.set(null);
    this.searchQuery.set('');
  }

  toggleQuestion(key: string) {
    this.activeFaq.update(v => v === key ? null : key);
  }

  clearSearch() { this.searchQuery.set(''); }

  readonly searchResults = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) return [];
    const results: { catLabel: string; catIcon: string; q: string; a: string; key: string }[] = [];
    this.categories.forEach((cat, ci) => {
      cat.faqs.forEach((faq, fi) => {
        if (faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q)) {
          results.push({ catLabel: cat.label, catIcon: cat.icon, q: faq.q, a: faq.a, key: `search-${ci}-${fi}` });
        }
      });
    });
    return results;
  });

  readonly isSearching  = computed(() => this.searchQuery().trim().length > 0);
  readonly totalFaqs    = computed(() => this.categories.reduce((s, c) => s + c.faqs.length, 0));

  categories = [
    {
      label: 'General',
      icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      faqs: [
        {
          q: 'What is NAS HR?',
          a: 'NAS HR is an intelligent people platform that connects HR, attendance, employee services, reports, learning, AI assistance, and manager visibility in one platform.',
        },
        {
          q: 'What makes NAS HR different from other HR systems?',
          a: 'NAS HR is built around the connected flow of work — employee submits, manager approves, HR acts, data updates, employee is notified. Every module shares data and nothing lives in isolation.',
        },
        {
          q: 'Can NAS HR adapt to company workflows?',
          a: 'Yes. NAS HR can support custom workflows, policies, organization structures, entities, projects, employees, and departments.',
        },
        {
          q: 'Can we start with selected modules and expand later?',
          a: 'Yes. NAS HR can be implemented based on company priorities and expanded over time as your needs grow.',
        },
      ],
    },
    {
      label: 'Modules',
      icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
      faqs: [
        {
          q: 'What modules are included in NAS HR?',
          a: 'NAS HR includes All Features, Ask NAS AI, Manager Dashboard, Reports & Salary, Internal Jobs, LMS, and Services.',
        },
        {
          q: 'Can we use only specific modules?',
          a: 'Yes. NAS HR is modular. You can activate the modules that match your current needs and add more as you grow.',
        },
        {
          q: 'What is the Manager Dashboard?',
          a: 'The Manager Dashboard gives managers real-time visibility over team attendance, pending approvals, leave requests, and department activity from one connected view.',
        },
        {
          q: 'What does the LMS module include?',
          a: 'The LMS module allows companies to assign courses, track employee learning progress, run assessments, and issue certificates — all connected to career development.',
        },
        {
          q: 'What are the Internal Jobs module capabilities?',
          a: 'The Internal Jobs module lets HR publish internal vacancies, allows employees to apply, and helps managers and HR review applications — supporting career mobility from within.',
        },
      ],
    },
    {
      label: 'Mobile App',
      icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
      faqs: [
        {
          q: 'What can employees do from the mobile app?',
          a: 'Employees can access attendance, leave requests, permissions, HR letters, assets, internal jobs, notifications, and other services directly from the NAS HR mobile app.',
        },
        {
          q: 'Does the app support English and Arabic?',
          a: 'Yes. The NAS HR mobile experience supports both English and Arabic.',
        },
        {
          q: 'Is the mobile app available on iOS and Android?',
          a: 'Yes. The NAS HR mobile app is available on the App Store, Google Play, and Huawei AppGallery.',
        },
        {
          q: 'Can employees track their approval status from the app?',
          a: 'Yes. Employees receive real-time notifications and can track the status of every submitted request directly from the mobile app.',
        },
      ],
    },
    {
      label: 'Reports & Salary',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      faqs: [
        {
          q: 'What reports does NAS HR provide?',
          a: 'NAS HR provides salary insights, payroll-ready reports, attendance reports, leave reports, employee reports, department reports, and custom report options.',
        },
        {
          q: 'Can attendance data be connected to salary calculations?',
          a: 'Yes. NAS HR connects attendance, penalties, approved requests, and employee records to generate salary-ready data for HR and finance teams.',
        },
        {
          q: 'Can reports be exported?',
          a: 'Yes. NAS HR supports data exports to support payroll processing and HR reporting workflows.',
        },
      ],
    },
    {
      label: 'AI Assistant',
      icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
      faqs: [
        {
          q: 'What is Ask NAS AI?',
          a: 'Ask NAS AI is the built-in intelligent HR assistant inside NAS HR. Employees and managers can ask HR questions, submit requests, check balances, and get policy answers through a conversational interface.',
        },
        {
          q: 'What can Ask NAS AI help with?',
          a: 'Ask NAS AI can help with requests, policies, attendance, courses, leave balance, HR letters, internal jobs, manager approvals, and salary-related insights.',
        },
        {
          q: 'Does Ask NAS AI support Arabic?',
          a: 'Yes. Ask NAS AI supports both English and Arabic prompts and responses.',
        },
      ],
    },
    {
      label: 'Implementation',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      faqs: [
        {
          q: 'How long does implementation take?',
          a: 'Most NAS HR implementations go live within a few weeks. The timeline depends on the modules selected, number of employees, and the complexity of configurations.',
        },
        {
          q: 'What does the onboarding process look like?',
          a: 'Our team guides you through configuration, data migration, employee setup, and training. Every client gets a dedicated onboarding specialist to ensure a smooth go-live.',
        },
        {
          q: 'Can we import existing employee data?',
          a: 'Yes. NAS HR supports structured data imports during implementation. Our team provides templates and assistance for employee data migration.',
        },
        {
          q: 'Is training provided for HR admins and managers?',
          a: 'Yes. NAS HR provides role-specific training for HR administrators, managers, and IT teams. Training is included in the onboarding process.',
        },
      ],
    },
  ];
}
