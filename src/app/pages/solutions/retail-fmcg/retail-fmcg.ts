import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-retail-fmcg',
  imports: [RouterLink],
  templateUrl: './retail-fmcg.html',
  styleUrl: './retail-fmcg.scss',
})
export class RetailFmcgPage {
  activeChallenge = signal(0);

  challenges = [
    { label: 'Distributed Store Workforce', desc: 'Coordinating HR across dozens of stores, branches, and distribution centers with different managers.' },
    { label: 'High Turnover & Constant Onboarding', desc: 'Rapid onboarding of part-time, seasonal, and new hires to keep shelves and service levels maintained.' },
    { label: 'Shift Planning for Peak Periods', desc: 'Scaling staffing during weekends, promotions, and peak seasons without disrupting core operations.' },
    { label: 'Product Training at Scale', desc: 'Rolling out product knowledge, compliance, and brand training to thousands of floor staff.' },
    { label: 'Payroll Accuracy Across Branches', desc: 'Consolidating attendance data from multiple locations for accurate, consistent payroll processing.' },
    { label: 'Internal Career Mobility', desc: 'Retaining top performers by giving them visibility into internal vacancies and promotion opportunities.' },
  ];

  helps = [
    { label: 'Multi-Branch HR in One View', desc: 'See attendance, requests, and approvals across all stores and branches from a single manager dashboard.' },
    { label: 'Shift Automation & Attendance', desc: 'Assign shifts by branch, capture punches from any device or location, and sync with payroll.' },
    { label: 'Digital Training Delivery', desc: 'Push product, compliance, and onboarding training to staff phones — track who completed what.' },
    { label: 'Internal Mobility & Retention', desc: 'Post internal vacancies and let high-potential employees apply for roles across your organization.' },
  ];

  modules = ['Smart Attendance', 'LMS', 'Internal Jobs', 'Manager Dashboard', 'Reports & Salary', 'Employee Services'];
}
