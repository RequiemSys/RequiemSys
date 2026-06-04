import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../../../core/api.config';

export interface CreateResponsiblePayload {
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
export class CreateResponsibleService {

  private http = inject(HttpClient);

  private apiUrl = `${API_BASE_URL}/api/v1/responsaveis`;

  createResponsible(
    payload: CreateResponsiblePayload
  ): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/`, payload);
  }

}
