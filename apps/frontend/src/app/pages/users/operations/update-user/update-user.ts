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
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { UpdateUserApiService } from './update-user-api.service';
import { MatIcon } from "@angular/material/icon";

const passwordsMatchValidator: ValidatorFn = (
  group: AbstractControl,
): ValidationErrors | null => {
  const senha = group.get('senha')?.value;
  const confirmar = group.get('confirmarSenha')?.value;

  if (!senha && !confirmar) return null;

  return senha === confirmar ? null : { passwordMismatch: true };
};

@Component({
  selector: 'update-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIcon],
  templateUrl: './update-user.html',
  styleUrls: ['./update-user.css']
})
export class UpdateUserComponent {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly updateUserApi = inject(UpdateUserApiService);

  readonly submitting = signal(false);
  readonly submitError = signal<string | null>(null);

  private readonly userData = this.router.getCurrentNavigation()?.extras.state?.['user'];

  readonly ddds = [
    '11','12','13','14','15','16','17','18','19',
    '21','22','24','27','28',
    '31','32','33','34','35','37','38',
    '41','42','43','44','45','46','47','48','49',
    '51','53','54','55',
    '61','62','63','64','65','66','67','68','69',
    '71','73','74','75','77','79',
    '81','82','83','84','85','86','87','88','89',
    '91','92','93','94','95','96','97','98','99'
  ];

  readonly form = this.fb.group(
    {
      nome: [''],
      sexo: [''],
      dataNascimento: [''],
      email: ['', Validators.email],
      senha: [''],
      confirmarSenha: [''],
      ddd: [''],
      telefone: ['', Validators.pattern(/^9 \d{4}-\d{4}$/)]
    },
    { validators: [passwordsMatchValidator] },
  );

  constructor() {
    if (this.userData) {
      this.patchForm(this.userData);
    }
  }

  private patchForm(user: any): void {
    const phone = user.phone || '';

    const ddd = phone.substring(0, 2);
    const numero = phone.substring(2);

    const numeroFormatado = numero
      .replace(/^(\d{1})(\d)/, "$1 $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .substring(0, 11);

    this.form.patchValue({
      nome: user.name,
      sexo: user.gender,
      dataNascimento: user.birth,
      email: user.email,
      senha: '',
      confirmarSenha: '',
      ddd,
      telefone: numeroFormatado
    });
  }

  applyPhoneMask(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, "");

    if (valor.length > 0 && valor[0] !== '9') {
      valor = '9' + valor;
    }

    if (valor.length > 0) {
      valor = valor.replace(/^(\d{1})(\d)/g, "$1 $2");
      valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
    }

    const resultado = valor.substring(0, 11);
    input.value = resultado;
    this.form.get('telefone')?.setValue(resultado, { emitEvent: false });
  }

  back(): void {
    void this.router.navigateByUrl('/main/user-control-panel');
  }

  private toNull(value: any): any {
    const v = typeof value === 'string' ? value.trim() : value;
    return v === '' || v === undefined || v === null ? null : v;
  }

  onSubmit(): void {
    this.submitError.set(null);
    this.submitting.set(true);

    const v = this.form.getRawValue();

    const phone = `${v.ddd ?? ''}${(v.telefone ?? '').replace(/\D/g, '')}`;

    this.updateUserApi
      .updateUser({
        email: this.userData.email,
        user_update: {
          name: this.toNull(v.nome),
          password: this.toNull(v.senha),
          gender: this.toNull(v.sexo),
          birth: this.toNull(v.dataNascimento),
          email: this.toNull(v.email),
          phone: this.toNull(phone)
        }
      })
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => {
          alert("Atualizado com sucesso!");
          void this.router.navigateByUrl('/main/user-control-panel');
        },
        error: (err: unknown) => {
          this.submitError.set(this.formatHttpError(err));
        },
      });
  }

  private formatHttpError(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      const detail = err.error?.['detail'];
      if (typeof detail === 'string') return detail;
      if (Array.isArray(detail)) {
        return detail.map((d) => d?.['msg'] ?? JSON.stringify(d)).join(' ');
      }
      return err.message || `Erro ${err.status}`;
    }
    return 'Erro inesperado.';
  }
}