import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class FeaturesComponent implements OnInit {
  @Input() lang: 'en' | 'ar' = 'en';
  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }

  visible = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { this.visible = true; observer.disconnect(); } },
      { threshold: 0.08 }
    );
    observer.observe(this.el.nativeElement);
  }

  modules = [
    {
      en: 'Payroll Management', ar: 'إدارة الرواتب',
      desc_en: 'Automated payroll with WPS compliance, deductions, and multi-currency support.',
      desc_ar: 'رواتب آلية متوافقة مع WPS مع دعم متعدد العملات.',
      color: '#0f766e', light: '#ccfbf1', tag_en: 'Finance', tag_ar: 'المالية',
      art: 'payroll'
    },
    {
      en: 'Leave & Attendance', ar: 'الإجازات والحضور',
      desc_en: 'Smart leave tracking, shift scheduling, and biometric attendance integration.',
      desc_ar: 'تتبع الإجازات وجدولة المناوبات وتكامل البصمة.',
      color: '#0369a1', light: '#e0f2fe', tag_en: 'Time', tag_ar: 'الوقت',
      art: 'attendance'
    },
    {
      en: 'Recruitment', ar: 'التوظيف',
      desc_en: 'End-to-end hiring pipeline — post, screen, interview, and onboard talent.',
      desc_ar: 'دورة توظيف متكاملة من النشر حتى الإعداد.',
      color: '#7c3aed', light: '#ede9fe', tag_en: 'Talent', tag_ar: 'المواهب',
      art: 'recruitment'
    },
    {
      en: 'Performance Reviews', ar: 'تقييم الأداء',
      desc_en: 'Set OKRs, run appraisals, and track employee growth with visual dashboards.',
      desc_ar: 'ضع أهدافاً وأجرِ تقييمات وتابع النمو بلوحات مرئية.',
      color: '#b45309', light: '#fef3c7', tag_en: 'Growth', tag_ar: 'النمو',
      art: 'performance'
    },
    {
      en: 'Employee Self-Service', ar: 'الخدمة الذاتية',
      desc_en: 'Mobile app for payslips, leave requests, approvals, and HR updates on the go.',
      desc_ar: 'تطبيق موبايل لكشوف الراتب والإجازات والموافقات.',
      color: '#0c4a6e', light: '#e0f2fe', tag_en: 'Mobile', tag_ar: 'الجوال',
      art: 'mobile'
    },
    {
      en: 'HR Analytics', ar: 'تحليلات الموارد البشرية',
      desc_en: 'Real-time workforce insights, headcount trends, and custom report builder.',
      desc_ar: 'تحليلات فورية للقوى العاملة وبناء تقارير مخصصة.',
      color: '#065f46', light: '#d1fae5', tag_en: 'Insights', tag_ar: 'التحليل',
      art: 'analytics'
    },
    {
      en: 'Onboarding', ar: 'الإعداد الوظيفي',
      desc_en: 'Digital onboarding checklists, document collection, and first-day workflows.',
      desc_ar: 'قوائم تأهيل رقمية وجمع وثائق وسير عمل اليوم الأول.',
      color: '#be185d', light: '#fce7f3', tag_en: 'People', tag_ar: 'الموظفون',
      art: 'onboarding'
    },
    {
      en: 'Compliance & Legal', ar: 'الامتثال والقانون',
      desc_en: 'Support structured approvals, end-of-service workflows, audit trails, and role-based access.',
      desc_ar: 'دعم الموافقات المنظمة وسير عمل نهاية الخدمة ومسارات التدقيق والوصول المخصص.',
      color: '#1e3a5f', light: '#dbeafe', tag_en: 'Legal', tag_ar: 'القانون',
      art: 'compliance'
    },
  ];
}
