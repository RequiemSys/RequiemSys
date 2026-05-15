import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTableComponent } from '../../shared/shared-table/shared-table';

@Component({
  selector: 'app-deceased',
  imports: [
    CommonModule,
    SharedTableComponent
  ],
  templateUrl: './deceased.html',
  styleUrl: './deceased.css',
})
export class DeceasedComponent {

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
      key: 'exumacao',
      label: 'Exumação'
    }
  ];

  data = [
    {
      nome: 'Renato Martins',
      data: '04/11/2025',
      jazigo: '03A',
      exumacao: 'Pendente'
    }
  ];

}
