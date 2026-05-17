import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../core/api.config';

export interface Falecido {
  id: number;
  nome_completo: string;
  data_falecimento: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class DeceasedService {

  private http = inject(HttpClient);

  private apiUrl = `${API_BASE_URL}/api/v1/falecidos`;

  listAll(): Observable<Falecido[]> {
    return this.http.get<Falecido[]>(this.apiUrl);
  }
}