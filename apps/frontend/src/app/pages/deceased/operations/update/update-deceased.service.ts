import { Injectable, inject } from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import {
  map,
  Observable
} from 'rxjs';

import { API_BASE_URL } from '../../../../core/api.config';

export interface Falecido {
  id: number;
  nome_completo: string;
  cpf: string;
  sexo: string;
  data_nascimento: string;
  data_falecimento: string;
  estado_civil: string;
  naturalidade: string;
  nacionalidade: string;
  nome_mae: string;
  nome_pai: string;
  causa_morte: string;
  num_declaracao_obito: string;
  observacoes: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class FalecidoService {

  private http = inject(HttpClient);

  private apiUrl = `${API_BASE_URL}/api/v1/falecidos`;

  getByCpf(cpf: string): Observable<Falecido> {

    const params = new HttpParams()
      .set('cpf', cpf);

    return this.http.get<any>(
      this.apiUrl,
      { params }
    ).pipe(

      map((response: any) => {

        if (Array.isArray(response)) {
          return response[0];
        }

        return response;

      })

    );

  }

  update(
    cpf: string,
    payload: Falecido
  ): Observable<Falecido> {

    const params = new HttpParams()
      .set('cpf', cpf);

    return this.http.put<Falecido>(
      this.apiUrl,
      payload,
      { params }
    );

  }

}