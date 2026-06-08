import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../../core/api.config';

export interface CreateExhumationPayload {
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
export class CreateExhumationService {

  private http = inject(HttpClient);
  private apiUrl = `${API_BASE_URL}/api/v1/falecidos`;

  createExhumation(payload: CreateExhumationPayload): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/`, payload);
  }
}
