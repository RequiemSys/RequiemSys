import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { DEFAULT_USER_TYPE } from '../../core/api.config';
import { CreateUserApiService } from '../../core/create-user-api.service';

/**
 * Tela: Área de Cadastro — Dados do Falecido e Informações de óbito.
 * Componente standalone: importe em uma rota ou declare onde preferir.
 *
 * Exemplo de rota:
 * { path: 'login/login-dois/registro', component: Registro }
 */

const passwordsMatchValidator: ValidatorFn = (
  group: AbstractControl,
): ValidationErrors | null => {
  const senha = group.get('senha')?.value;
  const confirmar = group.get('confirmarSenha')?.value;
  const a = senha ?? '';
  const b = confirmar ?? '';
  return a === b ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})

export class Registro {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly createUserApi = inject(CreateUserApiService);

  readonly submitting = signal(false);
  readonly submitError = signal<string | null>(null);

  /** DDDs comuns — ajuste ou carregue do backend se precisar. */
  readonly ddds = [
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '21',
    '22',
    '24',
    '27',
    '28',
    '31',
    '32',
    '33',
    '34',
    '35',
    '37',
    '38',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '51',
    '53',
    '54',
    '55',
    '61',
    '62',
    '63',
    '64',
    '65',
    '66',
    '67',
    '68',
    '69',
    '71',
    '73',
    '74',
    '75',
    '77',
    '79',
    '81',
    '82',
    '83',
    '84',
    '85',
    '86',
    '87',
    '88',
    '89',
    '91',
    '92',
    '93',
    '94',
    '95',
    '96',
    '97',
    '98',
    '99',
  ];

  readonly form = this.fb.group(
    {
      nome: ['', Validators.required],
      sexo: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      confirmarSenha: ['', Validators.required],
      ddd: ['', Validators.required],
      telefone: ['', Validators.required],
    },
    { validators: [passwordsMatchValidator] },
  );

  voltar(): void {
    void this.router.navigateByUrl('/login');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitError.set(null);
    this.submitting.set(true);

    const v = this.form.getRawValue();
    const phone = `${v.ddd ?? ''}${(v.telefone ?? '').replace(/\D/g, '')}`;

    this.createUserApi
      .createUser({
        name: (v.nome ?? '').trim(),
        password: v.senha ?? '',
        gender: v.sexo ?? '',
        birth: v.dataNascimento ?? '',
        email: (v.email ?? '').trim(),
        phone,
        user_type: DEFAULT_USER_TYPE,
      })
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => {
          void this.router.navigateByUrl('/login');
        },
        error: (err: unknown) => {
          this.submitError.set(this.formatHttpError(err));
        },
      });
  }

  private formatHttpError(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      const detail = err.error?.['detail'];
      if (typeof detail === 'string') {
        return detail;
      }
      if (Array.isArray(detail)) {
        return detail.map((d) => d?.['msg'] ?? JSON.stringify(d)).join(' ');
      }
      if (err.error && typeof err.error === 'object' && 'message' in err.error) {
        return String((err.error as { message: unknown }).message);
      }
      return err.message || `Erro ${err.status}: não foi possível concluir o cadastro.`;
    }
    return 'Não foi possível concluir o cadastro. Tente novamente.';
  }
}
