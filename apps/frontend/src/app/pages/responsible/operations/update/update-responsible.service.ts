import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../../../core/api.config';

export interface Responsible {
  id: number;
  name: string;
  birth: string;
  cpf: string;
  kinship: string;
  phone: string;
  email: string;
  address: string;
  deceased_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateResponsibleService {

  private http = inject(HttpClient);

  private apiUrl = `${API_BASE_URL}/api/v1/responsaveis`;

  getByEmail(email: string): Observable<Responsible> {
    const params = new HttpParams().set('email', email);

    return this.http.get<Responsible>(`${this.apiUrl}/by-email`, { params });
  }

  update(email: string, payload: Responsible): Observable<Responsible> {
    const params = new HttpParams().set('email', email);

    return this.http.put<Responsible>(`${this.apiUrl}/`, payload, { params });
  }

}
