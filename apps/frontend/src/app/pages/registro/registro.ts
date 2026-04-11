// src/app/pages/registro/registro.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.html',  // Alterado para referenciar o HTML
  styleUrls: ['./registro.css']   // Alterado para referenciar o CSS
})
export class Registro {
  email = '';
  senha = '';
  confirmarSenha = '';

  constructor(private router: Router) {}

  criarConta() {
    // Verificar se a senha e a confirmação de senha são iguais
    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    // Simular criação de conta (salvar no localStorage ou enviar para API)
    localStorage.setItem('usuario_logado', 'true');
    localStorage.setItem('tipo_usuario', 'funcionario'); // ou 'admin'
    localStorage.setItem('email', this.email);

    // Redirecionar para a tela de login
    this.router.navigate(['/login']);
  }
}