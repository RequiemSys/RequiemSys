import { Component, computed, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DeceasedService, Falecido } from '../../../deceased/deceased.service';
import { CreateBurialService, CreateBurialPayload } from './create-burial.service';

@Component({
  selector: 'app-create-burial',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './create-burial.html',
  styleUrl: './create-burial.css',
})
export class CreateBurialComponent implements OnInit {

  @ViewChild('modalFalecidos', { static: false }) modal!: ElementRef<HTMLDialogElement>;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private deceasedService = inject(DeceasedService);
  private createBurialService = inject(CreateBurialService);

  falecidos = signal<Falecido[]>([]);
  carregandoFalecidos = signal<boolean>(false);
  submitting = signal(false);
  submitError = signal<string | null>(null);
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
    falecido_id: ['', Validators.required],
    data_sepultamento: ['', Validators.required],
    status: ['pendente', Validators.required]
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

    this.submitting.set(true);
    this.submitError.set(null);

    const raw = this.form.getRawValue();
    
    let idTratado = raw.falecido_id;
    if (idTratado === 'undefined' || idTratado === 'null' || !idTratado) {
      this.submitError.set('ID do falecido inválido ou não selecionado.');
      this.submitting.set(false);
      return;
    }

    const payload: CreateBurialPayload = {
      falecido_id: Number(idTratado),
      data_sepultamento: raw.data_sepultamento!,
      status: raw.status!
    };

    this.createBurialService.createBurial(payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/main/burial']);
      },
      error: (error) => {
        this.submitting.set(false);
        this.submitError.set(
          error?.error?.detail || 'Erro ao cadastrar sepultamento.'
        );
      }
    });
  }
}