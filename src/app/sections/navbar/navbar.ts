import {
  Component, HostListener
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
      en: 'Smart Attendance',     ar: 'الحضور والانصراف الذكي',
      desc_en: 'Fingerprint & GPS location verification',
      desc_ar: 'تسجيل الحضور بالبصمة والموقع الجغرافي',
      route: '/modules/smart-attendance',
    },
    {
      svgD: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
      en: 'Ask NAS AI',            ar: 'مساعد NAS AI',
      desc_en: 'Intelligent HR assistant powered by AI',
      desc_ar: 'مساعد الموارد البشرية الذكي المدعوم بالذكاء الاصطناعي',
      route: '/modules/ask-nas-ai',
    },
    {
      svgD: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
      en: 'NAS - HR Dashboard',    ar: 'لوحة تحكم NAS HR',
      desc_en: 'Complete HR visibility in one unified dashboard',
      desc_ar: 'رؤية شاملة لعمليات الموارد البشرية في لوحة تحكم موحدة',
      route: '/modules/hr-dashboard',
    },
    {
      svgD: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6',
      en: 'Internal Jobs',         ar: 'الوظائف الداخلية',
      desc_en: 'Career mobility and internal hiring',
      desc_ar: 'فرص التطور الوظيفي والتوظيف الداخلي',
      route: '/modules/internal-jobs',
    },
    {
      svgD: 'M18 20V10 M12 20V4 M6 20v-6',
      en: 'Reports & Salary',      ar: 'التقارير والرواتب',
      desc_en: 'Analytics, payslips and salary overview',
      desc_ar: 'تقارير تفصيلية وكشوف رواتب جاهزة للصرف',
      route: '/modules/reports-salary',
    },
    {
      svgD: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      en: 'LMS',                   ar: 'نظام إدارة التعلم',
      desc_en: 'Training, courses, and certifications',
      desc_ar: 'التدريب والتعلم والدورات والشهادات المهنية',
      route: '/modules/lms',
    },
  ];

  solutions = [
    { en: 'Aviation & Airlines',  ar: 'الطيران والخطوط الجوية',       route: '/solutions/aviation' },
    { en: 'Hospitality',           ar: 'قطاع الضيافة والفنادق',        route: '/solutions/hospitality' },
    { en: 'Healthcare',            ar: 'الرعاية الصحية والعيادات',     route: '/solutions/healthcare' },
    { en: 'Retail & FMCG',         ar: 'قطاع التجزئة والسلع الاستهلاكية', route: '/solutions/retail-fmcg' },
    { en: 'Government & Public',  ar: 'القطاع الحكومي والعام',         route: '/solutions/government' },
  ];

}
