import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  // Formulário com validação de E-mail e Senha (mínimo 6 caracteres)
  loginForm: FormGroup = this.fb.group({
    usuario: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]]
  });

  entrar(): void {
    if (this.loginForm.valid) {
      console.log('Login solicitado:', this.loginForm.value);
      // Simulação de navegação para a base do sistema
      void this.router.navigateByUrl('/dashboard'); 
    } else {
      // Marca todos os campos como tocados para exibir erros de validação (borda vermelha etc)
      Object.values(this.loginForm.controls).forEach(control => {
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
}
