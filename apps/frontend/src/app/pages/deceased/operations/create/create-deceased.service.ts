import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../../../core/api.config';

export interface CreateFalecidoPayload {
  nome_completo: string;
  cpf: string;
  data_nascimento: string;
  data_falecimento: string;
  sexo: string;
  naturalidade: string;
  nacionalidade: string;
  estado_civil: string;
  causa_morte: string;
  nome_mae: string;
  nome_pai: string;
  num_declaracao_obito: string;
  observacoes: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreateDeceasedService {

  private http = inject(HttpClient);

  private apiUrl = `${API_BASE_URL}/api/v1/falecidos/`;

  createFalecido(
    payload: CreateFalecidoPayload
  ): Observable<any> {

    return this.http.post(this.apiUrl, payload);
  }

}