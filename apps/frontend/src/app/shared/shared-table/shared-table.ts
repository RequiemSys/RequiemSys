import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

export interface TableColumn {
  key: string;
  label: string;
}

export interface TableAction {
  icon: string;
  tooltip: string;
  action: 'view' | 'edit' | 'delete' | 'custom';
}

@Component({
  selector: 'app-shared-table',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterLink,
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
  @Input() columns!: TableColumn[];

  // Dados exibidos dinamicamente na tabela
  @Input() data!: any[];

  // Ações disponíveis na tabela
  @Input() actions: TableAction[] = [
    { icon: 'search', tooltip: 'Visualizar', action: 'view' },
    { icon: 'edit', tooltip: 'Editar', action: 'edit' },
    { icon: 'delete', tooltip: 'Deletar', action: 'delete' },
  ];

  // Propriedade identificadora do item (ex: 'id')
  @Input() idProperty: string = 'id';

  // Eventos de ação
  @Output() onView = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onCustomAction = new EventEmitter<{ item: any; action: string }>();

  handleAction(item: any, action: string) {
    switch (action) {
      case 'view':
        this.onView.emit(item);
        break;
      case 'edit':
        this.onEdit.emit(item);
        break;
      case 'delete':
        this.onDelete.emit(item);
        break;
      default:
        this.onCustomAction.emit({ item, action });
    }
  }
}
