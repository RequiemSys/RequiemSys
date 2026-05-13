import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ViewUserModalComponent } from './view-user-modal/view-user-modal';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-user',
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './view-user.html',
  styleUrl: './view-user.css',
})
export class ViewUserComponent {

  users = [
    {
      id: 1,
      name: 'Rodrigo Silva',
      email: 'rodrigo.silva@gmail.com',
      acess: 'Funcionário'
    },
    {
      id: 2,
      name: 'Ana Rodrigues',
      email: 'ana.rodrigues@gmail.com',
      acess: 'Administrador'
    }
  ]

  openViewModal(user: any): void {
    this.dialog.open(ViewUserModalComponent);
  }

  constructor(private dialog: MatDialog) {
  }
}
