import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountUpDirective } from '../../directives/count-up.directive';

@Component({
  selector: 'app-why-choose-us',
  imports: [CommonModule, CountUpDirective],
  templateUrl: './why-choose-us.html',
  styleUrl: './why-choose-us.scss',
})
export class WhyChooseUsComponent {
  @Input() lang: 'en' | 'ar' = 'en';
  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }

  stats = [
    { value: '500+',  en: 'Companies',        ar: 'شركة' },
    { value: '15+',   en: 'Years Experience', ar: 'سنة خبرة' },
    { value: '99.9%', en: 'Uptime SLA',       ar: 'وقت تشغيل' },
    { value: '5+',    en: 'Industries Served', ar: 'قطاع يخدمها' },
  ];

  reasons = [
    { en: 'Built for Modern Workforces', ar: 'مبني لبيئة العمل الحديثة', desc_en: 'Designed from the ground up for modern HR operations — attendance, approvals, payroll-ready data, and Arabic RTL interfaces.', desc_ar: 'مصمم لعمليات الموارد البشرية الحديثة — الحضور والموافقات والبيانات الجاهزة للرواتب.' },
    { en: 'Seamless Integrations',     ar: 'تكاملات سلسة',             desc_en: 'Native connectors for Oracle, SAP, Microsoft 365, biometrics, and banking systems.', desc_ar: 'موصلات أصلية لـ Oracle وSAP وMicrosoft 365 والأنظمة البنكية.' },
    { en: 'Enterprise-Grade Security', ar: 'أمان على مستوى المؤسسات', desc_en: 'ISO 27001 certified, role-based access, full audit trails, and encrypted data at rest.', desc_ar: 'معتمد ISO 27001 وصلاحيات متدرجة وتشفير كامل للبيانات.' },
    { en: 'Dedicated Local Support',   ar: 'دعم محلي مخصص',           desc_en: '24/7 Arabic and English support from a dedicated team — not a chatbot.', desc_ar: 'دعم بالعربية والإنجليزية على مدار الساعة من فريق متخصص.' },
    { en: 'Fast Implementation',       ar: 'تنفيذ سريع',              desc_en: 'Go live in as little as 2 weeks with dedicated onboarding specialists.', desc_ar: 'انطلق خلال أسبوعين مع متخصصين في التأهيل.' },
    { en: 'Scalable by Design',        ar: 'قابل للتوسع',             desc_en: 'From 10 to 10,000 employees — NAS HR grows with your organisation.', desc_ar: 'من 10 إلى 10,000 موظف — NAS HR ينمو مع مؤسستك.' },
  ];
}
