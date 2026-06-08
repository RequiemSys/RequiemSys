import { Component, inject, signal } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-burial',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './create-burial.html',
  styleUrl: './create-burial.css',
})
export class CreateBurialComponent {

  private fb = inject(FormBuilder);

  private router = inject(Router);

  submitting = signal(false);

  submitError = signal<string | null>(null);

  form = this.fb.group({
    falecido: ['', Validators.required],
    data_sepultamento: ['', Validators.required],
    horario: ['', Validators.required],
    unidade_sepultamento: ['', Validators.required],
    responsavel: ['', Validators.required],
    status: ['', Validators.required],
    observacoes: ['']
  });

  onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.router.navigate([
      '/main/burial'
    ]);

  }
}
