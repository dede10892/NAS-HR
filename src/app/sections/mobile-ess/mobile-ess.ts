import {
  Component, Input, signal,
  OnInit, OnDestroy, Inject, PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-mobile-ess',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-ess.html',
  styleUrl: './mobile-ess.scss',
})
export class MobileEssComponent implements OnInit, OnDestroy {
  @Input() lang: 'en' | 'ar' = 'en';
  t(en: string, ar: string) { return this.lang === 'ar' ? ar : en; }

  activeScreen  = signal(0);
  screenReady   = signal(true);
  private timer?: ReturnType<typeof setInterval>;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) this.startCycle();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  private startCycle(): void {
    this.timer = setInterval(() => this.switchTo((this.activeScreen() + 1) % this.screens.length), 3400);
  }

  switchTo(i: number): void {
    if (i === this.activeScreen()) return;
    clearInterval(this.timer);
    this.screenReady.set(false);
    setTimeout(() => { this.activeScreen.set(i); this.screenReady.set(true); }, 200);
    if (this.isBrowser) this.startCycle();
  }

  screens = [
    { label: 'Home',         labelAr: 'الرئيسية'   },
    { label: 'Requests',     labelAr: 'الطلبات'    },
    { label: 'Payslip',      labelAr: 'الراتب'     },
    { label: 'Shifts',       labelAr: 'المناوبات'  },
  ];

  features = [
    { en: 'View & download payslips anytime',      ar: 'عرض كشوف الراتب وتنزيلها في أي وقت'          },
    { en: 'Apply for leave with one tap',          ar: 'تقديم طلب إجازة بنقرة واحدة'                  },
    { en: 'Approve requests on the go',            ar: 'الموافقة على الطلبات أثناء التنقل'             },
    { en: 'Clock in/out with GPS verification',    ar: 'تسجيل الحضور والانصراف بالتحقق من الموقع'     },
    { en: 'View team attendance and schedules',    ar: 'عرض حضور الفريق والجداول الزمنية'              },
    { en: 'Instant HR notifications and updates',  ar: 'إشعارات ومستجدات الموارد البشرية فورياً'       },
  ];
}
