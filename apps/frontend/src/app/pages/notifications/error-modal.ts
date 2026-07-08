import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-modal',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './error-modal.html',
  styleUrl: './error-modal.css'
})
export class ErrorModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message?: string }) {}
}