import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { BackButtonComponent } from '../../buttons/back-button/back-button.component';
import { CanalizationFormComponent } from '../../canalization-form/canalization-form.component';

@Component({
  selector: 'app-medic-canalization-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    BackButtonComponent,
    CanalizationFormComponent
  ],
  templateUrl: './medic-canalization.component.html',
  styleUrls: ['./medic-canalization.component.scss']
})
export class MedicCanalizationPageComponent {
  @ViewChild(CanalizationFormComponent) formComponent!: CanalizationFormComponent;

  constructor(private router: Router) {}

  onBack(): void {
    this.router.navigate(['/home']);
  }

  onGuardar(): void {
    this.formComponent.save();
  }

  onCancelar(): void {
    this.formComponent.resetForm(); 
  }
}
