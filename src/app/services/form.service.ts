import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormService {
  private http = inject(HttpClient);

  /* FormSubmit.co — free, no signup. First submission sends a confirmation
     email to nardine@2bcart.com to activate the endpoint. */
  private readonly endpoint = 'https://formsubmit.co/ajax/nardine@2bcart.com';

  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  send(fields: Record<string, string>, subject = 'New NAS HR Inquiry'): Observable<any> {
    const payload = {
      ...fields,
      _subject:  subject,
      _captcha:  'false',
      _template: 'table',
    };

    return this.http
      .post(this.endpoint, payload, { headers: this.headers })
      .pipe(catchError(() => of({ success: false })));
  }
}
