import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';

import {
  ViewUserModalService,
  UserDetails
} from './view-user-modal.service';

@Component({
  selector: 'app-view-user-modal',
  imports: [
    MatIconModule
  ],
  templateUrl: './view-user-modal.html',
  styleUrl: './view-user-modal.css',
})
export class ViewUserModalComponent implements OnInit {

  user!: UserDetails;

  loading = false;

  constructor(
    private dialogRef: MatDialogRef<ViewUserModalComponent>,
    private viewUserModalService: ViewUserModalService,
    private cdr: ChangeDetectorRef,

    @Inject(MAT_DIALOG_DATA)
    public data: UserDetails
  ) {}

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails(): void {

    this.loading = true;

    this.viewUserModalService
      .getUserDetails(this.data.email)
      .subscribe({

        next: (response) => {
          this.data = response;
          this.loading = false;
          this.cdr.detectChanges();
        },

        error: (error) => {
          this.loading = false;
          console.error('Erro ao buscar usuário:', error);
        }
      });
  }

  close(): void {
    this.dialogRef.close();
  }
}