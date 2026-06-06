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

import { formatBurialUnitStatus } from './operations/burial-unit-options';

@Component({
  selector: 'app-burial-unit',
  imports: [
    CommonModule,
    SharedTableComponent
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
    { key: 'responsavel', label: 'Responsável' },
    { key: 'status', label: 'Status' },
    { key: 'concessao', label: 'Concessão até' },
  ];

  data: any[] = [];

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
          falecido: item.falecido ?? '-',
          responsavel: item.responsavel ?? '-',
          status: formatBurialUnitStatus(item.status),
          concessao: item.concessao ?? '-',
        }));
        this.cdr.detectChanges();
      },
      error: (error) => console.error(error),
    });
  }

}
