import {
  Component, Input, Output, EventEmitter, HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
  @Input() lang: 'en' | 'ar' = 'en';
  @Output() langToggle = new EventEmitter<void>();

  menuOpen = false;
  scrolled = false;
  activeDropdown: string | null = null;
  private dropdownTimer: ReturnType<typeof setTimeout> | null = null;

  @HostListener('window:scroll')
  onScroll() { this.scrolled = window.scrollY > 10; }

  openDropdown(id: string) {
    if (this.dropdownTimer) clearTimeout(this.dropdownTimer);
    this.activeDropdown = id;
  }

  closeDropdown() {
    this.dropdownTimer = setTimeout(() => { this.activeDropdown = null; }, 130);
  }

  keepDropdown() {
    if (this.dropdownTimer) clearTimeout(this.dropdownTimer);
  }

  modules = [
    {
      svgD: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 7a3 3 0 100 6 3 3 0 000-6z',
      en: 'Smart Attendance',     ar: 'الحضور الذكي',
      desc_en: 'Fingerprint & GPS location verification',
      desc_ar: 'التحقق بالبصمة والموقع الجغرافي',
      route: '/modules/smart-attendance',
    },
    {
      svgD: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
      en: 'Ask NAS AI',            ar: 'اسأل ناس AI',
      desc_en: 'Intelligent HR assistant powered by AI',
      desc_ar: 'مساعد الموارد البشرية الذكي',
      route: '/modules/ask-nas-ai',
    },
    {
      svgD: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
      en: 'Manager Dashboard',     ar: 'لوحة المدير',
      desc_en: 'Real-time team visibility and approvals',
      desc_ar: 'رؤية الفريق والموافقات في الوقت الفعلي',
      route: '/modules/manager-dashboard',
    },
    {
      svgD: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6',
      en: 'Internal Jobs',         ar: 'التنقل الوظيفي',
      desc_en: 'Career mobility and internal hiring',
      desc_ar: 'التنقل الوظيفي الداخلي',
      route: '/modules/internal-jobs',
    },
    {
      svgD: 'M18 20V10 M12 20V4 M6 20v-6',
      en: 'Reports & Salary',      ar: 'التقارير والرواتب',
      desc_en: 'Analytics, payslips and salary overview',
      desc_ar: 'التحليلات وبوابة الرواتب',
      route: '/modules/reports-salary',
    },
    {
      svgD: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      en: 'LMS',                   ar: 'نظام التعلم',
      desc_en: 'Training, courses, and certifications',
      desc_ar: 'التدريب والدورات والشهادات',
      route: '/modules/lms',
    },
  ];

  solutions = [
    { en: 'Aviation & Airlines',  ar: 'الطيران والخطوط الجوية', route: '/solutions/aviation' },
    { en: 'Hospitality',           ar: 'الضيافة والفنادق',        route: '/solutions/hospitality' },
    { en: 'Healthcare',            ar: 'الرعاية الصحية',          route: '/solutions/healthcare' },
    { en: 'Retail & FMCG',         ar: 'التجزئة والسلع الاستهلاكية', route: '/solutions/retail-fmcg' },
    { en: 'Government & Public',  ar: 'القطاع الحكومي والعام',   route: '/solutions/government' },
  ];

  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }
}
