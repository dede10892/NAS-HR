import { Component, Input, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Industry {
  id: string;
  name: string;        nameAr: string;
  shortName: string;   shortNameAr: string;
  tagline: string;     taglineAr: string;
  challenges: string[];    challengesAr: string[];
  solutions: string[];     solutionsAr: string[];
  route: string;
}

@Component({
  selector: 'app-solutions-by-industry',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './solutions-by-industry.html',
  styleUrl: './solutions-by-industry.scss',
})
export class SolutionsByIndustryComponent implements OnInit, OnDestroy {
  @Input() lang: 'en' | 'ar' = 'en';

  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }

  active       = signal(0);
  contentReady = signal(true);
  progress     = signal(0); // 0–100

  private readonly CYCLE_MS = 5000;
  private readonly TICK_MS  = 80;
  private elapsed = 0;
  private paused  = false;
  private ticker?: ReturnType<typeof setInterval>;
  private transTimer?: ReturnType<typeof setTimeout>;

  ngOnInit()    { this.startTicker(); }
  ngOnDestroy() { clearInterval(this.ticker); clearTimeout(this.transTimer); }

  select(i: number): void {
    this.resetProgress();
    if (i === this.active()) return;
    clearTimeout(this.transTimer);
    this.contentReady.set(false);
    this.transTimer = setTimeout(() => {
      this.active.set(i);
      this.contentReady.set(true);
    }, 220);
  }

  pauseAuto()  { this.paused = true;  }
  resumeAuto() { this.paused = false; }

  get current(): Industry { return this.industries[this.active()]; }

  /** SVG path `d` strings for each industry — used in both tabs and banner */
  readonly iconPaths: Record<string, string[]> = {
    aviation:    ['M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z'],
    hospitality: ['M3 22V8l9-6 9 6v14', 'M9 22v-6h6v6'],
    healthcare:  ['M22 12h-4l-3 9L9 3l-3 9H2'],
    retail:      ['M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z', 'M3 6h18', 'M16 10a4 4 0 0 1-8 0'],
    government:  ['M3 22h18', 'M6 18V11', 'M10 18V11', 'M14 18V11', 'M18 18V11', 'M12 2L2 7h20z'],
  };

  private resetProgress() {
    this.elapsed = 0;
    this.progress.set(0);
  }

  private startTicker() {
    clearInterval(this.ticker);
    this.ticker = setInterval(() => {
      if (this.paused) return;
      this.elapsed += this.TICK_MS;
      this.progress.set(Math.min(Math.round((this.elapsed / this.CYCLE_MS) * 100), 100));
      if (this.elapsed >= this.CYCLE_MS) {
        this.resetProgress();
        clearTimeout(this.transTimer);
        const next = (this.active() + 1) % this.industries.length;
        this.contentReady.set(false);
        this.transTimer = setTimeout(() => {
          this.active.set(next);
          this.contentReady.set(true);
        }, 220);
      }
    }, this.TICK_MS);
  }

  industries: Industry[] = [
    {
      id: 'aviation', route: '/solutions/aviation',
      name: 'Aviation & Airlines',  nameAr: 'الطيران والخطوط الجوية',
      shortName: 'Aviation',        shortNameAr: 'الطيران',
      tagline: 'Keep every crew, hub and compliance clock in sync.',
      taglineAr: 'حافظ على تزامن كل طاقم ومركز وساعة امتثال.',
      challenges: [
        'Shift-based crews across multiple hubs and time zones',
        'Complex rostering compliance and rest period rules',
        'High turnover among ground and cabin staff',
        'License and certification tracking and renewals',
        'Multi-country payroll and regulatory demands',
      ],
      challengesAr: [
        'أطقم عمل متعاقبة عبر مراكز ومناطق زمنية متعددة',
        'الامتثال لجداول العمل المعقدة وقواعد فترات الراحة',
        'معدل دوران عالٍ بين موظفي الأرض والطاقم',
        'تتبع التراخيص والشهادات وتجديداتها',
        'كشوف رواتب متعددة الدول ومتطلبات تنظيمية',
      ],
      solutions: [
        'Automated shift scheduling and roster management',
        'Multi-entity HR across countries and hubs',
        'Mobile ESS app for on-the-go crew access',
        'Certification tracking with expiry alerts',
        'Real-time attendance and overtime visibility',
      ],
      solutionsAr: [
        'جدولة مناوبات آلية وإدارة قوائم الأطقم',
        'موارد بشرية متعددة الكيانات عبر الدول والمراكز',
        'تطبيق خدمة ذاتية للطاقم أثناء التنقل',
        'تتبع الشهادات مع تنبيهات انتهاء الصلاحية',
        'رؤية فورية للحضور والعمل الإضافي',
      ],
    },
    {
      id: 'hospitality', route: '/solutions/hospitality',
      name: 'Hospitality',       nameAr: 'الضيافة والفنادق',
      shortName: 'Hospitality',  shortNameAr: 'الضيافة',
      tagline: 'Run every property like your best-reviewed one.',
      taglineAr: 'أدِر كل عقار كأفضل عقاراتك تقييماً.',
      challenges: [
        'Seasonal workforce spikes and last-minute staffing',
        'High turnover across front-of-house teams',
        'Payroll with service charges, tips and allowances',
        'Coordinating HR across multiple properties',
        'Language barriers within diverse staff teams',
      ],
      challengesAr: [
        'ارتفاعات موسمية في القوى العاملة واحتياجات توظيف طارئة',
        'معدل دوران عالٍ بين فرق الاستقبال',
        'رواتب تشمل رسوم خدمة وإكراميات وبدلات',
        'تنسيق الموارد البشرية عبر عقارات متعددة',
        'حواجز لغوية بين فرق عمل متنوعة',
      ],
      solutions: [
        'Flexible workforce planning with seasonal workflows',
        'Multi-property HR from a single dashboard',
        'Payroll engine for charges, tips and allowances',
        'Mobile app for shift swaps and requests',
        'Fully bilingual platform — Arabic and English',
      ],
      solutionsAr: [
        'تخطيط مرن للقوى العاملة مع سير عمل موسمي',
        'إدارة موارد بشرية متعددة العقارات من لوحة واحدة',
        'محرك رواتب يدعم الرسوم والإكراميات والبدلات',
        'تطبيق موبايل لتبادل المناوبات وتقديم الطلبات',
        'منصة ثنائية اللغة بالكامل — عربي وإنجليزي',
      ],
    },
    {
      id: 'healthcare', route: '/solutions/healthcare',
      name: 'Healthcare',      nameAr: 'الرعاية الصحية',
      shortName: 'Healthcare', shortNameAr: 'الصحة',
      tagline: "Precision HR for teams that can't afford mistakes.",
      taglineAr: 'موارد بشرية دقيقة لفرق لا تتحمل الأخطاء.',
      challenges: [
        '24/7 rotating shifts for clinical and non-clinical staff',
        'Tracking medical licenses, DHA/MOH credentials',
        'Strict health authority HR compliance',
        'Managing permanent, locum, and contract staff',
        'Complex leave rules for on-call medical teams',
      ],
      challengesAr: [
        'مناوبات دوارة على مدار الساعة للكوادر السريرية وغيرها',
        'تتبع التراخيص الطبية وبيانات هيئة الصحة',
        'امتثال صارم لأنظمة الموارد البشرية الصحية',
        'إدارة موظفين دائمين ومؤقتين وبعقود',
        'قواعد إجازات معقدة للفرق الطبية المناوبة',
      ],
      solutions: [
        'Rotating shift planning with fatigue rules built in',
        'Credential management with automatic expiry alerts',
        'Full audit trails and role-based access controls',
        'Multi-contract type support and billing integration',
        'Leave and overtime aligned with health authority rules',
      ],
      solutionsAr: [
        'تخطيط مناوبات دوارة مع قواعد الإجهاد مدمجة',
        'إدارة البيانات مع تنبيهات انتهاء الصلاحية التلقائية',
        'مسارات تدقيق كاملة وضوابط وصول مخصصة',
        'دعم أنواع عقود متعددة وتكامل مع الفوترة',
        'إجازات وعمل إضافي متوافق مع قواعد هيئات الصحة',
      ],
    },
    {
      id: 'retail', route: '/solutions/retail',
      name: 'Retail & FMCG',         nameAr: 'التجزئة والسلع الاستهلاكية',
      shortName: 'Retail',            shortNameAr: 'التجزئة',
      tagline: 'Scale your people ops as fast as you open stores.',
      taglineAr: 'طوّر عمليات موظفيك بسرعة توسعك.',
      challenges: [
        'Full-time, part-time and seasonal staff all at once',
        'High turnover and rapid onboarding across branches',
        'Branch-level visibility and performance tracking',
        'Commission and incentive-based payroll',
        'HR ops spanning hundreds of store locations',
      ],
      challengesAr: [
        'موظفون بدوام كامل وجزئي وموسميون في آنٍ واحد',
        'دوران عالٍ واحتياجات إعداد سريعة عبر الفروع',
        'رؤية على مستوى الفروع وتتبع الأداء',
        'رواتب مرتبطة بالعمولات والحوافز',
        'عمليات موارد بشرية عبر مئات المواقع',
      ],
      solutions: [
        'Branch HR management with group-level reporting',
        'Flexible payroll with commissions and bonuses',
        'Digital onboarding for high-volume hiring cycles',
        'Mobile self-service for store staff anywhere',
        'Real-time workforce analytics across all branches',
      ],
      solutionsAr: [
        'إدارة موارد بشرية للفروع مع تقارير على مستوى المجموعة',
        'رواتب مرنة مع عمولات ومكافآت',
        'إعداد رقمي لدورات التوظيف الكبيرة',
        'خدمة ذاتية عبر الجوال لموظفي المتاجر في أي مكان',
        'تحليلات فورية للقوى العاملة عبر جميع الفروع',
      ],
    },
    {
      id: 'government', route: '/solutions/government',
      name: 'Government & Public',         nameAr: 'الجهات الحكومية والقطاع العام',
      shortName: 'Government',             shortNameAr: 'الحكومة',
      tagline: 'Full compliance. Zero compromise.',
      taglineAr: 'امتثال كامل. لا تنازل.',
      challenges: [
        'Strict local labour law and regulatory audits',
        'Complex grade, band and salary scale structures',
        'Multi-level approval chains for every transaction',
        'Large headcounts with detailed reporting obligations',
        'Tamper-proof audit trails at all times',
      ],
      challengesAr: [
        'قانون عمل محلي صارم ومتطلبات تدقيق تنظيمي',
        'هياكل درجات وفئات وجداول رواتب معقدة',
        'سلاسل موافقات متعددة المستويات لكل معاملة',
        'أعداد كبيرة مع التزامات تقارير مفصلة',
        'مسارات تدقيق غير قابلة للتلاعب في جميع الأوقات',
      ],
      solutions: [
        'Local labour law compliance, built-in and auto-updated',
        'Configurable grade-based payroll structure engine',
        'Multi-tier workflows for public sector approvals',
        'Bulk employee management and headcount reporting',
        'Immutable audit logs with role-based access controls',
      ],
      solutionsAr: [
        'امتثال لقانون العمل المحلي مدمج ومحدَّث تلقائياً',
        'محرك رواتب قابل للتهيئة بناءً على الدرجات',
        'سير عمل متعدد المستويات لموافقات القطاع العام',
        'إدارة الموظفين بالجملة وتقارير الأعداد',
        'سجلات تدقيق غير قابلة للتغيير مع ضوابط وصول',
      ],
    },
  ];
}
