import {
  Component, Input, AfterViewInit, OnDestroy, ElementRef, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Service {
  svgD: string;
  en: string;
  ar: string;
  desc_en: string;
  desc_ar: string;
  color: string;
  tag_en: string;
  tag_ar: string;
  art: string;
  screenshot?: string;
}

@Component({
  selector: 'app-self-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './self-service.html',
  styleUrl: './self-service.scss',
})
export class SelfServiceComponent implements AfterViewInit, OnDestroy {
  @Input() lang: 'en' | 'ar' = 'en';
  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }

  activeIndex = 0;
  private observer: IntersectionObserver | null = null;

  services: Service[] = [
    {
      svgD: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2',
      art: 'permission', color: '#4CB4B5',
      tag_en: 'Request', tag_ar: 'طلب',
      en: 'Permission Request',
      ar: 'طلب إذن',
      desc_en: 'Step out during work hours for personal or official matters. Submit a request in seconds and get instant manager approval through automated workflows.',
      desc_ar: 'غادر خلال ساعات العمل للأمور الشخصية أو الرسمية. أرسل طلبك في ثوانٍ واحصل على موافقة المدير فوراً.',
      screenshot: '/attendence-reports/Request Permission (close) (1).png',
    },
    {
      svgD: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10',
      art: 'offsite', color: '#75DEFF',
      tag_en: 'Request', tag_ar: 'طلب',
      en: 'Offsite Work Request',
      ar: 'طلب عمل خارج المقر',
      desc_en: 'Submit requests to work remotely or from a different location. Include your reason, location, and expected duration for seamless approvals.',
      desc_ar: 'أرسل طلباً للعمل عن بُعد أو من موقع مختلف مع ذكر السبب والموقع والمدة المتوقعة.',
      screenshot: '/attendence-reports/Add visit.png',
    },
    {
      svgD: 'M8 7V3 M16 7V3 M3 11h18 M5 7h14a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z M9 16l2 2 4-4',
      art: 'vacation', color: '#0FB86A',
      tag_en: 'Request', tag_ar: 'طلب',
      en: 'Vacation Request',
      ar: 'طلب إجازة',
      desc_en: 'Plan and request annual leave in advance. View your balance, pick dates on the calendar, and track approval status in real time.',
      desc_ar: 'خطط لإجازتك السنوية مسبقاً. اعرض رصيدك، اختر التواريخ، وتابع حالة الموافقة لحظةً بلحظة.',
      screenshot: '/attendence-reports/Vacation Request.jpeg',
    },
    {
      svgD: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
      art: 'hr-letter', color: '#F79008',
      tag_en: 'Request', tag_ar: 'طلب',
      en: 'HR Letter Request',
      ar: 'طلب خطاب موارد بشرية',
      desc_en: 'Request official HR letters — salary certificates, experience letters, NOC and more — delivered digitally with company stamp.',
      desc_ar: 'اطلب خطابات الموارد البشرية الرسمية — شهادات الراتب وخطابات الخبرة وعدم الممانعة وغيرها — وتسلّمها رقمياً بختم الشركة.',
      screenshot: '/attendence-reports/Hr.jpeg',
    },
    {
      svgD: 'M1 4h22v16H1z M1 10h22',
      art: 'loan', color: '#BFAAE0',
      tag_en: 'Finance', tag_ar: 'مالية',
      en: 'Loan Request',
      ar: 'طلب سلفة أو قرض',
      desc_en: 'Apply for a company loan or salary advance. Set your repayment schedule and track monthly deductions directly from your payslip.',
      desc_ar: 'تقدّم بطلب سلفة أو قرض من الشركة. حدد خطة السداد وتابع الاستقطاعات الشهرية مباشرةً من كشف راتبك.',
      screenshot: '/attendence-reports/Request Loan (2).png',
    },
    {
      svgD: 'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9',
      art: 'resignation', color: '#F96C4D',
      tag_en: 'Offboarding', tag_ar: 'إنهاء خدمة',
      en: 'Resignation Request',
      ar: 'طلب استقالة',
      desc_en: 'Initiate your resignation formally through the system. Trigger automated handover workflows, notice period tracking, and exit interviews.',
      desc_ar: 'قدّم استقالتك رسمياً عبر النظام، مع تفعيل تلقائي لإجراءات التسليم وتتبع فترة الإشعار ومقابلة إنهاء الخدمة.',
      screenshot: '/attendence-reports/Resignation Request.jpeg',
    },
    {
      svgD: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      art: 'bonus', color: '#339699',
      tag_en: 'Finance', tag_ar: 'مالية',
      en: 'Bonus History',
      ar: 'سجل المكافآت',
      desc_en: 'View your complete bonus and incentive history, including performance bonuses, annual rewards, and special recognition payments.',
      desc_ar: 'اعرض سجل مكافآتك وحوافزك الكاملة، بما في ذلك المكافآت الأدائية والمكافآت السنوية.',
      screenshot: '/attendence-reports/Bonus History .jpeg',
    },
    {
      svgD: 'M21 21l-4.35-4.35 M11 18a7 7 0 100-14 7 7 0 000 14z',
      art: 'attendance', color: '#4CB4B5',
      tag_en: 'Insights', tag_ar: 'تقارير',
      en: 'Attendance Report',
      ar: 'تقرير الحضور',
      desc_en: 'Review your complete daily check-in and check-out history, late arrivals, and location-verified attendance records.',
      desc_ar: 'راجع سجل دخولك وخروجك اليومي الكامل، والتأخيرات، وسجلات الحضور المحققة بالموقع.',
      screenshot: '/attendence-reports/Fingerprint (3).png',
    },
    {
      svgD: 'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01',
      art: 'penalty', color: '#F14437',
      tag_en: 'Insights', tag_ar: 'تقارير',
      en: 'View Penalty History',
      ar: 'سجل المخالفات والجزاءات',
      desc_en: 'Review any deductions, warnings, or disciplinary actions applied to your record with full details and dates.',
      desc_ar: 'راجع أي استقطاعات أو إنذارات أو إجراءات تأديبية مسجّلة في ملفك مع التفاصيل الكاملة والتواريخ.',
      screenshot: '/attendence-reports/Visits.png',
    },
    {
      svgD: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      art: 'kpi', color: '#F79008',
      tag_en: 'Performance', tag_ar: 'أداء',
      en: 'View KPIs Earned',
      ar: 'مؤشرات الأداء الرئيسية المحققة',
      desc_en: 'Monitor your performance metrics, goal completion rates, and earned achievements — updated in real time by your manager.',
      desc_ar: 'تابع مؤشرات أدائك ونسب إنجاز الأهداف والإنجازات المحققة — تُحدَّث في الوقت الفعلي من قِبل مديرك.',
      screenshot: '/attendence-reports/Appraisal Empty State.png',
    },
    {
      svgD: 'M8 7V3 M16 7V3 M3 11h18 M5 7h14a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z M8 14h.01 M12 14h.01 M16 14h.01',
      art: 'holidays', color: '#0FB86A',
      tag_en: 'Calendar', tag_ar: 'تقويم',
      en: 'View Official Holidays',
      ar: 'العطل الرسمية',
      desc_en: 'Browse the full company holiday calendar, upcoming long weekends, and official public holidays.',
      desc_ar: 'تصفح تقويم العطل الرسمي للشركة وعطل نهاية الأسبوع الطويلة والأعياد الرسمية.',
      screenshot: '/attendence-reports/View Official Holidays.png',
    },
    {
      svgD: 'M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2',
      art: 'jobs', color: '#75DEFF',
      tag_en: 'Career', tag_ar: 'مسار مهني',
      en: 'View Internal Jobs',
      ar: 'الوظائف الداخلية الشاغرة',
      desc_en: 'Explore open positions within your organization. Apply for internal transfers and career growth opportunities without leaving the platform.',
      desc_ar: 'استعرض الوظائف الشاغرة داخل مؤسستك وتقدّم للانتقال الداخلي وفرص النمو المهني مباشرةً من المنصة.',
      screenshot: '/attendence-reports/intenal Jobs.jpeg',
    },
    {
      svgD: 'M2 3h20v14H2z M8 21h8 M12 17v4',
      art: 'assets', color: '#496E91',
      tag_en: 'Assets', tag_ar: 'أصول',
      en: 'View Company Assets',
      ar: 'ممتلكات الشركة المخصصة لي',
      desc_en: 'View all equipment, devices, and company property assigned to you — with serial numbers, hand-over dates, and condition status.',
      desc_ar: 'اعرض جميع المعدات والأجهزة وممتلكات الشركة المخصصة لك مع الأرقام التسلسلية وتواريخ الاستلام وحالة كل عنصر.',
      screenshot: '/attendence-reports/Asset Owners.png',
    },
    {
      svgD: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
      art: 'nasbot', color: '#4CB4B5',
      tag_en: 'AI Assistant', tag_ar: 'مساعد ذكي',
      en: 'NAS BOT',
      ar: 'مساعد NAS الذكي',
      desc_en: 'Get instant answers to your HR questions, check policies, and complete requests with the help of the NAS AI assistant — available 24/7.',
      desc_ar: 'احصل على إجابات فورية لأسئلتك في الموارد البشرية، واطّلع على السياسات، وأتمّ طلباتك بمساعدة مساعد NAS الذكي — متاح على مدار الساعة.',
      screenshot: '/attendence-reports/2B Bot (3).png',
    },
  ];

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const items = this.el.nativeElement.querySelectorAll('.service-item');
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute('data-index') ?? '0', 10);
            this.activeIndex = idx;
            this.cdr.detectChanges();
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );
    items.forEach((item: Element) => this.observer!.observe(item));
  }

  setActive(i: number) {
    this.activeIndex = i;
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
