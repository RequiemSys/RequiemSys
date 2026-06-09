import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/api.config'; // Ajuste o caminho se necessário

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  getMetrics(): Observable<{ totalFalecidos: number; jazigosDisponiveis: number; sepultamentosHoje: number }> {
    return forkJoin({
      totalFalecidos: this.http.get<number>(`${API_BASE_URL}/api/v1/falecidos/count`),
      jazigosDisponiveis: this.http.get<number>(`${API_BASE_URL}/api/v1/jazigos/count`),
      sepultamentosHoje: this.http.get<number>(`${API_BASE_URL}/api/v1/burial/count`)
    });
  }
}