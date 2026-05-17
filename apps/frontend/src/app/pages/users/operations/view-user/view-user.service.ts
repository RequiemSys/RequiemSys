import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../../../core/api.config';

export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  birth: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ViewUserService {

  private http = inject(HttpClient);

  private apiUrl = `${API_BASE_URL}/api/v1/users/list_all`;

  listAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}