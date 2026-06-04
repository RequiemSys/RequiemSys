import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

import {
  DeceasedService,
  Falecido
} from '../../../deceased/deceased.service';

import {
  CreateResponsibleService,
  CreateResponsiblePayload
} from './create-responsible.service';

@Component({
  selector: 'app-create-responsible',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './create-responsible.html',
  styleUrl: './create-responsible.css',
})
export class CreateResponsibleComponent implements OnInit {

  private fb = inject(FormBuilder);

  private router = inject(Router);

  private createResponsibleService = inject(CreateResponsibleService);

  private deceasedService = inject(DeceasedService);

  submitting = signal(false);

  submitError = signal<string | null>(null);

  deceasedOptions = signal<Falecido[]>([]);

  form = this.fb.group({
    name: ['', Validators.required],
    birth: ['', Validators.required],
    kinship: ['', Validators.required],
    cpf: ['', Validators.required],
    phone: [''],
    email: [''],
    address: ['', Validators.required],
    deceased_id: ['', Validators.required],
  });

  ngOnInit(): void {
    this.loadDeceasedOptions();
  }

  loadDeceasedOptions(): void {
    this.deceasedService.listAll().subscribe({
      next: (response) => this.deceasedOptions.set(response),
      error: (error) => console.error(error),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    const payload: CreateResponsiblePayload = {
      name: raw.name!,
      birth: raw.birth!,
      cpf: raw.cpf!,
      kinship: raw.kinship!,
      phone: raw.phone ?? '',
      email: raw.email ?? '',
      address: raw.address!,
      deceased_id: Number(raw.deceased_id),
    };

    this.submitting.set(true);
    this.submitError.set(null);

    this.createResponsibleService.createResponsible(payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/main/responsible']);
      },
      error: (error) => {
        this.submitting.set(false);
        this.submitError.set(
          error?.error?.detail || 'Erro ao cadastrar responsável.'
        );
      },
    });
  }

}
