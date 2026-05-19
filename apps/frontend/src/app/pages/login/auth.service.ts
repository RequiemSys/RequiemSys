import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/api.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = `${API_BASE_URL}/api/v1/auth/login`;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    const body = new HttpParams()
    .set('username', credentials.email)
    .set('password', credentials.password);

    return this.http.post(this.API, body.toString(), {
        headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
        withCredentials: true
    });
  }

  logout(): Observable<any> {
    return this.http.post(`${API_BASE_URL}/auth/logout`, {}, {
      withCredentials: true
    });
  }
}

