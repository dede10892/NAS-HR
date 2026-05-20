import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective implements OnInit, OnDestroy {
  /** The target value string, e.g. "500+", "99.9%", "6" */
  @Input() appCountUp = '0';
  @Input() countDuration = 2200;

  private observer!: IntersectionObserver;
  private started = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    // Show "0" initially
    this.el.nativeElement.textContent = this.prefix() + '0' + this.suffix();

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.started) {
          this.started = true;
          this.animate();
          this.observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  private prefix(): string {
    const m = this.appCountUp.match(/^([^\d]*)/);
    return m ? m[1] : '';
  }

  private suffix(): string {
    const m = this.appCountUp.match(/[\d.]+(.*)$/);
    return m ? m[1] : '';
  }

  private numStr(): string {
    const m = this.appCountUp.match(/([\d.]+)/);
    return m ? m[1] : '0';
  }

  private animate(): void {
    const raw     = this.numStr();
    const target  = parseFloat(raw);
    const isFloat = raw.includes('.');
    const decimals = isFloat ? raw.split('.')[1].length : 0;
    const pre     = this.prefix();
    const suf     = this.suffix();
    const el      = this.el.nativeElement;
    const start   = performance.now();
    const dur     = this.countDuration;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / dur, 1);
      // Ease-out cubic
      const eased  = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      el.textContent =
        pre +
        (decimals > 0
          ? current.toFixed(decimals)
          : Math.round(current).toLocaleString()) +
        suf;

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
