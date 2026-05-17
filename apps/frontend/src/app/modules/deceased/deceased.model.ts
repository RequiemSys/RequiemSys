/**
 * Interface para representar um Falecido
 */
export interface Deceased {
  id: string | number;
  nome: string;
  data_falecimento: string; // formato: YYYY-MM-DD
  jazigo: string;
  exumacao?: string;
  responsavel_id?: string | number;
  observacoes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DeceasedCreateRequest extends Omit<Deceased, 'id' | 'created_at' | 'updated_at'> {}

export interface DeceasedUpdateRequest extends Partial<Omit<Deceased, 'id' | 'created_at' | 'updated_at'>> {}
