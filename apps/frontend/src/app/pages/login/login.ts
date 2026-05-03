import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  loginForm: FormGroup = this.fb.group({
    usuario: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]]
  });

  entrar(): void {
    if (this.loginForm.valid) {
      const payload = { 
        email: this.loginForm.value.usuario, 
        password: this.loginForm.value.senha 
      };
      this.authService.login(payload).subscribe({
        next: (res) => {
          alert('Login realizado com sucesso');
          void this.router.navigateByUrl('/base');
        },
        error: (err) => {
          console.error('Falha na autenticação', err);
          if (err.status === 401) {
            alert('E-mail ou senha incorretos');
          } else {
            alert('Erro ao conectar com o servidor');
          }
        }
      });
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control) control.markAsTouched();
      });
    }
  }
}
