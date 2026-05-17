# Guia: Implementar Nova Entidade

Este guia demonstra como implementar uma nova entidade seguindo o padrão estabelecido no RequiemSys.

## Exemplo: Implementar "Exumação"

### Passo 1: Criar Pasta de Módulo

```
src/app/modules/exhumation/
├── exhumation.model.ts
├── exhumation.service.ts
├── control-panel/
└── operations/
    ├── create-exhumation/
    ├── update-exhumation/
    ├── view-exhumation/
    └── delete-exhumation/
```

### Passo 2: Criar Model (exhumation.model.ts)

```typescript
export interface Exhumation {
  id: string | number;
  deceased_id: string | number;
  data_exhumacao: string; // YYYY-MM-DD
  motivo: string;
  status: 'pendente' | 'realizada' | 'cancelada';
  observacoes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ExhumationCreateRequest 
  extends Omit<Exhumation, 'id' | 'created_at' | 'updated_at'> {}

export interface ExhumationUpdateRequest 
  extends Partial<Omit<Exhumation, 'id' | 'created_at' | 'updated_at'>> {}
```

### Passo 3: Criar Service (exhumation.service.ts)

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../../core/services/base-crud.service';
import { Exhumation } from './exhumation.model';

@Injectable({ providedIn: 'root' })
export class ExhumationService extends BaseCrudService<Exhumation> {
  constructor(http: HttpClient) {
    super(http, 'exhumation');
  }

  // Métodos específicos opcionais
  getByStatus(status: string) {
    // Implementar customizado conforme necessário
  }
}
```

### Passo 4: Criar Componentes de Operations

Seguir padrão de `deceased` mas adaptar para `exhumation`:

- **CreateExhumationComponent** - Usar `SharedFormComponent`
- **UpdateExhumationComponent** - Usar `SharedFormComponent`
- **ViewExhumationComponent** - Exibir detalhes
- **DeleteExhumationComponent** - Confirmação via `ConfirmDialogComponent`

### Passo 5: Criar Control Panel

```typescript
// exhumation-control-panel.ts
export class ExhumationControlPanelComponent implements OnInit {
  // Seguir padrão do DeceasedControlPanelComponent
  
  columns: TableColumn[] = [
    { key: 'deceased_id', label: 'Falecido' },
    { key: 'data_exhumacao', label: 'Data Exumação' },
    { key: 'motivo', label: 'Motivo' },
    { key: 'status', label: 'Status' },
  ];
}
```

### Passo 6: Adicionar Rotas

Atualizar `app.routes.ts`:

```typescript
import { ExhumationControlPanelComponent } from './modules/exhumation/control-panel/exhumation-control-panel';
import { CreateExhumationComponent } from './modules/exhumation/operations/create-exhumation/create-exhumation';
import { UpdateExhumationComponent } from './modules/exhumation/operations/update-exhumation/update-exhumation';
import { ViewExhumationComponent } from './modules/exhumation/operations/view-exhumation/view-exhumation';
import { DeleteExhumationComponent } from './modules/exhumation/operations/delete-exhumation/delete-exhumation';

export const routes: Routes = [
  // ...
  {
    path: 'main',
    component: BaseLayout,
    children: [
      // ...
      {path: 'exhumation', component: ExhumationControlPanelComponent},
      {path: 'exhumation-create', component: CreateExhumationComponent},
      {path: 'exhumation-update', component: UpdateExhumationComponent},
      {path: 'exhumation-view', component: ViewExhumationComponent},
      {path: 'exhumation-delete', component: DeleteExhumationComponent},
      // ...
    ]
  }
];
```

### Passo 7: Exportar do Barrel Export

Atualizar ou criar `exhumation/__init__.ts`:

```typescript
export * from './exhumation.model';
export * from './exhumation.service';
```

### Checklist de Implementação

- [ ] Criar pasta `modules/exhumation/`
- [ ] Implementar `exhumation.model.ts`
- [ ] Implementar `exhumation.service.ts`
- [ ] Implementar `control-panel/exhumation-control-panel.ts`
- [ ] Implementar `operations/create-exhumation/` (3 arquivos)
- [ ] Implementar `operations/update-exhumation/` (3 arquivos)
- [ ] Implementar `operations/view-exhumation/` (3 arquivos)
- [ ] Implementar `operations/delete-exhumation/` (3 arquivos)
- [ ] Adicionar rotas em `app.routes.ts`
- [ ] Atualizar `__init__.ts`
- [ ] Atualizar menu/navegação (base-layout)
- [ ] Testar fluxo completo (create, read, update, delete)

## Dicas Importantes

1. **Reutilizar Componentes**: Sempre use `SharedFormComponent` e `SharedTableComponent`
2. **Services**: Estenda `BaseCrudService` para consistência
3. **Nomeação**: Siga padrões kebab-case para rotas e arquivos
4. **Validação**: Defina validadores na `FormConfig`
5. **Erros**: Use `MatSnackBar` para feedback ao usuário
6. **Tipagem**: Sempre defina interfaces específicas no `.model.ts`

## Exemplo de FormConfig Completo

```typescript
formConfig: FormConfig = {
  fields: [
    {
      name: 'deceased_id',
      label: 'Falecido',
      type: 'select',
      required: true,
      options: [
        { value: '1', label: 'João Silva' },
        { value: '2', label: 'Maria Santos' },
      ]
    },
    {
      name: 'data_exhumacao',
      label: 'Data de Exumação',
      type: 'date',
      required: true,
    },
    {
      name: 'motivo',
      label: 'Motivo',
      type: 'select',
      required: true,
      options: [
        { value: 'traslado', label: 'Traslado' },
        { value: 'desintegracao', label: 'Desintegração' },
        { value: 'outro', label: 'Outro' },
      ]
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 'pendente', label: 'Pendente' },
        { value: 'realizada', label: 'Realizada' },
        { value: 'cancelada', label: 'Cancelada' },
      ]
    },
    {
      name: 'observacoes',
      label: 'Observações',
      type: 'textarea',
    }
  ],
  submitLabel: 'Salvar Exumação',
  cancelLabel: 'Cancelar',
};
```

## Troubleshooting

**Problema**: Componente não renderiza
- Verificar imports em `standalone: true`
- Verificar se todos os Material modules estão importados
- Verificar erros no console

**Problema**: Service retorna erro
- Verificar se endpoint está correto em `super(http, 'endpoint')`
- Verificar estrutura de resposta da API
- Verificar URL base em `environment.ts`

**Problema**: Validação não funciona
- Verificar se `FormConfig` tem `required: true`
- Verificar se `form.valid` está sendo verificado
- Verificar `touched` antes de exibir erro

---

Qualquer dúvida, consulte o código de exemplo em `modules/deceased/`.
