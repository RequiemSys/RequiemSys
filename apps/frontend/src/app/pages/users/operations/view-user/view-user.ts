import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ViewUserModalComponent } from './view-user-modal/view-user-modal';

@Component({
  selector: 'app-view-user',
  imports: [
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './view-user.html',
  styleUrl: './view-user.css',
})
export class ViewUserComponent {

  users = [
    {
      id: 1,
      name: 'Rodrigo Silva'
    },
    {
      id: 2,
      name: 'Ana Rodrigues'
    }
  ]

  openViewModal(user: any): void {
    this.dialog.open(ViewUserModalComponent);
  }

  constructor(private dialog: MatDialog) {
  }
}
