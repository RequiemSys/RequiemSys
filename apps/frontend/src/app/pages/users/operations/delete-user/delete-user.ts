import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { DeleteUserModalComponent } from './delete-user-modal/delete-user-modal';

@Component({
  selector: 'app-delete-user',
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './delete-user.html',
  styleUrl: './delete-user.css',
})
export class DeleteUserComponent {

  users = [
    {
      id: 1,
      name: 'Carlos Oliveira',
      email: 'carlos@gmail.com',
      acess: 'Funcionário'
    },
    {
      id: 2,
      name: 'Maria Silva',
      email: 'maria@gmail.com',
      acess: 'Administrador'
    }
  ]

  openDeleteModal(user: any): void {
    this.dialog.open(DeleteUserModalComponent, {
      data: user
    });
  }

  constructor(private dialog: MatDialog) {
  }
}
