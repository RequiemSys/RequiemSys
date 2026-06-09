import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTableComponent } from '../../shared/shared-table/shared-table';
import { Exhumation, ExhumationService } from './exhumation.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SharedModalViewComponent } from '../../shared/shared-modal-view/shared-modal-view';

@Component({
  selector: 'app-exhumation',
  imports: [
    CommonModule,
    SharedTableComponent,
    MatDialogModule
  ],
  templateUrl: './exhumation.html',
  styleUrl: './exhumation.css',
})
export class ExhumationComponent implements OnInit {

  private exhumationService = inject(ExhumationService);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  title = 'Exumações';
  subtitle = 'Visualize todas as exumações cadastradas no sistema';
  columns = [
    { key: 'falecido', label: 'Falecido' },
    { key: 'date', label: 'Data da Exumação' },
    { key: 'motivo', label: 'Motivo' }
  ];

  data: any[] = [];

  ngOnInit(): void {
    this.loadExhumation();
  }

  loadExhumation(): void {
    this.exhumationService.listAll().subscribe({
      next: (response: Exhumation[]) => {
        this.data = response.map((item) => ({
          ...item,
          falecido: item.falecido?.nome_completo ?? '-',
          date: item.date ?? '-',
          motivo: item.reason ?? '-',
        }));

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  openView(item: any): void {
    const id = item?.deceased_id

    if (!id || typeof id === 'object') {
      console.error('ID inválido', item);
      return;
    }

    this.exhumationService.getById(Number(id)).subscribe({
      next: (exhumation) => {
        if (!exhumation) {
          return;
        }

        this.dialog.open(SharedModalViewComponent, {
          width: '550px',
          data: {
            title: 'Detalhes da exumação',
            fields: [
              {
                label: 'Responsável',
                value: exhumation.falecido?.responsible.name ?? 'Não associado'
              },
              { 
                label: 'Falecido', 
                value: exhumation.falecido?.nome_completo ?? 'Não informado' 
              },
              { 
                label: 'Data agendada', 
                value: exhumation.date ?? 'Não se aplica' 
              },
              { 
                label: 'Motivo', 
                value: exhumation.reason ?? 'Não informado' 
              },
            ]
          }
        });
      },
      error: (error) => console.error(error)
    });
  }
}