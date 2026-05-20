import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroVideo') videoRef!: ElementRef<HTMLVideoElement>;
  private rafId?: number;

  ngAfterViewInit() {
    const video = this.videoRef.nativeElement;

    const tick = () => {
      if (video.currentTime >= 0.97) {
        video.currentTime = 0;
        if (video.paused) video.play().catch(() => {});
      }
      this.rafId = requestAnimationFrame(tick);
    };

    video.play()
      .then(() => { this.rafId = requestAnimationFrame(tick); })
      .catch(() => {
        /* Autoplay blocked — start RAF anyway so it's ready when play resumes */
        this.rafId = requestAnimationFrame(tick);
      });
  }

  ngOnDestroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}
