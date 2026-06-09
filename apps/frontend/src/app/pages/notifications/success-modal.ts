import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-success-modal',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './success-modal.html',
  styleUrl: './success-modal.css'
})
export class SuccessModalComponent {}