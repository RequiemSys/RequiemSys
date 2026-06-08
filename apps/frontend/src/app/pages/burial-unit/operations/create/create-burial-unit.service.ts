import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../../../core/api.config';

export interface CreateBurialUnitPayload {
  tipo: string;
  codigo: string;
  localizacao: string;
  status: string;
  observacoes: string;
  data_final_concessao: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreateBurialUnitService {

  private http = inject(HttpClient);

  private apiUrl = `${API_BASE_URL}/api/v1/jazigos`;

  createBurialUnit(
    payload: CreateBurialUnitPayload
  ): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/`, payload);
  }

}
