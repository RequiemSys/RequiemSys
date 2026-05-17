import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../../../core/api.config';

export interface User {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

  private http = inject(HttpClient);

  private apiUrl = `${API_BASE_URL}/api/v1/users`;

  listAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/list_all`);
  }
}