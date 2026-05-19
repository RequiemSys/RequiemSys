import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { ViewUserModalComponent } from './view-user-modal/view-user-modal';

import {
  ViewUserService,
  User
} from './view-user.service';

@Component({
  selector: 'app-view-user',
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './view-user.html',
  styleUrl: './view-user.css',
})
export class ViewUserComponent implements OnInit {

  private dialog = inject(MatDialog);
  private router = inject(Router);
  private viewUserService = inject(ViewUserService);
  private cdr = inject(ChangeDetectorRef);

  users: User[] = [];

  filteredUsers: User[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.viewUserService.listAllUsers().subscribe({
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

  openViewModal(user: User): void {
    this.dialog.open(ViewUserModalComponent, {
      data: user
    });
  }

  back(): void {
    this.router.navigate(['/main/user-control-panel']);
  }
}