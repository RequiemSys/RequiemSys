import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/api.config';

export interface Exhumation {
  id?: number;
  reason?: string;
  date?: string;
  deceased_id?: number;
  falecido?: any | null;
}

@Injectable({
  providedIn: 'root'
})
export class ExhumationService {

  private http = inject(HttpClient);
  private apiUrl = `${API_BASE_URL}/api/v1/exhumation/`;

  listAll(): Observable<Exhumation[]> {
    return this.http.get<Exhumation[]>(this.apiUrl);
  }

  getById(id: number): Observable<Exhumation> {
    const params = new HttpParams().set('deceased_id', id);

    return this.http.get<Exhumation[]>(this.apiUrl, { params }).pipe(
      map(response => response[0])
    );
  }
}