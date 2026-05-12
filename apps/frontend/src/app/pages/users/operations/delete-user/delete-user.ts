import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { DeleteUserModalComponent } from './delete-user-modal/delete-user-modal';

@Component({
  selector: 'app-delete-user',
  imports: [
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './delete-user.html',
  styleUrl: './delete-user.css',
})
export class DeleteUserComponent {

  users = [
    {
      id: 1,
      name: 'Carlos',
      email: 'carlos@email.com'
    },
    {
      id: 2,
      name: 'Maria',
      email: 'maria@email.com'
    }
  ]

  openDeleteModal(user: any): void {
    this.dialog.open(DeleteUserModalComponent);
  }

  constructor(private dialog: MatDialog) {
  }
}
