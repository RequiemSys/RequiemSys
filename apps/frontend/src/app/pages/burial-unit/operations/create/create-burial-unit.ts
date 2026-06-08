import { Component, inject, signal } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
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
    RouterLink,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
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
    periodoConcessivo: [null, Validators.required],
    observacoes: [''],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

  const formatDateOnly = (date: Date | null | undefined): string => {
    if (!date) return '';
    
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

    const raw = this.form.getRawValue();
    const payload: CreateBurialUnitPayload = {
      tipo: raw.tipo!,
      codigo: raw.codigo!,
      localizacao: raw.localizacao!,
      status: raw.status!,
      observacoes: raw.observacoes ?? '',
      data_final_concessao: formatDateOnly(raw.periodoConcessivo),
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
