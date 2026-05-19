import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '../../../../core/api.config';
import { Observable } from 'rxjs';

export interface UserUpdateFields {
  name: string;
  password: string;
  gender: string;
  birth: string;
  email: string;
  phone: string;
}

export interface UpdateUserRequest {
  email: string;
  user_update: Partial<UserUpdateFields>;
}

@Injectable({ providedIn: 'root' })
export class UpdateUserApiService {

  private readonly http = inject(HttpClient);
  private readonly url = `${API_BASE_URL}/api/v1/users/update_user`;

  updateUser(payload: UpdateUserRequest): Observable<any> {
    return this.http.patch<any>(this.url, payload);
  }
}