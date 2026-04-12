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
  template: `
    <div class="page">
      <header class="top-bar">
        <div class="brand" aria-label="RequiemSys">
          <span class="brand-text">
            Requie<span class="brand-flame-wrap"
              >m<span class="brand-flame" aria-hidden="true"></span></span
            >Sys
          </span>
        </div>
      </header>

      <main class="card">
        <h1 class="title">Área de Cadastro</h1>
        <p class="breadcrumb">login/login-dois/registro</p>
        <hr class="divider" />

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form">
          <h2 class="section-title">
            Dados do Colaborador
          </h2>

          <div class="grid">
            <div class="field">
              <label for="nome"
                >Nome <span class="req">*</span></label
              >
              <input id="nome" type="text" formControlName="nome" />
            </div>
            <div class="field">
              <label for="sexo"
                >Sexo <span class="req">*</span></label
              >
              <select id="sexo" formControlName="sexo">
                <option value="" disabled selected hidden>Selecione</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="O">Outro</option>
              </select>
            </div>

            <div class="field">
              <label for="dataNascimento"
                >Data de Nascimento <span class="req">*</span></label
              >
              <div class="input-date-wrap">
                <input id="dataNascimento" type="date" formControlName="dataNascimento" />
              </div>
            </div>
            <div class="field">
              <label for="cpf">CPF <span class="req">*</span></label>
              <input
                id="cpf"
                type="text"
                formControlName="cpf"
                placeholder="000.000.000-00"
                maxlength="14"
              />
            </div>

            <div class="field">
              <label for="email"
                >Email <span class="req">*</span></label
              >
              <input id="email" type="email" formControlName="email" />
            </div>
            <div class="field">
              <label for="telefone"
                >Telefone <span class="req">*</span></label
              >
              <div class="phone-row">
                <select
                  id="ddd"
                  formControlName="ddd"
                  class="ddd"
                  aria-label="DDD"
                >
                  <option value="" disabled selected hidden>DDD</option>
                  @for (d of ddds; track d) {
                    <option [value]="d">{{ d }}</option>
                  }
                </select>
                <input
                  id="telefone"
                  type="tel"
                  formControlName="telefone"
                  class="phone-num"
                  placeholder="9 0000-0000"
                />
              </div>
            </div>
          </div>

          <div class="roles">
            <div class="role-block">
              <label class="check-label">
                <input type="checkbox" formControlName="isAdmin" />
                Sou ADM
              </label>
              @if (form.controls.isAdmin.value) {
                <div class="field role-field">
                  <label for="adminId"
                    >ID do Administrador <span class="req-blue">*</span></label
                  >
                  <input id="adminId" type="text" formControlName="adminId" />
                </div>
              }
            </div>

            <div class="role-block">
              <label class="check-label">
                <input type="checkbox" formControlName="isEmployee" />
                Sou Funcionário
              </label>
              @if (form.controls.isEmployee.value) {
                <div class="field role-field">
                  <label for="matricula"
                    >Matrícula do Func.
                    <span class="req-blue">*</span></label
                  >
                  <input id="matricula" type="text" formControlName="matricula" />
                </div>
              }
            </div>
          </div>

          <div class="actions">
            <button type="button" class="btn btn-secondary" (click)="onCancel()">
              Cancelar
            </button>
            <button type="submit" class="btn btn-primary">Continuar</button>
          </div>
        </form>
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family:
          system-ui,
          -apple-system,
          'Segoe UI',
          Roboto,
          sans-serif;
        color: #1a1a1a;
      }

      .page {
        min-height: 100vh;
        background: #e9e9eb;
        padding: 1.25rem 1rem 2.5rem;
        box-sizing: border-box;
      }

      .top-bar {
        display: flex;
        justify-content: flex-end;
        max-width: 920px;
        margin: 0 auto 1rem;
      }

      .brand {
        font-weight: 700;
        font-size: 1.1rem;
        color: #2c2c2c;
        letter-spacing: 0.02em;
      }

      .brand-text {
        position: relative;
      }

      .brand-flame-wrap {
        position: relative;
      }

      .brand-flame {
        position: absolute;
        left: 50%;
        bottom: 100%;
        transform: translateX(-50%);
        width: 10px;
        height: 12px;
        margin-bottom: 1px;
        background: linear-gradient(180deg, #ff9f1a 0%, #e85d04 100%);
        border-radius: 40% 40% 45% 45%;
        box-shadow: 0 0 3px rgba(232, 93, 4, 0.5);
      }

      .brand-flame::after {
        content: '';
        position: absolute;
        inset: 2px 2px 3px;
        background: linear-gradient(180deg, #ffcc4d 0%, transparent 100%);
        border-radius: inherit;
        opacity: 0.85;
      }

      .card {
        max-width: 920px;
        margin: 0 auto;
        background: #fff;
        border: 1px solid #c8c8cc;
        border-radius: 6px;
        padding: 2rem 2.25rem 2.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      }

      .title {
        margin: 0 0 0.5rem;
        font-size: 1.35rem;
        font-weight: 700;
        text-align: center;
      }

      .breadcrumb {
        margin: 0 0 0.75rem;
        text-align: center;
        font-size: 0.9rem;
        color: #444;
      }

      .divider {
        border: none;
        border-top: 1px solid #c8c8cc;
        margin: 0 0 1.5rem;
      }

      .section-title {
        margin: 0 0 1.25rem;
        font-size: 1rem;
        font-weight: 700;
      }

      .form {
        margin: 0;
      }

      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem 1.5rem;
      }

      @media (max-width: 720px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
      }

      .field label {
        font-size: 0.875rem;
        font-weight: 600;
      }

      .req {
        color: #c62828;
        font-weight: 700;
      }

      .req-blue {
        color: #2f4eb2;
        font-weight: 700;
      }

      .field input,
      .field select {
        padding: 0.55rem 0.65rem;
        border: 1px solid #b0b0b8;
        border-radius: 6px;
        font-size: 0.95rem;
        background: #fff;
        box-sizing: border-box;
      }

      .field input:focus,
      .field select:focus {
        outline: 2px solid #4454b4;
        outline-offset: 1px;
        border-color: #4454b4;
      }

      .input-date-wrap input {
        width: 100%;
      }

      .phone-row {
        display: flex;
        gap: 0.5rem;
        align-items: stretch;
      }

      .phone-row .ddd {
        flex: 0 0 5.5rem;
        min-width: 0;
      }

      .phone-row .phone-num {
        flex: 1;
        min-width: 0;
      }

      .roles {
        margin-top: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }

      .role-block {
        display: flex;
        flex-direction: column;
        gap: 0.65rem;
      }

      .check-label {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
      }

      .check-label input {
        width: 1rem;
        height: 1rem;
        accent-color: #4454b4;
      }

      .role-field {
        max-width: 100%;
      }

      .actions {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 2rem;
        flex-wrap: wrap;
      }

      .btn {
        min-width: 8.5rem;
        padding: 0.6rem 1.5rem;
        font-size: 0.95rem;
        font-weight: 600;
        border-radius: 6px;
        cursor: pointer;
        border: 1px solid transparent;
      }

      .btn-primary {
        background: #4454b4;
        color: #fff;
        border-color: #3a4899;
      }

      .btn-primary:hover {
        background: #3a4899;
      }

      .btn-secondary {
        background: #e4e4e8;
        color: #2f4eb2;
        border-color: #c8c8cc;
      }

      .btn-secondary:hover {
        background: #dadade;
      }
    `,
  ],
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
