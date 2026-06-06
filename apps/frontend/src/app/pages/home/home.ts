import { Component } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    MatIconModule,
    CommonModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {

  atividadesRecentes = [
    { descricao: 'Falecido Teste cadastrado', horario: 'Hoje 11:39' }
  ];

  notificacoesRecentes = [
    { descricao: 'Aviso de Teste enviado', horario: 'Hoje 16:58' }
  ];

  constructor (
    private MatIconRegistry: MatIconRegistry,
    private DomSanitizer: DomSanitizer
  ) {
    this.MatIconRegistry.addSvgIcon(
      'tombstone',
      this.DomSanitizer.bypassSecurityTrustResourceUrl('tombstone-svgrepo.svg')
    );
  }
}
