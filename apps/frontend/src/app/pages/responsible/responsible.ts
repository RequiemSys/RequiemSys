import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { SharedTableComponent } from '../../shared/shared-table/shared-table';

import {
  Responsible,
  ResponsibleService
} from './responsible.service';
import { MatDialog } from '@angular/material/dialog';
import { SharedModalViewComponent } from '../../shared/shared-modal-view/shared-modal-view';

@Component({
  selector: 'app-responsible',
  imports: [
    CommonModule,
    SharedTableComponent
  ],
  templateUrl: './responsible.html',
  styleUrl: './responsible.css',
})
export class ResponsibleComponent implements OnInit {

  private responsibleService = inject(ResponsibleService);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  title = 'Responsáveis';
  subtitle = 'Visualize todos os responsáveis cadastrados no sistema';

  columns = [
    { key: 'responsavel', label: 'Responsável' },
    { key: 'telefone', label: 'Telefone' },
    { key: 'emailExibicao', label: 'E-mail' },
  ];

  data: any[] = [];

  ngOnInit(): void {
    this.loadResponsibles();
  }

  onDelete(item: any): void {
    const email = item.email;
    const nome = item.responsavel ?? item.name ?? 'este registro';

    if (!email) {
      alert('Não é possível excluir: responsável sem e-mail cadastrado.');
      return;
    }

    const confirmed = confirm(
      `Deseja excluir o responsável "${nome}"? Esta ação não pode ser desfeita.`
    );

    if (!confirmed) {
      return;
    }

    this.responsibleService.deleteByEmail(email).subscribe({
      next: () => this.loadResponsibles(),
      error: (error) => {
        console.error(error);
        alert('Erro ao excluir responsável.');
      },
    });
  }

  loadResponsibles(): void {
    this.responsibleService.listAll().subscribe({
      next: (response: Responsible[]) => {
        this.data = response.map((item) => ({
          ...item,
          responsavel: item.name ?? '-',
          telefone: item.phone ?? '-',
          emailExibicao: item.email ?? '-',
        }));
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  openView(item: any): void {
    if (!item?.email && !item?.emailExibicao) {
      console.error('E-mail não encontrado no item fornecido.');
      return;
    }

    const emailBusca = item.email || item.emailExibicao;

    this.responsibleService.getByEmail(emailBusca).subscribe({
      next: (responsible) => {
        console.log('Dados recebidos da API:', responsible);

        if (!responsible) {
          console.warn('API retornou um valor vazio.');
          return;
        }

        this.dialog.open(SharedModalViewComponent, {
          data: {
            title: 'Detalhes do responsável',
            fields: [
              { 
                label: 'Nome', 
                value: responsible.name ?? 'Não informado' 
              },
              { 
                label: 'Falecido', 
                value: responsible.deceased_parent ?? 'Não' 
              },
              { 
                label: 'CPF', 
                value: responsible.cpf ?? 'Não informado' 
              },
              { 
                label: 'Data de nascimento', 
                value: responsible.birth ?? responsible.birth ?? 'Não informado' 
              },
              { 
                label: 'Endereço', 
                value: responsible.address ?? 'Não informado' 
              },
              { 
                label: 'Email', 
                value: responsible.email ?? 'Não informado' 
              },
              { 
                label: 'Telefone', 
                value: responsible.phone ?? 'Não informado' 
              },
              { 
                label: 'Parentesco', 
                value: responsible.kinship ?? 'Não informado' 
              }
            ]
          }
        });
      },
      error: (error) => console.error('Erro ao buscar detalhes:', error)
    });
  }
}
