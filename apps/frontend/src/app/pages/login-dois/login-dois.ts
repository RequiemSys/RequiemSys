// src/app/pages/registro/login-dois.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-dois',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-dois.html',
  styleUrls: ['./login-dois.css']
})
export class LoginDois {
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  constructor(private router: Router) {}

  criarConta(): void {
    // Validação básica
    if (!this.email || !this.senha || !this.confirmarSenha) {
      alert('Preencha todos os campos!');
      return;
    }

    // Validar se as senhas coincidem
    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    // Simulação de cadastro (apenas para testes)
    const usuario = {
      email: this.email,
      tipo: 'funcionario'
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('usuario_logado', 'true');

    // Limpar campos (boa prática)
    this.email = '';
    this.senha = '';
    this.confirmarSenha = '';

    // Redirecionar para login
    this.router.navigate(['/login']);
  }
}