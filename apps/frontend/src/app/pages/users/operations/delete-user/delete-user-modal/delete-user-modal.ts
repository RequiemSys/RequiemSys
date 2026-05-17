import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';

import { DeleteUserModalService } from './delete-user-modal.service';

@Component({
  selector: 'app-delete-user-modal',
  imports: [
    MatIconModule
  ],
  templateUrl: './delete-user-modal.html',
  styleUrl: './delete-user-modal.css',
})
export class DeleteUserModalComponent {

  loading = false;

  constructor(
    private dialogRef: MatDialogRef<DeleteUserModalComponent>,
    private deleteUserModalService: DeleteUserModalService,

    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  deleteUser(): void {

    this.loading = true;

    this.deleteUserModalService
      .deleteUser(this.data.email)
      .subscribe({

        next: () => {
          this.loading = false;
          this.dialogRef.close(true);
        },

        error: (error) => {
          this.loading = false;
          console.error('Erro ao deletar usuário:', error);
        }
      });
  }
}