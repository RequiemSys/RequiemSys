import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/api.config';

export interface SendMail {
  email_from?: string;
  email_to: string;
  subject: string;
  message?: string | null;
  send_date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  private http = inject(HttpClient);
  private apiUrl = `${API_BASE_URL}/api/v1/notificate/send`;

  sendEmailNotification(payload: SendMail): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }
}
