import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ExhumationPayload, UpdateExhumationService } from './update-exhumation.service';

@Component({
  standalone: true,
  selector: 'app-update-exhumation',
  templateUrl: './update-exhumation.html',
  styleUrl: './update-exhumation.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink
  ]
})
export class UpdateExhumationComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(UpdateExhumationService);

  submitting = signal(false);
  submitError = signal<string | null>(null);

  statusOptions = [
    'Apto para exumação',
    'Exumado',
    'Ossário'
  ];

  exhumation: ExhumationPayload | null = null;

  form = this.fb.group({
    nome_completo: [''],
    cpf: [''],
    sexo: [''],
    data_nascimento: [''],
    data_falecimento: [''],
    naturalidade: [''],
    nacionalidade: [''],
    estado_civil: [''],
    causa_morte: [''],
    nome_mae: [''],
    nome_pai: [''],
    num_declaracao_obito: [''],
    observacoes: [''],
    status: ['']
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const cpf = params['cpf'];

      if (!cpf) {
        return;
      }

      this.service.getByCpf(cpf).subscribe({
        next: (data) => {
          this.exhumation = data;
          this.form.patchValue({
            nome_completo: data.nome_completo ?? '',
            cpf: data.cpf ?? '',
            sexo: data.sexo ?? '',
            data_nascimento: data.data_nascimento ?? '',
            data_falecimento: data.data_falecimento ?? '',
            naturalidade: data.naturalidade ?? '',
            nacionalidade: data.nacionalidade ?? '',
            estado_civil: data.estado_civil ?? '',
            causa_morte: data.causa_morte ?? '',
            nome_mae: data.nome_mae ?? '',
            nome_pai: data.nome_pai ?? '',
            num_declaracao_obito: data.num_declaracao_obito ?? '',
            observacoes: data.observacoes ?? '',
            status: data.status ?? ''
          });
        },
        error: () => {
          this.submitError.set('Erro ao carregar dados da exumação.');
        }
      });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const cpf = this.exhumation?.cpf;
    if (!cpf) {
      this.submitError.set('CPF inválido para atualização.');
      return;
    }

    this.submitting.set(true);
    this.submitError.set(null);

    const payload = this.form.getRawValue() as ExhumationPayload;

    this.service.update(cpf, payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/main/exhumation']);
      },
      error: (error) => {
        this.submitting.set(false);
        this.submitError.set(
          error?.error?.detail || 'Erro ao atualizar exumação.'
        );
      }
    });
  }
}
