import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactPage {
  private formService = inject(FormService);
  submitted = signal(false);
  sending   = signal(false);

  form = {
    company: '',
    employees: '',
    industry: '',
    name: '',
    jobTitle: '',
    email: '',
    phone: '',
    message: '',
  };

  employeeRanges = [
    '1 – 50 employees',
    '51 – 200 employees',
    '201 – 500 employees',
    '501 – 1,000 employees',
    '1,000+ employees',
  ];

  industries = [
    'Aviation & Airlines',
    'Hospitality',
    'Healthcare',
    'Retail & FMCG',
    'Government & Public',
    'Other',
  ];

  trustIndustries = ['Aviation', 'Hospitality', 'Healthcare', 'Retail', 'Government'];

  perks = [
    { label: 'Personalized product walkthrough', icon: 'M15 10l4.553-2.069A1 1 0 0121 8.82V15.18a1 1 0 01-1.447.89L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
    { label: 'Module recommendations for your needs', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Guidance for implementation and setup', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { label: 'No commitment required', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  submit() {
    if (!this.form.name || !this.form.email || !this.form.company) return;
    this.sending.set(true);
    this.formService.send({
      company:   this.form.company,
      employees: this.form.employees,
      industry:  this.form.industry,
      name:      this.form.name,
      job_title: this.form.jobTitle,
      email:     this.form.email,
      phone:     this.form.phone,
      message:   this.form.message,
    }, 'New NAS HR Demo Request').subscribe(() => {
      this.sending.set(false);
      this.submitted.set(true);
    });
  }
}
