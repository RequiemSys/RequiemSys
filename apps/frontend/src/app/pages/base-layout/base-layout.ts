import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'base-layout',
  standalone: true,
  templateUrl: './base-layout.html',
  styleUrl: './base-layout.css',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink
  ]
})
export class BaseLayout {
  private readonly router = inject(Router);

  nome = 'Lucas'; // TODO: Add lógica para pegar nome de user e injetar no html.
  
}
