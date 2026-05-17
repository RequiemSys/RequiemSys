import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../../../../core/api.config';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserModalService {

  private http = inject(HttpClient);

  private apiUrl = `${API_BASE_URL}/api/v1/users/delete`;

  deleteUser(email: string): Observable<any> {

    const params = new HttpParams()
      .set('email', email);

    return this.http.delete(
      `${this.apiUrl}`,
      { params }
    );
  }
}