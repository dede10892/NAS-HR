import { Component, signal, afterNextRender, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RevealService } from './services/reveal.service';
import { NavbarComponent } from './sections/navbar/navbar';
import { FooterComponent } from './sections/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  lang = signal<'en' | 'ar'>('en');
  private reveal = inject(RevealService);

  constructor() {
    afterNextRender(() => this.reveal.init());
  }

  toggleLang() {
    const next = this.lang() === 'en' ? 'ar' : 'en';
    this.lang.set(next);
    document.documentElement.lang = next;
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.body.style.fontFamily = next === 'ar'
      ? 'var(--nas-font-ar)'
      : 'var(--nas-font-en)';
  }
}
