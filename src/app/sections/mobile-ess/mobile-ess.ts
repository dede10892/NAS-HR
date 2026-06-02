import {
  Component, Input, signal,
  OnInit, OnDestroy, Inject, PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-mobile-ess',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-ess.html',
  styleUrl: './mobile-ess.scss',
})
export class MobileEssComponent implements OnInit, OnDestroy {
  @Input() lang: 'en' | 'ar' = 'en';
  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }

  activeTab     = signal<'mobile' | 'platform'>('mobile');
  activeScreen  = signal(0);
  private timer?: ReturnType<typeof setInterval>;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) this.startCycle();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  private startCycle(): void {
    this.timer = setInterval(() => this.switchTo((this.activeScreen() + 1) % 3), 3400);
  }

  switchTo(i: number): void {
    if (i === this.activeScreen()) return;
    clearInterval(this.timer);
    this.activeScreen.set(i);
    if (this.isBrowser) this.startCycle();
  }

  screens = [
    { label: 'Check-In',  labelAr: 'تسجيل الحضور' },
    { label: 'Requests',  labelAr: 'الطلبات'       },
    { label: 'Payslip',   labelAr: 'الراتب'        },
    { label: 'Reports',   labelAr: 'التقارير'      },
  ];

  capabilities = [
    { title: 'Smart Automation',     titleAr: 'أتمتة ذكية',
      desc:  'Automate approvals, workflows, and repetitive HR tasks end-to-end.',
      descAr: 'أتمتة الموافقات وسير العمل ومهام الموارد البشرية المتكررة من البداية للنهاية.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { title: 'Real-time Analytics',  titleAr: 'تحليلات فورية',
      desc:  'Live dashboards and custom reports for fast, informed decisions.',
      descAr: 'لوحات تحكم مباشرة وتقارير مخصصة لاتخاذ قرارات سريعة ومبنية على البيانات.',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { title: 'Mobile-First Access',  titleAr: 'وصول عبر الجوال',
      desc:  'Full HR access for every employee from any device, anywhere.',
      descAr: 'وصول كامل لكل موظف لبيانات الموارد البشرية من أي جهاز وفي أي مكان.',
      icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
    { title: 'AI-Powered Assistant', titleAr: 'مساعد بالذكاء الاصطناعي',
      desc:  'Ask NAS AI handles requests, queries, and HR actions instantly.',
      descAr: 'يتعامل NAS AI مع الطلبات والاستفسارات وإجراءات الموارد البشرية بشكل فوري.',
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { title: 'Compliance & Legal',   titleAr: 'الامتثال والالتزام القانوني',
      desc:  'Built-in labour law support, audit trails, and role-based access.',
      descAr: 'دعم مدمج لقانون العمل ومسارات التدقيق والصلاحيات المخصصة لكل دور.',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { title: 'Multi-Entity Support', titleAr: 'دعم تعدد الكيانات',
      desc:  'Manage HR across multiple companies and branches from one platform.',
      descAr: 'إدارة موارد بشرية موحدة لشركات وفروع متعددة من منصة واحدة متكاملة.',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  ];

  hrFeatures = [
    { en: 'Real-time workforce analytics',    ar: 'تحليلات فورية للقوى العاملة' },
    { en: 'Automated payroll & WPS export',   ar: 'رواتب آلية وتصدير WPS' },
    { en: 'Compliance alerts & audit trails', ar: 'تنبيهات الامتثال القانوني وسجلات التدقيق' },
    { en: 'Bulk approvals & smart workflows', ar: 'موافقات جماعية وسير عمل ذكي' },
  ];

  features = [
    { en: 'View & download payslips anytime',      ar: 'عرض كشوف الراتب وتنزيلها في أي وقت'              },
    { en: 'Apply for leave with one tap',          ar: 'تقديم طلب إجازة بنقرة واحدة'                      },
    { en: 'Approve requests on the go',            ar: 'الموافقة على الطلبات أثناء التنقل'                 },
    { en: 'Clock in/out with GPS verification',    ar: 'تسجيل الحضور والانصراف بالتحقق من الموقع الجغرافي'},
    { en: 'View team attendance and schedules',    ar: 'عرض سجل حضور الفريق والجداول الزمنية'              },
    { en: 'Instant HR notifications and updates',  ar: 'إشعارات تحديثات الموارد البشرية فورياً'            },
  ];
}
