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
  BURIAL_UNIT_LOCATIONS,
  BURIAL_UNIT_STATUS,
  BURIAL_UNIT_TYPES
} from '../burial-unit-options';

import {
  CreateBurialUnitService,
  CreateBurialUnitPayload
} from './create-burial-unit.service';

@Component({
  selector: 'app-create-burial-unit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './create-burial-unit.html',
  styleUrl: './create-burial-unit.css',
})
export class CreateBurialUnitComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private createBurialUnitService = inject(CreateBurialUnitService);

  submitting = signal(false);
  submitError = signal<string | null>(null);

  typeOptions = BURIAL_UNIT_TYPES;
  locationOptions = BURIAL_UNIT_LOCATIONS;
  statusOptions = BURIAL_UNIT_STATUS;

  form = this.fb.group({
    tipo: ['', Validators.required],
    codigo: ['', Validators.required],
    localizacao: ['', Validators.required],
    status: ['disponivel', Validators.required],
    observacoes: [''],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const payload: CreateBurialUnitPayload = {
      tipo: raw.tipo!,
      codigo: raw.codigo!,
      localizacao: raw.localizacao!,
      status: raw.status!,
      observacoes: raw.observacoes ?? '',
    };

    this.submitting.set(true);
    this.submitError.set(null);

    this.createBurialUnitService.createBurialUnit(payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/main/burial-unit']);
      },
      error: (error) => {
        this.submitting.set(false);
        this.submitError.set(
          error?.error?.detail || 'Erro ao cadastrar unidade de sepultamento.'
        );
      },
    });
  }

}
