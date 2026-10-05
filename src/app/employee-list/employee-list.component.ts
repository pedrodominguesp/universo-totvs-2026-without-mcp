import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  PoPageModule,
  PoPageAction,
  PoTableModule,
  PoTableColumn,
  PoTableColumnSort,
  PoTableSearchAiField,
  PoTagModule,
  PoNotificationModule,
  PoNotificationService,
  PoSearchAiResult,
  PoSearchAiError
} from '@po-ui/ng-components';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    PoPageModule,
    PoTableModule,
    PoTagModule,
    PoNotificationModule
  ],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent {
  readonly pageActions: Array<PoPageAction> = [
    { label: 'Novo Funcionário', icon: 'an an-plus', action: this.newEmployee.bind(this) }
  ];

  readonly serviceApi = 'https://po-sample-api.onrender.com/v1/people';

  readonly columns: Array<PoTableColumn> = [
    { property: 'id', label: 'ID', type: 'number', width: '80px', sortable: true },
    { property: 'name', label: 'Nome', sortable: true },
    { property: 'email', label: 'E-mail' },
    { property: 'city', label: 'Cidade', sortable: true },
    { property: 'status', label: 'Status', type: 'columnTemplate', width: '150px' }
  ];

  readonly searchAiField: PoTableSearchAiField = {
    url: 'https://po-sample-api.onrender.com/v1/ai/filter',
    apply: 'server',
    minConfidence: 0.5,
    timeout: 10000,
    placeholder: 'Ex: funcionários ativos de São Paulo'
  };

  readonly statusLabels: Record<string, string> = {
    active: 'Ativo',
    inactive: 'Inativo',
    pending: 'Pendente'
  };

  readonly statusColors: Record<string, string> = {
    active: 'color-11',
    inactive: 'color-07',
    pending: 'color-08'
  };

  readonly statusIcons: Record<string, string> = {
    active: 'an an-check-circle',
    inactive: 'an an-x-circle',
    pending: 'an an-clock'
  };

  constructor(
    private router: Router,
    private poNotification: PoNotificationService
  ) {}

  onSortBy(sort: PoTableColumnSort): void {
    console.log('Ordenando por:', sort.column?.property, sort.type);
  }

  onAiResult(result: PoSearchAiResult): void {
    this.poNotification.success(`Busca concluída para "${result.query}".`);
  }

  onAiLowConfidence(result: PoSearchAiResult): void {
    const pct = Math.round((result.confidence ?? 0) * 100);
    this.poNotification.warning(`Baixa confiança (${pct}%) na busca "${result.query}".`);
  }

  onAiError(error: PoSearchAiError): void {
    this.poNotification.error(`Erro ${error.statusCode}: ${error.message}`);
  }

  newEmployee(): void {
    this.router.navigate(['/employees/new']);
  }
}
