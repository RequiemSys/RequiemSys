import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule
} from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import {
  Falecido,
  FalecidoService
} from './update-deceased.service';

import { MatIcon } from '@angular/material/icon';

const STATUS_FALECIDO = [
  'sepultamento pendente',
  'aguardando documentacao',
  'em velorio',
  'sepultado',
  'cremado',
  'apto para exumacao',
  'exumado',
  'ossario',
  'transferido',
  'inumado temporariamente',
  'nao reclamado'
];

@Component({
  standalone: true,
  selector: 'app-falecido-update',
  templateUrl: './update-deceased.html',
  styleUrls: ['./update-deceased.css'],
  imports: [
    MatIcon,
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class FalecidoUpdateComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(FalecidoService);

  submitting = signal(false);
  submitError = signal<string | null>(null);

  statusList = STATUS_FALECIDO;

  falecido: Falecido | null = null;

  form = this.fb.group({
    id: [0],
    nome_completo: [''],
    cpf: [''],
    sexo: [''],
    data_nascimento: [''],
    data_falecimento: [''],
    estado_civil: [''],
    naturalidade: [''],
    nacionalidade: [''],
    nome_mae: [''],
    nome_pai: [''],
    causa_morte: [''],
    num_declaracao_obito: [''],
    observacoes: [''],
    status: ['']
  });

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      const cpf = params['cpf'];

      console.log('CPF RECEBIDO:', cpf);

      if (!cpf) {
        return;
      }

      this.service.getByCpf(cpf).subscribe({

        next: (data: Falecido) => {

          console.log('DADOS BACKEND:', data);

          this.falecido = data;

          this.form.patchValue({
            id: data.id ?? 0,
            nome_completo: data.nome_completo ?? '',
            cpf: data.cpf ?? '',
            sexo: data.sexo ?? '',
            data_nascimento: data.data_nascimento
              ? data.data_nascimento.substring(0, 10)
              : '',
            data_falecimento: data.data_falecimento
              ? data.data_falecimento.substring(0, 10)
              : '',
            estado_civil: data.estado_civil ?? '',
            naturalidade: data.naturalidade ?? '',
            nacionalidade: data.nacionalidade ?? '',
            nome_mae: data.nome_mae ?? '',
            nome_pai: data.nome_pai ?? '',
            causa_morte: data.causa_morte ?? '',
            num_declaracao_obito: data.num_declaracao_obito ?? '',
            observacoes: data.observacoes ?? '',
            status: data.status ?? ''
          });

          console.log('FORM:', this.form.value);

        },

        error: (err) => {

          console.log('ERRO GET:', err);

          this.submitError.set(
            'Erro ao carregar dados'
          );

        }

      });

    });

  }

  onSubmit(): void {

    this.submitting.set(true);

    const value = this.form.getRawValue() as Falecido;

    console.log('PAYLOAD UPDATE:', value);

    this.service.update(value.cpf, value).subscribe({

      next: (response) => {

        console.log('UPDATE SUCCESS:', response);

        this.submitting.set(false);

        this.router.navigate([
          '/main/deceased'
        ]);

      },

      error: (err) => {

        console.log('ERRO UPDATE:', err);

        this.submitting.set(false);

        this.submitError.set(
          'Erro ao atualizar registro'
        );

      }

    });

  }

}