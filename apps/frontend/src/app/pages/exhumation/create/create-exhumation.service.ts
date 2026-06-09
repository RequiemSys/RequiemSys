import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../../core/api.config';

export interface CreateExhumationPayload {
  date: string;
  reason: string;
  deceased_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class CreateExhumationleService {

  private http = inject(HttpClient);

  private apiUrl = `${API_BASE_URL}/api/v1/exhumation`;

  createExhumation(
    payload: CreateExhumationPayload
  ): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/`, payload);
  }

}
