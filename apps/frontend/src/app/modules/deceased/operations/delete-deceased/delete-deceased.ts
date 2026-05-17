import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DeceasedService } from '../../deceased.service';
import { ConfirmDialogComponent } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog';
import { Deceased } from '../../deceased.model';

@Component({
  selector: 'app-delete-deceased',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './delete-deceased.html',
  styleUrl: './delete-deceased.css',
})
export class DeleteDeceasedComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private deceasedService = inject(DeceasedService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  loading = false;
  deceasedId: string | number | null = null;

  ngOnInit() {
    this.deceasedId = this.route.snapshot.queryParamMap.get('id');
    if (this.deceasedId) {
      this.openConfirmDialog();
    }
  }

  private openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar Exclusão',
        message: 'Tem certeza que deseja deletar este falecido? Esta ação não pode ser desfeita.',
        confirmText: 'Deletar',
        cancelText: 'Cancelar',
        isDangerous: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteDeceased();
      } else {
        this.router.navigate(['/main/deceased']);
      }
    });
  }

  private deleteDeceased() {
    if (!this.deceasedId) return;

    this.loading = true;
    this.deceasedService.delete(this.deceasedId).subscribe({
      next: (response) => {
        this.loading = false;
        this.snackBar.open('Falecido deletado com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/main/deceased']);
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open(
          'Erro ao deletar falecido: ' + error.message,
          'Fechar',
          { duration: 5000, panelClass: ['error-snackbar'] }
        );
        this.router.navigate(['/main/deceased']);
      },
    });
  }
}
