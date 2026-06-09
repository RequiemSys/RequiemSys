import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTableComponent } from '../../shared/shared-table/shared-table';
import { BurialService, BurialOutput } from './burial.service';

@Component({
  selector: 'app-burial',
  standalone: true,
  imports: [
    CommonModule,
    SharedTableComponent
  ],
  templateUrl: './burial.html',
  styleUrl: './burial.css',
})
export class BurialComponent implements OnInit {

  private listBurialService = inject(BurialService);
  private cdr = inject(ChangeDetectorRef);

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

  data: any[] = [];

  ngOnInit(): void {
    this.loadBurials();
  }

  loadBurials(): void {
    this.listBurialService.listAll().subscribe({
      next: (response: BurialOutput[]) => {
        this.data = response.map(b => ({
          ...b,
          falecido: b.falecido ? b.falecido.nome_completo : 'Não associado',
          data: b.data_sepultamento 
            ? new Date(b.data_sepultamento + 'T00:00:00').toLocaleDateString('pt-BR') 
            : '-',
          jazigo: b.falecido.jazigo ? b.falecido.jazigo.codigo : 'Não associado',
          status: b.status 
            ? b.status.charAt(0).toUpperCase() + b.status.slice(1) 
            : '-',
          editValue: b.id
        }));
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao carregar os sepultamentos:', error);
      }
    });
  }
}