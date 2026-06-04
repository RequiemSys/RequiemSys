import { Component, inject, signal } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

import {
  CreateDeceasedService
} from './create-deceased.service';

@Component({
  selector: 'app-create-deceased',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './create-deceased.html',
  styleUrl: './create-deceased.css',
})
export class CreateDeceasedComponent {

  private fb = inject(FormBuilder);

  private router = inject(Router);

  private createDeceasedService = inject(CreateDeceasedService);

  submitting = signal(false);

  submitError = signal<string | null>(null);

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
    observacoes: ['']
  });

  onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    this.submitError.set(null);

    this.createDeceasedService
      .createFalecido(this.form.getRawValue() as any)
      .subscribe({

        next: () => {

          this.submitting.set(false);

          this.router.navigate([
            '/main/deceased'
          ]);
        },

        error: (error) => {

          this.submitting.set(false);

          this.submitError.set(
            error?.error?.detail ||
            'Erro ao cadastrar falecido.'
          );
        }
      });
  }

}