import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { DeleteUserModalComponent } from './delete-user-modal/delete-user-modal';

import {
  DeleteUserService,
  User
} from './delete-user.service';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './delete-user.html',
  styleUrl: './delete-user.css',
})
export class DeleteUserComponent implements OnInit {

  private dialog = inject(MatDialog);
  private router = inject(Router);
  private deleteUserService = inject(DeleteUserService);
  private cdr = inject(ChangeDetectorRef);

  users: User[] = [];

  filteredUsers: User[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.deleteUserService.listAllUsers().subscribe({
      next: (response) => {
        this.users = [...response];
        this.filteredUsers = [...response];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao buscar usuários:', error);
      }
    });
  }

  filterUsers(event: Event): void {
    const value = (event.target as HTMLInputElement)
      .value
      .toLowerCase();

    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
    );
  }

  openDeleteModal(user: User): void {
    const dialogRef = this.dialog.open(DeleteUserModalComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadUsers();
      }
    });
  }

  back(): void {
    this.router.navigate(['/main/user-control-panel']);
  }
}
