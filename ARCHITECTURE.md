# Arquitetura de Frontend - RequiemSys

## Visão Geral

Implementação de uma arquitetura modular, reutilizável e escalável para o frontend do RequiemSys, preparada para controle de acesso futuro via token/autenticação.

## Estrutura de Pastas

```
src/app/
├── core/
│   ├── services/
│   │   └── base-crud.service.ts          # Service base reutilizável
│   └── api.config.ts
├── modules/
│   ├── deceased/                         # Exemplo de entidade implementada
│   │   ├── deceased.model.ts             # Interfaces/tipos
│   │   ├── deceased.service.ts           # Service específico
│   │   ├── control-panel/                # Página de listagem/gerenciamento
│   │   │   ├── deceased-control-panel.ts
│   │   │   ├── deceased-control-panel.html
│   │   │   └── deceased-control-panel.css
│   │   └── operations/                   # CRUD operations
│   │       ├── create-deceased/
│   │       ├── update-deceased/
│   │       ├── view-deceased/
│   │       └── delete-deceased/
│   └── [other-entities]/                 # Seguir mesmo padrão
├── shared/
│   ├── shared-form/                      # Componente genérico de formulário
│   ├── shared-table/                     # Componente genérico de tabela
│   └── dialogs/
│       └── confirm-dialog/               # Dialog genérico de confirmação
└── pages/
    ├── base-layout/
    └── login/
```

## Componentes Reutilizáveis

### 1. SharedTableComponent
Tabela genérica com colunas dinâmicas, ações (view, edit, delete) e busca.

**Uso:**
```typescript
<app-shared-table
  [title]="'Falecidos'"
  [subtitle]="'Gerenciar falecidos'"
  [columns]="columns"
  [data]="deceased"
  (onView)="onView($event)"
  (onEdit)="onEdit($event)"
  (onDelete)="onDelete($event)"
></app-shared-table>
```

### 2. SharedFormComponent
Formulário genérico com validação dinâmica e suporte a múltiplos tipos de campo.

**Uso:**
```typescript
<app-shared-form
  [config]="formConfig"
  [loading]="loading"
  [initialValues]="initialValues"
  title="Criar Falecido"
  subtitle="Preencha os dados"
  (submit)="onSubmit($event)"
  (cancel)="onCancel()"
></app-shared-form>
```

**Tipos de Campo Suportados:**
- `text` - Campo de texto
- `email` - Campo de email
- `password` - Campo de senha
- `textarea` - Área de texto
- `select` - Seleção (dropdown)
- `date` - Data

### 3. ConfirmDialogComponent
Dialog genérico para confirmações de ações.

**Uso:**
```typescript
const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  width: '400px',
  data: {
    title: 'Confirmar Exclusão',
    message: 'Tem certeza?',
    isDangerous: true,
  },
});
```

### 4. BaseCrudService
Service genérico para operações CRUD.

**Uso:**
```typescript
@Injectable({ providedIn: 'root' })
export class DeceasedService extends BaseCrudService<Deceased> {
  constructor(http: HttpClient) {
    super(http, 'deceased');
  }
}
```

**Métodos Disponíveis:**
- `listAll()` - Busca todos os itens
- `getById(id)` - Busca um item específico
- `create(data)` - Cria novo item
- `update(id, data)` - Atualiza item
- `delete(id)` - Deleta item

## Padrão de Implementação por Entidade

Siga este padrão para implementar novas entidades (Exumação, Sepultamentos, etc.):

### 1. Criar Modelo (model.ts)
```typescript
export interface Entity {
  id: string | number;
  // Outras propriedades...
}
```

### 2. Criar Service
```typescript
@Injectable({ providedIn: 'root' })
export class EntityService extends BaseCrudService<Entity> {
  constructor(http: HttpClient) {
    super(http, 'entity-endpoint');
  }
}
```

### 3. Criar Componentes de Operations

Cada entidade precisa ter:
- **Create**: Formulário para criação
- **Update**: Formulário para edição
- **View**: Exibição de detalhes
- **Delete**: Confirmação e exclusão

### 4. Criar Control Panel (Lista)
Componente que:
- Lista todos os registros
- Fornece botão "Criar Novo"
- Chama componentes de operations

### 5. Adicionar Rotas
Atualizar `app.routes.ts` com as novas rotas.

## Fluxo de Dados

```
Control Panel (lista)
      ↓
SharedTable (exibe dados)
      ↓
Ações:
  - View → ViewComponent
  - Edit → UpdateComponent
  - Delete → DeleteComponent
      ↓
Service (comunicação com backend)
      ↓
API Backend
```

## Exemplo Prático: Falecidos

Arquivo de estrutura já implementado:

```
modules/deceased/
├── deceased.model.ts           # Interfaces: Deceased, DeceasedCreateRequest
├── deceased.service.ts         # Service que estende BaseCrudService
├── control-panel/
│   └── deceased-control-panel.ts     # Lista + "Criar Novo"
└── operations/
    ├── create-deceased/        # Formulário para criar
    ├── update-deceased/        # Formulário para editar
    ├── view-deceased/          # Exibição de detalhes
    └── delete-deceased/        # Confirmação e exclusão
```

## Futuras Implementações

Usar o mesmo padrão para:
- Exumação
- Sepultamentos
- Responsáveis
- Unidades de Jazigo

## Controle de Acesso

### Fase Atual
- Sem restrição de rotas

### Fase Futura
- Criar `RoleGuard` baseado em token JWT
- Implementar `AuthGuard` para validação
- Controlar visibilidade de componentes via roles (admin/funcionário)

```typescript
// Exemplo futuro
{path: 'deceased', component: DeceasedControlPanelComponent, canActivate: [RoleGuard]}
```

## Tratamento de Erros

O `BaseCrudService` fornece:
- `error$` Observable para assinar erros
- `getError()` método para obter erro atual
- `clearError()` método para limpar erro

## Materiais Necessários

Dependências já configuradas:
- Angular 21
- Angular Material 21
- RxJS 7.8
- TypeScript 5.9

## Padrões de Nomenclatura

- **Components**: `entity-operation.ts` (ex: `create-deceased.ts`)
- **Services**: `entity.service.ts` (ex: `deceased.service.ts`)
- **Models**: `entity.model.ts` (ex: `deceased.model.ts`)
- **Routes**: `entity-operation` (ex: `deceased-create`)
- **Folders**: kebab-case (ex: `create-deceased`)

## Próximas Etapas

1. ✅ Componentes reutilizáveis base
2. ✅ Service genérico
3. ✅ Implementação de Falecidos
4. ⏳ Implementar Exumação com mesmo padrão
5. ⏳ Implementar Sepultamentos com mesmo padrão
6. ⏳ Criar Guards para controle de acesso
7. ⏳ Integração com autenticação JWT

---

**Princípios:**
- DRY (Don't Repeat Yourself)
- Separação de responsabilidades
- Componentes agnósticos a negócio
- Reutilização máxima
