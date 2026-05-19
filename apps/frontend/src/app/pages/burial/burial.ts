import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTableComponent } from '../../shared/shared-table/shared-table';

@Component({
  selector: 'app-burial',
  imports: [
    CommonModule,
    SharedTableComponent
  ],
  templateUrl: './burial.html',
  styleUrl: './burial.css',
})
export class BurialComponent {

  title = 'Sepultamentos';
  subtitle = 'Visualize todos os sepultamentos cadastrados no sistema';
  columns = [
    {
      key: 'falecido',
      label: 'Falecido'
    },
    {
      key: 'data',
      label: 'Data do Sepultamento'
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

  data = [
    {
      falecido: 'Renato Martins',
      data: '08/08/2025',
      jazigo: '03A',
      status: 'Concluído'
    }
  ];

}
