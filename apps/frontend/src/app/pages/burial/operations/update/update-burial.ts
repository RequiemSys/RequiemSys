import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BurialPayload, UpdateBurialService } from './update-burial.service';

@Component({
  standalone: true,
  selector: 'app-update-burial',
  templateUrl: './update-burial.html',
  styleUrl: './update-burial.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink
  ]
})
export class UpdateBurialComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(UpdateBurialService);

  submitting = signal(false);
  submitError = signal<string | null>(null);

  burial: BurialPayload | null = null;
  private idOriginal: number | null = null;

  form = this.fb.group({
    id: [0],
    falecido_id: [null as number | null, Validators.required],
    data_sepultamento: ['', Validators.required],
    status: ['', Validators.required]
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = Number(params['id']);

      if (!id) {
        return;
      }

      this.idOriginal = id;

      this.service.getById(id).subscribe({
        next: (data) => {
          this.burial = data;
          this.form.patchValue({
            id: data.id ?? 0,
            falecido_id: data.falecido_id ?? null,
            data_sepultamento: data.data_sepultamento ?? '',
            status: data.status ?? 'Agendamento pendente'
          });
        },
        error: () => {
          this.submitError.set('Erro ao carregar dados do sepultamento.');
        }
      });
    });
  }

  onSubmit(): void {
    if (this.idOriginal === null || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.submitError.set(null);

    const rawValue = this.form.getRawValue();
    const payload: BurialPayload = {
      id: rawValue.id ?? undefined,
      falecido_id: rawValue.falecido_id as number,
      data_sepultamento: rawValue.data_sepultamento as string,
      status: rawValue.status as string
    };

    this.service.update(this.idOriginal, payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/main/burial']);
      },
      error: (error) => {
        this.submitting.set(false);
        this.submitError.set('Erro ao atualizar sepultamento. Tente novamente.');
        console.error(error);
      }
    });
  }
}