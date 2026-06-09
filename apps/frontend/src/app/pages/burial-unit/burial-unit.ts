import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { SharedTableComponent } from '../../shared/shared-table/shared-table';

import {
  BurialUnit,
  BurialUnitService
} from './burial-unit.service';
import { SharedModalViewComponent } from '../../shared/shared-modal-view/shared-modal-view';

import { formatBurialUnitStatus } from './operations/burial-unit-options';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-burial-unit',
  imports: [
    CommonModule,
    SharedTableComponent,
  ],
  templateUrl: './burial-unit.html',
  styleUrl: './burial-unit.css',
})
export class BurialUnitComponent implements OnInit {

  private burialUnitService = inject(BurialUnitService);
  private cdr = inject(ChangeDetectorRef);

  title = 'Unidades de Sepultamento';
  subtitle = 'Visualize todas as unidades de sepultamento cadastradas no sistema';

  columns = [
    { key: 'jazigo', label: 'Jazigo' },
    { key: 'falecido', label: 'Falecido' },
    { key: 'status', label: 'Status' },
    { key: 'concessao', label: 'Concessão até' },
  ];

  data: any[] = [];
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadBurialUnits();
  }

  onDelete(item: any): void {
    const id = item.id;
    const label = item.jazigo ?? item.codigo ?? 'este registro';

    if (id == null) {
      alert('Não é possível excluir: unidade sem identificador.');
      return;
    }

    const confirmed = confirm(
      `Deseja excluir a unidade "${label}"? Esta ação não pode ser desfeita.`
    );

    if (!confirmed) {
      return;
    }

    this.burialUnitService.deleteById(id).subscribe({
      next: () => this.loadBurialUnits(),
      error: (error) => {
        console.error(error);
        alert('Erro ao excluir unidade de sepultamento.');
      },
    });
  }

  loadBurialUnits(): void {
    this.burialUnitService.listAll().subscribe({
      next: (response: BurialUnit[]) => {
        this.data = response.map((item) => ({
          ...item,
          jazigo: item.codigo ?? '-',
          falecido: item.falecido.nome_completo ?? '-',
          status: formatBurialUnitStatus(item.status),
          concessao: item.data_final_concessao ?? '-',
        }));
        this.cdr.detectChanges();
      },
      error: (error) => console.error(error),
    });
  }
  openView(item: any): void {
    if (!item?.id) {
      console.error('ID não encontrado no item fornecido.');
      return;
    }

    const id = item.id

    this.burialUnitService.getById(id).subscribe({
      next: (burialUnit) => {
        if (!burialUnit) {
          console.warn('API retornou um valor vazio.')
          return;
        }

        this.dialog.open(SharedModalViewComponent, {
          data: {
            title: 'Detalhes do jazigo',
            fields: [
              { 
                label: 'Código', 
                value: burialUnit.codigo ?? 'Não informado' 
              },
              { 
                label: 'Tipo', 
                value: burialUnit.tipo ?? 'Não informado' 
              },
              { 
                label: 'Falecido', 
                value: burialUnit.falecido ? burialUnit.falecido.nome_completo : 'Não associado' 
              },
              { 
                label: 'Localização', 
                value: burialUnit.localizacao ?? 'Não informado' 
              },
              { 
                label: 'Estado', 
                value: burialUnit.status ?? 'Não informado' 
              },
              { 
                label: 'Responsável', 
                value: burialUnit.falecido.responsible ? burialUnit.falecido.responsible.name : 'Não associado' 
              },
              { 
                label: 'Período concessivo', 
                value: burialUnit.data_final_concessao ? `${burialUnit.data_final_concessao}` : 'Não informado' 
              },
            ]
          }
        });
      },
      error: (error) => console.error('Erro ao buscar detalhes:', error)
    });
  }
}
