import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { BackButtonComponent } from '../../buttons/back-button/back-button.component';
import { MedicOrderFormComponent } from '../../medic-order-form/medic-order-form.component';
import { MedicOrderService } from '../../../service/medic-order.service';

@Component({
  selector: 'app-medic-order-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    BackButtonComponent,
    MedicOrderFormComponent
  ],
  templateUrl: './medic-order.component.html',
  styleUrls: ['./medic-order.component.scss']
})
export class MedicOrderPageComponent {
  @ViewChild(MedicOrderFormComponent) formComponent!: MedicOrderFormComponent;

  constructor(private router: Router, private orderService: MedicOrderService) {}

  onBack(): void {
    this.router.navigate(['/home']);
  }

  onGenerarOrden(): void {
    if (!this.formComponent?.form) {
      console.error('Formulario no disponible');
      return;
    }

    if (this.formComponent.form.invalid) {
      this.formComponent.form.markAllAsTouched();
      return;
    }

    const order = this.formComponent.form.value;
    this.orderService.addOrder(order);
    console.log('Orden médica generada:', order);
    this.formComponent.form.reset();
  }
}
