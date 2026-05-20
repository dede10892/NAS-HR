import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pricing',
  imports: [RouterLink, FormsModule],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
})
export class PricingPage {

  /* ── Form fields ─────────────────────────────────── */
  form = {
    firstName : '',
    lastName  : '',
    email     : '',
    phone     : '',
    jobTitle  : '',
    company   : '',
    message   : '',
  };

  selectedIndustry = signal<string>('');
  selectedSize     = signal<string>('');
  selectedModules  = signal<string[]>([]);
  submitted        = signal(false);

  /* ── Industries ──────────────────────────────────── */
  industries = [
    {
      value: 'retail',
      label: 'Retail',
      icon: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
    },
    {
      value: 'healthcare',
      label: 'Healthcare',
      icon: 'M22 12h-4l-3 9L9 3l-3 9H2',
    },
    {
      value: 'hospitality',
      label: 'Hospitality',
      icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10',
    },
    {
      value: 'aviation',
      label: 'Aviation',
      icon: 'M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z',
    },
    {
      value: 'government',
      label: 'Government',
      icon: 'M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11',
    },
    {
      value: 'manufacturing',
      label: 'Manufacturing',
      icon: 'M12 2l9 4.9V17L12 22l-9-5.1V7L12 2zM12 2v20M3 7l9 5 9-5',
    },
    {
      value: 'logistics',
      label: 'Logistics',
      icon: 'M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
    },
    {
      value: 'other',
      label: 'Other',
      icon: 'M4 6h16M4 12h16M4 18h16',
    },
  ];

  /* ── Company sizes ───────────────────────────────── */
  companySizes = [
    { value: '1-50',    label: '1 – 50',     sub: 'Small team'        },
    { value: '51-200',  label: '51 – 200',   sub: 'Growing company'   },
    { value: '201-500', label: '201 – 500',  sub: 'Mid-size business' },
    { value: '501-1k',  label: '501 – 1,000',sub: 'Large org'         },
    { value: '1k+',     label: '1,000+',     sub: 'Enterprise'        },
  ];

  /* ── Module interests ────────────────────────────── */
  modules = [
    'Employee Management',
    'Attendance & Fingerprint',
    'Leave & Requests',
    'Payroll & Salary Reports',
    'Mobile ESS App',
    'Manager Dashboard',
    'Learning Management (LMS)',
    'Internal Job Board',
    'Ask NAS AI',
  ];

  toggleModule(m: string): void {
    this.selectedModules.update(list =>
      list.includes(m) ? list.filter(x => x !== m) : [...list, m]
    );
  }

  isModuleSelected(m: string): boolean {
    return this.selectedModules().includes(m);
  }

  submitForm(): void {
    this.submitted.set(true);
  }

  /* ── FAQs ────────────────────────────────────────── */
  openFaq = signal<number | null>(null);

  faqs = [
    {
      q: 'How is NAS HR priced?',
      a: 'NAS HR pricing is tailored to your company — based on team size, selected modules, and implementation scope. Fill out the form and our team will prepare a custom proposal.',
    },
    {
      q: 'Can we start with selected modules and expand later?',
      a: 'Yes. NAS HR is built to grow with you. Start with the modules that matter most today, and expand to others as your operations scale.',
    },
    {
      q: 'Is there a minimum contract length?',
      a: 'Most clients start with an annual contract. We offer flexible arrangements for larger organizations with specific requirements.',
    },
    {
      q: 'Is onboarding and training included?',
      a: 'Yes. Every NAS HR engagement includes a structured onboarding process, user training, and a dedicated point of contact during go-live.',
    },
    {
      q: 'How long does implementation take?',
      a: 'Implementation timelines vary by scope. A standard deployment typically takes 2–6 weeks. We work with your team to plan and execute at your pace.',
    },
  ];

  toggleFaq(i: number): void {
    this.openFaq.update(v => v === i ? null : i);
  }
}
