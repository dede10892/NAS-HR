import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faqs',
  imports: [CommonModule],
  templateUrl: './faqs.html',
  styleUrl: './faqs.scss',
})
export class FaqsComponent {
  @Input() lang: 'en' | 'ar' = 'en';
  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }
  openIndex: number | null = null;

  toggle(i: number) { this.openIndex = this.openIndex === i ? null : i; }

  faqs = [
    {
      q_en: 'How long does implementation take?',
      q_ar: 'كم تستغرق عملية التنفيذ؟',
      a_en: 'Most clients go live within 2–4 weeks. We assign a dedicated implementation specialist who handles data migration, configuration, and staff training.',
      a_ar: 'يبدأ معظم العملاء التشغيل خلال 2–4 أسابيع. نعيّن متخصصاً مخصصاً للتنفيذ يتولى ترحيل البيانات والإعداد والتدريب.',
    },
    {
      q_en: 'Is NAS HR compliance-ready?',
      q_ar: 'هل NAS HR جاهز للامتثال؟',
      a_en: 'Yes. NAS HR supports structured approval workflows, employee records, audit trails, role-based access, and end-of-service workflows to keep your HR operations compliant and organised.',
      a_ar: 'نعم. يدعم NAS HR سير عمل الموافقات المنظمة وسجلات الموظفين ومسارات التدقيق والوصول القائم على الأدوار وسير عمل نهاية الخدمة.',
    },
    {
      q_en: 'Can it integrate with our existing ERP or accounting software?',
      q_ar: 'هل يمكن تكاملهمع برنامج ERP أو المحاسبة الحالي؟',
      a_en: 'Yes. NAS HR has native integrations with Oracle, SAP, Microsoft Dynamics, QuickBooks, and a REST API for custom integrations.',
      a_ar: 'نعم. يتكامل NAS HR بشكل أصلي مع Oracle وSAP وMicrosoft Dynamics وQuickBooks وواجهة REST API للتكاملات المخصصة.',
    },
    {
      q_en: 'Is employee data secure?',
      q_ar: 'هل بيانات الموظفين آمنة؟',
      a_en: 'Security is our top priority. NAS HR is ISO 27001 certified, uses AES-256 encryption at rest, TLS in transit, and full audit logs for every change.',
      a_ar: 'الأمان أولويتنا القصوى. NAS HR معتمد ISO 27001 ويستخدم تشفير AES-256 وTLS وسجلات تدقيق كاملة لكل تغيير.',
    },
    {
      q_en: 'Do you offer a free trial or demo?',
      q_ar: 'هل تقدمون نسخة تجريبية أو عرضاً توضيحياً مجانياً؟',
      a_en: 'Absolutely. Book a live 30-minute demo with one of our product specialists and we\'ll walk you through a full instance configured for your industry.',
      a_ar: 'بالتأكيد. احجز عرضاً توضيحياً مباشراً لمدة 30 دقيقة مع أحد متخصصي المنتج وسنرشدك عبر نسخة كاملة مهيأة لقطاعك.',
    },
  ];
}
