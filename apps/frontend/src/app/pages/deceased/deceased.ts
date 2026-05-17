import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { SharedTableComponent } from '../../shared/shared-table/shared-table';

import {
  DeceasedService,
  Falecido
} from './deceased.service';


@Component({
  selector: 'app-deceased',
  imports: [
    CommonModule,
    SharedTableComponent,
  ],
  templateUrl: './deceased.html',
  styleUrl: './deceased.css',
})
export class DeceasedComponent implements OnInit {

  private deceasedService = inject(DeceasedService);
  private cdr = inject(ChangeDetectorRef);

  title = 'Falecidos';

  subtitle = 'Visualize todos os falecidos cadastrados no sistema';

  columns = [
    {
      key: 'nome',
      label: 'Falecido'
    },
    {
      key: 'data',
      label: 'Data de falecimento'
    },
    {
      key: 'jazigo',
      label: 'Jazigo'
    },
    {
      key: 'status',
      label: 'Status'
    }
  ];

  data: any[] = [];

  ngOnInit(): void {
    this.loadFalecidos();
  }

  loadFalecidos(): void {

    this.deceasedService.listAll().subscribe({

      next: (response: Falecido[]) => {

        this.data = response.map(falecido => ({

          nome: falecido.nome_completo,

          data: new Date(falecido.data_falecimento)
            .toLocaleDateString('pt-BR'),

          jazigo: '-',

          status: falecido.status
        }));

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Erro ao buscar falecidos:', error);
      }
    });
  }
}

// TODO: Lembrar do Enum de status para quando for atualizar o falecido. Passar o enum aqui tambem.