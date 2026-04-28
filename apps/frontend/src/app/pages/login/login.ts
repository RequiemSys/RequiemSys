import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  // Formulário com validação de e-mail e mínimo de 6 caracteres para senha
  loginForm: FormGroup = this.fb.group({
    usuario: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]]
  });

  entrar(): void {
    if (this.loginForm.valid) {
      console.log('Login solicitado:', this.loginForm.value);
      // Navega para a base do sistema (Dashboard)
      void this.router.navigateByUrl('/dashboard'); 
    } else {
      // Resolve o erro ts(18046) verificando se o 'control' existe
      Object.values(this.loginForm.controls).forEach(control => {
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
}