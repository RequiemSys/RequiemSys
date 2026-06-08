import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../../core/api.config';

export interface CreateBurialPayload {
  falecido_id: number;
  data_sepultamento: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreateBurialService {

  private http = inject(HttpClient);
  private apiUrl = `${API_BASE_URL}/api/v1/burial`;

  createBurial(payload: CreateBurialPayload): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/`, payload);
  }
}
