import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('wordmarkRow') wordmarkRow!: ElementRef<HTMLElement>;

  private observer?: IntersectionObserver;
  wordmarkVisible = false;
  readonly wmChars = 'NAS HR'.split('').map(c => c === ' ' ? ' ' : c);

  constructor(private cdr: ChangeDetectorRef) {}

  year = new Date().getFullYear();

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.wordmarkVisible = true;
          this.cdr.detectChanges();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    this.observer.observe(this.wordmarkRow.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  cols = [
    {
      head_en: 'Product', head_ar: 'المنتج',
      links: [
        { en: 'All Modules', ar: 'جميع الوحدات', route: '/modules/all-features' },
        { en: 'Pricing', ar: 'الأسعار', route: '/pricing' },
        { en: 'Why NAS HR', ar: 'لماذا NAS HR', route: '/why-nas' },
        { en: 'Ask NAS AI', ar: 'مساعد NAS AI', route: '/modules/ask-nas-ai' },
      ],
    },
    {
      head_en: 'Solutions', head_ar: 'الحلول',
      links: [
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
  ];
}
