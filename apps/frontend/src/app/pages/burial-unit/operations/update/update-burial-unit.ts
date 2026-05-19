import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

import {
  BURIAL_UNIT_LOCATIONS,
  BURIAL_UNIT_STATUS,
  BURIAL_UNIT_TYPES
} from '../burial-unit-options';

import {
  BurialUnitPayload,
  UpdateBurialUnitService
} from './update-burial-unit.service';

@Component({
  standalone: true,
  selector: 'app-burial-unit-update',
  templateUrl: './update-burial-unit.html',
  styleUrl: './update-burial-unit.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink
  ]
})
export class BurialUnitUpdateComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(UpdateBurialUnitService);

  submitting = signal(false);
  submitError = signal<string | null>(null);

  typeOptions = BURIAL_UNIT_TYPES;
  locationOptions = BURIAL_UNIT_LOCATIONS;
  statusOptions = BURIAL_UNIT_STATUS;

  burialUnit: BurialUnitPayload | null = null;

  private idOriginal: number | null = null;

  form = this.fb.group({
    id: [0],
    tipo: [''],
    codigo: [''],
    localizacao: [''],
    status: [''],
    observacoes: [''],
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = Number(params['id']);

      if (!id) {
        return;
      }

      this.idOriginal = id;

      this.service.getById(id).subscribe({
        next: (data) => {
          this.burialUnit = data;

          this.form.patchValue({
            id: data.id ?? 0,
            tipo: data.tipo ?? '',
            codigo: data.codigo ?? '',
            localizacao: data.localizacao ?? '',
            status: data.status ?? 'disponivel',
            observacoes: data.observacoes ?? '',
          });
        },
        error: () => {
          this.submitError.set(
            'Erro ao carregar dados da unidade de sepultamento.'
          );
        },
      });
    });
  }

  onSubmit(): void {
    if (this.idOriginal == null) {
      return;
    }

    this.submitting.set(true);
    this.submitError.set(null);

    const raw = this.form.getRawValue();

    const payload: BurialUnitPayload = {
      id: raw.id ?? 0,
      tipo: raw.tipo ?? '',
      codigo: raw.codigo ?? '',
      localizacao: raw.localizacao ?? '',
      status: raw.status ?? '',
      observacoes: raw.observacoes ?? '',
    };

    this.service.update(this.idOriginal, payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/main/burial-unit']);
      },
      error: (error) => {
        this.submitting.set(false);
        this.submitError.set(
          error?.error?.detail ||
            'Erro ao atualizar unidade de sepultamento.'
        );
      },
    });
  }

}
