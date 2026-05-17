import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedTableComponent, TableColumn } from '../../../shared/shared-table/shared-table';
import { DeceasedService } from '../deceased.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Deceased } from '../deceased.model';

@Component({
  selector: 'app-deceased-control-panel',
  standalone: true,
  imports: [
    CommonModule,
    SharedTableComponent,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  templateUrl: './deceased-control-panel.html',
  styleUrl: './deceased-control-panel.css',
})
export class DeceasedControlPanelComponent implements OnInit {
  private router = inject(Router);
  private deceasedService = inject(DeceasedService);
  private snackBar = inject(MatSnackBar);

  loading$ = this.deceasedService.loading$;
  deceased: Deceased[] = [];

  title = 'Falecidos';
  subtitle = 'Gerenciar todos os falecidos cadastrados no sistema';

  columns: TableColumn[] = [
    { key: 'nome', label: 'Falecido' },
    { key: 'data_falecimento', label: 'Data de Falecimento' },
    { key: 'jazigo', label: 'Jazigo' },
  ];

  ngOnInit() {
    this.loadDeceased();
  }

  private loadDeceased() {
    this.deceasedService.listAll().subscribe({
      next: (response) => {
        this.deceased = response.data || [];
      },
      error: (error) => {
        this.snackBar.open(
          'Erro ao carregar falecidos: ' + error.message,
          'Fechar',
          { duration: 5000, panelClass: ['error-snackbar'] }
        );
      },
    });
  }

  onCreateNew() {
    this.router.navigate(['/main/deceased-create']);
  }

  onView(item: Deceased) {
    this.router.navigate(['/main/deceased-view'], {
      queryParams: { id: item.id },
    });
  }

  onEdit(item: Deceased) {
    this.router.navigate(['/main/deceased-update'], {
      queryParams: { id: item.id },
    });
  }

  onDelete(item: Deceased) {
    this.router.navigate(['/main/deceased-delete'], {
      queryParams: { id: item.id },
    });
  }

  onRefresh() {
    this.loadDeceased();
  }
}
