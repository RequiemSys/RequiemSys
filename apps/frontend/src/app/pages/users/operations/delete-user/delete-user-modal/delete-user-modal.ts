import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-delete-user-modal',
  imports: [],
  templateUrl: './delete-user-modal.html',
  styleUrl: './delete-user-modal.css',
})
export class DeleteUserModalComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
