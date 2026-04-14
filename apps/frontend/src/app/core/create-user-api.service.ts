import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from './api.config';

export interface CreateUserPayload {
  name: string;
  password: string;
  gender: string;
  birth: string;
  email: string;
  phone: string;
  user_type: string;
}

@Injectable({ providedIn: 'root' })
export class CreateUserApiService {
  private readonly http = inject(HttpClient);
  private readonly url = `${API_BASE_URL}/api/v1/users/create_user/`;

  createUser(payload: CreateUserPayload) {
    return this.http.post<unknown>(this.url, payload);
  }
}
