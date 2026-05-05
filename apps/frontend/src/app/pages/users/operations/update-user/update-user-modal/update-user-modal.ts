import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_BASE_URL } from '../../../../../core/api.config';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscar-usuario',
  templateUrl: './update-user-modal.html',
  styleUrls: ['./update-user-modal.css'],
  imports: [RouterLink, MatIcon, FormsModule]
})
export class UserSearchModalComponent {

  email: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  onSearch() {
    if (!this.email.trim()) return;

    const params = new HttpParams().set('email', this.email);

    this.http.get<any>(`${API_BASE_URL}/api/v1/users/user`, { params })
      .subscribe({
        next: (user: any) => {
          this.router.navigate(['/main/user-control-panel/update-user'], {
            state: { user }
          });
        },
        error: (err: any) => {
          console.error('Erro ao buscar usuário:', err);
        }
      });
  }
}