import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import {
  PoPageEditComponent,
  PoPageModule,
  PoFieldModule,
  PoNotificationService,
  PoNotificationModule,
  PoComboOption
} from '@po-ui/ng-components';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    FormsModule,
    PoPageModule,
    PoFieldModule,
    PoNotificationModule
  ],
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent {
  @ViewChild('employeeForm') employeeForm!: NgForm;

  employee = {
    name: '',
    cpf: '',
    department: '',
    active: true
  };

  readonly departments: Array<PoComboOption> = [
    { label: 'Engenharia', value: 'engineering' },
    { label: 'Design', value: 'design' },
    { label: 'Gestão', value: 'management' },
    { label: 'Recursos Humanos', value: 'hr' },
    { label: 'Financeiro', value: 'finance' }
  ];

  constructor(
    private router: Router,
    private poNotification: PoNotificationService
  ) {}

  save(): void {
    if (this.employeeForm.invalid) {
      this.poNotification.warning('Preencha todos os campos obrigatórios.');
      return;
    }

    // Aqui você faria o POST para a API
    console.log('Salvar funcionário:', this.employee);
    this.poNotification.success('Funcionário cadastrado com sucesso!');
    this.router.navigate(['/']);
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
