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
import { NotificationService, SendMail } from './notification.service';
import { DeceasedService, Falecido } from '../deceased/deceased.service';
import { SuccessModalComponent } from './success-modal';

@Component({
  selector: 'app-exhumation',
  imports: [
    CommonModule,
    SharedTableComponent,
  ],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class NotificationComponent implements OnInit {

  private deceasedService = inject(DeceasedService);
  private notificationService = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  title = 'Notificações';
  subtitle = 'Visualize todas as notificações de exumação enviadas';
  
  columns = [
    { key: 'falecido_nome', label: 'Falecido' },
    { key: 'responsavel_nome', label: 'Responsável' },
    { key: 'exumacao', label: 'Data Limite Concessão' },
    { key: 'status_email', label: 'Status Notificação' }
  ];

  data: any[] = [];
  emailsEnviados: Set<string> = new Set();

  ngOnInit(): void {
    this.loadPendingNotifications();
  }

  loadPendingNotifications(): void {
    this.deceasedService.listAll().subscribe({
      next: (falecidos: Falecido[]) => {
        this.data = falecidos
          .filter(f => f.status === 'apto para exumacao' && f.responsible)
          .map(f => {
            const enviado = this.emailsEnviados.has(f.cpf || '');
            return {
              ...f,
              falecido_nome: f.nome_completo,
              responsavel_nome: f.responsible?.name,
              exumacao: f.jazigo?.data_final_concessao 
                ? new Date(f.jazigo.data_final_concessao).toLocaleDateString('pt-BR') 
                : 'Não informada',
              status_email: enviado ? 'Enviado' : 'Pendente de Envio'
            };
          });
        this.cdr.detectChanges();
      },
      error: (error) => console.error(error)
    });
  }

  openView(item: any): void {
    this.deceasedService.getByCpf(item.cpf).subscribe({
      next: (falecido) => {
        const enviado = this.emailsEnviados.has(falecido.cpf || '');
        
        this.dialog.open(
          SharedModalViewComponent,
          {
            data: {
              title: 'Detalhes da Notificação',
              fields: [
                {
                  label: 'Falecido',
                  value: falecido.nome_completo
                },
                {
                  label: 'Responsável',
                  value: falecido.responsible ? falecido.responsible.name : 'Nenhum responsável associado'
                },
                {
                  label: 'E-mail do Responsável',
                  value: falecido.responsible ? falecido.responsible.email : '-'
                },
                {
                  label: 'Data Limite Concessão',
                  value: falecido.jazigo?.data_final_concessao 
                    ? new Date(falecido.jazigo.data_final_concessao).toLocaleDateString('pt-BR') 
                    : 'Não informada'
                },
                {
                  label: 'Status do Envio',
                  value: enviado ? 'Enviado' : 'Pendente de Envio'
                }
              ]
            }
          }
        );
      },
      error: (error) => console.error(error)
    });
  }

  enviarNotificacao(item: any): void {
    const payload: SendMail = {
      email_to: item.responsavel_email,
      subject: 'Aviso Importante: Prazo de Exumação de Corpo Alcançado'
    };

    this.notificationService.sendEmailNotification(payload).subscribe({
      next: () => {
        if (item.cpf) {
          this.emailsEnviados.add(item.cpf);
        }
        this.openSuccessModal();
        this.loadPendingNotifications();
      },
      error: (error) => console.error(error)
    });
  }

  openSuccessModal(): void {
    this.dialog.open(SuccessModalComponent, {
      width: '400px'
    });
  }
}