import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DashboardService } from './home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private cdr = inject(ChangeDetectorRef);
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  // Variáveis dos contadores dinâmicos
  totalFalecidos = 0;
  jazigosDisponiveis = 0;
  sepultamentosHoje = 0;

  atividadesRecentes = [
    { descricao: 'Falecido Teste cadastrado', horario: 'Hoje 11:39' }
  ];

  notificacoesRecentes = [
    { descricao: 'Aviso de Teste enviado', horario: 'Hoje 16:58' }
  ];

  constructor() {
    this.matIconRegistry.addSvgIcon(
      'tombstone',
      this.domSanitizer.bypassSecurityTrustResourceUrl('tombstone-svgrepo.svg')
    );
  }

  ngOnInit(): void {
    this.loadDashboardMetrics();
  }

  loadDashboardMetrics(): void {
    this.dashboardService.getMetrics().subscribe({
      next: (metrics) => {
        this.totalFalecidos = metrics.totalFalecidos;
        this.jazigosDisponiveis = metrics.jazigosDisponiveis;
        this.sepultamentosHoje = metrics.sepultamentosHoje;
        
        // Força a detecção de mudanças caso o Angular precise atualizar a View instantaneamente
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao buscar métricas do dashboard:', err);
      }
    });
  }
}