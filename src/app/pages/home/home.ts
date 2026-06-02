import { Component, signal, afterNextRender, inject } from '@angular/core';
import { RevealService } from '../../services/reveal.service';
import { HeroComponent } from '../../sections/hero/hero';
import { DashboardComponent } from '../../sections/dashboard/dashboard';
import { DualViewComponent } from '../../sections/dual-view/dual-view';
import { TestimonialsComponent } from '../../sections/testimonials/testimonials';
import { FaqsComponent } from '../../sections/faqs/faqs';
import { ContactComponent } from '../../sections/contact/contact';
import { TrustedByComponent } from '../../sections/trusted-by/trusted-by';
import { FeatureStepsComponent } from '../../sections/feature-steps/feature-steps';
import { MobileEssComponent } from '../../sections/mobile-ess/mobile-ess';
import { ReviewsComponent } from '../../sections/reviews/reviews';
import { IndustriesHubComponent } from '../../sections/industries-hub/industries-hub';
import { WorkflowConnectedComponent } from '../../sections/workflow-connected/workflow-connected';
import { SolutionsByIndustryComponent } from '../../sections/solutions-by-industry/solutions-by-industry';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroComponent,
    TrustedByComponent,
    FeatureStepsComponent,
    SolutionsByIndustryComponent,
    IndustriesHubComponent,
    WorkflowConnectedComponent,
    DashboardComponent,
    MobileEssComponent,
    DualViewComponent,
    TestimonialsComponent,
    ReviewsComponent,
    FaqsComponent,
    ContactComponent,
  ],
  templateUrl: './home.html',
})
export class HomePage {
  lang = signal<'en' | 'ar'>('en');
  private reveal = inject(RevealService);

  constructor() {
    afterNextRender(() => this.reveal.init());
  }
}
