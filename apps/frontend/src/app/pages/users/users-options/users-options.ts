import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'users-options',
  standalone: true,
  templateUrl: './users-options.html',
  styleUrl: './users-options.css',
  imports: [
    RouterLink,
    MatIcon,
    RouterOutlet
  ]
})
export class UsersOptions {
  private readonly router = inject(Router);

  
}
