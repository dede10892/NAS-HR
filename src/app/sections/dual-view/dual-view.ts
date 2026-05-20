import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dual-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dual-view.html',
  styleUrl: './dual-view.scss',
})
export class DualViewComponent {
  @Input() lang: 'en' | 'ar' = 'en';
  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }

  tab = signal<'hr' | 'agent'>('hr');

  hrFeatures = [
    { en: 'Real-time workforce analytics',   ar: 'تحليلات القوى العاملة الفورية' },
    { en: 'Automated payroll & WPS export',  ar: 'رواتب آلية وتصدير WPS' },
    { en: 'Compliance alerts & audit trails', ar: 'تنبيهات الامتثال وسجلات التدقيق' },
    { en: 'Bulk approvals & smart workflows', ar: 'موافقات جماعية وسير عمل ذكي' },
  ];

  agentFeatures = [
    { en: 'Instant payslip & leave balances',  ar: 'كشف راتب فوري وأرصدة الإجازات' },
    { en: 'One-tap leave & overtime requests', ar: 'طلب إجازة أو إضافي بنقرة واحدة' },
    { en: 'GPS clock-in via mobile',           ar: 'تسجيل الحضور بـ GPS من الجوال' },
    { en: 'AI-powered HR assistant chat',      ar: 'مساعد موارد بشرية بالذكاء الاصطناعي' },
  ];

  chatMessages = [
    { role: 'user', en: 'How many leave days do I have left?', ar: 'كم يوم إجازة تبقى لديّ؟' },
    { role: 'agent', en: 'You have 18 annual leave days remaining this year. Would you like to submit a request?', ar: 'لديك 18 يوم إجازة سنوية متبقية. هل تريد تقديم طلب؟' },
    { role: 'user', en: 'Yes, request 3 days from next Monday', ar: 'نعم، اطلب 3 أيام من الاثنين القادم' },
    { role: 'agent', en: 'Leave request submitted ✓ Your manager has been notified.', ar: 'تم إرسال طلب الإجازة ✓ تم إبلاغ مديرك.' },
  ];
}
