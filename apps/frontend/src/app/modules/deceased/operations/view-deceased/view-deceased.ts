import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DeceasedService } from '../../deceased.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Deceased } from '../../deceased.model';

@Component({
  selector: 'app-view-deceased',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './view-deceased.html',
  styleUrl: './view-deceased.css',
})
export class ViewDeceasedComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private deceasedService = inject(DeceasedService);
  private snackBar = inject(MatSnackBar);

  loading = false;
  deceased: Deceased | null = null;

  ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.loadDeceased(id);
    }
  }

  private loadDeceased(id: string | number) {
    this.loading = true;
    this.deceasedService.getById(id).subscribe({
      next: (response) => {
        this.deceased = response.data || null;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open(
          'Erro ao carregar falecido: ' + error.message,
          'Fechar',
          { duration: 5000, panelClass: ['error-snackbar'] }
        );
        this.router.navigate(['/main/deceased']);
      },
    });
  }

  onEdit() {
    this.router.navigate(['/main/deceased-update'], {
      queryParams: { id: this.deceased?.id },
    });
  }

  onBack() {
    this.router.navigate(['/main/deceased']);
  }
}
