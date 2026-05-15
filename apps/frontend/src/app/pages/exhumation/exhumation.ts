import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTableComponent } from '../../shared/shared-table/shared-table';

@Component({
  selector: 'app-exhumation',
  imports: [
    CommonModule,
    SharedTableComponent
  ],
  templateUrl: './exhumation.html',
  styleUrl: './exhumation.css',
})
export class ExhumationComponent {

  title = 'Exumações';
  subtitle = 'Visualize todas as exumações cadastradas no sistema';
  columns = [
    {
      key: 'falecido',
      label: 'Falecido'
    },
    {
      key: 'sepultamento',
      label: 'Data do Sepultamento'
    },
    {
      key: 'exumacao',
      label: 'Data da Exumação'
    },
    {
      key: 'status',
      label: 'Status'
    }
  ];

  data = [
    {
      falecido: 'Renato Martins',
      sepultamento: '08/08/2028',
      exumacao: '08/08/2028',
      status: 'Pendente'
    }
  ];

}
