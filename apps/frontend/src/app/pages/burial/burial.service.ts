import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/api.config';

export interface BurialOutput {
  id: number;
  falecido_id: number | null;
  data_sepultamento: string | null;
  status: string | null;
  falecido: any | null;
  jazigo: {
    id: number;
    codigo: string;
  } | null;
}

@Injectable({
  providedIn: 'root'
})
export class BurialService {

  private http = inject(HttpClient);
  private apiUrl = `${API_BASE_URL}/api/v1/burial`;

  listAll(): Observable<BurialOutput[]> {
    return this.http.get<BurialOutput[]>(`${this.apiUrl}/`);
  }

  getById(id: number): Observable<BurialOutput> {
    const params = new HttpParams().set('id', id);
    return this.http.get<BurialOutput>(`${this.apiUrl}/`, { params });
  }
}