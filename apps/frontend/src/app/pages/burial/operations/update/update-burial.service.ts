import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../../core/api.config';

export interface BurialPayload {
  id?: number;
  falecido_id: number;
  data_sepultamento: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateBurialService {

  private http = inject(HttpClient);
  private apiUrl = `${API_BASE_URL}/api/v1/burial`;

  getById(id: number): Observable<BurialPayload> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<BurialPayload>(`${this.apiUrl}/`, { params });
  }

  update(id: number, payload: BurialPayload): Observable<BurialPayload> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.put<BurialPayload>(`${this.apiUrl}/`, payload, { params });
  }
}
