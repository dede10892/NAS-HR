import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Industry {
  key:        string;
  en:         string;
  ar:         string;
  icon:       string;
  desc_en:    string;
  desc_ar:    string;
  workforce:  { label_en: string; label_ar: string; icon: string }[];
  challenges: { en: string; ar: string }[];
  helps:      { en: string; ar: string }[];
  outcome_en: string;
  outcome_ar: string;
  modules:    { label_en: string; label_ar: string; icon: string }[];
}

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './industries.html',
  styleUrl: './industries.scss',
})
export class IndustriesComponent {
  @Input() lang: 'en' | 'ar' = 'en';
  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }

  active   = signal(0);
  animating = signal(false);

  switchTo(i: number) {
    if (i === this.active()) return;
    this.animating.set(true);
    setTimeout(() => {
      this.active.set(i);
      this.animating.set(false);
    }, 180);
  }

  get ind(): Industry { return this.industries[this.active()]; }

  readonly industries: Industry[] = [
    {
      key: 'healthcare',
      en: 'Healthcare', ar: 'الرعاية الصحية',
      icon: '🏥',
      desc_en: 'Manage doctors, nurses, admin teams, rotating shifts, compliance, and employee requests in one connected HR system.',
      desc_ar: 'إدارة الأطباء والممرضين وفرق الإدارة والمناوبات والامتثال والطلبات في نظام موارد بشرية واحد.',
      workforce: [
        { label_en: 'Doctors',       label_ar: 'الأطباء',          icon: '👨‍⚕️' },
        { label_en: 'Nurses',        label_ar: 'الممرضون',         icon: '👩‍⚕️' },
        { label_en: 'Admin Staff',   label_ar: 'الموظفون الإداريون', icon: '🧑‍💼' },
        { label_en: 'Support Staff', label_ar: 'طاقم الدعم',        icon: '🙋' },
      ],
      challenges: [
        { en: 'Rotating shifts',     ar: 'مناوبات متناوبة' },
        { en: 'Overtime tracking',   ar: 'تتبع الأوقات الإضافية' },
        { en: 'Compliance training', ar: 'تدريب الامتثال' },
        { en: 'Leave coverage',      ar: 'تغطية الإجازات' },
        { en: 'Manual follow-ups',   ar: 'متابعة يدوية' },
      ],
      helps: [
        { en: 'Shift scheduling',     ar: 'جدولة المناوبات' },
        { en: 'Attendance tracking',  ar: 'تتبع الحضور' },
        { en: 'Document management',  ar: 'إدارة الوثائق' },
        { en: 'Leave approvals',      ar: 'اعتماد الإجازات' },
        { en: 'Training records',     ar: 'سجلات التدريب' },
      ],
      outcome_en: 'Better workforce coverage and compliant HR operations.',
      outcome_ar: 'تغطية أفضل للقوى العاملة وعمليات موارد بشرية متوافقة.',
      modules: [
        { label_en: 'Attendance', label_ar: 'الحضور',    icon: '📅' },
        { label_en: 'Shifts',     label_ar: 'المناوبات', icon: '🕐' },
        { label_en: 'Documents',  label_ar: 'الوثائق',   icon: '📁' },
        { label_en: 'Approvals',  label_ar: 'الموافقات', icon: '✅' },
        { label_en: 'LMS',        label_ar: 'التعلم',    icon: '🎓' },
      ],
    },
    {
      key: 'retail',
      en: 'Retail', ar: 'التجزئة',
      icon: '🛍️',
      desc_en: 'Support store teams, head office employees, and multi-branch operations with connected HR workflows.',
      desc_ar: 'دعم فرق المتاجر وموظفي المكتب الرئيسي وعمليات الفروع المتعددة.',
      workforce: [
        { label_en: 'Store Staff',  label_ar: 'موظفو المتاجر', icon: '🏪' },
        { label_en: 'Cashiers',     label_ar: 'أمناء الصندوق', icon: '💳' },
        { label_en: 'Supervisors',  label_ar: 'المشرفون',      icon: '👔' },
        { label_en: 'Head Office',  label_ar: 'المكتب الرئيسي', icon: '🏢' },
      ],
      challenges: [
        { en: 'Multi-branch teams',     ar: 'فرق متعددة الفروع' },
        { en: 'Shift coverage',         ar: 'تغطية المناوبات' },
        { en: 'Attendance visibility',  ar: 'رؤية الحضور' },
        { en: 'Fast approvals',         ar: 'موافقات سريعة' },
      ],
      helps: [
        { en: 'Multi-branch HRIS',       ar: 'نظام موارد بشرية متعدد الفروع' },
        { en: 'Shift scheduling',        ar: 'جدولة المناوبات' },
        { en: 'Attendance tracking',     ar: 'تتبع الحضور' },
        { en: 'Employee self-service',   ar: 'الخدمة الذاتية للموظفين' },
        { en: 'Training visibility',     ar: 'رؤية التدريب' },
      ],
      outcome_en: 'Clear visibility across stores and faster people operations.',
      outcome_ar: 'رؤية واضحة عبر المتاجر وعمليات أسرع للأفراد.',
      modules: [
        { label_en: 'Attendance',   label_ar: 'الحضور',      icon: '📅' },
        { label_en: 'Shifts',       label_ar: 'المناوبات',   icon: '🕐' },
        { label_en: 'Approvals',    label_ar: 'الموافقات',   icon: '✅' },
        { label_en: 'LMS',          label_ar: 'التعلم',      icon: '🎓' },
        { label_en: 'Performance',  label_ar: 'الأداء',      icon: '📊' },
      ],
    },
    {
      key: 'construction',
      en: 'Construction', ar: 'الإنشاءات',
      icon: '🏗️',
      desc_en: 'Manage site workers, engineers, project teams, and attendance across multiple locations.',
      desc_ar: 'إدارة عمال المواقع والمهندسين وفرق المشاريع والحضور عبر مواقع متعددة.',
      workforce: [
        { label_en: 'Site Workers',   label_ar: 'عمال المواقع',  icon: '👷' },
        { label_en: 'Engineers',      label_ar: 'المهندسون',     icon: '🦺' },
        { label_en: 'Supervisors',    label_ar: 'المشرفون',      icon: '👔' },
        { label_en: 'Project Admin',  label_ar: 'إدارة المشروع', icon: '📋' },
      ],
      challenges: [
        { en: 'Site-based workforce',  ar: 'قوى عاملة ميدانية' },
        { en: 'Project locations',     ar: 'مواقع المشاريع' },
        { en: 'Manual attendance',     ar: 'حضور يدوي' },
        { en: 'Workforce documents',   ar: 'وثائق القوى العاملة' },
        { en: 'Clearance delays',      ar: 'تأخير التخليص' },
      ],
      helps: [
        { en: 'Location attendance',     ar: 'حضور حسب الموقع' },
        { en: 'Employee records',        ar: 'سجلات الموظفين' },
        { en: 'Asset management',        ar: 'إدارة الأصول' },
        { en: 'Leave approvals',         ar: 'اعتماد الإجازات' },
        { en: 'Offboarding clearance',   ar: 'تخليص إنهاء الخدمة' },
      ],
      outcome_en: 'Better control across sites, workers, and project teams.',
      outcome_ar: 'تحكم أفضل عبر المواقع والعمال وفرق المشاريع.',
      modules: [
        { label_en: 'Site Attendance', label_ar: 'حضور الموقع', icon: '📍' },
        { label_en: 'Assets',          label_ar: 'الأصول',      icon: '🔧' },
        { label_en: 'Approvals',       label_ar: 'الموافقات',   icon: '✅' },
        { label_en: 'Documents',       label_ar: 'الوثائق',     icon: '📁' },
        { label_en: 'Payroll',         label_ar: 'الرواتب',     icon: '💰' },
      ],
    },
    {
      key: 'education',
      en: 'Education', ar: 'التعليم',
      icon: '🎓',
      desc_en: 'Connect academic, administrative, and support teams through one intelligent people system.',
      desc_ar: 'ربط الفرق الأكاديمية والإدارية وفرق الدعم عبر نظام ذكي واحد للأفراد.',
      workforce: [
        { label_en: 'Teachers',        label_ar: 'المعلمون',    icon: '👩‍🏫' },
        { label_en: 'Admin Staff',     label_ar: 'الإداريون',   icon: '🧑‍💼' },
        { label_en: 'Dept. Heads',     label_ar: 'رؤساء الأقسام', icon: '🏫' },
        { label_en: 'Support Staff',   label_ar: 'طاقم الدعم',  icon: '🙋' },
      ],
      challenges: [
        { en: 'Department workflows',    ar: 'سير عمل الأقسام' },
        { en: 'Staff records',           ar: 'سجلات الموظفين' },
        { en: 'Attendance visibility',   ar: 'رؤية الحضور' },
        { en: 'Training progress',       ar: 'تقدم التدريب' },
      ],
      helps: [
        { en: 'Centralized HRIS',         ar: 'نظام موارد بشرية مركزي' },
        { en: 'Attendance management',    ar: 'إدارة الحضور' },
        { en: 'Learning tracking',        ar: 'تتبع التعلم' },
        { en: 'Department approvals',     ar: 'موافقات الأقسام' },
        { en: 'Org structure',            ar: 'الهيكل التنظيمي' },
      ],
      outcome_en: 'More organized HR operations for schools and institutions.',
      outcome_ar: 'عمليات موارد بشرية أكثر تنظيماً للمدارس والمؤسسات.',
      modules: [
        { label_en: 'Attendance',    label_ar: 'الحضور',          icon: '📅' },
        { label_en: 'LMS',           label_ar: 'التعلم',           icon: '🎓' },
        { label_en: 'Approvals',     label_ar: 'الموافقات',        icon: '✅' },
        { label_en: 'Records',       label_ar: 'السجلات',          icon: '📋' },
        { label_en: 'Org Structure', label_ar: 'الهيكل التنظيمي', icon: '🏛️' },
      ],
    },
    {
      key: 'hospitality',
      en: 'Hospitality', ar: 'الضيافة',
      icon: '🏨',
      desc_en: 'Simplify HR operations for hotels, restaurants, guest experience teams, and service staff.',
      desc_ar: 'تبسيط عمليات الموارد البشرية للفنادق والمطاعم وفرق تجربة الضيوف.',
      workforce: [
        { label_en: 'Front Desk',       label_ar: 'مكتب الاستقبال', icon: '🛎️' },
        { label_en: 'Housekeeping',     label_ar: 'التدبير المنزلي', icon: '🧹' },
        { label_en: 'F&B Staff',        label_ar: 'الأغذية والمشروبات', icon: '🍽️' },
        { label_en: 'Guest Experience', label_ar: 'تجربة الضيوف',    icon: '⭐' },
      ],
      challenges: [
        { en: 'Flexible shifts',      ar: 'مناوبات مرنة' },
        { en: 'Service coverage',     ar: 'تغطية الخدمة' },
        { en: 'High turnover',        ar: 'دوران عالٍ للموظفين' },
        { en: 'Onboarding speed',     ar: 'سرعة الإدماج' },
      ],
      helps: [
        { en: 'Shift management',         ar: 'إدارة المناوبات' },
        { en: 'Attendance tracking',      ar: 'تتبع الحضور' },
        { en: 'Employee app',             ar: 'تطبيق الموظف' },
        { en: 'Fast onboarding',          ar: 'إدماج سريع' },
        { en: 'Performance visibility',   ar: 'رؤية الأداء' },
      ],
      outcome_en: 'Smoother daily operations and a better employee experience.',
      outcome_ar: 'عمليات يومية أكثر سلاسة وتجربة أفضل للموظف.',
      modules: [
        { label_en: 'Shifts',       label_ar: 'المناوبات',  icon: '🕐' },
        { label_en: 'Attendance',   label_ar: 'الحضور',     icon: '📅' },
        { label_en: 'Onboarding',   label_ar: 'الإدماج',    icon: '🚀' },
        { label_en: 'Approvals',    label_ar: 'الموافقات',  icon: '✅' },
        { label_en: 'Performance',  label_ar: 'الأداء',     icon: '📊' },
      ],
    },
    {
      key: 'manufacturing',
      en: 'Manufacturing', ar: 'التصنيع',
      icon: '🏭',
      desc_en: 'Manage factory workers, production teams, shifts, overtime, and payroll-ready HR operations.',
      desc_ar: 'إدارة عمال المصانع وفرق الإنتاج والمناوبات والوقت الإضافي وعمليات الموارد البشرية.',
      workforce: [
        { label_en: 'Production',    label_ar: 'الإنتاج',          icon: '⚙️' },
        { label_en: 'Shift Supvrs.', label_ar: 'مشرفو المناوبات',  icon: '👔' },
        { label_en: 'Quality Team',  label_ar: 'فريق الجودة',      icon: '🔍' },
        { label_en: 'Warehouse',     label_ar: 'المستودع',         icon: '📦' },
      ],
      challenges: [
        { en: 'Shift-based workforce',  ar: 'قوى عاملة بالمناوبات' },
        { en: 'Overtime tracking',      ar: 'تتبع الأوقات الإضافية' },
        { en: 'Worker documents',       ar: 'وثائق العمال' },
        { en: 'Payroll accuracy',       ar: 'دقة الرواتب' },
      ],
      helps: [
        { en: 'Attendance control',    ar: 'ضبط الحضور' },
        { en: 'Overtime management',   ar: 'إدارة الأوقات الإضافية' },
        { en: 'Shift scheduling',      ar: 'جدولة المناوبات' },
        { en: 'Payroll-ready data',    ar: 'بيانات جاهزة للرواتب' },
        { en: 'Document management',   ar: 'إدارة الوثائق' },
      ],
      outcome_en: 'Accurate workforce data from factory floor to payroll.',
      outcome_ar: 'بيانات دقيقة للقوى العاملة من أرضية المصنع إلى الرواتب.',
      modules: [
        { label_en: 'Attendance',  label_ar: 'الحضور',     icon: '📅' },
        { label_en: 'Overtime',    label_ar: 'الإضافي',    icon: '⏱️' },
        { label_en: 'Shifts',      label_ar: 'المناوبات',  icon: '🕐' },
        { label_en: 'Documents',   label_ar: 'الوثائق',    icon: '📁' },
        { label_en: 'Payroll',     label_ar: 'الرواتب',    icon: '💰' },
      ],
    },
  ];

  readonly benefits = [
    { icon: '🔄', en: 'Save Time',        ar: 'وفّر الوقت',           sub_en: 'Automate repetitive HR processes',       sub_ar: 'أتمتة عمليات الموارد البشرية المتكررة' },
    { icon: '🛡️', en: 'Stay Compliant',   ar: 'ابقَ ممتثلاً',         sub_en: 'Ensure policy and labor law compliance', sub_ar: 'ضمان الامتثال لسياسات وقوانين العمل' },
    { icon: '📈', en: 'Improve Accuracy', ar: 'حسّن الدقة',           sub_en: 'Reduce errors and keep data up to date', sub_ar: 'تقليل الأخطاء والحفاظ على دقة البيانات' },
    { icon: '🙌', en: 'Empower People',   ar: 'مكّن موظفيك',          sub_en: 'Give employees a better experience',     sub_ar: 'امنح الموظفين تجربة أفضل' },
  ];
}
