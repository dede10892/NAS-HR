import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Company {
  name: string;
  logo: string; // filename inside /logos/
  width: number; // rendered width in px (keeps aspect ratios tidy)
}

@Component({
  selector: 'app-trusted-by',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trusted-by.html',
  styleUrl: './trusted-by.scss',
})
export class TrustedByComponent {
  @Input() lang: 'en' | 'ar' = 'en';
  t(en: string, ar: string) {
    return this.lang === 'ar' ? ar : en;
  }

  companies: Company[] = [
    { name: 'KAZA', logo: 'kaza.svg', width: 100 },
    { name: 'esterad', logo: 'esterad.svg', width: 110 },
    { name: '2B', logo: '2b.png', width: 80 },
    { name: 'brassbell', logo: 'brassbell.svg', width: 140 },
  ];

  // Duplicate for seamless loop
  get track(): Company[] {
    return [...this.companies, ...this.companies];
  }

  /** If logo PNG not found, replace img with a styled text fallback */
  onImgError(e: Event, name: string): void {
    const img = e.target as HTMLImageElement;
    const span = document.createElement('span');
    span.className = 'logo-fallback';
    span.textContent = name;
    img.replaceWith(span);
  }
}
