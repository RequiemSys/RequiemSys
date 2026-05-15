import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-shared-table',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './shared-table.html',
  styleUrl: './shared-table.css',
})
export class SharedTableComponent {

  @Input() title!: string;
  @Input() subtitle!: string;

  /* Colunas da tabela sendo:
   KEY o nome da propriedade utilizada para acessar os dados e
   LABEL o texto exibido visualmente no cabeçalho da tabela
  */
  @Input() columns!: {
    key: string;
    label: string;
  }[];

  //dados exibidos dinamicamente na tabela
  @Input() data!: any[];

}
