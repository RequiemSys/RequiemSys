import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly router = inject(Router);

  irParaLogin(): void {
    void this.router.navigateByUrl('/login-dois');
  }

  irParaRegistro(): void {
    void this.router.navigateByUrl('/registro');
  }
}
