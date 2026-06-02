import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountUpDirective } from '../../directives/count-up.directive';

@Component({
  selector: 'app-dual-view',
  standalone: true,
  imports: [CommonModule, CountUpDirective],
  templateUrl: './dual-view.html',
  styleUrl: './dual-view.scss',
})
export class DualViewComponent {
  @Input() lang: 'en' | 'ar' = 'en';
  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }

  hrFeatures = [
    { en: 'Real-time workforce analytics',    ar: 'تحليلات فورية للقوى العاملة' },
    { en: 'Automated payroll & WPS export',   ar: 'رواتب آلية وتصدير WPS' },
    { en: 'Compliance alerts & audit trails', ar: 'تنبيهات الامتثال القانوني وسجلات التدقيق' },
    { en: 'Bulk approvals & smart workflows', ar: 'موافقات جماعية وسير عمل ذكي' },
  ];
}
