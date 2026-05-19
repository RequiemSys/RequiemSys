import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'working',
  standalone: true,
  templateUrl: './working.html',
  styleUrl: './working.css',
})
export class Working {
  private readonly router = inject(Router);

  
}
