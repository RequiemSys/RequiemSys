import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { SharedTableComponent } from '../../shared/shared-table/shared-table';
import { SharedModalViewComponent } from '../../shared/shared-modal-view/shared-modal-view';

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
  private dialog = inject(MatDialog);

  title = 'Falecidos';

  subtitle = 'Visualize todos os falecidos cadastrados no sistema';

  columns = [
    { key: 'nome', label: 'Falecido' },
    { key: 'data', label: 'Data de falecimento' },
    { key: 'jazigo', label: 'Jazigo' },
    { key: 'status', label: 'Status' }
  ];

  data: any[] = [];

  ngOnInit(): void {
    this.loadFalecidos();
  }

  loadFalecidos(): void {

    this.deceasedService.listAll().subscribe({

      next: (response: Falecido[]) => {

        this.data = response.map(f => ({

          ...f,

          nome: f.nome_completo,

          data: f.data_falecimento
            ? new Date(f.data_falecimento)
              .toLocaleDateString('pt-BR')
            : '-',

          jazigo: f.jazigo || '-',

          editValue: f.cpf

        }));

        this.cdr.detectChanges();

      },

      error: (error) => console.error(error)

    });

  }

  onDelete(item: any): void {
    const cpf = item.cpf;
    const nome = item.nome ?? item.nome_completo ?? 'este registro';

    if (!cpf) {
      return;
    }

    const confirmed = confirm(
      `Deseja excluir o falecido "${nome}"? Esta ação não pode ser desfeita.`
    );

    if (!confirmed) {
      return;
    }

    this.deceasedService.deleteByCpf(cpf).subscribe({
      next: () => this.loadFalecidos(),
      error: (error) => {
        console.error(error);
        alert('Erro ao excluir falecido.');
      },
    });
  }

  openView(item: any): void {

    this.deceasedService.getByCpf(item.cpf).subscribe({

      next: (falecido) => {

        this.dialog.open(
          SharedModalViewComponent,
          {

            data: {

              title: 'Detalhes do falecido',

              fields: [

                {
                  label: 'Nome',
                  value: falecido.nome_completo
                },

                {
                  label: 'CPF',
                  value: falecido.cpf
                },

                {
                  label: 'Data de nascimento',
                  value: falecido.data_nascimento
                },

                {
                  label: 'Data de falecimento',
                  value: falecido.data_falecimento
                },

                {
                  label: 'Sexo',
                  value: falecido.sexo
                },

                {
                  label: 'Naturalidade',
                  value: falecido.naturalidade
                },

                {
                  label: 'Nacionalidade',
                  value: falecido.nacionalidade
                },

                {
                  label: 'Estado civil',
                  value: falecido.estado_civil
                },

                {
                  label: 'Causa da morte',
                  value: falecido.causa_morte
                },

                {
                  label: 'Nome da mãe',
                  value: falecido.nome_mae
                },

                {
                  label: 'Nome do pai',
                  value: falecido.nome_pai
                },

                {
                  label: 'Declaração de óbito',
                  value: falecido.num_declaracao_obito
                },

                {
                  label: 'Observações',
                  value: falecido.observacoes
                },

                {
                  label: 'Status',
                  value: falecido.status
                }

              ]

            }

          }

        );

      },

      error: (error) => console.error(error)

    });

  }

  onViewJazigo(jazigo: any): void {
    const dialogData = {
      title: 'Detalhes do Jazigo',
      fields: [
        { label: 'Identificação', value: jazigo?.identificacao || jazigo?.nome || 'Não informado' },
        { label: 'Localização', value: jazigo?.localizacao || 'Não informada' },
        { label: 'Status', value: jazigo?.status || 'Não informado' }
      ]
    };

    this.dialog.open(SharedModalViewComponent, {
      data: dialogData,
      width: '500px'
    });
  }

}