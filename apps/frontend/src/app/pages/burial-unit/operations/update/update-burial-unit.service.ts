import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../../../core/api.config';

export interface BurialUnitPayload {
  id?: number;
  tipo: string;
  codigo: string;
  localizacao: string;
  status: string;
  observacoes: string;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateBurialUnitService {

  private http = inject(HttpClient);

  private apiUrl = `${API_BASE_URL}/api/v1/jazigos`;

  getById(id: number): Observable<BurialUnitPayload> {
    return this.http.get<BurialUnitPayload>(`${this.apiUrl}/${id}`);
  }

  update(
    id: number,
    payload: BurialUnitPayload
  ): Observable<BurialUnitPayload> {
    return this.http.put<BurialUnitPayload>(`${this.apiUrl}/${id}`, payload);
  }

}
