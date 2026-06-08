import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CreateExhumationService, CreateExhumationPayload } from './create-exhumation.service';

@Component({
  standalone: true,
  selector: 'app-create-exhumation',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './create-exhumation.html',
  styleUrl: './create-exhumation.css',
})
export class CreateExhumationComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private createExhumationService = inject(CreateExhumationService);

  submitting = signal(false);
  submitError = signal<string | null>(null);

  statusOptions = [
    'Apto para exumação',
    'Exumado',
    'Ossário'
  ];

  form = this.fb.group({
    nome_completo: ['', Validators.required],
    cpf: ['', Validators.required],
    sexo: ['', Validators.required],
    data_nascimento: ['', Validators.required],
    data_falecimento: ['', Validators.required],
    naturalidade: ['', Validators.required],
    nacionalidade: ['', Validators.required],
    estado_civil: ['', Validators.required],
    causa_morte: ['', Validators.required],
    nome_mae: ['', Validators.required],
    nome_pai: ['', Validators.required],
    num_declaracao_obito: ['', Validators.required],
    observacoes: [''],
    status: ['Apto para exumação', Validators.required]
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.submitError.set(null);

    const payload = this.form.getRawValue() as CreateExhumationPayload;

    this.createExhumationService.createExhumation(payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/main/exhumation']);
      },
      error: (error) => {
        this.submitting.set(false);
        this.submitError.set(
          error?.error?.detail || 'Erro ao cadastrar exumação.'
        );
      }
    });
  }
}
