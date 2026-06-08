import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CreateBurialService, CreateBurialPayload } from './create-burial.service';

@Component({
  standalone: true,
  selector: 'app-create-burial',
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
  private createBurialService = inject(CreateBurialService);

  submitting = signal(false);
  submitError = signal<string | null>(null);

  form = this.fb.group({
    falecido_id: [null, Validators.required],
    data_sepultamento: ['', Validators.required],
    status: ['Agendamento pendente', Validators.required]
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.submitError.set(null);

    const payload = this.form.getRawValue() as CreateBurialPayload;

    this.createBurialService.createBurial(payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/main/burial']);
      },
      error: (error) => {
        this.submitting.set(false);
        this.submitError.set(
          error?.error?.detail || 'Erro ao cadastrar sepultamento.'
        );
      }
    });
  }
}
