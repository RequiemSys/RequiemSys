import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**
 * Tela: Área de Cadastro — Dados do Falecido e Informações de óbito.
 * Componente standalone: importe em uma rota ou declare onde preferir.
 *
 * Exemplo de rota:
 * { path: 'login/login-dois/registro', component: Registro }
 */
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})

export class Registro {
  private readonly fb = inject(FormBuilder);

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

  readonly form = this.fb.group({
    nome: ['', Validators.required],
    sexo: ['', Validators.required],
    dataNascimento: ['', Validators.required],
    cpf: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    ddd: ['', Validators.required],
    telefone: ['', Validators.required],
    isAdmin: [false],
    adminId: [''],
    isEmployee: [false],
    matricula: [''],
  });

  constructor() {
    const adminId = this.form.controls.adminId;
    const matricula = this.form.controls.matricula;

    this.form.controls.isAdmin.valueChanges.subscribe((on) => {
      if (on) {
        adminId.setValidators([Validators.required]);
      } else {
        adminId.clearValidators();
        adminId.setValue('');
      }
      adminId.updateValueAndValidity({ emitEvent: false });
    });

    this.form.controls.isEmployee.valueChanges.subscribe((on) => {
      if (on) {
        matricula.setValidators([Validators.required]);
      } else {
        matricula.clearValidators();
        matricula.setValue('');
      }
      matricula.updateValueAndValidity({ emitEvent: false });
    });
  }

  onCancel(): void {
    this.form.reset({
      isAdmin: false,
      isEmployee: false,
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Integrar com serviço / rota no projeto principal
    console.log(this.form.getRawValue());
  }
}
