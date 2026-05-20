import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent {
  @Input() lang: 'en' | 'ar' = 'en';
  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }

  form = { name: '', email: '', company: '', phone: '', message: '' };
  submitted = false;

  submit() { this.submitted = true; }

  perks = [
    { en: 'Free 30-min live demo', ar: 'عرض مباشر مجاني 30 دقيقة' },
    { en: 'No credit card required', ar: 'لا بطاقة ائتمانية مطلوبة' },
    { en: 'Compliance-ready from day one', ar: 'جاهز للامتثال من اليوم الأول' },
    { en: 'Dedicated onboarding support', ar: 'دعم تأهيل مخصص' },
  ];
}
