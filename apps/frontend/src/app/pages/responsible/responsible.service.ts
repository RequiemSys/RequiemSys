import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../core/api.config';

export interface Responsible {
  id?: number;
  name?: string;
  birth?: string;
  cpf?: string;
  kinship?: string;
  phone?: string;
  email?: string;
  address?: string;
  deceased_id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ResponsibleService {

  private http = inject(HttpClient);

  private apiUrl = `${API_BASE_URL}/api/v1/responsaveis`;

  listAll(): Observable<Responsible[]> {
    return this.http.get<Responsible[]>(this.apiUrl);
  }

  deleteByEmail(email: string): Observable<{ message: string }> {
    const params = new HttpParams().set('email', email);

    return this.http.delete<{ message: string }>(this.apiUrl, { params });
  }

}
