import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { BackButtonComponent } from '../../buttons/back-button/back-button.component';
import { MedicOrderRegisterFormComponent } from '../../medic-order-register-form/medic-order-register-form.component';
import { MedicOrderRegister } from '../../../models/medic-order-register.model';
import { MedicOrderRegisterService } from '../../../service/medic-order-register.service';

@Component({
  selector: 'app-medic-order-register-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    BackButtonComponent,
    MedicOrderRegisterFormComponent
  ],
  templateUrl: './medic-order-register.component.html',
  styleUrls: ['./medic-order-register.component.scss']
})
export class MedicOrderRegisterPageComponent {
  @ViewChild(MedicOrderRegisterFormComponent)
  formComponent!: MedicOrderRegisterFormComponent;

  constructor(
    private router: Router,
    private orderService: MedicOrderRegisterService
  ) {}

  onBack(): void {
    this.router.navigate(['/medic-order-register']);
  }

  onGuardarOrden(): void {
    if (!this.formComponent?.form) {
      console.error('Formulario no disponible');
      return;
    }

    const form = this.formComponent.form;

    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    const newOrder: MedicOrderRegister = this.formComponent.getFormValues();
    this.orderService.addOrder(newOrder);

    console.log('Orden médica guardada:', newOrder);
    form.reset();
  }
}
