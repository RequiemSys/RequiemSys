import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTableComponent } from '../../shared/shared-table/shared-table';

@Component({
  selector: 'app-exhumation',
  imports: [
    CommonModule,
    SharedTableComponent
  ],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class NotificationComponent {

  title = 'Notificações';
  subtitle = 'Visualize todas as notificações de exumação enviadas';
  columns = [
    {
      key: 'responsavel',
      label: 'Responsável'
    },
    {
      key: 'envio',
      label: 'Data do Envio'
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
      responsavel: 'Mortinho da silva',
      envio: '08/08/2028',
      exumacao: '08/08/2028',
      status: 'Enviado'
    }
  ];

}
