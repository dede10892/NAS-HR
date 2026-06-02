import {
  Component, Input, OnInit, OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Mod {
  svgD: string;
  en: string; ar: string;
  tag_en: string; tag_ar: string;
  desc_en: string; desc_ar: string;
  features_en: string[]; features_ar: string[];
  color: string;
  route?: string;
}

@Component({
  selector: 'app-modules-showcase',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './modules-showcase.html',
  styleUrl: './modules-showcase.scss',
})
export class ModulesShowcaseComponent implements OnInit, OnDestroy {
  @Input() lang: 'en' | 'ar' = 'en';
  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }

  activeIndex = 0;
  private timer: ReturnType<typeof setInterval> | null = null;
  private paused = false;

  modules: Mod[] = [
    {
      svgD: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 7a3 3 0 100 6 3 3 0 000-6z',
      tag_en: 'Attendance', tag_ar: 'الحضور',
      en: 'Smart Attendance', ar: 'الحضور والانصراف الذكي',
      desc_en: 'GPS-verified check-in, fingerprint authentication, and real-time attendance tracking — all from mobile. Zero hardware required.',
      desc_ar: 'تسجيل الحضور بالموقع الجغرافي والبصمة ومتابعة الحضور لحظةً بلحظة — من جوال الموظف. لا حاجة لأجهزة خارجية.',
      features_en: ['GPS Location Check-in', 'Fingerprint Authentication', 'Late & Absence Alerts', 'Real-time Manager Dashboard'],
      features_ar: ['تسجيل الحضور بالموقع الجغرافي', 'التحقق بالبصمة', 'تنبيهات التأخر والغياب', 'لوحة تحكم المدير الفورية'],
      color: '#4CB4B5',
      route: '/modules/smart-attendance',
    },
    {
      svgD: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2 M9 5a2 2 0 012-2h2a2 2 0 012 2 M9 12h6 M9 16h4',
      tag_en: 'Self-Service', tag_ar: 'الخدمة الذاتية',
      en: 'Employee Self-Service', ar: 'الخدمة الذاتية للموظفين',
      desc_en: 'Empower employees with 13+ self-service actions — leaves, loans, letters, assets and more — accessible 24/7 from mobile.',
      desc_ar: 'أكثر من ١٣ إجراءً ذاتيًا للموظف — إجازات وسلف وخطابات وغيرها — متاحة من الجوال على مدار الساعة.',
      features_en: ['Vacation & Leave Requests', 'HR Letter Requests', 'Loan & Advance Requests', 'Resignation & End of Service'],
      features_ar: ['طلبات الإجازات', 'طلبات خطابات الموارد البشرية', 'طلبات السلف والقروض', 'الاستقالة وإنهاء الخدمة'],
      color: '#75DEFF',
    },
    {
      svgD: 'M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3',
      tag_en: 'Automation', tag_ar: 'الأتمتة',
      en: 'Approval Workflows', ar: 'مسارات الموافقات',
      desc_en: 'Multi-step smart approval chains that route requests to the right manager automatically. No bottlenecks, no missed approvals.',
      desc_ar: 'سلاسل موافقة ذكية متعددة المراحل تُوجّه الطلبات تلقائيًا إلى المدير المعني — دون تأخير أو إغفال.',
      features_en: ['Multi-level Approval Chains', 'Smart Routing Logic', 'Mobile Approve / Reject', 'Deadline Reminders'],
      features_ar: ['سلاسل موافقة متعددة المستويات', 'توجيه ذكي وتلقائي', 'الموافقة أو الرفض من الجوال', 'تذكيرات المواعيد النهائية'],
      color: '#0FB86A',
    },
    {
      svgD: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
      tag_en: 'AI', tag_ar: 'ذكاء اصطناعي',
      en: 'Ask NAS AI Assistant', ar: 'مساعد NAS AI الذكي',
      desc_en: 'An intelligent HR assistant that answers employee questions, guides requests, and surfaces workforce insights — available 24/7.',
      desc_ar: 'مساعد موارد بشرية ذكي يجيب على أسئلة الموظفين ويوجّه طلباتهم ويقدم رؤى فورية — متاح على مدار الساعة.',
      features_en: ['Natural Language HR Queries', 'Policy & Leave Answers', 'Smart Request Guidance', 'HR Analytics Summary'],
      features_ar: ['استفسارات الموارد البشرية بلغة طبيعية', 'سياسات الإجازات والأنظمة', 'توجيه الطلبات بذكاء', 'ملخص تحليلات الموارد البشرية'],
      color: '#BFAAE0',
    },
    {
      svgD: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12',
      tag_en: 'Assets', tag_ar: 'الأصول',
      en: 'Company Assets', ar: 'ممتلكات الشركة',
      desc_en: 'Track, assign, and manage company equipment from laptops to devices. Clearance workflows auto-trigger on offboarding.',
      desc_ar: 'تتبّع وإسناد وإدارة معدات الشركة وأجهزتها. تُفعَّل إجراءات التخليص تلقائيًا عند إنهاء الخدمة.',
      features_en: ['Asset Assignment & Tracking', 'Serial Number Registry', 'Clearance on Offboarding', 'Condition History Log'],
      features_ar: ['إسناد الأصول وتتبّعها', 'سجل الأرقام التسلسلية', 'تخليص الأصول عند الخروج', 'سجل حالة الأصول'],
      color: '#F79008',
    },
    {
      svgD: 'M22 10v6 M2 10l10-5 10 5-10 5-10-5z M6 12v5c3 3 9 3 12 0v-5',
      tag_en: 'Learning', tag_ar: 'التعلم',
      en: 'LMS & Learning', ar: 'نظام إدارة التعلم',
      desc_en: 'Assign courses, track completion, and manage certifications. Build a continuous learning culture across your organization.',
      desc_ar: 'إسناد الدورات التدريبية وتتبع الإتمام وإدارة الشهادات — لبناء ثقافة تعلم مستمرة في مؤسستك.',
      features_en: ['Course Assignment', 'Completion Tracking', 'Certification Management', 'Learning Analytics'],
      features_ar: ['إسناد الدورات التدريبية', 'تتبع إتمام التدريب', 'إدارة الشهادات المهنية', 'تحليلات التعلم'],
      color: '#75DEFF',
    },
    {
      svgD: 'M12 2v20 M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6',
      tag_en: 'Payroll', tag_ar: 'الرواتب',
      en: 'Payroll', ar: 'الرواتب',
      desc_en: 'Automated salary calculations, deductions, allowances, and digital payslip generation — fully integrated with attendance.',
      desc_ar: 'حساب تلقائي للرواتب والاستقطاعات والبدلات وإصدار قسائم الراتب الرقمية — متكامل مع الحضور.',
      features_en: ['Auto Salary Calculation', 'Allowances & Deductions', 'Digital Payslips', 'Loan Deduction Integration'],
      features_ar: ['حساب راتب تلقائي', 'البدلات والاستقطاعات', 'قسائم راتب رقمية', 'تكامل اقتطاع السلف'],
      color: '#0FB86A',
    },
    {
      svgD: 'M18 20V10 M12 20V4 M6 20v-6',
      tag_en: 'Performance', tag_ar: 'الأداء',
      en: 'Performance & KPIs', ar: 'الأداء ومؤشرات الأداء الرئيسية',
      desc_en: 'Set goals, track KPIs, and run performance cycles with real-time dashboards for managers and employees alike.',
      desc_ar: 'حدد الأهداف وتابع مؤشرات الأداء وأدِر دورات تقييم الأداء بلوحات بيانات فورية للمديرين والموظفين.',
      features_en: ['Goal Setting & Tracking', 'KPI Score Dashboard', 'Performance Cycles', 'Manager & Peer Reviews'],
      features_ar: ['تحديد الأهداف وتتبعها', 'لوحة مؤشرات الأداء الرئيسية', 'دورات تقييم الأداء', 'تقييمات المدير والزملاء'],
      color: '#F79008',
    },
    {
      svgD: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6',
      tag_en: 'Career', tag_ar: 'المسار المهني',
      en: 'Internal Jobs', ar: 'الوظائف الداخلية',
      desc_en: 'Post internal vacancies, let employees apply for transfers, and manage internal career growth — all within the platform.',
      desc_ar: 'انشر الوظائف الشاغرة داخليًا، أتِح للموظفين التقدم لفرص النقل والترقية، وأدر مسارات التطور الوظيفي.',
      features_en: ['Internal Job Board', 'Employee Applications', 'Transfer Workflows', 'Career Path Tracking'],
      features_ar: ['لوحة الوظائف الداخلية', 'طلبات الموظفين', 'مسارات النقل الوظيفي', 'تتبع المسار المهني'],
      color: '#4CB4B5',
    },
    {
      svgD: 'M3 3v18h18 M7 16l4-4 4 4 4-8',
      tag_en: 'Analytics', tag_ar: 'التحليلات',
      en: 'Reports & Analytics', ar: 'التقارير والتحليلات',
      desc_en: 'Deep HR analytics covering attendance, turnover, payroll trends, and workforce insights — exportable and real-time.',
      desc_ar: 'تحليلات شاملة لموارد بشرية تغطي الحضور ودوران الموظفين والرواتب ورؤى القوى العاملة — قابلة للتصدير ومحدّثة فوريًا.',
      features_en: ['Attendance Analytics', 'Turnover & Retention', 'Payroll Trends', 'Custom Report Builder'],
      features_ar: ['تحليلات الحضور والانصراف', 'دوران الموظفين والاحتفاظ بهم', 'مؤشرات ومسارات الرواتب', 'منشئ تقارير مخصصة'],
      color: '#F96C4D',
    },
  ];

  /** Convert hex color to rgba string */
  rgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  ngOnInit() {
    this.timer = setInterval(() => {
      if (!this.paused) {
        this.activeIndex = (this.activeIndex + 1) % this.modules.length;
      }
    }, 4000);
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  setActive(i: number) {
    this.activeIndex = i;
  }

  onTrackEnter() { this.paused = true; }
  onTrackLeave() { this.paused = false; }
}
