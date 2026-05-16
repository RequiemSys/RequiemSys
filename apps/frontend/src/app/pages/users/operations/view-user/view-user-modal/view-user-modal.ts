import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-user-modal',
  imports: [
    MatIconModule
  ],
  templateUrl: './view-user-modal.html',
  styleUrl: './view-user-modal.css',
})
export class ViewUserModalComponent {

  constructor(
    private dialogRef: MatDialogRef<ViewUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }

}
