import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedFormComponent, FormConfig } from '../../../../shared/shared-form/shared-form';
import { DeceasedService } from '../../deceased.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-deceased',
  standalone: true,
  imports: [
    CommonModule,
    SharedFormComponent,
    MatSnackBarModule,
  ],
  templateUrl: './create-deceased.html',
  styleUrl: './create-deceased.css',
})
export class CreateDeceasedComponent {
  private router = inject(Router);
  private deceasedService = inject(DeceasedService);
  private snackBar = inject(MatSnackBar);

  loading = false;

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
    submitLabel: 'Criar Falecido',
    cancelLabel: 'Cancelar',
  };

  onSubmit(formData: any) {
    this.loading = true;
    this.deceasedService.create(formData).subscribe({
      next: (response) => {
        this.loading = false;
        this.snackBar.open('Falecido criado com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/main/deceased']);
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open(
          'Erro ao criar falecido: ' + error.message,
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
