import { Component, computed, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import {
  BURIAL_UNIT_LOCATIONS,
  BURIAL_UNIT_STATUS,
  BURIAL_UNIT_TYPES
} from '../burial-unit-options';

import {
  CreateBurialUnitService,
  CreateBurialUnitPayload
} from './create-burial-unit.service';
import { DeceasedService, Falecido } from '../../../deceased/deceased.service';

@Component({
  selector: 'app-create-burial-unit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-burial-unit.html',
  styleUrl: './create-burial-unit.css',
})
export class CreateBurialUnitComponent implements OnInit {
  
  @ViewChild('modalFalecidos', { static: false }) modal!: ElementRef<HTMLDialogElement>;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private createBurialUnitService = inject(CreateBurialUnitService);
  private deceasedService = inject(DeceasedService);

  falecidos = signal<Falecido[]>([]);
  carregandoFalecidos = signal<boolean>(false);
  submitting = signal(false);
  submitError = signal<string | null>(null);
  nomeFalecidoSelecionado = signal<string>('');
  typeOptions = BURIAL_UNIT_TYPES;
  locationOptions = BURIAL_UNIT_LOCATIONS;
  statusOptions = BURIAL_UNIT_STATUS;

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
    tipo: ['', Validators.required],
    codigo: ['', Validators.required],
    localizacao: ['', Validators.required],
    status: ['disponivel', Validators.required],
    periodoConcessivo: [null, Validators.required],
    falecido_id: ['', Validators.required],
    observacoes: [''],
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
    if (this.modal && this.modal.nativeElement) {
      this.modal.nativeElement.showModal();
    }
  }

  fecharModal(): void {
    if (this.modal && this.modal.nativeElement) {
      this.modal.nativeElement.close();
    }
  }

  atualizarFiltro(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filtroNome.set(input.value);
  }

  selecionarFalecido(falecido: Falecido): void {
    const idValido = falecido.id ?? (falecido as any).deceased_id;
    
    if (idValido !== undefined && idValido !== null) {
      this.form.patchValue({ falecido_id: String(idValido) });
      this.nomeFalecidoSelecionado.set(falecido.nome_completo || '');
    } else {
      console.error('ID não encontrado no objeto do falecido:', falecido);
    }
    
    this.fecharModal();
  }

  fecharPorFora(event: MouseEvent): void {
    if (!this.modal || !this.modal.nativeElement) return;

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

    const formatDateOnly = (date: Date | null | undefined): string => {
      if (!date) return '';
      
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    };

    const raw = this.form.getRawValue();
    
    let idTratado = raw.falecido_id;
    if (idTratado === 'undefined' || idTratado === 'null' || !idTratado) {
      this.submitError.set('ID do falecido inválido ou não selecionado.');
      return;
    }

    const payload: CreateBurialUnitPayload = {
      tipo: raw.tipo!,
      codigo: raw.codigo!,
      localizacao: raw.localizacao!,
      status: raw.status!,
      observacoes: raw.observacoes ?? '',
      data_final_concessao: formatDateOnly(raw.periodoConcessivo),
      falecido_id: Number(idTratado),
    };

    this.submitting.set(true);
    this.submitError.set(null);

    this.createBurialUnitService.createBurialUnit(payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/main/burial-unit']);
      },
      error: (error) => {
        this.submitting.set(false);
        this.submitError.set(
          error?.error?.detail || 'Erro ao cadastrar unidade de sepultamento.'
        );
      },
    });
  }
}