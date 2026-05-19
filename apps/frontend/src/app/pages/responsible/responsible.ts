import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTableComponent } from '../../shared/shared-table/shared-table';

@Component({
  selector: 'app-responsible',
  imports: [
    CommonModule,
    SharedTableComponent
  ],
  templateUrl: './responsible.html',
  styleUrl: './responsible.css',
})
export class ResponsibleComponent {

  title = 'Responsáveis';
  subtitle = 'Visualize todos os responsáveis cadastrados no sistema';
  columns = [
    {
      key: 'responsavel',
      label: 'Responsável'
    },
    {
      key: 'telefone',
      label: 'Telefone'
    },
    {
      key: 'email',
      label: 'E-mail'
    },
        {
      key: '',
      label: ''
    },

  ];

  data = [
    {
      responsavel: 'Gabriel Martins',
      telefone: '(11) 91234-5678',
      email: 'gabriel.martins@gmail.com',
    }
  ];

}
