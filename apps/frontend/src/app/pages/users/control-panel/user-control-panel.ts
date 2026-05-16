import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'user-control-panel',
  standalone: true,
  templateUrl: './user-control-panel.html',
  styleUrl: './user-control-panel.css',
  imports: [
    RouterLink,
    MatIcon
  ]
})
export class UserControlPanelComponent {
  private readonly router = inject(Router);

  
}
