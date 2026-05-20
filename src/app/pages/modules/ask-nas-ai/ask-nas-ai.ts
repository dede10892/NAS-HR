import {
  Component, signal, OnInit, OnDestroy,
  ViewChild, ElementRef, Input,
} from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Message {
  role: 'user' | 'ai';
  text: string;
  actions?: string[];
}

interface Turn {
  user: string;
  ai: string;
  actions?: string[];
}

interface UseCase {
  label: string;
  turns: Turn[];
}

@Component({
  selector: 'app-ask-nas-ai',
  imports: [RouterLink],
  templateUrl: './ask-nas-ai.html',
  styleUrl: './ask-nas-ai.scss',
})
export class AskNasAiPage implements OnInit, OnDestroy {
  @ViewChild('chatBody') chatBodyRef?: ElementRef<HTMLElement>;
  @Input() lang: 'en' | 'ar' = 'en';

  activeCase   = signal(0);
  playedMsgs   = signal<Message[]>([]);
  currentTyping = signal<{ role: 'user' | 'ai'; text: string } | null>(null);
  showDots     = signal(false);

  private timers: ReturnType<typeof setTimeout>[] = [];

  useCases: UseCase[] = [
    {
      label: 'Leave Request',
      turns: [
        {
          user: 'Create a vacation request for next Thursday and Friday.',
          ai:   'Sure! What type of leave would you like — annual leave or personal day?',
          actions: ['Annual Leave', 'Personal Day'],
        },
        {
          user: 'Annual leave please.',
          ai:   'Done — your annual leave for Thu May 22 & Fri May 23 is ready to submit. Your balance will be 7 days after approval.',
          actions: ['Submit Request', 'Edit Dates'],
        },
      ],
    },
    {
      label: 'Leave Balance',
      turns: [
        {
          user: 'How many vacation days do I still have?',
          ai:   'You have 9 annual leave days remaining out of 22 total this year.',
          actions: ['View Full Balance', 'Request Leave'],
        },
        {
          user: 'What about sick leave?',
          ai:   'You have 8 sick leave days remaining out of 15. No sick days taken this month.',
          actions: ['View Details', 'Download Report'],
        },
      ],
    },
    {
      label: 'Attendance',
      turns: [
        {
          user: 'Show me my attendance history for this week.',
          ai:   'Mon–Tue on time, Wed late 43 min, Thu–Fri on time. Total logged: 40h 20m.',
          actions: ['View Full Report', 'Report Issue'],
        },
        {
          user: 'Why was I marked late on Wednesday?',
          ai:   'Check-in was at 09:43 AM on May 14. Your shift starts at 09:00 AM — 43 minutes flagged automatically.',
          actions: ['Dispute Record', 'View Policy'],
        },
      ],
    },
    {
      label: 'HR Letter',
      turns: [
        {
          user: 'I need an employment letter.',
          ai:   'Happy to help. What is the letter for — a bank, visa application, or another purpose?',
          actions: ['Bank Letter', 'Visa Letter', 'Other'],
        },
        {
          user: 'For a bank loan.',
          ai:   'Your bank employment letter is ready — includes your position, salary, and tenure. Submitted to HR for approval.',
          actions: ['Submit Request', 'Preview Letter'],
        },
      ],
    },
    {
      label: 'Company Courses',
      turns: [
        {
          user: 'What courses has the company assigned to me?',
          ai:   '3 assigned: Leadership Essentials (72%), Data-Driven HR (45%), Communication Skills (90%).',
          actions: ['Continue Learning', 'View All Courses'],
        },
        {
          user: 'Which one should I finish first?',
          ai:   'Communication Skills is at 90% — finish it in under an hour and earn your first completion badge this quarter!',
          actions: ['Start Now', 'View Progress'],
        },
      ],
    },
    {
      label: 'Internal Jobs',
      turns: [
        {
          user: 'Are there any internal jobs available for me?',
          ai:   '2 openings match your profile: Senior HR Specialist in Riyadh and HR Business Partner in Dubai.',
          actions: ['View Jobs', 'Apply Now'],
        },
        {
          user: 'Tell me more about the Dubai role.',
          ai:   'HR Business Partner — Dubai HQ. Reports to VP of People. Requires 3+ yrs HR experience. Deadline: June 10.',
          actions: ['Apply Now', 'Save for Later'],
        },
      ],
    },
    {
      label: 'Manager Approvals',
      turns: [
        {
          user: 'Show me pending approvals for my team.',
          ai:   '5 pending: 2 leave requests (Sara, Khalid), 1 permission (Nora), 1 HR letter (Faisal), 1 offsite (Ahmed).',
          actions: ['Open Approvals', 'Approve All'],
        },
        {
          user: "Approve Sara's leave request.",
          ai:   "Sara Al-Rashidi's leave (May 22–27, 8 days) approved and she's been notified. 4 approvals remaining.",
          actions: ['Next Approval', 'View All'],
        },
      ],
    },
    {
      label: 'Salary Insight',
      turns: [
        {
          user: 'Show me salary deductions for this month.',
          ai:   'May deductions: Social Insurance LE 580 · Late Penalty LE 120 · Total LE 700. Net salary: LE 7,300.',
          actions: ['View Full Slip', 'Export PDF'],
        },
        {
          user: 'Why is there a late penalty?',
          ai:   'LE 120 for 2 late check-ins (May 7 & 14), LE 60 each — applied automatically per attendance policy.',
          actions: ['View Policy', 'Dispute Penalty'],
        },
      ],
    },
  ];

  ngOnInit() {
    this.selectCase(0);
  }

  selectCase(i: number) {
    this.clearTimers();
    this.activeCase.set(i);
    this.playedMsgs.set([]);
    this.currentTyping.set(null);
    this.showDots.set(false);
    this.after(200, () => this.playTurn(i, 0));
  }

  private playTurn(caseIdx: number, turnIdx: number) {
    const turns = this.useCases[caseIdx].turns;
    if (turnIdx >= turns.length) return;
    const turn = turns[turnIdx];

    // Step 1 — type user message
    this.typeText(turn.user, 'user', () => {
      this.pushMessage({ role: 'user', text: turn.user });
      this.currentTyping.set(null);

      // Step 2 — AI thinking dots
      this.after(380, () => {
        this.showDots.set(true);
        this.scrollBottom();

        // Step 3 — type AI reply
        this.after(880, () => {
          this.showDots.set(false);
          this.typeText(turn.ai, 'ai', () => {
            this.pushMessage({ role: 'ai', text: turn.ai, actions: turn.actions });
            this.currentTyping.set(null);
            this.scrollBottom();

            // Step 4 — next turn after pause
            if (turnIdx + 1 < turns.length) {
              this.after(1200, () => this.playTurn(caseIdx, turnIdx + 1));
            }
          });
        });
      });
    });
  }

  private typeText(text: string, role: 'user' | 'ai', done: () => void) {
    let i = 0;
    const tick = () => {
      i++;
      this.currentTyping.set({ role, text: text.slice(0, i) });
      this.scrollBottom();
      if (i < text.length) {
        this.timers.push(setTimeout(tick, 18));
      } else {
        done();
      }
    };
    tick();
  }

  private pushMessage(msg: Message) {
    this.playedMsgs.update(list => [...list, msg]);
    this.scrollBottom();
  }

  private scrollBottom() {
    const el = this.chatBodyRef?.nativeElement;
    if (el) this.timers.push(setTimeout(() => { el.scrollTop = el.scrollHeight; }, 0));
  }

  private after(ms: number, fn: () => void) {
    this.timers.push(setTimeout(fn, ms));
  }

  private clearTimers() {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }

  ngOnDestroy() { this.clearTimers(); }
}
