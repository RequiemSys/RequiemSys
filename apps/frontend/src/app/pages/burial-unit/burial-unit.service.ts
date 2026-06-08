import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../core/api.config';

export interface BurialUnit {
  id?: number;
  tipo?: string;
  codigo?: string;
  localizacao?: string;
  status?: string;
  observacoes?: string;
  falecido?: string;
  responsavel?: string;
  data_final_concessao?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BurialUnitService {

  private http = inject(HttpClient);

  private apiUrl = `${API_BASE_URL}/api/v1/jazigos/`;

  listAll(): Observable<BurialUnit[]> {
    return this.http.get<BurialUnit[]>(this.apiUrl);
  }

  deleteById(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}${id}`);
  }

  getById(id: number): Observable<BurialUnit> {
    return this.http.get<BurialUnit>(`${this.apiUrl}${id}`);
  }

}
