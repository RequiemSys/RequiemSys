import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../../core/services/base-crud.service';
import { Deceased } from './deceased.model';

/**
 * Serviço para gerenciar Falecidos
 * 
 * Exemplo de uso:
 * ```typescript
 * constructor(private deceasedService: DeceasedService) {}
 * 
 * ngOnInit() {
 *   this.deceasedService.listAll().subscribe(response => {
 *     console.log(response.data);
 *   });
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class DeceasedService extends BaseCrudService<Deceased> {
  constructor(http: HttpClient) {
    super(http, 'deceased');
  }

  // Você pode adicionar métodos específicos aqui, se necessário
  // Por exemplo:
  // getByJazigo(jazigo: string) { ... }
}
