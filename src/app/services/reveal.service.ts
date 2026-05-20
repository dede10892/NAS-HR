import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RevealService {
  private observer!: IntersectionObserver;
  private mutationObserver!: MutationObserver;

  init(): void {
    /* ── IntersectionObserver — adds .is-visible when element enters viewport ── */
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
    );

    /* Observe all current reveal elements */
    this.observeAll();

    /* ── MutationObserver — watch for new elements added by lazy-loaded routes ── */
    this.mutationObserver = new MutationObserver(() => {
      this.observeAll();
    });

    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  private observeAll(): void {
    document
      .querySelectorAll(
        '.reveal:not(.is-visible):not(.reveal-observed),' +
        '.reveal-up:not(.is-visible):not(.reveal-observed),' +
        '.reveal-left:not(.is-visible):not(.reveal-observed),' +
        '.reveal-right:not(.is-visible):not(.reveal-observed),' +
        '.reveal-scale:not(.is-visible):not(.reveal-observed),' +
        '.reveal-stagger > *:not(.is-visible):not(.reveal-observed)'
      )
      .forEach(el => {
        el.classList.add('reveal-observed');
        this.observer.observe(el);
      });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.mutationObserver?.disconnect();
  }
}
