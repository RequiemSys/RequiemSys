import { Injectable, inject } from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import {
  map,
  Observable
} from 'rxjs';

import { API_BASE_URL } from '../../core/api.config';

export interface Falecido {
  id?: number;
  nome_completo?: string;
  sexo?: string;
  data_nascimento?: string;
  data_falecimento?: string;
  naturalidade?: string;
  nacionalidade?: string;
  estado_civil?: string;
  causa_morte?: string;
  nome_mae?: string;
  nome_pai?: string;
  num_declaracao_obito?: string;
  cpf?: string;
  observacoes?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DeceasedService {

  private http = inject(HttpClient);

  private apiUrl = `${API_BASE_URL}/api/v1/falecidos/`;

  listAll(): Observable<Falecido[]> {

    return this.http.get<Falecido[]>(
      this.apiUrl
    );

  }

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

}