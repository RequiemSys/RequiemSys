import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTableComponent } from '../../shared/shared-table/shared-table';

@Component({
  selector: 'app-burial-unit',
  imports: [
    CommonModule,
    SharedTableComponent
  ],
  templateUrl: './burial-unit.html',
  styleUrl: './burial-unit.css',
})
export class BurialUnitComponent {

  title = 'Unidades de Sepultamento';
  subtitle = 'Visualize todas as unidades de sepultamento cadastradas no sistema';
  columns = [
    {
      key: 'jazigo',
      label: 'Jazigo'
    },
    {
      key: 'falecido',
      label: 'Falecido'
    },
    {
      key: 'responsavel',
      label: 'Responsável'
    },
    {
      key: 'status',
      label: 'Status'
    },
    {
      key: 'concessao',
      label: 'Concessão até'
    }
  ];

  data = [
    {
      jazigo: '03A',
      falecido: 'Renato Martins',
      responsavel: 'Mauro Martins',
      status: 'Ocupado',
      concessao: '09/03/2028'
    }
  ];

}
