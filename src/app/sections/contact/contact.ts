import { Component, Input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent {
  @Input() lang: 'en' | 'ar' = 'en';
  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }

  private formService = inject(FormService);

  form = { name: '', email: '', company: '', phone: '', message: '' };
  submitted = false;
  sending   = signal(false);

  submit() {
    this.sending.set(true);
    this.formService.send({
      name:    this.form.name,
      email:   this.form.email,
      company: this.form.company,
      phone:   this.form.phone,
      message: this.form.message,
    }, 'New NAS HR Contact Request').subscribe(() => {
      this.sending.set(false);
      this.submitted = true;
    });
  }

  perks = [
    { en: 'Free 30-min live demo', ar: 'عرض مباشر مجاني 30 دقيقة' },
    { en: 'No credit card required', ar: 'لا بطاقة ائتمانية مطلوبة' },
    { en: 'Compliance-ready from day one', ar: 'جاهز للامتثال من اليوم الأول' },
    { en: 'Dedicated onboarding support', ar: 'دعم تأهيل مخصص' },
  ];
}
