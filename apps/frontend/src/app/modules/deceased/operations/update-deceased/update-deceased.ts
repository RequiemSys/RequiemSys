import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedFormComponent, FormConfig } from '../../../../shared/shared-form/shared-form';
import { DeceasedService } from '../../deceased.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Deceased } from '../../deceased.model';

@Component({
  selector: 'app-update-deceased',
  standalone: true,
  imports: [
    CommonModule,
    SharedFormComponent,
    MatSnackBarModule,
  ],
  templateUrl: './update-deceased.html',
  styleUrl: './update-deceased.css',
})
export class UpdateDeceasedComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private deceasedService = inject(DeceasedService);
  private snackBar = inject(MatSnackBar);

  loading = false;
  deceasedId: string | number | null = null;
  initialValues: any = {};

  formConfig: FormConfig = {
    fields: [
      {
        name: 'nome',
        label: 'Nome do Falecido',
        type: 'text',
        required: true,
        placeholder: 'Ex: João Silva',
      },
      {
        name: 'data_falecimento',
        label: 'Data de Falecimento',
        type: 'date',
        required: true,
      },
      {
        name: 'jazigo',
        label: 'Jazigo',
        type: 'text',
        required: true,
        placeholder: 'Ex: 03A',
      },
      {
        name: 'responsavel_id',
        label: 'Responsável',
        type: 'text',
        placeholder: 'ID do Responsável',
      },
      {
        name: 'observacoes',
        label: 'Observações',
        type: 'textarea',
        placeholder: 'Adicione observações relevantes',
      },
    ],
    submitLabel: 'Atualizar Falecido',
    cancelLabel: 'Cancelar',
  };

  ngOnInit() {
    this.deceasedId = this.route.snapshot.queryParamMap.get('id');
    if (this.deceasedId) {
      this.loadDeceased();
    }
  }

  private loadDeceased() {
    this.loading = true;
    this.deceasedService.getById(this.deceasedId!).subscribe({
      next: (response) => {
        if (response.data) {
          this.initialValues = response.data;
        }
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

  onSubmit(formData: any) {
    if (!this.deceasedId) return;

    this.loading = true;
    this.deceasedService.update(this.deceasedId, formData).subscribe({
      next: (response) => {
        this.loading = false;
        this.snackBar.open('Falecido atualizado com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/main/deceased']);
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open(
          'Erro ao atualizar falecido: ' + error.message,
          'Fechar',
          { duration: 5000, panelClass: ['error-snackbar'] }
        );
      },
    });
  }

  onCancel() {
    this.router.navigate(['/main/deceased']);
  }
}
