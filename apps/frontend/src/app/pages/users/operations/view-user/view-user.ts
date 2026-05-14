import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ViewUserModalComponent } from './view-user-modal/view-user-modal';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

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
export class ViewUserComponent {

  users = [
    {
      id: 1,
      nome: 'Rodrigo Silva',
      sexo: 'Masculino',
      nascimento: '26/08/1978',
      email: 'rodrigo.silva@gmail.com',
      cpf: '123.456.789-01',
      tel: '(11) 12345-6789',
      access: 'Funcionário'
    },
    {
      id: 2,
      nome: 'Ana Rodrigues',
      sexo: 'Feminino',
      nascimento: '03/01/1985',
      email: 'ana.rodrigues@gmail.com',
      cpf: '123.456.789-01',
      tel: '(11) 12345-6789',
      access: 'Administrador'
    }
  ]

  openViewModal(user: any): void {
    this.dialog.open(ViewUserModalComponent, {
      data: user
    });
  }

   back(): void {
    this.router.navigate(['/main/user-control-panel'])
  }

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) {}
}
