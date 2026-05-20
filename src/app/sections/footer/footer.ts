import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  @Input() lang: 'en' | 'ar' = 'en';
  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }

  year = new Date().getFullYear();

  cols = [
    {
      head_en: 'Product', head_ar: 'المنتج',
      links: [
        { en: 'All Modules', ar: 'جميع الوحدات', route: '/modules/all-features' },
        { en: 'Pricing', ar: 'الأسعار', route: '/pricing' },
        { en: 'Why NAS HR', ar: 'لماذا ناس HR', route: '/why-nas' },
        { en: 'Ask NAS AI', ar: 'اسأل ناس AI', route: '/modules/ask-nas-ai' },
      ],
    },
    {
      head_en: 'Solutions', head_ar: 'الحلول',
      links: [
        { en: 'Aviation', ar: 'الطيران', route: '/solutions/aviation' },
        { en: 'Hospitality', ar: 'الضيافة', route: '/solutions/hospitality' },
        { en: 'Healthcare', ar: 'الرعاية الصحية', route: '/solutions/healthcare' },
        { en: 'Retail & FMCG', ar: 'التجزئة', route: '/solutions/retail-fmcg' },
        { en: 'Government', ar: 'الحكومة', route: '/solutions/government' },
      ],
    },
    {
      head_en: 'Support', head_ar: 'الدعم',
      links: [
        { en: 'Contact Us', ar: 'تواصل معنا', route: '/contact' },
        { en: 'FAQs', ar: 'الأسئلة الشائعة', route: '/faqs' },
        { en: 'Request a Demo', ar: 'احجز عرضاً', route: '/contact' },
      ],
    },
    {
      head_en: 'Legal', head_ar: 'القانونية',
      links: [
        { en: 'Privacy Policy', ar: 'سياسة الخصوصية', route: null },
        { en: 'Terms of Service', ar: 'شروط الخدمة', route: null },
        { en: 'Cookie Policy', ar: 'سياسة الكوكيز', route: null },
      ],
    },
  ];
}
