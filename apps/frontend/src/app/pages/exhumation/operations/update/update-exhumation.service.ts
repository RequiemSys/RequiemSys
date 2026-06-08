import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../../core/api.config';

export interface ExhumationPayload {
  id?: number;
  nome_completo: string;
  cpf: string;
  sexo: string;
  data_nascimento: string;
  data_falecimento: string;
  naturalidade: string;
  nacionalidade: string;
  estado_civil: string;
  causa_morte: string;
  nome_mae: string;
  nome_pai: string;
  num_declaracao_obito: string;
  observacoes: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateExhumationService {

  private http = inject(HttpClient);
  private apiUrl = `${API_BASE_URL}/api/v1/falecidos`;

  getByCpf(cpf: string): Observable<ExhumationPayload> {
    const params = new HttpParams().set('cpf', cpf);
    return this.http.get<ExhumationPayload>(`${this.apiUrl}/`, { params });
  }

  update(cpf: string, payload: ExhumationPayload): Observable<ExhumationPayload> {
    const params = new HttpParams().set('cpf', cpf);
    return this.http.put<ExhumationPayload>(`${this.apiUrl}/`, payload, { params });
  }
}
