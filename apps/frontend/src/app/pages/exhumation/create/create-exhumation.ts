import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
  computed
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
} from '../../deceased/deceased.service';

import {
  CreateExhumationleService,
  CreateExhumationPayload
} from './create-exhumation.service';

@Component({
  selector: 'app-create-responsible',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './create-exhumation.html',
  styleUrl: './create-exhumation.css',
})
export class CreateExhumationComponent implements OnInit {

  @ViewChild('modalFalecidos') modal!: ElementRef<HTMLDialogElement>;

  private fb = inject(FormBuilder);

  private router = inject(Router);

  private CreateExhumationleService = inject(CreateExhumationleService);

  private deceasedService = inject(DeceasedService);

  submitting = signal(false);

  submitError = signal<string | null>(null);

  falecidos = signal<Falecido[]>([]);

  carregandoFalecidos = signal<boolean>(false);

  nomeFalecidoSelecionado = signal<string>('');

  filtroNome = signal<string>('');

  falecidosFiltrados = computed(() => {
    const termo = this.filtroNome().toLowerCase().trim();
    if (!termo) {
      return this.falecidos();
    }
    return this.falecidos().filter(f => 
      f.nome_completo?.toLowerCase().includes(termo)
    );
  });

  form = this.fb.group({
    date: ['', Validators.required],
    reason: ['', Validators.required],
    deceased_id: ['', Validators.required],
  });

  ngOnInit(): void {
    this.loadDeceasedOptions();
  }

  loadDeceasedOptions(): void {
    this.carregandoFalecidos.set(true);
    this.deceasedService.listAll().subscribe({
      next: (response) => {
        this.falecidos.set(response);
        this.carregandoFalecidos.set(false);
      },
      error: (error) => {
        console.error(error);
        this.carregandoFalecidos.set(false);
      },
    });
  }

  abrirModal(): void {
    this.filtroNome.set('');
    this.modal.nativeElement.showModal();
  }

  fecharModal(): void {
    this.modal.nativeElement.close();
  }

  atualizarFiltro(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filtroNome.set(input.value);
  }

  selecionarFalecido(falecido: Falecido): void {
    this.form.patchValue({ deceased_id: String(falecido.id) });
    this.nomeFalecidoSelecionado.set(falecido.nome_completo || '');
    this.fecharModal();
  }

  fecharPorFora(event: MouseEvent): void {
    const rect = this.modal.nativeElement.getBoundingClientRect();
    const clicouDentro = (
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom &&
      event.clientX >= rect.left &&
      event.clientX <= rect.right
    );
    if (!clicouDentro) {
      this.fecharModal();
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    const payload: CreateExhumationPayload = {
      date: raw.date!,
      reason: raw.reason!,
      deceased_id: Number(raw.deceased_id),
    };

    this.submitting.set(true);
    this.submitError.set(null);

    this.CreateExhumationleService.createExhumation(payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/main/exhumation']);
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
