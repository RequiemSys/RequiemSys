import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Importante para o formulário funcionar
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  // Criando o formulário com validações básicas
  loginForm: FormGroup = this.fb.group({
    usuario: ['', [Validators.required]],
    senha: ['', [Validators.required, Validators.minLength(6)]]
  });

  entrar(): void {
    if (this.loginForm.valid) {
      console.log('Dados de login:', this.loginForm.value);
      // Aqui seu colega de backend entrará com a lógica de autenticação futuramente
      void this.router.navigateByUrl('/dashboard'); // Rota para a "Base" que ele citou
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched(); // Mostra erros se o usuário clicar sem preencher
      });
    }
  }

  irParaRegistro(): void {
    void this.router.navigateByUrl('/registro');
  }
}
