import { Component, computed, ElementRef, inject, OnInit, signal, ViewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

import {
  DeceasedService,
  Falecido
} from '../../../deceased/deceased.service';

import {
  Responsible,
  UpdateResponsibleService
} from './update-responsible.service';

@Component({
  standalone: true,
  selector: 'app-responsible-update',
  templateUrl: './update-responsible.html',
  styleUrl: './update-responsible.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink
  ]
})
export class ResponsibleUpdateComponent implements OnInit {
  @ViewChild('modalFalecidos') modal!: ElementRef<HTMLDialogElement>;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(UpdateResponsibleService);
  private deceasedService = inject(DeceasedService);

  submitting = signal(false);
  submitError = signal<string | null>(null);
  deceasedOptions = signal<Falecido[]>([]);

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

  responsible: Responsible | null = null;
  private emailOriginal = '';

  form = this.fb.group({
    id: [0],
    name: [''],
    birth: [''],
    kinship: [''],
    cpf: [''],
    phone: [''],
    email: [''],
    address: [''],
    deceased_id: [''],
  });

  constructor() {
    effect(() => {
      const lista = this.falecidos();
      const resp = this.responsible;
      
      if (lista.length > 0 && resp && resp.deceased_id) {
        const vinculado = lista.find(f => f.id === resp.deceased_id);
        if (vinculado) {
          this.nomeFalecidoSelecionado.set(vinculado.nome_completo || '');
        }
      }
    });
  }

  ngOnInit(): void {
    // Carrega a lista de falecidos primeiro
    this.loadDeceasedOptions();

    this.route.queryParams.subscribe((params) => {
      const email = params['email'];

      if (!email) {
        return;
      }

      this.emailOriginal = email;

      this.service.getByEmail(email).subscribe({
        next: (data) => {
          this.responsible = data;

          this.form.patchValue({
            id: data.id ?? 0,
            name: data.name ?? '',
            birth: data.birth ? data.birth.substring(0, 10) : '',
            kinship: data.kinship ?? '',
            cpf: data.cpf ?? '',
            phone: data.phone ?? '',
            email: data.email ?? '',
            address: data.address ?? '',
            deceased_id: data.deceased_id != null ? String(data.deceased_id) : '',
          });
        },
        error: () => {
          this.submitError.set('Erro ao carregar dados do responsável.');
        },
      });
    });
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
    this.submitting.set(true);
    this.submitError.set(null);

    const raw = this.form.getRawValue();

    const payload: Responsible = {
      id: raw.id ?? 0,
      name: raw.name ?? '',
      birth: raw.birth ?? '',
      cpf: raw.cpf ?? '',
      kinship: raw.kinship ?? '',
      phone: raw.phone ?? '',
      email: raw.email ?? '',
      address: raw.address ?? '',
      deceased_id: Number(raw.deceased_id),
    };

    this.service.update(this.emailOriginal, payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/main/responsible']);
      },
      error: (error) => {
        this.submitting.set(false);
        this.submitError.set(
          error?.error?.detail || 'Erro ao atualizar responsável.'
        );
      },
    });
  }
}