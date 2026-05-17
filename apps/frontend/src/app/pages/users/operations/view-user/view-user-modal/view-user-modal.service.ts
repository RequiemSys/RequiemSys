import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../../../../core/api.config';

export interface UserDetails {
  name: string;
  email: string;
  gender: string;
  birth: string;
  phone: string;
  is_active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ViewUserModalService {

  private http = inject(HttpClient);

  private apiUrl = `${API_BASE_URL}/api/v1/users/user`;

  getUserDetails(email: string): Observable<UserDetails> {

    const params = new HttpParams()
      .set('email', email);

    return this.http.get<UserDetails>(
      this.apiUrl,
      { params }
    );
  }
}