import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.HomePage),
  },

  // ── Module pages ──
  {
    path: 'modules/all-features',
    loadComponent: () =>
      import('./pages/modules/all-features/all-features').then(m => m.AllFeaturesPage),
  },
  {
    path: 'modules/smart-attendance',
    loadComponent: () =>
      import('./pages/smart-attendance/smart-attendance').then(m => m.SmartAttendancePage),
  },
  {
    path: 'modules/ask-nas-ai',
    loadComponent: () =>
      import('./pages/modules/ask-nas-ai/ask-nas-ai').then(m => m.AskNasAiPage),
  },
  {
    path: 'modules/manager-dashboard',
    loadComponent: () =>
      import('./pages/modules/manager-dashboard/manager-dashboard').then(m => m.ManagerDashboardPage),
  },
  {
    path: 'modules/reports-salary',
    loadComponent: () =>
      import('./pages/modules/reports-salary/reports-salary').then(m => m.ReportsSalaryPage),
  },
  {
    path: 'modules/internal-jobs',
    loadComponent: () =>
      import('./pages/modules/internal-jobs/internal-jobs').then(m => m.InternalJobsPage),
  },
  {
    path: 'modules/lms',
    loadComponent: () =>
      import('./pages/modules/lms/lms').then(m => m.LmsPage),
  },
  {
    path: 'modules/services',
    loadComponent: () =>
      import('./pages/modules/services/services').then(m => m.ServicesPage),
  },

  // ── Solution pages ──
  {
    path: 'solutions/aviation',
    loadComponent: () =>
      import('./pages/solutions/aviation/aviation').then(m => m.AviationPage),
  },
  {
    path: 'solutions/hospitality',
    loadComponent: () =>
      import('./pages/solutions/hospitality/hospitality').then(m => m.HospitalityPage),
  },
  {
    path: 'solutions/healthcare',
    loadComponent: () =>
      import('./pages/solutions/healthcare/healthcare').then(m => m.HealthcarePage),
  },
  {
    path: 'solutions/retail-fmcg',
    loadComponent: () =>
      import('./pages/solutions/retail-fmcg/retail-fmcg').then(m => m.RetailFmcgPage),
  },
  {
    path: 'solutions/government',
    loadComponent: () =>
      import('./pages/solutions/government/government').then(m => m.GovernmentPage),
  },

  // ── Standalone pages ──
  {
    path: 'why-nas',
    loadComponent: () =>
      import('./pages/why-nas/why-nas').then(m => m.WhyNasPage),
  },
  {
    path: 'pricing',
    loadComponent: () =>
      import('./pages/pricing/pricing').then(m => m.PricingPage),
  },
  {
    path: 'faqs',
    loadComponent: () =>
      import('./pages/faqs/faqs').then(m => m.FaqsPage),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact').then(m => m.ContactPage),
  },

  { path: '**', redirectTo: '' },
];
