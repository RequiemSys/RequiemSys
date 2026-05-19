import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface DialogField {
  label: string;
  value: any;
}

export interface SharedModalViewData {
  title: string;
  fields: DialogField[];
}

@Component({
  selector: 'app-shared-modal-view',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './shared-modal-view.html',
  styleUrl: './shared-modal-view.css'
})
export class SharedModalViewComponent {
  constructor(
    private dialogRef: MatDialogRef<SharedModalViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SharedModalViewData
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}