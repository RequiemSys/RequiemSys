import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Serviço base genérico para operações CRUD.
 * 
 * Exemplo de uso:
 * ```typescript
 * @Injectable({ providedIn: 'root' })
 * export class DeceasedService extends BaseCrudService<Deceased> {
 *   constructor(http: HttpClient) {
 *     super(http, 'deceased');
 *   }
 * }
 * ```
 */
@Injectable()
export abstract class BaseCrudService<T> {
  // Usar URL base padrão, pode ser sobrescrito em produção
  private baseUrl = 'http://localhost:8000/api';
  protected endpoint!: string;

  private itemsSubject = new BehaviorSubject<T[]>([]);
  public items$ = this.itemsSubject.asObservable();

  private selectedItemSubject = new BehaviorSubject<T | null>(null);
  public selectedItem$ = this.selectedItemSubject.asObservable();

  private loadingSubject = new BehaviorSubject(false);
  public loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  constructor(protected http: HttpClient, endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Busca todos os itens
   */
  listAll(): Observable<ApiResponse<T[]>> {
    this.loadingSubject.next(true);
    return this.http.get<ApiResponse<T[]>>(`${this.baseUrl}/${this.endpoint}`).pipe(
      tap({
        next: (response) => {
          this.itemsSubject.next(response.data || []);
          this.loadingSubject.next(false);
          this.errorSubject.next(null);
        },
        error: (error) => {
          this.loadingSubject.next(false);
          this.errorSubject.next(error.message || 'Erro ao buscar dados');
        },
      })
    );
  }

  /**
   * Busca um item por ID
   */
  getById(id: string | number): Observable<ApiResponse<T>> {
    this.loadingSubject.next(true);
    return this.http.get<ApiResponse<T>>(`${this.baseUrl}/${this.endpoint}/${id}`).pipe(
      tap({
        next: (response) => {
          this.selectedItemSubject.next(response.data || null);
          this.loadingSubject.next(false);
          this.errorSubject.next(null);
        },
        error: (error) => {
          this.loadingSubject.next(false);
          this.errorSubject.next(error.message || 'Erro ao buscar item');
        },
      })
    );
  }

  /**
   * Cria um novo item
   */
  create(data: Partial<T>): Observable<ApiResponse<T>> {
    this.loadingSubject.next(true);
    return this.http.post<ApiResponse<T>>(`${this.baseUrl}/${this.endpoint}`, data).pipe(
      tap({
        next: (response) => {
          this.loadingSubject.next(false);
          this.errorSubject.next(null);
          this.listAll().subscribe(); // Atualiza a lista
        },
        error: (error) => {
          this.loadingSubject.next(false);
          this.errorSubject.next(error.error?.message || 'Erro ao criar item');
        },
      })
    );
  }

  /**
   * Atualiza um item existente
   */
  update(id: string | number, data: Partial<T>): Observable<ApiResponse<T>> {
    this.loadingSubject.next(true);
    return this.http
      .put<ApiResponse<T>>(`${this.baseUrl}/${this.endpoint}/${id}`, data)
      .pipe(
        tap({
          next: (response) => {
            this.loadingSubject.next(false);
            this.errorSubject.next(null);
            this.listAll().subscribe(); // Atualiza a lista
          },
          error: (error) => {
            this.loadingSubject.next(false);
            this.errorSubject.next(error.error?.message || 'Erro ao atualizar item');
          },
        })
      );
  }

  /**
   * Deleta um item
   */
  delete(id: string | number): Observable<ApiResponse<void>> {
    this.loadingSubject.next(true);
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${this.endpoint}/${id}`).pipe(
      tap({
        next: (response) => {
          this.loadingSubject.next(false);
          this.errorSubject.next(null);
          this.listAll().subscribe(); // Atualiza a lista
        },
        error: (error) => {
          this.loadingSubject.next(false);
          this.errorSubject.next(error.error?.message || 'Erro ao deletar item');
        },
      })
    );
  }

  /**
   * Atualiza o item selecionado manualmente
   */
  selectItem(item: T | null) {
    this.selectedItemSubject.next(item);
  }

  /**
   * Limpa o erro
   */
  clearError() {
    this.errorSubject.next(null);
  }

  /**
   * Getter para estado atual de carregamento
   */
  isLoading(): boolean {
    return this.loadingSubject.value;
  }

  /**
   * Getter para erro atual
   */
  getError(): string | null {
    return this.errorSubject.value;
  }
}
